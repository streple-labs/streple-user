"use client";

import { baloo } from "@/app/fonts";
import CancelX from "@/assets/svg/cancel-x";
import DarkYellowGlow from "@/assets/svg/dark-yellow-glow";
import GiantCoin from "@/assets/svg/giant-coin";
import {
  TradersCardGlowPurple,
  TradersCardGlowYellow,
} from "@/assets/svg/traders-card-glow";
import YellowBgGlow from "@/assets/svg/yellow-glow";
import CopyTrader from "@/component/form/copy-trader-form";
import UnlockedQuestHero from "@/component/popups/unlocked-quest-hero";
import Modal from "@/component/ui/modal";
import Tooltip from "@/component/ui/tooltip";
import { useAuth } from "@/context/auth-context";
import { followTrader } from "@/utils/api/action";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { toast } from "sonner";

export default function TradingPost({
  traders,
  error,
}: {
  traders: ProtradersResponse | null;
  error: string | null;
}) {
  const {
    user: { game_data },
  } = useAuth();

  const [showBalance, setShowBalance] = useState(true);

  const [aboutTradersTutorials, setAboutTradersTutorials] = useState(0);
  const [showUnlockQuestRewardModal, setShowUnlockQuestRewardModal] =
    useState(false);

  useEffect(() => {
    if (window && localStorage.getItem("done_traders_tutorial")) return;
    setTimeout(() => {
      setAboutTradersTutorials(1);
    }, 8000);
  }, []);

  useEffect(() => {
    if (aboutTradersTutorials === 5) {
      const timer = setTimeout(() => {
        setAboutTradersTutorials(0);
        localStorage.setItem("done_traders_tutorial", "true");
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [aboutTradersTutorials]);

  const [copyTraderModal, setCopyTraderModal] = useState(false);
  const toggleCopyTraderModal = () => {
    setCopyTraderModal((prev) => !prev);
  };

  const [formData, setFormData] = useState<FollowTraderPayload>({
    trader_id: "",
    amount: 50,
    stopLossRatio: undefined,
    takeProfitRatio: undefined,
    maxCopy: undefined,
    slippageLimit: undefined,
    marginMode: undefined,
    leverage: undefined,
  });

  const { mutate: handleCopyTrader, isPending: isCopyTraderLoading } =
    useMutation({
      mutationKey: ["follow-trader"],
      mutationFn: async () => await followTrader(formData),
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message);
          setCopyTraderModal(false);
          setShowUnlockQuestRewardModal(true);
        } else toast.error(res.message);
      },
      onError: (error: unknown) => {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again.");
      },
    });

  return (
    <div className="flex flex-col gap-8 w-full relative">
      {!!aboutTradersTutorials && aboutTradersTutorials < 5 && (
        <div className="fixed inset-0 size-full bg-black/70 z-[1]" />
      )}

      {aboutTradersTutorials === 5 && (
        <div className="fixed right-0 -bottom-9 h-[201px] md:h-[270px] z-10">
          <Tooltip
            isVisible
            position="left"
            content="Every trader has their own style. Scroll through, check stats and choose the trader that you want to copy"
          >
            <Image
              src={"/mascot-7.png"}
              alt="mascot image"
              width={199}
              height={270}
              quality={100}
              className="size-auto w-[148px] md:w-[199px] h-[201px] md:h-[270px]"
            />
          </Tooltip>
        </div>
      )}

      <Modal isOpen={copyTraderModal} onClose={toggleCopyTraderModal}>
        <div className="relative w-full h-screen lg:max-h-[90vh] pt-16 max-w-6xl bg-[#141314] lg:rounded-[29px] space-y-10 overflow-y-auto hide-scrollbar">
          <h2
            className={`${baloo.className} w-full text-center drop-shadow-[0px_4px_4px] drop-shadow-[#CABAFA] text-2xl tracking-[2px]`}
          >
            Smart copy
          </h2>
          <CopyTrader
            handleCopyTrader={handleCopyTrader}
            loading={isCopyTraderLoading}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </Modal>

      <UnlockedQuestHero
        isOpen={showUnlockQuestRewardModal}
        close={() => {
          setShowUnlockQuestRewardModal(false);
          localStorage.setItem("done_traders_tutorial", "true");
        }}
      />

      <section className="flex flex-col gap-4 md:gap-8 w-full">
        <h4
          className={`${baloo.className} font-normal text-2xl leading-10 tracking-[2px] text-white/70 drop-shadow-[0px_4px_4px] drop-shadow-[#847F1480]`}
        >
          Copy trading
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          <Tooltip
            isVisible={aboutTradersTutorials === 1}
            position="bottom"
            content={
              <div className="flex flex-col gap-2.5 w-full text-[#151021E5] text-xs/5 tracking-[1px] font-semibold">
                <div className="w-full flex justify-end">
                  <span
                    onClick={() => {
                      setAboutTradersTutorials(0);
                    }}
                    className="cursor-pointer"
                  >
                    <CancelX />
                  </span>
                </div>
                <p>
                  Here&apos;s your trading balance, you&apos;ll use this to copy
                  trades. Manage it wisely!
                </p>
                <div className="flex items-center justify-between">
                  <p>{aboutTradersTutorials} of 4</p>

                  <button
                    onClick={() => {
                      setAboutTradersTutorials((prev) => prev + 1);
                    }}
                    className="h-[28px] py-1 px-2 rounded-lg bg-[#2c1e56] text-[#EBE6FBE5]"
                  >
                    Next
                  </button>
                </div>
              </div>
            }
          >
            <div
              className={`${
                aboutTradersTutorials === 1 && "z-[1]"
              } border border-[#BDB5104D] rounded-[20px] backdrop-blur-xs bg-[#EEE3110D] h-[145px] md:h-[207px] pt-4 md:pt-[30px] pl-4 relative overflow-hidden`}
            >
              <div className="space-y-2 md:space-y-6 max-w-[237px]">
                <span className="flex items-center gap-2">
                  <p className="font-semibold text-xs md:text-base leading-6 tracking-[2px] bg-gradient-to-r from-white to-black/60 bg-clip-text text-transparent">
                    Total balance
                  </p>
                  <span
                    onClick={() => {
                      setShowBalance((prev) => !prev);
                    }}
                    className="cursor-pointer"
                  >
                    {showBalance ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.28136 1.71691C2.24417 1.67972 2.20002 1.65022 2.15143 1.6301C2.10284 1.60997 2.05076 1.59961 1.99816 1.59961C1.94557 1.59961 1.89349 1.60997 1.84489 1.6301C1.7963 1.65022 1.75215 1.67972 1.71496 1.71691C1.67777 1.7541 1.64827 1.79826 1.62814 1.84685C1.60802 1.89544 1.59766 1.94752 1.59766 2.00011C1.59766 2.05271 1.60802 2.10479 1.62814 2.15338C1.64827 2.20197 1.67777 2.24612 1.71496 2.28331L4.51496 5.08171C3.1284 6.02776 2.16304 7.47494 1.82216 9.11851C1.81145 9.16999 1.81097 9.22308 1.82077 9.27474C1.83057 9.3264 1.85045 9.37562 1.87928 9.4196C1.9081 9.46358 1.9453 9.50145 1.98876 9.53105C2.03222 9.56065 2.08108 9.5814 2.13256 9.59211C2.18404 9.60283 2.23712 9.6033 2.28878 9.5935C2.34045 9.5837 2.38967 9.56382 2.43365 9.535C2.47763 9.50618 2.5155 9.46897 2.5451 9.42552C2.5747 9.38206 2.59545 9.33319 2.60616 9.28171C2.7592 8.54313 3.05781 7.84242 3.48457 7.22048C3.91133 6.59854 4.45769 6.06783 5.09176 5.65931L6.36056 6.92811C6.03158 7.16534 5.75806 7.4712 5.55893 7.82454C5.35979 8.17789 5.2398 8.57027 5.20726 8.97456C5.17471 9.37884 5.23038 9.78537 5.37042 10.166C5.51047 10.5467 5.73153 10.8924 6.01833 11.1791C6.30513 11.4659 6.65081 11.687 7.03145 11.8271C7.4121 11.9671 7.81863 12.0228 8.22292 11.9902C8.6272 11.9577 9.01959 11.8377 9.37293 11.6385C9.72628 11.4394 10.0321 11.1659 10.2694 10.8369L13.715 14.2833C13.7901 14.3584 13.8919 14.4006 13.9982 14.4006C14.1044 14.4006 14.2063 14.3584 14.2814 14.2833C14.3565 14.2082 14.3987 14.1063 14.3987 14.0001C14.3987 13.8939 14.3565 13.792 14.2814 13.7169L2.28136 1.71691ZM9.69336 10.2609C9.53369 10.5157 9.31864 10.7311 9.06421 10.8913C8.80978 11.0515 8.52251 11.1522 8.22376 11.1861C7.92502 11.2199 7.6225 11.1859 7.33869 11.0867C7.05488 10.9875 6.79709 10.8256 6.5845 10.613C6.37191 10.4004 6.20998 10.1426 6.11076 9.85879C6.01154 9.57498 5.97758 9.27245 6.01142 8.97371C6.04525 8.67497 6.14599 8.3877 6.30617 8.13327C6.46634 7.87883 6.68181 7.66378 6.93656 7.50411L9.69336 10.2609ZM8.09736 6.40171L10.7966 9.10091C10.7715 8.39302 10.4791 7.72093 9.97821 7.22006C9.47734 6.71919 8.80525 6.42677 8.09736 6.40171ZM7.99816 4.80011C7.54216 4.80011 7.09496 4.85931 6.66536 4.97051L6.02296 4.32811C6.65907 4.11179 7.32628 4.001 7.99816 4.00011C10.9526 4.00011 13.5518 6.13851 14.1742 9.11851C14.1958 9.22248 14.1753 9.33078 14.117 9.4196C14.0588 9.50842 13.9677 9.57047 13.8638 9.59211C13.7598 9.61376 13.6515 9.59321 13.5627 9.535C13.4739 9.47679 13.4118 9.38568 13.3902 9.28171C12.8446 6.66171 10.5638 4.80011 7.99816 4.80011Z"
                          fill="white"
                          fillOpacity="0.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.9987 1.33337C11.6807 1.33337 14.6654 4.31804 14.6654 8.00004C14.6654 11.682 11.6807 14.6667 7.9987 14.6667C4.3167 14.6667 1.33203 11.682 1.33203 8.00004C1.33203 4.31804 4.3167 1.33337 7.9987 1.33337ZM7.9987 4.66671C7.6567 4.66671 7.3267 4.71804 7.0167 4.81337C7.26263 4.92418 7.478 5.09303 7.64429 5.30542C7.81059 5.51781 7.92285 5.76738 7.97144 6.03272C8.02003 6.29805 8.00349 6.57121 7.92324 6.82874C7.84299 7.08628 7.70143 7.32048 7.51072 7.51125C7.32001 7.70202 7.08585 7.84365 6.82834 7.92397C6.57083 8.0043 6.29768 8.02092 6.03233 7.97242C5.76698 7.92391 5.51737 7.81172 5.30493 7.64549C5.0925 7.47925 4.92358 7.26394 4.8127 7.01804C4.60596 7.68865 4.61614 8.4074 4.84179 9.07188C5.06744 9.73637 5.49705 10.3127 6.06941 10.7187C6.64176 11.1248 7.32766 11.3398 8.02938 11.3332C8.7311 11.3266 9.41285 11.0988 9.97748 10.682C10.5421 10.2653 10.9608 9.68106 11.174 9.01246C11.3871 8.34386 11.3838 7.62504 11.1645 6.95843C10.9452 6.29182 10.5211 5.71142 9.95271 5.29992C9.38426 4.88843 8.70045 4.66683 7.9987 4.66671Z"
                          fill="white"
                          fillOpacity="0.5"
                        />
                      </svg>
                    )}
                  </span>
                </span>
                <h4
                  className={`${baloo.className} text-[32px] md:text-[46px] leading-[45px] tracking-[2px] text-[#E0D610] font-normal`}
                >
                  {showBalance ? game_data.totalScore : "*****"}
                  <span className="text-base md:text-xl">STP</span>
                </h4>
              </div>

              <span className="absolute right-0 bottom-0">
                <YellowBgGlow />
              </span>
              <span className="absolute right-0 bottom-0">
                <GiantCoin />
              </span>
              <span className="absolute right-0 top-[74px]">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 0L22.8616 13.1384L36 18L22.8616 22.8616L18 36L13.1384 22.8616L0 18L13.1384 13.1384L18 0Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </Tooltip>
          <div className="max-md:hidden border border-[#503C8B] rounded-[20px] backdrop-blur-xs bg-[#503C8B0D] h-[207px] pt-11 pl-4 relative -z-0 overflow-hidden">
            <div className="space-y-3 max-w-[249px]">
              <p className="text-base/6 tracking-[2px] font-bold">
                Copy and earn x5 STP coins
              </p>

              <p className="text-sm/5 tracking-[1px]">
                Boost your rewards by copying top traders. Every win multiplies
                your STP stash
              </p>
            </div>

            <span className="absolute right-0 bottom-0">
              <DarkYellowGlow />
            </span>
            <div className="absolute right-0 bottom-0">
              <Image
                src={"/bag-of-coins.png"}
                alt="bag of coins"
                width={239}
                height={198}
                className="size-auto"
              />
            </div>
          </div>
        </div>
        <div>
          <Tooltip
            isVisible={aboutTradersTutorials === 4}
            position="bottom"
            content={
              <div className="flex flex-col gap-2.5 w-full text-[#151021E5] text-xs/5 tracking-[1px] font-semibold">
                <div className="w-full flex justify-end">
                  <span
                    onClick={() => {
                      setAboutTradersTutorials(0);
                    }}
                    className="cursor-pointer"
                  >
                    <CancelX />
                  </span>
                </div>
                <p>
                  Track all the trades you&apos;ve copied here, see results and
                  manage your open positions.
                </p>
                <div className="flex items-center justify-between">
                  <p>{aboutTradersTutorials} of 4</p>

                  <button
                    onClick={() => {
                      setAboutTradersTutorials((prev) => prev + 1);
                    }}
                    className="h-[28px] w-[113px] py-1 px-2 rounded-lg bg-[#2c1e56] text-[#EBE6FBE5]"
                  >
                    Finish
                  </button>
                </div>
              </div>
            }
          >
            <Link
              href={"#"}
              className={`${
                aboutTradersTutorials === 4 && "z-[1]"
              } relative flex items-center gap-4`}
            >
              <p className="font-bold text-xs md:text-base leading-6 tracking-[2px] bg-gradient-to-r from-[#F4E90E] to-[#F4E90E]/60 bg-clip-text text-transparent">
                My Copy tradings
              </p>
              <FaArrowRight className="w-3 md:w-[15px]" color="#F4E90E" />
            </Link>
          </Tooltip>
        </div>
      </section>
      <section className="flex flex-col gap-4 md:gap-8 w-full">
        <div className="flex md:items-center gap-4 flex-col md:flex-row justify-between">
          <Tooltip
            isVisible={aboutTradersTutorials === 2}
            position="bottom"
            content={
              <div className="flex flex-col gap-2.5 w-full text-[#151021E5] text-xs/5 tracking-[1px] font-semibold">
                <div className="w-full flex justify-end">
                  <span
                    onClick={() => {
                      setAboutTradersTutorials(0);
                    }}
                    className="cursor-pointer"
                  >
                    <CancelX />
                  </span>
                </div>
                <p>
                  Select traders you can copy from here. You can view their
                  stats, risk score, and past performance
                </p>
                <div className="flex items-center justify-between">
                  <p>{aboutTradersTutorials} of 4</p>

                  <button
                    onClick={() => {
                      setAboutTradersTutorials((prev) => prev + 1);
                    }}
                    className="h-[28px] py-1 px-2 rounded-lg bg-[#2c1e56] text-[#EBE6FBE5]"
                  >
                    Next
                  </button>
                </div>
              </div>
            }
          >
            <h4
              className={`${baloo.className} ${
                aboutTradersTutorials === 2 && "z-[1]"
              } font-normal text-sm/5 md:text-xl/7 lg:text-2xl/10 relative tracking-[2px] text-white/70`}
            >
              All Traders
            </h4>
          </Tooltip>

          <Tooltip
            isVisible={aboutTradersTutorials === 3}
            position="bottom"
            content={
              <div className="flex flex-col gap-2.5 w-full text-[#151021E5] text-xs/5 tracking-[1px] font-semibold">
                <div className="w-full flex justify-end">
                  <span
                    onClick={() => {
                      setAboutTradersTutorials(0);
                    }}
                    className="cursor-pointer"
                  >
                    <CancelX />
                  </span>
                </div>
                <p>
                  Select traders you can copy from here. You can view their
                  stats, risk score, and past performance
                </p>
                <div className="flex items-center justify-between">
                  <p>{aboutTradersTutorials} of 4</p>

                  <button
                    onClick={() => {
                      setAboutTradersTutorials((prev) => prev + 1);
                    }}
                    className="h-[28px] py-1 px-2 rounded-lg bg-[#2c1e56] text-[#EBE6FBE5]"
                  >
                    Next
                  </button>
                </div>
              </div>
            }
          >
            <div
              className={`${
                aboutTradersTutorials === 3 && "z-[1]"
              } w-full md:w-[290px] relative rounded-full border border-white/10 h-[43px] py-3 px-4 flex items-center gap-3`}
            >
              <IoSearch width={12} color="#FFFFFF80" />

              <input
                aria-label="Search traders"
                className="bg-transparent outline-0 border-0 ring-0 text-sm placeholder:text-white/50 w-full"
                placeholder="Search"
              />
            </div>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-10">
          {error ? (
            <div className="flex items-center justify-center size-full p-8">
              <p className={`${baloo.className} text-red-600 text-base`}>
                {error}
              </p>
            </div>
          ) : !traders?.data.length ? (
            <div className="flex items-center justify-center size-full p-8">
              <p className={`${baloo.className} text-white/80 text-base`}>
                No protraders.
              </p>
            </div>
          ) : (
            traders!.data.map((trader, i) => (
              <div
                key={i}
                className="relative py-8 px-5 rounded-[15px] flex flex-col gap-5 w-full bg-white/[3%] overflow-hidden"
              >
                <span className="absolute -top-0 left-1/2 -translate-x-1/2">
                  {i % 2 === 0 ? (
                    <TradersCardGlowPurple />
                  ) : (
                    <TradersCardGlowYellow />
                  )}
                </span>

                <Link href={"/trading-post/traders/" + trader.id}>
                  <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-3.5">
                      <Image
                        src={trader.avatarUrl || "/traders-pfp-1.jpg"}
                        aria-label="traders avatar"
                        alt="traders avatar"
                        width={40}
                        height={40}
                        className="size-auto rounded-full shrink-0"
                      />

                      <div className="space-y-1 w-full">
                        <p
                          className={`${baloo.className} text-xs/5 md:text-base/6 tracking-[2px] font-normal bg-gradient-to-r from-white to-white/0 bg-clip-text text-transparent overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]`}
                        >
                          {trader.fullName}
                        </p>

                        <p className="flex gap-2 items-center text-xs/5 font-normal bg-gradient-to-r from-white to-white/0 bg-clip-text text-transparent">
                          <svg
                            width="16"
                            height="10"
                            viewBox="0 0 16 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.3184 6.86636C8.00024 6.42057 8.51791 5.77111 8.79483 5.01404C9.07176 4.25696 9.09326 3.43246 8.85614 2.66246C8.61903 1.89246 8.13588 1.21784 7.47816 0.738359C6.82045 0.258881 6.02307 0 5.20395 0C4.38482 0 3.58745 0.258881 2.92973 0.738359C2.27201 1.21784 1.78887 1.89246 1.55175 2.66246C1.31463 3.43246 1.33613 4.25696 1.61306 5.01404C1.88999 5.77111 2.40765 6.42057 3.08949 6.86636C1.85611 7.3128 0.802767 8.13893 0.0866467 9.22147C0.0490099 9.2764 0.0228673 9.33814 0.00973857 9.40308C-0.00339018 9.46803 -0.00324318 9.53489 0.010171 9.59978C0.0235852 9.66467 0.049999 9.72629 0.087877 9.78107C0.125755 9.83584 0.174342 9.88268 0.230813 9.91885C0.287284 9.95503 0.350513 9.97981 0.416825 9.99178C0.483137 10.0037 0.551208 10.0026 0.617083 9.98854C0.682958 9.97444 0.745322 9.94762 0.800549 9.90964C0.855777 9.87166 0.902767 9.82328 0.938788 9.76731C1.40072 9.06957 2.03281 8.49621 2.77766 8.0993C3.5225 7.70238 4.35651 7.49448 5.20395 7.49448C6.05138 7.49448 6.88539 7.70238 7.63024 8.0993C8.37508 8.49621 9.00718 9.06957 9.46911 9.76731C9.54372 9.87622 9.65899 9.95192 9.78998 9.97804C9.92097 10.0042 10.0572 9.97859 10.1691 9.90688C10.2811 9.83516 10.3598 9.72306 10.3883 9.5948C10.4167 9.46654 10.3927 9.33243 10.3212 9.22147C9.60513 8.13893 8.55179 7.3128 7.3184 6.86636ZM2.40587 3.7487C2.40587 3.20521 2.56997 2.67393 2.87743 2.22203C3.18489 1.77014 3.62189 1.41793 4.13317 1.20994C4.64445 1.00196 5.20705 0.947541 5.74982 1.05357C6.2926 1.1596 6.79117 1.42132 7.18249 1.80562C7.5738 2.18993 7.84029 2.67956 7.94826 3.21261C8.05622 3.74566 8.00081 4.29817 7.78903 4.80029C7.57725 5.30241 7.21862 5.73158 6.75847 6.03353C6.29833 6.33548 5.75735 6.49664 5.20395 6.49664C4.46211 6.49581 3.7509 6.20603 3.22634 5.69088C2.70178 5.17572 2.40671 4.47725 2.40587 3.7487ZM15.7692 9.91282C15.6562 9.98519 15.5186 10.0105 15.3866 9.98323C15.2545 9.95594 15.139 9.87827 15.0653 9.76731C14.6039 9.06916 13.9719 8.49555 13.2269 8.0988C12.4819 7.70204 11.6476 7.49478 10.8001 7.49589C10.6652 7.49589 10.5358 7.44325 10.4404 7.34955C10.345 7.25586 10.2914 7.12877 10.2914 6.99626C10.2914 6.86376 10.345 6.73667 10.4404 6.64298C10.5358 6.54928 10.6652 6.49664 10.8001 6.49664C11.2122 6.49626 11.619 6.4065 11.9917 6.23378C12.3643 6.06107 12.6935 5.80965 12.9558 5.4975C13.218 5.18535 13.4068 4.82017 13.5087 4.42805C13.6106 4.03594 13.623 3.62657 13.5451 3.22919C13.4672 2.83181 13.3009 2.45623 13.058 2.12929C12.8152 1.80236 12.5018 1.53213 12.1403 1.33791C11.7788 1.1437 11.3781 1.0303 10.9668 1.00581C10.5555 0.981318 10.1437 1.04635 9.761 1.19625C9.69859 1.22274 9.63141 1.23668 9.56343 1.23725C9.49544 1.23781 9.42803 1.22499 9.36518 1.19953C9.30232 1.17408 9.2453 1.13651 9.19749 1.08905C9.14967 1.04158 9.11202 0.98519 9.08677 0.923196C9.06152 0.861203 9.04918 0.794868 9.05048 0.728111C9.05177 0.661354 9.06668 0.59553 9.09432 0.534527C9.12196 0.473525 9.16177 0.418582 9.2114 0.372944C9.26102 0.327307 9.31946 0.291901 9.38326 0.26882C10.2592 -0.0742658 11.2335 -0.086612 12.1182 0.234162C13.0029 0.554937 13.7353 1.1861 14.1741 2.0059C14.6129 2.8257 14.727 3.77604 14.4944 4.67358C14.2618 5.57113 13.699 6.35229 12.9146 6.86636C14.1479 7.3128 15.2013 8.13893 15.9174 9.22147C15.9911 9.33245 16.0169 9.46763 15.9891 9.59728C15.9613 9.72693 15.8822 9.84043 15.7692 9.91282Z"
                              fill="url(#paint0_linear_2821_1751)"
                              fillOpacity="0.5"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_2821_1751"
                                x1="2.19812"
                                y1="-5.29e-07"
                                x2="13.8019"
                                y2="10"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stopOpacity="0.2"
                                />
                              </linearGradient>
                            </defs>
                          </svg>
                          {trader.totalFollowers}/100
                        </p>
                      </div>
                    </div>

                    <Image
                      src={"/traders-badge-1.png"}
                      aria-label="traders badge"
                      alt="traders badge"
                      width={24}
                      height={24}
                      className="size-4 md:size-6 shrink-0"
                    />
                  </div>
                </Link>

                <div className="flex flex-col gap-3 md:gap-5 w-full">
                  <Link href={"/trading-post/traders/" + trader.id}>
                    <div className="flex md:flex-col justify-between gap-1 md:gap-3 w-full">
                      <div className="space-y-1">
                        <p className="font-semibold text-[10px] md:text-xs tracking-[2px] text-white/60">
                          ROI
                        </p>
                        <p
                          className={`${baloo.className} font-normal text-sm md:text-base tracking-[2px] text-[#09AF08]`}
                        >
                          {trader.roi?.toFixed(2) || 0.0}%
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-[10px] md:text-xs tracking-[2px] text-white/60">
                          Risk score
                        </p>
                        <p
                          className={`${baloo.className} font-normal text-sm md:text-base tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20`}
                        >
                          {trader.riskScore.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => {
                      toggleCopyTraderModal();
                      setFormData((prev) => ({
                        ...prev,
                        trader_id: trader.id,
                      }));
                    }}
                    className="flex items-center mx-auto justify-center gap-2.5 py-3 px-2.5 rounded-lg border border-white/30 h-[40px] w-full md:w-[156px] font-semibold text-xs tracking-[2px] text-white/80"
                  >
                    Copy now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
