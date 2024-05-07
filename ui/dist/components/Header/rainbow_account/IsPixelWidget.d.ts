import React from "react";
import { HeaderUIType } from "../header";
import "./IsPixelWidget.stylus";
declare const IsPixelWidget: React.MemoExoticComponent<({ className, type, children, onClick, }: {
    className?: string | undefined;
    type: HeaderUIType;
    children: React.ReactNode;
    onClick?: any;
}) => React.JSX.Element>;
export default IsPixelWidget;
