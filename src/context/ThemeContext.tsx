'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Theme = 'colorful' | 'dark-gold' | 'light-gold'

interface ThemeContextType {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light-gold',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light-gold')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme | null
    if (saved && ['colorful', 'dark-gold', 'light-gold'].includes(saved)) {
      setThemeState(saved)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme, mounted])

  const setTheme = (t: Theme) => setThemeState(t)

  // Prevent flash: render children always, theme attr set on mount
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
