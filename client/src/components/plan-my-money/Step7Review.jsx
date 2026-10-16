'use client';

import { useRouter } from 'next/navigation';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function Step7Review() {
  const router = useRouter();
  const { 
    basicInfo, livingSituation, plannedExpenses, priorities, goals,
    allocations, currentTotalPercentage, totalIncome, step, setStep
  } = usePlanMyMoney();

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleNext = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    router.push(`?step=${nextStep}`);
  };

  const handleBack = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    router.push(`?step=${prevStep}`);
  };

  const totalAllocatedAmount = allocations.reduce((acc, curr) => acc + (curr.userAdjustedAmount || 0), 0);
  const remainingPercentage = Math.max(0, 100 - currentTotalPercentage);
  const remainingAmount = Math.max(0, totalIncome - totalAllocatedAmount);

  return (
    <div>
      {/* 
      OLD CODE:
      <h2 className="text-xl font-semibold mb-6">Step 7: Review Your Financial Plan</h2>
      
      REASON FOR CHANGE:
      Added contextual messaging to emphasize that Step 7 is the final confirmation stage before saving (Point 8).
      */}
      <h2 className="text-xl font-semibold mb-2">Step 7: Confirm your final plan</h2>
      <p className="text-sm text-gray-600 mb-6">You've reviewed the recommendation. This is the plan that will be saved to your dashboard.</p>

      <div className="space-y-6">
        <section className="bg-white border rounded-lg p-5">
          <h3 className="text-lg font-medium border-b pb-2 mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-lg font-bold text-gray-900">{formatINR(totalIncome)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Allocated</p>
              <p className="text-lg font-bold text-gray-900">{currentTotalPercentage}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Allocated Amount</p>
              <p className="text-lg font-bold text-indigo-700">{formatINR(totalAllocatedAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Unallocated</p>
              <p className={`text-lg font-bold ${remainingAmount > 0 ? 'text-amber-600' : 'text-gray-900'}`}>{formatINR(remainingAmount)}</p>
            </div>
          </div>
        </section>

        <section className="bg-white border rounded-lg p-5">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-medium">Final Allocations</h3>
            <button onClick={() => { setStep(6); router.push('?step=6'); }} className="text-sm text-indigo-600 hover:underline">Edit</button>
          </div>
          <div className="space-y-2">
            {allocations.map(alloc => (
              <div key={alloc.categoryId} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-700">{alloc.categoryLabel}</span>
                <div className="text-right">
                  <span className="text-gray-500 mr-4">{alloc.userAdjustedPercentage}%</span>
                  <span className="font-bold">{formatINR(alloc.userAdjustedAmount)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border rounded-lg p-5">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-lg font-medium">Goals & Priorities</h3>
            <button onClick={() => { setStep(4); router.push('?step=4'); }} className="text-sm text-indigo-600 hover:underline">Edit</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2">Priorities</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>Emergency Fund Target: {formatINR(priorities.emergencyFundTarget || 0)}</li>
                <li>Emergency Monthly: {formatINR(priorities.emergencyFundContribution || 0)}</li>
                <li>General Savings: {formatINR(priorities.generalSavings || 0)}</li>
                <li>Investments: {formatINR(priorities.investments || 0)}</li>
                <li>Debt Repayment: {formatINR(priorities.debtRepayment || 0)}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2">Specific Goals</h4>
              {goals.length === 0 ? (
                <p className="text-sm text-gray-500">No specific goals added.</p>
              ) : (
                <ul className="text-sm space-y-2">
                  {goals.map((g, i) => (
                    <li key={i} className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">{g.name}</span>: {formatINR(g.targetAmount)} in {g.monthsToGoal} months
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {remainingAmount > 0 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm flex gap-3 items-start">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-bold">You have unallocated funds</p>
              <p>You have {formatINR(remainingAmount)} ({remainingPercentage}%) left unallocated. It's recommended to give every rupee a job. Consider assigning it to savings, investments, or goals.</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={handleBack} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
          Back
        </button>
        <button onClick={handleNext} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Continue to Save
        </button>
      </div>
    </div>
  );
}
