import {
  ChainId,
  sleep,
  supportedChainIds,
  useActiveWeb3React,
  useChainModal,
  useConnectModal,
  useRecoilValue,
  useSetRecoilState,
  useSwitchNetwork,
  walletModalOpenState
} from '@ui/src'
import { useCallback } from 'react'

import { chooseChainState } from '@/pages/Active/state/activeState'

export const usePreHandleGlobal = () => {
  const chooseChain = useRecoilValue(chooseChainState)
  const { openConnectModal } = useConnectModal()
  const { account, chainId: nativeChainId } = useActiveWeb3React()
  const { openChainModal } = useChainModal()
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const { switchNetwork } = useSwitchNetwork()
  const preHandleAction = useCallback(
    (env?: string, chainList?: ChainId[]) => {
      try {
        if (!supportedChainIds(env, chainList).includes(nativeChainId)) {
          console.log(switchNetwork, chainList?.length === 1)
          if (switchNetwork && chainList?.length === 1) {
            switchNetwork(chainList[0])
            return
          } else {
            if (openChainModal) {
              openChainModal()
              return
            } else if (openConnectModal) {
              setDialogOpen(true)
              return
            }
          }
        }
        if (switchNetwork && chooseChain && chooseChain !== nativeChainId) {
          switchNetwork(chooseChain)
          return
        }
        return true
      } catch (e) {
        console.log(e)
      }
    },
    [account, switchNetwork, openConnectModal, nativeChainId, chooseChain, openChainModal]
  )

  return preHandleAction
}
