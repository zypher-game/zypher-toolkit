import {
  ChainRpcUrls,
  getProvider,
  txStatus,
  useAccountInvitation,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useResetRecoilState,
  useWalletHandler
} from '@ui/src'
import { sample } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionReceipt } from 'viem'

import { gasPrice } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import useRestoreGame from '@/hooks/useRestoreGame'
import { gameRoomState, IBingoVersion, showCloseModalState, startGameStep } from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { toBingoHref, toBingoPlayHref } from '@/utils/toBingoHref'

import { ConfirmCloseModal, TipsModal, TipsOkModal } from '../Modal'

const StartGameDialog = memo(() => {
  const [showCloseModal, setShowCloseModal] = useRecoilState(showCloseModalState)
  const [gameTimeState, setGameTimeState] = useState(false)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [, setCurrentStep] = useRecoilState(startGameStep)
  const { gameTime, isPlaying, gameId } = useRestoreGame()
  const [playingState, setPlayingState] = useState(isPlaying)
  const [{ cardNumbers }] = useRecoilState(gameRoomState)
  const [modalLoading, setModalLoading] = useState(false)
  const walletClient = useWalletHandler()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const chainIdParams = useChainIdParams()
  const navigate = useNavigate()

  const { postAccountUpdate } = useAccountInvitation(env)

  useEffect(() => {
    setPlayingState(isPlaying && cardNumbers.length >= 1)
  }, [isPlaying, gameTime, cardNumbers])
  useEffect(() => {
    setGameTimeState(gameTime > 0 && cardNumbers.length < 1)
  }, [cardNumbers, gameTime, bingoVersion])

  const onCloseModal = useCallback(async () => {
    setModalLoading(true)
    if (!chainId || !account || !walletClient) {
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
        account
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
  }, [account, chainId, walletClient, bingoVersion])
  const onExitQueue = async () => {
    setModalLoading(true)
    if (!chainId || !account || !walletClient) {
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
        account
      })
      const rres = await bingoLobbyContract.functions.lineupUsers()
      let lineupUsers: string[] = []
      if (bingoVersion === IBingoVersion.v1) {
        lineupUsers = rres[1]
      } else {
        lineupUsers = rres[0]
      }
      if (lineupUsers.includes(account)) {
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
    setCurrentStep(0)
    toBingoHref({ chainIdParams, navigate, pathname: location.pathname })
  }, [navigate, location, chainIdParams])
  const toBingoPlayHrefHandle = useCallback(() => {
    setCurrentStep(0)
    toBingoPlayHref({ chainIdParams, navigate, pathname: location.pathname })
  }, [navigate, location, chainIdParams])
  return (
    <>
      <TipsModal
        open={playingState && (cardNumbers.length > 1 || bingoVersion === IBingoVersion.beta)}
        closeLoading={modalLoading}
        onClose={onCloseModal}
        onCancel={() =>
          toBingoPlayHref({
            chainIdParams,
            navigate: navigate,
            path: `/${gameId}/gameRoom`
          })
        }
        onBlack={() => toBingoPage()}
      />
      <TipsOkModal
        closeLoading={modalLoading}
        open={gameTimeState}
        onBlack={() => toBingoPage()}
        onClose={() => toBingoPlayHrefHandle()}
        onCancel={onCloseModal}
      />
      <ConfirmCloseModal open={showCloseModal} closeLoading={modalLoading} onClose={onExitQueue} onCancel={() => setShowCloseModal(false)} />
    </>
  )
})
export default StartGameDialog
