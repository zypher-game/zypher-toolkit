import { LoadingOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  addressIsEqual,
  getShortenAddress,
  PlayerAvatar,
  preStaticUrl,
  txStatus,
  useAaWallet,
  usePublicNodeWaitForTransaction,
  useRecoilValue,
  useResetRecoilState
} from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionReceipt } from 'viem'

import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import { toBingoHref, toChampionPlayHref } from '@/utils/toBingoHref'

import { ButtonHover, ButtonPrimary } from '../components/Button'
import { gameRoomState, joinGameState, startGameStep } from '../state/state'
import ChampionContract from '../zBingoIndex/components/InnerChampion/contract/championContract'
import { useLabel } from '../zBingoIndex/components/InnerChampion/hooks/useLabel'
import { CurrentChampionState, ICurrentChampionState } from '../zBingoIndex/components/InnerChampion/state/championState'
import { CurrentGameState } from '../zBingoIndex/components/InnerChampion/state/currentGameState'
import { StatsLoadingState } from '../zBingoIndex/components/InnerChampion/state/StatsState'
import styles from './resultModalChampion.module.styl'

interface IResultModalProps {
  winner: string
  open: boolean
}

const ResultModalChampion: React.FC<IResultModalProps> = memo(({ winner, open }: IResultModalProps) => {
  const { account, chainId, walletClient } = useAaWallet()
  const { aa_mm_address } = useAaWallet()
  const resetJoinGame = useResetRecoilState(joinGameState)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const resetGameStep = useResetRecoilState(startGameStep)

  const currentChampion = useRecoilValue(CurrentChampionState)
  const currentGame = useRecoilValue(CurrentGameState)
  const navigate = useNavigate()
  const [claimLoading, setClaimLoading] = useState(false)
  const statsLoadingState = useRecoilValue(StatsLoadingState)
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { currentRemainTime } = useLabel()
  const isWinner = useMemo(() => {
    return addressIsEqual(winner, account) || addressIsEqual(winner, aa_mm_address)
  }, [winner, account, aa_mm_address])
  const isChampion = true
  const { isWinOnce, isFinal, isEnd } = useMemo(() => {
    return {
      isWinOnce: true,
      // isWinOnce: [
      //   ICurrentChampionState.QuarterFinalsCountdown,
      //   ICurrentChampionState.QuarterFinals,
      //   ICurrentChampionState.FinalsCountdown,
      //   ICurrentChampionState.Finals
      // ].includes(currentChampion),
      isFinal: [ICurrentChampionState.FinalsCountdown, ICurrentChampionState.Finals].includes(currentChampion),
      isEnd: [ICurrentChampionState.TournamentEnded].includes(currentChampion)
    }
  }, [currentChampion])
  const onCancel = useCallback(async () => {
    resetJoinGame()
    resetGameRoom()
    resetGameStep()
    setTimeout(() => {
      toBingoHref({ chainIdParams: chainId!, navigate })
    }, 1000)
  }, [])
  const onClaim = useCallback(async () => {
    if (!chainId) {
      setErrorToast({
        title: '',
        message: `No chainId!`
      })
      return
    }
    try {
      setClaimLoading(true)
      if (isEnd) {
        const champId = currentGame.champId
        const championContract = ChampionContract({
          chainId,
          env,
          walletClient
        })
        if (championContract) {
          const res = await championContract.write.claim([account, champId])
          const hash = typeof res === 'string' ? res : res.hash
          const nativeSwapTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
          if (nativeSwapTx && nativeSwapTx.status === txStatus) {
            setSuccessToast({
              title: '',
              message: `Claim successful!`
            })
            resetJoinGame()
            resetGameRoom()
            resetGameStep()
            setTimeout(() => {
              toBingoHref({ chainIdParams: chainId, navigate })
            }, 1000)
          } else {
            throw Object.assign(new Error('Claim Failed'), {
              name: 'Claim'
            })
          }
        }
      } else {
        toChampionPlayHref({ chainIdParams: chainId, navigate })
      }
    } catch (e) {
      console.log('Claim Error: ', e)
      setErrorToast(e)
    } finally {
      setClaimLoading(false)
    }
  }, [JSON.stringify(currentGame), isEnd, chainId, account])

  return (
    <DialogOverlay isOpen={open}>
      <DialogContent className={styles.dialogContent}>
        <div className={`${isWinner ? styles.wrapper : styles.wrapperLoss}`}>
          {isWinner ? (
            <>
              <div className={`${styles.bg}  ${isEnd ? styles.bgEnd : ''}`} />
              <div className={styles.header}>
                <>
                  {isEnd ? (
                    <h1 className={styles.titleC}>
                      Congratulations!
                      <br />
                      {/* 冠军/季军 */}
                      {isChampion ? '🏆You are the champion! 🏆' : '🎉You are the runner-up🎉'}
                    </h1>
                  ) : (
                    <h1 className={styles.title}>
                      Congratulations!
                      <br />
                      You win!
                    </h1>
                  )}
                  {isEnd ? <></> : <h2 className={styles.subtitle}>{isFinal ? 'Join the finals queue now!' : 'Join the rematch queue now!'}</h2>}
                </>
              </div>
              {isEnd ? (
                <div className={styles.box}>
                  <img className={styles.points} src={preStaticUrl + `/img/points/${isChampion ? 'points_8' : 'points_3'}.png`} />
                  <p className={styles.bonus}>{isChampion ? '+5,000' : '+1,000'}</p>
                </div>
              ) : (
                <></>
              )}
              <div className={`${styles.col} ${isEnd ? styles.colEnd : ''}`}>
                <div className={styles.playerInfo}>
                  <PlayerAvatar size={40} account={account} winner={isWinner} />
                  <div className={styles.fl}>
                    <p className={styles.account}>Player 1 (you)</p>
                    <p>{getShortenAddress(account)}</p>
                  </div>
                </div>
                {isEnd ? (
                  <></>
                ) : (
                  <div className={styles.countdown}>
                    {isFinal ? 'Finals Entry Countdown' : 'Rematch Entry Countdown'}
                    <p className={styles.orange}>
                      {currentRemainTime.map((v, index) => (
                        <span key={index}>
                          <span className={`${styles.spanTime} ${index + 1 === currentRemainTime.length ? styles.spanLast : ''}`}>{v}</span>
                          {index + 1 === currentRemainTime.length ? '' : <span className={styles.spanPoint}>:</span>}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>

              <ButtonPrimary className={styles.startButton} onClick={onClaim} disabled={claimLoading || statsLoadingState}>
                {isEnd ? 'Claim Now!' : isFinal ? 'Start Finals' : 'Start Semifinals'}
                {(claimLoading || statsLoadingState) && <LoadingOutlined />}
              </ButtonPrimary>
            </>
          ) : (
            <>
              <img className={styles.loseImg} src={preStaticUrl + `/img/bingo/your-lose_en_US.webp`} />
              {isWinOnce ? (
                <>
                  <p className={styles.normalLabel}>{`Sorry, you've been knocked out.`}</p>
                  <div className={styles.box}>
                    <img className={styles.points} src={preStaticUrl + `/img/bingo/winner1.webp`} />
                    <p className={styles.bonus}>+1,000</p>
                  </div>
                  <p className={styles.smallLabel}>Please claim your reward.</p>
                  <ButtonPrimary className={styles.backButton} onClick={onClaim} disabled={claimLoading || statsLoadingState}>
                    Claim Now!
                    {(claimLoading || statsLoadingState) && <LoadingOutlined />}
                  </ButtonPrimary>
                </>
              ) : (
                <>
                  <div className={styles.loseEmoji}>😭</div>
                  <div className={styles.loseMessage}>Sorry, no prize this time.</div>
                  <ButtonHover className={styles.backButton} onClick={onCancel}>
                    Back
                  </ButtonHover>
                </>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default ResultModalChampion
