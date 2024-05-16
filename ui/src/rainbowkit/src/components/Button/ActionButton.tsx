import React from "react";
import { touchableStyles } from "../../css/touchableStyles";
import { Box, BoxProps } from "../Box/Box";
import { Text, TextProps } from "../Text/Text";
import { PixelCube2 } from "../../../../components/PixelBtn/ActivePixelButton";

type Size = "small" | "medium" | "large";

const sizeVariants: Record<
  Size,
  {
    paddingX: BoxProps["paddingX"];
    paddingY: BoxProps["paddingY"];
    fontSize: TextProps["size"];
    height?: BoxProps["height"];
  }
> = {
  large: {
    fontSize: "16",
    paddingX: "24",
    paddingY: "10",
  },
  medium: {
    fontSize: "14",
    height: "28",
    paddingX: "12",
    paddingY: "4",
  },
  small: {
    fontSize: "14",
    paddingX: "10",
    paddingY: "5",
  },
};

export function ActionButton({
  disabled = false,
  href,
  label,
  onClick,
  rel = "noreferrer noopener",
  size = "medium",
  target = "_blank",
  testId,
  type = "primary",
}: {
  href?: string;
  label: string;
  onClick?: () => void;
  rel?: string;
  size?: Size;
  target?: string;
  type?: "primary" | "secondary";
  disabled?: boolean;
  testId?: string;
}) {
  const isPrimary = type === "primary";
  const isNotLarge = size !== "large";
  // const mobile = isMobile();
  const background = !disabled
    ? isPrimary
      ? "#1649FF"
      : isNotLarge
      ? "#3360FF"
      : undefined
    : "#1D263B";
  const { fontSize, height, paddingX, paddingY } = sizeVariants[size];
  // const hasBorder = !mobile || !isNotLarge;
  return (
    <PixelCube2
      pixel_height={2}
      borderColor={background}
      backgroundColor={background}
      height={height ? height + "px" : undefined}
    >
      <Box
        {...(href
          ? !disabled
            ? { as: "a", href, rel, target }
            : {}
          : { as: "button", type: "button" })}
        onClick={!disabled ? onClick : undefined}
        // {...(hasBorder
        //   ? {
        //       borderColor:
        //         mobile && !isNotLarge && !isPrimary
        //           ? "actionButtonBorderMobile"
        //           : "actionButtonBorder",
        //       borderStyle: "solid",
        //       borderWidth: "1",
        //     }
        //   : {})}
        // borderRadius="actionButton"
        className={
          !disabled && touchableStyles({ active: "shrinkSm", hover: "grow" })
        }
        display="block"
        paddingX={paddingX}
        paddingY={paddingY}
        style={{ willChange: "transform" }}
        testId={testId}
        textAlign="center"
        transition="transform"
      >
        <Text
          color={
            !disabled
              ? isPrimary
                ? "accentColorForeground"
                : "accentColor"
              : "modalTextSecondary"
          }
          size={fontSize}
          weight="bold"
        >
          {label}
        </Text>
      </Box>
    </PixelCube2>
  );
}
