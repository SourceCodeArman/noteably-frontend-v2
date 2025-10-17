// TODO: Replace these mock implementations with real API calls to the backend.
import type { User } from '@/types/auth'

type StoredUser = User & { password: string }

const USERS_STORAGE_KEY = 'noteably:mock-users'
const MIN_PASSWORD_LENGTH = 6
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let memoryUsers: StoredUser[] = []

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const readUsersFromStorage = (): StoredUser[] => {
  if (typeof window === 'undefined') {
    return memoryUsers
  }

  const raw = window.localStorage.getItem(USERS_STORAGE_KEY)

  if (!raw) {
    memoryUsers = []
    return []
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser[]

    if (Array.isArray(parsed)) {
      memoryUsers = parsed
      return parsed
    }
  } catch {
    window.localStorage.removeItem(USERS_STORAGE_KEY)
  }

  memoryUsers = []
  return []
}

const getUsers = (): StoredUser[] =>
  typeof window === 'undefined' ? memoryUsers : readUsersFromStorage()

const persistUsers = (users: StoredUser[]) => {
  memoryUsers = users

  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

const simulateNetwork = <T>(operation: () => T, delay = 600): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(operation())
      } catch (error) {
        reject(error)
      }
    }, delay)
  })

const validateEmail = (email: string) => {
  if (!EMAIL_PATTERN.test(email.trim())) {
    throw new Error('Please enter a valid email address.')
  }
}

const validatePassword = (password: string) => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error('Password must be at least 6 characters long.')
  }
}

const validateName = (name: string) => {
  if (!name.trim()) {
    throw new Error('Please enter your name.')
  }
}

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `user_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

const toUser = ({ password, ...user }: StoredUser): User => user

export const login = async (email: string, password: string): Promise<User> => {
  validateEmail(email)
  validatePassword(password)

  const normalizedEmail = normalizeEmail(email)

  return simulateNetwork(() => {
    const users = getUsers()
    const existingUser = users.find(
      (user) => user.email === normalizedEmail && user.password === password,
    )

    if (!existingUser) {
      throw new Error('Invalid email or password.')
    }

    return toUser(existingUser)
  })
}

export const signup = async (
  email: string,
  password: string,
  name: string,
): Promise<User> => {
  validateEmail(email)
  validatePassword(password)
  validateName(name)

  const normalizedEmail = normalizeEmail(email)
  const trimmedName = name.trim()

  return simulateNetwork(() => {
    const users = getUsers()

    if (users.some((user) => user.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.')
    }

    const newUser: StoredUser = {
      id: createId(),
      email: normalizedEmail,
      name: trimmedName,
      subscription: 'free',
      password,
    }

    const updatedUsers = [...users, newUser]
    persistUsers(updatedUsers)

    return toUser(newUser)
  })
}

export const logout = async (): Promise<void> => {
  await simulateNetwork(() => undefined, 300)
}
