import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { connectorsForWallets } from './connectorsForWallets';
import { WalletList } from './Wallet';
export declare const getDefaultWallets: ({ appName, chains, projectId }: {
    appName: string;
    projectId: string;
    chains: Chain[];
}) => {
    connectors: ReturnType<typeof connectorsForWallets>;
    wallets: WalletList;
};
