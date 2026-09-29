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
