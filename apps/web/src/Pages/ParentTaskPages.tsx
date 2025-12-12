import React, { useMemo, useState } from "react";
import type { Task, TaskStatus, ChildOverviewStats } from "../types/task";

import { mockChildren } from "../mocks/children";
import { mockTasks } from "../mocks/tasks";

import TaskFilters from "../components/tasks/TaskFilters"; // Ensure the file exists at this path or update the path to the correct location.
import TaskList from "../components/tasks/TaskList";
import TaskDetail from "../components/tasks/TaskDetail";
import TaskCreateForm from "../components/tasks/TaskCreateForm";
import ChildrenOverview from "../components/children/ChildrenOverview";

import "../styles/parentTasks.css";

const ParentTasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [selectedStatus, setSelectedStatus] =
        useState<TaskStatus | "ALL">("ALL");
    const [selectedChildId, setSelectedChildId] = useState<string | "ALL">("ALL");
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const parentName = "Alex";          // replace with real data
    const inviteCode = "6050PB9K";     // replace with real data
    const onLogout = () => {
        alert("Logout clicked");
    };

    // Build children overview stats from tasks
    const childrenStats: ChildOverviewStats[] = useMemo(
        () =>
            mockChildren.map((child) => {
                const childTasks = tasks.filter((t) => t.assigneeId === child.id);
                const completed = childTasks.filter((t) => t.status === "COMPLETED");
                const totalPoints = completed.reduce(
                    (sum, t) => sum + t.rewardPoints,
                    0
                );

                return {
                    id: child.id,
                    name: child.name,
                    totalTasks: childTasks.length,
                    completedTasks: completed.length,
                    totalPoints,
                };
            }),
        [tasks]
    );

    const filteredTasks = useMemo(
        () =>
            tasks.filter((task) => {
                if (selectedStatus !== "ALL" && task.status !== selectedStatus) {
                    return false;
                }
                if (selectedChildId !== "ALL" && task.assigneeId !== selectedChildId) {
                    return false;
                }
                return true;
            }),
        [tasks, selectedStatus, selectedChildId]
    );

    const selectedTask = useMemo(
        () => tasks.find((t) => t.id === selectedTaskId) ?? null,
        [tasks, selectedTaskId]
    );

    const handleCreateTask = (values: {
        assigneeId: string;
        title: string;
        description: string;
        type: Task["type"];
        dueAt: string;
        rewardPoints: number;
    }) => {
        const child = mockChildren.find((c) => c.id === values.assigneeId);
        if (!child) {
            alert("Invalid child");
            return;
        }

        const newTask: Task = {
            id: `task-${Date.now()}`,
            familyId: "family-1",
            title: values.title,
            description: values.description,
            type: values.type,
            assigneeId: child.id,
            assigneeName: child.name,
            rewardPoints: values.rewardPoints,
            dueAt: values.dueAt,
            status: "TODO",
        };

        setTasks((prev) => [newTask, ...prev]);
        setSelectedTaskId(newTask.id);
    };

    const handleReviewTask = (taskId: string, action: "APPROVE" | "REJECT") => {
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id !== taskId) return task;

                if (!task.latestSubmission) {
                    alert("No submission to review");
                    return task;
                }

                return {
                    ...task,
                    status: action === "APPROVE" ? "COMPLETED" : "IN_PROGRESS",
                    latestSubmission: {
                        ...task.latestSubmission,
                        status: action === "APPROVE" ? "APPROVED" : "REJECTED",
                        reviewComment:
                            action === "APPROVE"
                                ? "Great job!"
                                : "Please revise your work.",
                    },
                };
            })
        );
    };

    return (
        <div className="parent-tasks-page">
            {/* ===== HEADER (small + inline) ===== */}
            <div className="parent-header">
                <div className="parent-header-left">
                    <div className="parent-name">{parentName}</div>
                    <div className="parent-role">Parent</div>
                </div>

                <div className="parent-header-invite">
                    <span className="invite-label">Invite:</span>
                    <span className="invite-code">{inviteCode}</span>
                    <button
                        className="invite-copy-btn"
                        onClick={() => navigator.clipboard.writeText(inviteCode)}
                    >
                        Copy
                    </button>
                </div>

                <button className="parent-header-logout" onClick={onLogout}>
                    Logout ⎋
                </button>
            </div>

            {/* ===== Children overview section ===== */}
            <section className="children-overview-section">
                <div className="children-overview-header">
                    <div>
                        <div className="children-overview-title">Children overview</div>
                    </div>
                </div>

                <ChildrenOverview items={childrenStats} />
            </section>

            {/* ===== Tasks section ===== */}
            <section className="tasks-section">
                <div className="tasks-section-header">
                    <div>
                        <h2 className="tasks-section-title">All tasks</h2>
                        <p className="tasks-section-subtitle">
                            Manage tasks, review submissions and award points.
                        </p>
                    </div>
                    <button
                        className="create-task-button"
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                    >
                        + Create task
                    </button>
                </div>

                <TaskFilters
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    selectedChildId={selectedChildId}
                    onChildChange={setSelectedChildId}
                    childrenOptions={mockChildren}
                />

                <div className="tasks-layout">
                    <div className="tasks-layout-list">
                        <TaskList
                            tasks={filteredTasks}
                            selectedTaskId={selectedTaskId}
                            onSelectTask={setSelectedTaskId}
                        />
                    </div>
                </div>
            </section>

            {/* ===== Task detail modal ===== */}
            {selectedTask && (
                <div
                    className="modal-backdrop"
                    onClick={() => setSelectedTaskId(null)}
                >
                    <div
                        className="modal"
                        onClick={(e) => {
                            // 阻止点击弹窗内容时关闭
                            e.stopPropagation();
                        }}
                    >
                        <div className="modal-header">
                            <h3 className="modal-title">Task details</h3>
                            <button
                                className="modal-close-button"
                                type="button"
                                onClick={() => setSelectedTaskId(null)}
                            >
                                ×
                            </button>
                        </div>
                        <TaskDetail
                            task={selectedTask}
                            onReview={handleReviewTask}
                        />
                    </div>
                </div>
            )}

            {/* ===== Create task modal ===== */}
            {isCreateOpen && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-header">
                            <h3 className="modal-title">创建新任务 📝</h3>
                            <button
                                className="modal-close-button"
                                type="button"
                                onClick={() => setIsCreateOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        <TaskCreateForm
                            childrenOptions={mockChildren}
                            onCreate={(values) => {
                                handleCreateTask(values);
                                setIsCreateOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParentTasksPage;
