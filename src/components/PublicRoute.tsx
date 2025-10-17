import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

interface PublicRouteProps {
  children: ReactNode
}

function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default PublicRoute
