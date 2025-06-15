import { useEffect, useMemo, useState } from 'react'
import { Theme, ThemeContext } from './ThemeContext'
import { LocalStorage } from '@/shared/lib/classes/LocalStorage'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches

  const setThemeMode = (theme: Theme) => setTheme(theme)

  const toggleThemeMode = () => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))

  const rootElem = useMemo(() => document.documentElement, [])

  useEffect(() => {
    if (!initialized) return

    LocalStorage.setItem('theme', theme)
    setIsDarkMode(theme === 'dark')
    setIsLightMode(theme === 'light')

    if (rootElem) {
      rootElem.classList.remove('dark', 'light')
      rootElem.classList.add(theme)
    }
  }, [theme, rootElem, initialized])

  useEffect(() => {
    const storedTheme = LocalStorage.getItem<Theme>('theme', { parse: false })

    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme)
    } else if (prefersDarkMode) {
      setTheme('dark')
    } else if (prefersLightMode) {
      setTheme('light')
    }

    setInitialized(true)
  }, [prefersDarkMode, prefersLightMode])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        isLightMode,
        prefersDarkMode,
        prefersLightMode,
        setTheme: setThemeMode,
        toggleTheme: toggleThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
