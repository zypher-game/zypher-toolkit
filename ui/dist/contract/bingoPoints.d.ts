import * as ethers from "ethers";
import { Address, WalletClient } from "wagmi";
import { ChainId } from "../constant/constant";
declare const ZkBingoPointsContract: (chainId: ChainId, env: string, address?: Address, signer?: WalletClient) => ethers.ethers.Contract;
export default ZkBingoPointsContract;
