import { BigNumberJs, ChainId, Currency, useActiveWeb3React, useRecoilState, useRecoilValue, useSetRecoilState, useSwitchNetwork } from '@ui/src'
import { useCallback, useMemo } from 'react'

import { setErrorToast } from '@/utils/Error/setErrorToast'

import {
  depositCurrencyState,
  tvlRedepositDialogState,
  tvlStakingDataState,
  tvlStakingDialogState,
  tvlStakingForbidDialogState,
  tvlWithdrawDialogState
} from '../state/activeState'
import { useActiveData } from './useActiveData'

export const useTvlStakingDialogState = () => {
  const { chainId: chainIdLocal } = useActiveWeb3React()
  const { switchNetwork } = useSwitchNetwork()
  const setIsStakingOpen = useSetRecoilState(tvlStakingDialogState)
  const setIsWithdrawOpen = useSetRecoilState(tvlWithdrawDialogState)
  const setIsRedepositOpen = useSetRecoilState(tvlRedepositDialogState)
  const setIsForbidModalOpen = useSetRecoilState(tvlStakingForbidDialogState)
  const { activeData } = useActiveData()
  const { isRegistered } = activeData
  const [depositCurrency, setDepositCurrency] = useRecoilState(depositCurrencyState)
  const tvlStakingData = useRecoilValue(tvlStakingDataState)
  const isEnd = useMemo(() => {
    const now = parseInt(`${new Date().valueOf() / 1000}`)
    const END_TIME = tvlStakingData[chainIdLocal][Currency[chainIdLocal]].END_TIME
    if (END_TIME && new BigNumberJs(END_TIME).lt(now)) {
      return true
    }
    return false
  }, [JSON.stringify(tvlStakingData)])
  const setIsStakingOpenHandle = useCallback(
    ({
      chainId,
      isOpen,
      key,
      currency
    }: {
      chainId: ChainId
      isOpen: boolean
      key: 'tvlStakingDialogState' | 'tvlWithdrawDialogState' | 'tvlRedepositDialogState'
      currency?: string
    }) => {
      if (isOpen && switchNetwork && chainId !== chainIdLocal) {
        try {
          switchNetwork(parseInt(chainId, 10))
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
      if (isOpen) {
        if (key === 'tvlStakingDialogState') {
          if (isEnd) {
            return
          }
        }
      }

      if (key === 'tvlStakingDialogState') {
        setIsStakingOpen(isOpen)
      } else if (key === 'tvlRedepositDialogState') {
        setIsRedepositOpen(isOpen)
      } else if (key === 'tvlWithdrawDialogState') {
        setIsWithdrawOpen(isOpen)
      }
    },
    [chainIdLocal, isEnd, isRegistered, depositCurrency]
  )
  return setIsStakingOpenHandle
}
