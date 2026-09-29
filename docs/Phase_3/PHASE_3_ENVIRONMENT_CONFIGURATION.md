# Phase 3 Environment Configuration

<!-- OLD CODE:
## 1. Safety Rules
- `.env` must NEVER be committed.
- `.env.example` must NEVER contain real secrets.
Reason for change: Added Git Ignore Configuration and explicit tracking rules. -->

## 1. Safety Rules & Git Ignore Configuration
- `.env` must NEVER be committed. It is strictly ignored by Git via `server/.gitignore`.
- Any private environment files (e.g. `.env.local`, `.env.development.local`) must remain ignored.
- `.env.example` is explicitly NOT ignored in `server/.gitignore` (`!.env.example`), ensuring the template is safely tracked in version control.
- `client/.gitignore` has also been verified to ignore `.env*` but track `!.env.example`.
- Real secrets will never be created during planning, nor will the project owner be asked to share them.

## 2. Safe Template (`.env.example`)
```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database
<!-- OLD CODE: MONGO_URI=WRITE_YOUR_MONGODB_URI_HERE
Reason for change: Owner approved MONGODB_URI. -->
MONGODB_URI=WRITE_YOUR_MONGODB_CONNECTION_STRING_HERE
# Security
JWT_SECRET=WRITE_YOUR_JWT_SECRET_HERE
```

## 3. Instructions for Project Owner
After backend setup is complete, copy `.env.example` to a new file named `.env` and replace `WRITE_YOUR...` with your actual private local credentials.
