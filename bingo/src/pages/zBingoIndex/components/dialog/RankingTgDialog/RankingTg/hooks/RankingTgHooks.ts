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
  }, [JSON.stringify(userInfo)])

  const getMyApi = useCallback(async () => {
    if (!ranking || !userInfo) {
      return
    }
    setMyItem(undefined)
    setLoading(true)
    const result = await httpGet<TelegramUserInfoDto>(`${TG_BOT_URL}/ranking/get/me?id=${userInfo.id}`)
    if (result.data) {
      setMyItem(result.data)
    }
    setLoading(false)
  }, [JSON.stringify(userInfo)])

  useEffect(() => {
    getApi()
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
