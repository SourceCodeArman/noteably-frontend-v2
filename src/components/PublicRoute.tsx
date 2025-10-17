import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

interface PublicRouteProps {
  children: ReactNode
}

function PublicRoute({ children }: PublicRouteProps) {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (isAuthenticated) {
    const redirectPath = (
      (location.state as { from?: { pathname: string } } | null)?.from?.pathname ||
      '/dashboard'
    )

    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}

export default PublicRoute
