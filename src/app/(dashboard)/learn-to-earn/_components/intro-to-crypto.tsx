import { course_data } from "@/assets/gamification-lessons/data";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import Course from "./course";
import Quiz from "./quiz";
import { useMutation } from "@tanstack/react-query";
import { updateUserGameData } from "@/utils/api/action";
import CheckmarkPurpleLarge from "@/component/icons/checkmark-purple-bg-large";

const phase = 1;

export default function IntroToCrypto({ close }: { close: () => void }) {
  const {
    user: { game_data, user_data, assets },
    setUser,
  } = useAuth();

  const [level, setLevel] = useState(1);
  const [stage, setStage] = useState<"course" | "quiz">("course");
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  useEffect(() => {
    setLevel(game_data.phase === phase ? game_data.level : 3);
  }, [game_data.level, game_data.phase]);

  const [stpCollected, setStpCollected] = useState(10);

  const { mutate: handleComplete } = useMutation({
    mutationKey: [`"phase-${phase}-level-${level}-complete`],
    mutationFn: async () => {
      if (game_data.phase === phase && game_data.level === level)
        return await updateUserGameData({
          phase: `Phase ${level === 3 ? phase + 1 : phase}`,
          level: `Level ${level === 3 ? 1 : level + 1}`,
          score: stpCollected,
        });
      else {
        return {
          success: false,
          message:
            "Great job refreshing your knowledge! You've already completed this lesson.",
        };
      }
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success(`Phase ${phase} level ${level} completed`);
        setLevel((prev) => (level === 3 ? 1 : prev + 1));
        setStage("course");
        if (user_data)
          setUser({
            user_data: { ...user_data },
            game_data: {
              phase: level === 3 ? phase + 1 : phase,
              level: level === 3 ? 1 : level + 1,
              totalScore: game_data.totalScore + stpCollected,
              hasAnswer: true,
            },
            assets: { ...assets },
          });
        if (level === 3) setShowSuccessScreen(true);
      } else toast.error(res.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  if (showSuccessScreen)
    return (
      <div className="fixed inset-0 z-50 px-[10%] py-[5%]">
        <div className="absolute inset-0 bg-[#1B191C]" />
        <div className="flex flex-col items-center justify-center gap-10 size-full relative">
          <div className="flex flex-col gap-8 items-center justify-center w-xs">
            <CheckmarkPurpleLarge />
            <div className="flex flex-col gap-[60px] items-center justify-center w-full">
              <div className="w-full text-center space-y-3">
                <h4 className="text-2xl font-extrabold">Course completed</h4>
                <p className="text-xl font-semibold">
                  Well done, you a great job
                </p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="flex items-center gap-3 text-sm/5 tracking-[3%] text-white/80">
                  <span>
                    <svg
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M42.9616 13.2116C38.7508 11.1073 33.1608 9.99414 26.7969 9.99414C20.433 9.99414 14.843 11.1073 10.6322 13.2116C6.42141 15.316 4.04688 18.2776 4.04688 21.3691V31.1191C4.04688 34.2107 6.44781 37.1824 10.6322 39.2766C14.8166 41.3709 20.433 42.4941 26.7969 42.4941C33.1608 42.4941 38.7508 41.381 42.9616 39.2766C47.1723 37.1723 49.5469 34.2107 49.5469 31.1191V21.3691C49.5469 18.2776 47.1459 15.3059 42.9616 13.2116ZM26.7969 13.2441C39.5206 13.2441 46.2969 17.9627 46.2969 21.3691C46.2969 24.7755 39.5206 29.4941 26.7969 29.4941C14.0731 29.4941 7.29688 24.7755 7.29688 21.3691C7.29688 17.9627 14.0731 13.2441 26.7969 13.2441ZM25.1719 32.7157V39.2157C21.3125 39.0898 18.0625 38.521 15.4219 37.6943V31.3324C18.6051 32.1806 21.8783 32.645 25.1719 32.7157ZM28.4219 32.7157C31.7154 32.645 34.9886 32.1806 38.1719 31.3324V37.6923C35.5312 38.519 32.2812 39.0877 28.4219 39.2137V32.7157ZM7.29688 31.1191V27.3674C8.31965 28.2161 9.4392 28.9409 10.6322 29.5266C11.1258 29.7724 11.6478 30.004 12.1719 30.2234V36.4004C8.95641 34.8079 7.29688 32.803 7.29688 31.1191ZM41.4219 36.4004V30.2234C41.952 30.004 42.468 29.7724 42.9616 29.5266C44.1546 28.9409 45.2741 28.2161 46.2969 27.3674V31.1191C46.2969 32.803 44.6373 34.8079 41.4219 36.4004Z"
                        fill="#999311"
                      />
                    </svg>
                  </span>
                  100 STRP
                </p>
                <p className="flex items-center gap-3 text-sm/5 tracking-[3%] text-white/80">
                  <span>
                    <svg
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.7995 4.57739C27.6127 4.57739 28.4144 4.62145 29.2045 4.70956C29.4873 4.74086 29.7612 4.82756 30.0105 4.9647C30.2598 5.10185 30.4797 5.28676 30.6575 5.50888C30.8354 5.731 30.9678 5.98597 31.0471 6.25924C31.1264 6.53252 31.1511 6.81874 31.1198 7.10156C31.0885 7.38438 31.0018 7.65827 30.8647 7.90759C30.7275 8.15691 30.5426 8.37677 30.3205 8.55463C30.0984 8.73248 29.8434 8.86484 29.5701 8.94416C29.2969 9.02348 29.0106 9.04819 28.7278 9.01689C25.1572 8.61746 21.5508 9.33743 18.4073 11.0772C15.2638 12.817 12.7386 15.4907 11.181 18.7283C9.6234 21.966 9.11038 25.6076 9.71291 29.1496C10.3154 32.6916 12.0037 35.9588 14.5442 38.4993C17.0848 41.0398 20.352 42.7281 23.8939 43.3306C27.4359 43.9332 31.0776 43.4201 34.3152 41.8625C37.5529 40.305 40.2265 37.7798 41.9663 34.6363C43.7061 31.4928 44.4261 27.8863 44.0266 24.3157C43.9953 24.0329 44.0201 23.7467 44.0994 23.4734C44.1787 23.2001 44.3111 22.9452 44.4889 22.723C44.8481 22.2745 45.3708 21.9869 45.942 21.9237C46.5132 21.8605 47.0861 22.0268 47.5347 22.386C47.7568 22.5638 47.9417 22.7837 48.0788 23.033C48.216 23.2823 48.3027 23.5562 48.334 23.8391C48.4206 24.6292 48.4647 25.4308 48.4661 26.2441C48.4661 38.2106 38.766 47.9107 26.7995 47.9107C14.833 47.9107 5.13281 38.2106 5.13281 26.2441C5.13281 14.2776 14.833 4.57739 26.7995 4.57739ZM26.7301 17.3109C26.8729 17.8671 26.7891 18.4573 26.497 18.9517C26.2049 19.4462 25.7284 19.8044 25.1723 19.9477C23.6445 20.3479 22.3146 21.2903 21.4306 22.5991C20.5466 23.9078 20.1689 25.4935 20.3682 27.0602C20.5674 28.6269 21.3298 30.0677 22.5132 31.1135C23.6966 32.1594 25.2202 32.7389 26.7995 32.7441C28.241 32.7447 29.6418 32.2661 30.7816 31.3836C31.9213 30.5011 32.7354 29.2648 33.0958 27.8691C33.2494 27.3238 33.6104 26.8604 34.1015 26.5781C34.5925 26.2958 35.1747 26.217 35.7231 26.3587C36.2716 26.5003 36.7427 26.8511 37.0357 27.3359C37.3287 27.8207 37.4201 28.401 37.2905 28.9524C36.6258 31.5002 35.0563 33.719 32.8751 35.1941C30.694 36.6692 28.0504 37.2997 25.4383 36.968C22.8262 36.6362 20.4241 35.3648 18.681 33.3913C16.9378 31.4178 15.9728 28.8772 15.9661 26.2441C15.9658 23.8421 16.7637 21.5081 18.2345 19.609C19.7052 17.71 21.7654 16.3536 24.0911 15.7531C24.3667 15.682 24.6536 15.666 24.9353 15.7058C25.2171 15.7457 25.4883 15.8407 25.7333 15.9853C25.9784 16.13 26.1926 16.3215 26.3636 16.549C26.5346 16.7764 26.6592 17.0353 26.7301 17.3109ZM40.8915 4.85256C41.287 5.01653 41.625 5.29399 41.8629 5.64991C42.1008 6.00584 42.228 6.42427 42.2283 6.85239V10.8174H46.1911C46.6196 10.8175 47.0384 10.9446 47.3946 11.1827C47.7509 11.4208 48.0285 11.7591 48.1924 12.155C48.3564 12.5508 48.3993 12.9864 48.3157 13.4066C48.2322 13.8269 48.0259 14.2129 47.723 14.5159L40.0595 22.1707C39.6532 22.5771 39.1022 22.8054 38.5276 22.8056H33.2995L29.3388 26.7684C28.9323 27.1749 28.3808 27.4033 27.8059 27.4033C27.2309 27.4033 26.6795 27.1749 26.273 26.7684C25.8664 26.3618 25.638 25.8104 25.638 25.2355C25.638 24.6605 25.8664 24.1091 26.273 23.7026L30.2358 19.7441V14.5137C30.2359 13.9391 30.4643 13.3881 30.8706 12.9819L38.5298 5.32056C38.8328 5.01737 39.2189 4.81087 39.6393 4.72718C40.0597 4.64349 40.4955 4.68637 40.8915 4.85039M37.895 12.0806L34.5691 15.4107V18.4744H37.6328L40.9608 15.1486H40.0616C39.487 15.1486 38.9359 14.9203 38.5296 14.514C38.1232 14.1076 37.895 13.5565 37.895 12.9819V12.0806Z"
                        fill="#009632"
                      />
                    </svg>
                  </span>
                  80% accuracy
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 w-full">
            <button
              onClick={() => {}}
              className="h-[60px] w-[260px] flex items-center justify-center gap-2.5 py-5 px-8 rounded-[20px] font-bold text-base text-[#1E1C25] bg-[#E2DBF6] border border-[#ACA40F80]"
            >
              Share
            </button>
            <button
              onClick={close}
              className="h-[60px] w-[260px] flex items-center justify-center gap-2.5 py-5 px-8 rounded-[20px] font-bold text-base bg-[#A082F9] text-[#1E1C25] border border-[#ACA40F80]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div className="lg:order-2 bg-[#211F22] p-4 rounded-[20px] h-fit space-y-6">
        <div className="p-4 border-white/5 border flex flex-col gap-6 rounded-[20px]">
          <h6 className="font-semibold text-base/[22px] tracking-[3%]">
            Learning chapters
          </h6>
          <div className="w-full h-2.5 bg-[#282629] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#A082F9] rounded-full transition-all duration-300"
              style={{
                width: `${
                  game_data.phase === phase
                    ? ((game_data.level - 1) * 100) / 6
                    : 100
                }%`,
              }}
              aria-valuenow={
                game_data.phase === phase
                  ? ((game_data.level - 1) * 100) / 6
                  : 100
              }
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <Fragment key={i}>
              <div
                onClick={() => {
                  if (game_data.phase === phase && game_data.level < i + 1)
                    toast.error(
                      "Chapter is locked. Complete the previous chapter to unlock"
                    );
                  else {
                    setLevel(i + 1);
                    setStage("course");
                  }
                }}
                className={`${
                  level === i + 1 &&
                  stage === "course" &&
                  "border border-[#F4E90E80] bg-[#F4E90E0D]"
                } py-4 px-2 rounded-[15px] flex items-center justify-between cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`size-6 border border-white/20 flex items-center justify-center rounded-full text-sm/[22px] tracking-[3%] ${
                      game_data.phase === phase && game_data.level < i + 1
                        ? "text-white/30"
                        : "text-white/80"
                    }`}
                  >
                    {i * 2 + 1}
                  </span>

                  <p
                    className={`${
                      (game_data.phase !== phase || game_data.level > i + 1) &&
                      "line-through"
                    }
                    ${
                      game_data.phase === phase && game_data.level < i + 1
                        ? "text-white/30"
                        : "text-white/80"
                    }
                     text-sm/[22px] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap`}
                  >
                    {course_data[phase][i].title}
                  </p>
                </div>
                <p
                  className={`${
                    (game_data.phase !== phase || game_data.level > i + 1) &&
                    "line-through"
                  }
                  ${
                    game_data.phase === phase && game_data.level < i + 1
                      ? "text-white/30"
                      : "text-white/40"
                  }
                   text-xs/[22px] tracking-[3%]`}
                >
                  2 mins
                </p>
              </div>
              <div
                onClick={() => {
                  if (game_data.phase === phase && game_data.level < i + 1)
                    toast.error(
                      "Chapter is locked. Complete the previous chapter to unlock"
                    );
                  else {
                    setLevel(i + 1);
                    setStage("quiz");
                  }
                }}
                className={`${
                  level === i + 1 &&
                  stage === "quiz" &&
                  "border border-[#F4E90E80] bg-[#F4E90E0D]"
                } py-4 px-2 rounded-[15px] flex items-center justify-between cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`size-6 border border-white/20 flex items-center justify-center rounded-full text-sm/[22px] tracking-[3%] ${
                      game_data.phase === phase && game_data.level < i + 1
                        ? "text-white/30"
                        : "text-white/80"
                    }`}
                  >
                    {i * 2 + 2}
                  </span>

                  <p
                    className={`${
                      (game_data.phase !== phase || game_data.level > i + 1) &&
                      "line-through"
                    }
                    ${
                      game_data.phase === phase && game_data.level < i + 1
                        ? "text-white/30"
                        : "text-white/80"
                    }
                     text-sm/[22px] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap`}
                  >
                    Quiz
                  </p>
                </div>
                <p
                  className={`${
                    (game_data.phase !== phase || game_data.level > i + 1) &&
                    "line-through"
                  }
                  ${
                    game_data.phase === phase && game_data.level < i + 1
                      ? "text-white/30"
                      : "text-white/40"
                  }
                   text-xs/[22px] tracking-[3%]`}
                >
                  5 mins
                </p>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="p-4 border-white/5 border flex flex-col gap-6 rounded-[20px]">
          <h6 className="font-semibold text-base/[22px] tracking-[3%]">
            Rewards
          </h6>

          <div className="flex items-center gap-2.5 rounded-[21px] px-6 bg-white/[3%] h-20">
            <Image
              src="/stp-coin.png"
              alt="stp"
              width={24}
              height={24}
              quality={100}
              className="size-6"
            />
            <p className="font-bold text-xl/10 tracking-[3%] text-white/60">
              {game_data.phase === phase
                ? 10 * (game_data.level - 1) + 5 * (game_data.level - 1)
                : 100}{" "}
              / 100 STRP
            </p>
          </div>
        </div>
      </div>
      <div className="lg:order-1 xl:col-span-2 flex flex-col gap-5">
        <h5 className="text-xl font-bold md:text-2xl">
          Introduction to Crypto: Your first steps
        </h5>

        {stage === "course" && <Course level={level} phase={phase} />}
        {stage === "quiz" && (
          <Quiz
            level={level}
            phase={phase}
            setStpCollected={setStpCollected}
            next={handleComplete}
          />
        )}
      </div>
    </div>
  );
}
