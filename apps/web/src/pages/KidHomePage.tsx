// src/KidHomePage.tsx
import React, { useState } from "react";
import { mockTasks } from "../mockTasks";
import TaskCard from "../components/TaskCard";
import TaskDetailsModal from "../components/TaskDetailsModal";
import TaskFilterTabs from "../components/TaskFilterTabs";
import { Task, type TaskFilter, type TaskStatus } from "../types/task";
import EmptyState from "../components/EmptyStateCard";
import { mockUser } from "../mockUser";
import CurrentPoint from "../components/CurrentPoint";

const EmptyStatusMap: Record<TaskFilter, {
  icon: string;
  title: string;
}> = {
  all: {
    icon: "😊",
    title: "Looks like you have no tasks at the moment. Enjoy your free time!",
  },
  in_progress: {
    icon: "🎉",
    title: "You have no on-going tasks. Take a break and check back later!",
  },
  completed: {
    icon: "🤔",
    title: "You haven't completed any tasks yet. Let's get started!",
  },
};

const FilterStatusMap : Record<TaskFilter, TaskStatus[]> = {
  all: ["in_progress", "submitted", "completed", "rejected"],
  in_progress: ["submitted", "rejected", "in_progress"],
  completed: ["completed"],
};

const KidHomePage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<TaskFilter>("all");
  {/* Need to be changed if more than 2 status */}
  const filteredTasks = mockTasks.filter((task) => {
    return FilterStatusMap[filter].includes(task.status);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-200 p-5 font-system overflow-auto flex flex-col">
      {/* Greeting Message and Username*/}
      <h2 className="mb-2 text-2xl font-bold">👋 Hi {mockUser.name}!</h2>
      <div>
        <CurrentPoint></CurrentPoint>
      </div>

      {/* Task Filter Tabs */}
      <div>
      <TaskFilterTabs value={filter} onChange={setFilter} />
      </div>

      {/* Task Cards List */}
      <div>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={(t) => setSelectedTask(t)}
          />
        ))}

        
        {filteredTasks.length === 0 && (
          <EmptyState
            icon={EmptyStatusMap[filter].icon}
            title={EmptyStatusMap[filter].title}
          />
        )}
      </div>

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default KidHomePage;
