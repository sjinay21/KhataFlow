import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true, min: 0 },
  monthsToGoal: { type: Number, required: true, min: 1 },
  monthlyContribution: { type: Number, required: true, min: 0 },
});

const allocationSchema = new mongoose.Schema({
  categoryId: { type: String, required: true },
  categoryLabel: { type: String },
  group: { type: String },
  recommendedPercentage: { type: Number, required: true, min: 0, max: 100 },
  userAdjustedPercentage: { type: Number, required: true, min: 0, max: 100 },
  recommendedAmount: { type: Number, required: true, min: 0 },
  userAdjustedAmount: { type: Number, required: true, min: 0 },
});

const financialPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    currency: { type: String, default: 'INR' },
    city: { type: String, trim: true },
    locality: { type: String, trim: true },
    housingType: { type: String, trim: true },
    employmentType: { type: String, trim: true },
    dependents: { type: Number, default: 0, min: 0 },

    income: {
      monthlySalary: { type: Number, required: true, min: 1 },
      otherIncome: { type: Number, default: 0, min: 0 },
      totalIncome: { type: Number, required: true, min: 1 },
    },

    plannedExpenses: {
      rent: { type: Number, default: 0, min: 0 },
      emi: { type: Number, default: 0, min: 0 },
      utilities: { type: Number, default: 0, min: 0 },
      familyContribution: { type: Number, default: 0, min: 0 },
      food: { type: Number, default: 0, min: 0 },
      transport: { type: Number, default: 0, min: 0 },
      healthcare: { type: Number, default: 0, min: 0 },
      education: { type: Number, default: 0, min: 0 },
      insurance: { type: Number, default: 0, min: 0 },
      mobileInternet: { type: Number, default: 0, min: 0 },
      lifestyle: { type: Number, default: 0, min: 0 },
      shopping: { type: Number, default: 0, min: 0 },
      otherRecurring: { type: Number, default: 0, min: 0 },
    },

    financialPriorities: {
      emergencyFundTarget: { type: Number, default: 0, min: 0 },
      emergencyFundContribution: { type: Number, default: 0, min: 0 },
      generalSavings: { type: Number, default: 0, min: 0 },
      investments: { type: Number, default: 0, min: 0 },
      debtRepayment: { type: Number, default: 0, min: 0 },
    },

    goalDetails: [goalSchema],

    selectedModel: {
      type: String,
      required: true,
      enum: ['option_a', 'option_b', 'option_c', 'option_d'],
    },

    allocations: [allocationSchema],

    calculatedSummary: {
      totalPercentage: { type: Number, required: true, min: 0, max: 100 },
      remainingPercentage: { type: Number, required: true, min: 0, max: 100 },
      totalAllocatedAmount: { type: Number, required: true, min: 0 },
      remainingAmount: { type: Number, required: true, min: 0 },
      totalPlannedExpenses: { type: Number, default: 0, min: 0 },
      totalPlannedSavings: { type: Number, default: 0, min: 0 },
      totalPlannedInvestments: { type: Number, default: 0, min: 0 },
      totalEmergencyFund: { type: Number, default: 0, min: 0 },
      totalGoalContribution: { type: Number, default: 0, min: 0 },
      totalDebtRepayment: { type: Number, default: 0, min: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const FinancialPlan = mongoose.model('FinancialPlan', financialPlanSchema);

export default FinancialPlan;
