# Phase 4 Data Model

## 1. MongoDB Collection Proposals

### Option 1: Everything inside the `User` document
- **Advantages:** Single database query. Simplest implementation.
- **Disadvantages:** Poor scalability. `User` document becomes massive and bloated. Hard to version plans.
- **Suitability:** Not recommended for an app tracking financial history.

### Option 2: Separate `FinancialProfile` collection
- **Advantages:** Keeps auth data clean. Good for global settings (currency, city).
- **Disadvantages:** Combines static profile data with volatile planning data.

### Option 3: Separate `FinancialPlan` collection (RECOMMENDED)
- **Advantages:** Excellent scalability. Keeps Auth clean. Allows easy versioning (user can have multiple plans over time, with one marked "active"). Supports future integration with Expenses and Goals perfectly.
- **Disadvantages:** Requires an extra query (minor overhead).

### Option 4: Separate `SalaryAllocation` collection
- **Advantages:** Highly normalized.
- **Disadvantages:** Over-engineered. Allocations are essentially just arrays inside a Financial Plan.

### Recommended Approach
**Option 3 (Separate `FinancialPlan` collection).** It offers the best balance of scalability, versioning support, and clean separation of concerns.

## 2. FinancialPlan Schema Design

```javascript
const FinancialPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  version: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
  
  // Basic Financial Info
  currency: { type: String, default: 'INR' },
  city: { type: String },
  locality: { type: String },
  housingType: { type: String },
  employmentType: { type: String },
  dependents: { type: Number, default: 0 },
  
  // Income
  monthlySalary: { type: Number, required: true },
  otherIncome: { type: Number, default: 0 },
  totalIncome: { type: Number, required: true }, // Derived
  
  // User Inputs / Overrides (Planned Expenses)
  plannedExpenses: {
    rent: { type: Number, default: 0 },
    emi: { type: Number, default: 0 },
    utilities: { type: Number, default: 0 },
    // ...other specific expense fields
  },
  
  // Model & Allocation
  selectedModel: { type: String, enum: ['OPTION_A', 'OPTION_B', 'OPTION_C', 'OPTION_D'], required: true },
  
  // The actual allocation buckets
  allocations: [{
    category: { type: String, required: true }, // e.g., "Needs", "Wants", "Savings", "Emergency", "Debt"
    recommendedPercentage: { type: Number, required: true },
    userAdjustedPercentage: { type: Number, required: true },
    recommendedAmount: { type: Number, required: true },
    userAdjustedAmount: { type: Number, required: true }
  }],
  
  // Derived Calculation Summaries
  calculatedSummary: {
    totalPercentage: { type: Number },
    remainingAmount: { type: Number },
    totalPlannedSavings: { type: Number },
    totalPlannedExpenses: { type: Number }
  }
}, { timestamps: true });
```

## 3. Data Flow Separation
- **User Inputs:** `monthlySalary`, `plannedExpenses`.
- **System Recommendations:** `selectedModel`, `allocations.recommendedPercentage`.
- **User Overrides:** `allocations.userAdjustedPercentage`.
- **Derived Calculations:** `totalIncome`, `allocations.*Amount`, `calculatedSummary`.

## 4. Owner Approval Required
- Do we support multiple historical plans (versioning), or do we just overwrite a single document per user?
- Should `EmergencyFund` and `GoalContributions` be distinct embedded documents, or just items in the `allocations` array?
