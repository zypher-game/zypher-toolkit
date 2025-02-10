import { IGameStatus, IPlayer } from '@ui/src'

export type IRoomInfo = {
  player: string
  round: number
  remain: number
  status: string
  players: IPlayer[]
  winner: string
  startedAt: number
  endedAt: number
  selectNumber: Map<number, number>
  selectedNumbers: number[]
  gameInfoStatus: string
  winAmount: string
  betSize: string
}

export type IGameRound = {
  round: number // uint32 round;
  number: number // uint8 number;
  timestamp: number // uint32 timestamp;
  player: string // address player;
}
export type IGameSettings = {
  betSize: bigint
  expectedLines: number
  minNumber: number // number smaller than this will not be selected
  maxNumber: number // number larger than this will not be selected
}
export type IGameIdInfoV1 = [
  number, // startedAt,
  number, // endedAt,
  string, // address winner,
  number, // winAmount,
  IPlayer[], //  Participant[] memory players,
  IGameRound[], // GameRound[] memory rounds,
  IGameSettings, // GameSettings memory settings,
  IGameStatus // string memory status
]
export type IGameIdInfoBeta = [
  number, // startedAt, 0
  number, // endedAt, 1
  string, // address winner,2
  IPlayer[], //  Participant[] memory players,3
  IGameRound[], // GameRound[] memory rounds,
  IGameStatus // string memory status
]
export { IPlayer }
