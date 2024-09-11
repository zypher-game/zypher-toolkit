import {
  ChainId,
  Currency,
  divisorBigNumber,
  refreshBalanceState,
  txStatus,
  useAaWallet,
  useAccountInvitation,
  useActiveWeb3React,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionReceipt } from 'viem'

import { TVLStakingContract } from '@/contract/tvlStaking'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import {
  extendCurrencyState,
  isTvlDataLoadingState,
  ITVLStakingData,
  selectTokenDialogState,
  tvlExtendDialogState,
  tvlStakingDataState
} from '../state/activeState'
import { canNext, usePreHandleAction } from './activeHooks'
import { useStake, useStakeData } from './useStakeData'
export const useExtend = (): {
  week: number
  handleWeekChange: any
  selectLen: number[]
  isExtendLoading: boolean
  account: `0x${string}` | undefined
  maxHandle: () => void
  chainId: ChainId
  isDataLoading: boolean
  extend: () => Promise<void>
  extendCurrency: string | undefined
  isApproveLoading: boolean
  changeExtendCurrencyHandle: () => void
  tvlStakingData: Record<ChainId, Record<string, ITVLStakingData>>
} => {
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isExtendLoading, setIsExtendLoading] = useState(false)
  const [extendValue, setExtendValue] = useState('')
  const setIsSelectTokenDialogModalOpen = useSetRecoilState(selectTokenDialogState)
  const [extendCurrency, setExtendCurrency] = useRecoilState(extendCurrencyState)
  const [week, setWeek] = useState(1)
  const [max, setMax] = useState('0')
  const { account, chainId: nativeChainId } = useActiveWeb3React()
  const { getStakingData } = useStakeData()
  const isDataLoading = useRecoilValue(isTvlDataLoadingState)
  const tvlStakingData = useRecoilValue(tvlStakingDataState)
  const { walletClient } = useAaWallet()
  const { postAccountUpdate } = useAccountInvitation(env)
  const isW768 = useIsW768()
  // const { isRegistered } = tvlStakingData
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const setExtendDialog = useSetRecoilState(tvlExtendDialogState)
  const preHandleAction = usePreHandleAction()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)

  useStake()
  const handleWeekChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setWeek(Number(selectedValue))
  }, [])
  useEffect(() => {
    setIsApproveLoading(false)
    setIsExtendLoading(false)
    setExtendValue('')
    if (!extendCurrency) {
      setExtendCurrency('W' + Currency[nativeChainId])
    }
  }, [account, nativeChainId])
  const selectLen = useMemo(() => {
    const MAX_LOCK_WEEKS = 24
    return Array.from({ length: Number(MAX_LOCK_WEEKS) }, (_value, index) => index + 1)
  }, [])
  const _successGet = useCallback(
    async ({ tx }: { tx: TransactionReceipt; blockNumber: number }) => {
      if (nativeChainId && account) {
        getStakingData()
        setIsApproveLoading(false)
        setIsExtendLoading(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
        setExtendDialog(false)
      }
    },
    [nativeChainId, account]
  )
  const extend = useCallback(async () => {
    const currency = extendCurrency
    try {
      if (isDataLoading) {
        return
      }
      const isOk = preHandleAction()
      if (!isOk) {
        setIsExtendLoading(false)
        return
      }

      if (!walletClient) {
        throw new Error('walletClient not Ready')
      }
      if (isExtendLoading || isApproveLoading) {
        return
      }
      const _nativeChainId = nativeChainId
      const contract = TVLStakingContract({ chainId: _nativeChainId, env, signer: walletClient })

      if (!contract) {
        setErrorToast('dpContract is not ready')
        return
      }
      if (!currency) {
        throw new Error('Currency not Ready')
      }
      const token = tvlStakingData[_nativeChainId][currency]
      const tokenAmount = token.withdrawAmount
      if (new BigNumberJs(tokenAmount).toFixed() === '0') {
        throw new Error('Amount is not enough')
      }
      const erc20Address = token.address
      setIsExtendLoading(true)
      const endTime = token.END_TIME
      if (!endTime) {
        throw new Error('endTime wrong')
      }
      const times = new BigNumberJs(endTime).plus(60 * 60 * 24 * 7).toFixed()

      const res = await contract.write.redeposit([erc20Address, times], {
        account: account
      })
      const hash = typeof res === 'string' ? res : res.hash
      const extendTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
      if (extendTx && extendTx.status === txStatus) {
        setIsExtendLoading(false)
        await _successGet({
          tx: extendTx,
          blockNumber: new BigNumberJs(extendTx.blockNumber.toString()).toNumber()
        })
        setSuccessToast({ title: '', message: 'Extend successful' })
      } else {
        throw Object.assign(new Error('Extend Transaction Failed'), { name: 'Extend' })
      }
    } catch (e) {
      setIsApproveLoading(false)
      setIsExtendLoading(false)
      setErrorToast(e)
      console.error('ExtendHandle: ', e)
    }
  }, [
    isW768,
    isDataLoading,
    isApproveLoading,
    isExtendLoading,
    extendCurrency,
    extendValue,
    walletClient,
    account,
    nativeChainId,
    preHandleAction,
    week
  ])
  useEffect(() => {
    if (
      canNext(account, nativeChainId) &&
      extendCurrency &&
      extendCurrency !== '' &&
      tvlStakingData[nativeChainId] &&
      tvlStakingData[nativeChainId][extendCurrency] &&
      tvlStakingData[nativeChainId][extendCurrency].balance !== ''
    ) {
      setMax(new BigNumberJs(tvlStakingData[nativeChainId][extendCurrency].balance).dividedBy(divisorBigNumber).toFixed())
      return
    }
    setMax('0')
    return
  }, [extendCurrency, nativeChainId, JSON.stringify(tvlStakingData)])
  const maxHandle = useCallback(() => {
    const isOk = preHandleAction()
    if (isOk) {
      setExtendValue(max)
    }
  }, [max, preHandleAction])
  const changeExtendCurrencyHandle = useCallback(() => {
    setIsSelectTokenDialogModalOpen(true)
  }, [])

  return {
    selectLen,
    isDataLoading,
    extend,
    extendCurrency,
    changeExtendCurrencyHandle,
    tvlStakingData,
    chainId: nativeChainId,
    account: account,
    maxHandle: maxHandle,
    isExtendLoading,
    isApproveLoading,
    week: week,
    handleWeekChange: handleWeekChange
  }
}
