export function ledgerWallet({ chains, projectId, walletConnectOptions, walletConnectVersion }: {
    chains: any;
    projectId: any;
    walletConnectOptions: any;
    walletConnectVersion?: string | undefined;
}): {
    id: string;
    iconBackground: string;
    name: string;
    iconUrl: () => Promise<string>;
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
        desktop: {
            getUri: () => Promise<string>;
        };
    };
};
