import type { Task } from "../types/task";

export const mockTasks: Task[] = [
    {
        id: "task-1",
        familyId: "family-1",
        title: "Complete math homework pages 3-5",
        description: "Finish exercises on pages 3–5 carefully and check once.",
        type: "STUDY",
        assigneeId: "child-1",
        assigneeName: "Alice",
        rewardPoints: 10,
        dueAt: "2025-12-01",
        status: "SUBMITTED",
        latestSubmission: {
            id: "sub-1",
            taskId: "task-1",
            childId: "child-1",
            content: "I have completed the homework and took a photo.",
            imageUrl: "https://example.com/homework-photo.jpg",
            submittedAt: "2025-11-29T10:00:00Z",
            status: "SUBMITTED",
        },
    },
    {
        id: "task-2",
        familyId: "family-1",
        title: "Clean your room",
        description: "Put away toys, organize your desk, and return clothes to wardrobe.",
        type: "CHORES",
        assigneeId: "child-2",
        assigneeName: "Bob",
        rewardPoints: 5,
        dueAt: "2025-12-02",
        status: "TODO",
    },
];
