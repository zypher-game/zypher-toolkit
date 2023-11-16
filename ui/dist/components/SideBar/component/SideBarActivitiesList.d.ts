import { FC } from "react";
import { INavLink } from "../../../hooks/useNavItem";
type IProps = {
    className_on: string;
    className_list: string;
    className_listItemHorDisable: string;
    className_listItemHor: string;
    className_listItemVerDisable: string;
    className_listItemVer: string;
    isMobile: boolean;
    useNavigate: any;
    list: INavLink[];
};
declare const SideBarActivitiesList: FC<IProps>;
export default SideBarActivitiesList;
