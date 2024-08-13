import { Address } from "wagmi";
import { ChainId } from "../constant/constant";

export enum IGameStatus {
  Live = "live",
  End = "end",
  Overtime = "overtime",
  Invalid = "invalid",
}
export enum IGameName {
  zBingo = "zBingo",
  z2048 = "z2048",
}
export type IBingoInfo = {
  cardNumbers: number[][];
  selectedNumbers: number[];
};
export type IPlayer = {
  user: Address;
  cardId: string;
  isAbandoned: boolean;
  tgName?: string;
};
export type IRecentGame = {
  gameId: number; // uint256 gameId;
  status: string; // string status;
  winner: string; // address winner;
  cardNumbers: number[][]; // uint8[][] cardNumbers;
  selectedNumbers: number[]; // uint8[] selectedNumbers;
  players: IPlayer[]; // Participant[] players;
};
// export type IGameIdInfo = [
//   number, // startedAt,
//   number, // endedAt,
//   string, // uint256 joinAmount,
//   string, // winner,
//   string, // uint256 winAmount,
//   IPlayer[], // Participant[] memory players,
//   IGameRound[], // GameRound[] memory rounds,
//   IGameStatus // string memory status
// ];
export interface IGameList {
  chainId: ChainId;
  status: IGameStatus;
  startTimeNumber: string;
  startTime: string;
  startTimeMobile: string;
  game: IGameName;
  winner: string;
  players: IPlayer[]; // Winner/Players
  roomID: string;
  roomIDStr: string;
  bingoInfo: IBingoInfo;
  inputPerPlayer: string;
  multiplier: string;
  win: string;
  winnerOrPlayers: string;
  cardAddr?: string;
  endedAt?: string;
  feeAmount?: string;
  feeRatio?: string;
  lobbyAddr?: string;
}
