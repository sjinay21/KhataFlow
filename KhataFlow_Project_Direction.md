# KhataFlow — Product Direction and Development Roadmap

## 1. Project Overview

KhataFlow is a responsive personal-finance web application inspired by the simplicity of a digital Khata book.

It combines:

- Personal income tracking
- Monthly salary planning
- Expense management
- Budget planning
- Future financial goals
- Monthly reports
- Simple financial insights

KhataFlow is a normal web application. It is not a native desktop application or native mobile application.

The product should feel professional, calm, trustworthy, modern, and easy to use.

---

## 2. Working Method

The human user will not write the application code manually.

The human user will:

1. Discuss product decisions with the project lead.
2. Receive a clear implementation prompt.
3. Paste the prompt into the Antigravity agent.
4. Review the result.
5. Report issues or screenshots.
6. Continue to the next phase only after approval.

Antigravity must perform the actual implementation.

The project lead must provide:

- Clear phase-by-phase instructions
- Copy-paste-ready prompts
- Design direction
- Architecture decisions
- Review checklists
- Corrections when Antigravity produces weak or generic results

Do not jump to later phases without completing and reviewing the current phase.

---

## 3. Product Vision

KhataFlow should help a person answer these questions quickly:

- How much money do I receive every month?
- How much do I need for essential expenses?
- How much can I spend on lifestyle and wants?
- How much can I save or invest?
- Where is my money going?
- Am I following my plan?
- What progress am I making toward my future goals?

The experience should be simpler than a complicated accounting application.

It should feel like a personal financial companion, not an enterprise accounting system.

---

## 4. Technology Stack

### Frontend

- Next.js
- React
- Responsive web design
- Modern component-based architecture

### Backend

- Node.js
- Express.js
- REST API architecture

### Database

- MongoDB

### Authentication

- JWT
- bcrypt
- Secure password handling
- Protected routes
- User ownership validation

### Development Approach

- Frontend and backend should remain clearly separated.
- Use reusable components.
- Use clean folder structure.
- Keep business logic separate from route handlers.
- Use environment variables for secrets.
- Do not store plaintext passwords.
- Validate request data.
- Handle errors consistently.

---

## 5. Important API Restriction

KhataFlow must not depend on paid external APIs.

Do not use:

- Paid city-cost APIs
- Paid financial APIs
- Bank integrations
- UPI integrations
- Paid AI APIs
- External salary APIs
- External expense APIs

For the MVP, use:

- Local formulas
- Local seed data
- MongoDB collections
- Editable city-cost estimates
- Clearly labelled sample/development estimates

If city-wise data is used, the interface must make it clear that the figures are estimates and can be edited by the user.

---

## 6. Design Direction

### Overall Visual Personality

KhataFlow should look:

- Premium
- Clean
- Calm
- Trustworthy
- Professional
- Human
- Modern
- Financial but not boring

Avoid a generic AI-generated dashboard appearance.

Avoid:

- Excessive gradients
- Random glowing cards
- Too many colors
- Excessive rounded containers
- Huge decorative icons
- Unnecessary charts
- Crowded dashboards
- Random glassmorphism
- Overuse of purple/blue AI-style gradients
- Template-like layouts
- Unclear visual hierarchy

### Typography

The project must use a deliberate modern typeface.

Do not use Times New Roman or a browser-default serif font.

The typeface should be selected intentionally after considering:

- Readability
- Professional product feel
- Numbers and financial data
- Headings
- Body text
- Navigation
- Mobile readability
- Consistency across the application

Possible font directions to evaluate:

- Inter
- Geist
- Manrope
- Plus Jakarta Sans
- DM Sans

The final font should be selected by the design implementation, not randomly.

Important: typography means more than font size. Review:

- Font family
- Font weight
- Letter spacing
- Line height
- Number styling
- Heading character
- Body text readability
- Label hierarchy
- Button text appearance

### Layout

- Responsive on mobile, tablet, and desktop
- Strong spacing system
- Clear alignment
- Comfortable reading width
- Consistent card treatment
- Proper visual hierarchy
- No unnecessary sidebar
- Primary navigation through a clean top navbar
- Avoid overcrowding

### Color Direction

Use a restrained financial-product palette.

Colors should communicate:

- Income
- Expense
- Savings
- Warning
- Goal progress
- Neutral information

