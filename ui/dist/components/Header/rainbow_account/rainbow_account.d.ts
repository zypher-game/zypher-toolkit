import React from "react";
import { ChainId } from "../../../constant/constant";
import { HeaderUIType } from "../header";
import "./rainbow_account.stylus";
declare const Account: React.MemoExoticComponent<({ showLang, env, dispatch, setSuccessToast, setErrorToast, copy, CountupNumber, supportedChainList, type, hideRefresh, }: {
    showLang: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    CountupNumber?: React.FC<any> | undefined;
    setErrorToast: any;
    supportedChainList?: ChainId[] | undefined;
    type: HeaderUIType;
    hideRefresh?: boolean | undefined;
}) => React.JSX.Element>;
export default Account;
