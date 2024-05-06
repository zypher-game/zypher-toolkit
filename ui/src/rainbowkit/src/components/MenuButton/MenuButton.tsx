import React from "react";

import { touchableStyles } from "../../css/touchableStyles";
import { isMobile } from "../../utils/isMobile";
import { Box } from "../Box/Box";
import * as styles from "./MenuButton.css";
import { PixelCube3 } from "../../../../components/PixelBtn/ActivePixelButton";

type Props = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  currentlySelected?: boolean;
  testId?: string;
  disabled?: boolean;
};

export const MenuButton = React.forwardRef(
  (
    {
      children,
      currentlySelected = false,
      onClick,
      testId,
      disabled,
      ...urlProps
    }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    const mobile = isMobile();
    return (
      <Box
        as="button"
        borderRadius="menuButton"
        disabled={disabled ?? false}
        display="flex"
        ref={ref}
        testId={testId}
        type="button"
        marginLeft="20"
        marginRight="20"
        marginTop="8"
        marginBottom="8"
        onClick={onClick}
      >
        <PixelCube3
          pixel_height={3}
          backgroundColor={`${currentlySelected ? "#343C4F" : "#1D263B"}`}
          borderColor={`${currentlySelected ? "#1649FF" : "#3A4254"}`}
          showHover={true}
          width="100%"
        >
          <Box
            className={[
              mobile ? styles.unsetBackgroundOnHover : undefined,
              !currentlySelected && touchableStyles({ active: "shrink" }),
            ]}
            transition="default"
            width="full"
            padding="16"
            {...(currentlySelected
              ? {
                  // background: 'accentColor',
                  // borderColor: 'accentColor',
                  // // borderStyle: 'solid',
                  // borderWidth: '1',
                  // boxShadow: 'selectedOption',
                  color: "accentColorForeground",
                }
              : {
                  // background: { hover: 'menuItemBackground' },
                  color: "modalText",
                  // transition: 'default',

                  // borderColor: 'selectedOptionBorder',
                  // borderStyle: 'solid',
                  // borderWidth: '1'
                })}
            {...urlProps}
          >
            {children}
          </Box>
        </PixelCube3>
      </Box>
    );
  }
);

MenuButton.displayName = "MenuButton";