Do not use color only for decoration.

Color must support meaning and accessibility.

---

## 7. Main Product Areas

### Public Home Page

The Home page should explain:

- What KhataFlow is
- Who it is for
- What problem it solves
- Main benefits
- How the product works
- Clear calls to action
- Login and registration access

### Authentication

- Register
- Login
- Logout
- Current-user information
- Protected application pages

### Plan My Money

A guided financial-planning flow that collects:

- City or locality
- Employment type
- Monthly take-home salary
- Other income
- Dependents
- Housing type
- Rent or EMI
- Utilities
- Family contribution
- Lifestyle preferences
- Future financial goals

The flow should feel like a guided setup experience, not a long intimidating form.

### My Expenses

Users should be able to:

- Add an expense
- Edit an expense
- Delete an expense
- Search expenses
- Filter by category
- Filter by payment method
- Sort by date or amount
- View expense history
- See totals

### Reports

Reports should include:

- Monthly income
- Planned expenses
- Actual recorded expenses
- Remaining recorded balance
- Category breakdown
- Budget versus actual spending
- Savings progress
- Goal progress

Important: distinguish between:

- Planned balance
- Recorded balance
- Actual bank balance

The application must not falsely claim to know the user's real bank balance.

### Future Goals

Users should be able to:

- Create a goal
- Add target amount
- Add target date
- Add already-saved amount
- Set priority
- Track progress
- See required monthly saving

---

## 8. Financial Formulas

Use clear, understandable formulas.

### Total Income

Total Income = Monthly Salary + Other Income

### Total Planned Expenses

Total Planned Expenses = Sum of all planned expense categories

### Available Planned Balance

Available Planned Balance = Total Income - Total Planned Expenses - Goal Contributions

### Remaining Goal Amount

Remaining Goal Amount = Target Amount - Already Saved Amount

### Required Monthly Saving

Required Monthly Saving = Remaining Goal Amount / Remaining Months

The interface must clearly label estimates and calculations.

---

## 9. Budget Allocation Rules

The product may support common budgeting frameworks such as:

- 50/30/20
- 50/20/30
- 60/20/20
- 70/20/10
- Custom user-defined allocation

However, the application must not assume that an unexplained formula such as “1% SIP, 2% entertainment” is a universal financial rule.

Any allocation formula must be:

- Clearly named
- Clearly explained
- Editable where appropriate
- Displayed with percentages
- Displayed with rupee amounts
- Presented as guidance, not guaranteed financial advice

The exact allocation model should be finalized before implementation of the budget engine.

---

## 10. Suggested Data Collections

### users

Stores account and authentication information.

### financialProfiles

Stores:

- User reference
- City
- Employment type
- Salary
- Other income
- Dependents
- Housing information
- Lifestyle information
- Planning preferences

### cityCostPresets

Stores local development estimates such as:

- Rent
- Food
- Transport
- Utilities
- Other common expenses

### budgets

Stores:

- User reference
- Month
- Income
- Planned categories
- Allocation method
- Planned savings
- Goal contributions

### expenses

Stores:

- User reference
- Amount
- Category
- Description
- Date
- Payment method
- Notes

### goals

Stores:

- User reference
- Goal name
- Target amount
- Target date
- Already saved amount
- Priority
- Status

---

## 11. Suggested API Areas

### Authentication

- Register
- Login
- Current user

### Profile

- Get profile
- Create or update profile

### City Costs

- Get local estimate data

### Budgets

- Create budget
- Get budget
- Update budget

### Expenses

- Create expense
- List expenses
- Get one expense
- Update expense
- Delete expense

### Reports

- Monthly report
- Category report

### Goals

- Create goal
- List goals
- Update goal
- Delete goal

Every protected resource must validate:

- Authentication
- User ownership
- Request data
- Valid IDs
- Proper error handling

---

## 12. Development Phases

## Phase 1 — Project Inspection and Product Foundation

Objectives:

- Inspect the existing KhataFlow folder
- Identify current files
- Confirm the existing setup
- Avoid overwriting useful work
- Establish the project structure
- Establish design tokens
- Establish typography
- Establish spacing
- Establish colors
- Establish responsive behavior
- Establish reusable UI foundations

Deliverable:

- A stable foundation ready for the Home page

