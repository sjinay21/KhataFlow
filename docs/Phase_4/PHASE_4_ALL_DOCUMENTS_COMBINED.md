# KhataFlow — Phase 4 All Documents Combined

## Table of Contents

- 1. PHASE_4_ACCEPTANCE_CRITERIA.md

- 2. PHASE_4_API_CONTRACT.md

- 3. PHASE_4_BACKEND_ARCHITECTURE.md

- 4. PHASE_4_CITY_ESTIMATE_DESIGN.md

- 5. PHASE_4_DATA_MODEL.md

- 6. PHASE_4_FINANCIAL_FORMULAS.md

- 7. PHASE_4_FRONTEND_ARCHITECTURE.md

- 8. PHASE_4_IMPLEMENTATION_PLAN.md

- 9. PHASE_4_OPEN_DECISIONS.md

- 10. PHASE_4_PLANNING_AUDIT_REPORT.md

- 11. PHASE_4_PLANNING_REPORT.md

- 12. PHASE_4_REQUIREMENTS.md

- 13. PHASE_4_SALARY_ALLOCATION_RULES.md

- 14. PHASE_4_SECURITY_CHECKLIST.md

- 15. PHASE_4_USER_FLOW.md


---

# Source Document 1 — PHASE_4_ACCEPTANCE_CRITERIA.md


# Phase 4 Acceptance Criteria

- [ ] Form flow: User can navigate through all 5 steps of the financial onboarding wizard.
- [ ] Four-model display: Option A, B, C, and D are displayed clearly with descriptions.
- [ ] Model selection: Selecting a model populates the global state with its default recommended percentages.
- [ ] Model comparison: Users can visually compare the 4 models before selecting.
- [ ] Salary input: User can enter monthly salary and other income.
- [ ] Income calculation: Total income is calculated accurately.
- [ ] Percentage allocation: Each category displays its recommended percentage.
- [ ] Total percentage validation: The system correctly identifies if the total exceeds 100%.
- [ ] Recommendation display: The recommended amount in Rupees is displayed accurately based on the percentage.
- [ ] Editable recommendations: The user can manually change the percentage of any editable category.
- [ ] User overrides: Manually changing a percentage instantly recalculates the Rupee amount.
- [ ] Expense planning: User can input their static expenses (rent, food, etc.).
- [ ] Savings planning: Savings percentages are tracked correctly.
- [ ] Investment planning: Investment percentages are tracked correctly.
- [ ] Emergency fund planning: Emergency fund percentages are tracked correctly.
- [ ] Goal contribution planning: Goal percentages are tracked correctly.
- [ ] Debt repayment: Debt EMI is accurately accounted for (as per Owner rules).
- [ ] City estimates: A static file populates default expenses based on the selected city.
- [ ] Save behavior: The system successfully `POST`s the plan to the backend and saves it in MongoDB.
- [ ] Edit behavior: A user can retrieve their active plan and modify it via `PUT`.
- [ ] Authentication: All backend Phase 4 routes require a valid Bearer token.
- [ ] Authorization: A user cannot access or modify a plan belonging to another `userId`.
- [ ] Responsive UI: The entire wizard and model selection screen works on mobile.
- [ ] Error handling: Form validation errors are displayed clearly below inputs.
- [ ] Accessibility: Sliders and forms have proper aria-labels and contrast.
- [ ] Security: Mass assignment is prevented; total percentages are double-checked server-side.
- [ ] Double-counting prevention: Rent/EMI/Debt are not subtracted from total income twice.
- [ ] Frontend/backend/database integration: Complete E2E flow works perfectly.

---

# Source Document 2 — PHASE_4_API_CONTRACT.md


# Phase 4 API Contract

## 1. Overview
This defines the proposed endpoints for managing Financial Plans.
**Calculation Responsibility:** The backend is the absolute source of truth. The frontend performs local calculations for UI responsiveness, but the backend recalculates and validates everything upon saving.

## 2. Endpoints

### `GET /api/v1/financial-plan/models`
- **Method:** GET
- **Auth:** Bearer Token (Required)
- **Description:** Returns the 4 available allocation models and their default rules.
- **Calculation Responsibility:** Backend provides static/configured rules.

