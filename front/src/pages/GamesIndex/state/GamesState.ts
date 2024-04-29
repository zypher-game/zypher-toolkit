import { atom, localStorageEffect } from '@UI/src'

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

export const zypherGamesDialogState = atom({
  key: 'zypherGamesDialogState',
  default: false
})

export const gameListDialogState = atom({
  key: 'gameListDialogState',
  default: false
})
