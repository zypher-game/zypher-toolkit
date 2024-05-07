export function rainbowWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
    [x: string]: any;
    chains: any;
    projectId: any;
    walletConnectOptions: any;
    walletConnectVersion?: string | undefined;
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
        browserExtension: string;
    };
    createConnector: () => {
        connector: any;
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
    };
};
