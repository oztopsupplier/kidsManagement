import React from "react";
import type { Task, TaskStatus } from "../types/task";

const TypeIconMap: Record<string, string> = {
  Study: "📘",
  Chore: "🧹",
  Other: "🎯",
};

type TaskCardProps = {
  task: Task;
  onClick: (task: Task)=> void;
};

type StatusUIConfig = {
  statusLabel: string;
  cardClasses: string;
  iconBgClasses: string;
  pillClasses: string;
  footerClasses: string;
  footerText: (task: Task) => string;
};

const StatusConfig: Record<TaskStatus, StatusUIConfig> = {
in_progress: {
    statusLabel: "✨In Progress",
    cardClasses: "border-blue-200 bg-blue-50",
    iconBgClasses: "bg-blue-100",
    pillClasses: "bg-blue-200 text-blue-700",
    footerClasses: "bg-blue-100",
    footerText: (task) =>
      `💪 Let's do this! Complete the task and get ${task.reward_points} points!`,
  },
  submitted: {
    statusLabel: "⏳Parent Review",
    cardClasses: "border-amber-300 bg-amber-50",
    iconBgClasses: "bg-amber-100",
    pillClasses: "bg-amber-300 text-amber-800",
    footerClasses: "bg-amber-50",
    footerText: () => "All done! Your task is on its way for your parent to review.",
  },
  completed: {
    statusLabel: "✅Completed",
    cardClasses: "border-emerald-300 bg-emerald-50",
    iconBgClasses: "bg-emerald-200",
    pillClasses: "bg-emerald-200 text-emerald-800",
    footerClasses: "bg-emerald-200",
    footerText: (task) =>
      `🎉🎉 Great job! You got ${task.reward_points} points! 🎉🎉`,
  },
  rejected: {
    statusLabel: "❌Try Again",
    cardClasses: "border-red-300 bg-red-50",
    iconBgClasses: "bg-red-100",
    pillClasses: "bg-red-200 text-red-800",
    footerClasses: "bg-red-100",
    footerText: () =>
      "😔 Oops! Let's try again. Upload a new photo for your task.",
  },
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const config = StatusConfig[task.status];
  const typeIcon = TypeIconMap[task.type] ?? TypeIconMap.default;
  
  return (
    <div
      onClick={() => onClick(task)}
      
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(1.15)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      className={`w-4/5 mb-4 mx-auto cursor-pointer rounded-2xl border-2 p-4 shadow-sm 
        transition-transform duration-100 hover:shadow-md active:scale-95
        ${config.cardClasses}
`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div
          className={`
            flex h-9 w-9 items-center justify-center rounded-full text-xl
            ${config.iconBgClasses}
          `}
        >
          {typeIcon}
        </div>

        <div>
          <div className="mb-1 text-base font-semibold text-slate-900">
            {task.title}
          </div>
        </div>
        
        <div
          className={`
            rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap
            ${config.pillClasses}
          `}
        >
          {config.statusLabel}
        </div>
      </div>

      {/* Card Body */}
      <div className="mt-2 flex justify-between text-xs text-slate-600">
        <div>📅 {task.due_at}</div>
        <div>⭐ {task.reward_points} Points</div>
      </div>

      {/* Card Note */}
      <div
        className={`
          mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm
          ${config.footerClasses}
        `}
      >
        <span>{config.footerText(task)}</span>
      </div>
    </div>
  );
};


export default TaskCard;
