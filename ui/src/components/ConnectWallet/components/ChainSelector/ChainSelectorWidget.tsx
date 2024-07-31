import { useChainModal } from "../../../../index";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback } from "react";
import styled from "styled-components";

import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";

import { useIsW768 } from "../../../../hooks/useWindowSize";
import * as config from "../../../../constant/constant";
import { useRecoilState } from "recoil";
import {
  accountInfoDialogState,
  pointsDialogState,
} from "../../state/connectWalletState";
import { sideCollapseState } from "../../../Header/state";
import "./ChainSelectorWidget.stylus";
import IsPixelWidget from "../../../Header/rainbow_account/IsPixelWidget";
const StatusI = styled.i<{ isMobile: boolean }>`
  box-sizing: content-box;
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #47ff1a;
  margin-left: ${({ isMobile }) => (isMobile ? "4px" : "10px")};
  border-radius: 50%;
  position: relative;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: -3px;
    left: -3px;
    border: 3px solid rgba(71, 255, 26, 0.29);
    box-sizing: content-box;
    border-radius: 50%;
  }
`;

type IProps = {
  className?: string;
  direction_type?: "userPop";
};
const ChainSelectorWidget = memo(({ className, direction_type }: IProps) => {
  const { chainId } = useActiveWeb3React();
  const isMobile = useIsW768();
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState(
    accountInfoDialogState
  );
  const [pointsDialogOpen, setPointsDialogOpen] =
    useRecoilState(pointsDialogState);

  const [sideCollapse, setSideCollapse] = useRecoilState(sideCollapseState);

  const { openChainModal } = useChainModal();
  const openChainModalHandle = useCallback(() => {
    if (accountInfoDialogOpen) {
      setAccountInfoDialogOpen(false);
    }
    if (pointsDialogOpen) {
      setPointsDialogOpen(false);
    }
    if (!sideCollapse) {
      setSideCollapse(true);
    }
    if (openChainModal) {
      openChainModal();
    }
  }, [openChainModal]);
  return chainId ? (
    <IsPixelWidget
      onClick={openChainModalHandle}
      {...(direction_type === "userPop"
        ? {
            backgroundColor: "#343C4F",
            borderColor: "#484F60",
            pixel_height: 3,
          }
        : {})}
      className={className ?? ""}
    >
      <div className="ChainSelectorWidgetWrapper">
        <div className="img">
          <img
            decoding="async"
            loading="lazy"
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
