import React from "react";
import { ChainId } from "ui/src/constant/constant";
import { HeaderUIType } from "../header";
import "./rainbow_account.stylus";
declare const Account: React.MemoExoticComponent<({ showLang, env, dispatch, setSuccessToast, setErrorToast, copy, CountupNumber, supportedChainList, type, }: {
    showLang: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    CountupNumber?: React.FC<any> | undefined;
    setErrorToast: any;
    supportedChainList?: ChainId[] | undefined;
    type: HeaderUIType;
}) => React.JSX.Element>;
export default Account;
