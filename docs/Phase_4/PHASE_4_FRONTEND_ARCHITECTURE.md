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
