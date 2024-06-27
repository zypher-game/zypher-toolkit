import {
  ChainId,
  divisorBigNumber,
  DPSupportChainId,
  erc20Contract,
  formatMoney,
  IContractName,
  MulticallContract,
  refreshBalanceState,
  supportedChainIds,
  timestampToDateStr,
  txStatus,
  useAccountInvitation,
  useActiveWeb3React,
  useChainModal,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useSetRecoilState,
  walletModalOpenState,
  zkBingo
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionReceipt } from 'viem'
import { useWalletClient } from 'wagmi'

import { GlobalVar } from '@/constants/constants'
import DPABI from '@/contract/dpStaking/abis/contracts/DP.sol/DP.json'
import STAKINGABI from '@/contract/dpStaking/abis/contracts/Staking.sol/Staking.json'
import { DPContract, DPStakingContract, getDpStakingAddress, IDPContract } from '@/contract/dpStaking/dpStaking'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import { LockedTimes } from '../components/dialog/DPAction/DPLocked'
import { dpActionDialogState, dpBuyDialogState, dpDataState } from './state'
const divisor12BigNumber = new BigNumberJs('10').exponentiatedBy(12)

export enum IDPPRICE {
  P50000 = '50000',
  P60000 = '60000'
}
export type IDPData = {
  totalInvestmentAmount: string
  totalInvestmentAmountStr: string
  minted: string
  mintedStr: string
  staked: string
  stakedStr: string
  locked: string
  lockedStr: string
  lockWeight: string
  lockWeightStr: string
  maxApy: string
  maxApyStr: string
}
export type IMyDPData = {
  stakedTotal: string
  stakedTotalStr: string
  stakedClaim: string
  stakedClaimStr: string

  lockedTotal: string
  lockedTotalStr: string
  lockedClaim: string
  lockedClaimStr: string

  lockWeight: string
  lockWeightStr: string
}
export type IBalance = { num: IDPPRICE | '0'; numStr: string }
export type IDpBalance = Record<IDPPRICE | '0', IBalance>
export const DP_PRICE_LIST: IBalance[] = [
  {
    num: IDPPRICE.P50000,
    numStr: '50,000'
  },
  {
    num: IDPPRICE.P60000,
    numStr: '60,000'
  }
]
export const DP_PRICE: IBalance = DP_PRICE_LIST[0]
export type IStakeParam = { id: string; amount: string; duration: string }
export type ILockedItem = {
  id: string
  idStr: string
  amount: string
  amountStr: string
  duration: string
  weight: string
  weightStr: string
  lastLockTime: string
  lastLockTimeStr: string
  unlockTime: string
  unlockTimeStr: string
}
export const useGPAction = () => {
  const [buyValue, setBuyValue] = useState<string>('1')
  const [isApprove, setIsApprove] = useState(false)
  const [isPointBalanceEnough, setIsPointBalanceEnough] = useState(false)
  const { account, chainId } = useActiveWeb3React()
  // const account = '0x952988fa5B0Ba423F42EC76613F3F55bBa196B8A'
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const setIsDpBuyDialogState = useSetRecoilState(dpBuyDialogState)
  const setIsDpActionDialogState = useSetRecoilState(dpActionDialogState)
  const [isBuyNftLoading, setIsBuyNftLoading] = useState(false)
  const [isClaimLockLoading, setIsClaimLockLoading] = useState(false)
  const [isClaimUnLockLoading, setIsClaimUnLockLoading] = useState(false)
  const [isStakeLoading, setIsStakeLoading] = useState(false)
  const [isStakeLockLoading, setIsStakeLockLoading] = useState(false)
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)
  const [isApprovedForAll, setIsApprovedForAll] = useState<string[]>([])
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { data: walletClient } = useWalletClient()
  const { postAccountUpdate } = useAccountInvitation(env)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const { openChainModal } = useChainModal()
  const [dpData, setDpData] = useRecoilState<IDPData>(dpDataState)
  const [dpBalance, setDpBalance] = useState<IDpBalance>(
    Object.fromEntries(['0', ...Object.values(IDPPRICE)].map(price => [price, { num: '0', numStr: '0' }])) as Record<IDPPRICE | '0', IBalance>
  )
  const [stakedBalance, setStakedBalance] = useState<IDpBalance>(
    Object.fromEntries(['0', ...Object.values(IDPPRICE)].map(price => [price, { num: '0', numStr: '0' }])) as Record<IDPPRICE | '0', IBalance>
  )
  const [lockedViewList, setLockedViewList] = useState<ILockedItem[]>()
  const [myDpData, setMyDpData] = useState<IMyDPData>({
    stakedTotal: '-',
    stakedTotalStr: '-',
    stakedClaim: '-',
    stakedClaimStr: '-',
    lockedTotal: '-',
    lockedTotalStr: '-',
    lockedClaim: '-',
    lockedClaimStr: '-',
    lockWeight: '-',
    lockWeightStr: '-'
  })

  const [dpStakingAddress, dpAddress, pointsAddress] = useMemo(() => {
    try {
      let _chainId = chainId
      if (!_chainId) {
        _chainId = ChainId.OPBNBTEST
      }
      return [
        getDpStakingAddress(_chainId, IDPContract.Staking),
        getDpStakingAddress(_chainId, IDPContract.DP),
        zkBingo(_chainId, IContractName.ZypherGameToken)
      ]
    } catch (e) {
      return []
    }
  }, [chainId])
  const isApprovedForStaking = useMemo(() => {
    if (dpStakingAddress) {
      return isApprovedForAll.map(v => v.toLowerCase()).includes(dpStakingAddress.toLowerCase())
    }
    return false
  }, [dpStakingAddress, isApprovedForAll])
  const getApprove = useCallback(async () => {
    try {
      if (chainId && account) {
        const pointsContract = erc20Contract(chainId, env, pointsAddress)
        const allowance = await pointsContract.read.allowance([account, dpAddress])
        const balance = await pointsContract.read.balanceOf([account])
        const tokenAmount = ethers.utils.parseUnits(DP_PRICE.num, 'ether').mul(buyValue).toString()
        if (new BigNumberJs(allowance.toString()).lt(tokenAmount)) {
          setIsApprove(false)
        } else {
          setIsApprove(true)
        }
        if (new BigNumberJs(balance.toString()).gte(tokenAmount)) {
          setIsPointBalanceEnough(true)
        } else {
          setIsPointBalanceEnough(false)
        }
      }
    } catch (e) {
      console.error('getApprove error: ', e)
    }
  }, [chainId, buyValue, account, dpAddress])

  useEffect(() => {
    if (chainId && account && dpAddress && pointsAddress) {
      getApprove()
    }
  }, [chainId, buyValue, account, dpAddress, pointsAddress])
  useEffect(() => {
    if (dpStakingAddress && dpAddress && pointsAddress) {
      getGPInfo()
    }
  }, [chainId, dpStakingAddress, dpAddress, pointsAddress])
  useEffect(() => {
    if (chainId && account && dpStakingAddress && dpAddress && pointsAddress) {
      getGPAccountInfo()
    }
  }, [chainId, account, dpStakingAddress, dpAddress, pointsAddress])
  const getGPInfo = useCallback(async () => {
    try {
      const isM = true
      let results
      if (isM) {
        const multicall: any = await MulticallContract()
        const params = [
          ...DP_PRICE_LIST.map(v => v.num).map(v => ({
            reference: 'totalMints' + v,
            contractAddress: dpAddress,
            abi: DPABI,
            calls: [{ methodName: 'totalMints', reference: 'totalMints' + v, methodParameters: [v] }]
          })),
          ...DP_PRICE_LIST.map(v => v.num).map(v => ({
            reference: 'dpBalance' + v,
            contractAddress: dpAddress,
            abi: DPABI,
            calls: [{ methodName: 'balanceOf', reference: 'balanceOf' + v, methodParameters: [dpStakingAddress, v] }]
          })),
          {
            // 每日释放的 GP 奖励数量
            reference: 'rewardData',
            contractAddress: dpStakingAddress,
            abi: STAKINGABI,
            calls: [
              {
                methodName: 'rewardData',
                reference: 'rewardData',
                methodParameters: []
              }
            ]
          },
          // {
          //   // 单个周期权重
          //   reference: 'getWeight',
          //   contractAddress: dpStakingAddress,
          //   abi: STAKINGABI,
          //   calls: [{ methodName: 'getWeight', reference: 'getWeight', methodParameters: [0] }]
          // },
          // lock
          {
            reference: 'getLockWeight',
            contractAddress: dpStakingAddress,
            abi: STAKINGABI,
            calls: [{ methodName: 'getLockWeight', reference: 'getLockWeight', methodParameters: [] }]
          },
          // Staked
          // {
          //   reference: 'getUnlockWeight',
          //   contractAddress: dpStakingAddress,
          //   abi: STAKINGABI,
          //   calls: [{ methodName: 'getUnlockWeight', reference: 'getUnlockWeight', methodParameters: [] }]
          // },
          {
            // 总权重
            reference: 'getTotalWeight',
            contractAddress: dpStakingAddress,
            abi: STAKINGABI,
            calls: [{ methodName: 'getTotalWeight', reference: 'getTotalWeight', methodParameters: [] }]
          },
          {
            // Cumulative Rewards Issued 获取总投入分红量
            reference: 'totalInvestmentAmount',
            contractAddress: dpStakingAddress,
            abi: STAKINGABI,
            calls: [{ methodName: 'totalInvestmentAmount', reference: 'totalInvestmentAmount', methodParameters: [] }]
          },
          {
            // Staked
            reference: 'totalUnlockAmounts',
            contractAddress: dpStakingAddress,
            abi: STAKINGABI,
            calls: [{ methodName: 'totalUnlockAmounts', reference: 'totalUnlockAmounts', methodParameters: [] }]
          }
        ]
        const res = await multicall.call(params)
        results = res.results
      } else {
        // results = Result.results
      }
      if (results) {
        const totalInvestmentAmount = new BigNumberJs(results['totalInvestmentAmount']['callsReturnContext'][0]['returnValues'][0]['hex']).dividedBy(
          divisorBigNumber
        )
        let minted = new BigNumberJs('0')
        let balanceOfGP = new BigNumberJs('0')
        let balanceOfGPTotal = new BigNumberJs('0')
        for (let i = 0; i < DP_PRICE_LIST.length; i++) {
          minted = new BigNumberJs(results['totalMints' + DP_PRICE_LIST[i].num]['callsReturnContext'][0]['returnValues'][0]['hex']).plus(minted)
          balanceOfGP = new BigNumberJs(results['dpBalance' + DP_PRICE_LIST[i].num]['callsReturnContext'][0]['returnValues'][0]['hex']).plus(
            balanceOfGP
          )
          balanceOfGPTotal = new BigNumberJs(results['dpBalance' + DP_PRICE_LIST[i].num]['callsReturnContext'][0]['returnValues'][0]['hex'])
            .times(DP_PRICE_LIST[i].num)
            .plus(balanceOfGPTotal)
        }
        const staked = new BigNumberJs(results['totalUnlockAmounts']['callsReturnContext'][0]['returnValues'][0]['hex'])
        const locked = balanceOfGP.minus(staked)
        const rewardPer = new BigNumberJs(results['rewardData']['callsReturnContext'][0]['returnValues'][0]['hex']).dividedBy(divisorBigNumber)
        // 公式 = 每日释放的GP / （DP单价-GP数量 * 全平台质押的数量）*365
        const maxApy = balanceOfGPTotal.eq(0) ? new BigNumberJs('0') : rewardPer.div(balanceOfGPTotal).times(365).times(86400).times(100)
        const lockWeight = new BigNumberJs(results['getLockWeight']['callsReturnContext'][0]['returnValues'][0]['hex']).dividedBy(divisor12BigNumber)
        //   totalInvestmentAmount: totalInvestmentAmount.toString(),
        //   minted: minted.toString(),
        //   staked: staked.toString(),
        //   locked: locked.toString(),
        //   maxApy: maxApy.toString(),
        //   lockWeight: lockWeight.toString()
        // })

        setDpData({
          totalInvestmentAmount: totalInvestmentAmount.toString(),
          totalInvestmentAmountStr: formatMoney(totalInvestmentAmount.toString(), 0),
          minted: minted.toString(),
          mintedStr: formatMoney(minted.toString(), 0),
          staked: staked.toString(),
          stakedStr: formatMoney(staked.toString(), 0),
          locked: locked.toString(),
          lockedStr: formatMoney(locked.toString(), 0),
          lockWeight: lockWeight.toString(),
          lockWeightStr: formatMoney(lockWeight.toString(), 2),
          maxApy: maxApy.toString(),
          maxApyStr: formatMoney(maxApy.toString(), 2)
        })
      } else {
      }
    } catch (error) {
      console.error('rewardAddress tokenOfOwnerByIndex error: ', error)
    }
  }, [chainId, dpStakingAddress, dpAddress, pointsAddress])

  const getGPAccountInfo = useCallback(async () => {
    try {
      const isM = true
      let results01
      let results02
      const LockedTimesFlat = LockedTimes.flat()
      if (isM) {
        const multicall: any = await MulticallContract()
        const params = [
          ...DP_PRICE_LIST.map(v => v.num).map(v => ({
            reference: 'dpBalance' + v,
            contractAddress: dpAddress,
            abi: DPABI,
            calls: [{ methodName: 'balanceOf', reference: 'balanceOf' + v, methodParameters: [account, v] }]
          })),
          {
            reference: 'isApprovedForStaking',
            contractAddress: dpAddress,
            abi: DPABI,
            calls: [{ methodName: 'isApprovedForAll', reference: 'totalMints', methodParameters: [account, dpStakingAddress] }]
          }
        ]
        const res01 = await multicall.call(params)
        results01 = res01.results
        try {
          const getLockParams = []
          const getUnLockParams = []
          for (let i = 0; i < DP_PRICE_LIST.length; i++) {
            const dpPriceListItem = DP_PRICE_LIST[i].num
            getUnLockParams.push({
              reference: 'getUnlock' + dpPriceListItem,
              contractAddress: dpStakingAddress,
              abi: STAKINGABI,
              calls: [
                {
                  methodName: 'getUnlock',
                  reference: 'getUnlock' + dpPriceListItem,
                  methodParameters: [account, dpPriceListItem]
                }
              ]
            })
            for (let ii = 0; ii < LockedTimesFlat.length; ii++) {
              const lockedTimesFlatitemAmount = LockedTimesFlat[ii].amount
              getLockParams.push({
                reference: 'getLock' + dpPriceListItem + lockedTimesFlatitemAmount,
                contractAddress: dpStakingAddress,
                abi: STAKINGABI,
                calls: [
                  {
                    methodName: 'getLock',
                    reference: 'getLock' + dpPriceListItem + lockedTimesFlatitemAmount,
                    methodParameters: [account, dpPriceListItem, lockedTimesFlatitemAmount]
                  }
                ]
              })
            }
          }
          const params02 = [
            ...getLockParams,
            ...getUnLockParams,
            {
              reference: 'getLockReward',
              contractAddress: dpStakingAddress,
              abi: STAKINGABI,
              calls: [
                {
                  methodName: 'getLockReward',
                  reference: 'getLockReward',
                  methodParameters: [account]
                }
              ]
            },
            {
              reference: 'getUnlockReward',
              contractAddress: dpStakingAddress,
              abi: STAKINGABI,
              calls: [
                {
                  methodName: 'getUnlockReward',
                  reference: 'getUnlockReward',
                  methodParameters: [account]
                }
              ]
            }
          ]
          const res02 = await multicall.call(params02)
          results02 = res02.results
        } catch (e: any) {}
      } else {
        // results = MyResult.results
      }
      if (results01 || results02) {
        if (results01) {
          const _isApprovedForStaking = results01['isApprovedForStaking']['callsReturnContext'][0]['returnValues'][0]
          if (dpStakingAddress && _isApprovedForStaking) {
            setIsApprovedForAll(pre => [...pre, dpStakingAddress])
          }
          const balanceOfGP = Object.fromEntries(['0', Object.values(IDPPRICE)].map(price => [price, { num: '0', numStr: '0' }])) as Record<
            IDPPRICE | '0',
            IBalance
          >
          for (let i = 0; i < DP_PRICE_LIST.length; i++) {
            const _balance = new BigNumberJs(
              results01['dpBalance' + DP_PRICE_LIST[i].num]['callsReturnContext'][0]['returnValues'][0]['hex']
            ).toFixed()
            balanceOfGP[DP_PRICE_LIST[i].num] = {
              num: _balance as IDPPRICE,
              numStr: formatMoney(_balance, 0)
            }
          }
          setDpBalance(balanceOfGP)
        }
        if (results02) {
          const _myDpData: IMyDPData = {
            stakedTotal: '-',
            stakedTotalStr: '-',
            stakedClaim: '-',
            stakedClaimStr: '-',
            lockedTotal: '-',
            lockedTotalStr: '-',
            lockedClaim: '-',
            lockedClaimStr: '-',
            lockWeight: '-',
            lockWeightStr: '-'
          }
          // const [totalStakedBig, stakedBigViews] = results02['getUnlock']['callsReturnContext'][0]['returnValues']
          // const stakedViews = stakedBigViews.map((v: any) => ({
          //   id: new BigNumberJs(v[0]['hex']).toFixed(),
          //   amount: new BigNumberJs(v[1]['hex']).toFixed()
          // })) as { id: string; amount: string }[]
          const stakedViews: { id: string; amount: string }[] = []
          let totalStakedBig = new BigNumberJs(0)
          for (let i = 0; i < DP_PRICE_LIST.length; i++) {
            const dpPriceListItem = DP_PRICE_LIST[i].num
            const stakedBigViewsC = results02['getUnlock' + dpPriceListItem]['callsReturnContext'][0]['returnValues']
            // for (let k = 0; k < stakedBigViewsC.length; k++) {
            totalStakedBig = totalStakedBig.plus(new BigNumberJs(stakedBigViewsC[1]['hex']))
            stakedViews.push({
              id: new BigNumberJs(stakedBigViewsC[0]['hex']).toFixed(),
              amount: new BigNumberJs(stakedBigViewsC[1]['hex']).toFixed()
            })
            // }
          }
          setStakedBalance(
            Object.fromEntries(
              ['0', ...Object.values(IDPPRICE)].map(price => {
                const _staked = stakedViews.filter(vv => vv.id === price)
                if (_staked.length) {
                  return [price, { num: _staked[0].amount, numStr: formatMoney(_staked[0].amount, 0) }]
                }
                return [price, { num: '0', numStr: '0' }]
              })
            ) as Record<IDPPRICE | '0', IBalance>
          )

          // lockedBalance
          // const [totalLockedBig, lockedBigViews] = results02['getLock']['callsReturnContext'][0]['returnValues']
          const lockedBigViews: any[] = []
          let totalLockedBig = new BigNumberJs(0)
          for (let i = 0; i < DP_PRICE_LIST.length; i++) {
            const dpPriceListItem = DP_PRICE_LIST[i].num
            for (let ii = 0; ii < LockedTimesFlat.length; ii++) {
              const lockedTimesFlatitemAmount = LockedTimesFlat[ii].amount
              const lockedBigViewsC = results02['getLock' + dpPriceListItem + lockedTimesFlatitemAmount]['callsReturnContext'][0]['returnValues']
              totalLockedBig = totalLockedBig.plus(new BigNumberJs(lockedBigViewsC[1]['hex']))
              lockedBigViews.push(lockedBigViewsC)
            }
          }
          const lockedViews = lockedBigViews
            .map((v: any) => ({
              id: new BigNumberJs(v[0]['hex']).toFixed(),
              idStr: formatMoney(new BigNumberJs(v[0]['hex']).toFixed(), 0),
              amount: new BigNumberJs(v[1]['hex']).toFixed(),
              amountStr: formatMoney(new BigNumberJs(v[1]['hex']).toFixed(), 0),
              duration: new BigNumberJs(v[2]['hex']).toFixed(),
              weight: new BigNumberJs(v[3]['hex']).times(v[1]['hex']).dividedBy(divisor12BigNumber).toFixed(),
              weightStr: formatMoney(new BigNumberJs(v[3]['hex']).times(v[1]['hex']).dividedBy(divisor12BigNumber).toFixed(), 2),
              lastLockTime: new BigNumberJs(v[4]['hex']).toFixed(),
              lastLockTimeStr: timestampToDateStr(new BigNumberJs(v[4]['hex']).toNumber(), '-'),
              unlockTime: new BigNumberJs(v[5]['hex']).toFixed(),
              unlockTimeStr: timestampToDateStr(new BigNumberJs(v[5]['hex']).toNumber(), '-')
            }))
            .filter((v: any) => v.amount !== '0') as ILockedItem[]
          setLockedViewList(lockedViews)
          const weightSum = lockedViews.reduce((accumulator, currentValue) => {
            const amount = new BigNumberJs(currentValue.weight)
            return accumulator.plus(amount)
          }, new BigNumberJs(0))
          _myDpData.stakedTotal = totalStakedBig.toString()
          _myDpData.stakedTotalStr = formatMoney(_myDpData.stakedTotal, 0)
          _myDpData.stakedClaim = new BigNumberJs(results02['getUnlockReward']['callsReturnContext'][0]['returnValues'][0]['hex']).toFixed()
          _myDpData.stakedClaimStr = formatMoney(new BigNumberJs(_myDpData.stakedClaim).dividedBy(divisorBigNumber).toFixed(), 4)
          _myDpData.lockedTotal = totalLockedBig.toString()
          _myDpData.lockedTotalStr = formatMoney(_myDpData.lockedTotal, 0)
          _myDpData.lockedClaim = new BigNumberJs(results02['getLockReward']['callsReturnContext'][0]['returnValues'][0]['hex']).toFixed()
          _myDpData.lockedClaimStr = formatMoney(new BigNumberJs(_myDpData.lockedClaim).dividedBy(divisorBigNumber).toFixed(), 4)
          _myDpData.lockWeight = weightSum.toString()
          _myDpData.lockWeightStr = formatMoney(_myDpData.lockWeight, 2)
          setMyDpData(_myDpData)
        }
      }
    } catch (error) {
      console.error('getGPAccountInfo tokenOfOwnerByIndex error: ', error)
    }
  }, [chainId, account])

  const preHandleAction = useCallback(() => {
    if (openChainModal && !DPSupportChainId.includes(chainId)) {
      openChainModal()
      return
    }
    if (!account) {
      setDialogOpen(true)
      return
    }
    return true
  }, [account, chainId, openChainModal])

  const buyHandleAction = useCallback(
    async ({ id }: { id: string }) => {
      try {
        const isOk = preHandleAction()
        if (!isOk) {
          setIsDpBuyDialogState(false)
          return
        }
        if (!walletClient) {
          throw new Error('walletClient not Ready')
        }
        const dpContract = DPContract({ chainId, env, signer: walletClient })
        if (!dpContract) {
          setErrorToast(GlobalVar.dispatch, 'dpContract is not ready')
          return
        }
        if (isBuyNftLoading) {
          return
        }
        const pointsContract = erc20Contract(chainId, env, pointsAddress, walletClient)
        const tokenAmount = ethers.utils.parseUnits(DP_PRICE.num, 'ether').mul(buyValue).toString()
        const allowance = await pointsContract.read.allowance([account, dpAddress])
        const balance = await pointsContract.read.balanceOf([account])
        if (new BigNumberJs(balance.toString()).gte(tokenAmount)) {
          if (new BigNumberJs(allowance.toString()).lt(tokenAmount)) {
            setIsBuyNftLoading(true)
            const approveTxn = await pointsContract.write.approve([dpAddress, tokenAmount], {
              account: account
            })
            const approveTxnHash = typeof approveTxn === 'string' ? approveTxn : approveTxn.hash
            await waitForTransaction({ confirmations: 2, hash: approveTxnHash })
            setIsBuyNftLoading(false)
            setIsApprove(true)
            setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Approve successful' })
            return
          }
        }
        setIsBuyNftLoading(true)
        // 贏 N 場後可以 buy Battle Pass
        const res = await dpContract.write.buy([id, buyValue, '0x'])
        const hash = typeof res === 'string' ? res : res.hash
        const buyTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (buyTx && buyTx.status === txStatus) {
          getApprove()
          _successGetNft({
            tx: buyTx,
            blockNumber: new BigNumberJs(buyTx.blockNumber.toString()).toNumber()
          })
          setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Buy successful' })
        } else {
          throw Object.assign(new Error('Buy Transaction Failed'), { name: 'Buy' })
        }
      } catch (e) {
        setErrorToast(GlobalVar.dispatch, e)
        console.error('BuyHandle: ', e)
      } finally {
        setIsBuyNftLoading(false)
      }
    },
    [walletClient, buyValue, account, chainId, preHandleAction]
  )
  const _stakePre = useCallback(
    async (loading: boolean, setLoading: any) => {
      const isOk = preHandleAction()
      if (!isOk) {
        setIsDpActionDialogState(false)
        return
      }
      if (!walletClient) {
        throw new Error('walletClient not Ready')
      }
      if (!dpStakingAddress) {
        throw new Error('dpStakingAddress not Ready')
      }
      if (loading) {
        return
      }
      if (!isApprovedForStaking) {
        const dpContract = DPContract({ chainId, env, signer: walletClient })
        if (!dpContract) {
          setErrorToast(GlobalVar.dispatch, 'dpContract is not ready')
          return
        }
        setLoading(true)
        const approveTxn = await dpContract.write.setApprovalForAll([dpStakingAddress, true])
        const approveTxnHash = typeof approveTxn === 'string' ? approveTxn : approveTxn.hash
        await waitForTransaction({ confirmations: 2, hash: approveTxnHash })
        setLoading(false)
        setIsApprovedForAll(pre => [...pre, dpStakingAddress])
        setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Approve successful' })
        return
      }
      return true
    },
    [walletClient, account, chainId, dpStakingAddress, isApprovedForStaking]
  )
  // 质押活期
  const stakeHandleAction = useCallback(
    async (params: IStakeParam[]) => {
      try {
        const isOk = await _stakePre(isStakeLoading, setIsStakeLoading)
        if (isOk && walletClient) {
          const dpStakingContract = DPStakingContract({ chainId, env, signer: walletClient })
          if (!dpStakingContract) {
            setErrorToast(GlobalVar.dispatch, 'dpStakingContract is not ready')
            return
          }
          setIsStakeLoading(true)
          const res = await dpStakingContract.write.stake([
            params
              .filter(v => v.amount !== '0')
              .map(v => ({
                id: v.id,
                amount: v.amount,
                data: '',
                duration: v.duration
              }))
          ])
          const hash = typeof res === 'string' ? res : res.hash
          const stakeTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
          if (stakeTx && stakeTx.status === txStatus) {
            _successGetNft({
              tx: stakeTx,
              blockNumber: new BigNumberJs(stakeTx.blockNumber.toString()).toNumber()
            })
            setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Stake successful' })
          } else {
            throw Object.assign(new Error('Stake Transaction Failed'), { name: 'Stake' })
          }
        }
      } catch (e) {
        setErrorToast(GlobalVar.dispatch, e)
        console.error('stakeHandleAction: ', e)
      } finally {
        setIsStakeLoading(false)
      }
    },
    [isStakeLoading, _stakePre, walletClient, account, chainId, preHandleAction]
  )
  // 质押定期
  const stakeLockHandleAction = useCallback(
    async (params: IStakeParam[]) => {
      try {
        const isOk = await _stakePre(isStakeLockLoading, setIsStakeLockLoading)
        if (isOk && walletClient) {
          setIsStakeLockLoading(true)
          const dpStakingContract = DPStakingContract({ chainId, env, signer: walletClient })
          if (!dpStakingContract) {
            setErrorToast(GlobalVar.dispatch, 'dpStakingContract is not ready')
            return
          }

          const res = await dpStakingContract.write.stakeLock([
            params
              .map(v => ({
                id: v.id,
                amount: v.amount,
                data: '',
                duration: v.duration
              }))
              .filter(v => v.amount !== '0')
          ])
          const hash = typeof res === 'string' ? res : res.hash
          const stakeLockTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
          if (stakeLockTx && stakeLockTx.status === txStatus) {
            _successGetNft({
              tx: stakeLockTx,
              blockNumber: new BigNumberJs(stakeLockTx.blockNumber.toString()).toNumber()
            })
            setSuccessToast(GlobalVar.dispatch, { title: '', message: 'StakeLock successful' })
          } else {
            throw Object.assign(new Error('StakeLock Transaction Failed'), { name: 'StakeLock' })
          }
        }
      } catch (e) {
        setErrorToast(GlobalVar.dispatch, e)
        console.error('stakeLockHandleAction: ', e)
      } finally {
        setIsStakeLockLoading(false)
      }
    },
    [isStakeLockLoading, _stakePre, walletClient, account, chainId, preHandleAction]
  )
  // 取回已解锁NFT
  const withdrawHandleAction = useCallback(
    async (params: IStakeParam[]) => {
      try {
        const isOk = await _stakePre(isWithdrawLoading, setIsWithdrawLoading)
        if (isOk && walletClient) {
          setIsWithdrawLoading(true)
          const dpStakingContract = DPStakingContract({ chainId, env, signer: walletClient })
          if (!dpStakingContract) {
            setErrorToast(GlobalVar.dispatch, 'dpStakingContract is not ready')
            return
          }
          // 贏 N 場後可以 stake Battle Pass
          const res = await dpStakingContract.write.withdraw([
            params
              .map(v => ({
                id: v.id,
                amount: v.amount
              }))
              .filter(v => v.amount !== '0')
          ])
          const hash = typeof res === 'string' ? res : res.hash
          const withdrawTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
          if (withdrawTx && withdrawTx.status === txStatus) {
            _successGetNft({
              tx: withdrawTx,
              blockNumber: new BigNumberJs(withdrawTx.blockNumber.toString()).toNumber()
            })
            setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Withdraw successful' })
          } else {
            throw Object.assign(new Error('Withdraw Transaction Failed'), { name: 'Withdraw' })
          }
        }
      } catch (e) {
        setErrorToast(GlobalVar.dispatch, e)
        console.error('withdrawHandleAction: ', e)
      } finally {
        setIsWithdrawLoading(false)
      }
    },
    [isWithdrawLoading, _stakePre, walletClient, account, chainId, preHandleAction]
  )
  const _claimHandleAction = useCallback(
    async ({
      loading,
      setLoading,
      func
    }: {
      loading: boolean
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
      func: 'claimLock' | 'claimUnlock'
    }) => {
      try {
        const isOk = preHandleAction()
        if (!isOk) {
          return
        }
        if (!walletClient) {
          throw new Error('walletClient not Ready')
        }
        const dpStakingContract = DPStakingContract({ chainId, env, signer: walletClient })
        if (!dpStakingContract) {
          setErrorToast(GlobalVar.dispatch, 'dpStakingContract is not ready')
          return
        }
        if (loading) {
          return
        }
        setLoading(true)
        // 贏 N 場後可以 buy Battle Pass
        const res = await dpStakingContract.write[func]()
        const hash = typeof res === 'string' ? res : res.hash
        const claimLockTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (claimLockTx && claimLockTx.status === txStatus) {
          _successGetNft({
            tx: claimLockTx,
            blockNumber: new BigNumberJs(claimLockTx.blockNumber.toString()).toNumber()
          })
          setSuccessToast(GlobalVar.dispatch, { title: '', message: func + ' successful' })
        } else {
          throw Object.assign(new Error(func + ' Transaction Failed'), { name: func + 'ClaimLock' })
        }
      } catch (e) {
        setErrorToast(GlobalVar.dispatch, e)
        console.error('_claimHandleAction Handle: ', e)
      } finally {
        setLoading(false)
      }
    },
    [walletClient, account, chainId, preHandleAction]
  )
  const claimLockHandleAction = useCallback(async () => {
    await _claimHandleAction({
      loading: isClaimLockLoading,
      setLoading: setIsClaimLockLoading,
      func: 'claimLock'
    })
  }, [walletClient, account, chainId, preHandleAction])

  const claimUnLockHandleAction = useCallback(async () => {
    await _claimHandleAction({
      loading: isClaimUnLockLoading,
      setLoading: setIsClaimUnLockLoading,
      func: 'claimUnlock'
    })
  }, [walletClient, account, chainId, preHandleAction])
  const _successGetNft = useCallback(
    async ({ tx }: { tx: TransactionReceipt; blockNumber: number }) => {
      if (chainId && account) {
        getGPAccountInfo()
        getGPInfo()
        setIsDpBuyDialogState(false)
        setIsDpActionDialogState(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
      }
    },
    [chainId, account]
  )
  return {
    buyValue,
    setBuyValue,
    isApprove,
    isPointBalanceEnough,
    isBuyNftLoading,
    isClaimLockLoading,
    isClaimUnLockLoading,
    dpData,
    myDpData,
    isApprovedForStaking,
    preHandleAction,
    buyHandleAction,
    claimLockHandleAction,
    claimUnLockHandleAction,
    stakeHandleAction,
    stakeLockHandleAction,
    withdrawHandleAction,
    dpBalance,
    isStakeLoading,
    isStakeLockLoading,
    isWithdrawLoading,
    stakedBalance,
    lockedViewList
  }
}
