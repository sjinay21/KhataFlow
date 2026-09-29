# Phase 3 Open Decisions

## Decision 1: Token Strategy
- **Option A**: HttpOnly Cookies (Highest Security, Higher complexity for decoupled API).
- **Option B**: LocalStorage (Vulnerable to XSS, Easy to implement, standard for resume projects).
<!-- OLD CODE: - *Pending project owner approval.*
Reason for change: Owner approved decisions. -->
- Owner-approved authentication strategy: Option B — LocalStorage Bearer Token.

## Decision 2: Dependencies

<!-- OLD CODE:
- Installation of `bcrypt` and `jsonwebtoken` in the server directory is required.
- *Pending project owner approval.*
Reason for change: Switched recommendation to bcryptjs for maximum compatibility. -->

- Installation of `bcryptjs` and `jsonwebtoken` in the server directory is required.
<!-- OLD CODE: - *Pending project owner approval.*
Reason for change: Owner approved decisions. -->
- Owner-approved authentication dependencies: bcryptjs and jsonwebtoken.
