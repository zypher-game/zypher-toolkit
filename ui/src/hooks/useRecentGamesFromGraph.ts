import ZkBingoCardAbi from "@zypher-game/bingo-periphery/abi/BingoCard.json";
import ZkBingoLobbyAbi from "@zypher-game/bingo-periphery/abi/ZkBingoLobby.json";
import { useCallback, useEffect, useState } from "react";
import { ChainId, supportedChainIds } from "../constant/constant";
import { IGameList, IGameName, IGameStatus } from "../types/gameList.types";
import { useInterval } from "./useInterval";
import { request } from "../utils/request";
import BigNumberjs from "bignumber.js";
import { ethers } from "ethers";
import { formatMoney } from "../utils/tool";
import {
  getFormattedTime,
  getFormattedTimeMobile,
  isTimeout,
} from "../utils/data";
import MulticallContract from "../contract/multicall";

export const useRecentGamesFromGraph = ({
  env,
}: {
  env: string;
}): {
  list: Map<ChainId, IGameList[]> | undefined;
  hasError: boolean;
} => {
  const [list, setList] = useState<Map<ChainId, IGameList[]>>();
  const [hasError, setHasError] = useState(false);
  const fetchGameInfos = useCallback(async () => {
    try {
      const value_pre = await batchRequestFromGraph({ env });
      const value = value_pre.filter((v) => !!v);
      if (value.length) {
        const gameList: Map<ChainId, IGameList[]> = new Map();
        for (let i = 0; i < value.length; i++) {
          if (value[i] && value[i]?.[0].chainId) {
            const chainId: ChainId = value[i]?.[0].chainId as ChainId;
            const mapValue: IGameList[] = value[i] as IGameList[];
            gameList.set(chainId, mapValue);
          }
          if (gameList.size) {
            setList(gameList);
          }
        }
      }
    } catch (e) {
      console.error("fetchGameInfos error: ", e);
      setHasError(true);
    }
  }, []);
  useEffect(() => {
    fetchGameInfos();
  }, []);
  useInterval(fetchGameInfos, 50000);
  fetchGameInfos;
  return {
    list: list,
    hasError: hasError,
  };
};

