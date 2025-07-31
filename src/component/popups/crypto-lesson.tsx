"use client";

import { useEffect, useState } from "react";
import Banner from "../ui/banner";
import Modal from "../ui/modal";

export default function CryptoLesson() {
  const [start, setStart] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      isOpen={start}
      onClose={() => {
        setStart(false);
      }}
    >
      <Welcome />
    </Modal>
  );
}

function Welcome() {
  return (
    <div className="relative bg-[url('/learn-bg.jpg')] bg-cover bg-center bg-no-repeat h-[587px] w-5xl rounded-[29px] overflow-hidden">
      <div className="absolute size-full bg-[#141314] opacity-95" />

      <div className="relative flex items-center justify-center flex-col gap-10 p-9 w-fit mx-auto">
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
          <p>Every hero starts from somewhere...</p>
          <p>
            And so to begin, let&apos;s know your place in the crypto market
          </p>
        </div>

        <div className="flex justify-end w-full pr-8">
          <button className="text-[#181812B2] text-base font-bold flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[60px] w-[138px]">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
