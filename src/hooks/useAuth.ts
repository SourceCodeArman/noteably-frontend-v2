import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from '@/contexts/auth-context'

function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export type { AuthContextValue } from '@/contexts/auth-context'
export type { User, AuthState } from '@/types/auth'

export default useAuth
