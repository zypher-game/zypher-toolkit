import { atom } from '@ui/src'

export type ICurrentGame = {
  gameId: string
  champId: string
  round: string
  table: string
  startAt: string
}
export const CurrentGameState = atom<ICurrentGame>({
  key: 'CurrentGameState',
  default: undefined
})
