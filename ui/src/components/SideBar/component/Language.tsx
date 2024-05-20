import { changeLanguage } from "i18next";
import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback, useState } from "react";
import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";
import storage from "../../../utils/storage";
import { preStaticUrl } from "../../../constant/constant";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import classnames from "classnames";
import "./Language.stylus";
import PixelFlatBtn from "../../PixelBtn/PixelFlatBtn";
import {
  PixelBorderCard,
  PixelBorderCardButton,
  PixelCube2,
} from "../../PixelBtn/ActivePixelButton";
import SvgComponent from "../../SvgComponent/SvgComponent";
import IsPixelWidget from "../../Header/rainbow_account/IsPixelWidget";
type IProps = {
  type: "side" | "top" | "pixel";
};
export const languageList = [
  {
    label: "English",
    keyValue: "en_US",
    img: preStaticUrl + "/img/layout/en_US.png",
  },
  {
    label: "한국어",
    keyValue: "ko_KR",
    img: preStaticUrl + "/img/layout/ko_KR.png",
  },
  {
    label: "中文繁體",
    keyValue: "zh_TW",
    img: preStaticUrl + "/img/layout/zh_TW.png",
  },
];
const Language = memo(({ type }: IProps) => {
  const [show, setShow] = useState(false);
  const lang = useCurrentLanguage();
  const { t } = useCustomTranslation([LngNs.common]);
  const handle = useCallback(() => {
    setShow(!show);
  }, [show]);
  const changeLanguageHandle = useCallback((item) => {
    changeLanguage(item.keyValue);
    setShow(false);
    storage.set("language", item.keyValue);
  }, []);
  return (
    <div
      className={classnames(
        type === "pixel"
          ? "language_pixel"
          : type === "top"
          ? "language_top"
          : "",
        "language"
      )}
    >
      <div
        className={classnames("horListItem", "languageItem")}
        onClick={handle}
      >
        {type === "top" ? (
          <>
            <img
              src={
                preStaticUrl +
                `/img/layout/${show ? "arrow-up" : "arrow-down"}.svg`
              }
              className="img_arr"
            />
            <img
              src={preStaticUrl + `/img/layout/${lang}.png`}
              className="img_lang"
            />
          </>
        ) : type === "pixel" ? (
          <IsPixelWidget className="pixel_logo" type={type}>
            <img
              src={preStaticUrl + `/img/layout/${lang}.png`}
              className="pixel_img_lang"
            />
          </IsPixelWidget>
        ) : (
          <>
            <p>{t("language")}</p>
            <img
              src={
                preStaticUrl +
                `/img/layout/${show ? "arrow-up" : "arrow-down"}.svg`
              }
            />
          </>
        )}
      </div>
      {show ? (
        <PixelBorderCard
          className="address_wrap_pop_lang"
          // className="languageItemTip"
          pixel_height={4}
          backgroundColor="#1D263B"
          borderColor="#3A4254"
        >
          {languageList.map((v) => (
            <PopItem
              key={v.label}
              onClick={() => changeLanguageHandle(v)}
              iconName={v.img}
              label={v.label}
              on={v.keyValue === lang}
            />
          ))}
        </PixelBorderCard>
      ) : null}
    </div>
  );
}, isEqual);
const PopItem = memo(
  ({
    iconName,
    label,
    onClick,
    on,
  }: {
    iconName: string;
    label: string;
    onClick: any;
    on: boolean;
  }) => {
    return (
      <PixelCube2
        className={`address_wrap_pop_item ${on ? "on" : ""}`}
        onClick={onClick}
        pixel_height={3}
        backgroundColor="#1D263B"
        borderColor="#1D263B"
        width="100%"
        height="36px"
      >
        <SvgComponent src={iconName} />
        <p>{label}</p>
      </PixelCube2>
    );
  }
);
export default Language;
