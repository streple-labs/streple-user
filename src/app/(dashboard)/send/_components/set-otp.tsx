/* eslint-disable @typescript-eslint/no-explicit-any */
import { anton } from "@/app/fonts";
import Loader from "@/component/ui/loader";
import { useAuth } from "@/context/auth-context";
import { updateTransactionPin } from "@/utils/api/action";
import { RE_DIGIT } from "@/utils/constants";
import { focusToNextInput, focusToPrevInput } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "sonner";

export default function SetOtp({
  back,
  setOtp,
}: {
  back: () => void;
  setOtp: Dispatch<SetStateAction<string>>;
}) {
  const { setUser, user } = useAuth();
  const [stage, setStage] = useState<"otp" | "confirm-otp" | "success">("otp");

  const [otps, setOtps] = useState({
    otp: "",
    confirmOtp: "",
  });

  const valueItems = useMemo(() => {
    const valueArray = otps.otp.split("");
    const items: Array<string> = [];

    for (let i = 0; i < 4; i++) {
      items.push(RE_DIGIT.test(valueArray[i]) ? valueArray[i] : "");
    }

    return items;
  }, [otps.otp]);

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
        otps.otp.substring(0, idx) + targetValue + otps.otp.substring(idx + 1);

      setOtps((prev) => ({ ...prev, otp: newValue }));

      if (!isTargetValueDigit) return;

      focusToNextInput(target);
    } else if (targetValueLength === 4) {
      setOtps((prev) => ({ ...prev, otp: targetValue }));

      target.blur();
    }
  };

  const valueItemsConfirmOtp = useMemo(() => {
    const valueArray = otps.confirmOtp.split("");
    const items: Array<string> = [];

    for (let i = 0; i < 4; i++) {
      items.push(RE_DIGIT.test(valueArray[i]) ? valueArray[i] : "");
    }

    return items;
  }, [otps.confirmOtp]);

  const handleConfirmOTPChange = (
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
        otps.confirmOtp.substring(0, idx) +
        targetValue +
        otps.confirmOtp.substring(idx + 1);

      setOtps((prev) => ({ ...prev, confirmOtp: newValue }));

      if (!isTargetValueDigit) return;

      focusToNextInput(target);
    } else if (targetValueLength === 4) {
      setOtps((prev) => ({ ...prev, confirmOtp: targetValue }));

      target.blur();
    }
  };

  const {
    mutate: handleSetTransactionPin,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["set-transaction"],
    mutationFn: async () => await updateTransactionPin(otps.otp),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "You have successfully set your pin.");
        setStage("success");
        setUser({
          ...user,
          user_data: { ...user.user_data, hasTransactionPin: true } as UserData,
        });
      } else toast.error(res.message);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  if (stage === "success")
    return (
      <div className="relative flex flex-col items-center gap-8 rounded-[20px] py-6 px-4 md:py-8 md:px-8 bg-[#232324] w-full max-w-[564px]">
        <div className="flex items-center justify-between gap-4 w-full">
          <FaArrowLeft
            width={14}
            fill="#FFFFFF99"
            className="cursor-pointer"
            onClick={back}
          />
          <h2 className={`${anton.className} text-base/[150%] tracking-[2px]`}>
            Pin created successfully
          </h2>

          <span />
        </div>

        <p className="text-sm/6 tracking-[1px]">
          You are all set. Your transactions are now protected
        </p>

        <button
          onClick={() => {
            setOtp(otps.otp);
            back();
          }}
          className="h-[50px] max-w-[301px] w-full py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]"
        >
          Continue transaction
        </button>
      </div>
    );

  if (stage === "confirm-otp")
    return (
      <div className="relative flex flex-col items-center gap-8 rounded-[20px] py-6 px-4 md:py-8 md:px-8 bg-[#232324] w-full max-w-[564px]">
        <div className="flex items-center justify-between gap-4 w-full">
          <FaArrowLeft
            width={14}
            fill="#FFFFFF99"
            className="cursor-pointer"
            onClick={back}
          />
          <div className="flex flex-col items-center gap-3">
            <h2
              className={`${anton.className} text-base/[150%] tracking-[2px]`}
            >
              Confirm your pin
            </h2>
            <p className="text-sm/6 trakcing-[1px]">
              Re-enter your pin to confirm
            </p>
          </div>
          <span />
        </div>

        <div className="flex gap-2 xs:gap-4">
          {valueItemsConfirmOtp.map((digit, i) => (
            <input
              key={i}
              value={digit}
              onChange={(e) => handleConfirmOTPChange(e, i)}
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              required
              maxLength={1}
              onKeyDown={(e) => {
                const target = e.target as HTMLInputElement;

                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  return focusToNextInput(target);
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  return focusToPrevInput(target);
                }

                const val = target.value;

                target.setSelectionRange(0, val.length);

                if (e.key !== "Backspace" || val !== "") return;

                focusToPrevInput(target);
              }}
              onFocus={(e) => {
                const prevInputEl = e.target
                  .previousElementSibling as HTMLInputElement | null;

                if (prevInputEl && prevInputEl.value === "") {
                  return prevInputEl.focus();
                }

                e.target.setSelectionRange(0, e.target.value.length);
              }}
              className={`size-12 caret-[#B39FF0] text-center flex items-center justify-center text-base rounded-[10px] leading-6 tracking-[1px] outline-0 ring-0 ${
                isError
                  ? "text-white border-[#FB736EB2] border bg-[#FB736E1A] focus:bg-white/20 focus:text-white focus:border-0"
                  : digit
                  ? "text-[#FFFFFF99] bg-[#F4E90E1A] border border-[#F4E90EB2] focus:bg-white/20 focus:text-white focus:border-0"
                  : "bg-white/20 text-white"
              }`}
            />
          ))}
        </div>

        <button
          disabled={otps.confirmOtp.length < 4}
          onClick={() => {
            if (otps.otp === otps.confirmOtp) handleSetTransactionPin();
            else toast.error("Make sure pins are the same");
          }}
          className="h-[50px] max-w-[301px] w-full py-3 px-4 flex items-center justify-center rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]"
        >
          {isPending ? <Loader /> : "Continue"}
        </button>
      </div>
    );

  return (
    <div className="relative flex flex-col items-center gap-8 rounded-[20px] py-6 px-4 md:py-8 md:px-8 bg-[#232324] w-full max-w-[564px]">
      <div className="flex items-center justify-between gap-4 w-full">
        <FaArrowLeft
          width={14}
          fill="#FFFFFF99"
          className="cursor-pointer"
          onClick={back}
        />
        <div className="flex flex-col items-center gap-3">
          <h2 className={`${anton.className} text-base/[150%] tracking-[2px]`}>
            Set your transaction pin
          </h2>
          <p className="text-sm/6 trakcing-[1px]">
            Choose a pin you&apos;ll remember
          </p>
        </div>
        <span />
      </div>

      <div className="flex gap-2 xs:gap-4">
        {valueItems.map((digit, i) => (
          <input
            key={i}
            value={digit}
            onChange={(e) => handleOTPChange(e, i)}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{1}"
            required
            maxLength={1}
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;

              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                return focusToNextInput(target);
              }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                return focusToPrevInput(target);
              }

              const val = target.value;

              target.setSelectionRange(0, val.length);

              if (e.key !== "Backspace" || val !== "") return;

              focusToPrevInput(target);
            }}
            onFocus={(e) => {
              const prevInputEl = e.target
                .previousElementSibling as HTMLInputElement | null;

              if (prevInputEl && prevInputEl.value === "") {
                return prevInputEl.focus();
              }

              e.target.setSelectionRange(0, e.target.value.length);
            }}
            className={`size-12 caret-[#B39FF0] text-center flex items-center justify-center text-base rounded-[10px] leading-6 tracking-[1px] outline-0 ring-0 bg-white/20 text-white`}
          />
        ))}
      </div>

      <button
        disabled={otps.otp.length < 4}
        onClick={() => {
          setStage("confirm-otp");
        }}
        className="h-[50px] max-w-[301px] w-full py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]"
      >
        Continue
      </button>
    </div>
  );
}
