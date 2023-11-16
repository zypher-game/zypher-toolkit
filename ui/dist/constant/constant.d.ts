import BigNumberjs from "bignumber.js";
import { Address } from "wagmi";
export declare const appInfo: {
    appName: string;
};
export declare const divisor6xBigNumber: BigNumberjs;
export declare const divisorBigNumber: BigNumberjs;
export declare const txStatus = "success";
export declare const preStaticUrl = "https://static.zypher.game";
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
    ComboTestnet = 91715,
    Mantle = 5000,
    MantleTestnet = 5001
}
export declare const defaultChainId = ChainId.OPBNB;
export declare const supportedChainIds: (env: string) => ChainId[];
export declare const ChainRpcUrls: Record<ChainId, string[]>;
export declare const ChainRpcWebSocketUrls: Partial<Record<ChainId, string[]>>;
export declare const BlockExplorerUrls: Record<ChainId, string[]>;
export declare const ChainBridge: {
    [key: number]: string;
};
export declare const ChainName: Record<ChainId, string>;
export declare const ChainNetworkName: Record<ChainId, string>;
export declare const isTestnet: Record<ChainId, boolean>;
export declare const ChainImage: Record<ChainId, string>;
export declare const Currency: Record<ChainId, string>;
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
    Monster = "Monster"
}
export declare const zkBingoV0: (chainId: number | undefined, name: IContractName) => Address;
export declare const zkBingo: (chainId: number | undefined, name: IContractName) => Address;
export declare const defaultRankChainId = ChainId.ArbitrumGoerli;
export {};
