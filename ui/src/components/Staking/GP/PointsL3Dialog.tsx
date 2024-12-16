import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback, useMemo, useState } from "react";
import { IPointsDialog } from "../../ConnectWallet/components/PointsDialog/PointsDialog.type";

const PointsL2Dialog = memo(
  ({ env, setSuccessToast, setErrorToast }: IPointsDialog) => {
    return null;
  },
  isEqual
);
export default PointsL2Dialog;
