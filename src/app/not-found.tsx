"use client";

import Navbar from "@/component/layout/nav-main";
import Wrapper from "@/component/layout/wrapper";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="size-full px-4 lg:px-10 flex flex-col items-center">
      <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[1440px] w-full relative">
        <Wrapper topNav={<Navbar />}>
          <div className="flex size-full flex-col gap-16 items-center justify-center p-8">
            <h1 className="text-2xl font-semibold">Coming Soon</h1>

            <Link
              className="w-full flex items-center justify-center"
              href={"/"}
            >
              <button className="h-[50px] max-w-[336px] w-full py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]">
                Home
              </button>
            </Link>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
