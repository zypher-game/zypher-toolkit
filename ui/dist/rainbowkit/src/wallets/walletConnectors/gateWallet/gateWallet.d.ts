import type { InjectedConnectorOptions } from "@wagmi/core/dist/connectors/injected";
import { Chain } from "../../../components/RainbowKitProvider/RainbowKitChainContext";
import { Wallet } from "../../Wallet";
import { WalletConnectConnectorOptions, WalletConnectLegacyConnectorOptions } from "../../getWalletConnectConnector";
export interface GateWalletLegacyOptions {
    projectId?: string;
    chains: Chain[];
    walletConnectVersion: "1";
    walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}
export interface GateWalletOptions {
    projectId: string;
    chains: Chain[];
    walletConnectVersion?: "2";
    walletConnectOptions?: WalletConnectConnectorOptions;
}
export declare const gateWallet: ({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: GateWalletOptions & InjectedConnectorOptions) => Wallet;
