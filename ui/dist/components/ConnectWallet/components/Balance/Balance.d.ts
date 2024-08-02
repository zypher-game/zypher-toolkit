import React from "react";
import "./balance.stylus";
interface IProps {
    env: string;
    className?: string;
    showPointsModal: any;
    CountUpNumber?: React.FC<any>;
    isMiddleWidth: boolean;
}
declare const Balance: React.MemoExoticComponent<(props: IProps) => React.ReactElement | null>;
export default Balance;
