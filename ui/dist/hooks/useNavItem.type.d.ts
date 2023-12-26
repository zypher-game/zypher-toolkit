export declare enum INavLinkType {
    "Games" = "Games",
    "Activities" = "Activities",
    "Language" = "Language",
    "Links" = "Links"
}
export type INavLink = {
    label: string;
    keyValue: string;
    icon: string;
    link: string;
    disabled: boolean;
    type: INavLinkType;
};