### `POST /api/v1/financial-plan/recommendations`
- **Method:** POST
- **Auth:** Bearer Token (Required)
- **Request Body:** `{ monthlySalary, otherIncome, dependents, housingType, city, rent }`
- **Description:** Returns a customized `Option D` recommendation based on user inputs.
- **Calculation Responsibility:** Backend Recommendation Engine.

### `POST /api/v1/financial-plan`
- **Method:** POST
- **Auth:** Bearer Token (Required)
- **Description:** Creates a new financial plan for the user.
- **Request Body:** Full plan data (Income, Selected Model, User Adjusted Percentages, Planned Expenses).
- **Validation:** 
  - Ensure total percentages <= 100 (or exactly 100 based on owner rules).
  - Recalculate amounts based on `(Total Income * userAdjustedPercentage) / 100`.
  - Reject negative incomes or percentages.
- **Ownership Check:** The resulting document is forcefully tagged with `req.user.id`.
- **Success:** 201 Created.

### `GET /api/v1/financial-plan`
- **Method:** GET
- **Auth:** Bearer Token (Required)
- **Description:** Retrieves the active financial plan for the authenticated user.
- **Ownership Check:** `FinancialPlan.findOne({ user: req.user.id, isActive: true })`.
- **Success:** 200 OK.

### `PUT /api/v1/financial-plan/:id`
- **Method:** PUT
- **Auth:** Bearer Token (Required)
- **Path Params:** `id` (Financial Plan ID)
- **Description:** Updates an existing plan. 
- **Ownership Check:** MUST verify `plan.user.toString() === req.user.id`. 
- **Validation:** Same rigorous calculation checks as POST.

### `GET /api/v1/city-estimates`
- **Method:** GET
- **Auth:** Optional / Bearer Token
- **Query Params:** `city`
- **Description:** Returns static, sample estimates for a given city (no external APIs).

## 3. Security & Validation Rules
- **Mass Assignment:** Backend must explicitly pluck allowed fields from `req.body`. Do not pass `req.body` directly to MongoDB.
- **Cross-user Access:** The `id` in the URL parameter must always be cross-checked against `req.user.id`.
- **Status Codes:** 400 (Bad Request / Validation), 401 (Unauthorized / No Token), 403 (Forbidden / Wrong User), 404 (Not Found).

---

# Source Document 3 — PHASE_4_BACKEND_ARCHITECTURE.md


# Phase 4 Backend Architecture

## 1. Controller Structure
- `financialPlanController.js`: Handles incoming HTTP requests for Phase 4.
  - `getModels(req, res)`: Returns static data for the 4 models.
  - `generateRecommendation(req, res)`: Implements the logic for Option D personalization.
  - `createPlan(req, res)`: Validates, recalculates, and saves a new `FinancialPlan`.
  - `getPlan(req, res)`: Fetches the user's active plan.

## 2. Route Structure
- Mounted in `server/src/app.js` as `/api/v1/financial-plan`.
- Router file: `routes/financialPlan.js`.

## 3. Calculation Engine (Service Layer)
- Create `server/src/services/financialCalculationService.js`.
- **Purpose:** Abstract the core math away from the controller.
- **Methods:** 
  - `calculateAmountsFromPercentages(income, allocations)`
  - `validateTotalPercentage(allocations)`
  - `generateOptionD(income, rent, dependents, debt)`

## 4. Validation Middleware
- Must intercept `POST` and `PUT` requests.
- Validate that `monthlySalary` is a positive number.
- Ensure `selectedModel` is one of the 4 allowed Enums.
- Verify `allocations` is an array of objects containing valid numerical percentages.

## 5. Ownership Middleware
- We will reuse the `protect` middleware from Phase 3 (`authMiddleware.js`).
- The `req.user.id` injected by the middleware is the **only** ID trusted when creating or retrieving plans.
- A user cannot pass `userId: <someone_elses_id>` in the body to overwrite another user's plan.

## 6. Error Handling
- Safe error handling using `next(error)` to bubble up to `errorMiddleware.js`.
- Avoid leaking calculation traces. If a validation fails, return exactly which field failed (e.g., `400 Bad Request: "Total percentage exceeds 100%"`).

---

# Source Document 4 — PHASE_4_CITY_ESTIMATE_DESIGN.md


# Phase 4 City Estimate Design

