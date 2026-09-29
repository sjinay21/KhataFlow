import React from 'react';

const PRESETS = [
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'Last 3 Months', value: 'last_3_months' },
  { label: 'Custom', value: 'custom' }
];

export default function ReportFilters({ 
  preset, 
  setPreset, 
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate 
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-end">
        
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Time Period</label>
          <select 
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className="block w-full border border-slate-300 rounded-md p-2 text-sm"
          >
            {PRESETS.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {preset === 'custom' && (
          <>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Start Date</label>
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full border border-slate-300 rounded-md p-2 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">End Date</label>
              <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full border border-slate-300 rounded-md p-2 text-sm"
              />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
