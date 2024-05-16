import { useActiveWeb3React, useRecoilState } from '@ui/src'
import { useEffect, useMemo } from 'react'

import { TVLStakingSupportedChainId } from '../constants/activeConstants'
import { chainIndexState } from '../state/activeState'

export const useChainIndex = () => {
  const [chainIndex, setChainIndex] = useRecoilState(chainIndexState)
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    const index = TVLStakingSupportedChainId.indexOf(chainId)
    if (index > -1) {
      setChainIndex(index)
    }
  }, [chainId])
  const chainIdLocal = useMemo(() => {
    return TVLStakingSupportedChainId[chainIndex]
  }, [chainIndex, JSON.stringify(TVLStakingSupportedChainId)])
  return {
    chainIndex,
    setChainIndex,
    chainIdLocal
  }
}
