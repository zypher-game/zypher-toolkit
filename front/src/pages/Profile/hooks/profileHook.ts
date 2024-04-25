import RewardAbi from '@zypher-game/bingo-periphery/abi/Reward.json'
import { ChainId, IContractName, useActiveWeb3React, zkBingo } from '@UI/src/'
import { IGameList, MulticallContract } from '@UI/src/'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'

import bingoReward from '@/contract/bingoReward'
import { I2048GameList } from '@/pages/Home/hooks/useRecentZ2048FromContract'
import { env } from '@/utils/config'

export const useGetBox = (
  tab: number
): {
  list: string[]
  listLoading: boolean
} => {
  const [listLoading, setListLoading] = useState<boolean>(false)
  const [list, setList] = useState<string[]>([])
  const { chainId, account } = useActiveWeb3React()

  const getBox = useCallback(async () => {
    if (chainId && account) {
      setListLoading(true)
      const rewardAddress = zkBingo(chainId, IContractName.Reward)
      const rewardContract = await bingoReward(chainId, env)
      const balance = await rewardContract.read.balanceOf([account])
      const indexs = new BigNumber(balance).toNumber()
      if (indexs > 0) {
        const indexArr = new Array(indexs).fill('').map((i, index) => index)
        const params = indexArr.map(index => ({
          reference: IContractName.Reward + index,
          contractAddress: rewardAddress,
          abi: RewardAbi,
          calls: [{ methodName: 'tokenOfOwnerByIndex', reference: 'tokenOfOwnerByIndex', methodParameters: [account, index] }]
        }))
        const multicall = await MulticallContract()
        if (multicall) {
          const { results } = await multicall.call(params)
          if (results) {
            const txs = Object.values(results).map((v: any) => {
              const num = v['callsReturnContext'][0]['returnValues'][0].hex
              return new BigNumber(num).toString()
            })
            setList(txs)
          } else {
            setList([])
          }
        }
      } else {
        setList([])
      }
      setListLoading(false)
    }
  }, [chainId, account])
  useEffect(() => {
    if (chainId && account && tab === 2) {
      getBox()
    }
  }, [chainId, account, tab])
  return {
    list,
    listLoading
  }
}

export const useBingoCard = ({
  tab,
  bingoHistoryList
}: {
  tab: number
  bingoHistoryList: IGameList[]
}): {
  list: IGameList[] | undefined
  listLoading: boolean
} => {
  const { account } = useActiveWeb3React()
  const [listLoading, setListLoading] = useState<boolean>(false)
  const [list, setList] = useState<IGameList[]>()
  const getBingoCard = useCallback(async () => {
    if (bingoHistoryList && bingoHistoryList.length) {
      setListLoading(true)
      const gameIdList = bingoHistoryList.filter(v => v.winner.toLowerCase() === `${account}`.toLowerCase())
      setList(gameIdList)
      setListLoading(false)
    }
  }, [(bingoHistoryList ?? []).length, account])
  useEffect(() => {
    if (tab === 1 && bingoHistoryList && bingoHistoryList.length) {
      getBingoCard()
    }
  }, [bingoHistoryList, tab, account])
  return {
    list,
    listLoading
  }
}

export const useZ2048Card = ({
  tab,
  z2048HistoryList
}: {
  tab: number
  z2048HistoryList: I2048GameList[]
}): {
  list: string[] | undefined
  listLoading: boolean
} => {
  const { account } = useActiveWeb3React()
  const [listLoading, setListLoading] = useState<boolean>(false)
  const [list, setList] = useState<string[]>()
  const getBingoCard = useCallback(async () => {
    if (z2048HistoryList && z2048HistoryList.length) {
      setListLoading(true)
      const gameIdList = z2048HistoryList.map(v => v?.tokenURL ?? '')
      setList(gameIdList)
      setListLoading(false)
    }
  }, [(z2048HistoryList ?? []).length, account])
  useEffect(() => {
    if (tab === 1 && z2048HistoryList && z2048HistoryList.length) {
      getBingoCard()
    }
  }, [z2048HistoryList, tab, account])
  return {
    list,
    listLoading
  }
}
