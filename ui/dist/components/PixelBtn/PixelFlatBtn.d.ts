import React from "react";
import "./PixelFlatBtn.stylus";
interface IProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: any;
    style?: any;
    hidePixel?: boolean;
}
declare const PixelFlatBtn: React.MemoExoticComponent<(props: IProps) => React.JSX.Element>;
export default PixelFlatBtn;
