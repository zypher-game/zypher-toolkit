import classnames from "classnames";
import React, { useEffect, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import useWindowSize from "../../hooks/useWindowSize";
import Icon from "../../components/icons";

import LinkToBetaDialog from "../ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog";
import { ZypherLogo } from "../SideBar";
import "./header.stylus";
import RainbowConnectWallet from "./rainbow_account/rainbow_connectWallet";
import { sideCollapseState } from "./state";
import { ChainId } from "../../constant/constant";
import IsPixelWidget from "./rainbow_account/IsPixelWidget";
export type HeaderUIType = "pixel" | "other";
interface IProps {
  env: string;
  dispatch: any;
  setSuccessToast: any;
  setErrorToast: any;
  className?: string;
  hideMenu?: boolean;
  copy: any;
  useNavigate: any;
  useLocation: any;
  CountUpNumber?: React.FC<any>;
  supportedChainList?: ChainId[];
  Middle?: React.FC<any>;
  pathname: string;
}

const Header = (props: IProps): React.ReactElement | null => {
  const setSideCollapse = useSetRecoilState(sideCollapseState);
  const collapsed = useRecoilValue(sideCollapseState);
  const {
    hideMenu = false,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
    useLocation,
    CountUpNumber,
    supportedChainList,
    Middle,
    pathname,
  } = props;
  const { width } = useWindowSize();
  const { isW768, isW1190, isW1300, isW1540, isW1670, isWBig } = useMemo(() => {
    return {
      isW768: width <= 768,
      isW1190: width <= 1190,
      isW1300: width <= 1300,
      isW1540: width <= 1540,
      isW1670: width < 1670,
      isWBig: width >= 1670,
    };
  }, [width]);
  useEffect(() => {
    if (isW768 && collapsed === undefined) {
      setSideCollapse(true);
    }
  }, [isW768]);
  return (
    <header
      className={classnames(
        "header_header",
        isW768 ? "header_header_768" : "",
        isW1190 ? "header_header_1190" : "",
        isW1300 ? "header_header_1300" : "",
        isW1540 ? "header_header_1540" : "",
        isW1670 ? "header_header_1670" : "",
        props.className
      )}
      style={{ position: "sticky", top: 0, zIndex: 9, width: "100%" }}
    >
      <div className={"header_left"}>
        <ZypherLogo isMobile={isW768} />
      </div>
      {Middle && !isW768 && <Middle pathname={pathname} />}
      <div className={"header_right"}>
        <RainbowConnectWallet
          type="pixel"
          isBigWidth={isWBig}
          isMiddleWidth={isW1300}
          useLocation={useLocation}
          copy={copy}
          env={env}
          dispatch={dispatch}
          setSuccessToast={setSuccessToast}
          setErrorToast={setErrorToast}
          CountUpNumber={CountUpNumber}
          supportedChainList={supportedChainList}
        />
        {isW768 && !hideMenu ? (
          <IsPixelWidget type="pixel" className="header_btn_pixel">
            <div
              className="header_btn"
              onClick={() => setSideCollapse(!collapsed)}
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
