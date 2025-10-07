import { anton } from "@/app/fonts";
import { Dispatch, SetStateAction, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SendTransaction({
  sendTo,
  recipient,
  setRecipient,
}: {
  sendTo: null | "streple-user" | "bank" | "wallet" | "scan-code";
  recipient: { name: string; username: string } | undefined;
  setRecipient: Dispatch<
    SetStateAction<
      | {
          name: string;
          username: string;
        }
      | undefined
    >
  >;
}) {
  const [recipientType, setRecipientType] = useState<"recent" | "saved">(
    "recent"
  );

  return (
    <div className="p-8 rounded-[20px] bg-[#211F22] flex flex-col gap-8">
      <div className="flex flex-col items-center gap-10">
        <div className="space-y-8 w-full">
          <h2
            className={`${anton.className} test-base md:text-xl leading-[150%] tracking-[2px]`}
          >
            Select recipient
          </h2>
          <label htmlFor="recipient" className="space-y-3 w-full">
            <p className="text-base/6">Recipient tag</p>
            <div className="border border-white/10 py-5 px-4 h-[62px] w-full rounded-[15px] flex items-center">
              <p className="text-base text-white/50">@</p>
              <input
                name="recipient"
                id="recipient"
                type="text"
                placeholder="Obasi Anthony"
                className="text-white/50 border-0 outline-0 ring-0 bg-transparent caret-[#B39FF0] placeholder:text-xs"
              />
            </div>
          </label>
        </div>
        <button className="h-[50px] max-w-[336px] w-full py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]">
          Next
        </button>
      </div>

      <div className="w-full space-y-6">
        <div className="flex items-baseline gap-8">
          <div className="flex items-center flex-col gap-1 justify-center">
            <h6
              onClick={() => {
                setRecipientType("recent");
              }}
              className={`${
                recipientType === "recent" && "text-[#9274F2]"
              } font-semibold text-base/8 tracking-[1px]`}
            >
              Recent recipients
            </h6>

            {recipientType === "recent" && (
              <span className="w-11 h-px rounded-full bg-[#9274F2]" />
            )}
          </div>
          <div className="flex items-center flex-col gap-1 justify-center">
            <h6
              onClick={() => {
                setRecipientType("saved");
              }}
              className={`${
                recipientType === "saved" && "text-[#9274F2]"
              } font-semibold text-base/8 tracking-[1px]`}
            >
              Saved recipients
            </h6>

            {recipientType === "saved" && (
              <span className="w-11 h-px rounded-full bg-[#9274F2]" />
            )}
          </div>
        </div>
        <div className="w-full relative">
          <input
            name="search"
            title="search for recipients"
            type="text"
            placeholder="search for recipients"
            className={`h-[50px] w-full text-base font-normal py-5 px-4 rounded-3xl border border-white/10 gap-4 leading-6 tracking-[1px] placeholder:text-xs placeholder:text-white/50 placeholder:font-bold outline-0 ring-0 caret-[#B39FF0] bg-transparent`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            <IoSearch size={20} color="#FFFFFFB2" />
          </span>
        </div>
        <div className="space-y-6 w-full">
          {[
            { name: "Obasi Anthony", username: "ObasiAnthony" },
            { name: "Simon Fubara", username: "SimonFubara" },
            { name: "Joshua Adebayo", username: "JoshuaAdebayo" },
            { name: "Grace Olaniyan", username: "GraceOlaniyan" },
          ].map((user, i) => (
            <div
              key={i}
              onClick={() => {
                setRecipient(user);
              }}
              className="px-6 flex items-center gap-3"
            >
              <div className="size-10 rounded-full flex items-center justify-center bg-[#D9D9D9] text-[#000000CC] text-lg font-semibold">{`${user.name
                .split(" ")[0]
                .charAt(0)}${user.name.split(" ")[1].charAt(0)}`}</div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-white/60">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
