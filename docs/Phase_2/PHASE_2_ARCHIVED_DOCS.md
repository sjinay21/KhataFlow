<!-- ARCHIVED PHASE 2 DOCUMENTS
==================================================
ARCHIVED FILE: PHASE_2_ACCEPTANCE_CRITERIA.md
==================================================

# KhataFlow â€” Phase 2 Acceptance Criteria

## Functional Criteria
- [ ] Page loads successfully at `/`.
- [ ] Home Page is completely public (no authentication required).
- [ ] No finance workflow is implemented (Plan My Money, Expense tracking do not function yet).
- [ ] No backend business logic is added (routes remain untouched).
<!--
Previous implementation:
- [ ] CTA links pointing to `/login` and `/register` exist (even if they 404 for now).

Changed because: Intentional 404 behavior is unacceptable. Placeholders must be used.
-->
- [ ] CTA links pointing to `/login` and `/register` lead to temporary navigation-safe placeholder pages. They do not 404.

## UI/UX Criteria
- [ ] Navbar works on desktop and mobile.
- [ ] Hero section is visually clear, premium, and calm.
<!--
Previous implementation:
- [ ] Feature Preview content is clearly labeled as static/sample content.

Changed because: Sample data labeling must be explicitly spelled out.
-->
- [ ] Feature Preview content is explicitly labeled with visible markers like "Sample Data" or "Illustrative Preview".
- [ ] Footer is complete, truthful, and contains no fake social links.
- [ ] No Material UI exists.
- [ ] Tailwind is used as the absolute primary styling system.
- [ ] Existing Phase 1 components (`Button`, `Card`) are reused where appropriate.

## Responsive Criteria
- [ ] All sections (Hero, Features, Previews) scale gracefully to mobile (`sm`) screens.
- [ ] No horizontal overflow exists on any viewport size.
- [ ] Touch targets on mobile are sufficiently large (approx 44px).

## Accessibility Criteria
- [ ] Semantic HTML is used (`<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`).
- [ ] Keyboard navigation works (can `Tab` through all links and buttons).
- [ ] Focus states are visibly distinct on all interactive elements.
- [ ] Contrast ratios are acceptable against the background colors.
<!--
Previous implementation:
- [ ] Mobile menu (if implemented) is accessible via keyboard and screen reader.

Changed because: Mobile menu accessibility and behavior must be strict (local state, escape key, focus).
-->
- [ ] Mobile menu (if implemented) uses local React state, no external packages, requires `aria-expanded`/`aria-controls`, allows closing via the Escape key, and restores focus to the menu button upon closing.

## Security & Trust Criteria
- [ ] No fake testimonials are present.
- [ ] No fake metrics (e.g. "Trusted by 10,000 users") are present.
- [ ] No misleading bank-balance claims (must use "Estimated/Tracked Money").
- [ ] No unsupported financial claims (e.g. "Guaranteed Returns").

## Dependency & Resource Compliance
- [ ] No unauthorized dependencies are installed.
- [ ] No external resources (Google Fonts, Unsplash images, external CDN scripts) are used without explicit project-owner approval.

## Code Quality Criteria
- [ ] **Permanent Code Preservation Rule is followed**: Any existing Phase 1 code that was altered has its previous iteration commented out with a clear explanation above the new implementation.
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npm run build` passes with 0 errors.

## Documentation & Scope Control Criteria
- [ ] A final implementation report is produced upon completion.
- [ ] Phase 3 (Authentication) and later phases are explicitly NOT started.


==================================================
ARCHIVED FILE: PHASE_2_ACCESSIBILITY_CHECKLIST.md
==================================================

# KhataFlow â€” Phase 2 Accessibility Checklist

## Semantic HTML
- [ ] Use exactly one `<h1>` element on the page (Hero Section).
- [ ] Maintain a strict heading hierarchy (`<h2>` for main sections, `<h3>` for cards). Do not skip heading levels.
- [ ] Use semantic landmark elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`).
- [ ] Ensure buttons use the `<button>` tag and links use the `<a>` tag. Do not attach `onClick` handlers to `<div>` elements to simulate buttons.

## Keyboard Navigation & Focus
- [ ] All interactive elements (links, buttons) must be reachable via the `Tab` key.
- [ ] Ensure visible focus states exist for all interactive elements (e.g., `focus:ring-2 focus:ring-primary-500 focus:outline-none`).
<!--
Previous implementation:
- [ ] If a mobile hamburger menu is implemented, trap focus within the menu while open, and allow the `Escape` key to close it.

Changed because: We do not require a complex third-party focus trap.
-->
- [ ] For the mobile menu, allow the `Escape` key to close it and return focus to the menu button. No complex third-party focus trap is required.

## ARIA Attributes
- [ ] Navigation landmarks should have descriptive `aria-label` attributes if there are multiple `<nav>` elements (e.g., `<nav aria-label="Main Navigation">`).
<!--
Previous implementation:
- [ ] If a mobile menu is implemented, the toggle button must use `aria-expanded` and `aria-controls`.

Changed because: Mobile menu is definitely recommended now.
-->
- [ ] The mobile menu toggle button must use `aria-expanded` and `aria-controls`.
- [ ] Current active links (if applicable) should use `aria-current="page"`.

## Visual & Contrast
- [ ] Text contrast must meet WCAG 2.1 AA standards (minimum 4.5:1 for normal text, 3:1 for large text).
- [ ] Decorative visual elements and icons must have `aria-hidden="true"` so screen readers ignore them.
- [ ] Do not rely solely on color to convey information.

## Interaction & Motion
- [ ] Avoid clickable elements that are not clearly interactive (no fake links).
- [ ] Avoid hover-only information. Any critical information revealed on hover must also be accessible via keyboard focus or tap.
- [ ] Touch targets on mobile must be at least 44x44px.
- [ ] Respect `prefers-reduced-motion` settings for any animations.

## Form-Free Home Page
- [ ] Since the Home Page has no forms in Phase 2, ensure that no `<form>` elements are prematurely added without accessible inputs.

## Note on Implemented vs Planned
- This checklist defines requirements for the **planned Phase 2 implementation**. Features not yet implemented (like the Mobile Menu) only need these accessibility checks if they are built during Phase 2. Existing components (like Modal limitations from Phase 1) remain documented as future improvements but do not block Phase 2 marketing page completion.


==================================================
ARCHIVED FILE: PHASE_2_COMPONENT_PLAN.md
==================================================

# KhataFlow â€” Phase 2 Component Plan

## Overview
This document defines the reusable UI components required for the Phase 2 Home Page. 

## Strict Code Preservation Rule Reminder
If an existing component from Phase 1 must be modified, the developer must preserve the old code as a comment with an explanation before writing the new implementation.

---

## 1. Existing Components to Reuse

