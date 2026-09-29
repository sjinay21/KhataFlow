# Phase 1: Frontend Architecture Plan

## 1. Frontend Objectives
To build a premium, responsive, and robust personal finance web application using Next.js, React, and Tailwind CSS. The frontend must remain completely decoupled from the backend and maintain a clean separation of concerns.

> **Technology Decision**: KhataFlow uses JavaScript and JSX rather than TypeScript. All frontend and backend implementation must use JavaScript files and JavaScript-compatible configuration. TypeScript must not be introduced without explicit project-owner approval.

## 2. Recommended Next.js Structure
We will use the Next.js App Router (`app/` directory) for modern routing, server components (where appropriate), and streamlined layouts.

## 3. Recommended App Directory Structure
```
client/
├── src/
│   ├── app/            # Next.js App Router (pages and layouts)
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature-specific logic (e.g., auth, budgets, expenses)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and API clients
│   ├── store/          # Global state management
│   └── styles/         # Global styles (Tailwind base)
```

## 4. Proposed Route Structure
- `/` - Public Home Page
- `/login` - Authentication Login
- `/register` - Authentication Registration
- `/dashboard` - Main Dashboard Overview
- `/plan` - Plan My Money Flow
- `/expenses` - My Expenses
- `/reports` - Financial Reports
- `/goals` - Future Goals

## 5. Public Pages
- **Home**: Landing page explaining KhataFlow's value proposition, features, and calls to action.

## 6. Authentication Pages
- **Login**: Secure login form.
- **Register**: Account creation form.
Both will share a centralized auth layout.

## 7. Protected Pages
Frontend route protection is only a user-experience and navigation layer. Real authentication and authorization must always be enforced by the backend. For Next.js App Router, prefer protected layouts and server-side session checks where appropriate. Do not rely on a client-side HOC alone to protect financial data.
- Backend authorization is the real security boundary.
- Every financial record must be checked against the authenticated user.
- A user must never access another user's financial data by changing an ID or request parameter.

## 8. Future Dashboard Areas
The dashboard will provide a high-level summary of remaining balances, recent expenses, and goal progress.

## 9. Shared Layout Structure
A protected layout will wrap the authenticated application, providing a consistent navbar, constraint container, and global error boundary.

## 10. Navbar Structure
Clean, top-aligned navbar containing the KhataFlow logo, navigation links (Dashboard, Plan, Expenses, Reports, Goals), and a user profile dropdown with logout functionality. No sidebars by default.

## 11. Footer Strategy
- **Public Pages**: A standard footer with links, copyright, and simple branding.
- **Protected Pages**: No footer or a very minimal sticky bottom bar on mobile if necessary (top navbar preferred).

## 12. Reusable Local Component Strategy
We will build local, highly reusable components styled exclusively with Tailwind CSS. Third-party UI libraries (like Material UI) are strictly prohibited without approval.

## 13. Button Components
A unified `<Button>` component supporting variants (`primary`, `secondary`, `danger`, `ghost`, `link`), sizes (`sm`, `md`, `lg`), and states (`loading`, `disabled`).

## 14. Input Components
A unified `<Input>` component with consistent focus rings, error states, and optional left/right icons (e.g., currency symbols).

## 15. Form Components
Reusable form wrappers that handle layout, spacing between fields, and centralized submission states.

## 16. Card Components
A simple `<Card>` component with standard padding, subtle borders, and optional headers/footers to encapsulate distinct UI sections.

## 17. Modal/Dialog Strategy
A controlled `<Modal>` component for critical confirmations (e.g., deleting an expense) utilizing headless UI concepts but styled with Tailwind.

## 18. Table/List Strategy
- Desktop: Standard HTML tables styled cleanly.
- Mobile: Card-based lists to prevent horizontal scrolling and improve readability.

## 19. Empty-State Components
A standardized `<EmptyState>` component displaying an illustration/icon, a helpful message, and a call-to-action button (e.g., "Add your first expense").

