import { isEqual } from "../../../utils/lodash";
import React, { FC, memo } from "react";

import { INavLink } from "../../../hooks/useNavItem.type";

import LinkItem from "./LinkItemA";
type IProps = {
  className_on: string;
  className_list: string;
  className_listItemDisable: string;
  className_listItem: string;
  className_imageContainer: string;
  list: INavLink[];
  useNavigate: any;
};
const SideBarGamesList: FC<IProps> = memo(
  ({
    className_on,
    className_list,
    className_listItemDisable,
    className_listItem,
    className_imageContainer,
    useNavigate,
    list,
  }: IProps) => {
    return (
      <div className={className_list}>
        {list.map((v) => (
          <LinkItem
            useNavigate={useNavigate}
            isMobile={true}
            className_on={className_on}
            className_disable={className_listItemDisable}
            key={v.keyValue}
            className={className_listItem}
            className_imageContainer={className_imageContainer}
            {...v}
          />
        ))}
      </div>
    );
  },
  isEqual
);
export default SideBarGamesList;
