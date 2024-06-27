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
export declare const themeVars: import("@vanilla-extract/private").MapLeafNodes<{
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
}, import("@vanilla-extract/private").CSSVarFunction>;
export declare const largeScreenMinWidth = 768;
declare const responsiveProperties: {
    conditions: {
        defaultCondition: "smallScreen";
        conditionNames: ("smallScreen" | "largeScreen")[];
    };
    styles: {
        alignItems: {
            values: {
                center: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                "flex-end": {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                "flex-start": {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
            };
        };
        display: {
            values: {
                none: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                block: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                flex: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                inline: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
            };
        };
    };
};
export type ResponsiveValue<Value extends string | number | boolean> = RequiredConditionalValue<typeof responsiveProperties, Value>;
export declare const mapResponsiveValue: <OutputValue extends string | number | boolean | null | undefined, Value extends import("@vanilla-extract/sprinkles").ConditionalValue<{
    conditions: {
        defaultCondition: "smallScreen";
        conditionNames: ("smallScreen" | "largeScreen")[];
    };
    styles: {
        alignItems: {
            values: {
                center: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                "flex-end": {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                "flex-start": {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
            };
        };
        display: {
            values: {
                none: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                block: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                flex: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                inline: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
            };
        };
    };
}, string | number | boolean>>(value: Value, fn: (inputValue: Value extends import("@vanilla-extract/sprinkles/dist/declarations/src/types").ResponsiveArray<1, string | number | boolean | null> | import("@vanilla-extract/sprinkles/dist/declarations/src/types").ResponsiveArray<1 | 2, string | number | boolean | null> | import("@vanilla-extract/sprinkles/dist/declarations/src/types").ResponsiveArray<1 | 3 | 2, string | number | boolean | null> | import("@vanilla-extract/sprinkles/dist/declarations/src/types").ResponsiveArray<1 | 3 | 2 | 4, string | number | boolean | null> | import("@vanilla-extract/sprinkles/dist/declarations/src/types").ResponsiveArray<1 | 3 | 2 | 4 | 5, string | number | boolean | null> | import("@vanilla-extract/sprinkles/dist/declarations/src/types").ResponsiveArray<1 | 3 | 2 | 6 | 4 | 5, string | number | boolean | null> | import("@vanilla-extract/sprinkles/dist/declarations/src/types").ResponsiveArray<1 | 3 | 2 | 6 | 4 | 5 | 7, string | number | boolean | null> | import("@vanilla-extract/sprinkles/dist/declarations/src/types").ResponsiveArray<1 | 3 | 2 | 6 | 4 | 5 | 7 | 8, string | number | boolean | null> ? NonNullable<Value[number]> : Value extends Partial<Record<string, string | number | boolean>> ? NonNullable<Value[keyof Value]> : Value, key: "smallScreen" | "largeScreen") => OutputValue) => Value extends string | number | boolean ? OutputValue : Partial<Record<"smallScreen" | "largeScreen", OutputValue>>;
export declare const normalizeResponsiveValue: <Value extends string | number | boolean>(value: import("@vanilla-extract/sprinkles").ConditionalValue<{
    conditions: {
        defaultCondition: "smallScreen";
        conditionNames: ("smallScreen" | "largeScreen")[];
    };
    styles: {
        alignItems: {
            values: {
                center: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                "flex-end": {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                "flex-start": {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
            };
        };
        display: {
            values: {
                none: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                block: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                flex: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                inline: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
            };
        };
    };
}, Value>) => Partial<Record<"smallScreen" | "largeScreen", Value>>;
export declare const sprinkles: import("@vanilla-extract/sprinkles/dist/declarations/src/createSprinkles").SprinklesFn<[{
    conditions: {
        defaultCondition: "base";
        conditionNames: ("base" | "active" | "hover")[];
    };
    styles: {
        background: {
            values: {
                error: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                accentColor: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                accentColorForeground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonBorderMobile: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonSecondaryBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                closeButton: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                closeButtonBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonBackgroundError: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonInnerBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonText: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonTextError: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectionIndicator: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectionIndicatorBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                downloadBottomCardBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                downloadTopCardBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                generalBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                generalBorderDim: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                menuItemBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBackdrop: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalText: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalTextDim: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalTextSecondary: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileAction: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileActionHover: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileForeground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                selectedOptionBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                standby: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                standbyBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
            };
        };
        borderColor: {
            values: {
                error: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                accentColor: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                accentColorForeground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonBorderMobile: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonSecondaryBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                closeButton: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                closeButtonBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonBackgroundError: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonInnerBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonText: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonTextError: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectionIndicator: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectionIndicatorBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                downloadBottomCardBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                downloadTopCardBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                generalBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                generalBorderDim: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                menuItemBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBackdrop: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalText: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalTextDim: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalTextSecondary: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileAction: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileActionHover: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileForeground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                selectedOptionBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                standby: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                standbyBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
            };
        };
        boxShadow: {
            values: {
                dialog: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButton: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileDetailsAction: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                selectedOption: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                selectedWallet: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                walletLogo: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
            };
        };
        color: {
            values: {
                error: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                accentColor: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                accentColorForeground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonBorderMobile: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                actionButtonSecondaryBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                closeButton: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                closeButtonBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonBackgroundError: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonInnerBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonText: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectButtonTextError: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectionIndicator: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                connectionIndicatorBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                downloadBottomCardBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                downloadTopCardBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                generalBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                generalBorderDim: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                menuItemBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBackdrop: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBackground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalText: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalTextDim: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                modalTextSecondary: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileAction: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileActionHover: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                profileForeground: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                selectedOptionBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                standby: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
                standbyBorder: {
                    defaultClass: string;
                    conditions: {
                        base: string;
                        hover: string;
                        active: string;
                    };
                };
            };
        };
    };
}, {
    conditions: {
        defaultCondition: "smallScreen";
        conditionNames: ("smallScreen" | "largeScreen")[];
    };
    styles: {
        alignItems: {
            values: {
                center: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                "flex-end": {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                "flex-start": {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
            };
        };
        display: {
            values: {
                none: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                block: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                flex: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
                inline: {
                    defaultClass: string;
                    conditions: {
                        smallScreen: string;
                        largeScreen: string;
                    };
                };
            };
        };
    };
}, {
    conditions: never;
    styles: {
        readonly alignSelf: {
            values: {
                center: {
                    defaultClass: string;
                };
                "flex-end": {
                    defaultClass: string;
                };
                "flex-start": {
                    defaultClass: string;
                };
            };
        };
        readonly backgroundSize: {
            values: {
                cover: {
                    defaultClass: string;
                };
            };
        };
        readonly borderRadius: {
            values: {
                10: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                13: {
                    defaultClass: string;
                };
                actionButton: {
                    defaultClass: string;
                };
                connectButton: {
                    defaultClass: string;
                };
                menuButton: {
                    defaultClass: string;
                };
                modal: {
                    defaultClass: string;
                };
                modalMobile: {
                    defaultClass: string;
                };
                "25%": {
                    defaultClass: string;
                };
                full: {
                    defaultClass: string;
                };
            };
        };
        readonly borderStyle: {
            values: {
                solid: {
                    defaultClass: string;
                };
            };
        };
        readonly borderWidth: {
            values: {
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
            };
        };
        readonly cursor: {
            values: {
                pointer: {
                    defaultClass: string;
                };
            };
        };
        readonly flexDirection: {
            values: {
                row: {
                    defaultClass: string;
                };
                column: {
                    defaultClass: string;
                };
            };
        };
        readonly fontFamily: {
            values: {
                body: {
                    defaultClass: string;
                };
            };
        };
        readonly fontSize: {
            values: {
                12: {
                    defaultClass: string;
                };
                13: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                23: {
                    defaultClass: string;
                };
            };
        };
        readonly fontWeight: {
            values: {
                bold: {
                    defaultClass: string;
                };
                medium: {
                    defaultClass: string;
                };
                regular: {
                    defaultClass: string;
                };
                semibold: {
                    defaultClass: string;
                };
                heavy: {
                    defaultClass: string;
                };
            };
        };
        readonly gap: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly height: {
            values: {
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                9: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                max: {
                    defaultClass: string;
                };
                30: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                60: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                34: {
                    defaultClass: string;
                };
                40: {
                    defaultClass: string;
                };
                48: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                54: {
                    defaultClass: string;
                };
                200: {
                    defaultClass: string;
                };
                full: {
                    defaultClass: string;
                };
            };
        };
        readonly justifyContent: {
            values: {
                center: {
                    defaultClass: string;
                };
                "space-around": {
                    defaultClass: string;
                };
                "space-between": {
                    defaultClass: string;
                };
                "flex-end": {
                    defaultClass: string;
                };
                "flex-start": {
                    defaultClass: string;
                };
            };
        };
        readonly textAlign: {
            values: {
                inherit: {
                    defaultClass: string;
                };
                left: {
                    defaultClass: string;
                };
                center: {
                    defaultClass: string;
                };
            };
        };
        readonly marginBottom: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly marginLeft: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly marginRight: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly marginTop: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly maxWidth: {
            values: {
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                9: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                max: {
                    defaultClass: string;
                };
                30: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                60: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                34: {
                    defaultClass: string;
                };
                40: {
                    defaultClass: string;
                };
                48: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                54: {
                    defaultClass: string;
                };
                200: {
                    defaultClass: string;
                };
                full: {
                    defaultClass: string;
                };
            };
        };
        readonly minWidth: {
            values: {
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                9: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                max: {
                    defaultClass: string;
                };
                30: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                60: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                34: {
                    defaultClass: string;
                };
                40: {
                    defaultClass: string;
                };
                48: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                54: {
                    defaultClass: string;
                };
                200: {
                    defaultClass: string;
                };
                full: {
                    defaultClass: string;
                };
            };
        };
        readonly overflow: {
            values: {
                hidden: {
                    defaultClass: string;
                };
            };
        };
        readonly paddingBottom: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly paddingLeft: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly paddingRight: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly paddingTop: {
            values: {
                10: {
                    defaultClass: string;
                };
                0: {
                    defaultClass: string;
                };
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                3: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                5: {
                    defaultClass: string;
                };
                6: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                14: {
                    defaultClass: string;
                };
                16: {
                    defaultClass: string;
                };
                18: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                64: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                [-1]: {
                    defaultClass: string;
                };
            };
        };
        readonly position: {
            values: {
                fixed: {
                    defaultClass: string;
                };
                absolute: {
                    defaultClass: string;
                };
                relative: {
                    defaultClass: string;
                };
            };
        };
        readonly right: {
            values: {
                0: {
                    defaultClass: string;
                };
            };
        };
        readonly transition: {
            values: {
                transform: {
                    defaultClass: string;
                };
                default: {
                    defaultClass: string;
                };
            };
        };
        readonly userSelect: {
            values: {
                none: {
                    defaultClass: string;
                };
            };
        };
        readonly width: {
            values: {
                1: {
                    defaultClass: string;
                };
                2: {
                    defaultClass: string;
                };
                4: {
                    defaultClass: string;
                };
                8: {
                    defaultClass: string;
                };
                9: {
                    defaultClass: string;
                };
                12: {
                    defaultClass: string;
                };
                max: {
                    defaultClass: string;
                };
                30: {
                    defaultClass: string;
                };
                24: {
                    defaultClass: string;
                };
                60: {
                    defaultClass: string;
                };
                20: {
                    defaultClass: string;
                };
                28: {
                    defaultClass: string;
                };
                32: {
                    defaultClass: string;
                };
                36: {
                    defaultClass: string;
                };
                34: {
                    defaultClass: string;
                };
                40: {
                    defaultClass: string;
                };
                48: {
                    defaultClass: string;
                };
                44: {
                    defaultClass: string;
                };
                54: {
                    defaultClass: string;
                };
                200: {
                    defaultClass: string;
                };
                full: {
                    defaultClass: string;
                };
            };
        };
        readonly backdropFilter: {
            values: {
                modalOverlay: {
                    defaultClass: string;
                };
            };
        };
    };
} & {
    styles: {
        margin: {
            mappings: ("marginBottom" | "marginLeft" | "marginRight" | "marginTop")[];
        };
        marginX: {
            mappings: ("marginLeft" | "marginRight")[];
        };
        marginY: {
            mappings: ("marginBottom" | "marginTop")[];
        };
        padding: {
            mappings: ("paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop")[];
        };
        paddingX: {
            mappings: ("paddingLeft" | "paddingRight")[];
        };
        paddingY: {
            mappings: ("paddingBottom" | "paddingTop")[];
        };
    };
}]>;
export type Sprinkles = Parameters<typeof sprinkles>[0];
export {};
