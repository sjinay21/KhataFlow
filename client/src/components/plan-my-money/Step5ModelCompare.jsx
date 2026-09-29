'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlanMyMoney } from '@/context/PlanMyMoneyContext';

export default function Step5ModelCompare() {
  const router = useRouter();
  const { models, fetchModels, generateOptionD, selectModel, step, setStep, loading } = usePlanMyMoney();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!models) {
      fetchModels();
    }
  }, [models, fetchModels]);

  const handleGenerateOptionD = () => {
    generateOptionD();
  };

  const handleSelect = (modelId) => {
    selectModel(modelId);
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

  if (!models) {
    return <div className="text-center py-8 text-gray-500">Loading models...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Step 5: Select an Allocation Model</h2>
      <p className="text-sm text-gray-500 mb-6">Review the available models and select the one that fits your lifestyle. You can customize the percentages in the next step.</p>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.values(models).map((model) => (
          <div key={model.id} className="border rounded-lg p-6 flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{model.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{model.description}</p>
              
              <div className="mb-4">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Suitable For:</span>
                <p className="text-sm text-gray-800">{model.suitableFor}</p>
              </div>

              {model.id !== 'option_d' ? (
                <div className="mb-4 bg-gray-50 p-3 rounded text-sm">
                  <div className="font-medium text-gray-700 mb-1">Recommended Percentages:</div>
                  <div className="flex flex-wrap gap-2">
                    {model.allocations && Object.entries(model.allocations).map(([k, v]) => (
                      <span key={k} className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs capitalize">
                        {k}: {v}%
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-4 bg-blue-50 p-3 rounded text-sm border border-blue-100">
                  {model.isDynamic && !model.allocations ? (
                    <div className="text-center py-2">
                      <button onClick={handleGenerateOptionD} disabled={loading} className="text-blue-700 underline text-sm font-medium">
                        {loading ? 'Generating...' : 'Click to generate your custom recommendation'}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-blue-800 mb-1">Your Personalized Allocation:</div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {model.allocations && typeof model.allocations === 'object' && Object.entries(model.allocations).map(([k, v]) => (
                          <span key={k} className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs capitalize">
                            {k}: {v}%
                          </span>
                        ))}
                      </div>
                      {model.warnings && model.warnings.length > 0 && (
                        <ul className="text-xs text-orange-700 list-disc list-inside mt-2">
                          {model.warnings.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs italic text-gray-400 mb-4">* Suggested allocation. Not financial advice.</p>
            </div>
            
            <button
              onClick={() => handleSelect(model.id)}
              disabled={model.id === 'option_d' && (!model.allocations || model.allocations === 'Dynamic')}
              className="mt-4 w-full bg-indigo-50 text-indigo-700 py-2 rounded-md hover:bg-indigo-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select {model.name}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={handleBack} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
          Back
        </button>
      </div>
    </div>
  );
}
