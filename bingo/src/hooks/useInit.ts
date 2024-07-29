import { useEffect } from 'react'
export const useInit = () => {
  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector('#rootLoading')
      if (el) {
        el.remove()
      }
    }, 1000)
  }, [])
}
