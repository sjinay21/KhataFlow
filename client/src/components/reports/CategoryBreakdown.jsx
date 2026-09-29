import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#0f172a', '#334155', '#475569', '#64748b', '#94a3b8', 
  '#cbd5e1', '#e2e8f0', '#0ea5e9', '#0284c7', '#0369a1',
  '#075985', '#0c4a6e'
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function CategoryBreakdown({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Category Breakdown</h3>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3 text-right">Amount</th>
              <th className="py-2 px-3 text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.category} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="py-2 px-3 font-medium text-slate-700 flex items-center">
                  <span 
                    className="w-3 h-3 rounded-full mr-2 inline-block" 
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></span>
                  {item.category}
                </td>
                <td className="py-2 px-3 text-right font-medium">{formatCurrency(item.amount)}</td>
                <td className="py-2 px-3 text-right text-slate-500">{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
