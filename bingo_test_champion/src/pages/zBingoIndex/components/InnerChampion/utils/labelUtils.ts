import { ICurrentChampionState } from '../state/championState'

export const getBackground = (state: ICurrentChampionState): string => {
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

export const getButtonLabel = (state: ICurrentChampionState): string => {
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
      return 'Match over'
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
export const getCurrentRemainLabel = (state: ICurrentChampionState): string => {
  // 报名倒计时
  // 初赛入场倒计时
  // 复赛入场倒计时
  // 决赛入场倒计时
  switch (state) {
    case ICurrentChampionState.FinalsCountdown:
    case ICurrentChampionState.Finals:
      return 'Finals Entry Countdown'
    case ICurrentChampionState.Registered:
    case ICurrentChampionState.RegistrationClosed:
    case ICurrentChampionState.CardSubmissionOpen:
    case ICurrentChampionState.CardSubmitted:
    case ICurrentChampionState.PreliminaryRound:
      return 'Prelim Entry Countdown'
    case ICurrentChampionState.QuarterFinalsCountdown:
    case ICurrentChampionState.QuarterFinals:
      return 'Semis Entry Countdown'
    default:
      return 'Sign-up Countdown'
  }
}

export const getGameStatusLabel = (state: ICurrentChampionState): 'In Progress' | 'Not Started' | 'Ended' => {
  switch (state) {
    case ICurrentChampionState.RegistrationOpen:
      return 'Not Started'
    case ICurrentChampionState.Registered:
      return 'Not Started'
    case ICurrentChampionState.RegistrationClosed:
      return 'In Progress'
    case ICurrentChampionState.TournamentEnded:
      return 'Ended'
    case ICurrentChampionState.PreliminaryRound:
    case ICurrentChampionState.QuarterFinals:
    case ICurrentChampionState.Finals:
      return 'In Progress'
    case ICurrentChampionState.CardSubmissionOpen:
      return 'In Progress'
    case ICurrentChampionState.CardSubmitted:
      return 'In Progress'
    case ICurrentChampionState.QuarterFinalsCountdown:
      return 'In Progress'
    case ICurrentChampionState.FinalsCountdown:
      return 'In Progress'
    default:
      return 'Not Started'
  }
}
