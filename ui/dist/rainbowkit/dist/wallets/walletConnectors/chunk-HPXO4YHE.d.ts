export function uniswapWallet({ chains, projectId, walletConnectOptions, walletConnectVersion }: {
    chains: any;
    projectId: any;
    walletConnectOptions: any;
    walletConnectVersion?: string | undefined;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        ios: string;
        mobile: string;
        qrCode: string;
    };
    createConnector: () => {
        connector: any;
        mobile: {
            getUri: () => Promise<string>;
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
        };
    };
};
