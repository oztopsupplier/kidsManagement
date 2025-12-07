// src/components/TaskDetailsModal.tsx
import React from "react";
import type { Task } from "../types/task";

type TaskDetailsModalProps = {
  task: Task;
  onClose: () => void;
};

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-11/12 max-w-md bg-blue-100 rounded-2xl p-5 shadow-xl"
      >
        <h3 className="mt-0 mb-2 text-lg font-bold text-slate-900">{task.title}</h3>
        <p className="my-1 text-sm text-gray-600">
        {task.description}
        </p>
        <p className="my-1 text-sm text-gray-600">
          Due date: {task.due_at}
        </p>
        <p className="my-1 text-sm text-gray-600">
          Reward: {task.reward_points} pts
        </p>

        
        <button
          onClick={onClose}
          className="mt-3 px-3 py-2 rounded-lg border-none bg-blue-500 text-white text-sm font-medium cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
