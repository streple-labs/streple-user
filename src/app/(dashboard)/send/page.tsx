"use client";

import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import AssetBalances from "./asset-balances";
import SendTo from "./send-to";
import SendTransaction from "./send-transaction";

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
  }>();

  return (
    <div className="flex flex-col gap-4 w-full hide-scrollbar lg:overflow-y-auto">
      <Link
        href={"/"}
        className="flex items-center gap-2 text-white/60 text-base cursor-pointer"
      >
        <span>
          <FaChevronLeft fill="#FFFFFF99" width={5} height={10} />
        </span>
        Back
      </Link>
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
              sendTo={sendTo}
              setRecipient={setRecipient}
            />
          ) : (
            <SendTo setSendTo={setSendTo} setRecipient={setRecipient} />
          )}
        </div>
      </div>
    </div>
  );
}
