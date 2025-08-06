interface UserData {
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
  phase: string;
  level: string;
  hasAnswer: boolean;
}

interface GamificationData {
  phase: "Phase 1" | "Phase 2" | "Phase 3" | null;
  level: "Level 1" | "Level 2" | "Level 3" | null;
  score: string | null;
}
