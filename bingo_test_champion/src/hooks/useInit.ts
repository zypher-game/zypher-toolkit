import { NavKey, pathnameState, useRecoilValue } from '@ui/src'
import { GlobalVar } from '@ui/src'
import FontFaceObserver from 'fontfaceobserver'
import { useLayoutEffect, useMemo } from 'react'

import { useAppDispatch } from '../store/hooks'

export const useIsGetActiveData = () => {
  const pathname = useRecoilValue(pathnameState)
  return useMemo(() => {
    return {
      isActiveRouter: NavKey[0].includes(pathname[1]) || (pathname[1] ?? '').startsWith('L') || (pathname[1] ?? '').startsWith('B'),
      isActiveInit:
        NavKey[0].includes(pathname[1]) ||
        NavKey[2].includes(pathname[1]) ||
        (pathname[1] ?? '').startsWith('L') ||
        (pathname[1] ?? '').startsWith('B')
    }
  }, [JSON.stringify(pathname)])
}
export const useInit = () => {
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    GlobalVar.dispatch = dispatch

    const rootElement = document.getElementById('root')
    const loadingElement = document.querySelector('#rootLoading')
    const lemonFont = new FontFaceObserver('Lemon', {
      weight: 400
    })

    const hideRoot = () => {
      if (rootElement) {
        rootElement.style.opacity = '0'
      }
    }

    const showRoot = () => {
      if (rootElement) {
        rootElement.style.visibility = 'visible' // 确保可见性
        rootElement.style.opacity = '1' // 设置透明度为1，触发淡入动画
      }
      if (loadingElement) {
        loadingElement.remove()
      }
    }

    // 直接调用 hideRoot 隐藏元素，而不是依赖 DOMContentLoaded 事件
    hideRoot()

    lemonFont
      .load(null, 10000)
      .then(showRoot)
      .catch((e: any) => {
        console.error('Font loading failed:', e)
        showRoot() // 字体加载失败时仍然显示 root
      })

    return () => {
      // 清理逻辑（如果有的话）
    }
  }, [dispatch]) // 添加 dispatch 作为依赖项
}
