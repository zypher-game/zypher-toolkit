import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import type { WalletConnectConnectorOptions, WalletConnectLegacyConnectorOptions } from '../../getWalletConnectConnector';
import { Wallet } from '../../Wallet';
export interface BitgetWalletLegacyOptions {
    projectId?: string;
    chains: Chain[];
    walletConnectVersion: '1';
    walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}
export interface BitgetWalletOptions {
    projectId: string;
    chains: Chain[];
    walletConnectVersion?: '2';
    walletConnectOptions?: WalletConnectConnectorOptions;
}
export declare const bitgetWallet: ({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: (BitgetWalletLegacyOptions | BitgetWalletOptions) & InjectedConnectorOptions) => Wallet;
