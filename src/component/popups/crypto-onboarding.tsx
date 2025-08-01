"use client";

import { useEffect, useState } from "react";
import Banner from "../ui/banner";
import Modal from "../ui/modal";
import Image from "next/image";

type Stages = "welcome" | "onboarding" | "lesson" | "awards";

export default function CryptoOnboarding() {
  const [start, setStart] = useState(false);
  const [stage, setStage] = useState<Stages>("welcome");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const returnStageComponent = () => {
    if (stage === "welcome") return <Welcome setStage={setStage} />;
    if (stage === "onboarding") return <Onboarding setStage={setStage} />;
    if (stage === "lesson") return <CryptoLesson setStage={setStage} />;
  };

  return (
    <Modal
      isOpen={start}
      onClose={() => {
        setStart(false);
      }}
    >
      {returnStageComponent()}
    </Modal>
  );
}

function Welcome({ setStage }: { setStage: (stage: Stages) => void }) {
  return (
    <div className="relative bg-[url('/learn-bg.jpg')] bg-cover bg-center bg-no-repeat w-5xl rounded-[29px] overflow-hidden">
      <div className="absolute size-full bg-[#141314] opacity-95" />

      <div className="relative flex items-center justify-center flex-col gap-10 p-10 w-fit mx-auto">
        <div className="flex items-center flex-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/mascot-3.png"}
            alt="welcome mascot"
            width={217}
            height={215}
            className="-mb-[60px]"
          />
          <Banner label="Welcome to Streple Academy" size="big" />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-2xl leading-[150%] tracking-[2px] text-white/80">
          <p className="text-shadow-2xs text-shadow-[#8066CF80]">
            Every hero starts from somewhere...
          </p>
          <p className="text-shadow-2xs text-shadow-[#8066CF80]">
            And so to begin, let&apos;s know your place in the crypto market
          </p>
        </div>

        <div className="flex justify-end w-full pr-8">
          <button
            onClick={() => setStage("onboarding")}
            className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-[138px]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function Onboarding({ setStage }: { setStage: (stage: Stages) => void }) {
  const [formData, setFormData] = useState({
    familiarity_with_crypto: "",
    reason_for_learning: "",
    dedicated_time_to_learn: "",
  });

  const [step, setStep] = useState(1);
  const Next = () => {
    if (step === 3) setStage("lesson");
    else setStep(step + 1);
  };
  const Back = () => {
    if (step === 1) setStage("welcome");
    else setStep(step - 1);
  };

  return (
    <div className="relative bg-[#141314] w-5xl rounded-[29px] p-8">
      <div className="flex items-center justify-center flex-col gap-16 max-w-3xl mx-auto h-full">
        <div className="w-full h-[36px] bg-[#F9F8F9] rounded-[46px]">
          <div
            className="h-[38px] bg-[#503C8B] rounded-full flex items-center -m-px"
            style={{
              width: `${(step - 1) * ((1 / 3) * 100)}%`,
            }}
          >
            <div className="h-2.5 w-full mx-7 rounded-full bg-blend-overlay bg-gradient-to-br from-white/45 from-[30.58%] to-[#fbfafd22] to-[70.32%]" />
          </div>
        </div>
        <div className="space-y-10 w-full">
          {step === 1 && (
            <>
              <p className="text-shadow-2xs text-shadow-[#8066CF80] text-2xl font-semibold leading-[150%] tracking-[2px] text-white/60">
                How familiar are you with crypto?
              </p>
              <div className="space-y-8 w-full">
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.familiarity_with_crypto === "new"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      familiarity_with_crypto: "new",
                    }));
                  }}
                >
                  <Image
                    src={"/bitcoin-q1.png"}
                    alt="question 1 icon"
                    width={30}
                    height={30}
                  />
                  I&apos;m totally new to it
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.familiarity_with_crypto === "beginner"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      familiarity_with_crypto: "beginner",
                    }));
                  }}
                >
                  <Image
                    src={"/money-q1.png"}
                    alt="question 1 icon"
                    width={30}
                    height={30}
                  />
                  I know a little, but not enough to trade
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.familiarity_with_crypto === "intermediate"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      familiarity_with_crypto: "intermediate",
                    }));
                  }}
                >
                  <Image
                    src={"/coin-q1.png"}
                    alt="question 1 icon"
                    width={30}
                    height={30}
                  />
                  I understand crypto but what to go deeper
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-shadow-2xs text-shadow-[#8066CF80] text-2xl font-semibold leading-[150%] tracking-[2px] text-white/60">
                What is your main reason for learning crypto?
              </p>
              <div className="space-y-8 w-full">
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.reason_for_learning === "build_wealth"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      reason_for_learning: "build_wealth",
                    }));
                  }}
                >
                  <Image
                    src={"/crystal-q2.png"}
                    alt="question 2 icon"
                    width={30}
                    height={30}
                  />
                  I want to build digital wealth
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.reason_for_learning === "understand_crypto"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      reason_for_learning: "understand_crypto",
                    }));
                  }}
                >
                  <Image
                    src={"/cube-q2.png"}
                    alt="question 2 icon"
                    width={30}
                    height={30}
                  />
                  I want to understand how crypto really works
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.reason_for_learning === "explore_and_learn"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      reason_for_learning: "explore_and_learn",
                    }));
                  }}
                >
                  <Image
                    src={"/books-q2.png"}
                    alt="question 2 icon"
                    width={30}
                    height={30}
                  />
                  I just want to explore and learn something new
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <p className="text-shadow-2xs text-shadow-[#8066CF80] text-2xl font-semibold leading-[150%] tracking-[2px] text-white/60">
                How familiar are you with crypto?
              </p>
              <div className="space-y-8 w-full">
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.dedicated_time_to_learn === "10mins"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      dedicated_time_to_learn: "10mins",
                    }));
                  }}
                >
                  10 - 20 minutes daily
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.dedicated_time_to_learn === "30mins"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      dedicated_time_to_learn: "30mins",
                    }));
                  }}
                >
                  30 minutes daily
                </button>
                <button
                  className={`w-full rounded-3xl border-[5px] ${
                    formData.dedicated_time_to_learn === "1hr"
                      ? "border-[#A082F9B2] shadow-[0px_5px_0px_0px_#957CE099] bg-[#A082F91A]"
                      : "border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40]"
                  } text-white/50 font-base leading-[150%] tracking-[2px] h-[81px] py-4 px-6 flex items-center gap-4`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      dedicated_time_to_learn: "1hr",
                    }));
                  }}
                >
                  1 hour daily
                </button>
              </div>
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <button onClick={Back} className="text-base font-bold">
            Back
          </button>
          <button
            disabled={
              (step === 1 && !formData.familiarity_with_crypto) ||
              (step === 2 && !formData.reason_for_learning) ||
              (step === 3 && !formData.dedicated_time_to_learn)
            }
            onClick={Next}
            className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-[191px] disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function CryptoLesson({ setStage }: { setStage: (stage: Stages) => void }) {
  const [step, setStep] = useState<"intro" | "course" | "test">("intro");

  return (
    <div className="w-screen h-screen relative bg-[url('/learn-bg.jpg')] bg-cover bg-center bg-no-repeat overflow-y-auto hide-scrollbar">
      <div className="absolute size-full bg-[#141314] opacity-95" />

      {step === "intro" && (
        <div className="size-full flex flex-col justify-center items-center gap-6 relative">
          <div className="flex items-center">
            <Image src={"/mascot-4.png"} alt="" width={231} height={194} />
            <p className="-ml-16 text-2xl leading-8 tracking-[1px] font-semibold">
              Now let&apos;s start with your first lesson
            </p>
          </div>

          <button
            onClick={() => {
              setStep("course");
            }}
            className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-[191px]"
          >
            Begin
          </button>
        </div>
      )}

      {step === "course" && (
        <CryptoCourse
          next={() => {
            setStep("test");
          }}
        />
      )}
    </div>
  );
}

