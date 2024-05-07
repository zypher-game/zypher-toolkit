export function enkryptWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    installed: boolean | undefined;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        qrCode: string;
        chrome: string;
        browserExtension: string;
        edge: string;
        firefox: string;
        opera: string;
        safari: string;
    };
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
};
import { InjectedConnector } from "wagmi/connectors/injected";
