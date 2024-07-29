import { useCallback, useEffect, useRef } from 'react'

import { useIsMounted } from './useIsMounted'

const useIntervalAsync = (fn: () => Promise<R>, ms: number, show?: boolean) => {
  const mounted = useIsMounted()
  const runningRef = useRef(false)
  const run = useCallback(async () => {
    if (runningRef.current) {
      return
    }
    runningRef.current = true

    try {
      await fn()
    } catch (error) {
      console.error(error)
    }

    runningRef.current = false
  }, [fn, mounted])

  useEffect(() => {
    if (mounted) {
      const interval = setInterval(run, ms)
      return () => {
        clearInterval(interval)
      }
    }
  }, [mounted, run, ms])
}

export default useIntervalAsync
