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
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingEstimates, setPendingEstimates] = useState(null);

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
      /*
      OLD CODE:
      const confirmOverwrite = window.confirm(
        `${data.message}\n\nDo you want to apply these new city estimates and overwrite your current entries?`
      );
      if (!confirmOverwrite) return;

      REASON FOR CHANGE:
      Replaced destructive window.confirm with an explicit inline UI that offers "Keep My Values" and "Apply Estimates".
      */
      setPendingEstimates({ message: data.message, estimates: data.estimates });
      setShowConfirm(true);
    } else {
      applyEstimates(data.estimates, data.message);
    }
  };

  const applyEstimates = (est, message) => {
    setSuccess(message);
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
    setShowConfirm(false);
    setPendingEstimates(null);
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
      <div className="flex justify-between items-start mb-6">
        <div>
          {/* 
          OLD CODE:
          <h2 className="text-xl font-semibold mb-6">Step 2: Living Situation</h2>
          
          PREVIOUS ATTEMPT:
          <h2 className="text-xl font-semibold mb-2">Now let's understand your regular commitments</h2>
          <p className="text-sm text-gray-600">These details help KhataFlow separate money you already need to commit from money that can be allocated toward savings, goals, and flexible spending.</p>
          */}
          <h2 className="text-xl font-semibold mb-2">Step 2: Living Situation</h2>
          <p className="text-sm text-gray-600">Help us understand your fixed financial commitments. We'll use your living situation, housing costs, and utilities when evaluating your essential expenses.</p>
        </div>
        <button
          onClick={handleFetchEstimates}
          disabled={loading}
          className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 font-medium ml-4 shrink-0 mt-1"
        >
          {loading ? 'Fetching...' : 'Fetch City Reference'}
        </button>
      </div>

      {showConfirm && pendingEstimates && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-yellow-800 mb-2">City Reference Found</h4>
          <p className="text-sm text-yellow-700 mb-4">
            {pendingEstimates.message}
            {/*
            OLD CODE:
            <strong>Warning:</strong> These are general estimates and may not match your actual expenses. Applying them will overwrite the values you have manually entered.
            
            PREVIOUS ATTEMPT:
            <strong>Note:</strong> We use your location as a reference when evaluating your planned expenses. Applying these reference values will overwrite the entries you have manually entered.
            */}
            <br/><br/>
            City estimates provide a reference point for common living costs. Your own entered expenses remain the primary input for your personalized plan.
            <br/><br/>
            <strong>Warning:</strong> Applying them will overwrite the values you have manually entered.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium"
            >
              Keep My Values
            </button>
            <button
              onClick={() => applyEstimates(pendingEstimates.estimates, 'City estimates applied.')}
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 text-sm font-medium"
            >
              Apply Estimates
            </button>
          </div>
        </div>
      )}

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
