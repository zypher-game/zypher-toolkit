import { graphqlApiUrl, httpGet, TelegramUserInfoDto, TelegramUserInfoState, TG_BOT_URL, useRecoilValue } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import { defaultRankChainId } from '@/constants/constants'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { IBingoVersion } from '@/pages/state/state'

export const useTgRanking = (): {
  ranking: TelegramUserInfoDto[] | undefined
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  myItem: TelegramUserInfoDto | undefined
} => {
  const [tab, setTab] = useState(0)
  const [ranking, setRankingTg] = useState<TelegramUserInfoDto[]>()
  const [myItem, setMyItem] = useState<TelegramUserInfoDto>()
  const [loading, setLoading] = useState(false)
  const userInfo = useRecoilValue(TelegramUserInfoState)
  const getApi = useCallback(async () => {
    setRankingTg(undefined)
    setLoading(true)
    const result = await httpGet<TelegramUserInfoDto[]>(`${TG_BOT_URL}/ranking/get`)
    if (result.data.length) {
      setRankingTg(result.data.map((v, index) => ({ ...v, index: `${index + 1}` })))
    }
    setLoading(false)
  }, [])

  const getMyApi = useCallback(async () => {
    console.log({ ranking, userInfo })
    if (!userInfo) {
      return
    }
    setMyItem(undefined)
    setLoading(true)
    if (ranking && ranking.length) {
      const filter = ranking.filter(v => v.evmWallet === userInfo.evmWallet)
      if (filter && filter.length) {
        setMyItem(filter[0])
      } else {
        const result = await httpGet<TelegramUserInfoDto>(`${TG_BOT_URL}/ranking/get/me?id=${userInfo.id}`)
        console.log('dddd', result)
        if (result.data) {
          setMyItem(result.data)
        }
      }
    }
    setLoading(false)
  }, [JSON.stringify(userInfo)])

  useEffect(() => {
    getApi()
  }, [])

  useEffect(() => {
    getMyApi()
  }, [JSON.stringify(userInfo)])

  return {
    ranking,
    tab,
    setTab,
    loading,
    myItem
  }
}
