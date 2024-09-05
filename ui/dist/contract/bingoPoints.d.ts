import * as ethers from "ethers";
import { Address } from "wagmi";
import { ChainId } from "../constant/constant";
declare const ZkBingoPointsContract: (chainId: ChainId, env: string, address?: Address, signer?: any) => ethers.ethers.Contract;
export default ZkBingoPointsContract;
