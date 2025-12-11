import type { UUID, Timestamp } from "./common";

// KM-81: task_submissions
export type TaskSubmissionStatus = "pending" | "approved" | "rejected";

export interface TaskSubmission {
  id: UUID;
  task_id: UUID;
  submitted_member_id: number;
  status: TaskSubmissionStatus;
  evidence_url: string | null;
  submitted_at: Timestamp;
  reviewed_by_profile_id: UUID | null;
  reviewed_at: Timestamp | null;
  awarded_points: number;
}
