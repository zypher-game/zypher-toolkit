import { ChainId } from "./constant";
export type IGamesItem = {
    label: string;
    icon: string;
    twitter?: string;
    link?: string;
};
export type IGames = {
    keyValue: string;
    dapps: IGamesItem[];
};
export declare const Games: (chainId: ChainId) => IGames[];
