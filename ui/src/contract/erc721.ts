import * as ethers from "ethers";
import { Address } from "wagmi";

import abi from "./abi/erc721.json";
import { ChainId } from "../constant/constant";

import { getContract } from "../connectors/contractV2";

const erc721Contract = (
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
export const erc721Abi = abi;
export default erc721Contract;