Do not build the complete application in this phase.

---

## Phase 2 — Premium Home Page

Objectives:

- Build the public Home page
- Explain KhataFlow clearly
- Create a strong hero section
- Add product benefits
- Add workflow explanation
- Add clear login/register calls to action
- Make the page responsive
- Use the selected professional typeface
- Ensure the design does not look AI-generated

Review carefully:

- Font family
- Typography hierarchy
- Spacing
- Navbar
- Button styling
- Mobile layout
- Visual balance
- Copy clarity
- Accessibility

---

## Phase 3 — Authentication

### Objective

Create a secure and professional authentication system so users can create an account, log in, log out, and access their private financial information.

### Frontend Work

Build:

- Register page
- Login page
- Logout action
- Authentication loading state
- Authentication error state
- Form validation messages
- Password visibility control if useful
- Redirect after successful login
- Redirect unauthenticated users away from protected pages
- Responsive authentication layout

The authentication pages must match the KhataFlow design system.

Do not make authentication pages look like unrelated template pages.

### Backend Work

Build:

- Register endpoint
- Login endpoint
- Current-user endpoint
- JWT token generation
- JWT verification middleware
- Password hashing using bcrypt
- Protected route middleware
- Consistent authentication errors
- Request validation

### Security Requirements

- Never store plaintext passwords.
- Never return password hashes to the frontend.
- Never place secrets directly in source code.
- Use environment variables for JWT secrets and database credentials.
- Validate duplicate email or username cases.
- Validate malformed login requests.
- Validate invalid or expired tokens.
- Validate user ownership before returning private data.
- Use safe error messages that do not expose sensitive information.

### Suggested Authentication API

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Completion Checklist

- User can register successfully.
- Duplicate accounts are handled.
- User can log in successfully.
- Incorrect credentials show a useful error.
- User can log out.
- Protected pages cannot be accessed without authentication.
- Refreshing the page preserves the correct authentication state.
- JWT verification works.
- Passwords are hashed.
- Mobile layout works.
- Loading, empty, and error states are handled.

Do not begin the financial-planning flow until authentication is reviewed and approved.

---

## Phase 4 — Plan My Money

### Objective

Create a guided financial-planning experience that helps users understand their monthly income, essential expenses, lifestyle spending, savings, and future goals.

This should feel like a guided setup journey rather than one very long form.

### Planning Flow

Use a multi-step experience.

Suggested steps:

1. Welcome and planning explanation
2. City or locality
3. Employment type
4. Monthly take-home salary
5. Other monthly income
6. Number of dependents
7. Housing type
8. Rent, EMI, or family contribution
9. Utilities
10. Food and household expenses
11. Transport
12. Lifestyle preferences
13. Savings and investment preferences
14. Future financial goals
15. Review and confirm plan

The exact number of screens can be adjusted if the experience becomes too long.

### Required Inputs

Collect, where relevant:

- City or locality
- Employment type
- Monthly take-home salary
- Other income
- Dependents
- Housing type:
  - Rented
  - Own home
  - Paying guest
  - Living with family
- Rent or EMI
- Utilities
- Family contribution
- Food expenses
- Transport expenses
- Lifestyle spending
- Existing savings
- Future goals
- Preferred savings amount or percentage

### Local Estimate System

Use local seed data and formulas only.

Do not use paid external APIs.

The application may provide estimated values for:

- Rent
- Food
- Transport
- Utilities
- Household expenses
- Lifestyle expenses

All estimates must be clearly labelled as:

- Estimated
- Sample
- Development data
- Editable

The user must be able to change suggested values.

### Budget Calculation

Use understandable calculations.

- Total Income = Monthly Salary + Other Income
- Total Planned Expenses = Sum of planned expense categories
- Planned Savings = User-selected or calculated savings amount
- Goal Contribution = Amount assigned to goals
- Available Planned Balance = Total Income - Total Planned Expenses - Planned Savings - Goal Contribution

The application must explain the result in plain language.

### Budget Framework Support

The application may support budgeting methods such as:

- 50/30/20
- 50/20/30
- 60/20/20
- 70/20/10
- Custom allocation

Do not treat any framework as guaranteed financial advice.

The interface should show:

- Category name
- Percentage
- Rupee amount
- Explanation
- Editable amount where appropriate

