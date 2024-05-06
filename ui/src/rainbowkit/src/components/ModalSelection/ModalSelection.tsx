import React, { useState } from "react";
import { touchableStyles } from "../../css/touchableStyles";
import { AsyncImage } from "../AsyncImage/AsyncImage";
import { Box } from "../Box/Box";
import { useCoolMode } from "../RainbowKitProvider/useCoolMode";
import { Text } from "../Text/Text";
import * as styles from "./ModalSelection.css";
import { ActivePixelCard } from "../../../../components/PixelBtn/ActivePixelButton";

type Props = {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  as?: React.ElementType<any>;
  currentlySelected?: boolean;
  ready?: boolean;
  recent?: boolean;
  name: string;
  iconUrl: string | (() => Promise<string>);
  iconBackground?: string;
  testId?: string;
};

export const ModalSelection = ({
  as = "button",
  currentlySelected = false,
  iconBackground,
  iconUrl,
  name,
  onClick,
  ready,
  recent,
  testId,
  ...urlProps
}: Props) => {
  const coolModeRef = useCoolMode(iconUrl);
  const [isMouseOver, setIsMouseOver] = useState<Boolean>(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      ref={coolModeRef}
    >
      <ActivePixelCard
        pixel_height={4}
        {...(currentlySelected
          ? {
              backgroundColor: "#1649FF",
            }
          : {
              backgroundColor: "#3A4254",
            })}
      >
        <Box
          as={as}
          borderRadius="menuButton"
          borderStyle="solid"
          borderWidth="1"
          className={
            !currentlySelected
              ? [
                  styles.transparentBorder,
                  touchableStyles({
                    active: "shrink",
                  }),
                ]
              : undefined
          }
          disabled={currentlySelected}
          onClick={onClick}
          paddingY="5"
          paddingX="20"
          style={{ willChange: "transform" }}
          testId={testId}
          transition="default"
          width="full"
          {...urlProps}
        >
          <Box
            color={currentlySelected ? "accentColorForeground" : "modalText"}
            disabled={!ready}
            fontFamily="body"
            fontSize="16"
            fontWeight="bold"
            transition="default"
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="row"
              gap="12"
              width="max"
            >
              <AsyncImage
                background={iconBackground}
                {...(isMouseOver ? {} : { borderColor: "actionButtonBorder" })}
                borderRadius="6"
                height="28"
                src={iconUrl}
                width="28"
              />
              <Box>
                <Box style={{ marginTop: recent ? -2 : undefined }}>{name}</Box>
                {recent && (
                  <Text
                    color={
                      currentlySelected
                        ? "accentColorForeground"
                        : "accentColor"
                    }
                    size="12"
                    style={{ lineHeight: 1, marginTop: -1 }}
                    weight="medium"
                  >
                    Recent
                  </Text>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </ActivePixelCard>
    </Box>
  );
};

ModalSelection.displayName = "ModalSelection";
