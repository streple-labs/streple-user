"use client";

import DoughnutChart from "@/component/layout/dougnut-chart";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoArrowUp, GoArrowUpRight } from "react-icons/go";
import { IoWifi } from "react-icons/io5";
import { LuArrowRightLeft, LuEye, LuEyeClosed } from "react-icons/lu";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { anton } from "../fonts";

export default function Home() {
  const {
    user: { user_data, assets },
  } = useAuth();

  const [viewBalance, setViewBalance] = useState(false);

  return (
    <div className="flex flex-col gap-6 md:gap-10 w-full hide-scrollbar lg:overflow-y-auto">
      <h5 className="text-base font-semibold md:text-xl leading-5">
        Hello {user_data?.fullName.split(" ")[0]},
      </h5>

      <div className="hidden lg:flex gap-6">
        <div className="w-2/3 space-y-10">
          <div className="min-h-[176px] bg-[url('../../public/balance-bg.png')] bg-center bg-fill bg-no-repeat rounded-[20px] py-6 px-8 flex flex-col justify-between w-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2 cursor-pointer">
                <p className="text-xs leading-2.5 inline-flex items-center gap-0.5 text-white/60">
                  Naira Balance
                  <svg
                    width="5"
                    height="3"
                    viewBox="0 0 5 3"
                    fill="none"
                    className="fill-white/50"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.88582 0.000381947L0.285715 0.000381947C0.249265 0.000496387 0.213537 0.0105493 0.182377 0.0294585C0.151216 0.0483677 0.125802 0.075417 0.108871 0.107696C0.0919394 0.139974 0.0841317 0.176259 0.0862885 0.212645C0.0884452 0.24903 0.100484 0.284139 0.12111 0.314191L1.92116 2.91426C1.99576 3.02207 2.17537 3.02207 2.25017 2.91426L4.05022 0.314191C4.07106 0.284201 4.08328 0.249075 4.08555 0.212629C4.08782 0.176183 4.08007 0.13981 4.06312 0.107464C4.04617 0.0751169 4.02069 0.0480325 3.98943 0.0291541C3.95817 0.0102754 3.92233 0.000324488 3.88582 0.000381947Z" />
                  </svg>
                </p>

                <span
                  onClick={() => {
                    setViewBalance((prev) => !prev);
                  }}
                >
                  {viewBalance ? (
                    <LuEye width={8} className="text-white/60 cursor-pointer" />
                  ) : (
                    <LuEyeClosed
                      width={8}
                      className="text-white/60 cursor-pointer"
                    />
                  )}
                </span>
              </div>
              <h2
                className={`text-[21px] sm:text-2xl md:text-3xl lg:text-4xl ${anton.className} leading-[100%] tracking-[3%] text-white/90`}
              >
                {viewBalance ? assets.wallets.NGN.balance : "******"}
              </h2>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button className="h-[41px] w-[137px] flex items-center justify-center gap-2.5 py-2 px-4 bg-[#A082F9] text-[#1A1A1C] rounded-[10px] font-semibold text-xs leading-[150%] tracking-[2px]">
                <GoArrowUp width={12} color="#1A1A1C" /> Deposit
              </button>
              <Link
                href="/send"
                className="h-[41px] w-[137px] flex items-center justify-center gap-2.5 py-2 px-4 rounded-[10px] font-semibold text-xs leading-[150%] tracking-[2px] text-[#2C2C26] bg-[#EAE4FD] border border-black"
              >
                <GoArrowUpRight width={12} color="#2C2C26" />
                Send
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="w-full flex items-center justify-between">
              <p className="text-base font-semibold leading-[22px] tracking-[3%]">
                Wallets
              </p>
              <p className="text-xs font-semibold leading-[22px] tracking-[3%] cursor-pointer hover:underline">
                View all
              </p>
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
              <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
                <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                  <Image
                    src={"/streple-s.png"}
                    alt="streple strp"
                    aria-label="streple strp"
                    width={14}
                    height={14}
                    quality={100}
                  />
                </div>
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  STRP
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  STRP {assets.wallets.STP.balance}
                </p>
              </div>
              <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
                <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                  <svg
                    width="15"
                    height="17"
                    viewBox="0 0 15 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.29152 14.348C6.29152 14.538 6.14152 14.638 5.96152 14.588C4.75122 14.2009 3.69524 13.4392 2.94599 12.4129C2.19673 11.3866 1.79297 10.1487 1.79297 8.87803C1.79297 7.60732 2.19673 6.36948 2.94599 5.34317C3.69524 4.31686 4.75122 3.55516 5.96152 3.16803C6.14152 3.10803 6.29152 3.21803 6.29152 3.40803V3.86803C6.29152 3.99803 6.19152 4.13803 6.07152 4.17803C4.16152 4.87803 2.79152 6.71803 2.79152 8.86803C2.79152 11.018 4.16152 12.858 6.07152 13.558C6.19152 13.598 6.29152 13.748 6.29152 13.868V14.338V14.348Z"
                      fill="white"
                      fillOpacity="0.7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.29417 12.6279C8.29417 12.7679 8.18417 12.8779 8.04417 12.8779H7.54417C7.40417 12.8779 7.29417 12.7679 7.29417 12.6279V11.8379C6.20417 11.6879 5.67417 11.0779 5.52417 10.2479C5.49417 10.1079 5.61417 9.97792 5.75417 9.97792H6.32417C6.44417 9.97792 6.54417 10.0579 6.56417 10.1779C6.67417 10.6779 6.95417 11.0479 7.83417 11.0479C8.48417 11.0479 8.93417 10.6879 8.93417 10.1479C8.93417 9.60792 8.66417 9.40792 7.71417 9.24792C6.31417 9.05792 5.65417 8.63792 5.65417 7.53792C5.65417 6.68792 6.29417 6.03792 7.28417 5.88792V5.11792C7.28417 4.97792 7.39417 4.86792 7.53417 4.86792H8.03417C8.17417 4.86792 8.28417 4.97792 8.28417 5.11792V5.91792C9.09417 6.05792 9.60417 6.51792 9.76417 7.27792C9.79417 7.41792 9.68417 7.55792 9.53417 7.55792H9.00417C8.89417 7.55792 8.79417 7.47792 8.76417 7.37792C8.62417 6.89792 8.27417 6.68792 7.68417 6.68792C7.02417 6.68792 6.68417 7.00792 6.68417 7.45792C6.68417 7.92792 6.87417 8.16792 7.89417 8.31792C9.26417 8.50792 9.97417 8.89792 9.97417 10.0679C9.97417 10.9579 9.31417 11.6779 8.28417 11.8379V12.6279H8.29417Z"
                      fill="white"
                      fillOpacity="0.7"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.62297 14.588C9.44297 14.648 9.29297 14.538 9.29297 14.348V13.888C9.29297 13.748 9.37297 13.618 9.51297 13.578C11.423 12.878 12.793 11.038 12.793 8.88805C12.793 6.73805 11.423 4.89805 9.51297 4.19805C9.45103 4.17205 9.3976 4.12923 9.35872 4.07445C9.31984 4.01967 9.29706 3.9551 9.29297 3.88805V3.42805C9.29297 3.23805 9.44297 3.12805 9.62297 3.18805C12.043 3.95805 13.793 6.22805 13.793 8.89805C13.793 11.568 12.043 13.828 9.62297 14.608V14.588Z"
                      fill="white"
                      fillOpacity="0.7"
                    />
                  </svg>
                </div>
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  USDC
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  USDC {assets.wallets.USDC.balance}
                </p>
              </div>
              <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
                <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.16797 13V2.052C3.1679 1.81932 3.24511 1.59322 3.38749 1.40919C3.52986 1.22515 3.72933 1.09363 3.95457 1.03526C4.1798 0.976888 4.41804 0.994986 4.63188 1.08671C4.84571 1.17843 5.02303 1.33858 5.13597 1.542L11.2 12.458C11.3129 12.6614 11.4902 12.8216 11.7041 12.9133C11.9179 13.005 12.1561 13.0231 12.3814 12.9647C12.6066 12.9064 12.8061 12.7748 12.9485 12.5908C13.0908 12.4068 13.168 12.1807 13.168 11.948V1M1.16797 5H15.168M1.16797 9H15.168"
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  NGN
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  NGN {assets.wallets.NGN.balance}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="w-full flex items-center justify-between">
              <p className="text-base font-semibold leading-[22px] tracking-[3%]">
                Recent transactions
              </p>
              <p className="text-xs font-semibold leading-[22px] tracking-[3%] cursor-pointer hover:underline">
                View all
              </p>
            </div>
            <div className="space-y-6 w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex items-center justify-between" key={index}>
                  <div className="flex items-center gap-4">
                    <span className="size-[35px] rounded-full bg-white/5 flex items-center justify-center">
                      <LuArrowRightLeft width={12} color="#A082F9B2" />
                    </span>
                    <p className="text-xs font-normal leading-[22px] tracking-[3%]">
                      NGN to USD
                    </p>
                  </div>
                  <p className="text-xs font-normal leading-[22px] tracking-[3%] text-white/50">
                    22 April, 2025. 12:30PM
                  </p>
                  <p className="text-xs font-semibold leading-[22px] tracking-[3%]">
                    $250
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-[#211F22] rounded-[20px] space-y-3 h-fit">
          <div className="py-4 px-6 space-y-2">
            <p className="text-base font-semibold leading-[22px] tracking-[3%]">
              Quick Actions
            </p>
            <div className="flex justify-between flex-wrap gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-[42px] shrink-0 gradient-border rounded-full bg-white/5 flex items-center justify-center">
                    <LuArrowRightLeft width={14} color="#FFFFFFB2" />
                  </span>
                  <p className="text-sm font-normal leading-[22px] tracking-[3%]">
                    Convert
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-[42px] shrink-0 gradient-border rounded-full bg-white/5 flex items-center justify-center">
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.3089 0H1.69351C1.26508 0 0.854204 0.170192 0.55126 0.473135C0.248317 0.776079 0.078125 1.18696 0.078125 1.61538V12.3846C0.078125 12.813 0.248317 13.2239 0.55126 13.5269C0.854204 13.8298 1.26508 14 1.69351 14H10.3089C10.7373 14 11.1482 13.8298 11.4511 13.5269C11.7541 13.2239 11.9243 12.813 11.9243 12.3846V1.61538C11.9243 1.18696 11.7541 0.776079 11.4511 0.473135C11.1482 0.170192 10.7373 0 10.3089 0ZM1.15505 3.23077H10.8474V10.7692H1.15505V3.23077ZM1.69351 1.07692H10.3089C10.4517 1.07692 10.5887 1.13365 10.6896 1.23463C10.7906 1.33562 10.8474 1.47258 10.8474 1.61538V2.15385H1.15505V1.61538C1.15505 1.47258 1.21178 1.33562 1.31276 1.23463C1.41374 1.13365 1.5507 1.07692 1.69351 1.07692ZM10.3089 12.9231H1.69351C1.5507 12.9231 1.41374 12.8663 1.31276 12.7654C1.21178 12.6644 1.15505 12.5274 1.15505 12.3846V11.8462H10.8474V12.3846C10.8474 12.5274 10.7906 12.6644 10.6896 12.7654C10.5887 12.8663 10.4517 12.9231 10.3089 12.9231Z"
                        fill="white"
                        fillOpacity="0.7"
                      />
                    </svg>
                  </span>
                  <p className="text-sm font-normal leading-[22px] tracking-[3%]">
                    Airtime
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-[42px] shrink-0 gradient-border rounded-full bg-white/5 flex items-center justify-center">
                    <IoWifi width={14} color="#FFFFFFB2" />
                  </span>
                  <p className="text-sm font-normal leading-[22px] tracking-[3%]">
                    Data
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-[42px] shrink-0 gradient-border rounded-full bg-white/5 flex items-center justify-center">
                    <RiLightbulbFlashLine width={14} color="#FFFFFFB2" />
                  </span>
                  <p className="text-sm font-normal leading-[22px] tracking-[3%]">
                    Electricity
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/15 rounded-[20px] px-6 py-8 flex items-center flex-col gap-11">
            <DoughnutChart />
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="py-2 px-3 h-16 flex items-center justify-center gap-1 rounded-[15px] flex-col border border-white/15">
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  Bitcoin
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  0.0483
                </p>
              </div>
              <div className="py-2 px-3 h-16 flex items-center justify-center gap-1 rounded-[15px] flex-col border border-white/15">
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  Etheruem
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  0.0483
                </p>
              </div>
              <div className="py-2 px-3 h-16 flex items-center justify-center gap-1 rounded-[15px] flex-col border border-white/15">
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  Digital Naira
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  1,200
                </p>
              </div>
              <div className="py-2 px-3 h-16 flex items-center justify-center gap-1 rounded-[15px] flex-col border border-white/15">
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  USDT
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  0.0483
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:hidden pb-24 lg:pb-0">
        <div className="min-h-[191px] bg-[url('../../public/balance-bg.png')] bg-center bg-fill bg-no-repeat rounded-[20px] py-6 px-4 flex flex-col justify-between w-full">
          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <p className="text-xs leading-2.5 inline-flex items-center gap-0.5 text-white/60">
                Naira Balance
                <svg
                  width="5"
                  height="3"
                  viewBox="0 0 5 3"
                  fill="none"
                  className="fill-white/50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.88582 0.000381947L0.285715 0.000381947C0.249265 0.000496387 0.213537 0.0105493 0.182377 0.0294585C0.151216 0.0483677 0.125802 0.075417 0.108871 0.107696C0.0919394 0.139974 0.0841317 0.176259 0.0862885 0.212645C0.0884452 0.24903 0.100484 0.284139 0.12111 0.314191L1.92116 2.91426C1.99576 3.02207 2.17537 3.02207 2.25017 2.91426L4.05022 0.314191C4.07106 0.284201 4.08328 0.249075 4.08555 0.212629C4.08782 0.176183 4.08007 0.13981 4.06312 0.107464C4.04617 0.0751169 4.02069 0.0480325 3.98943 0.0291541C3.95817 0.0102754 3.92233 0.000324488 3.88582 0.000381947Z" />
                </svg>
              </p>

              <span
                onClick={() => {
                  setViewBalance((prev) => !prev);
                }}
              >
                {viewBalance ? (
                  <LuEye width={8} className="text-white/60 cursor-pointer" />
                ) : (
                  <LuEyeClosed
                    width={8}
                    className="text-white/60 cursor-pointer"
                  />
                )}
              </span>
            </div>
            <h2
              className={`text-[21px] sm:text-2xl md:text-3xl lg:text-4xl ${anton.className} leading-[100%] tracking-[3%] text-white/90`}
            >
              {viewBalance ? assets.wallets.NGN.balance : "******"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-[51px] w-full max-w-[145px] flex items-center justify-center gap-2.5 py-2 px-4 bg-[#A082F9] text-[#1A1A1C] rounded-[10px] font-semibold text-xs leading-[150%] tracking-[2px]">
              <GoArrowUp width={12} color="#1A1A1C" /> Deposit
            </button>
            <Link
              href={"/send"}
              className="h-[51px] w-full max-w-[145px] flex items-center justify-center gap-2.5 py-2 px-4 rounded-[10px] font-semibold text-xs leading-[150%] tracking-[2px] text-[#2C2C26] bg-[#EAE4FD] border border-black"
            >
              <GoArrowUpRight width={12} color="#2C2C26" />
              Send
            </Link>
          </div>
        </div>
        <div className="flex justify-between py-4 px-6 rounded-[20px] bg-[#211F22]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="size-[42px] shrink-0 gradient-border rounded-full bg-white/5 flex items-center justify-center">
                <LuArrowRightLeft width={14} color="#FFFFFFB2" />
              </span>
              <p className="text-sm font-normal leading-[22px] tracking-[3%]">
                Convert
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-[42px] shrink-0 gradient-border rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3089 0H1.69351C1.26508 0 0.854204 0.170192 0.55126 0.473135C0.248317 0.776079 0.078125 1.18696 0.078125 1.61538V12.3846C0.078125 12.813 0.248317 13.2239 0.55126 13.5269C0.854204 13.8298 1.26508 14 1.69351 14H10.3089C10.7373 14 11.1482 13.8298 11.4511 13.5269C11.7541 13.2239 11.9243 12.813 11.9243 12.3846V1.61538C11.9243 1.18696 11.7541 0.776079 11.4511 0.473135C11.1482 0.170192 10.7373 0 10.3089 0ZM1.15505 3.23077H10.8474V10.7692H1.15505V3.23077ZM1.69351 1.07692H10.3089C10.4517 1.07692 10.5887 1.13365 10.6896 1.23463C10.7906 1.33562 10.8474 1.47258 10.8474 1.61538V2.15385H1.15505V1.61538C1.15505 1.47258 1.21178 1.33562 1.31276 1.23463C1.41374 1.13365 1.5507 1.07692 1.69351 1.07692ZM10.3089 12.9231H1.69351C1.5507 12.9231 1.41374 12.8663 1.31276 12.7654C1.21178 12.6644 1.15505 12.5274 1.15505 12.3846V11.8462H10.8474V12.3846C10.8474 12.5274 10.7906 12.6644 10.6896 12.7654C10.5887 12.8663 10.4517 12.9231 10.3089 12.9231Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                </svg>
              </span>
              <p className="text-sm font-normal leading-[22px] tracking-[3%]">
                Airtime
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="size-[42px] shrink-0 gradient-border rounded-full bg-white/5 flex items-center justify-center">
                <IoWifi width={14} color="#FFFFFFB2" />
              </span>
              <p className="text-sm font-normal leading-[22px] tracking-[3%]">
                Data
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-[42px] shrink-0 gradient-border rounded-full bg-white/5 flex items-center justify-center">
                <RiLightbulbFlashLine width={14} color="#FFFFFFB2" />
              </span>
              <p className="text-sm font-normal leading-[22px] tracking-[3%]">
                Electricity
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm md:text-base font-semibold leading-[22px] tracking-[3%]">
              Wallets
            </p>
            <p className="text-xs font-semibold leading-[22px] tracking-[3%] cursor-pointer hover:underline">
              View all
            </p>
          </div>
          <div className="max-sm:flex max-sm:overflow-x-auto max-sm:[&>div]:w-1/2 max-sm:[&>div]:flex-none hide-scrollbar sm:grid sm:grid-cols-3 gap-4">
            <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
              <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                <Image
                  src={"/streple-s.png"}
                  alt="streple strp"
                  aria-label="streple strp"
                  width={14}
                  height={14}
                  quality={100}
                />
              </div>
              <p className="text-xs font-normal leading-[22px] text-white/60">
                STRP
              </p>
              <p className="text-sm font-semibold leading-[22px] text-white/80">
                STRP {assets.wallets.STP.balance}
              </p>
            </div>
            <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
              <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.29152 14.348C6.29152 14.538 6.14152 14.638 5.96152 14.588C4.75122 14.2009 3.69524 13.4392 2.94599 12.4129C2.19673 11.3866 1.79297 10.1487 1.79297 8.87803C1.79297 7.60732 2.19673 6.36948 2.94599 5.34317C3.69524 4.31686 4.75122 3.55516 5.96152 3.16803C6.14152 3.10803 6.29152 3.21803 6.29152 3.40803V3.86803C6.29152 3.99803 6.19152 4.13803 6.07152 4.17803C4.16152 4.87803 2.79152 6.71803 2.79152 8.86803C2.79152 11.018 4.16152 12.858 6.07152 13.558C6.19152 13.598 6.29152 13.748 6.29152 13.868V14.338V14.348Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.29417 12.6279C8.29417 12.7679 8.18417 12.8779 8.04417 12.8779H7.54417C7.40417 12.8779 7.29417 12.7679 7.29417 12.6279V11.8379C6.20417 11.6879 5.67417 11.0779 5.52417 10.2479C5.49417 10.1079 5.61417 9.97792 5.75417 9.97792H6.32417C6.44417 9.97792 6.54417 10.0579 6.56417 10.1779C6.67417 10.6779 6.95417 11.0479 7.83417 11.0479C8.48417 11.0479 8.93417 10.6879 8.93417 10.1479C8.93417 9.60792 8.66417 9.40792 7.71417 9.24792C6.31417 9.05792 5.65417 8.63792 5.65417 7.53792C5.65417 6.68792 6.29417 6.03792 7.28417 5.88792V5.11792C7.28417 4.97792 7.39417 4.86792 7.53417 4.86792H8.03417C8.17417 4.86792 8.28417 4.97792 8.28417 5.11792V5.91792C9.09417 6.05792 9.60417 6.51792 9.76417 7.27792C9.79417 7.41792 9.68417 7.55792 9.53417 7.55792H9.00417C8.89417 7.55792 8.79417 7.47792 8.76417 7.37792C8.62417 6.89792 8.27417 6.68792 7.68417 6.68792C7.02417 6.68792 6.68417 7.00792 6.68417 7.45792C6.68417 7.92792 6.87417 8.16792 7.89417 8.31792C9.26417 8.50792 9.97417 8.89792 9.97417 10.0679C9.97417 10.9579 9.31417 11.6779 8.28417 11.8379V12.6279H8.29417Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.62297 14.588C9.44297 14.648 9.29297 14.538 9.29297 14.348V13.888C9.29297 13.748 9.37297 13.618 9.51297 13.578C11.423 12.878 12.793 11.038 12.793 8.88805C12.793 6.73805 11.423 4.89805 9.51297 4.19805C9.45103 4.17205 9.3976 4.12923 9.35872 4.07445C9.31984 4.01967 9.29706 3.9551 9.29297 3.88805V3.42805C9.29297 3.23805 9.44297 3.12805 9.62297 3.18805C12.043 3.95805 13.793 6.22805 13.793 8.89805C13.793 11.568 12.043 13.828 9.62297 14.608V14.588Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                </svg>
              </div>
              <p className="text-xs font-normal leading-[22px] text-white/60">
                USDC
              </p>
              <p className="text-sm font-semibold leading-[22px] text-white/80">
                USDC {assets.wallets.USDC.balance}
              </p>
            </div>
            <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
              <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.16797 13V2.052C3.1679 1.81932 3.24511 1.59322 3.38749 1.40919C3.52986 1.22515 3.72933 1.09363 3.95457 1.03526C4.1798 0.976888 4.41804 0.994986 4.63188 1.08671C4.84571 1.17843 5.02303 1.33858 5.13597 1.542L11.2 12.458C11.3129 12.6614 11.4902 12.8216 11.7041 12.9133C11.9179 13.005 12.1561 13.0231 12.3814 12.9647C12.6066 12.9064 12.8061 12.7748 12.9485 12.5908C13.0908 12.4068 13.168 12.1807 13.168 11.948V1M1.16797 5H15.168M1.16797 9H15.168"
                    stroke="white"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-xs font-normal leading-[22px] text-white/60">
                NGN
              </p>
              <p className="text-sm font-semibold leading-[22px] text-white/80">
                NGN {assets.wallets.NGN.balance}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm md:text-base font-semibold leading-[22px] tracking-[3%]">
              Recent transactions
            </p>
            <p className="text-xs font-semibold leading-[22px] tracking-[3%] cursor-pointer hover:underline">
              View all
            </p>
          </div>
          <div className="space-y-3 w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex items-center justify-between" key={index}>
                <div className="flex items-center gap-4">
                  <span className="size-[35px] rounded-full bg-white/5 flex items-center justify-center">
                    <LuArrowRightLeft width={12} color="#A082F9B2" />
                  </span>
                  <span className="space-y-1">
                    <p className="text-xs font-normal leading-4 tracking-[3%]">
                      NGN to USD
                    </p>
                    <p className="text-xs font-normal leading-4 tracking-[3%] text-white/50">
                      22 April, 2025. 12:30PM
                    </p>
                  </span>
                </div>
                <p className="text-xs font-semibold leading-[22px] tracking-[3%]">
                  $250
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
