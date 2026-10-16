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

/*
OLD CODE:
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

REASON FOR CHANGE:
The old logic relied on tweaking a rigid 50/30/20 baseline and ignored the user's detailed plannedExpenses and savings priorities.
The new logic computes actual percentages based on the user's specific granular data, making the recommendation truly personalized and generating an analysis summary.
*/
export const generateOptionD = (inputs) => {
  const { monthlySalary, otherIncome, dependents, city, rent, emi, debtRepayment, plannedExpenses = {}, priorities = {} } = inputs;
  const totalIncome = Number(monthlySalary) + Number(otherIncome || 0);
  
  if (!totalIncome || totalIncome <= 0) {
    throw new Error('Valid total income is required to generate recommendations');
  }

  // 1. Calculate explicit amounts from user inputs
  const needsAmount = 
    Number(rent || 0) + 
    Number(emi || 0) + 
    Number(plannedExpenses.food || 0) + 
    Number(plannedExpenses.transport || 0) + 
    Number(plannedExpenses.healthcare || 0) + 
    Number(plannedExpenses.education || 0) + 
    Number(plannedExpenses.insurance || 0) + 
    Number(plannedExpenses.mobileInternet || 0) +
    Number(plannedExpenses.otherRecurring || 0);

  const wantsAmount = 
    Number(plannedExpenses.lifestyle || 0) + 
    Number(plannedExpenses.shopping || 0);

  const savingsAmount = 
    Number(priorities.emergencyFundContribution || 0) + 
    Number(priorities.generalSavings || 0) + 
    Number(priorities.investments || 0);

  const debtAmount = Number(debtRepayment || 0);

  // 2. Base calculation
  const totalCommitted = needsAmount + wantsAmount + debtAmount + savingsAmount;
  let remaining = totalIncome - totalCommitted;

  let finalNeeds = needsAmount;
  let finalWants = wantsAmount;
  let finalSavings = savingsAmount;
  let finalDebt = debtAmount;

  // 3. KhataFlow Recommendation Logic
  if (totalCommitted === 0) {
    // Fallback if user entered absolutely nothing
    finalNeeds = totalIncome * 0.50;
    finalWants = totalIncome * 0.30;
    finalSavings = totalIncome * 0.20;
    if (dependents > 0) {
      finalNeeds += totalIncome * 0.10;
      finalWants -= totalIncome * 0.10;
    }
  } else if (remaining > 0) {
    // Allocate remaining: 60% to savings, 40% to wants buffer
    finalSavings += remaining * 0.60;
    finalWants += remaining * 0.40;
  }

  // Convert to percentages
  let needsPct = Math.round((finalNeeds / totalIncome) * 100);
  let wantsPct = Math.round((finalWants / totalIncome) * 100);
  let savingsPct = Math.round((finalSavings / totalIncome) * 100);
  let debtPct = Math.round((finalDebt / totalIncome) * 100);

  // Normalize to 100 to avoid rounding issues
  const totalPct = needsPct + wantsPct + savingsPct + debtPct;
  if (totalPct !== 100) {
    const diff = 100 - totalPct;
    // Apply correction to the largest bucket to minimize impact
    if (needsPct >= wantsPct && needsPct >= savingsPct) needsPct += diff;
    else if (wantsPct >= savingsPct) wantsPct += diff;
    else savingsPct += diff;
  }

  // Generate dynamic insights
  const insights = [];
  const commitmentsPct = Math.round(((needsAmount + debtAmount) / totalIncome) * 100);
  
  if (commitmentsPct > 50) {
    insights.push(`Your essential commitments take up a high portion (${commitmentsPct}%) of your income.`);
  } else {
    insights.push(`Your essential commitments are well within a healthy range (${commitmentsPct}%).`);
  }

  if (savingsAmount > 0) {
    const plannedSavingsPct = Math.round((savingsAmount / totalIncome) * 100);
    insights.push(`You planned to save ${plannedSavingsPct}% of your income toward priorities.`);
  }

  if (dependents > 0) {
    insights.push(`We noted you have ${dependents} dependent(s) and factored a safety margin into your needs.`);
  }
  
  if (city) {
    insights.push(`We used ${city} as a contextual reference for living costs.`);
  }

  // Generate reasoning
  const reasoning = [];
  reasoning.push("We secured your explicit commitments and planned expenses first.");
  if (remaining > 0) {
    reasoning.push(`We allocated your remaining ₹${remaining.toLocaleString('en-IN')} primarily toward accelerating your savings and providing a lifestyle buffer.`);
  } else if (remaining < 0) {
    reasoning.push("Since your planned expenses exceed your income, we scaled your categories to total 100% to highlight areas for reduction.");
  }

  // Analysis Summary for UI
  const analysisSummary = {
    totalIncome,
    essentialCommitments: needsAmount + debtAmount,
    availableAmount: Math.max(0, totalIncome - (needsAmount + debtAmount)),
    insights,
    reasoning
  };

  const warnings = [];
  if (remaining < 0) {
    warnings.push(`Warning: Your planned commitments exceed your income by ₹${Math.abs(remaining).toLocaleString('en-IN')}. Please review and reduce your expenses.`);
  }

  return {
    modelId: 'option_d',
    name: 'Personalized Recommendation',
    allocations: {
      needs: needsPct,
      wants: wantsPct,
      savings: savingsPct,
      ...(debtPct > 0 && { debt: debtPct })
    },
    analysisSummary,
    warnings
  };
};
