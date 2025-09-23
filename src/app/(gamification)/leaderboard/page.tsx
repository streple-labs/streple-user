import { getStpLeaderboard, getTopReferrers } from "@/utils/api/queries";
import LeaderboardTable from "./leaderboard-table";

export const revalidate = 0;

export default async function page() {
  const { document: topReferrers, error: topReferrersError } =
    await getTopReferrers();

  const { document: stpLeaderboards, error: stpLeaderboardError } =
    await getStpLeaderboard();

  return (
    <LeaderboardTable
      referrersLeaderboardData={{ topReferrers, topReferrersError }}
      stpLeaderboardData={{ stpLeaderboards, stpLeaderboardError }}
    />
  );
}
