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
1. **Option A — Basic Needs, Wants, and Savings Model**: A simple 3-category split (e.g., 50/30/20).
2. **Option B — Detailed Salary Allocation Model**: A granular breakdown covering rent, food, health, savings, etc.
3. **Option C — Configurable Owner-Approved Recommendation Model**: A model driven by default percentages stored as configurable rules.
4. **Option D — User-Personalized Recommendation Model**: A dynamic model that shifts percentages based on user inputs (e.g., high rent, dependents).

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
