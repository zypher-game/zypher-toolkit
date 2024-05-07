export function baseTheme({ borderRadius, fontStack, overlayBlur }: {
    borderRadius?: string | undefined;
    fontStack?: string | undefined;
    overlayBlur?: string | undefined;
}): {
    blurs: {
        modalOverlay: any;
    };
    fonts: {
        body: any;
    };
    radii: {
        actionButton: any;
        connectButton: any;
        menuButton: any;
        modal: any;
        modalMobile: any;
    };
};
