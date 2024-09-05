// ZkBingoPoints
import abi from "@zypher-game/bingo-periphery-v1/abi/ZkBingoPoints.json";
import * as ethers from "ethers";
import { Address, WalletClient } from "wagmi";

import { ChainId, IContractName, zkBingo } from "../constant/constant";
import { getContract } from "../connectors/contractV2";

const ZkBingoPointsContract = (
  chainId: ChainId,
  env: string,
  address?: Address,
  signer?: any
): ethers.ethers.Contract => {
  return getContract({
    env,
    abi,
    address: address ?? zkBingo(chainId, IContractName.Points),
    signer,
    chainId,
  });
};
export default ZkBingoPointsContract;
