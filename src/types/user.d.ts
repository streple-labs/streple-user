interface User {
  id: string;
  email: string;
  fullName: string;
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
  phase?: "Phase 1" | "Phase 2";
  level?: "Level 1" | "Level 2" | "Level 3";
  score?: number;
  firstQuestion: string;
  secondQuestion: string;
  thirdQuestion: string;
  hasAnswer: boolean;
}
