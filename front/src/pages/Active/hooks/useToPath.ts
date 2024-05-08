import { useSetRecoilState } from '@ui/src'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import sleep from '@/utils/sleep'

import { activeDataState, ITvlHero } from '../state/activeState'
import { airdropPathname, preAirdropPathname } from './activeHooks'

export const useToPath = () => {
  const setActiveData = useSetRecoilState(activeDataState)
  const navigate = useNavigate()
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
