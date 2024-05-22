import React from "react";
import "./Navigation.stylus";
export declare const NavKey: string[][];
export declare const NavList: ({
    link: string;
    label: string;
    linkList: string[];
    classNames: string;
    isTarget: boolean;
    icon?: undefined;
} | {
    link: string;
    label: string;
    icon: string;
    classNames: string;
    isTarget: boolean;
    linkList?: undefined;
})[];
declare const Navigation: React.FC<{
    pathname: string;
}>;
export default Navigation;
