import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './auth-context'
import type { AuthState, User } from '@/types/auth'
import * as mockAuth from '@/lib/mockAuth'

const SESSION_STORAGE_KEY = 'noteably:auth-session'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
}

interface PersistedSession {
  user: User
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState)

  const persistUser = useCallback((user: User | null) => {
    if (typeof window === 'undefined') {
      return
    }

    if (!user) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY)
      return
    }

    const session: PersistedSession = { user }

    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  }, [])

  useEffect(() => {
    let isActive = true

    const restoreSession = () => {
      if (typeof window === 'undefined') {
        if (isActive) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }))
        }
        return
      }

      const storedSession = window.localStorage.getItem(SESSION_STORAGE_KEY)

      if (!storedSession) {
        if (isActive) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }))
        }
        return
      }

      try {
        const parsed = JSON.parse(storedSession) as PersistedSession

        if (parsed?.user) {
          if (isActive) {
            setState({
              user: parsed.user,
              isAuthenticated: true,
              isLoading: false,
            })
          }
        } else {
          window.localStorage.removeItem(SESSION_STORAGE_KEY)
          if (isActive) {
            setState({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            })
          }
        }
      } catch (_error) {
        window.localStorage.removeItem(SESSION_STORAGE_KEY)
        if (isActive) {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      }
    }

    restoreSession()

    return () => {
      isActive = false
    }
  }, [])

  const login = useCallback<AuthContextValue['login']>(
    async (email, password) => {
      try {
        const user = await mockAuth.login(email, password)

        persistUser(user)

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })

        return user
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
        throw error
      }
    },
    [persistUser],
  )

  const signup = useCallback<AuthContextValue['signup']>(
    async (email, password, name) => {
      try {
        const user = await mockAuth.signup(email, password, name)

        persistUser(user)

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })

        return user
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
        throw error
      }
    },
    [persistUser],
  )

  const logout = useCallback<AuthContextValue['logout']>(async () => {
    try {
      await mockAuth.logout()
    } finally {
      persistUser(null)
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }, [persistUser])

  const { user, isAuthenticated, isLoading } = state

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, isAuthenticated, isLoading, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
