import {
  ChainId,
  supportedChainIds,
  useActiveWeb3React,
  useChainModal,
  useRecoilValue,
  useSetRecoilState,
  useSwitchNetwork,
  walletModalOpenState
} from '@UI/src'
import { useCallback } from 'react'

import { chooseChainState } from '@/pages/Active/state/activeState'

export const usePreHandleGlobal = () => {
  const chooseChain = useRecoilValue(chooseChainState)
  const { account, chainId: nativeChainId } = useActiveWeb3React()
  const { openChainModal } = useChainModal()
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const { switchNetwork } = useSwitchNetwork()
  const preHandleAction = useCallback(
    (env?: string, chainList?: ChainId[]) => {
      if (openChainModal && !supportedChainIds(env, chainList).includes(nativeChainId)) {
        openChainModal()
        return
      }
      if (!account) {
        setDialogOpen(true)
        return
      }
      if (switchNetwork && chooseChain && chooseChain !== nativeChainId) {
        switchNetwork(chooseChain)
        return
      }
      return true
    },
    [account, nativeChainId, chooseChain, openChainModal]
  )
  return preHandleAction
}
