import classnames from "classnames";
import cx from "classnames";
import React, { memo, useMemo } from "react";

import {
  INavLink,
  INavLinkType,
  useNavItem,
  usePathname,
} from "../../hooks/useNavItem";
import { preStaticUrl } from "../../constant/constant";

import CommunityLink from "./component/CommunityLink";
import Language from "./component/Language";
import LinkItem from "./component/LinkItemA";
import SideBarActivitiesList from "./component/SideBarActivitiesList";
import SideBarGamesList from "./component/SideBarGamesList";
import SideBarTitle from "./component/SideBarTitle";
import "./sidebar.module.stylus";

interface IProps {
  isMobile: boolean;
  className?: string;
}
export const MobileLogo = memo(({ isMobile }: IProps) => {
  return (
    <div>
      <img src={preStaticUrl + "/img/layout/logo-min.svg"} />
      <img src={preStaticUrl + "/img/layout/ai.svg"} />
    </div>
  );
});
const SideBar: React.FC<IProps> = (props: IProps) => {
  const { isMobile } = props;
  const items = useNavItem();
  usePathname();
  const {
    sideBarGamesLinkList,
    sideBarActivitiesLinkList,
  }: {
    sideBarGamesLinkList: INavLink[];
    sideBarActivitiesLinkList: INavLink[];
  } = useMemo(() => {
    return {
      sideBarGamesLinkList: items.filter((v) => v.type === INavLinkType.Games),
      sideBarActivitiesLinkList: items.filter((v) =>
        !isMobile
          ? v.type === INavLinkType.Activities && v.keyValue !== "1"
          : v.type === INavLinkType.Activities
      ),
    };
  }, [items, isMobile]);

  return (
    <div className={classnames(`${props.className}`, "sidebarWrap")}>
      {isMobile ? null : (
        <a href={"https://zypher.game/"} target="_black" className={cx("logo")}>
          <img src={preStaticUrl + "/img/layout/logo.svg"} />
          <img src={preStaticUrl + "/img/layout/ai.svg"} />
        </a>
      )}
      <div className={"sidebar"}>
        {isMobile ? null : (
          <>
            <LinkItem
              className_on={"item_on"}
              className_disable={"horListItmeDisable"}
              className={"horListItme"}
              isMobile={isMobile}
              {...items[0]}
            />
            <div className={"line"} />
          </>
        )}
        <SideBarTitle
          logo_title="Games"
          logo_url_name="games"
          className={"sideBarTitle"}
        />
        <SideBarGamesList
          className_on={"item_on"}
          className_list={"gamelist"}
          className_listItem={"verListItme"}
          className_listItemDisable={"verListItmeDisable"}
          list={sideBarGamesLinkList}
          isMobile={isMobile}
        />
        <div className={"line"} />
        <SideBarTitle
          logo_title="Activities"
          logo_url_name="activities"
          className={"sideBarTitle"}
        />
        <SideBarActivitiesList
          isMobile={isMobile}
          className_on={"item_on"}
          className_list={"activitiesList"}
          className_listItemHorDisable={"horListItmeDisable"}
          className_listItemHor={"horListItme"}
          className_listItemVerDisable={"verListItmeDisable"}
          className_listItemVer={"verListItme"}
          list={sideBarActivitiesLinkList}
        />
        <div className={"line"} />
        <SideBarTitle
          logo_title="Language"
          logo_url_name="language"
          className={"sideBarTitle"}
        />
        <Language
          className={"language"}
          className_item={classnames("horListItme", "languageItme")}
          className_itemtip={"languageItmeTip"}
          className_on={"languageItmeOn"}
        />
        <div className={"line"} />
        <SideBarTitle
          logo_title="Links"
          logo_url_name="links"
          className={"sideBarTitle"}
        />
        <CommunityLink className={"communityLink"} />
      </div>
    </div>
  );
};
export default SideBar;
