export function dawnWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    installed: any;
    hidden: () => boolean;
    downloadUrls: {
        ios: string;
        mobile: string;
    };
    createConnector: () => {
        connector: InjectedConnector;
    };
};
import { InjectedConnector } from "wagmi/connectors/injected";
