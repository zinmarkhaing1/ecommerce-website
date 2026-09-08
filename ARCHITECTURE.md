# React Application Architecture Guide

## Goals

This architecture is designed to provide:

- Scalability for large applications
- Maintainability for long-term projects
- Clear separation of concerns
- Testability
- Reusability
- Easy onboarding for new developers
- Consistent project structure
- Independent feature development

---

# High Level Architecture

```text
┌───────────────────────────────────────┐
│               UI Layer                │
│   Pages, Components, Layouts          │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│           Feature Layer               │
│ Business Logic, State Management      │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│            Service Layer              │
│ API Clients, External Services        │
└───────────────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│          Infrastructure Layer         │
│ Config, Environment, Utilities        │
└───────────────────────────────────────┘
```

---

# Folder Structure

```text
src/
│
├── app/
│   ├── router/
│   ├── providers/
│   ├── store/
│   ├── layouts/
│   └── App.tsx
│
├── features/
│   ├── auth/
│   ├── users/
│   ├── dashboard/
│   └── settings/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── constants/
│   ├── types/
│   └── validations/
│
├── assets/
│
├── styles/
│
├── config/
│
├── tests/
│
└── main.tsx
```

---

# Detailed Folder Structure

## app/

Application bootstrapping.

```text
app/
├── router/
│   ├── index.tsx
│   ├── routes.ts
│   └── guards/
│
├── providers/
│   ├── QueryProvider.tsx
│   ├── ThemeProvider.tsx
│   ├── AuthProvider.tsx
│   └── Index.tsx
│
├── layouts/
│   ├── DashboardLayout.tsx
│   ├── AuthLayout.tsx
│   └── PublicLayout.tsx
│
└── store/
```

Responsibilities:

- Routing
- Global Providers
- Layout Configuration
- Global Store Registration

---

# Feature-Based Structure

Every feature is self-contained.

Example:

```text
features/
└── users/
    ├── api/
    │
    ├── components/
    │
    ├── hooks/
    │
    ├── pages/
    │
    ├── store/
    │
    ├── services/
    │
    ├── types/
    │
    ├── validation/
    │
    └── index.ts
```

---

# Example Feature

```text
users/
├── api/
│   ├── getUsers.ts
│   ├── getUser.ts
│   ├── createUser.ts
│   └── updateUser.ts
│
├── components/
│   ├── UserCard.tsx
│   ├── UserTable.tsx
│   └── UserForm.tsx
│
├── hooks/
│   ├── useUsers.ts
│   └── useCreateUser.ts
│
├── pages/
│   ├── UserListPage.tsx
│   └── UserDetailPage.tsx
│
├── store/
│   └── userStore.ts
│
├── services/
│   └── userMapper.ts
│
├── validation/
│   └── userSchema.ts
│
├── types/
│   └── user.ts
│
└── index.ts
```

---

# Component Architecture

## Shared Components

Reusable UI Components.

```text
shared/components/

Button/
Input/
Modal/
Table/
Card/
Pagination/
Dropdown/
```

Example:

```text
shared/components/
└── Button/
    ├── Button.tsx
    ├── Button.test.tsx
    ├── Button.styles.ts
    └── index.ts
```

---

## Feature Components

Specific to a business domain.

```text
features/users/components/
```

Examples:

- UserForm
- UserCard
- UserAvatar

Not reusable across domains.

---

# State Management Strategy

## Local State

Use:

```tsx
useState()
useReducer()
```

For:

- Modal visibility
- Form steps
- Temporary UI state

---

## Server State

Use:

```text
TanStack Query
```

Responsibilities:

- Caching
- Refetching
- Pagination
- Synchronization
- Optimistic Updates

Example:

```tsx
useQuery({
  queryKey: ["users"],
  queryFn: getUsers,
});
```

---

## Global State

Use:

```text
Zustand
```

For:

- Authentication
- Theme
- User Preferences
- Global Filters

Avoid storing server data globally.

---

# API Layer

Structure:

```text
shared/services/api/
├── client.ts
├── endpoints.ts
├── interceptors.ts
└── types.ts
```

Example:

```ts
export const api = axios.create({
  baseURL: ENV.API_URL,
});
```

---

# Service Layer

Convert backend DTOs to frontend models.

```text
services/
├── userMapper.ts
├── productMapper.ts
```

Example:

```ts
export function mapUser(dto: UserDTO): User {
  return {
    id: dto.id,
    fullName: dto.name,
  };
}
```

