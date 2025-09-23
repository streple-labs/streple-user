"use client";

import { Cell, Pie, PieChart } from "recharts";

const pie_data = [
  { name: "BTC", value: 40 },
  { name: "ETH", value: 30 },
  { name: "USDT", value: 35 },
  { name: "eNaira", value: 45 },
];

const COLORS = ["#A082F9", "#EBE8F4", "#F4EC43", "#2C292D"];

export default function DoughnutChart() {
  return (
    <div className="relative w-full flex items-center justify-center -my-6 mx-auto">
      <PieChart width={260} height={260}>
        <Pie
          data={pie_data}
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={120}
          dataKey="value"
        >
          {pie_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="space-y-1 flex flex-col items-center justify-center">
          <span className="text-[10px] lg:text-xs leading-[22px] tracking-[3%] text-white/60">
            Total Wallet
          </span>

          <p
            className={`text-[21px] lg:text-[28px] leading-[100%] tracking-[3%] text-white/70`}
          >
            50,000
          </p>
        </div>
      </div>
    </div>
  );
}
