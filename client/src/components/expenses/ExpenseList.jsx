import React from 'react';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString) => {
    // Ensuring it renders exactly what the date string holds, assuming UTC or simplified handling.
    // The date from the backend might look like '2023-09-26T00:00:00.000Z'
    // Display it correctly in local without shifting the day.
    // For simplicity of not shifting, if we split by 'T', we get the exact date part:
    const pureDateStr = dateString.split('T')[0];
    const [year, month, day] = pureDateStr.split('-');
    const dt = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }).format(dt);
  };

  if (!expenses || expenses.length === 0) {
    return (
      <EmptyState 
        title="No expenses found" 
        description="Try adjusting your filters or record a new expense to see it here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop View (Table style but using divs for responsiveness) */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 bg-slate-50 px-6 py-3 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-2">Date</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        <div className="divide-y divide-slate-100">
          {expenses.map((exp) => (
            <div key={exp._id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors">
              <div className="col-span-2 text-sm text-slate-600 whitespace-nowrap">{formatDate(exp.date)}</div>
              <div className="col-span-4">
                <p className="text-sm font-medium text-slate-900 truncate" title={exp.description}>{exp.description}</p>
                {exp.paymentMethod && <p className="text-xs text-slate-500">{exp.paymentMethod}</p>}
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                  {exp.category}
                </span>
              </div>
              <div className="col-span-2 text-right font-bold text-slate-900">{formatINR(exp.amount)}</div>
              <div className="col-span-2 flex justify-end space-x-2">
                <button onClick={() => onEdit(exp)} className="text-primary-600 hover:text-primary-800 text-sm font-medium">Edit</button>
                <button onClick={() => onDelete(exp)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {expenses.map((exp) => (
          <Card key={exp._id} className="p-4 relative">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-slate-900 mb-1">{exp.description}</p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>{formatDate(exp.date)}</span>
                  <span>•</span>
                  <span>{exp.paymentMethod}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">{formatINR(exp.amount)}</p>
                <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                  {exp.category}
                </span>
              </div>
            </div>
            
            <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end space-x-4">
              <button onClick={() => onEdit(exp)} className="text-primary-600 hover:text-primary-800 text-sm font-medium">Edit</button>
              <button onClick={() => onDelete(exp)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
