import React, { FC } from "react";
interface IBalanceProps {
    value: number;
    decimals?: number;
    prefix?: string;
    unit?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    strikeThrough?: boolean;
    startFromValue?: boolean;
    WrapElement?: any;
    className?: string;
    showDiv: boolean;
    duration?: number;
}
declare const CountupNumber: FC<IBalanceProps>;
export default CountupNumber;
