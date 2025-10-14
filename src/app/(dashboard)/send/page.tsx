"use client";

import { useAuth } from "@/context/auth-context";
import { convertCurrency, performTransaction } from "@/utils/api/action";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import Image from "next/image";
import Wrapper from "@/component/layout/wrapper";
import { IoSearch } from "react-icons/io5";
import { GoBell } from "react-icons/go";

export default function Page() {
  const { setUser, user } = useAuth();

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

  const [sendingAmount, setSendingAmount] = useState("");

  const [transactionSuccessful, setTransactionSuccessful] = useState(false);

  const [showCompleteTransactionModal, setShowCompleteTransactionModal] =
    useState(false);

  const [transactionStage, setTransactionStage] = useState<
    "review" | "set-otp" | "otp"
  >("review");

  const [transactionPin, setTransactionPin] = useState("");
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false);

  const [transactionReference, setTransactionReference] = useState("");

  const { data: receivingAmount } = useQuery({
    queryKey: ["convert", sendingAsset, receivingAsset, sendingAmount],
    queryFn: async () =>
      await convertCurrency({
        from: sendingAsset,
        to: receivingAsset,
        amount: Number(sendingAmount),
      }),
    enabled: Boolean(receivingAsset && sendingAsset && sendingAmount),
  });

  const { mutate: handleMakeTransaction, isPending } = useMutation({
    mutationKey: ["transaction"],
    mutationFn: async () =>
      await performTransaction({
        amount: Number(sendingAmount),
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
        setTransactionReference(res.receipt.transaction.reference);
        setUser({
          ...user,
          assets: {
            ...user.assets,
            wallets: {
              ...user.assets.wallets,
              [sendingAsset]: {
                ...user.assets.wallets[sendingAsset],
                balance:
                  user.assets.wallets[sendingAsset].balance -
                  Number(sendingAmount),
              },
            },
          },
        });
        toast.success(res.message);
      } else toast.error(res.message);
    },
    onError: (error: unknown) => {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  return (
    <Wrapper
      topNav={
        <header className="py-4 w-full h-16 md:h-[85px] flex items-center justify-center">
          <div className="flex items-center justify-between max-w-[1440px] w-full">
            <Link href="/">
              <Image
                src="/streple-logo.png"
                alt="streple logo"
                width={112}
                height={33}
                className="max-md:hidden"
              />

              <h5 className="md:hidden text-base font-semibold leading-5 text-white/70">
                Hello {user.user_data?.fullName.split(" ")[0]},
              </h5>
            </Link>

            <div className="hidden md:flex w-full max-w-sm lg:max-w-[593px]">
              <div className="w-full relative">
                <input
                  name="search"
                  title="search for traders"
                  type="text"
                  placeholder="search for traders"
                  className={`h-[50px] w-full text-base font-normal py-5 px-4 rounded-[10px] gap-4 leading-6 tracking-[1px] placeholder:text-xs placeholder:text-white/70 outline-0 ring-0 caret-[#B39FF0] bg-[#242324]`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                  <IoSearch size={20} color="#FFFFFF99" />
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center shrink-0">
              <div className="rounded-[10px] flex items-center justify-center bg-[#242324] cursor-pointer h-[31px] w-[28px] md:h-[50px] md:w-[45px]">
                <GoBell width={12} color="#FFFFFFB2" />
              </div>

              <div className="flex gap-2 items-center cursor-pointer">
                <Image
                  src={user.user_data?.avatarUrl || "/test-png.jpg"}
                  alt="test image"
                  width={40}
                  height={40}
                  className="size-6 md:size-10 rounded-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </header>
      }
    >
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
            sendingAmount={sendingAmount}
            receivingAmount={receivingAmount?.amount}
            receivingAsset={receivingAsset}
            recipient={recipient!}
            sendingAsset={sendingAsset}
            transactionReference={transactionReference}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 max-lg:pb-20">
            <div className="hidden lg:block lg:order-2">
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
                  sendingAmount={sendingAmount}
                  receivingAmount={receivingAmount?.amount}
                  setSendingAmount={setSendingAmount}
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
                    sendingAmount={sendingAmount}
                    receivingAmount={receivingAmount?.amount}
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
    </Wrapper>
  );
}
