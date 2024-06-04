import classnames from "classnames";
import React, { memo, useMemo } from "react";

import { INavLink, INavLinkType } from "../../hooks/useNavItem.type";
import { preStaticUrl } from "../../constant/constant";

import CommunityLink from "./component/CommunityLink";
import Language from "./component/Language";
import SideBarGamesList from "./component/SideBarGamesList";
import { SideBarTitle, SideBarTitleLink } from "./component/SideBarTitle";
import "./SideBar.stylus";
import { sideCollapseState } from "../Header/state";
import { useSetRecoilState } from "recoil";
import Icon from "../icons";
import { NavList } from "../Header/Navigation/Navigation";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { Games } from "../../constant/gamesList";

interface IProps {
  useNavigate: any;
  className?: string;
  pathname: string;
}
export const ZypherLogo = memo(({ isMobile }: { isMobile: boolean }) => {
  return (
    <a href={"/"} target="_black" className="zypher_logo">
      {isMobile ? (
        <img src={preStaticUrl + "/img/layout/logo-min.svg"} />
      ) : (
        <img src={preStaticUrl + "/img/tvl/logo.svg"} />
      )}
      <img src={preStaticUrl + "/img/layout/ai.svg"} />
    </a>
  );
});
const SideBar: React.FC<IProps> = (props: IProps) => {
  const { useNavigate, pathname } = props;
  // const items = useNavItem();
  const { chainId } = useActiveWeb3React();
  const setSideCollapse = useSetRecoilState(sideCollapseState);
  const {
    sideBarGamesLinkList,
  }: {
    sideBarGamesLinkList: INavLink[];
    // sideBarActivitiesLinkList: INavLink[];
  } = useMemo(() => {
    return {
      sideBarGamesLinkList: Games(chainId)
        .map((v) => v.dapps.map((vv) => vv))
        .flat()
        .map((v) => ({
          label: v.label,
          keyValue: v.label,
          icon: v.icon,
          disabled: false,
          type: INavLinkType.Games,
          link: v.link ?? v.twitter,
        })),
      // items.filter((v) => v.type === INavLinkType.Games),
      // sideBarActivitiesLinkList: items.filter((v) =>
      //   !isMobile
      //     ? v.type === INavLinkType.Activities && v.keyValue !== "1"
      //     : v.type === INavLinkType.Activities
      // ),
    };
  }, [chainId]);

  return (
    <div className={classnames(`${props.className}`, "sidebarWrap")}>
      <div className="side_close" onClick={() => setSideCollapse(true)}>
        <Icon name={"close"} />
      </div>
      <div className={"sidebar"}>
        {NavList.filter((v) => (window.isGames ? v.showIfGames : true)).map(
          (v) => (
            <SideBarTitleLink
              key={v.label}
              logo_title={v.label}
              className={`sideBarTitle sideBarTitleLink ${
                (v.linkList ?? []).includes(pathname) ? "on" : ""
              }`}
              link={v.link}
              logo_url_name={v.icon}
            />
          )
        )}
        <SideBarTitle
          logo_title="Games"
          logo_url_name="pixel_games"
          className={"sideBarTitle mt40"}
        />
        <SideBarGamesList
          className_on={"item_on"}
          className_list={"gamelist"}
          className_listItem={"verListItem"}
          className_listItemDisable={"verListItemDisable"}
          list={sideBarGamesLinkList}
          useNavigate={useNavigate}
          className_imageContainer={"imageContainerWaves"}
        />
        <Language type={"list"} />
      </div>
      <div className="sideBar_Bottom">
        <SideBarTitle
          logo_title="Links"
          logo_url_name="pixel_link02"
          className={"sideBarTitle"}
        />
        <CommunityLink className={"communityLink"} />
      </div>
    </div>
  );
};
export default SideBar;
