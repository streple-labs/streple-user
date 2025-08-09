"use client";

import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";
import { GoBell } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

export function HomeNavbar() {
  const {
    user: { user_data },
  } = useAuth();

  return (
    <header className="py-4 w-full h-16 md:h-[85px] flex items-center justify-center">
      <div className="flex items-center justify-between max-w-[1440px] w-full">
        <Link href="">
          <Image
            src="/streple-logo.png"
            alt="streple logo"
            width={112}
            height={33}
            className="hidden sm:block"
          />
          <Image
            src="/streple-logo-small.png"
            alt="streple logo"
            width={60}
            height={18}
            className="sm:hidden"
          />
        </Link>

        <div className="hidden md:flex w-full max-w-sm lg:max-w-[593px]">
          <div className="w-full relative">
            <input
              name="search"
              title="search for traders"
              type="text"
              placeholder="search for traders"
              className={`h-[50px] w-full text-base font-normal py-5 px-4 rounded-[10px] gap-4 leading-6 tracking-[1px] placeholder:text-xs placeholder:text-white/70 outline-0 ring-0 caret-[#B39FF0] bg-[#242324]`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              <IoSearch size={20} color="#FFFFFF99" />
            </span>
          </div>
        </div>

        <div className="flex gap-4 items-center shrink-0">
          <div className="rounded-[10px] flex items-center justify-center bg-[#242324] cursor-pointer h-[31px] w-[28px] md:h-[50px] md:w-[45px]">
            <GoBell width={12} color="#FFFFFFB2" />
          </div>

          <div className="flex gap-2 items-center cursor-pointer">
            <Image
              src={user_data?.avatarUrl || "/test-png.jpg"}
              alt="test image"
              width={40}
              height={40}
              className="size-6 md:size-10 rounded-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export function LearnNavbar() {
  const {
    user: { user_data },
  } = useAuth();
  return (
    <header className="py-4 w-full h-16 md:h-[85px] flex items-center justify-center">
      <div className="flex items-center justify-between max-w-[1440px] w-full">
        <Link href="">
          <Image
            src="/streple-logo.png"
            alt="streple logo"
            width={112}
            height={33}
            className="hidden sm:block"
          />
          <Image
            src="/streple-logo-small.png"
            alt="streple logo"
            width={60}
            height={18}
            className="sm:hidden"
          />
        </Link>

        <div className="flex gap-4 items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <Image src={"/coin.png"} alt="coin image" width={24} height={24} />
            <p className="text-xl/5 font-semibold">10,000 STP</p>
          </div>

          <Image
            src={user_data?.avatarUrl || "/default-avatar.jpg"}
            alt="test image"
            width={40}
            height={40}
            className="size-6 md:size-10 rounded-full object-cover object-center"
          />
        </div>
      </div>
    </header>
  );
}
