import { isEqual } from "../../../utils/lodash";
import React, { memo, useMemo } from "react";

import { ChainId, supportedChainIds } from "../../../constant/constant";

import AccountInfo from "./rainbow_account";
import "./rainbow_connectWallet.stylus";
import WrongNetwork from "./WrongNetwork";
import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";
import { HeaderUIType } from "../header";
import Language from "../../SideBar/component/Language";
import IsPixelWidget from "./IsPixelWidget";
import { ConnectButton } from "../../../rainbowkit/src/components/ConnectButton/ConnectButton";
interface IProps {
  useLocation: any;
  env: string;
  dispatch: any;
  setSuccessToast: any;
  setErrorToast: any;
  className?: string;
  isBigWidth: boolean;
  isMiddleWidth: boolean;
  copy: any;
  type: HeaderUIType;
  CountUpNumber?: React.FC<any>;
  supportedChainList?: ChainId[];
}
const RainbowConnectWallet = memo((props: IProps) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const {
    isBigWidth,
    isMiddleWidth,
    useLocation,
    className,
    env,
    copy,
    dispatch,
    setSuccessToast,
    setErrorToast,
    CountUpNumber,
    supportedChainList,
    type,
  } = props;
  const location = useLocation();
  const isPathLocation = useMemo(() => {
    if (window.location.href.indexOf("/bingo/") > -1) {
      return true;
    }
    const arr = location.pathname.split("/");
    return arr[1] === "play" || arr[1] === "zBingo" || arr[1] === "monster";
  }, [location]);
  return (
    <div
      className={`
      ${
        type === "pixel"
          ? "connect_pixel_connectWallet"
          : "connect_connectWallet"
      }
        ${type === "other" && isPathLocation ? "connect_bgWallet" : ""}
        ${className ?? ""}
        `}
    >
      <ConnectButton.Custom>
        {({ chain, openConnectModal, mounted }: any) => {
          return (
            <>
              {!mounted || !chain ? (
                <IsPixelWidget
                  onClick={openConnectModal}
                  className={"connect_connect"}
                >
                  <p>{t("Connect Wallet")}</p>
                </IsPixelWidget>
              ) : chain &&
                (chain.unsupported ||
                  !supportedChainIds(env, supportedChainList).includes(
                    chain.id
                  )) ? (
                <WrongNetwork type={type} />
              ) : (
                <AccountInfo
                  copy={copy}
                  env={env}
                  dispatch={dispatch}
                  setSuccessToast={setSuccessToast}
                  setErrorToast={setErrorToast}
                  CountUpNumber={CountUpNumber}
                  isMiddleWidth={isMiddleWidth}
                  supportedChainList={supportedChainList}
                  type={type}
                />
              )}
            </>
          );
        }}
      </ConnectButton.Custom>
      {isBigWidth ? <Language type={type === "pixel" ? type : "top"} /> : null}
    </div>
  );
}, isEqual);
export default RainbowConnectWallet;
