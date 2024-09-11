import { Address } from "wagmi";
import { ChainId } from "../../constant/constant";

export type IGas0Config = {
  api: string;
  PermitProxy: Address;
  isGameFree: boolean;
};
export const Gas0Constants: Record<string, IGas0Config> = {
  [ChainId.ZytronLineaSepoliaTestnet]: {
    PermitProxy: "0x416e71A44d3A0cFD91DCbbE5B6CcB90752572B87" as `0x${string}`,
    api: "https://rpc-zytron-testnet-linea.zypher.game/api",
    isGameFree: true,
  },
  [ChainId.ZytronLineaMain]: {
    api: "https://zytron-linea-mainnet-0gas.zypher.game/api",
    PermitProxy: "0x6e0839df4fb45d76fe355d69fd430adef95e119a" as `0x${string}`,
    isGameFree: true,
  },
};
