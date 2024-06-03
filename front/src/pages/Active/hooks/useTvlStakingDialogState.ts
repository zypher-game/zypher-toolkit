import { ChainId, useActiveWeb3React, useSetRecoilState, useSwitchNetwork } from '@ui/src'
import { useCallback } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import { tvlStakingDialogState } from '../state/activeState'

export const useTvlStakingDialogState = () => {
  const { chainId } = useActiveWeb3React()
  const { switchNetwork } = useSwitchNetwork()
  const setIsModalOpen = useSetRecoilState(tvlStakingDialogState)
  const setIsModalOpenHandle = useCallback(
    (params: ChainId, value: boolean) => {
      console.log(value, switchNetwork, params !== chainId, params)
      if (value && switchNetwork && params !== chainId) {
        try {
          switchNetwork(params)
        } catch (err) {
          setErrorToast(GlobalVar.dispatch, err)
        }
        return
      }
      setIsModalOpen(value)
    },
    [chainId]
  )
  return setIsModalOpenHandle
}
