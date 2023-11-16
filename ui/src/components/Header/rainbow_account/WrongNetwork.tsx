import { useChainModal } from "@my/rainbowkit";
import { isEqual } from "../../../utils/lodash";
import React, { memo } from "react";
import { useSetRecoilState } from "recoil";

import { useInitRainbowFn } from "../../../hooks/useInitRainbowFn";

import { accountInfoDialogState } from "../../ConnectWallet/state/connectWalletState";
import "./rainbow_connectWallet.module.stylus";
import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";

const WrongNetwork = memo(() => {
  const { openChainModal } = useChainModal();
  const setAccountInfoDialogOpen = useSetRecoilState(accountInfoDialogState);
  const { t } = useCustomTranslation([LngNs.common]);
  useInitRainbowFn();
  return (
    <div
      onClick={() => {
        if (openChainModal) {
          openChainModal();
          setAccountInfoDialogOpen(false);
        }
      }}
      className={"connect_connect"}
    >
      <p>{t("Wrong network")}</p>
    </div>
  );
}, isEqual);
export default WrongNetwork;
