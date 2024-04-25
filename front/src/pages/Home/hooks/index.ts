import {
  ChainId,
  DPSupportChainId,
  erc20Contract,
  formatMoney,
  getUTCSeconds,
  IPointsItem,
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
  ZkBingoPointsContract
} from '@UI/src/'
import BigNumberjs from 'bignumber.js'
import { BigNumber, ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { TransactionReceipt } from 'viem'
import { Address, useWalletClient } from 'wagmi'

import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

enum IClaimType {
  FREE,
  SIGNIN
}
export enum IClaimConfKey {
  ordinary = 'ordinary',
  princely = 'princely'
}
type IClaimConf = Record<IClaimConfKey, BigNumber>
type IClaimIndex = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
type IClaimConfMap = Record<IClaimType, Partial<Record<IClaimIndex, IClaimConf>>>
export const claimConfsDefault: IClaimConfMap = {
  [IClaimType.FREE]: {
    '1': { ordinary: ethers.utils.parseUnits('5000', 'ether'), princely: ethers.utils.parseUnits('1000', 'ether') }
  },
  [IClaimType.SIGNIN]: {
    '1': { ordinary: ethers.utils.parseUnits('50', 'ether'), princely: ethers.utils.parseUnits('60', 'ether') },
    '2': { ordinary: ethers.utils.parseUnits('50', 'ether'), princely: ethers.utils.parseUnits('60', 'ether') },
    '3': { ordinary: ethers.utils.parseUnits('70', 'ether'), princely: ethers.utils.parseUnits('90', 'ether') },
    '4': { ordinary: ethers.utils.parseUnits('70', 'ether'), princely: ethers.utils.parseUnits('90', 'ether') },
    '5': { ordinary: ethers.utils.parseUnits('100', 'ether'), princely: ethers.utils.parseUnits('150', 'ether') },
    '6': { ordinary: ethers.utils.parseUnits('100', 'ether'), princely: ethers.utils.parseUnits('150', 'ether') },
    '7': { ordinary: ethers.utils.parseUnits('160', 'ether'), princely: ethers.utils.parseUnits('200', 'ether') }
  }
}
// 10,000 = $ 10 = 0.005 ETH
// 30,000 = $ 30 = 0.015 ETH
// 50,000 = $ 50 = 0.025 ETH
// 60,000 = $ 60 = 0.03 ETH
// 80,000 = $ 80 = 0.04 ETH
// 优惠档A：100,000  = $ 100 = 0.05 ETH, 98 折 = 0.049 ETH
// 优惠档B：300,000 = $ 300 = 0.15 ETH, 95 折 = 0.1425 ETH
// 优惠档C：500,000 = $ 500 = 0.25 ETH, 9 折 = 0.225 ETH
const ChainPointPrice = {
  [ChainId.LineaMainnet]: 1 / 2_000_000,
  [ChainId.LineaTestnet]: 1 / 2_000_000,
  [ChainId.OPBNB]: 1 / 250_000,
  [ChainId.OPBNBTEST]: 1 / 250_000
}
export const pointsListDefault = (chainId: ChainId): IPointsItem[] | undefined => {
  try {
    return [['10000'], ['30000'], ['50000'], ['60000'], ['80000'], ['100000 ', '2'], ['300000', '5'], ['500000', '10']].map((v, index) => {
      const chainPrice = ChainPointPrice[chainId]
      const price = v[1]
        ? new BigNumberjs(chainPrice)
            .times(v[0])
            .times((100 - Number(v[1])) * 0.01)
            .toFixed(8)
        : new BigNumberjs(chainPrice).times(v[0]).toFixed(8)
      const priceStr = formatMoney(Number(price), 8)
      const pointAmountStr = formatMoney(Number(v[0]))
      return {
        index: index + 1,
        pointAmount: v[0],
        pointAmountStr: pointAmountStr,
        price: price,
        priceStr: priceStr,
        discount: v[1]
      } as unknown as IPointsItem
    })
  } catch (e) {
    console.error('pointsListDefault: ', e)
  }
}
// type IAddress = string
// type IDayClaimed = Record<string, Record<IAddress, boolean>>

type IBingoLobbyContractStatic = {
  claimStartTime?: number
  blindBoxAddress?: Address
  pointsToken?: string
  // claimConfs?: IClaimConfMap
  dayClaimed?: boolean
  claim?: any
}

const useBingoLobbyContractStatic = (setBingoLobbyContractStatic: React.Dispatch<React.SetStateAction<IBingoLobbyContractStatic>>): void => {
  const { chainId: nativeChainId, account } = useActiveWeb3React()

  const initBingoPoints = useCallback(async () => {
    try {
      const pointsContract = ZkBingoPointsContract(nativeChainId, env)
      if (pointsContract && nativeChainId && account) {
        // const claimStartTime = await pointsContract.read.claimStartTime()
        // console.log({ claimStartTime })
        // const blindBoxAddress = await pointsContract.read.blindBoxAddress()
        // console.log({ blindBoxAddress })
        // const [pointsToken] = await pointsContract.functions.pointsToken()
        const nowTime = getUTCSeconds()
        const todayStr = timestampToDateStr(nowTime)
        const dayClaimed = await pointsContract.read.dayClaimed([todayStr, account])
        // const [claimConfs] = await pointsContract.functions.claimConfs()
        const claim = pointsContract.read.claim
        const obj = {
          // claimStartTime: new BigNumberjs(claimStartTime).toNumber(),
          // blindBoxAddress: blindBoxAddress,
          // pointsToken: pointsToken,
          dayClaimed: dayClaimed as boolean,
          // claimConfs: claimConfs,
          claim: claim
        }
        setBingoLobbyContractStatic(obj)
      } else {
        setBingoLobbyContractStatic({})
      }
    } catch (e) {}
  }, [account, nativeChainId])
  useEffect(() => {
    initBingoPoints()
  }, [account, nativeChainId])
}
export type IBingoPointApi = {
  pointsStr: string
  dayClaimed: boolean
  claimHandle: () => Promise<void>
  isClaimLoading: boolean
  claimConfKey: IClaimConfKey | undefined
}
export const useBingoPoint = (): IBingoPointApi => {
  const [boxBalance, setBoxBalance] = useState<string>()
  const [claimType, setClaimType] = useState<IClaimType>()
  const [claimConfKey] = useState<IClaimConfKey>()
  const [pointsStr, setPointsStr] = useState<string>('5000')
  const [dayClaimed, setDayClaimed] = useState<boolean>(false)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const { postAccountUpdate } = useAccountInvitation(env)
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const dispatch = useAppDispatch()
  // const pointsContract = useBingoPointsContract()
  const { data: walletClient } = useWalletClient()
  const [bingoLobbyContractStatic, setBingoLobbyContractStatic] = useState<IBingoLobbyContractStatic>({})
  useBingoLobbyContractStatic(setBingoLobbyContractStatic)
  useClaimType({ setClaimType, bingoLobbyContractStatic })
  useBoxBalance({ blindBoxAddress: bingoLobbyContractStatic?.blindBoxAddress, setBoxBalance })
  useShowPoint({ boxBalance, claimType, setPointsStr, setClaimConfKey: undefined })
  useEffect(() => {
    setDayClaimed(bingoLobbyContractStatic?.dayClaimed ?? false)
  }, [bingoLobbyContractStatic])
  const [isClaimLoading, setIsClaimLoading] = useState(false)
  const { chainId, account } = useActiveWeb3React()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { openChainModal } = useChainModal()
  const claimHandle = useCallback(async () => {
    try {
      if (!account) {
        setDialogOpen(true)
        return
      }
      if (openChainModal && !DPSupportChainId.includes(chainId)) {
        openChainModal()
        return
      }
      if (!walletClient) {
        return
      }
      const pointsContract = ZkBingoPointsContract(chainId, env, undefined, walletClient)
      if (!pointsContract) {
        if (!pointsContract) {
          setErrorToast(dispatch, 'PointsContract is not ready')
        }
        setDialogOpen(true)
        return
      }
      setIsClaimLoading(true)
      const res = await pointsContract.write.freeClaim({
        account: account
      })
      const hash = typeof res === 'string' ? res : res.hash
      const claimTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
      if (claimTx && claimTx.status === txStatus) {
        postAccountUpdate({ tx: claimTx })
        setRefreshBalanceState(refreshBalance + 1)
        setSuccessToast(dispatch, { title: '', message: 'Claim successful' })
        setDayClaimed(true)
      } else {
        throw Object.assign(new Error('Claim Transaction Failed'), { name: 'Claim' })
      }
    } catch (e) {
      setErrorToast(dispatch, e)
      console.error('claimHandle: ', e)
    } finally {
      setIsClaimLoading(false)
    }
  }, [openChainModal, account, chainId, refreshBalance, walletClient])
  return {
    pointsStr,
    dayClaimed,
    claimHandle,
    isClaimLoading,
    claimConfKey
  }
}
const useClaimType = ({
  setClaimType,
  bingoLobbyContractStatic
}: {
  bingoLobbyContractStatic: IBingoLobbyContractStatic
  setClaimType: React.Dispatch<React.SetStateAction<IClaimType | undefined>>
}): void => {
  const get = useCallback(async () => {
    try {
      if (!bingoLobbyContractStatic?.claimStartTime) {
        return
      }
      const utcSeconds = getUTCSeconds()
      const FREE_DURATION = 14 * 24 * 60 * 60
      if (utcSeconds <= bingoLobbyContractStatic?.claimStartTime + FREE_DURATION) {
        setClaimType(IClaimType.FREE)
      } else {
        setClaimType(IClaimType.SIGNIN)
      }
    } catch (error) {
      console.error('', error)
    }
  }, [bingoLobbyContractStatic?.claimStartTime])
  useEffect(() => {
    get()
  }, [bingoLobbyContractStatic?.claimStartTime])
}
// 获取 boxBalance 是不是0
const useBoxBalance = ({
  setBoxBalance,
  blindBoxAddress
}: {
  blindBoxAddress?: Address
  setBoxBalance: React.Dispatch<React.SetStateAction<string | undefined>>
}): void => {
  const { account, chainId } = useActiveWeb3React()
  const get = useCallback(async () => {
    try {
      if (!blindBoxAddress || !chainId) {
        return
      }
      const erc20 = erc20Contract(chainId, env, blindBoxAddress)
      // const blindBoxAddressContract = await erc20Contract(blindBoxAddress)
      const balance = await erc20?.read.balanceOf([account])
      const balanceStr = new BigNumberjs(balance).toString()
      setBoxBalance(balanceStr)
    } catch (error) {
      console.error('useBoxBalance: ', error)
    }
  }, [blindBoxAddress])
  useEffect(() => {
    if (account) {
      get()
    }
  }, [blindBoxAddress])
}
const useShowPoint = ({
  boxBalance,
  claimType,
  setPointsStr,
  setClaimConfKey
}: {
  boxBalance?: string
  claimType?: IClaimType
  setPointsStr: React.Dispatch<React.SetStateAction<string>>
  setClaimConfKey: React.Dispatch<React.SetStateAction<IClaimConfKey | undefined>> | undefined
}): void => {
  const [points, setPoints] = useState<string>('5000')
  useEffect(() => {
    if (claimType === undefined || !boxBalance) {
      return
    }
    const key = boxBalance === '0' ? IClaimConfKey.ordinary : IClaimConfKey.princely
    setClaimConfKey ? setClaimConfKey(key) : null
    const claimConf = claimConfsDefault[claimType]?.['1']
    if (claimConf && claimConf[key]) {
      setPoints(ethers.utils.formatEther(claimConf[key]).toString())
    } else {
      setPoints('-')
    }
  }, [boxBalance, claimType, setPointsStr])
  useEffect(() => {
    setPointsStr(formatMoney(Number(points)))
  }, [points])
}
