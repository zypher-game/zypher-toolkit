import { AddressZero } from '@ethersproject/constants'
import {
  activeTokenList,
  ChainId,
  crLink,
  Currency,
  divisorBigNumber,
  erc20Contract,
  minStakingValue,
  NavKey,
  refreshBalanceState,
  sleep,
  timeoutPromise,
  TVLChainId,
  tvlTokenAddress,
  txStatus,
  useAaWallet,
  useAccountInvitation,
  useActiveWeb3React,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useSwitchNetwork
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionReceipt } from 'viem'

import { TVLStakingContract } from '@/contract/tvlStaking'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import {
  isTvlDataLoadingState,
  ITVLStakingData,
  redepositCurrencyState,
  selectTokenDialogState,
  tvlRedepositDialogState,
  tvlStakingDataState,
  tvlStakingDialogState
} from '../state/activeState'
import { canNext, usePreHandleAction } from './activeHooks'
import { useActiveData } from './useActiveData'
import { useGetData } from './useActiveInit'
import { useChainIndex } from './useChainIndex'
import { useStake, useStakeData } from './useStakeData'
import { useTvlStakingDialogState } from './useTvlStakingDialogState'
export const useRedeposit = (
  isModal: boolean
): {
  week: number
  handleWeekChange: any
  selectLen: number[]
  isRedepositLoading: boolean
  account: `0x${string}` | undefined
  maxHandle: () => void
  chainId: ChainId
  isDataLoading: boolean
  redeposit: () => Promise<void>
  // redepositValue: string
  redepositCurrency: string | undefined
  // redepositInputHandle: (e: React.ChangeEvent<HTMLInputElement>) => void
  isApproveLoading: boolean
  changeRedepositCurrencyHandle: () => void
  tvlStakingData: Record<ChainId, Record<string, ITVLStakingData>>
} => {
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isRedepositLoading, setIsRedepositLoading] = useState(false)
  const [redepositValue, setRedepositValue] = useState('')
  const setIsSelectTokenDialogModalOpen = useSetRecoilState(selectTokenDialogState)
  const [redepositCurrency, setRedepositCurrency] = useRecoilState(redepositCurrencyState)
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
  const setRedepositDialog = useSetRecoilState(tvlRedepositDialogState)
  const preHandleAction = usePreHandleAction()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)

  useStake()
  const handleWeekChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setWeek(Number(selectedValue))
  }, [])
  useEffect(() => {
    setIsApproveLoading(false)
    setIsRedepositLoading(false)
    setRedepositValue('')
    if (!redepositCurrency) {
      setRedepositCurrency('W' + Currency[nativeChainId])
    }
  }, [account, nativeChainId])
  const selectLen = useMemo(() => {
    const MAX_LOCK_WEEKS = 52
    return Array.from({ length: Number(MAX_LOCK_WEEKS) }, (_value, index) => index + 1)
  }, [])
  const _successGet = useCallback(
    async ({ tx }: { tx: TransactionReceipt; blockNumber: number }) => {
      if (nativeChainId && account) {
        getStakingData()
        setIsApproveLoading(false)
        setIsRedepositLoading(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
        setRedepositDialog(false)
      }
    },
    [nativeChainId, account]
  )
  const redeposit = useCallback(async () => {
    const currency = redepositCurrency
    try {
      if (isDataLoading) {
        return
      }
      const isOk = preHandleAction()
      if (!isOk) {
        setIsRedepositLoading(false)
        return
      }

      if (!walletClient) {
        throw new Error('walletClient not Ready')
      }
      if (isRedepositLoading || isApproveLoading) {
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
      setIsRedepositLoading(true)
      const endTime = token.END_TIME
      if (!endTime) {
        throw new Error('endTime wrong')
      }
      const times = new BigNumberJs(endTime).plus(60 * 60 * 24 * 7).toFixed()
      console.log({ erc20Address, week, endTime, times })

      const res = await contract.write.redeposit([erc20Address, times], {
        account: account
      })
      const hash = typeof res === 'string' ? res : res.hash
      const redepositTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
      if (redepositTx && redepositTx.status === txStatus) {
        setIsRedepositLoading(false)
        await _successGet({
          tx: redepositTx,
          blockNumber: new BigNumberJs(redepositTx.blockNumber.toString()).toNumber()
        })
        setSuccessToast({ title: '', message: 'Redeposit successful' })
      } else {
        throw Object.assign(new Error('Redeposit Transaction Failed'), { name: 'Redeposit' })
      }
    } catch (e) {
      setIsApproveLoading(false)
      setIsRedepositLoading(false)
      setErrorToast(e)
      console.error('RedepositHandle: ', e)
    }
  }, [
    isW768,
    isDataLoading,
    isApproveLoading,
    isRedepositLoading,
    redepositCurrency,
    redepositValue,
    walletClient,
    account,
    nativeChainId,
    preHandleAction,
    week
  ])
  useEffect(() => {
    if (
      canNext(account, nativeChainId) &&
      redepositCurrency &&
      redepositCurrency !== '' &&
      tvlStakingData[nativeChainId] &&
      tvlStakingData[nativeChainId][redepositCurrency] &&
      tvlStakingData[nativeChainId][redepositCurrency].balance !== ''
    ) {
      setMax(new BigNumberJs(tvlStakingData[nativeChainId][redepositCurrency].balance).dividedBy(divisorBigNumber).toFixed())
      return
    }
    setMax('0')
    return
  }, [redepositCurrency, nativeChainId, JSON.stringify(tvlStakingData)])
  // const redepositInputHandle = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const inputValue = e.target.value
  //     const regex = /^\d*\.?\d{0,8}$/
  //     if (regex.test(inputValue)) {
  //       // if (new BigNumberJs(inputValue).lte(max)) {
  //       setRedepositValue(inputValue)
  //       // } else {
  //       //   setRedepositValue(max)
  //       // }
  //     }
  //   },
  //   [max]
  // )
  const maxHandle = useCallback(() => {
    const isOk = preHandleAction()
    if (isOk) {
      setRedepositValue(max)
    }
  }, [max, preHandleAction])
  const changeRedepositCurrencyHandle = useCallback(() => {
    setIsSelectTokenDialogModalOpen(true)
  }, [])

  return {
    selectLen,
    isDataLoading,
    redeposit,
    // redepositValue,
    redepositCurrency,
    // redepositInputHandle,
    changeRedepositCurrencyHandle,
    tvlStakingData,
    chainId: nativeChainId,
    account: account,
    maxHandle: maxHandle,
    isRedepositLoading: isRedepositLoading,
    isApproveLoading: isApproveLoading,
    week: week,
    handleWeekChange: handleWeekChange
  }
}
