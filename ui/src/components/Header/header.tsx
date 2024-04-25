import classnames from "classnames";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useIsMd1100 } from "../../hooks/useWindowSize";
import Icon from "../../components/icons";

import LinkToBetaDialog from "../ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog";
import { ZypherLogo } from "../SideBar";
import "./header.stylus";
import RainbowConnectWallet from "./rainbow_account/rainbow_connectWallet";
import { siderCollapseState } from "./state";
import { ChainId } from "../../constant/constant";
import IsPixelWidget from "./rainbow_account/IsPixelWidget";
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
  Middle?: React.FC<any>;
  pathname: string;
}

const Header = (props: IProps): React.ReactElement | null => {
  const isMobile = useIsMd1100();
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
    Middle,
    pathname,
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
      {Middle && <Middle pathname={pathname} />}
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
          <IsPixelWidget
            type={type}
            className={`${type === "pixel" ? "header_btn_pixel" : ""}`}
          >
            <div
              className="header_btn"
              onClick={() => setSiderCollapse(!collapsed)}
            >
              <Icon
                className={`header_icon ${collapsed ? "" : "header_close"}`}
                name={`${collapsed ? "menu" : "close"}`}
              />
            </div>
          </IsPixelWidget>
        ) : null}
      </div>
      <LinkToBetaDialog />
    </header>
  );
};
export default Header;
