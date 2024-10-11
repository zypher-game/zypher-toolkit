import { Address } from "wagmi";
import { ChainId, getCryptoImg, isPro, isTestnet } from "./constant";
const mainApi = "https://tvl-backend-api-mainnet.zypher.game";
const testApi = "https://tvl-backend-api.zypher.game";
const getApi = (v: ChainId) => {
  if (isTestnet[v]) {
    return testApi;
  }
  return mainApi;
};
export const TVL_API = Object.fromEntries(
  (Object.values(ChainId) as ChainId[]).map((v) => [v, getApi(v)])
) as Record<ChainId, string>;
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
export const hideTVLStakingSupportedChainId = true;
export const TVLStakingSupportedChainId = (!isPro()
  ? // ? [TVLChainId.B2Testnet, TVLChainId.Sepolia, ]
    [TVLChainId.LineaMainnet, TVLChainId.LineaSepolia] // ,
  : []) as unknown as ChainId[];
export const defaultActiveChainId = TVLStakingSupportedChainId[0];
export const L3ChainId: Record<any, ChainId> = {
  [TVLChainId.B2]: ChainId.ZytronB2Testnet,
  [TVLChainId.B2Testnet]: ChainId.ZytronB2Testnet,
  [TVLChainId.LineaMainnet]: ChainId.ZytronLineaMain,
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
  [TVLChainId.LineaMainnet]: {
    Staking: "0x69d58b936f6D2Ae7dADbEbc244CB83A8C61b3fb3",
    ZypherGameToken: "0x6ba3593101E32cEdBDE5AC9439e9187736B26A15",
    CRHero: "0x04117234880577EFABd98BF9A167e2ee7E402D1b",
    Soulbound: "0xc5254aBF57CeDeF2e8F112BBDf28317f8111a4F8",
  },
  [TVLChainId.LineaSepolia]: {
    Staking: "0x5e35952a6c2e747C7997F307ab5A476B6674058A",
    ZypherGameToken: "0x91D416d939baA3Aa822DD1B776fC5e9610b952C2",
    CRHero: "0x2D70241E9772F25d0BC6Eb603f1552Aad3370CBC",
    Soulbound: "0x9555e2e9F79702B74EC5bDAB50b2cCB2b62FD39F",
  },
  [TVLChainId.B2Testnet]: {
    Staking: "0x3A10Aa6D3d177AF22433CF1f1B6Ee1f7B7DbD303",
    ZypherGameToken: "0x48C459e81aAD8B98e27002D25f191682C9a9fFBb",
    CRHero: "0x5f441d16bA9A5e3a824f4c287eDA8019F97418f6",
    Soulbound: "0x77DB62EAB363e6DEF480e4C63210f162438eeD77",
  },
} as unknown as Record<ChainId, Record<string, Address>>;
export const tvlTokenAddress: Record<ChainId, Record<string, Address>> = {
  [TVLChainId.LineaMainnet]: {
    WETH: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
    wstETH: "0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F",
    ezETH: "0x2416092f143378750bb29b79eD961ab195CcEea5",
    STONE: "0x93F4d0ab6a8B4271f4a28Db399b5E30612D21116",
  },
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
  chainId: ChainId[];
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
    chainId: [
      TVLChainId.LineaSepolia,
      TVLChainId.LineaMainnet,
    ] as unknown as ChainId[],
  },
  B: {
    key: 2,
    label: "B",
    chainId: [TVLChainId.B2, TVLChainId.B2Testnet] as unknown as ChainId[],
  },
};
export const getLinkPre = (chainId: ChainId): ILinkPre => {
  return Object.values(LinkPre).filter((v) => v.chainId.includes(chainId))[0];
};

export const minStakingValue: Record<TVLChainId, string> = {
  [TVLChainId.B2]: "0.0005",
  [TVLChainId.B2Testnet]: "0.0005",
  [TVLChainId.LineaMainnet]: "0.01",
  [TVLChainId.LineaSepolia]: "0.01",
};
export const CODELENGTH = 6;
