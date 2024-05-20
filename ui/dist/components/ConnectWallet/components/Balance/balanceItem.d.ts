import React from "react";
import "./balance.stylus";
import { HeaderUIType } from "../../../../components/Header/header";
type IProps = {
    loading: boolean;
    balanceStr?: string;
    logo: React.ReactNode;
    className?: string;
    preChild?: React.ReactNode;
    onClick?: any;
    balance?: number;
    CountUpNumber?: React.FC<any>;
    type: HeaderUIType;
};
declare const BalanceItem: React.MemoExoticComponent<({ className, loading, balanceStr, logo, preChild, onClick, CountUpNumber, balance, type, }: IProps) => React.JSX.Element>;
export declare const BalanceCountUpItem: React.MemoExoticComponent<({ className, loading, balance, logo, preChild, onClick, CountUpNumber, balanceStr, type, }: IProps) => React.JSX.Element>;
export default BalanceItem;
