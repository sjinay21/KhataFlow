# Phase 3 Frontend Auth Flow

## 1. State Management
Authentication state will be managed globally (e.g., React Context).
```javascript
{
  user: null | { id, name, email },
  token: null | string,
  isAuthenticated: boolean,
  isLoading: boolean
}
```

## 2. Token Storage
<!-- OLD CODE:
Pending Project Owner Decision:
- **LocalStorage**: Sent explicitly via headers.
- **HttpOnly Cookies**: Sent automatically by the browser.
Reason for change: Owner approved decisions. -->
- Owner-approved authentication strategy: Option B — LocalStorage Bearer Token.

## 3. Routing
Upon successful login or registration, the frontend will update the Auth State and safely redirect the user away from public placeholder pages to a protected route (e.g., `/dashboard`).
