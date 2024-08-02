import React from "react";
import { ChainId } from "../../../constant/constant";
declare const Account: React.MemoExoticComponent<({ isMiddleWidth, env, dispatch, setSuccessToast, setErrorToast, copy, CountUpNumber, supportedChainList, }: {
    isMiddleWidth: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    CountUpNumber?: React.FC<any> | undefined;
    setErrorToast: any;
    supportedChainList?: ChainId[] | undefined;
}) => React.JSX.Element>;
export default Account;
