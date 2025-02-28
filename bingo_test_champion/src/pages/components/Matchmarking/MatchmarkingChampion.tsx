import { LoadingOutlined } from '@ant-design/icons'
import {
  ChainRpcUrls,
  getProvider,
  IBingoVersion,
  LngNs,
  ownerListState,
  preStaticUrl,
  SvgComponent,
  txStatus,
  useAaWallet,
  useAccountInvitation,
  useCustomTranslation,
  useGetOwnAddress,
  useIsTelegram,
  useIsW768,
  useRecoilState,
  useRecoilValue
} from '@ui/src'
import { usePublicNodeWaitForTransaction } from '@ui/src'
import { Col, Row, Space } from 'antd'
import cx from 'classnames'
import { sample } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
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
import { gameRoomState, joinGameState } from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { toBingoPlayHref } from '@/utils/toBingoHref'

import css from './index.module.stylus'

interface IMatchmarkingChampion {
  disabled?: boolean
}

const MatchmarkingChampion: React.FC<IMatchmarkingChampion> = ({ disabled }) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const navigate = useNavigate()
  const isMobile = useIsW768()
  const IS_TELEGRAM = useIsTelegram()
  const [gameRoom, setGameRoom] = useRecoilState(gameRoomState)
  const [pending, setPending] = useState(false)
  const [joinGame, setJoinGameState] = useRecoilState(joinGameState)
  const { postAccountUpdate } = useAccountInvitation(env)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [isCard, setIsCard] = useState(false)
  const { aaWalletClient: walletClient, aa_mm_address } = useAaWallet()
  const { isPlaying, gameId } = useRestoreGame()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const chainIdParams = useChainIdParams()
  const [lineupUsers, _lineupUsers] = useState<string[]>([])
  const { setOwnerAddress } = useGetOwnAddress()
  const ownerList = useRecoilValue(ownerListState)
  useIntervalAsync(async () => {
    if (!chainId || !aa_mm_address || !walletClient) {
      return
    }
    const provider = await getProvider(sample(ChainRpcUrls[chainId]))
    const bingoLobbyContract = await bingoLobbyFromRpc({
      chainId,
      bingoVersion,
      library: provider,
      account: aa_mm_address
    })
    const rres = await bingoLobbyContract.functions.lineupUsers()
    let __lineupUsers: string[] = []
    if (bingoVersion === IBingoVersion.v1) {
      __lineupUsers = rres[1] // []
    } else {
      __lineupUsers = rres[0]
    }
    setJoinGameState(game => ({
      ...game,
      lineupUsers: __lineupUsers
    }))
    await setOwnerAddress(__lineupUsers)
    _lineupUsers(__lineupUsers)
    const curBlock = await provider.getBlockNumber()
    const filter = bingoLobbyContract.filters.GameStarted()
    const events = await bingoLobbyContract.queryFilter(filter, curBlock - 10)
    const myEvents = events.filter(event => {
      const [list] = (event.args || []).slice(-1)
      return list.map((v: any) => (v ?? '').toLowerCase()).includes(aa_mm_address.toLowerCase()) as Event
    })
    const [event] = myEvents
    if (event) {
      const [id, cardContract, __lineupUser] = event.args || []
      setGameRoom(room => ({
        ...room,
        gameId: id.toNumber(),
        cardContract
      }))
      setJoinGameState(game => ({
        ...game,
        lineupUsers: __lineupUser
      }))
      _lineupUsers(__lineupUser)
      toBingoPlayHref({
        chainIdParams: chainIdParams,
        navigate: navigate,
        path: `/${id.toNumber()}/gameRoom`
      })
    }
  }, 1000)
  const handleStartGame = async () => {
    if (!chainId || !aa_mm_address || !account || !walletClient) {
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
  // useEffect(() => {
  //   setOwnerAddress(lineupUsers)
  // }, [lineupUsers.length])
  return (
    <>
      {isCard ? (
        <>
          <Row>
            <Col flex={'200px'}>
              <div className={css['card-back']} onClick={() => setIsCard(false)}>
                {'<'} {t('Back')}
              </div>
            </Col>
            <Col flex={'auto'}>
              <div className={css['flex-center']}>
                <div className={css['bingo-card-view']}>
                  <BingoBoardView cardNumbers={gameRoom.cardNumbers} onChange={() => {}} />
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <div className={cx(css.matchmarking)}>
          <div className={css.pending}>
            <SvgComponent className={css['icon-rotate']} src={preStaticUrl + '/img/icon/waiting.svg'} />
            {t('Matching')}
            {/* <Counter start={!disabled} /> */}
          </div>
          <div className={css.title}>
            Games can start with as few as two players. You are free to start as soon as you have a single other player matched. Please do not quit
            during the matchmaking process.
          </div>
          <div className={css['lineup-users-wrapper']}>
            {lineupUsers.concat(new Array(5 - lineupUsers.length).fill('')).map((player, idx) => (
              <BingoPlayerAvatar
                size={isMobile ? 30 : 56}
                className="lineup-users-item"
                key={`player_${idx}_${ownerList[player]}`}
                account={player}
                showAccount={window.IS_TELEGRAM ? false : true}
                border={true}
              />
            ))}
          </div>
          <div
            className={css.checkCard}
            onClick={() => {
              setIsCard(true)
            }}
          >
            {t('View Card')}
          </div>
        </div>
      )}
    </>
  )
}

export default MatchmarkingChampion
