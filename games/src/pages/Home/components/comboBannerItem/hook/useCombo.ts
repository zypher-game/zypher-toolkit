import {
  ChainId,
  LngNs,
  refreshBalanceState,
  txStatus,
  useAccountInvitation,
  useActiveWeb3React,
  useCustomTranslation,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useSetRecoilState,
  walletModalOpenState
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import CONTRACTS from '@zypher-games/checkin/contracts.json'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionReceipt } from 'viem'
import { useSwitchNetwork, useWalletClient } from 'wagmi'

import { GlobalVar } from '@ui/src'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import { CheckInContract, RewardContract } from './contract'
import { comboBannerDialogState, comboCheckInStatusState } from './state'

export type IStatus = {
  canCheckin: boolean
  canClaim: boolean
  isClaimed: boolean
  checked: string[]
  claimedAt: string
}
export const useCombo = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(comboBannerDialogState)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const [status, setStatus] = useRecoilState<IStatus>(comboCheckInStatusState)
  const { switchNetwork } = useSwitchNetwork()
  const { account, chainId } = useActiveWeb3React()
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { postAccountUpdate } = useAccountInvitation(env)
  const { data: walletClient } = useWalletClient()
  const [checkInLoading, setCheckInLoading] = useState(false)
  const { t } = useCustomTranslation([LngNs.home])
  const getData = useCallback(async () => {
    if (account && chainId && [ChainId.Combo, ChainId.ComboTestnet].includes(chainId)) {
      const contract: any = CheckInContract({ chainId })
      if (contract) {
        const statusSource = await contract.read.status([account])
        const claimedAt = new BigNumberJs(statusSource.claimedAt).toFixed()
        const statusR = {
          ...statusSource,
          canClaim: (statusSource.canCheckin || statusSource.canClaim) && statusSource.checked.length === 2 ? true : false,
          checked: statusSource.checked.map((v: any) => new BigNumberJs(v).toFixed()),
          claimedAt: claimedAt,
          isClaimed: claimedAt !== '0'
        }
        if (!isEqual(statusR, status)) {
          setStatus(statusR)
        }
      }
    }
  }, [account, chainId, JSON.stringify(status)])
  useEffect(() => {
    if (chainId && account) {
      getData()
    }
  }, [chainId, account])
  const preHandleAction = useCallback(() => {
    if (switchNetwork && ![ChainId.Combo, ChainId.ComboTestnet].includes(chainId)) {
      switchNetwork(parseInt(ChainId.Combo))
      return
    }
    if (!account) {
      setDialogOpen(true)
      return
    }
    return true
  }, [account, chainId, switchNetwork])
  const comboBannerClickHandle = useCallback(() => {
    const isOk = preHandleAction()
    if (isOk) {
      setIsModalOpen(true)
    }
  }, [account, chainId, switchNetwork])
  const [Text, forbidcss] = useMemo(() => {
    if (status.canClaim) {
      return [t('Claim'), false]
    }
    if (status.isClaimed) {
      return [isModalOpen ? t('View in Element') : t('View My zBox'), false]
    }
    if (status.canCheckin) {
      return [t('CHECK-IN'), false]
    } else {
      return [t('Checked in'), true]
    }
  }, [isModalOpen, JSON.stringify(status), t])
  const checkInHandle = useCallback(async () => {
    try {
      const isOk = preHandleAction()
      if (checkInLoading) {
        return
      }
      if (isOk && walletClient) {
        if (!status.isClaimed) {
          const contract: any = CheckInContract({ chainId, signer: walletClient })
          if (contract) {
            setCheckInLoading(true)
            const res = await contract.write.checkin()
            const hash = typeof res === 'string' ? res : res.hash
            const stakeLockTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
            if (stakeLockTx && stakeLockTx.status === txStatus) {
              _successCheckIn({
                tx: stakeLockTx,
                blockNumber: new BigNumberJs(stakeLockTx.blockNumber.toString()).toNumber()
              })
              setSuccessToast({ title: '', message: 'CheckIn successful' })
            } else {
              setCheckInLoading(false)
              throw Object.assign(new Error('CheckIn Transaction Failed'), { name: 'CheckIn' })
            }
          }
        } else {
          if (account) {
            try {
              const ADDRESS = CONTRACTS[chainId].Reward.address
              const rewardContract: any = RewardContract({ chainId, signer: walletClient })
              const tokenOfOwnerByIndex = await rewardContract.read.tokenOfOwnerByIndex([account, 0])
              window.open(`https://havenmarket.xyz/assets/${ADDRESS}/${new BigNumberJs(tokenOfOwnerByIndex).toFixed()}`)
            } catch {
              window.open('https://havenmarket.xyz/')
            }
          }
        }
      }
    } catch (err: any) {
      setCheckInLoading(false)
      setErrorToast(err)
    }
  }, [checkInLoading, JSON.stringify(status), account, chainId, walletClient])
  const _successCheckIn = useCallback(
    async ({ tx }: { tx: TransactionReceipt; blockNumber: number }) => {
      if (chainId && account) {
        getData()
        setIsModalOpen(false)
        postAccountUpdate({ tx: tx })
        setRefreshBalanceState(refreshBalance + 1)
        setCheckInLoading(false)
      }
    },
    [chainId, account]
  )
  return {
    status,
    comboBannerClickHandle,
    checkInHandle,
    Text: Text,
    forbidcss: forbidcss,
    checkInLoading
  }
}
