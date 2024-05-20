import classnames from "classnames";
import React, { useEffect, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import useWindowSize, { useIsW1100 } from "../../hooks/useWindowSize";
import Icon from "../../components/icons";

import LinkToBetaDialog from "../ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog";
import { ZypherLogo } from "../SideBar";
import "./header.stylus";
import RainbowConnectWallet from "./rainbow_account/rainbow_connectWallet";
import { siderCollapseState } from "./state";
import { ChainId } from "../../constant/constant";
import IsPixelWidget from "./rainbow_account/IsPixelWidget";
import { PixelBorderCardButton } from "../PixelBtn/ActivePixelButton";
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
  const { width } = useWindowSize();
  const { isW768, isW1190, isW1290, isW1540, isW1670 } = useMemo(() => {
    return {
      isW768: width <= 768,
      isW1190: width <= 1190,
      isW1290: width <= 1290,
      isW1540: width <= 1540,
      isW1670: width < 1670,
    };
  }, [width]);
  useEffect(() => {
    if (isW768 && collapsed === undefined) {
      setSiderCollapse(true);
    }
  }, [isW768]);
  return (
    <header
      className={classnames(
        "header_header",
        isW768 ? "header_header_768" : "",
        isW1190 ? "header_header_1190" : "",
        isW1290 ? "header_header_1290" : "",
        isW1540 ? "header_header_1540" : "",
        isW1670 ? "header_header_1670" : "",
        props.className
      )}
      style={{ position: "sticky", top: 0, zIndex: 9, width: "100%" }}
    >
      {type === "pixel" || (type === "other" && isW768) ? (
        <div className={"header_left"}>
          <ZypherLogo isMobile={isW768} />
        </div>
      ) : null}
      {Middle && !isW768 && <Middle pathname={pathname} />}
      <div className={"header_right"}>
        {/* <ConnectWallet isMobile={isMobile} /> */}
        <RainbowConnectWallet
          showLang={showLang}
          useLocation={useLocation}
          copy={copy}
          isMobile={isW768}
          env={env}
          dispatch={dispatch}
          setSuccessToast={setSuccessToast}
          setErrorToast={setErrorToast}
          CountupNumber={CountupNumber}
          supportedChainList={supportedChainList}
          type={type}
          hideRefresh={isW1290}
        />
        {isW768 && !hideMenu ? (
          <IsPixelWidget type={type} className="header_btn_pixel">
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
