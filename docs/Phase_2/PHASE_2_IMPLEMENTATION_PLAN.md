# KhataFlow — Phase 2 Implementation Plan

## Strict Code Preservation Rule
> **Permanent Rule:** No existing code may be silently overwritten or deleted. Whenever any existing code line is changed, preserve the old code as a comment with the reason for the change. This applies to all phases of KhataFlow.

## Implementation Steps

### 1. Workspace Inspection
- **Goal**: Confirm the workspace is clean.
- **Action**: Check `e:\projects\KhataFlow`.
- **Validation**: Ensure no TS files or unauthorized packages exist.

### 2. Read Project Direction & Phase 1 Docs
- **Goal**: Contextualize the design system.
- **Action**: Read `KhataFlow_Project_Direction.md` and Phase 1 architecture docs.

### 3. Inspect Current Frontend Foundation
- **Goal**: Review `globals.css` and `layout.jsx`.
- **Action**: Ensure Tailwind tokens are intact. Do not change system fonts.

### 4. Inspect Existing Reusable Components
- **Goal**: Review `Button.jsx`, `Card.jsx`.
- **Action**: Ensure they meet Phase 2 needs. Apply the preservation rule if modifying.

### 5. Confirm No Unauthorized Dependencies
- **Goal**: Dependency check.
- **Action**: Read `package.json`. No Material UI, no external UI frameworks.

### 6. Confirm No External Resources
- **Goal**: Security/Privacy check.
- **Action**: Ensure no Google Fonts or external URLs are hardcoded.

### 7. Implement Shared Layout Primitives
- **Goal**: Create generic section wrappers if needed.
- **Action**: Create `<Container>` or `<Section>` components, or just use inline Tailwind.

<!--
Previous implementation:
### 8. Implement Navbar
- **Goal**: Build the top navigation.
- **Files**: `client/src/components/Navbar.jsx` (New) or inline in `layout.jsx`.
- **Action**: Add static links and CTA buttons.

Changed because: Navbar mobile menu behavior requires explicit JS state (no external packages), and placeholders must be implemented for CTA links to be safe.
-->
### 8. Implement Navbar and Mobile Menu
- **Goal**: Build top navigation.
- **Files**: `client/src/components/Navbar.jsx`
- **Action**: Add static links and CTA buttons. Implement mobile menu using local React state. The menu button must include `aria-expanded` and `aria-controls`. Escape key must close the menu. Focus must return to the button after closing. All links must be keyboard reachable. No third-party UI libraries for the menu.

### 8b. Implement CTA Placeholder Pages
- **Goal**: Ensure navigation safety for Phase 2.
- **Files**: `client/src/app/login/page.jsx`, `client/src/app/register/page.jsx`
- **Action**: Create minimal, navigation-safe placeholder pages stating that authentication is planned for Phase 3. They must contain no forms, no authentication logic, and allow users to return Home.

### 9. Implement Hero
- **Goal**: Build the Hero section in `page.jsx`.
- **Files**: `client/src/app/page.jsx`.
- **Action**: Apply Hero copy, typography, and CTA. Replace the Phase 1 placeholder (preserve old code via comments).

### 10. Implement Value Proposition
- **Goal**: Add the 4 value prop cards.
- **Action**: Use CSS Grid and the `Card` component.

### 11. Implement How It Works
- **Goal**: Add the numbered steps section.
- **Action**: Use alternating flex layouts or a grid.

### 12. Implement Feature Preview
- **Goal**: Add static UI mockups.
- **Action**: Build static CSS representations of future screens. Clearly label as sample data.

### 13. Implement Financial Clarity Section
- **Goal**: Add the philosophical text block.
- **Action**: Two-column text layout.

### 14. Implement Privacy/Trust Section
- **Goal**: Build the Trust section.
- **Action**: Use a distinct background (e.g., `bg-slate-900` text white) to emphasize data safety.

### 15. Implement Final CTA
- **Goal**: Bottom conversion banner.
- **Action**: Centered CTA block linking to `/register`.

### 16. Implement Footer
- **Goal**: Build the page footer.
- **Files**: `client/src/components/Footer.jsx` (New) or inline in `layout.jsx`.
- **Action**: Add static links and copyright.

### 17. Add Responsive Behavior
- **Goal**: Ensure mobile compatibility.
- **Action**: Test `sm`, `md`, `lg` breakpoints via Tailwind classes.

### 18. Add Accessibility Behavior
- **Goal**: Ensure semantic HTML and keyboard navigation.
- **Action**: Review focus rings, ARIA labels, and heading hierarchy.

### 19. Validate Visual Consistency
- **Goal**: Match Phase 1 design tokens.
- **Action**: Check contrast and color usage.

### 20. Run Lint
- **Command**: `npm run lint`
- **Validation**: 0 errors.

### 21. Run Build
- **Command**: `npm run build`
- **Validation**: Successful Next.js static generation.

### 22. Run Application Checks
- **Command**: `npm run dev`
- **Validation**: Visually inspect the local server output.

### 23. Review Changed Files
- **Goal**: Audit against the preservation rule.
- **Action**: Ensure all modified lines from Phase 1 have their previous implementations commented out with explanations.

### 24. Verify No Scope Creep
- **Validation**: Ensure no backend logic, authentication, or live MongoDB data was accidentally wired up.

### 25. Produce Implementation Report
- **Goal**: Final closure.
- **Action**: Write Phase 2 completion report and STOP.

## Explicit Exclusions
- Do not implement authentication.
- Do not implement finance workflows.
- Do not add backend business logic.
- Do not install packages without explicit project-owner approval.
- Do not use external resources without explicit project-owner approval.
- Do not begin Phase 3 or later.
