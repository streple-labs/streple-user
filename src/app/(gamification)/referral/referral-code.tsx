"use client";

import { baloo } from "@/app/fonts";
import Modal from "@/component/ui/modal";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { useState } from "react";

export default function ReferralCode() {
  const {
    user: { user_data },
  } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const refLink = `https://app.streple.com/signup?ref=${user_data?.refercode}`;

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="relative bg-[url('/learn-bg.jpg')] bg-cover bg-center bg-no-repeat w-full max-w-3xl min-h-[462px] rounded-[29px] overflow-hidden p-16">
          <div className="absolute inset-0 size-full bg-[#141314] opacity-95" />

          <span className="absolute top-0 left-1/2 -translate-x-1/2">
            <svg
              width="594"
              height="384"
              viewBox="0 0 594 384"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_f_3588_7374)">
                <ellipse
                  cx="296.784"
                  cy="139.623"
                  rx="142.784"
                  ry="90.4124"
                  fill="#A082F9"
                  fill-opacity="0.4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_3588_7374"
                  x="0.5"
                  y="-104.289"
                  width="592.566"
                  height="487.825"
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
                    result="effect1_foregroundBlur_3588_7374"
                  />
                </filter>
              </defs>
            </svg>
          </span>

          <div className="flex items-center justify-center flex-col gap-4 relative">
            <Image
              src={"/mascot-8.png"}
              alt="welcome mascot"
              width={217}
              height={148}
            />
            <div className="max-w-xs w-full flex items-center justify-center flex-col gap-3">
              <h6 className={`${baloo.className} text-white/60 text-base`}>
                Your referral code
              </h6>
              <div className="flex items-center justify-between gap-2 w-full h-[51px] p-4 border border-[#A082F9] rounded-[10px] bg-[#FFFFFF0D]">
                <p
                  className={`${baloo.className} text-xs w-full text-ellipsis whitespace-nowrap overflow-hidden`}
                >
                  {refLink}
                </p>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(refLink);
                    setShowModal(true);
                  }}
                  className={`${baloo.className} rounded-[20px] py-2 px-3 bg-[#A082F9] text-[#1B191C] text-xs`}
                >
                  COPIED!
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="md:max-w-xs w-full space-y-3">
        <h6 className={`${baloo.className} text-white/60 text-base`}>
          Your referral link
        </h6>
        <div className="flex items-center justify-between w-full h-[51px] p-4 border border-[#A082F9] rounded-[10px] bg-[#FFFFFF0D]">
          <p
            className={`${baloo.className} text-xs w-full text-ellipsis whitespace-nowrap overflow-hidden`}
          >
            {refLink}
          </p>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(refLink);
              setShowModal(true);
            }}
            className={`${baloo.className} rounded-[20px] py-2 px-3 bg-[#A082F9] text-[#1B191C] text-xs`}
          >
            COPY
          </button>
        </div>
      </div>
    </>
  );
}
