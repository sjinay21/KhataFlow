import React from 'react';
import GoalCard from './GoalCard';
import EmptyState from '../ui/EmptyState';

export default function GoalList({ goals, onEdit, onDelete }) {
  if (!goals || goals.length === 0) {
    return (
      <EmptyState
        title="No Goals Yet"
        description="Set a financial goal to track your progress towards an emergency fund, a new gadget, or a vacation."
        icon={<span className="text-4xl">🎯</span>}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => (
        <GoalCard 
          key={goal._id} 
          goal={goal} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
