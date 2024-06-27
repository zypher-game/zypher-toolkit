import { isEqual } from "../../../utils/lodash";
import React, { memo } from "react";

import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { preStaticUrl } from "../../../constant/constant";
import { LngNs } from "../../../utils/i18n";
interface IProps {
  link?: string;
  className: string;
  logo_title: string;
  logo_url_name?: string;
}

export const SideBarTitle = memo(
  ({ className, logo_url_name, logo_title }: IProps) => {
    const { t } = useCustomTranslation([LngNs.sideBar]);
    return (
      <div className={className}>
        <img
          decoding="async"
          loading="lazy"
          src={preStaticUrl + `/img/icon/${logo_url_name}.svg`}
          title={t(logo_title)}
        />
        <p>{t(logo_title)}</p>
      </div>
    );
  },
  isEqual
);
export const SideBarTitleLink = memo(
  ({ logo_url_name, link, className, logo_title }: IProps) => {
    const { t } = useCustomTranslation([LngNs.sideBar]);
    return (
      <a href={link} className={className}>
        <div className="side_title_line" />
        <p>{t(logo_title)}</p>
        {logo_url_name ? (
          <img
            decoding="async"
            loading="lazy"
            src={logo_url_name}
            title={t(logo_title)}
          />
        ) : null}
      </a>
    );
  },
  isEqual
);
