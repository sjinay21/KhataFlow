import FinancialPlan from '../models/FinancialPlan.js';
import { allocationModels } from '../utils/allocationModels.js';
import { cityEstimates } from '../utils/cityData.js';
import { calculateAllocations, generateOptionD } from '../services/financialCalculationService.js';

// @desc    Get all static models (Option A, B, C)
// @route   GET /api/v1/financial-plan/models
// @access  Private
export const getModels = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      ...allocationModels,
// OLD CODE: previous Option D metadata
//       option_d: {
//         id: 'option_d',
//         name: 'Personalized Recommendation',
//         description: 'Dynamically generated based on your living situation, dependents, and rent.',
//         advantages: 'Tailored specifically to you.',
//         limitations: 'Might require fine-tuning for edge cases.',
//         suitableFor: 'Users with high rent, dependents, or existing debt.',
//         allocations: 'Dynamic'
//       }
// REASON FOR CHANGE: Match exact Option D metadata requested and use isDynamic flag.
      option_d: {
        id: 'option_d',
        name: 'Personalized Recommendation',
        description: 'A recommendation generated from your income, expenses, housing, dependents, and financial priorities.',
        advantages: 'Adapts to the user’s financial situation.',
        limitations: 'The recommendation depends on the accuracy of the entered information.',
        suitableFor: 'Users who want a personalized starting point.',
        isDynamic: true,
        allocations: null,
      }
    }
  });
};

// @desc    Generate personalized Option D recommendation
// @route   POST /api/v1/financial-plan/recommendations
// @access  Private
export const generateRecommendation = (req, res) => {
  try {
    const recommendation = generateOptionD(req.body);
    res.status(200).json({
      success: true,
      data: recommendation
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Create a new financial plan
// @route   POST /api/v1/financial-plan
// @access  Private
export const createPlan = async (req, res) => {
  const {
    currency, city, locality, housingType, employmentType, dependents,
    monthlySalary, otherIncome, plannedExpenses, financialPriorities,
    goalDetails, selectedModel, allocations
  } = req.body;

  if (!monthlySalary || monthlySalary <= 0) {
    res.status(400);
    throw new Error('Valid monthly salary is required');
  }

  const totalIncome = Number(monthlySalary) + Number(otherIncome || 0);

  // Recalculate everything on the backend
  const { allocations: processedAllocations, calculatedSummary } = calculateAllocations(totalIncome, allocations);

  // Deactivate existing plan for this user
  await FinancialPlan.updateMany({ user: req.user.id }, { isActive: false });

  const plan = await FinancialPlan.create({
    user: req.user.id,
    isActive: true,
    version: 1,
    currency, city, locality, housingType, employmentType, dependents,
    income: {
      monthlySalary,
      otherIncome,
      totalIncome
    },
    plannedExpenses,
    financialPriorities,
    goalDetails,
    selectedModel,
    allocations: processedAllocations,
    calculatedSummary
  });

  res.status(201).json({
    success: true,
    data: plan
  });
};

// @desc    Get active plan for authenticated user
// @route   GET /api/v1/financial-plan
// @access  Private
export const getActivePlan = async (req, res) => {
  const plan = await FinancialPlan.findOne({ user: req.user.id, isActive: true });

  if (!plan) {
    res.status(404);
    throw new Error('No active financial plan found');
  }

  res.status(200).json({
    success: true,
    data: plan
  });
};

// @desc    Update active plan
// @route   PUT /api/v1/financial-plan/:id
// @access  Private
export const updatePlan = async (req, res) => {
  const plan = await FinancialPlan.findOne({ _id: req.params.id, user: req.user.id });

  if (!plan) {
    res.status(404);
    throw new Error('Plan not found or unauthorized');
  }

  const {
    currency, city, locality, housingType, employmentType, dependents,
    monthlySalary, otherIncome, plannedExpenses, financialPriorities,
    goalDetails, selectedModel, allocations
  } = req.body;

  if (!monthlySalary || monthlySalary <= 0) {
    res.status(400);
    throw new Error('Valid monthly salary is required');
  }

  const totalIncome = Number(monthlySalary) + Number(otherIncome || 0);

  // Recalculate
  const { allocations: processedAllocations, calculatedSummary } = calculateAllocations(totalIncome, allocations);

  // Update fields
  plan.currency = currency ?? plan.currency;
  plan.city = city ?? plan.city;
  plan.locality = locality ?? plan.locality;
  plan.housingType = housingType ?? plan.housingType;
  plan.employmentType = employmentType ?? plan.employmentType;
  plan.dependents = dependents ?? plan.dependents;
  plan.income = { monthlySalary, otherIncome: otherIncome || 0, totalIncome };
  plan.plannedExpenses = plannedExpenses ?? plan.plannedExpenses;
  plan.financialPriorities = financialPriorities ?? plan.financialPriorities;
  plan.goalDetails = goalDetails ?? plan.goalDetails;
  plan.selectedModel = selectedModel ?? plan.selectedModel;
  plan.allocations = processedAllocations;
  plan.calculatedSummary = calculatedSummary;

  const updatedPlan = await plan.save();

  res.status(200).json({
    success: true,
    data: updatedPlan
  });
};

// @desc    Get city estimates
// @route   GET /api/v1/city-estimates?city=mumbai
// @access  Public
// OLD CODE: previous city estimate logic
// export const getCityEstimates = (req, res) => {
//   let { city } = req.query;
//   
//   if (!city) {
//     return res.status(200).json({ success: true, data: cityEstimates.tier2_default });
//   }
// 
//   const normalizedCity = city.trim().toLowerCase();
//   const estimate = cityEstimates[normalizedCity] || cityEstimates.tier2_default;
// 
//   res.status(200).json({
//     success: true,
//     data: estimate,
//     fallbackUsed: !cityEstimates[normalizedCity],
//     disclaimer: 'These are illustrative local estimates based on static sample data. Please edit them to match your actual situation.'
//   });
// };
// REASON FOR CHANGE: Update city estimates API to explicitly return source, isFallback, isEstimate, and message as required by Correction 2.
export const getCityEstimates = (req, res) => {
  let { city } = req.query;
  
  if (!city) {
    return res.status(200).json({
      city: 'Unknown',
      source: 'tier2_default',
      isFallback: true,
      isEstimate: true,
      message: 'General Tier 2 city estimate only. Please adjust the values based on your actual expenses.',
      estimates: cityEstimates.tier2_default.estimates
    });
  }

  const normalizedCity = city.trim().toLowerCase();
  const estimate = cityEstimates[normalizedCity];

  if (estimate) {
    res.status(200).json({
      city: estimate.city,
      source: 'city_estimates',
      isFallback: false,
      isEstimate: true,
      message: 'These are general estimates. Actual expenses may vary.',
      estimates: estimate.estimates
    });
  } else {
    res.status(200).json({
      city: city,
      source: 'tier2_default',
      isFallback: true,
      isEstimate: true,
      message: 'General Tier 2 city estimate only. Please adjust the values based on your actual expenses.',
      estimates: cityEstimates.tier2_default.estimates
    });
  }
};
