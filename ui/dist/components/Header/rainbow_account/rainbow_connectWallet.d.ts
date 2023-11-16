import React from "react";
import "./rainbow_connectWallet.module.stylus";
interface IProps {
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
    isMobile: boolean;
    className?: string;
    copy: any;
    useDisconnect: any;
}
declare const RainbowConnectWallet: React.MemoExoticComponent<(props: IProps) => React.JSX.Element>;
export default RainbowConnectWallet;
