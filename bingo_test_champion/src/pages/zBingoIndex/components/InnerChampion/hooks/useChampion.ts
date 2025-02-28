import { useRecoilState, useRecoilValue } from '@ui/src'
import { useCallback, useEffect, useMemo } from 'react'

import { CurrentChampionState, ICurrentChampionState, ITabText, TabState, TOURNAMENT_CONFIG } from '../state/championState'
import { CurrentGameState } from '../state/currentGameState'
import { IsNotParticipatingState } from '../state/StatsState'
import { getBackground, getButtonLabel } from '../utils/labelUtils'
import { getCurrentChampionState } from '../utils/timeUtils'
import { useChampionContract } from './useChampionContract'

export const useChampion = () => {
  useChampionContract()
  const [tab, setTab] = useRecoilState(TabState)
  const [currentChampionState, setCurrentChampionState] = useRecoilState(CurrentChampionState)
  const currentGame = useRecoilValue(CurrentGameState)
  const isNotParticipating = useRecoilValue(IsNotParticipatingState)
  const setTabHandle = useCallback((k: ITabText) => {
    setTab(k)
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const state = getCurrentChampionState(now)
      // 已经报名了
      if (currentGame && currentGame.gameId !== '0') {
        if (state === ICurrentChampionState.RegistrationOpen) {
          setCurrentChampionState(ICurrentChampionState.Registered)
        }
      } else {
        setCurrentChampionState(state)
      }
    })
    return () => {
      clearInterval(timer)
    }
  }, [JSON.stringify(currentGame)])

  const { bg } = useMemo(() => {
    let _bg = ''
    if (tab.key) {
      _bg = 'classic_bg'
    } else {
      _bg = getBackground(currentChampionState)
      if (isNotParticipating) {
        _bg = 'champion_bg_grey'
      }
    }
    return {
      bg: _bg
    }
  }, [tab.key, currentChampionState, isNotParticipating])

  return {
    tab,
    setTabHandle,
    bg
  }
}
