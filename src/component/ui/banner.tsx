import { baloo, bazinga } from "@/app/fonts";
import {
  LeftBig,
  LeftSmall,
  RightBig,
  RightSmall,
} from "../icons/banner-sides";

export default function Banner({
  size = "small",
  label,
  disabled = false,
}: {
  size?: "small" | "big";
  label: string;
  disabled?: boolean;
}) {
  if (size === "big")
    return (
      <div className="flex drop-shadow-[#EFEDF6B2] drop-shadow-xs w-fit relative">
        <span className="absolute left-0.5">
          <LeftBig />
        </span>
        <div className="flex items-center justify-center h-[52px] md:h-[100px] md:w-[542px] bg-gradient-to-b from-[#CDBEF9] to-[#503C8B] mx-[30px] md:mx-10">
          <p
            className={`${baloo.className} text-base/5 md:text-[32px]/[150%] tracking-[2%] bg-gradient-to-b from-[#130C26] to-[#262233] bg-clip-text text-transparent drop-shadow-[#6246B4] drop-shadow-[0px_4px_4px]`}
          >
            {label}
          </p>
        </div>
        <span className="absolute right-0.5">
          <RightBig />
        </span>
      </div>
    );

  return (
    <div
      className={`${
        disabled && "grayscale-100"
      } flex drop-shadow-[#EFEDF6B2] drop-shadow-xs`}
    >
      <LeftSmall />
      <div
        className={`flex items-center justify-center max-md:-mx-0.5 px-2.5 py-3 h-[34px] md:h-[46px] bg-gradient-to-b from-[#CDBEF9] to-[#503C8B] ${
          disabled && "grayscale-100"
        }`}
      >
        <p
          className={`${bazinga.className} text-xs md:text-base tracking-[3%] bg-gradient-to-b from-[#130C26] to-[#262233] bg-clip-text text-transparent drop-shadow-[#25251A80] drop-shadow-[0px_4px_4px]`}
        >
          {label}
        </p>
      </div>
      <RightSmall />
    </div>
  );
}
