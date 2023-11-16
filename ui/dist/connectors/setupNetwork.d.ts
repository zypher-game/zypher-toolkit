import * as config from "../constant/constant";
declare const setupNetwork: (env: string, chainId?: config.ChainId) => Promise<boolean>;
export default setupNetwork;
