import React from "react";
import "./ChainSelectorWidget.stylus";
import { HeaderUIType } from "../../../Header/header";
type IProps = {
    className?: string;
    type: HeaderUIType;
};
declare const ChainSelectorWidget: React.MemoExoticComponent<({ className, type }: IProps) => React.JSX.Element | null>;
export default ChainSelectorWidget;
