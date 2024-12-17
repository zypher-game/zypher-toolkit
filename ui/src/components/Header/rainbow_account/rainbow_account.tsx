import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { useIsW768 } from "../../../hooks/useWindowSize";
import { useActiveWeb3React } from "../../../hooks/useActiveWeb3React";

import Balance from "../../ConnectWallet/components/Balance/Balance";
import ChainSelectorWidget from "../../ConnectWallet/components/ChainSelector/ChainSelectorWidget";
import PointsDialog from "../../ConnectWallet/components/PointsDialog/PointsDialog";
import PointsRuleDialog from "../../ConnectWallet/components/PointsDialog/PointsRuleDialog";
import {
  pointsDialogState,
  pointsV2DialogState,
} from "../../ConnectWallet/state/connectWalletState";
import { ChainId, GPV2 } from "../../../constant/constant";
import AccountInfo from "./AccountInfo/AccountInfo";
import PointsV2Dialog from "../../Staking/GP/PointsV2Dialog";
import { GPV2SupportChainId } from "../../Staking/GP/constant/GPConstant";
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
    const setPointsV2DialogState = useSetRecoilState(pointsV2DialogState);
    const { chainId } = useActiveWeb3React();
    const showPointsModal = useCallback(() => {
      // GPV2
      if (GPV2) {
        if (GPV2SupportChainId.includes(chainId)) {
          setPointsV2DialogState(true);
        } else {
          setPointsDialogState(true);
        }
      } else {
        setPointsDialogState(true);
      }
    }, [setPointsDialogState, chainId]);
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
          setSuccessToast={setSuccessToast}
          setErrorToast={setErrorToast}
        />
        <PointsV2Dialog
          env={env}
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
