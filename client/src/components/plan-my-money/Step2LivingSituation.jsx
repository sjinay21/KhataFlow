'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';
import { useEffect } from 'react';
export default function Step2LivingSituation() {
  const router = useRouter();
  // OLD CODE: previous destructuring
  //   const { livingSituation, setLivingSituation, step, setStep, basicInfo, fetchCityEstimates, loading } = usePlanMyMoney();
  // REASON FOR CHANGE: Needed to access plannedExpenses and setPlannedExpenses for the overwrite prompt and city estimates auto-fill.
  const { livingSituation, setLivingSituation, step, setStep, basicInfo, fetchCityEstimates, loading, plannedExpenses, setPlannedExpenses } = usePlanMyMoney();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear feedback after 4 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivingSituation((prev) => ({ ...prev, [name]: value }));
  };

  // OLD CODE: previous handleFetchEstimates
  //   const handleFetchEstimates = () => {
  //     if (basicInfo.city) {
  //       fetchCityEstimates(basicInfo.city);
  //     } else {
  //       setError('Please enter a city in Step 1 to fetch estimates.');
  //     }
  //   };
  // REASON FOR CHANGE: Refactored to prompt the user before overwriting existing expenses with city estimates.
  const handleFetchEstimates = async () => {
    if (!basicInfo.city) {
      setError('Please enter a city in Step 1 to fetch estimates.');
      return;
    }

    const data = await fetchCityEstimates(basicInfo.city);
    if (!data) return;

    const hasExistingData = Object.values(livingSituation).some(v => v !== '' && v !== 'rent') ||
      Object.values(plannedExpenses).some(v => v !== '');

    if (hasExistingData) {
      const confirmOverwrite = window.confirm(
        `${data.message}\n\nDo you want to apply these new city estimates and overwrite your current entries?`
      );
      if (!confirmOverwrite) return;
    } else {
      /*
      Old implementation:
      window.alert(data.message);
      
      Reason for replacement:
      Using native browser alerts creates a jarring UX.
      Replaced with local inline success state.
      */
      setSuccess(data.message);
    }

    const est = data.estimates;
    setLivingSituation(prev => ({ ...prev, rent: est.rent || '', utilities: est.utilities || '' }));
    setPlannedExpenses(prev => ({
      ...prev,
      food: est.food || '',
      transport: est.transport || '',
      healthcare: est.healthcare || '',
      education: est.education || '',
      insurance: est.insurance || '',
      mobileInternet: est.mobileInternet || '',
      lifestyle: est.lifestyle || '',
      shopping: est.shopping || '',
      otherRecurring: est.otherRecurring || ''
    }));
  };

  const handleNext = () => {
    if (livingSituation.housingType === 'rent' && (!livingSituation.rent || Number(livingSituation.rent) < 0)) {
      setError('Please enter a valid rent amount.');
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Step 2: Living Situation</h2>
        <button
          onClick={handleFetchEstimates}
          disabled={loading}
          className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
        >
          {loading ? 'Fetching...' : 'Auto-fill City Estimates'}
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md text-sm border border-green-100">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Housing Type</label>
          <select
            name="housingType"
            value={livingSituation.housingType}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="rent">Rented House</option>
            <option value="owned">Own House</option>
            <option value="pg">PG</option>
            <option value="family">Living with family</option>
            <option value="other">Other</option>
          </select>
        </div>

        {livingSituation.housingType === 'rent' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Rent</label>
            <input
              type="number"
              name="rent"
              value={livingSituation.rent}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Home Loan EMI</label>
          <input
            type="number"
            name="emi"
            value={livingSituation.emi}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Utilities (Electricity, Water, etc.)</label>
          <input
            type="number"
            name="utilities"
            value={livingSituation.utilities}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {livingSituation.housingType === 'family' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Family Contribution</label>
            <input
              type="number"
              name="familyContribution"
              value={livingSituation.familyContribution}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        )}
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
