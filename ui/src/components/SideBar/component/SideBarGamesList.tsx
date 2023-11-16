import { isEqual } from "../../../utils/lodash";
import React, { FC, memo } from "react";

import { INavLink } from "../../../hooks/useNavItem";

import LinkItem from "./LinkItemA";
type IProps = {
  className_on: string;
  className_list: string;
  className_listItemDisable: string;
  className_listItem: string;
  list: INavLink[];
  useNavigate: any;
  isMobile: boolean;
};
const SideBarGamesList: FC<IProps> = memo(
  ({
    className_on,
    className_list,
    className_listItemDisable,
    className_listItem,
    useNavigate,
    list,
    isMobile,
  }: IProps) => {
    return (
      <div className={className_list}>
        {list.map((v) => (
          <LinkItem
            useNavigate={useNavigate}
            isMobile={isMobile}
            className_on={className_on}
            className_disable={className_listItemDisable}
            key={v.keyValue}
            className={className_listItem}
            {...v}
          />
        ))}
      </div>
    );
  },
  isEqual
);
export default SideBarGamesList;
