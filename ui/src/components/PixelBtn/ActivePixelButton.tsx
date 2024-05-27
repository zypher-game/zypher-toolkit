import React, { memo, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import PixelFlatBtn from "./PixelFlatBtn";
type IChildren = {
  children?: React.ReactNode;
};
export type IPixelProps = {
  className?: string;
  onClick?: any;
  pixel_height?: number;
  width?: string;
  height?: string;
  borderBottomColor?: string;
  borderTopColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  showHover?: boolean;
  size?: number;
  disable?: boolean;
  hidePixel?: boolean;
};
interface IPixel extends IChildren, IPixelProps {}

const PixelStyled = styled(PixelFlatBtn)<IPixel>`
  height: ${({ height }) => height};
  min-height: ${({ height }) => height};
  max-width: ${({ width }) => width};
  width: ${({ width }) => width};
  opacity: ${({ disable }) => (disable ? 0.8 : 1)};
  &.pixel_loading {
    opacity: 0.8;
  }
  > .pixel_flat_btn_bg {
    color: #fff;
    > div {
      transition: all 0.3s ease;
      background-color: ${({ backgroundColor }) => backgroundColor};
    }
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_2,
    > .pixel_flat_btn_bottom_1 {
      height: ${({ pixel_height }) => pixel_height}px;
    }
    > .pixel_flat_btn_inner {
      height: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      top: calc(${({ pixel_height }) => pixel_height}px * 2);
      left: 0;
    }

    > .pixel_flat_btn_top_1 {
      top: 0;
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
    }
    > .pixel_flat_btn_top_2 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 2);
      top: ${({ pixel_height }) => pixel_height}px;
      left: ${({ pixel_height }) => pixel_height}px;
    }

    > .pixel_flat_btn_bottom_2 {
      bottom: 0;
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
    }
    > .pixel_flat_btn_bottom_1 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 2);
      bottom: ${({ pixel_height }) => pixel_height}px;
      left: ${({ pixel_height }) => pixel_height}px;
    }
  }
  > .pixel_flat_inner {
    width: 100%;
    height: 100%;
  }
`;
export const ActivePixelCard = memo((props: IPixel) => {
  const { onClick, hidePixel } = props;
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
  return hidePixel ? (
    <PixelFlatBtn {...props} onClick={clickHandle} />
  ) : (
    <PixelStyled {...props} onClick={clickHandle} />
  );
});

const ActivePixelCardStyled = styled(ActivePixelCard)`
  cursor: pointer;
`;
export const ActivePixelButton = memo((props: IPixel) => {
  return <ActivePixelCardStyled {...props} />;
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
        transition: all 0.3s ease;
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
    }
    > .pixel_flat_btn_bottom_2 {
      background-color: ${({ borderBottomColor }) =>
        borderBottomColor ?? "#0f33b2"};
    }
    > .pixel_flat_btn_bottom_1 {
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderBottomColor }) => borderBottomColor ?? "#0f33b2"};
    }
  }
