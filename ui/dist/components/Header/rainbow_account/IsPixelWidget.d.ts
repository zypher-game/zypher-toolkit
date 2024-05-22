import React from "react";
import { HeaderUIType } from "../header";
import "./IsPixelWidget.stylus";
import { IPixelProps } from "../../PixelBtn/ActivePixelButton";
interface IProps extends IPixelProps {
    type?: HeaderUIType;
    children: React.ReactNode;
}
declare const IsPixelWidget: React.MemoExoticComponent<({ className, type, children, onClick, backgroundColor, borderColor, pixel_height, }: IProps) => React.JSX.Element>;
export default IsPixelWidget;
