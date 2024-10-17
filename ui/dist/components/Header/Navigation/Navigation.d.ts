import React from "react";
import "./Navigation.stylus";
export declare const NavKey: string[][];
type INavList = {
    link: string;
    linkList: string[];
    label: string;
    classNames: string;
    isTarget: boolean;
    showIfGames?: boolean;
    showArk: boolean;
    isLink: boolean;
    icon?: string;
};
export declare const NavList: INavList[];
declare const Navigation: React.MemoExoticComponent<({ pathname, Link }: {
    pathname: string;
    Link: any;
}) => React.JSX.Element>;
export default Navigation;
