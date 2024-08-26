import { BigNumberJs, FORMAT, httpGet, TelegramUserInfoDto, TelegramUserInfoState, TG_BOT_URL, useRecoilValue } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import { rankingTgDialog } from '@/pages/state/state'

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
  const isModalOpen = useRecoilValue(rankingTgDialog)
  const getApi = useCallback(async () => {
    setRankingTg(undefined)
    setLoading(true)
    const result = await httpGet<TelegramUserInfoDto[]>(`${TG_BOT_URL}/ranking/get`)
    if (result.data && result.data.length) {
      setRankingTg(
        result.data
          .map((v, index) => ({ ...v, index: `${index + 1}` }))
          .map(v => ({
            ...v,
            starStr: new BigNumberJs(v.star).toFormat(0, BigNumberJs.ROUND_HALF_UP, FORMAT)
          }))
      )
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
    let isLocal = false
    if (ranking && ranking.length) {
      const filter = ranking.filter(v => v.evmWallet === userInfo.evmWallet)
      if (filter && filter.length) {
        isLocal = true
        setMyItem(filter[0])
      }
    }
    if (!isLocal) {
      const result = await httpGet<TelegramUserInfoDto>(`${TG_BOT_URL}/ranking/get/me?id=${userInfo.id}`)
      console.log('dddd', result)
      if (result.data) {
        setMyItem({
          ...result.data,
          starStr: new BigNumberJs(result.data.star).toFormat(0, BigNumberJs.ROUND_HALF_UP, FORMAT)
        })
      }
    }
    setLoading(false)
  }, [JSON.stringify(userInfo), JSON.stringify(ranking)])

  useEffect(() => {
    getApi()
  }, [isModalOpen])

  useEffect(() => {
    getMyApi()
  }, [JSON.stringify(userInfo), , JSON.stringify(ranking)])

  return {
    ranking,
    tab,
    setTab,
    loading,
    myItem
  }
}
