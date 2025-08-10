"use client";

import GroupIcon from "@/assets/svg/group";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHomeAlt } from "react-icons/bi";
import { CiWallet } from "react-icons/ci";
import { MdOutlineCandlestickChart } from "react-icons/md";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <header className="lg:hidden fixed bottom-0 inset-x-0 h-[72px] border-t border-t-white/10 bg-[#211F22] z-50 px-[18px] sm:px-6 py-4">
      <nav className="w-full flex items-center justify-between gap-2">
        <Link
          href={"/"}
          className={`flex flex-col items-center gap-2.5 sm:text-sm md:text-base ${
            pathname === "/" ? "text-[#A082F9]" : "text-white/50"
          }`}
        >
          <BiHomeAlt className="w-3.5 h-4" />
          <p className="text-[10px] xs:text-xs">Home</p>
        </Link>
        <Link
          href={"#"}
          className={`flex flex-col items-center gap-2.5 sm:text-sm md:text-base ${
            pathname === "/wallet" ? "text-[#A082F9]" : "text-white/50"
          }`}
        >
          <CiWallet width={16} height={13} />
          <p className="text-[10px] xs:text-xs">Wallet</p>
        </Link>
        <Link
          href={"#"}
          className={`flex flex-col items-center gap-2.5 sm:text-sm md:text-base ${
            pathname === "/watchlist" ? "text-[#A082F9]" : "text-white/50"
          }`}
        >
          <MdOutlineCandlestickChart width={14} height={19} />
          <p className="text-[10px] xs:text-xs">Watchlist</p>
        </Link>
        <Link
          href={"#"}
          className={`flex flex-col items-center gap-2.5 sm:text-sm md:text-base ${
            pathname === "/market" ? "text-[#A082F9]" : "text-white/50"
          }`}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              pathname === "/market" ? "fill-[#A082F9]" : "fill-white/50"
            }`}
          >
            <path d="M3.16667 0.883789C2.39312 0.883789 1.65125 1.19108 1.10427 1.73806C0.557291 2.28504 0.25 3.02691 0.25 3.80046V11.9671C0.25 12.7407 0.557291 13.4825 1.10427 14.0295C1.65125 14.5765 2.39312 14.8838 3.16667 14.8838H11.3333C12.1069 14.8838 12.8487 14.5765 13.3957 14.0295C13.9427 13.4825 14.25 12.7407 14.25 11.9671V3.80046C14.25 3.02691 13.9427 2.28504 13.3957 1.73806C12.8487 1.19108 12.1069 0.883789 11.3333 0.883789H3.16667ZM1.41667 3.80046C1.41667 3.33633 1.60104 2.89121 1.92923 2.56302C2.25742 2.23483 2.70254 2.05046 3.16667 2.05046H11.3333C11.7975 2.05046 12.2426 2.23483 12.5708 2.56302C12.899 2.89121 13.0833 3.33633 13.0833 3.80046V11.9671C13.0833 12.4313 12.899 12.8764 12.5708 13.2046C12.2426 13.5327 11.7975 13.7171 11.3333 13.7171H3.16667C2.70254 13.7171 2.25742 13.5327 1.92923 13.2046C1.60104 12.8764 1.41667 12.4313 1.41667 11.9671V3.80046ZM3.75 4.38379C3.59529 4.38379 3.44692 4.44525 3.33752 4.55464C3.22812 4.66404 3.16667 4.81241 3.16667 4.96712C3.16667 5.12183 3.22812 5.27021 3.33752 5.3796C3.44692 5.489 3.59529 5.55046 3.75 5.55046H10.75C10.9047 5.55046 11.0531 5.489 11.1625 5.3796C11.2719 5.27021 11.3333 5.12183 11.3333 4.96712C11.3333 4.81241 11.2719 4.66404 11.1625 4.55464C11.0531 4.44525 10.9047 4.38379 10.75 4.38379H3.75Z" />
          </svg>

          <p className="text-[10px] xs:text-xs">Market</p>
        </Link>
        <Link
          href={"#"}
          className={`flex flex-col items-center gap-2.5 sm:text-sm md:text-base ${
            pathname === "/community" ? "text-[#A082F9]" : "text-white/50"
          }`}
        >
          <GroupIcon
            width={20}
            height={13}
            className={`${
              pathname === "/community" ? "fill-[#A082F9]" : "fill-white/50"
            }`}
          />
          <p className="text-[10px] xs:text-xs">Community</p>
        </Link>
      </nav>
    </header>
  );
}
