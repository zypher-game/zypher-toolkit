export function midnightTheme({ accentColor, accentColorForeground, ...baseThemeOptions }?: {
    accentColor?: string | undefined;
    accentColorForeground?: string | undefined;
}): {
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
};
export namespace midnightTheme {
    export { accentColors };
}
declare namespace accentColors {
    namespace blue {
        let accentColor: string;
        let accentColorForeground: string;
    }
    namespace green {
        let accentColor_1: string;
        export { accentColor_1 as accentColor };
        let accentColorForeground_1: string;
        export { accentColorForeground_1 as accentColorForeground };
    }
    namespace orange {
        let accentColor_2: string;
        export { accentColor_2 as accentColor };
        let accentColorForeground_2: string;
        export { accentColorForeground_2 as accentColorForeground };
    }
    namespace pink {
        let accentColor_3: string;
        export { accentColor_3 as accentColor };
        let accentColorForeground_3: string;
        export { accentColorForeground_3 as accentColorForeground };
    }
    namespace purple {
        let accentColor_4: string;
        export { accentColor_4 as accentColor };
        let accentColorForeground_4: string;
        export { accentColorForeground_4 as accentColorForeground };
    }
    namespace red {
        let accentColor_5: string;
        export { accentColor_5 as accentColor };
        let accentColorForeground_5: string;
        export { accentColorForeground_5 as accentColorForeground };
    }
}
export {};
