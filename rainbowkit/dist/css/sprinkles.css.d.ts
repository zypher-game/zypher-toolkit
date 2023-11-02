import './reset.css';
import { RequiredConditionalValue } from '@vanilla-extract/sprinkles';
declare const themeContractValues: {
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
    fonts: {
        body: string;
    };
    radii: {
        actionButton: string;
        connectButton: string;
        menuButton: string;
        modal: string;
        modalMobile: string;
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
        modalOverlay: string;
    };
};
export type ThemeVars = typeof themeContractValues;
export declare const themeVars: any;
export declare const largeScreenMinWidth = 768;
declare const responsiveProperties: any;
export type ResponsiveValue<Value extends string | number | boolean> = RequiredConditionalValue<typeof responsiveProperties, Value>;
export declare const mapResponsiveValue: any;
export declare const normalizeResponsiveValue: any;
export declare const sprinkles: any;
export type Sprinkles = Parameters<typeof sprinkles>[0];
export {};
