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
    CountupNumber?: React.FC<any>;
    type: HeaderUIType;
};
declare const BalanceItem: React.MemoExoticComponent<({ className, loading, balanceStr, logo, preChild, onClick, CountupNumber, balance, type, }: IProps) => React.JSX.Element>;
export declare const BalanceCountUpItem: React.MemoExoticComponent<({ className, loading, balance, logo, preChild, onClick, CountupNumber, balanceStr, type, }: IProps) => React.JSX.Element>;
export default BalanceItem;
