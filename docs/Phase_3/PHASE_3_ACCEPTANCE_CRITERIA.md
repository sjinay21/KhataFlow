# Phase 3 Acceptance Criteria

<!-- OLD CODE:
- [ ] A user can successfully register an account with a name, email, and password. (BLOCKED: Requires Owner `.env` and running MongoDB for E2E)
- [ ] A user can successfully login with correct credentials. (BLOCKED)
- [ ] A user is rejected when attempting to login with incorrect credentials. (BLOCKED)
- [ ] A user cannot register with an email that already exists. (BLOCKED)
- [ ] The backend issues a valid JWT upon successful authentication. (BLOCKED)
- [ ] The frontend successfully stores the token and updates the UI state. (BLOCKED)
- [x] Passwords are hashed in MongoDB. (Code Inspection: Verified `bcryptjs.hash` is used in `User.js` `pre('save')` hook)
- [x] No secrets are hardcoded in the codebase. (Code Inspection: Verified all `.env` loading and `.env.example` placeholders)
- [x] Phase 4 features (Dashboard, Transactions) remain untouched. (Code Inspection: Only protected placeholders exist)
Reason for change: Applied explicit PASS/BLOCKED labeling as requested. -->

- [ ] A user can successfully register an account with a name, email, and password. (BLOCKED — requires owner environment setup)
- [ ] A user can successfully login with correct credentials. (BLOCKED — requires owner environment setup)
- [ ] A user is rejected when attempting to login with incorrect credentials. (BLOCKED — requires owner environment setup)
- [ ] A user cannot register with an email that already exists. (BLOCKED — requires owner environment setup)
- [ ] The backend issues a valid JWT upon successful authentication. (BLOCKED — requires owner environment setup)
- [ ] The frontend successfully stores the token and updates the UI state. (BLOCKED — requires owner environment setup)
- [x] Passwords are hashed in MongoDB. (PASS — verified by code inspection)
- [x] No secrets are hardcoded in the codebase. (PASS — verified by code inspection)
- [x] Phase 4 features (Dashboard, Transactions) remain untouched. (PASS — verified by code inspection)
