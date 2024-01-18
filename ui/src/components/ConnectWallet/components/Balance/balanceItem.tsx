import { LoadingOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback, useEffect } from "react";

import "./balance.stylus";
import GetPointsSuccess from "../PointsDialog/GetPointsSuccess";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  pointsAnimNumState,
  pointsAnimState,
} from "../../state/connectWalletState";

type IProps = {
  loading: boolean;
  balanceStr?: string;
  logo: React.ReactNode;
  className?: string;
  preChild?: React.ReactNode;
  onClick?: any;
  balance?: number;
  CountupNumber?: React.FC<any>;
};
const BalanceItem = memo(
  ({
    className,
    loading,
    balanceStr,
    logo,
    preChild,
    onClick,
    CountupNumber,
    balance,
  }: IProps) => {
    const onClickHandle = useCallback(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    return (
      <div
        className={classnames(`${className}`, "balance_item_balance")}
        onClick={onClickHandle}
      >
        {preChild}
        {loading ? (
          <LoadingOutlined />
        ) : (
          <>
            {CountupNumber && (balance || balance === 0) ? (
              <CountupNumber
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
      </div>
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
    CountupNumber,
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
      <div
        className={classnames(
          `${className}`,
          "balance_item_balance",
          "balance_item_balance_point"
        )}
        onClick={onClickHandle}
      >
        {preChild}
        {loading ? (
          <LoadingOutlined />
        ) : (
          <>
            {CountupNumber && (balance || balance === 0) ? (
              <CountupNumber
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
      </div>
    );
  },
  isEqual
);
export default BalanceItem;
