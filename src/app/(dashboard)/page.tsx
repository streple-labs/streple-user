"use client";

import { GoArrowUp, GoArrowUpRight } from "react-icons/go";
import { IoWifi } from "react-icons/io5";
import { LuArrowRightLeft, LuEyeClosed } from "react-icons/lu";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { anton } from "../fonts";
import DoughnutChart from "@/component/layout/dougnut-chart";
import { useAuth } from "@/context/auth-context";

export default function Home() {
  const {
    user: { user_data },
  } = useAuth();

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

                <LuEyeClosed
                  width={8}
                  className="text-white/60 cursor-pointer"
                />
              </div>
              <h2
                className={`text-[21px] sm:text-2xl md:text-3xl lg:text-4xl ${anton.className} leading-[100%] tracking-[3%] text-white/90`}
              >
                50,000
              </h2>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button className="h-[41px] w-[137px] flex items-center justify-center gap-2.5 py-2 px-4 bg-[#A082F9] text-[#1A1A1C] rounded-[10px] font-semibold text-xs leading-[150%] tracking-[2px]">
                <GoArrowUp width={12} color="#1A1A1C" /> Deposit
              </button>
              <button className="h-[41px] w-[137px] flex items-center justify-center gap-2.5 py-2 px-4 rounded-[10px] font-semibold text-xs leading-[150%] tracking-[2px] text-[#2C2C26] bg-[#EAE4FD] border border-black">
                <GoArrowUpRight width={12} color="#2C2C26" />
                Send
              </button>
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
            <div className="w-full grid grid-cols-4 gap-4">
              <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
                <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                  <svg
                    width="13"
                    height="22"
                    viewBox="0 0 13 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.76608 3.69005V1.49707M7.42105 3.69005V1.49707M3.76608 20.5029V17.886M7.42105 20.5029V17.886M7.71345 10.1959H1.5M7.65497 10.1959C8.48085 10.1485 9.2578 9.78884 9.82843 9.18991C10.399 8.59099 10.7207 7.79754 10.7281 6.97034C10.7355 6.14313 10.4282 5.34403 9.86847 4.73495C9.30871 4.12586 8.53834 3.75234 7.71345 3.69005H2.68421C2.37014 3.69005 2.06893 3.81482 1.84685 4.0369C1.62476 4.25898 1.5 4.56019 1.5 4.87426V16.7017C1.5 17.0158 1.62476 17.317 1.84685 17.5391C2.06893 17.7612 2.37014 17.886 2.68421 17.886H7.65497C8.67474 17.886 9.65273 17.4809 10.3738 16.7598C11.0949 16.0387 11.5 15.0607 11.5 14.0409C11.5 13.0212 11.0949 12.0432 10.3738 11.3221C9.65273 10.601 8.67474 10.1959 7.65497 10.1959Z"
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  Bitcoin
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  0.0483BTC
                </p>
              </div>
              <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
                <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.375 1H14.625M8.5 1V6.25M8.5 15V9.75M5 5.375C3.66551 5.63503 2.62254 6.03641 2.03285 6.51689C1.44315 6.99737 1.3397 7.5301 1.73852 8.03244C2.13735 8.53479 3.01616 8.97868 4.23867 9.29528C5.46118 9.61188 6.95906 9.78348 8.5 9.78348C10.0409 9.78348 11.5388 9.61188 12.7613 9.29528C13.9838 8.97868 14.8627 8.53479 15.2615 8.03244C15.6603 7.5301 15.5568 6.99737 14.9672 6.51689C14.3775 6.03641 13.3345 5.63503 12 5.375"
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  USDT
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  0.0483USDT
                </p>
              </div>
              <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
                <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                  <svg
                    width="15"
                    height="22"
                    viewBox="0 0 15 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.46241 13.891L7.83203 18.525L11.2017 13.891L7.83203 15.9648L4.46241 13.891ZM12.3269 11.1435L7.83203 3.839L3.33716 11.1435L7.83203 13.9102L12.3269 11.1435ZM0.832031 11.875L7.83203 0.5L14.832 11.875L7.83203 21.5L0.832031 11.875Z"
                      fill="white"
                      fillOpacity="0.7"
                    />
                  </svg>
                </div>
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  ETH
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  0.0483ETH
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
                  Digital Naira
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  NGN1,200
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

              <LuEyeClosed width={8} className="text-white/60 cursor-pointer" />
            </div>
            <h2
              className={`text-[21px] sm:text-2xl md:text-3xl lg:text-4xl ${anton.className} leading-[100%] tracking-[3%] text-white/90`}
            >
              50,000
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-[51px] w-full max-w-[145px] flex items-center justify-center gap-2.5 py-2 px-4 bg-[#A082F9] text-[#1A1A1C] rounded-[10px] font-semibold text-xs leading-[150%] tracking-[2px]">
              <GoArrowUp width={12} color="#1A1A1C" /> Deposit
            </button>
            <button className="h-[51px] w-full max-w-[145px] flex items-center justify-center gap-2.5 py-2 px-4 rounded-[10px] font-semibold text-xs leading-[150%] tracking-[2px] text-[#2C2C26] bg-[#EAE4FD] border border-black">
              <GoArrowUpRight width={12} color="#2C2C26" />
              Send
            </button>
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
          <div className="w-full grid grid-cols-2 gap-3 md:gap-4">
            <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
              <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                <svg
                  width="13"
                  height="22"
                  viewBox="0 0 13 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.76608 3.69005V1.49707M7.42105 3.69005V1.49707M3.76608 20.5029V17.886M7.42105 20.5029V17.886M7.71345 10.1959H1.5M7.65497 10.1959C8.48085 10.1485 9.2578 9.78884 9.82843 9.18991C10.399 8.59099 10.7207 7.79754 10.7281 6.97034C10.7355 6.14313 10.4282 5.34403 9.86847 4.73495C9.30871 4.12586 8.53834 3.75234 7.71345 3.69005H2.68421C2.37014 3.69005 2.06893 3.81482 1.84685 4.0369C1.62476 4.25898 1.5 4.56019 1.5 4.87426V16.7017C1.5 17.0158 1.62476 17.317 1.84685 17.5391C2.06893 17.7612 2.37014 17.886 2.68421 17.886H7.65497C8.67474 17.886 9.65273 17.4809 10.3738 16.7598C11.0949 16.0387 11.5 15.0607 11.5 14.0409C11.5 13.0212 11.0949 12.0432 10.3738 11.3221C9.65273 10.601 8.67474 10.1959 7.65497 10.1959Z"
                    stroke="white"
                    strokeOpacity="0.7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-xs font-normal leading-[22px] text-white/60">
                Bitcoin
              </p>
              <p className="text-sm font-semibold leading-[22px] text-white/80">
                0.0483BTC
              </p>
            </div>
            <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
              <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.375 1H14.625M8.5 1V6.25M8.5 15V9.75M5 5.375C3.66551 5.63503 2.62254 6.03641 2.03285 6.51689C1.44315 6.99737 1.3397 7.5301 1.73852 8.03244C2.13735 8.53479 3.01616 8.97868 4.23867 9.29528C5.46118 9.61188 6.95906 9.78348 8.5 9.78348C10.0409 9.78348 11.5388 9.61188 12.7613 9.29528C13.9838 8.97868 14.8627 8.53479 15.2615 8.03244C15.6603 7.5301 15.5568 6.99737 14.9672 6.51689C14.3775 6.03641 13.3345 5.63503 12 5.375"
                    stroke="white"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-xs font-normal leading-[22px] text-white/60">
                USDT
              </p>
              <p className="text-sm font-semibold leading-[22px] text-white/80">
                0.0483USDT
              </p>
            </div>
            {/* <div className="h-[175px] bg-gradient-to-t flex flex-col items-center justify-center rounded-[15px] gap-3 px-6 py-4 bg-[#211F22]">
                <div className="size-10 rounded-[7px] flex items-center justify-center bg-[rgba(255,255,255,0.08)]">
                  <svg
                    width="15"
                    height="22"
                    viewBox="0 0 15 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.46241 13.891L7.83203 18.525L11.2017 13.891L7.83203 15.9648L4.46241 13.891ZM12.3269 11.1435L7.83203 3.839L3.33716 11.1435L7.83203 13.9102L12.3269 11.1435ZM0.832031 11.875L7.83203 0.5L14.832 11.875L7.83203 21.5L0.832031 11.875Z"
                      fill="white"
                      fillOpacity="0.7"
                    />
                  </svg>
                </div>
                <p className="text-xs font-normal leading-[22px] text-white/60">
                  ETH
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  0.0483ETH
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
                  Digital Naira
                </p>
                <p className="text-sm font-semibold leading-[22px] text-white/80">
                  NGN1,200
                </p>
              </div> */}
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
