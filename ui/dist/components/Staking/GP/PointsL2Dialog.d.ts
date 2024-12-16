import React from "react";
import "../Staking.styl";
import { IPointsDialog } from "../../ConnectWallet/components/PointsDialog/PointsDialog.type";
declare const PointsL2Dialog: React.MemoExoticComponent<({ env, setSuccessToast, setErrorToast }: IPointsDialog) => React.JSX.Element>;
export default PointsL2Dialog;
