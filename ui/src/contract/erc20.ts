import * as ethers from "ethers";
import { Address, WalletClient } from "wagmi";

import abi from "./abi/erc20Abi.json";
import { ChainId } from "../constant/constant";

import { getContract } from "../connectors/contractV2";

const erc20Contract = (
  chainId: ChainId,
  env: string,
  address?: Address,
  signer?: WalletClient
): ethers.ethers.Contract => {
  if (!address) {
    throw new Error("No addrerss");
  }
  return getContract({ env, abi, address, signer, chainId });
};

export default erc20Contract;
