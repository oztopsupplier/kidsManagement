import type { TaskStatus, TaskType } from "../types/task";

export const taskStatusOptions: { label: string; value: TaskStatus | "ALL" }[] = [
    { label: "All", value: "ALL" },
    { label: "To Do", value: "TODO" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Completed", value: "COMPLETED" },
];

export const taskTypeLabels: Record<TaskType, string> = {
    STUDY: "Study",
    CHORES: "Chores",
    SPORTS: "Sports",
    OTHER: "Other",
};

export const taskStatusLabels: Record<TaskStatus, string> = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    SUBMITTED: "Submitted",
    COMPLETED: "Completed",
};


