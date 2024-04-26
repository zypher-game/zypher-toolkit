export enum INavLinkType {
  "Games" = "Games",
  "Activities" = "Activities",
  "Language" = "Language",
  "Links" = "Links",
}
export type INavLink = {
  label: string;
  keyValue: string;
  icon: string;
  disabled: boolean;
  type: INavLinkType;
  link?: string;
  btn_label?: string;
  content?: (className: string) => React.ReactNode;
  onClick?: any;
  btn_background_color?: string;
};
