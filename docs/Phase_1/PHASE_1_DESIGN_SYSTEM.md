# Phase 1: Design System Plan

## 6.1 Brand Personality
- **Mood**: Calm, reassuring, professional, and clear.
- **Feeling**: The user should feel in control of their money, not overwhelmed by accounting terminology.
- **Principles**: Clarity over decoration; typography drives hierarchy; whitespace is a tool for focus.
- **Avoid**: Random gradients, excessive shadows, generic AI-dashboard aesthetics, childish illustrations, cluttered interfaces.

## 6.2 Typography
- **Recommended Font Family**: **Inter** or **Geist**.
- **Why**: Both are modern, highly readable, neutral, and render numbers (tabular figures) exceptionally well, which is critical for financial data.
- **Readability**: Excellent across mobile and desktop.
- **Professional Appearance**: Extremely clean and trustworthy.
- **Font Loading Method**: The font loading method is still pending approval.
- **External Resource Rule**: External font requests are not allowed without explicit approval. Google Fonts must not be imported without explicit approval.
- **Fallback**: A local or system-safe fallback strategy must be considered (`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
- **Phase 2 Limit**: No external font resource may be used during Phase 2 without approval.

## 6.3 Color System
- **Primary Color Direction**: A deep, trustworthy Slate or Navy Blue.
- **Background Color**: Off-white (e.g., `#F8FAFC` or `#F9FAFB`) to reduce eye strain.
- **Surface/Card Color**: Pure White (`#FFFFFF`).
- **Main Text Color**: Slate 900 (`#0F172A`).
- **Muted Text Color**: Slate 500 (`#64748B`).
- **Border Color**: Slate 200 (`#E2E8F0`).
- **Success (Income/Savings)**: Emerald Green (`#10B981`).
- **Warning (Near Budget Limit)**: Amber (`#F59E0B`).
- **Danger (Expense/Over Budget)**: Rose/Red (`#EF4444`).
- **Hover/Focus/Disabled**: Defined via standard Tailwind utility adjustments (e.g., `hover:bg-slate-100`, `focus:ring`, `opacity-50`).
- **Dark Mode**: Deferred for MVP. Focus entirely on a pristine light mode first.
- **Accessibility**: All text colors will satisfy WCAG contrast ratios.

## 6.4 Spacing System
- **Base Approach**: Tailwind's default 4px rem-based scale (`p-4`, `m-4`).
- **Section Spacing**: Large (e.g., `py-12`, `gap-8`).
- **Card Padding**: Comfortable (e.g., `p-6`).
- **Form Spacing**: `gap-4` or `gap-6` between inputs.
- **Navbar Spacing**: `h-16 px-4 sm:px-6 lg:px-8`.
- **Mobile Spacing**: Slightly tighter (e.g., `p-4`).
- **Desktop Spacing**: Wider padding to utilize screen real estate.

## 6.5 Border-Radius System
- **Approach**: Subtle and professional. Not perfectly square, not overly pill-shaped.
- **Button Radius**: `rounded-md` or `rounded-lg`.
- **Input Radius**: `rounded-md`.
- **Card/Modal Radius**: `rounded-xl`.
- **Badge Radius**: `rounded-full`.
- **Table Radius**: `rounded-lg` on outer wrappers.

## 6.6 Shadow System
- **Approach**: Very minimal. Use borders predominantly.
- **Card Shadows**: `shadow-sm` for floating elements, otherwise rely on a 1px border.
- **Modal Shadows**: `shadow-xl`.
- **Hover Shadows**: `shadow-md` for interactive cards.
- **Avoid**: Deep, blurry, colored shadows.

## 6.7 Component Styles
- **Buttons**: Solid primary background, bold text. No gradients.
- **Inputs**: Clean 1px border, transparent background, solid focus ring (`ring-primary-500`).
- **Selects**: Match input styling.
- **Textareas**: Match input styling.
- **Labels**: Small, medium-weight, slate-700.
- **Cards**: White background, 1px subtle border.
- **Tables**: Clean horizontal dividers, muted header text.
- **Lists**: Bordered list items or cards.
- **Badges**: Soft background color with darker text.
- **Alerts**: Soft background color (e.g., `bg-red-50`) with darker text (`text-red-700`) and optional icon.
- **Modals**: Centered, backdrop blur, rounded-xl.
- **Navbar**: White background, bottom border (`border-b`).
- **Empty States**: Centered text, muted illustration/icon.
- **Loading States**: Skeletons matching element shapes.
- **Error States**: Red text, danger outlines.
- **Success States**: Green text, success outlines.

## 6.8 Responsiveness
- **Mobile**: Single column, full-width buttons, native-feeling inputs. Navigation hidden behind a hamburger menu or bottom bar.
- **Tablet**: Two-column grids for forms and dashboards.
- **Desktop**: Max-width constraints (e.g., `max-w-7xl` or `max-w-5xl`) centered on the screen to prevent stretched interfaces.
- **Touch Targets**: Minimum 44x44px clickable areas on mobile.
- **Text Wrapping**: Handled gracefully (`break-words`).
- **Tables on mobile**: Converted to card lists to avoid horizontal scrolling.

## 6.9 Accessibility
- **Color Contrast**: Strict adherence to WCAG.
- **Keyboard Navigation**: All interactive elements must be reachable via Tab.
- **Visible Focus States**: `focus-visible:ring` on all interactive elements.
- **Form Labels**: Explicitly linked `<label>` elements for every input.
- **Error Messages**: clearly linked to inputs via `aria-describedby`.
- **Screen-reader-friendly structure**: Proper heading hierarchy (`h1` -> `h2`).
- **Touch target sizes**: > 44px on mobile.
- **Reduced-motion**: Honor `prefers-reduced-motion`.
- **Semantic HTML**: `<nav>`, `<main>`, `<section>`, `<article>`.

## 6.10 Tailwind CSS Rules
- **Tailwind CSS is the primary styling system.**
- Use Tailwind CSS for Layout, Spacing, Typography, Colors, Responsive behavior, Borders, Border radius, Shadows, Buttons, Inputs, Cards, Navbar, Tables, States, and General component styling.
- Plain CSS must not be the main styling approach.
- Do not introduce another CSS framework without explicit approval.
- Material UI is NOT approved. Material UI cannot be installed or used unless the project owner explicitly approves it after reviewing the exact need, alternatives, advantages, disadvantages, dependency impact, bundle-size impact, and design-system impact. (https://mui.com/material-ui/)
- Do not install any UI library.
- If a special case genuinely requires custom CSS later, it must be explained and approved first.
