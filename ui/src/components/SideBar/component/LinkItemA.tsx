import classnames from "classnames";
import { isEqual } from "../../../utils/lodash";
import React, { FC, memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { INavLink } from "../../../hooks/useNavItem";
import { useIsMobile } from "../../../hooks/useWindowSize";
import { preStaticUrl } from "../../../constant/constant";

import { defaultSelectedKey, siderCollapseState } from "../state";
interface IProps extends INavLink {
  className_disable: string;
  className: string;
  isMobile: boolean;
  className_on: string;
}
const useLink = (link: INavLink, isMobile: boolean) => {
  const selectedKey = useRecoilValue(defaultSelectedKey);
  const setDefaultSelectedKey = useSetRecoilState(defaultSelectedKey);
  const setSiderCollapse = useSetRecoilState(siderCollapseState);
  const isOn = useMemo(() => {
    if (selectedKey === link.keyValue) {
      return true;
    }
    return false;
  }, [selectedKey]);
  const linkClickHandle = useCallback(
    (event) => {
      if (link.disabled) {
        return;
      }
      event.preventDefault();
      setDefaultSelectedKey(link.keyValue);
      if (isMobile) {
        setSiderCollapse(true);
      }
      setTimeout(() => {
        window.location.href = "/#" + link.link;
      }, 200);
    },
    [isMobile]
  );
  return {
    isOn,
    linkClickHandle,
  };
};
const LinkItem1: FC<IProps> = memo(
  ({
    className,
    className_on,
    isMobile,
    className_disable,
    ...link
  }: IProps) => {
    const { isOn, linkClickHandle } = useLink(link, isMobile);
    return (
      <div
        onClick={linkClickHandle}
        className={classnames(
          className,
          link.disabled ? className_disable : "",
          isOn ? className_on : ""
        )}
      >
        <img src={preStaticUrl + `/img/layout/${link.icon}`} />
        <p>{link.label}</p>
      </div>
    );
  },
  isEqual
);

export default LinkItem1;
