import { baloo } from "@/app/fonts";
import Image from "next/image";
import mascot from "../../../../public/mascot-3.png";
import ReferralCode from "./referral-code";

export default function page() {
  return (
    <div className="space-y-10 w-full overflow-y-auto hide-scrollbar relative">
      <div className="min-h-[145px] md:h-[207px] py-4 md:pt-[30px] px-4 md:px-[52px] relative rounded-3xl overflow-hidden flex justify-between">
        <Image
          src="/learn-bg.jpg"
          alt="background"
          fill
          className="absolute size-full inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        />

        <div className="space-y-2 md:space-y-6 flex-1 relative z-1 md:max-w-[455px]">
          <h2
            className={`${baloo.className} text-xl md:text-4xl drop-shadow-[#25251A80] drop-shadow-[0px_4px_4px]`}
          >
            Earn{" "}
            <span className="text-[#BDB510]">
              5000<span className="text-sm md:text-2xl">STPs</span>
            </span>{" "}
            by referring your friends!!!
          </h2>
          <p className="text-[10px]/5 md:text-xs/6 tracking-[2px]">
            If you invite 5 friends today, you&apos;ll earn 50 STRP and unlock
            your first badge. Start earning more with referrals
          </p>
        </div>

        <span className="absolute right-0 md:-right-12 bottom-0">
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
        <div className="absolute -right-8 -bottom-4 md:right-0 md:bottom-0">
          <Image
            src={"/bag-of-coins.png"}
            alt="bag of coins"
            width={341}
            height={282}
            quality={100}
            className="w-[161px] h-[133px] md:w-[341px] md:h-[282px]"
          />
        </div>
      </div>

      <div className="space-y-4 w-full">
        <div className="md:hidden">
          <ReferralCode />
        </div>

        <h6
          className={`${baloo.className} text-base/5 md:text-2xl/10 tracking-[2px]`}
        >
          How it works
        </h6>

        <div className="space-y-4 md:space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 md:p-6 rounded-[11px] bg-[#503C8B0D] flex flex-col gap-2.5">
              <Image
                src={"/paper-plane.png"}
                alt="paper place"
                width={24}
                height={24}
              />

              <h6 className={`${baloo.className} text-base`}>
                Share your code
              </h6>

              <p className="text-xs">Send your referral link to friends</p>
            </div>
            <div className="p-4 md:p-6 rounded-[11px] bg-[#503C8B0D] flex flex-col gap-2.5">
              <Image
                src={"/puzzle-piece.png"}
                alt="paper place"
                width={24}
                height={24}
              />

              <h6 className={`${baloo.className} text-base`}>
                They join & complete 1 milestone
              </h6>

              <p className="text-xs">Like taking their first crypto lesson</p>
            </div>
            <div className="p-4 md:p-6 rounded-[11px] bg-[#503C8B0D] flex flex-col gap-2.5">
              <Image
                src={"/referral-coin-illustration.png"}
                alt="paper place"
                width={24}
                height={24}
              />

              <h6 className={`${baloo.className} text-base`}>
                You both earn rewards
              </h6>

              <p className="text-xs">Win STR Points instantly.</p>
            </div>
          </div>
          <div className="max-md:hidden flex items-center justify-center gap-[45px] w-full">
            <ReferralCode />

            <Image
              src={mascot}
              alt="welcome mascot"
              width={217}
              height={164}
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
