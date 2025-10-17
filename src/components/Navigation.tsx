import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

function Navigation() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-300 hover:text-white hover:bg-slate-800'
    }`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              Noteably
            </NavLink>
            <div className="hidden md:flex gap-2">
              <NavLink to="/" className={navLinkClasses} end>
                Home
              </NavLink>
              <NavLink to="/upload" className={navLinkClasses}>
                Upload
              </NavLink>
              <NavLink to="/subscribe" className={navLinkClasses}>
                Subscribe
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/dashboard" className={navLinkClasses}>
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/get-started"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
