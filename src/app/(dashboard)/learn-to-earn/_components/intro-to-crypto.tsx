import { course_data } from "@/assets/gamification-lessons/data";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Course from "./course";
import Quiz from "./quiz";
import { useMutation } from "@tanstack/react-query";
import { updateUserGameData } from "@/utils/api/action";

const phase = 1;

export default function IntroToCrypto() {
  const {
    user: { game_data, user_data },
    setUser,
  } = useAuth();

  const [level, setLevel] = useState(1);
  const [stage, setStage] = useState<"course" | "quiz">("course");

  useEffect(() => {
    setLevel(game_data.level);
  }, [game_data.level]);

  const [stpCollected, setStpCollected] = useState(10);

  const { mutate: handleComplete } = useMutation({
    mutationKey: ["phase-1-level-1-complete"],
    mutationFn: async () => {
      if (game_data.phase === phase && game_data.level === level)
        return await updateUserGameData({
          phase: "Phase 1",
          level: `Level ${level + 1}`,
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
        toast.success(`"Phase ${phase} level ${level} completed`);
        setLevel((prev) => prev + 1);
        setStage("course");
        if (user_data)
          setUser({
            user_data: { ...user_data },
            game_data: {
              phase: phase,
              level: level + 1,
              totalScore: game_data.totalScore + stpCollected,
              hasAnswer: true,
            },
          });
      } else toast.error(res.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

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
            <>
              <div
                key={Math.random()}
                onClick={() => {
                  if (game_data.level < i + 1)
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
                  <span className="size-6 border border-white/20 flex items-center justify-center rounded-full text-sm/[22px] tracking-[3%] text-white/80">
                    {i * 2 + 1}
                  </span>

                  <p
                    className={`${
                      game_data.level > i + 1 && "line-through"
                    } text-sm/[22px] text-white/80 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap`}
                  >
                    {course_data[phase][i].title}
                  </p>
                </div>
                <p
                  className={`${
                    game_data.level > i + 1 && "line-through"
                  } text-xs/[22px] tracking-[3%] text-white/40`}
                >
                  2 mins
                </p>
              </div>
              <div
                key={Math.random()}
                onClick={() => {
                  if (game_data.level < i + 1)
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
                  <span className="size-6 border border-white/20 flex items-center justify-center rounded-full text-sm/[22px] tracking-[3%] text-white/80">
                    {i * 2 + 2}
                  </span>

                  <p
                    className={`${
                      game_data.level > i + 1 && "line-through"
                    } text-sm/[22px] text-white/80 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap`}
                  >
                    Quiz
                  </p>
                </div>
                <p
                  className={`${
                    game_data.level > i + 1 && "line-through"
                  } text-xs/[22px] tracking-[3%] text-white/40`}
                >
                  5 mins
                </p>
              </div>
            </>
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
              100 STRP
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
