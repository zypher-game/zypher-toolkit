import React from "react";
import "./sidebar.stylus";
interface IProps {
    isMobile: boolean;
    useNavigate: any;
    className?: string;
}
export declare const MobileLogo: React.MemoExoticComponent<() => React.JSX.Element>;
declare const SideBar: React.FC<IProps>;
export default SideBar;
