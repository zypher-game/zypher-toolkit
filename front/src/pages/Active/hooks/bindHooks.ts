import { useActiveWeb3React } from '@ui/src'
import { useCallback } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import sleep from '@/utils/sleep'

import { getLinkPre, TVL_API } from '../constants/activeConstants'
import { form_primary_score } from '../utils/formmate'
import { usePreHandleAction } from './activeHooks'
import { useActiveData } from './useActiveData'
import { usePrimaryScore } from './useDataCall'

export const useBind = () => {
  const { account, chainId } = useActiveWeb3React()
  const { activeData, setActiveData } = useActiveData()
  const { getPrimaryScore } = usePrimaryScore()
  const {
    twitter: { nickname: twitterNickname },
    discord
  } = activeData
  const preHandleAction = usePreHandleAction()
  const CheckPointHandle = useCallback(async () => {
    const isOk = preHandleAction()
    if (!isOk) {
      return
    }
    if (!twitterNickname) {
      setErrorToast(GlobalVar.dispatch, 'Please Follow @Zypher_Network on Twitter')
      return
    }
    setActiveData(pre => ({ ...pre, checkAirdropPointsLoading: true }))
    await sleep(3)
    const primary_score_res = await getPrimaryScore()
    const primaryScoreRes = form_primary_score(activeData, primary_score_res)
    setActiveData({ ...primaryScoreRes, checkAirdropPointsLoading: false })
  }, [JSON.stringify(activeData), account, setSuccessToast])

  const CheckDiscordHandle = useCallback(async () => {
    const isOk = preHandleAction()
    if (!isOk) {
      return
    }
    setActiveData(pre => ({ ...pre, discord: { ...pre.discord, isLoading: true } }))
    await sleep(2)
    setActiveData(pre => ({ ...pre, discord: { avatar: 'string', nickname: 'string', followerCount: 'string', isLoading: false } }))
  }, [JSON.stringify(discord), preHandleAction])
  const CheckTwitterHandle = useCallback(async () => {
    const isOk = preHandleAction()
    if (!isOk) {
      return
    }
    setActiveData(pre => ({ ...pre, twitter: { ...pre.twitter, isLoading: true } }))
    const linkType = getLinkPre(chainId)
    window.open(`${TVL_API}/connect-twitter?addr=${account}&linkType=${linkType.key}`)
    setActiveData(pre => ({ ...pre, twitter: { ...pre.twitter, isLoading: false } }))
  }, [twitterNickname, preHandleAction, chainId])
  return {
    CheckPointHandle,
    CheckDiscordHandle,
    CheckTwitterHandle
  }
}
