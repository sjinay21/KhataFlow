'use client';

import { useRouter } from 'next/navigation';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function Step8Save() {
  const router = useRouter();
  const { savePlan, loading, error, step, setStep } = usePlanMyMoney();

  const handleSave = async () => {
    await savePlan();
  };

  const handleBack = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    router.push(`?step=${prevStep}`);
  };

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">You're All Set!</h2>
      <p className="text-gray-600 mb-8 max-w-lg mx-auto">
        Your financial plan is ready to be saved. The backend will validate and recalculate your exact allocation amounts to ensure everything is perfect.
      </p>

      {error && (
        <div className="mb-8 max-w-lg mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <p className="font-bold">Error saving plan</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button
          onClick={handleBack}
          disabled={loading}
          className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 disabled:opacity-50 font-medium"
        >
          Go Back
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50 font-medium shadow-sm"
        >
          {loading ? 'Saving Plan...' : 'Save My Financial Plan'}
        </button>
      </div>
    </div>
  );
}
