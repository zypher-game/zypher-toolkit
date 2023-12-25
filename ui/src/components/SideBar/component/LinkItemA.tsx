import classnames from "classnames";
import { isEqual } from "../../../utils/lodash";
import React, { FC, memo, useCallback, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { INavLink } from "../../../hooks/useNavItem";
import { preStaticUrl } from "../../../constant/constant";

import { defaultSelectedKey } from "../state";
import { siderCollapseState } from "../../Header/state";
interface IProps extends INavLink {
  className_disable: string;
  className: string;
  isMobile: boolean;
  className_on: string;
  className_imageContainer?: string;
  useNavigate: any;
}
const useLink = (link: INavLink, isMobile: boolean, useNavigate: any) => {
  const selectedKey = useRecoilValue(defaultSelectedKey);
  const setDefaultSelectedKey = useSetRecoilState(defaultSelectedKey);
  const setSiderCollapse = useSetRecoilState(siderCollapseState);
  const navigate = useNavigate();
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
      if (isMobile) {
        setSiderCollapse(true);
      }
      setTimeout(() => {
        try {
          if (link.link.indexOf("http") > -1) {
            window.open(link.link, "_blank");
          } else {
            setDefaultSelectedKey(link.keyValue);
            navigate(link.link);
          }
        } catch (e) {
          window.location.href = "/#" + link.link;
        }
      }, 200);
    },
    [navigate, isMobile]
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
    className_imageContainer,
    useNavigate,
    ...link
  }: IProps) => {
    const { isOn, linkClickHandle } = useLink(link, isMobile, useNavigate);
    return (
      <div
        onClick={linkClickHandle}
        className={classnames(
          className,
          link.disabled ? className_disable : "",
          isOn ? className_on : ""
        )}
      >
        <div className={className_imageContainer}>
          <img src={preStaticUrl + `/img/layout/${link.icon}`} />
        </div>
        <p>{link.label}</p>
      </div>
    );
  },
  isEqual
);

export default LinkItem1;
