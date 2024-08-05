import { isEqual } from "../../../utils/lodash";
import React, { memo } from "react";

import { ChainId, supportedChainIds } from "../../../constant/constant";

import AccountInfo from "./rainbow_account";
import "./rainbow_connectWallet.stylus";
import WrongNetwork from "./WrongNetwork";
import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";
import Language from "../../SideBar/component/Language";
import IsPixelWidget from "./IsPixelWidget";
import { ConnectButton } from "../../../rainbowkit/src/components/ConnectButton/ConnectButton";
import { UIType } from "../header";
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
  CountUpNumber?: React.FC<any>;
  supportedChainList?: ChainId[];
  type?: UIType;
}
const RainbowConnectWallet = memo((props: IProps) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const {
    isBigWidth,
    isMiddleWidth,
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
  return (
    <div
      className={`connect_pixel_connectWallet
        ${className ?? ""}`}
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
                    `${chain.id}` as ChainId
                  )) ? (
                // <WrongNetwork />
                <h1>{chain.id}</h1>
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
