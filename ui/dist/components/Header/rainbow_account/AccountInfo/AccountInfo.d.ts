import React from "react";
import { ChainId } from "../../../../constant/constant";
import "./AccountInfo.stylus";
type IAccountInfo = {
    isMiddleWidth: boolean;
    isW768: boolean;
    copy: any;
    env: string;
    supportedChainList?: ChainId[];
};
declare const AccountInfo: React.MemoExoticComponent<({ isW768, isMiddleWidth, copy, env, supportedChainList }: IAccountInfo) => React.JSX.Element>;
export default AccountInfo;
