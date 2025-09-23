import { baloo } from "@/app/fonts";
import PurpleSpotlight from "@/assets/svg/purple-spotlight";
import Image from "next/image";
import { useState } from "react";
import chest from "../../../public/treasure-chest-quest.webp";
import Modal from "../ui/modal";

export default function UnlockedQuestHero({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const [showReward, setShowReward] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="relative bg-[url('/learn-bg.jpg')] bg-cover bg-center flex items-center justify-center bg-no-repeat w-full lg:w-5xl p-4 rounded-[29px] overflow-hidden max-lg:h-screen lg:min-h-[587px]">
        <div className="absolute size-full bg-[#141314] opacity-95" />
        <span className="absolute left-1/2 -translate-x-1/2 top-0">
          <PurpleSpotlight />
        </span>

        <div className="relative flex items-center justify-center flex-col gap-4 w-full max-w-3xl mx-auto">
          <h4
            className={`${baloo.className} text-2xl md:text-[32px] tracking-[2px] drop-shadow-[#CABAFA] drop-shadow-[0px_4px_4px] font-normal`}
          >
            You&apos;ve unlocked your quest Hero!
          </h4>

          {showReward ? (
            <>
              <Image
                src={"/stp-coin.png"}
                alt="stp reward illustration"
                width={150}
                height={150}
              />
              <p
                className={`${baloo.className} text-[#F4E90E] text-[36px] relative`}
              >
                +250 Coins
              </p>
            </>
          ) : (
            <Image src={chest} alt="treasure chest" width={150} height={196} />
          )}

          <div
            className="flex w-full"
            style={{
              justifyContent: showReward ? "end" : "center",
            }}
          >
            <button
              onClick={() => {
                if (showReward) close();
                else setShowReward(true);
              }}
              className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-full md:w-[229px]"
            >
              {showReward ? "Continue" : "Collect reward"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