function CryptoCourse({ next }: { next: () => void }) {
  const [courseStage, setCourseStage] = useState(1);

  return (
    <div className="size-full flex flex-col gap-16 relative pt-20 max-w-5xl mx-auto">
      <div className="w-full h-[36px] bg-[#F9F8F9] rounded-[46px]">
        <div
          className="h-[38px] bg-[#38373A] rounded-full flex items-center -m-px"
          style={{
            width: `${(courseStage - 1) * (1 * 10)}%`,
          }}
        />
      </div>

      <div className="flex gap-3">
        <Image
          src={"/mascot-4.png"}
          alt=""
          width={100}
          height={83}
          className="w-[100px] h-[83px]"
        />
        <div className="flex flex-col gap-16 w-full">
          <div className="w-full border-[5px] border-[#5E5C6680] shadow-[0px_5px_0px_0px_#473E3E40] py-6 px-10 rounded-[20px] flex flex-col gap-6 font-semibold text-2xl leading-10 text-white/70">
            {courseStage === 1 && (
              <p>
                Cryptocurrency is a digital form of money. You can&apos;t touch
                it or put it in your wallet like naira or dollars, but it lives
                online and can be used to buy things, send money, or invest.
                Unlike traditional money, no one person or government controls
                crypto. It&apos;s built on blockchain, a public, secure system
                that records every transaction.
              </p>
            )}
            {courseStage === 2 && (
              <>
                <p>Examples</p>
                <div className="mt-4 flex gap-12">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-6">
                      <Image
                        src={`/bitcoin-${i + 1}.png`}
                        alt="example image"
                        width={40}
                        height={40}
                      />
                      <p>Bitcoin</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            {courseStage === 3 && (
              <p>
                Why Do People Care About Crypto? <br />
                Global access: Anyone with internet can use it. <br />
                Privacy: No need to give all your info to banks. <br />
                Fast & cheap transfers: You can send money across borders in
                seconds. <br />
                Investment opportunity: Many people buy and hold crypto like
                assets.
              </p>
            )}
            {courseStage === 4 && (
              <>
                <p>
                  A blockchain is like a digital notebook that stores every
                  crypto transaction ever made. Once something is written, it
                  can&apos;t be erased or changed.
                </p>
                <p>
                  Each &quot;block&quot; contains: <br />
                  A list of transactions
                  <br />
                  A timestamp <br />A security key
                </p>
              </>
            )}
          </div>
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => {
                setCourseStage((prev) => prev - 1);
              }}
              className={`${
                courseStage <= 1 && "invisible"
              } text-[#B7B7AF] text-base font-bold flex items-center justify-center border-[2px] border-[#B7B7AF80] rounded-[10px] h-[60px] w-[191px]`}
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (courseStage === 4) next();
                else setCourseStage((prev) => prev + 1);
              }}
              className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-[191px]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CryptoTest({ setStage }: { setStage: (stage: Stages) => void }) {
  return null;
}
