import { AddressZero } from '@ethersproject/constants'
import {
  activeTokenList,
  ChainId,
  Currency,
  divisorBigNumber,
  erc721Contract,
  refreshBalanceState,
  timeoutPromise,
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
import { useCallback, useEffect, useState } from 'react'
import { TransactionReceipt } from 'viem'

import { TVLStakingContract } from '@/contract/tvlStaking'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import { isTvlDataLoadingState, ITVLStakingData, selectTokenDialogState, tvlStakingDataState, withdrawCurrencyState } from '../state/activeState'
import { canNext, usePreHandleAction } from './activeHooks'
import { useActiveData } from './useActiveData'
import { useStake, useStakeData } from './useStakeData'
import { useTvlStakingDialogState } from './useTvlStakingDialogState'

export const useWithdrawHandle = (): {
  isWithdrawLoading: boolean
  account: `0x${string}` | undefined
  maxHandle: () => void
  chainId: ChainId
  isDataLoading: boolean
  withdraw: (totalStakedNumber: string) => Promise<void>
  withdrawValue: string
  withdrawCurrency: string | undefined
  withdrawInputHandle: (e: React.ChangeEvent<HTMLInputElement>) => void
  isApproveLoading: boolean
  changeWithdrawCurrencyHandle: () => void
  tvlStakingData: Record<ChainId, Record<string, ITVLStakingData>>
} => {
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)
  const [withdrawValue, setWithdrawValue] = useState('')
  const setIsSelectTokenDialogModalOpen = useSetRecoilState(selectTokenDialogState)
  const [withdrawCurrency, setWithdrawCurrency] = useRecoilState(withdrawCurrencyState)
  const [max, setMax] = useState('0')
  const { activeData } = useActiveData()
  const { account, chainId: nativeChainId } = useActiveWeb3React()
  const { getStakingData } = useStakeData()
  const isDataLoading = useRecoilValue(isTvlDataLoadingState)
  const tvlStakingData = useRecoilValue(tvlStakingDataState)
  const { walletClient } = useAaWallet()
  const { postAccountUpdate } = useAccountInvitation(env)
  const isW768 = useIsW768()
  // const { isRegistered } = tvlStakingData
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const setIsStakingOpenHandle = useTvlStakingDialogState()
  const preHandleAction = usePreHandleAction()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  useStake()
  useEffect(() => {
    setIsApproveLoading(false)
    setIsWithdrawLoading(false)
    setWithdrawValue('')
    if (!withdrawCurrency) {
      setWithdrawCurrency('W' + Currency[nativeChainId])
    }
  }, [account, nativeChainId])

  const _successGet = useCallback(
    async ({ tx }: { tx: TransactionReceipt; blockNumber: number }) => {
      if (nativeChainId && account) {
        getStakingData()
        setIsApproveLoading(false)
        setIsWithdrawLoading(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
        setIsStakingOpenHandle({
          key: 'tvlWithdrawDialogState',
          chainId: nativeChainId,
          isOpen: false
        })
      }
    },
    [nativeChainId, account]
  )
  const withdraw = useCallback(async () => {
    const currency = withdrawCurrency
    const amount = withdrawValue
    try {
      if (isDataLoading) {
        return
      }
      const isOk = preHandleAction()
      if (!isOk) {
        setIsWithdrawLoading(false)
        return
      }
      if (!amount || !currency) {
        throw new Error('Amount or Currency not Ready')
      }
      if (new BigNumberJs(amount).toFixed() === '0') {
        throw new Error('Amount is not enough')
      }

      if (!walletClient) {
        throw new Error('walletClient not Ready')
      }
      if (isWithdrawLoading || isApproveLoading) {
        return
      }
      const _nativeChainId = nativeChainId

      const token = tvlStakingData[_nativeChainId][currency]
      const erc721Address = activeTokenList[_nativeChainId].Soulbound
      const decimal = token.decimal

      const tokenAmount = new BigNumberJs(amount).times(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed()
      if (erc721Address !== AddressZero) {
        const _erc721Contract = erc721Contract(_nativeChainId, env, erc721Address, walletClient)
        // owner operator
        const allowance = await _erc721Contract.read.isApprovedForAll([account, activeTokenList[_nativeChainId].Staking])
        // 用户的余额低于这个值，就需要把 sbt 授权给合约
        const hasSbt = !!(token.sbtId && token.sbtId !== '0')
        if (hasSbt) {
          const burnMaximum = activeData.burnMaximum
          console.log({ tokenAmount, burnMaximum })
          if (!allowance && new BigNumberJs(token.withdrawAmount).minus(tokenAmount).lt(burnMaximum)) {
            setIsApproveLoading(true)
            const approveTxn = await _erc721Contract.write.setApprovalForAll([activeTokenList[_nativeChainId].Staking, true], {
              account: account
            })
            const approveTxnHash = typeof approveTxn === 'string' ? approveTxn : approveTxn.hash
            // await waitForTransaction({ confirmations: 2, hash: approveTxnHash })
            // setIsApproveLoading(false)
            // setSuccessToast({ title: '', message: 'Approve successful' })
            // 添加超时处理
            Promise.race([waitForTransaction({ confirmations: 3, hash: approveTxnHash }), timeoutPromise(30000)])
              .then(result => {
                setIsApproveLoading(false)
                if ((result instanceof BigNumberJs && result.gte(tokenAmount)) || !(result instanceof BigNumberJs)) {
                  setSuccessToast({ title: '', message: 'Approve successful' })
                } else {
                  setErrorToast({ title: '', message: 'Approve Error!' })
                }
              })
              .catch(e => {
                setIsApproveLoading(false)
                setErrorToast({ title: '', message: 'Approve Error!' })
              })
            getStakingData()
            return
          }
        }
      }
      setIsWithdrawLoading(true)

      const params = [token.address, tokenAmount]
      const contract = TVLStakingContract({ chainId: _nativeChainId, env, signer: walletClient })

      if (!contract) {
        setErrorToast('TVLStakingContract is not ready')
        return
      }
      const fn = contract.write.withdraw(params, {
        account: account
      })
      const res = await fn
      const hash = typeof res === 'string' ? res : res.hash
      const withdrawTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
      if (withdrawTx && withdrawTx.status === txStatus) {
        setIsWithdrawLoading(false)
        await _successGet({
          tx: withdrawTx,
          blockNumber: new BigNumberJs(withdrawTx.blockNumber.toString()).toNumber()
        })
        setSuccessToast({ title: '', message: 'Withdraw successful' })
      } else {
        throw Object.assign(new Error('Withdraw Transaction Failed'), { name: 'Withdraw' })
      }
    } catch (e) {
      setIsApproveLoading(false)
      setIsWithdrawLoading(false)
      setErrorToast(e)
      console.error('WithdrawHandle: ', e)
    }
  }, [
    isW768,
    isDataLoading,
    isApproveLoading,
    isWithdrawLoading,
    withdrawCurrency,
    withdrawValue,
    walletClient,
    account,
    nativeChainId,
    preHandleAction
  ])
  useEffect(() => {
    if (
      canNext(account, nativeChainId) &&
      withdrawCurrency &&
      withdrawCurrency !== '' &&
      tvlStakingData[nativeChainId] &&
      tvlStakingData[nativeChainId][withdrawCurrency] &&
      tvlStakingData[nativeChainId][withdrawCurrency].withdrawAmount !== ''
    ) {
      setMax(new BigNumberJs(tvlStakingData[nativeChainId][withdrawCurrency].withdrawAmount).dividedBy(divisorBigNumber).toFixed())
      return
    }
    setMax('0')
    return
  }, [withdrawCurrency, nativeChainId, JSON.stringify(tvlStakingData)])
  const withdrawInputHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const regex = /^\d*\.?\d{0,8}$/
      if (regex.test(inputValue)) {
        setWithdrawValue(inputValue)
      }
    },
    [max]
  )
  const maxHandle = useCallback(() => {
    const isOk = preHandleAction()
    if (isOk) {
      setWithdrawValue(max)
    }
  }, [max, preHandleAction])
  const changeWithdrawCurrencyHandle = useCallback(() => {
    setIsSelectTokenDialogModalOpen(true)
  }, [])

  return {
    isDataLoading,
    withdraw,
    withdrawValue,
    withdrawCurrency,
    withdrawInputHandle,
    changeWithdrawCurrencyHandle,
    tvlStakingData,
    chainId: nativeChainId,
    account: account,
    maxHandle: maxHandle,
    isWithdrawLoading: isWithdrawLoading,
    isApproveLoading: isApproveLoading
  }
}
