"use client";

import Clock from "@/component/icons/clock";
import Padlock from "@/component/icons/padlock";
import StreakCalendar from "@/component/icons/streak-calendar";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import IntroToCrypto from "./_components/intro-to-crypto";
import Wrapper from "@/component/layout/wrapper";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import PencilExpand from "@/component/icons/pencil-expand";

export default function Page() {
  const {
    user: { game_data, user_data },
  } = useAuth();

  const [showSelectedCourse, setShowSelectedCourse] = useState<null | number>(
    null
  );

  const [showLearningChapters, setShowLearningChapters] = useState(false);

  const UserCourses = useMemo(() => {
    if (showSelectedCourse === 1)
      return (
        <IntroToCrypto
          close={() => {
            setShowSelectedCourse(null);
          }}
          showLearningChapters={showLearningChapters}
          closeLearningChaptersModal={() => {
            setShowLearningChapters(false);
          }}
        />
      );

    return null;
  }, [showLearningChapters, showSelectedCourse]);

  return (
    <Wrapper
      topNav={
        <header className="py-4 w-full h-16 md:h-[85px] flex items-center justify-center">
          <div className="flex items-center justify-between max-w-[1440px] w-full">
            <Link href="/" className="max-lg:hidden">
              <Image
                src="/streple-logo.png"
                alt="streple logo"
                width={112}
                height={33}
              />
            </Link>
            <div className="lg:hidden relative z-[1000]">
              {showSelectedCourse ? (
                <span
                  onClick={() => {
                    setShowLearningChapters((prev) => !prev);
                  }}
                  className="cursor-pointer"
                >
                  <PencilExpand />
                </span>
              ) : (
                <h5 className="text-base font-semibold leading-5 text-white/70">
                  Learn to Earn
                </h5>
              )}
            </div>

            <div className="hidden lg:flex w-full max-w-sm lg:max-w-[593px]">
              <div className="w-full relative">
                <input
                  name="search"
                  title="search for traders"
                  type="text"
                  placeholder="search for traders"
                  className={`h-[50px] w-full text-base font-normal py-5 px-4 rounded-[10px] gap-4 leading-6 tracking-[1px] placeholder:text-xs placeholder:text-white/70 outline-0 ring-0 caret-[#B39FF0] bg-[#242324]`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                  <IoSearch size={20} color="#FFFFFF99" />
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center shrink-0">
              <div className="rounded-[10px] flex items-center justify-center bg-[#242324] cursor-pointer h-[31px] w-[28px] md:h-[50px] md:w-[45px]">
                <GoBell width={12} color="#FFFFFFB2" />
              </div>

              <div className="flex gap-2 items-center cursor-pointer">
                <Image
                  src={user_data?.avatarUrl || "/test-png.jpg"}
                  alt="test image"
                  width={40}
                  height={40}
                  className="size-6 md:size-10 rounded-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </header>
      }
    >
      <>
        {showSelectedCourse ? (
          <div className="flex flex-col gap-4 w-full hide-scrollbar lg:overflow-y-auto">
            <p
              onClick={() => {
                setShowSelectedCourse(null);
              }}
              className="flex items-center gap-2 text-white/60 text-sm md:text-base cursor-pointer"
            >
              <span>
                <FaChevronLeft fill="#FFFFFF99" width={5} height={10} />
              </span>
              Back
            </p>
            <div className="pb-24">{UserCourses}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 md:gap-10 w-full hide-scrollbar lg:overflow-y-auto">
            <h5 className="max-lg:hidden font-bold text-2xl text-white/80">
              Learn to Earn
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-24">
              <div className="lg:order-2 bg-[#211F22] py-6 px-4 rounded-[20px] flex flex-col gap-6 h-fit">
                <div className="lg:border lg:border-white/5 rounded-[20px] p-3 lg:p-4 flex flex-wrap max-lg:items-center max-lg:justify-between flex-row lg:flex-col gap-3 max-lg:bg-white/[3%]">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/stp-coin.png"
                      alt="stp"
                      width={16}
                      height={16}
                      quality={100}
                      className="lg:hidden size-4 md:size-6"
                    />

                    <h6 className="font-semibold text-xs md:text-base leading-[22px] tracking-[3%]">
                      Earned learning rewards
                    </h6>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-[21px] lg:px-6 lg:bg-white/[3%] lg:h-20">
                    <Image
                      src="/stp-coin.png"
                      alt="stp"
                      width={24}
                      height={24}
                      quality={100}
                      className="max-lg:hidden"
                    />
                    <p className="font-bold text-sm md:text-xl leading-10 tracking-[3%] text-white/60">
                      {game_data.totalScore} STRP
                    </p>
                  </div>
                </div>
                <div className="lg:border lg:border-white/5 lg:p-4 flex flex-col gap-4 lg:gap-6 rounded-[20px]">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <Image
                          alt="streak"
                          src={"/fire.png"}
                          width={15}
                          height={15}
                        />
                        <p className="text-xs md:text-sm leading-[22px] tracking-[3%] font-semibold">
                          Weekly Streak
                        </p>
                      </div>
                      <div className="relative cursor-pointer border border-white/20 py-1 px-2 flex items-center gap-2 rounded-[10px]">
                        <StreakCalendar className="size-[14px] md:size-4" />
                        <span className="text-[10px] md:text-xs leading-[22px] tracking-[3%] text-white/60">
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
                    <p className="text-xs md:text-sm leading-[22px] tracking-[3%]">
                      1 Streak
                    </p>
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
                            <p className="text-[10px] md:text-xs leading-[22px] tracking-[3%]">
                              {day}
                            </p>
                            <div
                              className={`rounded-[6px] flex items-center justify-center p-1 w-full h-8 ${
                                date.toDateString() === today.toDateString()
                                  ? "text-[#2F2929] bg-[#F4E90E]"
                                  : "bg-[#FFFFFF0A] text-white"
                              }`}
                            >
                              <p className="text-[10px] md:text-xs leading-[22px] tracking-[3%]">
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
              <div className="xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 lg:order-1 gap-6 lg:gap-5 [&>div]:cursor-pointer">
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
    </Wrapper>
  );
}
