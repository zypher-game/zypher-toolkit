import { ChainId } from "../constant/constant";
import { IGameList, IGameStatus } from "../types/gameList.types";
export declare const useRecentGamesFromGraph: ({ env, }: {
    env: string;
}) => {
    list: Map<ChainId, IGameList[]> | undefined;
    hasError: boolean;
};
export declare const graphqlApiUrl: Partial<Record<ChainId, string>>;
export declare const chainIdPre: Record<ChainId, string>;
export declare function getStatus(status: number): IGameStatus;
export declare function formatDataFromGraph({ chainId, data, recentGames, }: {
    chainId: ChainId;
    data: any;
    recentGames: Map<any, any>;
}): IGameList[];
export declare const getRecentGameById: ({ chainId, lobbyAddrList, gameIdList, cardAddrList, winCardIdList, }: {
    chainId: ChainId;
    lobbyAddrList: string[];
    gameIdList: string[];
    cardAddrList: string[];
    winCardIdList: string[];
}) => Promise<Map<string, any> | undefined>;
