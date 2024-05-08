import { useEffect } from 'react'

import { GlobalVar } from '@/constants/constants'

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
}
