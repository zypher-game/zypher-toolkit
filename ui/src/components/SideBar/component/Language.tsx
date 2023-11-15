import { changeLanguage } from "i18next";
import { isEqual } from "../../../utils/lodash";
import React, { memo, useCallback, useState } from "react";
import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";
import storage from "../../../utils/storage";
import { preStaticUrl } from "../../../constant/constant";

type IProps = {
  className: string;
  className_item: string;
  className_itemtip: string;
  className_on: string;
};
export const languageList = [
  {
    label: "English",
    keyValue: "en_US",
  },
  {
    label: "中文繁體",
    keyValue: "zh_TW",
  },
];
const Language = memo(
  ({ className, className_item, className_itemtip, className_on }: IProps) => {
    const [show, setShow] = useState(false);
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
