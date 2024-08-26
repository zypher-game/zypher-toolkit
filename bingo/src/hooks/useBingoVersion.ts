import { bingoBetaSupportedChainId, bingoSupportedChainId, ChainId, useActiveWeb3React, useIsTelegram, useSetRecoilState } from '@ui/src'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { bingoVersionState, IBingoVersion } from '@/pages/state/state'
import { toBingoHref } from '@/utils/toBingoHref'

import { useChainIdParams } from './useChainIdParams'

export const useBingoVersion = () => {
  // page init
  const IS_TELEGRAM = useIsTelegram()
  const navigate = useNavigate()
  const { chainId } = useActiveWeb3React()
  const setBingoVersion = useSetRecoilState(bingoVersionState)
  const chainIdParams = useChainIdParams()
  useEffect(() => {
    if (bingoSupportedChainId.includes(chainId)) {
      if (`${chainIdParams}` !== `${chainId}`) {
        if (!(window.location.pathname.indexOf('gameRoom') > -1)) {
          toBingoHref({
            chainIdParams: `${chainId}`,
            navigate
          })
        }
      }
    }
  }, [chainId, chainIdParams])
  useEffect(() => {
    if (IS_TELEGRAM) {
      setBingoVersion(IBingoVersion.beta)
    } else {
      if (chainIdParams && bingoBetaSupportedChainId.includes(chainIdParams as ChainId)) {
        setBingoVersion(IBingoVersion.beta)
      } else {
        setBingoVersion(IBingoVersion.v1)
      }
    }
  }, [chainIdParams])
}
