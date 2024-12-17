import * as ethers from "ethers";
import { ChainId } from "../../../../constant/constant";
declare const ZgClientContract: ({ chainId, env, signer, }: {
    chainId: ChainId;
    env: string;
    signer?: any;
}) => ethers.ethers.Contract;
export default ZgClientContract;
