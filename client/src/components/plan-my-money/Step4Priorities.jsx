'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function Step4Priorities() {
  const router = useRouter();
  const { priorities, setPriorities, goals, setGoals, step, setStep } = usePlanMyMoney();
  const [error, setError] = useState('');

  const handlePriorityChange = (e) => {
    const { name, value } = e.target;
    setPriorities((prev) => ({ ...prev, [name]: value }));
  };

  const addGoal = () => {
    setGoals([...goals, { name: '', targetAmount: '', monthsToGoal: '', monthlyContribution: '' }]);
  };

  const updateGoal = (index, field, value) => {
    const newGoals = [...goals];
    newGoals[index][field] = value;

    if (field === 'targetAmount' || field === 'monthsToGoal') {
      const target = Number(newGoals[index].targetAmount) || 0;
      const months = Number(newGoals[index].monthsToGoal) || 0;
      if (months > 0) {
        newGoals[index].monthlyContribution = Math.round(target / months);
      } else {
        newGoals[index].monthlyContribution = '';
      }
    }

    setGoals(newGoals);
  };

  const removeGoal = (index) => {
    const newGoals = [...goals];
    newGoals.splice(index, 1);
    setGoals(newGoals);
  };

  const handleNext = () => {
    const invalidPriority = Object.values(priorities).some(val => val !== '' && Number(val) < 0);
    if (invalidPriority) {
      setError('Priority amounts cannot be negative.');
      return;
    }

    for (let g of goals) {
      if (!g.name || !g.targetAmount || !g.monthsToGoal) {
        setError('Please fill all fields for your added goals, or remove them.');
        return;
      }
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Step 4: Savings & Priorities</h2>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">General Priorities</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Emergency Fund Target (Total)</label>
          <input type="number" name="emergencyFundTarget" value={priorities.emergencyFundTarget} onChange={handlePriorityChange} min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Emergency Fund Monthly Contribution</label>
          <input type="number" name="emergencyFundContribution" value={priorities.emergencyFundContribution} onChange={handlePriorityChange} min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">General Savings / Month</label>
          <input type="number" name="generalSavings" value={priorities.generalSavings} onChange={handlePriorityChange} min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Investments/SIPs / Month</label>
          <input type="number" name="investments" value={priorities.investments} onChange={handlePriorityChange} min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Debt / Loan Repayment / Month</label>
          <input type="number" name="debtRepayment" value={priorities.debtRepayment} onChange={handlePriorityChange} min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-medium text-gray-900">Specific Goals</h3>
          <button onClick={addGoal} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200">
            + Add Goal
          </button>
        </div>

        {goals.length === 0 && <p className="text-sm text-gray-500">No specific goals added yet.</p>}

        {goals.map((goal, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-md border border-gray-200 relative">
            <button onClick={() => removeGoal(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">Goal Name</label>
                <input type="text" value={goal.name} onChange={(e) => updateGoal(idx, 'name', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm" placeholder="e.g. Car Downpayment" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Target Amount</label>
                <input type="number" value={goal.targetAmount} onChange={(e) => updateGoal(idx, 'targetAmount', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm" min="0" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Months to Goal</label>
                <input type="number" value={goal.monthsToGoal} onChange={(e) => updateGoal(idx, 'monthsToGoal', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm" min="1" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Required Monthly Contribution</label>
                <input type="number" value={goal.monthlyContribution} readOnly className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-sm text-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={handleBack} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
          Back
        </button>
        <button onClick={handleNext} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Next Step
        </button>
      </div>
    </div>
  );
}
