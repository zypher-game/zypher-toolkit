import React from "react";
import { ChainId } from "../../../constant/constant";
import { HeaderUIType } from "../header";
declare const Account: React.MemoExoticComponent<({ isMiddleWidth, env, dispatch, setSuccessToast, setErrorToast, copy, CountUpNumber, supportedChainList, type, }: {
    isMiddleWidth: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    CountUpNumber?: React.FC<any> | undefined;
    setErrorToast: any;
    supportedChainList?: ChainId[] | undefined;
    type: HeaderUIType;
}) => React.JSX.Element>;
export default Account;