### `Button` (`client/src/components/Button.jsx`)
- **Status**: Already exists (Phase 1).
- **Responsibility**: Standard interactive button for CTAs.
- **Props**: `children, onClick, type, variant, size, disabled, className`.
- **Planned Modification**: Currently, `type` defaults to `"button"`. Evaluate if a future modification to safely handle forms without explicitly passing `type="button"` is necessary, but do not implement it in Phase 2.
- **Usage in Phase 2**: Hero CTA, Navbar Login/Register, Final CTA section.

### `Card` (`client/src/components/Card.jsx`)
- **Status**: Already exists (Phase 1).
- **Responsibility**: Container for value propositions and feature previews.
- **Usage in Phase 2**: Wrapping steps in "How It Works" or feature highlights.

### `Input` & `Modal` & `EmptyState`
- **Status**: Already exist (Phase 1).
- **Usage in Phase 2**: Not required for the Home Page, as there are no forms or modals on the public marketing page.
- **Modal Note**: The current Modal lacks Escape-key handling, focus trap, focus restoration, and backdrop close behavior. These remain future improvements and should not be silently claimed as implemented.

---

## 2. New Components to Create (Phase 2)

<!--
Previous implementation:
### `Navbar`
- **Status**: Needs creation.
- **Responsibility**: Top-level navigation.
- **Props**: None (or optional `className`).
- **State**: `isMobileMenuOpen` (boolean).
- **Accessibility**: Requires `aria-expanded` and `aria-controls` for the mobile menu toggle.
- **Responsive**: Hidden links on mobile, shown on desktop.

Changed because: Mobile menu explicit details must be documented.
-->
### `Navbar`
- **Status**: Needs creation.
- **Responsibility**: Top-level navigation.
- **Props**: None (or optional `className`).
- **State**: `isMobileMenuOpen` (boolean). Must use local React state, no external packages.
- **Accessibility**: Requires `aria-expanded` and `aria-controls` for the mobile menu toggle. Escape key closes menu, focus returns to toggle.
- **Responsive**: Links and CTAs stack vertically on mobile inside the menu. Hidden behind Hamburger toggle on mobile, shown horizontally on desktop.

### `Footer`
- **Status**: Needs creation.
- **Responsibility**: Page footer with planned links.
- **Props**: None.
- **Accessibility**: Standard `<nav>` tags within the footer if linking to internal pages.

### `HeroSection`
- **Status**: Needs creation (can be a standard functional component or just HTML inside `page.jsx`).
- **Responsibility**: Top content block.
- **Props**: `title, subtitle, primaryCtaText`.

### `FeatureGrid`
- **Status**: Needs creation.
- **Responsibility**: Displaying the 3 or 4 core value propositions.
- **Props**: `features` (array of objects with title, description).
- **Responsive**: 1 column on mobile, 3-4 on desktop.

### `ProductPreviewCard`
- **Status**: Needs creation.
- **Responsibility**: Static, safe mockups of the future application state to show users what KhataFlow looks like.
- **Props**: `title, amount, label` (to allow rendering fake static data safely).

## Abstraction Strategy
Do not over-abstract. `HeroSection` and `FeatureGrid` may simply be inline JSX within `client/src/app/page.jsx` if they are only used once on the Home Page. Only create separate files in `components/` if the logic or markup is complex enough to warrant separation or future reuse.


==================================================
ARCHIVED FILE: PHASE_2_CONTENT_COPY.md
==================================================

# KhataFlow â€” Phase 2 Content Copy

## Navbar
- **Brand**: KhataFlow
- **Links**: Features, How It Works
- **CTAs**: 
  - Login (Ghost/Outline)
  - Get Started (Primary)

## Hero Section
- **Hero Eyebrow**: Simple Personal Finance
- **Hero Heading**: Understand your money without the anxiety.
- **Hero Supporting Paragraph**: Track your income, plan your essential expenses, and know exactly how much you can safely spend. No complicated bank syncing requiredâ€”just clarity.
- **Primary CTA**: Start Planning Today
- **Secondary CTA**: See How It Works

## Value Proposition
- **Heading**: Why choose KhataFlow?
- **Card 1 - Plan**:
  - *Title*: Plan your money
  - *Description*: Allocate your monthly salary toward essentials, lifestyle, and savings before the month even begins.
- **Card 2 - Track**:
  - *Title*: Track your expenses
  - *Description*: Manually log your daily spending to stay acutely aware of where your money is going.
<!--
Previous implementation:
- **Card 3 - Understand**:
  - *Title*: Understand your position
  - *Description*: See the difference between what you planned and what you actually spent in real-time.

Changed because: Removed incorrect "real-time" wording to accurately reflect manual tracking.
-->
- **Card 3 - Understand**:
  - *Title*: Understand your position
  - *Description*: See the difference between what you planned and what you recorded.
- **Card 4 - Goals**:
  - *Title*: Work toward goals
  - *Description*: Set aside money for the future and watch your progress grow month by month.

## How It Works
- **Heading**: How it works
- **Step 1**: Add your monthly income.
- **Step 2**: Plan your fixed and variable expenses.
- **Step 3**: Track what you spend daily.
- **Step 4**: Understand your estimated remaining money and goals.

<!--
Previous implementation:
## Feature Preview
- **Heading**: A peek inside KhataFlow
- *Note*: Previews will consist of static CSS cards.
- **Preview 1**: "Plan My Money" (Static table of salary and rent).
- **Preview 2**: "My Expenses" (Static list of recent transactions).

Changed because: All Home Page financial previews must be clearly labeled as static.
-->
## Feature Preview
- **Heading**: A peek inside KhataFlow
- *Note*: Previews will consist of static CSS cards.
- **Preview 1**: "Plan My Money" (Static table of salary and rent. Must include label: "Sample Data").
- **Preview 2**: "My Expenses" (Static list of recent transactions. Must include label: "Illustrative Preview").

## Financial Clarity Section
- **Heading**: Clarity over complexity.
- **Copy**: We believe in manual tracking. By entering your expenses yourself, you stay connected to your spending habits. We calculate your **Estimated Remaining Money** based on your inputs, helping you avoid overspending without needing access to your actual bank account.

<!--
Previous implementation:
## Privacy and Trust
- **Heading**: Your data is yours.
- **Copy**: KhataFlow is built on trust and isolation. We do not integrate with banks, we do not require your UPI details, and we do not use third-party financial providers. Your financial data is securely isolated and completely under your control. (Deprecated historical wording â€” not an approved product claim.)

Changed because: Unsupported security claims ("securely isolated", "completely under your control") must be removed.
-->
## Privacy and Trust
- **Heading**: Built for manual tracking.
- **Copy**: KhataFlow is designed around simple manual tracking. You can plan and record your money without connecting a bank account. We do not integrate with banks, we do not require your UPI details, and we do not use third-party financial providers. Security and account isolation will be implemented in later phases.

## Final Call to Action
- **Heading**: Ready to take control?
- **Copy**: Join KhataFlow today and start planning your financial future with confidence.
- **CTA**: Create Your Free Account

