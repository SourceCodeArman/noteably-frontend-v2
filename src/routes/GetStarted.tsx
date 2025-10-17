import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

type LocationState = {
  from?: {
    pathname: string
  }
}

function GetStarted() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signup } = useAuth()
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
    const firstName = (formData.get('firstName') ?? '').toString().trim()
    const lastName = (formData.get('lastName') ?? '').toString().trim()
    const email = (formData.get('email') ?? '').toString().trim()
    const password = (formData.get('password') ?? '').toString()
    const name = [firstName, lastName].filter(Boolean).join(' ') || firstName || lastName

    setFormError(null)
    setIsSubmitting(true)

    try {
      await signup(email, password, name)

      const redirectPath =
        ((location.state as LocationState | null)?.from?.pathname) ||
        '/dashboard'

      navigate(redirectPath, { replace: true })
    } catch (error) {
      if (isMountedRef.current) {
        setFormError(
          error instanceof Error
            ? error.message
            : 'Unable to create your account. Please try again.',
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
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6">Create your Noteably account</h1>
        <p className="text-lg text-slate-400 mb-8">
          Join thousands of creators using Noteably to capture, organize, and share
          insights effortlessly.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {formError && (
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-900 text-sm text-red-300">
              {formError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="given-name"
                disabled={isBusy}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="family-name"
                disabled={isBusy}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="email"
              disabled={isBusy}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="new-password"
              disabled={isBusy}
            />
          </div>
          <button
            type="submit"
            disabled={isBusy}
            className={`w-full px-6 py-3 rounded-lg transition-colors ${
              isBusy
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isBusy ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default GetStarted
