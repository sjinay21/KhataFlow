# Phase 3 Authentication Architecture

## 1. System Overview
- **Frontend**: Next.js App Router (React)
- **Backend**: Express.js (Node.js)
- **Database**: MongoDB (Mongoose)

## 2. Authentication Flow
1. Client submits credentials via `/login` or `/register`.
2. Server validates credentials against MongoDB.
<!-- OLD CODE:
3. Server hashes new passwords or compares existing hashes via `bcrypt`.
4. Server generates a JSON Web Token (`jsonwebtoken`) and sends it to the client.
5. Client stores the token (strategy pending approval) and updates global Auth State.
Reason for change: Owner approved decisions. -->
3. Server hashes new passwords or compares existing hashes via `bcryptjs`.
4. Server generates a JSON Web Token (`jsonwebtoken`) and sends it to the client.
5. Client stores the token (Owner-approved authentication strategy: Option B — LocalStorage Bearer Token) and updates global Auth State.
