import { ConnectButton } from "./chunk-EDYU5S3J.js";
import { RainbowKitAuthenticationProvider } from "./chunk-EDYU5S3J.js";
import { RainbowKitProvider } from "./chunk-EDYU5S3J.js";
export namespace __private__ {
    export { DesktopOptions };
    export { dialogContent };
    export { dialogContentMobile };
    export { MobileOptions };
}
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
export function bifrostWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
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
    installed: any;
    downloadUrls: {
        android: string;
        ios: string;
        qrCode: string;
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
export function bitKeepWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
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
    installed: true | undefined;
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
export function bitgetWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
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
    installed: true | undefined;
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
export function bitskiWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    installed: boolean;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        chrome: string;
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
export function braveWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    installed: boolean;
    downloadUrls: {};
    createConnector: () => {
        connector: InjectedConnector;
    };
};
export function coin98Wallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
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
export function coinbaseWallet({ appName, chains, ...options }: {
    [x: string]: any;
    appName: any;
    chains: any;
}): {
    id: string;
    name: string;
    shortName: string;
    iconUrl: () => Promise<string>;
    iconAccent: string;
    iconBackground: string;
    installed: true | undefined;
    downloadUrls: {
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
        chrome: string;
        browserExtension: string;
    };
    createConnector: () => {
        qrCode?: {
            getUri: () => Promise<string | null | undefined>;
            instructions: {
                learnMoreUrl: string;
                steps: {
                    description: string;
                    step: string;
                    title: string;
                }[];
            };
        } | undefined;
        extension?: {
            instructions: {
                learnMoreUrl: string;
                steps: {
                    description: string;
                    step: string;
                    title: string;
                }[];
            };
        } | undefined;
        connector: CoinbaseWalletConnector;
    };
};
export function connectorsForWallets(walletList: any): () => any[];
export function coreWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
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
        chrome: string;
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
import { createAuthenticationAdapter } from "./chunk-EDYU5S3J.js";
import { cssObjectFromTheme } from "./chunk-EDYU5S3J.js";
import { cssStringFromTheme } from "./chunk-EDYU5S3J.js";
import { darkTheme } from "./chunk-5LMXJMJR.js";
export function dawnWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    installed: any;
    hidden: () => boolean;
    downloadUrls: {
        ios: string;
        mobile: string;
    };
    createConnector: () => {
        connector: InjectedConnector;
    };
};
export function enkryptWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    installed: boolean | undefined;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        qrCode: string;
        chrome: string;
        browserExtension: string;
        edge: string;
        firefox: string;
        opera: string;
        safari: string;
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
export function foxWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
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
    downloadUrls: {
        android: string;
        ios: string;
        qrCode: string;
    };
    createConnector: () => {
        connector: any;
        mobile: {
            getUri: (() => Promise<string>) | undefined;
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
export function frameWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    installed: boolean;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
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
export function frontierWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
    [x: string]: any;
    chains: any;
    projectId: any;
    walletConnectOptions: any;
    walletConnectVersion?: string | undefined;
}): {
    id: string;
    name: string;
    installed: boolean | undefined;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        android: string;
        ios: string;
        qrCode: string;
        chrome: string;
        browserExtension: string;
    };
    createConnector: () => {
        connector: InjectedConnector;
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
export function getDefaultWallets({ appName, chains, projectId }: {
    appName: any;
    chains: any;
    projectId: any;
}): {
    connectors: () => any[];
    wallets: {
        groupName: string;
        wallets: ({
            id: string;
            name: string;
            iconUrl: () => Promise<string>;
            iconBackground: string;
            installed: boolean;
            downloadUrls: {};
            createConnector: () => {
                connector: InjectedConnector;
            };
        } | {
            id: string;
            name: string;
            shortName: string;
            iconUrl: () => Promise<string>;
            iconAccent: string;
            iconBackground: string;
            installed: true | undefined;
            downloadUrls: {
                android: string;
                ios: string;
                mobile: string;
                qrCode: string;
                chrome: string;
                browserExtension: string;
            };
            createConnector: () => {
                qrCode?: {
                    getUri: () => Promise<string | null | undefined>;
                    instructions: {
                        learnMoreUrl: string;
                        steps: {
                            description: string;
                            step: string;
                            title: string;
                        }[];
                    };
                } | undefined;
                extension?: {
                    instructions: {
                        learnMoreUrl: string;
                        steps: {
                            description: string;
                            step: string;
                            title: string;
                        }[];
                    };
                } | undefined;
                connector: CoinbaseWalletConnector;
            };
        } | {
            id: string;
            name: string;
            iconUrl: () => Promise<string>;
            iconBackground: string;
            hidden: ({ wallets }: {
                wallets: any;
            }) => any;
            createConnector: () => {
                connector: InjectedConnector;
            };
        } | {
            id: string;
            name: string;
            iconUrl: () => Promise<string>;
            iconAccent: string;
            iconBackground: string;
            installed: any;
            downloadUrls: {
                android: string;
                ios: string;
                mobile: string;
                qrCode: string;
                chrome: string;
                edge: string;
                firefox: string;
                opera: string;
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
        } | {
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
        } | {
            id: string;
            name: string;
            iconAccent: string;
            iconBackground: string;
            iconUrl: () => Promise<string>;
            installed: boolean;
            downloadUrls: {};
            createConnector: () => {
                connector: SafeConnector;
            };
        } | {
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
        })[];
    }[];
};
export function getWalletConnectConnector({ chains, options, projectId, version }: {
    chains: any;
    options?: {} | undefined;
    projectId: any;
    version?: string | undefined;
}): any;
export function imTokenWallet({ chains, projectId, walletConnectOptions, walletConnectVersion }: {
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
export function injectedWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    hidden: ({ wallets }: {
        wallets: any;
    }) => any;
    createConnector: () => {
        connector: InjectedConnector;
    };
};
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
import { lightTheme } from "./chunk-I3PJVYIM.js";
export function metaMaskWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
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
    installed: any;
    downloadUrls: {
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
        chrome: string;
        edge: string;
        firefox: string;
        opera: string;
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
export function mewWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    installed: boolean;
    downloadUrls: {
        android: string;
        ios: string;
        mobile: string;
        qrCode: string;
    };
    createConnector: () => {
        connector: InjectedConnector;
    };
};
import { midnightTheme } from "./chunk-C3Q3VS7Z.js";
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
export function omniWallet({ chains, projectId, walletConnectOptions, walletConnectVersion }: {
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
export function oneKeyWallet({ chains }: {
    chains: any;
}): {
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
    downloadUrls: {
        android: string;
        browserExtension: string;
        chrome: string;
        edge: string;
        ios: string;
        mobile: string;
        qrCode: string;
    };
    iconAccent: string;
    iconBackground: string;
    iconUrl: () => Promise<string>;
    id: string;
    installed: boolean;
    name: string;
};
export function phantomWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
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
        chrome: string;
        firefox: string;
        browserExtension: string;
    };
    createConnector: () => {
        connector: InjectedConnector;
        extension: {
            instructions: {
                steps: {
                    description: string;
                    step: string;
                    title: string;
                }[];
                learnMoreUrl: string;
            };
        };
    };
};
export function rabbyWallet({ chains, ...options }: {
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
export function safeWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    iconAccent: string;
    iconBackground: string;
    iconUrl: () => Promise<string>;
    installed: boolean;
    downloadUrls: {};
    createConnector: () => {
        connector: SafeConnector;
    };
};
export function safeheronWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    installed: boolean;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        chrome: string;
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
export function tokenPocketWallet({ chains, projectId, walletConnectOptions, walletConnectVersion }: {
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
        chrome: string;
        browserExtension: string;
        android: string;
        ios: string;
        qrCode: string;
        mobile: string;
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
import { useAccountModal } from "./chunk-EDYU5S3J.js";
export function useAddRecentTransaction(): (transaction: any) => void;
import { useAsyncImage } from "./chunk-EDYU5S3J.js";
import { useChainId } from "./chunk-EDYU5S3J.js";
import { useChainModal } from "./chunk-EDYU5S3J.js";
import { useConnectModal } from "./chunk-EDYU5S3J.js";
import { useWalletConnectors } from "./chunk-EDYU5S3J.js";
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
export function xdefiWallet({ chains, ...options }: {
    [x: string]: any;
    chains: any;
}): {
    id: string;
    name: string;
    installed: boolean;
    iconUrl: () => Promise<string>;
    iconBackground: string;
    downloadUrls: {
        chrome: string;
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
export function zerionWallet({ chains, projectId, walletConnectOptions, walletConnectVersion, ...options }: {
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
    installed: any;
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
import { DesktopOptions } from "./chunk-EDYU5S3J.js";
import { dialogContent } from "./chunk-EDYU5S3J.js";
import { dialogContentMobile } from "./chunk-EDYU5S3J.js";
import { MobileOptions } from "./chunk-EDYU5S3J.js";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { SafeConnector } from "wagmi/connectors/safe";
export { ConnectButton, RainbowKitAuthenticationProvider, RainbowKitProvider, createAuthenticationAdapter, cssObjectFromTheme, cssStringFromTheme, darkTheme, lightTheme, midnightTheme, useAccountModal, useAsyncImage, useChainId, useChainModal, useConnectModal, useWalletConnectors };
