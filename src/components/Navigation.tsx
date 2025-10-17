import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import useDarkMode from '@/hooks/useDarkMode'

function Navigation() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const { isDark, toggleDarkMode } = useDarkMode()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const openMobileMenu = () => {
    setIsMobileMenuMounted(true)
    requestAnimationFrame(() => {
      setIsMobileMenuOpen(true)
    })
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    if (isMobileMenuMounted && isMobileMenuOpen) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  }

  const closeUserMenu = () => setIsUserMenuOpen(false)

  useEffect(() => {
    if (!isMobileMenuOpen && isMobileMenuMounted) {
      const timeout = window.setTimeout(() => setIsMobileMenuMounted(false), 300)
      return () => window.clearTimeout(timeout)
    }

    return undefined
  }, [isMobileMenuOpen, isMobileMenuMounted])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        closeUserMenu()
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeUserMenu()
        if (isMobileMenuMounted && isMobileMenuOpen) {
          closeMobileMenu()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuMounted, isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuMounted) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuMounted])

  useEffect(() => {
    if (isMobileMenuOpen) {
      const focusable = mobileMenuRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      focusable?.focus()
    }
  }, [isMobileMenuOpen])

  const handleLogout = () => {
    logout()
    closeUserMenu()
    closeMobileMenu()
    navigate('/')
  }

  const handleUserMenuKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const items = userMenuRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href]'
      )
      if (items && items.length > 0) {
        items[0].focus()
      }
    }
  }

  const handleMenuItemKeyDown = (
    event: ReactKeyboardEvent<HTMLElement>,
    index: number,
    total: number,
  ) => {
    const items = userMenuRef.current?.querySelectorAll<HTMLElement>(
      'button, a[href]'
    )
    if (!items || items.length === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = (index + 1) % total
      items[nextIndex].focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prevIndex = (index - 1 + total) % total
      items[prevIndex].focus()
    }
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${
      isActive
        ? 'bg-blue-600 text-white dark:bg-blue-500'
        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
    }`

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-lg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      isActive
        ? 'bg-blue-600 text-white dark:bg-blue-500'
        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
    }`

  const getUserInitial = () => {
    return 'U'
  }

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl lg:max-w-7xl xl:max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              aria-label="Noteably home"
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
              {!isAuthenticated && (
                <NavLink to="/subscribe" className={navLinkClasses}>
                  Subscribe
                </NavLink>
              )}
              {isAuthenticated && (
                <NavLink to="/dashboard" className={navLinkClasses}>
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <div className="hidden md:flex gap-2">
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    onKeyDown={handleUserMenuKeyDown}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                    aria-label="User menu"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    type="button"
                  >
                    {getUserInitial()}
                  </button>

                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <NavLink
                        to="/profile"
                        onClick={closeUserMenu}
                        onKeyDown={(event) => handleMenuItemKeyDown(event, 0, 3)}
                        className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-700"
                        role="menuitem"
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to="/settings"
                        onClick={closeUserMenu}
                        onKeyDown={(event) => handleMenuItemKeyDown(event, 1, 3)}
                        className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-700"
                        role="menuitem"
                      >
                        Settings
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        onKeyDown={(event) => handleMenuItemKeyDown(event, 2, 3)}
                        className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-700"
                        role="menuitem"
                        type="button"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/get-started"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Get Started
                  </NavLink>
                  <NavLink
                    to="/subscribe"
                    className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Subscribe
                  </NavLink>
                </>
              )}
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuMounted && isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuMounted && isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuMounted && (
        <>
          <div
            className={`fixed inset-0 md:hidden z-40 bg-black/50 transition-opacity duration-300 ease-in-out ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div
            ref={mobileMenuRef}
            className={`fixed top-[72px] right-0 bottom-0 w-72 bg-white dark:bg-slate-900 shadow-lg md:hidden z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-slate-800 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-label="Mobile navigation menu"
            tabIndex={-1}
          >
            <div className="p-4 space-y-2">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={mobileNavLinkClasses}
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/upload"
                onClick={closeMobileMenu}
                className={mobileNavLinkClasses}
              >
                Upload
              </NavLink>
              {!isAuthenticated && (
                <NavLink
                  to="/subscribe"
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClasses}
                >
                  Subscribe
                </NavLink>
              )}
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className={mobileNavLinkClasses}
                  >
                    Dashboard
                  </NavLink>
                  <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2 space-y-2">
                    <NavLink
                      to="/profile"
                      onClick={closeMobileMenu}
                      className={mobileNavLinkClasses}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/settings"
                      onClick={closeMobileMenu}
                      className={mobileNavLinkClasses}
                    >
                      Settings
                    </NavLink>
                  </div>
                </>
              )}

              <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-lg text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="button"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={closeMobileMenu}
                      className={mobileNavLinkClasses}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/get-started"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Get Started
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navigation
