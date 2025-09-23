"use client";

import { baloo } from "@/app/fonts";
import CopyTrader from "@/component/form/copy-trader-form";
import Loader from "@/component/ui/loader";
import Modal from "@/component/ui/modal";
import { followTrader } from "@/utils/api/action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function FollowTraderBtn({ trader_id }: { trader_id: string }) {
  const [copyTraderModal, setCopyTraderModal] = useState(false);
  const toggleCopyTraderModal = () => {
    setCopyTraderModal((prev) => !prev);
  };

  const [formData, setFormData] = useState<FollowTraderPayload>({
    trader_id,
    amount: 50,
    stopLossRatio: undefined,
    takeProfitRatio: undefined,
    maxCopy: undefined,
    slippageLimit: undefined,
    marginMode: undefined,
    leverage: undefined,
  });

  const { mutate: handleFollowTrader, isPending: isFollowTraderLoading } =
    useMutation({
      mutationKey: ["follow-trader"],
      mutationFn: async () => await followTrader(formData),
      onSuccess: (res) => {
        if (res.success) toast.success(res.message);
        else toast.error(res.message);
      },
      onError: (error: unknown) => {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again.");
      },
    });

  return (
    <>
      <Modal isOpen={copyTraderModal} onClose={toggleCopyTraderModal}>
        <div className="relative w-full h-screen lg:max-h-[90vh] pt-16 max-w-6xl bg-[#141314] lg:rounded-[29px] space-y-10 overflow-y-auto hide-scrollbar p-4">
          <h2
            className={`${baloo.className} w-full text-center drop-shadow-[0px_4px_4px] drop-shadow-[#CABAFA] text-2xl tracking-[2px]`}
          >
            Smart copy
          </h2>
          <CopyTrader
            handleCopyTrader={handleFollowTrader}
            loading={isFollowTraderLoading}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </Modal>

      <div className="flex gap-4 items-center">
        <span className="rounded-full border border-white/30 py-3 px-2.5 w-10 h-11 cursor-pointer">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H10.625V16.875C10.625 17.0408 10.5592 17.1997 10.4419 17.3169C10.3247 17.4342 10.1658 17.5 10 17.5C9.83424 17.5 9.67527 17.4342 9.55806 17.3169C9.44085 17.1997 9.375 17.0408 9.375 16.875V10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H9.375V3.125C9.375 2.95924 9.44085 2.80027 9.55806 2.68306C9.67527 2.56585 9.83424 2.5 10 2.5C10.1658 2.5 10.3247 2.56585 10.4419 2.68306C10.5592 2.80027 10.625 2.95924 10.625 3.125V9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10Z"
              fill="white"
              fillOpacity="0.7"
            />
          </svg>
        </span>

        <button
          title="follow trader"
          aria-label="follow trader"
          disabled={isFollowTraderLoading}
          onClick={() => {
            toggleCopyTraderModal();
            setFormData((prev) => ({
              ...prev,
              trader_id,
            }));
          }}
          className="h-11 py-3 px-4 rounded-[20px] w-[172px] bg-[#B39FF0] flex items-center justify-center text-[#2C2C26] font-bold text-xs md:text-base leading-[150%] tracking-[2px]"
        >
          {isFollowTraderLoading ? <Loader /> : "Copy"}
        </button>
      </div>
    </>
  );
}
