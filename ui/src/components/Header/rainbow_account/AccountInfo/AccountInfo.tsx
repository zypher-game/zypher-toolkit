import React, { memo, useCallback, useState } from "react";
import IsPixelWidget from "../IsPixelWidget";
import { HeaderUIType } from "../../header";
import { useSetRecoilState } from "recoil";
import { accountInfoDialogState } from "../../../../components/ConnectWallet/state/connectWalletState";
import PlayerAvatar from "../../../../components/PlayerAvatar";
import AccountInfoDialog, {
  AddressBigWrapPop,
  AddressMiddleWrapPop,
} from "../../../ConnectWallet/components/AccountInfoDialog/AccountInfoDialog";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
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
const AccountInfo = memo(
  ({
    isW768,
    isMiddleWidth,
    type,
    copy,
    env,
    supportedChainList,
  }: IAccountInfo) => {
    const { account } = useActiveWeb3React(env, supportedChainList);
    const setAccountInfoDialogState = useSetRecoilState(accountInfoDialogState);
    const [showBig, setShowBig] = useState(false);
    const [showMiddle, setShowMiddle] = useState(true);
    const accountClick = useCallback(() => {
      if (isW768) {
        setAccountInfoDialogState(true);
      } else if (isMiddleWidth) {
        setShowBig((pre) => !pre);
      } else {
        setShowMiddle((pre) => !pre);
      }
    }, [isW768, setAccountInfoDialogState]);
    return (
      <>
        <IsPixelWidget
          type={type}
          className="address_wrap"
          onClick={accountClick}
        >
          <PlayerAvatar
            className="account"
            account={account}
            size={isW768 ? 30 : 40}
            showAccount={isMiddleWidth ? false : true}
            type={type}
          />
          {showBig ? <AddressBigWrapPop copy={copy} type={type} /> : null}
          {showMiddle ? <AddressMiddleWrapPop copy={copy} type={type} /> : null}
        </IsPixelWidget>
        <AccountInfoDialog copy={copy} type={type} />
      </>
    );
  }
);
export default AccountInfo;
