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
import { PixelBorderCard, PixelCube2 } from "../../PixelBtn/ActivePixelButton";
import SvgComponent from "../../SvgComponent/SvgComponent";
import IsPixelWidget from "../../Header/rainbow_account/IsPixelWidget";
import Icon from "../../icons";
import { useIsW768 } from "../../../hooks/useWindowSize";
type IProps = {
  type: "top" | "pixel" | "list";
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
  const isW768 = useIsW768();
  const lang = useCurrentLanguage();
  const { t } = useCustomTranslation([LngNs.common]);
  const changeLanguageHandle = useCallback((item) => {
    changeLanguage(item.keyValue);
    storage.set("language", item.keyValue);
  }, []);
  return (
    <div
      className={classnames(
        type === "pixel"
          ? "language_pixel"
          : type === "top"
          ? "language_top"
          : type === "list"
          ? "language_list"
          : "",
        "language"
      )}
    >
      <div
        className={
          type === "list"
            ? ""
            : classnames(
                "horListItem",
                "languageItem",
                type === "pixel" ? "languagePixelTop" : ""
              )
        }
        // onClick={handle}
      >
        {type === "pixel" ? (
          <div className="pixel_logo_wrap">
            <IsPixelWidget className="pixel_logo">
              <img
                decoding="async"
                loading="lazy"
                src={preStaticUrl + `/img/layout/${lang}.png`}
                className="pixel_img_lang"
              />
            </IsPixelWidget>
            <div className="address_wrap_pop_lang_wrap">
              <PixelBorderCard
                className="address_wrap_pop_lang"
                // className="languageItemTip"
                pixel_height={4}
                backgroundColor="#1D263B"
                borderColor="#3A4254"
              >
                {languageList.map((v) => (
                  <PopItem
                    color="#1D263B"
                    classNames="address_wrap_pop_item"
                    key={v.label}
                    onClick={() => changeLanguageHandle(v)}
                    iconName={v.img}
                    label={v.label}
                    on={v.keyValue === lang}
                  />
                ))}
              </PixelBorderCard>
            </div>
          </div>
        ) : (
          <div className="lang">
            <p className="lang_title">
              <Icon name={"language"} />
              {isW768 ? "Language" : t("language")}
            </p>
            <div className="lang_list">
              {languageList.map((v) => (
                <PopItem
                  color="transparent"
                  onColor="#3A4254"
                  classNames="address_list_item"
                  key={v.label}
                  onClick={() => changeLanguageHandle(v)}
                  iconName={v.img}
                  label={v.label}
                  on={v.keyValue === lang}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}, isEqual);
const PopItem = memo(
  ({
    iconName,
    label,
    onClick,
    on,
    classNames,
    color,
    onColor,
  }: {
    iconName: string;
    label: string;
    onClick: any;
    on: boolean;
    classNames: string;
    color: string;
    onColor?: string;
  }) => {
    return (
      <PixelCube2
        className={`${classNames} ${on ? "on" : ""}`}
        onClick={onClick}
        pixel_height={3}
        backgroundColor={on && onColor ? onColor : color}
        borderColor={on && onColor ? onColor : color}
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
