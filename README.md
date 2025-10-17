# Noteably Frontend v2

Modern frontend scaffold for the Noteably application. This project is bootstrapped with Vite, React, TypeScript, Tailwind CSS, ESLint, and Prettier.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the app running.

## Available Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Generate a production build.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint using the project configuration.
- `npm run format` – Format source files with Prettier.

## Project Structure

```
src/
├── App.tsx                   # Main app with routing setup
├── main.tsx                  # Entry point with AuthProvider
├── index.css
├── components/
│   ├── Layout.tsx           # Root layout with Navigation and Footer
│   ├── Navigation.tsx       # Main navigation with NavLinks
│   ├── Footer.tsx           # Footer component
│   ├── ProtectedRoute.tsx   # Protected route wrapper
│   └── PublicRoute.tsx      # Public route wrapper (redirects if authenticated)
├── contexts/
│   └── AuthContext.tsx      # Authentication context provider
├── hooks/
│   └── useAuth.ts           # Authentication hook
├── routes/
│   ├── Home.tsx             # Landing page
│   ├── Login.tsx            # Login page (public)
│   ├── GetStarted.tsx       # Signup page (public)
│   ├── Subscribe.tsx        # Subscription plans page
│   ├── Upload.tsx           # Upload page with auth prompt
│   ├── Dashboard.tsx        # User dashboard (protected, code-split)
│   ├── NotFound.tsx         # 404 error page
│   └── index.ts             # Route exports
├── lib/
└── styles/
```

## Design System

This project includes a comprehensive design system with Tailwind tokens for colors, typography, spacing, and more. Dark mode is supported out of the box.

- **Full Documentation**: [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)
- **Quick Start Guide**: [docs/DESIGN_SYSTEM_QUICK_START.md](./docs/DESIGN_SYSTEM_QUICK_START.md)
- **Dark Mode Hook**: `useDarkMode()` in `src/hooks/useDarkMode.ts`

## Routing

This application uses React Router v7 for client-side routing. See [docs/ROUTING.md](./docs/ROUTING.md) for detailed routing documentation.

### Available Routes

- `/` - Home page
- `/login` - Login page (redirects to dashboard if authenticated)
- `/get-started` - Signup page (redirects to dashboard if authenticated)
- `/subscribe` - Subscription plans
- `/upload` - File upload interface
- `/dashboard` - User dashboard (protected, requires authentication)
- `*` - 404 page for unmatched routes

### Key Features

- **Nested Routes**: All routes use a shared layout with navigation and footer
- **Route Protection**: Protected routes redirect to login, public auth routes redirect to dashboard
- **Active Link Styling**: Navigation automatically highlights active routes
- **Code Splitting**: Dashboard route is lazy-loaded for better performance
- **Programmatic Navigation**: Auth actions (login/logout) use `useNavigate()` for smooth transitions

## Authentication

A basic authentication system is implemented using React Context:

- `AuthContext` provides authentication state and methods
- `useAuth()` hook for accessing auth state in components
- Currently returns `isAuthenticated: false` by default
- Ready for integration with your backend authentication system

## Tooling

- **Vite + React + TypeScript** with strict type checking.
- **React Router v7** for client-side routing.
- **Tailwind CSS** for utility-first styling.
- **ESLint** with TypeScript, React Hooks, and Prettier integrations.
- **Prettier** for consistent formatting.
- `@/` alias for absolute imports from the `src` directory.

This scaffold is ready for building out the Noteably frontend experience.
