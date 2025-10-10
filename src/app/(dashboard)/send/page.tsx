"use client";

import { anton } from "@/app/fonts";
import Rectangle44 from "@/component/icons/rectangle-44";
import SuccessCheckmark from "@/component/icons/success-checkmark";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import AssetBalances from "./_components/asset-balances";
import SendTo from "./_components/send-to";
import SendTransaction from "./_components/send-transaction";
import { signs } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { performTransaction } from "@/utils/api/action";

export default function Page() {
  const [sendTo, setSendTo] = useState<
    null | "streple-user" | "bank" | "wallet" | "scan-code"
  >(null);
  const [sendingAsset, setSendingAsset] = useState<"ngn" | "usdc" | "strp">(
    "ngn"
  );
  const [receivingAsset, setReceivingAsset] = useState<"ngn" | "usdc" | "strp">(
    "ngn"
  );
  const [recipient, setRecipient] = useState<{
    name: string;
    username: string;
    id: string;
  }>();

  const [amount, setAmount] = useState("");

  const [transactionSuccessful, setTransactionSuccessful] = useState(false);

  const { mutate: handleMakeTransaction, isPending } = useMutation({
    mutationKey: ["transaction"],
    mutationFn: async () =>
      await performTransaction({
        amount: Number(amount),
        beneficiary: false,
        idempotency: recipient!.id,
        recipientCurrency: receivingAsset.toUpperCase() as Currency,
        senderCurrency: sendingAsset.toUpperCase() as Currency,
        transactionPin: "",
        username: recipient!.username,
      }),
    onSuccess: (res) => {
      if (res.success) {
        setTransactionSuccessful(true);
        console.log(res.receipt);
        toast.success(res.message);
      } else toast.error(res.message);
    },
    onError: (error: unknown) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full hide-scrollbar lg:overflow-y-auto relative">
      <Link
        href={"/"}
        className="flex items-center gap-2 text-white/60 text-base cursor-pointer"
      >
        <span>
          <FaChevronLeft fill="#FFFFFF99" width={5} height={10} />
        </span>
        Back
      </Link>

      {transactionSuccessful ? (
        <div className="relative overflow-hidden overflow-y-auto hide-scrollbar flex flex-col items-center gap-10 p-8 rounded-[20px] bg-[#211F22]">
          <span className="absolute top-0 inset-0 left-0 right-0">
            <Rectangle44 />
          </span>

          <div className="flex flex-col items-center justify-center gap-8 max-w-[490px] relative">
            <SuccessCheckmark />

            <h2
              className={`${anton.className} text-[21px] md:text-[27px] leading-[150%] tracking-[2px]`}
            >
              Transaction successful!
            </h2>

            <p className="text-base/6 tracking-[1px] text-white/80 text-center">
              Your funds are already moving. {recipient?.name} will get it
              shortly.
            </p>

            <div className="flex flex-col items-center gap-6 w-full">
              <h4 className="font-bold text-[#F4E90EB2] text-base/6 md:text-[21px]/8 tracking-[1px]">
                {signs[receivingAsset]}
                {amount}
              </h4>

              <div className="w-full space-y-4" id="receipt">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white/40 text-base/6 tracking-[1px]">
                    Recipient tag
                  </p>
                  <p className="text-white/80 text-base/6 tracking-[1px]">
                    @{recipient?.username}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white/40 text-base/6 tracking-[1px]">
                    Sent amount
                  </p>
                  <p className="text-white/80 text-base/6 tracking-[1px] uppercase">
                    {signs[sendingAsset]}
                    {amount}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white/40 text-base/6 tracking-[1px]">
                    Received amount
                  </p>
                  <p className="text-white/80 text-base/6 tracking-[1px]">
                    {signs[sendingAsset]}
                    {amount}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white/40 text-base/6 tracking-[1px]">
                    Total amount sent:
                  </p>
                  <p className="text-white/80 text-base/6 tracking-[1px]">
                    {signs[receivingAsset]}
                    {amount}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white/40 text-base/6 tracking-[1px]">
                    Date
                  </p>
                  <p className="text-white/80 text-base/6 tracking-[1px]">{}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white/40 text-base/6 tracking-[1px]">
                    Transaction ID
                  </p>
                  <p className="text-white/80 text-base/6 tracking-[1px]">{}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 relative w-full">
            <button
              onClick={() => {}}
              className="h-[50px] w-full max-w-[301px] py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-sm/[150%] font-bold tracking-[2px] text-[#2C2C26]"
            >
              Download receipt
            </button>

            <Link href={"/"} className="w-full max-w-[301px]">
              <button className="h-[50px] w-full py-3 px-4 rounded-[20px] bg-[#EBE7F8] bg-blend-luminosity text-sm/[150%] font-bold tracking-[2px] text-[#2C2C26]">
                Back to home
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="lg:order-2">
            <AssetBalances
              sendTo={sendTo}
              sendingAsset={sendingAsset}
              setSendingAsset={setSendingAsset}
            />
          </div>
          <div className="lg:order-1 xl:col-span-2">
            {sendTo ? (
              <SendTransaction
                recipient={recipient}
                setRecipient={setRecipient}
                sendingAsset={sendingAsset}
                setSendingAsset={setSendingAsset}
                receivingAsset={receivingAsset}
                setReceivingAsset={setReceivingAsset}
                setSuccess={setTransactionSuccessful}
                amount={amount}
                setAmount={setAmount}
                loading={isPending}
                handleMakeTransaction={handleMakeTransaction}
              />
            ) : (
              <SendTo setSendTo={setSendTo} setRecipient={setRecipient} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
