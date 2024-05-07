export function oneKeyWallet({ chains }: {
    chains: any;
}): {
    createConnector: () => {
        connector: InjectedConnector;
        extension: {
            instructions: {
                learnMoreUrl: string;
                steps: {
                    description: string;
                    step: string;
                    title: string;
                }[];
            };
        };
    };
    downloadUrls: {
        android: string;
        browserExtension: string;
        chrome: string;
        edge: string;
        ios: string;
        mobile: string;
        qrCode: string;
    };
    iconAccent: string;
    iconBackground: string;
    iconUrl: () => Promise<string>;
    id: string;
    installed: boolean;
    name: string;
};
import { InjectedConnector } from "wagmi/connectors/injected";
