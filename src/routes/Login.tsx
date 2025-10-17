import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

type LocationState = {
  from?: {
    pathname: string
  }
}

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = (formData.get('email') ?? '').toString().trim()
    const password = (formData.get('password') ?? '').toString()

    setFormError(null)
    setIsSubmitting(true)

    try {
      await login(email, password)

      const redirectPath =
        ((location.state as LocationState | null)?.from?.pathname) ||
        '/dashboard'

      navigate(redirectPath, { replace: true })
    } catch (error) {
      if (isMountedRef.current) {
        setFormError(
          error instanceof Error
            ? error.message
            : 'Unable to log in. Please try again.',
        )
      }
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false)
      }
    }
  }

  const isBusy = isSubmitting

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md px-4">
        <div className="bg-slate-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {formError && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-900 text-sm text-red-300">
                {formError}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                autoComplete="email"
                required
                disabled={isBusy}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={isBusy}
              />
            </div>
            <button
              type="submit"
              disabled={isBusy}
              className={`w-full px-4 py-2 rounded-lg transition-colors ${
                isBusy
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isBusy ? 'Signing in...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/get-started" className="text-blue-500 hover:text-blue-400">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
