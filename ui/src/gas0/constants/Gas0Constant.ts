import { ChainId } from "../../constant/constant";

export type IGas0Config = {
  api: string;
};
export const Gas0Constants: Record<string, IGas0Config> = {
  [ChainId.ZytronLineaSepoliaTestnet]: {
    api: "https://rpc-zytron-testnet-linea.zypher.game/api",
  },
  [ChainId.ZytronLineaMain]: {
    api: "https://zytron-linea-mainnet-0gas.zypher.game/api",
  },
};
