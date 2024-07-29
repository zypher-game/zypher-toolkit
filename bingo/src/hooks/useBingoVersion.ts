import { bingoBetaSupportedChainId, bingoSupportedChainId, useActiveWeb3React } from '@zypher-game/toolkit/ui'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { bingoVersionState, IBingoVersion } from '@/pages/state/state'
import { toBingoHref } from '@/utils/toBingoHref'

import { useChainIdParams } from './useChainIdParams'

export const useBingoVersion = () => {
  // page init
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
    if (chainIdParams && bingoBetaSupportedChainId.includes(Number(chainIdParams))) {
      setBingoVersion(IBingoVersion.beta)
    } else {
      setBingoVersion(IBingoVersion.v1)
    }
  }, [chainIdParams])
}
