export function phantomWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    installed: true | undefined;
    downloadUrls: {
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
        chrome: string;
        firefox: string;
        browserExtension: string;
    };
    createConnector: () => {
        connector: InjectedConnector;
        extension: {
            instructions: {
                steps: {
                    description: string;
                    step: string;
                    title: string;
                }[];
                learnMoreUrl: string;
            };
        };
    };
};
import { InjectedConnector } from "wagmi/connectors/injected";
