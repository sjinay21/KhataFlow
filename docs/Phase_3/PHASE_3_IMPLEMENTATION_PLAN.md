# Phase 3 Implementation Plan

1. **Environment Setup**: Update `.env.example` and ensure backend loads variables.
<!-- OLD CODE:
2. **Dependencies**: Install `bcrypt` and `jsonwebtoken`.
Reason for change: Consistently use bcryptjs instead of bcrypt. -->
<!-- OLD CODE: 2. **Dependencies**: Install `bcryptjs` and `jsonwebtoken` (pending approval).
Reason for change: Owner approved dependencies. -->
2. **Dependencies**: Install `bcryptjs` and `jsonwebtoken`. (Owner-approved authentication dependencies: bcryptjs and jsonwebtoken.)
3. **Database**: Implement MongoDB connection in `config/db.js`.
4. **Model**: Create `User.js` Mongoose schema.
5. **Controllers**: Write `register` and `login` logic in `controllers/authController.js`.
6. **Routes**: Mount endpoints in `routes/auth.js` and `app.js`.
7. **Frontend Forms**: Connect `/login` and `/register` components to backend APIs.
8. **Auth State**: Implement global state for user sessions.
9. **Validation**: Test success and error flows end-to-end.
