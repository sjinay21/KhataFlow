'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function Step1BasicInfo() {
  const router = useRouter();
  const { basicInfo, setBasicInfo, step, setStep } = usePlanMyMoney();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!basicInfo.monthlySalary || Number(basicInfo.monthlySalary) <= 0) {
      setError('Monthly salary is required and must be greater than zero.');
      return;
    }
    setError('');
    const nextStep = step + 1;
    setStep(nextStep);
    router.push(`?step=${nextStep}`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Step 1: Basic Information</h2>
      
      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={basicInfo.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g. Mumbai"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Locality (Optional)</label>
          <input
            type="text"
            name="locality"
            value={basicInfo.locality}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g. Bandra"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Employment Type</label>
          <select
            name="employmentType"
            value={basicInfo.employmentType}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Salaried">Salaried</option>
            <option value="Business">Business</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Take-Home Salary *</label>
          <input
            type="number"
            name="monthlySalary"
            value={basicInfo.monthlySalary}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Other Monthly Income</label>
          <input
            type="number"
            name="otherIncome"
            value={basicInfo.otherIncome}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Dependents</label>
          <input
            type="number"
            name="dependents"
            value={basicInfo.dependents}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
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
