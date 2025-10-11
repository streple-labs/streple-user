type UserType = "Internal" | "External";

type Gender = "MALE" | "FEMALE" | "OTHER";

type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

type UserRole = "FOLLOWER" | "LEADER" | "ADMIN";

type SubscriptionPlan = "basic" | "premium" | "enterprise";

type SubscriptionStatus = "active" | "inactive" | "canceled" | "expired";

type Currency = "NGN" | "USDC" | "STP";

type Balance = {
  balance: number;
  usdValue: number;
};

interface UserData {
  id: string;
  email: string;
  fullName: string;
  username: string;
  avatarUrl: string | null;
  isVerified: boolean;
  otpVerified: boolean;
  role: string;
  bio: string | null;
  expectationFromStreple: string | null;
  howFamiliarWithTrading: string | null;
  hasAnswer: boolean;
  stats: Record<string, unknown> | null;
  performanceHistory: Record<string, unknown> | null;
  followerCount: number;
  demoFundingBalance: string;
  hasAnswer: boolean;
  refercode: null | string;
  hasTransactionPin: boolean;
}

interface GamificationData {
  phase: number;
  level: number;
  totalScore: number;
  hasAnswer: boolean;
}

interface Wallets {
  totalUsd: number;
  wallets: Record<Currency, Balance>;
}
