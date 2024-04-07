import React from "react";
import { HeaderUIType } from "../Header/header";
import IsPixelWidget from "../Header/rainbow_account/IsPixelWidget";
import styled, { css } from "styled-components";

interface AvatarProps {
  src: string;
  altText?: string;
  size?: number;
  style?: any;
  type?: HeaderUIType;
}
const IsPixelWidgetStyled = styled(IsPixelWidget)<{
  type: HeaderUIType;
  size: number;
  style: any;
}>`
  width: ${({ size }) => size}px !important;
  height: ${({ size }) => size}px !important;
  border-radius: ${({ type }) => (type === "pixel" ? "0" : "50%")};
  overflow: hidden;
  ${({ type, style }) =>
    type === "other" &&
    style &&
    css`
      ${style}
    `};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.pixel_flat_btn {
    img {
      width: 75%;
      height: 75%;
    }
  }
  .pixel_flat_btn_bg > div {
    ${({ type, style }) =>
      type === "pixel" &&
      style &&
      css`
        ${style}
      `};
  }
`;
const Avatar: React.FC<AvatarProps> = ({
  src,
  altText,
  style = {},
  size = 64,
  type = "other",
}) => {
  return (
    <IsPixelWidgetStyled type={type} size={size} style={style}>
      <img src={src} alt={altText} />
    </IsPixelWidgetStyled>
  );
};

export default Avatar;
