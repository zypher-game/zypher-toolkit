import { bingoChampionSupportedChainId, sleep, useActiveWeb3React, useChainModal, useSetRecoilState, walletModalOpenState } from '@ui/src'
import { useCallback } from 'react'

export const useChampionAction = () => {
  const { account, chainId } = useActiveWeb3React()
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const { openChainModal } = useChainModal()

  const handleAction = useCallback(async () => {
    // 检查钱包连接
    if (!account) {
      setDialogOpen(false)
      await sleep(1)
      setDialogOpen(true)
      return false
    }

    // 检查链是否支持
    if (!bingoChampionSupportedChainId.includes(chainId)) {
      if (openChainModal) {
        openChainModal()
      }
      return false
    }

    return true
  }, [account, chainId, openChainModal, setDialogOpen])

  return {
    handleAction,
    account,
    chainId
  }
}
