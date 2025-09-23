/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { base_url } from "../constants";
import { AuthenticationError } from "../utils";

interface ApiResponse<T> {
  error: string | null;
  document: T | null;
}

/**
 * Wrapper for server actions that handles authentication, token refresh, and redirects
 * @param apiCall - Function that makes the API call
 * @param options - Configuration options
 * @returns Promise with error and document structure
 */
export async function withServerActionAuth<T>(
  apiCall: () => Promise<any>,
  options: {
    redirectOnAuthFail?: boolean;
    customErrorMessage?: string;
  } = {}
): Promise<ApiResponse<T>> {
  const { redirectOnAuthFail = true, customErrorMessage } = options;

  try {
    const res = await apiCall();
    return { error: null, document: res.data };
  } catch (error: any) {
    if (
      error instanceof AuthenticationError ||
      error?.response?.status === 401
    ) {
      if (redirectOnAuthFail) {
        try {
          // Attempt token refresh
          const refreshResult = await attemptTokenRefresh();

          if (refreshResult.success) {
            // Retry the original request with new token
            try {
              const res = await apiCall();
              return { error: null, document: res.data };
            } catch (retryError) {
              console.error(retryError);
              redirect("/login");
            }
          } else redirect("/login");
        } catch (refreshError) {
          console.error(refreshError);
          redirect("/login");
        }
      } else {
        return {
          error:
            customErrorMessage ||
            "Authentication required. Please log in again.",
          document: null,
        };
      }
    }

    let errorMessage =
      customErrorMessage || "Request failed. Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) {
      errorMessage = error.userMessage;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return { error: errorMessage, document: null };
  }
}

/**
 * Attempts to refresh the authentication token
 * @returns Object indicating success/failure
 */
async function attemptTokenRefresh(): Promise<{
  success: boolean;
  token?: string;
}> {
  try {
    console.log("Attempting to refresh token in server action...");

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("streple_refresh_token")?.value;

    const refreshResponse = await axios.post(`${base_url}/auth/refresh`, {
      token: refreshToken,
    });

    const { streple_auth_token } = refreshResponse.data;

    if (streple_auth_token) {
      cookieStore.set("streple_auth_token", streple_auth_token, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(Date.now() + 60 * 60 * 1000),
        path: "/",
      });

      console.log("Token refresh successful");
      return { success: true, token: streple_auth_token };
    } else {
      console.log("Token refresh failed - no token returned");
      return { success: false };
    }
  } catch (error: any) {
    console.error(
      "Token refresh failed:",
      error?.response?.data || error.message
    );
    return { success: false };
  }
}
