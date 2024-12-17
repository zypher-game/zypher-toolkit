import React from "react";
import { IUseGPDeposit } from "../hooks/useGPDeposit";
declare const GPWithdraw: React.MemoExoticComponent<({ NativeToken, GPToken, withdraw, loadingWithdraw, loadingApprove, allowance, health, }: IUseGPDeposit) => React.JSX.Element>;
export default GPWithdraw;
