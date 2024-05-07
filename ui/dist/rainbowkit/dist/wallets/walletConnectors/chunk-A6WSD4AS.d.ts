export function safeWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconAccent: string;
    iconBackground: string;
    iconUrl: () => Promise<string>;
    installed: boolean;
    downloadUrls: {};
    createConnector: () => {
        connector: SafeConnector;
    };
};
import { SafeConnector } from "wagmi/connectors/safe";
