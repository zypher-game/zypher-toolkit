import React, { memo, useCallback, useEffect, useState } from "react";
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
    const { chainId, account } = useActiveWeb3React(env, supportedChainList);
    const setAccountInfoDialogState = useSetRecoilState(accountInfoDialogState);
    const [showBig, setShowBig] = useState(false);
    const [showMiddle, setShowMiddle] = useState(false);
    const accountClick = useCallback(() => {
      if (isW768) {
        setShowBig(false);
        setShowMiddle(false);
        setAccountInfoDialogState(true);
      } else if (isMiddleWidth) {
        setShowMiddle((pre) => !pre);
      } else {
        setShowBig((pre) => !pre);
      }
    }, [isW768, isMiddleWidth, setAccountInfoDialogState]);
    useEffect(() => {
      if (isW768 || isMiddleWidth) {
        setShowBig(false);
        setShowMiddle(false);
      }
    }, [isW768, isMiddleWidth]);
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
            chainId={chainId}
          />
          {showBig ? <AddressBigWrapPop copy={copy} type={type} /> : null}
          {showMiddle ? <AddressMiddleWrapPop copy={copy} type={type} /> : null}
        </IsPixelWidget>
        {isW768 ? <AccountInfoDialog copy={copy} type={type} /> : null}
      </>
    );
  }
);
export default AccountInfo;
