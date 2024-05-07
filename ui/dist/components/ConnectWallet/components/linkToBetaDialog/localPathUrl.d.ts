import { ChainId } from "../../../../constant/constant";
export declare enum ILocalPathUrl {
    COMBO = "COMBO",
    MANTA = "MANTA",
    BATE = "BATE",
    MANTLE = "MANTLE"
}
export declare const getChainNameText: (chainId: ChainId) => string[];
export declare const localPathUrl: () => ILocalPathUrl;
