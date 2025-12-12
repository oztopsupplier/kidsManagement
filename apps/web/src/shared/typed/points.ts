import type { UUID, Timestamp } from "./common";

// KM-82: point_accounts
export type PointAccountType = "kid" | "parent" | "family";

export interface PointAccount {
  id: UUID;
  owner_member_id: number;
  type: PointAccountType;
  balance: number;
  created_at: Timestamp;
}

// KM-82: point_transactions
export type PointTransactionKind =
  | "earn"
  | "spend"
  | "adjust"
  | "transfer";

export interface PointTransaction {
  id: number;
  account_id: UUID;
  amount: number;
  kind: PointTransactionKind;
  description: string | null;
  related_submission_id: UUID | null;
  created_at: Timestamp;
  created_by_profile_id: UUID | null;
}
