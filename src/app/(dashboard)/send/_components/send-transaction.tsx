import { anton, dmSans } from "@/app/fonts";
import { signs } from "@/utils/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import SelectRecipient from "./select-recipient";
import CompleteTransactionModal from "./complete-transaction-modal";

export default function SendTransaction({
  recipient,
  setRecipient,
  setReceivingAsset,
  receivingAsset,
  sendingAsset,
  setSendingAsset,
  setSuccess,
  amount,
  setAmount,
  loading,
  handleMakeTransaction,
}: {
  recipient: { name: string; username: string; id: string } | undefined;
  setRecipient: Dispatch<
    SetStateAction<
      | {
          name: string;
          username: string;
          id: string;
        }
      | undefined
    >
  >;
  sendingAsset: "ngn" | "usdc" | "strp";
  setSendingAsset: Dispatch<SetStateAction<"strp" | "usdc" | "ngn">>;
  receivingAsset: "ngn" | "usdc" | "strp";
  setReceivingAsset: Dispatch<SetStateAction<"strp" | "usdc" | "ngn">>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  loading: boolean;
  handleMakeTransaction: () => void;
}) {
  const [showSendingAssetOptions, setShowSendingAssetOptions] = useState(false);
  const [showReceivingAssetOptions, setShowReceivingAssetOptions] =
    useState(false);

  const [showCompleteTransactionModal, setShowCompleteTransactionModal] =
    useState(false);

  if (!recipient)
    return (
      <SelectRecipient recipient={recipient} setRecipient={setRecipient} />
    );

  return (
    <>
      {showCompleteTransactionModal && (
        <CompleteTransactionModal
          amount={amount}
          closeModal={() => {
            setShowCompleteTransactionModal(false);
          }}
          receivingAsset={receivingAsset}
          sendingAsset={sendingAsset}
          recipient={recipient}
          setSuccess={setSuccess}
          loading={loading}
          handleMakeTransaction={handleMakeTransaction}
        />
      )}

      <div className="p-8 rounded-[20px] bg-[#211F22] flex flex-col gap-8">
        <h2
          className={`${anton.className} test-base md:text-xl leading-[150%] tracking-[2px]`}
        >
          Send
        </h2>

        <div className="flex flex-col items-center gap-10">
          <div className="w-full space-y-6">
            <div className="w-full space-y-3">
              <p className="text-base/6 tracking-[1px]">To</p>
              <div className="py-5 px-4 rounded-[15px] bg-[#FFFFFF05] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="size-10 rounded-full flex items-center justify-center bg-[#D9D9D9] text-[#000000CC] text-lg font-semibold">{`${recipient.name
                    .split(" ")[0]
                    .charAt(0)}${recipient.name.split(" ")[1].charAt(0)}`}</div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">{recipient.name}</p>
                    <p className="text-xs text-white/60">
                      @{recipient.username}
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setRecipient(undefined);
                  }}
                  className="border border-white/10 cursor-pointer bg-[#FFFFFF08] p-2 rounded-lg text-xs text-white/80"
                >
                  <p>Change</p>
                </div>
              </div>
            </div>
            <div className="w-full space-y-4">
              <p className="text-base/6 tracking-[1px]">Amount to send</p>

              <div className="py-5 px-4 border border-white/10 rounded-[15px] flex items-center justify-between gap-4">
                <label htmlFor="send" className="flex items-center">
                  <p className="text-2xl/normal text-white/20">
                    {signs[sendingAsset]}
                  </p>
                  <input
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value.replace(/[^0-9.]/g, ""));
                    }}
                    name="send"
                    required
                    id="send"
                    type="text"
                    placeholder="0.00"
                    className="text-white/50 border-0 outline-0 ring-0 bg-transparent caret-[#B39FF0] text-2xl/normal"
                  />
                </label>

                <div className="relative">
                  <div
                    className="flex items-center gap-2 relative uppercase cursor-pointer text-sm/5 text-white/80"
                    onClick={() => {
                      setShowSendingAssetOptions(true);
                    }}
                  >
                    {sendingAsset} <FaChevronDown width={11} fill="#FFFFFFB2" />
                  </div>
                  {showSendingAssetOptions && (
                    <>
                      <div
                        className="fixed inset-0 z-50"
                        onClick={() => {
                          setShowSendingAssetOptions(false);
                        }}
                      />

                      <div
                        className={`${dmSans.className} absolute z-50 top-6 left-1/2 -translate-x-1/2 py-1 bg-[#252326] rounded-[15px] w-[120px]`}
                      >
                        <p
                          className="py-2 px-3 text-base text-white/60 cursor-pointer rounded-[10px] hover:#FFFFFF0D"
                          onClick={() => {
                            setSendingAsset("ngn");
                            setShowSendingAssetOptions(false);
                          }}
                        >
                          NGN
                        </p>
                        <p
                          className="py-2 px-3 text-base text-white/60 cursor-pointer rounded-[10px] hover:#FFFFFF0D"
                          onClick={() => {
                            setSendingAsset("usdc");
                            setShowSendingAssetOptions(false);
                          }}
                        >
                          USDC
                        </p>
                        <p
                          className="py-2 px-3 text-base text-white/60 cursor-pointer rounded-[10px] hover:#FFFFFF0D"
                          onClick={() => {
                            setSendingAsset("strp");
                            setShowSendingAssetOptions(false);
                          }}
                        >
                          STRP
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-8 [&>p]:cursor-pointer">
                <p
                  className="rounded-[20px] p-2 border border-white/10 text-xs text-white/80"
                  onClick={() => {
                    setAmount("1000.00");
                  }}
                >
                  1000.00
                </p>
                <p
                  className="rounded-[20px] p-2 border border-white/10 text-xs text-white/80"
                  onClick={() => {
                    setAmount("2000.00");
                  }}
                >
                  2000.00
                </p>
                <p
                  className="rounded-[20px] p-2 border border-white/10 text-xs text-white/80"
                  onClick={() => {
                    setAmount("5000.00");
                  }}
                >
                  5000.00
                </p>
                <p
                  className="rounded-[20px] p-2 border border-white/10 text-xs text-white/80"
                  onClick={() => {
                    setAmount("10000.00");
                  }}
                >
                  10,000.00
                </p>
                <p
                  className="rounded-[20px] p-2 border border-white/10 text-xs text-white/80"
                  onClick={() => {
                    setAmount("20000.00");
                  }}
                >
                  20,000.00
                </p>
                <p
                  className="rounded-[20px] p-2 border border-white/10 text-xs text-white/80"
                  onClick={() => {
                    setAmount("50000.00");
                  }}
                >
                  50,000.00
                </p>
                <p
                  className="rounded-[20px] p-2 border border-white/10 text-xs text-white/80"
                  onClick={() => {
                    setAmount("100000.00");
                  }}
                >
                  100,000.00
                </p>
              </div>
            </div>
            <div className="w-full space-y-4">
              <p className="text-base/6 tracking-[1px]">
                Recipient will receive
              </p>

              <div className="py-5 px-4 border border-white/10 rounded-[15px] flex items-center justify-between gap-4">
                <label htmlFor="receive" className="flex items-center">
                  <p className="text-2xl/normal text-white/20">
                    {signs[receivingAsset]}
                  </p>
                  <input
                    value={amount}
                    // onChange={(e) => {
                    //   setAmount(e.target.value.replace(/[^0-9.]/g, ""));
                    // }}
                    readOnly
                    name="receive"
                    id="receive"
                    type="text"
                    placeholder="0.00"
                    className="text-white/50 border-0 outline-0 ring-0 bg-transparent caret-[#B39FF0] text-2xl/normal"
                  />
                </label>

                <div className="relative">
                  <div
                    className="flex items-center gap-2 relative uppercase cursor-pointer text-sm/5 text-white/80"
                    onClick={() => {
                      setShowReceivingAssetOptions(true);
                    }}
                  >
                    {receivingAsset}{" "}
                    <FaChevronDown width={11} fill="#FFFFFFB2" />
                  </div>
                  {showReceivingAssetOptions && (
                    <>
                      <div
                        className="fixed inset-0 z-50"
                        onClick={() => {
                          setShowReceivingAssetOptions(false);
                        }}
                      />

                      <div
                        className={`${dmSans.className} absolute z-50 top-6 left-1/2 -translate-x-1/2 py-1 bg-[#252326] rounded-[15px] w-[120px]`}
                      >
                        <p
                          className="py-2 px-3 text-base text-white/60 cursor-pointer rounded-[10px] hover:#FFFFFF0D"
                          onClick={() => {
                            setReceivingAsset("ngn");
                            setShowReceivingAssetOptions(false);
                          }}
                        >
                          NGN
                        </p>
                        <p
                          className="py-2 px-3 text-base text-white/60 cursor-pointer rounded-[10px] hover:#FFFFFF0D"
                          onClick={() => {
                            setReceivingAsset("usdc");
                            setShowReceivingAssetOptions(false);
                          }}
                        >
                          USDC
                        </p>
                        <p
                          className="py-2 px-3 text-base text-white/60 cursor-pointer rounded-[10px] hover:#FFFFFF0D"
                          onClick={() => {
                            setReceivingAsset("strp");
                            setShowReceivingAssetOptions(false);
                          }}
                        >
                          STRP
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            disabled={!amount}
            onClick={() => {
              setShowCompleteTransactionModal(true);
            }}
            className="h-[50px] max-w-[336px] w-full py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