Benefits:

- Backend changes isolated
- UI remains stable

---

# Routing Architecture

```text
router/
├── routes.ts
├── guards/
│   ├── AuthGuard.tsx
│   └── RoleGuard.tsx
```

Example:

```tsx
<Route
  path="/users"
  element={
    <AuthGuard>
      <UsersPage />
    </AuthGuard>
  }
/>
```

---

# Environment Configuration

```text
config/
├── env.ts
├── app.config.ts
└── featureFlags.ts
```

Example:

```ts
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL,
};
```

---

# Error Handling

## Global

```tsx
ErrorBoundary
```

```text
shared/components/ErrorBoundary/
```

## API Errors

Centralized interceptor.

```ts
api.interceptors.response.use(...)
```

---

# Validation

Use:

```text
Zod
```

Structure:

```text
validation/
├── userSchema.ts
├── authSchema.ts
```

Example:

```ts
const schema = z.object({
  email: z.string().email(),
});
```

---

# Custom Hooks

Keep components clean.

Bad:

```tsx
const Component = () => {
  // 300 lines
}
```

Good:

```tsx
const { users, loading } = useUsers();
```

```text
hooks/
├── useUsers.ts
├── useAuth.ts
├── usePermissions.ts
```

---

# Styling Strategy

Recommended:

```text
Tailwind CSS
```

Alternative:

```text
CSS Modules
Styled Components
Emotion
```

Structure:

```text
styles/
├── globals.css
├── variables.css
└── themes.css
```

---

# Authentication Flow

```text
AuthProvider
        │
        ▼
Access Token
        │
        ▼
Axios Interceptor
        │
        ▼
Refresh Token Logic
        │
        ▼
Protected Routes
```

---

# Testing Strategy

```text
tests/
├── unit/
├── integration/
├── e2e/
```

Tools:

```text
Vitest
React Testing Library
Playwright
```

Coverage:

### Unit

- Hooks
- Utils
- Services

### Integration

- Forms
- Features

### E2E

- Login
- Checkout
- Critical User Flows

---

# Performance Optimization

## Code Splitting

```tsx
const UserPage = lazy(() => import("./UserPage"));
```

---

## Route Lazy Loading

```tsx
const Dashboard = lazy(() => import("../pages/Dashboard"));
```

---

## Memoization

```tsx
useMemo()
useCallback()
React.memo()
```

Use only when profiling indicates need.

---

# Security

## Never Store

```text
Passwords
Refresh Tokens (if avoidable)
Sensitive Secrets
```

## Always

```text
HTTPS
Sanitize Inputs
Validate API Responses
CSRF Protection
Content Security Policy
```

---

# Naming Conventions

## Components

```text
PascalCase
```

```text
UserCard.tsx
```

## Hooks

```text
useUsers.ts
```

## Utils

```text
camelCase
```

```text
formatCurrency.ts
```

## Types

```text
User.ts
Auth.ts
```

---

# Barrel Exports

Use:

```ts
export * from "./UserCard";


Avoid:

```ts
../../../components/button
```

Instead:

```ts
@/shared/components
```

Configure:

```json
{
  "paths": {
    "@/*": ["src/*"]
  }
}
```

---

# Recommended Tech Stack

### Core

- React
- TypeScript
- Vite

### State

- Zustand
- TanStack Query

### Forms

- React Hook Form
- Zod

### API

- Axios

### Styling

- Tailwind CSS

### Testing

- Vitest
- React Testing Library
- Playwright

### Quality

- ESLint
- Prettier
- Husky
- lint-staged

---

# Architecture Principles

1. Feature First
2. Domain Driven Folder Structure
3. Shared Only When Truly Shared
4. Thin Components
5. Business Logic In Hooks/Services
6. Server State ≠ Global State
7. Strong Typing Everywhere
8. Test Critical Paths
9. Lazy Load Large Features
10. Keep Features Independent

---

# Scalability Checklist

- [ ] Feature-based architecture
- [ ] TypeScript enabled
- [ ] TanStack Query configured
- [ ] Global Error Boundary
- [ ] Route lazy loading
- [ ] Path aliases
- [ ] Shared component library
- [ ] Central API client
- [ ] Validation layer
- [ ] Authentication guards
- [ ] Unit testing
- [ ] E2E testing
- [ ] CI/CD pipeline
- [ ] Monitoring and Logging