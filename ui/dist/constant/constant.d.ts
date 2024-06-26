import BigNumberjs from "bignumber.js";
import { Address } from "wagmi";
export declare const appInfo: {
    appName: string;
};
export declare const divisor6xBigNumber: BigNumberjs;
export declare const divisorBigNumber: BigNumberjs;
export declare const txStatus = "success";
export declare const isPro: () => boolean;
export declare const preStaticUrl: string;
export declare enum ChainId {
    Mainnet = 56,
    Testnet = 97,
    Arbitrum = 42161,
    ArbitrumRinkeby = 421611,
    LineaTestnet = 59140,
    LineaMainnet = 59144,
    POLYGON_MUMBAI = 80001,
    POLYGON_ZKEVM = 1442,
    ArbitrumGoerli = 421613,
    ScrollAlphaTestnet = 534353,
    OPBNBTEST = 5611,
    OPBNB = 204,
    ScrollSepoliaTestnet = 534351,
    MantaPacificMainnet = 169,
    MantaPacificTestnet = 3441005,
    Combo = 9980,
    ComboTestnet = 91715,
    Mantle = 5000,
    MantleTestnet = 5001,
    Sepolia = 11155111,
    TaikoHeklaTestnet9 = 167009
}
export declare const DPSupportChainId: ChainId[];
export declare const bingoV1SupportedChainId: ChainId[];
export declare const bingoBetaSupportedChainId: ChainId[];
export declare const bingoSupportedChainId: ChainId[];
export declare const supportedChainIds: (env?: string, chainList?: ChainId[]) => ChainId[];
export declare const ChainRpcUrls: Record<ChainId, string[]>;
export declare const ChainRpcWebSocketUrls: Partial<Record<ChainId, string[]>>;
export declare const BlockExplorerUrls: Record<ChainId, string[]>;
export declare const ChainBridge: {
    [key: number]: string;
};
export declare const ChainName: Record<ChainId, string>;
export declare const ChainNetworkName: Record<ChainId, string>;
export declare const isTestnet: Record<ChainId, boolean>;
export declare const Currency: Record<ChainId, string>;
export declare const getCryptoImg: (fileName: string, key: any, type?: string) => string;
export declare const ChainImage: Record<ChainId, string>;
export declare const CurrencyLogo: Record<ChainId, string>;
interface IExternalMarketContract {
    multicall: string[];
}
export declare const CurrencyContract: Record<ChainId, IExternalMarketContract>;
export declare enum IContractName {
    Lobby = "lobby",
    Card = "card",
    Points = "points",
    ZypherGameToken = "ZypherGameToken",
    Reward = "reward",
    Fee = "ZkBingoFee",
    Monster = "Monster",
    Z2048SBT = "Z2048SBT",
    ZkGame2048 = "ZkGame2048",
    ZkGame2048API = "ZkGame2048API"
}
export declare const zkBingoV0: (chainId: number | undefined, name: IContractName) => Address;
export declare const zkBingo: (chainId: number | undefined, name: IContractName) => Address;
export declare const defaultRankChainId = ChainId.ArbitrumGoerli;
export {};
