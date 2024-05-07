export function argentWallet({ chains, projectId, walletConnectOptions, walletConnectVersion }: {
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
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
    };
    createConnector: () => {
        connector: any;
        mobile: {
            getUri: () => Promise<any>;
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
