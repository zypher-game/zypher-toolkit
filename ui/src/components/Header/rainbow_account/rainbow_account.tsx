import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

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
import { ChainId } from "ui/src/constant/constant";

const AddressWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
  .account {
    display: flex;
    flex-direction: row-reverse;
    gap: 9px;
    p {
      padding-left: 14px;
    }
  }
  // .hat {
  //   width: 58px;
  //   height: 58px;
  //   position: absolute;
  //   right: -29px;
  //   top: -23px;
  //   z-index: 2;
  //   transform-origin: left bottom;
  //   animation: hat-animation 2s infinite;
  // }
  // @keyframes hat-animation {
  //   0% {
  //     transform: rotate(0deg);
  //   }
  //   50% {
  //     transform: rotate(6deg);
  //   }
  //   100% {
  //     transform: rotate(0deg);
  //   }
  // }
`;
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
  }: {
    showLang: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    CountupNumber?: React.FC<any>;
    setErrorToast: any;
    supportedChainList?: ChainId[];
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
          showLang={showLang}
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
          {/* <img
            className="hat"
            src="https://static.zypher.game/img/layout/hat.png"
          /> */}
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
