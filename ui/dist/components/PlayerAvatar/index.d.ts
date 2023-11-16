import React from "react";
import "./index.module.stylus";
interface IPlayerAvatar {
    className?: string;
    account?: string;
    highLight?: boolean;
    showAccount?: boolean;
    size?: number;
    winner?: boolean;
    border?: boolean;
    AvatarBorder?: any;
    AccountTextFrComp?: any;
    preLen?: number;
    endLen?: number;
    otherStr?: string;
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
