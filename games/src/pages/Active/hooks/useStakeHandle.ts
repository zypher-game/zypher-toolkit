import { AddressZero } from '@ethersproject/constants'
import {
  activeTokenList,
  ChainId,
  crLink,
  Currency,
  divisorBigNumber,
  erc20Contract,
  NavKey,
  refreshBalanceState,
  sleep,
  TVLChainId,
  tvlTokenAddress,
  txStatus,
  useAccountInvitation,
  useActiveWeb3React,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useSwitchNetwork,
  useWalletClient
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionReceipt } from 'viem'

import { GlobalVar } from '@ui/src'
import { TVLStakingContract } from '@/contract/tvlStaking'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import {
  depositCurrencyState,
  isTvlDataLoadingState,
  ITVLStakingData,
  selectTokenDialogState,
  tvlStakingDataState,
  tvlStakingDialogState
} from '../state/activeState'
import { canNext, usePreHandleAction } from './activeHooks'
import { useActiveData } from './useActiveData'
import { useGetData } from './useActiveInit'
import { useChainIndex } from './useChainIndex'
import { useStake, useStakeData } from './useStakeData'
import { useTvlStakingDialogState } from './useTvlStakingDialogState'

export const useStakeHandle = (): {
  isDepositLoading: boolean
  account: `0x${string}` | undefined
  maxHandle: () => void
  chainId: ChainId
  isDataLoading: boolean
  deposit: () => Promise<void>
  depositValue: string
  depositCurrency: string | undefined
  depositInputHandle: (e: React.ChangeEvent<HTMLInputElement>) => void
  isApproveLoading: boolean
  changeDepositCurrencyHandle: () => void
  tvlStakingData: Record<ChainId, Record<string, ITVLStakingData>>
} => {
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isDepositLoading, setIsDepositLoading] = useState(false)
  const [depositValue, setDepositValue] = useState('')
  const setIsSelectTokenDialogModalOpen = useSetRecoilState(selectTokenDialogState)
  const [depositCurrency, setDepositCurrency] = useRecoilState(depositCurrencyState)
  const [max, setMax] = useState('0')
  const { account, chainId: nativeChainId } = useActiveWeb3React()
  const { getStakingData } = useStakeData()
  const isDataLoading = useRecoilValue(isTvlDataLoadingState)
  const tvlStakingData = useRecoilValue(tvlStakingDataState)
  const { data: walletClient } = useWalletClient()
  const { postAccountUpdate } = useAccountInvitation(env)
  const isW768 = useIsW768()
  // const { isRegistered } = tvlStakingData
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const tvlStakingDialog = useRecoilValue(tvlStakingDialogState)
  const setTvlStakingDialog = useTvlStakingDialogState()
  const preHandleAction = usePreHandleAction()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)

  useStake()
  useEffect(() => {
    setIsApproveLoading(false)
    setIsDepositLoading(false)
    setDepositValue('')
    if (!depositCurrency) {
      setDepositCurrency(Currency[nativeChainId])
    }
  }, [account, nativeChainId])

  const _successGet = useCallback(
    async ({ tx }: { tx: TransactionReceipt; blockNumber: number }) => {
      if (nativeChainId && account) {
        getStakingData()
        setIsApproveLoading(false)
        setIsDepositLoading(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
        if (tvlStakingDialog) {
          setTvlStakingDialog(nativeChainId, false)
        }
      }
    },
    [nativeChainId, tvlStakingDialog, account]
  )
  const deposit = useCallback(async () => {
    const currency = depositCurrency
    const amount = depositValue
    try {
      if (isDataLoading) {
        return
      }
      const isOk = preHandleAction()
      if (!isOk) {
        setIsDepositLoading(false)
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
      if (isDepositLoading || isApproveLoading) {
        return
      }
      const _nativeChainId = nativeChainId
      const contract = TVLStakingContract({ chainId: _nativeChainId, env, signer: walletClient })

      if (!contract) {
        setErrorToast('dpContract is not ready')
        return
      }

      const erc20Address = tvlStakingData[_nativeChainId][currency].address
      const decimal = tvlStakingData[_nativeChainId][currency].decimal
      const tokenAmount = new BigNumberJs(amount).times(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed()
      if (erc20Address !== AddressZero) {
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
            // await waitForTransaction({ confirmations: 2, hash: approveTxnHash })
            // setIsApproveLoading(false)
            // setSuccessToast({ title: '', message: 'Approve successful' })
            // 添加超时处理
            const timeoutPromise = new Promise((resolve, reject) =>
              setTimeout(async () => {
                const allow = await _erc20Contract.read.allowance([account, activeTokenList[_nativeChainId].Staking])
                resolve(new BigNumberJs(allow.toString()))
              }, 4000)
            )

            Promise.race([waitForTransaction({ confirmations: 3, hash: approveTxnHash }), timeoutPromise])
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
            if (isW768) {
              getStakingData()
              return
            }
          }
        }
      }
      setIsDepositLoading(true)
      let funName = ''
      let nativeAmount = '0'
      let params
      let fn
      if (currency === Currency[_nativeChainId]) {
        funName = 'depositETH'
        nativeAmount = tokenAmount
        fn = contract.write[funName]({
          value: nativeAmount,
          account: account
        })
      } else {
        funName = 'deposit'
        params = [erc20Address, tokenAmount]
        fn = contract.write[funName](params, {
          value: nativeAmount,
          account: account
        })
      }
      const res = await fn
      const hash = typeof res === 'string' ? res : res.hash
      const depositTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
      if (depositTx && depositTx.status === txStatus) {
        setIsDepositLoading(false)
        await _successGet({
          tx: depositTx,
          blockNumber: new BigNumberJs(depositTx.blockNumber.toString()).toNumber()
        })
        setSuccessToast({ title: '', message: 'Staked successful' })
      } else {
        throw Object.assign(new Error('Staked Transaction Failed'), { name: 'Staked' })
      }
    } catch (e) {
      setIsApproveLoading(false)
      setIsDepositLoading(false)
      setErrorToast(e)
      console.error('StakedHandle: ', e)
    }
  }, [
    isW768,
    isDataLoading,
    isApproveLoading,
    isDepositLoading,
    depositCurrency,
    depositValue,
    walletClient,
    account,
    nativeChainId,
    preHandleAction
  ])
  useEffect(() => {
    if (
      canNext(account, nativeChainId) &&
      depositCurrency &&
      depositCurrency !== '' &&
      tvlStakingData[nativeChainId] &&
      tvlStakingData[nativeChainId][depositCurrency] &&
      tvlStakingData[nativeChainId][depositCurrency].balance !== ''
    ) {
      setMax(new BigNumberJs(tvlStakingData[nativeChainId][depositCurrency].balance).dividedBy(divisorBigNumber).toFixed())
      return
    }
    setMax('0')
    return
  }, [depositCurrency, nativeChainId, JSON.stringify(tvlStakingData)])
  const depositInputHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const regex = /^\d*\.?\d{0,8}$/
      if (regex.test(inputValue)) {
        // if (new BigNumberJs(inputValue).lte(max)) {
        setDepositValue(inputValue)
        // } else {
        //   setDepositValue(max)
        // }
      }
    },
    [max]
  )
  const maxHandle = useCallback(() => {
    const isOk = preHandleAction()
    if (isOk) {
      setDepositValue(max)
    }
  }, [max, preHandleAction])
  const changeDepositCurrencyHandle = useCallback(() => {
    setIsSelectTokenDialogModalOpen(true)
  }, [])

  return {
    isDataLoading,
    deposit,
    depositValue,
    depositCurrency,
    depositInputHandle,
    changeDepositCurrencyHandle,
    tvlStakingData,
    chainId: nativeChainId,
    account: account,
    maxHandle: maxHandle,
    isDepositLoading: isDepositLoading,
    isApproveLoading: isApproveLoading
  }
}

