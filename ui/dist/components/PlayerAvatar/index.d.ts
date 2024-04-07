import React from "react";
import "./index.stylus";
import { HeaderUIType } from "../Header/header";
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
    type?: HeaderUIType;
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
