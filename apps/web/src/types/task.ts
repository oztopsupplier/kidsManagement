export type TaskStatus = "TODO" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED";

export type TaskType = "STUDY" | "CHORES" | "SPORTS" | "OTHER";

export interface Child {
    id: string;
    name: string;
}

export type SubmissionStatus = "SUBMITTED" | "APPROVED" | "REJECTED";

export interface TaskSubmission {
    id: string;
    taskId: string;
    childId: string;
    content: string;
    imageUrl?: string;
    submittedAt: string;
    status: SubmissionStatus;
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
    dueAt: string; // ISO-like string, e.g. "2025-12-01"
    status: TaskStatus;
    latestSubmission?: TaskSubmission;
}

export interface ChildOverviewStats {
    id: string;
    name: string;
    totalPoints: number;
    completedTasks: number;
    totalTasks: number;
}