"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoadingLearn() {
  const [percentage, setPercentage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(interval);

          return 100;
        });
      }, 25);
      return () => clearInterval(interval);
    } else setPercentage(1);
  }, [loading, router]);

  useEffect(() => {
    if (loading && percentage === 100) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [loading, percentage, router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#141314] p-8">
      <div className="flex flex-col items-center justify-center w-full max-w-[488px]">
        <Image
          src={"/mascot-1.png"}
          alt="loading mascot"
          width={176}
          height={148}
        />
        <div className="w-full h-[45px] -rotate-3 bg-[#DCD8E6] relative">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm md:text-xl leading-5 tracking-[1px] text-[#1F1D22]">
            Loading...{percentage}%
          </p>
          <div
            className="h-[48px] -my-px transition-all duration-50"
            style={{
              width: `${percentage}%`,
              background: "#BDB510",
              boxShadow: "0px 5px 0px 0px #00000040 inset",
            }}
          />
        </div>
      </div>
    </div>
  );
}
