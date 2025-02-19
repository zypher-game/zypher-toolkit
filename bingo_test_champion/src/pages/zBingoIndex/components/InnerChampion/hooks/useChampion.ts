import { useRecoilState, useRecoilValue } from '@ui/src'
import { useCallback, useMemo } from 'react'

import { CurrentChampionState, ICurrentChampionState, ITabText, TabState } from '../state/championState'

export const useChampion = () => {
  const [tab, setTab] = useRecoilState(TabState)
  const currentChampionState = useRecoilValue(CurrentChampionState)
  const setTabHandle = useCallback((k: ITabText) => {
    setTab(k)
  }, [])
  const { bg, btnLabe } = useMemo(() => {
    let _bg = ''
    let _btnLabe = ''
    if (tab.key) {
      _bg = _bg + 'classic_bg'
    } else {
      _bg = getBackground(currentChampionState)
      _btnLabe = getButtonLabel(currentChampionState)
    }
    return {
      bg: _bg,
      btnLabe: _btnLabe
    }
  }, [tab.key, currentChampionState])

  return {
    tab,
    setTabHandle,
    bg,
    btnLabe
  }
}
const getBackground = (state: ICurrentChampionState): string => {
  switch (state) {
    case ICurrentChampionState.RegistrationOpen:
      return 'champion_bg_green' // 进行中的状态
    case ICurrentChampionState.CardSubmissionOpen:
    case ICurrentChampionState.QuarterFinalsCountdown:
    case ICurrentChampionState.FinalsCountdown:
      return 'champion_bg_orange' // 即将到来的状态
    case ICurrentChampionState.Registered:
    case ICurrentChampionState.RegistrationClosed:
    case ICurrentChampionState.CardSubmitted:
    case ICurrentChampionState.TournamentEnded:
    case ICurrentChampionState.PreliminaryRound:
    case ICurrentChampionState.QuarterFinals:
    case ICurrentChampionState.Finals:
    default:
      return 'champion_bg_grey' // 已结束或不活跃的状态
  }
}

const getButtonLabel = (state: ICurrentChampionState): string => {
  switch (state) {
    case ICurrentChampionState.RegistrationOpen:
      return 'Register with 1,000 GP'
    case ICurrentChampionState.Registered:
      return 'Registered'
    case ICurrentChampionState.RegistrationClosed:
    case ICurrentChampionState.TournamentEnded:
      return 'Registration Closed'
    case ICurrentChampionState.PreliminaryRound:
    case ICurrentChampionState.QuarterFinals:
    case ICurrentChampionState.Finals:
      return 'Game In Progress'
    case ICurrentChampionState.CardSubmissionOpen:
      return 'Start Qualifiers'
    case ICurrentChampionState.CardSubmitted:
      return 'Eliminated'
    case ICurrentChampionState.QuarterFinalsCountdown:
      return 'Start Semifinals'
    case ICurrentChampionState.FinalsCountdown:
      return 'Start Finals'
    default:
      return 'Registered'
  }
}
