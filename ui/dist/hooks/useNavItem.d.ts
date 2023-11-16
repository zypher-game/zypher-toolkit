export declare enum INavLinkType {
    "Games" = "Games",
    "Activities" = "Activities",
    "Language" = "Language",
    "Links" = "Links"
}
export declare const LinkList: string[];
export declare const blankLinkList: boolean[];
export type INavLink = {
    label: string;
    keyValue: string;
    icon: string;
    link: string;
    disabled: boolean;
    type: INavLinkType;
};
export declare const usePathname: () => void;
export declare const useNavItem: () => INavLink[];
