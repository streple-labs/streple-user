"use client";

import { anton } from "@/app/fonts";
import { useAuth } from "@/context/auth-context";
import { updateUser } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Onboarding() {
  const { user, setUser } = useAuth();

  const [onboardingData, setOnboardingData] = useState({
    howFamiliarWithTrading: "",
    expectationFromStreple: "",
  });

  const [step, setStep] = useState(1);

  const { mutate: handleUpdateUser } = useMutation({
    mutationKey: ["kyc"],
    mutationFn: async () => await updateUser(onboardingData),
    onSuccess: (res) => {
      if (res.success) {
        if (user.user_data)
          setUser({
            ...user,
            user_data: { ...user.user_data, ...onboardingData },
          });
        toast.success("Welcome to streple");
      } else toast.error(res.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  if (!user.user_data) return null;

  if (
    user.user_data.expectationFromStreple &&
    user.user_data.howFamiliarWithTrading
  )
    return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <div className="size-full h-screen bg-[url('../../public/success-bg.png')] bg-center bg-cover bg-no-repeat flex items-center justify-center p-[5%] relative">
        <div className="flex flex-col gap-8 max-w-[480px] w-full">
          <div className="space-y-3">
            <p className="text-xs leading-4 tracking-[1px] font-normal">
              Step {step}/{Object.entries(onboardingData).length}
            </p>
            <h1
              className={`${anton.className} font-normal text-[21px] sm:text-2xl md:text-3xl lg:text-4xl leading-[150%] tracking-[2px]`}
            >
              Tell us more about yourself
            </h1>
          </div>

          <p className="text-base font-normal leading-6 tracking-[1px] -mb-5">
            How familiar are you with trading?
          </p>
          {step === 1 ? (
            <>
              <button
                className={`h-[60px] md:h-[82px] w-full text-base border-[#F4E90EB2] py-5 px-3 md:px-6 rounded-[10px] md:rounded-[20px] gap-4 leading-6 tracking-[1px] text-left outline-0 ring-0 ${
                  onboardingData.howFamiliarWithTrading === "Beginner"
                    ? "bg-[#F4E90E1A] border shadow-sm"
                    : "bg-[#242324]"
                }`}
                onClick={() => {
                  setOnboardingData({
                    ...onboardingData,
                    howFamiliarWithTrading: "Beginner",
                  });
                }}
              >
                I&apos;m completely new
              </button>
              <button
                className={`h-[60px] text-white/70 md:h-[82px] w-full text-base border-[#F4E90EB2] py-5 px-3 md:px-6 rounded-[10px] md:rounded-[20px] gap-4 leading-6 tracking-[1px] text-left outline-0 ring-0 ${
                  onboardingData.howFamiliarWithTrading === "Intermediate"
                    ? "bg-[#F4E90E1A] border shadow-sm"
                    : "bg-[#242324]"
                }`}
                onClick={() => {
                  setOnboardingData({
                    ...onboardingData,
                    howFamiliarWithTrading: "Intermediate",
                  });
                }}
              >
                I&apos;ve traded a bit
              </button>
              <button
                className={`h-[60px] text-white/70 md:h-[82px] w-full text-base border-[#F4E90EB2] py-5 px-3 md:px-6 rounded-[10px] md:rounded-[20px] gap-4 leading-6 tracking-[1px] text-left outline-0 ring-0 ${
                  onboardingData.howFamiliarWithTrading === "Advanced"
                    ? "bg-[#F4E90E1A] border shadow-sm"
                    : "bg-[#242324]"
                }`}
                onClick={() => {
                  setOnboardingData({
                    ...onboardingData,
                    howFamiliarWithTrading: "Advanced",
                  });
                }}
              >
                I know what I am doing
              </button>
            </>
          ) : (
            <>
              <button
                className={`h-[60px] md:h-[82px] text-white/70 w-full text-base border-[#F4E90EB2] py-5 px-3 md:px-6 rounded-[10px] md:rounded-[20px] gap-4 leading-6 tracking-[1px] text-left outline-0 ring-0 ${
                  onboardingData.expectationFromStreple === "learn and trade"
                    ? "bg-[#F4E90E1A] border shadow-sm"
                    : "bg-[#242324]"
                }`}
                onClick={() => {
                  setOnboardingData({
                    ...onboardingData,
                    expectationFromStreple: "learn and trade",
                  });
                }}
              >
                I want to actively learn while trading?
              </button>
              <button
                className={`h-[60px] text-white/70 md:h-[82px] w-full text-base border-[#F4E90EB2] py-5 px-3 md:px-6 rounded-[10px] md:rounded-[20px] gap-4 leading-6 tracking-[1px] text-left outline-0 ring-0 ${
                  onboardingData.expectationFromStreple === "automated trades"
                    ? "bg-[#F4E90E1A] border shadow-sm"
                    : "bg-[#242324]"
                }`}
                onClick={() => {
                  setOnboardingData({
                    ...onboardingData,
                    expectationFromStreple: "automated trades",
                  });
                }}
              >
                I want easy, automated trading
              </button>
            </>
          )}

          <div className="flex items-center justify-end gap-4 text-xs font-semibold leading-[150%] tracking-[2px]">
            {/* <button className="text-[#EBF0D5]" onClick={nextStep}>
              skip
            </button> */}
            <button
              disabled={step === 1}
              className="rounded-[20px] px-4 py-3 text-[#FBFBEC] bg-[#252426] h-[42px]"
              onClick={() => {
                setStep(step - 1);
              }}
            >
              Previous
            </button>
            <button
              disabled={step === 1 && !onboardingData.howFamiliarWithTrading}
              className="rounded-[20px] px-4 py-3 h-[42px] font-bold text-[#2C2C26] bg-[#B39FF0]"
              onClick={() => {
                if (step === 1) setStep(step + 1);
                else if (step === 2) handleUpdateUser();
              }}
            >
              {step === 2 ? "Finish" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