export const useReStakingHandle = () => {
  const { switchNetwork } = useSwitchNetwork()
  const preHandleAction = usePreHandleAction()
  const setTvlStakingDialog = useTvlStakingDialogState()

  const [claimSBTLoading, setClaimSBTLoading] = useState(false)
  const [claimCrLoading, setClaimCrLoading] = useState(false)
  const [claimGpLoading, setClaimGpLoading] = useState(false)
  const { data: walletClient } = useWalletClient()

  const { getData } = useGetData()
  const { account, chainId: nativeChainId } = useActiveWeb3React()
  const { activeData } = useActiveData()
  const { crHeroBoxAmount, dollarGpRewords } = activeData
  const { getStakingData } = useStakeData()
  const { postAccountUpdate } = useAccountInvitation(env)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)

  const navigate = useNavigate()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)

  const _successGet = useCallback(
    async ({ tx, successText }: { tx: TransactionReceipt; blockNumber: number; successText: string }) => {
      if (nativeChainId && account) {
        await sleep(1)
        await getData()
        await getStakingData()
        setClaimSBTLoading(false)
        setClaimCrLoading(false)
        setClaimGpLoading(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
        setSuccessToast({ title: '', message: successText })
      }
    },
    [nativeChainId, getStakingData, account]
  )
  const _pre = useCallback(
    ({ loading, setLoading, amount }: { loading: boolean; setLoading: (value: React.SetStateAction<boolean>) => void; amount: string }): boolean => {
      const isOk = preHandleAction()
      if (!isOk) {
        setLoading(false)
        return false
      }
      if (loading) {
        return false
      }
      if (!amount || amount === '' || Number(amount) === 0) {
        return false
      }

      if (!walletClient) {
        throw new Error('walletClient not Ready')
      }
      return true
    },
    [preHandleAction, walletClient]
  )
  const onClaimGPHandle = useCallback(
    async (chainId: string) => {
      try {
        const isOk = _pre({ loading: claimGpLoading, setLoading: setClaimGpLoading, amount: dollarGpRewords })
        if (!isOk) {
          return
        }
        if (chainId !== nativeChainId && switchNetwork) {
          switchNetwork(parseInt(chainId, 10))
          return
        }
        const contract = TVLStakingContract({ chainId: nativeChainId, env, signer: walletClient! })
        if (!contract) {
          setErrorToast('StakingContract is not ready')
          return
        }
        setClaimGpLoading(true)
        const addressList = Object.values(tvlTokenAddress[nativeChainId])
        const res = await contract.write.claim([addressList])
        const hash = typeof res === 'string' ? res : res.hash
        const depositTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (depositTx && depositTx.status === txStatus) {
          setClaimGpLoading(false)
          _successGet({
            tx: depositTx,
            blockNumber: new BigNumberJs(depositTx.blockNumber.toString()).toNumber(),
            successText: 'Claim $GP  successful'
          })
        } else {
          throw Object.assign(new Error('Claim $GP Transaction Failed'), { name: 'Buy' })
        }
      } catch (e) {
        setClaimGpLoading(false)
        setErrorToast(e)
        console.error('Claim $GP Handle: ', e)
      }
    },
    [dollarGpRewords, _pre]
  )

  const onOpenCrHeroHandle = useCallback(async () => {
    window.open(crLink + '/airdrop', '_blank')
  }, [])

  const onClaimSBTHandle = useCallback(
    async (chainId: ChainId, hasSbt: boolean) => {
      if (hasSbt) {
        navigate(`/${NavKey[2][0]}`)
      } else {
        setTvlStakingDialog(chainId, true)
      }
    },
    [crHeroBoxAmount, _pre]
  )

  return {
    claimGpLoading,
    onClaimGPHandle,

    claimSBTLoading,
    onClaimSBTHandle,

    claimCrLoading,
    onOpenCrHeroHandle
  }
}

export const useTable = () => {
  const { chainIdLocal } = useChainIndex()
  const tvlStakingData = useRecoilValue<Record<TVLChainId | ChainId, Record<string, ITVLStakingData>>>(tvlStakingDataState)
  const { native, erc20 } = useMemo(() => {
    const obj: Record<string, ITVLStakingData[]> = {
      native: [],
      erc20: []
    }
    const o = tvlStakingData[chainIdLocal]
    if (o) {
      const all = Object.keys(o)
      const w_native = 'W' + Currency[chainIdLocal]
      const WETHIndex = all.indexOf(w_native)
      let ETHIndex = all.indexOf(Currency[chainIdLocal])
      if (WETHIndex !== -1 && ETHIndex !== -1) {
        all.splice(WETHIndex, 1)
        if (ETHIndex > WETHIndex) {
          ETHIndex--
        }
        all.splice(ETHIndex, 1)
      }
      obj.native = [o[w_native]]
      obj.erc20 = all.map(v => o[v])
    }
    return obj
  }, [chainIdLocal, JSON.stringify(tvlStakingData)])
  return {
    native,
    erc20
  }
}
