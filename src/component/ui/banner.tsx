import { baloo } from "@/app/fonts";
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
        <div className="flex items-center justify-center h-[100px] w-[542px] bg-gradient-to-b from-[#CDBEF9] to-[#503C8B] mx-10">
          <p
            className={`${baloo.className} text-[32px] leading-[150%] tracking-[2%] bg-gradient-to-b from-[#130C26] to-[#262233] bg-clip-text text-transparent drop-shadow-[#6246B4] drop-shadow-[0px_4px_4px]`}
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
    <div className="flex drop-shadow-[#EFEDF6B2] drop-shadow-xs">
      <LeftSmall className={disabled ? "grayscale-100" : ""} />
      <div
        className={`flex items-center justify-center px-2.5 py-3 h-[48px] bg-gradient-to-b from-[#CDBEF9] to-[#503C8B] ${
          disabled && "grayscale-100"
        }`}
      >
        <p
          className={`${baloo.className} text-base tracking-[3%] bg-gradient-to-b from-[#130C26] to-[#262233] bg-clip-text text-transparent drop-shadow-[#6246B4] drop-shadow-[0px_4px_4px]`}
        >
          {label}
        </p>
      </div>
      <RightSmall className={disabled ? "grayscale-100" : ""} />
    </div>
  );
}
