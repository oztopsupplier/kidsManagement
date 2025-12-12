import React, { useState } from "react";
import type { Child, TaskType } from "../../types/task";

interface TaskCreateFormValues {
    assigneeId: string;
    title: string;
    description: string;
    type: TaskType;
    dueAt: string;
    rewardPoints: number;
}

interface TaskCreateFormProps {
    childrenOptions: Child[];
    onCreate: (values: TaskCreateFormValues) => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({
    childrenOptions,
    onCreate,
}) => {
    const [assigneeId, setAssigneeId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<string>("学习");
    const [dueAt, setDueAt] = useState("");
    const [rewardPoints, setRewardPoints] = useState(10);

    const taskTypeOptions: { label: string; type: TaskType }[] = [
        { label: "学习", type: "STUDY" },
        { label: "家务", type: "CHORES" },
        { label: "运动", type: "SPORTS" },
        { label: "阅读", type: "STUDY" },
        { label: "创作", type: "OTHER" },
        { label: "其他", type: "OTHER" },
    ];

    // 根据选中的标签获取对应的 TaskType
    const getTaskTypeFromLabel = (label: string): TaskType => {
        const option = taskTypeOptions.find((opt) => opt.label === label);
        return option ? option.type : "STUDY";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!assigneeId || !title || !dueAt) {
            alert("请填写所有必填项");
            return;
        }

        onCreate({
            assigneeId,
            title,
            description,
            type: getTaskTypeFromLabel(selectedCategoryLabel),
            dueAt,
            rewardPoints,
        });

        setAssigneeId("");
        setTitle("");
        setDescription("");
        setSelectedCategoryLabel("学习");
        setDueAt("");
        setRewardPoints(10);
    };

    return (
        <form className="task-create-form" onSubmit={handleSubmit}>
            {/* 分配给谁 */}
            <div className="task-create-section">
                <div className="task-create-label">分配给</div>
                <div className="task-create-assignees">
                    {childrenOptions.map((child) => {
                        const isActive = assigneeId === child.id;
                        return (
                            <button
                                key={child.id}
                                type="button"
                                className={`task-create-assignee-card${
                                    isActive ? " task-create-assignee-card--active" : ""
                                }`}
                                onClick={() => setAssigneeId(child.id)}
                            >
                                <div className="task-create-assignee-avatar">🙂</div>
                                <div className="task-create-assignee-name">
                                    {child.name}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 标题与描述 */}
            <div className="task-create-section">
                <label className="task-create-field">
                    <span className="task-create-label">任务标题</span>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="例如：完成数学作业"
                    />
                </label>

                <label className="task-create-field">
                    <span className="task-create-label">任务描述</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="详细描述任务要求..."
                    />
                </label>
            </div>

            {/* 任务分类 */}
            <div className="task-create-section">
                <div className="task-create-label">任务分类</div>
                <div className="task-create-type-group">
                    {taskTypeOptions.map((option) => {
                        const isActive = selectedCategoryLabel === option.label;
                        return (
                            <button
                                key={option.label}
                                type="button"
                                className={`task-create-type-pill${
                                    isActive ? " task-create-type-pill--active" : ""
                                }`}
                                onClick={() => setSelectedCategoryLabel(option.label)}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 奖励积分 & 截止日期 */}
            <div className="task-create-section task-create-section--row">
                <label className="task-create-field">
                    <span className="task-create-label">⭐ 奖励积分</span>
                    <input
                        type="number"
                        value={rewardPoints}
                        onChange={(e) =>
                            setRewardPoints(Number(e.target.value) || 0)
                        }
                    />
                </label>

                <label className="task-create-field">
                    <span className="task-create-label">⏰ 截止日期</span>
                    <input
                        type="date"
                        value={dueAt}
                        onChange={(e) => setDueAt(e.target.value)}
                    />
                </label>
            </div>

            {/* 底部按钮 */}
            <div className="task-create-actions">
                <button
                    type="button"
                    className="task-create-button task-create-button--secondary"
                    onClick={() => {
                        // 重置表单即可让用户重新填写，也方便与顶部关闭按钮配合使用
                        setAssigneeId("");
                        setTitle("");
                        setDescription("");
                        setSelectedCategoryLabel("学习");
                        setDueAt("");
                        setRewardPoints(10);
                    }}
                >
                    取消
                </button>
                <button
                    type="submit"
                    className="task-create-button task-create-button--primary"
                >
                    创建任务✨
                </button>
            </div>
        </form>
    );
};

export default TaskCreateForm;
