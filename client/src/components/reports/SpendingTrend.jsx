import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function SpendingTrend({ data }) {
  if (!data || data.length === 0) return null;

  return (
    /*
    Previous implementation:
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Spending Trend</h3>
      
      <div className="h-72 w-full">
    ...

    Changed because: Added an sr-only (screen-reader only) list to ensure charts are not the ONLY way this information is communicated.
    */
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Spending Trend</h3>

      {/* Screen Reader Only Accessible Data */}
      <ul className="sr-only">
        {data.map((item) => (
          <li key={item.date}>{item.date}: {formatCurrency(item.amount)}</li>
        ))}
      </ul>
      
      <div className="h-72 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#475569" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              minTickGap={30}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(val) => `₹${val}`}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(value), 'Spent']}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#334155" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
