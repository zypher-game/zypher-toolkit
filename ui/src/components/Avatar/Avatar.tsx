import React from "react";
import IsPixelWidget from "../Header/rainbow_account/IsPixelWidget";
import styled, { css } from "styled-components";

interface AvatarProps {
  src: string;
  altText?: string;
  size?: number;
  style?: any;
}
const IsPixelWidgetStyled = styled(IsPixelWidget)<{
  size: number;
  style: any;
}>`
  width: ${({ size }) => size}px !important;
  height: ${({ size }) => size}px !important;
  border-radius: 0;
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
  .pixel_flat_btn_bg > div {
    ${({ style }) =>
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
}) => {
  return (
    <IsPixelWidgetStyled size={size} style={style}>
      <img decoding="async" loading="lazy" src={src} alt={altText} />
    </IsPixelWidgetStyled>
  );
};

export default Avatar;
