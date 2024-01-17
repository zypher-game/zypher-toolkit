import { ConnectButton } from "@my/rainbowkit";
import classnames from "classnames";
import { isEqual } from "../../../utils/lodash";
import React, { memo, useMemo } from "react";

import { UnSupportChainId } from "../../../constant/constant";

import Account from "./rainbow_account";
import "./rainbow_connectWallet.stylus";
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
  showLang: boolean;
  CountupNumber?: React.FC<any>;
}
const RainbowConnectWallet = memo((props: IProps) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const {
    useLocation,
    className,
    env,
    copy,
    dispatch,
    setSuccessToast,
    setErrorToast,
    showLang,
    CountupNumber,
  } = props;
  const location = useLocation();
  const isPathLocation = useMemo(() => {
    const arr = location.pathname.split("/");
    if (arr[1] === "") {
      return window.location.href.indexOf("/bingo/") > -1;
    }
    return arr[1] === "play" || arr[1] === "zBingo" || arr[1] === "monster";
  }, [location]);
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
                (chain.unsupported || UnSupportChainId.includes(chain.id)) ? (
                <WrongNetwork />
              ) : (
                <Account
                  copy={copy}
                  env={env}
                  dispatch={dispatch}
                  setSuccessToast={setSuccessToast}
                  setErrorToast={setErrorToast}
                  showLang={showLang}
                  CountupNumber={CountupNumber}
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
