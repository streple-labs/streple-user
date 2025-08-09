import Image from "next/image";
import { baloo } from "../fonts";
import Gamification from "./gamification";

export default function page() {
  return (
    <div className="space-y-10 w-full overflow-y-auto hide-scrollbar relative">
      <div className="h-[290px] rounded-3xl overflow-hidden relative flex justify-between pt-[38px] px-[52px]">
        <Image
          src="/learn-bg.jpg"
          alt=""
          fill
          className="absolute size-full inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        />

        <div className="space-y-6 flex-1 relative max-w-[455px]">
          <h2
            className={`${baloo.className} text-4xl drop-shadow-[#25251A80] drop-shadow-[0px_4px_4px]`}
          >
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

        <div className="flex flex-1 items-center justify-end">
          <Image
            src={"/mascot-learn-page-banner.png"}
            alt=""
            width={411}
            height={290}
            className="bg-center"
          />
        </div>
      </div>

      <Gamification />
    </div>
  );
}