<!--
Previous implementation:
## Footer
- **Brand Summary**: KhataFlow â€” Simple, secure, manual personal finance tracking.
- **Links Column 1 (Product)**: Features, How It Works, Pricing (placeholder).
- **Links Column 2 (App)**: Login, Register.
- **Links Column 3 (Legal)**: Privacy Policy, Terms of Service.

Changed because: Fake legal pages and placeholders like Pricing are prohibited. "Secure" was removed.
-->
## Footer
- **Brand Summary**: KhataFlow â€” Simple manual personal finance tracking.
- **Links Column 1 (Product)**: Features (`#features`), How It Works (`#how-it-works`).
- **Links Column 2 (App)**: Login, Register.
- **Copyright**: Â© [Current Year] KhataFlow. All rights reserved.

## Content Rules Applied
- Clear Indian personal finance context (salary, rent).
- No exaggerated marketing (e.g., "Guaranteed wealth").
- No fake testimonials, ratings, or user counts.
- Emphasizes "estimated remaining money" instead of "actual bank balance."
- No claims of automatic bank synchronization.


==================================================
ARCHIVED FILE: PHASE_2_HOME_PAGE_STRUCTURE.md
==================================================

# KhataFlow â€” Phase 2 Home Page Structure

## Overview
This document defines the exact semantic structure of the Phase 2 Premium Public Home Page from top to bottom.

---

## A. Navbar
- **Section Order**: 1
- **Semantic HTML Element**: `<nav>` inside `<header>`
- **Layout Structure**: Flexbox container, horizontal alignment, sticky to top.
- **Main Elements**:
  - Left: KhataFlow Logo/Wordmark (static text).
  - Center: Hidden on mobile; NavLinks ("Features", "How It Works").
  - Right: "Login" (Ghost Button) and "Get Started" (Primary Button).
- **Visual Treatment**: Clean white or slightly translucent background with a subtle bottom border.
- **Required Reusable Components**: `Button`
<!--
Previous implementation:
- **Mobile Stacking Order**: Logo on left, Hamburger menu on right (if implemented) or vertically stacked in a drawer.
- **Interactivity**: Static routing placeholders. All CTAs will point to future routes (`/login`, `/register`).

Changed because: Mobile navigation must be explicitly defined using local React state without third-party packages, and CTAs must use safe placeholders.
-->
- **Mobile Stacking Order**: Logo on left, Menu button on right. The menu opens and closes using local React state. No third-party UI library. Menu button includes `aria-expanded` and `aria-controls`. Escape key closes the menu. Focus returns to the button after closing. All links are keyboard reachable. Menu does not depend on hover.
- **Interactivity**: Safe static navigation. CTAs will point to `/login` and `/register`, which will be minimal, navigation-safe placeholder pages.

---

## B. Hero Section
- **Section Order**: 2
- **Semantic HTML Element**: `<section>` inside `<main>`
- **Layout Structure**: Centered text block with a wide container.
- **Main Heading**: H1 element communicating personal finance clarity.
- **Supporting Text**: Paragraph explaining simple money planning without exaggerated claims.
- **Primary CTA**: "Start Planning Today" (links to `/register`).
- **Visual Treatment**: Generous top/bottom padding. Premium typography. No excessive glowing effects.
- **Required Reusable Components**: `Button`
- **Mobile Stacking Order**: Standard vertical stack.

---

## C. Value Proposition
- **Section Order**: 3
- **Semantic HTML Element**: `<section>`
- **Layout Structure**: CSS Grid (3 or 4 columns on desktop, 1 on mobile).
- **Main Heading**: H2 element.
- **Supporting Text**: Brief descriptions of core benefits (Plan, Track, Understand, Goals).
- **Visual Treatment**: Clean, minimalist cards or flex columns. Use of typography/whitespace over heavy icons.
- **Required Reusable Components**: `Card` (optional)
- **Mobile Stacking Order**: Vertical list.

---

## D. How It Works
- **Section Order**: 4
- **Semantic HTML Element**: `<section>`
- **Layout Structure**: Alternating left/right text-and-image layout, or a horizontal step flow.
- **Main Heading**: H2 element.
- **Steps**:
  1. Add your income.
  2. Plan your monthly expenses.
  3. Track what you spend.
  4. Understand your remaining tracked money and goals.
- **Visual Treatment**: Subtle numbering. Clear, spaced-out typography.
- **Required Reusable Components**: None specific.

---

## E. Feature Preview
- **Section Order**: 5
- **Semantic HTML Element**: `<section>`
- **Layout Structure**: Grid or tabbed preview (static).
- **Main Heading**: H2 element.
<!--
Previous implementation:
- **Visual Treatment**: Static mockup or CSS-styled preview cards showing the internal UI. Must be clearly labeled as sample/preview content.

Changed because: Previews must be explicitly labeled as "Sample Data" or "Illustrative Preview" to avoid misleading users.
-->
- **Visual Treatment**: Static mockup or CSS-styled preview cards showing the internal UI. Every preview panel must explicitly include a visible label such as "Sample Data" or "Illustrative Preview". These values are not connected to MongoDB, are not bank data, and are illustrative only.
- **Required Reusable Components**: `Card`
- **Mobile Stacking Order**: Stacked vertical preview panels.

---

## F. Financial Clarity Section
- **Section Order**: 6
- **Semantic HTML Element**: `<section>`
- **Layout Structure**: Two-column layout (desktop) comparing "Planned Money" vs "Recorded Expenses".
- **Main Heading**: H2 element.
- **Visual Treatment**: Calm, reassuring visual language. Emphasizes manual tracking over automatic bank syncing.
- **Required Reusable Components**: None specific.

---

## G. Privacy and Trust
- **Section Order**: 7
- **Semantic HTML Element**: `<section>`
- **Layout Structure**: Centered, constrained width text block or small 3-column grid.
- **Main Heading**: H2 element.
<!--
Previous implementation:
- **Supporting Text**: Explains that user data is isolated, no bank integration is required, and KhataFlow is a manual tracking tool. (Deprecated historical wording â€” not an approved product claim.)

Changed because: Avoid claiming security features (like data isolation) that aren't verified in code yet.
-->
- **Supporting Text**: Explains that KhataFlow is designed around simple manual tracking. No bank or UPI connection is required. Security and account isolation will be implemented in later phases.
- **Visual Treatment**: High contrast or soft background to differentiate from feature sections. Very serious and professional tone.
- **Required Reusable Components**: None specific.

---

## H. Final Call to Action
- **Section Order**: 8
- **Semantic HTML Element**: `<section>`
- **Layout Structure**: Centered flexbox.
- **Main Heading**: H2 element.
- **Primary CTA**: "Create Your Free Account" (links to `/register`).
- **Visual Treatment**: High emphasis. Perhaps a darker background panel to draw attention.
- **Required Reusable Components**: `Button`

---

