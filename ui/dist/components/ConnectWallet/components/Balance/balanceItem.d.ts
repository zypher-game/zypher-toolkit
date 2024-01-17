import React from "react";
import "./balance.stylus";
type IProps = {
    loading: boolean;
    balanceStr?: string;
    logo: React.ReactNode;
    className?: string;
    preChild?: React.ReactNode;
    onClick?: any;
    balance?: number;
    CountupNumber?: React.FC<any>;
};
declare const BalanceItem: React.MemoExoticComponent<({ className, loading, balanceStr, logo, preChild, onClick, CountupNumber, balance, }: IProps) => React.JSX.Element>;
export declare const BalanceCountUpItem: React.MemoExoticComponent<({ className, loading, balance, logo, preChild, onClick, CountupNumber, }: IProps) => React.JSX.Element>;
export default BalanceItem;
