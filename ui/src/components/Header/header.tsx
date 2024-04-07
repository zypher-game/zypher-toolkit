import classnames from "classnames";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useIsMobile } from "../../hooks/useWindowSize";
import Icon from "../../components/icons";

import LinkToBetaDialog from "../ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog";
import { ZypherLogo } from "../SideBar";
import "./header.stylus";
import RainbowConnectWallet from "./rainbow_account/rainbow_connectWallet";
import { siderCollapseState } from "./state";
import { ChainId } from "ui/src/constant/constant";
export type HeaderUIType = "pixel" | "other";
interface IProps {
  type: HeaderUIType;
  env: string;
  dispatch: any;
  setSuccessToast: any;
  setErrorToast: any;
  className?: string;
  hideMenu?: boolean;
  copy: any;
  useNavigate: any;
  useLocation: any;
  showLang: boolean;
  CountupNumber?: React.FC<any>;
  supportedChainList?: ChainId[];
}

const Header = (props: IProps): React.ReactElement | null => {
  const isMobile = useIsMobile();
  const setSiderCollapse = useSetRecoilState(siderCollapseState);
  const collapsed = useRecoilValue(siderCollapseState);
  const {
    hideMenu = false,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
    useLocation,
    showLang,
    CountupNumber,
    supportedChainList,
    type,
  } = props;
  useEffect(() => {
    if (isMobile && collapsed === undefined) {
      setSiderCollapse(true);
    }
  }, [isMobile]);
  return (
    <header
      className={classnames("header_header", props.className)}
      style={{ position: "sticky", top: 0, zIndex: 9, width: "100%" }}
    >
      {type === "pixel" || (type === "other" && isMobile) ? (
        <div className={"header_left"}>
          <ZypherLogo isMobile={isMobile} />
        </div>
      ) : null}
      <div className={"header_right"}>
        {/* <ConnectWallet isMobile={isMobile} /> */}
        <RainbowConnectWallet
          showLang={showLang}
          useLocation={useLocation}
          copy={copy}
          isMobile={isMobile}
          env={env}
          dispatch={dispatch}
          setSuccessToast={setSuccessToast}
          setErrorToast={setErrorToast}
          CountupNumber={CountupNumber}
          supportedChainList={supportedChainList}
          type={type}
        />
        {isMobile && !hideMenu ? (
          <>
            {collapsed ? (
              <div
                className={"header_btn"}
                onClick={() => setSiderCollapse(false)}
              >
                <Icon className={classnames("header_icon")} name={"menu"} />
              </div>
            ) : (
              <div
                className={"header_btn"}
                onClick={() => setSiderCollapse(true)}
              >
                <Icon
                  className={classnames("header_icon", "header_close")}
                  name={"close"}
                />
              </div>
            )}
          </>
        ) : null}
      </div>
      <LinkToBetaDialog />
    </header>
  );
};
export default Header;
