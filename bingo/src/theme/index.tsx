import classnames from 'classnames'
import React, { ReactNode, useContext, useEffect, useState } from 'react'

interface ThemeContextProps {
  currentThemeName: string
  changeTheme: (name: string) => void
  isCurrentThemeDark: boolean
}

const ThemeContext = React.createContext({} as ThemeContextProps)

interface ThemeProviderProps {
  children: ReactNode
}

function handleClass(obj: Element, cls: string): void {
  const arr = obj.className.split(' ')
  const dark = arr.findIndex(item => item === 'dark')
  const light = arr.findIndex(item => item === 'light')
  if (cls === 'light') {
    arr.splice(dark, 1)
  } else if (cls === 'dark') {
    arr.splice(light, 1)
  }
  arr.push(cls)
  obj.className = classnames(arr)
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  // const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  // const [currentThemeName, setCurrentThemeName] = useState(localStorage.getItem('theme') || (userPrefersDark ? 'dark' : 'light'))
  const [currentThemeName, setCurrentThemeName] = useState('dark')
  const isCurrentThemeDark = currentThemeName === 'dark'

  const changeTheme = (name: string): void => {
    localStorage.setItem('theme', name)
    setCurrentThemeName(name)
  }

  useEffect(() => {
    handleClass(document.getElementsByTagName('html')[0], currentThemeName)
    return () => {}
  }, [currentThemeName])

  return (
    <ThemeContext.Provider
      value={{
        currentThemeName,
        changeTheme,
        isCurrentThemeDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = (): ThemeContextProps => useContext(ThemeContext)