Do not invent or assume that a formula such as “1% SIP and 2% entertainment” is a universal rule. Any such formula must be explicitly named and explained before implementation.

### Frontend Requirements

Build:

- Step indicator
- Back and next navigation
- Save-progress behavior where appropriate
- Validation for each step
- Helpful field descriptions
- Currency input formatting
- Review screen
- Confirmation screen
- Responsive mobile experience
- Loading states
- Error states
- Empty states
- Ability to edit previous answers

### Backend Requirements

Build:

- Financial profile creation
- Financial profile retrieval
- Financial profile update
- Budget calculation service
- City-cost estimate retrieval
- User ownership validation
- Request validation

### Suggested APIs

- GET /api/profile
- POST /api/profile
- PUT /api/profile
- GET /api/city-costs/:city
- POST /api/budgets
- GET /api/budgets
- GET /api/budgets/:id
- PUT /api/budgets/:id

### Suggested Collections

#### financialProfiles

Store:

- User reference
- City
- Employment type
- Salary
- Other income
- Dependents
- Housing type
- Rent or EMI
- Utilities
- Family contribution
- Food
- Transport
- Lifestyle
- Planning preferences
- Updated timestamp

#### cityCostPresets

Store:

- City
- Expense category
- Estimated amount
- Data label
- Editable flag
- Updated timestamp

#### budgets

Store:

- User reference
- Month
- Total income
- Planned categories
- Allocation method
- Planned savings
- Goal contributions
- Created timestamp
- Updated timestamp

### Completion Checklist

- User can complete the planning flow.
- User can go backward and edit answers.
- Required fields are validated.
- Estimated values are clearly labelled.
- User can modify estimated values.
- Income and budget calculations are correct.
- The plan is saved to the database.
- Only the logged-in user can access their plan.
- The review screen is understandable.
- The experience works on mobile.
- No paid external API is used.
- Loading and error states are handled.

Do not begin the expense-management phase until this phase is reviewed and approved.

---

## Phase 5 — My Expenses

### Objective

Create a practical expense-management area where users can record and manage daily spending.

The experience should be simple enough for daily use and powerful enough to support monthly reports later.

### Expense Features

Users must be able to:

- Add an expense
- View expenses
- Edit an expense
- Delete an expense
- Search expenses
- Filter by category
- Filter by payment method
- Filter by date range
- Sort by newest
- Sort by oldest
- Sort by highest amount
- Sort by lowest amount
- View total expenses
- View category totals
- View an empty state when no expenses exist

### Expense Fields

Each expense may contain:

- Amount
- Category
- Description
- Date
- Payment method
- Notes
- Optional recurring flag if approved later

### Suggested Categories

Use clear categories such as:

- Food
- Groceries
- Rent
- EMI
- Utilities
- Transport
- Shopping
- Entertainment
- Health
- Education
- Family
- Bills
- Travel
- Other

Categories should be easy to understand and should not overwhelm the user.

### Suggested Payment Methods

- Cash
- UPI
- Debit card
- Credit card
- Bank transfer
- Other

The application may record the payment method, but it must not connect to banks or UPI providers.

### Frontend Requirements

Build:

- Expenses page
- Add-expense form
- Edit-expense form
- Delete confirmation
- Expense list or table
- Search input
- Category filter
- Payment-method filter
- Date filter
- Sorting control
- Total expense summary
- Category summary
- Empty state
- Loading state
- Error state
- Success feedback
- Mobile-friendly layout

The mobile layout must not force the user to scroll through an unusable wide table.

Use a responsive list or card layout on small screens if needed.

### Backend Requirements

Build:

- Create expense endpoint
- List expenses endpoint
- Get one expense endpoint
- Update expense endpoint
- Delete expense endpoint
- User ownership validation
- Request validation
- Valid ObjectId validation
- Consistent error handling

### Suggested APIs

- POST /api/expenses
- GET /api/expenses
- GET /api/expenses/:id
- PUT /api/expenses/:id
- DELETE /api/expenses/:id

### Suggested Expense Collection

#### expenses

Store:

- User reference
- Amount
- Category
- Description
- Date
- Payment method
- Notes
- Created timestamp
- Updated timestamp

### Validation Requirements

