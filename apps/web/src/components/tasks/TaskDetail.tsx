import React from "react";
import type { Task } from "../../types/task";
import { taskStatusLabels, taskTypeLabels } from "../../constants/task";

interface TaskDetailProps {
    task: Task | null;
    onReview: (taskId: string, action: "APPROVE" | "REJECT") => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onReview }) => {
    if (!task) {
        return (
            <div className="task-detail-empty">
                Select a task to view details
            </div>
        );
    }

    const canReview =
        !!task.latestSubmission && task.status !== "COMPLETED";

    return (
        <div className="task-detail">
            <h3>{task.title}</h3>

            <p>
                <strong>Child:</strong> {task.assigneeName}
            </p>
            <p>
                <strong>Type:</strong> {taskTypeLabels[task.type]}
            </p>
            <p>
                <strong>Reward Points:</strong> {task.rewardPoints}
            </p>
            <p>
                <strong>Due Date:</strong> {task.dueAt}
            </p>
            <p>
                <strong>Status:</strong> {taskStatusLabels[task.status]}
            </p>

            <div className="task-detail-description">
                <strong>Description:</strong>
                <p>{task.description}</p>
            </div>

            <div className="task-detail-submission">
                <strong>Latest Submission</strong>
                {task.latestSubmission ? (
                    <>
                        <p>
                            <strong>Text:</strong> {task.latestSubmission.content}
                        </p>
                        {task.latestSubmission.imageUrl && (
                            <p>
                                <strong>Image:</strong>{" "}
                                <a
                                    href={task.latestSubmission.imageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open image
                                </a>
                            </p>
                        )}
                        <p className="task-detail-submission-meta">
                            Submitted at: {task.latestSubmission.submittedAt}
                        </p>
                        {task.latestSubmission.reviewComment && (
                            <p className="task-detail-submission-review">
                                <strong>Review Comment:</strong>{" "}
                                {task.latestSubmission.reviewComment}
                            </p>
                        )}
                    </>
                ) : (
                    <p className="task-detail-submission-empty">
                        No submission yet
                    </p>
                )}
            </div>

            <div className="review-buttons">
                <button
                    disabled={!canReview}
                    onClick={() => onReview(task.id, "APPROVE")}
                >
                    Approve (Award Points)
                </button>
                <button
                    disabled={!canReview}
                    onClick={() => onReview(task.id, "REJECT")}
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default TaskDetail;
