import React from "react";
import type { Task } from "../../types/task";
import { taskStatusLabels, taskTypeLabels } from "../../constants/task";

interface TaskListProps {
    tasks: Task[];
    selectedTaskId: string | null;
    onSelectTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    selectedTaskId,
    onSelectTask,
}) => {
    if (tasks.length === 0) {
        return <div className="task-list-empty">No tasks available</div>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => {
                const isSelected = task.id === selectedTaskId;

                return (
                    <div
                        key={task.id}
                        onClick={() => onSelectTask(task.id)}
                        className={
                            "task-list-item" + (isSelected ? " task-list-item--selected" : "")
                        }
                    >
                        <div className="task-list-item-header">
                            <div className="task-list-item-title">{task.title}</div>
                            <span className="status-chip">
                                {taskStatusLabels[task.status]}
                            </span>
                        </div>

                        <div className="task-list-item-meta">
                            Child: {task.assigneeName} | Type: {taskTypeLabels[task.type]} |
                            Reward: {task.rewardPoints} pts
                        </div>

                        <div className="task-list-item-due">Due: {task.dueAt}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskList;
