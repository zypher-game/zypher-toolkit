import React from "react";
import "./sidebar.module.stylus";
interface IProps {
    isMobile: boolean;
    className?: string;
}
export declare const MobileLogo: React.MemoExoticComponent<({ isMobile }: IProps) => React.JSX.Element>;
declare const SideBar: React.FC<IProps>;
export default SideBar;
