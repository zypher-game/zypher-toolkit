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
type IProps = {
  type: "side" | "top";
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
      className={classnames(type === "top" ? "language_top" : "", "language")}
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
            />
            <img
              src={preStaticUrl + `/img/layout/${lang}.png`}
              className="img_lang"
            />
          </>
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
        <ul className="languageItemTip">
          {languageList.map((v) => (
            <li
              key={v.label}
              className="languageItemOn"
              onClick={() => changeLanguageHandle(v)}
            >
              {v.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}, isEqual);
export default Language;
