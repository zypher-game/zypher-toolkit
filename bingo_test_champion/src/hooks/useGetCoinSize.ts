import { BigNumberJs, pow10 } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import { IBingoVersion } from '@/pages/state/state'

import bingoLobbyFee from '../contract/bingoLobbyFee'
import { env } from '../utils/config'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'
const useGetCoinSize = () => {
  const [coinSize, setCoinSize] = useState(0)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const getCoinSize = useCallback(async () => {
    if (!chainId || !account) {
      return
    }
    const Contract = bingoLobbyFee(chainId, env)
    const Coin = await Contract.read.gameInputPer()

    setCoinSize(pow10(new BigNumberJs(Coin).toNumber()).toNumber())
  }, [account, chainId, bingoVersion])
  useEffect(() => {
    if (bingoVersion === IBingoVersion.v1) {
      getCoinSize()
    }
  }, [chainId, account, bingoVersion])
  return coinSize
}

export default useGetCoinSize
