import { createContext } from 'react'
import type { AuthState, User } from '@/types/auth'

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<User>
  signup: (email: string, password: string, name: string) => Promise<User>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
)
