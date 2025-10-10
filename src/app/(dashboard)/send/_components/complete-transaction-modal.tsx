import { anton } from "@/app/fonts";
import { useAuth } from "@/context/auth-context";
import { signs } from "@/utils/constants";
import { SetStateAction, Dispatch, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import SetOtp from "./set-otp";
import Otp from "./otp";

export default function CompleteTransactionModal({
  closeModal,
  sendingAsset,
  receivingAsset,
  amount,
  recipient,
  loading,
  handleMakeTransaction,
}: {
  closeModal: () => void;
  sendingAsset: "ngn" | "usdc" | "strp";
  receivingAsset: "ngn" | "usdc" | "strp";
  amount: string;
  recipient: { name: string; username: string };
  setSuccess: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  handleMakeTransaction: () => void;
}) {
  const {
    user: { user_data },
  } = useAuth();

  const [isChecked, setIsChecked] = useState(false);

  const [stage, setStage] = useState<"review" | "set-otp" | "otp">("review");

  const [otp, setOtp] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center size-full">
      <div className="absolute inset-0 bg-[#FFFFFF0D]" onClick={closeModal} />

      {stage === "set-otp" ? (
        <SetOtp
          back={() => {
            setStage("review");
          }}
          setOtp={setOtp}
        />
      ) : stage === "otp" ? (
        <Otp
          back={() => {
            setStage("review");
          }}
          setOtp={setOtp}
          otp={otp}
          loading={loading}
          handleMakeTransaction={handleMakeTransaction}
        />
      ) : (
        <div className="relative flex flex-col items-center gap-8 rounded-[20px] p-8 bg-[#232324] w-full max-w-[564px]">
          <div className="flex items-center justify-between gap-4 w-full">
            <FaArrowLeft
              width={14}
              fill="#FFFFFF99"
              className="cursor-pointer"
              onClick={closeModal}
            />
            <h2
              className={`${anton.className} text-base/[150%] tracking-[2px]`}
            >
              Review transaction
            </h2>
            <span />
          </div>
          <h6 className="text-[21px]/8 font-semibold tracking-[1px] text-white/70">
            {signs[sendingAsset]}
            {amount}
          </h6>

          <div className="w-full space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Recipient tag:
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                @{recipient.username}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Asset used:
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px] uppercase">
                {sendingAsset}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Amount sent:
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                {signs[sendingAsset]}
                {amount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Amount received:
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                {signs[receivingAsset]}
                {amount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Transaction fee:
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                {signs[sendingAsset]}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Total amount:
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                {amount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Add as beneficiary:
              </p>
              <label className="relative inline-block rounded-full w-[34px] h-[18px] bg-[#D2C808]">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                  }}
                  className="hidden peer"
                />
                <span className="absolute cursor-pointer inset-0 transition-all duration-300 before:absolute before:content-[''] before:size-[14px] before:left-0.5 before:top-0.5 before:bg-white before:rounded-full peer-checked:before:translate-x-4" />
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              if (user_data?.hasTransactionPin) setStage("otp");
              else setStage("set-otp");
            }}
            className="h-[50px] max-w-[367px] w-full py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]"
          >
            Continue to send
          </button>
        </div>
      )}
    </div>
  );
}
