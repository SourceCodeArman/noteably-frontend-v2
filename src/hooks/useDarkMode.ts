import { useEffect, useState } from 'react'

function getInitialPreference() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  const stored = window.localStorage.getItem('darkMode')
  if (stored !== null) {
    return stored === 'true'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(getInitialPreference)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    const root = document.documentElement
    const body = document.body

    if (isDark) {
      root.classList.add('dark')
      body.dataset.theme = 'dark'
    } else {
      root.classList.remove('dark')
      body.dataset.theme = 'light'
    }

    window.localStorage.setItem('darkMode', String(isDark))
  }, [isDark])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem('darkMode')
      if (stored === null) {
        setIsDark(event.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleDarkMode = () => setIsDark((prev) => !prev)

  return { isDark, toggleDarkMode }
}

export default useDarkMode
