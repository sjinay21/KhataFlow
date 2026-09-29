# Phase 1: Backend Architecture Plan

## 1. Backend Objectives
To provide a secure, scalable, and robust RESTful API using Node.js and Express.js, completely decoupled from the frontend, ensuring data integrity and strict user ownership.

## 2. Recommended Server Folder Structure
```
server/
├── src/
│   ├── config/         # Environment variables and configurations
│   ├── controllers/    # Request handlers and response formatting
│   ├── middleware/     # Auth, error, and validation middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express route definitions
│   ├── services/       # Core business logic
│   ├── utils/          # Helpers (e.g., hashers, token generators)
│   └── app.js          # Express application setup
├── server.js           # Entry point (server listener)
```

## 3. Application Entry Point
`server.js` will import the configured Express app, connect to the database, and start the HTTP listener.

## 4. Server Configuration
Configuration will be centralized in `config/index.js`, loading values strictly from `process.env`.

## 5. Environment-Variable Planning
Expected variables: `PORT`, `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`, `CLIENT_URL`.

## 6. Routes
Modular route files (e.g., `auth.routes.js`, `expense.routes.js`) mounted in a main router under `/api/v1/`.

## 7. Controllers
Controllers will solely extract request data (`req.body`, `req.params`), call the appropriate Service layer function, and send the formatted response.

## 8. Services
The Service layer contains all business logic (e.g., calculating budgets, database interactions). This makes logic reusable and testable independently of Express requests.

## 9. Models
Mongoose models defining schemas, required fields, defaults, and timestamps.

## 10. Middleware
Custom middlewares for:
- JWT Authentication (`protect`)
- Global Error Handling (`errorHandler`)
- Not Found handling (`notFound`)

## 11. Utilities
Helper functions for generating tokens, formatting responses, and complex math calculations.

## 12. Validation
Incoming requests will be validated (e.g., using Joi or express-validator) before reaching controllers to ensure data integrity and prevent malformed data from hitting the database.

## 13. Error Handling
A global error-handling middleware that catches all synchronous and asynchronous errors and returns a sanitized response.

## 14. Centralized Error Response Strategy
All errors will return a standard format:
`{ "success": false, "error": "Clear message", "details": [...] }`
Internal server details will never be exposed in production.

## 15. API Response Structure
Standard success format:
`{ "success": true, "data": { ... } }`

## 16. Request and Response Conventions
- Accept and return JSON natively.
- Use standard HTTP status codes (200, 201, 400, 401, 403, 404, 500).

## 17. Authentication Preparation
Endpoints for register, login, and current user. Will use stateless token-based auth.

## 18. JWT Preparation for a Later Phase
JWTs will be signed with a strong secret and assigned an expiration. Will be sent via `Authorization: Bearer <token>` header.

## 19. bcrypt Preparation for a Later Phase
Passwords will be hashed using bcrypt with an appropriate salt round before saving to MongoDB.

## 20. Authorization Preparation
Middleware will ensure that a user is authenticated before accessing protected routes.

## 21. User Ownership and Data Isolation
Every data-fetching query and update will strict enforce `userId: req.user._id` to guarantee users can never access or mutate another user's data.

## 22. MongoDB Connection Planning
A robust connection module utilizing Mongoose with retry logic and clear console logging on successful/failed connection.

## 23. Separation of Responsibilities
Strict MVC-like separation: Routes -> Controllers -> Services -> Models.

## 24. Logging Strategy
- Development: Console logging (e.g., using `morgan`).
- Production: Minimal, error-only logging to avoid exposing sensitive info.

## 25. Security Considerations
- Helmet for secure HTTP headers.
- CORS configured strictly to allow only the frontend URL.
- No plaintext passwords.

## 26. Input Sanitization Considerations
Sanitize inputs against NoSQL injection and XSS (e.g., using `mongo-sanitize`).

## 27. Rate-Limiting Considerations for a Later Phase
`express-rate-limit` will be planned for authentication routes to prevent brute force attacks.

## 28. Testing Structure
Planned setup for Jest and Supertest to run integration tests on API endpoints.

## 29. Development versus Production Configuration
Environment-aware configuration to dictate logging verbosity, error detail levels, and CORS strictness.

## 30. Risks and Open Decisions
- Exactly which validation library to use (Joi vs Zod vs Express-Validator).
- TypeScript has been officially rejected for this project. Only JavaScript and JSX are approved.
