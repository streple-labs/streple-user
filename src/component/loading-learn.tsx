"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoadingLearn } from "@/providers/LoadingLearnProvider";
import Image from "next/image";

export default function LoadingLearn() {
  const [percentage, setPercentage] = useState(1);
  const { loading, hideLoading } = useLoadingLearn();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(interval);

          return 100;
        });
      }, 50);
      return () => clearInterval(interval);
    } else setPercentage(1);
  }, [loading, router, hideLoading]);

  useEffect(() => {
    if (loading && percentage === 100) {
      router.push("/learn");

      const timeout = setTimeout(() => {
        hideLoading();
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [loading, percentage, router, hideLoading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 bg-[url('../../public/loading-learn-page-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center w-full max-w-[488px]">
        <Image
          src={"/mascot-1.png"}
          alt="loading mascot"
          width={176}
          height={148}
        />
        <div className="w-full h-[45px] -rotate-3 bg-[#DCD8E6] relative">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl leading-5 tracking-[1px] text-[#1F1D22]">
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
