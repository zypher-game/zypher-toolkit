import { DialogContent, DialogOverlay } from "@reach/dialog";
import React, { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useCustomTranslation } from "../../../../hooks/useCustomTranslation";
import { LngNs } from "./../..../../../../../utils/i18n";

import { pointsRuleDialogState } from "../../state/connectWalletState";
import "./PointsRuleDialog.stylus";
import { Trans } from "react-i18next";
import DialogClose from "../../../DialogClose/DialogClose";
import { PixelTable } from "../../../PixelTable/PixelTable";
import { ActivePixelButtonColor } from "../../../PixelBtn/ActivePixelButton";

type Props = {
  onClose?: () => void;
};
const PointsRuleDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.points]);
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
          <PixelTable
            backgroundColor="#1D263B"
            header_children={
              <p className="modalTitleInnerTitle">{t("Rules")}</p>
            }
            body_children={
              <>
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
                    <Trans
                      i18nKey="PointsRuleText07"
                      defaults={t("PointsRuleText07")}
                      values={{ Link: t("Link") }}
                      components={{ bold: <strong /> }}
                    />
                  </p>
                  <h4>{t("PointsRuleText09")}</h4>
                  <p>
                    <Trans
                      i18nKey="PointsRuleText10"
                      defaults={t("PointsRuleText10")}
                    >
                      <a
                        href="https://discord.com/invite/MKJZhS4p2T"
                        target="_blank"
                        className={"points_dialog_fontWhite"}
                        rel="noreferrer"
                      >
                        Discord
                      </a>
                    </Trans>
                  </p>
                </div>
                <div className={"points_dialog_btnWrap"}>
                  <ActivePixelButtonColor
                    themeType="brightBlue"
                    onClick={handleCancel}
                    width="340px"
                    height="52px"
                    pixel_height={4}
                  >
                    {t("Ok")}
                  </ActivePixelButtonColor>
                </div>
              </>
            }
            pixel_height={10}
          />
          <DialogClose onClick={handleCancel} />
        </DialogContent>
      </DialogOverlay>
    </>
  );
};
export default PointsRuleDialog;
