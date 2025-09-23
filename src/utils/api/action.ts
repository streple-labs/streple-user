/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import api from "./axios";

export const login = async (formData: { email: string; password: string }) => {
  try {
    const res = await api.post("/auth/login/user", formData);

    const {
      streple_auth_token,
      streple_refresh_token,
      data: user_data,
    } = res.data;

    (await cookies()).set("streple_auth_token", streple_auth_token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 60 * 60 * 1000),
      path: "/",
    });

    (await cookies()).set("streple_refresh_token", streple_refresh_token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      path: "/",
    });

    return {
      success: true,
      message: "Login successful.",
      user_data,
      status: 201,
    };
  } catch (error: any) {
    let errorMessage = "login failed. Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return {
      success: false,
      message: errorMessage,
      user_data: null,
      status: error.status,
    };
  }
};

export const signup = async (formData: {
  fullName: string;
  email: string;
  password: string;
  referral: string;
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

    return {
      success: true,
      user_data: res.data,
      message: "Phase 1 Level 1 completed",
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

export const updateUserGameData = async (gameData: {
  phase: string;
  level: string;
  score: number;
}) => {
  try {
    const res = await api.post("/gamified/tracker", gameData);

    return {
      success: true,
      message: "",
      user_data: res.data,
    };
  } catch (error: any) {
    let errorMessage = "Error updating your game data, Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage, user_data: null };
  }
};

export const followTrader = async (formData: FollowTraderPayload) => {
  try {
    await api.post("/follow-trader", { followingId: formData.trader_id });

    return {
      success: true,
      message: "You have successfully followed the trader",
    };
  } catch (error: any) {
    let errorMessage = "Error following pro trader, Please try again later.";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message))
        errorMessage = error.response.data.message.join(", ");
      else errorMessage = error.response.data.message;
    } else if (error?.userMessage) errorMessage = error.userMessage;
    else if (error?.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};
