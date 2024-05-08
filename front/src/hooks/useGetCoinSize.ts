import { pow10, useActiveWeb3React } from '@ui/src'
import { useEffect, useState } from 'react'

import BigNumberJs from '@/utils/BigNumberJs'

import bingoLobbyFee from '../contract/bingoLobbyFee'
import { env } from '../utils/config'
const useGetCoinSize = () => {
  const [coinSize, setCoinSize] = useState(0)
  const { account, chainId } = useActiveWeb3React()
  const getCoinSize = async () => {
    if (!chainId || !account) {
      return
    }
    const Contract = bingoLobbyFee(chainId, env)
    const Coin = await Contract.read.gameInputPer()

    setCoinSize(pow10(new BigNumberJs(Coin).toNumber()).toNumber())
  }
  useEffect(() => {
    getCoinSize()
  }, [chainId, account])
  return coinSize
}

export default useGetCoinSize
