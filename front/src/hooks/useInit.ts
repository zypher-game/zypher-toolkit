import { isGames, NavKey, pathnameState, useRecoilValue } from '@ui/src'
import { useEffect, useMemo } from 'react'

import { GlobalVar } from '@/constants/constants'
import { useActiveInit } from '@/pages/Active/hooks/useActiveInit'
import { useActiveRouter } from '@/pages/Active/hooks/useActiveRouter'

import { useAppDispatch } from '../store/hooks'
export const useIsGetActiveData = () => {
  const pathname = useRecoilValue(pathnameState)
  return useMemo(() => {
    return {
      isActiveRouter: NavKey[0].includes(pathname[1]) || (pathname[1] ?? '').startsWith('L' || 'B'),
      isActiveInit: NavKey[0].includes(pathname[1]) || NavKey[2].includes(pathname[1]) || (pathname[1] ?? '').startsWith('L' || 'B')
    }
  }, [JSON.stringify(pathname)])
}
export const useInit = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector('#rootLoading')
      if (el) {
        el.remove()
      }
      GlobalVar.dispatch = dispatch
    }, 10)
  }, [])
  if (!isGames) {
    useActiveRouter()
    useActiveInit()
  }
}