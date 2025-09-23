"use client";

import { anton, baloo } from "@/app/fonts";
import Lightning from "@/assets/svg/purple-lightning";
import { useAuth } from "@/context/auth-context";
import useSoundEffects from "@/hooks/useSoundEffects";
import { handleCryptoOnboarding } from "@/utils/api/action";
import {
  getRandomQuestions,
  P1L1quizFormQuestions,
} from "@/utils/question-bank";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { GoX } from "react-icons/go";
import { PiThumbsDown, PiThumbsUp } from "react-icons/pi";
import { toast } from "sonner";
import mascot3 from "../../../public/mascot-3.png";
import RayOfLight from "../icons/ray-of-light";
import VideoWrapper from "../icons/video-wrapper";
import Banner from "../ui/banner";
import Modal from "../ui/modal";
// import FrownFace from "../icons/frown-face";
// import SmileyFace from "../icons/smiley-face";
// import BlandFace from "../icons/bland-face";

type Stages = "welcome" | "onboarding" | "lesson" | "awards";

export default function CryptoOnboarding() {
  const { setUser, user } = useAuth();

  const [start, setStart] = useState(false);
  const [stage, setStage] = useState<Stages>("welcome");

  useEffect(() => {
    setStage(
      // (localStorage.getItem("crypto-onboarding-stage") as Stages) ||
      "welcome"
    );
  }, []);

  const close = () => {
    setStart(false);
  };

  const [courseStartTime, setCourseStartTime] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(!user.game_data?.hasAnswer);
    }, 5000);
    return () => clearTimeout(timer);
  }, [user]);

  const [formData, setFormData] = useState({
    firstQuestion: "",
    secondQuestion: "",
    thirdQuestion: "",
    hasAnswer: true,
  });

  const { mutate: handleCompleteCryptoOnboarding } = useMutation({
    mutationKey: ["crypto-onboarding"],
    mutationFn: async () => await handleCryptoOnboarding(formData),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        if (user.user_data)
          setUser({
            ...user,
            user_data: { ...user.user_data, ...formData, hasAnswer: true },
            game_data: {
              phase: 1,
              level: 2,
              totalScore: user.game_data.totalScore + 20,
              hasAnswer: true,
            },
          });
        setStart(false);
        // localStorage.removeItem("crypto-onboarding-stage");
        // localStorage.removeItem("crypto-onboarding-course-stage");
      } else toast.error(res.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const returnStageComponent = useMemo(() => {
    if (stage === "welcome") return <Welcome setStage={setStage} />;
    if (stage === "onboarding")
      return (
        <Onboarding
          setStage={setStage}
          formData={formData}
          setFormData={setFormData}
        />
      );
    if (stage === "lesson")
      return (
        <CryptoLesson
          setCourseStartTime={setCourseStartTime}
          close={close}
          setStage={setStage}
        />
      );
    if (stage === "awards")
      return (
        <Completed
          courseStartTime={courseStartTime}
          close={handleCompleteCryptoOnboarding}
        />
      );
  }, [courseStartTime, formData, handleCompleteCryptoOnboarding, stage]);

  return (
    <Modal
      isOpen={start}
      onClose={() => {
        setStart(false);
      }}
    >
      {returnStageComponent}
    </Modal>
  );
}

function Welcome({ setStage }: { setStage: (stage: Stages) => void }) {
  const { playSound } = useSoundEffects();

  return (
    <div className="relative bg-[url('/learn-bg.jpg')] bg-cover bg-center bg-no-repeat w-full max-md:h-screen md:w-4/5 lg:w-5xl md:rounded-[29px] overflow-hidden">
      <div className="absolute size-full bg-[#141314] opacity-95" />

      <div className="relative flex items-center justify-center flex-col h-full gap-6 md:gap-10 p-4 md:p-10 w-fit mx-auto">
        <div className="flex items-center flex-col">
          <Image
            src={mascot3}
            alt="welcome mascot"
            width={217}
            height={215}
            quality={100}
            className="-mb-[60px] size-auto max-w-[217px] max-h-[215px]"
          />
          <Banner label="Welcome to Streple Academy" size="big" />
        </div>

        <div className="flex flex-col items-center justify-center text-center gap-3 md:gap-4 text-base md:text-2xl leading-[150%] tracking-[2px] text-white/80">
          <p className="text-shadow-2xs text-shadow-[#8066CF80]">
            Every hero starts from somewhere...
          </p>
          <p className="text-shadow-2xs text-shadow-[#8066CF80]">
            And so to begin, let&apos;s know your place in the crypto market
          </p>
        </div>

        <div className="flex justify-center md:justify-end w-full md:pr-8">
          <button
            onClick={() => {
              setStage("onboarding");
              playSound("lesson");
              // localStorage.setItem("crypto-onboarding-stage", "onboarding");
            }}
            className="text-[#181812B2] w-[214px] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function Onboarding({
  setStage,
  formData,
  setFormData,
}: {
  setStage: (stage: Stages) => void;
  formData: {
    firstQuestion: string;
    secondQuestion: string;
    thirdQuestion: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      firstQuestion: string;
      secondQuestion: string;
      thirdQuestion: string;
      hasAnswer: boolean;
    }>
  >;
}) {
  const { playSound } = useSoundEffects();

  const [step, setStep] = useState(1);
  const Next = () => {
    if (step === 3) {
      playSound("lesson");
      // localStorage.setItem("crypto-onboarding-stage", "lesson");
      setStage("lesson");
    } else setStep(step + 1);
  };
  const Back = () => {
    if (step === 1) {
      playSound("lesson");
      // localStorage.setItem("crypto-onboarding-stage", "welcome");
      setStage("welcome");
    } else setStep(step - 1);
  };

  return (
    <div className="relative bg-[#141314] w-full max-md:h-screen md:w-4/5 lg:w-5xl md:rounded-[29px] p-8">
      <div className="flex items-center justify-center flex-col gap-8 sm:gap-12 md:gap-16 max-w-3xl mx-auto h-full">
        <span className="md:hidden w-full">
          <FaChevronLeft onClick={Back} width={12} color="#FFFFFFCC" />
        </span>
        <div className="w-full h-5 md:h-[36px] bg-[#F9F8F9] rounded-[46px]">
          <div
            className="h-[22px] md:h-[38px] bg-[#503C8B] rounded-full flex items-center -my-px"
            style={{
              width: `${(step / 3) * 100}%`,
            }}
          >
            <div className="h-2.5 w-full mx-4 md:mx-7 rounded-full bg-blend-overlay bg-gradient-to-br from-white/45 from-[30.58%] to-[#fbfafd22] to-[70.32%]" />
          </div>
        </div>
        <div className="space-y-6 md:space-y-10 w-full">
          {step === 1 && (
            <>
              <p className="text-shadow-2xs text-shadow-[#8066CF80] text-xl md:text-2xl font-semibold leading-[150%] tracking-[2px] text-white/60">
                How familiar are you with crypto?
              </p>
              <div className="space-y-4 md:space-y-8 w-full">
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.firstQuestion === "new"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      firstQuestion: "new",
                    }));
                  }}
                >
                  <Image
                    src={"/bitcoin-q1.png"}
                    alt="question 1 icon"
                    width={30}
                    height={30}
                    className="size-6 md:size-[30px]"
                  />
                  I&apos;m totally new to it
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.firstQuestion === "beginner"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      firstQuestion: "beginner",
                    }));
                  }}
                >
                  <Image
                    src={"/money-q1.png"}
                    alt="question 1 icon"
                    width={30}
                    height={30}
                    className="size-6 md:size-[30px]"
                  />
                  I know a little, but not enough to trade
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.firstQuestion === "intermediate"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      firstQuestion: "intermediate",
                    }));
                  }}
                >
                  <Image
                    src={"/coin-q1.png"}
                    alt="question 1 icon"
                    width={30}
                    height={30}
                    className="size-6 md:size-[30px]"
                  />
                  I understand crypto but want to go deeper
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-shadow-2xs text-shadow-[#8066CF80] text-xl md:text-2xl font-semibold leading-[150%] tracking-[2px] text-white/60">
                What is your main reason for learning crypto?
              </p>
              <div className="space-y-8 w-full">
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.secondQuestion === "build_wealth"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      secondQuestion: "build_wealth",
                    }));
                  }}
                >
                  <Image
                    src={"/crystal-q2.png"}
                    alt="question 2 icon"
                    width={30}
                    height={30}
                    className="size-6 md:size-[30px]"
                  />
                  I want to build digital wealth
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.secondQuestion === "understand_crypto"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      secondQuestion: "understand_crypto",
                    }));
                  }}
                >
                  <Image
                    src={"/cube-q2.png"}
                    alt="question 2 icon"
                    width={30}
                    height={30}
                    className="size-6 md:size-[30px]"
                  />
                  I want to understand how crypto really works
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.secondQuestion === "explore_and_learn"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      secondQuestion: "explore_and_learn",
                    }));
                  }}
                >
                  <Image
                    src={"/books-q2.png"}
                    alt="question 2 icon"
                    width={30}
                    height={30}
                    className="size-6 md:size-[30px]"
                  />
                  I just want to explore and learn something new
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <p className="text-shadow-2xs text-shadow-[#8066CF80] text-xl md:text-2xl font-semibold leading-[150%] tracking-[2px] text-white/60">
                How much time a day can you set aside to grow your skills?
              </p>
              <div className="space-y-8 w-full">
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.thirdQuestion === "10mins"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      thirdQuestion: "10mins",
                    }));
                  }}
                >
                  10 - 20 minutes daily
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.thirdQuestion === "30mins"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      thirdQuestion: "30mins",
                    }));
                  }}
                >
                  30 minutes daily
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.thirdQuestion === "1hr"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      thirdQuestion: "1hr",
                    }));
                  }}
                >
                  1 hour daily
                </button>
              </div>
            </>
          )}
        </div>
        <div className="w-full flex flex-wrap gap-4 items-center justify-between">
          <button onClick={Back} className="max-md:hidden text-base font-bold">
            Back
          </button>
          <button
            disabled={
              (step === 1 && !formData.firstQuestion) ||
              (step === 2 && !formData.secondQuestion) ||
              (step === 3 && !formData.thirdQuestion)
            }
            onClick={Next}
            className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-full md:w-[214px] disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

