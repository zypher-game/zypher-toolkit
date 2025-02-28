import { useRecoilState, useRecoilValue, useSetRecoilState } from '@ui/src'
import { useEffect, useMemo, useRef, useState } from 'react'
import { zeroAddress } from 'viem'

import { CurrentChampionState, ICurrentChampionState } from '../state/championState'
import { CurrentGameState } from '../state/currentGameState'
import { IsNotParticipatingState, StatsState } from '../state/StatsState'
import { getButtonLabel, getCurrentRemainLabel, getGameStatusLabel } from '../utils/labelUtils'
import { formatTimeUntilNextMatch, getRemainingTime, getTimeUntilNextMatch, padZero } from '../utils/timeUtils'

export const useLabel = () => {
  const currentChampionState = useRecoilValue(CurrentChampionState)
  const [currentRemainTime, setCurrentRemainTime] = useState(['--', '--'])
  const [nextMatchTime, setNextMatchTime] = useState(['00h', '00m', '00s'])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const stats = useRecoilValue(StatsState)
  const currentGame = useRecoilValue(CurrentGameState)
  const setIsNotParticipating = useSetRecoilState(IsNotParticipatingState)
  useEffect(() => {
    // 更新函数
    const updateTimes = (): void => {
      const now = Date.now()
      if (currentChampionState === ICurrentChampionState.TournamentEnded) {
        setCurrentRemainTime(['--', '--'])
      } else {
        const curRemainTime = getRemainingTime(now)
        setCurrentRemainTime([`${padZero(Math.floor(curRemainTime / 60))}m`, `${padZero(Math.floor(curRemainTime % 60))}s`])
      }
      setNextMatchTime(formatTimeUntilNextMatch(getTimeUntilNextMatch(now)))
    }

    timerRef.current = setInterval(updateTimes, 1000)
    updateTimes()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentChampionState])

  const { currentRemainLabel, gameStatusLabel, btnLabel } = useMemo(() => {
    const obj = {
      currentRemainLabel: getCurrentRemainLabel(currentChampionState),
      gameStatusLabel: getGameStatusLabel(currentChampionState),
      btnLabel: getButtonLabel(currentChampionState)
    }
    if (
      [
        ICurrentChampionState.CardSubmissionOpen,
        ICurrentChampionState.CardSubmitted,

        // 比赛阶段
        ICurrentChampionState.PreliminaryRound,

        // 复赛相关
        ICurrentChampionState.QuarterFinalsCountdown,
        ICurrentChampionState.QuarterFinals,

        // 决赛相关
        ICurrentChampionState.FinalsCountdown,
        ICurrentChampionState.Finals
      ].includes(currentChampionState)
    ) {
      if (currentGame?.gameId === '0') {
        setIsNotParticipating(true)
        obj.btnLabel = 'Registration Closed'
      }
    }
    return obj
  }, [currentChampionState, currentGame?.gameId])

  return {
    currentRemainTime,
    nextMatchTime,
    currentRemainLabel,
    gameStatusLabel,
    btnLabel,
    lastWinner: stats?.last.winner || zeroAddress,
    curPlayer: stats?.last.regPlayers || 0
  }
}
