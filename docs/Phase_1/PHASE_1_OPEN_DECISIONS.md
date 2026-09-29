# Phase 1: Open Decisions Requiring Approval

## 1. Final Typography / Font Family
- **Consideration**: Inter or Geist may be considered.
- **Loading Method**: The font loading method is still pending approval. External font requests are not allowed without explicit approval. Google Fonts must not be imported without explicit approval.
- **Fallback**: A local or system-safe fallback strategy must be considered.
- **Phase 2 Limit**: No external font resource may be used during Phase 2 without approval.
- **Approval Required**: Please decide the final font family and loading method (local vs system fonts).

## 2. Component Library & Material UI
- **Recommendation**: Rely exclusively on Tailwind CSS and build local reusable components.
- **Rule**: Material UI is NOT approved. Material UI cannot be installed or used unless the project owner explicitly approves it after reviewing the exact need, alternatives, advantages, disadvantages, dependency impact, bundle-size impact, and design-system impact. (https://mui.com/material-ui/)
- **Approval Required**: Please confirm we will NOT use Material UI or any other third-party component library.

## 3. Expense Categories
- **Recommendation**: Provide a fixed list of common categories (Food, Rent, Utilities, Transport, Shopping, Healthcare, Entertainment, Other).
- **Reason**: Simplifies MVP database design and reporting.
- **Alternative**: Allow users to create custom categories (adds complexity).
- **Approval Required**: Do you approve starting with a fixed category list for the MVP?

## 4. Local Estimate Data Storage
- **Recommendation**: Store local estimate data (city costs) in a static JSON configuration file within the codebase rather than a MongoDB collection.
- **Reason**: The data is static, doesn't change per user, and reduces database calls.
- **Alternative**: A dedicated `cityCostPresets` MongoDB collection.
- **Approval Required**: Do you approve using a local JSON file for city cost presets?

## 5. Budget Allocation Model
- **Recommendation**: Allow custom allocation (user types in the exact amount they want for each category), rather than enforcing a strict 50/30/20 rule.
- **Reason**: Users have vastly different financial situations; enforcing a generic rule feels prescriptive rather than helpful.
- **Approval Required**: Do you approve a custom, user-defined allocation approach?

## 6. Icons
- **Recommendation**: Use `lucide-react`.
- **Status**: NOT approved. Requires explicit approval.
- **Approval Required**: Do you approve installing `lucide-react` in the future frontend phase?

## 7. Form and Validation Libraries
- **Recommendation**: Use `react-hook-form` and `zod` for the frontend.
- **Status**: NOT approved. Requires explicit approval.
- **Approval Required**: Do you approve these libraries for future phases, or should we use raw React state?

## Strict Third-Party Dependency Rules Reminder
The following are NOT approved and require explicit approval before installation or use: `lucide-react`, `react-hook-form`, `zod`, SWR, React Query, Jest, React Testing Library, any chart library, any animation library, any date-picker library, any table library, and any UI component library. Each package requires separate explicit approval documenting its purpose, alternatives, advantages, disadvantages, dependency impact, and security/privacy considerations.

## 8. Exact Route Names
- **Recommendation**: `/dashboard`, `/plan`, `/expenses`, `/reports`, `/goals`.
- **Approval Required**: Are these exact route names acceptable?

## 9. Separation of Planned Savings and Goal Contributions
- **Recommendation**: Keep them separate. "Planned Savings" is general buffer money; "Goal Contributions" are strictly tied to a created goal.
- **Approval Required**: Do you approve keeping these concepts separate?
