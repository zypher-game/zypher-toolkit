import React from "react";
import "./rainbow_connectWallet.stylus";
import { HeaderUIType } from "../header";
declare const WrongNetwork: React.MemoExoticComponent<({ type }: {
    type: HeaderUIType;
}) => React.JSX.Element>;
export default WrongNetwork;
