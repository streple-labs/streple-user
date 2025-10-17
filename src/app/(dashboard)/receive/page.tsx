"use client";

import { anton } from "@/app/fonts";
import Wrapper from "@/component/layout/wrapper";
import { useAuth } from "@/context/auth-context";
import { copyString, share, splitString } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { GoBell } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { toast } from "sonner";

export default function Page() {
  const {
    user: { user_data },
  } = useAuth();

  return (
    <Wrapper
      topNav={
        <header className="py-4 w-full h-16 md:h-[85px] flex items-center justify-center">
          <div className="flex items-center justify-between max-w-[1440px] w-full">
            <Link href="/">
              <Image
                src="/streple-logo.png"
                alt="streple logo"
                width={112}
                height={33}
                className="max-md:hidden"
              />

              <h5 className="md:hidden text-base font-semibold leading-5 text-white/70">
                Hello {user_data?.fullName.split(" ")[0]},
              </h5>
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
      }
    >
      <div className="flex flex-col gap-6 w-full h-fit hide-scrollbar lg:overflow-y-auto bg-[#211F22] rounded-[20px] p-8">
        <h1
          className={`${anton.className} text-base/5 md:text-xl/[150%] tracking-[2px]`}
        >
          Receive
        </h1>
        <h4 className="text-sm/[18px] md:text-base/5 tracking-[1px] text-white/80">
          Share your wallet details to get paid
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FFFFFF0D] rounded-3xl p-6 space-y-4 w-full">
            <h6 className="font-semibold text-sm/5 tracking-[1px] text-white/70">
              NGN account number
            </h6>
            <h5
              className={`${anton.className} text-[27px]/[150%] tracking-[2px]`}
            >
              {splitString("12345678901234")}
            </h5>
            <div className="w-full flex gap-4">
              <button
                onClick={async () => {
                  try {
                    await copyString("12345678");
                    toast.success("account number copied to clipboard");
                  } catch (error) {
                    console.error(error);
                    toast.error("error copying account number");
                  }
                }}
                className="w-full py-3 px-4 flex items-center justify-center rounded-[20px] bg-[#B39FF0] h-[50px] text-[#2C2C26] font-semibold text-sm/5 tracking-[2px]"
              >
                Copy
              </button>
              <button
                onClick={async () => {
                  try {
                    await share({
                      text: "Here is my account details for you to do justice to",
                      title: "12345678",
                      url: "app.streple.com/send",
                    });
                  } catch (error) {
                    console.error(error);
                    toast.error("error sharing account number");
                  }
                }}
                className="w-full py-3 px-4 flex items-center justify-center rounded-[20px] bg-[#EBE7F8] h-[50px] text-[#2C2C26] font-semibold text-sm/5 tracking-[2px]"
              >
                Share
              </button>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <span>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.832 17.1666H16.6654M13.332 17.1666H11.6654V14.6666M14.1654 14.6666H16.6654V12.1666H15.832M11.6654 12.1666H13.332M3.33203 14.6666C3.33203 13.8899 3.33203 13.5016 3.4587 13.1949C3.62785 12.7867 3.95217 12.4624 4.36036 12.2933C4.66703 12.1666 5.05536 12.1666 5.83203 12.1666C6.6087 12.1666 6.99703 12.1666 7.3037 12.2933C7.71203 12.4624 8.0362 12.7866 8.20536 13.1949C8.33203 13.5016 8.33203 13.8899 8.33203 14.6666C8.33203 15.4433 8.33203 15.8316 8.20536 16.1374C8.1217 16.3397 7.99901 16.5235 7.8443 16.6784C7.68959 16.8332 7.50589 16.9561 7.3037 17.0399C6.99703 17.1666 6.6087 17.1666 5.83203 17.1666C5.05536 17.1666 4.66703 17.1666 4.36036 17.0399C3.95217 16.8708 3.62785 16.5464 3.4587 16.1383C3.33203 15.8316 3.33203 15.4433 3.33203 14.6666ZM11.6654 6.33325C11.6654 5.55659 11.6654 5.16825 11.792 4.86159C11.9612 4.45339 12.2855 4.12907 12.6937 3.95992C13.0004 3.83325 13.3887 3.83325 14.1654 3.83325C14.942 3.83325 15.3304 3.83325 15.637 3.95992C16.0454 4.12909 16.3695 4.45325 16.5387 4.86159C16.6654 5.16825 16.6654 5.55659 16.6654 6.33325C16.6654 7.10992 16.6654 7.49825 16.5387 7.80409C16.455 8.00636 16.3323 8.19017 16.1776 8.34502C16.0229 8.49987 15.8392 8.62273 15.637 8.70659C15.3304 8.83325 14.942 8.83325 14.1654 8.83325C13.3887 8.83325 13.0004 8.83325 12.6937 8.70659C12.2855 8.53743 11.9612 8.21311 11.792 7.80492C11.6654 7.49825 11.6654 7.10992 11.6654 6.33325ZM3.33203 6.33325C3.33203 5.55659 3.33203 5.16825 3.4587 4.86159C3.62785 4.45339 3.95217 4.12907 4.36036 3.95992C4.66703 3.83325 5.05536 3.83325 5.83203 3.83325C6.6087 3.83325 6.99703 3.83325 7.3037 3.95992C7.71203 4.12909 8.0362 4.45325 8.20536 4.86159C8.33203 5.16825 8.33203 5.55659 8.33203 6.33325C8.33203 7.10992 8.33203 7.49825 8.20536 7.80409C8.1217 8.00636 7.99901 8.19017 7.8443 8.34502C7.68959 8.49987 7.50589 8.62273 7.3037 8.70659C6.99703 8.83325 6.6087 8.83325 5.83203 8.83325C5.05536 8.83325 4.66703 8.83325 4.36036 8.70659C3.95217 8.53743 3.62785 8.21311 3.4587 7.80492C3.33203 7.49825 3.33203 7.10992 3.33203 6.33325Z"
                    stroke="#B39FF0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-[#CFCEB8] font-semibold text-sm/5 tracking-[2px]">
                Generate a QR Code
              </p>
            </div>
          </div>
          <div className="bg-[#FFFFFF0D] rounded-3xl p-6 space-y-4 w-full">
            <h6 className="font-semibold text-sm/5 tracking-[1px] text-white/70">
              Wallet address
            </h6>
            <h5
              className={`${anton.className} text-[27px]/[150%] tracking-[2px]`}
            >
              {splitString("12345678901234")}
            </h5>
            <div className="w-full flex gap-4">
              <button
                onClick={async () => {
                  try {
                    await copyString("12345678");
                    toast.success("Address copied to clipboard");
                  } catch (error) {
                    console.error(error);
                    toast.error("error copying address");
                  }
                }}
                className="w-full py-3 px-4 flex items-center justify-center rounded-[20px] bg-[#B39FF0] h-[50px] text-[#2C2C26] font-semibold text-sm/5 tracking-[2px]"
              >
                Copy
              </button>
              <button
                onClick={async () => {
                  try {
                    await share({
                      text: "Here is my wallet address for you to do justice to.",
                      title: "12345678",
                      url: "app.streple.com/send",
                    });
                  } catch (error) {
                    console.error(error);
                    toast.error("error sharing wallet address");
                  }
                }}
                className="w-full py-3 px-4 flex items-center justify-center rounded-[20px] bg-[#EBE7F8] h-[50px] text-[#2C2C26] font-semibold text-sm/5 tracking-[2px]"
              >
                Share
              </button>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <span>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.832 17.1666H16.6654M13.332 17.1666H11.6654V14.6666M14.1654 14.6666H16.6654V12.1666H15.832M11.6654 12.1666H13.332M3.33203 14.6666C3.33203 13.8899 3.33203 13.5016 3.4587 13.1949C3.62785 12.7867 3.95217 12.4624 4.36036 12.2933C4.66703 12.1666 5.05536 12.1666 5.83203 12.1666C6.6087 12.1666 6.99703 12.1666 7.3037 12.2933C7.71203 12.4624 8.0362 12.7866 8.20536 13.1949C8.33203 13.5016 8.33203 13.8899 8.33203 14.6666C8.33203 15.4433 8.33203 15.8316 8.20536 16.1374C8.1217 16.3397 7.99901 16.5235 7.8443 16.6784C7.68959 16.8332 7.50589 16.9561 7.3037 17.0399C6.99703 17.1666 6.6087 17.1666 5.83203 17.1666C5.05536 17.1666 4.66703 17.1666 4.36036 17.0399C3.95217 16.8708 3.62785 16.5464 3.4587 16.1383C3.33203 15.8316 3.33203 15.4433 3.33203 14.6666ZM11.6654 6.33325C11.6654 5.55659 11.6654 5.16825 11.792 4.86159C11.9612 4.45339 12.2855 4.12907 12.6937 3.95992C13.0004 3.83325 13.3887 3.83325 14.1654 3.83325C14.942 3.83325 15.3304 3.83325 15.637 3.95992C16.0454 4.12909 16.3695 4.45325 16.5387 4.86159C16.6654 5.16825 16.6654 5.55659 16.6654 6.33325C16.6654 7.10992 16.6654 7.49825 16.5387 7.80409C16.455 8.00636 16.3323 8.19017 16.1776 8.34502C16.0229 8.49987 15.8392 8.62273 15.637 8.70659C15.3304 8.83325 14.942 8.83325 14.1654 8.83325C13.3887 8.83325 13.0004 8.83325 12.6937 8.70659C12.2855 8.53743 11.9612 8.21311 11.792 7.80492C11.6654 7.49825 11.6654 7.10992 11.6654 6.33325ZM3.33203 6.33325C3.33203 5.55659 3.33203 5.16825 3.4587 4.86159C3.62785 4.45339 3.95217 4.12907 4.36036 3.95992C4.66703 3.83325 5.05536 3.83325 5.83203 3.83325C6.6087 3.83325 6.99703 3.83325 7.3037 3.95992C7.71203 4.12909 8.0362 4.45325 8.20536 4.86159C8.33203 5.16825 8.33203 5.55659 8.33203 6.33325C8.33203 7.10992 8.33203 7.49825 8.20536 7.80409C8.1217 8.00636 7.99901 8.19017 7.8443 8.34502C7.68959 8.49987 7.50589 8.62273 7.3037 8.70659C6.99703 8.83325 6.6087 8.83325 5.83203 8.83325C5.05536 8.83325 4.66703 8.83325 4.36036 8.70659C3.95217 8.53743 3.62785 8.21311 3.4587 7.80492C3.33203 7.49825 3.33203 7.10992 3.33203 6.33325Z"
                    stroke="#B39FF0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-[#CFCEB8] font-semibold text-sm/5 tracking-[2px]">
                Generate a QR Code
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
