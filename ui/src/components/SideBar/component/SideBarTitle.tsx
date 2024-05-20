import { isEqual } from "../../../utils/lodash";
import React, { memo } from "react";

import { useCustomTranslation } from "../../../hooks/useCustomTranslation";
import { LngNs } from "../../../utils/i18n";
import { preStaticUrl } from "../../../constant/constant";
interface IProps {
  className: string;
  logo_url_name: string;
  logo_title: string;
}
const SideBarTitle = memo(
  ({ className, logo_url_name, logo_title }: IProps) => {
    const { t } = useCustomTranslation([LngNs.sideBar]);
    return (
      <div className={className}>
        <img
          src={preStaticUrl + `/img/layout/${logo_url_name}.svg`}
          title={t(logo_title)}
        />
        <p>{t(logo_title)}</p>
      </div>
    );
  },
  isEqual
);
export default SideBarTitle;
