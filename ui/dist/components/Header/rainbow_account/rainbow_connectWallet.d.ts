import React from "react";
import { ChainId } from "../../../constant/constant";
import "./rainbow_connectWallet.stylus";
import { UIType } from "../header";
interface IProps {
    useLocation: any;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
    className?: string;
    isBigWidth: boolean;
    isMiddleWidth: boolean;
    copy: any;
    CountUpNumber?: React.FC<any>;
    supportedChainList?: ChainId[];
    type?: UIType;
}
declare const RainbowConnectWallet: React.MemoExoticComponent<(props: IProps) => React.JSX.Element>;
export default RainbowConnectWallet;
