# KhataFlow — Phase 3 Planning Report

## A. Current Project Inspection Result
The KhataFlow workspace has been successfully inspected. Phase 2 frontend code sits cleanly in `client/` and a basic Express backend structure sits in `server/`. No duplicate `KhataFlow` directories were found. The codebase strictly adheres to the established project direction.

## B. Existing Frontend Routes
Currently, `client/src/app/` contains:
- `/` (Home)
- `/about` (Placeholder)
- `/contact` (Placeholder)
- `/login` (Placeholder)
- `/register` (Placeholder)

## C. Existing Backend Structure
The `server/src/` folder has a foundational Express setup:
- `server.js` (Entry point)
- `app.js` (Express configuration)
- `config/db.js` (MongoDB connection stub)
- `middleware/errorMiddleware.js`
- `routes/health.js`

## D. Existing Environment Files
<!-- OLD CODE: - `server/.env.example`: Exists and contains safe placeholder variables (`MONGO_URI=mongodb://localhost:27017/khataflow`, `JWT_SECRET=your_jwt_secret_here`).
Reason for change: Updated to use MONGODB_URI and safe placeholders. -->
- `server/.env.example`: Exists and contains safe placeholder variables (`MONGODB_URI=WRITE_YOUR_MONGODB_CONNECTION_STRING_HERE`, `JWT_SECRET=WRITE_YOUR_JWT_SECRET_HERE`).
- **No private `.env` file** currently exists in the repository.
- `server/.gitignore` explicitly ignores `.env` and `.env.*`.

## E. Proposed Phase 3 Scope
Phase 3 is strictly the **Authentication Foundation**. 
- It includes user registration, secure password hashing, user login, JWT generation, and basic auth state management on the frontend. 
<!-- OLD CODE: - It does **not** include dashboard building, reports, or financial transactions.
Reason for change: Clarified that a temporary authentication placeholder is permitted. -->
- No financial dashboard implementation.
- A temporary protected `/dashboard` placeholder is allowed only to verify authentication, protected-route access, and logout.
- The placeholder must contain only a welcome message and logout action.
- It must not contain budgeting, transactions, expenses, reports, goals, Plan My Money, salary allocation, or any other Phase 4+ functionality.

## F. Proposed Frontend Authentication Flow
1. User submits credentials on `/login` or `/register`.
2. Frontend sends standard `POST` requests to the backend.
3. Upon success, frontend receives a JWT and updates the global authentication state (via React Context).
4. The user is redirected to a temporary `/dashboard` protected placeholder route.
5. If unauthorized, clear error states are shown.

## G. Proposed Backend Authentication Flow
1. Receive request at `/api/v1/auth/login` or `/register`.
2. Validate required fields (Email, Password).
3. Connect to MongoDB and check for existing users.
<!-- OLD CODE: 4. Hash new passwords with `bcrypt` / Verify passwords with `bcrypt`.
Reason for change: Corrected dependency name to bcryptjs. -->
4. Hash new passwords with `bcryptjs` / Verify passwords with `bcryptjs`.
5. Generate a JSON Web Token (`jsonwebtoken`) and return it safely.

