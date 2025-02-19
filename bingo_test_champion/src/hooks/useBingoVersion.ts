import {
  bingoBetaSupportedChainId,
  bingoChampionSupportedChainId,
  ChainId,
  IBingoVersion,
  setupNetwork,
  timeoutPromise,
  useChainId,
  useIsTelegram,
  useRecoilValue,
  useSetRecoilState,
  useSwitchNetwork
} from '@ui/src'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { bingoVersionState } from '@/pages/state/state'
import { toBingoHref } from '@/utils/toBingoHref'

import { useChainIdParams } from './useChainIdParams'

export const useBingoVersion = () => {
  // page init
  const bingoVersion = useRecoilValue(bingoVersionState)
  const IS_TELEGRAM = useIsTelegram()
  const navigate = useNavigate()
  const chainId = useChainId()
  const setBingoVersion = useSetRecoilState(bingoVersionState)
  const chainIdParams = useChainIdParams()
  const { switchNetworkAsync, isLoading } = useSwitchNetwork()
  const [initialLoad, setInitialLoad] = useState(true) // Track initial load
  useEffect(() => {
    if (`${chainIdParams}` !== `${chainId}`) {
      if (!(window.location.pathname.indexOf('gameRoom') > -1)) {
        try {
          const ch = (initialLoad ? chainIdParams : chainId) as unknown as ChainId
          // if (!supportedChainIds().includes(ch)) {
          //   ch = supportedChainIds()[0]
          // }
          if (switchNetworkAsync) {
            Promise.race([
              new Promise(async (resolve, reject) => {
                try {
                  await setupNetwork(ch)
                  await switchNetworkAsync(parseInt(ch, 10))
                  resolve(true)
                } catch (error) {
                  reject(error)
                }
              }),
              timeoutPromise(initialLoad ? 10000 : 2000)
            ]).finally(() => {
              setInitialLoad(false)
              toBingoHref({
                chainIdParams: `${ch}`,
                navigate
              })
            })
          }
        } catch (err: any) {}
      }
    } else {
      setInitialLoad(false)
    }
  }, [chainId, isLoading, switchNetworkAsync, chainIdParams])
  useEffect(() => {
    if (IS_TELEGRAM) {
      setBingoVersion(IBingoVersion.beta)
    } else {
      if (chainIdParams && bingoBetaSupportedChainId.includes(chainIdParams as ChainId)) {
        setBingoVersion(IBingoVersion.beta)
      } else if (chainIdParams && bingoChampionSupportedChainId.includes(chainIdParams as ChainId)) {
        setBingoVersion(IBingoVersion.champion)
      } else {
        setBingoVersion(IBingoVersion.v1)
      }
    }
  }, [chainIdParams])
}
