import React from "react";
import "./PixelFlatBtn.styl";
interface IProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: any;
    style?: any;
}
declare const PixelFlatBtn: React.MemoExoticComponent<(props: IProps) => React.JSX.Element>;
export default PixelFlatBtn;
