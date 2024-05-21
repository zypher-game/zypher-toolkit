import classnames from "classnames";
import { isEqual } from "../../../utils/lodash";
import React, { FC, memo, useCallback, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { INavLink } from "../../../hooks/useNavItem.type";
import { preStaticUrl } from "../../../constant/constant";

import { sideCollapseState } from "../../Header/state";
import SmokeIndex from "./SmokeIndex";
interface IProps extends INavLink {
  className_disable: string;
  className: string;
  isMobile: boolean;
  className_on: string;
  className_imageContainer?: string;
  useNavigate: any;
}
const useLink = (link: INavLink, isMobile: boolean, useNavigate: any) => {
  const setSideCollapse = useSetRecoilState(sideCollapseState);
  const navigate = useNavigate();
  const linkClickHandle = useCallback(
    (event) => {
      if (link.disabled) {
        return;
      }
      event.preventDefault();
      if (isMobile) {
        setSideCollapse(true);
      }
      setTimeout(() => {
        try {
          if (link.link && link.link.indexOf("http") > -1) {
            window.open(link.link, "_blank");
          } else {
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
    const { linkClickHandle } = useLink(link, isMobile, useNavigate);
    return (
      <div
        onClick={linkClickHandle}
        className={classnames(
          className,
          link.disabled ? className_disable : ""
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
