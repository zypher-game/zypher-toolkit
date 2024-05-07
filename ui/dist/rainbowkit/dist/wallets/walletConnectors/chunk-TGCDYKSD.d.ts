export function okxWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
    [x: string]: any;
    chains: any;
    projectId: any;
    walletConnectOptions: any;
    walletConnectVersion?: string | undefined;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconAccent: string;
    iconBackground: string;
    downloadUrls: {
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
        chrome: string;
        edge: string;
        firefox: string;
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
