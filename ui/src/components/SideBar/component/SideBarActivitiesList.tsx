import { isEqual } from "../../../utils/lodash";
import React, { FC, memo, useMemo } from "react";

import { INavLink } from "../../../hooks/useNavItem";

import LinkItem from "./LinkItemA";
type IProps = {
  className_on: string;
  className_list: string;
  className_listItemHorDisable: string;
  className_listItemHor: string;
  className_listItemVerDisable: string;
  className_listItemVer: string;
  isMobile: boolean;
  list: INavLink[];
};
const SideBarActivitiesList: FC<IProps> = memo(
  ({
    className_on,
    className_list,
    className_listItemHorDisable,
    className_listItemHor,
    className_listItemVerDisable,
    className_listItemVer,
    list,
    isMobile,
  }: IProps) => {
    const { listItemDisable, listItem } = useMemo(() => {
      if (isMobile) {
        return {
          listItemDisable: className_listItemVerDisable,
          listItem: className_listItemVer,
        };
      }
      return {
        listItemDisable: className_listItemHorDisable,
        listItem: className_listItemHor,
      };
    }, [isMobile]);
    return (
      <div className={className_list}>
        {list.map((v) => (
          <LinkItem
            className_on={className_on}
            className_disable={listItemDisable}
            isMobile={isMobile}
            key={v.keyValue}
            className={listItem}
            {...v}
          />
        ))}
      </div>
    );
  },
  isEqual
);
export default SideBarActivitiesList;
