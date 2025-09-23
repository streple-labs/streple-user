"use client";

import Lightning from "@/assets/svg/purple-lightning";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const {
    user: { user_data, game_data },
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
          <div className="flex items-center gap-3">
            <Lightning />
            <p className="text-xl/5 font-semibold">
              {game_data.totalScore} STP
            </p>
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
