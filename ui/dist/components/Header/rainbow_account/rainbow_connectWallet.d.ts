import React from "react";
import { ChainId } from "../../../constant/constant";
import "./rainbow_connectWallet.stylus";
import { HeaderUIType } from "../header";
interface IProps {
    useLocation: any;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
    isMobile: boolean;
    className?: string;
    copy: any;
    type: HeaderUIType;
    showLang: boolean;
    CountupNumber?: React.FC<any>;
    supportedChainList?: ChainId[];
    hideRefresh?: boolean;
}
declare const RainbowConnectWallet: React.MemoExoticComponent<(props: IProps) => React.JSX.Element>;
export default RainbowConnectWallet;
