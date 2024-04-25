import { languageList, LngNs, useCurrentLanguage, useCustomTranslation } from '@UI/src/'
import { ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US'
import koKR from 'antd/es/locale/ko_KR'
import zhCN from 'antd/es/locale/zh_TW'
import classnames from 'classnames'
import i18n from 'i18next'
import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react'
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
  // const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const lang = useCurrentLanguage()

  // const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  // const [currentThemeName, setCurrentThemeName] = useState(localStorage.getItem('theme') || (userPrefersDark ? 'dark' : 'light'))
  const { t } = useCustomTranslation([LngNs.common])

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
  const locale = useMemo(() => {
    if (lang) {
      const lng = languageList.filter(v => v.keyValue === lang)
      if (lng && lng[0]) {
        const label = lng[0].label
        if (label === '한국어') {
          return koKR
        }
        if (label === '中文繁體') {
          return koKR
        }
      }
    }
    return enUS
  }, [lang])
  return (
    <ConfigProvider locale={locale}>
      <ThemeContext.Provider
        value={{
          currentThemeName,
          changeTheme,
          isCurrentThemeDark
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  )
}

export const useThemeContext = (): ThemeContextProps => useContext(ThemeContext)