- Amount must be a valid positive number.
- Category must be valid.
- Date must be valid.
- Description should have a sensible length limit.
- Invalid expense IDs must be rejected.
- Users must not access another user's expenses.
- Delete operations should require confirmation.
- API errors should be shown clearly without exposing internal details.

### Completion Checklist

- User can add an expense.
- User can view expenses.
- User can edit an expense.
- User can delete an expense.
- Search works.
- Filters work.
- Sorting works.
- Totals update correctly.
- Data is stored in MongoDB.
- User ownership is enforced.
- Invalid input is handled.
- Empty, loading, and error states exist.
- Mobile layout is usable.
- The design matches the rest of KhataFlow.

Do not begin the reports phase until this phase is reviewed and approved.

---

## Phase 6 — Reports

Build:

- Monthly summary
- Planned versus actual expenses
- Category breakdown
- Recorded balance
- Savings summary
- Goal progress
- Clear labels and explanations

Do not claim to display actual bank balance.

---

## Phase 7 — Goals and Final Product Polish

Build:

- Goal creation
- Goal tracking
- Required monthly saving
- Goal progress
- Final responsive review
- Accessibility review
- Security review
- Error-state review
- Empty-state review
- Performance cleanup
- README documentation

---

## 13. Antigravity Agent Instructions

Before implementing anything:

1. Inspect the current KhataFlow folder.
2. Report what already exists.
3. Do not delete or overwrite files without checking.
4. Do not create unnecessary libraries.
5. Do not add paid services.
6. Do not add external APIs unless explicitly approved.
7. Do not jump to future phases.
8. Do not implement backend features during a frontend-only phase unless instructed.
9. Use reusable components.
10. Explain important architectural decisions.
11. Show the changed files.
12. Explain how to run and test the work.
13. Check responsive behavior.
14. Check accessibility.
15. Check loading, empty, and error states.
16. Avoid generic AI dashboard design.
17. Treat typography and font family as a core design decision.
18. Ask for clarification only when a decision is genuinely blocking implementation.

For every phase, provide:

- What was inspected
- What was implemented
- Files created or changed
- How the feature works
- How it was tested
- Known limitations
- Recommended next step

---

## 14. Review Rule

A phase is not complete merely because the code runs.

The phase is complete only when:

- The intended feature works
- The design matches the product direction
- Typography looks professional
- Mobile layout works
- Empty and error states are handled
- No unnecessary complexity was added
- The implementation is reviewed and approved

The project lead will review Antigravity's output phase by phase.

---

## 15. Immediate Next Step

Start with Phase 1 only.

The first Antigravity prompt should ask the agent to:

- Inspect the existing KhataFlow folder
- Report the current structure
- Identify the framework and setup
- Avoid making major changes before inspection
- Recommend the exact foundation plan
- Establish typography and design direction
- Wait for approval before moving to Phase 2

---

## 16. Code Preservation and Change-Control Rules

These rules are mandatory for the entire KhataFlow project.

### Preserve Existing Code

- Never silently delete existing code.
- Never remove a previously implemented feature without approval.
- Never overwrite a working implementation blindly.
- Before changing a file, inspect its current content and understand its purpose.
- Preserve existing working behavior unless the current phase explicitly requires a change.

### Comment Out Replaced Code

When code must be changed after review:

- Prefer commenting out the previous implementation instead of deleting it.
- Keep the previous implementation close to the new implementation when practical.
- Add a short comment explaining why the new implementation replaced the old one.
- Clearly label preserved code, for example:
  - `Previous implementation — preserved for review`
  - `Replaced after UI review`
  - `Old logic retained for rollback`
- Do not leave confusing duplicate active code.
- Only the approved implementation should execute.
- The previous implementation should remain available for comparison and rollback.

### Review Before Destructive Changes

Antigravity must ask for approval before:

- Deleting files
- Removing features
- Removing routes
- Removing database fields
- Removing components
- Replacing a major architecture decision
- Rewriting a working module completely
- Installing or removing major dependencies
- Changing the project framework
- Changing the database structure in a destructive way

If a destructive change is genuinely necessary, explain:

1. What will be changed
2. Why it is necessary
3. What may be affected
4. How the old behavior will be preserved
5. How the change can be reversed

Wait for approval before proceeding.

### No Unapproved Outside Resources

Do not use anything outside the KhataFlow project without asking the human user first.

