"use client";

import { useState } from "react";
import { anton } from "../fonts";

export default function Onboarding() {
  const [onboardingData, setOnboardingData] = useState({
    familiarity: "",
    needs: "",
  });

  const [step, setStep] = useState(1);
  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="size-full h-screen bg-[url('../../public/success-bg.png')] bg-center bg-cover bg-no-repeat flex items-center justify-center p-[5%]">
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
                onboardingData.familiarity === "Beginner"
                  ? "bg-[#F4E90E1A] border shadow-sm"
                  : "bg-[#242324]"
              }`}
              onClick={() => {
                setOnboardingData({
                  ...onboardingData,
                  familiarity: "Beginner",
                });
              }}
            >
              I&apos;m completely new
            </button>
            <button
              className={`h-[60px] text-white/70 md:h-[82px] w-full text-base border-[#F4E90EB2] py-5 px-3 md:px-6 rounded-[10px] md:rounded-[20px] gap-4 leading-6 tracking-[1px] text-left outline-0 ring-0 ${
                onboardingData.familiarity === "Intermediate"
                  ? "bg-[#F4E90E1A] border shadow-sm"
                  : "bg-[#242324]"
              }`}
              onClick={() => {
                setOnboardingData({
                  ...onboardingData,
                  familiarity: "Intermediate",
                });
              }}
            >
              I&apos;ve traded a bit
            </button>
            <button
              className={`h-[60px] text-white/70 md:h-[82px] w-full text-base border-[#F4E90EB2] py-5 px-3 md:px-6 rounded-[10px] md:rounded-[20px] gap-4 leading-6 tracking-[1px] text-left outline-0 ring-0 ${
                onboardingData.familiarity === "Advanced"
                  ? "bg-[#F4E90E1A] border shadow-sm"
                  : "bg-[#242324]"
              }`}
              onClick={() => {
                setOnboardingData({
                  ...onboardingData,
                  familiarity: "Advanced",
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
                onboardingData.needs === "learn and trade"
                  ? "bg-[#F4E90E1A] border shadow-sm"
                  : "bg-[#242324]"
              }`}
              onClick={() => {
                setOnboardingData({
                  ...onboardingData,
                  needs: "learn and trade",
                });
              }}
            >
              I want to actively learn while trading?
            </button>
            <button
              className={`h-[60px] text-white/70 md:h-[82px] w-full text-base border-[#F4E90EB2] py-5 px-3 md:px-6 rounded-[10px] md:rounded-[20px] gap-4 leading-6 tracking-[1px] text-left outline-0 ring-0 ${
                onboardingData.needs === "automated trades"
                  ? "bg-[#F4E90E1A] border shadow-sm"
                  : "bg-[#242324]"
              }`}
              onClick={() => {
                setOnboardingData({
                  ...onboardingData,
                  needs: "automated trades",
                });
              }}
            >
              I want easy, automated trading
            </button>
          </>
        )}

        <div className="flex items-center justify-end gap-4 text-xs font-semibold leading-[150%] tracking-[2px]">
          <button className="text-[#EBF0D5]">skip</button>
          <button
            disabled={step === 1}
            className="rounded-[20px] px-4 py-3 text-[#FBFBEC] bg-[#252426] h-[42px]"
            onClick={prevStep}
          >
            Previous
          </button>
          <button
            disabled={step === 1 && !onboardingData.familiarity}
            className="rounded-[20px] px-4 py-3 h-[42px] font-bold text-[#2C2C26] bg-[#B39FF0]"
            onClick={() => {
              if (step === 1) nextStep();
              else if (step === 2)
                console.log("Onboarding data:", onboardingData);
            }}
          >
            {step === 2 ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
