# Phase 4 Salary Allocation Rules

## 1. Purpose of Salary Allocation
To provide users with structured, easy-to-understand methodologies for dividing their monthly income into sustainable categories, ensuring needs are met, debt is managed, and wealth is built.

## 2. Four Allocation Models

### OPTION A — Basic Needs, Wants, and Savings Model
- **Example:** Needs 50%, Wants 30%, Savings 20%.
- **Suitable For:** Beginners, young professionals, people wanting strict simplicity.
- **Limitations:** Doesn't separate debt or emergency funds explicitly.
- **Double-counting risk:** Users might count EMI under Needs and again under a separate Debt category.

### OPTION B — Detailed Salary Allocation Model
- **Example:** Rent 25%, Food 10%, Transport 5%, Utilities 5%, Healthcare 5%, Lifestyle 10%, Emergency 10%, Savings 10%, Investments 10%, Goals 5%, Flexible 5%.
- **Suitable For:** Advanced planners who want every rupee accounted for.
- **Limitations:** Too rigid for fluctuating incomes; overwhelming for beginners.
- **Double-counting risk:** Reduced, as categories are highly specific.

### OPTION C — Configurable Owner-Approved Recommendation Model
- **Rules:** The project owner configures the exact default percentages and categories.
- **Categories:** Needs, Wants, Savings, Investments, Emergency, Goals, Debt, Flexible.
- **Behavior:** The system enforces the owner's exact vision. Users can tweak percentages, but the baseline is strictly dictated by system rules.

### OPTION D — User-Personalized Recommendation Model
- **Rules:** Suggested allocations shift dynamically.
  - *High Rent Behavior:* If Rent > 30% of income, reduce Wants and warn the user.
  - *Debt Behavior:* If user has EMI, dynamically allocate a distinct "Debt Repayment" category and reduce Savings/Wants.
  - *Dependents Behavior:* Increase Needs baseline by 5% per dependent.
- **Disclaimer:** Explicitly state "This is an illustrative starting point, not financial advice."

## 3. General Rules & Disclaimers
- **Editable Percentages:** Users MUST be able to edit percentages across all models, provided the total validates.
- **Total Percentage Validation:** Must equal 100% or less (depending on owner approval for under-allocation).
- **Amount Calculation:** Derived strictly from `(Total Income * User Percentage) / 100`.
- **Financial Disclaimer:** "Suggested allocation. Recommended starting point. Illustrative plan. Not financial advice."

## 4. Frontend & Backend Behavior
- **Frontend:** Instantly recalculates amounts when sliders/inputs change. Provides visual warnings for high debt/rent.
- **Backend:** Recalculates and verifies the math before saving. Does not blindly trust the frontend amounts.
- **Database Storage:** Stores both `recommended_percentages` (for historical tracking of the baseline) and `user_adjusted_percentages` (the actual applied plan).

## 5. Decisions Requiring Owner Approval
- Final baseline percentages for Options A and B.
- Exact categories and logic for Option C.
- The specific scaling rules (rent thresholds, dependent impact) for Option D.
- Whether a user is allowed to save a plan that totals less than 100%.