`;
export const ActivePixelColorCard = memo((props: IPixel) => {
  const {
    className,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    height,
  } = props;
  return (
    <PixelColorStyled
      {...props}
      className={className}
      pixel_height={pixel_height}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      borderColor={borderColor}
    />
  );
});

type IActivePixelColorCardTheme = "yellow" | "brown" | "brightBlue";
type IActivePixelColorCardColor = {
  borderBottomColor: string;
  borderTopColor: string;
  backgroundColor: string;
};

export interface IPixelButtonTheme extends IPixelProps {
  themeType: IActivePixelColorCardTheme;
}
interface IPixelButton extends IChildren, IPixelButtonTheme {}

const cardTheme: Record<
  IActivePixelColorCardTheme,
  {
    normal: IActivePixelColorCardColor;
    hover: IActivePixelColorCardColor;
    click: IActivePixelColorCardColor;
  }
> = {
  yellow: {
    normal: {
      borderBottomColor: "#E1820C",
      borderTopColor: "#FFE299",
      backgroundColor: "#FEBE1E",
    },
    hover: {
      borderBottomColor: "#DEA534",
      borderTopColor: "#FFEFB8",
      backgroundColor: "#FFDA58",
    },
    click: {
      borderBottomColor: "#A4720E",
      borderTopColor: "#FDD64C",
      backgroundColor: "#F0BE0C",
    },
  },
  brown: {
    normal: {
      backgroundColor: "#61341F",
      borderBottomColor: "#30170B",
      borderTopColor: "#7F5441",
    },
    hover: {
      backgroundColor: "#805440",
      borderBottomColor: "#61341F",
      borderTopColor: "#A17560",
    },
    click: {
      borderBottomColor: "#2C180F",
      borderTopColor: "#533628",
      backgroundColor: "#412315",
    },
  },
  brightBlue: {
    normal: {
      backgroundColor: "#1649FF",
      borderBottomColor: "#0F33B2",
      borderTopColor: "#3360FF",
    },
    hover: {
      backgroundColor: "#406AFF",
      borderBottomColor: "#183BB7",
      borderTopColor: "#5C80FF",
    },
    click: {
      borderBottomColor: "#0E267D",
      borderTopColor: "#0E43FF",
      backgroundColor: "#022FD0",
    },
  },
};
const ActivePixelButtonColorStyled = styled(PixelStyled)<IPixelButtonTheme>`
  cursor: pointer;
  > .pixel_flat_btn_bg {
    > div {
      background-color: ${({ themeType }) =>
        cardTheme[themeType].normal.backgroundColor};
    }
    > .pixel_flat_btn_inner {
      &:before,
      &:after {
        content: "";
        position: absolute;
        width: ${({ pixel_height }) => pixel_height}px;
        height: ${({ pixel_height }) => pixel_height}px;
        transition: all 0.3s ease;
      }
      &:before {
        top: 0;
        left: 0;
        background-color: ${({ themeType }) =>
          cardTheme[themeType].normal.borderTopColor};
      }
      &:after {
        bottom: 0;
        right: 0;
        background-color: ${({ themeType }) =>
          cardTheme[themeType].normal.borderBottomColor};
      }
    }
    > .pixel_flat_btn_top_1 {
      background-color: ${({ themeType }) =>
        cardTheme[themeType].normal.borderTopColor};
    }
    > .pixel_flat_btn_top_2 {
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ themeType }) => cardTheme[themeType].normal.borderTopColor};
    }
    > .pixel_flat_btn_bottom_2 {
      background-color: ${({ themeType }) =>
        cardTheme[themeType].normal.borderBottomColor};
    }
    > .pixel_flat_btn_bottom_1 {
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ themeType }) => cardTheme[themeType].normal.borderBottomColor};
    }
  }
  &.disable {
    opacity: 0.8;
    cursor: not-allowed;
  }
  &.normal {
    &:hover {
      > .pixel_flat_btn_bg {
        > div {
          background-color: ${({ themeType }) =>
            cardTheme[themeType].hover.backgroundColor};
        }
        > .pixel_flat_btn_inner {
          &:before,
          &:after {
            content: "";
          }
          &:before {
            background-color: ${({ themeType }) =>
              cardTheme[themeType].hover.borderTopColor};
          }
          &:after {
            background-color: ${({ themeType }) =>
              cardTheme[themeType].hover.borderBottomColor};
          }
        }
        > .pixel_flat_btn_top_1 {
          background-color: ${({ themeType }) =>
            cardTheme[themeType].hover.borderTopColor};
        }
        > .pixel_flat_btn_top_2 {
          border-left: ${({ pixel_height }) => pixel_height}px solid
            ${({ themeType }) => cardTheme[themeType].hover.borderTopColor};
        }
        > .pixel_flat_btn_bottom_2 {
          background-color: ${({ themeType }) =>
            cardTheme[themeType].hover.borderBottomColor};
        }
        > .pixel_flat_btn_bottom_1 {
          border-right: ${({ pixel_height }) => pixel_height}px solid
            ${({ themeType }) => cardTheme[themeType].hover.borderBottomColor};
        }
      }
    }
    &.click {
      > .pixel_flat_btn_bg {
        > div {
          background-color: ${({ themeType }) =>
            cardTheme[themeType].click.backgroundColor};
        }
        > .pixel_flat_btn_inner {
          &:before,
          &:after {
            content: "";
          }
          &:before {
            background-color: ${({ themeType }) =>
              cardTheme[themeType].click.borderTopColor};
          }
          &:after {
            background-color: ${({ themeType }) =>
              cardTheme[themeType].click.borderBottomColor};
          }
        }
        > .pixel_flat_btn_top_1 {
          background-color: ${({ themeType }) =>
            cardTheme[themeType].click.borderTopColor};
        }
        > .pixel_flat_btn_top_2 {
          border-left: ${({ pixel_height }) => pixel_height}px solid
            ${({ themeType }) => cardTheme[themeType].click.borderTopColor};
        }
        > .pixel_flat_btn_bottom_2 {
          background-color: ${({ themeType }) =>
            cardTheme[themeType].click.borderBottomColor};
        }
        > .pixel_flat_btn_bottom_1 {
          border-right: ${({ pixel_height }) => pixel_height}px solid
            ${({ themeType }) => cardTheme[themeType].click.borderBottomColor};
        }
      }
    }
  }
