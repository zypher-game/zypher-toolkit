export function coinbaseWallet({ appName, chains, ...options }: {
    [x: string]: any;
    appName: any;
    chains: any;
}): {
    id: string;
    name: string;
    shortName: string;
    iconUrl: () => Promise<string>;
    iconAccent: string;
    iconBackground: string;
    installed: true | undefined;
    downloadUrls: {
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
        chrome: string;
        browserExtension: string;
    };
    createConnector: () => {
        qrCode?: {
            getUri: () => Promise<string | null | undefined>;
            instructions: {
                learnMoreUrl: string;
                steps: {
                    description: string;
                    step: string;
                    title: string;
                }[];
            };
        } | undefined;
        extension?: {
            instructions: {
                learnMoreUrl: string;
                steps: {
                    description: string;
                    step: string;
                    title: string;
                }[];
            };
        } | undefined;
        connector: CoinbaseWalletConnector;
    };
};
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
