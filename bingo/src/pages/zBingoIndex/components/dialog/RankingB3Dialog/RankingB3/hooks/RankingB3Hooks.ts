import {
  addressIsEqual,
  atom,
  BigNumberJs,
  ChainId,
  formatMoney,
  httpGet,
  httpPost,
  localStorageEffect,
  useActiveWeb3React,
  useRecoilState,
  useRecoilValue
} from '@ui/src'
import { ethers } from 'ethers'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { rankingB3DialogState } from '@/pages/state/state'
import { ILocalPathUrl, localPathUrl } from '@/utils/localPathUrl'

import { defaultUser } from '../RankingB3'

export type IB3Info = {
  gameTotalNum: string
  gameTotalNumStr: string
  gameName: string
  gameWinNum: string
  gameWinNumStr: string
  winningPercent: string
  address: string
  rank: string
}

const b3HistoryState = atom<IB3Info[]>({
  key: 'b3HistoryState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('b3HistoryState')]
})

const winningPercent = ({ joinGameNumber, winGameNumber }: { joinGameNumber: string; winGameNumber: string }) => {
  if (winGameNumber && joinGameNumber && joinGameNumber !== '-' && joinGameNumber !== '0') {
    return ((Number(winGameNumber) / Number(joinGameNumber)) * 100).toFixed(2)
  }
  if (winGameNumber !== '-') {
    return '0'
  }
  return '-'
}

// const B3Api = 'http://192.168.0.19:8090'
const B3Api = 'https://apib3-game-count.zypher.game'
export const useB3Ranking = (): {
  ranking: IB3Info[] | undefined
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  myItem: IB3Info | undefined
} => {
  const [tab, setTab] = useState(0)
  const [ranking, setRankingB3] = useRecoilState(b3HistoryState)
  const [myItem, setMyItem] = useState<IB3Info>(defaultUser)
  const [loading, setLoading] = useState(false)
  const isModalOpen = useRecoilValue(rankingB3DialogState)
  const { account } = useActiveWeb3React()
  const getApi = useCallback(async () => {
    setRankingB3([])
    setLoading(true)
    const result = await httpGet<IB3Info[]>(`${B3Api}/getList`)
    if (result.data && result.data.length) {
      if (isEqual(ranking, result.data)) {
        return
      }
      setRankingB3(
        result.data.map(v => {
          return {
            ...v,
            gameTotalNumStr: formatMoney(v.gameTotalNum),
            gameWinNumStr: formatMoney(v.gameWinNum),
            winningPercent: winningPercent({
              joinGameNumber: v.gameTotalNum,
              winGameNumber: v.gameWinNum
            }),
            rank: formatMoney(v.rank)
          }
        })
      )
    }
    setLoading(false)
  }, [])

  const getMyApi = useCallback(async () => {
    setMyItem({ ...defaultUser, address: `${account ?? '-'}` })
    setLoading(true)
    let isLocal = false
    if (ranking && ranking.length) {
      const filter = ranking.filter(v => addressIsEqual(v.address, account))
      if (filter && filter.length) {
        isLocal = true
        setMyItem(filter[0])
      }
    }
    if (!isLocal) {
      const result = await httpGet<IB3Info>(`${B3Api}/my/${account?.toLowerCase()}`)
      if (result.data) {
        const v = result.data
        setMyItem({
          ...v,
          address: `${account}`,
          gameTotalNumStr: formatMoney(v.gameTotalNum),
          gameWinNumStr: formatMoney(v.gameWinNum),
          winningPercent: winningPercent({
            joinGameNumber: v.gameTotalNum,
            winGameNumber: v.gameWinNum
          }),
          rank: formatMoney(v.rank)
        })
      }
    }
    setLoading(false)
  }, [account, JSON.stringify(ranking)])

  useEffect(() => {
    getApi()
  }, [isModalOpen])

  useEffect(() => {
    getMyApi()
  }, [account, JSON.stringify(ranking)])

  return {
    ranking,
    tab,
    setTab,
    loading,
    myItem
  }
}
export const usePostResult = () => {
  const updateResult = useCallback(
    async ({ chainId, gameId, isWin, address }: { chainId: ChainId; gameId: string; isWin: boolean; address: string }) => {
      const localpath = localPathUrl(chainId)
      if (localpath === ILocalPathUrl.B3) {
        await httpPost(B3Api + '/insertRecord', {
          gameId: gameId,
          gameName: 'Bingo',
          isWin: isWin,
          address: address
        })

        // const formData = new FormData()
        // formData.append('address', address!)
        // formData.append('gameId', gameId)
        // formData.append('gameName', 'Bingo')
        // formData.append('isWin', `${isWin}`)
        // await request(`${B3Api}/insertRecord`, {
        //   method: 'POST',
        //   data: formData,
        //   headers: {
        //     accept: 'application/json; charset=utf-8',
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })
      }
    },
    []
  )
  return updateResult
}
