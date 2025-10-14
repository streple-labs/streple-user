"use client";

import Rectangle44 from "@/component/icons/rectangle-44";
import Navbar from "@/component/layout/nav-main";
import Wrapper from "@/component/layout/wrapper";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="size-full px-4 lg:px-10 flex flex-col items-center">
      <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[1440px] w-full relative">
        <Wrapper topNav={<Navbar />}>
          <div className="flex size-full flex-col gap-16 items-center justify-center p-8 relative rounded-[20px] overflow-hidden">
            <span className="absolute top-0 left-0 right-0">
              <Rectangle44 />
            </span>
            <h1 className="text-4xl md:text-[52px] font-extrabold text-[#DED8F0] drop-shadow-[0px_4px_4px] drop-shadow-[#FFFFFF1A]">
              Coming Soon
            </h1>

            <div className="">
              <svg
                width="173"
                height="209"
                viewBox="0 0 173 209"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60.4111 169.914L87.0082 104.084C87.2151 103.572 86.9677 102.99 86.4556 102.783C85.9436 102.576 85.3607 102.823 85.1538 103.335L58.5568 169.165C58.3499 169.677 58.5973 170.26 59.1093 170.467C59.6214 170.674 60.2042 170.427 60.4111 169.914Z"
                  fill="#A082F9"
                />
                <mask
                  id="mask0_4715_5928"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="65"
                  y="1"
                  width="107"
                  height="48"
                >
                  <rect
                    x="67.3359"
                    y="0.000976562"
                    width="113.556"
                    height="7.39119"
                    rx="3.6956"
                    transform="rotate(22 67.3359 0.000976562)"
                    fill="#A082F9"
                  />
                </mask>
                <g mask="url(#mask0_4715_5928)">
                  <rect
                    x="67.3359"
                    y="0.000976562"
                    width="113.556"
                    height="7.39119"
                    rx="3.6956"
                    transform="rotate(22 67.3359 0.000976562)"
                    fill="#A082F9"
                  />
                  <path
                    d="M63.969 8.33451C64.726 6.46077 66.8234 5.51437 68.7292 6.18652L168.582 41.4024C172.958 42.9459 174.119 48.5924 170.706 51.7367C168.956 53.3488 166.434 53.8084 164.228 52.9171L66.0569 13.2535C64.122 12.4717 63.1872 10.2694 63.969 8.33451Z"
                    fill="#7E5EDA"
                  />
                </g>
                <mask
                  id="mask1_4715_5928"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="1"
                  y="159"
                  width="107"
                  height="49"
                >
                  <rect
                    width="113.556"
                    height="7.39119"
                    rx="3.6956"
                    transform="matrix(-0.927184 -0.374607 -0.374607 0.927184 108.434 201.401)"
                    fill="#A082F9"
                  />
                </mask>
                <g mask="url(#mask1_4715_5928)">
                  <rect
                    width="113.556"
                    height="7.39119"
                    rx="3.6956"
                    transform="matrix(-0.927184 -0.374607 -0.374607 0.927184 108.434 201.401)"
                    fill="#A082F9"
                  />
                  <path
                    d="M105.067 209.735C105.824 207.861 104.972 205.723 103.135 204.883L6.84338 160.852C2.62306 158.922 -2.13407 162.177 -1.8632 166.81C-1.72433 169.185 -0.229319 171.268 1.97668 172.159L100.148 211.823C102.083 212.605 104.285 211.67 105.067 209.735Z"
                    fill="#7E5EDA"
                  />
                </g>
                <mask
                  id="mask2_4715_5928"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="9"
                  y="9"
                  width="155"
                  height="190"
                >
                  <path
                    d="M99.1227 104.156C134.464 102.781 156.82 65.3845 163.58 46.8582L70.4413 9.22767C53.9192 52.9912 68.1411 84.8746 77.3173 95.3458L72.5349 107.183C42.2359 108.276 17.57 143.676 9.02451 161.24L102.163 198.87C117.971 159.746 103.534 127.317 94.3402 115.993L99.1227 104.156Z"
                    fill="url(#paint0_linear_4715_5928)"
                    fill-opacity="0.3"
                  />
                </mask>
                <g mask="url(#mask2_4715_5928)">
                  <path
                    d="M99.1227 104.156C134.464 102.781 156.82 65.3845 163.58 46.8582L70.4413 9.22767C53.9192 52.9912 68.1411 84.8746 77.3173 95.3458L72.5349 107.183C42.2359 108.276 17.57 143.676 9.02451 161.24L102.163 198.87C117.971 159.746 103.534 127.317 94.3402 115.993L99.1227 104.156Z"
                    fill="url(#paint1_linear_4715_5928)"
                  />
                  <path
                    d="M106.218 201.233C122.025 167.481 104.826 130.274 95.1915 116.699L94.7906 196.616L106.218 201.233Z"
                    fill="#A082F9"
                  />
                </g>
                <path
                  d="M120.735 96.6806C120.735 96.6806 116.182 92.7285 112.863 90.8039C108.809 88.4529 105.931 88.3999 101.737 86.3086C96.0479 83.4716 94.3672 77.9832 88.0259 77.5334C84.2441 77.2651 82.3333 79.8505 78.5481 79.636C74.0643 79.382 67.8855 75.3281 67.8855 75.3281C70.3393 81.7121 71.468 86.4821 77.7522 94.9532C84.0365 103.424 81.7755 103.632 85.7927 105.751L68.9354 147.475L62.0051 164.628C49.4369 163.175 42.8598 163.848 33.1081 170.748L80.3945 189.853C75.571 178.671 70.2823 172.513 62.0051 164.628L68.9354 147.475L85.7927 105.751C90.9277 108.46 94.7037 104.82 100.468 104.131C108.841 103.131 120.735 96.6806 120.735 96.6806Z"
                  fill="#A082F9"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4715_5928"
                    x1="117.031"
                    y1="28.0512"
                    x2="55.6144"
                    y2="180.063"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-opacity="0.3" />
                    <stop offset="1" stop-color="#A082F9" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_4715_5928"
                    x1="117.031"
                    y1="28.0512"
                    x2="55.6144"
                    y2="180.063"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-opacity="0.3" />
                    <stop offset="1" stop-color="#A082F9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <Link
              className="w-full flex items-center justify-center"
              href={"/"}
            >
              <button className="h-[50px] max-w-[336px] w-full py-3 px-4 rounded-[20px] bg-[#EBE7F8] bg-blend-luminosity text-sm/[150%] font-semibold tracking-[2px] text-[#2C2C26]">
                Back to home
              </button>
            </Link>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
