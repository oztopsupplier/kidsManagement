import React from "react";

type EmptyStateProps = {
  icon: string;
  title: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
}) => {
  return (
    <div className="mt-5 rounded-2xl bg-yellow-100 p-5 text-center shadow">
      <div className="mb-3 text-5xl">{icon}</div>
      <div className="mb-1 text-xl font-semibold">{title}</div>
    </div>
  );
};

export default EmptyState;
