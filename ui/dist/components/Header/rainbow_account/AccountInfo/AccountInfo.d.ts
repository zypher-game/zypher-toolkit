import React from "react";
import { HeaderUIType } from "../../header";
import { ChainId } from "../../../../constant/constant";
import "./AccountInfo.stylus";
type IAccountInfo = {
    type: HeaderUIType;
    isMiddleWidth: boolean;
    isW768: boolean;
    copy: any;
    env: string;
    supportedChainList?: ChainId[];
};
declare const AccountInfo: React.MemoExoticComponent<({ isW768, isMiddleWidth, type, copy, env, supportedChainList, }: IAccountInfo) => React.JSX.Element>;
export default AccountInfo;
