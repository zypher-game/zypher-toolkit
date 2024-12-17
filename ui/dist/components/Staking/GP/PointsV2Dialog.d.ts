import React from "react";
import "../Staking.styl";
import { IPointsDialog } from "../../ConnectWallet/components/PointsDialog/PointsDialog.type";
declare const PointsV2Dialog: React.MemoExoticComponent<({ env, setSuccessToast, setErrorToast }: IPointsDialog) => React.JSX.Element>;
export default PointsV2Dialog;
