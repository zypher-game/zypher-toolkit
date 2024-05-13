import { AddressZero } from '@ethersproject/constants'
import {
  ChainId,
  Currency,
  divisorBigNumber,
  erc20Abi,
  erc20Contract,
  refreshBalanceState,
  request,
  txStatus,
  useAccountInvitation,
  useActiveWeb3React,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useSetRecoilState,
  useWalletClient
} from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { TransactionReceipt } from 'viem'
import { Address } from 'wagmi'

import { GlobalVar } from '@/constants/constants'
import { TVLStakingABI, TVLStakingContract } from '@/contract/tvlStaking'
import { usePreHandleGlobal } from '@/hooks/usePreHandleGlobal'
import { batchRequestMulticall, batchRequestNativeContracts } from '@/utils/batchRequestContracts'
import BigNumberJs from '@/utils/BigNumberJs'
import { calculateSumByNumber } from '@/utils/calculateSum'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import { getWeb3Sign } from '@/utils/getSign'

import { CODELENGTH, getLinkPre, TVL_API, TVLChainId, TVLStakingSupportedChainId, tvlTokenAddress, tvlTokens } from '../constants/activeConstants'
import {
  activeDataState,
  depositCurrencyState,
  IActiveData,
  IActiveDataState,
  initData,
  ITVLStakingData,
  selectTokenDialogState,
  tvlStakingDataState
} from '../state/activeState'
import { useActiveData } from './useActiveData'
export const preAirdropPathname = 'airdrop'
export const airdropPathname = {
  register: 'register',
  getAirdrop: 'getAirdrop',
  staking: 'staking',
  chooseHunter: 'chooseHunter',
  tvl: ''
}

export const TVLTabList = [
  {
    path: 'team',
    label: 'Team'
  },
  {
    path: 'restaking',
    label: 'Restaking'
  },
  {
    path: 'leaderboard',
    label: 'Leaderboard'
  }
]
export const tvlPath = TVLTabList.map(v => `/${preAirdropPathname}/${airdropPathname.tvl}${v.path}`)

export const getAirdropPathname = {
  MoreActiveNormal: 'MoreActiveNormal',
  MoreActive: 'MoreActive',
  MoreActiveSuccess: 'MoreActiveSuccess',
  NormalActive: 'NormalActive',
  NoActive: 'NoActive'
}

export const canNext = (account?: Address, chainId?: ChainId): boolean => {
  if (account && chainId && TVLStakingSupportedChainId.includes(chainId)) {
    return true
  }
  return false
}

export const usePreHandleAction = () => {
  const _preHandleAction = usePreHandleGlobal()
  const preHandleAction = useCallback(
    (chainId?: ChainId) => {
      return _preHandleAction(env, (chainId ? [chainId] : TVLStakingSupportedChainId) as unknown as ChainId[])
    },
    [_preHandleAction]
  )
  return preHandleAction
}

