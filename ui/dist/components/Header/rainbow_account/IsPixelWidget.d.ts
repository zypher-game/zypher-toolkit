import React from "react";
import "./IsPixelWidget.stylus";
import { IPixelProps } from "../../PixelBtn/ActivePixelButton";
interface IProps extends IPixelProps {
    children: React.ReactNode;
}
declare const IsPixelWidget: React.MemoExoticComponent<({ className, children, onClick, backgroundColor, borderColor, pixel_height, ...props }: IProps) => React.JSX.Element>;
export default IsPixelWidget;
