type ProtradersResponse = {
  data: Protrader[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type Protrader = {
  id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  role: "ADMIN" | "PRO_TRADER" | "SUPER_ADMIN";
  bio: string | null;
  avatarUrl: string | null;
  hasAnswer: false;
  gender: "male" | "female" | null;
  roleLevel: number;
  refercode: number | null;
  createdAt: Date;
  updatedAt: Date;
  totalFollowers: number;
  roi: number | null;
  riskScore: number;
};

type ProtraderProfileStat = {
  winningPosition: number;
  totalPosition: number;
  winRate: number;
  profitToLossRatio: number;
};

type ProtraderProfilePerformance = {
  maxDrawdown: number;
  avgLeverage: number;
  maxLeverage: number;
  avgLotSize: number;
  avgRiskPercent: number;
};

type ProtraderDrawdownCurve = { date: string; drawdown: number }[];

type ProtraderPerformanceCurve = { date: string; cumulative: number }[];

type FollowTraderPayload = {
  trader_id: string;
  amount: number;
  stopLossRatio: number | undefined;
  takeProfitRatio: number | undefined;
  maxCopy: number | undefined;
  slippageLimit: number | undefined;
  marginMode: "trader" | "cross" | "isolated" | undefined;
  leverage: "trader" | "cross" | "isolated" | undefined;
};
