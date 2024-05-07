import React, { Fragment, useCallback, useContext } from "react";
import { Chain, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";

import { isMobile } from "../../utils/isMobile";
import { AsyncImage } from "../AsyncImage/AsyncImage";
import { Box } from "../Box/Box";
import { Dialog } from "../Dialog/Dialog";
import { DialogContent } from "../Dialog/DialogContent";
import { DisconnectSqIcon } from "../Icons/DisconnectSq";
import { MenuButton } from "../MenuButton/MenuButton";
import { AppContext } from "../RainbowKitProvider/AppContext";
import { useRainbowKitChains } from "../RainbowKitProvider/RainbowKitChainContext";
import { Text } from "../Text/Text";
import DialogClose from "../../../../components/DialogClose/DialogClose";
import { ActivePixelCard } from "../../../../components/PixelBtn/ActivePixelButton";

export interface ChainModalProps {
  fn: any;
  open: boolean;
  onClose: () => void;
}

export function ChainModal({ onClose, open, fn }: ChainModalProps) {
  const { chain: activeChain } = useNetwork();
  const { chains, pendingChainId, reset, switchNetwork } = useSwitchNetwork({
    onSettled: () => {
      reset(); // reset mutation variables (eg. pendingChainId, error)
      onClose();
    },
  });
  const { disconnect } = useDisconnect();
  const titleId = "rk_chain_modal_title";
  const mobile = isMobile();
  const unsupportedChain = activeChain?.unsupported ?? false;
  const chainIconSize = "24";

  const { appName } = useContext(AppContext);

  const rainbowkitChains = useRainbowKitChains();

  const chainClickHandle = useCallback(
    ({ isCurrentChain, chain }: { isCurrentChain: boolean; chain: Chain }) => {
      if (isCurrentChain) {
        return;
      } else {
        switchNetwork
          ? switchNetwork(chain.id)
          : console.error("not switchNetwork");
        if (fn) {
          fn(chain.id);
        }
      }
    },
    [fn, switchNetwork]
  );

  if (!activeChain || !activeChain?.id) {
    return null;
  }
  return (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent padding="0" bottomSheetOnMobile>
        <Box display="flex" flexDirection="column" gap="14" marginBottom="14">
          <ActivePixelCard
            pixel_height={10}
            className={`tvlPixelTable_header`}
            backgroundColor="#293457"
            height="64px"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              {mobile && <Box width="30" />}
              <Text as="h3" color="modalText" weight="bold" id={titleId}>
                Switch Networks
              </Text>
            </Box>
          </ActivePixelCard>
          {unsupportedChain && (
            <Box
              marginLeft="20"
              marginRight="20"
              textAlign={mobile ? "center" : "left"}
            >
              <Text color="modalTextSecondary" size="14" weight="medium">
                Wrong network detected, switch or disconnect to continue.
              </Text>
            </Box>
          )}
          <Box
            display="flex"
            flexDirection="column"
            gap="4"
            padding="2"
            style={{ maxHeight: mobile ? "80vh" : "70vh", overflowY: "scroll" }}
          >
            {switchNetwork ? (
              rainbowkitChains.map(
                ({ iconBackground, iconUrl, id, name }, idx) => {
                  const chain = chains.find((c) => c.id === id);

                  const isCurrentChain = chain
                    ? chain.id === activeChain?.id
                    : false;
                  const switching = chain
                    ? !isCurrentChain && chain.id === pendingChainId
                    : false;

                  if (!chain) {
                    return null;
                  }
                  return (
                    <Fragment key={chain.id}>
                      <MenuButton
                        disabled={false}
                        currentlySelected={isCurrentChain}
                        onClick={() =>
                          chainClickHandle({
                            isCurrentChain,
                            chain,
                          })
                        }
                        testId={`chain-option-${chain.id}`}
                      >
                        <Box fontFamily="body" fontSize="16">
                          <Box
                            alignItems="center"
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <Box
                              alignItems="center"
                              display="flex"
                              flexDirection="row"
                              gap="4"
                              height={chainIconSize}
                            >
                              {iconUrl && (
                                <Box height="full" marginRight="8">
                                  <AsyncImage
                                    alt={name ?? chain.name}
                                    background={iconBackground}
                                    borderRadius="full"
                                    height={chainIconSize}
                                    src={iconUrl}
                                    width={chainIconSize}
                                  />
                                </Box>
                              )}
                              <div>{chain.name ?? name}</div>
                            </Box>
                            {isCurrentChain && (
                              <Box
                                alignItems="center"
                                display="flex"
                                flexDirection="row"
                                marginRight="6"
                              >
                                <Text
                                  color="accentColorForeground"
                                  size="14"
                                  weight="medium"
                                >
                                  Connected
                                </Text>
                                <Box
                                  background="connectionIndicator"
                                  borderColor="connectionIndicatorBorder"
                                  borderRadius="full"
                                  borderStyle="solid"
                                  borderWidth="3"
                                  height="12"
                                  marginLeft="8"
                                  width="12"
                                />
                              </Box>
                            )}
                            {switching && (
                              <Box
                                alignItems="center"
                                display="flex"
                                flexDirection="row"
                                marginRight="6"
                              >
                                <Text
                                  color="modalText"
                                  size="14"
                                  weight="medium"
                                >
                                  Confirm in Wallet
                                </Text>
                                <Box
                                  background="standby"
                                  borderRadius="full"
                                  height="12"
                                  marginLeft="8"
                                  width="12"
                                  borderColor="standbyBorder"
                                  borderStyle="solid"
                                  borderWidth="3"
                                />
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </MenuButton>
                      {mobile && idx < rainbowkitChains.length - 1 && (
                        <Box
                          background="generalBorderDim"
                          height="1"
                          marginX="8"
                        />
                      )}
                    </Fragment>
                  );
                }
              )
            ) : (
              <Box
                background="generalBorder"
                borderRadius="menuButton"
                paddingX="18"
                paddingY="12"
              >
                <Text color="modalText" size="14" weight="medium">
                  Your wallet does not support switching networks from{" "}
                  {appName ?? "this app"}. Try switching networks from within
                  your wallet instead.
                </Text>
              </Box>
            )}
            {unsupportedChain && (
              <>
                <Box background="generalBorderDim" height="1" marginX="8" />
                <MenuButton
                  onClick={() => disconnect()}
                  testId="chain-option-disconnect"
                >
                  <Box color="error" fontFamily="body" fontSize="16">
                    <Box
                      alignItems="center"
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        gap="4"
                        height={chainIconSize}
                      >
                        <Box
                          alignItems="center"
                          color="error"
                          height={chainIconSize}
                          justifyContent="center"
                          marginRight="8"
                        >
                          <DisconnectSqIcon size={Number(chainIconSize)} />
                        </Box>
                        <div>Disconnect</div>
                      </Box>
                    </Box>
                  </Box>
                </MenuButton>
              </>
            )}
          </Box>
        </Box>
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
}
