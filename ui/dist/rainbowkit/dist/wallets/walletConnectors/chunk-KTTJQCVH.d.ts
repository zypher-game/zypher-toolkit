export function bitskiWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    installed: boolean;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        chrome: string;
        browserExtension: string;
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
