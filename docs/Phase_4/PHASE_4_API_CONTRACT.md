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
