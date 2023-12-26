import { isNotNullish } from "../../utils/isNotNullish";
import type { RainbowKitChain } from "./RainbowKitChainContext";

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for
type ChainName =
  | "lineaMainnet"
  | "lineaTestnet"
  | "opBNBMainnet"
  | "opBNBTestnet"
  | "arbitrum"
  | "arbitrumGoerli"
  | "avalanche"
  | "avalancheFuji"
  | "cronos"
  | "cronosTestnet"
  | "base"
  | "baseGoerli"
  | "bsc"
  | "bscTestnet"
  | "goerli"
  | "hardhat"
  | "kovan"
  | "localhost"
  | "mainnet"
  | "optimism"
  | "optimismKovan"
  | "optimismGoerli"
  | "polygon"
  | "polygonMumbai"
  | "polygonZkEVMTestnet"
  | "rinkeby"
  | "ropsten"
  | "sepolia"
  | "zora"
  | "zoraTestnet"
  | "GSCTestnet"
  | "scrollSepolia"
  | "MantaPacificMainnet"
  | "MantaPacificTestnet"
  | "Combo"
  | "ComboTestnet"
  | "Mantle"
  | "MantleTestnet";
type IconMetadata = {
  iconUrl: () => Promise<string>;
  iconBackground: string;
};

type ChainMetadata = {
  chainId: number;
  name?: string;
} & IconMetadata;

const arbitrumIcon: IconMetadata = {
  iconBackground: "#96bedc",
  iconUrl: async () => (await import("./chainIcons/arbitrum.svg")).default,
};

const comboIcon: IconMetadata = {
  iconBackground: "#000",
  iconUrl: async () => (await import("./chainIcons/combo.svg")).default,
};

const mantaIcon: IconMetadata = {
  iconBackground: "#000",
  iconUrl: async () => (await import("./chainIcons/manta.svg")).default,
};
const mantleIcon: IconMetadata = {
  iconBackground: "#000",
  iconUrl: async () => (await import("./chainIcons/mantle.svg")).default,
};
const avalancheIcon: IconMetadata = {
  iconBackground: "#e84141",
  iconUrl: async () => (await import("./chainIcons/avalanche.svg")).default,
};

const baseIcon: IconMetadata = {
  iconBackground: "#0052ff",
  iconUrl: async () => (await import("./chainIcons/base.svg")).default,
};

const bscIcon: IconMetadata = {
  iconBackground: "#ebac0e",
  iconUrl: async () => (await import("./chainIcons/bsc.svg")).default,
};

const cronosIcon: IconMetadata = {
  iconBackground: "#002D74",
  iconUrl: async () => (await import("./chainIcons/cronos.svg")).default,
};

const ethereumIcon: IconMetadata = {
  iconBackground: "#484c50",
  iconUrl: async () => (await import("./chainIcons/ethereum.svg")).default,
};

const hardhatIcon: IconMetadata = {
  iconBackground: "#f9f7ec",
  iconUrl: async () => (await import("./chainIcons/hardhat.svg")).default,
};

const optimismIcon: IconMetadata = {
  iconBackground: "#ff5a57",
  iconUrl: async () => (await import("./chainIcons/optimism.svg")).default,
};

const polygonIcon: IconMetadata = {
  iconBackground: "#9f71ec",
  iconUrl: async () => (await import("./chainIcons/polygon.svg")).default,
};

const zoraIcon: IconMetadata = {
  iconBackground: "#000000",
  iconUrl: async () => (await import("./chainIcons/zora.svg")).default,
};
const lineaIcon: IconMetadata = {
  iconBackground: "#000",
  iconUrl: async () => (await import("./chainIcons/linea.svg")).default,
};
const lineaTestIcon: IconMetadata = {
  iconBackground: "#4BDCFD",
  iconUrl: async () => (await import("./chainIcons/linea_test.svg")).default,
};
const GSCIcon: IconMetadata = {
  iconBackground: "#131313",
  iconUrl: async () => (await import("./chainIcons/gsc.svg")).default,
};
const ScrollIcon: IconMetadata = {
  iconBackground: "#131313",
  iconUrl: async () => (await import("./chainIcons/scroll.svg")).default,
};

const chainMetadataByName: Record<ChainName, ChainMetadata | null> = {
  arbitrum: { chainId: 42161, name: "Arbitrum", ...arbitrumIcon },
  arbitrumGoerli: { chainId: 421613, ...arbitrumIcon },
  avalanche: { chainId: 43114, ...avalancheIcon },
  avalancheFuji: { chainId: 43113, ...avalancheIcon },
  base: { chainId: 8453, ...baseIcon },
  baseGoerli: { chainId: 84531, ...baseIcon },
  bsc: { chainId: 56, name: "BSC", ...bscIcon },
  bscTestnet: { chainId: 97, ...bscIcon },
  cronos: { chainId: 25, ...cronosIcon },
  cronosTestnet: { chainId: 338, ...cronosIcon },
  goerli: { chainId: 5, ...ethereumIcon },
  hardhat: { chainId: 31337, ...hardhatIcon },
  kovan: { chainId: 42, ...ethereumIcon },
  localhost: { chainId: 1337, ...ethereumIcon },
  mainnet: { chainId: 1, ...ethereumIcon },
  optimism: { chainId: 10, name: "Optimism", ...optimismIcon },
  optimismGoerli: { chainId: 420, ...optimismIcon },
  optimismKovan: { chainId: 69, ...optimismIcon },
  polygon: { chainId: 137, ...polygonIcon },
  polygonMumbai: { chainId: 80001, ...polygonIcon },
  rinkeby: { chainId: 4, ...ethereumIcon },
  ropsten: { chainId: 3, ...ethereumIcon },
  sepolia: { chainId: 11155111, ...ethereumIcon },
  zora: { chainId: 7777777, ...zoraIcon },
  zoraTestnet: { chainId: 999, ...zoraIcon },

  lineaMainnet: { chainId: 59144, ...lineaIcon },
  lineaTestnet: { chainId: 59140, ...lineaTestIcon },
  opBNBMainnet: { chainId: 204, ...bscIcon },
  opBNBTestnet: { chainId: 5611, ...bscIcon },
  polygonZkEVMTestnet: { chainId: 1442, ...polygonIcon },
  GSCTestnet: { chainId: 1205, ...GSCIcon },
  scrollSepolia: { chainId: 534351, ...ScrollIcon },
  MantaPacificMainnet: { chainId: 169, ...mantaIcon },
  MantaPacificTestnet: { chainId: 3441005, ...mantaIcon },
  Combo: { chainId: 9980, ...comboIcon },
  ComboTestnet: { chainId: 91715, ...comboIcon },
  Mantle: { chainId: 5000, ...mantleIcon },
  MantleTestnet: { chainId: 5001, ...mantleIcon },
};

const chainMetadataById = Object.fromEntries(
  Object.values(chainMetadataByName)
    .filter(isNotNullish)
    .map(({ chainId, ...metadata }) => [chainId, metadata])
);

/** @description Decorates an array of wagmi `Chain` objects with RainbowKitChain property overrides */
export const provideRainbowKitChains = <Chain extends RainbowKitChain>(
  chains: Chain[]
): Chain[] =>
  chains.map((chain) => ({
    ...chain,
    ...(chainMetadataById[chain.id] ?? {}),
  }));
