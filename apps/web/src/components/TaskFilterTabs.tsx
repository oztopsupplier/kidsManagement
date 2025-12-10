import React from "react";
import type { TaskFilter } from "../types/task";

type TaskFilterTabsProps = {
    value: TaskFilter;
    onChange: (value: TaskFilter) => void;
};

const TaskFilterTabs: React.FC<TaskFilterTabsProps> = ({ value, onChange }) => {
  const baseButtonClass = "w-36 h-15 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-medium mr-3 transition-all text-white font-medium flex items-center justify-center";
  const activeButtonClass = "ring-2 ring-blue-600 shadow-lg";

  return (
    <div className="my-4 flex gap-3 justify-center">
      <button
        className={`${baseButtonClass} ${value === "all" ? activeButtonClass : ""}`}
        onClick={() => onChange("all")}
      >
        All
      </button>

      <button
        className={`${baseButtonClass} ${value === "in_progress" ? activeButtonClass : ""}`}
        onClick={() => onChange("in_progress")}
      >
        In Progress
      </button>

      <button
        className={`${baseButtonClass} ${value === "completed" ? activeButtonClass : ""}`}
        onClick={() => onChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilterTabs;