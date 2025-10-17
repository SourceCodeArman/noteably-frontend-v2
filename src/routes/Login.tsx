import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login()
    navigate('/dashboard')
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md px-4">
        <div className="bg-slate-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/get-started"
              className="text-blue-500 hover:text-blue-400"
            >
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
