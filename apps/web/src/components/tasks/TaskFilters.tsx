import React from "react";
import type { Child, TaskStatus } from "../../types/task";
import { taskStatusOptions } from "../../constants/task";

interface TaskFiltersProps {
    selectedStatus: TaskStatus | "ALL";
    onStatusChange: (status: TaskStatus | "ALL") => void;
    selectedChildId: string | "ALL";
    onChildChange: (childId: string | "ALL") => void;
    childrenOptions: Child[];
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
    selectedStatus,
    onStatusChange,
    selectedChildId,
    onChildChange,
    childrenOptions,
}) => {
    return (
        <div className="task-filters">
            <div>
                <label>
                    Status:
                    <select
                        value={selectedStatus}
                        onChange={(e) =>
                            onStatusChange(e.target.value as TaskStatus | "ALL")
                        }
                    >
                        {taskStatusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Child:
                    <select
                        value={selectedChildId}
                        onChange={(e) =>
                            onChildChange(
                                e.target.value === "ALL" ? "ALL" : e.target.value
                            )
                        }
                    >
                        <option value="ALL">All</option>
                        {childrenOptions.map((child) => (
                            <option key={child.id} value={child.id}>
                                {child.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default TaskFilters;
