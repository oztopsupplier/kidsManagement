// Types
export type UUID = string;
export type Timestamp = string; 
export type DateString = string;
export type Int8 = string;

// Enums
export type MemberRole = 'parent' | 'child';
export type MemberStatus = 'active' | 'invited' | 'removed';
export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'archived';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected';
export type PointAccountType = 'kid' | 'parent' | 'family';
export type PointTransactionKind = 'earn' | 'spend' | 'adjust' | 'transfer';

// profiles
export interface ProfileRow {
  id: UUID;
  full_name: string | null;
  avatar_url: string | null;
  created_at: Timestamp;
}

// families
export interface FamilyRow {
  id: UUID;
  name: string;
  owner_profile_id: UUID;
  created_at: Timestamp;
}

// family_members
export interface FamilyMemberRow {
  id: Int8;
  family_id: UUID;
  profile_id: UUID;
  role: MemberRole;
  status: MemberStatus;
  joined_at: Timestamp;
}

// tasks
export interface TaskRow {
  id: UUID;
  family_id: UUID;
  title: string;
  description: string | null;
  assigned_member_id: Int8 | null;
  points: number;
  due_date: DateString | null;
  status: TaskStatus;
  created_by_profile_id: UUID;
  created_at: Timestamp;
}

// task_submissions
export interface TaskSubmissionRow {
  id: UUID;
  task_id: UUID;
  submitted_member_id: Int8;
  status: SubmissionStatus;
  evidence_url: string | null;
  submitted_at: Timestamp;
  reviewed_by_profile_id: UUID | null;
  reviewed_at: Timestamp | null;
  awarded_points: number;
}

// point_accounts
export interface PointAccountRow {
  id: UUID;
  owner_member_id: Int8;
  type: PointAccountType;
  balance: number;
  created_at: Timestamp;
}

// point_transactions
export interface PointTransactionRow {
  id: Int8;
  account_id: UUID;
  amount: number;
  kind: PointTransactionKind;
  description: string | null;
  related_submission_id: UUID | null;
  created_at: Timestamp;
  created_by_profile_id: UUID | null;
}

// Joined result types

export interface FamilyMemberWithRelations extends FamilyMemberRow {
  profiles: ProfileRow;
  families: FamilyRow;
}

export interface FamilyMemberWithProfile extends FamilyMemberRow {
  profiles: ProfileRow;
}

export interface TaskWithMeta extends TaskRow {
  family?: FamilyRow;
  assigned_member?: FamilyMemberRow | null;
  created_by_profile?: ProfileRow | null;
}

export interface TaskSubmissionWithRelations extends TaskSubmissionRow {
  task: TaskRow;
  submitted_member: FamilyMemberRow;
  reviewed_by_profile?: ProfileRow | null;
}

export interface PointTransactionWithRelations extends PointTransactionRow {
  account: PointAccountRow;
  submission?: TaskSubmissionRow | null;
}
