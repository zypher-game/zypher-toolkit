import { FC } from "react";
import { INavLink } from "../../../hooks/useNavItem";
type IProps = {
    className_on: string;
    className_list: string;
    className_listItemDisable: string;
    className_listItem: string;
    className_imageContainer: string;
    list: INavLink[];
    useNavigate: any;
    isMobile: boolean;
};
declare const SideBarGamesList: FC<IProps>;
export default SideBarGamesList;
