import { AddressZero } from '@ethersproject/constants'
import { ChainId, CODELENGTH, getLinkPre, preStaticUrl, request, TVL_API, TVLStakingSupportedChainId, useActiveWeb3React } from '@ui/src'
import { GlobalVar } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { Address } from 'wagmi'

import { usePreHandleGlobal } from '@/hooks/usePreHandleGlobal'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { getWeb3Sign } from '@ui/src'

import { useActiveData } from './useActiveData'
export const preAirdropPathname = 'airdrop'
export const airdropPathname = {
  register: 'register',
  getAirdrop: 'getAirdrop',
  staking: 'staking',
  chooseHunter: 'chooseHunter',
  tvl: ''
}

export const TVLTabList = [
  {
    path: 'team',
    logo: preStaticUrl + '/img/tvl/team.svg',
    label: 'Team'
  },
  {
    path: 'tvlStaking',
    logo: preStaticUrl + '/img/tvl/staking.svg',
    label: 'Staking'
  },
  {
    path: 'leaderboard',
    logo: preStaticUrl + '/img/tvl/leaderboard.svg',
    label: 'Leaderboard'
  }
]
export const tvlPath = TVLTabList.map(v => `/${preAirdropPathname}/${airdropPathname.tvl}${v.path}`)

export const getAirdropPathname = {
  MoreActiveNormal: 'MoreActiveNormal',
  MoreActive: 'MoreActive',
  MoreActiveSuccess: 'MoreActiveSuccess',
  NormalActive: 'NormalActive',
  NoActive: 'NoActive'
}

export const canNext = (account?: Address, chainId?: ChainId): boolean => {
  if (account && chainId && TVLStakingSupportedChainId.includes(chainId)) {
    return true
  }
  return false
}

export const usePreHandleAction = () => {
  const _preHandleAction = usePreHandleGlobal()
  const preHandleAction = useCallback(
    (chainId?: ChainId) => {
      return _preHandleAction(env, (chainId ? [chainId] : TVLStakingSupportedChainId) as unknown as ChainId[])
    },
    [_preHandleAction]
  )
  return preHandleAction
}

export const useSignCall = () => {
  const { activeData, setActiveData } = useActiveData()
  const { accountAddress, invitationCode, id, isInitLoading } = activeData
  const getSignCall = useCallback(async () => {
    if (accountAddress !== AddressZero && invitationCode && !id && !isInitLoading) {
      try {
        const hashedCardBytes = ethers.utils.hexConcat([accountAddress])
        const _signedStr = await getWeb3Sign(hashedCardBytes, accountAddress, false)
        if (typeof _signedStr === 'string') {
          setActiveData(pre => ({ ...pre, signedStr: _signedStr }))
        } else {
          setActiveData(pre => ({ ...pre, invitationCode: '', signedFalse: true }))
        }
      } catch (err) {
        setErrorToast(err)
        setActiveData(pre => ({ ...pre, invitationCode: '', signedFalse: true }))
      }
    }
  }, [accountAddress, isInitLoading, invitationCode, id])
  return { getSignCall }
}
export const useSign = () => {
  const { chainId } = useActiveWeb3React()
  const { activeData, setActiveData } = useActiveData()
  const { accountAddress, invitationCode, signedStr, id } = activeData
  const { getSignCall } = useSignCall()
  const getLoginCall = useCallback(async () => {
    if (signedStr && signedStr !== '0000' && !id && chainId) {
      try {
        const linkType = getLinkPre(chainId)
        const res = await request(`${TVL_API}/api/loginByCode`, {
          method: 'POST',
          data: JSON.stringify({
            code: invitationCode.substring(1),
            address: accountAddress,
            signature: signedStr,
            linkType: linkType.key
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.data && res.data['message'] == 'ok') {
        } else {
          setActiveData(pre => ({ ...pre, signedStr: '', invitationCode: '' }))
          setErrorToast('loginByCode Error')
        }
      } catch (e: any) {
        setActiveData(pre => ({ ...pre, signedStr: '', invitationCode: '' }))
        setErrorToast(e)
      }
    }
  }, [signedStr, invitationCode, chainId, id])
  useEffect(() => {
    getLoginCall()
  }, [signedStr])
  useEffect(() => {
    if (!signedStr && invitationCode && invitationCode.length === CODELENGTH) {
      getSignCall()
    }
  }, [getSignCall])
}
