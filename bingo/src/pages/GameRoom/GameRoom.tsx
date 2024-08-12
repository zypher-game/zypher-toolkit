import './index.css'
import '../index.stylus'

import { ExclamationCircleOutlined } from '@ant-design/icons'
import { LoadingOutlined } from '@ant-design/icons'
import {
  ChainRpcUrls,
  getProvider,
  getShortenAddress,
  GlobalVar,
  httpPost,
  LngNs,
  PlayerAvatarList as PlayerAvatar,
  preStaticUrl,
  request,
  TG_BOT_URL,
  txStatus,
  useAccountInvitation,
  useCurrentLanguage,
  useCustomTranslation,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
  useWalletClient
} from '@ui/src'
import { Col, Progress, Row, Space, Tooltip } from 'antd'
import { sample } from 'lodash'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Trans } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { TransactionReceipt } from 'viem'

import BingoController from '@/components/BingoController'
import { gasPrice, gradeData } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import useAudioManager from '@/hooks/useAudioManager'
import { useBingoVersion } from '@/hooks/useBingoVersion'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import useGetGameInfoV1 from '@/hooks/useGetGameInfoV1'
import { gameRoomState, IBingoVersion, joinGameState, startGameStep } from '@/pages/state/state'
import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import getBingoLines from '@/utils/getBingoLines'
import { toBingoHref, toBingoPlayHref } from '@/utils/toBingoHref'

import { ButtonPrimary } from '../components/Button'
import InputValue from '../components/GameRules/inputValue'
import { GradeModal, OvertimeModal } from '../components/Modal'
import ControllerMenu from './components/ControllerMenu'
import AvatarGroup from './components/MAvatarGroup'
import RoundTitle from './components/roundTitle'
import css from './index.module.stylus'
import ResultModal from './resultModal'

const RoundTip = styled.div<{ isMobile: boolean }>`
  div {
    text-align: center;
    font-size: ${({ isMobile }) => (isMobile ? '12px' : '14px ')};
    color: #804700;

    width: ${({ isMobile }) => isMobile && '199px'};
    margin: 0 auto;
    font-weight: 600;
    line-height: ${({ isMobile }) => (isMobile ? '14px' : '27px')};
    padding: ${({ isMobile }) => isMobile && '11px 0 8px'};
    span {
      color: #367e00;
    }
  }
`

const GameCheckerBoard = styled.div<{ isMobile: boolean }>`
  border-radius: ${({ isMobile }) => (isMobile ? '50px' : '72px ')};
  padding-top: ${({ isMobile }) => (isMobile ? '10px' : '20px ')};
  background: radial-gradient(60.29% 8.91% at 49.84% -4.99%, #f8a844 0%, #ca7c16 100%);
`
const GamePadding = styled.div<{ isMobile: boolean }>`
  border-radius: ${({ isMobile }) => (isMobile ? '42px' : '60px ')};

  background: #eabf6e;
  padding: ${({ isMobile }) => (isMobile ? '15px' : '27px 21px')};
  box-shadow: 0px -0.10000000149011612px 1px 0px #d09528 inset;
`
const GameBackground = styled.div`
  border-radius: 40px;
  background: #99622a;
  padding: 20px 15px;
  height: 581px;
  display: flex-start;
  align-items: ;
  justify-content: center;
  flex-wrap: wrap;
  box-shadow: 0px 7px 0px 0px rgba(0, 0, 0, 0.25) inset, 0px 1px 0px 0px #f5cb89 inset, 0px -7px 0px 0px #ffe0a6 inset;
  @media (max-width: 768px) {
    height: auto;
  }
`
const Title = styled.div`
  color: #fff0cf;
  text-shadow: -1.5px -1px 0px #3b2d1a;
  font-weight: 600;
  font-size: 20px;
`
const RulesCard = styled.div`
  border-radius: 24.023px;
  background: #613c17;
  margin-top: 10px;
  box-shadow: 0px -1px 0px 0px #bf905b inset;

  font-size: 16px;
  line-height: 30px;
  padding: 10px 18px;
  .rules-label {
    color: rgba(255, 240, 207, 0.6);
  }
  .rules-value {
    color: #fff0cf;
  }
  .rules-amounrt-value {
    color: #db5f16;

    font-size: 24px;
    padding-bottom: 23px;
  }
`
const PlayersWrapper = styled.div<{ highLight: boolean; leave: boolean }>`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 30px;
  border-color: ${({ highLight }) => (highLight ? '#58d31e' : '#ffd893')};
  border-width: 3px;
  border-style: solid;
  color: #814700;
  width: 100%;
  /* box-shadow: ${({ highLight }) =>
    highLight
      ? '0px -0.10000000149011612px 2px 0px #1a8400 inset'
      : '0px 0px 3px 0px #5f3204, 0px 1px 2px 0px #fffbef inset, 0px -1px 1px 0px #c7852e inset'};*/
  background: linear-gradient(180deg, #fff2d1 0%, #ffd893 100%);
  .players-name {
    font-size: 16px;
  }
  .players-address {
    font-size: 14px;
  }
  opacity: ${({ leave }) => leave && 0.7};
`
const BingoControllerButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  gap: 10px;
`
const MatchLinesWrapper = styled.div<{ isMobile: boolean }>`
  border-color: #ffd690;
  border-width: 3px;
  border-style: solid;

  font-size: ${({ isMobile }) => (isMobile ? '24px' : ' 34px')};
  color: #fff5e1;
  text-shadow: -1px -1.5px 0px #381f05;
  width: ${({ isMobile }) => (isMobile ? '128px' : ' 147px')};
  height: ${({ isMobile }) => (isMobile ? '54px' : ' 80px')};
  line-height: ${({ isMobile }) => (isMobile ? '48px' : ' 74px')};
  text-align: center;
  /* padding: ${({ isMobile }) => (isMobile ? '11px 34px' : ' 13px 29px')}; */
  border-radius: 40px;
  background: #613c17;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.25) inset, 0px 1px 0px 0px #f5cb89 inset, 0px -2px 0px 0px #f9daa6 inset;
