import React from "react";
import type { ChildOverviewStats } from "../../types/task";

interface ChildrenOverviewProps {
    items: ChildOverviewStats[];
}

const ChildrenOverview: React.FC<ChildrenOverviewProps> = ({ items }) => {
    if (items.length === 0) {
        return <div className="text-muted">No children in this family yet.</div>;
    }

    return (
        <div className="children-overview-list">
            {items.map((child) => (
                <div key={child.id} className="children-card">
                    <div className="children-card-header">
                        <div className="children-card-avatar">
                            {child.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="children-card-name">{child.name}</div>
                            <div className="children-card-points">
                                ⭐ {child.totalPoints} points
                            </div>
                        </div>
                    </div>

                    <div className="children-card-tasks">
                        Tasks: {child.completedTasks} / {child.totalTasks}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChildrenOverview;
