import React from "react";
import "./SideBar.stylus";
interface IProps {
    useNavigate: any;
    className?: string;
    pathname: string;
}
export declare const ZypherLogo: React.MemoExoticComponent<({ isMobile }: {
    isMobile: boolean;
}) => React.JSX.Element>;
declare const SideBar: React.FC<IProps>;
export default SideBar;
