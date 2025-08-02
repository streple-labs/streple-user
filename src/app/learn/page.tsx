import Banner from "@/component/ui/banner";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import Eclipse from "../../component/icons/eclipse-learn-1";
import Eclipse2 from "../../component/icons/eclipse-learn-2";
import { anton } from "../fonts";

export default function page() {
  return (
    <div className="space-y-10 w-full overflow-y-auto hide-scrollbar relative">
      <div className="min-h-[290px] rounded-3xl overflow-hidden relative flex justify-between pt-[38px] px-[52px]">
        <Image
          src="/learn-bg.jpg"
          alt=""
          fill
          className="absolute size-full inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        />

        <div className="space-y-6 flex-1 relative">
          <h2 className={`${anton.className} text-4xl`}>
            Your <span className="text-[#BDB510]">Crypto Hero&apos;s</span>{" "}
            Journey Begins here
          </h2>
          <p className="text-sm">
            Choose your learning path, complete challenges, collect rewards, and
            join a league of digital heroes reshaping wealth.
          </p>
          <button className="text-[#181812CC] text-sm font-semibold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[34px] w-[128px]">
            View quests
          </button>
        </div>

        <div className="flex-1 flex justify-center relative">
          <span className="absolute -top-9 -right-16">
            <Eclipse2 />
          </span>
          <span className="absolute top-[117px] left-16">
            <Eclipse />
          </span>
          <Image
            src={"/mascot-2.png"}
            alt=""
            width={411}
            height={382}
            className="relative bg-cover"
          />
        </div>
      </div>

      <div className="space-y-8 w-full">
        <Banner label="PHASE 1 : CALL TO DISCOVERY" />

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <Image
                src={"/wallet.png"}
                alt="wallet image"
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

          <div className="bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 cursor-pointer">
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

          <div className="bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 grayscale-100">
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
          <Banner label="PHASE 1 : CALL TO DISCOVERY" />

          <div className="grid grid-cols-3 gap-6 [&>div]:cursor-not-allowed">
            <div className="bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 grayscale-100">
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

            <div className="bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 grayscale-100">
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

            <div className="bg-[#24222A99] h-[85px] rounded-[10px] py-[22px] px-6 min-w-xs flex items-center justify-between gap-4 grayscale-100">
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
    </div>
  );
}
