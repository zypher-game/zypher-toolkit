import { useChainModal } from "@zypher-game/rainbowkit";
import { isEqual } from "../../../utils/lodash";
import React, { memo } from "react";
import { useSetRecoilState } from "recoil";

import { useInitRainbowFn } from "../../../hooks/useInitRainbowFn";

import { accountInfoDialogState } from "../../ConnectWallet/state/connectWalletState";
import "./rainbow_connectWallet.module.stylus";

const WrongNetwork = memo(() => {
  const { openChainModal } = useChainModal();
  const setAccountInfoDialogOpen = useSetRecoilState(accountInfoDialogState);
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
      <p>Wrong network</p>
    </div>
  );
}, isEqual);
export default WrongNetwork;
