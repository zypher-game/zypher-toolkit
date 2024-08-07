import { ChainId, useActiveWeb3React, useRecoilState, useSetRecoilState, useSwitchNetwork } from '@ui/src'
import { useCallback } from 'react'

import { GlobalVar } from '@ui/src'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import { depositCurrencyState, tvlStakingDialogState, tvlStakingForbidDialogState } from '../state/activeState'
import { useActiveData } from './useActiveData'

export const useTvlStakingDialogState = () => {
  const { chainId } = useActiveWeb3React()
  const { switchNetwork } = useSwitchNetwork()
  const setIsModalOpen = useSetRecoilState(tvlStakingDialogState)
  const setIsForbidModalOpen = useSetRecoilState(tvlStakingForbidDialogState)
  const { activeData } = useActiveData()
  const { isRegistered } = activeData
  const [depositCurrency, setDepositCurrency] = useRecoilState(depositCurrencyState)
  const setIsModalOpenHandle = useCallback(
    (params: ChainId, value: boolean, currency?: string) => {
      if (value && switchNetwork && params !== chainId) {
        try {
          switchNetwork(parseInt(params, 10))
        } catch (err) {
          setErrorToast(err)
        }
        return
      }
      // 是否注册了  注册了才能staking 否则modal弹窗
      if (!isRegistered) {
        setIsForbidModalOpen(true)
        return
      }
      if (currency && currency !== depositCurrency) {
        setDepositCurrency(currency)
      }
      setIsModalOpen(value)
    },
    [chainId, isRegistered, depositCurrency]
  )
  return setIsModalOpenHandle
}
