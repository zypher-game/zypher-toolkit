import React from "react";
import "./balance.stylus";
import { HeaderUIType } from "../../../Header/header";
interface IProps {
    env: string;
    className?: string;
    showPointsModal: any;
    CountUpNumber?: React.FC<any>;
    type: HeaderUIType;
    isMiddleWidth: boolean;
}
declare const Balance: React.MemoExoticComponent<(props: IProps) => React.ReactElement | null>;
export default Balance;
