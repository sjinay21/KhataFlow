import React from 'react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function ReportSummary({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Spending</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(summary.totalSpending)}</p>
        <p className="text-sm text-slate-500 mt-1">{summary.totalExpenses} transactions</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Expense</p>
        <p className="text-xl font-bold text-slate-800 mt-1">{formatCurrency(summary.averageExpense)}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Highest Expense</p>
        <p className="text-xl font-bold text-red-600 mt-1">{formatCurrency(summary.highestExpense)}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lowest Expense</p>
        <p className="text-xl font-bold text-green-600 mt-1">{formatCurrency(summary.lowestExpense)}</p>
      </div>
    </div>
  );
}
