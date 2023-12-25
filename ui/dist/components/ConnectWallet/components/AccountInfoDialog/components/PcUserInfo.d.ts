import React from "react";
import * as config from "../../../../../constant/constant";
import "./PcUserInfo.stylus";
type IDisconnectBtnProps = {
    cancel: any;
};
export interface IUserInfoProps extends IDisconnectBtnProps {
    connectName?: string;
    connectIcon?: any;
    account: string;
    chainId: config.ChainId;
    copy: any;
}
declare const PcUserInfo: React.MemoExoticComponent<({ connectName, connectIcon, account, chainId, cancel, copy, }: IUserInfoProps) => React.JSX.Element>;
export declare const DisconnectBtn: React.MemoExoticComponent<({ cancel }: IDisconnectBtnProps) => React.JSX.Element>;
export default PcUserInfo;
