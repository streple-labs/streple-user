"use client";

import { baloo } from "@/app/fonts";
import { formatChartDate } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DrawdownCurve({
  data,
}: {
  data: ProtraderDrawdownCurve;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = (value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("drawdownChartPeriod") === value)
      params.delete("drawdownChartPeriod");
    else params.set("drawdownChartPeriod", value);

    replace(`${pathname}?${params.toString()}`);
  };

  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const periods = [
    { label: "7D", value: "7" },
    { label: "30D", value: "30" },
    { label: "90D", value: "90" },
  ];

  const currentPeriod = searchParams.get("drawdownChartPeriod") || "7";
  const currentPeriodLabel =
    periods.find((p) => p.value === currentPeriod)?.label || "7D";

  return (
    <div className="w-full h-[379px] rounded-[20px] border border-[#FFFFFF1A] bg-[#6151911A] px-3 py-5 md:px-6 md:py-8 flex flex-col justify-between gap-4 md:gap-8">
      <div className="w-full flex items-center justify-between relative">
        <p className={`${baloo.className} font-base text-white/80 font-normal`}>
          Drawdown curve
        </p>

        <div className="relative">
          <div
            className="h-6 w-[72px] flex items-center justify-center cursor-pointer gap-2 rounded-[5px] bg-white/5 border border-white/5 text-white/5 py-1 px-2"
            onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
          >
            <p className="text-xs text-white/60">{currentPeriodLabel}</p>
            <FaChevronDown
              width={10}
              height={5}
              fill="#FFFFFF99"
              className={`transition-transform duration-200 ${
                showPeriodDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {showPeriodDropdown && (
            <div className="absolute top-8 right-0 z-10 w-[72px] bg-[#6151911A] border border-[#FFFFFF1A] rounded-[5px] shadow-lg">
              {periods.map((period) => (
                <div
                  key={period.value}
                  className={`px-2 py-1 text-xs cursor-pointer hover:bg-white/5 transition-colors ${
                    currentPeriod === period.value
                      ? "text-white bg-white/10"
                      : "text-white/60"
                  }`}
                  onClick={() => {
                    setParams(period.value);
                    setShowPeriodDropdown(false);
                  }}
                >
                  {period.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid vertical={false} stroke="#FFFFFF1A" />
          <XAxis
            dataKey="date"
            tickMargin={16}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatChartDate}
            className="text-[10px] lg:text-xs"
          />
          <YAxis
            className="text-[10px] lg:text-xs"
            tickMargin={16}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="drawdown"
            stroke="#8884d8"
            activeDot={<span className="size-3 bg-[#A082F9] rounded-full" />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
