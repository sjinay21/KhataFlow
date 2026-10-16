import React from 'react';
import Card from '@/components/ui/Card';

export default function ExpenseSummary({ expenses }) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]) // highest first
    .slice(0, 5); // show top 5

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Card className="mb-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6 flex flex-col justify-center">
          <h2 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Expenses</h2>
          <p className="text-4xl font-bold text-slate-900">{formatINR(total)}</p>
          <p className="text-xs text-slate-400 mt-2">Based on current filters</p>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Top Categories</h3>
          {sortedCategories.length > 0 ? (
            <div className="space-y-2">
              {sortedCategories.map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{category}</span>
                  <span className="font-medium text-slate-900">{formatINR(amount)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No expenses to summarize.</p>
          )}
        </div>
      </div>
    </Card>
  );
}
