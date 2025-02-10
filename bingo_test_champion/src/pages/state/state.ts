import { atom } from '@ui/src'
import { localStorageEffect } from '@ui/src'

import { CardNumbersType } from '@/utils/generateCardNumbers'

export enum IBingoVersion {
  'v1' = 'v1',
  'beta' = 'beta'
}
export const bingoVersionState = atom({
  key: 'bingoVersionState',
  default: IBingoVersion.v1
})

export const rankingB3DialogState = atom({
  key: 'rankingB3DialogState',
  default: false
})
export const rankingDialogState = atom({
  key: 'rankingDialog',
  default: false
})

export const rankingTgDialog = atom({
  key: 'rankingTgDialog',
  default: false
})

export const DialogTaskListState = atom({
  key: 'DialogTaskListState',
  default: false
})
export const levelRuleDialogState = atom({
  key: 'levelRuleDialog',
  default: false
})

export const bingoRuleDialogState = atom({
  key: 'bingoRuleDialog',
  default: false
})

export const monsterNftRuleDialogState = atom({
  key: 'monsterNftRuleDialog',
  default: false
})
export const videoDialogState = atom({
  key: 'videoDialog',
  default: false
})
export const gameListDialogState = atom({
  key: 'gameListDialog',
  default: false
})

export type GameRuleType = {
  maxPlayers: number
  minPlayers: number
  row: number
  col: number
  maxNumber: number
  minNumber: number
}

export type JoinGameStateType = {
  signedLabel: string
  signedCard: string
  lineupUsers: string[]
}

export type GameRoomStateType = {
  cardContract: string
  gameId: number
  cardNumbers: CardNumbersType
}

export const joinGameState = atom<JoinGameStateType>({
  key: 'joinGameState',
  default: {
    signedLabel: '',
    signedCard: '',
    lineupUsers: []
  },
  effects_UNSTABLE: [localStorageEffect('joinGameState')]
})

export const gameRoomState = atom<GameRoomStateType>({
  key: 'gameRoomState',
  default: {
    cardContract: '',
    gameId: -1,
    cardNumbers: []
  },
  effects_UNSTABLE: [localStorageEffect('gameRoomState')]
})

export const showModalState = atom({
  key: 'showModalState',
  default: false
})

export const showTipModalState = atom({
  key: 'showTipModalState',
  default: false
})

export const showTipOkModalState = atom({
  key: 'showTipOkModalState',
  default: false
})

export const showCloseModalState = atom({
  key: 'showCloseModalState',
  default: false
})
export const startGameStep = atom({
  key: 'startGameStep',
  default: 0
})

export const SoundOn = atom({
  key: 'soundOn',
  default: 0,
  effects_UNSTABLE: [localStorageEffect('soundOn')]
})
