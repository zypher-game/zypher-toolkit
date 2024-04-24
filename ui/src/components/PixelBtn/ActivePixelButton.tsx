import React, { memo, useCallback, useRef } from "react";
import styled from "styled-components";
import PixelFlatBtn from "./PixelFlatBtn";
type IChildren = {
  children: React.ReactNode;
};
export type IPixelProps = {
  className?: string;
  onClick?: any;
  isLoading?: boolean;
  pixel_height: number;
  small_pixel_height?: number;
  smallWidth?: string;
  width?: string;
  height?: string;
  smallHeight?: string;
  borderBottomColor?: string;
  borderTopColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  showHover?: boolean;
};
interface IPixel extends IChildren, IPixelProps {}

const PixelStyled = styled(PixelFlatBtn)<IPixel>`
  height: ${({ height }) => height};
  min-height: ${({ height }) => height};
  max-width: ${({ width }) => width};
  width: ${({ width }) => width};
  &.pixel_loading {
    opacity: 0.8;
  }
  > .pixel_flat_btn_bg {
    color: #fff;
    > div {
      background-color: ${({ backgroundColor }) => backgroundColor};
    }
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1,
    > .pixel_flat_btn_bottom_2 {
      height: ${({ pixel_height }) => pixel_height}px;
      @media screen and (max-width: 768px) {
        height: ${({ small_pixel_height }) => small_pixel_height}px;
      }
    }
    > .pixel_flat_btn_inner {
      height: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      top: calc(${({ pixel_height }) => pixel_height}px * 2);
      left: 0;
      @media screen and (max-width: 768px) {
        height: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 4
        );
        top: calc(${({ small_pixel_height }) => small_pixel_height}px * 2);
      }
    }

    > .pixel_flat_btn_top_1 {
      top: 0;
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
      @media screen and (max-width: 768px) {
        width: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 4
        );
        left: calc(${({ small_pixel_height }) => small_pixel_height}px * 2);
      }
    }
    > .pixel_flat_btn_top_2 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 2);
      top: ${({ pixel_height }) => pixel_height}px;
      left: ${({ pixel_height }) => pixel_height}px;
      @media screen and (max-width: 768px) {
        width: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 2
        );
        top: ${({ small_pixel_height }) => small_pixel_height}px;
        left: ${({ small_pixel_height }) => small_pixel_height}px;
      }
    }

    > .pixel_flat_btn_bottom_1 {
      bottom: 0;
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
      @media screen and (max-width: 768px) {
        width: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 4
        );
        left: calc(${({ small_pixel_height }) => small_pixel_height}px * 2);
      }
    }
    > .pixel_flat_btn_bottom_2 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 2);
      bottom: ${({ pixel_height }) => pixel_height}px;
      left: ${({ pixel_height }) => pixel_height}px;
      @media screen and (max-width: 768px) {
        width: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 2
        );
        bottom: ${({ small_pixel_height }) => small_pixel_height}px;
        left: ${({ small_pixel_height }) => small_pixel_height}px;
      }
    }
  }
  > .pixel_flat_inner {
    width: 100%;
    height: 100%;
  }
`;
export const ActivePixelCard = memo((props: IPixel) => {
  const {
    className,
    isLoading,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    smallWidth,
    height,
    smallHeight,
    small_pixel_height,
    borderTopColor,
    borderBottomColor,
    onClick,
  } = props;
  const lastClickTimeRef = useRef(Date.now());
  const clickHandle = useCallback(() => {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - lastClickTimeRef.current;
    if (timeSinceLastClick < 1000) {
      // 1000毫秒等于2秒
      // 如果距离上次点击不到1秒，则忽略此次点击
      return;
    }

    lastClickTimeRef.current = currentTime;
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  return (
    <PixelStyled
      {...props}
      className={className}
      pixel_height={pixel_height}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      isLoading={isLoading}
      borderColor={borderColor}
      small_pixel_height={small_pixel_height ?? pixel_height}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
      borderTopColor={borderTopColor}
      borderBottomColor={borderBottomColor}
      onClick={clickHandle}
    />
  );
});

const ActivePixelCardStyled = styled(ActivePixelCard)`
  cursor: pointer;
`;
export const ActivePixelButton = memo((props: IPixel) => {
  const {
    className,
    isLoading,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    smallWidth,
    height,
    smallHeight,
    small_pixel_height,
  } = props;
  return (
    <ActivePixelCardStyled
      {...props}
      className={className}
      pixel_height={pixel_height}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      isLoading={isLoading}
      borderColor={borderColor}
      small_pixel_height={small_pixel_height}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
    />
  );
});

const PixelColorStyled = styled(PixelStyled)<IPixel>`
  > .pixel_flat_btn_bg {
    > div {
      background-color: ${({ backgroundColor }) =>
        backgroundColor ?? "#1649ff"};
    }
    > .pixel_flat_btn_inner {
      &:before,
      &:after {
        content: "";
        position: absolute;
        width: ${({ pixel_height }) => pixel_height}px;
        height: ${({ pixel_height }) => pixel_height}px;
        @media screen and (max-width: 768px) {
          width: ${({ small_pixel_height }) => small_pixel_height}px;
          height: ${({ small_pixel_height }) => small_pixel_height}px;
        }
      }
      &:before {
        top: 0;
        left: 0;
        background-color: ${({ borderTopColor }) =>
          borderTopColor ?? "#3360ff"};
      }
      &:after {
        bottom: 0;
        right: 0;
        background-color: ${({ borderBottomColor }) =>
          borderBottomColor ?? "#0f33b2"};
      }
    }
    > .pixel_flat_btn_top_1 {
      background-color: ${({ borderTopColor }) => borderTopColor ?? "#3360ff"};
    }
    > .pixel_flat_btn_top_2 {
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderTopColor }) => borderTopColor ?? "#3360ff"};
      @media screen and (max-width: 768px) {
        border-left: ${({ small_pixel_height }) => small_pixel_height}px solid
          ${({ borderTopColor }) => borderTopColor ?? "#3360ff"};
      }
    }
    > .pixel_flat_btn_bottom_1 {
      background-color: ${({ borderBottomColor }) =>
        borderBottomColor ?? "#0f33b2"};
    }
    > .pixel_flat_btn_bottom_2 {
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderBottomColor }) => borderBottomColor ?? "#0f33b2"};
      @media screen and (max-width: 768px) {
        border-left: ${({ small_pixel_height }) => small_pixel_height}px solid
          ${({ borderBottomColor }) => borderBottomColor ?? "#0f33b2"};
      }
    }
  }
`;
export const ActivePixelColorCard = memo((props: IPixel) => {
  const {
    className,
    isLoading,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    smallWidth,
    height,
    smallHeight,
    small_pixel_height,
  } = props;
  return (
    <PixelColorStyled
      {...props}
      className={className}
      pixel_height={pixel_height}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      isLoading={isLoading}
      borderColor={borderColor}
      small_pixel_height={pixel_height ?? small_pixel_height}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
    />
  );
});
const ActivePixelColorCardStyled = styled(ActivePixelColorCard)`
  cursor: pointer;
`;
export const ActivePixelButtonColor = memo((props: IPixel) => {
  return <ActivePixelColorCardStyled {...props} />;
});

const PixelBorderStyled = styled(PixelFlatBtn)<IPixel>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  & > .pixel_flat_btn_bg {
    & > div {
      background-color: ${({ backgroundColor }) =>
        backgroundColor ?? "#1d263b"};
    }
    .pixel_flat_btn_top_1,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1,
    > .pixel_flat_btn_bottom_2 {
      height: calc(${({ pixel_height }) => pixel_height + "px"} + 1px);
    }
    > .pixel_flat_btn_inner {
      height: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      top: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      left: 0;
      @media screen and (max-width: 768px) {
        height: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        top: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_inner,
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1,
    > .pixel_flat_btn_bottom_2 {
      border: 1px solid ${({ borderColor }) => borderColor ?? "#3a4254"};
      transition: border 0.3s ease;
    }
    > .pixel_flat_btn_top_1 {
      border-bottom: none !important;
      z-index: 3;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_top_2 {
      border-bottom: none !important;
      z-index: 2;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
      top: ${({ pixel_height }) => pixel_height + "px"};
      left: ${({ pixel_height }) => pixel_height + "px"};
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
        top: ${({ pixel_height }) => pixel_height + "px"};
        left: ${({ pixel_height }) => pixel_height + "px"};
      }
    }
    > .pixel_flat_btn_bottom_1 {
      border-top: none !important;
      z-index: 4;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_bottom_2 {
      border-top: none !important;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
      bottom: ${({ pixel_height }) => pixel_height + "px"};
      left: ${({ pixel_height }) => pixel_height + "px"};
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
        bottom: ${({ pixel_height }) => pixel_height + "px"};
        left: ${({ pixel_height }) => pixel_height + "px"};
      }
    }
  }
  > .pixel_flat_inner {
    width: 100%;
    height: 100%;
  }
`;
export const PixelBorderCard = memo((props: IPixel) => {
  const {
    className,
    pixel_height,
    small_pixel_height,
    width,
    height,
    backgroundColor,
    borderColor,
    showHover,
    onClick,
  } = props;
  const lastClickTimeRef = useRef(Date.now());
  const clickHandle = useCallback(() => {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - lastClickTimeRef.current;
    if (timeSinceLastClick < 1000) {
      // 1000毫秒等于2秒
      // 如果距离上次点击不到1秒，则忽略此次点击
      return;
    }

    lastClickTimeRef.current = currentTime;
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  return (
    <PixelBorderStyled
      {...props}
      pixel_height={pixel_height}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      borderColor={borderColor}
      className={`${className} pixelBorderCard`}
      showHover={showHover}
      small_pixel_height={pixel_height ?? small_pixel_height}
      onClick={clickHandle}
    />
  );
});

const PixelBorderCardSize2Styled = styled(PixelStyled)<IPixel>`
  > .pixel_flat_btn_bg {
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_bottom_1 {
      background-color: ${({ borderColor }) => borderColor};
    }
    > .pixel_flat_btn_inner,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_2 {
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
    }
  }
`;

export const PixelBorderCardSize2 = memo((props: IPixel) => {
  const {
    className,
    isLoading,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    smallWidth,
    height,
    smallHeight,
    small_pixel_height,
    borderTopColor,
    borderBottomColor,
  } = props;
  return (
    <PixelBorderCardSize2Styled
      {...props}
      className={className}
      pixel_height={pixel_height}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      isLoading={isLoading}
      borderColor={borderColor}
      small_pixel_height={small_pixel_height ?? pixel_height}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
      borderTopColor={borderTopColor}
      borderBottomColor={borderBottomColor}
    />
  );
});

const PixelBorderCardSize3Styled = styled(PixelBorderCardSize2)<IPixel>`
  > .pixel_flat_btn_bg {
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_bottom_1 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 6);
      left: calc(${({ pixel_height }) => pixel_height}px * 3);
    }
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_2 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
    }
    > .pixel_flat_btn_inner {
      height: calc(100% - ${({ pixel_height }) => pixel_height}px * 6);
      top: calc(3 * ${({ pixel_height }) => pixel_height}px);
    }

    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_2 {
      &:before {
        content: "";
        position: absolute;
        height: ${({ pixel_height }) => pixel_height}px;
        width: calc(100% + ${({ pixel_height }) => pixel_height}px * 4);
        left: calc(-${({ pixel_height }) => pixel_height}px * 2);
        background-color: ${({ backgroundColor }) => backgroundColor};
        border-left: ${({ pixel_height }) => pixel_height}px solid
          ${({ borderColor }) => borderColor};
        border-right: ${({ pixel_height }) => pixel_height}px solid
          ${({ borderColor }) => borderColor};
      }
    }
    > .pixel_flat_btn_top_2 {
      &:before {
        top: ${({ pixel_height }) => pixel_height}px;
      }
    }
    > .pixel_flat_btn_bottom_2 {
      &:before {
        top: -${({ pixel_height }) => pixel_height}px;
      }
    }
  }
`;

export const PixelBorderCardSize3 = memo((props: IPixel) => {
  const {
    className,
    isLoading,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    smallWidth,
    height,
    smallHeight,
    small_pixel_height,
    borderTopColor,
    borderBottomColor,
  } = props;
  return (
    <PixelBorderCardSize3Styled
      {...props}
      className={className}
      pixel_height={pixel_height}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      isLoading={isLoading}
      borderColor={borderColor}
      small_pixel_height={small_pixel_height ?? pixel_height}
      smallWidth={smallWidth}
      smallHeight={smallHeight}
      borderTopColor={borderTopColor}
      borderBottomColor={borderBottomColor}
    />
  );
});

const PixelBorderCardStyled = styled(PixelBorderCard)`
  cursor: pointer;
  &:hover {
    > .pixel_flat_btn_bg {
      > .pixel_flat_btn_inner,
      > .pixel_flat_btn_top_1,
      > .pixel_flat_btn_top_2,
      > .pixel_flat_btn_bottom_1,
      > .pixel_flat_btn_bottom_2 {
        border: 1px solid
          ${({ showHover, borderColor }) =>
            showHover === false ? borderColor : "#1649FF"};
      }
    }
  }
`;
export const PixelBorderCardButton = memo((props: IPixel) => {
  return <PixelBorderCardStyled {...props} />;
});