## H. Proposed MongoDB User Model
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
}, { timestamps: true });
```
*(Passwords will never be returned in API queries).*

## I. Proposed API Endpoints

<!-- OLD CODE:
## I. Proposed API Endpoints
- **POST `/api/v1/auth/register`**: Accepts `{ name, email, password }`. Creates user. Returns JWT.
- **POST `/api/v1/auth/login`**: Accepts `{ email, password }`. Verifies credentials. Returns JWT.
- **GET `/api/v1/auth/me`** *(Optional but recommended)*: Validates the token and returns the current user profile `{ id, name, email }`. Useful for page refreshes.
Reason for change: Expanding API contract to include validation and error handling behavior. -->

### 1. POST `/api/v1/auth/register`
- **Required Fields**: `name`, `email`, `password`.
- **Validation**:
  - `email`: Must be a valid email format, transformed to lowercase (case-insensitive), and checked for uniqueness.
  - `password`: Minimum 6 characters.
  - Empty or whitespace-only inputs must be trimmed and rejected (400 Bad Request).
- **Duplicate Email Behavior**: If email exists, return 400 Bad Request with a safe message "User already exists".
- **Success (201 Created)**: Returns `{ token, user: { id, name, email } }`. (Password hash is stripped).
- **Failure (500 Internal Server Error)**: Generic message "Server error". DB traces are hidden.

### 2. POST `/api/v1/auth/login`
- **Required Fields**: `email`, `password`.
- **Validation**: Email is trimmed and lowercased.
- **Invalid Credential Behavior**: If password or email doesn't match, return 401 Unauthorized with "Invalid credentials". Do not specify whether the email or password was wrong.
- **Success (200 OK)**: Returns `{ token, user: { id, name, email } }`.
- **JWT Failure (401 Unauthorized)**: If token generation fails, return appropriate error.

### 3. POST `/api/v1/auth/logout`
- **Behavior**: Depends on chosen token strategy (see below).
- **Success (200 OK)**: Returns `{ message: "Logged out successfully" }`.

### 4. GET `/api/v1/auth/me` *(Optional)*
- Validates token and returns current user profile for page refreshes.

<!-- OLD CODE:
## I.5 Clarification on Temporary `/dashboard` Route
The `/dashboard` route, if included to test authentication redirects, will strictly be a **Protected Placeholder**.
- It will only display a welcome message and a logout button.
- It will **not** include financial dashboard features, transactions, reports, goals, or "Plan My Money".
- In Phase 4, the placeholder code will be preserved in a comment block, and the actual dashboard components will be added below it. No silent replacements will occur.
Reason for change: Updated to match exact owner requirements for the placeholder. -->

## I.5 Clarification on Temporary `/dashboard` Route
The protected `/dashboard` page is an authentication-only temporary placeholder for Phase 3. It is used only to verify that a logged-in user can access a protected route and log out successfully. It must not contain budgeting, expense, report, goal, or other Phase 4+ functionality.

Temporary protected authentication placeholder — not a Phase 4 implementation.

<!-- OLD CODE:
## J. Token Strategy Comparison & Recommendation
**Strategy A: JWT in HttpOnly Cookie**
- **Pros**: Highest security, immune to XSS attacks (JS cannot read the token).
- **Cons**: Requires configuring `cookie-parser` on backend, CSRF considerations, and handling `credentials: 'include'` on frontend.
- **Suitability**: Excellent for financial apps.

**Strategy B: JWT in LocalStorage**
- **Pros**: Very easy to implement. Works perfectly with decoupled API architectures and Next.js client-side fetching via the `Authorization: Bearer <token>` header. Immune to CSRF.
- **Cons**: Vulnerable to XSS.
- **Suitability**: Often used in resume projects for simplicity.

**Recommendation**: **Strategy B (LocalStorage + Authorization Header)** is recommended for rapid development in this specific resume project phase to avoid complex cookie-domain sharing issues between Next.js (port 3000) and Express (port 5000) on localhost. *This requires Project-Owner approval.* (If the owner prefers strict financial-grade security, we will implement HttpOnly cookies).
Reason for change: Replaced Recommendation with PENDING and expanded Logout Plan -->

## J. Token Strategy Comparison & Logout Plan
**Strategy A: JWT in HttpOnly Cookie**
- **Security**: Highest security. JavaScript cannot read the token, mitigating XSS attacks.
- **Logout Plan**: The backend `POST /api/v1/auth/logout` endpoint will send a `Set-Cookie` header that overwrites the JWT cookie with an empty string and an immediate expiration date.
- **Files Involved**: Backend (`authController.js`), Frontend (`AuthContext.jsx` to clear user state, no token to clear manually).

**Strategy B: JWT in LocalStorage**
- **Security**: Vulnerable to XSS. Any malicious script can read the token. Immune to CSRF.
- **Logout Plan**: The frontend simply calls `localStorage.removeItem('token')`. The backend endpoint is mostly a formality (or to clear server-side sessions if tracking invalidation).
- **Files Involved**: Frontend (`AuthContext.jsx` to remove token and state).

<!-- OLD CODE: **Decision is PENDING**: The project owner must explicitly approve either HttpOnly Cookie or LocalStorage Bearer Token before implementation begins.
Reason for change: Decision has been approved. -->
Owner-approved authentication strategy: Option B — LocalStorage Bearer Token.

## K. Environment-Variable List
Required Backend Variables:
- `PORT=5000`
<!-- OLD CODE: - `MONGO_URI=WRITE_YOUR_MONGODB_URI_HERE`
Reason for change: Updated to MONGODB_URI. -->
- `MONGODB_URI=WRITE_YOUR_MONGODB_CONNECTION_STRING_HERE`
- `JWT_SECRET=WRITE_YOUR_JWT_SECRET_HERE`
- `NODE_ENV=development`
- `CLIENT_URL=http://localhost:3000`

## L. Safe `.env.example` Template Plan
The existing `.env.example` will be updated to explicitly say `WRITE_YOUR_SECRET_HERE` for the database and JWT secrets, ensuring absolute safety for future developers.

## M & N. Environment Privacy Confirmation
**Confirmed:** `.env` must remain strictly private. It is already safely ignored by the existing `server/.gitignore`. No real secrets will be documented or asked for.