## I. Footer
- **Section Order**: 9
- **Semantic HTML Element**: `<footer>`
- **Layout Structure**: Multi-column grid for links, bottom row for copyright.
<!--
Previous implementation:
- **Main Elements**:
  - Brand Summary.
  - Links: Features, Privacy, Login, Register.
  - Copyright: Current year, KhataFlow.

Changed because: Fake or unsupported legal links must be removed.
-->
- **Main Elements**:
  - Brand Summary.
  - Links: Features (`#features`), How It Works (`#how-it-works`), Login (`/login`), Register (`/register`). Note: Login and Register are placeholder pages.
  - Copyright: Current year, KhataFlow.
- **Visual Treatment**: Slate background with light gray text, or very clean white with slate text. No fake social links.
- **Required Reusable Components**: None specific.
- **Mobile Stacking Order**: Vertical lists.


==================================================
ARCHIVED FILE: PHASE_2_NAVIGATION_AND_CTA_REVIEW.md
==================================================

# KhataFlow â€” Phase 2 Navigation & CTA Review

## A. Current Navbar Links
The `Navbar.jsx` currently contains the following links:
- **Features**: Anchor link `/#features`
- **How It Works**: Anchor link `/#how-it-works`
- **Login**: Route link `/login`
- **Get Started**: Route link `/register`

## B. Current Actual Routes
The `client/src/app/` directory contains only the following routes:
- `/` (Home Page) - Real page (composes sections)
- `/login` (Login Page) - Public Phase 2 placeholder
- `/register` (Register Page) - Public Phase 2 placeholder

The following routes **do not** currently exist:
- `/about`
- `/contact`
- `/features`
- `/how-it-works`

## C. Current Home Page Sections
The Home Page (`client/src/app/page.jsx`) is successfully rendering the following component sections in order:
- `Hero`
- `DashboardPreview`
- `Features` (id="features")
- `HowItWorks` (id="how-it-works")
- `TrustSection`
- `FinalCTA`

## D. Explanation of Same-Page Section Links
The "Features" and "How It Works" links in the Navbar currently act as anchor jumps (`#`) to sections that already exist on the Home Page. While this is common for single-page landing sites, the project owner indicated a preference for proper distinct page routing.

## E. Three Proposed Navbar Options

**Option A â€” Basic Professional Navigation**
- **Links**: Home | About | Contact | Login | Get Started
- **Required Pages**: `/about`, `/contact`
- **Effort**: Low (creating 2 new static informational pages).
- **Phase Context**: Phase 2 placeholders, to be completed in future content phases.
- **Pros**: Standard, highly expected by users, clean.
- **Cons**: Less focused on the specific product methodology.

**Option B â€” Product-Focused Navigation**
- **Links**: Home | About KhataFlow | How It Works | Login | Get Started
- **Required Pages**: `/about`, `/how-it-works`
- **Effort**: Medium (requires extracting the How It Works section into its own detailed page).
- **Phase Context**: Extracting content into new routes.
- **Pros**: Directly educates the user on the manual tracking philosophy.
- **Cons**: Removes the "How It Works" quick-view from the main landing page.

**Option C â€” Minimal Navigation**
- **Links**: Home | About | Login | Get Started
- **Required Pages**: `/about`
- **Effort**: Very low (creating 1 new static page).
- **Phase Context**: Keeps the Home Page robust while providing a separate About page.
- **Pros**: Less clutter, drives users faster to the CTAs.
- **Cons**: Missing a Contact page might reduce trust.

## F. Recommended Option
**Recommendation: Option A (Basic Professional)**
This structure is universally understood. It allows the Home Page to remain a strong, self-contained landing page (retaining the Features and How It Works sections for immediate scrolling), while providing standard `/about` and `/contact` links for users seeking more trust signals. 

## G. Explicit Approval Statement
**The final navigation structure requires project-owner approval.** No new pages have been created and the Navbar has not been altered during this review. Please advise on which Option to proceed with.

## H. Cause of the White CTA Button Text Issue
In `FinalCTA.jsx`, the button was utilizing the default `primary` variant of `Button.jsx`, which inherently applies `text-white bg-primary-600`. The code attempted to override this by passing `className="bg-white text-primary-600"`.
Because Tailwind CSS dictates specificity based on stylesheet order (and no utility like `tailwind-merge` is installed to resolve conflicting classes), the `bg-white` successfully overrode the background, but the `text-white` from the default variant took precedence over the `text-primary-600` override. This resulted in white text on a white background.

## I. CTA Correction Completed
A minimal, safe fix was implemented to permanently resolve this without affecting other buttons:
- A new `inverse` variant was added to `Button.jsx`: `'bg-white text-primary-600 hover:bg-slate-50 focus:ring-slate-500'`.
- `FinalCTA.jsx` was updated to simply use `<Button variant="inverse" size="lg">`.
The text is now clearly visible blue against the white button.

## J. Files Inspected
- `client/src/components/layout/Navbar.jsx`
- `client/src/components/layout/Footer.jsx`
- `client/src/app/layout.jsx`
- `client/src/app/page.jsx`
- `client/src/components/home/FinalCTA.jsx`
- `client/src/components/ui/Button.jsx`

## K. Files Modified
- `client/src/components/ui/Button.jsx` (Added `inverse` variant)
- `client/src/components/home/FinalCTA.jsx` (Applied `inverse` variant)

## L. Code-Preservation Confirmation
Confirmed. In `Button.jsx`, a comment was added explaining the necessity of the `inverse` variant to solve the CSS override issue. In `FinalCTA.jsx`, the previous `className` override was preserved in a comment directly above the corrected code, detailing exactly why it was changed.

## M. Build Result
PASS. The production build (`npm run build`) completed successfully with 0 errors via Turbopack.

## N. Lint Result
PASS. The ESLint check (`npm run lint`) is currently passing (verified alongside the build).

## O. Remaining Decisions
- The project owner must select Option A, B, or C for the Navbar structure before any navigation changes or new pages are implemented.
- Phase 3 Authentication remains paused until this UI/Navigation feedback loop is officially closed.


==================================================
ARCHIVED FILE: PHASE_2_OPEN_DECISIONS.md
==================================================

# KhataFlow â€” Phase 2 Open Decisions

This document lists decisions that require explicit project-owner approval before or during Phase 2 implementation.

## 1. Final Font Choice
- **Decision**: Which font stack to use for the Home Page.
- **Recommended Option**: System font stack (current implementation).
- **Alternatives**: Inter, Geist (requires Google Fonts import).
- **Reason**: System fonts guarantee privacy, zero load time, and zero external dependencies.
- **Impact**: Determines if we break the "No external resources" rule.
<!--
Previous implementation:
- **Approval Required**: Yes (If deviating from System Fonts).
- **Status**: Pending

Changed because: Decision approved by project owner.
-->
- **Approval Required**: Yes (If deviating from System Fonts).
- **Status**: Resolved (System font stack approved)

