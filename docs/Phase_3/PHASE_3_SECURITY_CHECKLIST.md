# Phase 3 Security Checklist

<!-- OLD CODE:
- [ ] `.env` is listed in `.gitignore`.
- [ ] No plaintext passwords stored in MongoDB.
- [ ] Passwords hashed with `bcrypt` using adequate salt rounds.
- [ ] Password hashes never returned in API payloads.
- [ ] Strong `JWT_SECRET` retrieved from environment variables.
- [ ] Input validation exists on both frontend and backend.
- [ ] Proper HTTP error codes (400, 401) returned on failure.
- [ ] No database crash traces exposed to the frontend.
- [ ] Token storage strategy selected securely.
Reason for change: Refined validation rules, hashing algorithm (bcryptjs), and environment tracking. -->

<!-- OLD CODE:
- [ ] `.env` and `.env.local` are listed in `.gitignore` (while tracking `.env.example`).
- [ ] No plaintext passwords stored in MongoDB.
- [ ] Passwords hashed securely (via `bcryptjs` for maximum cross-platform compatibility).
- [ ] Password hashes never returned in API payloads.
- [ ] Strong `JWT_SECRET` retrieved from environment variables.
- [ ] Comprehensive validation exists (handling whitespaces, types, length, valid email formats).
- [ ] Vague HTTP error messages returned on authentication failure ("Invalid credentials").
- [ ] No database crash traces exposed to the frontend (safe 500 errors).
- [x] Token storage strategy (HttpOnly vs LocalStorage) chosen explicitly by project owner. (Owner-approved authentication strategy: Option B — LocalStorage Bearer Token).
Reason for change: Segregated checklist into Code Inspection and Runtime E2E, marking runtime items as BLOCKED. -->

### A. Verified by Code Inspection
- [x] `bcryptjs` password hashing exists.
- [x] Password hashes are excluded from API responses.
- [x] JWT verification exists.
- [x] LocalStorage token storage exists.
- [x] Authorization Bearer header exists.
- [x] No real secrets are hardcoded.
- [x] `MONGODB_URI` and `JWT_SECRET` are loaded from environment variables.
- [x] Token storage strategy chosen explicitly (Option B — LocalStorage Bearer Token).

### B. Verified by Real Manual End-To-End Testing (Currently BLOCKED)
- [ ] Registration
- [ ] Login
- [ ] Incorrect credentials
- [ ] Duplicate email
- [ ] Logout
- [ ] Protected route
- [ ] `/me`
- [ ] Validation responses
- [ ] Full API lifecycle
