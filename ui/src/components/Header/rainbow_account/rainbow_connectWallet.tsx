import { ConnectButton } from "@my/rainbowkit";
import classnames from "classnames";
import { isEqual } from "../../../utils/lodash";
import React, { memo, useMemo } from "react";

import { ChainId } from "../../../constant/constant";

import Account from "./rainbow_account";
import "./rainbow_connectWallet.module.stylus";
import WrongNetwork from "./WrongNetwork";
import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";

interface IProps {
  useLocation: any;
  env: string;
  dispatch: any;
  setSuccessToast: any;
  setErrorToast: any;
  isMobile: boolean;
  className?: string;
  copy: any;
}
const RainbowConnectWallet = memo((props: IProps) => {
  const {
    useLocation,
    className,
    env,
    copy,
    dispatch,
    setSuccessToast,
    setErrorToast,
  } = props;
  const location = useLocation();
  const isPathLocation = useMemo(() => {
    const arr = location.pathname.split("/");
    return arr[1] === "play" || arr[1] === "zBingo" || arr[1] === "monster";
  }, [location]);
  const { t } = useCustomTranslation([LngNs.common]);
  return (
    <div
      className={classnames(
        "connect_connectWallet",
        isPathLocation ? "connect_bgWallet" : "",
        className
      )}
    >
      <ConnectButton.Custom>
        {({ chain, openConnectModal, mounted }: any) => {
          return (
            <>
              {!mounted || !chain ? (
                <div onClick={openConnectModal} className={"connect_connect"}>
                  <p>{t("Connect Wallet")}</p>
                </div>
              ) : chain &&
                (chain.unsupported ||
                  chain.id === ChainId.Arbitrum ||
                  chain.id === ChainId.MantaPacificMainnet) ? (
                <WrongNetwork />
              ) : (
                <Account
                  copy={copy}
                  env={env}
                  dispatch={dispatch}
                  setSuccessToast={setSuccessToast}
                  setErrorToast={setErrorToast}
                />
              )}
            </>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}, isEqual);
export default RainbowConnectWallet;