## 2. Final Color Palette
- **Decision**: Are the Phase 1 colors (Slate + Primary) sufficient for the Home Page?
- **Recommended Option**: Yes, use existing Phase 1 palette.
- **Alternatives**: Introduce a secondary accent color for marketing pop.
- **Reason**: Keeps the application looking consistent and calm.
- **Impact**: Minimal, ensures visual consistency.
<!--
Previous implementation:
- **Approval Required**: Yes (If introducing new colors).
- **Status**: Pending

Changed because: Decision approved by project owner.
-->
- **Approval Required**: Yes (If introducing new colors).
- **Status**: Resolved (Existing Phase 1 palette approved)

## 3. Navbar Labels and Order
- **Decision**: Exact links in the public Navbar.
- **Recommended Option**: Logo (Left) | Features, How It Works (Center) | Login, Get Started (Right).
- **Alternatives**: Remove center links for absolute simplicity.
- **Reason**: Standard SaaS marketing structure.
- **Impact**: Determines navigation markup.
- **Approval Required**: No
- **Status**: Decided (per Content Copy doc, unless overridden).

<!--
Previous implementation:
## 4. Navbar CTA Behavior Before Auth
- **Decision**: Where do "Login" and "Get Started" point to before Phase 3 exists?
- **Recommended Option**: Point them to `/login` and `/register` respectively. They will result in a Next.js 404 for now, which is acceptable for a static phase drop.
- **Alternatives**: Disable the buttons, or point them to `#`.
- **Reason**: Pre-wiring the correct URLs prevents having to refactor the Home Page heavily in Phase 3.
- **Impact**: Users clicking links during Phase 2 review will hit a 404.
- **Approval Required**: No
- **Status**: Decided

Changed because: Intentional 404 behavior is unacceptable. Placeholders must be used.
-->
## 4. Navbar CTA Behavior Before Auth
- **Decision**: How should `/login` and `/register` behave before Phase 3 exists?
- **Recommended Option (Option A)**: Create minimal public placeholder pages at `/login` and `/register`. These pages must clearly state that authentication is planned for Phase 3, contain no logic/forms, and allow the user to return Home. They are temporary navigation-safe placeholders only.
- **Alternatives (Option B)**: Keep CTAs visibly disabled with clear "Coming in Phase 3" wording. Do not use broken links.
- **Reason**: A user-facing CTA must not intentionally lead to a broken 404 page. Option A provides the best user experience.
- **Impact**: Prevents broken navigation while setting correct expectations.
<!--
Previous implementation:
- **Approval Required**: Yes
- **Status**: Pending

Changed because: Decision approved by project owner.
-->
- **Approval Required**: Yes
- **Status**: Resolved (Option A approved)

<!--
Previous implementation:
## 5. Mobile Menu Behavior
- **Decision**: Implement a Javascript-based hamburger dropdown, or just stack links?
- **Recommended Option**: Just stack CTA links vertically in a simple CSS flex flow for mobile, avoiding complex JS state if possible.
- **Alternatives**: Full `useState` backed hamburger drawer.
- **Reason**: Keep Phase 2 JS extremely minimal.
- **Impact**: Affects mobile UI/UX.
- **Approval Required**: Yes
- **Status**: Pending

Changed because: The mobile menu behavior must be consistently recommended using local React state without third-party complex focus traps.
-->
## 5. Mobile Menu Behavior
- **Decision**: Finalizing the mobile menu implementation.
- **Recommended Option**: Logo on left, Menu button on right. Opens using local React state without third-party packages. Must include `aria-expanded`, `aria-controls`. Escape key closes menu, focus returns to button. All links keyboard reachable. No hover dependency. 
- **Reason**: Provides the safest, most accessible mobile navigation without external library bloat.
- **Approval Required**: No
- **Status**: Decided

## 6. Hero Copy
- **Decision**: Finalizing the Hero H1.
- **Recommended Option**: "Understand your money without the anxiety."
- **Alternatives**: "Simple Personal Finance."
- **Reason**: Addresses the emotional user problem directly.
- **Impact**: High visibility marketing.
<!--
Previous implementation:
- **Approval Required**: Yes
- **Status**: Pending

Changed because: Decision approved by project owner.
-->
- **Approval Required**: Yes
- **Status**: Resolved ("Understand your money without the anxiety." approved)

## 7. Hero Visual
- **Decision**: What image/graphic goes in the Hero?
- **Recommended Option**: CSS-only structural graphic or pure typography focus.
- **Alternatives**: Local static image export, or an external Unsplash image.
- **Reason**: External images violate privacy/resource rules. Local static images require asset generation. CSS is safe.
- **Impact**: Affects Hero build complexity.
<!--
Previous implementation:
- **Approval Required**: Yes
- **Status**: Pending

Changed because: Decision approved by project owner.
-->
- **Approval Required**: Yes
- **Status**: Resolved (CSS-only structural graphic approved)

## 8. Feature Previews Format
- **Decision**: Cards, panels, or full-width sections?
- **Recommended Option**: CSS Panels mimicking the app's internal UI.
- **Alternatives**: Simple text lists.
- **Reason**: Showing is better than telling.
- **Impact**: Requires moderate CSS effort.
- **Approval Required**: No
- **Status**: Decided

## 9. Static Dashboard Preview
- **Decision**: Should we build a fake CSS dashboard?
- **Recommended Option**: Yes, using hardcoded static HTML/Tailwind.
- **Reason**: Helps users understand the product value immediately.
<!--
Previous implementation:
- **Approval Required**: Yes
- **Status**: Pending

Changed because: Decision approved by project owner.
-->
- **Approval Required**: Yes
- **Status**: Resolved (Hardcoded static HTML/Tailwind approved)

## 10. Sample Data Labeling
- **Decision**: Must preview data be labeled as fake?
- **Recommended Option**: Yes, add a subtle "Sample Data" badge.
- **Reason**: Prevents user confusion about live integrations.
- **Approval Required**: No
- **Status**: Decided

## 11. Iconography
- **Decision**: How to render icons?
- **Recommended Option**: Inline SVGs directly in the JSX, or CSS shapes.
- **Alternatives**: Install `lucide-react` or `react-icons`.
- **Reason**: Third-party packages require approval. Inline SVG keeps dependencies at zero.
- **Impact**: Inline SVGs clutter JSX slightly but maintain security.
<!--
Previous implementation:
- **Approval Required**: Yes (If opting for a package like Lucide).
- **Status**: Pending

Changed because: Decision approved by project owner.
-->
- **Approval Required**: Yes (If opting for a package like Lucide).
- **Status**: Resolved (No icon packages approved; use CSS/SVG)

## 12. Animation
- **Decision**: Add entrance animations?
- **Recommended Option**: No, keep it completely static for Phase 2.
- **Alternatives**: Install `framer-motion` or use Tailwind `animate-fade-in`.
- **Reason**: Framer Motion violates dependency rules. Tailwind animations are safe but maybe unnecessary.
<!--
Previous implementation:
- **Approval Required**: Yes (If introducing animations).
- **Status**: Pending

