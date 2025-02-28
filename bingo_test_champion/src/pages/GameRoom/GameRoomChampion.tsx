import './index.css'
import '../index.stylus'

import {
  addressIsEqual,
  ChainRpcUrls,
  getProvider,
  LngNs,
  RefreshState,
  txStatus,
  useAaWallet,
  useAccountInvitation,
  useCustomTranslation,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from '@ui/src'
import { Col, Row } from 'antd'
import { sample } from 'lodash'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TransactionReceipt } from 'viem'

import { gasPrice } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import useAudioManager from '@/hooks/useAudioManager'
import { useBingoVersion } from '@/hooks/useBingoVersion'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import useGetGameInfoChampion from '@/hooks/useGetGameInfoChampion'
import { gameRoomState, joinGameState, startGameStep } from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import getBingoLines from '@/utils/getBingoLines'
import { toBingoHref, toBingoPlayHref } from '@/utils/toBingoHref'

import { OvertimeModal } from '../components/Modal'
import GameBoard from './components/GameBoard'
import GameRules from './components/GameRules'
import Loading from './components/Loading'
import PlayersAvatar from './components/PlayersAvatar'
import { useGameLogic } from './hooks/useGameLogic'
import css from './index.module.stylus'
import ResultModalChampion from './resultModalChampion'

