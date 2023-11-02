import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
declare type WalletConnectVersion = '1' | '2';
declare type WalletConnectConnectorConfig = ConstructorParameters<typeof WalletConnectConnector>[0];
export declare type WalletConnectConnectorOptions = WalletConnectConnectorConfig['options'];
declare type WalletConnectLegacyConnectorConfig = ConstructorParameters<typeof WalletConnectLegacyConnector>[0];
export declare type WalletConnectLegacyConnectorOptions = WalletConnectLegacyConnectorConfig['options'];
export declare function getWalletConnectConnector(config: {
    version?: WalletConnectVersion;
    projectId?: string;
    chains: Chain[];
    options?: WalletConnectConnectorOptions;
}): WalletConnectConnector;
export declare function getWalletConnectConnector(config: {
    version: '1';
    chains: Chain[];
    options?: WalletConnectLegacyConnectorOptions;
}): WalletConnectLegacyConnector;
export declare function getWalletConnectConnector(config: {
    version: '2';
    projectId: string;
    chains: Chain[];
    options?: WalletConnectConnectorOptions;
}): WalletConnectConnector;
export {};
