// ZkBingoPoints
import abi from "./abi/ZgClient.json";
import * as ethers from "ethers";
import { getContract } from "../../../../connectors/contractV2";
import { ChainId } from "../../../../constant/constant";
import { GPAddress } from "../constant/GPConstant";

const ZgClientContract = ({
  chainId,
  env,
  signer,
}: {
  chainId: ChainId;
  env: string;
  signer?: any;
}): ethers.ethers.Contract => {
  return getContract({
    env,
    abi,
    address: GPAddress[chainId].Store,
    signer,
    chainId,
  });
};
export default ZgClientContract;
