import React from "react";
import "./PixelFlatBtn.stylus";
import { HTMLMotionProps } from "framer-motion";
interface IProps extends HTMLMotionProps<"div"> {
    className?: string;
    children?: React.ReactNode;
    onClick?: any;
    style?: any;
    hidePixel?: boolean;
}
declare const PixelFlatBtn: React.MemoExoticComponent<(props: IProps) => React.JSX.Element>;
export default PixelFlatBtn;
