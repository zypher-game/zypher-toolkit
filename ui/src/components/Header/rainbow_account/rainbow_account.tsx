import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import classnames from "classnames";

import { useActiveWeb3React } from "../../../hooks/useActiveWeb3React";
import { useIsMobile } from "../../../hooks/useWindowSize";

import LogoutDialog from "../../ConnectWallet/components/AccountInfoDialog";
import Balance from "../../ConnectWallet/components/Balance/Balance";
import ChainSelectorWidget from "../../ConnectWallet/components/ChainSelector/ChainSelectorWidget";
import PointsDialog from "../../ConnectWallet/components/PointsDialog/PointsDialog";
import PointsRuleDialog from "../../ConnectWallet/components/PointsDialog/PointsRuleDialog";
import {
  accountInfoDialogState,
  pointsDialogState,
} from "../../ConnectWallet/state/connectWalletState";
import PlayerAvatar from "../../PlayerAvatar";
import Language from "../../SideBar/component/Language";

const AddressWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .account {
    display: flex;
    flex-direction: row-reverse;
    gap: 9px;
    p {
      padding-left: 14px;
    }
  }
`;
const Account = memo(
  ({
    showLang,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
  }: {
    showLang: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    setErrorToast: any;
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
    const { account } = useActiveWeb3React();
    return (
      <>
        {showLang ? (
          <Language
            className_top="language_top"
            className={"language"}
            className_item={classnames("horListItme", "languageItme")}
            className_itemtip={"languageItmeTip"}
            className_on={"languageItmeOn"}
            type={"top"}
          />
        ) : null}
        <Balance
          env={env}
          isMobile={isMobile}
          showPointsModal={showPointsModal}
        />
        <AddressWrap onClick={showLogoutModal}>
          <PlayerAvatar
            className="account"
            account={account}
            size={isMobile ? 26 : 36}
            showAccount={isMobile ? false : true}
          />
        </AddressWrap>
        {!isMobile && <ChainSelectorWidget />}
        <LogoutDialog copy={copy} />
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
