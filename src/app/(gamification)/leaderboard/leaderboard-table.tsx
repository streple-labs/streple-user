"use client";

import { baloo } from "@/app/fonts";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LeaderboardTable({
  referrersLeaderboardData,
  stpLeaderboardData,
}: {
  referrersLeaderboardData: {
    topReferrers: null | object[];
    topReferrersError: null | string;
  };
  stpLeaderboardData: {
    stpLeaderboards:
      | null
      | {
          username: string;
          avatarUrl: string;
          totalBalance: string;
          userId: string;
        }[];
    stpLeaderboardError: null | string;
  };
}) {
  const {
    user: { user_data },
  } = useAuth();

  const [leaderboardType, setLeaderboardType] = useState<"stp" | "referral">(
    "stp"
  );

  return (
    <div className="flex flex-col gap-8 w-full overflow-y-auto hide-scrollbar relative">
      <div className="flex items-center justify-between">
        <div className="h-10 w-[146px] flex items-center justify-center bg-gradient-to-r from-white/70 to-black/40 rounded-[34px]">
          <div className="h-[38px] rounded-4xl w-[144px] py-1 px-3 flex items-center justify-center gap-1 bg-gradient-to-b from-[#1B191C] via-[#1B191C] to-[#8B6CE5]">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1064 4.8623C15.6078 3.60114 17.3922 3.60114 17.8936 4.8623L19.6777 9.35156C20.0345 10.2494 20.8766 10.8619 21.8408 10.9238L26.6621 11.2324C28.0164 11.3196 28.5679 13.0173 27.5234 13.8838L23.8047 16.9678C23.0611 17.5846 22.7394 18.5747 22.9785 19.5107L24.1738 24.1914C24.5096 25.5064 23.0659 26.5557 21.9189 25.8301L17.8369 23.2461C17.0206 22.7296 15.9794 22.7296 15.1631 23.2461L11.0811 25.8301C9.93415 26.5557 8.49037 25.5064 8.82617 24.1914L10.0215 19.5107C10.2606 18.5747 9.93888 17.5846 9.19531 16.9678L5.47656 13.8838C4.43214 13.0173 4.98364 11.3196 6.33789 11.2324L11.1592 10.9238C12.1234 10.8619 12.9655 10.2494 13.3223 9.35156L15.1064 4.8623Z"
                fill="url(#paint0_linear_3689_1514)"
                stroke="#E9BC96"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3689_1514"
                  x1="16.5"
                  y1="0"
                  x2="16.5"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#764217" />
                  <stop offset="1" stopColor="#DFA16C" />
                </linearGradient>
              </defs>
            </svg>

            <p className={`${baloo.className} text-xs`}>Bronze tier</p>
          </div>
        </div>
        <div className="max-md:hidden flex items-center gap-1.5">
          <div
            onClick={() => {
              setLeaderboardType("stp");
            }}
            className={`rounded-[5px] p-2.5 flex items-center justify-center gap-2.5 text-xs cursor-pointer ${
              leaderboardType === "stp" ? "bg-white/5" : "text-white/40"
            }`}
          >
            <p>Leaderboard</p>
          </div>
          <div
            onClick={() => {
              setLeaderboardType("referral");
            }}
            className={`rounded-[5px] p-2.5 flex items-center justify-center gap-2.5 text-xs cursor-pointer ${
              leaderboardType === "referral" ? "bg-white/5" : "text-white/40"
            }`}
          >
            <p>Referral</p>
          </div>
        </div>
      </div>

      <div className="min-h-[145px] md:min-h-[290px] py-4 md:pt-[60px] px-4 md:px-[52px] relative rounded-3xl overflow-hidden">
        <Image
          src="/leaderboard-bg.png"
          alt="background"
          fill
          className="absolute size-full opacity-10 bg-cover bg-center bg-no-repeat"
        />

        <span className="absolute right-0 md:-right-6 bottom-0">
          <svg
            viewBox="0 0 439 290"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[150px] h-[128px] md:w-[439px] md:h-[290px]"
          >
            <g filter="url(#filter0_f_3568_6395)">
              <ellipse cx="297" cy="192" rx="143" ry="114" fill="#C8A85C" />
            </g>
            <defs>
              <filter
                id="filter0_f_3568_6395"
                x="0.5"
                y="-75.5"
                width="593"
                height="535"
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
                  stdDeviation="76.75"
                  result="effect1_foregroundBlur_3568_6395"
                />
              </filter>
            </defs>
          </svg>
        </span>
        <div className="absolute right-0 bottom-0">
          <Image
            src={"/trophy.png"}
            alt="trophy"
            width={273}
            height={270}
            quality={100}
            className="w-[125px] h-[133px] md:w-[273px] md:h-[273px]"
          />
        </div>

        <div className="space-y-2.5 flex-1 relative md:max-w-[585px]">
          <h2
            className={`${baloo.className} text-xl md:text-4xl drop-shadow-[#25251A80] drop-shadow-[0px_4px_4px]`}
          >
            You moved up 4 places last week! Keep going
          </h2>
          <p className="text-[10px]/5 md:text-xs/6 tracking-[2px]">
            Complete more milestones to get higher in the ranking!
          </p>
          <Link href={"/"}>
            <button className="text-[#181812CC] text-sm font-semibold hidden md:flex items-center justify-center shadow-[inset_4px_3px_2px_0px_#EDEBB680] border border-[#ACA40F80] bg-[#BDB510] rounded-[10px] h-[34px] px-8">
              Continue learning
            </button>
          </Link>
        </div>
      </div>

      <div className="md:hidden mx-auto flex items-center gap-1.5">
        <div
          onClick={() => {
            setLeaderboardType("stp");
          }}
          className={`rounded-[10px] p-2.5 flex items-center justify-center gap-2.5 text-xs cursor-pointer ${
            leaderboardType === "stp" ? "bg-white/5" : "text-white/40"
          }`}
        >
          <p>Leaderboard</p>
        </div>
        <div
          onClick={() => {
            setLeaderboardType("referral");
          }}
          className={`rounded-[10px] p-2.5 flex items-center justify-center gap-2.5 text-xs cursor-pointer ${
            leaderboardType === "referral" ? "bg-white/5" : "text-white/40"
          }`}
        >
          <p>Referral</p>
        </div>
      </div>

      {leaderboardType === "stp" ? (
        <div className="flex md:mt-24 items-center justify-center size-full">
          {stpLeaderboardData.stpLeaderboardError ? (
            <div className="flex p-4 items-center justify-center">
              <p className="text-red-600 font-semibold text-sm md:text-lg">
                {stpLeaderboardData.stpLeaderboardError}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 w-full">
              {stpLeaderboardData.stpLeaderboards?.length == 0 && (
                <p className="font-semibold text-sm md:text-lg">
                  No leaderboard data
                </p>
              )}
              {stpLeaderboardData.stpLeaderboards!.map((data, i) => (
                <div
                  className="p-3 border border-white/[2%] rounded-[15px]"
                  key={data.userId}
                >
                  <div
                    className={`${
                      baloo.className
                    } rounded-[10px] py-4 px-3 flex items-center justify-between text-xs/4 tracking-[2px] ${
                      user_data?.fullName === data.username &&
                      "bg-[linear-gradient(90deg,rgba(244,233,14,0.1)_58.23%,rgba(94,77,147,0)_100%)] border-[2px] border-white/[2%]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 relative w-6 h-7">
                        {i == 0 ? (
                          <svg
                            width="24"
                            height="29"
                            viewBox="0 0 24 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.87684 19.2497C9.50476 18.8416 9.53399 18.2091 9.94213 17.837L14.5837 13.6057C14.9918 13.2336 15.6243 13.2629 15.9964 13.671L23.1611 21.5299C23.5921 22.0026 23.4744 22.7529 22.9194 23.0711L20.5141 24.45C20.3871 24.5228 20.2776 24.6226 20.1934 24.7423L18.5985 27.0101C18.2305 27.5334 17.4725 27.5814 17.0415 27.1086L9.87684 19.2497Z"
                              fill="#CABCF4"
                            />
                            <path
                              d="M14.1232 19.2497C14.4952 18.8416 14.466 18.2091 14.0579 17.837L9.41632 13.6057C9.00817 13.2336 8.37567 13.2629 8.00359 13.671L0.838941 21.5299C0.407934 22.0026 0.525572 22.7529 1.08059 23.0711L3.48594 24.45C3.61292 24.5228 3.72237 24.6226 3.80657 24.7423L5.40152 27.0101C5.76954 27.5334 6.5275 27.5814 6.95851 27.1086L14.1232 19.2497Z"
                              fill="#CABCF4"
                            />
                            <path
                              d="M11.0028 1.17153C11.4045 1.041 11.8373 1.041 12.239 1.17153L16.9541 2.70363C17.3558 2.83415 17.7058 3.08849 17.9541 3.43019L20.8682 7.44133C21.1165 7.78302 21.2502 8.19453 21.2502 8.61687V13.575C21.2502 13.9973 21.1165 14.4088 20.8682 14.7505L17.9541 18.7616C17.7058 19.1034 17.3558 19.3577 16.9541 19.4882L12.239 21.0203C11.8373 21.1508 11.4045 21.1508 11.0028 21.0203L6.28773 19.4882C5.88604 19.3577 5.53598 19.1034 5.28773 18.7616L2.37358 14.7505C2.12534 14.4088 1.99164 13.9973 1.99164 13.575V8.61687C1.99164 8.19453 2.12534 7.78302 2.37358 7.44133L5.28773 3.43019C5.53598 3.08849 5.88604 2.83415 6.28773 2.70363L11.0028 1.17153Z"
                              fill="#A182FB"
                            />
                          </svg>
                        ) : i == 1 ? (
                          <svg
                            width="24"
                            height="29"
                            viewBox="0 0 24 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.87684 19.2488C9.50476 18.8406 9.53399 18.2081 9.94213 17.8361L14.5837 13.6047C14.9918 13.2327 15.6243 13.2619 15.9964 13.67L23.1611 21.5289C23.5921 22.0017 23.4744 22.752 22.9194 23.0701L20.5141 24.449C20.3871 24.5218 20.2776 24.6216 20.1934 24.7413L18.5985 27.0092C18.2305 27.5325 17.4725 27.5804 17.0415 27.1076L9.87684 19.2488Z"
                              fill="#F0EC97"
                            />
                            <path
                              d="M14.1271 19.2488C14.4991 18.8406 14.4699 18.2081 14.0618 17.8361L9.42022 13.6047C9.01208 13.2327 8.37958 13.2619 8.0075 13.67L0.842847 21.5289C0.41184 22.0017 0.529478 22.752 1.0845 23.0701L3.48985 24.449C3.61683 24.5218 3.72628 24.6216 3.81048 24.7413L5.40542 27.0092C5.77344 27.5325 6.53141 27.5804 6.96241 27.1076L14.1271 19.2488Z"
                              fill="#F0EC97"
                            />
                            <path
                              d="M11.0067 1.17153C11.4084 1.041 11.8412 1.041 12.2429 1.17153L16.958 2.70363C17.3597 2.83415 17.7097 3.08849 17.958 3.43019L20.8721 7.44133C21.1204 7.78302 21.2541 8.19453 21.2541 8.61687V13.575C21.2541 13.9973 21.1204 14.4088 20.8721 14.7505L17.958 18.7616C17.7097 19.1034 17.3597 19.3577 16.958 19.4882L12.2429 21.0203C11.8412 21.1508 11.4084 21.1508 11.0067 21.0203L6.29163 19.4882C5.88994 19.3577 5.53989 19.1034 5.29163 18.7616L2.37749 14.7505C2.12924 14.4088 1.99554 13.9973 1.99554 13.575V8.61687C1.99554 8.19453 2.12925 7.78302 2.37749 7.44133L5.29163 3.43019C5.53989 3.08849 5.88994 2.83415 6.29163 2.70363L11.0067 1.17153Z"
                              fill="#BDB510"
                            />
                          </svg>
                        ) : i == 2 ? (
                          <svg
                            width="24"
                            height="29"
                            viewBox="0 0 24 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g style={{ mixBlendMode: "luminosity" }}>
                              <path
                                d="M9.87684 19.2488C9.50476 18.8406 9.53399 18.2081 9.94213 17.8361L14.5837 13.6047C14.9918 13.2327 15.6243 13.2619 15.9964 13.67L23.1611 21.5289C23.5921 22.0017 23.4744 22.752 22.9194 23.0701L20.5141 24.449C20.3871 24.5218 20.2776 24.6216 20.1934 24.7413L18.5985 27.0092C18.2305 27.5325 17.4725 27.5804 17.0415 27.1076L9.87684 19.2488Z"
                                fill="#CABCF4"
                              />
                              <path
                                d="M14.1271 19.2488C14.4991 18.8406 14.4699 18.2081 14.0618 17.8361L9.42022 13.6047C9.01208 13.2327 8.37958 13.2619 8.0075 13.67L0.842847 21.5289C0.41184 22.0017 0.529478 22.752 1.0845 23.0701L3.48985 24.449C3.61683 24.5218 3.72628 24.6216 3.81048 24.7413L5.40542 27.0092C5.77344 27.5325 6.53141 27.5804 6.96241 27.1076L14.1271 19.2488Z"
                                fill="#CABCF4"
                              />
                              <path
                                d="M11.0067 1.17153C11.4084 1.041 11.8412 1.041 12.2429 1.17153L16.958 2.70363C17.3597 2.83415 17.7097 3.08849 17.958 3.43019L20.8721 7.44133C21.1204 7.78302 21.2541 8.19453 21.2541 8.61687V13.575C21.2541 13.9973 21.1204 14.4088 20.8721 14.7505L17.958 18.7616C17.7097 19.1034 17.3597 19.3577 16.958 19.4882L12.2429 21.0203C11.8412 21.1508 11.4084 21.1508 11.0067 21.0203L6.29163 19.4882C5.88994 19.3577 5.53989 19.1034 5.29163 18.7616L2.37749 14.7505C2.12924 14.4088 1.99554 13.9973 1.99554 13.575V8.61687C1.99554 8.19453 2.12925 7.78302 2.37749 7.44133L5.29163 3.43019C5.53989 3.08849 5.88994 2.83415 6.29163 2.70363L11.0067 1.17153Z"
                                fill="#A182FB"
                              />
                            </g>
                          </svg>
                        ) : null}
                        <p className="absolute top-1 left-1/2 -translate-x-1/2">
                          {i + 1}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* <div className="flex items-center justify-center size-6 bg-black/50 rounded-full p-1 text-[10px]">
                          {`${data.username.split(" ")[0].charAt(0)}${
                            data.username.split(" ")[1]?.charAt(0) || ""
                          }`}
                        </div> */}
                        {/* <Image
                          src={"/traders-pfp-1.jpg"}
                          alt="profile picture"
                          aria-label="profile picture"
                          width={24}
                          height={24}
                          quality={100}
                          className="rounded-full"
                        /> */}

                        <p className="max-w-[150px] text-elipsis whitespace-nowrap overflow-hidden">
                          {data.username}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/80">{data.totalBalance}STPs</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
