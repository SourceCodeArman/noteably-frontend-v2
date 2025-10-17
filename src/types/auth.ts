export type SubscriptionPlan = 'free' | 'pro'

export interface User {
  id: string
  email: string
  name: string
  subscription: SubscriptionPlan
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