This includes:

- External APIs
- Paid services
- Third-party platforms
- Bank or UPI integrations
- External data providers
- External websites for application functionality
- New npm packages
- New libraries
- External fonts
- External icon libraries
- External image services
- External analytics tools
- External hosting or deployment services
- External AI services
- External databases

If an outside resource is suggested or required:

1. Stop before using it.
2. Explain what it is.
3. Explain why it may be needed.
4. Explain whether it has a cost or privacy impact.
5. Ask the human user for explicit approval.
6. Do not continue with that resource until approval is received.

Use the existing project tools and installed dependencies whenever possible.

### Dependency Rule

- Do not install a new package automatically.
- Do not add a library only for visual decoration.
- Do not add a package when the requirement can be completed with the existing stack.
- Ask for approval before adding a new dependency.
- Explain the purpose and trade-offs of every proposed dependency.

### Change Log

For meaningful changes, provide:

- Files changed
- Existing behavior
- New behavior
- Reason for the change
- Code preserved or commented out
- New dependencies, if any
- External resources requested, if any
- Testing performed
- Possible side effects

### Mandatory Agent Instruction

Before every implementation task, Antigravity must follow this sequence:

1. Inspect the existing code.
2. Identify what will be changed.
3. Identify what must be preserved.
4. Explain any potentially destructive action.
5. Ask for approval if an external resource, new dependency, or destructive change is required.
6. Implement only the approved scope.
7. Preserve previous code by commenting it out when replacing reviewed code.
8. Report all changes clearly.
9. Explain how the previous behavior can be restored.

---

## 17. Strict Project Rules

### 1. STYLING RULE
KhataFlow must use Tailwind CSS as the primary styling system.
- Tailwind CSS must be the default styling approach.
- Use Tailwind utility classes for layout, spacing, colors, typography, responsiveness, borders, shadows, and component styling.
- Do not use plain CSS as the main styling system.
- Do not create large CSS files for normal application styling.
- Do not introduce another CSS framework without explicit approval.
- Use CSS files only when genuinely necessary for a special case that Tailwind cannot reasonably handle.
- Any such special CSS must be explained before implementation.

### 2. COMPONENT LIBRARY RULE
Do not automatically install or use third-party component libraries.
This includes:
- Material UI
- Ant Design
- Chakra UI
- Bootstrap
- shadcn/ui
- Other UI component libraries
- Icon libraries
- Chart libraries
- Animation libraries
- Form libraries
- Date picker libraries
- Table libraries
Every third-party package requires my explicit approval before installation or use.

### 3. MATERIAL UI STRICT APPROVAL RULE
Material UI is strictly approval-only.
If you believe Material UI is required, do not install or use it.
You must first explain:
1. The exact feature that requires Material UI.
2. Why Tailwind CSS and custom local components are not sufficient.
3. The advantages of using Material UI.
4. The disadvantages and dependency impact.
5. Any effect on bundle size, design consistency, and project complexity.
You must also provide the official Material UI website:
https://mui.com/material-ui/
Then stop and ask for my explicit approval.
Do not continue with Material UI unless I clearly approve it.

### 4. DEPENDENCY APPROVAL RULE
Do not install any new npm package without my explicit approval.
This includes packages for:
- Icons
- Charts
- Forms
- Validation
- Animations
- Dates
- Tables
- UI components
- Authentication
- Database
- Utilities
Before installing any package, explain:
- Package name
- Why it is needed
- Whether the feature can be built without it
- Whether it is free or paid
- Any security, privacy, or maintenance concerns
Then stop and wait for approval.

### 5. EXTERNAL RESOURCE APPROVAL RULE
Do not use external resources without approval.
External resources include:
- External websites
- External APIs
- Paid services
- External fonts
- External icons
- External images
- External databases
- Bank integrations
- UPI integrations
- AI APIs
- Hosting services
- Deployment services
If any external resource is considered necessary, explain it first and wait for approval.

### 6. CODE PRESERVATION RULE
Never silently delete existing code or documentation.
If an existing implementation must be replaced:
- Preserve the old implementation whenever practical.
- Comment out the old code instead of deleting it.
- Add a short reason explaining why it was replaced.
- Do not perform destructive refactoring without explicit approval.
- Preserve previous work for comparison and rollback.