## 1. Core Rule
**No external APIs, no paid services, no live financial data, and no external AI.**
All data must be provided via a local, static JSON file or hardcoded database seed.

## 2. Static Estimate Structure
```json
{
  "cities": {
    "mumbai": {
      "name": "Mumbai",
      "rent": { "bachelor": 25000, "family": 45000 },
      "food": { "bachelor": 8000, "family": 15000 },
      "transport": 4000,
      "utilities": 3000
    },
    "bangalore": {
      "name": "Bangalore",
      "rent": { "bachelor": 18000, "family": 35000 },
      "food": { "bachelor": 7000, "family": 12000 },
      "transport": 3500,
      "utilities": 2500
    },
    "tier2_default": {
      "name": "Other Tier-2 City",
      "rent": { "bachelor": 10000, "family": 18000 },
      "food": { "bachelor": 5000, "family": 9000 },
      "transport": 2000,
      "utilities": 1500
    }
  }
}
```

## 3. City & Locality Handling
- The frontend will offer an autocomplete or dropdown of supported major cities.
- **Unknown City Behavior:** If a user types a city not in the static map, the system falls back to the `tier2_default` or `tier3_default` estimates.
- Locality is captured as a string for the user's reference but does not impact the static estimate map to avoid complexity.

## 4. User Overrides
- The system pre-fills the "Planned Expenses" form with these estimates.
- **Crucial Rule:** The user is completely free to override these estimates. 
- The system saves the user's overridden values in the database, NOT the static estimates.

## 5. Estimate Labels
To protect against liability, the UI must explicitly display:
> *"These are illustrative local estimates based on static sample data. Please edit them to match your actual situation."*

## 6. Implementation
- The estimates can be served via a lightweight backend route `GET /api/v1/city-estimates?city=mumbai` which just reads from a local `utils/cityData.js` file.

---

# Source Document 5 — PHASE_4_DATA_MODEL.md


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

---

# Source Document 6 — PHASE_4_FINANCIAL_FORMULAS.md


# Phase 4 Financial Formulas

## 1. Total Income
`Total Monthly Income = Monthly take-home salary + Other monthly income`

## 2. Percentage Allocation Formula
`Allocation Amount = (Total Monthly Income Ã— Category Percentage) / 100`

## 3. Total Percentage Validation
`Total Allocation Percentage = Sum of all active category user-adjusted percentages`
- **Valid:** Total = 100%
- **Under-allocated:** Total < 100%. (Show warning or allocate remainder to "Flexible/Unallocated").
- **Over-allocated:** Total > 100%. (Show error and prevent saving, pending owner approval).

## 4. Remaining Balance
`Remaining Unallocated Amount = Total Monthly Income - Sum of all category amounts`

## 5. Rounding Rules
- Percentages should be allowed up to 1 decimal place (e.g., 12.5%).
- Allocation Amounts should be rounded to the nearest whole integer (e.g., Math.round) to avoid messy currency decimals, unless the owner approves 2-decimal precision.

