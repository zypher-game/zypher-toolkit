import { isEqual } from "../../../../utils/lodash";
import React, { memo } from "react";
import { useRecoilState } from "recoil";

import { useCustomTranslation } from "../../../../hooks/useCustomTranslation";
import { LngNs } from "../../../../utils/i18n";
import Icon from "../../../../components/icons";

import { hidePointsWarnState } from "../../state/connectWalletState";
import "./PointsRuleDialog.module.stylus";

type IProps = {
  isLoading: boolean;
  handleNext: any;
};
const PoinsWarn = memo(({ handleNext }: IProps) => {
  const { t } = useCustomTranslation([LngNs.points]);
  const [hidePointsWarn, setHidePointsWarn] =
    useRecoilState(hidePointsWarnState);
  return (
    <div className={"points_dialog_dialogContainer"}>
      <p>{t("poinsWarnText01")}</p>
      <p>
        <em />
        <i>{t("poinsWarnText02")}</i>
        <br />
        <em />
        <i>{t("poinsWarnText03")}</i>
      </p>
      <p>{t("poinsWarnText04")}</p>
      <p
        className={"points_dialog_flex"}
        onClick={() => setHidePointsWarn(!hidePointsWarn)}
      >
        <Icon name={hidePointsWarn ? "checked" : "check"} />
        {t("poinsWarnText05")}
      </p>
      <button className={"points_dialog_btn"} onClick={handleNext}>
        {t("Ok")}
      </button>
    </div>
  );
}, isEqual);
export default PoinsWarn;
