import React, { ReactNode, useContext } from "react";
import { isMobile } from "../../utils/isMobile";
import { Box, BoxProps } from "../Box/Box";
import {
  ModalSizeContext,
  ModalSizeOptions,
} from "../RainbowKitProvider/ModalSizeContext";
import * as styles from "./DialogContent.css";
import { PixelBorderCard } from "../../../../components/PixelBtn/ActivePixelButton";

interface DialogContentProps {
  children: ReactNode;
  bottomSheetOnMobile?: boolean;
  padding?: BoxProps["padding"];
  marginTop?: BoxProps["marginTop"];
  wide?: boolean;
}

export function DialogContent({
  bottomSheetOnMobile = false,
  children,
  marginTop,
  padding = "16",
  wide = false,
}: DialogContentProps) {
  const mobile = isMobile();
  const modalSize = useContext(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  return (
    <Box marginTop={marginTop}>
      <PixelBorderCard
        className={[
          wide
            ? mobile
              ? styles.dialogContentWideMobile
              : compactModeEnabled
              ? styles.dialogContentCompactMode
              : styles.dialogContentWideDesktop
            : styles.dialogContent,
          mobile ? styles.dialogContentMobile : null,
          mobile && bottomSheetOnMobile ? styles.bottomSheetOverrides : null,
        ].join(" ")}
        pixel_height={10}
        backgroundColor="#1D263B"
      >
        <Box padding={padding} width="full">
          {children}
        </Box>
      </PixelBorderCard>
    </Box>
  );
}
