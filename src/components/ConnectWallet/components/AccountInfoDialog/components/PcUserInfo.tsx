import { useAsyncImage } from "@zypher-game/rainbowkit";
import { isEqual } from "../../../../../utils/lodash";

import React, { memo } from "react";

import { getShortenAddress } from "../../../../../utils/tool";
import Icon from "../../../../../components/icons";
import * as config from "../../../../../constant/constant";

import "./PcUserInfo.module.stylus";
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
const PcUserInfo = memo(
  ({
    connectName,
    connectIcon,
    account,
    chainId,
    cancel,
    copy,
  }: IUserInfoProps) => {
    const src = useAsyncImage(connectIcon);
    return (
      <div className={"pc_user_pc_content"}>
        <div className={"pc_user_box"}>
          <div className={"pc_user_tit"}>{`Connected with ${connectName}`}</div>
          <div className={"pc_user_info"}>
            {connectIcon && <img src={src} alt={connectName} />}
            <div className={"pc_user_text"}>{getShortenAddress(account)}</div>
            <span onClick={() => copy(account)}>
              <Icon name="copy" />
            </span>
            {config.BlockExplorerUrls[chainId] && (
              <a
                href={`${
                  config.BlockExplorerUrls[chainId] ?? [0]
                }/address/${account}`}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="link" />
              </a>
            )}
          </div>
        </div>
        <DisconnectBtn cancel={cancel} />
      </div>
    );
  },
  isEqual
);

export const DisconnectBtn = memo(({ cancel }: IDisconnectBtnProps) => {
  return (
    <p className={"pc_user_disconnect_btn"} onClick={cancel}>
      Disconnect
    </p>
  );
}, isEqual);
export default PcUserInfo;
