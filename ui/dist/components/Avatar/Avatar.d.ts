import React from "react";
import { HeaderUIType } from "../Header/header";
interface AvatarProps {
    src: string;
    altText?: string;
    size?: number;
    style?: any;
    type?: HeaderUIType;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
