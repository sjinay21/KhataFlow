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
      {/* 
      OLD CODE:
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

      REASON FOR CHANGE:
      Redesigned Step 5 to prioritize the KhataFlow Personalized Recommendation and Analysis layer at the top,
      and moved the static standard models to an optional alternatives section below.
      */}
      <h2 className="text-xl font-semibold mb-6">Step 5: KhataFlow Recommendation</h2>
      <p className="text-sm text-gray-500 mb-6">Let KhataFlow analyze your financial situation and calculate a personalized starting allocation.</p>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* PRIMARY SECTION: Personalized Recommendation */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-indigo-900 mb-4">Recommended for you</h3>
        
        {models['option_d'] && (
          <div className="border-2 border-indigo-200 rounded-xl p-6 bg-indigo-50 shadow-sm">
            {models['option_d'].isDynamic && !models['option_d'].allocations ? (
              <div className="text-center py-8">
                <h4 className="text-lg font-semibold text-indigo-900 mb-2">Let KhataFlow Analyze</h4>
                <p className="text-sm text-indigo-700 mb-6">We will use your income, planned expenses, and priorities to suggest a plan.</p>
                <button 
                  onClick={handleGenerateOptionD} 
                  disabled={loading} 
                  className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Generate Personalized Recommendation'}
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  {/* Analysis Summary */}
                  {models['option_d'].analysisSummary && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                      <h4 className="font-semibold text-indigo-900 mb-3 border-b border-indigo-100 pb-2">Your Financial Analysis</h4>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total income</span>
                          <span className="font-medium text-gray-900">₹{models['option_d'].analysisSummary.totalIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Essential commitments</span>
                          <span className="font-medium text-gray-900">₹{models['option_d'].analysisSummary.essentialCommitments.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-100">
                          <span className="font-medium text-gray-700">Available amount</span>
                          <span className="font-bold text-green-600">₹{models['option_d'].analysisSummary.availableAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* 
                      OLD CODE:
                      <div className="text-xs text-gray-500">
                        <p className="font-medium mb-1">What we considered:</p>
                        <ul className="space-y-1">
                          {models['option_d'].analysisSummary.considerations.map((item, idx) => (
                            <li key={idx} className="flex items-center">
                              <svg className="h-3 w-3 text-indigo-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      REASON FOR CHANGE:
                      Updated to show meaningful derived insights and patterns instead of just repeating the input fields.
                      */}
                      <div className="text-xs text-gray-600">
                        <p className="font-medium text-gray-800 mb-2">What we noticed:</p>
                        <ul className="space-y-2">
                          {models['option_d'].analysisSummary.insights && models['option_d'].analysisSummary.insights.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg className="h-3.5 w-3.5 text-indigo-500 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Recommended Allocation */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-indigo-900 mb-3 border-b border-indigo-100 pb-2">KhataFlow Recommendation</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {models['option_d'].allocations && typeof models['option_d'].allocations === 'object' && Object.entries(models['option_d'].allocations).map(([k, v]) => (
                          <div key={k} className="bg-indigo-100 text-indigo-900 px-3 py-2 rounded-md text-sm capitalize flex flex-col items-center flex-1 min-w-[80px]">
                            <span className="text-xs text-indigo-600 font-medium mb-1">{k}</span>
                            <span className="font-bold text-lg">{v}%</span>
                          </div>
                        ))}
                      </div>
                      
                      {models['option_d'].analysisSummary.reasoning && (
                        <div className="mb-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-100">
                          <p className="font-semibold text-gray-800 mb-1.5">Why this recommendation?</p>
                          <ul className="space-y-1.5">
                            {models['option_d'].analysisSummary.reasoning.map((r, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-indigo-400 mr-1.5 shrink-0">•</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {models['option_d'].warnings && models['option_d'].warnings.length > 0 && (
                        <div className="bg-orange-50 border border-orange-200 text-orange-800 p-3 rounded-md text-xs mb-4">
                          <ul className="list-disc list-inside space-y-1">
                            {models['option_d'].warnings.map((w, i) => <li key={i}>{w}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleSelect('option_d')}
                      className="w-full bg-indigo-600 text-white py-2.5 rounded-md hover:bg-indigo-700 font-medium shadow-sm transition"
                    >
                      Use KhataFlow Recommendation
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* SECONDARY SECTION: Standard Models */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4">Prefer to choose a planning method yourself?</h3>
        <p className="text-sm text-gray-500 mb-6">You can use one of these standard allocation frameworks as a starting point instead.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(models)
            .filter(([key, model]) => key !== 'option_d')
            .map(([key, model]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between bg-white hover:border-indigo-300 transition group">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">{model.name}</h4>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{model.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {model.allocations && Object.entries(model.allocations).map(([k, v]) => (
                    <span key={k} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                      {k.substring(0, 3)}: {v}%
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => handleSelect(key)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-1.5 rounded text-sm hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 font-medium transition"
              >
                Select {model.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={handleBack} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
          Back
        </button>
      </div>
    </div>
  );
}
