export function braveWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    installed: boolean;
    downloadUrls: {};
    createConnector: () => {
        connector: InjectedConnector;
    };
};
import { InjectedConnector } from "wagmi/connectors/injected";