const GameRoom: React.FC = () => {
  useBingoVersion()
  const { chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const navigate = useNavigate()
  const [{ cardNumbers }] = useRecoilState(gameRoomState)
  const { id: gameId } = useParams()
  const isMobile = useIsW768()
  const joinGame = useRecoilValue(joinGameState)
  const { roomInfo } = useGetGameInfoChampion(gameId)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const [winner, setWinner] = useState('') //
  const [percent, setPercent] = useState(0)
  const { turnSound, playLoseSound, playWinSound, buttonClickSound, backgroundMusic, colseBackgroundMusic } = useAudioManager()
  const [isPercent, setIsPercent] = useState(false)
  const [showTurn, setShowTurn] = useState(false)
  const { postAccountUpdate } = useAccountInvitation(env)
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { aa_mm_address: account, aaWalletClient: walletClient } = useAaWallet()
  const { t } = useCustomTranslation([LngNs.zBingo])
  const chainIdParams = useChainIdParams()
  const setRefreshState = useSetRecoilState(RefreshState)
  const round = useMemo<number>(() => (roomInfo?.players ? Math.ceil(roomInfo.round / roomInfo.players.length) || 0 : 0), [JSON.stringify(roomInfo)])
  const selectedNumbers = useMemo(() => roomInfo.selectedNumbers, [JSON.stringify(roomInfo)])
  const isOvertime = useMemo(() => roomInfo.status, [JSON.stringify(roomInfo)])
  const isControllerEnabled = useMemo<boolean>(() => addressIsEqual(roomInfo.player, account ?? ''), [roomInfo.player, account])
  const { pending, matchLines, cardNums, handleBingo } = useGameLogic(gameId, cardNumbers, selectedNumbers, env)

  const Win = useCallback(async () => {
    try {
      if (!!winner) {
        setRefreshState(pre => pre + 1)
        colseBackgroundMusic()
        if (addressIsEqual(account, winner)) {
          playWinSound()
        } else {
          playLoseSound()
        }
      }
    } catch {}
  }, [account, winner])
  useEffect(() => {
    Win()
  }, [account, winner])

  useEffect(() => {
    backgroundMusic()
    return () => {
      colseBackgroundMusic()
    }
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      // 取消关闭页面
      event.preventDefault()
      // Chrome需要在返回值中添加一个返回语句
      event.returnValue = ''

      // 显示确认提示框
      const confirmationMessage = 'Are you sure you want to leave this page?'
      event.returnValue = confirmationMessage
      return confirmationMessage
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
  const percentTimerRef = useRef<NodeJS.Timer>()
  useEffect(() => {
    if (percent < 100) {
      percentTimerRef.current = setInterval(() => {
        setPercent(newPercent => newPercent + 20)
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (percent >= 100) {
      setIsPercent(true)
      percentTimerRef.current && clearInterval(percentTimerRef.current)
    }
  }, [percent])

  const handleMarkNumber = useCallback(
    async (markedNum: number) => {
      if (!chainId || !walletClient) {
        return
      }
      buttonClickSound()
      const lobbyContract = bingoLobby({
        chainId,
        env,
        walletClient,
        bingoVersion
      })
      try {
        const nextLines = getBingoLines([...selectedNumbers, markedNum], cardNumbers)
        if (nextLines.length >= 2) {
          await handleSelectAndBingo(markedNum)
        } else {
          const txnReceipt = await lobbyContract.write.selectNumber([gameId, markedNum], {
            account: account,
            maxFeePerGas: gasPrice[chainId],
            maxPriorityFeePerGas: gasPrice[chainId]
          })
          const hash = typeof txnReceipt === 'string' ? txnReceipt : txnReceipt.hash
          const selectNumberTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
          if (selectNumberTx && selectNumberTx.status === txStatus) {
            postAccountUpdate({ tx: selectNumberTx })
          } else {
            throw Object.assign(new Error('SelectNumber Failed'), {
              name: 'SelectNumber'
            })
          }
        }
      } catch (error) {
        setErrorToast(error, lobbyContract)
        console.error('handleMarkNumber error', error)
      } finally {
      }
    },
    [account, chainId, bingoVersion, selectedNumbers, cardNumbers, walletClient]
  )

  const handleSelectAndBingo = async (markedNum: number | string) => {
    if (!chainId || !walletClient) {
      return
    }
    const lobbyContract = bingoLobby({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      const txnReceipt = await lobbyContract.write.selectAndBingo([gameId, markedNum, cardNums, joinGame.signedLabel], {
        account: account,
        gas: gasPrice[chainId],
        maxFeePerGas: gasPrice[chainId],
        maxPriorityFeePerGas: gasPrice[chainId]
      })
      const hash = typeof txnReceipt === 'string' ? txnReceipt : txnReceipt.hash
      const selectAndBingoTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
      if (selectAndBingoTx && selectAndBingoTx.status === txStatus) {
        postAccountUpdate({ tx: selectAndBingoTx })
      } else {
        throw Object.assign(new Error('SelectAndBingo Failed'), {
          name: 'SelectAndBingo'
        })
      }
    } catch (error) {
      console.log({ error })
      setErrorToast(error, lobbyContract)
    }
  }
  const setCurrentStep = useSetRecoilState(startGameStep)
  const toBingoPage = useCallback(() => {
    resetGameRoom()
    setCurrentStep(0)
    toBingoHref({ chainIdParams, navigate })
  }, [navigate, chainIdParams])
  const toBingoPlayPage = useCallback(() => {
    resetGameRoom()
    setCurrentStep(0)
    toBingoPlayHref({
      chainIdParams,
      navigate
    })
  }, [navigate, chainIdParams])

  const bingoRef = useRef<NodeJS.Timer>()
  const handleGameEnd = useCallback(async () => {
    if (!chainId || !account) {
      return
    }
    const provider = await getProvider(sample(ChainRpcUrls[chainId]))
    bingoRef.current = setInterval(async () => {
      const lobbyContract = await bingoLobbyFromRpc({
        chainId,
        bingoVersion,
        library: provider,
        account
      })
      const gameInfo = await lobbyContract.functions.getGameInfo(gameId)
      if (gameInfo.status === 'end') {
        setWinner(gameInfo.winner)
        bingoRef.current && clearInterval(bingoRef.current)
      }
    }, 1000)
  }, [account, chainId])

  useEffect(() => {
    handleGameEnd()

    return () => {
      bingoRef.current && clearInterval(bingoRef.current)
    }
  }, [handleGameEnd])
  useEffect(() => {
    if (isControllerEnabled && isPercent) {
      setShowTurn(true)
      turnSound()
      setTimeout(() => {
        setShowTurn(false)
      }, 1500)
    }
  }, [isControllerEnabled, isPercent])
  if (percent < 100) {
    return <Loading percent={percent} isMobile={isMobile} />
  }

  return (
    <div className={css.gameRoomCard}>
      {showTurn && <div className={css.playerTurn}>{t('Round number', { number: round })}</div>}
      <Row gutter={isMobile ? [10, 10] : [20, 20]}>
        {!isMobile && (
          <Col span={7}>
            <PlayersAvatar player={roomInfo.player} players={roomInfo.players} account={account} />
          </Col>
        )}

        <GameBoard
          isMobile={isMobile}
          cardNumbers={cardNumbers}
          isControllerEnabled={isControllerEnabled}
          round={round}
          selectedNumbers={selectedNumbers}
          onMarkNumber={handleMarkNumber}
          matchLines={matchLines}
          pending={pending}
          onBingo={handleBingo}
          players={roomInfo.players}
          player={roomInfo.player}
        />

        {!isMobile && (
          <Col span={7}>
            <GameRules roomInfo={roomInfo} />
          </Col>
        )}
      </Row>

      <OvertimeModal open={isOvertime === 'overtime'} onCancel={toBingoPage} onClose={toBingoPage} />

      <ResultModalChampion winner={winner} open={!!winner} />
    </div>
  )
}
export default GameRoom
