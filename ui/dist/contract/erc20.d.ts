import * as ethers from "ethers";
import { Address, WalletClient } from "wagmi";
import { ChainId } from "../constant/constant";
declare const erc20Contract: (chainId: ChainId, env: string, address?: Address, signer?: WalletClient) => ethers.ethers.Contract;
export default erc20Contract;
