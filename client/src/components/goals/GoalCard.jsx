import React from 'react';
import Button from '../ui/Button';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function GoalCard({ goal, onEdit, onDelete }) {
  const percentage = goal.targetAmount > 0 
    ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100) 
    : 0;
  
  const isCompleted = goal.status === 'completed' || goal.currentAmount >= goal.targetAmount;
  
  const remaining = Math.max(goal.targetAmount - goal.currentAmount, 0);

  return (
    <div className={`bg-white rounded-xl border p-5 shadow-sm transition-all ${isCompleted ? 'border-green-200 bg-green-50/30' : 'border-slate-200 hover:shadow-md'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-slate-800">{goal.title}</h3>
            {isCompleted && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                Completed
              </span>
            )}
          </div>
          {goal.targetDate && (
            <p className="text-xs text-slate-500">
              Target: {new Date(goal.targetDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit(goal)} className="px-2 py-1 text-sm border-slate-200">
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(goal)} className="px-2 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 border-0">
            Delete
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-slate-700">{formatCurrency(goal.currentAmount)}</span>
          <span className="text-slate-500">of {formatCurrency(goal.targetAmount)}</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/50" aria-label={`Progress: ${percentage}%`}>
          {/* Progress Bar Fill */}
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out ${isCompleted ? 'bg-green-500' : 'bg-primary-500'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1.5 text-slate-500">
          <span>{percentage}% complete</span>
          {!isCompleted && <span>{formatCurrency(remaining)} left</span>}
        </div>
      </div>

      {goal.description && (
        <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-slate-100">
          {goal.description}
        </p>
      )}
    </div>
  );
}
