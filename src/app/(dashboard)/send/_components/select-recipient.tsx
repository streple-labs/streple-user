import { anton } from "@/app/fonts";
import Loader from "@/component/ui/loader";
import {
  getBeneficiaries,
  getRecentTransactions,
  searchUsers,
} from "@/utils/api/queries";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SelectRecipient({
  recipient,
  setRecipient,
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
}) {
  const [recipientType, setRecipientType] = useState<"recent" | "saved">(
    "recent"
  );

  const [search, setSearch] = useState("");
  const [searchTransactions, setSearchTransactions] = useState("");

  const {
    data: users = {},
    isError: isSearchUsersError,
    error: searchUsersError,
    isPending: isSearchUsersPending,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => await searchUsers(search),
    enabled: !!search,
  });

  const { data: recentTransactions, isPending: isRecentTransactionPending } =
    useQuery({
      queryKey: ["recent-transactions"],
      queryFn: async () => await getRecentTransactions(),
      enabled: recipientType === "recent",
    });

  const { data: savedBeneficiaries, isPending: isSavedBeneficiariesPending } =
    useQuery({
      queryKey: ["saved-beneficiaries"],
      queryFn: async () => await getBeneficiaries(),
      enabled: recipientType === "saved",
    });

  return (
    <div className="p-8 rounded-[20px] bg-[#211F22] flex flex-col gap-8">
      <div className="flex flex-col items-center gap-10">
        <div className="space-y-8 w-full">
          <h2
            className={`${anton.className} test-base md:text-xl leading-[150%] tracking-[2px]`}
          >
            Select recipient
          </h2>
          <label htmlFor="recipient" className="space-y-3 w-full relative">
            <p className="text-base/6">Recipient tag</p>
            <div className="border border-white/10 py-5 px-4 h-[62px] w-full rounded-[15px] flex items-center">
              <p className="text-base text-white/50">@</p>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="recipient"
                id="recipient"
                type="text"
                placeholder="Obasi Anthony"
                className="text-white/50 border-0 outline-0 ring-0 bg-transparent caret-[#B39FF0] placeholder:text-xs"
              />
            </div>
            {search && (
              <div className="absolute z-10 left-0 top-24 max-h-[400px] w-full overflow-y-auto bg-[#211F22] border border-white/20 rounded-[20px] p-3 flex flex-col gap-4">
                {isSearchUsersPending && (
                  <div className="p-8 flex items-center justify-center">
                    <Loader />
                  </div>
                )}

                {isSearchUsersError && (
                  <p className="text-base text-center text-red-400 font-semibold mx-auto p-4">
                    {searchUsersError.message}
                  </p>
                )}

                {users?.data?.length === 0 && (
                  <p className="text-base text-center font-semibold mx-auto p-4">
                    No users found
                  </p>
                )}

                {users?.data?.map((user: UserData, i: number) => (
                  <div
                    key={i}
                    onClick={() => {
                      setRecipient({
                        username: user.username,
                        name: user.fullName,
                        id: user.id,
                      });
                    }}
                    className="px-6 flex items-center gap-3 cursor-pointer"
                  >
                    <div className="size-10 rounded-full flex items-center justify-center bg-[#D9D9D9] text-[#000000CC] text-lg font-semibold">
                      {(() => {
                        const names = user.fullName.trim().split(" ");
                        const firstInitial = names[0]?.charAt(0) || "";
                        const secondInitial = names[1]?.charAt(0) || "";
                        return `${firstInitial}${secondInitial}`;
                      })()}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">{user.fullName}</p>
                      <p className="text-xs text-white/60">@{user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </label>
        </div>
        <button
          disabled={!recipient}
          className="h-[50px] max-w-[336px] w-full py-3 px-4 rounded-[20px] bg-[#B39FF0] bg-blend-luminosity text-base/[150%] font-bold tracking-[2px] text-[#2C2C26]"
        >
          Next
        </button>
      </div>

      <div className="w-full space-y-6">
        <div className="flex items-baseline gap-8">
          <div className="flex items-center flex-col gap-1 justify-center cursor-pointer">
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
          <div className="flex items-center flex-col gap-1 justify-center cursor-pointer">
            <h6
              onClick={() => {
                setRecipientType("saved");
              }}
              className={`${
                recipientType === "saved" && "text-[#9274F2]"
              } font-semibold text-base/8 tracking-[1px]`}
            >
              Saved beneficiaries
            </h6>

            {recipientType === "saved" && (
              <span className="w-11 h-px rounded-full bg-[#9274F2]" />
            )}
          </div>
        </div>
        <div className="w-full relative">
          <input
            value={searchTransactions}
            onChange={(e) => setSearchTransactions(e.target.value)}
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
          {recipientType === "recent" && recentTransactions?.error && (
            <p className="text-base text-center text-red-400 font-semibold mx-auto p-4">
              {recentTransactions.error}
            </p>
          )}

          {recipientType === "saved" && savedBeneficiaries?.error && (
            <p className="text-base text-center text-red-400 font-semibold mx-auto p-4">
              {savedBeneficiaries.error}
            </p>
          )}

          {!searchTransactions &&
            recipientType === "recent" &&
            isRecentTransactionPending && (
              <div className="p-8 flex items-center justify-center">
                <Loader />
              </div>
            )}

          {!searchTransactions &&
            recipientType === "saved" &&
            isSavedBeneficiariesPending && (
              <div className="p-8 flex items-center justify-center">
                <Loader />
              </div>
            )}

          {!searchTransactions &&
            recipientType === "recent" &&
            recentTransactions?.document?.length === 0 && (
              <p className="text-base text-center font-semibold mx-auto p-4">
                No recent transactions found
              </p>
            )}

          {!searchTransactions &&
            recipientType === "saved" &&
            savedBeneficiaries?.document?.data.length === 0 && (
              <p className="text-base text-center font-semibold mx-auto p-4">
                No saved beneficiaries found
              </p>
            )}

          {recipientType === "recent" &&
            (searchTransactions
              ? recentTransactions?.document?.filter(({ recipient }) =>
                  recipient?.fullName
                    ?.toLowerCase()
                    .includes(searchTransactions.toLowerCase())
                )
              : recentTransactions?.document
            )?.map(({ recipient }, i) => (
              <div
                key={i}
                onClick={() => {
                  setRecipient({
                    username: recipient.username,
                    name: recipient.fullName,
                    id: recipient.id,
                  });
                }}
                className="px-6 flex items-center gap-3 cursor-pointer"
              >
                <div className="size-10 rounded-full flex items-center justify-center bg-[#D9D9D9] text-[#000000CC] text-lg font-semibold">
                  {(() => {
                    const names = recipient.fullName.trim().split(" ");
                    const firstInitial = names[0]?.charAt(0) || "";
                    const secondInitial = names[1]?.charAt(0) || "";
                    return `${firstInitial}${secondInitial}`;
                  })()}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">{recipient.fullName}</p>
                  <p className="text-xs text-white/60">@{recipient.username}</p>
                </div>
              </div>
            ))}

          {recipientType === "saved" &&
            (searchTransactions
              ? savedBeneficiaries?.document?.data.filter((user) =>
                  user?.recipient?.fullName
                    ?.toLowerCase()
                    .includes(searchTransactions.toLowerCase())
                )
              : savedBeneficiaries?.document?.data
            )?.map(({ recipient }, i) => (
              <div
                key={i}
                onClick={() => {
                  setRecipient({
                    username: recipient.username,
                    name: recipient.fullName,
                    id: recipient.id,
                  });
                }}
                className="px-6 flex items-center gap-3 cursor-pointer"
              >
                <div className="size-10 rounded-full flex items-center justify-center bg-[#D9D9D9] text-[#000000CC] text-lg font-semibold">
                  {(() => {
                    const names = recipient.fullName.trim().split(" ");
                    const firstInitial = names[0]?.charAt(0) || "";
                    const secondInitial = names[1]?.charAt(0) || "";
                    return `${firstInitial}${secondInitial}`;
                  })()}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">{recipient.fullName}</p>
                  <p className="text-xs text-white/60">@{recipient.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
