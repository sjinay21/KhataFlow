# Phase 3 API Contract

<!-- OLD CODE:
## 1. POST `/api/v1/auth/register`
- **Request Body**: `{ "name": "...", "email": "...", "password": "..." }`
- **Success Response (201)**: `{ "token": "jwt_string", "user": { "id": "...", "name": "...", "email": "..." } }`
- **Error Response (400)**: `{ "message": "Email already exists" }`

## 2. POST `/api/v1/auth/login`
- **Request Body**: `{ "email": "...", "password": "..." }`
- **Success Response (200)**: `{ "token": "jwt_string", "user": { "id": "...", "name": "...", "email": "..." } }`
- **Error Response (401)**: `{ "message": "Invalid credentials" }`

## 3. GET `/api/v1/auth/me` (Optional)
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**: `{ "user": { "id": "...", "name": "...", "email": "..." } }`
- **Error Response (401)**: `{ "message": "Not authorized" }`
Reason for change: Expanded validation and error handling for endpoints. -->
- **Request Body**: `{ "name": "...", "email": "...", "password": "..." }`
- **Validation**:
  - `name`, `email`, `password` are required. Empty/whitespace strings must be trimmed and rejected.
  - `email` must be valid and transformed to lowercase (case-insensitive).
  - `password` must be >= 6 chars.
- **Success Response (201)**: `{ "token": "jwt_string", "user": { "id": "...", "name": "...", "email": "..." } }`
- **Duplicate Email (400)**: `{ "message": "User already exists" }`
- **Server Error (500)**: Generic "Server Error" message to hide DB traces.

## 2. POST `/api/v1/auth/login`
- **Request Body**: `{ "email": "...", "password": "..." }`
- **Validation**: Email is trimmed and lowercased.
- **Success Response (200)**: `{ "token": "jwt_string", "user": { "id": "...", "name": "...", "email": "..." } }`
- **Error Response (401)**: `{ "message": "Invalid credentials" }` (Deliberately vague to hide which field failed).
- **JWT Failure (401)**: Proper error handling if token signing fails.

## 3. POST `/api/v1/auth/logout`
<!-- OLD CODE: - **Behavior**: Clear HttpOnly cookie (if chosen) via `Set-Cookie` with empty string/expired date, OR frontend handles `localStorage.removeItem('token')`.
Reason for change: The selected strategy is LocalStorage Bearer Token. HttpOnly cookie logout behavior is not part of the active implementation. -->
- **Behavior**:
  - The frontend removes the token using: `localStorage.removeItem('token')`
  - The frontend clears the authentication state.
  - No HttpOnly-cookie logout behavior is part of the active implementation.
- **Success Response (200)**: `{ "message": "Logged out successfully" }`

## 4. GET `/api/v1/auth/me` (Optional)
- **Headers**: `Authorization: Bearer <token>` (if using LocalStorage strategy)
- **Success Response (200)**: `{ "user": { "id": "...", "name": "...", "email": "..." } }`
- **Error Response (401)**: `{ "message": "Not authorized" }`
