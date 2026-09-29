# Phase 4 User Flow

## 1. Complete Onboarding Flow
The user will be guided through a multi-step process to create their financial plan.

### Step 1 — Basic financial information
- City or locality (string)
- Employment type (dropdown: Salaried, Business, Freelance, etc.)
- Monthly take-home salary (numeric)
- Other monthly income (numeric)
- Number of dependents (numeric)
- Currency (default: INR)

### Step 2 — Living situation
- Housing type (Rented house, Own house, PG, Living with family)
- Rent / EMI / Utilities / Family contribution (numeric fields)

### Step 3 — Current and planned expenses
- Food and groceries
- Transport
- Healthcare
- Education
- Insurance
- Mobile and internet
- Lifestyle & Entertainment
- Shopping
- Other recurring expenses

### Step 4 — Savings and priorities
- Emergency fund target/contribution
- General savings
- Investments (SIPs, etc.)
- Future goals
- Debt or loan repayment

## 2. Four-Model Selection Flow
### Step 5 — Choose allocation model
Users are presented with four models:
- Option A — Basic Needs, Wants, and Savings
- Option B — Detailed Salary Allocation
- Option C — Configurable Owner-Approved Model
- Option D — User-Personalized Recommendation Model

Each model card displays:
- Model name and short explanation.
- Example categories and example percentages.
- Advantages, Limitations, and Suitable user type.
- Disclaimer (Not financial advice).

## 3. Salary Allocation Screen
### Step 6 — Salary allocation result
The user views the specific calculation for their selected model:
- Displays Total monthly income.
- Lists each category with: Recommended percentage, Recommended amount, User-selected percentage, and Updated amount.
- Displays Total percentage and Remaining unallocated percentage/amount.
- Warning messages if total > 100% or rent > 30% (example).
- Reset-to-recommended action button.

## 4. Review Flow
### Step 7 — Review plan
A comprehensive summary screen:
- Total income, Selected model, Recommended vs User-adjusted allocations.
- Grouped summaries: Planned expenses, Planned savings, Planned investments, Emergency, Goals, Debt.
- Remaining unallocated balance.
- Explicit listing of assumptions and editable values.

## 5. Save and Edit Flow
### Step 8 — Save plan
- User clicks "Save Plan".
- Backend validates the payload.
- System saves the active plan to the database (draft vs active behavior pending owner decision).
- User can return later to edit their active plan, creating a new version or overwriting the existing one.

## 6. Edge Case Flows
- **Error flow:** If backend validation fails (e.g., total > 100%), display safe user-friendly errors on the specific fields.
- **Empty flow:** If income is 0, the system blocks progression or disables percentage calculation.
- **Loading flow:** Skeleton loaders shown during API calls.
- **Authentication flow:** If the token expires during onboarding, save draft (if supported) and redirect to `/login`.
