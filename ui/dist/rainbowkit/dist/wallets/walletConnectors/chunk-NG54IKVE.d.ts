export function talismanWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    installed: boolean;
    downloadUrls: {
        chrome: string;
        firefox: string;
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
