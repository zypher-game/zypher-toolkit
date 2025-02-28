import { debounce } from 'lodash'
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

interface IScaleContextType {
  scale: number
  updateScale: () => void
}

const ScaleContext = createContext<IScaleContextType | undefined>(undefined)

const ScaleProvider: FC<{
  children: ReactNode
  originalWidth?: number
  originalHeight?: number
}> = ({ children, originalWidth = 1170, originalHeight = 790 }) => {
  const [scale, setScale] = useState(1)
  const calculateScale = debounce(() => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // 计算宽度和高度的缩放比例
    const scaleWidth = windowWidth / originalWidth
    const scaleHeight = windowHeight / originalHeight

    // 使用较小的缩放比例，以确保完整显示
    let newScale = Math.min(scaleWidth, scaleHeight, 1)
    if (windowWidth < 1200) {
      newScale *= 0.95
    }
    setScale(newScale)
  }, 200)
  useEffect(() => {
    // 初始计算
    calculateScale()

    // 监听滚动和窗口大小变化
    window.addEventListener('scroll', calculateScale)
    window.addEventListener('resize', calculateScale)

    // 清理监听器
    return () => {
      window.removeEventListener('scroll', calculateScale)
      window.removeEventListener('resize', calculateScale)
      calculateScale.cancel()
    }
  }, [])
  return <ScaleContext.Provider value={{ scale, updateScale: calculateScale }}>{children}</ScaleContext.Provider>
}

export const useScale = () => {
  const context = useContext(ScaleContext)
  if (context === undefined) {
    throw new Error('useScale must be used within a ScaleProvider')
  }
  return context
}
export default ScaleProvider
