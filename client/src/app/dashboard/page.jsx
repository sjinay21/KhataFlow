'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getActivePlan, getExpenseReports, getGoals } from '@/lib/api';

/*
// OLD CODE: previous implementation preserved for project history.
// function DashboardPage() {
//   ...
//   <div className="bg-primary-50 text-primary-800 p-4 rounded-md mb-8">
//     <p className="font-medium">Phase 3 Implementation Note:</p>
//     <p className="text-sm mt-1">
//       This is a protected placeholder route. Real financial features (Transactions, Goals, etc.) will be built in Phase 4.
//     </p>
//   </div>
//   ...
// }
// REASON FOR CHANGE: Phase 7 Dashboard UI polish. Removed Phase 3 placeholder and added simple useful overview using existing APIs.
*/

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [dashboardData, setDashboardData] = useState({
    plan: null,
    expenseTotal: 0,
    goalsCount: 0,
    isLoading: true
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      const fetchDashboardData = async () => {
        try {
          const [planRes, reportsRes, goalsRes] = await Promise.all([
            getActivePlan().catch(() => ({ ok: false })),
            getExpenseReports().catch(() => ({ ok: false })),
            getGoals().catch(() => ({ ok: false }))
          ]);

          let planData = null;
          let expenseTotal = 0;
          let goalsCount = 0;

          if (planRes.ok) {
            const data = await planRes.json();
            if (data.success && data.data) planData = data.data;
          }
          if (reportsRes.ok) {
            const data = await reportsRes.json();
            if (data.success && data.data) expenseTotal = data.data.totalAmount || 0;
          }
          if (goalsRes.ok) {
            const data = await goalsRes.json();
            if (data.success && data.data) goalsCount = data.data.length || 0;
          }

          setDashboardData({ plan: planData, expenseTotal, goalsCount, isLoading: false });
        } catch (error) {
          console.error("Failed to load dashboard data", error);
          setDashboardData(prev => ({ ...prev, isLoading: false }));
        }
      };

      fetchDashboardData();
    }
  }, [user, loading, router]);

  if (loading || dashboardData.isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-slate-600">Loading Dashboard...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-[80vh] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-slate-600 mt-1">
            Here is an overview of your current financial status.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Income Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Monthly Income</h2>
            {dashboardData.plan && dashboardData.plan.income ? (
              <p className="text-3xl font-bold text-slate-900">₹{(dashboardData.plan.income.totalIncome || dashboardData.plan.income.monthlySalary || 0).toLocaleString('en-IN')}</p>
            ) : (
              <div className="flex-1">
                <p className="text-slate-600 italic mb-4">No active plan.</p>
                <Link href="/plan-my-money" className="text-primary-600 hover:text-primary-700 text-sm font-medium">Create a Plan &rarr;</Link>
              </div>
            )}
          </div>

          {/* Expenses Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Total Expenses</h2>
            {dashboardData.expenseTotal > 0 ? (
              <p className="text-3xl font-bold text-slate-900">₹{dashboardData.expenseTotal.toLocaleString('en-IN')}</p>
            ) : (
              <div className="flex-1">
                <p className="text-slate-600 italic mb-4">No expenses recorded.</p>
                <Link href="/expenses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">Add Expense &rarr;</Link>
              </div>
            )}
          </div>

          {/* Goals Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Active Goals</h2>
            {dashboardData.goalsCount > 0 ? (
              <p className="text-3xl font-bold text-slate-900">{dashboardData.goalsCount} Goal{dashboardData.goalsCount !== 1 ? 's' : ''}</p>
            ) : (
              <div className="flex-1">
                <p className="text-slate-600 italic mb-4">No active goals.</p>
                <Link href="/goals" className="text-primary-600 hover:text-primary-700 text-sm font-medium">Set a Goal &rarr;</Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/plan-my-money" className="flex items-center justify-center p-4 border border-slate-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-slate-700 font-medium">
              Plan Money
            </Link>
            <Link href="/expenses" className="flex items-center justify-center p-4 border border-slate-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-slate-700 font-medium">
              Add Expense
            </Link>
            <Link href="/reports" className="flex items-center justify-center p-4 border border-slate-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-slate-700 font-medium">
              View Reports
            </Link>
            <Link href="/goals" className="flex items-center justify-center p-4 border border-slate-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-slate-700 font-medium">
              Manage Goals
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
