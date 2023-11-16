import React from "react";
import "./balance.module.stylus";
type IProps = {
    loading: boolean;
    balanceStr: string;
    logo: React.ReactNode;
    className?: string;
    preChild?: React.ReactNode;
    onClick?: any;
};
declare const BalanceItem: React.MemoExoticComponent<({ className, loading, balanceStr, logo, preChild, onClick }: IProps) => React.JSX.Element>;
export default BalanceItem;
