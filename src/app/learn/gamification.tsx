"use client";

import Banner from "@/component/ui/banner";
import { useAuth } from "@/context/auth-context";
import api from "@/utils/client-axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import { baloo } from "../fonts";

export default function Gamification() {
  const { user, setUser } = useAuth();

  const {} = useQuery({
    queryKey: ["gamification-progress"],
    queryFn: async () => {
      const res = await api.get("/gamified/user-progress");

      setUser({
        ...user,
        game_data: {
          phase: res.data.phase,
          level: res.data.level,
          score: res.data.score,
        },
      });

      return res.data;
    },
  });

  return (
    <>
      <div className="space-y-8 w-full">
        <Banner label="PHASE 1 : CALL TO DISCOVERY" />

        <div className="grid grid-cols-3 gap-6 [&>div]:bg-blend-luminosity">
          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user.game_data?.phase === "Phase 1" &&
              user.game_data.level === "Level 1"
                ? "cursor-pointer"
                : "grayscale-100 && cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/what-is-crypto-illustration.png"}
                alt="what is crypto illustration"
                width={40}
                height={40}
              />

              <span className="inline-block text-base/8 tracking-[1px] drop-shadow-xs drop-shadow-[#F4E90E80]">
                What is crypto?
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#958F16CC" />
            </span>
          </div>

          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user.game_data?.phase === "Phase 1" &&
              user.game_data.level === "Level 2"
                ? "cursor-pointer"
                : "grayscale-100 && cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/wallet.png"}
                alt="wallet image"
                width={40}
                height={40}
              />

              <span className="inline-block text-base/8 tracking-[1px] drop-shadow-xs drop-shadow-[#A082F980]">
                Understanding wallets
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#B59EF9" />
            </span>
          </div>

          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user.game_data?.phase === "Phase 1" &&
              user.game_data.level === "Level 3"
                ? "cursor-pointer"
                : "grayscale-100 && cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/bitcoin-wallet.png"}
                alt="wallet image"
                width={40}
                height={40}
              />

              <span className="inline-block text-base/8 tracking-[1px] drop-shadow-xs drop-shadow-[#F4E90E80]">
                Crypto in the market
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#B59EF9" />
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-8 w-full [&>div]:bg-blend-luminosity">
        <Banner
          label="PHASE 2 : WALK WITH THE WISE"
          disabled={user.game_data?.phase === "Phase 2"}
        />

        <div className="grid grid-cols-3 gap-6">
          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user.game_data?.phase === "Phase 2" &&
              user.game_data.level === "Level 1"
                ? "cursor-pointer"
                : "grayscale-100 && cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/bitcoin-wallet.png"}
                alt="wallet image"
                width={40}
                height={40}
              />

              <span className="inline-block text-base/8 tracking-[1px] drop-shadow-xs drop-shadow-[#F4E90E80]">
                What is Copy-Trading
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#B59EF9" />
            </span>
          </div>

          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user.game_data?.phase === "Phase 2" &&
              user.game_data.level === "Level 2"
                ? "cursor-pointer"
                : "grayscale-100 && cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/bitcoin-wallet.png"}
                alt="wallet image"
                width={40}
                height={40}
              />

              <span className="inline-block text-base/8 tracking-[1px] drop-shadow-xs drop-shadow-[#F4E90E80]">
                How to choose a trader
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#B59EF9" />
            </span>
          </div>

          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user.game_data?.phase === "Phase 2" &&
              user.game_data.level === "Level 3"
                ? "cursor-pointer"
                : "grayscale-100 && cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/bitcoin-wallet.png"}
                alt="wallet image"
                width={40}
                height={40}
              />

              <span className="inline-block text-base/8 tracking-[1px] drop-shadow-xs drop-shadow-[#F4E90E80]">
                Why Trades Work
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#B59EF9" />
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 [&>div]:bg-blend-luminosity mt-8">
        <div
          className={`bg-[#24222A99] ${
            baloo.className
          } h-[85px] rounded-[10px] py-[22px] px-6 min- w-xs flex items-center justify-between gap-4 shadow-[inset_9px_-9px_0px_0px_#A082F9] ${
            user.game_data?.phase === "Phase 2" &&
            user.game_data.level === "Level 1"
              ? "cursor-pointer"
              : "grayscale-100 && cursor-not-allowed"
          }`}
        >
          <div className="flex items-center relative">
            <Image
              src={"/treasure-chest.png"}
              alt="treasure chest illustration"
              width={91.08}
              height={71.41}
              className="rotate-[6.47deg] absolute -top-4 -left-4"
            />

            <span className="inline-block ml-20 text-[#E4DCFD] text-xl/8 tracking-[1px] drop-shadow-[#F4E90E80] drop-shadow-[0px_4px_0px]">
              MISSION CHEST
            </span>
          </div>
          <span>
            <FaChevronRight width={9} color="#B59EF9" />
          </span>
        </div>
      </div>
    </>
  );
}
