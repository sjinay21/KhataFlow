'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function PlanDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { activePlan, fetchActivePlan, loading: planLoading } = usePlanMyMoney();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && !activePlan && !planLoading) {
      fetchActivePlan();
    }
  }, [user, activePlan, planLoading]);

  if (authLoading || planLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-gray-500 animate-pulse">Loading Plan...</div>
      </div>
    );
  }

  if (!activePlan) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No Active Plan Found</h2>
        <p className="text-gray-600 mb-8">You haven't created a financial plan yet. Let's build one together!</p>
        <button 
          onClick={() => router.push('/plan-my-money/onboarding')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Create My Financial Plan
        </button>
      </div>
    );
  }

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
  };

  const {
    income,
    calculatedSummary,
    allocations,
    goalDetails,
    financialPriorities
  } = activePlan;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Active Financial Plan</h1>
          <p className="text-sm text-gray-500 mt-1">Based on {activePlan.selectedModel.replace('_', ' ').toUpperCase()}</p>
        </div>
        <button 
          onClick={() => router.push('/plan-my-money/onboarding?step=1')}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium shadow-sm"
        >
          Edit Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Income & Summary */}
        <div className="space-y-8 lg:col-span-1">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-indigo-100 text-sm font-semibold uppercase tracking-wider mb-1">Total Monthly Income</h2>
            <p className="text-4xl font-bold mb-4">{formatINR(income.totalIncome)}</p>
            
            <div className="space-y-2 text-sm text-indigo-50 border-t border-indigo-400 pt-4 mt-4">
              <div className="flex justify-between">
                <span>Salary</span>
                <span className="font-medium">{formatINR(income.monthlySalary)}</span>
              </div>
              <div className="flex justify-between">
                <span>Other Income</span>
                <span className="font-medium">{formatINR(income.otherIncome)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-gray-900 font-bold mb-4 border-b pb-2">Plan Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Total Allocated</span>
                  <span className="font-bold">{calculatedSummary.totalPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${calculatedSummary.totalPercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">{formatINR(calculatedSummary.totalAllocatedAmount)}</p>
              </div>

              {calculatedSummary.remainingAmount > 0 && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-amber-600 font-medium">Unallocated</span>
                    <span className="font-bold text-amber-700">{calculatedSummary.remainingPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${calculatedSummary.remainingPercentage}%` }}></div>
                  </div>
                  <p className="text-xs text-amber-700 mt-1 text-right">{formatINR(calculatedSummary.remainingAmount)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Allocations & Goals */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Allocations Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h3 className="text-gray-900 font-bold">Monthly Allocations</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {allocations.map(alloc => (
                <div key={alloc.categoryId} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div>
                    <p className="font-medium text-gray-900">{alloc.categoryLabel}</p>
                    <p className="text-xs text-gray-500">{alloc.userAdjustedPercentage}% of income</p>
                  </div>
                  <p className="font-bold text-indigo-700 text-lg">{formatINR(alloc.userAdjustedAmount)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-gray-900 font-bold mb-4 border-b pb-2">Financial Priorities</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Emergency Target</span>
                  <span className="font-medium text-gray-900">{formatINR(financialPriorities.emergencyFundTarget)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Emergency Monthly</span>
                  <span className="font-medium text-gray-900">{formatINR(financialPriorities.emergencyFundContribution)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">General Savings</span>
                  <span className="font-medium text-gray-900">{formatINR(financialPriorities.generalSavings)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Investments</span>
                  <span className="font-medium text-gray-900">{formatINR(financialPriorities.investments)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Debt Repayment</span>
                  <span className="font-medium text-gray-900">{formatINR(financialPriorities.debtRepayment)}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-gray-900 font-bold mb-4 border-b pb-2">Specific Goals</h3>
              {goalDetails.length === 0 ? (
                <p className="text-sm text-gray-500">No specific goals added.</p>
              ) : (
                <div className="space-y-4">
                  {goalDetails.map(g => (
                    <div key={g._id} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                      <p className="font-semibold text-gray-800">{g.name}</p>
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>Target: {formatINR(g.targetAmount)}</span>
                        <span>{g.monthsToGoal} months</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center text-sm">
                        <span className="text-gray-500">Monthly:</span>
                        <span className="font-bold text-indigo-600">{formatINR(g.monthlyContribution)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
