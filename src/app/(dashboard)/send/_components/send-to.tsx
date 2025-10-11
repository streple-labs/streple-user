import { anton } from "@/app/fonts";
import Loader from "@/component/ui/loader";
import { getRecentTransactions } from "@/utils/api/queries";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SendTo({
  setSendTo,
  setRecipient,
}: {
  setSendTo: Dispatch<
    SetStateAction<"streple-user" | "bank" | "wallet" | "scan-code" | null>
  >;
  setRecipient: Dispatch<
    SetStateAction<
      | {
          name: string;
          username: string;
          id: string;
        }
      | undefined
    >
  >;
}) {
  const [searchTransactions, setSearchTransactions] = useState("");

  const { data: recentTransactions, isPending: isRecentTransactionPending } =
    useQuery({
      queryKey: ["recent-transactions"],
      queryFn: async () => await getRecentTransactions(),
    });

  console.log(recentTransactions?.document);

  return (
    <div className="p-8 rounded-[20px] bg-[#211F22] flex flex-col gap-8">
      <div className="space-y-6 w-full">
        <h2
          className={`${anton.className} test-base md:text-xl leading-[150%] tracking-[2px]`}
        >
          Send to
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-between [&>div]:cursor-pointer">
          <div
            className="flex flex-col items-center gap-5"
            onClick={() => {
              setSendTo("streple-user");
            }}
          >
            <span className="size-12 rounded-full bg-[#B39FF0] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0887 21.9251C10.7723 21.935 9.46727 21.681 8.25071 21.1781C7.07363 20.6919 6.00417 19.9781 5.10374 19.0774C4.20331 18.1768 3.48964 17.1072 3.00371 15.9301C2.48776 14.6848 2.22891 13.348 2.24271 12.0001C2.23503 10.7011 2.47076 9.41222 2.93771 8.20007C3.38974 7.02262 4.06935 5.94577 4.93771 5.03108C5.82931 4.0964 6.90585 3.3577 8.09871 2.86207C9.42301 2.32068 10.8432 2.05297 12.2737 2.07507C13.7606 2.04067 15.2379 2.32256 16.6077 2.90207C17.7724 3.40287 18.8086 4.16081 19.6387 5.11907C20.4165 6.0229 20.9978 7.07858 21.3457 8.21907C21.6914 9.34698 21.8193 10.5304 21.7227 11.7061C21.7092 13.0186 21.2509 14.2877 20.4227 15.3061C20.0775 15.6828 19.656 15.9817 19.1864 16.1829C18.7167 16.3841 18.2096 16.483 17.6987 16.4731C16.9318 16.5038 16.1749 16.2905 15.5367 15.8641C14.9663 15.4579 14.5675 14.8541 14.4177 14.1701L14.9177 14.2761C14.6587 14.8543 14.196 15.3171 13.6177 15.5761C13.0322 15.8536 12.3926 15.9984 11.7447 16.0001C11.0931 16.0138 10.4493 15.8551 9.87871 15.5401C9.35486 15.2414 8.92606 14.8008 8.64171 14.2691C8.3381 13.6937 8.18566 13.0505 8.19871 12.4001C8.18257 11.7295 8.33962 11.0662 8.65471 10.4741C8.94776 9.94284 9.38578 9.50585 9.91771 9.21407C10.4877 8.91145 11.1254 8.75899 11.7707 8.77107C12.3777 8.77716 12.9777 8.90078 13.5377 9.13508C14.145 9.38032 14.6384 9.84412 14.9207 10.4351L14.4207 10.9351V9.46108C14.4207 9.35499 14.4629 9.25325 14.5379 9.17823C14.6129 9.10322 14.7146 9.06107 14.8207 9.06107H15.0527C15.1588 9.06107 15.2605 9.10322 15.3356 9.17823C15.4106 9.25325 15.4527 9.35499 15.4527 9.46108V12.9791C15.4392 13.5802 15.6252 14.1689 15.9817 14.6531C16.2121 14.9099 16.5003 15.1081 16.8226 15.2312C17.1448 15.3543 17.4918 15.3989 17.8347 15.3611C18.3074 15.3636 18.7693 15.2204 19.1577 14.9511C19.578 14.6502 19.9115 14.2439 20.1247 13.7731C20.3876 13.1894 20.5359 12.5607 20.5617 11.9211C20.6542 10.714 20.5126 9.50044 20.1447 8.34707C19.8077 7.31659 19.2455 6.3741 18.4987 5.58807C17.747 4.8055 16.8324 4.19781 15.8197 3.80807C14.6872 3.37886 13.4837 3.16781 12.2727 3.18607C10.9814 3.16056 9.6997 3.41328 8.51471 3.92707C7.46086 4.39279 6.51625 5.07409 5.74171 5.92707C4.99358 6.75543 4.40987 7.71855 4.02171 8.76508C3.63162 9.80836 3.43212 10.9132 3.43271 12.0271C3.42573 13.1977 3.65781 14.3573 4.11471 15.4351C4.55999 16.4806 5.19925 17.4324 5.99871 18.2401C6.79499 19.0461 7.74104 19.6888 8.78371 20.1321C9.85474 20.5891 11.0083 20.8213 12.1727 20.8141C13.0787 20.81 13.98 20.6829 14.8517 20.4361C15.5511 20.2455 16.2232 19.9662 16.8517 19.6051C16.8982 19.5782 16.9496 19.561 17.0028 19.5544C17.0561 19.5479 17.1101 19.5521 17.1617 19.5668C17.2133 19.5816 17.2614 19.6065 17.3032 19.6402C17.3449 19.674 17.3794 19.7157 17.4047 19.7631L17.5047 19.9551C17.552 20.0444 17.5637 20.1482 17.5375 20.2458C17.5114 20.3433 17.4493 20.4274 17.3637 20.4811C16.6166 20.9327 15.8125 21.2825 14.9727 21.5211C14.0348 21.789 13.0641 21.925 12.0887 21.9251ZM11.7987 14.8591C12.1245 14.8742 12.4501 14.8246 12.7566 14.7132C13.0632 14.6018 13.3446 14.4308 13.5847 14.2101C13.8187 13.9672 13.9995 13.6782 14.1157 13.3616C14.2319 13.045 14.281 12.7077 14.2597 12.3711C14.2858 12.0248 14.2367 11.6771 14.1159 11.3515C13.9951 11.026 13.8054 10.7305 13.5597 10.4851C13.0746 10.0582 12.4445 9.83316 11.7987 9.85607C11.4642 9.83436 11.1288 9.88068 10.8127 9.99223C10.4967 10.1038 10.2065 10.2782 9.95971 10.5051C9.73124 10.7563 9.55589 11.0511 9.44419 11.3717C9.33249 11.6924 9.28675 12.0323 9.30971 12.3711C9.28373 12.7126 9.33114 13.0557 9.44878 13.3774C9.56641 13.6991 9.75154 13.9919 9.99171 14.2361C10.4915 14.6683 11.1387 14.8914 11.7987 14.8591Z"
                  fill="#1B1921"
                />
              </svg>
            </span>
            <p className="text-xs/4 text-white/80 tracking-[1px]">
              Streple user
            </p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <span className="size-12 rounded-full bg-[#B39FF0] flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_4401_4016)">
                  <path
                    d="M2.8577 7.85668V15.7138M7.61913 7.85668V15.7138M12.382 7.85668V15.7138M17.1434 7.85668V15.7138M18.4434 7.85668H1.5577C0.757701 7.85668 0.414844 6.98525 1.04342 6.57097L9.48627 1.0424C9.64215 0.950697 9.81971 0.902344 10.0006 0.902344C10.1814 0.902344 10.359 0.950697 10.5148 1.0424L18.9577 6.57097C19.5863 6.98525 19.2434 7.85668 18.4434 7.85668ZM18.572 15.7138H1.42913C1.23969 15.7138 1.05801 15.7891 0.924053 15.923C0.790099 16.057 0.714844 16.2387 0.714844 16.4281V18.571C0.714844 18.7604 0.790099 18.9421 0.924053 19.076C1.05801 19.21 1.23969 19.2853 1.42913 19.2853H18.572C18.7614 19.2853 18.9431 19.21 19.0771 19.076C19.211 18.9421 19.2863 18.7604 19.2863 18.571V16.4281C19.2863 16.2387 19.211 16.057 19.0771 15.923C18.9431 15.7891 18.7614 15.7138 18.572 15.7138Z"
                    stroke="black"
                    stroke-opacity="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4401_4016">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="text-xs/4 text-white/80 tracking-[1px]">Bank</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <span className="size-12 rounded-full bg-[#B39FF0] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 15.5C6.86739 15.5 6.74021 15.5527 6.64645 15.6464C6.55268 15.7402 6.5 15.8674 6.5 16C6.5 16.1326 6.55268 16.2598 6.64645 16.3536C6.74021 16.4473 6.86739 16.5 7 16.5H9C9.13261 16.5 9.25979 16.4473 9.35355 16.3536C9.44732 16.2598 9.5 16.1326 9.5 16C9.5 15.8674 9.44732 15.7402 9.35355 15.6464C9.25979 15.5527 9.13261 15.5 9 15.5H7Z"
                  fill="black"
                  fill-opacity="0.8"
                />
                <path
                  d="M3.5 10.7994C3.5 10.1334 3.5 9.60636 3.531 9.17736C3.564 8.73736 3.631 8.36536 3.781 8.01236C4.02846 7.43193 4.42823 6.9292 4.938 6.55736C5.248 6.33236 5.595 6.18336 6.017 6.05336C6.428 5.92636 6.941 5.80736 7.589 5.65836L11.032 4.86336C12.016 4.63636 12.787 4.45836 13.409 4.37136C14.041 4.28336 14.577 4.27836 15.076 4.44036C15.8828 4.70107 16.5676 5.24581 17.003 5.97336C17.146 6.21236 17.246 6.47136 17.316 6.75636L17.339 6.76636C17.7638 6.94214 18.1498 7.19988 18.4749 7.52485C18.8001 7.84983 19.058 8.23568 19.234 8.66036C19.377 9.00636 19.44 9.38035 19.47 9.82436C19.5 10.2594 19.5 10.7974 19.5 11.4814V11.4994H19C19.3978 11.4994 19.7794 11.6574 20.0607 11.9387C20.342 12.22 20.5 12.6015 20.5 12.9994C20.5 13.3972 20.342 13.7787 20.0607 14.06C19.7794 14.3413 19.3978 14.4994 19 14.4994H19.5V14.5174C19.5 15.2014 19.5 15.7394 19.47 16.1744C19.44 16.6184 19.377 16.9924 19.234 17.3384C19.0581 17.7632 18.8002 18.1493 18.4751 18.4744C18.1499 18.7996 17.7639 19.0575 17.339 19.2334C16.993 19.3764 16.619 19.4394 16.176 19.4694C15.74 19.4994 15.202 19.4994 14.518 19.4994H8.778C7.957 19.4994 7.31 19.4994 6.788 19.4564C6.258 19.4134 5.814 19.3234 5.411 19.1184C4.7522 18.7828 4.2166 18.2472 3.881 17.5884C3.676 17.1854 3.586 16.7414 3.543 16.2104C3.5 15.6904 3.5 15.0434 3.5 14.2214V10.7994ZM11.233 5.84336L8.39 6.49936H14.519C15.199 6.49936 15.736 6.49936 16.17 6.52936L16.146 6.48636C15.8351 5.96676 15.3461 5.57767 14.77 5.39136C14.48 5.29836 14.119 5.28136 13.549 5.36136C12.975 5.44136 12.247 5.60936 11.234 5.84336M18.474 9.89235C18.447 9.49935 18.395 9.24736 18.311 9.04236C18.1827 8.73301 17.9935 8.4526 17.7547 8.21778C17.516 7.98295 17.2324 7.79849 16.921 7.67536L16.765 7.63536C16.261 7.50536 15.562 7.49936 14.285 7.49936H8.8C7.952 7.49936 7.345 7.49936 6.87 7.53936C6.401 7.57736 6.104 7.64936 5.865 7.77136C5.36375 8.02723 4.96349 8.44475 4.729 8.95636C4.633 9.18036 4.573 9.45936 4.539 9.86936L4.526 10.0544C4.50195 10.6357 4.49328 11.2176 4.5 11.7994V14.1994C4.5 15.0474 4.5 15.6544 4.54 16.1294C4.578 16.5984 4.65 16.8954 4.772 17.1344C5.01189 17.6046 5.39451 17.9869 5.865 18.2264C6.104 18.3484 6.401 18.4214 6.87 18.4604C7.345 18.4994 7.952 18.4994 8.8 18.4994H14.5C15.206 18.4994 15.71 18.4994 16.107 18.4724C16.5 18.4454 16.752 18.3934 16.957 18.3094C17.2603 18.1837 17.5359 17.9996 17.7681 17.7674C18.0002 17.5353 18.1844 17.2597 18.31 16.9564C18.394 16.7514 18.446 16.4994 18.473 16.1064C18.5 15.7094 18.5 15.2054 18.5 14.4994H17C16.6022 14.4994 16.2206 14.3413 15.9393 14.06C15.658 13.7787 15.5 13.3972 15.5 12.9994C15.5 12.6015 15.658 12.22 15.9393 11.9387C16.2206 11.6574 16.6022 11.4994 17 11.4994H18.5C18.5 10.7934 18.5 10.2894 18.473 9.89235M17 12.4994C16.8674 12.4994 16.7402 12.552 16.6464 12.6458C16.5527 12.7396 16.5 12.8667 16.5 12.9994C16.5 13.132 16.5527 13.2591 16.6464 13.3529C16.7402 13.4467 16.8674 13.4994 17 13.4994H19C19.1326 13.4994 19.2598 13.4467 19.3536 13.3529C19.4473 13.2591 19.5 13.132 19.5 12.9994C19.5 12.8667 19.4473 12.7396 19.3536 12.6458C19.2598 12.552 19.1326 12.4994 19 12.4994H17Z"
                  fill="black"
                  fill-opacity="0.8"
                />
              </svg>
            </span>
            <p className="text-xs/4 text-white/80 tracking-[1px]">Wallet</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <span className="size-12 rounded-full bg-[#B39FF0] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3H8C7.07 3 6.605 3 6.224 3.102C5.71513 3.23825 5.2511 3.5061 4.8786 3.8786C4.5061 4.2511 4.23825 4.71513 4.102 5.224C4 5.605 4 6.07 4 7M15 3H16C16.93 3 17.395 3 17.776 3.102C18.2849 3.23825 18.7489 3.5061 19.1214 3.8786C19.4939 4.2511 19.7617 4.71513 19.898 5.224C20 5.605 20 6.07 20 7M20 15V16C20 17.87 20 18.804 19.598 19.5C19.3347 19.956 18.956 20.3347 18.5 20.598C17.804 21 16.87 21 15 21M4 15V16C4 17.87 4 18.804 4.402 19.5C4.66529 19.956 5.04398 20.3347 5.5 20.598C6.196 21 7.13 21 9 21"
                  stroke="black"
                  stroke-opacity="0.8"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 15H21M7 11V15H17V11C17 10.057 17 9.586 16.707 9.293C16.414 9 15.943 9 15 9H9C8.057 9 7.586 9 7.293 9.293C7 9.586 7 10.057 7 11Z"
                  stroke="black"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p className="text-xs/4 text-white/80 tracking-[1px]">Scan code</p>
          </div>
        </div>
      </div>
      <div className="w-full space-y-8">
        <div className="space-y-3 w-full">
          <h6 className="font-bold text-base/8 tracking-[1px]">
            Suggested recipients
          </h6>
          <div className="w-full relative max-w-[593px]">
            <input
              value={searchTransactions}
              onChange={(e) => setSearchTransactions(e.target.value)}
              name="search"
              title="search for recipients"
              type="text"
              placeholder="search for recipients"
              className={`h-[50px] w-full text-base font-normal py-5 px-4 rounded-3xl border border-white/10 gap-4 leading-6 tracking-[1px] placeholder:text-xs placeholder:text-white/50 placeholder:font-bold outline-0 ring-0 caret-[#B39FF0] bg-transparent`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              <IoSearch size={20} color="#FFFFFFB2" />
            </span>
          </div>
        </div>
        <div className="space-y-6 w-full">
          {recentTransactions?.error && (
            <p className="text-base text-center text-red-400 font-semibold mx-auto p-4">
              {recentTransactions.error}
            </p>
          )}

          {!searchTransactions && isRecentTransactionPending && (
            <div className="p-8 flex items-center justify-center">
              <Loader />
            </div>
          )}

          {!searchTransactions &&
            recentTransactions?.document?.length === 0 && (
              <p className="text-base text-center font-semibold mx-auto p-4">
                No recent transactions found
              </p>
            )}

          {(searchTransactions
            ? recentTransactions?.document?.filter(({ recipient }) =>
                recipient?.fullName
                  ?.toLowerCase()
                  .includes(searchTransactions.toLowerCase())
              )
            : recentTransactions?.document
          )?.map(({ recipient }, i) => (
            <div
              key={i}
              onClick={() => {
                setRecipient({
                  username: recipient.username,
                  name: recipient.fullName,
                  id: recipient.id,
                });
              }}
              className="px-6 flex items-center gap-3 cursor-pointer"
            >
              <div className="size-10 rounded-full flex items-center justify-center bg-[#D9D9D9] text-[#000000CC] text-lg font-semibold">
                {(() => {
                  const names = recipient.fullName.trim().split(" ");
                  const firstInitial = names[0]?.charAt(0) || "";
                  const secondInitial = names[1]?.charAt(0) || "";
                  return `${firstInitial}${secondInitial}`;
                })()}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">{recipient.fullName}</p>
                <p className="text-xs text-white/60">@{recipient.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
