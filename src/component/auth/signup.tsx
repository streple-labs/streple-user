/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { resendOtp, signup, verifyOtp } from "@/utils/api/action";
import { RE_DIGIT } from "@/utils/constants";
import { focusToNextInput } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import OtpForm from "./otp-form";
import SignupForm from "./signup-form";
import Success from "./success";
import { useSearchParams } from "next/navigation";

export default function Signup() {
  const searchParams = useSearchParams();

  const [stage, setStage] = useState<"form" | "otp" | "success">("form");

  const [otp, setOtp] = useState("");

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") return;

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") return;

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        otp.substring(0, idx) + targetValue + otp.substring(idx + 1);

      setOtp(newValue);

      if (!isTargetValueDigit) return;

      focusToNextInput(target);
    } else if (targetValueLength === 6) {
      setOtp(targetValue);

      target.blur();
    }
  };

  const {
    mutate: handleVerifyToken,
    isPending: otpLoading,
    isError: isOtpError,
    error: otpError,
  } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async () =>
      await verifyOtp(
        {
          otp,
          email: formData.email,
        },
        "verify"
      ),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "OTP verification successful.");
        setStage("success");
      } else toast.error(res.message);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const { mutate: handleResendOtp, isPending: isResendLoading } = useMutation({
    mutationKey: ["resend-otp"],
    mutationFn: async () =>
      await resendOtp({ email: formData.email, purpose: "verify" }),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(
          res.message || "OTP sent successfully. Please check your email."
        );
      } else toast.error(res.message);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { mutate: handleSignUp, isPending: signupLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async () =>
      await signup({
        ...formData,
        email: formData.email.trim().toLowerCase(),
        referral: searchParams.get("ref") || "",
      }),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(
          res.message ||
            "Signup successful! Please check your email for the OTP."
        );
        setStage("otp");
      } else toast.error(res.message);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  if (stage === "form")
    return (
      <SignupForm
        loading={signupLoading}
        formData={formData}
        handleChange={handleChange}
        handleSignup={handleSignUp}
      />
    );

  if (stage === "otp")
    return (
      <OtpForm
        title="Verify OTP"
        description={`We sent a code to ${formData.email}. Enter code to verify your email address`}
        action={{
          handleVerifyToken,
          loading: otpLoading,
          isError: isOtpError,
          error: otpError,
        }}
        handleChange={handleOTPChange}
        value={otp}
        handleResend={handleResendOtp}
        isResendLoading={isResendLoading}
      />
    );

  return (
    <Success
      title="Successfully verified"
      description="Your email has been verified successfully"
    />
  );
}
