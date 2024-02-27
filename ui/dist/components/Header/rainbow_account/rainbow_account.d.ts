import React from "react";
import { ChainId } from "ui/src/constant/constant";
declare const Account: React.MemoExoticComponent<({ showLang, env, dispatch, setSuccessToast, setErrorToast, copy, CountupNumber, supportedChainList, }: {
    showLang: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    CountupNumber?: React.FC<any> | undefined;
    setErrorToast: any;
    supportedChainList?: ChainId[] | undefined;
}) => React.JSX.Element>;
export default Account;
