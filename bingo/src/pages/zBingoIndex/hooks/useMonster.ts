import { useCallback, useEffect, useState } from 'react'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'

import { fetchAccountMonsterNft } from './fetch/fetchAccountMonsterNft'

export const useMonster = (): {
  hasMonsterNft: boolean
} => {
  const { chainId, account } = useActiveWeb3ReactForBingo()
  const [hasMonsterNft, setHasMonsterNft] = useState(false)
  const fetchData = useCallback(async () => {
    if (chainId && account) {
      const monsterGraphqlData = await fetchAccountMonsterNft({ chainId, account })
      if (monsterGraphqlData) {
        setHasMonsterNft(monsterGraphqlData)
        return
      }
    }
    setHasMonsterNft(false)
    return
  }, [chainId, account])
  useEffect(() => {
    if (chainId && account) {
      fetchData()
    }
  }, [chainId, account])
  return { hasMonsterNft }
}
