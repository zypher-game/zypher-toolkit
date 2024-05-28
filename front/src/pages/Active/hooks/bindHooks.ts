import { getLinkPre, sleep, TVL_API, useActiveWeb3React } from '@ui/src'
import { useCallback } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import { form_primary_score } from '../utils/formmate'
import { usePreHandleAction, useSignCall } from './activeHooks'
import { useActiveData } from './useActiveData'
import { usePrimaryScore } from './useDataCall'

export const useBind = () => {
  const { account, chainId } = useActiveWeb3React()
  const { activeData, setActiveData } = useActiveData()
  const { getPrimaryScore } = usePrimaryScore()
  const { getSignCall } = useSignCall()
  const {
    twitter: { nickname: twitterNickname },
    discord,
    signedStr
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
    setActiveData(pre => ({ ...pre, ...primaryScoreRes, checkAirdropPointsLoading: false }))
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
    if (!signedStr || signedStr === '') {
      getSignCall()
      return
    }
    setActiveData(pre => ({ ...pre, twitter: { ...pre.twitter, isLoading: true } }))
    const linkType = getLinkPre(chainId)
    window.open(`${TVL_API}/connect-twitter?addr=${account}&linkType=${linkType.key}`)
    setActiveData(pre => ({ ...pre, twitter: { ...pre.twitter, isLoading: false } }))
  }, [signedStr, twitterNickname, preHandleAction, chainId])
  return {
    CheckPointHandle,
    CheckDiscordHandle,
    CheckTwitterHandle
  }
}
