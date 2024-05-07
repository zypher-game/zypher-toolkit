export function isAndroid(): boolean;
export function isIOS(): boolean;
export function isMobile(): boolean;
export function useWalletConnectors(): any[];
export function useAsyncImage(url: any): any;
export function isHexString(color: any): boolean;
export function DesktopOptions({ onClose }: {
    onClose: any;
}): React55.DetailedReactHTMLElement<React55.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export function MobileOptions({ onClose }: {
    onClose: any;
}): React55.DetailedReactHTMLElement<React55.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export var dialogContent: string;
export var dialogContentMobile: string;
export function createAuthenticationAdapter(adapter: any): any;
export function RainbowKitAuthenticationProvider({ adapter, children, enabled, status, }: {
    adapter: any;
    children: any;
    enabled?: boolean | undefined;
    status: any;
}): React55.DetailedReactHTMLElement<React55.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export function useChainId(): number | null;
export function useTransactionStore(): never;
export function cssObjectFromTheme(theme: any, { extends: baseTheme }?: {
    extends: any;
}): {
    [k: string]: string;
};
export function cssStringFromTheme(theme: any, options?: {}): string;
export function RainbowKitProvider({ appInfo, avatar, chains, children, coolMode, id, initialChain, modalSize, showRecentTransactions, theme, }: {
    appInfo: any;
    avatar: any;
    chains: any;
    children: any;
    coolMode?: boolean | undefined;
    id: any;
    initialChain: any;
    modalSize?: string | undefined;
    showRecentTransactions?: boolean | undefined;
    theme?: {
        colors: {
            accentColor: string;
            accentColorForeground: string;
            actionButtonBorder: string;
            actionButtonBorderMobile: string;
            actionButtonSecondaryBackground: string;
            closeButton: string;
            closeButtonBackground: string;
            connectButtonBackground: string;
            connectButtonBackgroundError: string;
            connectButtonInnerBackground: string;
            connectButtonText: string;
            connectButtonTextError: string;
            connectionIndicator: string;
            connectionIndicatorBorder: string;
            downloadBottomCardBackground: string;
            downloadTopCardBackground: string;
            error: string;
            generalBorder: string;
            generalBorderDim: string;
            menuItemBackground: string;
            modalBackdrop: string;
            modalBackground: string;
            modalBorder: string;
            modalText: string;
            modalTextDim: string;
            modalTextSecondary: string;
            profileAction: string;
            profileActionHover: string;
            profileForeground: string;
            selectedOptionBorder: string;
            standby: string;
            standbyBorder: string;
        };
        shadows: {
            connectButton: string;
            dialog: string;
            profileDetailsAction: string;
            selectedOption: string;
            selectedWallet: string;
            walletLogo: string;
        };
        blurs: {
            modalOverlay: any;
        };
        fonts: {
            body: any;
        };
        radii: {
            actionButton: any;
            connectButton: any;
            menuButton: any;
            modal: any;
            modalMobile: any;
        };
    } | undefined;
}): React55.DetailedReactHTMLElement<React55.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export function useAccountModal(): {
    accountModalOpen: boolean;
    openAccountModal: any;
};
export function useChainModal(): {
    chainModalOpen: boolean;
    openChainModal: any;
    closeChainModal: any;
    setFn: any;
};
export function useConnectModal(): {
    connectModalOpen: boolean;
    openConnectModal: any;
};
export function ConnectButton({ accountStatus, chainStatus, label, showBalance, }: {
    accountStatus?: string | undefined;
    chainStatus?: {
        largeScreen: string;
        smallScreen: string;
    } | undefined;
    label?: string | undefined;
    showBalance?: {
        largeScreen: boolean;
        smallScreen: boolean;
    } | undefined;
}): React55.FunctionComponentElement<{
    children: any;
}>;
export namespace ConnectButton {
    export { defaultProps as __defaultProps };
    export { ConnectButtonRenderer as Custom };
}
import React55 from "react";
declare namespace defaultProps {
    let accountStatus: string;
    namespace chainStatus {
        let largeScreen: string;
        let smallScreen: string;
    }
    let label: string;
    namespace showBalance {
        let largeScreen_1: boolean;
        export { largeScreen_1 as largeScreen };
        let smallScreen_1: boolean;
        export { smallScreen_1 as smallScreen };
    }
}
declare function ConnectButtonRenderer({ children }: {
    children: any;
}): React55.FunctionComponentElement<{}>;
declare namespace ConnectButtonRenderer {
    let displayName: string;
}
export {};
