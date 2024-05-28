import React from "react";
type IChildren = {
    children?: React.ReactNode;
};
export type IPixelProps = {
    className?: string;
    onClick?: any;
    pixel_height?: number;
    width?: string;
    height?: string;
    borderBottomColor?: string;
    borderTopColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    showHover?: boolean;
    size?: number;
    disable?: boolean;
    hidePixel?: boolean;
};
interface IPixel extends IChildren, IPixelProps {
}
export declare const ActivePixelCard: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const ActivePixelButton: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const ActivePixelColorCard: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
type IActivePixelColorCardTheme = "yellow" | "brown" | "brightBlue";
export interface IPixelButtonTheme extends IPixelProps {
    themeType: IActivePixelColorCardTheme;
}
interface IPixelButton extends IChildren, IPixelButtonTheme {
}
export declare const ActivePixelButtonColor: React.MemoExoticComponent<(props: IPixelButton) => React.JSX.Element>;
export declare const PixelBorderCard: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelCube2: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelCube3: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelCube5: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelBorderCardButton: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export {};
