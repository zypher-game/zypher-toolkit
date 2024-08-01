import React from "react";
import IsPixelWidget from "../Header/rainbow_account/IsPixelWidget";
import styled from "styled-components";
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
const IsPixelWidgetStyled = styled(IsPixelWidget)<{
  size: number;
  style: any;
}>`
  width: ${({ size }) => size}px !important;
  height: ${({ size }) => size}px !important;
  border-radius: ${({ hidePixel }) => (!hidePixel ? "0" : "50%")};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  &.pixel_flat_btn {
    img {
      width: 75%;
      height: 75%;
    }
  }
`;
const Avatar: React.FC<AvatarProps> = ({
  src,
  altText,
  style = {},
  size = 64,
  backgroundColor,
  hidePixel,
}) => {
  return (
    <IsPixelWidgetStyled
      hidePixel={hidePixel}
      size={size}
      style={style}
      backgroundColor={backgroundColor}
    >
      <img decoding="async" loading="lazy" src={src} alt={altText} />
    </IsPixelWidgetStyled>
  );
};

export default Avatar;
