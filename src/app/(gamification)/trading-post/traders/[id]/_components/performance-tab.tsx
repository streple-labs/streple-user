"use client";

import { baloo } from "@/app/fonts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function PerformanceTab({
  data,
}: {
  data: ProtraderProfilePerformance;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = (value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("performanceTabPeriod") === value)
      params.delete("performanceTabPeriod");
    else params.set("performanceTabPeriod", value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        <div
          onClick={() => {
            setParams("daily");
          }}
          className={`h-6 px-2 md:min-w-[72px] flex items-center justify-center cursor-pointer gap-1 md:gap-2 rounded-[5px] border border-white/5 ${
            !searchParams.get("performanceTabPeriod") ||
            searchParams.get("performanceTabPeriod") === "daily"
              ? "bg-[#5A58254D]"
              : "bg-white/5"
          } text-white/5 py-1 px-2`}
        >
          <p className="text-xs text-white/60">Daily</p>
        </div>
        <div
          onClick={() => {
            setParams("7D");
          }}
          className={`h-6 px-2 md:min-w-[72px] flex items-center justify-center cursor-pointer gap-1 md:gap-2 rounded-[5px] border border-white/5 ${
            searchParams.get("performanceTabPeriod") === "7D"
              ? "bg-[#5A58254D]"
              : "bg-white/5"
          } text-white/5 py-1 px-2`}
        >
          <p className="text-xs text-white/60">7D</p>
        </div>
        <div
          onClick={() => {
            setParams("30D");
          }}
          className={`h-6 px-2 md:min-w-[72px] flex items-center justify-center cursor-pointer gap-1 md:gap-2 rounded-[5px] border border-white/5 ${
            searchParams.get("performanceTabPeriod") === "30D"
              ? "bg-[#5A58254D]"
              : "bg-white/5"
          } text-white/5 py-1 px-2`}
        >
          <p className="text-xs text-white/60">30D</p>
        </div>
        <div
          onClick={() => {
            setParams("90D");
          }}
          className={`h-6 px-2 md:min-w-[72px] flex items-center justify-center cursor-pointer gap-1 md:gap-2 rounded-[5px] border border-white/5 ${
            searchParams.get("performanceTabPeriod") === "90D"
              ? "bg-[#5A58254D]"
              : "bg-white/5"
          } text-white/5 py-1 px-2`}
        >
          <p className="text-xs text-white/60">90D</p>
        </div>
      </div>
      <p className={`${baloo.className} text-white/80 font-normal`}>
        Performance tab
      </p>
      <div className="space-y-4 w-full text-xs md:text-base/[22px] font-normal">
        <div className="flex items-center justify-between gap-4">
          <p className="text-white/50">Max drawdown</p>
          <p className="text-white/80">{data.maxDrawdown}%</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-white/50">Average trade duration</p>
          <p className="text-white/80">-</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-white/50">Sharpe ratio</p>
          <p className="text-white/80">-</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-white/50">Leverage used</p>
          <p className="text-white/80">{data.avgLeverage}x</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-white/50">Average lot size</p>
          <p className="text-white/80">{data.avgLotSize}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-white/50">Risk per trade</p>
          <p className="text-white/80">{data.avgRiskPercent}%</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-white/50">Profit sharing</p>
          <p className="text-white/80">-%</p>
        </div>
      </div>
    </>
  );
}
