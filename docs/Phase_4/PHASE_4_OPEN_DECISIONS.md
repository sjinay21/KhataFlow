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
