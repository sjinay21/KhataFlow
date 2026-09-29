'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { 
  getFinancialPlanModels, 
  getCityEstimates as fetchCityEstimatesApi, 
  getFinancialRecommendations, 
  getActivePlan as fetchActivePlanApi, 
  createFinancialPlan, 
  updateFinancialPlan 
} from '@/lib/api';

const PlanMyMoneyContext = createContext();

export const PlanMyMoneyProvider = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Active Plan from DB
  const [activePlan, setActivePlan] = useState(null);

  // Models from DB
  const [models, setModels] = useState(null);

  // State for the 8 steps
  const [basicInfo, setBasicInfo] = useState({
    city: '',
    locality: '',
    employmentType: 'Salaried',
    monthlySalary: '',
    otherIncome: '',
    dependents: 0,
    currency: 'INR'
  });

  const [livingSituation, setLivingSituation] = useState({
    housingType: 'rent',
    rent: '',
    emi: '',
    utilities: '',
    familyContribution: ''
  });

  const [plannedExpenses, setPlannedExpenses] = useState({
    food: '',
    transport: '',
    healthcare: '',
    education: '',
    insurance: '',
    mobileInternet: '',
    lifestyle: '',
    shopping: '',
    otherRecurring: ''
  });

  const [priorities, setPriorities] = useState({
    emergencyFundTarget: '',
    emergencyFundContribution: '',
    generalSavings: '',
    investments: '',
    debtRepayment: ''
  });

  // Since Phase 4 goals array
  const [goals, setGoals] = useState([]);

  const [selectedModel, setSelectedModel] = useState(null); // 'option_a'
  const [allocations, setAllocations] = useState([]); // [{ categoryId, recommendedPercentage, userAdjustedPercentage }]
  const [calculatedSummary, setCalculatedSummary] = useState(null);

  // Fetch Models
  const fetchModels = async () => {
    /*
    Previous implementation:
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/financialPlan/models', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setModels(data.data);
    } catch (err) {
      console.error('Failed to fetch models', err);
    }

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      const res = await getFinancialPlanModels();
      const data = await res.json();
      if (res.ok) setModels(data.data);
    } catch (err) {
      console.error('Failed to fetch models', err);
    }
  };

  // Fetch City Estimates
// OLD CODE: previous fetchCityEstimates
//   const fetchCityEstimates = async (city) => {
//     try {
//       setLoading(true);
//       const res = await fetch(`http://localhost:5000/cityEstimates?city=${city}`);
//       const data = await res.json();
//       if (res.ok) {
//         const est = data.data.estimates;
//         setLivingSituation(prev => ({ ...prev, rent: est.rent || '', utilities: est.utilities || '' }));
//         setPlannedExpenses(prev => ({
//           ...prev,
//           food: est.food || '',
//           transport: est.transport || '',
//           healthcare: est.healthcare || '',
//           education: est.education || '',
//           insurance: est.insurance || '',
//           mobileInternet: est.mobileInternet || '',
//           lifestyle: est.lifestyle || '',
//           shopping: est.shopping || '',
//           otherRecurring: est.otherRecurring || ''
//         }));
//       }
//     } catch (err) {
//       console.error('Failed to fetch city estimates', err);
//     } finally {
//       setLoading(false);
//     }
//   };
// REASON FOR CHANGE: Refactored to return the data back to the component so that it can prompt the user before overwriting existing expenses.
  const fetchCityEstimates = async (city) => {
    /*
    Previous implementation:
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/cityEstimates?city=${city}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch city estimates', err);
      return null;
    } finally {
      setLoading(false);
    }

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      setLoading(true);
      const res = await fetchCityEstimatesApi(city);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch city estimates', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Generate Option D
  const generateOptionD = async () => {
    /*
    Previous implementation:
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/financialPlan/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          monthlySalary: basicInfo.monthlySalary,
          otherIncome: basicInfo.otherIncome,
          dependents: basicInfo.dependents,
          housingType: livingSituation.housingType,
          city: basicInfo.city,
          rent: livingSituation.rent,
          emi: livingSituation.emi,
          debtRepayment: priorities.debtRepayment
        })
      });
      const data = await res.json();
      if (res.ok) {
        setModels(prev => ({ ...prev, option_d: data.data }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      setLoading(true);
      const res = await getFinancialRecommendations({
        monthlySalary: basicInfo.monthlySalary,
        otherIncome: basicInfo.otherIncome,
        dependents: basicInfo.dependents,
        housingType: livingSituation.housingType,
        city: basicInfo.city,
        rent: livingSituation.rent,
        emi: livingSituation.emi,
        debtRepayment: priorities.debtRepayment
      });
      const data = await res.json();
      if (res.ok) {
        setModels(prev => ({ ...prev, option_d: data.data }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save Plan
  const savePlan = async () => {
    /*
    Previous implementation:
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      const payload = { ... };

      const url = activePlan 
        ? `http://localhost:5000/financialPlan/${activePlan._id}`
        : 'http://localhost:5000/financialPlan';
      
      const method = activePlan ? 'PUT' : 'POST';

      const res = await fetch(url, { ... });
      
      const data = await res.json();
      ...

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      setLoading(true);
      setError(null);
      
      const payload = {
        ...basicInfo,
        ...livingSituation,
        plannedExpenses,
        financialPriorities: priorities,
        goalDetails: goals,
        selectedModel,
        allocations
      };
 {/*const url = activePlan 
        ? `http://localhost:5000/financialPlan/${activePlan._id}`
        : 'http://localhost:5000/financialPlan';
      
      const method = activePlan ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });*/}
      const res = activePlan 
        ? await updateFinancialPlan(activePlan._id, payload)
        : await createFinancialPlan(payload);
      
      const data = await res.json();
      if (res.ok) {
        setActivePlan(data.data);
        router.push('/plan-my-money/plan');
        return true;
      } else {
        setError(data.message || 'Failed to save plan');
        return false;
      }
    } catch (err) {
      setError('Unexpected error occurred while saving.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get Active Plan
  const fetchActivePlan = async () => {
    /*
    Previous implementation:
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/financialPlan', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setActivePlan(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      setLoading(true);
      const res = await fetchActivePlanApi();
      
      if (res.ok) {
        const data = await res.json();
        setActivePlan(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Real-time calculation helpers
  const totalIncome = Number(basicInfo.monthlySalary || 0) + Number(basicInfo.otherIncome || 0);

  const calculateAmount = (percentage) => {
    return Math.round((totalIncome * (Number(percentage) || 0)) / 100);
  };

  const handleAllocationChange = (categoryId, newPercentage) => {
    setAllocations(prev => prev.map(a => 
      a.categoryId === categoryId 
        ? { ...a, userAdjustedPercentage: newPercentage, userAdjustedAmount: calculateAmount(newPercentage) } 
        : a
    ));
  };

  const selectModel = (modelId) => {
    setSelectedModel(modelId);
    const model = models[modelId];
    if (model && model.allocations) {
      const newAllocations = Object.entries(model.allocations).map(([key, val]) => ({
        categoryId: key,
        categoryLabel: key.charAt(0).toUpperCase() + key.slice(1),
        recommendedPercentage: val,
        userAdjustedPercentage: val,
        recommendedAmount: calculateAmount(val),
        userAdjustedAmount: calculateAmount(val)
      }));
      setAllocations(newAllocations);
    }
  };

  const currentTotalPercentage = allocations.reduce((acc, curr) => acc + Number(curr.userAdjustedPercentage || 0), 0);

  return (
    <PlanMyMoneyContext.Provider value={{
      step, setStep,
      basicInfo, setBasicInfo,
      livingSituation, setLivingSituation,
      plannedExpenses, setPlannedExpenses,
      priorities, setPriorities,
      goals, setGoals,
      models, fetchModels,
      selectedModel, selectModel,
      allocations, handleAllocationChange,
      currentTotalPercentage, totalIncome, calculateAmount,
      generateOptionD, fetchCityEstimates,
      savePlan, fetchActivePlan, activePlan,
      loading, error
    }}>
      {children}
    </PlanMyMoneyContext.Provider>
  );
};

export const usePlanMyMoney = () => useContext(PlanMyMoneyContext);
