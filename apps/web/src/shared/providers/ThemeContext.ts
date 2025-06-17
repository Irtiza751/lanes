import { createContext } from 'react'
export type Theme = 'light' | 'dark'
export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDarkMode: boolean
  isLightMode: boolean
  prefersDarkMode: boolean
  prefersLightMode: boolean
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
