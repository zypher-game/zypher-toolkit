import React from "react";
import "./balance.stylus";
import { HeaderUIType } from "../../../Header/header";
interface IProps {
    env: string;
    isMobile: boolean;
    className?: string;
    showPointsModal: any;
    CountupNumber?: React.FC<any>;
    type: HeaderUIType;
}
declare const Balance: React.MemoExoticComponent<(props: IProps) => React.ReactElement | null>;
export default Balance;