## 6. Currency Handling
- Stored as generic numeric values in the database.
- Rendered on the frontend using `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.

## 7. Double-Counting Prevention (Core Rules)
- **Emergency Fund:** Is it part of Savings? *Pending Owner Approval.*
- **Investments:** Is it part of Savings? *Pending Owner Approval.*
- **Debt Repayment:** Treated as a distinct required category (Needs) or a separate category entirely. *Pending Owner Approval.*
- The system must explicitly subtract allocations from a single pool (Total Income). Sub-categories (like SIP under Investments) must sum up to the parent category percentage, rather than subtracting from the total again.

## 8. Goal Formula
`Monthly Goal Contribution = Target Goal Amount / Months to Goal`
*(Note: If the Monthly Goal Contribution exceeds the available Savings allocation, display a warning).*

## 9. Example Calculations
- Income: â‚¹50,000
- Option A (50/30/20) selected.
- Needs (50%): â‚¹25,000
- Wants (30%): â‚¹15,000
- Savings (20%): â‚¹10,000
- Total: 100% (Valid).
- Remaining: â‚¹0.

## 10. Edge Cases
- **Zero Income:** Percentage calculations evaluate to â‚¹0. Division by zero must be guarded if calculating backwards.
- **Negative Values:** Income and Percentages cannot be negative. Backend must reject.
- **Extreme Wealth:** Numbers exceeding standard 32-bit integers should be handled safely (JavaScript natively handles up to `Number.MAX_SAFE_INTEGER`).

## 11. Formula Alternatives Requiring Owner Approval
- Should total percentage be strictly capped at 100%, or can users save a plan at 85% and leave 15% undefined?
- How should bonuses (one-time income) be handled versus recurring monthly income?

---

# Source Document 7 — PHASE_4_FRONTEND_ARCHITECTURE.md


# Phase 4 Frontend Architecture

## 1. Route Structure
- `/plan-my-money`: Main dashboard/intro for Phase 4.
- `/plan-my-money/onboarding`: The multi-step wizard.
- `/plan-my-money/compare`: The 4-model comparison view.
- `/plan-my-money/allocate`: The interactive slider/percentage view.
- `/plan-my-money/review`: Final summary before saving.

## 2. Component Structure
- `Stepper`: Reusable UI component tracking progress (1 to 5).
- `ModelCard`: Displays Option A, B, C, or D details. Highlights the currently selected model.
- `AllocationSlider`: A specialized range input component for adjusting percentages.
- `CategoryRow`: Displays Category Name, Recommended %, Adjusted %, and calculated Amount.
- `FinancialSummaryChart`: (Optional) A simple CSS-based or SVG donut/bar chart showing the breakdown visually.

## 3. State Management
- Given the complexity of a multi-step form, a dedicated React Context (`PlanMyMoneyContext`) or complex `useReducer` hook is highly recommended to manage the transient state before it is saved to the backend.
- `AuthContext` will be consumed to ensure the user is logged in.

## 4. Form Handling & Validation
- Real-time client-side calculation: `(TotalIncome * percentage) / 100`.
- Use standard React controlled components.
- **Validation:** Block the "Next" or "Save" button if `Total Percentage > 100%`.

## 5. Four-Model Selection UI
- A side-by-side (desktop) or stacked (mobile) grid of the four models.
- "Select" buttons on each.
- Clicking a model updates the global state with that model's default percentages.

## 6. Interactive Allocation UI
- Each category has a numerical input for percentage.
- Changing the percentage immediately triggers a `useEffect` or calculation function to update the Rupee amount displayed next to it.
- A "Total Allocated: XX%" progress bar fixed at the bottom or top of the screen. Turns red if >100%.

## 7. UX States
- **Loading:** Use skeleton screens while fetching city estimates or saving.
- **Error:** Clean, accessible red text below inputs for validation failures.
- **Empty:** Income fields default to empty strings, not `0`, to force user interaction.
- **Responsive:** Ensure sliders and side-by-side comparisons stack elegantly on mobile via Tailwind `flex-col` / `md:flex-row`.
- **Accessibility:** Use `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for sliders. Use standard contrasting colors.

---

# Source Document 8 — PHASE_4_IMPLEMENTATION_PLAN.md


# Phase 4 Implementation Plan

**Note:** This plan cannot be executed until the Owner approves the Phase 4 planning documents.

## Step 1: Database Setup
1. Define the `FinancialPlan` Mongoose schema in `server/src/models/FinancialPlan.js`.
2. Define static data arrays for Option A, B, and C rules in a backend utility file.

## Step 2: Backend Core Services
1. Create `financialCalculationService.js` to handle all percentage validation and amount calculations.
2. Build the Option D (Personalization) engine.

## Step 3: Backend Routes & Controllers
1. Create `financialPlanController.js`.
2. Implement `GET /models`, `POST /`, `GET /`, and `PUT /:id`.
3. Mount the routes in `app.js` under `/api/v1/financial-plan`.
4. Create the static `GET /city-estimates` route.

## Step 4: Frontend State & Context
1. Create `client/src/context/PlanMyMoneyContext.jsx` to hold multi-step wizard state.
2. Ensure it pulls authentication state from `AuthContext`.

## Step 5: Frontend UI (Wizard)
1. Build Step 1 (Income).
2. Build Step 2 (Living Situation).
3. Build Step 3 (Expenses).
4. Build Step 4 (Savings & Priorities).

