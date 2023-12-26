import React from "react";
import "./PointsDialog.stylus";
type IProps = {
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
};
declare const PointsDialog: React.MemoExoticComponent<({ env, dispatch, setSuccessToast, setErrorToast }: IProps) => React.JSX.Element>;
export default PointsDialog;
