import { FC } from "react";
import { INavLink } from "../../../hooks/useNavItem";
interface IProps extends INavLink {
    className_disable: string;
    className: string;
    isMobile: boolean;
    className_on: string;
    useNavigate: any;
}
declare const LinkItem1: FC<IProps>;
export default LinkItem1;