export type TaskFilter = "all" | "in_progress" | "completed";
export type TaskStatus = "in_progress" | "submitted" | "completed" | "rejected";

export interface Task {
  id: number;
  type: string;
  title: string;
  description: string;
  due_at: string;  // Change to datetime later
  status: TaskStatus;
  reward_points: number;
}