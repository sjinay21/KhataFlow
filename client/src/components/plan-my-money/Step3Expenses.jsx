'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function Step3Expenses() {
  const router = useRouter();
  const { plannedExpenses, setPlannedExpenses, step, setStep } = usePlanMyMoney();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlannedExpenses((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Validate non-negative
    const invalid = Object.values(plannedExpenses).some(val => val !== '' && Number(val) < 0);
    if (invalid) {
      setError('Expenses cannot be negative.');
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

  return (
    <div>
      {/*
      OLD CODE:
      <h2 className="text-xl font-semibold mb-6">Step 3: Current & Planned Expenses</h2>
      <p className="text-sm text-gray-500 mb-6">
        These values are for reference and generating personalized recommendations. They are not double-counted against your final allocations.
      </p>

      PREVIOUS ATTEMPT:
      <h2 className="text-xl font-semibold mb-2">Let's look at your spending pattern</h2>
      <p className="text-sm text-gray-600 mb-6">
        Your planned expenses help us understand where your money is going and where your recommendation may need more or less allocation.
      </p>
      */}
      <h2 className="text-xl font-semibold mb-2">Step 3: Current & Planned Expenses</h2>
      <p className="text-sm text-gray-600 mb-6">
        Tell us how you expect to use your money. We'll compare your planned expenses with your available income to understand how much room remains for other priorities.
      </p>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'food', label: 'Food & Groceries' },
          { name: 'transport', label: 'Transport / Commute' },
          { name: 'healthcare', label: 'Healthcare & Medical' },
          { name: 'education', label: 'Education / Tuition' },
          { name: 'insurance', label: 'Insurance Premiums' },
          { name: 'mobileInternet', label: 'Mobile & Internet' },
          { name: 'lifestyle', label: 'Lifestyle & Entertainment' },
          { name: 'shopping', label: 'Shopping / Personal Care' },
          { name: 'otherRecurring', label: 'Other Recurring Expenses' }
        ].map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type="number"
              name={field.name}
              value={plannedExpenses[field.name]}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
