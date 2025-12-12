import type { UUID, Timestamp } from "./common";

// KM-80: families
export interface Family {
  id: UUID;
  name: string;
  owner_profile_id: UUID;
  created_at: Timestamp;
}

// KM-80: family_members
export type FamilyMemberRole = "parent" | "child";

export type FamilyMemberStatus = "active" | "invited" | "removed";

export interface FamilyMember {
  id: number;
  family_id: UUID;
  profile_id: UUID;
  role: FamilyMemberRole;
  status: FamilyMemberStatus;
  joined_at: Timestamp;
}
