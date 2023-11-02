import { Connector } from 'wagmi';
export declare type InstructionStepName = 'install' | 'create' | 'scan' | 'refresh';
declare type RainbowKitConnector<C extends Connector = Connector> = {
    connector: C;
    mobile?: {
        getUri?: () => Promise<string>;
    };
    desktop?: {
        getUri?: () => Promise<string>;
    };
    qrCode?: {
        getUri: () => Promise<string>;
        instructions?: {
            learnMoreUrl: string;
            steps: {
                step: InstructionStepName;
                title: string;
                description: string;
            }[];
        };
    };
    extension?: {
        instructions?: {
            learnMoreUrl: string;
            steps: {
                step: InstructionStepName;
                title: string;
                description: string;
            }[];
        };
    };
};
export declare type Wallet<C extends Connector = Connector> = {
    id: string;
    name: string;
    shortName?: string;
    iconUrl: string | (() => Promise<string>);
    iconAccent?: string;
    iconBackground: string;
    installed?: boolean;
    downloadUrls?: {
        android?: string;
        ios?: string;
        mobile?: string;
        qrCode?: string;
        chrome?: string;
        edge?: string;
        firefox?: string;
        opera?: string;
        safari?: string;
        browserExtension?: string;
    };
    hidden?: (args: {
        wallets: {
            id: string;
            connector: Connector;
            installed?: boolean;
            name: string;
        }[];
    }) => boolean;
    createConnector: () => RainbowKitConnector<C>;
};
export declare type WalletList = {
    groupName: string;
    wallets: Wallet[];
}[];
export declare type WalletInstance = Omit<Wallet, 'createConnector' | 'hidden'> & ReturnType<Wallet['createConnector']> & {
    index: number;
    groupIndex: number;
    groupName: string;
    walletConnectModalConnector?: Connector;
};
export {};
