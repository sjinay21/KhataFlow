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
