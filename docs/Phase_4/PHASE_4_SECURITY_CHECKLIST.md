# Phase 4 Security Checklist

## 1. Authentication & Authorization
- [ ] Phase 3 `protect` middleware is actively applied to all Phase 4 routes (except static city estimates).
- [ ] `FinancialPlan` queries strictly filter by `user: req.user.id`.
- [ ] Cross-user access is impossible (User A cannot GET/PUT User B's plan).

## 2. Validation & Math Integrity
- [ ] Backend does NOT trust frontend calculated amounts. It recalculates amounts using the frontend's provided percentages and income.
- [ ] Percentages are validated to ensure they are >= 0 and <= 100.
- [ ] Total allocation percentage is strictly validated against the owner-approved cap (100%).
- [ ] Division by zero is safely handled if calculating backwards.

## 3. Mass Assignment
- [ ] `req.body` is destructured safely.
- [ ] Users cannot inject `{ isActive: true }` over someone else's plan version.
- [ ] Users cannot inject arbitrary fields into the MongoDB document.

## 4. Data Privacy & Logging
- [ ] No sensitive financial data (salary, specific expenses) is dumped into console logs or error logs.
- [ ] `server/.env` continues to securely hold the DB connection and JWT secrets without exposure.

## 5. Double-Counting Prevention
- [ ] The schema correctly separates distinct categories to prevent the user from subtracting the same debt EMI twice.