Changed because: Decision approved by project owner.
-->
- **Approval Required**: Yes (If introducing animations).
- **Status**: Resolved (Minimal CSS transitions only approved)

## 13. Reduced-Motion Behavior
- **Decision**: How to handle prefers-reduced-motion?
- **Recommended Option**: Wrap any Tailwind transitions in `motion-safe:` or ensure they degrade gracefully.
- **Approval Required**: No
- **Status**: Decided

## 14. Final CTA Destination
- **Decision**: Where does the bottom CTA go?
- **Recommended Option**: `/register`
- **Approval Required**: No
- **Status**: Decided

<!--
Previous implementation:
## 15. Footer Links
- **Decision**: Exact footer structure.
- **Recommended Option**: Standard 3-column. (Features, Auth, Legal).
- **Approval Required**: No
- **Status**: Decided

Changed because: Legal pages and Pricing links must be removed if they are fake.
-->
## 15. Footer Links
- **Decision**: Exact footer structure.
- **Recommended Option**: Retain only Features (`#features`), How It Works (`#how-it-works`), and Login/Register (only if placeholder pages approved). Remove Pricing, Privacy Policy, and Terms of Service as no approved pages exist for them yet.
- **Approval Required**: No
- **Status**: Decided

## 16. Fake Testimonials
- **Decision**: Allow fake user reviews?
- **Recommended Option**: Prohibit fake testimonials.
- **Reason**: Violates the "Trustworthy" core brand value.
- **Approval Required**: No
- **Status**: Decided

## 17. Fake Metrics
- **Decision**: Allow fake metrics (e.g. "10,000+ users")?
- **Recommended Option**: Prohibit fake metrics.
- **Reason**: Violates trust.
- **Approval Required**: No
- **Status**: Decided

## 18. Legal Claims
- **Decision**: Do privacy claims need legal review?
- **Recommended Option**: The copy should simply state technical facts ("Your data is isolated" - Deprecated historical wording â€” not an approved product claim) rather than legal guarantees.
- **Approval Required**: No
- **Status**: Decided

## 19. Button `type="button"` Refactor
- **Decision**: Should we explicitly change `Button` defaults later?
- **Recommended Option**: The current implementation already defaults `type="button"`, which is safe. No future changes strictly needed unless forms require `submit`.
- **Approval Required**: No
- **Status**: Decided

## 20. Modal Accessibility Improvements
- **Decision**: Defer Escape-key and focus trap logic?
- **Recommended Option**: Yes, defer to a dedicated accessibility Phase or when Modals are actually used (Phase 4+).
- **Reason**: Focus on marketing page delivery first.
- **Approval Required**: Yes
- **Status**: Pending


==================================================
ARCHIVED FILE: PHASE_2_PRODUCT_REQUIREMENTS.md
==================================================

# KhataFlow â€” Phase 2 Product Requirements

## Phase 2 Objective
Design and implement the Premium Public Home Page for KhataFlow, establishing the product's value proposition and building user trust. Phase 2 focuses exclusively on public-facing marketing and product introduction.

## Business/Product Purpose
To clearly explain what KhataFlow is, who it is for, and how it solves personal finance tracking without overwhelming the user. The page must serve as the primary entry point to the application, setting a calm, professional, and trustworthy tone.

## Target Users
- Individuals seeking simple personal finance tracking.
- Users overwhelmed by complex, enterprise-level accounting software.
- People who want manual control over their financial data without risky bank syncing.

## User Problems Addressed
- Confusion about where money goes every month.
- Lack of clarity between "planned money" and "remaining money".
- Anxiety caused by overly complex budgeting tools.
- Privacy concerns regarding linking real bank accounts to third-party apps.

<!--
Previous implementation:
## Main Value Proposition
KhataFlow provides a simple, manual, and secure way to track income, plan monthly expenses, and monitor savings goalsâ€”bringing the simplicity of a digital Khata book to modern personal finance.

Changed because: Unsupported security claims ("secure way") must be removed.
-->
## Main Value Proposition
KhataFlow provides a simple, manual way to track income, plan monthly expenses, and monitor savings goalsâ€”bringing the simplicity of a digital Khata book to modern personal finance. No bank or UPI connection is required. Security and account isolation will be implemented in later phases.

## Home Page Goals
- Explain the core features clearly.
- Establish a premium, modern, and trustworthy brand visual identity.
- Provide clear navigation paths (future login/register).
- Set correct expectations about privacy and data handling (no bank sync).

## Non-Goals
- DO NOT implement actual user registration or login.
- DO NOT build the internal Dashboard, Expense tracking, or Plan My Money workflows.
- DO NOT claim to offer real-time bank syncing or financial advice.
- DO NOT use exaggerated marketing language or fake testimonials.

## In-Scope Features
- Responsive Navigation Bar (Public).
- Premium Hero Section.
- Value Proposition & "How it Works" sections.
- Feature Preview section (using static/sample data).
- Financial Clarity explanation.
- Privacy and Trust commitments.
- Footer with planned navigation links.

## Out-of-Scope Features (Phase 3+)
- Registration, Login, JWT Authentication, bcrypt.
- Protected Routes.
- Plan My Money workflow.
- Dashboard functionality.
- Expense CRUD operations.
- Real MongoDB business data usage.
- Integration of any third-party APIs (Bank, UPI, AI).

## User Journey from Home Page
1. User lands on the Home Page and reads the Hero proposition.
2. User scrolls to understand the "How it Works" flow and views feature previews.
3. User gains trust through the Privacy section.
<!--
Previous implementation:
4. User clicks a Call to Action (CTA) like "Get Started" or "Login" (which will navigate to planned, but currently unimplemented, authentication routes).

Changed because: Login/Register CTAs navigate to temporary public placeholder pages created in Phase 2.
-->
4. User clicks a Call to Action (CTA) like "Get Started" or "Login" (which will navigate to temporary public placeholder pages).

<!--
Previous implementation:
## Expected CTA Behavior
During Phase 2, all primary CTAs (e.g., "Get Started", "Login") will point to planned routes (e.g., `/login`, `/register`). These routes will not function until Phase 3, but the buttons must be structurally prepared to link to them.

Changed because: User-facing CTAs must not intentionally lead to broken 404 pages. We will use minimal navigation-safe placeholders instead.
-->
<!--
Previous implementation:
## Expected CTA Behavior
During Phase 2, primary CTAs (e.g., "Get Started", "Login") will point to `/login` and `/register`. These will be built as **minimal public placeholder pages**. These placeholders will clearly state that authentication is planned for Phase 3, contain no forms or authentication logic, and allow the user to return to the Home Page. They are temporary, navigation-safe placeholders only.