## 20. Loading-State Components
Skeleton loaders and subtle spinners to indicate data fetching without blocking the UI entirely.

## 21. Error-State Components
Inline error messages for forms and full-page/section error boundaries for failed API requests with a "Try Again" action.

## 22. Chart/Report Component Strategy
Simple, local CSS-based visualizers (e.g., progress bars) where possible. If a chart library is needed later, it will be proposed as an open decision.

## 23. State-Management Approach
- Local Component State: `useState`, `useReducer`
- Server State: Data fetching via Next.js native `fetch` or a lightweight tool like SWR/React Query.
- Global State: React Context for simple state (e.g., Auth, Theme).

## 24. Form-State Approach
Controlled components utilizing native React state, keeping dependencies low. If complex, standard lightweight hook-based forms.

## 25. Validation Approach
Client-side validation before submission. Custom local validation functions mimicking the backend's rules for consistency.

## 26. API-Service Structure for Later Use
An API utility module (`lib/api.js`) that intercepts requests to attach JWT tokens and handles global response parsing/errors.

## 27. Where Frontend Calculations Should Live
Calculations for display purposes (e.g., Remaining Balance) should live in pure utility functions in `lib/financeUtils.js` to ensure testability.

## 28. Where Financial Logic Should Be Shared
Financial formulas must be extracted into pure functions and not embedded directly into UI components.

## 29. Responsive Design Strategy
Mobile-first Tailwind approach. Define base styles for mobile, then scale up using `sm:`, `md:`, and `lg:` breakpoints.

## 30. Mobile Behavior
Full-width elements, stacked forms, tap-friendly touch targets (min 44px), card-based lists instead of tables.

## 31. Tablet Behavior
Multi-column layouts where space permits, slightly tighter padding, modal popups for forms.

## 32. Desktop Behavior
Comfortable reading widths, multi-column grid layouts, persistent navigation visibility.

## 33. Accessibility Strategy
Semantic HTML (`nav`, `main`, `section`, `article`), ARIA labels for icon-only buttons, sufficient color contrast, keyboard navigable forms, and visible focus rings.

## 34. Naming Conventions
- Variables/Functions: `camelCase`
- Components: `PascalCase`
- CSS Classes: Use standard Tailwind CSS utility-class syntax. Do not impose a kebab-case naming rule on Tailwind utility classes. (e.g., text-slate-900, md:grid-cols-2, hover:bg-slate-100, w-[320px])

## 35. File and Folder Naming Conventions
- Component files: `ComponentName.jsx`
- Utility files: `utilityName.js`
- Routes: `page.jsx`, `layout.jsx` (Next.js App Router standard)

## 36. Component Responsibility Rules
- Container Components: Fetch data, manage complex state, pass props.
- Presentational Components: Only render UI based on props, emit events via callbacks.

## 37. Separation of UI, State, API, and Business Logic
UI in `components/`, state in `hooks/` or context, API calls in `lib/api/`, business logic/calculations in `lib/utils/`.

## 38. Testing Structure for a Later Phase
Jest and React Testing Library setup in a `__tests__` directory for unit testing utility functions and core components.

## 39. Risks and Open Decisions
- Exact font family (requires approval).
- State management library (if Context becomes insufficient).
- Charting requirements for the Reports phase.

## 40. Strict Third-Party Dependency Rules
The following are NOT approved and require explicit approval before installation or use:
- `lucide-react` (or any icon library)
- `react-hook-form` (or any form library)
- `zod` (or any validation library)
- SWR
- React Query
- Jest
- React Testing Library
- Any chart library
- Any animation library
- Any date-picker library
- Any table library
- Any UI component library (including Material UI)

Each package requires separate explicit approval. For every proposed package, document: Package name, Purpose, Why it may be needed, Whether a local/native solution is possible, Advantages, Disadvantages, Dependency impact, Security/privacy considerations, and Approval status. Do not install any package.
