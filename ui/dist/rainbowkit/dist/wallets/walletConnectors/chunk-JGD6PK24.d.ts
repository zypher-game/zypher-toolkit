export function walletConnectWallet({ chains, options, projectId, version }: {
    chains: any;
    options: any;
    projectId: any;
    version?: string | undefined;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    createConnector: () => {
        mobile?: {
            getUri: () => Promise<any>;
        } | undefined;
        qrCode?: {
            getUri: () => Promise<any>;
        } | undefined;
        connector: any;
    };
};
