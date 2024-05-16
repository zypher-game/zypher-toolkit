import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { useActiveWeb3React } from "../../../hooks/useActiveWeb3React";
import { useIsMobile } from "../../../hooks/useWindowSize";

// import AccountInfoDialog from "../../ConnectWallet/components/AccountInfoDialog";
import Balance from "../../ConnectWallet/components/Balance/Balance";
import ChainSelectorWidget from "../../ConnectWallet/components/ChainSelector/ChainSelectorWidget";
import PointsDialog from "../../ConnectWallet/components/PointsDialog/PointsDialog";
import PointsRuleDialog from "../../ConnectWallet/components/PointsDialog/PointsRuleDialog";
import {
  accountInfoDialogState,
  pointsDialogState,
} from "../../ConnectWallet/state/connectWalletState";
import PlayerAvatar from "../../PlayerAvatar";
import { ChainId } from "../../../constant/constant";
import { HeaderUIType } from "../header";
import IsPixelWidget from "./IsPixelWidget";
import "./rainbow_account.stylus";
import AccountInfoDialog, {
  AddressWrapPop,
} from "../../ConnectWallet/components/AccountInfoDialog/AccountInfoDialog";
const Account = memo(
  ({
    showLang,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
    CountupNumber,
    supportedChainList,
    type,
  }: {
    showLang: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    CountupNumber?: React.FC<any>;
    setErrorToast: any;
    supportedChainList?: ChainId[];
    type: HeaderUIType;
  }) => {
    const isMobile = useIsMobile();
    const setPointsDialogState = useSetRecoilState(pointsDialogState);
    const showPointsModal = useCallback(() => {
      setPointsDialogState(true);
    }, [setPointsDialogState]);
    const setAccountInfoDialogState = useSetRecoilState(accountInfoDialogState);
    const showLogoutModal = useCallback(() => {
      setAccountInfoDialogState(true);
    }, [setAccountInfoDialogState]);
    const { account } = useActiveWeb3React(env, supportedChainList);
    return (
      <>
        <Balance
          CountupNumber={CountupNumber}
          env={env}
          isMobile={isMobile}
          showPointsModal={showPointsModal}
          type={type}
        />
        <IsPixelWidget
          type={type}
          className="address_wrap"
          onClick={showLogoutModal}
        >
          <PlayerAvatar
            className="account"
            account={account}
            size={isMobile ? 26 : 40}
            showAccount={isMobile ? false : true}
            type={type}
          />
          {type === "pixel" ? <AddressWrapPop copy={copy} type={type} /> : null}
          {/* <img
            className="hat"
            src="https://static.zypher.game/img/layout/hat.png"
          /> */}
        </IsPixelWidget>
        {!isMobile && <ChainSelectorWidget type={type} />}
        {type !== "pixel" ? (
          <AccountInfoDialog copy={copy} type={type} />
        ) : null}
        <PointsDialog
          env={env}
          dispatch={dispatch}
          setSuccessToast={setSuccessToast}
          setErrorToast={setErrorToast}
        />
        <PointsRuleDialog />
      </>
    );
  },
  isEqual
);

export default Account;
