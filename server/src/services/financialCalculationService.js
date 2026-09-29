import { allocationModels } from '../utils/allocationModels.js';

export const calculateAllocations = (totalIncome, userAdjustedAllocations) => {
  let totalPercentage = 0;
  let totalAllocatedAmount = 0;

  const processedAllocations = userAdjustedAllocations.map(alloc => {
    const percentage = Number(alloc.userAdjustedPercentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      throw new Error(`Invalid percentage for category: ${alloc.categoryLabel}`);
    }

    const amount = Math.round((totalIncome * percentage) / 100);
    
    totalPercentage += percentage;
    totalAllocatedAmount += amount;

    return {
      ...alloc,
      userAdjustedAmount: amount
    };
  });

  // Ensure total percentage doesn't exceed 100, allow precision issue like 100.01 but strictly cap at 100 for user logic
  if (totalPercentage > 100) {
    throw new Error('Total allocation percentage cannot exceed 100%');
  }

  const remainingPercentage = Math.max(0, 100 - totalPercentage);
  const remainingAmount = Math.max(0, totalIncome - totalAllocatedAmount);

  return {
    allocations: processedAllocations,
    calculatedSummary: {
      totalPercentage,
      remainingPercentage,
      totalAllocatedAmount,
      remainingAmount
    }
  };
};

export const generateOptionD = (inputs) => {
  const { monthlySalary, otherIncome, dependents, rent, emi, debtRepayment } = inputs;
  const totalIncome = Number(monthlySalary) + Number(otherIncome || 0);
  
  if (!totalIncome || totalIncome <= 0) {
    throw new Error('Valid total income is required to generate recommendations');
  }

  let needs = 50;
  let wants = 30;
  let savings = 20;
  let debt = 0;

  const warnings = [];

  // High rent rules
  if (rent > (totalIncome * 0.3)) {
    needs += 10;
    wants -= 10;
    warnings.push('Your rent is higher than 30% of your income. Consider reducing wants.');
  }

  // Dependents rules
  if (dependents > 0) {
    const dependentIncrease = Math.min(dependents * 5, 15); // max 15% increase
    needs += dependentIncrease;
    wants = Math.max(0, wants - dependentIncrease);
  }

  // Debt rules
  const totalDebt = Number(emi || 0) + Number(debtRepayment || 0);
  if (totalDebt > 0) {
    const debtPercentage = Math.min(Math.round((totalDebt / totalIncome) * 100), 40); // Cap at 40% max logic
    debt = debtPercentage;
    
    // Reduce from wants first, then savings
    if (wants >= debtPercentage) {
      wants -= debtPercentage;
    } else {
      const remainder = debtPercentage - wants;
      wants = 0;
      savings = Math.max(0, savings - remainder);
    }
  }

  // Rebalance if somehow over 100
  const total = needs + wants + savings + debt;
  if (total > 100) {
    const scale = 100 / total;
    needs = Math.floor(needs * scale);
    wants = Math.floor(wants * scale);
    savings = Math.floor(savings * scale);
    debt = 100 - (needs + wants + savings);
  }

  return {
    modelId: 'option_d',
    name: 'Personalized Recommendation',
    allocations: {
      needs,
      wants,
      savings,
      ...(debt > 0 && { debt })
    },
    warnings
  };
};
