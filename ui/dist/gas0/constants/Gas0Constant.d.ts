import { Address } from "wagmi";
export type IGas0Config = {
    api: string;
    PermitProxy: Address;
    isGameFree: boolean;
};
export declare const Gas0Constants: Record<string, IGas0Config>;
