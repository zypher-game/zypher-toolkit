import classnames from "classnames";
import React, { ForwardRefExoticComponent, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import useWindowSize from "../../hooks/useWindowSize";
import Icon from "../../components/icons";

import LinkToBetaDialog from "../ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog";
import { ZypherLogo } from "../SideBar/SideBar";
import "./header.stylus";
import RainbowConnectWallet from "./rainbow_account/rainbow_connectWallet";
import { sideCollapseState } from "./state";
import { ChainId } from "../../constant/constant";
import IsPixelWidget from "./rainbow_account/IsPixelWidget";
import Navigation from "./Navigation/Navigation";
import {
  showBigState,
  showMiddleState,
} from "../ConnectWallet/state/connectWalletState";
import { LinkProps, NavigateFunction } from "react-router-dom";
export type HeaderUIType = "pixel" | "other";
interface IProps {
  env: string;
  dispatch: any;
  setSuccessToast: any;
  setErrorToast: any;
  className?: string;
  hideMenu?: boolean;
  copy: any;
  CountUpNumber?: React.FC<any>;
  supportedChainList?: ChainId[];
  pathname: string;
  useLocation: any;
  useNavigate: any;
  Link: any;
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
    pathname,
    Link,
  } = props;
  const { width } = useWindowSize();
  const [showBig, setShowBig] = useRecoilState(showBigState);
  const [showMiddle, setShowMiddle] = useRecoilState(showMiddleState);

  const { isW830, isW1190, isW1340, isW1540, isW1670, isWBig } = useMemo(() => {
    return {
      isW830: width <= 830,
      isW1190: width <= 1190,
      isW1340: width <= 1340,
      isW1540: width <= 1540,
      isW1670: width < 1670,
      isWBig: width >= 1340,
    };
  }, [width]);
  useEffect(() => {
    if (showBig) {
      setShowBig(false);
    }
    if (showMiddle) {
      setShowMiddle(false);
    }
  }, [width]);
  useEffect(() => {
    if (isW830 && collapsed === undefined) {
      setSideCollapse(true);
    }
  }, [isW830]);
  return (
    <header
      className={classnames(
        "header_header",
        isW830 ? "header_header_830" : "",
        isW1190 ? "header_header_1190" : "",
        isW1340 ? "header_header_1340" : "",
        isW1540 ? "header_header_1540" : "",
        isW1670 ? "header_header_1670" : "",
        props.className
      )}
      style={{ position: "sticky", top: 0, zIndex: 9, width: "100%" }}
    >
      <div className={"header_left"}>
        <ZypherLogo isMobile={isW830} />
      </div>
      {!isW830 && <Navigation pathname={pathname} Link={Link} />}
      <div className={"header_right"}>
        <RainbowConnectWallet
          type="pixel"
          isBigWidth={isWBig}
          isMiddleWidth={isW1340}
          useLocation={useLocation}
          copy={copy}
          env={env}
          dispatch={dispatch}
          setSuccessToast={setSuccessToast}
          setErrorToast={setErrorToast}
          CountUpNumber={CountUpNumber}
          supportedChainList={supportedChainList}
        />
        {isW830 && !hideMenu ? (
          <IsPixelWidget type="pixel" className="header_btn_pixel">
            <div
              className="header_btn"
              onClick={() => setSideCollapse(!collapsed)}
            >
              <Icon className="header_icon" name="menu" />
            </div>
          </IsPixelWidget>
        ) : null}
      </div>
      <LinkToBetaDialog />
    </header>
  );
};
export default Header;
