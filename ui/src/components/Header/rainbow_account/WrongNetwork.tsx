import { useChainModal } from "../../../rainbowkit/src";
import { isEqual } from "../../../utils/lodash";
import React, { memo } from "react";
import { useSetRecoilState } from "recoil";

import { accountInfoDialogState } from "../../ConnectWallet/state/connectWalletState";
import "./rainbow_connectWallet.stylus";
import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";
import IsPixelWidget from "./IsPixelWidget";
import { HeaderUIType } from "../header";

const WrongNetwork = memo(({ type }: { type: HeaderUIType }) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const { openChainModal } = useChainModal();
  const setAccountInfoDialogOpen = useSetRecoilState(accountInfoDialogState);
  return (
    <IsPixelWidget
      type={type}
      onClick={() => {
        if (openChainModal) {
          openChainModal();
          setAccountInfoDialogOpen(false);
        }
      }}
      className={"connect_connect"}
    >
      <p>{t("Wrong network")}</p>
    </IsPixelWidget>
  );
}, isEqual);
export default WrongNetwork;
