"use client";

import Banner from "@/component/ui/banner";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";

export default function Gamification() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 w-full">
      <Banner label="PHASE 1 : CALL TO DISCOVERY" />

      <div className="grid grid-cols-3 gap-6">
        <div
          className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
            user?.phase === "Phase 1" && user.level === "Level 1"
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
            user?.phase === "Phase 1" && user.level === "Level 2"
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
            user?.phase === "Phase 1" && user.level === "Level 3"
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
              Understanding wallets
            </span>
          </div>
          <span>
            <FaChevronRight width={9} color="#B59EF9" />
          </span>
        </div>
      </div>

      <div className="space-y-8 w-full">
        <Banner
          label="PHASE 2 : CALL TO DISCOVERY"
          disabled={user?.phase === "Phase 2"}
        />

        <div className="grid grid-cols-3 gap-6 [&>div]:cursor-not-allowed">
          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user?.phase === "Phase 2" && user.level === "Level 1"
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
                Understanding wallets
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#B59EF9" />
            </span>
          </div>

          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user?.phase === "Phase 2" && user.level === "Level 2"
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
                Understanding wallets
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#B59EF9" />
            </span>
          </div>

          <div
            className={`bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 ${
              user?.phase === "Phase 2" && user.level === "Level 3"
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
                Understanding wallets
              </span>
            </div>
            <span>
              <FaChevronRight width={9} color="#B59EF9" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
