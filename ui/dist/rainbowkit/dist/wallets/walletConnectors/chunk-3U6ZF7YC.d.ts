export function mewWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    installed: boolean;
    downloadUrls: {
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
    };
    createConnector: () => {
        connector: InjectedConnector;
    };
};
import { InjectedConnector } from "wagmi/connectors/injected";
