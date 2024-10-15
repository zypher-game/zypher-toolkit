import { NavKey, pathnameState, useRecoilValue } from '@ui/src'
import { GlobalVar } from '@ui/src'
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
    setTimeout(() => {
      const el = document.querySelector('#rootLoading')
      if (el) {
        el.remove()
      }
      GlobalVar.dispatch = dispatch
    }, 10)
  }, [])
}
