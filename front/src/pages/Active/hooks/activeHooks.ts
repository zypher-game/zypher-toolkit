import { AddressZero } from '@ethersproject/constants'
import { ChainId, request, useActiveWeb3React } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { Address } from 'wagmi'

import { GlobalVar } from '@/constants/constants'
import { usePreHandleGlobal } from '@/hooks/usePreHandleGlobal'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { getWeb3Sign } from '@/utils/getSign'

import { CODELENGTH, getLinkPre, TVL_API, TVLStakingSupportedChainId } from '../constants/activeConstants'
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
    label: 'Team'
  },
  {
    path: 'restaking',
    label: 'Restaking'
  },
  {
    path: 'leaderboard',
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

export const useSign = () => {
  const { chainId } = useActiveWeb3React()
  const { activeData, setActiveData } = useActiveData()
  const { accountAddress, invitationCode, signedStr, id, isInitLoading } = activeData
  console.log({ activeData })
  const getSignCall = useCallback(async () => {
    if (accountAddress !== AddressZero && invitationCode && !id && !isInitLoading) {
      try {
        const hashedCardBytes = ethers.utils.hexConcat([accountAddress])
        const _signedStr = await getWeb3Sign(hashedCardBytes, accountAddress, false)
        console.log({ _signedStr })
        if (typeof _signedStr === 'string') {
          setActiveData(pre => ({ ...pre, signedStr: _signedStr }))
        } else {
          setActiveData(pre => ({ ...pre, invitationCode: '', signedFalse: true }))
        }
      } catch (err) {
        setErrorToast(GlobalVar.dispatch, err)
        setActiveData(pre => ({ ...pre, invitationCode: '', signedFalse: true }))
      }
    }
  }, [accountAddress, isInitLoading, invitationCode, id])

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
          setErrorToast(GlobalVar.dispatch, 'loginByCode Error')
        }
      } catch (e: any) {
        setActiveData(pre => ({ ...pre, signedStr: '', invitationCode: '' }))
        setErrorToast(GlobalVar.dispatch, e)
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