type CourseStages = "intro" | "course" | "test";

function CryptoLesson({
  setStage,
  close,
  setCourseStartTime,
}: {
  setStage: (stage: Stages) => void;
  close: () => void;
  setCourseStartTime: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { playSound } = useSoundEffects();

  const [step, setStep] = useState<CourseStages>(
    // (localStorage.getItem("crypto-onboarding-course-stage") as CourseStages) ||
    "intro"
  );

  useEffect(() => {
    setCourseStartTime(Date.now());
  }, [setCourseStartTime]);

  return (
    <div className="w-screen min-h-screen relative bg-[#141314] overflow-y-auto hide-scrollbar">
      {step === "intro" && (
        <div className="size-full flex flex-col justify-center items-center gap-6 relative p-4">
          <div className="flex items-end md:items-center">
            <Image
              src={"/mascot-4.png"}
              alt=""
              width={231}
              height={194}
              quality={100}
              className="w-[159px] h-[134px] md:w-[231px] md:h-[194px]"
            />
            <p className="-ml-16 text-sm md:text-2xl leading-8 tracking-[1px] font-semibold drop-shadow-[0px_1px_0px] drop-shadow-[#A082F980]">
              Now let&apos;s start with your first lesson
            </p>
          </div>

          <button
            onClick={() => {
              playSound("lesson");
              // localStorage.setItem("crypto-onboarding-course-stage", "course");
              setStep("course");
            }}
            className="text-[#181812B2] w-[214px] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px]"
          >
            Begin
          </button>
        </div>
      )}

      {step === "course" && (
        <CryptoCourse
          next={() => {
            playSound("lesson");
            // localStorage.setItem("crypto-onboarding-course-stage", "test");
            setStep("test");
          }}
          close={close}
        />
      )}

      {step === "test" && (
        <CryptoTest
          review={() => {
            playSound("lesson");
            // localStorage.setItem("crypto-onboarding-course-stage", "course");
            setStep("course");
          }}
          close={close}
          next={() => {
            playSound("reward");
            // localStorage.setItem("crypto-onboarding-stage", "awards");
            setStage("awards");
          }}
        />
      )}
    </div>
  );
}

function CryptoCourse({
  next,
  close,
}: {
  next: () => void;
  close: () => void;
}) {
  const { playSound } = useSoundEffects();

  const [courseStage, setCourseStage] = useState<"welcome" | "course">(
    "welcome"
  );

  return (
    <div className="size-full flex flex-col relative pt-20 px-4">
      {courseStage === "welcome" && (
        <span
          className="absolute top-4 left-4 md:top-20 md:left-20 lg:top-30 lg:left-40 cursor-pointer"
          onClick={close}
        >
          <svg
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-3 md:size-6"
          >
            <path
              d="M25.037 22.865C25.1532 22.9812 25.2453 23.119 25.3081 23.2708C25.371 23.4225 25.4033 23.5851 25.4033 23.7494C25.4033 23.9136 25.371 24.0762 25.3081 24.228C25.2453 24.3797 25.1532 24.5176 25.037 24.6337C24.9209 24.7498 24.783 24.8419 24.6313 24.9048C24.4796 24.9676 24.3169 25 24.1527 25C23.9885 25 23.8258 24.9676 23.6741 24.9048C23.5224 24.8419 23.3845 24.7498 23.2684 24.6337L12.9033 14.2671L2.53827 24.6337C2.30373 24.8682 1.98563 25 1.65395 25C1.32226 25 1.00416 24.8682 0.76962 24.6337C0.535082 24.3992 0.40332 24.0811 0.40332 23.7494C0.40332 23.4177 0.535082 23.0996 0.76962 22.865L11.1362 12.5L0.76962 2.13495C0.535082 1.90041 0.40332 1.58231 0.40332 1.25063C0.40332 0.918939 0.535082 0.600837 0.76962 0.3663C1.00416 0.131762 1.32226 0 1.65395 0C1.98563 0 2.30373 0.131762 2.53827 0.3663L12.9033 10.7329L23.2684 0.3663C23.5029 0.131762 23.821 -6.53833e-09 24.1527 0C24.4844 6.53833e-09 24.8025 0.131762 25.037 0.3663C25.2716 0.600837 25.4033 0.918939 25.4033 1.25063C25.4033 1.58231 25.2716 1.90041 25.037 2.13495L14.6704 12.5L25.037 22.865Z"
              fill="white"
              fillOpacity="0.7"
            />
          </svg>
        </span>
      )}

      {courseStage === "welcome" && (
        <div className="flex flex-col size-full items-center max-md:justify-center gap-10">
          <div className="flex flex-col items-center gap-5">
            <Banner label="PHASE 1 : CALL TO DISCOVERY" />
            <h1
              className={`${anton.className} text-base md:text-2xl text-[#efe73c] drop-shadow-[0px_4px_4px] drop-shadow-[#25251A80]`}
            >
              FROM VILLAGE TO VAULT
            </h1>
          </div>

          <div className="space-y-4 md:space-y-6">
            <p className="text-sm md:text-base leading-8 tracking-[1px] font-semibold drop-shadow-sm drop-shadow-[#A082F966]">
              Many have heard of Bitcoin, few understand it. Your journey starts
              here, from the dusty roads to digital gold
            </p>

            <div className="flex">
              <Image
                src={"/mascot-4.png"}
                alt=""
                width={259}
                height={195}
                className="-ml-30 hidden md:block h-[195px] size-auto"
              />
              <div className="space-y-3 md:space-y-4 md:mt-6">
                <p className="text-base/8 tracking-[1px] font-semibold drop-shadow-sm drop-shadow-[#A082F966]">
                  In this lesson, you will learn :
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <svg
                    width="19"
                    height="11"
                    viewBox="0 0 19 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.18359 10.2642V1.58252L16.9854 6.45459L1.18359 10.2642Z"
                      fill="#F4E90E"
                      stroke="#605F44"
                    />
                  </svg>

                  <p className="text-[14px]/8 tracking-[1px] font-semibold text-white/80">
                    What is Crypto
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    width="19"
                    height="11"
                    viewBox="0 0 19 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.18359 10.2642V1.58252L16.9854 6.45459L1.18359 10.2642Z"
                      fill="#F4E90E"
                      stroke="#605F44"
                    />
                  </svg>

                  <p className="text-[14px]/8 tracking-[1px] font-semibold text-white/80">
                    Understanding wallets
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    width="19"
                    height="11"
                    viewBox="0 0 19 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.18359 10.2642V1.58252L16.9854 6.45459L1.18359 10.2642Z"
                      fill="#F4E90E"
                      stroke="#605F44"
                    />
                  </svg>

                  <p className="text-[14px]/8 tracking-[1px] font-semibold text-white/80">
                    Crypto in the market
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playSound("lesson");
              setCourseStage("course");
            }}
            className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-[191px]"
          >
            Begin
          </button>
        </div>
      )}

      {courseStage === "course" && (
        <>
          <div className="flex items-center justify-center gap-4 md:gap-10 w-full max-w-5xl mx-auto relative">
            <span className="cursor-pointer" onClick={close}>
              <svg
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-3 md:size-6"
              >
                <path
                  d="M25.037 22.865C25.1532 22.9812 25.2453 23.119 25.3081 23.2708C25.371 23.4225 25.4033 23.5851 25.4033 23.7494C25.4033 23.9136 25.371 24.0762 25.3081 24.228C25.2453 24.3797 25.1532 24.5176 25.037 24.6337C24.9209 24.7498 24.783 24.8419 24.6313 24.9048C24.4796 24.9676 24.3169 25 24.1527 25C23.9885 25 23.8258 24.9676 23.6741 24.9048C23.5224 24.8419 23.3845 24.7498 23.2684 24.6337L12.9033 14.2671L2.53827 24.6337C2.30373 24.8682 1.98563 25 1.65395 25C1.32226 25 1.00416 24.8682 0.76962 24.6337C0.535082 24.3992 0.40332 24.0811 0.40332 23.7494C0.40332 23.4177 0.535082 23.0996 0.76962 22.865L11.1362 12.5L0.76962 2.13495C0.535082 1.90041 0.40332 1.58231 0.40332 1.25063C0.40332 0.918939 0.535082 0.600837 0.76962 0.3663C1.00416 0.131762 1.32226 0 1.65395 0C1.98563 0 2.30373 0.131762 2.53827 0.3663L12.9033 10.7329L23.2684 0.3663C23.5029 0.131762 23.821 -6.53833e-09 24.1527 0C24.4844 6.53833e-09 24.8025 0.131762 25.037 0.3663C25.2716 0.600837 25.4033 0.918939 25.4033 1.25063C25.4033 1.58231 25.2716 1.90041 25.037 2.13495L14.6704 12.5L25.037 22.865Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
            </span>

            <div className="w-full h-5 md:h-[36px] bg-[#F9F8F9] rounded-[46px]">
              <div
                className="h-[22px] md:h-[38px] bg-[#503C8B] rounded-full flex items-center -my-px"
                style={{
                  width: `40%`,
                }}
              >
                <div className="h-2.5 w-full mx-4 md:mx-7 rounded-full bg-blend-overlay bg-gradient-to-br from-white/45 from-[30.58%] to-[#fbfafd22] to-[70.32%]" />
              </div>
            </div>

            <div className="flex items-center shrink-0 gap-3">
              <Lightning />
              <p className="text-base md:text-2xl/6 font-semibold text-white/80">
                5XP
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-10 w-full max-w-5xl mx-auto">
            <div className="relative flex items-center justify-center w-full aspect-video">
              <VideoWrapper className="absolute size-full" />

              <video
                className="size-full max-md:mt-6 md:size-[80%] object-cover relative rounded-2xl"
                controls
                autoPlay
                playsInline
                preload="metadata"
              >
                <source
                  src="https://streplestorage.s3.eu-north-1.amazonaws.com/videos/streple-digital-ownership.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            <button
              onClick={next}
              className="text-[#181812B2] relative text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-[191px]"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function CryptoTest({
  review,
  next,
  close,
}: {
  next: () => void;
  review: () => void;
  close: () => void;
}) {
  const { playSound } = useSoundEffects();

  const [courseStage, setCourseStage] = useState(5);
  const [timer, setTimer] = useState(40);

  useEffect(() => {
    setTimer(40);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 1;
        else setQuizResults((prev) => ({ ...prev, [courseStage - 6]: false }));
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [courseStage]);

  const [quizForm, setQuizForm] = useState<Record<number, number | null>>({
    0: null,
    1: null,
    2: null,
  });
  const [quizResults, setQuizResults] = useState<
    Record<number, boolean | null>
  >({
    0: null,
    1: null,
    2: null,
  });

  const [quizFormQuestions] = useState(() =>
    getRandomQuestions(P1L1quizFormQuestions, 3)
  );

  return (
    <div className="size-full min-h-screen flex flex-col gap-4 sm:gap-8 md:gap-16 relative pt-20">
      <span className="md:hidden w-full px-4">
        <GoX onClick={close} width={12} color="#FFFFFFCC" />
      </span>

      <div className="flex items-center justify-center gap-4 md:gap-10 w-full max-w-5xl mx-auto p-4">
        <span className="max-md:hidden cursor-pointer" onClick={close}>
          <svg
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-3 md:size-6"
          >
            <path
              d="M25.037 22.865C25.1532 22.9812 25.2453 23.119 25.3081 23.2708C25.371 23.4225 25.4033 23.5851 25.4033 23.7494C25.4033 23.9136 25.371 24.0762 25.3081 24.228C25.2453 24.3797 25.1532 24.5176 25.037 24.6337C24.9209 24.7498 24.783 24.8419 24.6313 24.9048C24.4796 24.9676 24.3169 25 24.1527 25C23.9885 25 23.8258 24.9676 23.6741 24.9048C23.5224 24.8419 23.3845 24.7498 23.2684 24.6337L12.9033 14.2671L2.53827 24.6337C2.30373 24.8682 1.98563 25 1.65395 25C1.32226 25 1.00416 24.8682 0.76962 24.6337C0.535082 24.3992 0.40332 24.0811 0.40332 23.7494C0.40332 23.4177 0.535082 23.0996 0.76962 22.865L11.1362 12.5L0.76962 2.13495C0.535082 1.90041 0.40332 1.58231 0.40332 1.25063C0.40332 0.918939 0.535082 0.600837 0.76962 0.3663C1.00416 0.131762 1.32226 0 1.65395 0C1.98563 0 2.30373 0.131762 2.53827 0.3663L12.9033 10.7329L23.2684 0.3663C23.5029 0.131762 23.821 -6.53833e-09 24.1527 0C24.4844 6.53833e-09 24.8025 0.131762 25.037 0.3663C25.2716 0.600837 25.4033 0.918939 25.4033 1.25063C25.4033 1.58231 25.2716 1.90041 25.037 2.13495L14.6704 12.5L25.037 22.865Z"
              fill="white"
              fillOpacity="0.7"
            />
          </svg>
        </span>

        <div className="w-full h-5 md:h-[36px] bg-[#F9F8F9] rounded-[46px]">
          <div
            className="h-[22px] md:h-[38px] bg-[#503C8B] rounded-full flex items-center -my-px"
            style={{
              width: `${(courseStage / 8) * 100}%`,
            }}
          >
            <div className="h-2.5 w-full mx-4 md:mx-7 rounded-full bg-blend-overlay bg-gradient-to-br from-white/45 from-[30.58%] to-[#fbfafd22] to-[70.32%]" />
          </div>
        </div>

        <div className="flex items-center shrink-0 gap-3">
          <Lightning />
          <p className="text-base md:text-2xl/6 font-semibold text-white/80">
            15XP
          </p>
        </div>
      </div>

      {courseStage === 5 && (
        <div className="size-full flex flex-col justify-center items-center gap-10 md:gap-20 lg:gap-40 relative p-4">
          <div className="flex items-end md:items-center">
            <Image
              src={"/mascot-4.png"}
              alt=""
              width={231}
              height={194}
              quality={100}
              className="w-[159px] h-[134px] md:w-[231px] md:h-[194px]"
            />
            <p className="-ml-20 text-sm md:text-2xl leading-8 tracking-[1px] font-semibold drop-shadow-[0px_1px_0px] drop-shadow-[#A082F980]">
              Now let&apos;s answer some questions
            </p>
          </div>

          <div className="w-full flex gap-4 items-center justify-between max-w-4xl">
            <button
              onClick={review}
              className={`max-md:hidden text-[#B7B7AF] text-base font-bold flex items-center justify-center border-[2px] border-[#B7B7AF80] rounded-[10px] h-[60px] w-[191px]`}
            >
              Review
            </button>

            <button
              onClick={() => {
                playSound("lesson");
                setCourseStage((prev) => prev + 1);
              }}
              className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[15px] md:rounded-[10px] h-[60px] w-full md:w-[214px]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {courseStage >= 6 && (
        <div className="size-full flex flex-col items-center">
          <div className="flex flex-col  gap-4 md:gap-10 w-full max-w-4xl p-4">
            <div className="flex items-center gap-2 md:gap-3">
              <Image
                src={"/mascot-4.png"}
                alt=""
                width={100}
                height={83}
                quality={100}
                className="w-[65px] h-[60px] md:w-[100px] md:h-[83px]"
              />
              <h4 className="text-sm xs:text-base sm:text-xl md:text-2xl leading-[150%] tracking-[2px] font-semibold drop-shadow-[#8066CF80] drop-shadow-xs">
                {quizFormQuestions[courseStage - 6].question}
              </h4>

              <div
                className={`md:hidden size-10 rounded-full relative shrink-0 flex items-center justify-center text-sm ${baloo.className}`}
              >
                <svg
                  className="absolute inset-0 w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#A082F9"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${
                      ((40 - timer) / 40) * 100 * 2.827
                    } 282.7`}
                    className="transition-all duration-1000 ease-linear"
                    style={{
                      filter: `drop-shadow(0 0 8px '#19171D')`,
                    }}
                  />
                </svg>

                {timer}
              </div>
            </div>
            <div className="lg:ml-[100px] space-y-4 md:space-y-8 w-full">
              {quizFormQuestions[courseStage - 6].options.map((option, i) => (
                <button
                  key={i}
                  disabled={quizResults[courseStage - 6] !== null}
                  className={`w-full rounded-3xl border-[5px] ${
                    quizForm[courseStage - 6] == i
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : quizForm[courseStage - 6] === i &&
                        quizResults[courseStage - 6] === true
                      ? "border-[#009632B2] shadow-[0px_5px_0px_0px_#00963299] bg-[#0096321A]"
                      : quizForm[courseStage - 6] === i &&
                        quizResults[courseStage - 6] === false
                      ? "bg-[#F982821A] border-[#F98282B2] shadow-[0px_5px_0px_0px_#F9828299]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] text-start py-4 px-6 flex items-center gap-4 disabled:opacity-100!`}
                  onClick={() => {
                    setQuizForm((prev) => ({
                      ...prev,
                      [courseStage - 6]: i,
                    }));
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {quizResults[courseStage - 6] === null && (
              <button
                onClick={() => {
                  setQuizResults((prev) => ({
                    ...prev,
                    [courseStage - 6]:
                      quizForm[courseStage - 6] ===
                      quizFormQuestions[courseStage - 6].answer,
                  }));
                }}
                disabled={quizForm[courseStage - 6] === null}
                className={`${
                  quizForm[courseStage - 6] === null && "grayscale-100"
                } text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[15px] h-[55px] w-full md:w-[214px]`}
              >
                Check
              </button>
            )}
          </div>

          {quizResults[courseStage - 6] !== null && (
            <div className="mt-auto w-full bg-[#1F1E22] py-4 md:py-10 p-4">
              <div className="w-full max-w-4xl flex flex-col gap-4 mx-auto">
                <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center">
                  <button
                    className={`${
                      quizResults[courseStage - 6] === true
                        ? "text-[#009632] border-[#009632]"
                        : quizResults[courseStage - 6] === false
                        ? "text-[#F98282] border-[#F98282]"
                        : "text-[#B7B7AF] border-[#B7B7AF80]"
                    } text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer p-1 rounded-[10px] h-[60px]`}
                  >
                    {quizResults[courseStage - 6] === true && (
                      <PiThumbsUp color="#06C330" width={21} />
                    )}
                    {quizResults[courseStage - 6] === false && (
                      <PiThumbsDown color="#F98282" width={21} />
                    )}
                    {quizResults[courseStage - 6] !== null
                      ? `${
                          quizResults[courseStage - 6] ? "Correct" : "Incorrect"
                        }`
                      : `00:${timer}`}
                  </button>

                  <p className="text-base md:hidden font-semibold">
                    {quizFormQuestions[courseStage - 6].info}
                  </p>

                  <button
                    onClick={() => {
                      if (courseStage === 8) next();
                      else setCourseStage((prev) => prev + 1);
                    }}
                    className={`${
                      quizResults[courseStage - 6] === true
                        ? "text-[#181812B2] bg-[#009632]"
                        : quizResults[courseStage - 6] === false
                        ? "text-[#000000B2] bg-[#F98282]"
                        : "text-[#F1F0DFB2] bg-[#414139]"
                    } text-base font-bold flex items-center justify-center rounded-[10px] h-[60px] w-full md:w-[214px]`}
                  >
                    Next
                  </button>
                </div>

                <p className="max-md:hidden text-xl font-semibold">
                  {quizFormQuestions[courseStage - 6].info}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Completed({
  close,
  courseStartTime,
}: {
  close: () => void;
  courseStartTime: number;
}) {
  const { playSound } = useSoundEffects();

  const [step, setStep] = useState(1);
  const next = () => {
    if (step === 2) {
      playSound("level_complete");
      close();
    } else setStep((prev) => prev + 1);
  };

  const elapsedTime = useMemo(() => {
    if (!courseStartTime) return "0:00";
    const elapsedMs = Date.now() - courseStartTime;
    const minutes = Math.floor(elapsedMs / (1000 * 60));
    const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);

    if (minutes === 0) return `${seconds}s`;
    else return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, [courseStartTime]);

  // const [review, setReview] = useState<"clear" | "okay" | "confusing" | null>(
  //   null
  // );

  return (
    <div className="w-screen h-screen relative bg-[#141314] overflow-y-auto hide-scrollbar">
      <Image
        src={"/spotlight.png"}
        alt="spotlight"
        width={640}
        height={385.13}
        quality={100}
        className="size-auto absolute left-1/2 -translate-x-1/2"
      />

      <div className="size-full flex flex-col items-center justify-center gap-4 md:gap-10 lg:gap-20 p-4 relative">
        {step === 1 && (
          <div className="flex flex-col items-center">
            <Image src={"/mascot-5.png"} alt="" width={351} height={271} />
            <div className="gap-6 flex items-center justify-center flex-col">
              <h2 className="text-2xl md:text-4xl font-bold text-[#EEE311] max-w-[550px] h-16 md:h-20 text-center">
                Brilliant work, Crypto Hero!
              </h2>
              <p className="-mt-4 text-sm md:text-base text-[#939389]">
                You are 30% closer to unlocking your Crypto Initiate badge
              </p>

              <div className="flex gap-4 md:gap-9">
                <div className="bg-[#24222A99] rounded-[10px] py-5 px-7 flex items-center flex-col justify-center gap-2">
                  <Image
                    src={"/target.png"}
                    alt="target"
                    width={50}
                    height={50}
                    className="size-[30px] md:size-[50px]"
                  />
                  <p className="text-xs md:text-base leading-8 tracking-[1px] text-white/80">
                    30 %
                  </p>
                </div>
                <div className="bg-[#24222A99] rounded-[10px] py-5 px-7 flex items-center flex-col justify-center gap-2">
                  <Image
                    src={"/time-streak.png"}
                    alt="time taken"
                    width={50}
                    height={50}
                    className="size-[30px] md:size-[50px]"
                  />
                  <p className="textxs md:text-base leading-8 tracking-[1px] text-white/80">
                    {elapsedTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {step === 2 && (
          <div className="flex items-center justify-center flex-col gap-20">
            <h2 className="text-4xl font-bold text-[#EEE311]">
              2 daily quests completed
            </h2>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <Image src={"/book.png"} alt="book" width={50} height={50} />
                <div className="py-[32px] px-10 rounded-[15px] border border-white/70 relative overflow-hidden">
                  <span className="absolute left-0 top-0">
                    <Image
                      src={"/blur-eclipse.png"}
                      alt=""
                      width={211}
                      height={86}
                    />
                  </span>
                  <p className="font-extrabold text-xl text-white">
                    Complete one lesson in a day
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <Image
                  src={"/lightling.png"}
                  alt="book"
                  width={50}
                  height={50}
                />
                <div className="py-[32px] px-10 rounded-[15px] border border-white/70 relative overflow-hidden">
                  <span className="absolute left-0 top-0">
                    <Image
                      src={"/blur-eclipse.png"}
                      alt=""
                      width={211}
                      height={86}
                    />
                  </span>
                  <p className="font-extrabold text-xl text-white">
                    Finish a quiz in under 3 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {step === 2 && (
          <div className="flex items-center justify-center">
            <>
              <RayOfLight className="absolute left-1/2 -translate-x-1/2 top-0 md:-top-4" />
            </>

            <div className="flex items-center justify-center flex-col gap-4 md:gap-6 mb-40 md:mb-30 relative">
              <Image
                src={"/stp-coin.png"}
                alt="stp reward illustration"
                width={210}
                height={210}
                className="relative"
              />
              <p
                className={`${baloo.className} text-[#F4E90E] text-3xl md:text-[36px] relative`}
              >
                +20 STP
              </p>
            </div>
          </div>
        )}

        {/* {step === 3 && (
          <div className="flex flex-col items-center justify-center gap-10">
            <h4
              className={`${baloo.className} text-[#F4E90E] text-[36px] relative drop-shadow-[#25251A80] drop-shadow-[0px_4px_4px]`}
            >
              Quick question
            </h4>

            <p className="font-semibold text-2xl">
              How was this lesson for you?
            </p>

            <div className="flex items-center gap-7">
              <div
                onClick={() => setReview("clear")}
                className={`${
                  review === "clear" ? "bg-[#BDB51033]" : "bg-[#24222A99]"
                } w-[93px] h-[96px] cursor-pointer rounded-[10px] flex flex-col gap-2 items-center justify-center`}
              >
                <SmileyFace />

                <p className="font-semibold text-xs bg-gradient-to-r from-white to-white/30 bg-clip-text text-transparent">
                  Clear
                </p>
              </div>
              <div
                onClick={() => setReview("okay")}
                className={`${
                  review === "okay" ? "bg-[#BDB51033]" : "bg-[#24222A99]"
                } w-[93px] h-[96px] cursor-pointer rounded-[10px] flex flex-col gap-2 items-center justify-center`}
              >
                <BlandFace />

                <p className="font-semibold text-xs bg-gradient-to-r from-white to-white/30 bg-clip-text text-transparent">
                  Okay
                </p>
              </div>
              <div
                onClick={() => setReview("confusing")}
                className={`${
                  review === "confusing" ? "bg-[#BDB51033]" : "bg-[#24222A99]"
                } w-[93px] h-[96px] cursor-pointer rounded-[10px] flex flex-col gap-2 items-center justify-center`}
              >
                <FrownFace />

                <p className="font-semibold text-xs bg-gradient-to-r from-white to-white/30 bg-clip-text text-transparent">
                  Confusing
                </p>
              </div>
            </div>
          </div>
        )} */}

        <div className="w-full flex flex-col-reverse md:flex-row gap-4 items-center justify-between relative max-w-5xl">
          <button className="text-[#32322B] bg-[#F7F6F4] text-base font-bold flex items-center justify-center rounded-[10px] h-[60px] w-full md:w-[214px]">
            Share
          </button>

          <button
            onClick={next}
            className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-full md:w-[214px]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
