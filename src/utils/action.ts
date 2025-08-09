/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import api from "./axios";

export const login = async (formData: { email: string; password: string }) => {
  try {
    const res = await api.post("/auth/login/user", formData);

    (await cookies()).set("streple_auth_token", res.data.streple_auth_token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 60 * 60 * 1000),
      path: "/",
    });

    return {
      success: true,
      message: "Login successful.",
      user_data: res.data.data,
    };
  } catch (error: any) {
    let errorMessage = "login failed. Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage, user_data: null };
  }
};

export const signup = async (formData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/auth/register", formData);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error: any) {
    let errorMessage = "Signup failed. Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await api.post("/auth/forgot-password", {
      email,
    });

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error: any) {
    let errorMessage = "forgot password failed. Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

export const resetPassword = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/auth/reset-password", {
      newPassword: formData.password,
      email: formData.email,
    });

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error: any) {
    let errorMessage = "password reset failed. Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

export const verifyOtp = async (
  formData: { otp: string; email: string },
  purpose: "verify" | "reset"
) => {
  try {
    const res = await api.post(
      `/auth/verify-${purpose === "reset" ? "otp" : "email"}`,
      formData
    );

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error: any) {
    let errorMessage = "OTP Verification failed. Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

export const resendOtp = async (formData: {
  email: string;
  purpose: "verify" | "reset";
}) => {
  try {
    const res = await api.post("/auth/resend-otp", formData);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error: any) {
    let errorMessage = "Resend OTP failed. Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

export const updateUser = async (userData: Partial<UserData>) => {
  try {
    const res = await api.post("/users/update-profile", userData);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error: any) {
    let errorMessage = "Error updating your profile, Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

export const handleCryptoOnboarding = async (payload: {
  firstQuestion: string;
  secondQuestion: string;
  thirdQuestion: string;
  hasAnswer: boolean;
}) => {
  try {
    const res = await api.post("/gamified/onboarding", payload);

    console.log(res.data);

    return {
      success: true,
      message: "Course completed",
    };
  } catch (error: any) {
    let errorMessage = "Error updating your profile, Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
