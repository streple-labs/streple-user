"use client";

import { performTransaction } from "@/utils/api/action";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { toast } from "sonner";
import AssetBalances from "./_components/asset-balances";
import CompleteTransactionModal from "./_components/complete-transaction-modal";
import Otp from "./_components/otp";
import SelectRecipient from "./_components/select-recipient";
import SendTo from "./_components/send-to";
import SendTransaction from "./_components/send-transaction";
import SetOtp from "./_components/set-otp";
import TransactionSuccessful from "./_components/transaction-successful";

export default function Page() {
  const [sendTo, setSendTo] = useState<
    null | "streple-user" | "bank" | "wallet" | "scan-code"
  >(null);
  const [sendingAsset, setSendingAsset] = useState<Currency>("NGN");
  const [receivingAsset, setReceivingAsset] = useState<Currency>("NGN");
  const [recipient, setRecipient] = useState<{
    name: string;
    username: string;
    id: string;
  }>();

  const [amount, setAmount] = useState("");

  const [transactionSuccessful, setTransactionSuccessful] = useState(false);

  const [showCompleteTransactionModal, setShowCompleteTransactionModal] =
    useState(false);

  const [transactionStage, setTransactionStage] = useState<
    "review" | "set-otp" | "otp"
  >("review");

  const [transactionPin, setTransactionPin] = useState("");
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false);

  const { mutate: handleMakeTransaction, isPending } = useMutation({
    mutationKey: ["transaction"],
    mutationFn: async () =>
      await performTransaction({
        amount: Number(amount),
        beneficiary: saveAsBeneficiary,
        idempotency: recipient!.id,
        recipientCurrency: receivingAsset.toUpperCase() as Currency,
        senderCurrency: sendingAsset.toUpperCase() as Currency,
        transactionPin,
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
        <TransactionSuccessful
          amount={amount}
          receivingAsset={receivingAsset}
          recipient={recipient!}
          sendingAsset={sendingAsset}
        />
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
                amount={amount}
                setAmount={setAmount}
                showCompleteTransactionModal={showCompleteTransactionModal}
                setShowCompleteTransactionModal={
                  setShowCompleteTransactionModal
                }
              >
                <SelectRecipient
                  recipient={recipient}
                  setRecipient={setRecipient}
                />
                <CompleteTransactionModal
                  amount={amount}
                  closeModal={() => {
                    setShowCompleteTransactionModal(false);
                  }}
                  receivingAsset={receivingAsset}
                  sendingAsset={sendingAsset}
                  recipient={recipient!}
                  transactionStage={transactionStage}
                  setTransactionStage={setTransactionStage}
                  saveAsBeneficiary={saveAsBeneficiary}
                  setSaveAsBeneficiary={setSaveAsBeneficiary}
                >
                  <SetOtp
                    back={() => {
                      setTransactionStage("review");
                    }}
                    setOtp={setTransactionPin}
                  />
                  <Otp
                    back={() => {
                      setTransactionStage("review");
                    }}
                    setOtp={setTransactionPin}
                    otp={transactionPin}
                    loading={isPending}
                    handleMakeTransaction={handleMakeTransaction}
                  />
                </CompleteTransactionModal>
              </SendTransaction>
            ) : (
              <SendTo setSendTo={setSendTo} setRecipient={setRecipient} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
