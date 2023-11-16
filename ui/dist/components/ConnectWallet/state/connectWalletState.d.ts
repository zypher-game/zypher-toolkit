import { ChainId } from "../../../constant/constant";
export type IConnectorState = {
    chainId?: number | null;
    networkError?: boolean | null;
};
export declare const connectorState: import("recoil").RecoilState<IConnectorState>;
export declare const walletModalOpenState: import("recoil").RecoilState<boolean>;
export declare const ChainSelector: import("recoil").RecoilState<boolean>;
export declare const refreshBalanceState: import("recoil").RecoilState<string>;
export declare const pointsDialogState: import("recoil").RecoilState<boolean>;
export declare const pointsWarnState: import("recoil").RecoilState<number>;
export declare const hidePointsWarnState: import("recoil").RecoilState<boolean>;
export declare const pointsRuleDialogState: import("recoil").RecoilState<boolean>;
export declare const accountInfoDialogState: import("recoil").RecoilState<boolean>;
export declare const linkToBetaDialogState: import("recoil").RecoilState<boolean>;
export declare const linkToBetaDialogChainIdState: import("recoil").RecoilState<ChainId | undefined>;
export declare const nativeBalanceState: import("recoil").RecoilState<number>;
export declare const pointsBalanceState: import("recoil").RecoilState<number>;
