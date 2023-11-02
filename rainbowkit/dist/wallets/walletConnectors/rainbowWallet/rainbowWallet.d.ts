import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import type { WalletConnectConnectorOptions, WalletConnectLegacyConnectorOptions } from '../../getWalletConnectConnector';
import { Wallet } from '../../Wallet';
export interface RainbowWalletLegacyOptions {
    projectId?: string;
    chains: Chain[];
    walletConnectVersion: '1';
    walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}
export interface RainbowWalletOptions {
    projectId: string;
    chains: Chain[];
    walletConnectVersion?: '2';
    walletConnectOptions?: WalletConnectConnectorOptions;
}
export declare const rainbowWallet: ({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: (RainbowWalletLegacyOptions | RainbowWalletOptions) & InjectedConnectorOptions) => Wallet;
