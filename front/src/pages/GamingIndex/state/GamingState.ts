import { atom, localStorageEffect } from '@UI/src'

export type IBanner = {
  link: string
  alt: string
  imgPath: string
}
export const gamingBannerState = atom<IBanner[]>({
  key: 'gamingBannerState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('gamingBannerState')]
})

export const zypherGamesDialogState = atom({
  key: 'zypherGamesDialogState',
  default: false
})

export const gameListDialogState = atom({
  key: 'gameListDialogState',
  default: true
})
