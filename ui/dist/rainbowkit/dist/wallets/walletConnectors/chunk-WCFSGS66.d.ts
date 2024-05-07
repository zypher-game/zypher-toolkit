export function trustWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
    [x: string]: any;
    chains: any;
    projectId: any;
    walletConnectOptions: any;
    walletConnectVersion?: string | undefined;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    installed: true | undefined;
    iconAccent: string;
    iconBackground: string;
    downloadUrls: {
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
        chrome: string;
        browserExtension: string;
    };
    createConnector: () => {
        connector: any;
        mobile: {
            getUri: (() => Promise<string>) | undefined;
        };
        qrCode: undefined;
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
