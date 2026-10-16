import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#ec4899', 
  '#8b5cf6', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function PaymentMethodBreakdown({ data }) {
  if (!data || data.length === 0) return null;

  return (
    /*
    Previous implementation:
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-4">By Payment Method</h3>
      
      <div className="flex-1 min-h-[250px] w-full">
    ...

    Changed because: Added an sr-only (screen-reader only) list to ensure charts are not the ONLY way this information is communicated.
    */
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col relative">
      <h3 className="text-lg font-bold text-slate-800 mb-4">By Payment Method</h3>

      {/* Screen Reader Only Accessible Data */}
      <ul className="sr-only">
        {data.map((item) => (
          <li key={item.method}>{item.method}: {formatCurrency(item.amount)}</li>
        ))}
      </ul>
      
      <div className="flex-1 min-h-[250px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9"/>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="method" 
              type="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13 }}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              cursor={{fill: '#f8fafc'}}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
