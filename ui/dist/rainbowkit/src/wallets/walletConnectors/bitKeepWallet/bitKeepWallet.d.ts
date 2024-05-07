import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import type { WalletConnectConnectorOptions, WalletConnectLegacyConnectorOptions } from '../../getWalletConnectConnector';
import { Wallet } from '../../Wallet';
export interface BitKeepWalletLegacyOptions {
    projectId?: string;
    chains: Chain[];
    walletConnectVersion: '1';
    walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}
export interface BitKeepWalletOptions {
    projectId: string;
    chains: Chain[];
    walletConnectVersion?: '2';
    walletConnectOptions?: WalletConnectConnectorOptions;
}
export declare const bitKeepWallet: ({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: (BitKeepWalletLegacyOptions | BitKeepWalletOptions) & InjectedConnectorOptions) => Wallet;
