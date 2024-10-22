import { ITvlHero } from '@ui/src'
import { useCallback } from 'react'

import { useActiveData } from './useActiveData'

export const useToPath = () => {
  const { setActiveData } = useActiveData()
  const toSetByTwitterMore = useCallback(() => {
    setActiveData(pre => ({ ...pre, rewardPointsDetail: { ...pre.rewardPointsDetail, byTwitterMore: '0' } }))
    return
  }, [])

  const toSetHero = useCallback((val: ITvlHero) => {
    setActiveData(pre => ({ ...pre, tvlHero: val }))
    return
  }, [])

  const keepGoingHandle = useCallback(async () => {
    toSetByTwitterMore()
    // await sleep(0.1)
    // navigate(`/${preRewardPathname}/${rewardPathname.staking}`)
    return
  }, [])
  return { toSetByTwitterMore, toSetHero, keepGoingHandle }
}
