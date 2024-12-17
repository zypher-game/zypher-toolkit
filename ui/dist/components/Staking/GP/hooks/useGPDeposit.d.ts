import { Address } from "viem";
import { IToken } from "../../../../constant/tvlConstant";
export interface IHealth {
    gp: Address;
    vault: Address;
    ok: boolean;
    canDeposit: boolean;
    canHandleGP: boolean;
    canWithdraw: boolean;
    accumulatedFee: string;
    ethLiquidity: string;
    exchangeRate: string;
    feeWithdraw: string;
    gpHandling: string;
    gpLiquidity: string;
    liquidityRatio: string;
    maxWithdrawStr: string;
    minDeposit: string;
    minDepositStr: string;
    minWithdraw: string;
    maxWithdraw: string;
    minWithdrawStr: string;
    timestamp: string;
}
export interface IUseGPDeposit {
    NativeToken?: IToken;
    GPToken?: IToken;
    loadingDeposit?: boolean;
    loadingWithdraw?: boolean;
    allowance?: string;
    loadingApprove?: boolean;
    health?: IHealth;
    deposit?: ({ nativeValue, GPValue, }: {
        nativeValue: string;
        GPValue: string;
    }) => Promise<void>;
    withdraw?: ({ nativeValue, GPValue, }: {
        nativeValue: string;
        GPValue: string;
    }) => Promise<void>;
}
export declare const useGPDeposit: ({ env, setSuccessToast, setErrorToast, }: {
    env: string;
    setSuccessToast: any;
    setErrorToast: any;
}) => IUseGPDeposit;
