import React from "react";
import "./rainbow_connectWallet.stylus";
interface IProps {
    useLocation: any;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    setErrorToast: any;
    isMobile: boolean;
    className?: string;
    copy: any;
    showLang: boolean;
}
declare const RainbowConnectWallet: React.MemoExoticComponent<(props: IProps) => React.JSX.Element>;
export default RainbowConnectWallet;