`
const PlayerTurn = styled.div<{ lang: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #62380c;
  font-weight: 400;
  font-family: Lemon;
  font-size: 20px;
  width: 100%;
  height: 100%;
  max-width: 633px;
  max-height: 133px;
  padding: 20px;
  z-index: 1;
  background: url(${preStaticUrl + `/img/bingo/player-turn`}_${({ lang }) => lang}.png) no-repeat center;
  background-size: 100% auto;
  @media (max-width: 768px) {
    padding: 40px;
    font-size: 14px;
  }
`
const ControllerWrapper = styled.div<{ isMobile: boolean; IS_TELEGRAM: boolean }>`
  position: absolute;
  top: ${({ isMobile, IS_TELEGRAM }) => (IS_TELEGRAM ? '0px' : isMobile ? '44px' : ' 0px')};
  left: ${({ isMobile }) => (isMobile ? '0px' : ' 40px')};
  z-index: 9998;
  width: ${({ isMobile }) => (isMobile ? '100%' : ' 500px')};
`

const GameRoom: React.FC = () => {
  useBingoVersion()
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const navigate = useNavigate()
  const lang = useCurrentLanguage()
  const [{ cardNumbers }] = useRecoilState(gameRoomState)
  const { id: gameId } = useParams()
  // useGetCurrentRound(gameId)
  const isMobile = useIsW768()
  const joinGame = useRecoilValue(joinGameState)
  const { roomInfo, fetchGameInfo } = useGetGameInfoV1(gameId)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const resetJoinGame = useResetRecoilState(joinGameState)
  const resetGameStep = useResetRecoilState(startGameStep)
  const [winner, setWinner] = useState('') //
  const [percent, setPercent] = useState(0)
  const { turnSound, playLoseSound, playWinSound, buttonClickSound, backgroundMusic, colseBackgroundMusic } = useAudioManager()
  const [ispercent, setIsPercent] = useState(false)
  const [showTurn, setShowTurn] = useState(false)
  const { postAccountUpdate } = useAccountInvitation(env)
  const [pending, setPending] = useState(false)
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { data: walletClient } = useWalletClient()
  const [gamesWon, setWinRate] = useState(0)
  const { t } = useCustomTranslation([LngNs.zBingo])
  const chainIdParams = useChainIdParams()

  const round = useMemo<number>(() => (roomInfo?.players ? Math.ceil(roomInfo.round / roomInfo.players.length) || 0 : 0), [JSON.stringify(roomInfo)])
  const selectedNumbers = useMemo(() => roomInfo.selectedNumbers, [JSON.stringify(roomInfo)])
  const isOvertime = useMemo(() => roomInfo.status, [JSON.stringify(roomInfo)])
  const isControllerEnabled = useMemo<boolean>(
    () => roomInfo.player.toLowerCase() === (account ?? '').toLowerCase(),
    [JSON.stringify(roomInfo), account]
  )
  console.log({ roomInfo })
  const Garde = useMemo(() => {
    if (gamesWon < gradeData[1].minWinCounts) {
      return 1
    } else if (gamesWon < gradeData[2].minWinCounts) {
      return 2
    } else {
      return 3
    }
  }, [gamesWon, gamesWon])
  const [gradeModalOpen, setGradeModalOpen] = useState(false)

  useEffect(() => {
    if (!!winner) {
      colseBackgroundMusic()
      if (account === winner) {
        playWinSound()
      } else {
        playLoseSound()
      }
      httpPost(`${TG_BOT_URL}/bingo/${gameId}/result`)
    }
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
  console.log({ percent, ispercent })
  const matchLines = useMemo(() => {
    return getBingoLines(selectedNumbers, cardNumbers)
  }, [roomInfo])

  const currentStatus = useMemo(() => {
    let playerIdx = (roomInfo.round - 1) % roomInfo.players.length
    let tip
    console.log({ roomInfo: roomInfo.round })
    if (roomInfo.status === 'live') {
      tip = isControllerEnabled ? (
        <div>
          <Trans
            i18nKey="round tip1"
            defaults={t('round tip1')}
            values={{
              number: round
            }}
            components={{ bold: <span /> }}
          />
        </div>
      ) : (
        <div>
          {/* Round<span> {round} </span>! Player<span> {roomInfo.players.findIndex(address => address.user == roundInfo.player) + 1} </span>,choose your
          number to submit! */}
          <Trans
            i18nKey="round tip2"
            defaults={t('round tip2')}
            values={{
              number: round,
              player: roomInfo.players.findIndex(address => address.user.toLowerCase() == roomInfo.player.toLowerCase()) + 1
            }}
            components={{ bold: <span /> }}
          />
        </div>
      )
    }
    const isSynchronizing = roomInfo.players.find(item => {
      console.log({ item })
      if (item.user.toLowerCase() == roomInfo.player.toLowerCase()) {
        return true
      } else {
        return false
      }
    })
    if (!isSynchronizing) {
      playerIdx = (roomInfo.round - 2) % roomInfo.players.length
      tip = <div>{t('Synchronizing')}</div>
    }
    return {
      tip,
      playerIdx
    }
  }, [JSON.stringify(roomInfo), t])

  const cardNums: number[][] = useMemo(() => {
    return cardNumbers.reduce(
      (prev, curr) => {
        prev[curr.row - 1].push(curr.num)
        return prev
      },
      [[], [], [], [], []] as number[][]
    )
  }, [cardNumbers])

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

  const handleBingo = async () => {
    if (!chainId || !walletClient) {
      return
    }
    setPending(true)
    const lobbyContract = bingoLobby({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      const lastInfo = await fetchGameInfo()
      if (lastInfo?.status === 'end') {
        setWinner(lastInfo.winner)
        return
      }
      const txnReceipt = await lobbyContract.write.bingo([gameId, cardNums, joinGame.signedLabel], {
        account: account,
        maxFeePerGas: gasPrice[chainId],
        maxPriorityFeePerGas: gasPrice[chainId]
      })
      const hash = typeof txnReceipt === 'string' ? txnReceipt : txnReceipt.hash
      const bingoTx: TransactionReceipt | undefined = await waitForTransaction({
        confirmations: 1,
        hash
      })
      if (bingoTx && bingoTx.status === txStatus) {
        postAccountUpdate({ tx: bingoTx })
      } else {
        throw Object.assign(new Error('Bingo Failed'), { name: 'Bingo' })
      }
    } catch (error) {
      setErrorToast(error, lobbyContract)
    } finally {
      setPending(false)
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
  const renderPlayersAvatar = () => {
    return roomInfo.players.map((player, playerIndex) => (
      // 产品要求头像绿色的框 不管是不是在上链轮到谁就显示谁的边框
      <PlayersWrapper key={player.user} highLight={roomInfo.player.toLowerCase() === player.user.toLowerCase()} leave={player.isAbandoned}>
        <Space>
          <PlayerAvatar isGreen={roomInfo.player === player.user} account={player.isAbandoned ? '' : player.user} size={'large'} />
          <div>
            <div className="players-name">
              Player {playerIndex + 1} {player.user === account && '(you)'}
              {player.isAbandoned && '(left)'}
            </div>
            <div className="players-address">{player ? getShortenAddress(player.user) : t('waiting')}</div>
          </div>
        </Space>
      </PlayersWrapper>
    ))
  }
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
        if (bingoVersion === IBingoVersion.v1) {
          const [wRate] = await lobbyContract.functions.activeLevels()
          const activeLevels = wRate.toNumber()
          setWinRate(activeLevels)
          if (gameInfo.winner.toLowerCase() === account.toLowerCase()) {
            if (activeLevels === gradeData[1].minWinCounts || activeLevels === gradeData[2].minWinCounts) {
              setGradeModalOpen(true)
            }
          }
        }
        bingoRef.current && clearInterval(bingoRef.current)
      }
    }, 1000)
  }, [account, chainId])
  const handleReset = useCallback(() => {
    resetJoinGame()
    resetGameRoom()
    resetGameStep()
  }, [])

  useEffect(() => {
    handleGameEnd()

    return () => {
      bingoRef.current && clearInterval(bingoRef.current)
    }
  }, [chainId])
  useEffect(() => {
    if (isControllerEnabled && ispercent) {
      setShowTurn(true)
      turnSound()
      setTimeout(() => {
        setShowTurn(false)
      }, 1500)
    }
  }, [isControllerEnabled, ispercent])
  console.log({ isControllerEnabled, ispercent, showTurn })
  if (percent < 100) {
    return (
      <>
        <div className={css.gameHome}>
          <img className={css.loadTitle} src={preStaticUrl + `/img/bingo/loading-title.png`} />
          <div className={css.progressBox}>
            <div className={css.progress}>
              <Progress
                percent={percent}
                showInfo={false}
                strokeWidth={isMobile ? 10 : 30}
                trailColor={'#8E571E'}
                strokeColor={'linear-gradient(180deg, #F0FF44 3.33%, #50A821 54.69%, #268D05 70.3%, #329A10 87.41%, #4CCE22 100%)'}
              />
            </div>
            {/* <div className={css.progressTip}>Loading progress {percent}%</div> */}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <ControllerWrapper isMobile={isMobile} IS_TELEGRAM={GlobalVar.IS_TELEGRAM}>
        <ControllerMenu />
      </ControllerWrapper>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '10px',
          position: 'relative'
        }}
      >
        {showTurn && <PlayerTurn lang={lang}>{t('Round number', { number: round })}</PlayerTurn>}
        <div id="game-room" className={css.gameRoom}>
          <div className={css.board}>
            <RoundTitle round={round} roomInfo={roomInfo} />
          </div>
        </div>
        <Row gutter={[20, 20]} style={{ paddingTop: '20px' }}>
          <Col span={isMobile ? 0 : 7}>
            <GameCheckerBoard isMobile={isMobile}>
              <GamePadding isMobile={isMobile}>
                <GameBackground style={{ display: 'block' }}>{renderPlayersAvatar()}</GameBackground>
              </GamePadding>
            </GameCheckerBoard>
          </Col>
          <Col span={isMobile ? 24 : 10}>
            <GameCheckerBoard isMobile={isMobile}>
              <GamePadding isMobile={isMobile} style={{ paddingTop: 0 }}>
                <RoundTip isMobile={isMobile}>{currentStatus.tip}</RoundTip>
                <GameBackground>
                  <div style={{ flex: 1 }}>
                    <BingoController
                      cardNumbers={cardNumbers}
                      isMyTurn={isControllerEnabled}
                      round={roomInfo.round}
                      selectedNumbers={selectedNumbers}
                      onClick={handleMarkNumber}
                      matchLines={matchLines}
                    />
                    <BingoControllerButtonWrapper>
                      {isMobile ? (
                        <>
                          <AvatarGroup players={roomInfo.players} targetUser={roomInfo.player} border />
                          {matchLines.length < 2 ? (
                            <MatchLinesWrapper isMobile={isMobile}>{matchLines.length} / 2</MatchLinesWrapper>
                          ) : (
                            <ButtonPrimary
                              style={{ height: '53px' }}
                              width={'128px'}
                              borderWidth={'5px'}
                              borderColor="#FFD58F"
                              disabled={matchLines.length < 2 || pending}
                              onClick={handleBingo}
                            >
                              <Space size={10}>
                                <span
                                  style={{
                                    fontSize: '20px',
                                    color: '#E2E2E2',
                                    fontFamily: 'lemon'
                                  }}
                                >
                                  BINGO
                                </span>
                                {pending && <LoadingOutlined />}
                              </Space>
                            </ButtonPrimary>
                          )}
                        </>
                      ) : (
                        <>
                          <MatchLinesWrapper isMobile={isMobile}>{matchLines.length} / 2</MatchLinesWrapper>
                          <ButtonPrimary
                            style={{ height: '80px', flex: 1 }}
                            borderWidth={'5px'}
                            borderColor="#FFD58F"
                            disabled={matchLines.length < 2 || pending}
                            onClick={handleBingo}
                          >
                            <Space size={10}>
                              <span
                                style={{
                                  fontSize: '32px',
                                  color: '#E2E2E2',
                                  fontFamily: 'lemon'
                                }}
                              >
                                BINGO
                              </span>
                              {pending && <LoadingOutlined />}
                            </Space>
                          </ButtonPrimary>
                        </>
                      )}
                    </BingoControllerButtonWrapper>
                  </div>
                </GameBackground>
              </GamePadding>
            </GameCheckerBoard>
          </Col>
          <Col span={isMobile ? 0 : 7}>
            <GameCheckerBoard isMobile={isMobile}>
              <GamePadding isMobile={isMobile}>
                <GameBackground>
                  <div>
                    <Space>
                      <Title>{t('Bingo Rules')}</Title>
                      <Tooltip
                        title={
                          <div>
                            {t('BingoRules01')} 2-5
                            <br />
                            {t('BingoRules0201')}
                            {t('BingoRules0202')}
                            <br />
                            {t('BingoRules0301')}
                            {t('BingoRules0302')}
                            <br />
                            {t('BingoRules04')}
                            <br />
                            {t('BingoRules05')}
                            <br />
                            {t('BingoRules06')}
                          </div>
                        }
                      >
                        <ExclamationCircleOutlined style={{ color: '#FFF0CF' }} />
                      </Tooltip>
                    </Space>
                    <RulesCard>
                      <div className="rules-label">{t('BingoRules0201')}</div>
                      <div className="rules-value">{t('BingoRules0202')}</div>
                      <div className="rules-label">{t('BingoRules0301')}</div>
                      <div className="rules-value">{t('BingoRules0302')}</div>
                    </RulesCard>
                    <RulesCard>
                      <InputValue playersNumber={roomInfo.players.length} betSize={roomInfo.betSize} room color={'#C0A885'} />
                    </RulesCard>
                  </div>
                </GameBackground>
              </GamePadding>
            </GameCheckerBoard>
          </Col>
        </Row>
      </div>
      <OvertimeModal open={isOvertime === 'overtime'} onCancel={toBingoPage} onClose={toBingoPage} />

      <ResultModal
        players={roomInfo.players}
        winner={winner}
        open={!!winner}
        winAmount={roomInfo.winAmount}
        loseAmount={roomInfo.betSize}
        onCancel={() => {
          handleReset()
          toBingoPage()
        }}
        onSubmit={() => {
          handleReset()
          setTimeout(() => toBingoPlayPage(), 0)
        }}
      />
      <GradeModal
        title={t('Congratulations!')}
        content={
          <div>
            <div>{Garde === 2 ? t('CongratulationsRule1') : t('CongratulationsRule2')}</div>
          </div>
        }
        open={gradeModalOpen}
        garde={Garde}
        onCancel={() => setGradeModalOpen(false)}
      />
    </>
  )
}

export default GameRoom
