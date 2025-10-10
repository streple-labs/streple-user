import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function AssetBalances({
  sendTo,
  sendingAsset,
  setSendingAsset,
}: {
  sendTo: null | "streple-user" | "bank" | "wallet" | "scan-code";
  sendingAsset: Currency;
  setSendingAsset: Dispatch<SetStateAction<Currency>>;
}) {
  const {
    user: { assets },
  } = useAuth();

  return (
    <div className="bg-[#211F22] py-6 px-4 rounded-[20px] flex flex-col gap-6 h-fit">
      <h5 className="test-base/[22px] font-semibold tracking-[3%]">
        Asset balances
      </h5>
      <div className="space-y-4 w-full">
        <div
          onClick={() => {
            setSendingAsset("STP");
          }}
          className={`rounded-[15px] p-px cursor-pointer ${
            sendTo && sendingAsset === "STP"
              ? "bg-[#B39FF0]"
              : "[background:linear-gradient(90deg,_rgba(255,255,255,0.28)_0%,_rgba(0,0,0,0.21)_100%)]"
          }`}
        >
          <div className="rounded-[14px] bg-[#211F22] py-4 px-6 flex items-center gap-3">
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
            <p className="text-sm font-semibold leading-[22px] text-white/80">
              STRP {assets.wallets["STP"].balance}
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            setSendingAsset("USDC");
          }}
          className={`rounded-[15px] p-px cursor-pointer ${
            sendTo && sendingAsset === "USDC"
              ? "bg-[#B39FF0]"
              : "[background:linear-gradient(90deg,_rgba(255,255,255,0.28)_0%,_rgba(0,0,0,0.21)_100%)]"
          }`}
        >
          <div className="rounded-[14px] bg-[#211F22] py-4 px-6 flex items-center gap-3">
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
            <p className="text-sm font-semibold leading-[22px] text-white/80">
              USDC {assets.wallets["USDC"].balance}
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            setSendingAsset("NGN");
          }}
          className={`rounded-[15px] p-px cursor-pointer ${
            sendTo && sendingAsset === "NGN"
              ? "bg-[#B39FF0]"
              : "[background:linear-gradient(90deg,_rgba(255,255,255,0.28)_0%,_rgba(0,0,0,0.21)_100%)]"
          }`}
        >
          <div className="rounded-[14px] bg-[#211F22] py-4 px-6 flex items-center gap-3">
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
            <p className="text-sm font-semibold leading-[22px] text-white/80">
              NGN {assets.wallets["NGN"].balance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
