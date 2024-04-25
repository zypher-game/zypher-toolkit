import {
  ChainId,
  DPSupportChainId,
  erc20Contract,
  IContractName,
  LngNs,
  refreshBalanceState,
  supportedChainIds,
  txStatus,
  useAccountInvitation,
  useActiveWeb3React,
  useChainModal,
  useCustomTranslation,
  usePointsBalanceStr,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useSetRecoilState,
  useWalletClient,
  walletModalOpenState,
  zkBingo
} from '@UI/src/'
import BigNumberjs from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionReceipt } from 'viem'

import MonsterContract from '@/contract/monsterContract'
import { useAppDispatch } from '@/store/hooks'
import { useMonsterState } from '@/store/monster/hooks'
import { fetchAccountMonsterAsync } from '@/store/monster/reducer'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import { toBingoHref } from '@/utils/toBingoHref'

import { buyBattlePassDialogState, receiveAwardDialogState, receiveNftDialogState, refreshMonsterState, tokenIdState } from '../state/monsterState'
import { getTokenId } from '../utils/getTokenId'
import { IMonsterStatus, ImonsterUserStatus } from './monster.types'

export const useMonsterAction = ({
  monsterUserStatus,
  monsterStatus,
  setIsApprove,
  setIsPointBalanceEnough
}: {
  monsterUserStatus: ImonsterUserStatus
  monsterStatus: IMonsterStatus
  setIsApprove: React.Dispatch<React.SetStateAction<boolean>>
  setIsPointBalanceEnough: React.Dispatch<React.SetStateAction<boolean>>
}): {
  isGetNftLoading: boolean
  isBuyNftLoading: boolean
  handleGetNft: () => Promise<void>
  handleOpenBuyBattlePass: () => void
  handleBuyBattlePass: () => Promise<void>
  handleMonsterBottomAction: () => void
} => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const navigate = useNavigate()
  const setBuyBattlePassDialogState = useSetRecoilState(buyBattlePassDialogState)
  const { account, chainId } = useActiveWeb3React()
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const { openChainModal } = useChainModal()
  const { data: walletClient } = useWalletClient()
  const dispatch = useAppDispatch()
  const [isGetNftLoading, setIsGetNftLoading] = useState(false)
  const [isBuyNftLoading, setIsBuyNftLoading] = useState(false)
  const { postAccountUpdate } = useAccountInvitation(env)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { monster } = useMonsterState()
  const setTokenIdStateState = useSetRecoilState(tokenIdState)
  const setReceiveNftDialogOpen = useSetRecoilState(receiveNftDialogState)
  const setReceiveAwardDialogState = useSetRecoilState(receiveAwardDialogState)
  const setRefreshMonsterState = useSetRecoilState(refreshMonsterState)
  const pointsBalanceStr = usePointsBalanceStr()
  useEffect(() => {
    if (chainId && account && walletClient && monster) {
      getApprove()
    }
  }, [chainId, pointsBalanceStr, account, walletClient, monster])
  const getApprove = useCallback(async () => {
    if (chainId && account && walletClient) {
      const pointsAddress = zkBingo(chainId, IContractName.ZypherGameToken)
      const Monster = zkBingo(chainId, IContractName.Monster)
      const pointsContract = erc20Contract(chainId, env, pointsAddress, walletClient)
      const allowance = await pointsContract.read.allowance([account, Monster])
      const balance = await pointsContract.read.balanceOf([account])
      const tokenAmount = monster?.purchasePrice

      if (tokenAmount) {
        if (new BigNumberjs(allowance.toString()).lt(tokenAmount)) {
          setIsApprove(false)
        } else {
          setIsApprove(true)
        }
        if (new BigNumberjs(balance.toString()).gte(tokenAmount)) {
          setIsPointBalanceEnough(true)
        } else {
          setIsPointBalanceEnough(false)
        }
      }
    }
  }, [chainId, account, walletClient, monster])

  const handleGetNft = useCallback(async () => {
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
      if (monsterUserStatus === ImonsterUserStatus.CannotGetCard) {
        return toBingoHref({ navigate })
      }
      if (monsterUserStatus === ImonsterUserStatus.AlreadyHaveACard) {
        return
      }
      const monsterContract = MonsterContract(chainId, env, undefined, walletClient)
      if (!monsterContract) {
        if (!monsterContract) {
          setErrorToast(dispatch, 'monsterContract is not ready')
        }
        setDialogOpen(true)
        return
      }
      if (isGetNftLoading) {
        return
      }
      setIsGetNftLoading(true)
      // 贏 N 場後可以 claim Battle Pass
      const res = await monsterContract.write.claim()
      const hash = typeof res === 'string' ? res : res.hash
      const claimTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
      if (claimTx && claimTx.status === txStatus) {
        // 更新monster
        _successGetNft({
          claimTx,
          blockNumber: new BigNumberjs(claimTx.blockNumber.toString()).toNumber()
        })
        setSuccessToast(dispatch, { title: '', message: 'Claim successful' })
        // get account nft
      } else {
        throw Object.assign(new Error('Claim Transaction Failed'), { name: 'Claim' })
      }
    } catch (e) {
      setErrorToast(dispatch, e)
      console.error('claimHandle: ', e)
    } finally {
      setIsGetNftLoading(false)
    }
  }, [monsterUserStatus, openChainModal, account, chainId, refreshBalance, walletClient])
  // 打开购买model
  const handleOpenBuyBattlePass = useCallback(() => {
    try {
      if (!account) {
        setDialogOpen(true)
        return
      }
      if (openChainModal && !DPSupportChainId.includes(chainId)) {
        openChainModal()
        return
      }
      if (monsterUserStatus === ImonsterUserStatus.AlreadyHaveACard) {
        return
      }
      setBuyBattlePassDialogState(true)
    } catch (e) {
      setErrorToast(dispatch, e)
      console.error('handleOpenBuyBattlePass: ', e)
    } finally {
    }
  }, [monsterUserStatus])
  // 购买model
  const handleBuyBattlePass = useCallback(async () => {
    try {
      if (!walletClient || isBuyNftLoading) {
        return
      }
      setIsBuyNftLoading(true)
      const pointsAddress = zkBingo(chainId, IContractName.ZypherGameToken)
      const pointsContract = erc20Contract(chainId, env, pointsAddress, walletClient)
      const tokenAmount = monster?.purchasePrice
      const Monster = zkBingo(chainId, IContractName.Monster)
      const balance = await pointsContract.read.balanceOf([account])
      const allowance = await pointsContract.read.allowance([account, Monster])
      if (tokenAmount) {
        if (new BigNumberjs(balance.toString()).gte(tokenAmount)) {
          if (new BigNumberjs(allowance.toString()).lt(tokenAmount)) {
            const approveTxn = await pointsContract.write.approve([Monster, tokenAmount], {
              account: account
            })
            const approveTxnHash = typeof approveTxn === 'string' ? approveTxn : approveTxn.hash
            await waitForTransaction({ confirmations: 2, hash: approveTxnHash })
            setIsApprove(true)
            setSuccessToast(dispatch, { title: '', message: t('Approve successful') })
            return
          }
        } else {
          // setBuyBattlePassDialogState(false)
          // setPointsDialogOpen(true)
          return
        }
      }
      const monsterContract = MonsterContract(chainId, env, undefined, walletClient)
      if (!monsterContract) {
        if (!monsterContract) {
          setErrorToast(dispatch, 'monsterContract is not ready')
        }
        setDialogOpen(true)
        return
      }
      // 贏 N 場後可以 claim Battle Pass
      const res = await monsterContract.write.purchase()
      const hash = typeof res === 'string' ? res : res.hash
      const claimTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
      if (claimTx && claimTx.status === txStatus) {
        setBuyBattlePassDialogState(false)
        _successGetNft({
          claimTx,
          blockNumber: new BigNumberjs(claimTx.blockNumber.toString()).toNumber()
        })
        setSuccessToast(dispatch, { title: '', message: `Get ${monster?.name} successful` })
        // get account nft
      } else {
        throw Object.assign(new Error(`Get ${monster?.name} Transaction Failed`), { name: `Get ${monster?.name}` })
      }
    } catch (e) {
      setErrorToast(dispatch, e)
      console.error('handleBuyBattlePass: ', e)
    } finally {
      setIsBuyNftLoading(false)
    }
  }, [walletClient, account, monster, t])
  const _successGetNft = useCallback(
    async ({ claimTx, blockNumber }: { claimTx: TransactionReceipt; blockNumber: number }) => {
      if (chainId && account) {
        postAccountUpdate({ tx: claimTx })
        setRefreshBalanceState(refreshBalance + 1)
        setReceiveNftDialogOpen(true)
        dispatch(fetchAccountMonsterAsync({ chainId: chainId, account }))
        setRefreshMonsterState(refreshBalance + 1)
        const tokenId = await getTokenId({ chainId: chainId, account: account, block: blockNumber })
        if (tokenId) {
          setTokenIdStateState(tokenId)
        }
      }
    },
    [chainId, account]
  )

  const handleMonsterBottomAction = useCallback(() => {
    if (monsterStatus === IMonsterStatus.End) {
      _handleEnd()
    } else if (monsterStatus === IMonsterStatus.Fight) {
      if (monsterUserStatus === ImonsterUserStatus.NoCard || monsterUserStatus === ImonsterUserStatus.CannotGetCard) {
        return setBuyBattlePassDialogState(true)
      }
      return toBingoHref({ navigate })
    }
  }, [monsterUserStatus, navigate, monsterStatus])
  const _handleEnd = useCallback(() => {
    setReceiveAwardDialogState(true)
  }, [])
  return {
    isGetNftLoading,
    isBuyNftLoading,
    handleGetNft,
    handleOpenBuyBattlePass,
    handleBuyBattlePass,
    handleMonsterBottomAction
  }
}