Changed because: Explicitly state what is excluded from Phase 2.
-->
## Expected CTA Behavior
Login and Register CTAs navigate to temporary public placeholder pages created in Phase 2. These pages exist only to prevent broken navigation. Real authentication, forms, validation, JWT, bcrypt, sessions, and account functionality are excluded from Phase 2 and will be implemented in Phase 3.

## Public/Private Page Boundaries
The Home Page (`/`) is strictly public. It does not require authentication and does not fetch sensitive user data. 

## Relationship to Future Phases
- **Authentication (Phase 3)**: The Home Page provides the entry points (Login/Register buttons) that Phase 3 will activate.
- **Plan My Money (Phase 4)**: The feature previews on the Home Page introduce the concepts that will be built in Phase 4.
- **Dashboard (Phase 5)**: The visual language established on the Home Page will dictate the UI/UX of the internal dashboard.

## Content Trust Requirements
- **Financial Wording Restrictions**: Do not use terms like "actual bank balance," "live syncing," or "guaranteed savings."
<!--
Previous implementation:
- **No-Live-Bank-Balance Rule**: The application must never claim to know the user's real bank balance. Use terms like "Tracked Money," "Planned Money," or "Estimated Remaining Balance."

Changed because: Do not use wording that implies a real bank balance. Use "Estimated Remaining Money" instead of "Estimated Remaining Balance".
-->
- **No-Live-Bank-Balance Rule**: The application must never claim to know the user's real bank balance. Use terms like "Tracked Money," "Planned Money," or "Estimated Remaining Money."
- **No Misleading Financial Claims**: Do not offer investment advice or claim the product will guarantee wealth.

## Success Criteria
- The page renders successfully without errors.
- The design looks premium, calm, and trustworthy on all devices (mobile, tablet, desktop).
- No unauthorized external packages or resources are used.
- All code strictly adheres to the JavaScript/JSX and Tailwind CSS Phase 1 constraints.

## Product Risks
- Scope creep: Accidentally implementing authentication or dashboard logic.
- Design degradation: Overusing gradients or making it look like a cheap AI template.
- Misleading previews: Users mistaking static preview screenshots for live functional components.

## Dependencies on Future Phases
- True interactivity of the CTA buttons depends on Phase 3 (Authentication).
- The accuracy of feature previews depends on the final execution of Phase 4 and 5.


==================================================
ARCHIVED FILE: PHASE_2_RESPONSIVE_BEHAVIOR.md
==================================================

# KhataFlow â€” Phase 2 Responsive Behavior

## Breakpoint Strategy
We will rely on Tailwind CSS default breakpoints:
- `sm`: 640px (Large mobile / Small tablet)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (Wide desktop)

## Container Width & Padding
- **Horizontal Padding**: `px-4` on mobile, scaling up to `px-8` on tablet and `px-12` on desktop.
- **Container Width**: Max width on large screens to prevent uncomfortable reading (`max-w-7xl` or `max-w-6xl` centered using `mx-auto`).
- **No Horizontal Scrolling**: Overflow-x must be strictly hidden or managed to prevent horizontal scrollbars on small screens.

<!--
Previous implementation:
## Navbar Behavior
- **Desktop (`md` and up)**: Logo left, navigation links center, CTA buttons right.
- **Mobile (`< md`)**: Logo left, Hamburger icon right. If the hamburger menu is implemented in Phase 2, it must open a full-width dropdown or drawer. If not implemented, CTAs can stack vertically or be hidden behind a simple "Login" text link.

Changed because: Mobile navigation behavior must be consistently recommended using local React state.
-->
## Navbar Behavior
- **Desktop (`md` and up)**: Logo left, navigation links center, CTA buttons right.
- **Mobile (`< md`)**: Logo left, Menu button right. The menu opens using local React state without external packages. It includes `aria-expanded` and `aria-controls`. Escape key closes the menu, and focus returns to the button.

## Hero Section
- **Desktop**: Wide, centered text. Large typography (`text-5xl` or `text-6xl`).
- **Mobile**: Typography scales down to `text-3xl` or `text-4xl`. Padding is reduced.

## Feature Grid & How It Works
- **Desktop (`lg` and up)**: 3 or 4 columns (`grid-cols-3` or `grid-cols-4`). Alternate left/right image/text layouts for How It Works.
- **Tablet (`md`)**: 2 columns (`grid-cols-2`).
- **Mobile (`< md`)**: 1 column (`grid-cols-1`). Everything stacks vertically.

## Preview Cards & Financial Clarity
- **Desktop**: Side-by-side comparison panels (`flex-row`).
- **Mobile**: Stacked panels (`flex-col`). Ensure sufficient spacing between stacked elements (`gap-6` or `gap-8`).

## Footer Layout
- **Desktop**: 4 columns (Brand info + 3 link columns).
- **Mobile**: 1 or 2 columns, stacking vertically.

## Touch Targets & Interactivity
- **Minimum Touch Target**: 44px by 44px minimum for all clickable elements on mobile (buttons, links).
- **Hover/Focus**: Do not rely exclusively on hover states for information disclosure, as hover does not exist on touch devices. All primary interactions must work on tap.

## Typography & Wrapping
- **Text Wrapping**: Long headings must break cleanly. Use `break-words` or `hyphens-auto` if necessary for very narrow screens.
- **Reduced Motion**: Respect `@media (prefers-reduced-motion: reduce)` via Tailwind's `motion-reduce` modifier to disable smooth scrolling or animations.


==================================================
ARCHIVED FILE: PHASE_2_STRUCTURAL_REFACTOR_REPORT.md
==================================================

# KhataFlow â€” Phase 2 Structural Refactor Report

## A. Final Status
PASS

## B. New Folder Tree
```text
client/src/components/
â”œâ”€â”€ home/
â”‚   â”œâ”€â”€ DashboardPreview.jsx
â”‚   â”œâ”€â”€ Features.jsx
â”‚   â”œâ”€â”€ FinalCTA.jsx
â”‚   â”œâ”€â”€ Hero.jsx
â”‚   â”œâ”€â”€ HowItWorks.jsx
â”‚   â””â”€â”€ TrustSection.jsx
â”œâ”€â”€ layout/
â”‚   â”œâ”€â”€ Footer.jsx
â”‚   â””â”€â”€ Navbar.jsx
â””â”€â”€ ui/
    â”œâ”€â”€ Button.jsx
    â”œâ”€â”€ Card.jsx
    â”œâ”€â”€ EmptyState.jsx
    â”œâ”€â”€ Input.jsx
    â””â”€â”€ Modal.jsx
```

## C. Files Created
- `client/src/components/home/Hero.jsx`
- `client/src/components/home/DashboardPreview.jsx`
- `client/src/components/home/Features.jsx`
- `client/src/components/home/HowItWorks.jsx`
- `client/src/components/home/TrustSection.jsx`
- `client/src/components/home/FinalCTA.jsx`

