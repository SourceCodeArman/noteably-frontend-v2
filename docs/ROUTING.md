# Routing Documentation

This document describes the routing infrastructure implemented using React Router v7.

## Routes

| Path           | Component  | Protection | Description                                       |
| -------------- | ---------- | ---------- | ------------------------------------------------- |
| `/`            | Home       | Public     | Landing page with welcome message                 |
| `/login`       | Login      | Public     | Login form (redirects to dashboard if logged in)  |
| `/get-started` | GetStarted | Public     | Signup form (redirects to dashboard if logged in) |
| `/subscribe`   | Subscribe  | Public     | Pricing and subscription plans                    |
| `/upload`      | Upload     | Public     | File upload interface with auth prompts           |
| `/dashboard`   | Dashboard  | Protected  | User dashboard (redirects to login if not auth)   |
| `*`            | NotFound   | Public     | 404 error page with link back to home             |

## Architecture

### Layout Structure

```
Layout (src/components/Layout.tsx)
├── Navigation (src/components/Navigation.tsx)
├── Outlet (nested route content)
└── Footer (src/components/Footer.tsx)
```

The `Layout` component provides a consistent navigation and footer across all pages using React Router's `Outlet` component for nested route rendering.

### Route Protection

Two types of route protection are implemented:

1. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
   - Protects routes that require authentication
   - Redirects to `/login` if user is not authenticated
   - Currently used for `/dashboard`

2. **PublicRoute** (`src/components/PublicRoute.tsx`)
   - For login/signup pages that authenticated users shouldn't access
   - Redirects to `/dashboard` if user is already authenticated
   - Currently used for `/login` and `/get-started`

### Code Splitting

The Dashboard route uses React's `lazy()` for code splitting:

```tsx
const Dashboard = lazy(() => import('@/routes/Dashboard'))
```

This reduces the initial bundle size by loading the Dashboard component only when needed.

### Authentication Hook

A basic authentication hook is provided at `src/hooks/useAuth.ts`. This currently returns `isAuthenticated: false` and is ready for integration with your authentication system.

## Navigation

### Navigation Component

The `Navigation` component uses `NavLink` from React Router for:

- Automatic active link styling
- Client-side navigation without page reloads
- Accessible navigation patterns

Active links receive special styling through the `navLinkClasses` function.

### Programmatic Navigation

To navigate programmatically in your components:

```tsx
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/dashboard')
  }

  return <button onClick={handleClick}>Go to Dashboard</button>
}
```

## 404 Page

The NotFound component (`src/routes/NotFound.tsx`):

- Catches all unmatched routes using the `*` path
- Displays a friendly error message
- Provides a link back to the home page
- Maintains consistent styling with the rest of the app

## Future Enhancements

- Integrate with actual authentication system
- Add loading states for route transitions
- Implement route-based breadcrumbs
- Add route metadata for SEO
- Implement authentication context provider
