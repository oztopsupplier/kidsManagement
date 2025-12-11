import type { UUID, Timestamp, DateString } from "./common";

// KM-81: tasks
export type TaskStatus = "open" | "in_progress" | "completed" | "archived";

export interface Task {
  id: UUID;
  family_id: UUID;
  title: string;
  description: string | null;
  assigned_member_id: number | null;
  due_date: DateString | null;
  status: TaskStatus;
  created_by_profile_id: UUID;
  created_at: Timestamp;
}