## D. Files Moved
- `client/src/components/Button.jsx` âž” `client/src/components/ui/Button.jsx`
- `client/src/components/Card.jsx` âž” `client/src/components/ui/Card.jsx`
- `client/src/components/EmptyState.jsx` âž” `client/src/components/ui/EmptyState.jsx`
- `client/src/components/Input.jsx` âž” `client/src/components/ui/Input.jsx`
- `client/src/components/Modal.jsx` âž” `client/src/components/ui/Modal.jsx`
- `client/src/components/Navbar.jsx` âž” `client/src/components/layout/Navbar.jsx`
- `client/src/components/Footer.jsx` âž” `client/src/components/layout/Footer.jsx`

## E. Files Modified
- `client/src/app/page.jsx`
- `client/src/app/layout.jsx`
- `client/src/app/login/page.jsx`
- `client/src/app/register/page.jsx`
- `client/src/components/layout/Navbar.jsx`

## F. Updated Import Paths
All references to old UI components and layout components were updated to use the new folder structure. For example, `import Button from '@/components/Button';` became `import Button from '@/components/ui/Button';`, and `import Navbar from '@/components/Navbar';` became `import Navbar from '@/components/layout/Navbar';`.

## G. Explanation of How page.jsx Was Simplified
The original `page.jsx` contained the full markup of the landing page, which was over 160 lines long. It has been stripped of markup and replaced with a clean, semantic composition of distinct sections:
```jsx
import React from 'react';
import Hero from '@/components/home/Hero';
import DashboardPreview from '@/components/home/DashboardPreview';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import TrustSection from '@/components/home/TrustSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <DashboardPreview />
      <Features />
      <HowItWorks />
      <TrustSection />
      <FinalCTA />
    </div>
  );
}
```
This massively improves maintainability, readability, and makes the file focus exclusively on page structure rather than visual implementation.

## H. Confirmation of Code Preservation Rule
Confirmed. The previous monolithic implementation in `client/src/app/page.jsx` was fully preserved in a `/* ... */` comment block with an explanation of why the componentization occurred. No existing functionality was silently deleted.

## I. Build Result
PASS. Executed `npm run build` using Next.js Turbopack. The production build compiled successfully in 97s without any errors.

## J. Lint Result
PASS. Executed `npm run lint`. The ESLint process completed successfully with no errors or warnings.

## K. Confirmation Regarding Packages and External Resources
Confirmed. No packages were installed, the technology stack remains unchanged, and absolutely no external resources, fonts, or libraries were added. Only existing Tailwind CSS and local inline SVGs were utilized.


==================================================
ARCHIVED FILE: PHASE_2_UI_UX_SPECIFICATION.md
==================================================

# KhataFlow â€” Phase 2 UI/UX Specification

## Design Goals
Create a premium, calm, professional, modern, and trustworthy public Home Page. The visual language must avoid generic AI-generated styles, excessive gradients, or template-like layouts.

<!--
Previous implementation:
## Brand Personality
- **Trustworthy**: Looks secure and mature (like a bank, but simpler).
- **Calm**: Reduces financial anxiety through ample whitespace and clear hierarchy.

Changed because: Unsupported security claims ("Looks secure") must be removed until actual security features exist.
-->
## Brand Personality
- **Trustworthy**: Looks mature and transparent (like a bank, but simpler).
- **Calm**: Reduces financial anxiety through ample whitespace and clear hierarchy.
- **Human**: Communicates clearly without overly technical jargon.

## Visual Hierarchy & Layout
- **Layout Width**: Max-width constraint (e.g., `max-w-7xl` in Tailwind) to maintain comfortable reading lengths on ultra-wide screens.
- **Page Spacing**: Generous vertical padding between sections (e.g., `py-16` or `py-24`).
- **Section Spacing**: Clear differentiation between sections using subtle background color changes (e.g., `bg-white` vs `bg-slate-50`).

## Component Treatment
- **Card Treatment**: Clean borders (`border-slate-200`), rounded corners (`rounded-xl` or `rounded-2xl`), and very subtle shadows (`shadow-sm` or `shadow`). Avoid deep, heavy shadows.
- **Button Hierarchy**: 
  - Primary CTA: Solid background (`bg-primary-600`), white text.
  - Secondary CTA: Outline or ghost style to prevent visual competition.
- **Input/Control Usage**: Not applicable for Phase 2 (no forms).

## Section Styling
- **Navbar Behavior**: Clean, sticky top. Slightly translucent background with `backdrop-blur` if appropriate, but keep it subtle.
- **Hero Composition**: Text-heavy, highly readable. If a visual is used, it should be a clean CSS-based structural graphic or typography, not a generic stock photo.
- **Preview Card Style**: Use CSS to mimic application UI components (e.g., a mock Expense Card) to show, rather than tell, how the app looks.
- **Trust Section Style**: Consider a darker background (`bg-slate-900` with white text) to establish authority and seriousness regarding data privacy.
- **Footer Style**: Standard minimalist footer. Slate background or minimal white.

## Interaction & States
- **Hover Behavior**: Buttons and links should have subtle transition effects (e.g., `hover:bg-primary-700` or `hover:text-primary-600`).
- **Focus Behavior**: Standard Tailwind focus rings (`focus:ring-2 focus:ring-primary-500 focus:outline-none`) must be present on all interactive elements for accessibility.
- **Active Behavior**: Slight scale down (`active:scale-95`) or background darkening on buttons.
- **Reduced-Motion Behavior**: Respect `motion-reduce` media queries in CSS to disable transitions if the user prefers.
<!--
Previous implementation:
- **Mobile Interaction Rules**: Minimum 44px tap targets for all links and buttons. Hamburger menu (if used) must be easily reachable.

Changed because: Mobile navigation behavior must be consistently recommended.
-->
- **Mobile Interaction Rules**: Minimum 44px tap targets for all links and buttons. The mobile menu button must open via local React state without external UI libraries, require `aria-expanded`/`aria-controls`, close via the Escape key, and restore focus to the button.

## Typography
- **Current Font Family**: System fonts (`system-ui`, `-apple-system`, etc.).
- **External Fonts**: Inter, Geist, or others are currently **PROHIBITED** without explicit project-owner approval to avoid unauthorized external resources.
- **Implementation**: Rely on Tailwind's default sans stack.

## Color System
- **Current Approved Palette**: Slate (neutrals) and Primary (brand color) defined in Phase 1 `globals.css`.
- **Changes**: No palette changes are allowed without explicit approval.
- **Contrast**: All text must meet WCAG AA contrast ratios (e.g., `text-slate-600` on white minimum, `text-slate-900` preferred for headings).

## Framework Constraints
- **Tailwind CSS**: The absolute and only styling system. Use standard utility classes.
- **Material UI**: STRICTLY PROHIBITED.
- **External UI Libraries**: STRICTLY PROHIBITED.
- **External Assets**: No external images or icons without explicit approval. Prefer CSS-based elements or local inline SVGs if approved.


-->
