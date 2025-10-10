type WalletStatus = "Active" | "Inactive" | "Frozen";

type TransactionType = "deposit" | "withdrawal" | "transfer";

type TransactionStatus = "Successful" | "Failed" | "Pending";

interface Subscription {
  id: string;
  user: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  price: number;
  scheduleId: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  canceledAt: string;
  createdAt: string;
  updatedAt: string;
}

interface Privilege {
  id: string;
  role: string;
  roleLevel: number;
  privileges: string[];
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  type: UserType;
  roleLevel: number;
  privileges: Privilege[];
  users: string[];
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  transactionPin: string;
  isVerified: boolean;
  otp: string;
  otpExpiresAt: string;
  otpVerified: boolean;
  isTfaEnabled: boolean;
  tfaSecret: string;
  role: UserRole;
  bio: string;
  avatarUrl: string;
  expectationFromStreple: string;
  howFamiliarWithTrading: string;
  hasAnswer: boolean;
  auth_type: AuthType;
  type: UserType;
  gender: Gender;
  status: UserStatus;
  roleLevel: number;
  refercode: string;
  subscriptions: Subscription[];
  createdAt: string;
  updatedAt: string;
  roles: Role;
  wallets: Wallet[];
}

interface Wallet {
  id: string;
  balance: number;
  currency: Currency;
  user: Partial<User>;
  transactions: Partial<Transaction>[];
  status: WalletStatus;
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  id: string;
  wallet: Partial<Wallet>;
  type: TransactionType;
  amount: number;
  idempotency: string;
  previousBal: number;
  currentBal: number;
  recipient: User;
  userId: string;
  user: User;
  reference: string;
  description: string;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
}

interface TransactionPayload {
  amount: number;
  username: string | null;
  senderCurrency: Currency;
  recipientCurrency: Currency;
  idempotency: string;
  transactionPin: string;
  beneficiary: boolean;
}
