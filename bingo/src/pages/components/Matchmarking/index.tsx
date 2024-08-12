import { LoadingOutlined } from '@ant-design/icons'
import {
  ChainRpcUrls,
  getProvider,
  LngNs,
  preStaticUrl,
  SvgComponent,
  txStatus,
  useAccountInvitation,
  useCustomTranslation,
  useIsW768,
  useRecoilState
} from '@ui/src'
import { usePublicNodeWaitForTransaction } from '@ui/src'
import { useWalletClient } from '@ui/src'
import { Col, Row, Space } from 'antd'
import cx from 'classnames'
import { sample } from 'lodash'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { TransactionReceipt } from 'viem'

import BingoBoardView from '@/components/BingoBoardView'
import BingoPlayerAvatar from '@/components/BingoPlayerAvatar/BingoPlayerAvatar'
import { gasPrice } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import useIntervalAsync from '@/hooks/useIntervalAsync'
import useRestoreGame from '@/hooks/useRestoreGame'
import { ButtonPrimary } from '@/pages/components/Button'
import { gameRoomState, IBingoVersion, joinGameState } from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { toBingoPlayHref } from '@/utils/toBingoHref'

import css from './index.module.stylus'

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const CardBack = styled.div<{ isMobile: boolean }>`
  cursor: pointer;
  width: 350px;
  padding: 34px 84px;
  padding-left: ${({ isMobile }) => isMobile && '25px'};
  padding-bottom: ${({ isMobile }) => isMobile && '0px'};
  font-size: 16px;
  color: #613c17;
`
const FlexCenter = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'left')};
`

const IconRotate = styled(SvgComponent)`
  animation: ${rotateAnimation} 3s linear infinite;
`
const LineupUsersWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ isMobile }) => (isMobile ? '5px' : '30px')};
  flex-wrap: wrap;
  .lineup-users-item {
    width: ${({ isMobile }) => (isMobile ? '79px' : '100px')};
    img {
      border: 1px solid #62380c;
    }
    p {
      font-size: ${({ isMobile }) => isMobile && '12px'};
      color: #62380c;
      font-weight: 400;
      font-family: Lemon;
    }
  }
`
const BingoCardView = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '294px' : '356px')};
  height: ${({ isMobile }) => (isMobile ? '329px' : '399px')};
  padding: ${({ isMobile }) => (isMobile ? '15px' : '20px')};
  margin-top: 15px;
`

interface IMatchmarking {
  disabled?: boolean
}

const Matchmarking: React.FC<IMatchmarking> = ({ disabled }) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const navigate = useNavigate()
  const isMobile = useIsW768()
  const [gameRoom, setGameRoom] = useRecoilState(gameRoomState)
  const [pending, setPending] = useState(false)
  const [joinGame, setJoinGameState] = useRecoilState(joinGameState)
  const { postAccountUpdate } = useAccountInvitation(env)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [isCard, setIsCard] = useState(false)
  const { data: walletClient } = useWalletClient()
  const { isPlaying, gameId } = useRestoreGame()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const chainIdParams = useChainIdParams()
  useIntervalAsync(async () => {
    if (!chainId || !account || !walletClient) {
      return
    }
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
    setJoinGameState(game => ({
      ...game,
      lineupUsers
    }))
    const curBlock = await provider.getBlockNumber()
    const filter = bingoLobbyContract.filters.GameStarted()
    const events = await bingoLobbyContract.queryFilter(filter, curBlock - 10)
    const myEvents = events.filter(event => {
      const [list] = (event.args || []).slice(-1)
      return list.includes(account) as Event
    })
    const [event] = myEvents
    if (event) {
      const [id, cardContract, lineupUser] = event.args || []
      setGameRoom(room => ({
        ...room,
        gameId: id.toNumber(),
        cardContract
      }))
      setJoinGameState(game => ({
        ...game,
        lineupUsers: lineupUser
      }))

      toBingoPlayHref({
        chainIdParams: chainIdParams,
        navigate: navigate,
        path: `/${id.toNumber()}/gameRoom`
      })
    }
  }, 1000)
  const handleStartGame = async () => {
    if (!chainId || !walletClient) {
      return
    }
    setPending(true)
    if (isPlaying) {
      return toBingoPlayHref({
        chainIdParams: chainIdParams,
        navigate: navigate,
        path: `/${gameId}/gameRoom`
      })
    }
    const lobbyContract = bingoLobby({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      const txn = await lobbyContract.write.start({
        account: account,
        maxFeePerGas: gasPrice[chainId],
        maxPriorityFeePerGas: gasPrice[chainId]
      })
      const hash = typeof txn === 'string' ? txn : txn.hash
      const startTx: TransactionReceipt | undefined = await waitForTransaction({
        confirmations: 1,
        hash
      })
      if (startTx && startTx.status === txStatus) {
        postAccountUpdate({ tx: startTx })
      } else {
        throw Object.assign(new Error('Start Transaction Failed'), {
          name: 'Start'
        })
      }
    } catch (e) {
      setErrorToast(e, lobbyContract)
    } finally {
      setPending(false)
    }
  }
  return (
    <>
      {isCard ? (
        <>
          <Row>
            <Col flex={'200px'}>
              <CardBack isMobile={isMobile} onClick={() => setIsCard(false)}>
                {t('Back')}
              </CardBack>
            </Col>
            <Col flex={'auto'}>
              <FlexCenter isMobile={isMobile}>
                <BingoCardView isMobile={isMobile}>
                  <BingoBoardView
                    cardNumbers={gameRoom.cardNumbers}
                    onChange={() => {
                      // console.log('不能编辑')
                    }}
                  />
                </BingoCardView>
              </FlexCenter>
            </Col>
          </Row>
        </>
      ) : (
        <div className={cx(css.matchmarking)}>
          <div className={css.pending}>
            <IconRotate src={preStaticUrl + '/img/icon/waiting.svg'} />
            {t('Matching')}
            {/* <Counter start={!disabled} /> */}
          </div>
          <div className={css.title}>{t('MatchmarkingText1')}</div>
          <LineupUsersWrapper isMobile={isMobile}>
            {joinGame.lineupUsers.concat(new Array(5 - joinGame.lineupUsers.length).fill('')).map((player, idx) => (
              <BingoPlayerAvatar
                size={isMobile ? 30 : 56}
                className="lineup-users-item"
                key={`player_${idx}`}
                account={player}
                showAccount={window.IS_TELEGRAM ? false : true}
                border={true}
              />
            ))}
          </LineupUsersWrapper>
          <div
            className={css.checkCard}
            onClick={() => {
              setIsCard(true)
            }}
          >
            {t('View Card')}
          </div>
          <Space>
            <ButtonPrimary width="250px" onClick={handleStartGame} disabled={[0, 1, 6].includes(joinGame.lineupUsers.length) || pending}>
              <Space size={10}>
                <span>{t('Start')}</span>
                {pending && <LoadingOutlined />}
              </Space>
            </ButtonPrimary>
          </Space>
          <div className={css.tip}>{t('SubmitCardText4')}</div>
        </div>
      )}
    </>
  )
}

export default Matchmarking
