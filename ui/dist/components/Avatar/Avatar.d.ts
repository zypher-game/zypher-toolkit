import React from "react";
import { UIType } from "../Header/header";
interface AvatarProps {
    src: string;
    altText?: string;
    size?: number;
    style?: any;
    type?: UIType;
    backgroundColor?: string;
    hidePixel?: boolean;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
