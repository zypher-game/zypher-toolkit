import { LoadingOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback } from "react";

import "./balance.module.stylus";

type IProps = {
  loading: boolean;
  balanceStr: string;
  logo: React.ReactNode;
  className?: string;
  preChild?: React.ReactNode;
  onClick?: any;
};
const BalanceItem = memo(
  ({ className, loading, balanceStr, logo, preChild, onClick }: IProps) => {
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
            {balanceStr}
            {logo}
          </>
        )}
      </div>
    );
  },
  isEqual
);
export default BalanceItem;
