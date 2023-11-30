import { changeLanguage } from "i18next";
import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback, useState } from "react";
import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";
import storage from "../../../utils/storage";
import { preStaticUrl } from "../../../constant/constant";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import classnames from "classnames";

type IProps = {
  className: string;
  className_top?: string;
  className_item: string;
  className_itemtip: string;
  className_on: string;
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
const Language = memo(
  ({
    className_top,
    className,
    className_item,
    className_itemtip,
    className_on,
    type,
  }: IProps) => {
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
    if (type === "top") {
      return (
        <div className={classnames(className_top, className)}>
          <div className={className_item} onClick={handle}>
            <img
              src={
                preStaticUrl +
                `/img/layout/${show ? "arrow-up" : "arrow-down"}.svg`
              }
            />
            <img src={preStaticUrl + `/img/layout/${lang}.png`} />
          </div>
          {show ? (
            <ul className={className_itemtip}>
              {languageList.map((v) => (
                <li
                  key={v.label}
                  className={className_on}
                  onClick={() => changeLanguageHandle(v)}
                >
                  {v.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    }
    return (
      <div className={className}>
        <div className={className_item} onClick={handle}>
          <p>{t("language")}</p>
          <img
            src={
              preStaticUrl +
              `/img/layout/${show ? "arrow-up" : "arrow-down"}.svg`
            }
          />
        </div>
        {show ? (
          <ul className={className_itemtip}>
            {languageList.map((v) => (
              <li
                key={v.label}
                className={className_on}
                onClick={() => changeLanguageHandle(v)}
              >
                {v.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  },
  isEqual
);
export default Language;