`;

export const ActivePixelButtonColor = memo((props: IPixelButton) => {
  const { onClick, className, disable } = props;
  const [isActive, setIsActive] = useState(false);
  const clickHandle = useCallback(() => {
    if (onClick) {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 1000);
      onClick();
    }
  }, [onClick]);

  return (
    <ActivePixelButtonColorStyled
      {...props}
      className={`${className ?? ""} ${disable ? "disable" : "normal"} ${
        isActive ? "click" : ""
      }`}
      onClick={clickHandle}
    />
  );
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
    > .pixel_flat_btn_bottom_2,
    > .pixel_flat_btn_bottom_1 {
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
    > .pixel_flat_btn_bottom_2,
    > .pixel_flat_btn_bottom_1 {
      border: 1px solid ${({ borderColor }) => borderColor ?? "#3a4254"};
      transition: all 0.3s ease;
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
    > .pixel_flat_btn_bottom_2 {
      border-top: none !important;
      z-index: 4;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_bottom_1 {
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
  const { className, onClick, hidePixel } = props;
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
  return hidePixel ? (
    <PixelFlatBtn {...props} onClick={clickHandle} />
  ) : (
    <PixelBorderStyled {...props} className={`${className} pixelBorderCard`} />
  );
});

const PixelCube2Styled = styled(PixelStyled)<IPixel>`
  &:hover {
    > .pixel_flat_btn_bg {
      > .pixel_flat_btn_top_1,
      > .pixel_flat_btn_bottom_2 {
        background-color: ${({ showHover, borderColor }) =>
          showHover === true ? "#1649FF" : borderColor};
      }
      > .pixel_flat_btn_inner,
      > .pixel_flat_btn_top_2,
      > .pixel_flat_btn_bottom_1 {
        border-left: ${({ pixel_height }) => pixel_height}px solid
          ${({ showHover, borderColor }) =>
            showHover === true ? "#1649FF" : borderColor};
        border-right: ${({ pixel_height }) => pixel_height}px solid
          ${({ showHover, borderColor }) =>
            showHover === true ? "#1649FF" : borderColor};
      }
    }
  }
  > .pixel_flat_btn_bg {
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_bottom_2 {
      background-color: ${({ borderColor }) => borderColor};
    }
    > .pixel_flat_btn_inner,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1 {
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
    }
  }
