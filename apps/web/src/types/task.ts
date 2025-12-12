
export interface User {
    id: number;
    email: string;
    passwordHash: string;
    name: string;
    role: string;
    familyId: number;
    createdAt: string; // datetime
    updatedAt: string; // datetime
}


export interface Family {
    id: number;
    name: string;
    inviteCode: string;
    ownerUserId: number;
    createdAt: string; // datetime
    updatedAt: string; // datetime
}


export type TaskStatus = "TODO" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED";

export type TaskType = "STUDY" | "CHORES" | "SPORTS" | "OTHER";

export interface Task {
    id: number;
    familyId: number;
    assigneeUserId: number;
    createdByUserId: number;
    title: string;
    description: string;
    type: TaskType;
    rewardPoints: number;
    status: TaskStatus;
    dueAt: string; // datetime
    createdAt: string; // datetime
    updatedAt: string; // datetime
}


export type SubmissionStatus = "SUBMITTED" | "APPROVED" | "REJECTED";

export interface TaskSubmission {
    id: number;
    taskId: number;
    childUserId: number;
    contentText: string;
    attachmentUrl: string | null;
    status: SubmissionStatus;
    reviewedByUserId: number | null;
    reviewedAt: string | null; // datetime
    awardedPoints: number;
    createdAt: string; // datetime
}


export interface PointAccount {
    id: number;
    userId: number;
    balance: number;
    createdAt: string; // datetime
    updatedAt: string; // datetime
}


export interface PointTransaction {
    id: number;
    accountId: number;
    delta: number;
    reason: string;
    taskSubmissionId: number | null;
    createdAt: string; // datetime
}



export interface Child {
    id: number;
    name: string;
}

export interface TaskWithDetails extends Task {
    assigneeName?: string; 
    latestSubmission?: TaskSubmission; 
}

export interface ChildOverviewStats {
    id: number;
    name: string;
    totalPoints: number;
    completedTasks: number;
    totalTasks: number;
}