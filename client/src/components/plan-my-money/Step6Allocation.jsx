'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function Step6Allocation() {
  const router = useRouter();
  const { 
    allocations, handleAllocationChange, step, setStep, 
    currentTotalPercentage, totalIncome 
  } = usePlanMyMoney();
  
  const [error, setError] = useState('');

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleNext = () => {
    if (currentTotalPercentage > 100) {
      setError('Total allocation cannot exceed 100%. Please adjust your percentages.');
      return;
    }
    setError('');
    const nextStep = step + 1;
    setStep(nextStep);
    router.push(`?step=${nextStep}`);
  };

  const handleBack = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    router.push(`?step=${prevStep}`);
  };

  const remainingPercentage = Math.max(0, 100 - currentTotalPercentage);
  const remainingAmount = Math.max(0, totalIncome - allocations.reduce((acc, curr) => acc + (curr.userAdjustedAmount || 0), 0));

  return (
    <div>
      {/* OLD CODE:
      <h2 className="text-xl font-semibold mb-2">Step 6: Adjust Allocations</h2>
      REASON FOR CHANGE: Framing the step as a review and adjustment of KhataFlow's recommendation. */}
      <h2 className="text-xl font-semibold mb-2">Step 6: Review & Adjust Your Recommendation</h2>
      <p className="text-sm text-gray-500 mb-6">This is KhataFlow's starting recommendation. You can adjust these percentages before saving your plan.</p>
      <p className="text-sm text-gray-500 mb-6">Total Income: <span className="font-semibold text-gray-900">{formatINR(totalIncome)}</span></p>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Total Allocated: {currentTotalPercentage}%</span>
          <span className={`text-sm font-medium ${currentTotalPercentage > 100 ? 'text-red-600' : 'text-gray-700'}`}>
            Remaining: {remainingPercentage}% ({formatINR(remainingAmount)})
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden flex">
          <div 
            className={`h-2.5 ${currentTotalPercentage > 100 ? 'bg-red-500' : 'bg-indigo-600'}`} 
            style={{ width: `${Math.min(currentTotalPercentage, 100)}%` }}
          ></div>
        </div>
        {currentTotalPercentage < 100 && (
          <p className="mt-2 text-xs text-blue-600">Note: {remainingPercentage}% of your income is currently unallocated.</p>
        )}
      </div>

      <div className="space-y-6 mb-8">
        {allocations.map((alloc) => (
          <div key={alloc.categoryId} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:shadow-sm transition">
            <div className="mb-2 md:mb-0 md:w-1/3">
              <label className="block text-sm font-bold text-gray-900">{alloc.categoryLabel}</label>
              <p className="text-xs text-gray-500">Recommended: {alloc.recommendedPercentage}% ({formatINR(alloc.recommendedAmount)})</p>
            </div>
            
            <div className="flex items-center gap-4 md:w-2/3">
              <input
                type="range"
                min="0"
                max="100"
                value={alloc.userAdjustedPercentage}
                onChange={(e) => handleAllocationChange(alloc.categoryId, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                aria-label={`${alloc.categoryLabel} percentage`}
                aria-valuenow={alloc.userAdjustedPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              />
              <div className="flex items-center gap-2 w-32 shrink-0">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={alloc.userAdjustedPercentage}
                  onChange={(e) => handleAllocationChange(alloc.categoryId, e.target.value)}
                  className="w-16 border border-gray-300 rounded p-1 text-center text-sm"
                  aria-label={`${alloc.categoryLabel} percentage input`}
                />
                <span className="text-sm font-medium">%</span>
              </div>
              <div className="w-24 text-right shrink-0">
                <span className="text-sm font-bold text-indigo-700">{formatINR(alloc.userAdjustedAmount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={handleBack} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
          Back
        </button>
        <button onClick={handleNext} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Review Plan
        </button>
      </div>
    </div>
  );
}
