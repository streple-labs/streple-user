import { baloo } from "@/app/fonts";
import Image from "next/image";
import React from "react";
import PerformanceChart from "./_components/performance-chart";
import DrawdownCurve from "./_components/drawdown-curve";
import {
  getProtraderDrawdownCurve,
  getProtraderPerformanceCurve,
  getProtraderProfilePerformance,
  getProtraderProfileStat,
} from "@/utils/api/queries";
import PerformanceTab from "./_components/performance-tab";
import FollowTraderBtn from "./_components/follow-trader-btn";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await params;

  const [
    { document: traderProfileStat, error: traderProfileStatError },
    {
      document: traderProfilePerformance,
      error: traderProfilePerformanceError,
    },
    { document: traderDrawdownCurve, error: traderDrawdownCurveError },
    { document: traderPerformanceCurve, error: traderPerformanceCurveError },
  ] = await Promise.all([
    getProtraderProfileStat(id),
    getProtraderProfilePerformance(
      id,
      (
        await searchParams
      ).performanceTabPeriod
    ),
    getProtraderDrawdownCurve(id, (await searchParams)?.drawdownChartPeriod),
    getProtraderPerformanceCurve(
      id,
      (
        await searchParams
      ).performanceChartPeriod
    ),
  ]);

  return (
    <div className="flex flex-col gap-8 w-full relative min-h-screen">
      <span className="absolute inset-x-0 w-full -top-[120px]">
        <svg
          className="max-w-[1440px] max-h-[636px] size-full"
          viewBox="0 0 1440 636"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_2902_1569)">
            <ellipse
              cx="836.412"
              cy="109.325"
              rx="507.412"
              ry="129.325"
              fill="#A082F9"
              fillOpacity="0.3"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_2902_1569"
              x="-68.2"
              y="-417.2"
              width="1809.22"
              height="1053.05"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="198.6"
                result="effect1_foregroundBlur_2902_1569"
              />
            </filter>
          </defs>
        </svg>
      </span>

      <div className="flex items-center flex-col lg:flex-row justify-between gap-4 md:gap-6 relative">
        <div className="size-[60px] md:size-[130px] shrink-0 rounded-full flex items-center justify-center bg-gradient-to-b from-[#503C8B] to-[#BDB510] drop-shadow-[#00000040] drop-shadow-[0px_4px_4px]">
          <Image
            src={"/traders-pfp-1.jpg"}
            aria-label="traders profile picture"
            alt="traders profile picture"
            width={125}
            height={125}
            className="size-[55px] md:size-[125px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-6 w-full">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
            <div className="flex flex-col max-md:items-center gap-3 w-full">
              <div className="flex items-center gap-3">
                <p
                  className={`${baloo.className} text-sm md:text-base text-transparent bg-gradient-to-r from-white to-white/0 bg-clip-text`}
                >
                  Mayaxx
                </p>
                <div className="py-1 px-2 rounded-[10px] flex items-center gap-2.5 border border-white/20 shadow-[0px_4px_7px_0px_#8066CF33] backdrop-blur-xs bg-gradient-to-r from-[#8066CF] to-[#8066CF00]">
                  <Image
                    src={"/traders-badge-1.png"}
                    alt="badge"
                    width={16}
                    height={16}
                  />

                  <p className="text-[10px] md:text-xs leading-5 tracking-[2px] font-normal">
                    Bronze
                  </p>
                </div>
              </div>
              <p className="text-[#FFFFFFB2] text-[10px] md:text-xs max-lg:text-center leading-5 tracking-[2px] font-normal">
                Making crypto trades with a focus on profitability.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.3184 6.86636C8.00024 6.42057 8.5179 5.77111 8.79483 5.01404C9.07176 4.25696 9.09326 3.43246 8.85614 2.66246C8.61903 1.89246 8.13588 1.21784 7.47816 0.73836C6.82045 0.258881 6.02307 0 5.20395 0C4.38482 0 3.58745 0.258881 2.92973 0.73836C2.27201 1.21784 1.78887 1.89246 1.55175 2.66246C1.31463 3.43246 1.33613 4.25696 1.61306 5.01404C1.88999 5.77111 2.40765 6.42057 3.08949 6.86636C1.85611 7.3128 0.802767 8.13893 0.0866467 9.22147C0.0490099 9.27641 0.0228673 9.33814 0.00973857 9.40309C-0.00339017 9.46803 -0.00324318 9.53489 0.010171 9.59978C0.0235852 9.66467 0.049999 9.72629 0.087877 9.78107C0.125755 9.83584 0.174342 9.88268 0.230813 9.91885C0.287284 9.95503 0.350513 9.97981 0.416825 9.99178C0.483137 10.0037 0.551208 10.0026 0.617083 9.98854C0.682958 9.97444 0.745322 9.94762 0.800549 9.90964C0.855777 9.87166 0.902767 9.82328 0.938788 9.76731C1.40072 9.06957 2.03281 8.49621 2.77766 8.0993C3.5225 7.70238 4.35651 7.49449 5.20395 7.49449C6.05138 7.49449 6.88539 7.70238 7.63024 8.0993C8.37508 8.49621 9.00718 9.06957 9.46911 9.76731C9.54372 9.87622 9.65899 9.95192 9.78998 9.97804C9.92097 10.0042 10.0572 9.97859 10.1691 9.90688C10.2811 9.83517 10.3598 9.72306 10.3883 9.5948C10.4167 9.46654 10.3927 9.33243 10.3212 9.22147C9.60513 8.13893 8.55179 7.3128 7.3184 6.86636ZM2.40587 3.74871C2.40587 3.20521 2.56997 2.67393 2.87743 2.22203C3.18489 1.77014 3.62189 1.41793 4.13317 1.20994C4.64445 1.00196 5.20705 0.947541 5.74982 1.05357C6.2926 1.1596 6.79117 1.42132 7.18249 1.80562C7.5738 2.18993 7.84029 2.67956 7.94826 3.21261C8.05622 3.74566 8.00081 4.29818 7.78903 4.80029C7.57725 5.30241 7.21862 5.73158 6.75847 6.03353C6.29833 6.33548 5.75735 6.49664 5.20395 6.49664C4.46211 6.49581 3.7509 6.20604 3.22634 5.69088C2.70178 5.17572 2.40671 4.47725 2.40587 3.74871ZM15.7692 9.91282C15.6562 9.98519 15.5186 10.0105 15.3866 9.98323C15.2545 9.95594 15.139 9.87827 15.0653 9.76731C14.6039 9.06916 13.9719 8.49555 13.2269 8.0988C12.4819 7.70205 11.6476 7.49478 10.8001 7.49589C10.6652 7.49589 10.5358 7.44325 10.4404 7.34955C10.345 7.25586 10.2914 7.12877 10.2914 6.99627C10.2914 6.86376 10.345 6.73667 10.4404 6.64298C10.5358 6.54928 10.6652 6.49664 10.8001 6.49664C11.2122 6.49626 11.6191 6.4065 11.9917 6.23378C12.3643 6.06107 12.6935 5.80965 12.9558 5.4975C13.218 5.18535 13.4068 4.82017 13.5087 4.42805C13.6106 4.03594 13.623 3.62657 13.5451 3.22919C13.4672 2.83181 13.3009 2.45623 13.058 2.12929C12.8152 1.80236 12.5018 1.53213 12.1403 1.33791C11.7788 1.1437 11.3781 1.0303 10.9668 1.00581C10.5555 0.981318 10.1437 1.04635 9.761 1.19625C9.69859 1.22274 9.63141 1.23668 9.56343 1.23725C9.49544 1.23781 9.42803 1.22499 9.36518 1.19953C9.30232 1.17408 9.2453 1.13651 9.19749 1.08905C9.14967 1.04158 9.11202 0.98519 9.08677 0.923197C9.06152 0.861203 9.04918 0.794868 9.05048 0.728111C9.05177 0.661354 9.06668 0.59553 9.09432 0.534527C9.12196 0.473525 9.16177 0.418582 9.2114 0.372944C9.26102 0.327307 9.31946 0.291901 9.38326 0.26882C10.2592 -0.0742658 11.2335 -0.086612 12.1182 0.234162C13.0029 0.554937 13.7353 1.1861 14.1741 2.0059C14.6129 2.8257 14.727 3.77604 14.4944 4.67358C14.2618 5.57113 13.699 6.35229 12.9146 6.86636C14.1479 7.3128 15.2013 8.13893 15.9174 9.22147C15.9911 9.33245 16.0169 9.46763 15.9891 9.59728C15.9613 9.72693 15.8822 9.84043 15.7692 9.91282Z"
                      fill="url(#paint0_linear_2902_1657)"
                      fillOpacity="0.7"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2902_1657"
                        x1="2.19812"
                        y1="-5.29e-07"
                        x2="13.8019"
                        y2="10"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="font-bold opacity-80 text-[10px] md:text-xs tracking-[2px] text-transparent bg-gradient-to-r from-white to-white/0 bg-clip-text">
                    Followers:
                  </p>
                </div>
                <p className="font-bold text-transparent text-[10px] md:text-xs tracking-[2px] bg-gradient-to-r from-white to-white/0 bg-clip-text">
                  85/100
                </p>
              </div>
            </div>
            <FollowTraderBtn trader_id={id} />
          </div>

          {traderProfileStatError ? (
            <p className="w-full text-center text-red-500">
              {traderProfileStatError}
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="p-3 rounded-[15px] flex flex-col justify-between max-md:items-center gap-1.5 bg-[#FFFFFF08]">
                <p className="font-semibold text-[8px] sm:text-[10px] md:text-xs tracking-[2px] text-white/40">
                  Total win positions
                </p>
                <p className="font-semibold text-xs sm:text-sm md:text-base tracking-[2px] text-white/80">
                  {traderProfileStat?.winningPosition.toFixed(2)}
                </p>
              </div>
              <div className="p-3 rounded-[15px] flex flex-col justify-between max-md:items-center gap-1.5 bg-[#FFFFFF08]">
                <p className="font-semibold text-[8px] sm:text-[10px] md:text-xs tracking-[2px] text-white/40">
                  Total positions
                </p>
                <p className="font-semibold text-xs sm:text-sm md:text-base tracking-[2px] text-white/80">
                  {traderProfileStat?.totalPosition.toFixed(2)}
                </p>
              </div>
              <div className="p-3 rounded-[15px] flex flex-col justify-between max-md:items-center gap-1.5 bg-[#FFFFFF08]">
                <p className="font-semibold text-[8px] sm:text-[10px] md:text-xs tracking-[2px] text-white/40">
                  Win rate (%)
                </p>
                <p className="font-semibold text-xs sm:text-sm md:text-base tracking-[2px] text-white/80">
                  {traderProfileStat?.winRate.toFixed(2)}%
                </p>
              </div>
              <div className="p-3 rounded-[15px] flex flex-col justify-between max-md:items-center gap-1.5 bg-[#FFFFFF08]">
                <p className="font-semibold text-[8px] sm:text-[10px] md:text-xs tracking-[2px] text-white/40">
                  Profit to loss ratio
                </p>
                <p className="font-semibold text-xs sm:text-sm md:text-base tracking-[2px] text-white/80">
                  {traderProfileStat?.profitToLossRatio?.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6 relative">
        <div className="w-full lg:w-2/5 h-[379px] border border-[#FFFFFF1A] bg-[#6151911A] rounded-[20px] p-6 flex flex-col gap-4">
          {traderProfilePerformanceError ? (
            <p className="w-full text-center text-red-500">
              {traderProfilePerformanceError}
            </p>
          ) : (
            <PerformanceTab data={traderProfilePerformance!} />
          )}
        </div>
        <div className="w-full lg:w-3/5">
          {traderDrawdownCurveError ? (
            <p className="w-full text-center text-red-500">
              {traderDrawdownCurveError}
            </p>
          ) : (
            <DrawdownCurve data={traderDrawdownCurve!} />
          )}
        </div>
      </div>
      <div className="pb-10 relative">
        {traderPerformanceCurveError ? (
          <p className="w-full text-center text-red-500">
            {traderPerformanceCurveError}
          </p>
        ) : (
          <PerformanceChart data={traderPerformanceCurve!} />
        )}
      </div>
    </div>
  );
}