export const graphqlApiUrl: Partial<Record<ChainId, string>> = {
  [ChainId.LineaMainnet]:
    "https://linea-mainnet-graph.zypher.game/subgraphs/name/linea/bingo",
  [ChainId.LineaTestnet]:
    "https://linea-goerli-graph.zypher.game/subgraphs/name/linea/goerli",
  [ChainId.OPBNB]:
    "https://opbnb-mainnet-graph.zypher.game/subgraphs/name/opbnb/bingo",
  [ChainId.OPBNBTEST]:
    "https://opbnb-testnet-graph.zypher.game/subgraphs/name/opbnb/bingo",
  [ChainId.ArbitrumGoerli]:
    "https://arb-goerli-graph.zypher.game/subgraphs/name/arb/bingo",
};
export const chainIdPre: Record<ChainId, string> = {
  [ChainId.Mainnet]: "BNB",
  [ChainId.Testnet]: "BT",
  [ChainId.Arbitrum]: "AO",
  [ChainId.ArbitrumGoerli]: "AGT",
  [ChainId.ArbitrumRinkeby]: "ARBR",
  [ChainId.LineaTestnet]: "LT",
  [ChainId.LineaMainnet]: "LM",
  [ChainId.POLYGON_MUMBAI]: "PM",
  [ChainId.POLYGON_ZKEVM]: "PZT",
  [ChainId.OPBNB]: "OB",
  [ChainId.ScrollSepoliaTestnet]: "SST",
  [ChainId.ScrollAlphaTestnet]: "SAT",
  [ChainId.OPBNBTEST]: "OBT",
  [ChainId.MantaPacificMainnet]: "MPM",
  [ChainId.MantaPacificTestnet]: "MPT",
  [ChainId.ComboTestnet]: "CbT",
  [ChainId.Mantle]: "MTM",
  [ChainId.MantleTestnet]: "MTT",
};
export function getStatus(status: number): IGameStatus {
  if (status === 0) {
    return IGameStatus.Invalid;
  } else if (status === 1) {
    return IGameStatus.Live;
  } else if (status === 2) {
    return IGameStatus.End;
  } else if (status === 3) {
    return IGameStatus.Overtime;
  }
  return IGameStatus.Invalid;
}
export function formatDataFromGraph({
  chainId,
  data,
  recentGames,
}: {
  chainId: ChainId;
  data: any;
  recentGames: Map<any, any>;
}): IGameList[] {
  return data.map((v: any, index: number) => {
    const {
      cardAddr,
      endedAt,
      feeRatio,
      feeAmount,
      joinAmount,
      id: idHex,
      lobbyAddr,
      pCount,
      startedAt,
      // source,
      status: statusNumber,
      winAmount,
      winCardId,
      winner,
    } = v || {};
    let status = getStatus(statusNumber);
    const id = parseInt(idHex, 16).toString();
    let winnerOrPlayers = `${pCount} players`;
    let inputPerPlayer = joinAmount
      ? new BigNumberjs(ethers.utils.formatEther(joinAmount))
          .dividedBy(new BigNumberjs(pCount))
          .toNumber()
      : "-";
    let win = "-";
    let multiplier = "-";
    let cardNumbers;
    let selectedNumbers;
    if (status === IGameStatus.End && recentGames.size) {
      winnerOrPlayers = winner;
      const poolWin = new BigNumberjs(ethers.utils.formatEther(winAmount));
      win = formatMoney(poolWin.toNumber());
      multiplier = formatMoney(
        poolWin.dividedBy(new BigNumberjs(inputPerPlayer)).toNumber()
      );
      cardNumbers = recentGames.get(
        "cardNumbers" + cardAddr.toLowerCase() + winCardId
      );
      selectedNumbers = recentGames.get(
        "selectedNumbers" + lobbyAddr.toLowerCase() + id
      );
    }
    // graph没办法读超时 前端fixed
    if (status === IGameStatus.Live) {
      const timeout = 30 * 60; // 30分钟的秒数
      if (isTimeout(startedAt, timeout)) {
        status = IGameStatus.Overtime;
      }
    }
    inputPerPlayer =
      inputPerPlayer !== "-" ? formatMoney(Number(inputPerPlayer), 0) : "-";

    return {
      chainId: chainId,
      status: status,
      startTimeNumber: `${startedAt}`,
      startTime: getFormattedTime(startedAt),
      startTimeMobile: getFormattedTimeMobile(startedAt),
      game: IGameName.zBingo,
      winner: winner,
      cardAddr,
      endedAt,
      feeAmount,
      feeRatio,
      lobbyAddr,
      roomID: id,
      roomIDStr: chainIdPre[chainId] + "B#" + id,
      bingoInfo: {
        cardNumbers,
        selectedNumbers,
      },
      // gameIdInfo: gameIdInfo,
      inputPerPlayer: inputPerPlayer,
      multiplier: multiplier,
      win: win,
      winnerOrPlayers: winnerOrPlayers,
    } as IGameList;
  });
}
async function batchRequestFromGraph({
  env,
}: {
  env: string;
}): Promise<(IGameList[] | undefined)[]> {
  const requests = supportedChainIds(env).map(async (chainIdLocal: ChainId) => {
    const api = graphqlApiUrl[chainIdLocal];
    if (!api) {
      return undefined;
    }
    // const client = ...
    const result = await request(api, {
      method: "POST",
      data: JSON.stringify({
        query: `query MyQuery {
          gameInfos(orderBy: startedAt, orderDirection: desc, first: 40) {
            cardAddr
            endedAt
            feeAmount
            feeRatio
            id
            joinAmount
            lobbyAddr
            pCount
            source
            startedAt
            status
            winAmount
            winCardId
            winner
          }
        }`,
        variables: {},
        operationName: "MyQuery",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.data && result.data.data && result.data.data.gameInfos) {
      if (result.data.data.gameInfos.length) {
        // 获取 idList
        const gameIdList = result.data.data.gameInfos.map((v: any) =>
          parseInt(v.id, 16).toString()
        );
        const lobbyAddrList = result.data.data.gameInfos.map(
          (v: any) => v.lobbyAddr
        );
        // const cardAddrList = result.data.data.gameInfos.map((v: any) => v.cardAddr)
        // const winCardIdList = result.data.data.gameInfos.filter((v: any) => v.status === 2).map((v: any) => v.winCardId)

        const endFilter = result.data.data.gameInfos
          .filter((v: any) => getStatus(v.status) === IGameStatus.End)
          .map((v: any) => ({ winCardId: v.winCardId, cardAddr: v.cardAddr }));
        const winCardIdList = endFilter.map((v: any) => v.winCardId);
        const cardAddrList = endFilter.map((v: any) => v.cardAddr);

        const recentGames =
          (await getRecentGameById({
            chainId: chainIdLocal,
            lobbyAddrList,
            gameIdList,
            cardAddrList,
            winCardIdList,
          })) ?? new Map();
        return formatDataFromGraph({
          chainId: chainIdLocal,
          data: result.data.data.gameInfos,
          recentGames,
        });
      }
    }
    return undefined;
  });
  return Promise.all(requests);
}
export const getRecentGameById = async ({
  chainId,
  lobbyAddrList,
  gameIdList,
  cardAddrList,
  winCardIdList,
}: {
  chainId: ChainId;
  lobbyAddrList: string[];
  gameIdList: string[];
  cardAddrList: string[];
  winCardIdList: string[];
}): Promise<Map<string, any> | undefined> => {
  try {
    // 获取当前gameInfo
    const paramsGameId = gameIdList.map((gameId, index) => ({
      reference:
        "selectedNumbers" + lobbyAddrList[index].toLowerCase() + gameId,
      contractAddress: lobbyAddrList[index],
      abi: ZkBingoLobbyAbi,
      calls: [
        {
          methodName: "getSelectedNumbers",
          reference: "getSelectedNumbers",
          methodParameters: [gameId],
        },
      ],
    }));
    const paramsCardId = winCardIdList.map((winCardId, index) => ({
      reference: "cardNumbers" + cardAddrList[index].toLowerCase() + winCardId,
      contractAddress: cardAddrList[index],
      abi: ZkBingoCardAbi,
      calls: [
        {
          methodName: "getCardNumbers",
          reference: "getCardNumbers",
          methodParameters: [winCardId],
        },
      ],
    }));
    const multicall = await MulticallContract(chainId);
    if (multicall) {
      const { results } = await multicall.call([
        ...paramsGameId,
        ...paramsCardId,
      ]);
      if (results) {
        const map = new Map();
        Object.values(results).map((v: any) => {
          const num = v["callsReturnContext"][0]["returnValues"];
          map.set(v["originalContractCallContext"]["reference"], num);
        });
        return map;
      }
    }
    return undefined;
  } catch (err) {
    console.error("getRecentGameById err: ", err);
    return undefined;
  }
};
