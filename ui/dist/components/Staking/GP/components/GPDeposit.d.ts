import React from "react";
import { IUseGPDeposit } from "../hooks/useGPDeposit";
declare const GPDeposit: React.MemoExoticComponent<({ NativeToken, GPToken, deposit, loadingDeposit, health, }: IUseGPDeposit) => React.JSX.Element>;
export default GPDeposit;
