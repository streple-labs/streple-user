import { anton } from "@/app/fonts";
import Loader from "@/component/ui/loader";
import { RE_DIGIT } from "@/utils/constants";
import { focusToNextInput, focusToPrevInput } from "@/utils/utils";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function Otp({
  otp,
  setOtp,
  back,
  loading,
  handleMakeTransaction,
}: {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  back: () => void;
  loading: boolean;
  handleMakeTransaction: () => void;
}) {
  const valueItems = useMemo(() => {
    const valueArray = otp.split("");
    const items: Array<string> = [];

    for (let i = 0; i < 4; i++) {
      items.push(RE_DIGIT.test(valueArray[i]) ? valueArray[i] : "");
    }

    return items;
  }, [otp]);

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
    } else if (targetValueLength === 4) {
      setOtp(targetValue);

      target.blur();
    }
  };

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
          Enter your transaction pin
        </h2>

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
        disabled={loading}
        onClick={handleMakeTransaction}
        className="h-[50px] max-w-[301px] w-full py-3 px-4 flex items-center justify-center rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]"
      >
        {loading ? <Loader /> : "Continue"}
      </button>
    </div>
  );
}
