import { CloseOutlined } from "@ant-design/icons";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import React, { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useCustomTranslation } from "../../../../hooks/useCustomTranslation";
import { LngNs } from "./../..../../../../../utils/i18n";

import { pointsRuleDialogState } from "../../state/connectWalletState";
import "./PointsRuleDialog.module.stylus";

type Props = {
  onClose?: () => void;
};
const PointsRuleDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.common, LngNs.points]);
  const isModalOpen = useRecoilValue(pointsRuleDialogState);
  const setIsModalOpen = useSetRecoilState(pointsRuleDialogState);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  return (
    <>
      <DialogOverlay
        isOpen={isModalOpen}
        onDismiss={handleCancel}
        className={"points_dialog_zindex"}
      >
        <DialogContent className={"points_dialog_dialogContent"}>
          <div className={"points_dialog_dialogHeader"}>
            <h3>{t("Rules")}</h3>
            <div className={"points_dialog_cursor"} onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={"points_dialog_dialogContainer"}>
            <h4>{t("PointsRuleText01")}</h4>
            <p>{t("PointsRuleText02")}</p>
            <p>
              <em />
              <i>{t("PointsRuleText03")}</i>
              <br />
              <em />
              <i>{t("PointsRuleText04")}</i>
              <br />
              <em />
              <i>{t("PointsRuleText04")}</i>
              <br />
              <em /> <i>{t("PointsRuleText06")}</i>
            </p>
            <p>
              {t("PointsRuleText07", {
                Link: (
                  <a
                    href="https://medium.com/@ZypherGames/upcoming-announcement-44e69204adb1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("PointsRuleText08")}
                  </a>
                ),
              })}
            </p>
            <h4>{t("PointsRuleText09")}</h4>
            <p>
              {
                (t("PointsRuleText10"),
                {
                  Discord: (
                    <a
                      href="https://discord.com/invite/MKJZhS4p2T"
                      target="_blank"
                      className={"points_dialog_fontWhite"}
                      rel="noreferrer"
                    >
                      Discord
                    </a>
                  ),
                })
              }
            </p>
          </div>
          <div className={"points_dialog_btnWrap"}>
            <button className={"points_dialog_btn"} onClick={handleCancel}>
              {t("Ok")}
            </button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  );
};
export default PointsRuleDialog;
