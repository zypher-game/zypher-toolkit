import abiBetaZkBingoCard from '@zypher-game/bingo-periphery/abi/ZkBingoCard.json';
import abiBetaZkBingoLobby from '@zypher-game/bingo-periphery/abi/ZkBingoLobby.json';
import abiV1ZkBingoCard from '@zypher-game/bingo-periphery-v1/abi/ZkBingoCard.json';
import abiChampionZkBingoCard from '@zypher-game/bingo-periphery-v1/abi/ZkBingoCard.json';
import abiZkBingoV1Fee from '@zypher-game/bingo-periphery-v1/abi/ZkBingoFee.json';
import abiZkBingoChampionFee from '@zypher-game/bingo-periphery-v1/abi/ZkBingoFee.json';
import abiV1ZkBingoLobby from '@zypher-game/bingo-periphery-v1/abi/ZkBingoLobby.json';
import abiChampionZkBingoLobby from '@zypher-game/bingo-periphery-v1/abi/ZkBingoLobby.json';
import abiMonsterSlayer202310 from '@zypher-game/events/abi/MonsterSlayer202310.json';
import { Address } from 'viem';
import {
  ChainId,
  IContractName,
  zkBingoBeta,
  zkBingoChampion,
  zkBingoV1,
} from '../constant/constant';

export enum IBingoVersion {
  'v1' = 'v1',
  'beta' = 'beta',
  'champion' = 'champion',
}
const getBingoAbi = ({
  contractName,
  bingoVersion,
}: {
  contractName: IContractName;
  bingoVersion: IBingoVersion;
}): any => {
  const abiMap: Record<string, Record<string, any>> = {
    [IContractName.Card]: {
      [IBingoVersion.champion]: abiChampionZkBingoCard,
      [IBingoVersion.beta]: abiBetaZkBingoCard,
      [IBingoVersion.v1]: abiV1ZkBingoCard,
    },
    [IContractName.Lobby]: {
      [IBingoVersion.champion]: abiChampionZkBingoLobby,
      [IBingoVersion.beta]: abiBetaZkBingoLobby,
      [IBingoVersion.v1]: abiV1ZkBingoLobby,
    },
    [IContractName.Monster]: {
      [IBingoVersion.v1]: abiMonsterSlayer202310,
    },
    [IContractName.Fee]: {
      [IBingoVersion.champion]: abiZkBingoChampionFee,
      [IBingoVersion.v1]: abiZkBingoV1Fee,
    },
  };
  const versionMap = abiMap[contractName];

  if (!versionMap) {
    throw new Error(`Contract name ${contractName} not found.`);
  }
  return versionMap[bingoVersion] || versionMap[IBingoVersion.v1];
};
export const getBingoConfig = ({
  contractName,
  bingoVersion,
  chainId,
}: {
  contractName: IContractName;
  bingoVersion: IBingoVersion;
  chainId: ChainId;
}): [any, Address] => {
  const bingoAbi = getBingoAbi({ contractName, bingoVersion });
  if (bingoVersion === IBingoVersion.champion) {
    return [bingoAbi, zkBingoChampion(chainId, contractName)];
  }
  if (bingoVersion === IBingoVersion.beta) {
    return [bingoAbi, zkBingoBeta(chainId, contractName)];
  }
  return [bingoAbi, zkBingoV1(chainId, contractName)];
};
