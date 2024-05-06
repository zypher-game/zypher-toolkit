import { formatMoney, request, useActiveWeb3React } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'

import { defaultRankChainId, graphqlApiUrl } from '@/constants/constants'

import { IPlayerRankingItem } from '../Ranking'

export const useRanking = (): {
  ranking: IPlayerRankingItem[] | undefined
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  myItem: IPlayerRankingItem | undefined
} => {
  const [tab, setTab] = useState(0)
  const { chainId, account } = useActiveWeb3React()
  const [ranking, setRanking] = useState<IPlayerRankingItem[]>()
  const [myItem, setMyItem] = useState<IPlayerRankingItem>()
  const [loading, setLoading] = useState(false)

  const getApi = useCallback(async () => {
    const chainIdLocal = chainId ?? defaultRankChainId
    const api = graphqlApiUrl[chainIdLocal]
    if (!api) {
      return
    }
    setRanking(undefined)
    setLoading(true)
    // const client = ...
    const result = await request(api, {
      method: 'POST',
      data: JSON.stringify({
        query: `query MyQuery {
          playerDatas(orderBy: ${tab === 0 ? 'joinAmount' : 'winAmount'}, orderDirection: desc, first: 20) {
            winAmount
            joinAmount
            player
          }
        }`,
        variables: {},
        operationName: 'MyQuery'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (result.data && result.data.data && result.data.data.playerDatas) {
      if (result.data.data.playerDatas.length) {
        const res = result.data.data.playerDatas.map((v: any, index: number) => {
          const joinAmount = formatMoney(Number(ethers.utils.formatEther(v['joinAmount'])))
          const winAmount = formatMoney(Number(ethers.utils.formatEther(v['winAmount'])))
          return {
            index: index + 1,
            address: v['player'],
            amount: tab === 0 ? joinAmount : winAmount,
            joinAmount: joinAmount,
            winAmount: winAmount
          }
        })
        setRanking(res)
      }
    }
    setLoading(false)
  }, [chainId, account, tab])

  const getMyApi = useCallback(async () => {
    if (!ranking) {
      return
    }
    const chainIdLocal = chainId ?? defaultRankChainId
    const api = graphqlApiUrl[chainIdLocal]
    if (!api || !account) {
      return
    }
    setLoading(true)
    // const client = ...
    const result = await request(api, {
      method: 'POST',
      data: JSON.stringify({
        query: `
        query MyQuery {
          playerDatas(first: 1, where: {player: "${account}"}) {
            date
            id
            jCount
            joinAmount
            player
            wCount
            winAmount
          }
        }
      `,
        variables: {},
        operationName: 'MyQuery'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (result.data && result.data.data && result.data.data.playerDatas) {
      if (result.data.data.playerDatas.length) {
        // setMyItem({
        //   address: account,
        //   winAmount: formatMoney(Number(ethers.utils.formatEther(result.data.data.playerDatas[0]['winAmount']))),
        //   joinAmount: formatMoney(Number(ethers.utils.formatEther(result.data.data.playerDatas[0]['joinAmount'])))
        // })
        const obj: IPlayerRankingItem = {
          address: account,
          winAmount: formatMoney(Number(ethers.utils.formatEther(result.data.data.playerDatas[0]['winAmount']))),
          joinAmount: formatMoney(Number(ethers.utils.formatEther(result.data.data.playerDatas[0]['joinAmount'])))
        }
        const rankingFilter = ranking?.filter(v => v.address.toLowerCase() === account.toLowerCase())
        if (rankingFilter && rankingFilter.length) {
          obj.index = rankingFilter[0].index
        } else {
          let len
          if (tab === 0) {
            const winAmount = result.data.data.playerDatas[0]['winAmount']
            const wresult = await request(api, {
              method: 'POST',
              data: JSON.stringify({
                query: `
            query MyQuery {
              playerDatas(
                where: {winAmount_gt: "${winAmount}"}
                orderDirection: desc
                orderBy: winAmount
              ) {
                winAmount
              }
            }
          `,
                variables: {},
                operationName: 'MyQuery'
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            len = wresult.data.data.playerDatas.length
          } else {
            const joinAmount = result.data.data.playerDatas[0]['joinAmount']
            const jresult = await request(api, {
              method: 'POST',
              data: JSON.stringify({
                query: `
                  query MyQuery {
                    playerDatas(
                      where: {joinAmount_gt: "${joinAmount}"}
                      orderDirection: desc
                      orderBy: joinAmount
                    ) {
                      joinAmount
                    }
                  }
                `,
                variables: {},
                operationName: 'MyQuery'
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            len = jresult.data.data.playerDatas.length
          }
          if (len && len < ranking.length) {
            obj.index = len + 1
          } else {
            obj.index = len
          }
        }
        setMyItem(obj)
      }
    }
    setLoading(false)
  }, [ranking, chainId, tab, account])

  useEffect(() => {
    getApi()
  }, [chainId, account, tab])
  useEffect(() => {
    if (account && ranking) {
      getMyApi()
    }
  }, [chainId, account, tab, ranking])
  return {
    ranking,
    tab,
    setTab,
    loading,
    myItem
  }
}
