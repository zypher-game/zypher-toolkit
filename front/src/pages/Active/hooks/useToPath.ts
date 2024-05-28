import { ITvlHero } from '@ui/src'
import { useCallback } from 'react'

import { useActiveData } from './useActiveData'

export const useToPath = () => {
  const { setActiveData } = useActiveData()
  const toSetByTwitterMore = useCallback(() => {
    setActiveData(pre => ({ ...pre, airdropPointsDetail: { ...pre.airdropPointsDetail, byTwitterMore: '0' } }))
    return
  }, [])

  const toSetHero = useCallback((val: ITvlHero) => {
    setActiveData(pre => ({ ...pre, tvlHero: val }))
    return
  }, [])

  const keepGoingHandle = useCallback(async () => {
    toSetByTwitterMore()
    // await sleep(0.1)
    // navigate(`/${preAirdropPathname}/${airdropPathname.staking}`)
    return
  }, [])
  return { toSetByTwitterMore, toSetHero, keepGoingHandle }
}
