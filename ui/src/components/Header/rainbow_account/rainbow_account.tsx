import { isEqual } from "../../../utils/lodash";
import React, { memo } from "react";

import { useIsW768 } from "../../../hooks/useWindowSize";

import Balance from "../../ConnectWallet/components/Balance/Balance";
import ChainSelectorWidget from "../../ConnectWallet/components/ChainSelector/ChainSelectorWidget";
import PointsDialog from "../../ConnectWallet/components/PointsDialog/PointsDialog";
import PointsRuleDialog from "../../ConnectWallet/components/PointsDialog/PointsRuleDialog";

import { ChainId } from "../../../constant/constant";
import AccountInfo from "./AccountInfo/AccountInfo";
import PointsV2Dialog from "../../Staking/GP/PointsV2Dialog";
import { usePointsDialogState } from "../../../hooks/usePointsDialogState";
const Account = memo(
  ({
    isMiddleWidth,
    env,
    setSuccessToast,
    setErrorToast,
    copy,
    CountUpNumber,
    supportedChainList,
  }: {
    isMiddleWidth: boolean;
    env: string;
    setSuccessToast: any;
    copy: any;
    CountUpNumber?: React.FC<any>;
    setErrorToast: any;
    supportedChainList?: ChainId[];
  }) => {
    const isW768 = useIsW768();
    const showPointsModal = usePointsDialogState();
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
