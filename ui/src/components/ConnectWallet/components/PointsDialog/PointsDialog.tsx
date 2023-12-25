import classnames from "classnames";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import CurrencyLogo from "../../../CurrencyLogo";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { useCustomTranslation } from "../../../../hooks/useCustomTranslation";
import { useIsMobile } from "../../../../hooks/useWindowSize";
import { pointsListDefault, useSwapPoint } from "../../../../hooks/usePoint";
import { LngNs } from "../../../../utils/i18n";
import Icon from "../../../icons";
import {
  ChainId,
  CurrencyLogo as path,
  preStaticUrl,
} from "../../../../constant/constant";

import { usePointsBalanceStr } from "../../hooks/connectWalletHooks";
import {
  pointsDialogState,
  pointsWarnState,
} from "../../state/connectWalletState";
import DialogTitle from "../DialogComponents/DialogTitle";
import PoinsWarn from "./PoinsWarn";
import "./PointsDialog.stylus";
import { PointsIcon } from "../../../icons/PointsIcon/PointsIcon";
import Modal from "../../../../components/Modal/Modal";

export interface IPointsItem {
  index: number;
  pointAmount: string;
  pointAmountStr: string;
  price: string;
  priceStr: string;
  discount: string | undefined;
}
type IProps = {
  env: string;
  dispatch: any;
  setSuccessToast: any;
  setErrorToast: any;
};
const PointsDialog = memo(
  ({ env, dispatch, setSuccessToast, setErrorToast }: IProps) => {
    const { t } = useCustomTranslation([LngNs.points]);
    const [pointsDialogOpen, setPointsDialogOpen] =
      useRecoilState(pointsDialogState);
    const pointsWarn = useRecoilValue(pointsWarnState);
    const { chainId } = useActiveWeb3React();
    const pointsBalanceStr = usePointsBalanceStr();
    const isMobile = useIsMobile();
    const [pointsList, setPointsList] = useState<IPointsItem[]>([]);

    const { isLoading, swapPointHandle } = useSwapPoint({
      env,
      dispatch,
      setSuccessToast,
      setErrorToast,
    });
    useEffect(() => {
      if (chainId) {
        setTimeout(() => {
          const list = pointsListDefault(chainId);
          if (list) {
            setPointsList(list);
          }
        }, 800);
      }
    }, [chainId]);
    return (
      <Modal
        open={pointsDialogOpen}
        onCancel={() => setPointsDialogOpen(false)}
        footer={null}
        wrapClassName={classnames("customDialog", "bottom", "dialog")}
        width={isMobile ? "100%" : 604}
        // transitionName="ant-slide-up"
        destroyOnClose={true}
        closable={false}
        centered={isMobile ? false : true}
        transitionName={isMobile ? "ant-slide-down" : undefined}
      >
        <DialogTitle
          label={t("Recharge Points")}
          setDialogOpen={setPointsDialogOpen}
          classNames={"modalTitleInner"}
        >
          {/* <p
          className={"title"}
          onClick={() => {
            setPointsRuleModalOpen(true)
          }}
        >
          Join the zBingo Grand Opening Top-up Bonus Event (9/26 - 10/10)
          <Icon name="question" className={"question"} />
        </p> */}
        </DialogTitle>
        <div className={"modalMain"}>
          {pointsWarn === 1 ? (
            <PoinsWarn isLoading={isLoading} handleNext={swapPointHandle} />
          ) : isLoading ? (
            <IsLoading />
          ) : (
            <>
              <div className={"balanceTitle"}>
                <p>
                  {t("Balance")}: <strong>{pointsBalanceStr}</strong>
                </p>
                <PointsIcon isMobile={isMobile} classname={"pointsIcon"} />
              </div>
              <PointsTable
                pointsList={pointsList}
                chainId={chainId}
                onClick={swapPointHandle}
              />
            </>
          )}
        </div>
      </Modal>
    );
  },
  isEqual
);

const IsLoading = memo(() => {
  const { t } = useCustomTranslation([LngNs.points]);
  return (
    <div className={"loading"}>
      <Icon name="loading02" />
      <p>{t("IsLoadingText1")}</p>
    </div>
  );
}, isEqual);
type IPointsTableProps = {
  pointsList: IPointsItem[];
  chainId?: ChainId;
  onClick: any;
};
const PointsTable = memo(
  ({ pointsList, chainId, onClick }: IPointsTableProps) => {
    return (
      <div className={"table"}>
        {pointsList.map((v, index) => (
          <div
            className={classnames("points", `points_${v.index}`)}
            key={v.index}
            onClick={() => onClick(index)}
          >
            <h3>{v.pointAmountStr}</h3>
            <img
              className={"points_img"}
              src={preStaticUrl + `/img/points/points_${v.index}.png`}
              alt="points"
            />
            <div className={"bottom"}>
              <p>{v.priceStr}</p>
              <CurrencyLogo className={"img"} src={path[chainId || 97]} />
            </div>
            {v.discount && (
              <div className={"discount"}>
                <img
                  className={"discount_img"}
                  src={preStaticUrl + `/img/points/discord.svg`}
                  alt="points"
                />
                <p>
                  {v.discount}% <br />
                  OFF
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  },
  isEqual
);
export default PointsDialog;
