"use client";

import Clock from "@/component/icons/clock";
import Padlock from "@/component/icons/padlock";
import StreakCalendar from "@/component/icons/streak-calendar";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import IntroToCrypto from "./_components/intro-to-crypto";

export default function Page() {
  const {
    user: { game_data },
  } = useAuth();

  const [showSelectedCourse, setShowSelectedCourse] = useState<null | number>(
    null
  );

  const UserCourses = useMemo(() => {
    if (showSelectedCourse === 1)
      return (
        <IntroToCrypto
          close={() => {
            setShowSelectedCourse(null);
          }}
        />
      );

    return null;
  }, [showSelectedCourse]);

  return (
    <>
      {showSelectedCourse ? (
        <div className="flex flex-col gap-4 w-full hide-scrollbar lg:overflow-y-auto">
          <p
            onClick={() => {
              setShowSelectedCourse(null);
            }}
            className="flex items-center gap-2 text-white/60 text-base cursor-pointer"
          >
            <span>
              <FaChevronLeft fill="#FFFFFF99" width={5} height={10} />
            </span>
            Back
          </p>
          {UserCourses}
        </div>
      ) : (
        <div className="flex flex-col gap-6 md:gap-10 w-full hide-scrollbar lg:overflow-y-auto">
          <h5 className="text-xl font-bold md:text-2xl">Learn to Earn</h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <div className="lg:order-2 bg-[#211F22] py-6 px-4 rounded-[20px] flex flex-col gap-6 h-fit">
              <div className="border border-white/5 rounded-[20px] p-4 flex flex-col gap-3">
                <h6 className="font-semibold text-base/[22px] tracking-[3%]">
                  Earned learning rewards
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
                    {game_data.totalScore} STRP
                  </p>
                </div>
              </div>
              <div className="border border-white/5 p-4 flex flex-col gap-6 rounded-[20px]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-sm/[22px] tracking-[3%] font-semibold">
                      Weekly Streak
                    </p>
                    <div className="relative cursor-pointer border border-white/20 py-1 px-2 flex items-center gap-2 rounded-[10px]">
                      <StreakCalendar />
                      <span className="text-xs/[22px] tracking-[3%] text-white/60">
                        {(() => {
                          const today = new Date();

                          const firstDayOfWeek = new Date(today);
                          firstDayOfWeek.setDate(
                            today.getDate() - today.getDay()
                          );
                          const lastDayOfWeek = new Date(firstDayOfWeek);
                          lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

                          const startDay = firstDayOfWeek.getDate();
                          const endDay = lastDayOfWeek.getDate();
                          const endMonth = lastDayOfWeek.toLocaleString(
                            "en-US",
                            { month: "short" }
                          );
                          const endYear = lastDayOfWeek.getFullYear();

                          return `${startDay} - ${endDay} ${endMonth}, ${endYear}`;
                        })()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm/[22px] tracking-[3%]">1 Streak</p>
                </div>
                <div className="grid grid-cols-7 justify-between gap-2 sm:gap-8 lg:gap-2 xl:gap-4">
                  {(() => {
                    const today = new Date();
                    const firstDayOfWeek = new Date(today);
                    firstDayOfWeek.setDate(today.getDate() - today.getDay());

                    const weekDays = [
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ];

                    return weekDays.map((day, idx) => {
                      const date = new Date(firstDayOfWeek);
                      date.setDate(firstDayOfWeek.getDate() + idx);
                      return (
                        <div
                          className="flex flex-col gap-4 items-center"
                          key={day}
                        >
                          <p className="text-xs/[22px] tracking-[3%]">{day}</p>
                          <div
                            className={`rounded-[6px] flex items-center justify-center p-1 w-full h-8 ${
                              date.toDateString() === today.toDateString()
                                ? "text-[#2F2929] bg-[#F4E90E]"
                                : "bg-[#FFFFFF0A] text-white"
                            }`}
                          >
                            <p className="text-xs/[22px] tracking-[3%]">
                              {date.getDate()}
                            </p>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
            <div className="xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 lg:order-1 gap-5 [&>div]:cursor-pointer">
              <div
                onClick={() => {
                  setShowSelectedCourse(1);
                }}
                className="rounded-2xl py-3 px-4 flex flex-col gap-6 bg-[#211F22]"
              >
                <div className="bg-white/[3%] rounded-[10px] flex justify-center h-[212px]">
                  <Image
                    src={"/course-thumbnail.png"}
                    aria-label="course thumbnail"
                    alt="course thumbnail"
                    width={173}
                    height={184}
                    quality={100}
                    className="max-w-[173px] max-h-[184px] object-contain"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-base/[22px] tracking-[3%] font-bold">
                    Introduction to Crypto: Your first steps
                  </h2>
                  <p className="text-sm/[22px] tracing-[3%]">
                    Learn the basics of blockchain, wallets, and market
                    essential
                  </p>
                </div>
                <div className="w-full h-2.5 bg-[#282629] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A082F9] rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        game_data.phase === 1
                          ? ((game_data.level - 1) * 100) / 6
                          : 100
                      }%`,
                    }}
                    aria-valuenow={
                      game_data.phase === 1
                        ? ((game_data.level - 1) * 100) / 6
                        : 100
                    }
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
                  />
                </div>
                <div className="flex items-center gap-6 text-white/50">
                  <div className="flex items-center gap-2">
                    <Clock />
                    <p className="text-sm/[22px] font-bold">5 hrs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/stp-coin.png"
                      alt="stp"
                      width={20}
                      height={20}
                      quality={100}
                      className="size-5"
                    />
                    <p className="text-sm/[22px] font-bold">+250 STRP</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl py-3 px-4 flex flex-col gap-6 bg-[#211F22B2]">
                <div className="bg-white/[3%] rounded-[10px] flex justify-center h-[212px] relative overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-xl flex items-center justify-center flex-col gap-4">
                    <p className="text-base/[22px] font-bold tracking-[3%]">
                      Lesson locked
                    </p>
                    <Padlock />
                  </div>
                  <Image
                    src={"/course-thumbnail.png"}
                    aria-label="course thumbnail"
                    alt="course thumbnail"
                    width={173}
                    height={184}
                    quality={100}
                    className="max-w-[173px] max-h-[184px] object-contain"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-base/[22px] tracking-[3%] font-bold text-white/60">
                    New lesson is coming soon, keep earning more coins
                  </h2>
                  <div className="h-[19px] w-full rounded-[15px] bg-[#282629]" />
                </div>
                <div className="h-[19px] w-full rounded-[15px] bg-[#282629]" />
                <div className="h-[19px] w-2/5 rounded-[15px] bg-[#282629]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
