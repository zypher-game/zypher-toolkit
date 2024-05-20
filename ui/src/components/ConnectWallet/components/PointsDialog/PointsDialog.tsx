import classnames from "classnames";
import { isEqual } from "../../../../utils/lodash";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import CurrencyLogo from "../../../CurrencyLogo";
import { useActiveWeb3React } from "../../../../hooks/useActiveWeb3React";
import { useCustomTranslation } from "../../../../hooks/useCustomTranslation";
import { useIsW768 } from "../../../../hooks/useWindowSize";
import { pointsListDefault, useSwapPoint } from "../../../../hooks/usePoint";
import { LngNs } from "../../../../utils/i18n";
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
import PointsWarn from "./PointsWarn";
import "./PointsDialog.stylus";
import { PointsIcon } from "../../../icons/PointsIcon/PointsIcon";
import Modal from "../../../../components/Modal/Modal";
import { IPointsItem } from "./PointsDialog.type";
import { PixelTable } from "../../../PixelTable/PixelTable";
import {
  ActivePixelCard,
  PixelBorderCardButton,
} from "../../../PixelBtn/ActivePixelButton";
import LoadingButton from "../../../LoadingSvg/LoadingButton";
import DialogClose from "../../../DialogClose/DialogClose";

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
    const isMobile = useIsW768();
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
    const handleCancel = useCallback(() => {
      setPointsDialogOpen(false);
    }, []);
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
        <PixelTable
          classNameHeader="modalTitleInner"
          backgroundColor="#1D263B"
          header_children={
            <p className="modalTitleInnerTitle">{t("Recharge Points")}</p>
          }
          body_children={
            <>
              <div className={"modalMain"}>
                {pointsWarn === 1 ? (
                  <PointsWarn
                    isLoading={isLoading}
                    handleNext={swapPointHandle}
                  />
                ) : isLoading ? (
                  <IsLoading />
                ) : (
                  <>
                    <div className={"balanceTitle"}>
                      <p>
                        {t("Balance")}: <strong>{pointsBalanceStr}</strong>
                      </p>
                      <PointsIcon
                        isMobile={isMobile}
                        classname={"pointsIcon"}
                      />
                    </div>
                    <PointsTable
                      pointsList={pointsList}
                      chainId={chainId}
                      onClick={swapPointHandle}
                    />
                  </>
                )}
              </div>
            </>
          }
          pixel_height={10}
        />
        <DialogClose onClick={handleCancel} />
      </Modal>
    );
  },
  isEqual
);

const IsLoading = memo(() => {
  const { t } = useCustomTranslation([LngNs.points]);
  return (
    <div className={"loading"}>
      <LoadingButton isLoading={true} className="loading_size4" />
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
          <PixelBorderCardButton
            pixel_height={4}
            backgroundColor="#343C4F"
            borderColor="#484F60"
            key={v.index}
            onClick={() => onClick(index)}
          >
            <div className={classnames("points", `points_${v.index}`)}>
              <h3>{v.pointAmountStr}</h3>
              <img
                className={"points_img"}
                src={preStaticUrl + `/img/points/points_${v.index}.png`}
                alt="points"
              />
              <ActivePixelCard
                backgroundColor="#1649FF"
                className={"bottom"}
                pixel_height={4}
              >
                <p>{v.priceStr}</p>
                <CurrencyLogo className={"img"} src={path[chainId || 97]} />
              </ActivePixelCard>
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
          </PixelBorderCardButton>
        ))}
      </div>
    );
  },
  isEqual
);
export default PointsDialog;
