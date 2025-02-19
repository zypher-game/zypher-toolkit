import { useEffect, useState } from 'react'

export const useScale = () => {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const calculateScale = () => {
      const originalWidth = 1170
      const originalHeight = 790

      // 获取当前视窗宽度和高度
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // 计算宽度和高度的缩放比例
      const scaleWidth = windowWidth / originalWidth
      const scaleHeight = windowHeight / originalHeight

      // 使用较小的缩放比例，以确保完整显示
      const newScale = Math.min(scaleWidth, scaleHeight, 1)

      setScale(newScale)
    }

    // 初始计算
    calculateScale()

    // 监听滚动和窗口大小变化
    window.addEventListener('scroll', calculateScale)
    window.addEventListener('resize', calculateScale)

    // 清理监听器
    return () => {
      window.removeEventListener('scroll', calculateScale)
      window.removeEventListener('resize', calculateScale)
    }
  }, [])

  return scale
}
