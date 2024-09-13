import {
  activeTokenList,
  ChainId,
  Currency,
  divisorBigNumber,
  erc20Contract,
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
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionReceipt, zeroAddress } from 'viem'

import { TVLStakingContract } from '@/contract/tvlStaking'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import {
  isTvlDataLoadingState,
  ITVLStakingData,
  redepositCurrencyState,
  selectTokenDialogState,
  tvlRedepositDialogState,
  tvlStakingDataState
} from '../state/activeState'
import { canNext, usePreHandleAction } from './activeHooks'
import { useStake, useStakeData } from './useStakeData'
export const useRedeposit = (): {
  week: number
  handleWeekChange: any
  selectLen: number[]
  isRedepositLoading: boolean
  account: `0x${string}` | undefined
  maxHandle: () => void
  chainId: ChainId
  isDataLoading: boolean
  redeposit: (hasLock: boolean) => Promise<void>
  redepositValue: string
  redepositCurrency: string | undefined
  redepositInputHandle: (e: React.ChangeEvent<HTMLInputElement>) => void
  isApproveLoading: boolean
  isExtendLoading: boolean
  changeRedepositCurrencyHandle: () => void
  tvlStakingData: Record<ChainId, Record<string, ITVLStakingData>>
} => {
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isExtendLoading, setIsExtendLoading] = useState(false)
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
    setIsExtendLoading(false)
    setRedepositValue('')
    if (!redepositCurrency) {
      setRedepositCurrency(Currency[nativeChainId])
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
        setIsExtendLoading(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
        setRedepositDialog(false)
      }
    },
    [nativeChainId, account]
  )
  const redeposit = useCallback(
    async (hasLock: boolean) => {
      const currency = redepositCurrency
      try {
        if (isDataLoading) {
          return
        }
        const isOk = preHandleAction()
        if (!isOk) {
          setIsRedepositLoading(false)
          setIsExtendLoading(false)
          setIsApproveLoading(false)
          return
        }

        if (!walletClient) {
          throw new Error('walletClient not Ready')
        }
        if (isRedepositLoading || isExtendLoading || isApproveLoading) {
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
        const erc20Address = token.address
        const decimal = token.decimal

        const tokenAmount = new BigNumberJs(redepositValue).times(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed()

        if (erc20Address !== zeroAddress) {
          const _erc20Contract = erc20Contract(nativeChainId, env, erc20Address, walletClient)
          const allowance = await _erc20Contract.read.allowance([account, activeTokenList[_nativeChainId].Staking])
          const balance = await _erc20Contract.read.balanceOf([account])
          if (new BigNumberJs(balance.toString()).gte(tokenAmount)) {
            if (new BigNumberJs(allowance.toString()).lt(tokenAmount)) {
              setIsApproveLoading(true)
              const approveTxn = await _erc20Contract.write.approve([activeTokenList[_nativeChainId].Staking, tokenAmount], {
                account: account
              })
              const approveTxnHash = typeof approveTxn === 'string' ? approveTxn : approveTxn.hash
              // 添加超时处理
              Promise.race([waitForTransaction({ confirmations: 3, hash: approveTxnHash }), timeoutPromise()])
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
            }
          }
        }

        if (!hasLock) {
          const endTime = token.END_TIME
          if (!endTime) {
            throw new Error('endTime wrong')
          }
          setIsExtendLoading(true)
          const times = new BigNumberJs(endTime).plus(60 * 60 * 24 * 7).toFixed()
          await contract.write.redeposit([erc20Address, times], {
            account: account
          })
          setIsExtendLoading(false)
          getStakingData()
        }
        setIsRedepositLoading(true)
        // let nativeAmount = '0'
        // if (currency === Currency[_nativeChainId]) {
        //   nativeAmount = tokenAmount
        // }
        // const res = await contract.write.increment([erc20Address, tokenAmount], {
        //   account: account,
        //   value: nativeAmount
        // })
        let funName = ''
        let nativeAmount = '0'
        let params
        let fn
        if (currency === Currency[_nativeChainId]) {
          funName = 'incrementETH'
          nativeAmount = tokenAmount
          fn = contract.write[funName]({
            value: nativeAmount,
            account: account
          })
        } else {
          funName = 'increment'
          params = [erc20Address, tokenAmount]
          fn = contract.write[funName](params, {
            value: nativeAmount,
            account: account
          })
        }
        const res = await fn

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
    },
    [
      isW768,
      isDataLoading,
      isApproveLoading,
      isRedepositLoading,
      isExtendLoading,
      redepositCurrency,
      redepositValue,
      walletClient,
      account,
      nativeChainId,
      preHandleAction,
      week
    ]
  )
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
  const redepositInputHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const regex = /^\d*\.?\d{0,8}$/
      if (regex.test(inputValue)) {
        // if (new BigNumberJs(inputValue).lte(max)) {
        setRedepositValue(inputValue)
        // } else {
        //   setRedepositValue(max)
        // }
      }
    },
    [max]
  )
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
    redepositValue,
    redepositCurrency,
    redepositInputHandle,
    changeRedepositCurrencyHandle,
    tvlStakingData,
    chainId: nativeChainId,
    account: account,
    maxHandle: maxHandle,
    isRedepositLoading: isRedepositLoading,
    isApproveLoading: isApproveLoading,
    isExtendLoading: isExtendLoading,
    week: week,
    handleWeekChange: handleWeekChange
  }
}
