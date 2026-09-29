# Phase 4 Financial Formulas

## 1. Total Income
`Total Monthly Income = Monthly take-home salary + Other monthly income`

## 2. Percentage Allocation Formula
`Allocation Amount = (Total Monthly Income × Category Percentage) / 100`

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
- Income: ₹50,000
- Option A (50/30/20) selected.
- Needs (50%): ₹25,000
- Wants (30%): ₹15,000
- Savings (20%): ₹10,000
- Total: 100% (Valid).
- Remaining: ₹0.

## 10. Edge Cases
- **Zero Income:** Percentage calculations evaluate to ₹0. Division by zero must be guarded if calculating backwards.
- **Negative Values:** Income and Percentages cannot be negative. Backend must reject.
- **Extreme Wealth:** Numbers exceeding standard 32-bit integers should be handled safely (JavaScript natively handles up to `Number.MAX_SAFE_INTEGER`).

## 11. Formula Alternatives Requiring Owner Approval
- Should total percentage be strictly capped at 100%, or can users save a plan at 85% and leave 15% undefined?
- How should bonuses (one-time income) be handled versus recurring monthly income?
