import { Address } from "wagmi";
import { ChainId, getCryptoImg, isPro } from "./constant";
export const TVL_API = "https://tvl-backend-api.zypher.game";
export const isGames = true;
export enum ITvlHero {
  Agil = "Agil",
  Yueling = "Yueling",
  Celus = "Celus",
  Ivan = "Ivan",
  Liana = "Liana",
}
export enum TVLChainId {
  B2 = ChainId.B2,
  B2Testnet = ChainId.B2Testnet,
  LineaMainnet = ChainId.LineaMainnet,
  LineaTestnet = ChainId.LineaTestnet,
}
export const defaultActiveChainId = TVLChainId.B2Testnet as unknown as ChainId;
export const TVLStakingSupportedChainId = (!isPro()
  ? // ? [TVLChainId.B2Testnet, TVLChainId.Sepolia, TVLChainId.LineaTestnet]
    [TVLChainId.LineaTestnet, TVLChainId.B2Testnet] // , TVLChainId.LineaTestnet
  : []) as unknown as ChainId[];

export type IToken = {
  address: Address;
  symbol: string;
  // name: string
  // decimal: number
  logoPath: string;
  index: number;
};
export type TVLToken = {
  USDT: IToken;
  WETH: IToken;
  // GP: IToken
};
export const activeTokenList: Record<
  ChainId,
  Record<"Staking" | "ZypherGameToken" | "CRHero" | "Soulbound", Address>
> = {
  [TVLChainId.LineaTestnet]: {
    Staking: "0x82D73A3AcbD6529dDA23E8Ea8883450697b1b637",
    ZypherGameToken: "0x5275A8593ce6a967Ae6782a70F417135A44bCd27",
    CRHero: "0x76E08f9D5f76590E12427F003325768290602De1",
    Soulbound: "0xd64dd18365cCb07B7a0cc22Fbf5ec39Bd89B5FfA",
  },
  [TVLChainId.B2Testnet]: {
    Staking: "0xea37f290392cB0EeFC33621E1D4a60d2Ad372bA2",
    ZypherGameToken: "0x6F36BF53bE9be182599CD7E937E5F32152cEAf41",
    CRHero: "0x5f441d16bA9A5e3a824f4c287eDA8019F97418f6",
    Soulbound: "0x79aDd9Be54429A034B2F89E8C5C46CEC5F9a2359",
  },
} as unknown as Record<ChainId, Record<string, Address>>;
export const tvlTokenAddress: Record<ChainId, Record<string, Address>> = {
  [TVLChainId.LineaTestnet]: {
    WETH: "0x5131bc5Ed480a524932D2638922616fE968374FE",
    wstETH: "0xc2DEc928E445Bb1E491ad7Ac077672037D339a3E",
    ezETH: "0xbd36B55DF798a2031A9E06A9e8a1AC0C625911dE",
  },
  [TVLChainId.B2Testnet]: {
    WBTC: "0x9Cae525AdE710904FE81daF47fD26789608fe057",
    uBTC: "0x4AC1Ba5885929aFDdbf035bA03013836db27012C",
  },
} as unknown as Record<ChainId, Record<string, Address>>;
export const tvlTokens = Object.fromEntries(
  TVLStakingSupportedChainId.map((chainId) => [
    chainId,
    Object.fromEntries(
      Object.keys(tvlTokenAddress[chainId]).map((currency) => [
        currency,
        {
          address: tvlTokenAddress[chainId][currency],
          symbol: currency,
          logoPath: getCryptoImg(
            "token",
            currency,
            currency === "BTC" || currency === "WBTC" ? ".svg" : ".png"
          ),
          index: 2,
        },
      ])
    ),
  ])
);
type ILinkPre = {
  key: number;
  label: string;
  chainId: ChainId;
};
export const LinkPre: Record<string, ILinkPre> = {
  // "E": {
  //   key: 0,
  // label: "E",
  // chainId: isPro() ? ChainId.
  // } ,
  L: {
    key: 1,
    label: "L",
    chainId: (isPro()
      ? TVLChainId.LineaMainnet
      : TVLChainId.LineaTestnet) as unknown as ChainId,
  },
  B: {
    key: 2,
    label: "B",
    chainId: (isPro()
      ? TVLChainId.B2
      : TVLChainId.B2Testnet) as unknown as ChainId,
  },
};
export const getLinkPre = (chainId: ChainId): ILinkPre => {
  return Object.values(LinkPre).filter((v) => v.chainId === chainId)[0];
};

export const minStakingValue: Record<TVLChainId, string> = {
  [TVLChainId.B2]: "0.0005",
  [TVLChainId.B2Testnet]: "0.0005",
  [TVLChainId.LineaMainnet]: "0.01",
  [TVLChainId.LineaTestnet]: "0.01",
};
export const CODELENGTH = 6;
