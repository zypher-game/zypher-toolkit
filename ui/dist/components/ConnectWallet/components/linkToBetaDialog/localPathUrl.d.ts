import { ChainId } from "../../../../constant/constant";
export declare enum ILocalPathUrl {
    COMBO = "COMBO",
    MANTA = "MANTA",
    BATE = "BATE",
    Hypr = "Hypr",
    MANTLE = "MANTLE",
    TaikoHeklaTestnet9 = "TaikoHeklaTestnet9",
    Saga = "Saga",
    B3 = "B3",
    EXP = "EXP"
}
export declare const getChainNameText: (chainId: ChainId, params?: {
    isLowcase: boolean;
}) => string;
export declare const localPathUrl: (chainId: ChainId) => ILocalPathUrl;
