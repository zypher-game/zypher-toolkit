import { LoadingOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback, useEffect } from "react";

import "./balance.stylus";
import GetPointsSuccess from "../PointsDialog/GetPointsSuccess";
import {
  pointsAnimNumState,
  pointsAnimState,
} from "../../state/connectWalletState";
import { useRecoilState, useSetRecoilState } from "recoil";

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

export default BalanceItem;
