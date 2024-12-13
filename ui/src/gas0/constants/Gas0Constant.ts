import { ChainId } from "../../constant/constant";

export type IGas0Config = {
  api: string;
};
export const Gas0Constants: Record<string, IGas0Config> = {
  [ChainId.ZytronLineaSepoliaTestnet]: {
    // 1. https://gas.zypher.network
    // 2. https://gas-testnet.zypher.network
    api: "https://gas-testnet.zypher.network",
  },
  [ChainId.ZytronLineaMain]: {
    api: "https://gas.zypher.network",
  },
};
