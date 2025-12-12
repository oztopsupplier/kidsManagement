
export type TaskType = "STUDY" | "CHORES" | "SPORTS" | "OTHER";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED";

export interface TaskSubmission {
  id: string;
  taskId: string;
  childId: string;
  content: string;
  imageUrl?: string;
  submittedAt: string;
  status: "SUBMITTED" | "APPROVED" | "REJECTED";
  reviewComment?: string;
}

export interface Task {
  id: string;
  familyId: string;
  title: string;
  description: string;
  type: TaskType;
  assigneeId: string;
  assigneeName: string;
  rewardPoints: number;
  dueAt: string;
  status: TaskStatus;
  latestSubmission?: TaskSubmission;
}

export interface Child {
  id: string;
  name: string;
}

export interface ChildOverviewStats {
  id: string;
  name: string;
  totalPoints: number;
  completedTasks: number;
  totalTasks: number;
}

// Base types from backend schema (use when needed)
export type { Task as BaseTask, TaskStatus as BaseTaskStatus } from "../shared/typed/task";
export type { TaskSubmission as BaseTaskSubmission, TaskSubmissionStatus } from "../shared/typed/taskSubmission";
