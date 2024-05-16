import React from "react";
type IChildren = {
    children?: React.ReactNode;
};
export type IPixelProps = {
    className?: string;
    onClick?: any;
    isLoading?: boolean;
    pixel_height: number;
    small_pixel_height?: number;
    smallWidth?: string;
    width?: string;
    height?: string;
    smallHeight?: string;
    borderBottomColor?: string;
    borderTopColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    showHover?: boolean;
    size?: number;
    disable?: boolean;
};
interface IPixel extends IChildren, IPixelProps {
}
export declare const ActivePixelCard: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const ActivePixelButton: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const ActivePixelColorCard: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const ActivePixelButtonColor: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelBorderCard: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelCube2: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelCube3: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelCube5: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export declare const PixelBorderCardButton: React.MemoExoticComponent<(props: IPixel) => React.JSX.Element>;
export {};
