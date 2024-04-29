import { useActiveWeb3React, useRecoilState } from '@UI/src/'
import { useCallback } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import sleep from '@/utils/sleep'

import { TVL_API } from '../constants/activeConstants'
import { activeDataState } from '../state/activeState'
import { form_primary_score } from '../utils/formmate'
import { usePreHandleAction } from './activeHooks'
import { usePrimaryScore } from './useDataCall'

export const useBind = () => {
  const { account } = useActiveWeb3React()
  const [activeData, setActiveData] = useRecoilState(activeDataState)
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
    window.open(`${TVL_API}/connect-twitter?addr=${account}`)
  }, [twitterNickname, preHandleAction])
  return {
    CheckPointHandle,
    CheckDiscordHandle,
    CheckTwitterHandle
  }
}
