import React from "react";
import "./balance.stylus";
interface IProps {
    env: string;
    isMobile: boolean;
    className?: string;
    showPointsModal: any;
    showLang: boolean;
    CountupNumber?: React.FC<any>;
}
declare const Balance: React.MemoExoticComponent<(props: IProps) => React.ReactElement | null>;
export default Balance;
