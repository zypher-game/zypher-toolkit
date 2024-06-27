import { atom, localStorageEffect } from '@ui/src'

export type IBanner = {
  link: string
  alt: string
  imgPath: string
}
export const gamesBannerState = atom<IBanner[]>({
  key: 'gamesBannerState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('gamesBannerState')]
})

export const announcementDialogState = atom({
  key: 'announcementDialogState',
  default: false
})

export const historyTabIndexState = atom<number>({
  key: 'historyTabIndexState',
  default: 0
})
export const historyDialogState = atom({
  key: 'historyDialogState',
  default: false
})

export const announcementTimeState = atom<[boolean, number]>({
  key: 'announcementTimeState',
  default: [true, 0],
  effects_UNSTABLE: [localStorageEffect('announcementTimeState')]
})
export const zypherGamesDialogState = atom({
  key: 'zypherGamesDialogState',
  default: false
})

export const gameListDialogState = atom({
  key: 'gameListDialogState',
  default: false
})

export const dataDialogState = atom({
  key: 'dataDialogState',
  default: false
})
