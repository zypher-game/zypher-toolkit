import {
  ChainRpcUrls,
  getProvider,
  txStatus,
  useAaWallet,
  useAccountInvitation,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useResetRecoilState
} from '@ui/src'
import { isEqual, sample } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionReceipt } from 'viem'

import { gasPrice } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import useRestoreGame from '@/hooks/useRestoreGame'
import {
  gameRoomState,
  IBingoVersion,
  showCloseModalState,
  showModalState,
  showTipModalState,
  showTipOkModalState,
  startGameStep
} from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { toBingoHref, toBingoPlayHref } from '@/utils/toBingoHref'

import { ConfirmCloseModal, TipsModal, TipsOkModal } from '../Modal'

const StartGameDialog = memo(({ isFromIndex }: { isFromIndex: boolean }) => {
  const [showModal, setShowModal] = useRecoilState(showModalState)
  const [showTipModal, setShowTipModal] = useRecoilState(showTipModalState)
  const [showTipsOkModal, setShowTipsOkModal] = useRecoilState(showTipOkModalState)
  const [showCloseModal, setShowCloseModal] = useRecoilState(showCloseModalState)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [, setCurrentStep] = useRecoilState(startGameStep)
  const { gameTime, isPlaying, gameId } = useRestoreGame()
  const [playingState, setPlayingState] = useState(isPlaying)
  const [{ cardNumbers }] = useRecoilState(gameRoomState)
  const [modalLoading, setModalLoading] = useState(false)
  const { aaWalletClient: walletClient, aa_mm_address } = useAaWallet()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const chainIdParams = useChainIdParams()
  const navigate = useNavigate()
  const { postAccountUpdate } = useAccountInvitation(env)
  useEffect(() => {
    const bool = playingState && (cardNumbers.length > 1 || bingoVersion === IBingoVersion.beta)
    setShowTipModal(bool)
    setShowModal(bool)
  }, [playingState, JSON.stringify(cardNumbers)])
  useEffect(() => {
    const bool = gameTime > 0 && cardNumbers.length < 1
    setShowTipsOkModal(bool)
    setShowModal(bool)
  }, [cardNumbers, gameTime, bingoVersion])
  useEffect(() => {
    const bool = playingState && (cardNumbers.length > 1 || bingoVersion === IBingoVersion.beta)
    setShowTipModal(bool)
    setShowModal(bool)
  }, [playingState, JSON.stringify(cardNumbers)])
  useEffect(() => {
    setPlayingState(isPlaying && cardNumbers.length >= 1)
  }, [isPlaying, gameTime, cardNumbers])

  const onCloseModal = useCallback(async () => {
    setModalLoading(true)
    if (!chainId || !account || !aa_mm_address || !walletClient) {
      setModalLoading(false)
      return
    }
    const lobbyContract = bingoLobby({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({
        chainId,
        bingoVersion,
        library: provider,
        account: aa_mm_address
      })
      const rres = await bingoLobbyContract.functions.lineupUsers()
      let lineupUsers: string[] = []
      if (bingoVersion === IBingoVersion.v1) {
        lineupUsers = rres[1] // []
      } else {
        lineupUsers = rres[0]
      }
      if (lineupUsers.map((v: string) => v.toLowerCase()).includes(account.toLowerCase())) {
        const txn = await lobbyContract.write.leave({
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
        const hash = typeof txn === 'string' ? txn : txn.hash
        const leaveTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (leaveTx && leaveTx.status === txStatus) {
          postAccountUpdate({ tx: leaveTx })
        } else {
          throw Object.assign(new Error('Leave Transaction Failed'), {
            name: 'Leave'
          })
        }
        setModalLoading(false)
        resetGameRoom()
        toBingoPlayHrefHandle()
        return
      }
      if (bingoVersion === IBingoVersion.v1) {
        const txn = await lobbyContract.write.abandon([gameId], {
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
        const hash = typeof txn === 'string' ? txn : txn.hash
        const leaveLx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (leaveLx && leaveLx.status === txStatus) {
          postAccountUpdate({ tx: leaveLx })
        } else {
          throw Object.assign(new Error('Leave  Failed'), { name: 'Leave' })
        }
      }
      setModalLoading(false)
      resetGameRoom()
      toBingoPlayHrefHandle()
    } catch (e: any) {
      setModalLoading(false)
      setErrorToast(e, lobbyContract)
    }
  }, [account, aa_mm_address, chainId, walletClient, bingoVersion])
  const onExitQueue = async () => {
    setModalLoading(true)
    if (!chainId || !account || !aa_mm_address || !walletClient) {
      setModalLoading(false)
      return
    }
    const lobbyContract = bingoLobby({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({
        chainId,
        bingoVersion,
        library: provider,
        account: aa_mm_address
      })
      const rres = await bingoLobbyContract.functions.lineupUsers()
      let lineupUsers: string[] = []
      if (bingoVersion === IBingoVersion.v1) {
        lineupUsers = rres[1]
      } else {
        lineupUsers = rres[0]
      }
      if (lineupUsers.includes(aa_mm_address)) {
        const txn = await lobbyContract.write.leave({
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
        const hash = typeof txn === 'string' ? txn : txn.hash
        const leaveTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (leaveTx && leaveTx.status === txStatus) {
          postAccountUpdate({ tx: leaveTx })
        } else {
          throw Object.assign(new Error('Leave Transaction Failed'), {
            name: 'Leave'
          })
        }
        setShowCloseModal(false)
        setModalLoading(false)
        toBingoPage()
        return
      } else {
        setShowCloseModal(false)
        setModalLoading(false)
        toBingoPage()
      }
    } catch (e: any) {
      setModalLoading(false)
      setShowCloseModal(false)
      setErrorToast(e, lobbyContract)
    }
  }

  const toBingoPage = useCallback(() => {
    if (!isFromIndex) {
      setCurrentStep(0)
      toBingoHref({ chainIdParams, navigate, pathname: location.pathname })
    } else {
      setShowModal(false)
    }
  }, [navigate, location, isFromIndex, chainIdParams])
  const toBingoPlayHrefHandle = useCallback(() => {
    setCurrentStep(0)
    toBingoPlayHref({ chainIdParams, navigate, pathname: location.pathname })
  }, [navigate, location, chainIdParams])
  return (
    <>
      <TipsModal
        open={showModal && showTipModal}
        closeLoading={modalLoading}
        onClose={onCloseModal}
        onCancel={() => {
          toBingoPlayHref({
            chainIdParams,
            navigate: navigate,
            path: `/${gameId}/gameRoom`
          })
        }}
        onBlack={toBingoPage}
      />
      <TipsOkModal
        closeLoading={modalLoading}
        open={showModal && showTipsOkModal}
        onBlack={toBingoPage}
        onClose={() => toBingoPlayHrefHandle()}
        onCancel={onCloseModal}
      />
      <ConfirmCloseModal open={showCloseModal} closeLoading={modalLoading} onClose={onExitQueue} onCancel={() => setShowCloseModal(false)} />
    </>
  )
}, isEqual)
export default StartGameDialog
