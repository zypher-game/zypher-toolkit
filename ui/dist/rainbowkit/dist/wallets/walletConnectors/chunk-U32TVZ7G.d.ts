export function injectedWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    hidden: ({ wallets }: {
        wallets: any;
    }) => any;
    createConnector: () => {
        connector: InjectedConnector;
    };
};
import { InjectedConnector } from "wagmi/connectors/injected";
