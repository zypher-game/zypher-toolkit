import { Address } from "wagmi";
import { ChainId } from "./constant";
export declare const TVL_API: Record<ChainId, string>;
export declare enum ITvlHero {
    Agil = "Agil",
    Yueling = "Yueling",
    Celus = "Celus",
    Ivan = "Ivan",
    Liana = "Liana"
}
export declare enum TVLChainId {
    B2 = "223",
    B2Testnet = "1123",
    LineaMainnet = "59144",
    LineaSepolia = "59141"
}
export declare const hideTVLStakingSupportedChainId = false;
export declare const TVLStakingSupportedChainId: ChainId[];
export declare const defaultActiveChainId: ChainId;
export declare const L3ChainId: Record<any, ChainId>;
export type IToken = {
    address: Address;
    symbol: string;
    logoPath: string;
    index: number;
};
export type TVLToken = {
    USDT: IToken;
    WETH: IToken;
};
export declare const activeTokenList: Record<ChainId, Record<"Staking" | "ZypherGameToken" | "CRHero" | "Soulbound", Address>>;
export declare const tvlTokenAddress: Record<ChainId, Record<string, Address>>;
export declare const tvlTokens: {
    [k: string]: {
        [k: string]: {
            address: `0x${string}`;
            symbol: string;
            logoPath: string;
            index: number;
        };
    };
};
type ILinkPre = {
    key: number;
    label: string;
    chainId: ChainId[];
};
export declare const LinkPre: Record<string, ILinkPre>;
export declare const getLinkPre: (chainId: ChainId) => ILinkPre;
export declare const minStakingValue: Record<TVLChainId, string>;
export declare const CODELENGTH = 6;
export {};
