import { useEffect } from 'react'

import { GlobalVar } from '@/constants/constants'
import { useActiveInit } from '@/pages/Active/hooks/useActiveInit'
import { useActiveRouter } from '@/pages/Active/hooks/useActiveRouter'

import { useAppDispatch } from '../store/hooks'
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
  useActiveRouter()
  useActiveInit()
}
