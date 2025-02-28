import { ICurrentChampionState, TOURNAMENT_CONFIG } from '../state/championState'

// 获取当前比赛场次的开始时间戳
const getTournamentStartTime = (currentTime: number): number => {
  const date = new Date(currentTime)
  const hours = date.getHours()
  const timeString = hours < 13 ? TOURNAMENT_CONFIG.FIRST_MATCH.START_TIME : TOURNAMENT_CONFIG.SECOND_MATCH.START_TIME
  const [startHour, startMinute] = timeString.split(':').map(Number)
  const startDate = new Date(date)
  startDate.setHours(startHour, startMinute, 0, 0)
  return startDate.getTime()
}
// 判断当前是否在比赛时间内
const isWithinTournamentTime = (currentTime: number): boolean => {
  const date = new Date(currentTime)
  const timeStr = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')

  return (
    (timeStr >= TOURNAMENT_CONFIG.FIRST_MATCH.START_TIME && timeStr <= TOURNAMENT_CONFIG.FIRST_MATCH.END_TIME) ||
    (timeStr >= TOURNAMENT_CONFIG.SECOND_MATCH.START_TIME && timeStr <= TOURNAMENT_CONFIG.SECOND_MATCH.END_TIME)
  )
}
// 获取当前是第几场比赛
export const getCurrentMatchNumber = (currentTime: number = Date.now()): 1 | 2 | null => {
  const date = new Date(currentTime)
  const timeStr = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')

  if (timeStr >= TOURNAMENT_CONFIG.FIRST_MATCH.START_TIME && timeStr <= TOURNAMENT_CONFIG.FIRST_MATCH.END_TIME) {
    return 1
  }
  if (timeStr >= TOURNAMENT_CONFIG.SECOND_MATCH.START_TIME && timeStr <= TOURNAMENT_CONFIG.SECOND_MATCH.END_TIME) {
    return 2
  }
  return null
}

// 获取当前比赛状态
export const getCurrentChampionState = (currentTime: number = Date.now()): ICurrentChampionState => {
  if (!isWithinTournamentTime(currentTime)) {
    return ICurrentChampionState.TournamentEnded
  }

  const startTime = getTournamentStartTime(currentTime)
  const timeDiff = (currentTime - startTime) / (60 * 1000) // 转换为分钟
  if (timeDiff < 0) {
    return ICurrentChampionState.RegistrationOpen
  }
  if (timeDiff < 20) {
    return ICurrentChampionState.RegistrationOpen
  }
  // 报名阶段
  if (timeDiff < 30) {
    return ICurrentChampionState.CardSubmissionOpen
  } // 提交卡牌阶段
  if (timeDiff < 60) {
    return ICurrentChampionState.PreliminaryRound
  } // 初赛阶段
  if (timeDiff < 70) {
    return ICurrentChampionState.QuarterFinalsCountdown
  } // 复赛倒计时
  if (timeDiff < 100) {
    return ICurrentChampionState.QuarterFinals
  } // 复赛阶段
  if (timeDiff < 110) {
    return ICurrentChampionState.FinalsCountdown
  } // 决赛倒计时
  if (timeDiff < 140) {
    return ICurrentChampionState.Finals
  } // 决赛阶段
  return ICurrentChampionState.TournamentEnded
}

// 获取当前阶段剩余时间（秒）
export const getRemainingTime = (currentTime: number = Date.now()): number => {
  if (!isWithinTournamentTime(currentTime)) {
    return 0
  }

  const startTime = getTournamentStartTime(currentTime)
  const currentState = getCurrentChampionState(currentTime)
  const timeDiff = (currentTime - startTime) / 1000 // 转换为秒

  switch (currentState) {
    case ICurrentChampionState.RegistrationOpen:
      return Math.max(0, 20 * 60 - timeDiff)
    case ICurrentChampionState.CardSubmissionOpen:
      return Math.max(0, 30 * 60 - timeDiff)
    case ICurrentChampionState.PreliminaryRound:
      return Math.max(0, 60 * 60 - timeDiff)
    case ICurrentChampionState.QuarterFinalsCountdown:
      return Math.max(0, 70 * 60 - timeDiff)
    case ICurrentChampionState.QuarterFinals:
      return Math.max(0, 100 * 60 - timeDiff)
    case ICurrentChampionState.FinalsCountdown:
      return Math.max(0, 110 * 60 - timeDiff)
    case ICurrentChampionState.Finals:
      return Math.max(0, 140 * 60 - timeDiff)
    default:
      return 0
  }
}
// 获取下一场比赛的开始时间戳
const getNextMatchStartTime = (currentTime: number = Date.now()): number => {
  const today = new Date(currentTime)
  const tomorrow = new Date(currentTime)
  tomorrow.setDate(today.getDate() + 1)
  // 获取当前时间字符串 "HH:MM" 格式
  const timeStr = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0')

  // 设置比赛时间
  const setMatchTime = (date: Date, _timeStr: string): number => {
    const [hours, minutes] = _timeStr.split(':').map(Number)
    date.setHours(hours, minutes, 0, 0)
    return date.getTime()
  }

  // 第一场开始时间
  const firstMatchToday = setMatchTime(new Date(today), TOURNAMENT_CONFIG.FIRST_MATCH.START_TIME)
  // 第二场开始时间
  const secondMatchToday = setMatchTime(new Date(today), TOURNAMENT_CONFIG.SECOND_MATCH.START_TIME)
  // 明天第一场开始时间
  const firstMatchTomorrow = setMatchTime(tomorrow, TOURNAMENT_CONFIG.FIRST_MATCH.START_TIME)

  // 判断下一场比赛时间
  if (timeStr < TOURNAMENT_CONFIG.FIRST_MATCH.START_TIME) {
    return firstMatchToday
  } else if (timeStr < TOURNAMENT_CONFIG.SECOND_MATCH.START_TIME) {
    return secondMatchToday
  } else {
    return firstMatchTomorrow
  }
}
// 获取距离下一场比赛的剩余时间（s)
export const getTimeUntilNextMatch = (currentTime: number = Date.now()): number => {
  const nextMatchTime = getNextMatchStartTime(currentTime)
  return Math.max(0, Math.floor((nextMatchTime - currentTime) / 1000))
}
export const padZero = (num: number): string => {
  return num.toString().padStart(2, '0')
}

// 格式化时间
export const formatTimeUntilNextMatch = (seconds: number): string[] => {
  if (seconds <= 0) {
    return ['00h', '00m', '00s']
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const parts = []
  parts.push(`${hours > 0 ? padZero(hours) : '00'}h`)
  parts.push(`${minutes > 0 ? padZero(minutes) : '00'}m`)
  parts.push(`${remainingSeconds > 0 ? padZero(remainingSeconds) : '00'}s`)

  return parts
}
