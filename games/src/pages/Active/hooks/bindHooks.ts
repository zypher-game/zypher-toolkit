import { getLinkPre, sleep, TVL_API, useActiveWeb3React } from '@ui/src'
import { useCallback, useEffect, useMemo } from 'react'

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
    invitationCode,
    twitter: { nickname: twitterNickname },
    discord: { nickname: discordNickname },
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
    if (!discordNickname) {
      setErrorToast(GlobalVar.dispatch, 'Please Follow @MKJZhS4p2T on Discord')
      return
    }
    setActiveData(pre => ({ ...pre, checkAirdropPointsLoading: true }))
    await sleep(3)
    const primary_score_res = await getPrimaryScore()
    const primaryScoreRes = form_primary_score(activeData, primary_score_res)
    setActiveData(pre => ({ ...pre, ...primaryScoreRes, checkAirdropPointsLoading: false }))
  }, [JSON.stringify(activeData), account, setSuccessToast])
  const _invitationCode = useMemo(() => {
    return invitationCode.slice(0, 1) + '-' + invitationCode.slice(1)
  }, [invitationCode])
  const CheckDiscordHandle = useCallback(async () => {
    const isOk = preHandleAction()
    if (!isOk) {
      return
    }
    if (!signedStr || signedStr === '') {
      getSignCall()
      return
    }
    setActiveData(pre => ({ ...pre, discord: { ...pre.discord, isLoading: true } }))
    const linkType = getLinkPre(chainId)
    window.open(`${TVL_API}/connect-discord?linkCode=${_invitationCode}&addr=${account}&linkType=${linkType.key}`)
    setActiveData(pre => ({ ...pre, discord: { ...pre.discord, isLoading: false } }))
  }, [_invitationCode, signedStr, discordNickname, preHandleAction, chainId])
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
    // "https://tvl-backend-api.zypher.game/connect-twitter?linkCode=L-5UDW3&addr=0x9B233ABBD17e92FDD9ceebDe02513c78d95C0a5c&linkType=1"
    // console.log({ asadf: `${TVL_API}/connect-twitter?linkCode=${_invitationCode}&addr=${account}&linkType=${linkType.key}` })
    window.open(`${TVL_API}/connect-twitter?linkCode=${_invitationCode}&addr=${account}&linkType=${linkType.key}`)
    setActiveData(pre => ({ ...pre, twitter: { ...pre.twitter, isLoading: false } }))
  }, [_invitationCode, signedStr, twitterNickname, preHandleAction, chainId])
  useEffect(() => {
    const url = new URL(window.location.href)
    const twitterError = url.searchParams.get('TwitterError')
    const discordError = url.searchParams.get('DiscordError')
    if (twitterError || discordError) {
      const msg = (twitterError ?? discordError ?? '').replace('"', '')
      setErrorToast(GlobalVar.dispatch, msg)
      setTimeout(() => {
        url.searchParams.delete('TwitterError')
        url.searchParams.delete('DiscordError')
        window.history.replaceState({}, '', url.toString())
      }, 2000)
    }
  }, [])
  return {
    CheckPointHandle,
    CheckDiscordHandle,
    CheckTwitterHandle
  }
}
