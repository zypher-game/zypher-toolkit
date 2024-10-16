import React from "react";
import "./SideBar.stylus";
interface IProps {
    useNavigate: any;
    className?: string;
    pathname: string;
    Link?: any;
}
export declare const ZypherLogo: React.MemoExoticComponent<({ Link, isMobile }: {
    Link?: any;
    isMobile: boolean;
}) => React.JSX.Element>;
declare const SideBar: React.FC<IProps>;
export default SideBar;
