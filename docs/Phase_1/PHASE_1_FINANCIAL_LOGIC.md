# Phase 1: Financial Logic Plan

## 1. Salary Income
- **Formula Name**: Salary Income
- **Explanation**: The user's primary monthly take-home pay.

## 2. Other Income
- **Formula Name**: Other Income
- **Explanation**: Additional steady income (e.g., side hustle, rental).

## 3. Total Income
- **Formula Name**: Total Income
- **Formula**: `Total Income = Salary Income + Other Income`
- **Explanation**: The absolute total cash entering the user's control in a given month.
- **Example**: 50,000 + 5,000 = 55,000.

## 4. Planned Expenses
- **Formula Name**: Planned Expenses
- **Explanation**: The estimated budget allocated to specific categories (e.g., Rent, Food) during the Plan My Money phase.

## 5. Total Planned Expenses
- **Formula Name**: Total Planned Expenses
- **Formula**: `Total Planned Expenses = Sum(All Category Planned Amounts)`
- **Explanation**: The sum of everything the user intends to spend.

## 6. Available Planned Balance
- **Formula Name**: Available Planned Balance
- **Formula**: `Available Planned Balance = Total Income - Total Planned Expenses - Planned Savings - Goal Contributions`
- **Explanation**: The money left over in the *plan* after allocating all essential and lifestyle budgets, savings, and goals. Ideally, this should be zero (zero-based budgeting).
- **Negative-value handling**: Shows in red, warning the user their plan exceeds their income.

## 7. Actual Recorded Expenses
- **Explanation**: Individual transactions added by the user throughout the month.

## 8. Total Actual Recorded Expenses
- **Formula Name**: Total Actual Recorded Expenses
- **Formula**: `Total Actual Recorded Expenses = Sum(All Recorded Expenses for the Month)`
- **Explanation**: What has actually been spent so far.

## 9. Remaining Tracked Money
- **Formula Name**: Remaining Tracked Money
- **Formula**: `Remaining Tracked Money = Total Income - Total Actual Recorded Expenses`
- **Explanation**: This is only a tracked estimate based on user-entered records.
- **Label Warning**: The UI must not use "Bank Balance", "Actual Bank Balance", "Current Account Balance", or "Live Balance".
- **Recommended Labels**: "Remaining Tracked Money", "Estimated Remaining Money", or "Tracked Remaining Amount". The application must never claim to know the user's real bank balance.

## 10. Planned Savings
- **Explanation**: Money intentionally set aside outside of specific goals.

## 11. Goal Target Amount
- **Explanation**: The final financial objective for a specific goal.

## 12. Already Saved Amount
- **Explanation**: Money the user already possesses assigned to this goal.

## 13. Remaining Goal Amount
- **Formula Name**: Remaining Goal Amount
- **Formula**: `Remaining Goal Amount = Goal Target Amount - Already Saved Amount`
- **Explanation**: How much is left to save for the goal.

## 14. Months Remaining
- **Formula Name**: Months Remaining
- **Formula**: `Months Remaining = (Target Date - Current Date) in months`
- **Validation**: Cannot be negative.

## 15. Required Monthly Saving
- **Formula Name**: Required Monthly Saving
- **Formula**: `Required Monthly Saving = Remaining Goal Amount / Months Remaining`
- **Validation**: If `Months Remaining` is 0 or negative, formula must display "Target Date Passed" or handle division by zero.

## 16. Budget Versus Actual (Category Level)
- **Formula Name**: Budget Versus Actual
- **Formula**: `Category Remaining = Category Planned Amount - Category Actual Expenses`
- **Negative-value handling**: If negative, user has overspent in this category. UI should flag this in warning/danger colors.

## 17. Goal Progress
- **Formula Name**: Goal Progress
- **Formula**: `Goal Progress (%) = (Already Saved Amount / Goal Target Amount) * 100`

## 18. Actual User-Entered Data vs. Estimate Data
- The application will clearly differentiate between "System Estimates" (e.g., standard city living costs) and "User-Entered Data" (user overrides). Estimates will be clearly labelled.

## 19. Actual Bank Balance
- **Rule**: KhataFlow will **never** calculate or display an "Actual Bank Balance". It will only display a "Remaining Tracked Balance".

## Rules & Edge Cases
- **Negative Values**: Income and expenses must be absolute positive values at input. Subtraction handles the logic.
- **Missing Values**: Treat as `0` for calculations.
- **Zero-value handling**: Handled gracefully. For divisions (like months remaining), prevent division by zero by returning a specific string or capping.
- **Rounding**: Round to the nearest whole integer (Rupee) for clean display, avoiding decimal clutter.
- **Currency**: Displayed in standard Indian format (e.g., 1,00,000) with ₹ symbol.
- **Budget Allocation Rule**: The final allocation model (e.g., custom amounts vs 50/30/20) is pending approval. No strict percentage rules will be hardcoded without approval.
