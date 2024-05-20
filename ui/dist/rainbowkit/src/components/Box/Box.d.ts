import { ClassValue } from 'clsx';
import * as React from 'react';
type HTMLProperties<T = HTMLElement> = Omit<React.AllHTMLAttributes<T>, 'as' | 'className' | 'color' | 'height' | 'width'>;
export declare const Box: React.ForwardRefExoticComponent<{
    background?: ("error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | {
        base?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        hover?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        active?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
    }) | undefined;
    borderColor?: ("error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | {
        base?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        hover?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        active?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
    }) | undefined;
    boxShadow?: ("dialog" | "connectButton" | "profileDetailsAction" | "selectedOption" | "selectedWallet" | "walletLogo" | {
        base?: "dialog" | "connectButton" | "profileDetailsAction" | "selectedOption" | "selectedWallet" | "walletLogo" | undefined;
        hover?: "dialog" | "connectButton" | "profileDetailsAction" | "selectedOption" | "selectedWallet" | "walletLogo" | undefined;
        active?: "dialog" | "connectButton" | "profileDetailsAction" | "selectedOption" | "selectedWallet" | "walletLogo" | undefined;
    }) | undefined;
    color?: ("error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | {
        base?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        hover?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
        active?: "error" | "accentColor" | "accentColorForeground" | "actionButtonBorder" | "actionButtonBorderMobile" | "actionButtonSecondaryBackground" | "closeButton" | "closeButtonBackground" | "connectButtonBackground" | "connectButtonBackgroundError" | "connectButtonInnerBackground" | "connectButtonText" | "connectButtonTextError" | "connectionIndicator" | "connectionIndicatorBorder" | "downloadBottomCardBackground" | "downloadTopCardBackground" | "generalBorder" | "generalBorderDim" | "menuItemBackground" | "modalBackdrop" | "modalBackground" | "modalBorder" | "modalText" | "modalTextDim" | "modalTextSecondary" | "profileAction" | "profileActionHover" | "profileForeground" | "selectedOptionBorder" | "standby" | "standbyBorder" | undefined;
    }) | undefined;
} & {
    alignItems?: ("center" | "flex-end" | "flex-start" | {
        smallScreen?: "center" | "flex-end" | "flex-start" | undefined;
        largeScreen?: "center" | "flex-end" | "flex-start" | undefined;
    }) | undefined;
    display?: ("none" | "block" | "flex" | "inline" | {
        smallScreen?: "none" | "block" | "flex" | "inline" | undefined;
        largeScreen?: "none" | "block" | "flex" | "inline" | undefined;
    }) | undefined;
} & {
    readonly alignSelf?: "center" | "flex-end" | "flex-start" | undefined;
    readonly backgroundSize?: "cover" | undefined;
    readonly borderRadius?: "10" | "1" | "6" | "13" | "actionButton" | "connectButton" | "menuButton" | "modal" | "modalMobile" | "25%" | "full" | undefined;
    readonly borderStyle?: "solid" | undefined;
    readonly borderWidth?: "0" | "1" | "2" | "3" | "4" | undefined;
    readonly cursor?: "pointer" | undefined;
    readonly flexDirection?: "row" | "column" | undefined;
    readonly fontFamily?: "body" | undefined;
    readonly fontSize?: "12" | "13" | "14" | "18" | "16" | "20" | "23" | undefined;
    readonly fontWeight?: "bold" | "medium" | "regular" | "semibold" | "heavy" | undefined;
    readonly gap?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly height?: "1" | "2" | "4" | "8" | "9" | "12" | "max" | "24" | "60" | "20" | "28" | "30" | "32" | "40" | "48" | "36" | "34" | "44" | "54" | "200" | "full" | undefined;
    readonly justifyContent?: "center" | "space-around" | "space-between" | "flex-end" | "flex-start" | undefined;
    readonly textAlign?: "inherit" | "left" | "center" | undefined;
    readonly marginBottom?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly marginLeft?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly marginRight?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly marginTop?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly maxWidth?: "1" | "2" | "4" | "8" | "9" | "12" | "max" | "24" | "60" | "20" | "28" | "30" | "32" | "40" | "48" | "36" | "34" | "44" | "54" | "200" | "full" | undefined;
    readonly minWidth?: "1" | "2" | "4" | "8" | "9" | "12" | "max" | "24" | "60" | "20" | "28" | "30" | "32" | "40" | "48" | "36" | "34" | "44" | "54" | "200" | "full" | undefined;
    readonly overflow?: "hidden" | undefined;
    readonly paddingBottom?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly paddingLeft?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly paddingRight?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly paddingTop?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    readonly position?: "fixed" | "absolute" | "relative" | undefined;
    readonly right?: "0" | undefined;
    readonly transition?: "transform" | "default" | undefined;
    readonly userSelect?: "none" | undefined;
    readonly width?: "1" | "2" | "4" | "8" | "9" | "12" | "max" | "24" | "60" | "20" | "28" | "30" | "32" | "40" | "48" | "36" | "34" | "44" | "54" | "200" | "full" | undefined;
    readonly backdropFilter?: "modalOverlay" | undefined;
    margin?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    marginX?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    marginY?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    padding?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    paddingX?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
    paddingY?: "10" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "12" | "14" | "18" | "24" | "16" | "20" | "28" | "32" | "64" | "36" | "44" | "-1" | undefined;
} & {
    reset?: keyof JSX.IntrinsicElements | undefined;
} & HTMLProperties<HTMLElement> & {
    as?: React.ElementType<any> | undefined;
    className?: ClassValue;
    testId?: string | undefined;
} & React.RefAttributes<HTMLElement>>;
export type BoxProps = Parameters<typeof Box>[0];
export {};
