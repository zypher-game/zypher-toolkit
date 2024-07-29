import { ChainRpcUrls, getProvider, IContractName, zkBingo } from '@zypher-game/toolkit/ui'
import BigNumberjs from 'bignumber.js'
import { sample } from 'lodash'
import { useEffect, useState } from 'react'

import { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { IBingoVersion } from '@/pages/state/state'
export type ILevels = {
  amount: string
  index: number
  isActive: boolean
}
export const useLevels = (): {
  activeLevels: ILevels[]
} => {
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [activeLevels, setActiveLevels] = useState<ILevels[]>(
    ['5000', '10000', '20000'].map((v, index) => ({
      amount: new BigNumberjs(v).toFormat(0, 1),
      index: index + 1,
      isActive: true
    }))
  )
  useEffect(() => {
    if (chainId && account) {
      if (bingoVersion === IBingoVersion.v1) {
        ;(async () => {
          const provider = await getProvider(sample(ChainRpcUrls[chainId]))
          const bingoLobbyContract = await bingoLobbyFromRpc({ chainId, bingoVersion, library: provider, account })
          const { list, wins } = await bingoLobbyContract.functions.activeLevels()
          const arr = list.map((levelInfo: any, index: number) => ({
            amount: new BigNumberjs(levelInfo.betSize.toString(10)).div(10 ** 18).toFormat(0, 1),
            index: index + 1,
            isActive: wins >= levelInfo.minWinCounts
          }))
          setActiveLevels(arr)
        })()
      }
    }
  }, [account, bingoVersion, chainId])
  return {
    activeLevels
  }
}