## O. Security Requirements
<!-- OLD CODE: - **No plaintext passwords:** All passwords will be hashed with `bcrypt`.
Reason for change: Updated to bcryptjs. -->
- **No plaintext passwords:** All passwords will be hashed with `bcryptjs`.
- **Validation:** Both frontend UI and backend Express routes will validate input.
- **Safe Responses:** Password hashes will be excluded from all JSON responses.
- **Unique Emails:** MongoDB unique indexes and backend checks will prevent duplicate accounts.

## P. Dependency Audit & Requirements
**Currently Installed (Backend)**: `express`, `mongoose`, `cors`, `dotenv`.
<!-- OLD CODE:
**Missing & Required (Backend)**: 
1. `bcrypt` (or `bcryptjs`) - *Mandatory* for secure password hashing. Existing code is insufficient as Node.js native `crypto` requires extensive boilerplate for secure salting/hashing compared to bcrypt.
2. `jsonwebtoken` - *Mandatory* for issuing stateless authentication tokens.

*(I require explicit approval to install these two packages in `server/`).*
Reason for change: Providing exact recommended dependency (bcryptjs vs bcrypt) and confirming explicit approval. -->
<!-- OLD CODE:
**Missing & Required (Backend)**: 
1. **Password Hashing**: `bcrypt` vs `bcryptjs`.
   - `bcrypt`: Written in C++, faster, but requires native build tools (node-gyp) which can cause installation issues on some environments (like Windows).
   - `bcryptjs`: Pure JavaScript implementation. Slower than `bcrypt` (negligible for small apps), but guarantees 100% compatibility across all platforms with zero installation headaches.
   - **Recommendation**: `bcryptjs` is recommended for maximum compatibility and easier maintenance in this project, avoiding native build steps.
2. **Token Generation**: `jsonwebtoken` (Required separately for issuing stateless authentication tokens).

*(No dependencies will be installed without explicit project-owner approval).*
Reason for change: Finalized dependency names (bcryptjs) and explicit recommendations. -->
**Missing & Required (Backend)**: 
1. **Password Hashing**: `bcryptjs` is recommended for cross-platform compatibility and easier installation on Windows.
2. **Token Generation**: `jsonwebtoken` is required for JWT generation and verification.

<!-- OLD CODE: *(Neither package may be installed without explicit project-owner approval. No packages will be installed during this correction task).*
Reason for change: Packages are now approved. -->
Owner-approved authentication dependencies: bcryptjs and jsonwebtoken.

## Q. Files That Would Be Created
- `server/src/models/User.js`
- `server/src/controllers/authController.js`
- `server/src/routes/auth.js`
- `server/src/middleware/authMiddleware.js`
- `client/src/context/AuthContext.jsx` (or similar native state management)

## R. Files That Would Be Modified
- `server/src/app.js` (To mount `/api/v1/auth`)
- `client/src/app/login/page.jsx` (To add real forms)
- `client/src/app/register/page.jsx` (To add real forms)
- `server/package.json` (To add `bcrypt` and `jsonwebtoken`)

<!-- OLD CODE:
## S. Open Decisions Requiring Approval
1. **Token Strategy**: Do you approve **LocalStorage (Bearer Token)** for simplicity, or prefer **HttpOnly Cookies** for maximum security?
2. **Dependencies**: Do you explicitly approve the installation of `bcrypt` and `jsonwebtoken` in the server?
Reason for change: Decisions have been made. -->

## S. Owner-Approved Decisions
1. **Token Strategy**: Owner-approved authentication strategy: Option B — LocalStorage Bearer Token.
2. **Dependencies**: Owner-approved authentication dependencies: bcryptjs and jsonwebtoken.

## T. Phase 3 Implementation Order
1. Update `.env.example` and backend config.
2. Build User Model (Mongoose).
3. Build Auth Controllers & Routes (Register/Login).
4. Implement JWT generation and Auth Middleware.
5. Update Frontend UI forms (Login/Register).
6. Wire up Frontend API calls and Auth State.

## U. Risks and Limitations
- The current implementation will not include email verification or password reset flows (these can be added in a future polish phase).
- We are not integrating social logins (OAuth).

<!-- OLD CODE:
## V. Confirmation
**Confirmed:** Phase 4 has absolutely not started. No features outside of authentication will be touched.
Reason for change: Adding explicit Implementation Gate verification block. -->

## V. Implementation Gate Confirmation
- Planning is complete after this correction.
- Authentication implementation has not started.
- No packages have been installed.
- No real secrets have been created.
- No real MongoDB connection has been made.
- Phase 4 has not started.
<!-- OLD CODE:
- Coding must wait for project-owner approval of:
  1. Token strategy (Option A vs Option B)
  2. Installation of `bcryptjs`
  3. Installation of `jsonwebtoken`
Reason for change: Coding proceeded after approval. -->
- Coding has proceeded based on owner-approved decisions.
