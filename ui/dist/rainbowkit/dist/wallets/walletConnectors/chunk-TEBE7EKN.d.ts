export function frontierWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
    [x: string]: any;
    chains: any;
    projectId: any;
    walletConnectOptions: any;
    walletConnectVersion?: string | undefined;
}): {
    id: string;
    name: string;
    installed: boolean | undefined;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        android: string;
        ios: string;
        qrCode: string;
        chrome: string;
        browserExtension: string;
    };
    createConnector: () => {
        connector: InjectedConnector;
        mobile: {
            getUri: (() => Promise<any>) | undefined;
        };
        qrCode: {
            getUri: () => Promise<any>;
            instructions: {
                learnMoreUrl: string;
                steps: {
                    description: string;
                    step: string;
                    title: string;
                }[];
            };
        } | undefined;
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
};
import { InjectedConnector } from "wagmi/connectors/injected";
