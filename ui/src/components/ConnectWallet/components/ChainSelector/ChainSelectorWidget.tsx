import { useChainModal } from "@my/rainbowkit";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback } from "react";
import styled from "styled-components";

import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";

import { useIsMobile } from "../../../../hooks/useWindowSize";
import * as config from "../../../../constant/constant";
import { useRecoilState } from "recoil";
import {
  accountInfoDialogState,
  pointsDialogState,
} from "../../state/connectWalletState";
import { siderCollapseState } from "../../../Header/state";
import "./ChainSelectorWidget.stylus";
import IsPixelWidget from "../../../Header/rainbow_account/IsPixelWidget";
import { HeaderUIType } from "../../../Header/header";
const StatusI = styled.i<{ isMobile: boolean }>`
  box-sizing: content-box;
  display: inline-block;
  width: ${({ isMobile }) => (isMobile ? "5px" : "6px")};
  height: ${({ isMobile }) => (isMobile ? "5px" : "6px")};
  background-color: #65edbc;
  margin-left: ${({ isMobile }) => (isMobile ? "4px" : "10px")};
  border-radius: 50%;
  position: relative;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: ${({ isMobile }) => (isMobile ? "-2px" : "-3px")};
    left: ${({ isMobile }) => (isMobile ? "-2px" : "-3px")};
    border: ${({ isMobile }) => (isMobile ? "2px" : "3px")} solid
      rgba(101, 237, 188, 0.19);
    box-sizing: content-box;
    border-radius: 50%;
  }
`;

type IProps = {
  className?: string;
  type: HeaderUIType;
};
const ChainSelectorWidget = memo(({ className, type }: IProps) => {
  const { chainId } = useActiveWeb3React();
  const isMobile = useIsMobile();
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState(
    accountInfoDialogState
  );
  const [pointsDialogOpen, setPointsDialogOpen] =
    useRecoilState(pointsDialogState);

  const [siderCollapse, setSiderCollapse] = useRecoilState(siderCollapseState);

  const { openChainModal } = useChainModal();
  const openChainModalHandle = useCallback(() => {
    if (accountInfoDialogOpen) {
      setAccountInfoDialogOpen(false);
    }
    if (pointsDialogOpen) {
      setPointsDialogOpen(false);
    }
    if (!siderCollapse) {
      setSiderCollapse(true);
    }
    if (openChainModal) {
      openChainModal();
    }
  }, [openChainModal]);
  return chainId ? (
    <IsPixelWidget type={type} onClick={openChainModalHandle}>
      <div className={`ChainSelectorWidgetWrapper ${className ?? ""}`}>
        <div className="img">
          <img
            src={config.ChainImage[chainId]}
            alt={config.ChainName[chainId]}
          />
          <p>{config.ChainName[chainId]}</p>
        </div>
        <StatusI isMobile={isMobile} />
      </div>
    </IsPixelWidget>
  ) : null;
}, isEqual);
export default ChainSelectorWidget;