export const useSign = () => {
  const { chainId } = useActiveWeb3React()
  const { activeData, setActiveData } = useActiveData()
  const { accountAddress, invitationCode, signedStr, id, isInitLoading } = activeData
  console.log({ activeData })
  const getSignCall = useCallback(async () => {
    if (accountAddress !== AddressZero && invitationCode && !id && !isInitLoading) {
      try {
        const hashedCardBytes = ethers.utils.hexConcat([accountAddress])
        const _signedStr = await getWeb3Sign(hashedCardBytes, accountAddress, false)
        if (typeof _signedStr === 'string') {
          setActiveData(pre => ({ ...pre, signedStr: _signedStr }))
        } else {
          setActiveData(pre => ({ ...pre, invitationCode: '', signedFalse: true }))
        }
      } catch (err) {
        setErrorToast(GlobalVar.dispatch, err)
        setActiveData(pre => ({ ...pre, invitationCode: '', signedFalse: true }))
      }
    }
  }, [accountAddress, isInitLoading, invitationCode, id])

  const getLoginCall = useCallback(async () => {
    if (signedStr && signedStr !== '0000' && !id && chainId) {
      try {
        const link_type = getLinkPre(chainId)
        const res = await request(`${TVL_API}/api/loginByCode`, {
          method: 'POST',
          data: JSON.stringify({
            code: invitationCode.substring(1),
            address: accountAddress,
            signature: signedStr,
            link_type: link_type.key
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.data && res.data['message'] == 'ok') {
        } else {
          setActiveData(pre => ({ ...pre, signedStr: '', invitationCode: '' }))
          setErrorToast(GlobalVar.dispatch, 'loginByCode Error')
        }
      } catch (e: any) {
        setActiveData(pre => ({ ...pre, signedStr: '', invitationCode: '' }))
        setErrorToast(GlobalVar.dispatch, e)
      }
    }
  }, [signedStr, chainId, id])
  useEffect(() => {
    getLoginCall()
  }, [signedStr])
  useEffect(() => {
    if (!signedStr && invitationCode && invitationCode.length === CODELENGTH) {
      getSignCall()
    }
  }, [getSignCall])
}

export const useStake = () => {
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isDepositLoading, setIsDepositLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [depositValue, setDepositValue] = useState('0')
  const setIsSelectTokenDialogModalOpen = useSetRecoilState(selectTokenDialogState)
  const [depositCurrency, setDepositCurrency] = useRecoilState(depositCurrencyState)
  const [max, setMax] = useState('0')

  const { account, chainId: nativeChainId } = useActiveWeb3React()
  const { data: walletClient } = useWalletClient()
  const { postAccountUpdate } = useAccountInvitation(env)

  const [tvlStakingData, setTvlStakingData] = useRecoilState(tvlStakingDataState)
  // const { isRegistered } = tvlStakingData
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const preHandleAction = usePreHandleAction()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { setActiveData } = useActiveData()
  const getNative = useCallback(async (): Promise<string[][]> => {
    const value = await batchRequestNativeContracts({
      chainIdList: TVLStakingSupportedChainId as unknown as ChainId[],
      address: account,
      nativeMethod: 'getBalance',
      defaultValue: new BigNumberJs('0')
    })
    return value.map(v => {
      if (v.response) {
        return [v.response.toString(), new BigNumberJs(v.response.toString()).dividedBy(divisorBigNumber).toFormat(3)] as string[]
      }
      return ['0', '0']
    })
  }, [account, nativeChainId])
  const getStake = useCallback(async () => {
    if (account && nativeChainId) {
      setIsDataLoading(true)
      // 获取token decimal、 approve 、 余额、stake值、  claim 量
      const nativeValue: string[][] = await getNative()

      const params = Object.fromEntries(
        TVLStakingSupportedChainId.map(chainId => {
          return [
            chainId,
            [
              ...Object.values(tvlTokens[chainId])
                .filter((v: any) => v.address !== AddressZero)
                .map((v: any) => {
                  return {
                    reference: 'allowance' + v.symbol,
                    contractAddress: v.address,
                    abi: erc20Abi,
                    calls: [
                      { methodName: 'allowance', reference: 'allowance' + v.symbol, methodParameters: [account, tvlTokenAddress[chainId].Restaking] }
                    ]
                  }
                }),
              ...Object.values(tvlTokens[chainId])
                .filter((v: any) => v.address !== AddressZero)
                .map((v: any) => {
                  return {
                    reference: 'symbol' + v.symbol,
                    contractAddress: v.address,
                    abi: erc20Abi,
                    calls: [{ methodName: 'symbol', reference: 'symbol' + v.symbol }]
                  }
                }),
              ...Object.values(tvlTokens[chainId])
                .filter((v: any) => v.address !== AddressZero)
                .map((v: any) => {
                  return {
                    reference: 'name' + v.symbol,
                    contractAddress: v.address,
                    abi: erc20Abi,
                    calls: [{ methodName: 'name', reference: 'name' + v.symbol }]
                  }
                }),
              ...Object.values(tvlTokens[chainId])
                .filter((v: any) => v.address !== AddressZero)
                .map((v: any) => {
                  return {
                    reference: 'decimal' + v.symbol,
                    contractAddress: v.address,
                    abi: erc20Abi,
                    calls: [{ methodName: 'decimals', reference: 'decimal' + v.symbol }]
                  }
                }),
              ...Object.values(tvlTokens[chainId])
                .filter((v: any) => v.address !== AddressZero)
                .map((v: any) => {
                  return {
                    reference: 'balanceOf' + v.symbol,
                    contractAddress: v.address,
                    abi: erc20Abi,
                    calls: [{ methodName: 'balanceOf', reference: 'balanceOf' + v.symbol, methodParameters: [account] }]
                  }
                }),

              {
                reference: 'END_TIME' + chainId, // 得到当前是第几周
                contractAddress: tvlTokenAddress[chainId].Restaking,
                abi: TVLStakingABI,
                calls: [
                  {
                    methodName: 'END_TIME',
                    reference: 'END_TIME' + chainId
                  }
                ]
              },
              {
                reference: 'claimable' + chainId, // 得到当前是第几周
                contractAddress: tvlTokenAddress[chainId].Restaking,
                abi: TVLStakingABI,
                calls: [
                  {
                    methodName: 'claimable',
                    reference: 'claimable' + chainId,
                    methodParameters: [account, Object.values(tvlTokens[chainId]).map((v: any) => v.address)]
                  }
                ]
              },
              {
                reference: 'getWeek' + chainId, // 得到当前是第几周
                contractAddress: tvlTokenAddress[chainId].Restaking,
                abi: TVLStakingABI,
                calls: [{ methodName: 'getWeek', reference: 'getWeek' + chainId }]
              }
            ]
          ]
        })
      )
      const res = await batchRequestMulticall({
        chainIdList: TVLStakingSupportedChainId as unknown as ChainId[],
        params
      })
      console.log({ res, params })
      const week = Object.fromEntries(res.map(v => [v.chainId, new BigNumberJs(v.response[v.response.length - 1][0].hex).toNumber()]))
      const nextParams = Object.fromEntries(
        TVLStakingSupportedChainId.map(chainId => {
          return [
            chainId,
            [
              ...Object.values(tvlTokens[chainId]).map((v: any) => {
                return {
                  reference: 'getWeeklyWeight' + v.symbol,
                  contractAddress: tvlTokenAddress[chainId].Restaking,
                  abi: TVLStakingABI,
                  calls: [
                    {
                      methodName: 'getWeeklyWeight',
                      reference: 'getWeeklyWeight' + v.symbol,
                      methodParameters: [account, v.address, week[chainId]]
                    }
                  ]
                }
              })
            ]
          ]
        })
      )
      const nextRes = await batchRequestMulticall({
        chainIdList: TVLStakingSupportedChainId as unknown as ChainId[],
        params: nextParams,
        defaultValue: 0
      })
      console.log({ nextRes, nextParams })
      let END_TIME = '0'
      const resMap = Object.fromEntries(
        res.map((v, chainIndex) => {
          const _chainId = v.chainId as unknown as ChainId
          const methodArr = v.method.split(',')
          const nextMethodArr = nextRes[chainIndex].method.split(',')
          const tvlObj: [string, ITVLStakingData][] = Object.values(tvlTokens[_chainId]).map((vv: any, index: number) => {
            const allowanceIndex = methodArr.indexOf(`allowance${vv.symbol}`)
            const symbolIndex = methodArr.indexOf(`symbol${vv.symbol}`)
            const nameIndex = methodArr.indexOf(`name${vv.symbol}`)
            const decimalIndex = methodArr.indexOf(`decimal${vv.symbol}`)
            const balanceOfIndex = methodArr.indexOf(`balanceOf${vv.symbol}`)
            const claimableIndex = methodArr.indexOf(`claimable${_chainId}`)
            const END_TIMEIndex = methodArr.indexOf(`END_TIME${_chainId}`)

            const allowanceBig = v.response[allowanceIndex] ? new BigNumberJs(v.response[allowanceIndex][0].hex) : '0'
            const symbol = v.response[symbolIndex][0]
            const name = v.response[nameIndex][0]
            const decimal = v.response[decimalIndex][0]
            const balanceBig = new BigNumberJs(v.response[balanceOfIndex][0].hex)
            const earnGP = v.response[claimableIndex][index]
            END_TIME = new BigNumberJs(v.response[END_TIMEIndex][0].hex).toFixed()
            const getWeeklyWeightIndex = nextMethodArr.indexOf(`getWeeklyWeight${vv.symbol}`)

            const stake = nextRes[chainIndex].response[getWeeklyWeightIndex]

            const userStakeBig = new BigNumberJs(stake ? stake[0].hex : '0')
            const totalStakeBig = new BigNumberJs(stake ? stake[1].hex : '0')
            return [
              vv.symbol,
              {
                ...initData,
                ...vv,
                chainId: _chainId,
                allowance: allowanceBig.toString(),
                symbol: symbol,
                name: name,
                decimal: decimal,
                balance: balanceBig.toString(),
                balanceStr: balanceBig.dividedBy(divisorBigNumber).toFormat(3),
                earnGP: new BigNumberJs(earnGP.hex).toFixed(),
                userStakedAmount: userStakeBig.toString(),
                totalStakedAmount: totalStakeBig.toString(),
                END_TIME: END_TIME
              } as ITVLStakingData
            ]
          })
          return [
            _chainId,
            Object.fromEntries([
              [
                Currency[_chainId],
                {
                  ...initData,
                  symbol: Currency[_chainId],
                  name: Currency[_chainId],
                  chainId: v.chainId,
                  allowance: '999999999999999999999999999999999999999999999',
                  balance: nativeValue[chainIndex][0],
                  balanceStr: nativeValue[chainIndex][1],
                  index: 0,
                  END_TIME: END_TIME
                }
              ],
              ...tvlObj
            ])
          ]
        })
      ) as unknown as Record<ChainId, Record<string, ITVLStakingData>>
      setTvlStakingData(resMap)
      console.log({ ass: resMap[nativeChainId] })
      const userStakedAmount = ethers.utils
        .formatEther(
          calculateSumByNumber(
            Object.values(resMap[nativeChainId]).map(({ totalStakedAmount }) => (totalStakedAmount === '' ? '0' : totalStakedAmount))
          )
        )
        .toString()
      setActiveData(pre => ({
        ...pre,
        userStakedAmount: userStakedAmount,
        userStakedAmountStr: new BigNumberJs(userStakedAmount).toFormat()
      }))
      setIsDataLoading(false)
    }
  }, [getNative])

  const getData = useCallback(() => {
    // if (isRegistered) {
    // 获取stake合约
    getStake()
    // }
  }, [getStake])

  useEffect(() => {
    // 读取数据
    getData()
  }, [getData])
  useEffect(() => {
    setIsApproveLoading(false)
    setIsDepositLoading(false)
    setDepositValue('0')
    if (canNext(account, nativeChainId)) {
      setDepositCurrency(Currency[nativeChainId])
    } else {
      setDepositCurrency('ETH')
    }
  }, [account])

  const _successGetNft = useCallback(
    async ({ tx }: { tx: TransactionReceipt; blockNumber: number }) => {
      if (nativeChainId && account) {
        getData()
        setIsApproveLoading(false)
        setIsDepositLoading(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
      }
    },
    [nativeChainId, account]
  )
  const deposit = useCallback(async () => {
    const currency = depositCurrency
    const amount = depositValue
    try {
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
        setErrorToast(GlobalVar.dispatch, 'dpContract is not ready')
        return
      }

      const erc20Address = tvlStakingData[_nativeChainId][currency].address
      const decimal = tvlStakingData[_nativeChainId][currency].decimal
      const tokenAmount = new BigNumberJs(amount).times(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed()
      if (erc20Address !== AddressZero) {
        const _erc20Contract = erc20Contract(nativeChainId, env, erc20Address, walletClient)
        const allowance = await _erc20Contract.read.allowance([account, tvlTokenAddress[_nativeChainId].Restaking])
        const balance = await _erc20Contract.read.balanceOf([account])
        if (new BigNumberJs(balance.toString()).gte(tokenAmount)) {
          if (new BigNumberJs(allowance.toString()).lt(tokenAmount)) {
            setIsApproveLoading(true)
            const approveTxn = await _erc20Contract.write.approve([tvlTokenAddress[_nativeChainId].Restaking, tokenAmount], {
              account: account
            })
            const approveTxnHash = typeof approveTxn === 'string' ? approveTxn : approveTxn.hash
            await waitForTransaction({ confirmations: 2, hash: approveTxnHash })
            setIsApproveLoading(false)
            setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Approve successful' })
            getData()
            return
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
        _successGetNft({
          tx: depositTx,
          blockNumber: new BigNumberJs(depositTx.blockNumber.toString()).toNumber()
        })
        setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Buy successful' })
      } else {
        throw Object.assign(new Error('Buy Transaction Failed'), { name: 'Buy' })
      }
    } catch (e) {
      setIsDepositLoading(false)
      setErrorToast(GlobalVar.dispatch, e)
      console.error('BuyHandle: ', e)
    }
  }, [isApproveLoading, isDepositLoading, depositCurrency, depositValue, walletClient, account, nativeChainId, preHandleAction])
  useEffect(() => {
    const _nativeChainId = nativeChainId
    if (
      depositCurrency &&
      depositCurrency !== '' &&
      tvlStakingData[_nativeChainId] &&
      tvlStakingData[_nativeChainId][depositCurrency].balance !== ''
    ) {
      setMax(new BigNumberJs(tvlStakingData[_nativeChainId][depositCurrency].balance).dividedBy(divisorBigNumber).toFixed())
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
