"use client";

import BulbIcon from "@/assets/svg/bulb";
import GroupIcon from "@/assets/svg/group";
import OverviewIcon from "@/assets/svg/overview";
import SettingsIcon from "@/assets/svg/setting";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Switch from "../switch";

const nav_items = [
  {
    name: "Overview",
    icon: OverviewIcon,
    href: "/",
  },
  {
    name: "Wallet",
    icon: GroupIcon,
    href: "/wallet",
  },
  {
    name: "Community",
    icon: BulbIcon,
    href: "/community",
  },
  {
    name: "Watchlist",
    icon: BulbIcon,
    href: "/watchlist",
  },
  {
    name: "Market",
    icon: BulbIcon,
    href: "/market",
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hide-scrollbar flex flex-col justify-between shrink-0 pt-8 w-full max-w-[248px] h-full overflow-y-auto rounded-[20px] bg-[#5A555C1A]">
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
