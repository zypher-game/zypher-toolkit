import React from "react";
import "./balance.module.stylus";
interface IProps {
    env: string;
    isMobile: boolean;
    className?: string;
    showPointsModal: any;
}
declare const Balance: React.MemoExoticComponent<(props: IProps) => React.ReactElement | null>;
export default Balance;
