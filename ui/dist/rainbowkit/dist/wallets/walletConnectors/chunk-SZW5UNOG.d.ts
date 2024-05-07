export function tahoWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconBackground: string;
    iconUrl: () => Promise<string>;
    downloadUrls: {
        chrome: string;
        browserExtension: string;
    };
    installed: boolean | undefined;
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
