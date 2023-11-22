import { Address } from "wagmi";
import { ChainId } from "../constant/constant";
export declare enum IGameStatus {
    Live = "live",
    End = "end",
    Overtime = "overtime",
    Invalid = "invalid"
}
export declare enum IGameName {
    zBingo = "zBingo"
}
export type IBingoInfo = {
    cardNumbers: number[][];
    selectedNumbers: number[];
};
export type IPlayer = {
    user: Address;
    cardId: string;
    isAbandoned: boolean;
};
type IGameRound = {
    round: number;
    number: number;
    timestamp: number;
    player: string;
};
export type IRecentGame = {
    gameId: number;
    status: string;
    winner: string;
    cardNumbers: number[][];
    selectedNumbers: number[];
    players: IPlayer[];
};
export type IGameIdInfo = [
    number,
    number,
    string,
    string,
    string,
    IPlayer[],
    IGameRound[],
    IGameStatus
];
export interface IGameList {
    chainId: ChainId;
    status: IGameStatus;
    startTimeNumber: string;
    startTime: string;
    startTimeMobile: string;
    game: IGameName;
    winner: string;
    players: IPlayer[];
    roomID: string;
    roomIDStr: string;
    bingoInfo: IBingoInfo;
    gameIdInfo?: IGameIdInfo;
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
export {};