`;

export const PixelCube2 = memo((props: IPixel) => {
  const {
    className,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    height,
    borderTopColor,
    borderBottomColor,
  } = props;
  return (
    <PixelCube2Styled
      {...props}
      className={className}
      pixel_height={pixel_height}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      borderColor={borderColor}
      borderTopColor={borderTopColor}
      borderBottomColor={borderBottomColor}
    />
  );
});

const PixelCube3Styled = styled(PixelCube2)<IPixel>`
  &:hover {
    > .pixel_flat_btn_bg {
      > .pixel_flat_btn_top_2,
      > .pixel_flat_btn_bottom_1 {
        &:before {
          border-left: ${({ pixel_height }) => pixel_height}px solid
            ${({ showHover, borderColor }) =>
              showHover === true ? "#1649FF" : borderColor};
          border-right: ${({ pixel_height }) => pixel_height}px solid
            ${({ showHover, borderColor }) =>
              showHover === true ? "#1649FF" : borderColor};
        }
      }
    }
  }
  > .pixel_flat_btn_bg {
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_bottom_2 {
      width: calc(
        100% - ${({ pixel_height, size }) => `${pixel_height}px * ${2 * size!}`}
      );
      left: calc(${({ pixel_height, size }) => `${pixel_height}px * ${size}`});
    }
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1 {
      width: calc(
        100% -
          ${({ pixel_height, size }) =>
            `${pixel_height}px * ${2 * (size! - 1)}`}
      );
      left: calc(
        ${({ pixel_height, size }) => `${pixel_height}px * ${size! - 1}`}
      );
    }
    > .pixel_flat_btn_inner {
      height: calc(
        100% - ${({ pixel_height, size }) => `${pixel_height}px * ${2 * size!}`}
      );
      top: calc(${({ pixel_height, size }) => `${size} * ${pixel_height}px`});
    }

    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1 {
      &:before {
        content: "";
        transition: all 0.3s ease;
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
    > .pixel_flat_btn_bottom_1 {
      &:before {
        top: -${({ pixel_height }) => pixel_height}px;
      }
    }
  }
`;

export const PixelCube3 = memo((props: IPixel) => {
  const { size } = props;
  return <PixelCube3Styled {...props} size={size ?? 3} />;
});

const PixelCube5Styled = styled(PixelCube3Styled)<IPixel>`
  > .pixel_flat_btn_bg {
    > .pixel_flat_btn_inner {
      &:after,
      &:before {
        content: "";
        position: absolute;
        height: ${({ pixel_height }) => pixel_height}px;
        width: 100%;
        left: 0;
        background-color: ${({ backgroundColor }) => backgroundColor};
        border-left: ${({ pixel_height }) => pixel_height}px solid
          ${({ borderColor }) => borderColor};
        border-right: ${({ pixel_height }) => pixel_height}px solid
          ${({ borderColor }) => borderColor};
      }
      &:before {
        top: -${({ pixel_height }) => pixel_height}px;
      }
      &:after {
        bottom: -${({ pixel_height }) => pixel_height}px;
      }
    }
    > .pixel_flat_btn_top_1:before,
    > .pixel_flat_btn_bottom_2:after {
      content: "";
      position: absolute;
      height: ${({ pixel_height }) => pixel_height}px;
      width: calc(100% + ${({ pixel_height }) => pixel_height}px * 6);
      left: calc(-${({ pixel_height }) => pixel_height}px * 3);
      background-color: ${({ backgroundColor }) => backgroundColor};
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
    }
    > .pixel_flat_btn_top_1:before {
      top: calc(${({ pixel_height }) => pixel_height}px * 3);
    }
    > .pixel_flat_btn_bottom_2:after {
      bottom: calc(${({ pixel_height }) => pixel_height}px * 3);
    }
  }
`;

export const PixelCube5 = memo((props: IPixel) => {
  const { size } = props;
  return <PixelCube5Styled {...props} size={size ?? 5} />;
});

const PixelBorderCardStyled = styled(PixelBorderCard)`
  cursor: pointer;
  &:hover {
    > .pixel_flat_btn_bg {
      > .pixel_flat_btn_inner,
      > .pixel_flat_btn_top_1,
      > .pixel_flat_btn_top_2,
      > .pixel_flat_btn_bottom_2,
      > .pixel_flat_btn_bottom_1 {
        border: 1px solid
          ${({ showHover, borderColor }) =>
            showHover === true ? "#1649FF" : borderColor};
      }
    }
  }
`;
export const PixelBorderCardButton = memo((props: IPixel) => {
  return <PixelBorderCardStyled {...props} />;
});
