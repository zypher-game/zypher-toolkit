import { Address } from "wagmi";
import { ChainId, getCryptoImg, isPro } from "./constant";
export const TVL_API = "https://tvl-backend-api.zypher.game";
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
  LineaSepolia = ChainId.LineaSepolia,
}
export const TVLStakingSupportedChainId = (!isPro()
  ? // ? [TVLChainId.B2Testnet, TVLChainId.Sepolia, ]
    [TVLChainId.LineaSepolia] // ,
  : []) as unknown as ChainId[];
export const defaultActiveChainId = TVLStakingSupportedChainId[0];
export const L3ChainId: Record<any, ChainId> = {
  [TVLChainId.B2]: ChainId.ZytronB2Testnet,
  [TVLChainId.B2Testnet]: ChainId.ZytronB2Testnet,
  [TVLChainId.LineaMainnet]: ChainId.ZytronLineaSepoliaTestnet,
  [TVLChainId.LineaSepolia]: ChainId.ZytronLineaSepoliaTestnet,
};
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
  [TVLChainId.LineaSepolia]: {
    Staking: "0x9F175b446F194c9A6aca09e998EF3327158d6eb7",
    ZypherGameToken: "0x91D416d939baA3Aa822DD1B776fC5e9610b952C2",
    CRHero: "0x90a5B2a7Eb91562b1e3189dcf14f62B2529bEC7e",
    Soulbound: "0xf3ca479d43885C714537a58063604D314ecabe0E",
  },
  [TVLChainId.B2Testnet]: {
    Staking: "0x3A10Aa6D3d177AF22433CF1f1B6Ee1f7B7DbD303",
    ZypherGameToken: "0x48C459e81aAD8B98e27002D25f191682C9a9fFBb",
    CRHero: "0x5f441d16bA9A5e3a824f4c287eDA8019F97418f6",
    Soulbound: "0x77DB62EAB363e6DEF480e4C63210f162438eeD77",
  },
} as unknown as Record<ChainId, Record<string, Address>>;
export const tvlTokenAddress: Record<ChainId, Record<string, Address>> = {
  [TVLChainId.LineaSepolia]: {
    WETH: "0xAeb65CCDe3b88CA9095D7Cc1d8ACa82ae865AcA6",
    wstETH: "0xd9c4d0Bf3881510d9d7a883c94Bd856c4d314370",
    ezETH: "0x79A67D40f3e7396FC122268DC0136896cC7D7271",
    STONE: "0xf8b7E9A37857B01Cb9AD74e6fCaD149f44490601",
  },
  [TVLChainId.B2Testnet]: {
    WBTC: "0x9Cae525AdE710904FE81daF47fD26789608fe057",
    stBTC: "0x4AC1Ba5885929aFDdbf035bA03013836db27012C",
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
            currency === "BTC" || currency === "WBTC" || currency === "STONE"
              ? ".svg"
              : ".png"
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
      : TVLChainId.LineaSepolia) as unknown as ChainId,
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
  [TVLChainId.LineaSepolia]: "0.01",
};
export const CODELENGTH = 6;
