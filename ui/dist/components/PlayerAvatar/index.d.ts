import React from "react";
import "./index.stylus";
export interface IPlayerAvatar {
    hidePixel?: boolean;
    className?: string;
    account?: string;
    highLight?: boolean;
    hideAvatars?: boolean;
    showAccount?: boolean;
    size?: number;
    winner?: boolean;
    border?: boolean;
    AvatarBorder?: any;
    AccountTextFrComp?: any;
    preLen?: number;
    endLen?: number;
    otherStr?: string;
    onClick?: any;
    onMouseOver?: any;
}
declare const PlayerAvatar: React.FC<IPlayerAvatar>;
type IAvatar = {
    account: string | undefined;
    size?: "large" | "small" | undefined | number;
    isGreen?: boolean;
    isGrey?: boolean;
    winner?: boolean;
};
export declare const PlayerAvatarList: React.FC<IAvatar>;
export default PlayerAvatar;
