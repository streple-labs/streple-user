"use client";

import BulbIcon from "@/assets/svg/bulb";
import GroupIcon from "@/assets/svg/group";
import OverviewIcon from "@/assets/svg/overview";
import SettingsIcon from "@/assets/svg/setting";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCandles } from "react-icons/bi";
import {
  PiBookBookmark,
  PiCoinVertical,
  PiCrownSimple,
  PiMountains,
  PiTrophy,
} from "react-icons/pi";
import Switch from "../ui/switch";
import { useEffect } from "react";

const nav_items = [
  {
    name: "Overview",
    icon: OverviewIcon,
    href: "/",
  },
  {
    name: "Wallet",
    icon: GroupIcon,
    href: "#",
  },
  {
    name: "Community",
    icon: BulbIcon,
    href: "#",
  },
  {
    name: "Watchlist",
    icon: BulbIcon,
    href: "#",
  },
  {
    name: "Market",
    icon: BulbIcon,
    href: "#",
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    href: "#",
  },
];

export function HomeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden hide-scrollbar lg:flex flex-col justify-between shrink-0 pt-8 w-full max-w-[248px] h-full overflow-y-auto rounded-[20px] bg-[#5A555C1A]">
      <nav className="flex flex-col gap-4 w-full px-6">
        {nav_items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            aria-label={item.name}
            className={`flex rounded-[10px] h-[43px] p-3 gap-3 items-center ${
              pathname === item.href
                ? "text-[#F8F5FF] bg-[#A082F9]"
                : "text-white/50"
            }`}
          >
            <item.icon
              className={`${
                pathname === item.href ? "fill-white/70" : "fill-white/50"
              }`}
            />
            <span className="text-sm font-normal leading-[100%] tracking-normal">
              {item.name}
            </span>
          </Link>
        ))}

        {/* <button
          className="flex rounded-[10px] h-[43px] p-3 gap-3 items-center"
          title="Logout"
          onClick={() => {
            deleteCookie("streple_auth_token");
            router.push("/login");
          }}
        >
          <LogoutIcon />

          <span className="text-sm font-normal leading-[100%] tracking-normal text-[#F8F5FF80]">
            Logout
          </span>
        </button> */}
      </nav>

      <div className="w-full rounded-[20px] px-8 py-5 flex items-center justify-center gap-4 bg-[#5A555C1A]">
        <p
          className={`text-sm font-normal leading-3 tracking-normal text-white/50`}
        >
          Crypto hustle
        </p>
        <Switch />
      </div>
    </aside>
  );
}

const learn_nav_items = [
  {
    name: "Crypto hustle",
    href: "/learn",
    icon: PiBookBookmark,
  },
  {
    name: "Quests",
    href: "",
    icon: PiMountains,
  },
  {
    name: "Trophy hut",
    href: "",
    icon: PiTrophy,
  },
  {
    name: "Trading post",
    href: "",
    icon: BiCandles,
  },
  {
    name: "Coin pouch",
    href: "",
    icon: PiCoinVertical,
  },
  {
    name: "Leaderboard",
    href: "",
    icon: PiCrownSimple,
  },
];

export function LearnSidebar() {
  const pathname = usePathname();

  useEffect(() => {
    function generateMonotoneNoise() {
      const canvas = document.getElementById(
        "noiseCanvas"
      ) as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      const density = 0.1;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random();

        if (Math.random() < density) {
          const value = Math.floor(noise * 255);
          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
          data[i + 3] = Math.floor(noise * 128);
        } else {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    generateMonotoneNoise();

    window.addEventListener("resize", generateMonotoneNoise);

    return () => window.removeEventListener("resize", generateMonotoneNoise);
  });

  return (
    <aside className="hidden hide-scrollbar lg:flex flex-col justify-between shrink-0 pt-8 w-full max-w-[248px] h-full overflow-y-auto rounded-[20px] relative">
      <span className="absolute top-0 left-0">
        <Image src={"/nav-eclipse.svg"} alt="" width={490} height={258} />
      </span>
      <nav className="relative flex flex-col gap-4 w-full px-6">
        <canvas
          className="absolute top-0 left-0 size-full opacity-100 mix-blend-overlay -mt-8"
          id="noiseCanvas"
        />

        {learn_nav_items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            aria-label={item.name}
            className={`flex rounded-[10px] h-[43px] p-3 gap-3 items-center relative ${
              pathname === item.href
                ? "text-[#E3E3E8] bg-[#A082F926] border border-[#A082F9]"
                : "text-[#F8F5FF80]"
            }`}
          >
            <item.icon className="fill-[#F8F5FF80]" />
            <span className="text-sm font-normal leading-[100%] tracking-normal">
              {item.name}
            </span>
          </Link>
        ))}

        {/* <button
          className="flex rounded-[10px] h-[43px] p-3 gap-3 items-center"
          title="Logout"
          onClick={() => {
            deleteCookie("streple_auth_token");
            router.push("/login");
          }}
        >
          <LogoutIcon />

          <span className="text-sm font-normal leading-[100%] tracking-normal text-[#F8F5FF80]">
            Logout
          </span>
        </button> */}
      </nav>

      <div className="w-full rounded-[20px] px-8 py-5 flex items-center justify-center gap-4 bg-[#5A555C1A]">
        <p
          className={`text-sm font-normal leading-3 tracking-normal text-white/50`}
        >
          Crypto hustle
        </p>
        <Switch />
      </div>
    </aside>
  );
}
