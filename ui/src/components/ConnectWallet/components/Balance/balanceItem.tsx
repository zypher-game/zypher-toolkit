import { LoadingOutlined } from "@ant-design/icons";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback, useEffect } from "react";

import "./balance.stylus";
import GetPointsSuccess from "../PointsDialog/GetPointsSuccess";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  pointsAnimNumState,
  pointsAnimState,
} from "../../state/connectWalletState";
import IsPixelWidget from "../../../Header/rainbow_account/IsPixelWidget";

type IProps = {
  loading: boolean;
  balanceStr?: string;
  logo: React.ReactNode;
  className?: string;
  preChild?: React.ReactNode;
  onClick?: any;
  balance?: number;
  CountUpNumber?: React.FC<any>;
};
const BalanceItem = memo(
  ({
    className,
    loading,
    balanceStr,
    logo,
    preChild,
    onClick,
    CountUpNumber,
    balance,
  }: IProps) => {
    const onClickHandle = useCallback(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    return (
      <IsPixelWidget
        className={`balance_item_balance balance_item_balance_pixel
        ${className ?? ""}`}
        onClick={onClickHandle}
      >
        {preChild}
        {loading ? (
          <LoadingOutlined />
        ) : (
          <>
            {CountUpNumber && (balance || balance === 0) ? (
              <CountUpNumber
                value={balance}
                decimals={0}
                duration={1.5}
                showDiv={false}
              />
            ) : (
              balanceStr
            )}
            {logo}
          </>
        )}
      </IsPixelWidget>
    );
  },
  isEqual
);
export const BalanceCountUpItem = memo(
  ({
    className,
    loading,
    balance,
    logo,
    preChild,
    onClick,
    CountUpNumber,
    balanceStr,
  }: IProps) => {
    const setPointsAnimState = useSetRecoilState(pointsAnimState);
    const [mount, setMount] = useRecoilState(pointsAnimNumState);
    const onClickHandle = useCallback(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    useEffect(() => {
      if (mount === 1) {
        setPointsAnimState(true);
        setTimeout(() => {
          setPointsAnimState(false);
          setMount(0);
        }, 3000);
      }
    }, [mount]);

    return (
      <IsPixelWidget
        className={`balance_item_balance_point balance_item_balance  balance_item_balance_pixel
        ${className ?? ""}`}
        onClick={onClickHandle}
      >
        {preChild}
        {loading ? (
          <LoadingOutlined />
        ) : (
          <>
            {CountUpNumber && (balance || balance === 0) ? (
              <CountUpNumber
                value={balance}
                decimals={0}
                duration={1.5}
                showDiv={false}
              />
            ) : (
              balanceStr
            )}
            {logo}
          </>
        )}
        <GetPointsSuccess />
      </IsPixelWidget>
    );
  },
  isEqual
);
export default BalanceItem;
