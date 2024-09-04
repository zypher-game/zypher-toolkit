import * as ethers from "ethers";
import { Address } from "wagmi";

import abi from "./abi/erc20Abi.json";
import { ChainId } from "../constant/constant";

import { getContract } from "../connectors/contractV2";

const erc20Contract = (
  chainId: ChainId,
  env: string,
  address?: Address,
  signer?: any
): ethers.ethers.Contract => {
  if (!address) {
    throw new Error("No addrerss");
  }
  return getContract({ env, abi, address, signer, chainId });
};
export const erc20Abi = abi;
export default erc20Contract;
