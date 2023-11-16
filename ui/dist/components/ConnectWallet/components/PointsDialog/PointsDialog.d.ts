import React from "react";
import "./PointsDialog.module.stylus";
export interface IPointsItem {
    index: number;
    pointAmount: string;
    pointAmountStr: string;
    price: string;
    priceStr: string;
    discount: string | undefined;
}
type IProps = {
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
};
declare const PointsDialog: React.MemoExoticComponent<({ env, dispatch, setSuccessToast, setErrorToast }: IProps) => React.JSX.Element>;
export default PointsDialog;
