import { ClassValue } from 'clsx';
import * as React from 'react';
declare type HTMLProperties<T = HTMLElement> = Omit<React.AllHTMLAttributes<T>, 'as' | 'className' | 'color' | 'height' | 'width'>;
export declare const Box: React.ForwardRefExoticComponent<{
    background?: ("accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | {
        base?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        hover?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        active?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
    }) | undefined;
    borderColor?: ("accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | {
        base?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        hover?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        active?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
    }) | undefined;
    boxShadow?: ("connectButton" | "dialog" | "profileDetailsAction" | "selectedOption" | "selectedWallet" | "walletLogo" | {
        base?: "connectButton" | "dialog" | "profileDetailsAction" | "selectedOption" | "selectedWallet" | "walletLogo" | undefined;
        hover?: "connectButton" | "dialog" | "profileDetailsAction" | "selectedOption" | "selectedWallet" | "walletLogo" | undefined;
        active?: "connectButton" | "dialog" | "profileDetailsAction" | "selectedOption" | "selectedWallet" | "walletLogo" | undefined;
    }) | undefined;
    color?: ("accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | {
        base?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        hover?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        active?: "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "error" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
    }) | undefined;
} & {
    alignItems?: ("center" | "flex-end" | "flex-start" | {
        smallScreen?: "center" | "flex-end" | "flex-start" | undefined;
        largeScreen?: "center" | "flex-end" | "flex-start" | undefined;
    }) | undefined;
    display?: ("none" | "block" | "inline" | "flex" | {
        smallScreen?: "none" | "block" | "inline" | "flex" | undefined;
        largeScreen?: "none" | "block" | "inline" | "flex" | undefined;
    }) | undefined;
} & {
    readonly alignSelf?: "center" | "flex-end" | "flex-start" | undefined;
    readonly backgroundSize?: "cover" | undefined;
    readonly borderRadius?: "1" | "actionButton" | "connectButton" | "menuButton" | "modal" | "modalMobile" | "6" | "10" | "13" | "25%" | "full" | undefined;
    readonly borderStyle?: "solid" | undefined;
    readonly borderWidth?: "0" | "1" | "2" | "3" | "4" | undefined;
    readonly cursor?: "pointer" | undefined;
    readonly flexDirection?: "column" | "row" | undefined;
    readonly fontFamily?: "body" | undefined;
    readonly fontSize?: "13" | "12" | "14" | "16" | "18" | "20" | "23" | undefined;
    readonly fontWeight?: "medium" | "bold" | "regular" | "semibold" | "heavy" | undefined;
    readonly gap?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly height?: "1" | "2" | "full" | "4" | "12" | "20" | "8" | "9" | "24" | "28" | "30" | "32" | "34" | "36" | "40" | "44" | "48" | "54" | "60" | "200" | "max" | undefined;
    readonly justifyContent?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | undefined;
    readonly textAlign?: "inherit" | "left" | "center" | undefined;
    readonly marginBottom?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly marginLeft?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly marginRight?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly marginTop?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly maxWidth?: "1" | "2" | "full" | "4" | "12" | "20" | "8" | "9" | "24" | "28" | "30" | "32" | "34" | "36" | "40" | "44" | "48" | "54" | "60" | "200" | "max" | undefined;
    readonly minWidth?: "1" | "2" | "full" | "4" | "12" | "20" | "8" | "9" | "24" | "28" | "30" | "32" | "34" | "36" | "40" | "44" | "48" | "54" | "60" | "200" | "max" | undefined;
    readonly overflow?: "hidden" | undefined;
    readonly paddingBottom?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly paddingLeft?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly paddingRight?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly paddingTop?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    readonly position?: "fixed" | "absolute" | "relative" | undefined;
    readonly right?: "0" | undefined;
    readonly transition?: "transform" | "default" | undefined;
    readonly userSelect?: "none" | undefined;
    readonly width?: "1" | "2" | "full" | "4" | "12" | "20" | "8" | "9" | "24" | "28" | "30" | "32" | "34" | "36" | "40" | "44" | "48" | "54" | "60" | "200" | "max" | undefined;
    readonly backdropFilter?: "modalOverlay" | undefined;
    margin?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    marginX?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    marginY?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    padding?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    paddingX?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
    paddingY?: "0" | "1" | "2" | "3" | "6" | "10" | "4" | "12" | "14" | "16" | "18" | "20" | "8" | "24" | "28" | "32" | "36" | "44" | "-1" | "5" | "64" | undefined;
} & {
    reset?: keyof JSX.IntrinsicElements | undefined;
} & HTMLProperties<HTMLElement> & {
    as?: React.ElementType<any> | undefined;
    className?: ClassValue;
    testId?: string | undefined;
} & React.RefAttributes<HTMLElement>>;
export declare type BoxProps = Parameters<typeof Box>[0];
export {};
