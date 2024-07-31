import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { useIsW768 } from "../../../hooks/useWindowSize";

import Balance from "../../ConnectWallet/components/Balance/Balance";
import ChainSelectorWidget from "../../ConnectWallet/components/ChainSelector/ChainSelectorWidget";
import PointsDialog from "../../ConnectWallet/components/PointsDialog/PointsDialog";
import PointsRuleDialog from "../../ConnectWallet/components/PointsDialog/PointsRuleDialog";
import { pointsDialogState } from "../../ConnectWallet/state/connectWalletState";
import { ChainId } from "../../../constant/constant";
import AccountInfo from "./AccountInfo/AccountInfo";
const Account = memo(
  ({
    isMiddleWidth,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
    CountUpNumber,
    supportedChainList,
  }: {
    isMiddleWidth: boolean;
    env: string;
    dispatch: any;
    setSuccessToast: any;
    copy: any;
    CountUpNumber?: React.FC<any>;
    setErrorToast: any;
    supportedChainList?: ChainId[];
  }) => {
    const isW768 = useIsW768();
    const setPointsDialogState = useSetRecoilState(pointsDialogState);
    const showPointsModal = useCallback(() => {
      setPointsDialogState(true);
    }, [setPointsDialogState]);
    return (
      <>
        <Balance
          isMiddleWidth={isMiddleWidth}
          CountUpNumber={CountUpNumber}
          env={env}
          showPointsModal={showPointsModal}
        />
        <AccountInfo
          isMiddleWidth={isMiddleWidth}
          isW768={isW768}
          copy={copy}
          env={env}
        />
        {!isMiddleWidth && <ChainSelectorWidget />}
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