## Step 6: Frontend UI (Models & Allocation)
1. Build Step 5: The Four-Model Comparison UI.
2. Build Step 6: The Salary Allocation Interactive Screen (sliders, amount recalculation).

## Step 7: Frontend UI (Review & Submit)
1. Build Step 7: The Review Summary Screen.
2. Implement the API call to `POST /api/v1/financial-plan`.
3. Handle error states and success redirects.

## Step 8: Final Testing
1. Perform manual E2E test of the entire onboarding wizard.
2. Verify that MongoDB stores the exact expected calculations.
3. Validate security rules (ensure a user cannot access another user's plan).

---

# Source Document 9 — PHASE_4_OPEN_DECISIONS.md


# Phase 4 Open Decisions

**IMPORTANT:** The Project Owner must explicitly approve or decide on the following items before Phase 4 coding begins.

## 1. Percentage Rules & Caps
- **Decision:** Can a user save an incomplete plan (e.g., total allocation equals 85%), or must the system force them to allocate exactly 100% of their income before saving?

## 2. Category Hierarchy (Double Counting)
- **Decision:** Are "Emergency Fund" and "Goal Contributions" considered sub-categories of "Savings", or are they entirely separate top-level categories that subtract from Total Income?
- **Decision:** Is "Debt Repayment" a distinct category, or part of "Needs"?

## 3. Four-Model Specifics
- **Option A (Needs/Wants/Savings):** Confirm the exact default percentages to present (e.g., 50/30/20).
- **Option B (Detailed):** Confirm the exact breakdown of the 11 proposed sub-categories.
- **Option C (Configurable Owner Model):** What are the exact default percentages and rules the owner wishes to enforce for this model?
- **Option D (Personalized):** What exact formulas should scale the percentages? (e.g., "If rent > 30% of income, reduce Wants by X%").

## 4. UI/UX Rules
- **Decision:** Can users freely switch between the 4 models *after* they have saved a plan, or does selecting a new model overwrite/version the plan?
- **Decision:** Do we maintain a history of plans (Versioning), or just overwrite the active plan?

## 5. Currency Handling
- **Decision:** Should we strictly round all calculated allocation amounts to the nearest whole integer (recommended for INR/clean UI), or allow 2 decimal places?

## 6. City Estimates
- **Decision:** Do you approve the use of a hardcoded JSON static file for city estimates (to strictly avoid external APIs)?

## 7. Temporary Dashboard
- **Decision:** Confirm that the `/dashboard` will remain a Phase 3 authentication placeholder for now, and Phase 4 will be built in a dedicated `/plan-my-money` route structure.

---

# Source Document 10 — PHASE_4_PLANNING_AUDIT_REPORT.md


# Phase 4 Planning Audit Report

1. All Phase 4 documents were created: **PASS**
2. All four allocation models were documented: **PASS**
3. All four models are planned as user-selectable frontend options: **PASS**
4. Frontend implementation planning exists: **PASS**
5. Backend implementation planning exists: **PASS**
6. Database planning exists: **PASS**
7. Calculation engine planning exists: **PASS**
8. Percentage formulas were documented: **PASS**
9. Total percentage validation was documented: **PASS**
10. Editable percentage behavior was documented: **PASS**
11. User override behavior was documented: **PASS**
12. Double-counting risks were documented: **PASS**
13. Savings, investments, emergency funds, goals, and debt were separated: **PASS**
14. Formula decisions requiring owner approval were identified: **PASS**
15. Database decisions requiring owner approval were identified: **PASS**
16. API decisions requiring owner approval were identified: **PASS**
17. Frontend decisions requiring owner approval were identified: **PASS**
18. Security requirements were documented: **PASS**
19. Phase 3 dependency was identified: **PASS**
20. No Phase 4 code was implemented: **PASS**
21. No package was installed: **PASS**
22. No Phase 5 work was started: **PASS**
23. Combined document contains all Phase 4 documents: **PASS** (Generated automatically)
24. Acceptance criteria remain unchecked: **PASS**
25. No existing Phase 3 document was deleted: **PASS**
26. No existing code line was silently removed: **NOT APPLICABLE** (No code was modified in this planning phase).
27. No secrets were exposed: **PASS**

---

# Source Document 11 — PHASE_4_PLANNING_REPORT.md


# Phase 4 Planning Report

## 1. Files Inspected
- `server/src/app.js`
- `client/src/app/dashboard/page.jsx`
- `docs/Phase_3/*`
- Verified that Phase 3 is implemented up to the E2E blocked state. Phase 4 has unequivocally not started.

## 2. Phase 3 Dependency Status
- Phase 4 completely depends on Phase 3 Authentication (`authMiddleware.js`).
- The `req.user.id` from the decoded JWT is mandatory for all Phase 4 backend endpoints.

## 3. Planning Work Completed
- **Four-model planning completed:** Options A, B, C, and D are fully planned as selectable UI components.
- **Frontend planning completed:** Defined the Stepper wizard, form inputs, validation, and dynamic recalculations.
- **Backend planning completed:** Defined validation middleware, controllers, routes, and a distinct calculation service.
- **Database planning completed:** Chose a highly scalable, separate `FinancialPlan` collection instead of bloating the User model.
- **Calculation engine planning completed:** Outlined percentage formulas, total percentage validation, and exact calculation triggers.
- **Salary allocation planning completed:** Addressed handling needs, wants, savings, debt, and double-counting risks.

## 4. Documents Created
1. `PHASE_4_REQUIREMENTS.md`
2. `PHASE_4_USER_FLOW.md`
3. `PHASE_4_FINANCIAL_FORMULAS.md`
4. `PHASE_4_SALARY_ALLOCATION_RULES.md`
5. `PHASE_4_DATA_MODEL.md`
6. `PHASE_4_API_CONTRACT.md`
7. `PHASE_4_CITY_ESTIMATE_DESIGN.md`
8. `PHASE_4_FRONTEND_ARCHITECTURE.md`
9. `PHASE_4_BACKEND_ARCHITECTURE.md`
10. `PHASE_4_SECURITY_CHECKLIST.md`
11. `PHASE_4_IMPLEMENTATION_PLAN.md`
12. `PHASE_4_OPEN_DECISIONS.md`
13. `PHASE_4_ACCEPTANCE_CRITERIA.md`
14. `PHASE_4_PLANNING_REPORT.md`
15. `PHASE_4_ALL_DOCUMENTS_COMBINED.md`
16. `PHASE_4_PLANNING_AUDIT_REPORT.md`

## 5. Decisions Already Approved
- No new packages will be installed (unless authorized).
- Phase 3 Auth strategy (LocalStorage Bearer Token) remains unchanged.
- City estimates will use a static file (no external APIs).

## 6. Decisions Awaiting Owner Approval
- (See `PHASE_4_OPEN_DECISIONS.md` for the full list of calculation rules, caps, and exact percentages).

## 7. Risks & Assumptions
- **Risk:** Calculating floating-point percentages can result in JavaScript rounding errors (e.g., `33.33333...`).
- **Assumption:** We will use `Math.round()` to force strict integer Rupee amounts unless explicitly requested otherwise.
- **Risk:** Double-counting EMI and Debt. Careful categorization logic is required.

## 8. Confirmations
- **Confirmation:** No implementation was performed.
- **Confirmation:** No package was installed.
- **Confirmation:** Phase 5 was not started.

---

# Source Document 12 — PHASE_4_REQUIREMENTS.md


# Phase 4 Requirements

## 1. Problem Statement
Users lack a standardized, understandable, and customizable way to allocate their monthly salary into needs, wants, savings, investments, and other categories. KhataFlow must provide actionable models that help users plan their money intelligently without being overly rigid.

## 2. Goals
- Provide four user-selectable salary allocation models.
- Clearly present advantages, limitations, and suitability for each model.
- Automatically calculate category amounts based on user income and selected percentages.
- Allow users to edit recommendations (where allowed) and see real-time recalculations.
- Safely persist the user's selected model and preferences to MongoDB.

## 3. Non-goals
- We are not providing professional financial, legal, or tax advice (must include disclaimers).
- No implementation of Phase 5 (Expense Tracking) in this phase.
- No integration of live bank APIs or external financial services.
- No external UI libraries (stick to Tailwind and existing components).

## 4. User Stories
- As a user, I want to enter my monthly income so that the system can calculate my allocations.
- As a user, I want to compare different allocation models so I can pick the one that fits my lifestyle.
- As a user, I want to override default percentages so my specific rent or loan EMI is accurately reflected.
- As a user, I want to save my financial plan so I can refer back to it later.

## 5. Functional Requirements
- The frontend must present a stepper/wizard for onboarding financial info.
- The system must validate total percentage (must not exceed 100% unless explicitly permitted).
- The system must display remaining unallocated percentages and amounts.
- Four models must be fully integrated across frontend, backend, and database.

## 6. Non-functional Requirements
- **Performance**: Recalculations of percentages/amounts must happen instantly on the client side.
- **Responsiveness**: The UI must work flawlessly on mobile and desktop.
- **Security**: The user's financial plan must be linked strictly to their JWT Bearer Token ID. Users cannot access or modify plans belonging to others.

## 7. Four User-Selectable Allocation Models
1. **Option A â€” Basic Needs, Wants, and Savings Model**: A simple 3-category split (e.g., 50/30/20).
2. **Option B â€” Detailed Salary Allocation Model**: A granular breakdown covering rent, food, health, savings, etc.
3. **Option C â€” Configurable Owner-Approved Recommendation Model**: A model driven by default percentages stored as configurable rules.
4. **Option D â€” User-Personalized Recommendation Model**: A dynamic model that shifts percentages based on user inputs (e.g., high rent, dependents).

## 8. Frontend Requirements
- Must use Next.js, React, and Tailwind CSS.
- Create a Model Selection Screen, Comparison Cards, and Editable Percentage Controls.
- Display "Suggested allocation" and "Not financial advice" disclaimers.
- Must preserve Phase 3 authentication state (LocalStorage Bearer Token).

## 9. Backend Requirements
- Must validate model selection and incoming percentages.
- Must perform server-side calculations to ensure data integrity before saving to MongoDB.
- Ensure strict user ownership (via `req.user.id`).

## 10. Database Requirements
- Must store the user's selected model, recommended percentages, user-adjusted percentages, and calculated amounts.
- Support versioning and timestamps for future auditing.

## 11. Calculation Engine Requirements
- Handle rounding safely.
- Avoid double-counting (e.g., treating an Emergency Fund both as an expense and a savings category simultaneously without clear rules).
- Support zero or missing optional income.

## 12. Phase 3 Dependency
- Phase 4 completely depends on Phase 3 (Authentication).
- User identification relies on the JWT decoded from the `Authorization: Bearer <token>` header.

## 13. Acceptance Criteria
- (See `PHASE_4_ACCEPTANCE_CRITERIA.md` for full testable criteria).

---

# Source Document 13 — PHASE_4_SALARY_ALLOCATION_RULES.md


# Phase 4 Salary Allocation Rules

## 1. Purpose of Salary Allocation
To provide users with structured, easy-to-understand methodologies for dividing their monthly income into sustainable categories, ensuring needs are met, debt is managed, and wealth is built.

## 2. Four Allocation Models

### OPTION A â€” Basic Needs, Wants, and Savings Model
- **Example:** Needs 50%, Wants 30%, Savings 20%.
- **Suitable For:** Beginners, young professionals, people wanting strict simplicity.
- **Limitations:** Doesn't separate debt or emergency funds explicitly.
- **Double-counting risk:** Users might count EMI under Needs and again under a separate Debt category.

### OPTION B â€” Detailed Salary Allocation Model
- **Example:** Rent 25%, Food 10%, Transport 5%, Utilities 5%, Healthcare 5%, Lifestyle 10%, Emergency 10%, Savings 10%, Investments 10%, Goals 5%, Flexible 5%.
- **Suitable For:** Advanced planners who want every rupee accounted for.
- **Limitations:** Too rigid for fluctuating incomes; overwhelming for beginners.
- **Double-counting risk:** Reduced, as categories are highly specific.

### OPTION C â€” Configurable Owner-Approved Recommendation Model
- **Rules:** The project owner configures the exact default percentages and categories.
- **Categories:** Needs, Wants, Savings, Investments, Emergency, Goals, Debt, Flexible.
- **Behavior:** The system enforces the owner's exact vision. Users can tweak percentages, but the baseline is strictly dictated by system rules.

### OPTION D â€” User-Personalized Recommendation Model
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

---

# Source Document 14 — PHASE_4_SECURITY_CHECKLIST.md


# Phase 4 Security Checklist

## 1. Authentication & Authorization
- [ ] Phase 3 `protect` middleware is actively applied to all Phase 4 routes (except static city estimates).
- [ ] `FinancialPlan` queries strictly filter by `user: req.user.id`.
- [ ] Cross-user access is impossible (User A cannot GET/PUT User B's plan).

## 2. Validation & Math Integrity
- [ ] Backend does NOT trust frontend calculated amounts. It recalculates amounts using the frontend's provided percentages and income.
- [ ] Percentages are validated to ensure they are >= 0 and <= 100.
- [ ] Total allocation percentage is strictly validated against the owner-approved cap (100%).
- [ ] Division by zero is safely handled if calculating backwards.

## 3. Mass Assignment
- [ ] `req.body` is destructured safely.
- [ ] Users cannot inject `{ isActive: true }` over someone else's plan version.
- [ ] Users cannot inject arbitrary fields into the MongoDB document.

## 4. Data Privacy & Logging
- [ ] No sensitive financial data (salary, specific expenses) is dumped into console logs or error logs.
- [ ] `server/.env` continues to securely hold the DB connection and JWT secrets without exposure.

## 5. Double-Counting Prevention
- [ ] The schema correctly separates distinct categories to prevent the user from subtracting the same debt EMI twice.

---

# Source Document 15 — PHASE_4_USER_FLOW.md


# Phase 4 User Flow

## 1. Complete Onboarding Flow
The user will be guided through a multi-step process to create their financial plan.

### Step 1 â€” Basic financial information
- City or locality (string)
- Employment type (dropdown: Salaried, Business, Freelance, etc.)
- Monthly take-home salary (numeric)
- Other monthly income (numeric)
- Number of dependents (numeric)
- Currency (default: INR)

### Step 2 â€” Living situation
- Housing type (Rented house, Own house, PG, Living with family)
- Rent / EMI / Utilities / Family contribution (numeric fields)

### Step 3 â€” Current and planned expenses
- Food and groceries
- Transport
- Healthcare
- Education
- Insurance
- Mobile and internet
- Lifestyle & Entertainment
- Shopping
- Other recurring expenses

### Step 4 â€” Savings and priorities
- Emergency fund target/contribution
- General savings
- Investments (SIPs, etc.)
- Future goals
- Debt or loan repayment

## 2. Four-Model Selection Flow
### Step 5 â€” Choose allocation model
Users are presented with four models:
- Option A â€” Basic Needs, Wants, and Savings
- Option B â€” Detailed Salary Allocation
- Option C â€” Configurable Owner-Approved Model
- Option D â€” User-Personalized Recommendation Model

Each model card displays:
- Model name and short explanation.
- Example categories and example percentages.
- Advantages, Limitations, and Suitable user type.
- Disclaimer (Not financial advice).

## 3. Salary Allocation Screen
### Step 6 â€” Salary allocation result
The user views the specific calculation for their selected model:
- Displays Total monthly income.
- Lists each category with: Recommended percentage, Recommended amount, User-selected percentage, and Updated amount.
- Displays Total percentage and Remaining unallocated percentage/amount.
- Warning messages if total > 100% or rent > 30% (example).
- Reset-to-recommended action button.

## 4. Review Flow
### Step 7 â€” Review plan
A comprehensive summary screen:
- Total income, Selected model, Recommended vs User-adjusted allocations.
- Grouped summaries: Planned expenses, Planned savings, Planned investments, Emergency, Goals, Debt.
- Remaining unallocated balance.
- Explicit listing of assumptions and editable values.

## 5. Save and Edit Flow
### Step 8 â€” Save plan
- User clicks "Save Plan".
- Backend validates the payload.
- System saves the active plan to the database (draft vs active behavior pending owner decision).
- User can return later to edit their active plan, creating a new version or overwriting the existing one.

## 6. Edge Case Flows
- **Error flow:** If backend validation fails (e.g., total > 100%), display safe user-friendly errors on the specific fields.
- **Empty flow:** If income is 0, the system blocks progression or disables percentage calculation.
- **Loading flow:** Skeleton loaders shown during API calls.
- **Authentication flow:** If the token expires during onboarding, save draft (if supported) and redirect to `/login`.

---

