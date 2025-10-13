import { anton } from "@/app/fonts";
import { useAuth } from "@/context/auth-context";
import { signs } from "@/utils/constants";
import { Children, Dispatch, ReactNode, SetStateAction } from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function CompleteTransactionModal({
  children,
  closeModal,
  sendingAsset,
  receivingAsset,
  sendingAmount,
  receivingAmount,
  recipient,
  transactionStage,
  setTransactionStage,
  saveAsBeneficiary,
  setSaveAsBeneficiary,
}: {
  children: ReactNode;
  closeModal: () => void;
  sendingAsset: Currency;
  receivingAsset: Currency;
  sendingAmount: string;
  receivingAmount: number;
  recipient: { name: string; username: string };
  transactionStage: "review" | "set-otp" | "otp";
  setTransactionStage: Dispatch<SetStateAction<"review" | "set-otp" | "otp">>;
  saveAsBeneficiary: boolean;
  setSaveAsBeneficiary: Dispatch<SetStateAction<boolean>>;
}) {
  const allChildren = Children.toArray(children);

  const {
    user: { user_data },
  } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center size-full p-4">
      <div className="absolute inset-0 bg-[#FFFFFF0D]" onClick={closeModal} />

      {transactionStage === "set-otp" ? (
        allChildren[0]
      ) : transactionStage === "otp" ? (
        allChildren[1]
      ) : (
        <div className="relative flex flex-col items-center gap-8 rounded-[20px] py-6 px-4 md:py-8 md:px-8 bg-[#232324] w-full max-w-[564px]">
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
            {sendingAmount}
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
                {sendingAmount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Amount received:
              </p>
              <p className="text-white/80 text-base/6 tracking-[1px]">
                {signs[receivingAsset]}
                {receivingAmount}
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
                {sendingAmount}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/40 text-base/6 tracking-[1px]">
                Add as beneficiary:
              </p>
              <label className="relative inline-block rounded-full w-[34px] h-[18px] bg-[#D2C808]">
                <input
                  type="checkbox"
                  checked={saveAsBeneficiary}
                  onChange={(e) => {
                    setSaveAsBeneficiary(e.target.checked);
                  }}
                  className="hidden peer"
                />
                <span className="absolute cursor-pointer inset-0 transition-all duration-300 before:absolute before:content-[''] before:size-[14px] before:left-0.5 before:top-0.5 before:bg-white before:rounded-full peer-checked:before:translate-x-4" />
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              if (user_data?.hasTransactionPin) setTransactionStage("otp");
              else setTransactionStage("set-otp");
            }}
            className="h-[50px] max-w-[367px] w-full py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
