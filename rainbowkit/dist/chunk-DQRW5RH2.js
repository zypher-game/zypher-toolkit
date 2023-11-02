"use client";
import {
  lightTheme
} from "./chunk-DAGN7GXN.js";

// src/components/ConnectButton/ConnectButton.tsx
import React55 from "react";

// src/css/sprinkles.css.ts
import { createMapValueFn as _51c72 } from "@vanilla-extract/sprinkles/createUtils";
import { createNormalizeValueFn as _a49f6 } from "@vanilla-extract/sprinkles/createUtils";
import { createSprinkles as _ad221 } from "@vanilla-extract/sprinkles/createRuntimeSprinkles";
var largeScreenMinWidth = 768;
var mapResponsiveValue = _51c72({ conditions: { defaultCondition: "smallScreen", conditionNames: ["smallScreen", "largeScreen"], responsiveArray: void 0 } });
var normalizeResponsiveValue = _a49f6({ conditions: { defaultCondition: "smallScreen", conditionNames: ["smallScreen", "largeScreen"], responsiveArray: void 0 } });
var sprinkles = _ad221({ conditions: { defaultCondition: "base", conditionNames: ["base", "hover", "active"], responsiveArray: void 0 }, styles: { background: { values: { accentColor: { conditions: { base: "sprinkles_background_accentColor_base__ju367v9h", hover: "sprinkles_background_accentColor_hover__ju367v9i", active: "sprinkles_background_accentColor_active__ju367v9j" }, defaultClass: "sprinkles_background_accentColor_base__ju367v9h" }, accentColorForeground: { conditions: { base: "sprinkles_background_accentColorForeground_base__ju367v9k", hover: "sprinkles_background_accentColorForeground_hover__ju367v9l", active: "sprinkles_background_accentColorForeground_active__ju367v9m" }, defaultClass: "sprinkles_background_accentColorForeground_base__ju367v9k" }, actionButtonBorder: { conditions: { base: "sprinkles_background_actionButtonBorder_base__ju367v9n", hover: "sprinkles_background_actionButtonBorder_hover__ju367v9o", active: "sprinkles_background_actionButtonBorder_active__ju367v9p" }, defaultClass: "sprinkles_background_actionButtonBorder_base__ju367v9n" }, actionButtonBorderMobile: { conditions: { base: "sprinkles_background_actionButtonBorderMobile_base__ju367v9q", hover: "sprinkles_background_actionButtonBorderMobile_hover__ju367v9r", active: "sprinkles_background_actionButtonBorderMobile_active__ju367v9s" }, defaultClass: "sprinkles_background_actionButtonBorderMobile_base__ju367v9q" }, actionButtonSecondaryBackground: { conditions: { base: "sprinkles_background_actionButtonSecondaryBackground_base__ju367v9t", hover: "sprinkles_background_actionButtonSecondaryBackground_hover__ju367v9u", active: "sprinkles_background_actionButtonSecondaryBackground_active__ju367v9v" }, defaultClass: "sprinkles_background_actionButtonSecondaryBackground_base__ju367v9t" }, closeButton: { conditions: { base: "sprinkles_background_closeButton_base__ju367v9w", hover: "sprinkles_background_closeButton_hover__ju367v9x", active: "sprinkles_background_closeButton_active__ju367v9y" }, defaultClass: "sprinkles_background_closeButton_base__ju367v9w" }, closeButtonBackground: { conditions: { base: "sprinkles_background_closeButtonBackground_base__ju367v9z", hover: "sprinkles_background_closeButtonBackground_hover__ju367va0", active: "sprinkles_background_closeButtonBackground_active__ju367va1" }, defaultClass: "sprinkles_background_closeButtonBackground_base__ju367v9z" }, connectButtonBackground: { conditions: { base: "sprinkles_background_connectButtonBackground_base__ju367va2", hover: "sprinkles_background_connectButtonBackground_hover__ju367va3", active: "sprinkles_background_connectButtonBackground_active__ju367va4" }, defaultClass: "sprinkles_background_connectButtonBackground_base__ju367va2" }, connectButtonBackgroundError: { conditions: { base: "sprinkles_background_connectButtonBackgroundError_base__ju367va5", hover: "sprinkles_background_connectButtonBackgroundError_hover__ju367va6", active: "sprinkles_background_connectButtonBackgroundError_active__ju367va7" }, defaultClass: "sprinkles_background_connectButtonBackgroundError_base__ju367va5" }, connectButtonInnerBackground: { conditions: { base: "sprinkles_background_connectButtonInnerBackground_base__ju367va8", hover: "sprinkles_background_connectButtonInnerBackground_hover__ju367va9", active: "sprinkles_background_connectButtonInnerBackground_active__ju367vaa" }, defaultClass: "sprinkles_background_connectButtonInnerBackground_base__ju367va8" }, connectButtonText: { conditions: { base: "sprinkles_background_connectButtonText_base__ju367vab", hover: "sprinkles_background_connectButtonText_hover__ju367vac", active: "sprinkles_background_connectButtonText_active__ju367vad" }, defaultClass: "sprinkles_background_connectButtonText_base__ju367vab" }, connectButtonTextError: { conditions: { base: "sprinkles_background_connectButtonTextError_base__ju367vae", hover: "sprinkles_background_connectButtonTextError_hover__ju367vaf", active: "sprinkles_background_connectButtonTextError_active__ju367vag" }, defaultClass: "sprinkles_background_connectButtonTextError_base__ju367vae" }, connectionIndicator: { conditions: { base: "sprinkles_background_connectionIndicator_base__ju367vah", hover: "sprinkles_background_connectionIndicator_hover__ju367vai", active: "sprinkles_background_connectionIndicator_active__ju367vaj" }, defaultClass: "sprinkles_background_connectionIndicator_base__ju367vah" }, connectionIndicatorBorder: { conditions: { base: "sprinkles_background_connectionIndicatorBorder_base__ju367vak", hover: "sprinkles_background_connectionIndicatorBorder_hover__ju367val", active: "sprinkles_background_connectionIndicatorBorder_active__ju367vam" }, defaultClass: "sprinkles_background_connectionIndicatorBorder_base__ju367vak" }, downloadBottomCardBackground: { conditions: { base: "sprinkles_background_downloadBottomCardBackground_base__ju367van", hover: "sprinkles_background_downloadBottomCardBackground_hover__ju367vao", active: "sprinkles_background_downloadBottomCardBackground_active__ju367vap" }, defaultClass: "sprinkles_background_downloadBottomCardBackground_base__ju367van" }, downloadTopCardBackground: { conditions: { base: "sprinkles_background_downloadTopCardBackground_base__ju367vaq", hover: "sprinkles_background_downloadTopCardBackground_hover__ju367var", active: "sprinkles_background_downloadTopCardBackground_active__ju367vas" }, defaultClass: "sprinkles_background_downloadTopCardBackground_base__ju367vaq" }, error: { conditions: { base: "sprinkles_background_error_base__ju367vat", hover: "sprinkles_background_error_hover__ju367vau", active: "sprinkles_background_error_active__ju367vav" }, defaultClass: "sprinkles_background_error_base__ju367vat" }, generalBorder: { conditions: { base: "sprinkles_background_generalBorder_base__ju367vaw", hover: "sprinkles_background_generalBorder_hover__ju367vax", active: "sprinkles_background_generalBorder_active__ju367vay" }, defaultClass: "sprinkles_background_generalBorder_base__ju367vaw" }, generalBorderDim: { conditions: { base: "sprinkles_background_generalBorderDim_base__ju367vaz", hover: "sprinkles_background_generalBorderDim_hover__ju367vb0", active: "sprinkles_background_generalBorderDim_active__ju367vb1" }, defaultClass: "sprinkles_background_generalBorderDim_base__ju367vaz" }, menuItemBackground: { conditions: { base: "sprinkles_background_menuItemBackground_base__ju367vb2", hover: "sprinkles_background_menuItemBackground_hover__ju367vb3", active: "sprinkles_background_menuItemBackground_active__ju367vb4" }, defaultClass: "sprinkles_background_menuItemBackground_base__ju367vb2" }, modalBackdrop: { conditions: { base: "sprinkles_background_modalBackdrop_base__ju367vb5", hover: "sprinkles_background_modalBackdrop_hover__ju367vb6", active: "sprinkles_background_modalBackdrop_active__ju367vb7" }, defaultClass: "sprinkles_background_modalBackdrop_base__ju367vb5" }, modalBackground: { conditions: { base: "sprinkles_background_modalBackground_base__ju367vb8", hover: "sprinkles_background_modalBackground_hover__ju367vb9", active: "sprinkles_background_modalBackground_active__ju367vba" }, defaultClass: "sprinkles_background_modalBackground_base__ju367vb8" }, modalBorder: { conditions: { base: "sprinkles_background_modalBorder_base__ju367vbb", hover: "sprinkles_background_modalBorder_hover__ju367vbc", active: "sprinkles_background_modalBorder_active__ju367vbd" }, defaultClass: "sprinkles_background_modalBorder_base__ju367vbb" }, modalText: { conditions: { base: "sprinkles_background_modalText_base__ju367vbe", hover: "sprinkles_background_modalText_hover__ju367vbf", active: "sprinkles_background_modalText_active__ju367vbg" }, defaultClass: "sprinkles_background_modalText_base__ju367vbe" }, modalTextDim: { conditions: { base: "sprinkles_background_modalTextDim_base__ju367vbh", hover: "sprinkles_background_modalTextDim_hover__ju367vbi", active: "sprinkles_background_modalTextDim_active__ju367vbj" }, defaultClass: "sprinkles_background_modalTextDim_base__ju367vbh" }, modalTextSecondary: { conditions: { base: "sprinkles_background_modalTextSecondary_base__ju367vbk", hover: "sprinkles_background_modalTextSecondary_hover__ju367vbl", active: "sprinkles_background_modalTextSecondary_active__ju367vbm" }, defaultClass: "sprinkles_background_modalTextSecondary_base__ju367vbk" }, profileAction: { conditions: { base: "sprinkles_background_profileAction_base__ju367vbn", hover: "sprinkles_background_profileAction_hover__ju367vbo", active: "sprinkles_background_profileAction_active__ju367vbp" }, defaultClass: "sprinkles_background_profileAction_base__ju367vbn" }, profileActionHover: { conditions: { base: "sprinkles_background_profileActionHover_base__ju367vbq", hover: "sprinkles_background_profileActionHover_hover__ju367vbr", active: "sprinkles_background_profileActionHover_active__ju367vbs" }, defaultClass: "sprinkles_background_profileActionHover_base__ju367vbq" }, profileForeground: { conditions: { base: "sprinkles_background_profileForeground_base__ju367vbt", hover: "sprinkles_background_profileForeground_hover__ju367vbu", active: "sprinkles_background_profileForeground_active__ju367vbv" }, defaultClass: "sprinkles_background_profileForeground_base__ju367vbt" }, selectedOptionBorder: { conditions: { base: "sprinkles_background_selectedOptionBorder_base__ju367vbw", hover: "sprinkles_background_selectedOptionBorder_hover__ju367vbx", active: "sprinkles_background_selectedOptionBorder_active__ju367vby" }, defaultClass: "sprinkles_background_selectedOptionBorder_base__ju367vbw" }, standby: { conditions: { base: "sprinkles_background_standby_base__ju367vbz", hover: "sprinkles_background_standby_hover__ju367vc0", active: "sprinkles_background_standby_active__ju367vc1" }, defaultClass: "sprinkles_background_standby_base__ju367vbz" }, standbyBorder: { conditions: { base: "sprinkles_background_standbyBorder_base__ju367vc2", hover: "sprinkles_background_standbyBorder_hover__ju367vc3", active: "sprinkles_background_standbyBorder_active__ju367vc4" }, defaultClass: "sprinkles_background_standbyBorder_base__ju367vc2" } } }, borderColor: { values: { accentColor: { conditions: { base: "sprinkles_borderColor_accentColor_base__ju367vc5", hover: "sprinkles_borderColor_accentColor_hover__ju367vc6", active: "sprinkles_borderColor_accentColor_active__ju367vc7" }, defaultClass: "sprinkles_borderColor_accentColor_base__ju367vc5" }, accentColorForeground: { conditions: { base: "sprinkles_borderColor_accentColorForeground_base__ju367vc8", hover: "sprinkles_borderColor_accentColorForeground_hover__ju367vc9", active: "sprinkles_borderColor_accentColorForeground_active__ju367vca" }, defaultClass: "sprinkles_borderColor_accentColorForeground_base__ju367vc8" }, actionButtonBorder: { conditions: { base: "sprinkles_borderColor_actionButtonBorder_base__ju367vcb", hover: "sprinkles_borderColor_actionButtonBorder_hover__ju367vcc", active: "sprinkles_borderColor_actionButtonBorder_active__ju367vcd" }, defaultClass: "sprinkles_borderColor_actionButtonBorder_base__ju367vcb" }, actionButtonBorderMobile: { conditions: { base: "sprinkles_borderColor_actionButtonBorderMobile_base__ju367vce", hover: "sprinkles_borderColor_actionButtonBorderMobile_hover__ju367vcf", active: "sprinkles_borderColor_actionButtonBorderMobile_active__ju367vcg" }, defaultClass: "sprinkles_borderColor_actionButtonBorderMobile_base__ju367vce" }, actionButtonSecondaryBackground: { conditions: { base: "sprinkles_borderColor_actionButtonSecondaryBackground_base__ju367vch", hover: "sprinkles_borderColor_actionButtonSecondaryBackground_hover__ju367vci", active: "sprinkles_borderColor_actionButtonSecondaryBackground_active__ju367vcj" }, defaultClass: "sprinkles_borderColor_actionButtonSecondaryBackground_base__ju367vch" }, closeButton: { conditions: { base: "sprinkles_borderColor_closeButton_base__ju367vck", hover: "sprinkles_borderColor_closeButton_hover__ju367vcl", active: "sprinkles_borderColor_closeButton_active__ju367vcm" }, defaultClass: "sprinkles_borderColor_closeButton_base__ju367vck" }, closeButtonBackground: { conditions: { base: "sprinkles_borderColor_closeButtonBackground_base__ju367vcn", hover: "sprinkles_borderColor_closeButtonBackground_hover__ju367vco", active: "sprinkles_borderColor_closeButtonBackground_active__ju367vcp" }, defaultClass: "sprinkles_borderColor_closeButtonBackground_base__ju367vcn" }, connectButtonBackground: { conditions: { base: "sprinkles_borderColor_connectButtonBackground_base__ju367vcq", hover: "sprinkles_borderColor_connectButtonBackground_hover__ju367vcr", active: "sprinkles_borderColor_connectButtonBackground_active__ju367vcs" }, defaultClass: "sprinkles_borderColor_connectButtonBackground_base__ju367vcq" }, connectButtonBackgroundError: { conditions: { base: "sprinkles_borderColor_connectButtonBackgroundError_base__ju367vct", hover: "sprinkles_borderColor_connectButtonBackgroundError_hover__ju367vcu", active: "sprinkles_borderColor_connectButtonBackgroundError_active__ju367vcv" }, defaultClass: "sprinkles_borderColor_connectButtonBackgroundError_base__ju367vct" }, connectButtonInnerBackground: { conditions: { base: "sprinkles_borderColor_connectButtonInnerBackground_base__ju367vcw", hover: "sprinkles_borderColor_connectButtonInnerBackground_hover__ju367vcx", active: "sprinkles_borderColor_connectButtonInnerBackground_active__ju367vcy" }, defaultClass: "sprinkles_borderColor_connectButtonInnerBackground_base__ju367vcw" }, connectButtonText: { conditions: { base: "sprinkles_borderColor_connectButtonText_base__ju367vcz", hover: "sprinkles_borderColor_connectButtonText_hover__ju367vd0", active: "sprinkles_borderColor_connectButtonText_active__ju367vd1" }, defaultClass: "sprinkles_borderColor_connectButtonText_base__ju367vcz" }, connectButtonTextError: { conditions: { base: "sprinkles_borderColor_connectButtonTextError_base__ju367vd2", hover: "sprinkles_borderColor_connectButtonTextError_hover__ju367vd3", active: "sprinkles_borderColor_connectButtonTextError_active__ju367vd4" }, defaultClass: "sprinkles_borderColor_connectButtonTextError_base__ju367vd2" }, connectionIndicator: { conditions: { base: "sprinkles_borderColor_connectionIndicator_base__ju367vd5", hover: "sprinkles_borderColor_connectionIndicator_hover__ju367vd6", active: "sprinkles_borderColor_connectionIndicator_active__ju367vd7" }, defaultClass: "sprinkles_borderColor_connectionIndicator_base__ju367vd5" }, connectionIndicatorBorder: { conditions: { base: "sprinkles_borderColor_connectionIndicatorBorder_base__ju367vd8", hover: "sprinkles_borderColor_connectionIndicatorBorder_hover__ju367vd9", active: "sprinkles_borderColor_connectionIndicatorBorder_active__ju367vda" }, defaultClass: "sprinkles_borderColor_connectionIndicatorBorder_base__ju367vd8" }, downloadBottomCardBackground: { conditions: { base: "sprinkles_borderColor_downloadBottomCardBackground_base__ju367vdb", hover: "sprinkles_borderColor_downloadBottomCardBackground_hover__ju367vdc", active: "sprinkles_borderColor_downloadBottomCardBackground_active__ju367vdd" }, defaultClass: "sprinkles_borderColor_downloadBottomCardBackground_base__ju367vdb" }, downloadTopCardBackground: { conditions: { base: "sprinkles_borderColor_downloadTopCardBackground_base__ju367vde", hover: "sprinkles_borderColor_downloadTopCardBackground_hover__ju367vdf", active: "sprinkles_borderColor_downloadTopCardBackground_active__ju367vdg" }, defaultClass: "sprinkles_borderColor_downloadTopCardBackground_base__ju367vde" }, error: { conditions: { base: "sprinkles_borderColor_error_base__ju367vdh", hover: "sprinkles_borderColor_error_hover__ju367vdi", active: "sprinkles_borderColor_error_active__ju367vdj" }, defaultClass: "sprinkles_borderColor_error_base__ju367vdh" }, generalBorder: { conditions: { base: "sprinkles_borderColor_generalBorder_base__ju367vdk", hover: "sprinkles_borderColor_generalBorder_hover__ju367vdl", active: "sprinkles_borderColor_generalBorder_active__ju367vdm" }, defaultClass: "sprinkles_borderColor_generalBorder_base__ju367vdk" }, generalBorderDim: { conditions: { base: "sprinkles_borderColor_generalBorderDim_base__ju367vdn", hover: "sprinkles_borderColor_generalBorderDim_hover__ju367vdo", active: "sprinkles_borderColor_generalBorderDim_active__ju367vdp" }, defaultClass: "sprinkles_borderColor_generalBorderDim_base__ju367vdn" }, menuItemBackground: { conditions: { base: "sprinkles_borderColor_menuItemBackground_base__ju367vdq", hover: "sprinkles_borderColor_menuItemBackground_hover__ju367vdr", active: "sprinkles_borderColor_menuItemBackground_active__ju367vds" }, defaultClass: "sprinkles_borderColor_menuItemBackground_base__ju367vdq" }, modalBackdrop: { conditions: { base: "sprinkles_borderColor_modalBackdrop_base__ju367vdt", hover: "sprinkles_borderColor_modalBackdrop_hover__ju367vdu", active: "sprinkles_borderColor_modalBackdrop_active__ju367vdv" }, defaultClass: "sprinkles_borderColor_modalBackdrop_base__ju367vdt" }, modalBackground: { conditions: { base: "sprinkles_borderColor_modalBackground_base__ju367vdw", hover: "sprinkles_borderColor_modalBackground_hover__ju367vdx", active: "sprinkles_borderColor_modalBackground_active__ju367vdy" }, defaultClass: "sprinkles_borderColor_modalBackground_base__ju367vdw" }, modalBorder: { conditions: { base: "sprinkles_borderColor_modalBorder_base__ju367vdz", hover: "sprinkles_borderColor_modalBorder_hover__ju367ve0", active: "sprinkles_borderColor_modalBorder_active__ju367ve1" }, defaultClass: "sprinkles_borderColor_modalBorder_base__ju367vdz" }, modalText: { conditions: { base: "sprinkles_borderColor_modalText_base__ju367ve2", hover: "sprinkles_borderColor_modalText_hover__ju367ve3", active: "sprinkles_borderColor_modalText_active__ju367ve4" }, defaultClass: "sprinkles_borderColor_modalText_base__ju367ve2" }, modalTextDim: { conditions: { base: "sprinkles_borderColor_modalTextDim_base__ju367ve5", hover: "sprinkles_borderColor_modalTextDim_hover__ju367ve6", active: "sprinkles_borderColor_modalTextDim_active__ju367ve7" }, defaultClass: "sprinkles_borderColor_modalTextDim_base__ju367ve5" }, modalTextSecondary: { conditions: { base: "sprinkles_borderColor_modalTextSecondary_base__ju367ve8", hover: "sprinkles_borderColor_modalTextSecondary_hover__ju367ve9", active: "sprinkles_borderColor_modalTextSecondary_active__ju367vea" }, defaultClass: "sprinkles_borderColor_modalTextSecondary_base__ju367ve8" }, profileAction: { conditions: { base: "sprinkles_borderColor_profileAction_base__ju367veb", hover: "sprinkles_borderColor_profileAction_hover__ju367vec", active: "sprinkles_borderColor_profileAction_active__ju367ved" }, defaultClass: "sprinkles_borderColor_profileAction_base__ju367veb" }, profileActionHover: { conditions: { base: "sprinkles_borderColor_profileActionHover_base__ju367vee", hover: "sprinkles_borderColor_profileActionHover_hover__ju367vef", active: "sprinkles_borderColor_profileActionHover_active__ju367veg" }, defaultClass: "sprinkles_borderColor_profileActionHover_base__ju367vee" }, profileForeground: { conditions: { base: "sprinkles_borderColor_profileForeground_base__ju367veh", hover: "sprinkles_borderColor_profileForeground_hover__ju367vei", active: "sprinkles_borderColor_profileForeground_active__ju367vej" }, defaultClass: "sprinkles_borderColor_profileForeground_base__ju367veh" }, selectedOptionBorder: { conditions: { base: "sprinkles_borderColor_selectedOptionBorder_base__ju367vek", hover: "sprinkles_borderColor_selectedOptionBorder_hover__ju367vel", active: "sprinkles_borderColor_selectedOptionBorder_active__ju367vem" }, defaultClass: "sprinkles_borderColor_selectedOptionBorder_base__ju367vek" }, standby: { conditions: { base: "sprinkles_borderColor_standby_base__ju367ven", hover: "sprinkles_borderColor_standby_hover__ju367veo", active: "sprinkles_borderColor_standby_active__ju367vep" }, defaultClass: "sprinkles_borderColor_standby_base__ju367ven" }, standbyBorder: { conditions: { base: "sprinkles_borderColor_standbyBorder_base__ju367veq", hover: "sprinkles_borderColor_standbyBorder_hover__ju367ver", active: "sprinkles_borderColor_standbyBorder_active__ju367ves" }, defaultClass: "sprinkles_borderColor_standbyBorder_base__ju367veq" } } }, boxShadow: { values: { connectButton: { conditions: { base: "sprinkles_boxShadow_connectButton_base__ju367vet", hover: "sprinkles_boxShadow_connectButton_hover__ju367veu", active: "sprinkles_boxShadow_connectButton_active__ju367vev" }, defaultClass: "sprinkles_boxShadow_connectButton_base__ju367vet" }, dialog: { conditions: { base: "sprinkles_boxShadow_dialog_base__ju367vew", hover: "sprinkles_boxShadow_dialog_hover__ju367vex", active: "sprinkles_boxShadow_dialog_active__ju367vey" }, defaultClass: "sprinkles_boxShadow_dialog_base__ju367vew" }, profileDetailsAction: { conditions: { base: "sprinkles_boxShadow_profileDetailsAction_base__ju367vez", hover: "sprinkles_boxShadow_profileDetailsAction_hover__ju367vf0", active: "sprinkles_boxShadow_profileDetailsAction_active__ju367vf1" }, defaultClass: "sprinkles_boxShadow_profileDetailsAction_base__ju367vez" }, selectedOption: { conditions: { base: "sprinkles_boxShadow_selectedOption_base__ju367vf2", hover: "sprinkles_boxShadow_selectedOption_hover__ju367vf3", active: "sprinkles_boxShadow_selectedOption_active__ju367vf4" }, defaultClass: "sprinkles_boxShadow_selectedOption_base__ju367vf2" }, selectedWallet: { conditions: { base: "sprinkles_boxShadow_selectedWallet_base__ju367vf5", hover: "sprinkles_boxShadow_selectedWallet_hover__ju367vf6", active: "sprinkles_boxShadow_selectedWallet_active__ju367vf7" }, defaultClass: "sprinkles_boxShadow_selectedWallet_base__ju367vf5" }, walletLogo: { conditions: { base: "sprinkles_boxShadow_walletLogo_base__ju367vf8", hover: "sprinkles_boxShadow_walletLogo_hover__ju367vf9", active: "sprinkles_boxShadow_walletLogo_active__ju367vfa" }, defaultClass: "sprinkles_boxShadow_walletLogo_base__ju367vf8" } } }, color: { values: { accentColor: { conditions: { base: "sprinkles_color_accentColor_base__ju367vfb", hover: "sprinkles_color_accentColor_hover__ju367vfc", active: "sprinkles_color_accentColor_active__ju367vfd" }, defaultClass: "sprinkles_color_accentColor_base__ju367vfb" }, accentColorForeground: { conditions: { base: "sprinkles_color_accentColorForeground_base__ju367vfe", hover: "sprinkles_color_accentColorForeground_hover__ju367vff", active: "sprinkles_color_accentColorForeground_active__ju367vfg" }, defaultClass: "sprinkles_color_accentColorForeground_base__ju367vfe" }, actionButtonBorder: { conditions: { base: "sprinkles_color_actionButtonBorder_base__ju367vfh", hover: "sprinkles_color_actionButtonBorder_hover__ju367vfi", active: "sprinkles_color_actionButtonBorder_active__ju367vfj" }, defaultClass: "sprinkles_color_actionButtonBorder_base__ju367vfh" }, actionButtonBorderMobile: { conditions: { base: "sprinkles_color_actionButtonBorderMobile_base__ju367vfk", hover: "sprinkles_color_actionButtonBorderMobile_hover__ju367vfl", active: "sprinkles_color_actionButtonBorderMobile_active__ju367vfm" }, defaultClass: "sprinkles_color_actionButtonBorderMobile_base__ju367vfk" }, actionButtonSecondaryBackground: { conditions: { base: "sprinkles_color_actionButtonSecondaryBackground_base__ju367vfn", hover: "sprinkles_color_actionButtonSecondaryBackground_hover__ju367vfo", active: "sprinkles_color_actionButtonSecondaryBackground_active__ju367vfp" }, defaultClass: "sprinkles_color_actionButtonSecondaryBackground_base__ju367vfn" }, closeButton: { conditions: { base: "sprinkles_color_closeButton_base__ju367vfq", hover: "sprinkles_color_closeButton_hover__ju367vfr", active: "sprinkles_color_closeButton_active__ju367vfs" }, defaultClass: "sprinkles_color_closeButton_base__ju367vfq" }, closeButtonBackground: { conditions: { base: "sprinkles_color_closeButtonBackground_base__ju367vft", hover: "sprinkles_color_closeButtonBackground_hover__ju367vfu", active: "sprinkles_color_closeButtonBackground_active__ju367vfv" }, defaultClass: "sprinkles_color_closeButtonBackground_base__ju367vft" }, connectButtonBackground: { conditions: { base: "sprinkles_color_connectButtonBackground_base__ju367vfw", hover: "sprinkles_color_connectButtonBackground_hover__ju367vfx", active: "sprinkles_color_connectButtonBackground_active__ju367vfy" }, defaultClass: "sprinkles_color_connectButtonBackground_base__ju367vfw" }, connectButtonBackgroundError: { conditions: { base: "sprinkles_color_connectButtonBackgroundError_base__ju367vfz", hover: "sprinkles_color_connectButtonBackgroundError_hover__ju367vg0", active: "sprinkles_color_connectButtonBackgroundError_active__ju367vg1" }, defaultClass: "sprinkles_color_connectButtonBackgroundError_base__ju367vfz" }, connectButtonInnerBackground: { conditions: { base: "sprinkles_color_connectButtonInnerBackground_base__ju367vg2", hover: "sprinkles_color_connectButtonInnerBackground_hover__ju367vg3", active: "sprinkles_color_connectButtonInnerBackground_active__ju367vg4" }, defaultClass: "sprinkles_color_connectButtonInnerBackground_base__ju367vg2" }, connectButtonText: { conditions: { base: "sprinkles_color_connectButtonText_base__ju367vg5", hover: "sprinkles_color_connectButtonText_hover__ju367vg6", active: "sprinkles_color_connectButtonText_active__ju367vg7" }, defaultClass: "sprinkles_color_connectButtonText_base__ju367vg5" }, connectButtonTextError: { conditions: { base: "sprinkles_color_connectButtonTextError_base__ju367vg8", hover: "sprinkles_color_connectButtonTextError_hover__ju367vg9", active: "sprinkles_color_connectButtonTextError_active__ju367vga" }, defaultClass: "sprinkles_color_connectButtonTextError_base__ju367vg8" }, connectionIndicator: { conditions: { base: "sprinkles_color_connectionIndicator_base__ju367vgb", hover: "sprinkles_color_connectionIndicator_hover__ju367vgc", active: "sprinkles_color_connectionIndicator_active__ju367vgd" }, defaultClass: "sprinkles_color_connectionIndicator_base__ju367vgb" }, connectionIndicatorBorder: { conditions: { base: "sprinkles_color_connectionIndicatorBorder_base__ju367vge", hover: "sprinkles_color_connectionIndicatorBorder_hover__ju367vgf", active: "sprinkles_color_connectionIndicatorBorder_active__ju367vgg" }, defaultClass: "sprinkles_color_connectionIndicatorBorder_base__ju367vge" }, downloadBottomCardBackground: { conditions: { base: "sprinkles_color_downloadBottomCardBackground_base__ju367vgh", hover: "sprinkles_color_downloadBottomCardBackground_hover__ju367vgi", active: "sprinkles_color_downloadBottomCardBackground_active__ju367vgj" }, defaultClass: "sprinkles_color_downloadBottomCardBackground_base__ju367vgh" }, downloadTopCardBackground: { conditions: { base: "sprinkles_color_downloadTopCardBackground_base__ju367vgk", hover: "sprinkles_color_downloadTopCardBackground_hover__ju367vgl", active: "sprinkles_color_downloadTopCardBackground_active__ju367vgm" }, defaultClass: "sprinkles_color_downloadTopCardBackground_base__ju367vgk" }, error: { conditions: { base: "sprinkles_color_error_base__ju367vgn", hover: "sprinkles_color_error_hover__ju367vgo", active: "sprinkles_color_error_active__ju367vgp" }, defaultClass: "sprinkles_color_error_base__ju367vgn" }, generalBorder: { conditions: { base: "sprinkles_color_generalBorder_base__ju367vgq", hover: "sprinkles_color_generalBorder_hover__ju367vgr", active: "sprinkles_color_generalBorder_active__ju367vgs" }, defaultClass: "sprinkles_color_generalBorder_base__ju367vgq" }, generalBorderDim: { conditions: { base: "sprinkles_color_generalBorderDim_base__ju367vgt", hover: "sprinkles_color_generalBorderDim_hover__ju367vgu", active: "sprinkles_color_generalBorderDim_active__ju367vgv" }, defaultClass: "sprinkles_color_generalBorderDim_base__ju367vgt" }, menuItemBackground: { conditions: { base: "sprinkles_color_menuItemBackground_base__ju367vgw", hover: "sprinkles_color_menuItemBackground_hover__ju367vgx", active: "sprinkles_color_menuItemBackground_active__ju367vgy" }, defaultClass: "sprinkles_color_menuItemBackground_base__ju367vgw" }, modalBackdrop: { conditions: { base: "sprinkles_color_modalBackdrop_base__ju367vgz", hover: "sprinkles_color_modalBackdrop_hover__ju367vh0", active: "sprinkles_color_modalBackdrop_active__ju367vh1" }, defaultClass: "sprinkles_color_modalBackdrop_base__ju367vgz" }, modalBackground: { conditions: { base: "sprinkles_color_modalBackground_base__ju367vh2", hover: "sprinkles_color_modalBackground_hover__ju367vh3", active: "sprinkles_color_modalBackground_active__ju367vh4" }, defaultClass: "sprinkles_color_modalBackground_base__ju367vh2" }, modalBorder: { conditions: { base: "sprinkles_color_modalBorder_base__ju367vh5", hover: "sprinkles_color_modalBorder_hover__ju367vh6", active: "sprinkles_color_modalBorder_active__ju367vh7" }, defaultClass: "sprinkles_color_modalBorder_base__ju367vh5" }, modalText: { conditions: { base: "sprinkles_color_modalText_base__ju367vh8", hover: "sprinkles_color_modalText_hover__ju367vh9", active: "sprinkles_color_modalText_active__ju367vha" }, defaultClass: "sprinkles_color_modalText_base__ju367vh8" }, modalTextDim: { conditions: { base: "sprinkles_color_modalTextDim_base__ju367vhb", hover: "sprinkles_color_modalTextDim_hover__ju367vhc", active: "sprinkles_color_modalTextDim_active__ju367vhd" }, defaultClass: "sprinkles_color_modalTextDim_base__ju367vhb" }, modalTextSecondary: { conditions: { base: "sprinkles_color_modalTextSecondary_base__ju367vhe", hover: "sprinkles_color_modalTextSecondary_hover__ju367vhf", active: "sprinkles_color_modalTextSecondary_active__ju367vhg" }, defaultClass: "sprinkles_color_modalTextSecondary_base__ju367vhe" }, profileAction: { conditions: { base: "sprinkles_color_profileAction_base__ju367vhh", hover: "sprinkles_color_profileAction_hover__ju367vhi", active: "sprinkles_color_profileAction_active__ju367vhj" }, defaultClass: "sprinkles_color_profileAction_base__ju367vhh" }, profileActionHover: { conditions: { base: "sprinkles_color_profileActionHover_base__ju367vhk", hover: "sprinkles_color_profileActionHover_hover__ju367vhl", active: "sprinkles_color_profileActionHover_active__ju367vhm" }, defaultClass: "sprinkles_color_profileActionHover_base__ju367vhk" }, profileForeground: { conditions: { base: "sprinkles_color_profileForeground_base__ju367vhn", hover: "sprinkles_color_profileForeground_hover__ju367vho", active: "sprinkles_color_profileForeground_active__ju367vhp" }, defaultClass: "sprinkles_color_profileForeground_base__ju367vhn" }, selectedOptionBorder: { conditions: { base: "sprinkles_color_selectedOptionBorder_base__ju367vhq", hover: "sprinkles_color_selectedOptionBorder_hover__ju367vhr", active: "sprinkles_color_selectedOptionBorder_active__ju367vhs" }, defaultClass: "sprinkles_color_selectedOptionBorder_base__ju367vhq" }, standby: { conditions: { base: "sprinkles_color_standby_base__ju367vht", hover: "sprinkles_color_standby_hover__ju367vhu", active: "sprinkles_color_standby_active__ju367vhv" }, defaultClass: "sprinkles_color_standby_base__ju367vht" }, standbyBorder: { conditions: { base: "sprinkles_color_standbyBorder_base__ju367vhw", hover: "sprinkles_color_standbyBorder_hover__ju367vhx", active: "sprinkles_color_standbyBorder_active__ju367vhy" }, defaultClass: "sprinkles_color_standbyBorder_base__ju367vhw" } } } } }, { conditions: { defaultCondition: "smallScreen", conditionNames: ["smallScreen", "largeScreen"], responsiveArray: void 0 }, styles: { alignItems: { values: { "flex-start": { conditions: { smallScreen: "sprinkles_alignItems_flex-start_smallScreen__ju367v0", largeScreen: "sprinkles_alignItems_flex-start_largeScreen__ju367v1" }, defaultClass: "sprinkles_alignItems_flex-start_smallScreen__ju367v0" }, "flex-end": { conditions: { smallScreen: "sprinkles_alignItems_flex-end_smallScreen__ju367v2", largeScreen: "sprinkles_alignItems_flex-end_largeScreen__ju367v3" }, defaultClass: "sprinkles_alignItems_flex-end_smallScreen__ju367v2" }, center: { conditions: { smallScreen: "sprinkles_alignItems_center_smallScreen__ju367v4", largeScreen: "sprinkles_alignItems_center_largeScreen__ju367v5" }, defaultClass: "sprinkles_alignItems_center_smallScreen__ju367v4" } } }, display: { values: { none: { conditions: { smallScreen: "sprinkles_display_none_smallScreen__ju367v6", largeScreen: "sprinkles_display_none_largeScreen__ju367v7" }, defaultClass: "sprinkles_display_none_smallScreen__ju367v6" }, block: { conditions: { smallScreen: "sprinkles_display_block_smallScreen__ju367v8", largeScreen: "sprinkles_display_block_largeScreen__ju367v9" }, defaultClass: "sprinkles_display_block_smallScreen__ju367v8" }, flex: { conditions: { smallScreen: "sprinkles_display_flex_smallScreen__ju367va", largeScreen: "sprinkles_display_flex_largeScreen__ju367vb" }, defaultClass: "sprinkles_display_flex_smallScreen__ju367va" }, inline: { conditions: { smallScreen: "sprinkles_display_inline_smallScreen__ju367vc", largeScreen: "sprinkles_display_inline_largeScreen__ju367vd" }, defaultClass: "sprinkles_display_inline_smallScreen__ju367vc" } } } } }, { conditions: void 0, styles: { margin: { mappings: ["marginTop", "marginBottom", "marginLeft", "marginRight"] }, marginX: { mappings: ["marginLeft", "marginRight"] }, marginY: { mappings: ["marginTop", "marginBottom"] }, padding: { mappings: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"] }, paddingX: { mappings: ["paddingLeft", "paddingRight"] }, paddingY: { mappings: ["paddingTop", "paddingBottom"] }, alignSelf: { values: { "flex-start": { defaultClass: "sprinkles_alignSelf_flex-start__ju367ve" }, "flex-end": { defaultClass: "sprinkles_alignSelf_flex-end__ju367vf" }, center: { defaultClass: "sprinkles_alignSelf_center__ju367vg" } } }, backgroundSize: { values: { cover: { defaultClass: "sprinkles_backgroundSize_cover__ju367vh" } } }, borderRadius: { values: { "1": { defaultClass: "sprinkles_borderRadius_1__ju367vi" }, "6": { defaultClass: "sprinkles_borderRadius_6__ju367vj" }, "10": { defaultClass: "sprinkles_borderRadius_10__ju367vk" }, "13": { defaultClass: "sprinkles_borderRadius_13__ju367vl" }, actionButton: { defaultClass: "sprinkles_borderRadius_actionButton__ju367vm" }, connectButton: { defaultClass: "sprinkles_borderRadius_connectButton__ju367vn" }, menuButton: { defaultClass: "sprinkles_borderRadius_menuButton__ju367vo" }, modal: { defaultClass: "sprinkles_borderRadius_modal__ju367vp" }, modalMobile: { defaultClass: "sprinkles_borderRadius_modalMobile__ju367vq" }, "25%": { defaultClass: "sprinkles_borderRadius_25%__ju367vr" }, full: { defaultClass: "sprinkles_borderRadius_full__ju367vs" } } }, borderStyle: { values: { solid: { defaultClass: "sprinkles_borderStyle_solid__ju367vt" } } }, borderWidth: { values: { "0": { defaultClass: "sprinkles_borderWidth_0__ju367vu" }, "1": { defaultClass: "sprinkles_borderWidth_1__ju367vv" }, "2": { defaultClass: "sprinkles_borderWidth_2__ju367vw" }, "3": { defaultClass: "sprinkles_borderWidth_3__ju367vx" }, "4": { defaultClass: "sprinkles_borderWidth_4__ju367vy" } } }, cursor: { values: { pointer: { defaultClass: "sprinkles_cursor_pointer__ju367vz" } } }, flexDirection: { values: { row: { defaultClass: "sprinkles_flexDirection_row__ju367v10" }, column: { defaultClass: "sprinkles_flexDirection_column__ju367v11" } } }, fontFamily: { values: { body: { defaultClass: "sprinkles_fontFamily_body__ju367v12" } } }, fontSize: { values: { "12": { defaultClass: "sprinkles_fontSize_12__ju367v13" }, "13": { defaultClass: "sprinkles_fontSize_13__ju367v14" }, "14": { defaultClass: "sprinkles_fontSize_14__ju367v15" }, "16": { defaultClass: "sprinkles_fontSize_16__ju367v16" }, "18": { defaultClass: "sprinkles_fontSize_18__ju367v17" }, "20": { defaultClass: "sprinkles_fontSize_20__ju367v18" }, "23": { defaultClass: "sprinkles_fontSize_23__ju367v19" } } }, fontWeight: { values: { regular: { defaultClass: "sprinkles_fontWeight_regular__ju367v1a" }, medium: { defaultClass: "sprinkles_fontWeight_medium__ju367v1b" }, semibold: { defaultClass: "sprinkles_fontWeight_semibold__ju367v1c" }, bold: { defaultClass: "sprinkles_fontWeight_bold__ju367v1d" }, heavy: { defaultClass: "sprinkles_fontWeight_heavy__ju367v1e" } } }, gap: { values: { "0": { defaultClass: "sprinkles_gap_0__ju367v1f" }, "1": { defaultClass: "sprinkles_gap_1__ju367v1g" }, "2": { defaultClass: "sprinkles_gap_2__ju367v1h" }, "3": { defaultClass: "sprinkles_gap_3__ju367v1i" }, "4": { defaultClass: "sprinkles_gap_4__ju367v1j" }, "5": { defaultClass: "sprinkles_gap_5__ju367v1k" }, "6": { defaultClass: "sprinkles_gap_6__ju367v1l" }, "8": { defaultClass: "sprinkles_gap_8__ju367v1m" }, "10": { defaultClass: "sprinkles_gap_10__ju367v1n" }, "12": { defaultClass: "sprinkles_gap_12__ju367v1o" }, "14": { defaultClass: "sprinkles_gap_14__ju367v1p" }, "16": { defaultClass: "sprinkles_gap_16__ju367v1q" }, "18": { defaultClass: "sprinkles_gap_18__ju367v1r" }, "20": { defaultClass: "sprinkles_gap_20__ju367v1s" }, "24": { defaultClass: "sprinkles_gap_24__ju367v1t" }, "28": { defaultClass: "sprinkles_gap_28__ju367v1u" }, "32": { defaultClass: "sprinkles_gap_32__ju367v1v" }, "36": { defaultClass: "sprinkles_gap_36__ju367v1w" }, "44": { defaultClass: "sprinkles_gap_44__ju367v1x" }, "64": { defaultClass: "sprinkles_gap_64__ju367v1y" }, "-1": { defaultClass: "sprinkles_gap_-1__ju367v1z" } } }, height: { values: { "1": { defaultClass: "sprinkles_height_1__ju367v20" }, "2": { defaultClass: "sprinkles_height_2__ju367v21" }, "4": { defaultClass: "sprinkles_height_4__ju367v22" }, "8": { defaultClass: "sprinkles_height_8__ju367v23" }, "9": { defaultClass: "sprinkles_height_9__ju367v24" }, "12": { defaultClass: "sprinkles_height_12__ju367v25" }, "20": { defaultClass: "sprinkles_height_20__ju367v26" }, "24": { defaultClass: "sprinkles_height_24__ju367v27" }, "28": { defaultClass: "sprinkles_height_28__ju367v28" }, "30": { defaultClass: "sprinkles_height_30__ju367v29" }, "32": { defaultClass: "sprinkles_height_32__ju367v2a" }, "34": { defaultClass: "sprinkles_height_34__ju367v2b" }, "36": { defaultClass: "sprinkles_height_36__ju367v2c" }, "40": { defaultClass: "sprinkles_height_40__ju367v2d" }, "44": { defaultClass: "sprinkles_height_44__ju367v2e" }, "48": { defaultClass: "sprinkles_height_48__ju367v2f" }, "54": { defaultClass: "sprinkles_height_54__ju367v2g" }, "60": { defaultClass: "sprinkles_height_60__ju367v2h" }, "200": { defaultClass: "sprinkles_height_200__ju367v2i" }, full: { defaultClass: "sprinkles_height_full__ju367v2j" }, max: { defaultClass: "sprinkles_height_max__ju367v2k" } } }, justifyContent: { values: { "flex-start": { defaultClass: "sprinkles_justifyContent_flex-start__ju367v2l" }, "flex-end": { defaultClass: "sprinkles_justifyContent_flex-end__ju367v2m" }, center: { defaultClass: "sprinkles_justifyContent_center__ju367v2n" }, "space-between": { defaultClass: "sprinkles_justifyContent_space-between__ju367v2o" }, "space-around": { defaultClass: "sprinkles_justifyContent_space-around__ju367v2p" } } }, textAlign: { values: { left: { defaultClass: "sprinkles_textAlign_left__ju367v2q" }, center: { defaultClass: "sprinkles_textAlign_center__ju367v2r" }, inherit: { defaultClass: "sprinkles_textAlign_inherit__ju367v2s" } } }, marginBottom: { values: { "0": { defaultClass: "sprinkles_marginBottom_0__ju367v2t" }, "1": { defaultClass: "sprinkles_marginBottom_1__ju367v2u" }, "2": { defaultClass: "sprinkles_marginBottom_2__ju367v2v" }, "3": { defaultClass: "sprinkles_marginBottom_3__ju367v2w" }, "4": { defaultClass: "sprinkles_marginBottom_4__ju367v2x" }, "5": { defaultClass: "sprinkles_marginBottom_5__ju367v2y" }, "6": { defaultClass: "sprinkles_marginBottom_6__ju367v2z" }, "8": { defaultClass: "sprinkles_marginBottom_8__ju367v30" }, "10": { defaultClass: "sprinkles_marginBottom_10__ju367v31" }, "12": { defaultClass: "sprinkles_marginBottom_12__ju367v32" }, "14": { defaultClass: "sprinkles_marginBottom_14__ju367v33" }, "16": { defaultClass: "sprinkles_marginBottom_16__ju367v34" }, "18": { defaultClass: "sprinkles_marginBottom_18__ju367v35" }, "20": { defaultClass: "sprinkles_marginBottom_20__ju367v36" }, "24": { defaultClass: "sprinkles_marginBottom_24__ju367v37" }, "28": { defaultClass: "sprinkles_marginBottom_28__ju367v38" }, "32": { defaultClass: "sprinkles_marginBottom_32__ju367v39" }, "36": { defaultClass: "sprinkles_marginBottom_36__ju367v3a" }, "44": { defaultClass: "sprinkles_marginBottom_44__ju367v3b" }, "64": { defaultClass: "sprinkles_marginBottom_64__ju367v3c" }, "-1": { defaultClass: "sprinkles_marginBottom_-1__ju367v3d" } } }, marginLeft: { values: { "0": { defaultClass: "sprinkles_marginLeft_0__ju367v3e" }, "1": { defaultClass: "sprinkles_marginLeft_1__ju367v3f" }, "2": { defaultClass: "sprinkles_marginLeft_2__ju367v3g" }, "3": { defaultClass: "sprinkles_marginLeft_3__ju367v3h" }, "4": { defaultClass: "sprinkles_marginLeft_4__ju367v3i" }, "5": { defaultClass: "sprinkles_marginLeft_5__ju367v3j" }, "6": { defaultClass: "sprinkles_marginLeft_6__ju367v3k" }, "8": { defaultClass: "sprinkles_marginLeft_8__ju367v3l" }, "10": { defaultClass: "sprinkles_marginLeft_10__ju367v3m" }, "12": { defaultClass: "sprinkles_marginLeft_12__ju367v3n" }, "14": { defaultClass: "sprinkles_marginLeft_14__ju367v3o" }, "16": { defaultClass: "sprinkles_marginLeft_16__ju367v3p" }, "18": { defaultClass: "sprinkles_marginLeft_18__ju367v3q" }, "20": { defaultClass: "sprinkles_marginLeft_20__ju367v3r" }, "24": { defaultClass: "sprinkles_marginLeft_24__ju367v3s" }, "28": { defaultClass: "sprinkles_marginLeft_28__ju367v3t" }, "32": { defaultClass: "sprinkles_marginLeft_32__ju367v3u" }, "36": { defaultClass: "sprinkles_marginLeft_36__ju367v3v" }, "44": { defaultClass: "sprinkles_marginLeft_44__ju367v3w" }, "64": { defaultClass: "sprinkles_marginLeft_64__ju367v3x" }, "-1": { defaultClass: "sprinkles_marginLeft_-1__ju367v3y" } } }, marginRight: { values: { "0": { defaultClass: "sprinkles_marginRight_0__ju367v3z" }, "1": { defaultClass: "sprinkles_marginRight_1__ju367v40" }, "2": { defaultClass: "sprinkles_marginRight_2__ju367v41" }, "3": { defaultClass: "sprinkles_marginRight_3__ju367v42" }, "4": { defaultClass: "sprinkles_marginRight_4__ju367v43" }, "5": { defaultClass: "sprinkles_marginRight_5__ju367v44" }, "6": { defaultClass: "sprinkles_marginRight_6__ju367v45" }, "8": { defaultClass: "sprinkles_marginRight_8__ju367v46" }, "10": { defaultClass: "sprinkles_marginRight_10__ju367v47" }, "12": { defaultClass: "sprinkles_marginRight_12__ju367v48" }, "14": { defaultClass: "sprinkles_marginRight_14__ju367v49" }, "16": { defaultClass: "sprinkles_marginRight_16__ju367v4a" }, "18": { defaultClass: "sprinkles_marginRight_18__ju367v4b" }, "20": { defaultClass: "sprinkles_marginRight_20__ju367v4c" }, "24": { defaultClass: "sprinkles_marginRight_24__ju367v4d" }, "28": { defaultClass: "sprinkles_marginRight_28__ju367v4e" }, "32": { defaultClass: "sprinkles_marginRight_32__ju367v4f" }, "36": { defaultClass: "sprinkles_marginRight_36__ju367v4g" }, "44": { defaultClass: "sprinkles_marginRight_44__ju367v4h" }, "64": { defaultClass: "sprinkles_marginRight_64__ju367v4i" }, "-1": { defaultClass: "sprinkles_marginRight_-1__ju367v4j" } } }, marginTop: { values: { "0": { defaultClass: "sprinkles_marginTop_0__ju367v4k" }, "1": { defaultClass: "sprinkles_marginTop_1__ju367v4l" }, "2": { defaultClass: "sprinkles_marginTop_2__ju367v4m" }, "3": { defaultClass: "sprinkles_marginTop_3__ju367v4n" }, "4": { defaultClass: "sprinkles_marginTop_4__ju367v4o" }, "5": { defaultClass: "sprinkles_marginTop_5__ju367v4p" }, "6": { defaultClass: "sprinkles_marginTop_6__ju367v4q" }, "8": { defaultClass: "sprinkles_marginTop_8__ju367v4r" }, "10": { defaultClass: "sprinkles_marginTop_10__ju367v4s" }, "12": { defaultClass: "sprinkles_marginTop_12__ju367v4t" }, "14": { defaultClass: "sprinkles_marginTop_14__ju367v4u" }, "16": { defaultClass: "sprinkles_marginTop_16__ju367v4v" }, "18": { defaultClass: "sprinkles_marginTop_18__ju367v4w" }, "20": { defaultClass: "sprinkles_marginTop_20__ju367v4x" }, "24": { defaultClass: "sprinkles_marginTop_24__ju367v4y" }, "28": { defaultClass: "sprinkles_marginTop_28__ju367v4z" }, "32": { defaultClass: "sprinkles_marginTop_32__ju367v50" }, "36": { defaultClass: "sprinkles_marginTop_36__ju367v51" }, "44": { defaultClass: "sprinkles_marginTop_44__ju367v52" }, "64": { defaultClass: "sprinkles_marginTop_64__ju367v53" }, "-1": { defaultClass: "sprinkles_marginTop_-1__ju367v54" } } }, maxWidth: { values: { "1": { defaultClass: "sprinkles_maxWidth_1__ju367v55" }, "2": { defaultClass: "sprinkles_maxWidth_2__ju367v56" }, "4": { defaultClass: "sprinkles_maxWidth_4__ju367v57" }, "8": { defaultClass: "sprinkles_maxWidth_8__ju367v58" }, "9": { defaultClass: "sprinkles_maxWidth_9__ju367v59" }, "12": { defaultClass: "sprinkles_maxWidth_12__ju367v5a" }, "20": { defaultClass: "sprinkles_maxWidth_20__ju367v5b" }, "24": { defaultClass: "sprinkles_maxWidth_24__ju367v5c" }, "28": { defaultClass: "sprinkles_maxWidth_28__ju367v5d" }, "30": { defaultClass: "sprinkles_maxWidth_30__ju367v5e" }, "32": { defaultClass: "sprinkles_maxWidth_32__ju367v5f" }, "34": { defaultClass: "sprinkles_maxWidth_34__ju367v5g" }, "36": { defaultClass: "sprinkles_maxWidth_36__ju367v5h" }, "40": { defaultClass: "sprinkles_maxWidth_40__ju367v5i" }, "44": { defaultClass: "sprinkles_maxWidth_44__ju367v5j" }, "48": { defaultClass: "sprinkles_maxWidth_48__ju367v5k" }, "54": { defaultClass: "sprinkles_maxWidth_54__ju367v5l" }, "60": { defaultClass: "sprinkles_maxWidth_60__ju367v5m" }, "200": { defaultClass: "sprinkles_maxWidth_200__ju367v5n" }, full: { defaultClass: "sprinkles_maxWidth_full__ju367v5o" }, max: { defaultClass: "sprinkles_maxWidth_max__ju367v5p" } } }, minWidth: { values: { "1": { defaultClass: "sprinkles_minWidth_1__ju367v5q" }, "2": { defaultClass: "sprinkles_minWidth_2__ju367v5r" }, "4": { defaultClass: "sprinkles_minWidth_4__ju367v5s" }, "8": { defaultClass: "sprinkles_minWidth_8__ju367v5t" }, "9": { defaultClass: "sprinkles_minWidth_9__ju367v5u" }, "12": { defaultClass: "sprinkles_minWidth_12__ju367v5v" }, "20": { defaultClass: "sprinkles_minWidth_20__ju367v5w" }, "24": { defaultClass: "sprinkles_minWidth_24__ju367v5x" }, "28": { defaultClass: "sprinkles_minWidth_28__ju367v5y" }, "30": { defaultClass: "sprinkles_minWidth_30__ju367v5z" }, "32": { defaultClass: "sprinkles_minWidth_32__ju367v60" }, "34": { defaultClass: "sprinkles_minWidth_34__ju367v61" }, "36": { defaultClass: "sprinkles_minWidth_36__ju367v62" }, "40": { defaultClass: "sprinkles_minWidth_40__ju367v63" }, "44": { defaultClass: "sprinkles_minWidth_44__ju367v64" }, "48": { defaultClass: "sprinkles_minWidth_48__ju367v65" }, "54": { defaultClass: "sprinkles_minWidth_54__ju367v66" }, "60": { defaultClass: "sprinkles_minWidth_60__ju367v67" }, "200": { defaultClass: "sprinkles_minWidth_200__ju367v68" }, full: { defaultClass: "sprinkles_minWidth_full__ju367v69" }, max: { defaultClass: "sprinkles_minWidth_max__ju367v6a" } } }, overflow: { values: { hidden: { defaultClass: "sprinkles_overflow_hidden__ju367v6b" } } }, paddingBottom: { values: { "0": { defaultClass: "sprinkles_paddingBottom_0__ju367v6c" }, "1": { defaultClass: "sprinkles_paddingBottom_1__ju367v6d" }, "2": { defaultClass: "sprinkles_paddingBottom_2__ju367v6e" }, "3": { defaultClass: "sprinkles_paddingBottom_3__ju367v6f" }, "4": { defaultClass: "sprinkles_paddingBottom_4__ju367v6g" }, "5": { defaultClass: "sprinkles_paddingBottom_5__ju367v6h" }, "6": { defaultClass: "sprinkles_paddingBottom_6__ju367v6i" }, "8": { defaultClass: "sprinkles_paddingBottom_8__ju367v6j" }, "10": { defaultClass: "sprinkles_paddingBottom_10__ju367v6k" }, "12": { defaultClass: "sprinkles_paddingBottom_12__ju367v6l" }, "14": { defaultClass: "sprinkles_paddingBottom_14__ju367v6m" }, "16": { defaultClass: "sprinkles_paddingBottom_16__ju367v6n" }, "18": { defaultClass: "sprinkles_paddingBottom_18__ju367v6o" }, "20": { defaultClass: "sprinkles_paddingBottom_20__ju367v6p" }, "24": { defaultClass: "sprinkles_paddingBottom_24__ju367v6q" }, "28": { defaultClass: "sprinkles_paddingBottom_28__ju367v6r" }, "32": { defaultClass: "sprinkles_paddingBottom_32__ju367v6s" }, "36": { defaultClass: "sprinkles_paddingBottom_36__ju367v6t" }, "44": { defaultClass: "sprinkles_paddingBottom_44__ju367v6u" }, "64": { defaultClass: "sprinkles_paddingBottom_64__ju367v6v" }, "-1": { defaultClass: "sprinkles_paddingBottom_-1__ju367v6w" } } }, paddingLeft: { values: { "0": { defaultClass: "sprinkles_paddingLeft_0__ju367v6x" }, "1": { defaultClass: "sprinkles_paddingLeft_1__ju367v6y" }, "2": { defaultClass: "sprinkles_paddingLeft_2__ju367v6z" }, "3": { defaultClass: "sprinkles_paddingLeft_3__ju367v70" }, "4": { defaultClass: "sprinkles_paddingLeft_4__ju367v71" }, "5": { defaultClass: "sprinkles_paddingLeft_5__ju367v72" }, "6": { defaultClass: "sprinkles_paddingLeft_6__ju367v73" }, "8": { defaultClass: "sprinkles_paddingLeft_8__ju367v74" }, "10": { defaultClass: "sprinkles_paddingLeft_10__ju367v75" }, "12": { defaultClass: "sprinkles_paddingLeft_12__ju367v76" }, "14": { defaultClass: "sprinkles_paddingLeft_14__ju367v77" }, "16": { defaultClass: "sprinkles_paddingLeft_16__ju367v78" }, "18": { defaultClass: "sprinkles_paddingLeft_18__ju367v79" }, "20": { defaultClass: "sprinkles_paddingLeft_20__ju367v7a" }, "24": { defaultClass: "sprinkles_paddingLeft_24__ju367v7b" }, "28": { defaultClass: "sprinkles_paddingLeft_28__ju367v7c" }, "32": { defaultClass: "sprinkles_paddingLeft_32__ju367v7d" }, "36": { defaultClass: "sprinkles_paddingLeft_36__ju367v7e" }, "44": { defaultClass: "sprinkles_paddingLeft_44__ju367v7f" }, "64": { defaultClass: "sprinkles_paddingLeft_64__ju367v7g" }, "-1": { defaultClass: "sprinkles_paddingLeft_-1__ju367v7h" } } }, paddingRight: { values: { "0": { defaultClass: "sprinkles_paddingRight_0__ju367v7i" }, "1": { defaultClass: "sprinkles_paddingRight_1__ju367v7j" }, "2": { defaultClass: "sprinkles_paddingRight_2__ju367v7k" }, "3": { defaultClass: "sprinkles_paddingRight_3__ju367v7l" }, "4": { defaultClass: "sprinkles_paddingRight_4__ju367v7m" }, "5": { defaultClass: "sprinkles_paddingRight_5__ju367v7n" }, "6": { defaultClass: "sprinkles_paddingRight_6__ju367v7o" }, "8": { defaultClass: "sprinkles_paddingRight_8__ju367v7p" }, "10": { defaultClass: "sprinkles_paddingRight_10__ju367v7q" }, "12": { defaultClass: "sprinkles_paddingRight_12__ju367v7r" }, "14": { defaultClass: "sprinkles_paddingRight_14__ju367v7s" }, "16": { defaultClass: "sprinkles_paddingRight_16__ju367v7t" }, "18": { defaultClass: "sprinkles_paddingRight_18__ju367v7u" }, "20": { defaultClass: "sprinkles_paddingRight_20__ju367v7v" }, "24": { defaultClass: "sprinkles_paddingRight_24__ju367v7w" }, "28": { defaultClass: "sprinkles_paddingRight_28__ju367v7x" }, "32": { defaultClass: "sprinkles_paddingRight_32__ju367v7y" }, "36": { defaultClass: "sprinkles_paddingRight_36__ju367v7z" }, "44": { defaultClass: "sprinkles_paddingRight_44__ju367v80" }, "64": { defaultClass: "sprinkles_paddingRight_64__ju367v81" }, "-1": { defaultClass: "sprinkles_paddingRight_-1__ju367v82" } } }, paddingTop: { values: { "0": { defaultClass: "sprinkles_paddingTop_0__ju367v83" }, "1": { defaultClass: "sprinkles_paddingTop_1__ju367v84" }, "2": { defaultClass: "sprinkles_paddingTop_2__ju367v85" }, "3": { defaultClass: "sprinkles_paddingTop_3__ju367v86" }, "4": { defaultClass: "sprinkles_paddingTop_4__ju367v87" }, "5": { defaultClass: "sprinkles_paddingTop_5__ju367v88" }, "6": { defaultClass: "sprinkles_paddingTop_6__ju367v89" }, "8": { defaultClass: "sprinkles_paddingTop_8__ju367v8a" }, "10": { defaultClass: "sprinkles_paddingTop_10__ju367v8b" }, "12": { defaultClass: "sprinkles_paddingTop_12__ju367v8c" }, "14": { defaultClass: "sprinkles_paddingTop_14__ju367v8d" }, "16": { defaultClass: "sprinkles_paddingTop_16__ju367v8e" }, "18": { defaultClass: "sprinkles_paddingTop_18__ju367v8f" }, "20": { defaultClass: "sprinkles_paddingTop_20__ju367v8g" }, "24": { defaultClass: "sprinkles_paddingTop_24__ju367v8h" }, "28": { defaultClass: "sprinkles_paddingTop_28__ju367v8i" }, "32": { defaultClass: "sprinkles_paddingTop_32__ju367v8j" }, "36": { defaultClass: "sprinkles_paddingTop_36__ju367v8k" }, "44": { defaultClass: "sprinkles_paddingTop_44__ju367v8l" }, "64": { defaultClass: "sprinkles_paddingTop_64__ju367v8m" }, "-1": { defaultClass: "sprinkles_paddingTop_-1__ju367v8n" } } }, position: { values: { absolute: { defaultClass: "sprinkles_position_absolute__ju367v8o" }, fixed: { defaultClass: "sprinkles_position_fixed__ju367v8p" }, relative: { defaultClass: "sprinkles_position_relative__ju367v8q" } } }, right: { values: { "0": { defaultClass: "sprinkles_right_0__ju367v8r" } } }, transition: { values: { "default": { defaultClass: "sprinkles_transition_default__ju367v8s" }, transform: { defaultClass: "sprinkles_transition_transform__ju367v8t" } } }, userSelect: { values: { none: { defaultClass: "sprinkles_userSelect_none__ju367v8u" } } }, width: { values: { "1": { defaultClass: "sprinkles_width_1__ju367v8v" }, "2": { defaultClass: "sprinkles_width_2__ju367v8w" }, "4": { defaultClass: "sprinkles_width_4__ju367v8x" }, "8": { defaultClass: "sprinkles_width_8__ju367v8y" }, "9": { defaultClass: "sprinkles_width_9__ju367v8z" }, "12": { defaultClass: "sprinkles_width_12__ju367v90" }, "20": { defaultClass: "sprinkles_width_20__ju367v91" }, "24": { defaultClass: "sprinkles_width_24__ju367v92" }, "28": { defaultClass: "sprinkles_width_28__ju367v93" }, "30": { defaultClass: "sprinkles_width_30__ju367v94" }, "32": { defaultClass: "sprinkles_width_32__ju367v95" }, "34": { defaultClass: "sprinkles_width_34__ju367v96" }, "36": { defaultClass: "sprinkles_width_36__ju367v97" }, "40": { defaultClass: "sprinkles_width_40__ju367v98" }, "44": { defaultClass: "sprinkles_width_44__ju367v99" }, "48": { defaultClass: "sprinkles_width_48__ju367v9a" }, "54": { defaultClass: "sprinkles_width_54__ju367v9b" }, "60": { defaultClass: "sprinkles_width_60__ju367v9c" }, "200": { defaultClass: "sprinkles_width_200__ju367v9d" }, full: { defaultClass: "sprinkles_width_full__ju367v9e" }, max: { defaultClass: "sprinkles_width_max__ju367v9f" } } }, backdropFilter: { values: { modalOverlay: { defaultClass: "sprinkles_backdropFilter_modalOverlay__ju367v9g" } } } } });
var themeVars = { colors: { accentColor: "var(--rk-colors-accentColor)", accentColorForeground: "var(--rk-colors-accentColorForeground)", actionButtonBorder: "var(--rk-colors-actionButtonBorder)", actionButtonBorderMobile: "var(--rk-colors-actionButtonBorderMobile)", actionButtonSecondaryBackground: "var(--rk-colors-actionButtonSecondaryBackground)", closeButton: "var(--rk-colors-closeButton)", closeButtonBackground: "var(--rk-colors-closeButtonBackground)", connectButtonBackground: "var(--rk-colors-connectButtonBackground)", connectButtonBackgroundError: "var(--rk-colors-connectButtonBackgroundError)", connectButtonInnerBackground: "var(--rk-colors-connectButtonInnerBackground)", connectButtonText: "var(--rk-colors-connectButtonText)", connectButtonTextError: "var(--rk-colors-connectButtonTextError)", connectionIndicator: "var(--rk-colors-connectionIndicator)", connectionIndicatorBorder: "var(--rk-colors-connectionIndicatorBorder)", downloadBottomCardBackground: "var(--rk-colors-downloadBottomCardBackground)", downloadTopCardBackground: "var(--rk-colors-downloadTopCardBackground)", error: "var(--rk-colors-error)", generalBorder: "var(--rk-colors-generalBorder)", generalBorderDim: "var(--rk-colors-generalBorderDim)", menuItemBackground: "var(--rk-colors-menuItemBackground)", modalBackdrop: "var(--rk-colors-modalBackdrop)", modalBackground: "var(--rk-colors-modalBackground)", modalBorder: "var(--rk-colors-modalBorder)", modalText: "var(--rk-colors-modalText)", modalTextDim: "var(--rk-colors-modalTextDim)", modalTextSecondary: "var(--rk-colors-modalTextSecondary)", profileAction: "var(--rk-colors-profileAction)", profileActionHover: "var(--rk-colors-profileActionHover)", profileForeground: "var(--rk-colors-profileForeground)", selectedOptionBorder: "var(--rk-colors-selectedOptionBorder)", standby: "var(--rk-colors-standby)", standbyBorder: "var(--rk-colors-standbyBorder)" }, fonts: { body: "var(--rk-fonts-body)" }, radii: { actionButton: "var(--rk-radii-actionButton)", connectButton: "var(--rk-radii-connectButton)", menuButton: "var(--rk-radii-menuButton)", modal: "var(--rk-radii-modal)", modalMobile: "var(--rk-radii-modalMobile)" }, shadows: { connectButton: "var(--rk-shadows-connectButton)", dialog: "var(--rk-shadows-dialog)", profileDetailsAction: "var(--rk-shadows-profileDetailsAction)", selectedOption: "var(--rk-shadows-selectedOption)", selectedWallet: "var(--rk-shadows-selectedWallet)", walletLogo: "var(--rk-shadows-walletLogo)" }, blurs: { modalOverlay: "var(--rk-blurs-modalOverlay)" } };

// src/css/touchableStyles.css.ts
var active = { shrink: "touchableStyles_active_shrink__12cbo8i6", shrinkSm: "touchableStyles_active_shrinkSm__12cbo8i7" };
var base = "touchableStyles_base__12cbo8i3 sprinkles_position_relative__ju367v8q";
var hover = { grow: "touchableStyles_hover_grow__12cbo8i4", growLg: "touchableStyles_hover_growLg__12cbo8i5" };

// src/css/touchableStyles.ts
function touchableStyles({ active: active2, hover: hover2 }) {
  return [base, hover2 && hover[hover2], active[active2]];
}

// src/hooks/useConnectionStatus.ts
import { useAccount as useAccount2 } from "wagmi";

// src/components/RainbowKitProvider/AuthenticationContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "react";
import { useAccount } from "wagmi";
function createAuthenticationAdapter(adapter) {
  return adapter;
}
var AuthenticationContext = createContext(
  null
);
function RainbowKitAuthenticationProvider({
  adapter,
  children,
  enabled = true,
  status
}) {
  useAccount({
    onDisconnect: () => {
      adapter.signOut();
    }
  });
  const { isDisconnected } = useAccount();
  const onceRef = useRef(false);
  useEffect(() => {
    if (onceRef.current)
      return;
    onceRef.current = true;
    if (isDisconnected && status === "authenticated") {
      adapter.signOut();
    }
  }, [status, adapter, isDisconnected]);
  return /* @__PURE__ */ React.createElement(AuthenticationContext.Provider, {
    value: useMemo(
      () => enabled ? { adapter, status } : null,
      [enabled, adapter, status]
    )
  }, children);
}
function useAuthenticationAdapter() {
  var _a;
  const { adapter } = (_a = useContext(AuthenticationContext)) != null ? _a : {};
  if (!adapter) {
    throw new Error("No authentication adapter found");
  }
  return adapter;
}
function useAuthenticationStatus() {
  var _a;
  const contextValue = useContext(AuthenticationContext);
  return (_a = contextValue == null ? void 0 : contextValue.status) != null ? _a : null;
}

// src/hooks/useConnectionStatus.ts
function useConnectionStatus() {
  const authenticationStatus = useAuthenticationStatus();
  const { isConnected } = useAccount2();
  if (!isConnected) {
    return "disconnected";
  }
  if (!authenticationStatus) {
    return "connected";
  }
  if (authenticationStatus === "loading" || authenticationStatus === "unauthenticated") {
    return authenticationStatus;
  }
  return "connected";
}

// src/utils/isMobile.ts
function isAndroid() {
  return typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
}
function isSmallIOS() {
  return typeof navigator !== "undefined" && /iPhone|iPod/.test(navigator.userAgent);
}
function isLargeIOS() {
  return typeof navigator !== "undefined" && (/iPad/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
function isIOS() {
  return isSmallIOS() || isLargeIOS();
}
function isMobile() {
  return isAndroid() || isIOS();
}

// src/components/AsyncImage/AsyncImage.tsx
import React3, { useReducer as useReducer2 } from "react";

// src/components/Box/Box.ts
import clsx2 from "clsx";
import * as React2 from "react";

// src/css/atoms.ts
import clsx from "clsx";

// src/css/reset.css.ts
var base2 = "reset_base__iekbcc0";
var element = { a: "reset_a__iekbcca", blockquote: "reset_quote__iekbcc2", button: "reset_button__iekbcc9", input: "reset_input__iekbcc8 reset_field__iekbcc5 reset_appearance__iekbcc4", mark: "reset_mark__iekbcc6", ol: "reset_list__iekbcc1", q: "reset_quote__iekbcc2", select: "reset_select__iekbcc7 reset_field__iekbcc5 reset_appearance__iekbcc4", table: "reset_table__iekbcc3", textarea: "reset_field__iekbcc5 reset_appearance__iekbcc4", ul: "reset_list__iekbcc1" };

// src/css/atoms.ts
var atoms = ({ reset, ...rest }) => {
  if (!reset)
    return sprinkles(rest);
  const elementReset = element[reset];
  const sprinklesClasses = sprinkles(rest);
  return clsx(base2, elementReset, sprinklesClasses);
};

// src/components/Box/Box.ts
var Box = React2.forwardRef(
  ({ as = "div", className, testId, ...props }, ref) => {
    const atomProps = {};
    const nativeProps = {};
    for (const key in props) {
      if (sprinkles.properties.has(key)) {
        atomProps[key] = props[key];
      } else {
        nativeProps[key] = props[key];
      }
    }
    const atomicClasses = atoms({
      reset: typeof as === "string" ? as : "div",
      ...atomProps
    });
    return React2.createElement(as, {
      "className": clsx2(atomicClasses, className),
      ...nativeProps,
      "data-testid": testId ? `rk-${testId.replace(/^rk-/, "")}` : void 0,
      ref
    });
  }
);
Box.displayName = "Box";

// src/components/AsyncImage/useAsyncImage.ts
import { useEffect as useEffect2, useReducer } from "react";
var cachedUrls = /* @__PURE__ */ new Map();
var cachedRequestPromises = /* @__PURE__ */ new Map();
async function loadAsyncImage(asyncImage) {
  const cachedRequestPromise = cachedRequestPromises.get(asyncImage);
  if (cachedRequestPromise) {
    return cachedRequestPromise;
  }
  const load = async () => asyncImage().then(async (url) => {
    cachedUrls.set(asyncImage, url);
    return url;
  });
  const requestPromise = load().catch((_err) => {
    return load().catch((_err2) => {
      cachedRequestPromises.delete(asyncImage);
    });
  });
  cachedRequestPromises.set(asyncImage, requestPromise);
  return requestPromise;
}
async function loadImages(...urls) {
  return await Promise.all(
    urls.map((url) => typeof url === "function" ? loadAsyncImage(url) : url)
  );
}
function useForceUpdate() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
}
function useAsyncImage(url) {
  const cachedUrl = typeof url === "function" ? cachedUrls.get(url) : void 0;
  const forceUpdate = useForceUpdate();
  useEffect2(() => {
    if (typeof url === "function" && !cachedUrl) {
      loadAsyncImage(url).then(forceUpdate);
    }
  }, [url, cachedUrl, forceUpdate]);
  return typeof url === "function" ? cachedUrl : url;
}

// src/components/AsyncImage/AsyncImage.tsx
function AsyncImage({ alt, background, borderColor, borderRadius, boxShadow, height, src: srcProp, width }) {
  const src6 = useAsyncImage(srcProp);
  const isRemoteImage = src6 && /^http/.test(src6);
  const [isRemoteImageLoaded, setRemoteImageLoaded] = useReducer2(() => true, false);
  return /* @__PURE__ */ React3.createElement(Box, {
    "aria-label": alt,
    borderRadius,
    boxShadow,
    height: typeof height === "string" ? height : void 0,
    overflow: "hidden",
    position: "relative",
    role: "img",
    style: {
      background,
      height: typeof height === "number" ? height : void 0,
      width: typeof width === "number" ? width : void 0
    },
    width: typeof width === "string" ? width : void 0
  }, /* @__PURE__ */ React3.createElement(Box, {
    ...isRemoteImage ? {
      "aria-hidden": true,
      as: "img",
      onLoad: setRemoteImageLoaded,
      src: src6
    } : {
      backgroundSize: "cover"
    },
    height: "full",
    position: "absolute",
    style: {
      transition: "opacity .15s linear",
      userSelect: "none",
      backgroundSize: "100%",
      ...isRemoteImage ? {
        opacity: isRemoteImageLoaded ? 1 : 0
      } : {
        backgroundImage: src6 ? `url(${src6})` : void 0,
        backgroundRepeat: "no-repeat",
        opacity: src6 ? 1 : 0
      }
    },
    width: "full"
  }), borderColor ? /* @__PURE__ */ React3.createElement(Box, {
    ...typeof borderColor === "object" && "custom" in borderColor ? { style: { borderColor: borderColor.custom } } : { borderColor },
    borderRadius,
    borderStyle: "solid",
    borderWidth: "1",
    height: "full",
    position: "relative",
    width: "full"
  }) : null);
}

// src/components/Avatar/Avatar.tsx
import React7, { useContext as useContext2 } from "react";

// src/components/Icons/Spinner.tsx
import React4, { useMemo as useMemo2 } from "react";

// src/components/Icons/Icons.css.ts
var SpinnerIconClassName = "Icons_SpinnerIconClassName__1luule42";
var SpinnerIconPathClassName = "Icons_SpinnerIconPathClassName__1luule43";

// src/components/Icons/Spinner.tsx
var useRandomId = (prefix) => useMemo2(
  () => `${prefix}_${Math.round(Math.random() * 1e9)}`,
  [prefix]
);
var SpinnerIcon = ({
  height = 21,
  width = 21
}) => {
  const id = useRandomId("spinner");
  return /* @__PURE__ */ React4.createElement("svg", {
    className: SpinnerIconClassName,
    fill: "none",
    height,
    viewBox: "0 0 21 21",
    width,
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React4.createElement("clipPath", {
    id
  }, /* @__PURE__ */ React4.createElement("path", {
    d: "M10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C11.3284 18 12 18.6716 12 19.5C12 20.3284 11.3284 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5C21 11.3284 20.3284 12 19.5 12C18.6716 12 18 11.3284 18 10.5C18 6.35786 14.6421 3 10.5 3Z"
  })), /* @__PURE__ */ React4.createElement("foreignObject", {
    clipPath: `url(#${id})`,
    height: "21",
    width: "21",
    x: "0",
    y: "0"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: SpinnerIconPathClassName
  })));
};

// src/components/RainbowKitProvider/AvatarContext.ts
import { createContext as createContext2 } from "react";

// src/components/Avatar/EmojiAvatar.tsx
import React5, { useEffect as useEffect3, useMemo as useMemo3, useState } from "react";

// src/components/Avatar/emojiAvatarForAddress.ts
var colors = [
  "#FC5C54",
  "#FFD95A",
  "#E95D72",
  "#6A87C8",
  "#5FD0F3",
  "#75C06B",
  "#FFDD86",
  "#5FC6D4",
  "#FF949A",
  "#FF8024",
  "#9BA1A4",
  "#EC66FF",
  "#FF8CBC",
  "#FF9A23",
  "#C5DADB",
  "#A8CE63",
  "#71ABFF",
  "#FFE279",
  "#B6B1B6",
  "#FF6780",
  "#A575FF",
  "#4D82FF",
  "#FFB35A"
];
var avatars = [
  { color: colors[0], emoji: "\u{1F336}" },
  { color: colors[1], emoji: "\u{1F911}" },
  { color: colors[2], emoji: "\u{1F419}" },
  { color: colors[3], emoji: "\u{1FAD0}" },
  { color: colors[4], emoji: "\u{1F433}" },
  { color: colors[0], emoji: "\u{1F936}" },
  { color: colors[5], emoji: "\u{1F332}" },
  { color: colors[6], emoji: "\u{1F31E}" },
  { color: colors[7], emoji: "\u{1F412}" },
  { color: colors[8], emoji: "\u{1F435}" },
  { color: colors[9], emoji: "\u{1F98A}" },
  { color: colors[10], emoji: "\u{1F43C}" },
  { color: colors[11], emoji: "\u{1F984}" },
  { color: colors[12], emoji: "\u{1F437}" },
  { color: colors[13], emoji: "\u{1F427}" },
  { color: colors[8], emoji: "\u{1F9A9}" },
  { color: colors[14], emoji: "\u{1F47D}" },
  { color: colors[0], emoji: "\u{1F388}" },
  { color: colors[8], emoji: "\u{1F349}" },
  { color: colors[1], emoji: "\u{1F389}" },
  { color: colors[15], emoji: "\u{1F432}" },
  { color: colors[16], emoji: "\u{1F30E}" },
  { color: colors[17], emoji: "\u{1F34A}" },
  { color: colors[18], emoji: "\u{1F42D}" },
  { color: colors[19], emoji: "\u{1F363}" },
  { color: colors[1], emoji: "\u{1F425}" },
  { color: colors[20], emoji: "\u{1F47E}" },
  { color: colors[15], emoji: "\u{1F966}" },
  { color: colors[0], emoji: "\u{1F479}" },
  { color: colors[17], emoji: "\u{1F640}" },
  { color: colors[4], emoji: "\u26F1" },
  { color: colors[21], emoji: "\u26F5\uFE0F" },
  { color: colors[17], emoji: "\u{1F973}" },
  { color: colors[8], emoji: "\u{1F92F}" },
  { color: colors[22], emoji: "\u{1F920}" }
];
function hashCode(text) {
  let hash = 0;
  if (text.length === 0)
    return hash;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}
function emojiAvatarForAddress(address) {
  const resolvedAddress = typeof address === "string" ? address : "";
  const avatarIndex = Math.abs(
    hashCode(resolvedAddress.toLowerCase()) % avatars.length
  );
  return avatars[avatarIndex != null ? avatarIndex : 0];
}

// src/components/Avatar/EmojiAvatar.tsx
var EmojiAvatar = ({ address, ensImage, size }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect3(() => {
    if (ensImage) {
      const img = new Image();
      img.src = ensImage;
      img.onload = () => setLoaded(true);
    }
  }, [ensImage]);
  const { color: backgroundColor, emoji } = useMemo3(
    () => emojiAvatarForAddress(address),
    [address]
  );
  return ensImage ? loaded ? /* @__PURE__ */ React5.createElement(Box, {
    backgroundSize: "cover",
    borderRadius: "full",
    position: "absolute",
    style: {
      backgroundImage: `url(${ensImage})`,
      backgroundPosition: "center",
      height: size,
      width: size
    }
  }) : /* @__PURE__ */ React5.createElement(Box, {
    alignItems: "center",
    backgroundSize: "cover",
    borderRadius: "full",
    color: "modalText",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    style: {
      height: size,
      width: size
    }
  }, /* @__PURE__ */ React5.createElement(SpinnerIcon, null)) : /* @__PURE__ */ React5.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    style: {
      ...!ensImage && { backgroundColor },
      height: size,
      width: size
    }
  }, emoji);
};

// src/components/RainbowKitProvider/AvatarContext.ts
var defaultAvatar = EmojiAvatar;
var AvatarContext = createContext2(defaultAvatar);

// src/components/Avatar/Avatar.tsx
function Avatar({ address, imageUrl, loading, size }) {
  const AvatarComponent2 = useContext2(AvatarContext);
  return /* @__PURE__ */ React7.createElement(Box, {
    "aria-hidden": true,
    borderRadius: "full",
    overflow: "hidden",
    position: "relative",
    style: {
      height: `${size}px`,
      width: `${size}px`
    },
    userSelect: "none"
  }, /* @__PURE__ */ React7.createElement(Box, {
    alignItems: "center",
    borderRadius: "full",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    style: {
      fontSize: `${Math.round(size * 0.55)}px`,
      height: `${size}px`,
      transform: loading ? "scale(0.72)" : void 0,
      transition: ".25s ease",
      transitionDelay: loading ? void 0 : ".1s",
      width: `${size}px`,
      willChange: "transform"
    },
    userSelect: "none"
  }, /* @__PURE__ */ React7.createElement(AvatarComponent2, {
    address,
    ensImage: imageUrl,
    size
  })), typeof loading === "boolean" && /* @__PURE__ */ React7.createElement(Box, {
    color: "accentColor",
    display: "flex",
    height: "full",
    position: "absolute",
    style: {
      opacity: loading ? 1 : 0,
      transition: loading ? "0.6s ease" : "0.2s ease",
      transitionDelay: loading ? ".05s" : void 0
    },
    width: "full"
  }, /* @__PURE__ */ React7.createElement(SpinnerIcon, {
    height: "100%",
    width: "100%"
  })));
}

// src/components/Icons/Dropdown.tsx
import React8 from "react";
var DropdownIcon = () => /* @__PURE__ */ React8.createElement("svg", {
  fill: "none",
  height: "7",
  width: "14",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React8.createElement("path", {
  d: "M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2.5",
  xmlns: "http://www.w3.org/2000/svg"
}));

// src/components/RainbowKitProvider/RainbowKitChainContext.tsx
import React9, { createContext as createContext3, useContext as useContext3, useMemo as useMemo4 } from "react";

// src/utils/isNotNullish.ts
function isNotNullish(value) {
  return value != null;
}

// src/components/RainbowKitProvider/provideRainbowKitChains.ts
var arbitrumIcon = {
  iconBackground: "#96bedc",
  iconUrl: async () => (await import("./arbitrum-LYDBJZP3.js")).default
};
var avalancheIcon = {
  iconBackground: "#e84141",
  iconUrl: async () => (await import("./avalanche-TFPKP544.js")).default
};
var baseIcon = {
  iconBackground: "#0052ff",
  iconUrl: async () => (await import("./base-3MIUIYGA.js")).default
};
var bscIcon = {
  iconBackground: "#ebac0e",
  iconUrl: async () => (await import("./bsc-S2GSW6VX.js")).default
};
var cronosIcon = {
  iconBackground: "#002D74",
  iconUrl: async () => (await import("./cronos-DQKKIEX7.js")).default
};
var ethereumIcon = {
  iconBackground: "#484c50",
  iconUrl: async () => (await import("./ethereum-4FY57XJF.js")).default
};
var hardhatIcon = {
  iconBackground: "#f9f7ec",
  iconUrl: async () => (await import("./hardhat-ARRFHFKB.js")).default
};
var optimismIcon = {
  iconBackground: "#ff5a57",
  iconUrl: async () => (await import("./optimism-UUP5Y7TB.js")).default
};
var polygonIcon = {
  iconBackground: "#9f71ec",
  iconUrl: async () => (await import("./polygon-Z4QITDL7.js")).default
};
var zoraIcon = {
  iconBackground: "#000000",
  iconUrl: async () => (await import("./zora-KVO7WIOK.js")).default
};
var lineaIcon = {
  iconBackground: "#000",
  iconUrl: async () => (await import("./linea-WUVDS2VF.js")).default
};
var lineaTestIcon = {
  iconBackground: "#4BDCFD",
  iconUrl: async () => (await import("./linea_test-TWDT5MLC.js")).default
};
var GSCIcon = {
  iconBackground: "#131313",
  iconUrl: async () => (await import("./gsc-463CENVF.js")).default
};
var ScrollIcon = {
  iconBackground: "#131313",
  iconUrl: async () => (await import("./scroll-KXMCXGPD.js")).default
};
var chainMetadataByName = {
  arbitrum: { chainId: 42161, name: "Arbitrum", ...arbitrumIcon },
  arbitrumGoerli: { chainId: 421613, ...arbitrumIcon },
  avalanche: { chainId: 43114, ...avalancheIcon },
  avalancheFuji: { chainId: 43113, ...avalancheIcon },
  base: { chainId: 8453, ...baseIcon },
  baseGoerli: { chainId: 84531, ...baseIcon },
  bsc: { chainId: 56, name: "BSC", ...bscIcon },
  bscTestnet: { chainId: 97, ...bscIcon },
  cronos: { chainId: 25, ...cronosIcon },
  cronosTestnet: { chainId: 338, ...cronosIcon },
  goerli: { chainId: 5, ...ethereumIcon },
  hardhat: { chainId: 31337, ...hardhatIcon },
  kovan: { chainId: 42, ...ethereumIcon },
  localhost: { chainId: 1337, ...ethereumIcon },
  mainnet: { chainId: 1, ...ethereumIcon },
  optimism: { chainId: 10, name: "Optimism", ...optimismIcon },
  optimismGoerli: { chainId: 420, ...optimismIcon },
  optimismKovan: { chainId: 69, ...optimismIcon },
  polygon: { chainId: 137, ...polygonIcon },
  polygonMumbai: { chainId: 80001, ...polygonIcon },
  rinkeby: { chainId: 4, ...ethereumIcon },
  ropsten: { chainId: 3, ...ethereumIcon },
  sepolia: { chainId: 11155111, ...ethereumIcon },
  zora: { chainId: 7777777, ...zoraIcon },
  zoraTestnet: { chainId: 999, ...zoraIcon },
  lineaMainnet: { chainId: 59144, ...lineaIcon },
  lineaTestnet: { chainId: 59140, ...lineaTestIcon },
  opBNBMainnet: { chainId: 204, ...bscIcon },
  opBNBTestnet: { chainId: 5611, ...bscIcon },
  polygonZkEVMTestnet: { chainId: 1442, ...polygonIcon },
  GSCTestnet: { chainId: 1205, ...GSCIcon },
  scrollSepolia: { chainId: 534351, ...ScrollIcon }
};
var chainMetadataById = Object.fromEntries(
  Object.values(chainMetadataByName).filter(isNotNullish).map(({ chainId, ...metadata }) => [chainId, metadata])
);
var provideRainbowKitChains = (chains) => chains.map((chain) => {
  var _a;
  return {
    ...chain,
    ...(_a = chainMetadataById[chain.id]) != null ? _a : {}
  };
});

// src/components/RainbowKitProvider/RainbowKitChainContext.tsx
var RainbowKitChainContext = createContext3({
  chains: []
});
function RainbowKitChainProvider({ chains, children, initialChain }) {
  return /* @__PURE__ */ React9.createElement(RainbowKitChainContext.Provider, {
    value: useMemo4(
      () => ({
        chains: provideRainbowKitChains(chains),
        initialChainId: typeof initialChain === "number" ? initialChain : initialChain == null ? void 0 : initialChain.id
      }),
      [chains, initialChain]
    )
  }, children);
}
var useRainbowKitChains = () => {
  return useContext3(RainbowKitChainContext).chains;
};
var useInitialChainId = () => useContext3(RainbowKitChainContext).initialChainId;
var useRainbowKitChainsById = () => {
  const rainbowkitChains = useRainbowKitChains();
  return useMemo4(() => {
    const rainbowkitChainsById = {};
    rainbowkitChains.forEach((rkChain) => {
      rainbowkitChainsById[rkChain.id] = rkChain;
    });
    return rainbowkitChainsById;
  }, [rainbowkitChains]);
};

// src/components/ConnectButton/ConnectButtonRenderer.tsx
import React54, { useContext as useContext16 } from "react";
import { useAccount as useAccount11, useBalance as useBalance2, useNetwork as useNetwork7 } from "wagmi";

// src/hooks/useIsMounted.ts
import { useEffect as useEffect4, useReducer as useReducer3 } from "react";
var useIsMounted = () => {
  const [mounted, setMounted] = useReducer3(() => true, false);
  useEffect4(setMounted, [setMounted]);
  return mounted;
};

// src/hooks/useMainnetEnsAvatar.ts
import { useEnsAvatar } from "wagmi";

// src/hooks/useMainnet.ts
import { usePublicClient } from "wagmi";
import { mainnet } from "wagmi/chains";
function useMainnet() {
  const chainId = mainnet.id;
  const provider = usePublicClient();
  const chains = Array.isArray(provider.chains) ? provider.chains : [];
  const enabled = chains == null ? void 0 : chains.some((chain) => (chain == null ? void 0 : chain.id) === chainId);
  return { chainId, enabled };
}

// src/hooks/useMainnetEnsAvatar.ts
function useMainnetEnsAvatar(name) {
  const { chainId, enabled } = useMainnet();
  const { data: ensAvatar } = useEnsAvatar({
    chainId,
    enabled,
    name
  });
  return ensAvatar;
}

// src/hooks/useMainnetEnsName.ts
import { useEnsName } from "wagmi";
function useMainnetEnsName(address) {
  const { chainId, enabled } = useMainnet();
  const { data: ensName } = useEnsName({
    address,
    chainId,
    enabled
  });
  return ensName;
}

// src/transactions/useRecentTransactions.ts
import { useEffect as useEffect6, useState as useState3 } from "react";
import { useAccount as useAccount4 } from "wagmi";

// src/hooks/useChainId.ts
import { useNetwork } from "wagmi";
function useChainId() {
  var _a;
  const { chain: activeChain } = useNetwork();
  return (_a = activeChain == null ? void 0 : activeChain.id) != null ? _a : null;
}

// src/transactions/TransactionStoreContext.tsx
import React10, { createContext as createContext4, useContext as useContext4, useEffect as useEffect5, useState as useState2 } from "react";
import { useAccount as useAccount3, usePublicClient as usePublicClient2 } from "wagmi";

// src/transactions/transactionStore.ts
var storageKey = "rk-transactions";
function safeParseJsonData(string) {
  try {
    const value = string ? JSON.parse(string) : {};
    return typeof value === "object" ? value : {};
  } catch (err) {
    return {};
  }
}
function loadData() {
  return safeParseJsonData(
    typeof localStorage !== "undefined" ? localStorage.getItem(storageKey) : null
  );
}
var transactionHashRegex = /^0x([A-Fa-f0-9]{64})$/;
function validateTransaction(transaction) {
  const errors = [];
  if (!transactionHashRegex.test(transaction.hash)) {
    errors.push("Invalid transaction hash");
  }
  if (typeof transaction.description !== "string") {
    errors.push("Transaction must have a description");
  }
  if (typeof transaction.confirmations !== "undefined" && (!Number.isInteger(transaction.confirmations) || transaction.confirmations < 1)) {
    errors.push("Transaction confirmations must be a positiver integer");
  }
  return errors;
}
function createTransactionStore({
  provider: initialProvider
}) {
  let data = loadData();
  let provider = initialProvider;
  const listeners = /* @__PURE__ */ new Set();
  const transactionRequestCache = /* @__PURE__ */ new Map();
  function setProvider(newProvider) {
    provider = newProvider;
  }
  function getTransactions(account, chainId) {
    var _a, _b;
    return (_b = (_a = data[account]) == null ? void 0 : _a[chainId]) != null ? _b : [];
  }
  function addTransaction(account, chainId, transaction) {
    const errors = validateTransaction(transaction);
    if (errors.length > 0) {
      throw new Error(["Unable to add transaction", ...errors].join("\n"));
    }
    updateTransactions(account, chainId, (transactions) => {
      return [
        { ...transaction, status: "pending" },
        ...transactions.filter(({ hash }) => {
          return hash !== transaction.hash;
        })
      ];
    });
  }
  function clearTransactions(account, chainId) {
    updateTransactions(account, chainId, () => {
      return [];
    });
  }
  function setTransactionStatus(account, chainId, hash, status) {
    updateTransactions(account, chainId, (transactions) => {
      return transactions.map(
        (transaction) => transaction.hash === hash ? { ...transaction, status } : transaction
      );
    });
  }
  async function waitForPendingTransactions(account, chainId) {
    await Promise.all(
      getTransactions(account, chainId).filter((transaction) => transaction.status === "pending").map(async (transaction) => {
        const { confirmations, hash } = transaction;
        const existingRequest = transactionRequestCache.get(hash);
        if (existingRequest) {
          return await existingRequest;
        }
        const requestPromise = provider.waitForTransactionReceipt({ confirmations, hash }).then(({ status }) => {
          transactionRequestCache.delete(hash);
          if (status === void 0) {
            return;
          }
          setTransactionStatus(
            account,
            chainId,
            hash,
            status === 0 || status === "reverted" ? "failed" : "confirmed"
          );
        });
        transactionRequestCache.set(hash, requestPromise);
        return await requestPromise;
      })
    );
  }
  function updateTransactions(account, chainId, updateFn) {
    var _a, _b;
    data = loadData();
    data[account] = (_a = data[account]) != null ? _a : {};
    let completedTransactionCount = 0;
    const MAX_COMPLETED_TRANSACTIONS = 10;
    const transactions = updateFn((_b = data[account][chainId]) != null ? _b : []).filter(({ status }) => {
      return status === "pending" ? true : completedTransactionCount++ <= MAX_COMPLETED_TRANSACTIONS;
    });
    data[account][chainId] = transactions.length > 0 ? transactions : void 0;
    persistData();
    notifyListeners();
    waitForPendingTransactions(account, chainId);
  }
  function persistData() {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }
  function notifyListeners() {
    listeners.forEach((listener) => listener());
  }
  function onChange(fn) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }
  return {
    addTransaction,
    clearTransactions,
    getTransactions,
    onChange,
    setProvider,
    waitForPendingTransactions
  };
}

// src/transactions/TransactionStoreContext.tsx
var storeSingleton;
var TransactionStoreContext = createContext4(null);
function TransactionStoreProvider({ children }) {
  const provider = usePublicClient2();
  const { address } = useAccount3();
  const chainId = useChainId();
  const [store] = useState2(() => storeSingleton != null ? storeSingleton : storeSingleton = createTransactionStore({ provider }));
  useEffect5(() => {
    store.setProvider(provider);
  }, [store, provider]);
  useEffect5(() => {
    if (address && chainId) {
      store.waitForPendingTransactions(address, chainId);
    }
  }, [store, address, chainId]);
  return /* @__PURE__ */ React10.createElement(TransactionStoreContext.Provider, {
    value: store
  }, children);
}
function useTransactionStore() {
  const store = useContext4(TransactionStoreContext);
  if (!store) {
    throw new Error("Transaction hooks must be used within RainbowKitProvider");
  }
  return store;
}

// src/transactions/useRecentTransactions.ts
function useRecentTransactions() {
  const store = useTransactionStore();
  const { address } = useAccount4();
  const chainId = useChainId();
  const [transactions, setTransactions] = useState3(
    () => store && address && chainId ? store.getTransactions(address, chainId) : []
  );
  useEffect6(() => {
    if (store && address && chainId) {
      setTransactions(store.getTransactions(address, chainId));
      return store.onChange(() => {
        setTransactions(store.getTransactions(address, chainId));
      });
    }
  }, [store, address, chainId]);
  return transactions;
}

// src/components/RainbowKitProvider/ModalContext.tsx
import React53, { createContext as createContext10, useCallback as useCallback10, useContext as useContext15, useMemo as useMemo6, useRef as useRef5, useState as useState11 } from "react";
import { useAccount as useAccount10, useNetwork as useNetwork6 } from "wagmi";

// src/components/AccountModal/AccountModal.tsx
import React33 from "react";
import { useAccount as useAccount9, useBalance, useDisconnect as useDisconnect2 } from "wagmi";

// src/components/Dialog/Dialog.tsx
import React21, { useCallback as useCallback5, useEffect as useEffect11, useState as useState5 } from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";

// src/components/RainbowKitProvider/RainbowKitProvider.tsx
import React19, { createContext as createContext9, useContext as useContext5 } from "react";
import { useAccount as useAccount6 } from "wagmi";

// src/css/cssObjectFromTheme.ts
import { assignInlineVars } from "@vanilla-extract/dynamic";
var resolveThemeVars = (theme) => typeof theme === "function" ? theme() : theme;
function cssObjectFromTheme(theme, { extends: baseTheme } = {}) {
  const resolvedThemeVars = {
    ...assignInlineVars(themeVars, resolveThemeVars(theme))
  };
  if (!baseTheme) {
    return resolvedThemeVars;
  }
  const resolvedBaseThemeVars = assignInlineVars(
    themeVars,
    resolveThemeVars(baseTheme)
  );
  const filteredVars = Object.fromEntries(
    Object.entries(resolvedThemeVars).filter(
      ([varName, value]) => value !== resolvedBaseThemeVars[varName]
    )
  );
  return filteredVars;
}

// src/css/cssStringFromTheme.ts
function cssStringFromTheme(theme, options = {}) {
  return Object.entries(cssObjectFromTheme(theme, options)).map(([key, value]) => `${key}:${value.replace(/[:;{}</>]/g, "")};`).join("");
}

// src/hooks/useWindowSize.ts
import { useEffect as useEffect7, useState as useState4 } from "react";
var useWindowSize = () => {
  const [windowSize, setWindowSize] = useState4({
    height: void 0,
    width: void 0
  });
  useEffect7(() => {
    function handleResize() {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

// src/components/RainbowKitProvider/AppContext.ts
import { createContext as createContext5 } from "react";
var defaultAppInfo = {
  appName: void 0,
  disclaimer: void 0,
  learnMoreUrl: "https://learn.rainbow.me/understanding-web3?utm_source=rainbowkit&utm_campaign=learnmore"
};
var AppContext = createContext5(defaultAppInfo);

// src/components/RainbowKitProvider/CoolModeContext.ts
import { createContext as createContext6 } from "react";
var CoolModeContext = createContext6(false);

// src/components/RainbowKitProvider/ModalSizeContext.ts
import { createContext as createContext7 } from "react";
var ModalSizeOptions = {
  COMPACT: "compact",
  WIDE: "wide"
};
var ModalSizeContext = createContext7(
  ModalSizeOptions.WIDE
);

// src/components/RainbowKitProvider/ShowRecentTransactionsContext.ts
import { createContext as createContext8 } from "react";
var ShowRecentTransactionsContext = createContext8(false);

// src/components/RainbowKitProvider/useFingerprint.ts
import { useCallback, useEffect as useEffect8 } from "react";
var storageKey2 = "rk-version";
function setRainbowKitVersion({ version }) {
  localStorage.setItem(storageKey2, version);
}
function useFingerprint() {
  const fingerprint = useCallback(() => {
    setRainbowKitVersion({ version: "1.0.10" });
  }, []);
  useEffect8(() => {
    fingerprint();
  }, [fingerprint]);
}

// src/components/RainbowKitProvider/usePreloadImages.ts
import { useCallback as useCallback3, useEffect as useEffect9 } from "react";

// src/wallets/useWalletConnectors.ts
import { useConnect } from "wagmi";

// src/utils/flatten.ts
function flatten(array) {
  const flattenedItems = [];
  for (const items of array) {
    flattenedItems.push(...items);
  }
  return flattenedItems;
}

// src/utils/indexBy.ts
function indexBy(items, getKey) {
  const indexedItems = {};
  items.forEach((item) => {
    const key = getKey(item);
    if (!key) {
      return;
    }
    indexedItems[key] = item;
  });
  return indexedItems;
}

// src/utils/browsers.ts
function isSafari() {
  return typeof navigator !== "undefined" && /Version\/([0-9._]+).*Safari/.test(navigator.userAgent);
}
function isArc() {
  return typeof document !== "undefined" && getComputedStyle(document.body).getPropertyValue("--arc-palette-focus") !== "";
}
function getBrowser() {
  var _a;
  if (typeof navigator === "undefined")
    return "Browser" /* Browser */;
  const ua = navigator.userAgent.toLowerCase();
  if ((_a = navigator.brave) == null ? void 0 : _a.isBrave)
    return "Brave" /* Brave */;
  else if (ua.indexOf("edg/") > -1)
    return "Edge" /* Edge */;
  else if (ua.indexOf("op") > -1)
    return "Opera" /* Opera */;
  else if (isArc())
    return "Arc" /* Arc */;
  else if (ua.indexOf("chrome") > -1)
    return "Chrome" /* Chrome */;
  else if (ua.indexOf("firefox") > -1)
    return "Firefox" /* Firefox */;
  else if (isSafari())
    return "Safari" /* Safari */;
  return "Browser" /* Browser */;
}

// src/wallets/downloadUrls.ts
var getExtensionDownloadUrl = (wallet) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const browser = getBrowser();
  return (_l = {
    ["Arc" /* Arc */]: (_a = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _a.chrome,
    ["Brave" /* Brave */]: (_b = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _b.chrome,
    ["Chrome" /* Chrome */]: (_c = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _c.chrome,
    ["Edge" /* Edge */]: ((_d = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _d.edge) || ((_e = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _e.chrome),
    ["Firefox" /* Firefox */]: (_f = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _f.firefox,
    ["Opera" /* Opera */]: ((_g = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _g.opera) || ((_h = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _h.chrome),
    ["Safari" /* Safari */]: (_i = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _i.safari,
    ["Browser" /* Browser */]: (_j = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _j.browserExtension
  }[browser]) != null ? _l : (_k = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _k.browserExtension;
};
var getMobileDownloadUrl = (wallet) => {
  var _a, _b, _c, _d;
  const ios = isIOS();
  return (_d = ios ? (_a = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _a.ios : (_b = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _b.android) != null ? _d : (_c = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _c.mobile;
};

// src/wallets/recentWalletIds.ts
var storageKey3 = "rk-recent";
function safeParseJsonArray(string) {
  try {
    const value = string ? JSON.parse(string) : [];
    return Array.isArray(value) ? value : [];
  } catch (err) {
    return [];
  }
}
function getRecentWalletIds() {
  return typeof localStorage !== "undefined" ? safeParseJsonArray(localStorage.getItem(storageKey3)) : [];
}
function dedupe(array) {
  return [...new Set(array)];
}
function addRecentWalletId(walletId) {
  const newValue = dedupe([walletId, ...getRecentWalletIds()]);
  localStorage.setItem(storageKey3, JSON.stringify(newValue));
}

// src/wallets/useWalletConnectors.ts
function useWalletConnectors() {
  const rainbowKitChains = useRainbowKitChains();
  const intialChainId = useInitialChainId();
  const { connectAsync, connectors: defaultConnectors_untyped } = useConnect();
  const defaultConnectors = defaultConnectors_untyped;
  async function connectWallet(walletId, connector) {
    var _a, _b, _c;
    const walletChainId = await connector.getChainId();
    const result = await connectAsync({
      chainId: (_c = intialChainId != null ? intialChainId : (_a = rainbowKitChains.find(({ id }) => id === walletChainId)) == null ? void 0 : _a.id) != null ? _c : (_b = rainbowKitChains[0]) == null ? void 0 : _b.id,
      connector
    });
    if (result) {
      addRecentWalletId(walletId);
    }
    return result;
  }
  async function connectToWalletConnectModal(walletId, walletConnectModalConnector) {
    try {
      return await connectWallet(walletId, walletConnectModalConnector);
    } catch (err) {
      const isUserRejection = err.name === "UserRejectedRequestError" || err.message === "Connection request reset. Please try again.";
      if (!isUserRejection) {
        throw err;
      }
    }
  }
  const walletInstances = flatten(
    defaultConnectors.map((connector) => {
      var _a;
      return (_a = connector._wallets) != null ? _a : [];
    })
  ).sort((a, b) => a.index - b.index);
  const walletInstanceById = indexBy(walletInstances, (walletInstance) => walletInstance.id);
  const MAX_RECENT_WALLETS = 3;
  const recentWallets = getRecentWalletIds().map((walletId) => walletInstanceById[walletId]).filter(isNotNullish).slice(0, MAX_RECENT_WALLETS);
  const groupedWallets = [...recentWallets, ...walletInstances.filter((walletInstance) => !recentWallets.includes(walletInstance))];
  const walletConnectors = [];
  groupedWallets.forEach((wallet) => {
    var _a;
    if (!wallet) {
      return;
    }
    const recent = recentWallets.includes(wallet);
    walletConnectors.push({
      ...wallet,
      connect: () => wallet.connector.showQrModal ? connectToWalletConnectModal(wallet.id, wallet.connector) : connectWallet(wallet.id, wallet.connector),
      extensionDownloadUrl: getExtensionDownloadUrl(wallet),
      groupName: wallet.groupName,
      mobileDownloadUrl: getMobileDownloadUrl(wallet),
      onConnecting: (fn) => wallet.connector.on("message", ({ type }) => type === "connecting" ? fn() : void 0),
      ready: ((_a = wallet.installed) != null ? _a : true) && wallet.connector.ready,
      recent,
      showWalletConnectModal: wallet.walletConnectModalConnector ? () => connectToWalletConnectModal(wallet.id, wallet.walletConnectModalConnector) : void 0
    });
  });
  return walletConnectors;
}

// src/components/Icons/Assets.tsx
import React12 from "react";
var src = async () => (await import("./assets-26YY4GVD.js")).default;
var preloadAssetsIcon = () => loadImages(src);
var AssetsIcon = () => /* @__PURE__ */ React12.createElement(AsyncImage, {
  background: "#d0d5de",
  borderRadius: "10",
  height: "48",
  src,
  width: "48"
});

// src/components/Icons/Login.tsx
import React13 from "react";
var src2 = async () => (await import("./login-ZSMM5UYL.js")).default;
var preloadLoginIcon = () => loadImages(src2);
var LoginIcon = () => /* @__PURE__ */ React13.createElement(AsyncImage, {
  background: "#d0d5de",
  borderRadius: "10",
  height: "48",
  src: src2,
  width: "48"
});

// src/components/SignIn/SignIn.tsx
import React18, { useCallback as useCallback2, useRef as useRef2 } from "react";
import { UserRejectedRequestError } from "viem";
import { useAccount as useAccount5, useDisconnect, useNetwork as useNetwork2, useSignMessage } from "wagmi";

// src/components/Button/ActionButton.tsx
import React15 from "react";

// src/components/Text/Text.tsx
import React14 from "react";
var Text = React14.forwardRef(
  ({
    as = "div",
    children,
    className,
    color,
    display,
    font = "body",
    id,
    size = "16",
    style,
    tabIndex,
    textAlign = "inherit",
    weight = "regular"
  }, ref) => {
    return /* @__PURE__ */ React14.createElement(Box, {
      as,
      className,
      color,
      display,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      id,
      ref,
      style,
      tabIndex,
      textAlign
    }, children);
  }
);
Text.displayName = "Text";

// src/components/Button/ActionButton.tsx
var sizeVariants = {
  large: {
    fontSize: "16",
    paddingX: "24",
    paddingY: "10"
  },
  medium: {
    fontSize: "14",
    height: "28",
    paddingX: "12",
    paddingY: "4"
  },
  small: {
    fontSize: "14",
    paddingX: "10",
    paddingY: "5"
  }
};
function ActionButton({
  disabled = false,
  href,
  label,
  onClick,
  rel = "noreferrer noopener",
  size = "medium",
  target = "_blank",
  testId,
  type = "primary"
}) {
  const isPrimary = type === "primary";
  const isNotLarge = size !== "large";
  const mobile = isMobile();
  const background = !disabled ? isPrimary ? "accentColor" : isNotLarge ? "actionButtonSecondaryBackground" : null : "actionButtonSecondaryBackground";
  const { fontSize, height, paddingX, paddingY } = sizeVariants[size];
  const hasBorder = !mobile || !isNotLarge;
  return /* @__PURE__ */ React15.createElement(Box, {
    ...href ? !disabled ? { as: "a", href, rel, target } : {} : { as: "button", type: "button" },
    onClick: !disabled ? onClick : void 0,
    ...hasBorder ? {
      borderColor: mobile && !isNotLarge && !isPrimary ? "actionButtonBorderMobile" : "actionButtonBorder",
      borderStyle: "solid",
      borderWidth: "1"
    } : {},
    borderRadius: "actionButton",
    className: !disabled && touchableStyles({ active: "shrinkSm", hover: "grow" }),
    display: "block",
    paddingX,
    paddingY,
    style: { willChange: "transform" },
    testId,
    textAlign: "center",
    transition: "transform",
    ...background ? { background } : {},
    ...height ? { height } : {}
  }, /* @__PURE__ */ React15.createElement(Text, {
    color: !disabled ? isPrimary ? "accentColorForeground" : "accentColor" : "modalTextSecondary",
    size: fontSize,
    weight: "bold"
  }, label));
}

// src/components/CloseButton/CloseButton.tsx
import React17 from "react";

// src/components/Icons/Close.tsx
import React16 from "react";
var CloseIcon = () => {
  return isMobile() ? /* @__PURE__ */ React16.createElement("svg", {
    "aria-hidden": true,
    fill: "none",
    height: "11.5",
    viewBox: "0 0 11.5 11.5",
    width: "11.5",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React16.createElement("path", {
    d: "M2.13388 0.366117C1.64573 -0.122039 0.854272 -0.122039 0.366117 0.366117C-0.122039 0.854272 -0.122039 1.64573 0.366117 2.13388L3.98223 5.75L0.366117 9.36612C-0.122039 9.85427 -0.122039 10.6457 0.366117 11.1339C0.854272 11.622 1.64573 11.622 2.13388 11.1339L5.75 7.51777L9.36612 11.1339C9.85427 11.622 10.6457 11.622 11.1339 11.1339C11.622 10.6457 11.622 9.85427 11.1339 9.36612L7.51777 5.75L11.1339 2.13388C11.622 1.64573 11.622 0.854272 11.1339 0.366117C10.6457 -0.122039 9.85427 -0.122039 9.36612 0.366117L5.75 3.98223L2.13388 0.366117Z",
    fill: "currentColor"
  })) : /* @__PURE__ */ React16.createElement("svg", {
    "aria-hidden": true,
    fill: "none",
    height: "10",
    viewBox: "0 0 10 10",
    width: "10",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React16.createElement("path", {
    d: "M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L3.58579 5L0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683417 10.0976 1.31658 10.0976 1.70711 9.70711L5 6.41421L8.29289 9.70711C8.68342 10.0976 9.31658 10.0976 9.70711 9.70711C10.0976 9.31658 10.0976 8.68342 9.70711 8.29289L6.41421 5L9.70711 1.70711C10.0976 1.31658 10.0976 0.683417 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L5 3.58579L1.70711 0.292893Z",
    fill: "currentColor"
  }));
};

// src/components/CloseButton/CloseButton.tsx
var CloseButton = ({
  "aria-label": ariaLabel = "Close",
  onClose
}) => {
  const mobile = isMobile();
  return /* @__PURE__ */ React17.createElement(Box, {
    alignItems: "center",
    "aria-label": ariaLabel,
    as: "button",
    background: "closeButtonBackground",
    borderColor: "actionButtonBorder",
    borderRadius: "full",
    borderStyle: "solid",
    borderWidth: mobile ? "0" : "1",
    className: touchableStyles({ active: "shrinkSm", hover: "growLg" }),
    color: "closeButton",
    display: "flex",
    height: mobile ? "30" : "28",
    justifyContent: "center",
    onClick: onClose,
    style: { willChange: "transform" },
    transition: "default",
    type: "button",
    width: mobile ? "30" : "28"
  }, /* @__PURE__ */ React17.createElement(CloseIcon, null));
};

// src/components/SignIn/SignIn.tsx
var signInIcon = async () => (await import("./sign-FZVB2CS6.js")).default;
function SignIn({ onClose }) {
  const [{ status, ...state }, setState] = React18.useState({ status: "idle" });
  const authAdapter = useAuthenticationAdapter();
  const getNonce = useCallback2(async () => {
    try {
      const nonce = await authAdapter.getNonce();
      setState((x) => ({ ...x, nonce }));
    } catch (error) {
      setState((x) => ({
        ...x,
        errorMessage: "Error preparing message, please retry!",
        status: "idle"
      }));
    }
  }, [authAdapter]);
  const onceRef = useRef2(false);
  React18.useEffect(() => {
    if (onceRef.current)
      return;
    onceRef.current = true;
    getNonce();
  }, [getNonce]);
  const mobile = isMobile();
  const { address } = useAccount5();
  const { chain: activeChain } = useNetwork2();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const cancel = () => disconnect();
  const signIn = async () => {
    try {
      const chainId = activeChain == null ? void 0 : activeChain.id;
      const { nonce } = state;
      if (!address || !chainId || !nonce) {
        return;
      }
      setState((x) => ({
        ...x,
        errorMessage: void 0,
        status: "signing"
      }));
      const message = authAdapter.createMessage({ address, chainId, nonce });
      let signature;
      try {
        signature = await signMessageAsync({
          message: authAdapter.getMessageBody({ message })
        });
      } catch (error) {
        if (error instanceof UserRejectedRequestError) {
          return setState((x) => ({
            ...x,
            status: "idle"
          }));
        }
        return setState((x) => ({
          ...x,
          errorMessage: "Error signing message, please retry!",
          status: "idle"
        }));
      }
      setState((x) => ({ ...x, status: "verifying" }));
      try {
        const verified = await authAdapter.verify({ message, signature });
        if (verified) {
          return;
        } else {
          throw new Error();
        }
      } catch (error) {
        return setState((x) => ({
          ...x,
          errorMessage: "Error verifying signature, please retry!",
          status: "idle"
        }));
      }
    } catch (error) {
      setState({
        errorMessage: "Oops, something went wrong!",
        status: "idle"
      });
    }
  };
  return /* @__PURE__ */ React18.createElement(Box, {
    position: "relative"
  }, /* @__PURE__ */ React18.createElement(Box, {
    display: "flex",
    paddingRight: "16",
    paddingTop: "16",
    position: "absolute",
    right: "0"
  }, /* @__PURE__ */ React18.createElement(CloseButton, {
    onClose
  })), /* @__PURE__ */ React18.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "32" : "24",
    padding: "24",
    paddingX: "18",
    style: { paddingTop: mobile ? "60px" : "36px" }
  }, /* @__PURE__ */ React18.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "6" : "4",
    style: { maxWidth: mobile ? 320 : 280 }
  }, /* @__PURE__ */ React18.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "32" : "16"
  }, /* @__PURE__ */ React18.createElement(AsyncImage, {
    height: 40,
    src: signInIcon,
    width: 40
  }), /* @__PURE__ */ React18.createElement(Text, {
    color: "modalText",
    size: mobile ? "20" : "18",
    textAlign: "center",
    weight: "heavy"
  }, "Verify your account")), /* @__PURE__ */ React18.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "16" : "12"
  }, /* @__PURE__ */ React18.createElement(Text, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    textAlign: "center"
  }, "To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account."), status === "idle" && state.errorMessage ? /* @__PURE__ */ React18.createElement(Text, {
    color: "error",
    size: mobile ? "16" : "14",
    textAlign: "center",
    weight: "bold"
  }, state.errorMessage) : null)), /* @__PURE__ */ React18.createElement(Box, {
    alignItems: !mobile ? "center" : void 0,
    display: "flex",
    flexDirection: "column",
    gap: "8",
    width: "full"
  }, /* @__PURE__ */ React18.createElement(ActionButton, {
    disabled: !state.nonce || status === "signing" || status === "verifying",
    label: !state.nonce ? "Preparing message..." : status === "signing" ? "Waiting for signature..." : status === "verifying" ? "Verifying signature..." : "Send message",
    onClick: signIn,
    size: mobile ? "large" : "medium",
    testId: "auth-message-button"
  }), mobile ? /* @__PURE__ */ React18.createElement(ActionButton, {
    label: "Cancel",
    onClick: cancel,
    size: "large",
    type: "secondary"
  }) : /* @__PURE__ */ React18.createElement(Box, {
    as: "button",
    borderRadius: "full",
    className: touchableStyles({ active: "shrink", hover: "grow" }),
    display: "block",
    onClick: cancel,
    paddingX: "10",
    paddingY: "5",
    rel: "noreferrer",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default"
  }, /* @__PURE__ */ React18.createElement(Text, {
    color: "closeButton",
    size: mobile ? "16" : "14",
    weight: "bold"
  }, "Cancel")))));
}

// src/components/RainbowKitProvider/usePreloadImages.ts
function usePreloadImages() {
  const rainbowKitChains = useRainbowKitChains();
  const walletConnectors = useWalletConnectors();
  const isUnauthenticated = useAuthenticationStatus() === "unauthenticated";
  const preloadImages = useCallback3(() => {
    loadImages(...walletConnectors.map((wallet) => wallet.iconUrl), ...rainbowKitChains.map((chain) => chain.iconUrl).filter(isNotNullish));
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }
    if (isUnauthenticated) {
      loadImages(signInIcon);
    }
  }, [walletConnectors, rainbowKitChains, isUnauthenticated]);
  useEffect9(() => {
    preloadImages();
  }, [preloadImages]);
}

// src/components/RainbowKitProvider/walletConnectDeepLink.ts
var storageKey4 = "WALLETCONNECT_DEEPLINK_CHOICE";
function setWalletConnectDeepLink({
  mobileUri,
  name
}) {
  localStorage.setItem(
    storageKey4,
    JSON.stringify({
      href: mobileUri.split("?")[0],
      name
    })
  );
}
function clearWalletConnectDeepLink() {
  localStorage.removeItem(storageKey4);
}

// src/components/RainbowKitProvider/RainbowKitProvider.tsx
var ThemeIdContext = createContext9(void 0);
var attr = "data-rk";
var createThemeRootProps = (id) => ({ [attr]: id || "" });
var createThemeRootSelector = (id) => {
  if (id && !/^[a-zA-Z0-9_]+$/.test(id)) {
    throw new Error(`Invalid ID: ${id}`);
  }
  return id ? `[${attr}="${id}"]` : `[${attr}]`;
};
var useThemeRootProps = () => {
  const id = useContext5(ThemeIdContext);
  return createThemeRootProps(id);
};
var defaultTheme = lightTheme();
function RainbowKitProvider({
  appInfo,
  avatar,
  chains,
  children,
  coolMode = false,
  id,
  initialChain,
  modalSize = ModalSizeOptions.WIDE,
  showRecentTransactions = false,
  theme = defaultTheme
}) {
  usePreloadImages();
  useFingerprint();
  useAccount6({ onDisconnect: clearWalletConnectDeepLink });
  if (typeof theme === "function") {
    throw new Error(
      'A theme function was provided to the "theme" prop instead of a theme object. You must execute this function to get the resulting theme object.'
    );
  }
  const selector = createThemeRootSelector(id);
  const appContext = {
    ...defaultAppInfo,
    ...appInfo
  };
  const avatarContext = avatar != null ? avatar : defaultAvatar;
  const { width } = useWindowSize();
  const isSmallScreen = width && width < largeScreenMinWidth;
  return /* @__PURE__ */ React19.createElement(RainbowKitChainProvider, {
    chains,
    initialChain
  }, /* @__PURE__ */ React19.createElement(CoolModeContext.Provider, {
    value: coolMode
  }, /* @__PURE__ */ React19.createElement(ModalSizeContext.Provider, {
    value: isSmallScreen ? ModalSizeOptions.COMPACT : modalSize
  }, /* @__PURE__ */ React19.createElement(ShowRecentTransactionsContext.Provider, {
    value: showRecentTransactions
  }, /* @__PURE__ */ React19.createElement(TransactionStoreProvider, null, /* @__PURE__ */ React19.createElement(AvatarContext.Provider, {
    value: avatarContext
  }, /* @__PURE__ */ React19.createElement(AppContext.Provider, {
    value: appContext
  }, /* @__PURE__ */ React19.createElement(ThemeIdContext.Provider, {
    value: id
  }, /* @__PURE__ */ React19.createElement(ModalProvider, null, theme ? /* @__PURE__ */ React19.createElement("div", {
    ...createThemeRootProps(id)
  }, /* @__PURE__ */ React19.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: [
        `${selector}{${cssStringFromTheme("lightMode" in theme ? theme.lightMode : theme)}}`,
        "darkMode" in theme ? `@media(prefers-color-scheme:dark){${selector}{${cssStringFromTheme(theme.darkMode, {
          extends: theme.lightMode
        })}}}` : null
      ].join("")
    }
  }), children) : children)))))))));
}

// src/components/Dialog/Dialog.css.ts
var content = "Dialog_content__9pm4ki5 sprinkles_display_flex_smallScreen__ju367va sprinkles_flexDirection_column__ju367v11 sprinkles_position_relative__ju367v8q";
var overlay = "Dialog_overlay__9pm4ki3 sprinkles_backdropFilter_modalOverlay__ju367v9g sprinkles_background_modalBackdrop_base__ju367vb5 sprinkles_display_flex_smallScreen__ju367va sprinkles_justifyContent_center__ju367v2n sprinkles_position_fixed__ju367v8p";

// src/components/Dialog/FocusTrap.tsx
import React20, { useCallback as useCallback4, useEffect as useEffect10, useRef as useRef3 } from "react";
var moveFocusWithin = (element2, position) => {
  const focusableElements = element2.querySelectorAll(
    "button:not(:disabled), a[href]"
  );
  if (focusableElements.length === 0)
    return;
  focusableElements[position === "end" ? focusableElements.length - 1 : 0].focus();
};
function FocusTrap(props) {
  const contentRef = useRef3(null);
  useEffect10(() => {
    const previouslyActiveElement = document.activeElement;
    return () => {
      var _a;
      (_a = previouslyActiveElement.focus) == null ? void 0 : _a.call(previouslyActiveElement);
    };
  }, []);
  useEffect10(() => {
    if (contentRef.current) {
      const elementToFocus = contentRef.current.querySelector("[data-auto-focus]");
      if (elementToFocus) {
        elementToFocus.focus();
      } else {
        contentRef.current.focus();
      }
    }
  }, [contentRef]);
  return /* @__PURE__ */ React20.createElement(React20.Fragment, null, /* @__PURE__ */ React20.createElement("div", {
    onFocus: useCallback4(
      () => contentRef.current && moveFocusWithin(contentRef.current, "end"),
      []
    ),
    tabIndex: 0
  }), /* @__PURE__ */ React20.createElement("div", {
    ref: contentRef,
    style: { outline: "none" },
    tabIndex: -1,
    ...props
  }), /* @__PURE__ */ React20.createElement("div", {
    onFocus: useCallback4(
      () => contentRef.current && moveFocusWithin(contentRef.current, "start"),
      []
    ),
    tabIndex: 0
  }));
}

// src/components/Dialog/Dialog.tsx
var stopPropagation = (event) => event.stopPropagation();
function Dialog({ children, onClose, open, titleId }) {
  useEffect11(() => {
    const handleEscape = (event) => open && event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);
  const [bodyScrollable, setBodyScrollable] = useState5(true);
  useEffect11(() => {
    setBodyScrollable(getComputedStyle(window.document.body).overflow !== "hidden");
  }, []);
  const handleBackdropClick = useCallback5(() => onClose(), [onClose]);
  const themeRootProps = useThemeRootProps();
  const mobile = isMobile();
  return /* @__PURE__ */ React21.createElement(React21.Fragment, null, open ? createPortal(
    /* @__PURE__ */ React21.createElement(RemoveScroll, {
      enabled: bodyScrollable
    }, /* @__PURE__ */ React21.createElement(Box, {
      ...themeRootProps
    }, /* @__PURE__ */ React21.createElement(Box, {
      ...themeRootProps,
      alignItems: mobile ? "flex-end" : "center",
      "aria-labelledby": titleId,
      "aria-modal": true,
      className: overlay,
      onClick: handleBackdropClick,
      position: "fixed",
      role: "dialog"
    }, /* @__PURE__ */ React21.createElement(FocusTrap, {
      className: content,
      onClick: stopPropagation,
      role: "document"
    }, children)))),
    document.body
  ) : null);
}

// src/components/Dialog/DialogContent.tsx
import React22, { useContext as useContext6 } from "react";

// src/components/Dialog/DialogContent.css.ts
var bottomSheetOverrides = "DialogContent_bottomSheetOverrides__1ckjpok7";
var dialogContent = "DialogContent_dialogContent__1ckjpok1 sprinkles_background_modalBackground_base__ju367vb8 sprinkles_borderColor_modalBorder_base__ju367vdz sprinkles_borderRadius_modal__ju367vp sprinkles_borderStyle_solid__ju367vt sprinkles_borderWidth_1__ju367vv sprinkles_boxShadow_dialog_base__ju367vew sprinkles_display_flex_smallScreen__ju367va sprinkles_flexDirection_column__ju367v11 sprinkles_overflow_hidden__ju367v6b sprinkles_position_relative__ju367v8q";
var dialogContentCompactMode = "DialogContent_dialogContentCompactMode__1ckjpok4 DialogContent_dialogContent__1ckjpok1 sprinkles_background_modalBackground_base__ju367vb8 sprinkles_borderColor_modalBorder_base__ju367vdz sprinkles_borderRadius_modal__ju367vp sprinkles_borderStyle_solid__ju367vt sprinkles_borderWidth_1__ju367vv sprinkles_boxShadow_dialog_base__ju367vew sprinkles_display_flex_smallScreen__ju367va sprinkles_flexDirection_column__ju367v11 sprinkles_overflow_hidden__ju367v6b sprinkles_position_relative__ju367v8q";
var dialogContentMobile = "DialogContent_dialogContentMobile__1ckjpok6 sprinkles_borderRadius_modalMobile__ju367vq";
var dialogContentWideDesktop = "DialogContent_dialogContentWideDesktop__1ckjpok3 DialogContent_dialogContent__1ckjpok1 sprinkles_background_modalBackground_base__ju367vb8 sprinkles_borderColor_modalBorder_base__ju367vdz sprinkles_borderRadius_modal__ju367vp sprinkles_borderStyle_solid__ju367vt sprinkles_borderWidth_1__ju367vv sprinkles_boxShadow_dialog_base__ju367vew sprinkles_display_flex_smallScreen__ju367va sprinkles_flexDirection_column__ju367v11 sprinkles_overflow_hidden__ju367v6b sprinkles_position_relative__ju367v8q";
var dialogContentWideMobile = "DialogContent_dialogContentWideMobile__1ckjpok2 DialogContent_dialogContent__1ckjpok1 sprinkles_background_modalBackground_base__ju367vb8 sprinkles_borderColor_modalBorder_base__ju367vdz sprinkles_borderRadius_modal__ju367vp sprinkles_borderStyle_solid__ju367vt sprinkles_borderWidth_1__ju367vv sprinkles_boxShadow_dialog_base__ju367vew sprinkles_display_flex_smallScreen__ju367va sprinkles_flexDirection_column__ju367v11 sprinkles_overflow_hidden__ju367v6b sprinkles_position_relative__ju367v8q";

// src/components/Dialog/DialogContent.tsx
function DialogContent({
  bottomSheetOnMobile = false,
  children,
  marginTop,
  padding = "16",
  wide = false
}) {
  const mobile = isMobile();
  const modalSize = useContext6(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  return /* @__PURE__ */ React22.createElement(Box, {
    marginTop
  }, /* @__PURE__ */ React22.createElement(Box, {
    className: [
      wide ? mobile ? dialogContentWideMobile : compactModeEnabled ? dialogContentCompactMode : dialogContentWideDesktop : dialogContent,
      mobile ? dialogContentMobile : null,
      mobile && bottomSheetOnMobile ? bottomSheetOverrides : null
    ].join(" ")
  }, /* @__PURE__ */ React22.createElement(Box, {
    padding
  }, children)));
}

// src/components/ProfileDetails/ProfileDetails.tsx
import React32, { useCallback as useCallback7, useContext as useContext8, useEffect as useEffect12, useState as useState6 } from "react";

// src/components/ConnectButton/abbreviateETHBalance.ts
var units = ["k", "m", "b", "t"];
function toPrecision(number, precision = 1) {
  return number.toString().replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), "$1").replace(/(\.[1-9]*)0+$/, "$1").replace(/\.$/, "");
}
function abbreviateETHBalance(number) {
  if (number < 1)
    return toPrecision(number, 3);
  if (number < 10 ** 2)
    return toPrecision(number, 2);
  if (number < 10 ** 4)
    return new Intl.NumberFormat().format(parseFloat(toPrecision(number, 1)));
  const decimalsDivisor = 10 ** 1;
  let result = String(number);
  for (let i = units.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3);
    if (size <= number) {
      number = number * decimalsDivisor / size / decimalsDivisor;
      result = toPrecision(number, 1) + units[i];
      break;
    }
  }
  return result;
}

// src/components/ConnectButton/formatAddress.ts
function formatAddress(address) {
  const leadingChars = 4;
  const trailingChars = 4;
  return address.length < leadingChars + trailingChars ? address : `${address.substring(0, leadingChars)}\u2026${address.substring(
    address.length - trailingChars
  )}`;
}

// src/components/ConnectButton/formatENS.ts
function formatENS(name) {
  const parts = name.split(".");
  const last = parts.pop();
  if (parts.join(".").length > 24) {
    return `${parts.join(".").substring(0, 24)}...`;
  }
  return `${parts.join(".")}.${last}`;
}

// src/components/Icons/Copied.tsx
import React23 from "react";
var CopiedIcon = () => /* @__PURE__ */ React23.createElement("svg", {
  fill: "none",
  height: "13",
  viewBox: "0 0 13 13",
  width: "13",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React23.createElement("path", {
  d: "M4.94568 12.2646C5.41052 12.2646 5.77283 12.0869 6.01892 11.7109L12.39 1.96973C12.5677 1.69629 12.6429 1.44336 12.6429 1.2041C12.6429 0.561523 12.1644 0.0966797 11.5082 0.0966797C11.057 0.0966797 10.7767 0.260742 10.5033 0.691406L4.9115 9.50977L2.07458 5.98926C1.82166 5.68848 1.54822 5.55176 1.16541 5.55176C0.502319 5.55176 0.0238037 6.02344 0.0238037 6.66602C0.0238037 6.95312 0.112671 7.20605 0.358765 7.48633L3.88611 11.7588C4.18005 12.1074 4.50818 12.2646 4.94568 12.2646Z",
  fill: "currentColor"
}));

// src/components/Icons/Copy.tsx
import React24 from "react";
var CopyIcon = () => /* @__PURE__ */ React24.createElement("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 17 16",
  width: "17",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React24.createElement("path", {
  d: "M3.04236 12.3027H4.18396V13.3008C4.18396 14.8525 5.03845 15.7002 6.59705 15.7002H13.6244C15.183 15.7002 16.0375 14.8525 16.0375 13.3008V6.24609C16.0375 4.69434 15.183 3.84668 13.6244 3.84668H12.4828V2.8418C12.4828 1.29688 11.6283 0.442383 10.0697 0.442383H3.04236C1.48376 0.442383 0.629272 1.29004 0.629272 2.8418V9.90332C0.629272 11.4551 1.48376 12.3027 3.04236 12.3027ZM3.23376 10.5391C2.68689 10.5391 2.39294 10.2656 2.39294 9.68457V3.06055C2.39294 2.47949 2.68689 2.21289 3.23376 2.21289H9.8783C10.4252 2.21289 10.7191 2.47949 10.7191 3.06055V3.84668H6.59705C5.03845 3.84668 4.18396 4.69434 4.18396 6.24609V10.5391H3.23376ZM6.78845 13.9365C6.24158 13.9365 5.94763 13.6699 5.94763 13.0889V6.45801C5.94763 5.87695 6.24158 5.61035 6.78845 5.61035H13.433C13.9799 5.61035 14.2738 5.87695 14.2738 6.45801V13.0889C14.2738 13.6699 13.9799 13.9365 13.433 13.9365H6.78845Z",
  fill: "currentColor"
}));

// src/components/Icons/Disconnect.tsx
import React25 from "react";
var DisconnectIcon = () => /* @__PURE__ */ React25.createElement("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 18 16",
  width: "18",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React25.createElement("path", {
  d: "M2.67834 15.5908H9.99963C11.5514 15.5908 12.399 14.7432 12.399 13.1777V10.2656H10.6354V12.9863C10.6354 13.5332 10.3688 13.8271 9.78772 13.8271H2.89026C2.3092 13.8271 2.0426 13.5332 2.0426 12.9863V3.15625C2.0426 2.60254 2.3092 2.30859 2.89026 2.30859H9.78772C10.3688 2.30859 10.6354 2.60254 10.6354 3.15625V5.89746H12.399V2.95801C12.399 1.39941 11.5514 0.544922 9.99963 0.544922H2.67834C1.12659 0.544922 0.278931 1.39941 0.278931 2.95801V13.1777C0.278931 14.7432 1.12659 15.5908 2.67834 15.5908ZM7.43616 8.85059H14.0875L15.0924 8.78906L14.566 9.14453L13.6842 9.96484C13.5406 10.1016 13.4586 10.2861 13.4586 10.4844C13.4586 10.8398 13.7321 11.168 14.1217 11.168C14.3199 11.168 14.4635 11.0928 14.6002 10.9561L16.7809 8.68652C16.986 8.48145 17.0543 8.27637 17.0543 8.06445C17.0543 7.85254 16.986 7.64746 16.7809 7.43555L14.6002 5.17285C14.4635 5.03613 14.3199 4.9541 14.1217 4.9541C13.7321 4.9541 13.4586 5.27539 13.4586 5.6377C13.4586 5.83594 13.5406 6.02734 13.6842 6.15723L14.566 6.98438L15.0924 7.33984L14.0875 7.27148H7.43616C7.01917 7.27148 6.65686 7.62012 6.65686 8.06445C6.65686 8.50195 7.01917 8.85059 7.43616 8.85059Z",
  fill: "currentColor"
}));

// src/components/Txs/TxList.tsx
import React30, { useContext as useContext7 } from "react";
import { useNetwork as useNetwork4 } from "wagmi";

// src/transactions/useClearRecentTransactions.ts
import { useCallback as useCallback6 } from "react";
import { useAccount as useAccount7 } from "wagmi";
function useClearRecentTransactions() {
  const store = useTransactionStore();
  const { address } = useAccount7();
  const chainId = useChainId();
  return useCallback6(() => {
    if (!address || !chainId) {
      throw new Error("No address or chain ID found");
    }
    store.clearTransactions(address, chainId);
  }, [store, address, chainId]);
}

// src/utils/chainToExplorerUrl.ts
var chainToExplorerUrl = (chain) => {
  var _a, _b;
  return (_b = (_a = chain == null ? void 0 : chain.blockExplorers) == null ? void 0 : _a.default) == null ? void 0 : _b.url;
};

// src/components/Icons/ExternalLink.tsx
import React26 from "react";
var ExternalLinkIcon = () => /* @__PURE__ */ React26.createElement("svg", {
  fill: "none",
  height: "19",
  viewBox: "0 0 20 19",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React26.createElement("path", {
  d: "M10 18.9443C15.0977 18.9443 19.2812 14.752 19.2812 9.6543C19.2812 4.56543 15.0889 0.373047 10 0.373047C4.90234 0.373047 0.71875 4.56543 0.71875 9.6543C0.71875 14.752 4.91113 18.9443 10 18.9443ZM10 16.6328C6.1416 16.6328 3.03906 13.5215 3.03906 9.6543C3.03906 5.7959 6.13281 2.68457 10 2.68457C13.8584 2.68457 16.9697 5.7959 16.9697 9.6543C16.9785 13.5215 13.8672 16.6328 10 16.6328ZM12.7158 12.1416C13.2432 12.1416 13.5684 11.7549 13.5684 11.1836V7.19336C13.5684 6.44629 13.1377 6.05957 12.417 6.05957H8.40918C7.8291 6.05957 7.45117 6.38477 7.45117 6.91211C7.45117 7.43945 7.8291 7.77344 8.40918 7.77344H9.69238L10.7207 7.63281L9.53418 8.67871L6.73047 11.4912C6.53711 11.6758 6.41406 11.9395 6.41406 12.2031C6.41406 12.7832 6.85352 13.1699 7.39844 13.1699C7.68848 13.1699 7.92578 13.0732 8.1543 12.8623L10.9316 10.0762L11.9775 8.89844L11.8545 9.98828V11.1836C11.8545 11.7725 12.1885 12.1416 12.7158 12.1416Z",
  fill: "currentColor"
}));

// src/components/Txs/TxItem.tsx
import React29 from "react";
import { useNetwork as useNetwork3 } from "wagmi";

// src/components/Icons/Cancel.tsx
import React27 from "react";
var CancelIcon = () => /* @__PURE__ */ React27.createElement("svg", {
  fill: "none",
  height: "19",
  viewBox: "0 0 20 19",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React27.createElement("path", {
  d: "M10 18.9443C15.0977 18.9443 19.2812 14.752 19.2812 9.6543C19.2812 4.56543 15.0889 0.373047 10 0.373047C4.90234 0.373047 0.71875 4.56543 0.71875 9.6543C0.71875 14.752 4.91113 18.9443 10 18.9443ZM10 16.6328C6.1416 16.6328 3.03906 13.5215 3.03906 9.6543C3.03906 5.7959 6.13281 2.68457 10 2.68457C13.8584 2.68457 16.9697 5.7959 16.9697 9.6543C16.9785 13.5215 13.8672 16.6328 10 16.6328ZM7.29297 13.3018C7.58301 13.3018 7.81152 13.2139 7.99609 13.0205L10 11.0166L12.0127 13.0205C12.1973 13.2051 12.4258 13.3018 12.707 13.3018C13.2432 13.3018 13.6562 12.8887 13.6562 12.3525C13.6562 12.0977 13.5508 11.8691 13.3662 11.6934L11.3535 9.67188L13.375 7.6416C13.5596 7.44824 13.6562 7.22852 13.6562 6.98242C13.6562 6.44629 13.2432 6.0332 12.7158 6.0332C12.4346 6.0332 12.2148 6.12109 12.0215 6.31445L10 8.32715L7.9873 6.32324C7.80273 6.12988 7.58301 6.04199 7.29297 6.04199C6.76562 6.04199 6.35254 6.45508 6.35254 6.99121C6.35254 7.2373 6.44922 7.46582 6.63379 7.6416L8.65527 9.67188L6.63379 11.6934C6.44922 11.8691 6.35254 12.1064 6.35254 12.3525C6.35254 12.8887 6.76562 13.3018 7.29297 13.3018Z",
  fill: "currentColor"
}));

// src/components/Icons/Success.tsx
import React28 from "react";
var SuccessIcon = () => /* @__PURE__ */ React28.createElement("svg", {
  fill: "none",
  height: "20",
  viewBox: "0 0 20 20",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React28.createElement("path", {
  d: "M10 19.4443C15.0977 19.4443 19.2812 15.252 19.2812 10.1543C19.2812 5.06543 15.0889 0.873047 10 0.873047C4.90234 0.873047 0.71875 5.06543 0.71875 10.1543C0.71875 15.252 4.91113 19.4443 10 19.4443ZM10 17.1328C6.1416 17.1328 3.03906 14.0215 3.03906 10.1543C3.03906 6.2959 6.13281 3.18457 10 3.18457C13.8584 3.18457 16.9697 6.2959 16.9697 10.1543C16.9785 14.0215 13.8672 17.1328 10 17.1328ZM9.07715 14.3379C9.4375 14.3379 9.7627 14.1533 9.97363 13.8369L13.7441 8.00977C13.8848 7.79883 13.9814 7.5791 13.9814 7.36816C13.9814 6.84961 13.5244 6.48926 13.0322 6.48926C12.707 6.48926 12.4258 6.66504 12.2148 7.0166L9.05957 12.0967L7.5918 10.2949C7.37207 10.0225 7.13477 9.9082 6.84473 9.9082C6.33496 9.9082 5.92188 10.3125 5.92188 10.8223C5.92188 11.0684 6.00098 11.2793 6.18555 11.5078L8.1543 13.8545C8.40918 14.1709 8.70801 14.3379 9.07715 14.3379Z",
  fill: "currentColor"
}));

// src/components/Txs/TxItem.tsx
var getTxStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return SpinnerIcon;
    case "confirmed":
      return SuccessIcon;
    case "failed":
      return CancelIcon;
    default:
      return SpinnerIcon;
  }
};
function TxItem({ tx }) {
  const mobile = isMobile();
  const Icon = getTxStatusIcon(tx.status);
  const color = tx.status === "failed" ? "error" : "accentColor";
  const { chain: activeChain } = useNetwork3();
  const confirmationStatus = tx.status === "confirmed" ? "Confirmed" : tx.status === "failed" ? "Failed" : "Pending";
  const explorerLink = chainToExplorerUrl(activeChain);
  return /* @__PURE__ */ React29.createElement(React29.Fragment, null, /* @__PURE__ */ React29.createElement(Box, {
    ...explorerLink ? {
      as: "a",
      background: { hover: "profileForeground" },
      borderRadius: "menuButton",
      className: touchableStyles({ active: "shrink" }),
      href: `${explorerLink}/tx/${tx.hash}`,
      rel: "noreferrer noopener",
      target: "_blank",
      transition: "default"
    } : {},
    color: "modalText",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8",
    width: "full"
  }, /* @__PURE__ */ React29.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: mobile ? "16" : "14"
  }, /* @__PURE__ */ React29.createElement(Box, {
    color
  }, /* @__PURE__ */ React29.createElement(Icon, null)), /* @__PURE__ */ React29.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "3" : "1"
  }, /* @__PURE__ */ React29.createElement(Box, null, /* @__PURE__ */ React29.createElement(Text, {
    color: "modalText",
    font: "body",
    size: mobile ? "16" : "14",
    weight: "bold"
  }, tx == null ? void 0 : tx.description)), /* @__PURE__ */ React29.createElement(Box, null, /* @__PURE__ */ React29.createElement(Text, {
    color: tx.status === "pending" ? "modalTextSecondary" : color,
    font: "body",
    size: "14",
    weight: mobile ? "medium" : "regular"
  }, confirmationStatus)))), explorerLink && /* @__PURE__ */ React29.createElement(Box, {
    alignItems: "center",
    color: "modalTextDim",
    display: "flex"
  }, /* @__PURE__ */ React29.createElement(ExternalLinkIcon, null))));
}

// src/components/Txs/TxList.tsx
var NUMBER_OF_VISIBLE_TXS = 3;
function TxList({ address }) {
  const recentTransactions = useRecentTransactions();
  const clearRecentTransactions = useClearRecentTransactions();
  const { chain: activeChain } = useNetwork4();
  const explorerLink = chainToExplorerUrl(activeChain);
  const visibleTxs = recentTransactions.slice(0, NUMBER_OF_VISIBLE_TXS);
  const hasTransactions = visibleTxs.length > 0;
  const mobile = isMobile();
  const { appName } = useContext7(AppContext);
  return /* @__PURE__ */ React30.createElement(React30.Fragment, null, /* @__PURE__ */ React30.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "10",
    paddingBottom: "2",
    paddingTop: "16",
    paddingX: mobile ? "8" : "18"
  }, hasTransactions && /* @__PURE__ */ React30.createElement(Box, {
    paddingBottom: mobile ? "4" : "0",
    paddingTop: "8",
    paddingX: mobile ? "12" : "6"
  }, /* @__PURE__ */ React30.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, /* @__PURE__ */ React30.createElement(Text, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, "Recent Transactions"), /* @__PURE__ */ React30.createElement(Box, {
    style: {
      marginBottom: -6,
      marginLeft: -10,
      marginRight: -10,
      marginTop: -6
    }
  }, /* @__PURE__ */ React30.createElement(Box, {
    as: "button",
    background: {
      hover: "profileForeground"
    },
    borderRadius: "actionButton",
    className: touchableStyles({ active: "shrink" }),
    onClick: clearRecentTransactions,
    paddingX: mobile ? "8" : "12",
    paddingY: mobile ? "4" : "5",
    transition: "default",
    type: "button"
  }, /* @__PURE__ */ React30.createElement(Text, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, "Clear All"))))), /* @__PURE__ */ React30.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, hasTransactions ? visibleTxs.map((tx) => /* @__PURE__ */ React30.createElement(TxItem, {
    key: tx.hash,
    tx
  })) : /* @__PURE__ */ React30.createElement(React30.Fragment, null, /* @__PURE__ */ React30.createElement(Box, {
    padding: mobile ? "12" : "8"
  }, /* @__PURE__ */ React30.createElement(Text, {
    color: "modalTextDim",
    size: mobile ? "16" : "14",
    weight: mobile ? "medium" : "bold"
  }, appName != null ? appName : "Your", " transactions will appear here...")), mobile && /* @__PURE__ */ React30.createElement(Box, {
    background: "generalBorderDim",
    height: "1",
    marginX: "12",
    marginY: "8"
  })))), explorerLink && /* @__PURE__ */ React30.createElement(Box, {
    paddingBottom: "18",
    paddingX: mobile ? "8" : "18"
  }, /* @__PURE__ */ React30.createElement(Box, {
    alignItems: "center",
    as: "a",
    background: { hover: "profileForeground" },
    borderRadius: "menuButton",
    className: touchableStyles({ active: "shrink" }),
    color: "modalTextDim",
    display: "flex",
    flexDirection: "row",
    href: `${explorerLink}/address/${address}`,
    justifyContent: "space-between",
    paddingX: "8",
    paddingY: "12",
    rel: "noreferrer noopener",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default",
    width: "full",
    ...mobile ? { paddingLeft: "12" } : {}
  }, /* @__PURE__ */ React30.createElement(Text, {
    color: "modalText",
    font: "body",
    size: mobile ? "16" : "14",
    weight: mobile ? "semibold" : "bold"
  }, "View more on Explorer"), /* @__PURE__ */ React30.createElement(ExternalLinkIcon, null))));
}

// src/components/ProfileDetails/ProfileDetailsAction.tsx
import React31 from "react";
function ProfileDetailsAction({
  action,
  icon,
  label,
  testId,
  url
}) {
  const mobile = isMobile();
  return /* @__PURE__ */ React31.createElement(Box, {
    ...url ? { as: "a", href: url, rel: "noreferrer noopener", target: "_blank" } : { as: "button", type: "button" },
    background: {
      base: "profileAction",
      ...!mobile ? { hover: "profileActionHover" } : {}
    },
    borderRadius: "menuButton",
    boxShadow: "profileDetailsAction",
    className: touchableStyles({
      active: "shrinkSm",
      hover: !mobile ? "grow" : void 0
    }),
    display: "flex",
    onClick: action,
    padding: mobile ? "6" : "8",
    style: { willChange: "transform" },
    testId,
    transition: "default",
    width: "full"
  }, /* @__PURE__ */ React31.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1",
    justifyContent: "center",
    paddingTop: "2",
    width: "full"
  }, /* @__PURE__ */ React31.createElement(Box, {
    color: "modalText",
    height: "max"
  }, icon), /* @__PURE__ */ React31.createElement(Box, null, /* @__PURE__ */ React31.createElement(Text, {
    color: "modalText",
    size: mobile ? "12" : "13",
    weight: "semibold"
  }, label))));
}

// src/components/ProfileDetails/ProfileDetails.tsx
function ProfileDetails({ address, balanceData, ensAvatar, ensName, onClose, onDisconnect }) {
  const showRecentTransactions = useContext8(ShowRecentTransactionsContext);
  const [copiedAddress, setCopiedAddress] = useState6(false);
  const copyAddressAction = useCallback7(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(true);
    }
  }, [address]);
  useEffect12(() => {
    if (copiedAddress) {
      const timer = setTimeout(() => {
        setCopiedAddress(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedAddress]);
  if (!address) {
    return null;
  }
  const accountName = ensName ? formatENS(ensName) : formatAddress(address);
  const ethBalance = balanceData == null ? void 0 : balanceData.formatted;
  const displayBalance = ethBalance ? abbreviateETHBalance(parseFloat(ethBalance)) : void 0;
  const titleId = "rk_profile_title";
  const mobile = isMobile();
  return /* @__PURE__ */ React32.createElement(React32.Fragment, null, /* @__PURE__ */ React32.createElement(Box, {
    display: "flex",
    flexDirection: "column"
  }, /* @__PURE__ */ React32.createElement(Box, {
    background: "profileForeground",
    padding: "16"
  }, /* @__PURE__ */ React32.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "16" : "12",
    justifyContent: "center",
    margin: "8",
    style: { textAlign: "center" }
  }, /* @__PURE__ */ React32.createElement(Box, {
    style: {
      position: "absolute",
      right: 16,
      top: 16,
      willChange: "transform"
    }
  }, /* @__PURE__ */ React32.createElement(CloseButton, {
    onClose
  })), " ", /* @__PURE__ */ React32.createElement(Box, {
    marginTop: mobile ? "24" : "0"
  }, /* @__PURE__ */ React32.createElement(Avatar, {
    address,
    imageUrl: ensAvatar,
    size: mobile ? 82 : 74
  })), /* @__PURE__ */ React32.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "4" : "0",
    textAlign: "center"
  }, /* @__PURE__ */ React32.createElement(Box, {
    textAlign: "center"
  }, /* @__PURE__ */ React32.createElement(Text, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: mobile ? "20" : "18",
    weight: "heavy"
  }, accountName)), balanceData && /* @__PURE__ */ React32.createElement(Box, {
    textAlign: "center"
  }, /* @__PURE__ */ React32.createElement(Text, {
    as: "h1",
    color: "modalTextSecondary",
    id: titleId,
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, displayBalance, " ", balanceData.symbol)))), /* @__PURE__ */ React32.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    gap: "8",
    margin: "2",
    marginTop: "16"
  }, /* @__PURE__ */ React32.createElement(ProfileDetailsAction, {
    action: copyAddressAction,
    icon: copiedAddress ? /* @__PURE__ */ React32.createElement(CopiedIcon, null) : /* @__PURE__ */ React32.createElement(CopyIcon, null),
    label: copiedAddress ? "Copied!" : "Copy Address"
  }), /* @__PURE__ */ React32.createElement(ProfileDetailsAction, {
    action: onDisconnect,
    icon: /* @__PURE__ */ React32.createElement(DisconnectIcon, null),
    label: "Disconnect",
    testId: "disconnect-button"
  }))), showRecentTransactions && /* @__PURE__ */ React32.createElement(React32.Fragment, null, /* @__PURE__ */ React32.createElement(Box, {
    background: "generalBorder",
    height: "1",
    marginTop: "-1"
  }), /* @__PURE__ */ React32.createElement(Box, null, /* @__PURE__ */ React32.createElement(TxList, {
    address
  })))));
}

// src/components/AccountModal/AccountModal.tsx
function AccountModal({ onClose, open }) {
  const { address } = useAccount9();
  const { data: balanceData } = useBalance({ address });
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { disconnect } = useDisconnect2();
  if (!address) {
    return null;
  }
  const titleId = "rk_account_modal_title";
  return /* @__PURE__ */ React33.createElement(React33.Fragment, null, address && /* @__PURE__ */ React33.createElement(Dialog, {
    onClose,
    open,
    titleId
  }, /* @__PURE__ */ React33.createElement(DialogContent, {
    bottomSheetOnMobile: true,
    padding: "0"
  }, /* @__PURE__ */ React33.createElement(ProfileDetails, {
    address,
    balanceData,
    ensAvatar,
    ensName,
    onClose,
    onDisconnect: disconnect
  }))));
}

// src/components/ChainModal/ChainModal.tsx
import React36, { Fragment, useCallback as useCallback8, useContext as useContext9 } from "react";
import { useDisconnect as useDisconnect3, useNetwork as useNetwork5, useSwitchNetwork } from "wagmi";

// src/components/Icons/DisconnectSq.tsx
import React34 from "react";
var DisconnectSqIcon = ({ size }) => /* @__PURE__ */ React34.createElement("svg", {
  fill: "none",
  height: size,
  viewBox: "0 0 28 28",
  width: size,
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React34.createElement("path", {
  d: "M6.742 22.195h8.367c1.774 0 2.743-.968 2.743-2.758V16.11h-2.016v3.11c0 .625-.305.96-.969.96H6.984c-.664 0-.968-.335-.968-.96V7.984c0-.632.304-.968.968-.968h7.883c.664 0 .969.336.969.968v3.133h2.016v-3.36c0-1.78-.97-2.757-2.743-2.757H6.742C4.97 5 4 5.977 4 7.758v11.68c0 1.789.969 2.757 2.742 2.757Zm5.438-7.703h7.601l1.149-.07-.602.406-1.008.938a.816.816 0 0 0-.258.593c0 .407.313.782.758.782.227 0 .39-.086.547-.243l2.492-2.593c.235-.235.313-.47.313-.711 0-.242-.078-.477-.313-.719l-2.492-2.586c-.156-.156-.32-.25-.547-.25-.445 0-.758.367-.758.781 0 .227.094.446.258.594l1.008.945.602.407-1.149-.079H12.18a.904.904 0 0 0 0 1.805Z",
  fill: "currentColor"
}));

// src/components/MenuButton/MenuButton.tsx
import React35 from "react";

// src/components/MenuButton/MenuButton.css.ts
var unsetBackgroundOnHover = "MenuButton_unsetBackgroundOnHover__v9horb0";

// src/components/MenuButton/MenuButton.tsx
var MenuButton = React35.forwardRef(
  ({ children, currentlySelected = false, onClick, testId, disabled, ...urlProps }, ref) => {
    const mobile = isMobile();
    return /* @__PURE__ */ React35.createElement(Box, {
      as: "button",
      borderRadius: "menuButton",
      disabled,
      display: "flex",
      onClick,
      ref,
      testId,
      type: "button",
      marginLeft: "20",
      marginRight: "20",
      marginTop: "8",
      marginBottom: "8"
    }, /* @__PURE__ */ React35.createElement(Box, {
      borderRadius: "menuButton",
      className: [mobile ? unsetBackgroundOnHover : void 0, !currentlySelected && touchableStyles({ active: "shrink" })],
      transition: "default",
      width: "full",
      padding: "16",
      ...currentlySelected ? {
        borderColor: "accentColor",
        borderStyle: "solid",
        borderWidth: "1",
        boxShadow: "selectedOption",
        color: "accentColorForeground"
      } : {
        background: { hover: "menuItemBackground" },
        color: "modalText",
        transition: "default",
        borderColor: "selectedOptionBorder",
        borderStyle: "solid",
        borderWidth: "1"
      },
      ...urlProps
    }, children));
  }
);
MenuButton.displayName = "MenuButton";

// src/components/ChainModal/ChainModal.tsx
function ChainModal({ onClose, open, fn }) {
  var _a;
  const { chain: activeChain } = useNetwork5();
  const { chains, pendingChainId, reset, switchNetwork } = useSwitchNetwork({
    onSettled: () => {
      reset();
      onClose();
    }
  });
  const { disconnect } = useDisconnect3();
  const titleId = "rk_chain_modal_title";
  const mobile = isMobile();
  const unsupportedChain = (_a = activeChain == null ? void 0 : activeChain.unsupported) != null ? _a : false;
  const chainIconSize = "24";
  const { appName } = useContext9(AppContext);
  const rainbowkitChains = useRainbowKitChains();
  if (!activeChain || !(activeChain == null ? void 0 : activeChain.id)) {
    return null;
  }
  const chainClickHandle = useCallback8(
    ({ isCurrentChain, chain }) => {
      console.log({ isCurrentChain, chain, switchNetwork });
      if (chain.id === 42161) {
        if (fn) {
          fn(chain.id);
        } else {
          switchNetwork ? switchNetwork(chain.id) : console.error("arb not switchNetwork");
        }
      } else {
        isCurrentChain ? void 0 : switchNetwork ? switchNetwork(chain.id) : console.error("not switchNetwork");
      }
    },
    [fn, switchNetwork]
  );
  return /* @__PURE__ */ React36.createElement(Dialog, {
    onClose,
    open,
    titleId
  }, /* @__PURE__ */ React36.createElement(DialogContent, {
    padding: "0",
    bottomSheetOnMobile: true
  }, /* @__PURE__ */ React36.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "14",
    marginBottom: "14"
  }, /* @__PURE__ */ React36.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: mobile ? "16" : "20",
    background: "profileForeground"
  }, mobile && /* @__PURE__ */ React36.createElement(Box, {
    width: "30"
  }), /* @__PURE__ */ React36.createElement(Text, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: mobile ? "20" : "18"
  }, "Switch Networks"), /* @__PURE__ */ React36.createElement(CloseButton, {
    onClose
  })), unsupportedChain && /* @__PURE__ */ React36.createElement(Box, {
    marginLeft: "20",
    marginRight: "20",
    textAlign: mobile ? "center" : "left"
  }, /* @__PURE__ */ React36.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Wrong network detected, switch or disconnect to continue.")), /* @__PURE__ */ React36.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    padding: "2",
    style: { maxHeight: mobile ? "80vh" : "70vh", overflowY: "scroll" }
  }, switchNetwork ? rainbowkitChains.map(({ iconBackground, iconUrl, id, name }, idx) => {
    var _a2;
    const chain = chains.find((c) => c.id === id);
    if (!chain) {
      return null;
    }
    const isCurrentChain = chain.id === (activeChain == null ? void 0 : activeChain.id);
    const switching = !isCurrentChain && chain.id === pendingChainId;
    return /* @__PURE__ */ React36.createElement(Fragment, {
      key: chain.id
    }, /* @__PURE__ */ React36.createElement(MenuButton, {
      disabled: false,
      currentlySelected: isCurrentChain,
      onClick: () => chainClickHandle({
        isCurrentChain,
        chain
      }),
      testId: `chain-option-${chain.id}`
    }, /* @__PURE__ */ React36.createElement(Box, {
      fontFamily: "body",
      fontSize: "16"
    }, /* @__PURE__ */ React36.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }, /* @__PURE__ */ React36.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "4",
      height: chainIconSize
    }, iconUrl && /* @__PURE__ */ React36.createElement(Box, {
      height: "full",
      marginRight: "8"
    }, /* @__PURE__ */ React36.createElement(AsyncImage, {
      alt: name != null ? name : chain.name,
      background: iconBackground,
      borderRadius: "full",
      height: chainIconSize,
      src: iconUrl,
      width: chainIconSize
    })), /* @__PURE__ */ React36.createElement("div", null, (_a2 = chain.name) != null ? _a2 : name)), isCurrentChain && /* @__PURE__ */ React36.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      marginRight: "6"
    }, /* @__PURE__ */ React36.createElement(Text, {
      color: "accentColorForeground",
      size: "14",
      weight: "medium"
    }, "Connected"), /* @__PURE__ */ React36.createElement(Box, {
      background: "connectionIndicator",
      borderColor: "connectionIndicatorBorder",
      borderRadius: "full",
      borderStyle: "solid",
      borderWidth: "3",
      height: "12",
      marginLeft: "8",
      width: "12"
    })), switching && /* @__PURE__ */ React36.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      marginRight: "6"
    }, /* @__PURE__ */ React36.createElement(Text, {
      color: "modalText",
      size: "14",
      weight: "medium"
    }, "Confirm in Wallet"), /* @__PURE__ */ React36.createElement(Box, {
      background: "standby",
      borderRadius: "full",
      height: "12",
      marginLeft: "8",
      width: "12",
      borderColor: "standbyBorder",
      borderStyle: "solid",
      borderWidth: "3"
    }))))), mobile && idx < rainbowkitChains.length - 1 && /* @__PURE__ */ React36.createElement(Box, {
      background: "generalBorderDim",
      height: "1",
      marginX: "8"
    }));
  }) : /* @__PURE__ */ React36.createElement(Box, {
    background: "generalBorder",
    borderRadius: "menuButton",
    paddingX: "18",
    paddingY: "12"
  }, /* @__PURE__ */ React36.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "medium"
  }, "Your wallet does not support switching networks from ", appName != null ? appName : "this app", ". Try switching networks from within your wallet instead.")), unsupportedChain && /* @__PURE__ */ React36.createElement(React36.Fragment, null, /* @__PURE__ */ React36.createElement(Box, {
    background: "generalBorderDim",
    height: "1",
    marginX: "8"
  }), /* @__PURE__ */ React36.createElement(MenuButton, {
    onClick: () => disconnect(),
    testId: "chain-option-disconnect"
  }, /* @__PURE__ */ React36.createElement(Box, {
    color: "error",
    fontFamily: "body",
    fontSize: "16"
  }, /* @__PURE__ */ React36.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }, /* @__PURE__ */ React36.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "4",
    height: chainIconSize
  }, /* @__PURE__ */ React36.createElement(Box, {
    alignItems: "center",
    color: "error",
    height: chainIconSize,
    justifyContent: "center",
    marginRight: "8"
  }, /* @__PURE__ */ React36.createElement(DisconnectSqIcon, {
    size: Number(chainIconSize)
  })), /* @__PURE__ */ React36.createElement("div", null, "Disconnect"))))))))));
}

// src/components/ConnectModal/ConnectModal.tsx
import React52 from "react";

// src/components/ConnectOptions/ConnectOptions.tsx
import React51 from "react";

// src/components/ConnectOptions/DesktopOptions.tsx
import React49, { Fragment as Fragment2, useContext as useContext13, useEffect as useEffect15, useState as useState9 } from "react";

// src/utils/groupBy.ts
function groupBy(items, getKey) {
  const groupedItems = {};
  items.forEach((item) => {
    const key = getKey(item);
    if (!key) {
      return;
    }
    if (!groupedItems[key]) {
      groupedItems[key] = [];
    }
    groupedItems[key].push(item);
  });
  return groupedItems;
}

// src/components/ConnectModal/ConnectModalIntro.tsx
import React39, { useContext as useContext10 } from "react";

// src/components/Disclaimer/DisclaimerLink.tsx
import React37 from "react";
var DisclaimerLink = ({
  children,
  href
}) => {
  return /* @__PURE__ */ React37.createElement(Box, {
    as: "a",
    color: "accentColor",
    href,
    rel: "noreferrer",
    target: "_blank"
  }, children);
};

// src/components/Disclaimer/DisclaimerText.tsx
import React38 from "react";
var DisclaimerText = ({ children }) => {
  return /* @__PURE__ */ React38.createElement(Text, {
    color: "modalTextSecondary",
    size: "12",
    weight: "medium"
  }, children);
};

// src/components/ConnectModal/ConnectModalIntro.tsx
function ConnectModalIntro({
  compactModeEnabled = false,
  getWallet
}) {
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext10(AppContext);
  return /* @__PURE__ */ React39.createElement(React39.Fragment, null, /* @__PURE__ */ React39.createElement(Box, {
    alignItems: "center",
    color: "accentColor",
    display: "flex",
    flexDirection: "column",
    height: "full",
    justifyContent: "space-around"
  }, /* @__PURE__ */ React39.createElement(Box, {
    marginBottom: "10"
  }, !compactModeEnabled && /* @__PURE__ */ React39.createElement(Text, {
    color: "modalText",
    size: "18",
    weight: "heavy"
  }, "What is a Wallet?")), /* @__PURE__ */ React39.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "32",
    justifyContent: "center",
    marginY: "20",
    style: { maxWidth: 312 }
  }, /* @__PURE__ */ React39.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "16"
  }, /* @__PURE__ */ React39.createElement(Box, {
    borderRadius: "6",
    height: "48",
    minWidth: "48",
    width: "48"
  }, /* @__PURE__ */ React39.createElement(AssetsIcon, null)), /* @__PURE__ */ React39.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, /* @__PURE__ */ React39.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "A Home for your Digital Assets"), /* @__PURE__ */ React39.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."))), /* @__PURE__ */ React39.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "16"
  }, /* @__PURE__ */ React39.createElement(Box, {
    borderRadius: "6",
    height: "48",
    minWidth: "48",
    width: "48"
  }, /* @__PURE__ */ React39.createElement(LoginIcon, null)), /* @__PURE__ */ React39.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, /* @__PURE__ */ React39.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "A New Way to Log In"), /* @__PURE__ */ React39.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Instead of creating new accounts and passwords on every website, just connect your wallet.")))), /* @__PURE__ */ React39.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    margin: "10"
  }, /* @__PURE__ */ React39.createElement(ActionButton, {
    label: "Get a Wallet",
    onClick: getWallet
  }), /* @__PURE__ */ React39.createElement(Box, {
    as: "a",
    className: touchableStyles({ active: "shrink", hover: "grow" }),
    display: "block",
    href: learnMoreUrl,
    paddingX: "12",
    paddingY: "4",
    rel: "noreferrer",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default"
  }, /* @__PURE__ */ React39.createElement(Text, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))), Disclaimer && !compactModeEnabled && /* @__PURE__ */ React39.createElement(Box, {
    marginBottom: "8",
    marginTop: "12",
    textAlign: "center"
  }, /* @__PURE__ */ React39.createElement(Disclaimer, {
    Link: DisclaimerLink,
    Text: DisclaimerText
  }))));
}

// src/components/Icons/Back.tsx
import React40 from "react";
var BackIcon = () => /* @__PURE__ */ React40.createElement("svg", {
  fill: "none",
  height: "17",
  viewBox: "0 0 11 17",
  width: "11",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React40.createElement("path", {
  d: "M0.99707 8.6543C0.99707 9.08496 1.15527 9.44531 1.51562 9.79688L8.16016 16.3096C8.43262 16.5732 8.74902 16.7051 9.13574 16.7051C9.90918 16.7051 10.5508 16.0811 10.5508 15.3076C10.5508 14.9121 10.3838 14.5605 10.0938 14.2705L4.30176 8.64551L10.0938 3.0293C10.3838 2.74805 10.5508 2.3877 10.5508 2.00098C10.5508 1.23633 9.90918 0.603516 9.13574 0.603516C8.74902 0.603516 8.43262 0.735352 8.16016 0.999023L1.51562 7.51172C1.15527 7.85449 1.00586 8.21484 0.99707 8.6543Z",
  fill: "currentColor"
}));

// src/components/InfoButton/InfoButton.tsx
import React42 from "react";

// src/components/Icons/Info.tsx
import React41 from "react";
var InfoIcon = () => /* @__PURE__ */ React41.createElement("svg", {
  fill: "none",
  height: "12",
  viewBox: "0 0 8 12",
  width: "8",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React41.createElement("path", {
  d: "M3.64258 7.99609C4.19336 7.99609 4.5625 7.73828 4.68555 7.24609C4.69141 7.21094 4.70312 7.16406 4.70898 7.13477C4.80859 6.60742 5.05469 6.35547 6.04492 5.76367C7.14648 5.10156 7.67969 4.3457 7.67969 3.24414C7.67969 1.39844 6.17383 0.255859 3.95898 0.255859C2.32422 0.255859 1.05859 0.894531 0.548828 1.86719C0.396484 2.14844 0.320312 2.44727 0.320312 2.74023C0.314453 3.37305 0.742188 3.79492 1.42188 3.79492C1.91406 3.79492 2.33594 3.54883 2.53516 3.11523C2.78711 2.47656 3.23242 2.21289 3.83594 2.21289C4.55664 2.21289 5.10742 2.65234 5.10742 3.29102C5.10742 3.9707 4.7793 4.29883 3.81836 4.87891C3.02148 5.36523 2.50586 5.92773 2.50586 6.76562V6.90039C2.50586 7.55664 2.96289 7.99609 3.64258 7.99609ZM3.67188 11.4473C4.42773 11.4473 5.04297 10.8672 5.04297 10.1406C5.04297 9.41406 4.42773 8.83984 3.67188 8.83984C2.91602 8.83984 2.30664 9.41406 2.30664 10.1406C2.30664 10.8672 2.91602 11.4473 3.67188 11.4473Z",
  fill: "currentColor"
}));

// src/components/InfoButton/InfoButton.tsx
var InfoButton = ({
  "aria-label": ariaLabel = "Info",
  onClick
}) => {
  const mobile = isMobile();
  return /* @__PURE__ */ React42.createElement(Box, {
    alignItems: "center",
    "aria-label": ariaLabel,
    as: "button",
    background: "closeButtonBackground",
    borderColor: "actionButtonBorder",
    borderRadius: "full",
    borderStyle: "solid",
    borderWidth: mobile ? "0" : "1",
    className: touchableStyles({ active: "shrinkSm", hover: "growLg" }),
    color: "closeButton",
    display: "flex",
    height: mobile ? "30" : "28",
    justifyContent: "center",
    onClick,
    style: { willChange: "transform" },
    transition: "default",
    type: "button",
    width: mobile ? "30" : "28"
  }, /* @__PURE__ */ React42.createElement(InfoIcon, null));
};

// src/components/ModalSelection/ModalSelection.tsx
import React43, { useState as useState8 } from "react";

// src/components/RainbowKitProvider/useCoolMode.ts
import { useContext as useContext11, useEffect as useEffect13, useRef as useRef4 } from "react";
var useCoolMode = (imageUrl) => {
  const ref = useRef4(null);
  const coolModeEnabled = useContext11(CoolModeContext);
  const resolvedImageUrl = useAsyncImage(imageUrl);
  useEffect13(() => {
    if (coolModeEnabled && ref.current && resolvedImageUrl) {
      return makeElementCool(ref.current, resolvedImageUrl);
    }
  }, [coolModeEnabled, resolvedImageUrl]);
  return ref;
};
var getContainer = () => {
  const id = "_rk_coolMode";
  const existingContainer = document.getElementById(id);
  if (existingContainer) {
    return existingContainer;
  }
  const container = document.createElement("div");
  container.setAttribute("id", id);
  container.setAttribute(
    "style",
    ["overflow:hidden", "position:fixed", "height:100%", "top:0", "left:0", "right:0", "bottom:0", "pointer-events:none", "z-index:2147483647"].join(
      ";"
    )
  );
  document.body.appendChild(container);
  return container;
};
var instanceCounter = 0;
function makeElementCool(element2, imageUrl) {
  instanceCounter++;
  const sizes = [15, 20, 25, 35, 45];
  const limit = 35;
  let particles = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;
  const container = getContainer();
  function createParticle() {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const speedHorz = Math.random() * 10;
    const speedUp = Math.random() * 25;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;
    const particle = document.createElement("div");
    particle.innerHTML = `<img src="${imageUrl}" width="${size}" height="${size}" style="border-radius: 25%">`;
    particle.setAttribute(
      "style",
      ["position:absolute", "will-change:transform", `top:${top}px`, `left:${left}px`, `transform:rotate(${spinVal}deg)`].join(";")
    );
    container.appendChild(particle);
    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top
    });
  }
  function updateParticles() {
    particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;
      if (p.top >= Math.max(window.innerHeight, document.body.clientHeight) + p.size) {
        particles = particles.filter((o) => o !== p);
        p.element.remove();
      }
      p.element.setAttribute(
        "style",
        ["position:absolute", "will-change:transform", `top:${p.top}px`, `left:${p.left}px`, `transform:rotate(${p.spinVal}deg)`].join(";")
      );
    });
  }
  let animationFrame;
  function loop() {
    if (autoAddParticle && particles.length < limit) {
      createParticle();
    }
    updateParticles();
    animationFrame = requestAnimationFrame(loop);
  }
  loop();
  const isTouchInteraction = "ontouchstart" in window || navigator.msMaxTouchPoints;
  const tap = isTouchInteraction ? "touchstart" : "mousedown";
  const tapEnd = isTouchInteraction ? "touchend" : "mouseup";
  const move = isTouchInteraction ? "touchmove" : "mousemove";
  const updateMousePosition = (e) => {
    var _a, _b;
    if ("touches" in e) {
      mouseX = (_a = e.touches) == null ? void 0 : _a[0].clientX;
      mouseY = (_b = e.touches) == null ? void 0 : _b[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };
  const tapHandler = (e) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };
  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };
  element2.addEventListener(move, updateMousePosition, { passive: false });
  element2.addEventListener(tap, tapHandler);
  element2.addEventListener(tapEnd, disableAutoAddParticle);
  element2.addEventListener("mouseleave", disableAutoAddParticle);
  return () => {
    element2.removeEventListener(move, updateMousePosition);
    element2.removeEventListener(tap, tapHandler);
    element2.removeEventListener(tapEnd, disableAutoAddParticle);
    element2.removeEventListener("mouseleave", disableAutoAddParticle);
    const interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        clearInterval(interval);
        if (--instanceCounter === 0) {
          container.remove();
        }
      }
    }, 500);
  };
}

// src/components/ModalSelection/ModalSelection.css.ts
var transparentBorder = "ModalSelection_transparentBorder__g5kl0l0";

// src/components/ModalSelection/ModalSelection.tsx
var ModalSelection = ({
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
}) => {
  const coolModeRef = useCoolMode(iconUrl);
  const [isMouseOver, setIsMouseOver] = useState8(false);
  return /* @__PURE__ */ React43.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    onMouseEnter: () => setIsMouseOver(true),
    onMouseLeave: () => setIsMouseOver(false),
    ref: coolModeRef
  }, /* @__PURE__ */ React43.createElement(Box, {
    as,
    borderRadius: "menuButton",
    borderStyle: "solid",
    borderWidth: "1",
    className: !currentlySelected ? [
      transparentBorder,
      touchableStyles({
        active: "shrink"
      })
    ] : void 0,
    disabled: currentlySelected,
    onClick,
    padding: "5",
    style: { willChange: "transform" },
    testId,
    transition: "default",
    width: "full",
    ...currentlySelected ? {
      background: "accentColor",
      borderColor: "selectedOptionBorder",
      boxShadow: "selectedWallet"
    } : {
      background: { hover: "menuItemBackground" }
    },
    ...urlProps
  }, /* @__PURE__ */ React43.createElement(Box, {
    color: currentlySelected ? "accentColorForeground" : "modalText",
    disabled: !ready,
    fontFamily: "body",
    fontSize: "16",
    fontWeight: "bold",
    transition: "default"
  }, /* @__PURE__ */ React43.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "12"
  }, /* @__PURE__ */ React43.createElement(AsyncImage, {
    background: iconBackground,
    ...isMouseOver ? {} : { borderColor: "actionButtonBorder" },
    borderRadius: "6",
    height: "28",
    src: iconUrl,
    width: "28"
  }), /* @__PURE__ */ React43.createElement(Box, null, /* @__PURE__ */ React43.createElement(Box, {
    style: { marginTop: recent ? -2 : void 0 }
  }, name), recent && /* @__PURE__ */ React43.createElement(Text, {
    color: currentlySelected ? "accentColorForeground" : "accentColor",
    size: "12",
    style: { lineHeight: 1, marginTop: -1 },
    weight: "medium"
  }, "Recent"))))));
};
ModalSelection.displayName = "ModalSelection";

// src/components/ConnectOptions/ConnectDetails.tsx
import React48, { useContext as useContext12, useEffect as useEffect14 } from "react";

// src/utils/colors.ts
var convertHexToRGBA = (hexCode, opacity = 1) => {
  let hex = hexCode.replace("#", "");
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }
  return `rgba(${r},${g},${b},${opacity})`;
};
var getGradientRGBAs = (hexColor) => {
  if (!hexColor)
    return null;
  return [
    convertHexToRGBA(hexColor, 0.2),
    convertHexToRGBA(hexColor, 0.14),
    convertHexToRGBA(hexColor, 0.1)
  ];
};
var isHexString = (color) => {
  return /^#([0-9a-f]{3}){1,2}$/i.test(color);
};

// src/components/Icons/Create.tsx
import React44 from "react";
var src3 = async () => (await import("./create-PAJXJDV3.js")).default;
var preloadCreateIcon = () => loadImages(src3);
var CreateIcon = () => /* @__PURE__ */ React44.createElement(AsyncImage, {
  background: "#e3a5e8",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src3,
  width: "48"
});

// src/components/Icons/Refresh.tsx
import React45 from "react";
var src4 = async () => (await import("./refresh-5KGGHTJP.js")).default;
var preloadRefreshIcon = () => loadImages(src4);
var RefreshIcon = () => /* @__PURE__ */ React45.createElement(AsyncImage, {
  background: "#515a70",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src4,
  width: "48"
});

// src/components/Icons/Scan.tsx
import React46 from "react";
var src5 = async () => (await import("./scan-HZBLXLM4.js")).default;
var preloadScanIcon = () => loadImages(src5);
var ScanIcon = () => /* @__PURE__ */ React46.createElement(AsyncImage, {
  background: "#515a70",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src5,
  width: "48"
});

// src/components/QRCode/QRCode.tsx
import QRCodeUtil from "qrcode";
import React47, { useMemo as useMemo5 } from "react";

// src/components/ConnectOptions/DesktopOptions.css.ts
var QRCodeBackgroundClassName = "DesktopOptions_QRCodeBackgroundClassName__1vwt0cg0";
var ScrollClassName = "DesktopOptions_ScrollClassName__1vwt0cg2 sprinkles_paddingLeft_18__ju367v79 sprinkles_paddingRight_18__ju367v7u";
var sidebar = "DesktopOptions_sidebar__1vwt0cg3";
var sidebarCompactMode = "DesktopOptions_sidebarCompactMode__1vwt0cg4";

// src/components/QRCode/QRCode.tsx
var generateMatrix = (value, errorCorrectionLevel) => {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0
  );
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce(
    (rows, key, index) => (index % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows,
    []
  );
};
function QRCode({
  ecl = "M",
  logoBackground,
  logoMargin = 10,
  logoSize = 50,
  logoUrl,
  size: sizeProp = 200,
  uri
}) {
  const padding = "20";
  const size = sizeProp - parseInt(padding, 10) * 2;
  const dots = useMemo5(() => {
    const dots2 = [];
    const matrix = generateMatrix(uri, ecl);
    const cellSize = size / matrix.length;
    let qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ];
    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x;
      const y1 = (matrix.length - 7) * cellSize * y;
      for (let i = 0; i < 3; i++) {
        dots2.push(
          /* @__PURE__ */ React47.createElement("rect", {
            fill: i % 2 !== 0 ? "white" : "black",
            height: cellSize * (7 - i * 2),
            key: `${i}-${x}-${y}`,
            rx: (i - 2) * -5 + (i === 0 ? 2 : 0),
            ry: (i - 2) * -5 + (i === 0 ? 2 : 0),
            width: cellSize * (7 - i * 2),
            x: x1 + cellSize * i,
            y: y1 + cellSize * i
          })
        );
      }
    });
    const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;
    matrix.forEach((row, i) => {
      row.forEach((_, j) => {
        if (matrix[i][j]) {
          if (!(i < 7 && j < 7 || i > matrix.length - 8 && j < 7 || i < 7 && j > matrix.length - 8)) {
            if (!(i > matrixMiddleStart && i < matrixMiddleEnd && j > matrixMiddleStart && j < matrixMiddleEnd)) {
              dots2.push(
                /* @__PURE__ */ React47.createElement("circle", {
                  cx: i * cellSize + cellSize / 2,
                  cy: j * cellSize + cellSize / 2,
                  fill: "black",
                  key: `circle-${i}-${j}`,
                  r: cellSize / 3
                })
              );
            }
          }
        }
      });
    });
    return dots2;
  }, [ecl, logoSize, size, uri]);
  const logoPosition = size / 2 - logoSize / 2;
  const logoWrapperSize = logoSize + logoMargin * 2;
  return /* @__PURE__ */ React47.createElement(Box, {
    borderColor: "generalBorder",
    borderRadius: "menuButton",
    borderStyle: "solid",
    borderWidth: "1",
    className: QRCodeBackgroundClassName,
    padding,
    width: "max"
  }, /* @__PURE__ */ React47.createElement(Box, {
    style: {
      height: size,
      userSelect: "none",
      width: size
    },
    userSelect: "none"
  }, /* @__PURE__ */ React47.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    style: {
      height: 0,
      top: logoPosition,
      width: size
    },
    width: "full"
  }, /* @__PURE__ */ React47.createElement(AsyncImage, {
    background: logoBackground,
    borderColor: { custom: "rgba(0, 0, 0, 0.06)" },
    borderRadius: "13",
    height: logoSize,
    src: logoUrl,
    width: logoSize
  })), /* @__PURE__ */ React47.createElement("svg", {
    height: size,
    style: { all: "revert" },
    width: size
  }, /* @__PURE__ */ React47.createElement("defs", null, /* @__PURE__ */ React47.createElement("clipPath", {
    id: "clip-wrapper"
  }, /* @__PURE__ */ React47.createElement("rect", {
    height: logoWrapperSize,
    width: logoWrapperSize
  })), /* @__PURE__ */ React47.createElement("clipPath", {
    id: "clip-logo"
  }, /* @__PURE__ */ React47.createElement("rect", {
    height: logoSize,
    width: logoSize
  }))), /* @__PURE__ */ React47.createElement("rect", {
    fill: "transparent",
    height: size,
    width: size
  }), dots)));
}

// src/components/ConnectOptions/ConnectDetails.tsx
var getBrowserSrc = async () => {
  const browser = getBrowser();
  switch (browser) {
    case "Arc" /* Arc */:
      return (await import("./Arc-QDJFTGH2.js")).default;
    case "Brave" /* Brave */:
      return (await import("./Brave-YATE5BIM.js")).default;
    case "Chrome" /* Chrome */:
      return (await import("./Chrome-LGF33C3S.js")).default;
    case "Edge" /* Edge */:
      return (await import("./Edge-K2JEGI5S.js")).default;
    case "Firefox" /* Firefox */:
      return (await import("./Firefox-NP5SYEK5.js")).default;
    case "Opera" /* Opera */:
      return (await import("./Opera-KV54PXPA.js")).default;
    case "Safari" /* Safari */:
      return (await import("./Safari-2QIYKJ4P.js")).default;
    default:
      return (await import("./Browser-HN7O5MN7.js")).default;
  }
};
var preloadBrowserIcon = () => loadImages(getBrowserSrc);
function GetDetail({
  getWalletDownload
}) {
  const wallets = useWalletConnectors();
  const shownWallets = wallets.splice(0, 5);
  return /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    marginTop: "18",
    width: "full"
  }, /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "28",
    height: "full",
    width: "full"
  }, shownWallets == null ? void 0 : shownWallets.filter(
    (wallet) => {
      var _a;
      return wallet.extensionDownloadUrl || wallet.qrCode && ((_a = wallet.downloadUrls) == null ? void 0 : _a.qrCode);
    }
  ).map((wallet) => {
    const { downloadUrls, iconBackground, iconUrl, id, name, qrCode } = wallet;
    const hasMobileCompanionApp = (downloadUrls == null ? void 0 : downloadUrls.qrCode) && qrCode;
    const hasExtension = !!wallet.extensionDownloadUrl;
    const hasMobileAndExtension = (downloadUrls == null ? void 0 : downloadUrls.qrCode) && hasExtension;
    return /* @__PURE__ */ React48.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "16",
      justifyContent: "space-between",
      key: wallet.id,
      width: "full"
    }, /* @__PURE__ */ React48.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16"
    }, /* @__PURE__ */ React48.createElement(AsyncImage, {
      background: iconBackground,
      borderColor: "actionButtonBorder",
      borderRadius: "10",
      height: "48",
      src: iconUrl,
      width: "48"
    }), /* @__PURE__ */ React48.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "2"
    }, /* @__PURE__ */ React48.createElement(Text, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, name), /* @__PURE__ */ React48.createElement(Text, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, hasMobileAndExtension ? "Mobile Wallet and Extension" : hasMobileCompanionApp ? "Mobile Wallet" : hasExtension ? "Browser Extension" : null))), /* @__PURE__ */ React48.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React48.createElement(ActionButton, {
      label: "GET",
      onClick: () => getWalletDownload(id),
      type: "secondary"
    })));
  })), /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "column",
    gap: "8",
    justifyContent: "space-between",
    marginBottom: "4",
    paddingY: "8",
    style: { maxWidth: 275, textAlign: "center" }
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "Not what you\u2019re looking for?"), /* @__PURE__ */ React48.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Select a wallet on the left to get started with a different wallet provider.")));
}
var LOGO_SIZE = "44";
function ConnectDetail({
  changeWalletStep,
  compactModeEnabled,
  connectionError,
  onClose,
  qrCodeUri,
  reconnect,
  wallet
}) {
  var _a;
  const {
    downloadUrls,
    iconBackground,
    iconUrl,
    name,
    qrCode,
    ready,
    showWalletConnectModal
  } = wallet;
  const getDesktopDeepLink = (_a = wallet.desktop) == null ? void 0 : _a.getUri;
  const safari = isSafari();
  const hasExtension = !!wallet.extensionDownloadUrl;
  const hasQrCodeAndExtension = (downloadUrls == null ? void 0 : downloadUrls.qrCode) && hasExtension;
  const hasQrCode = qrCode && qrCodeUri;
  const secondaryAction = showWalletConnectModal ? {
    description: `Need the ${compactModeEnabled ? "" : "official"} WalletConnect modal?`,
    label: "OPEN",
    onClick: () => {
      onClose();
      showWalletConnectModal();
    }
  } : hasQrCode ? {
    description: `Don\u2019t have ${name}?`,
    label: "GET",
    onClick: () => changeWalletStep(
      hasQrCodeAndExtension ? "DOWNLOAD_OPTIONS" /* DownloadOptions */ : "DOWNLOAD" /* Download */
    )
  } : null;
  const { width: windowWidth } = useWindowSize();
  const smallWindow = windowWidth && windowWidth < 768;
  useEffect14(() => {
    preloadBrowserIcon();
  }, []);
  return /* @__PURE__ */ React48.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, hasQrCode ? /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    height: "full",
    justifyContent: "center"
  }, /* @__PURE__ */ React48.createElement(QRCode, {
    logoBackground: iconBackground,
    logoSize: compactModeEnabled ? 60 : 72,
    logoUrl: iconUrl,
    size: compactModeEnabled ? 318 : smallWindow ? Math.max(280, Math.min(windowWidth - 308, 382)) : 382,
    uri: qrCodeUri
  })) : /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    style: { flexGrow: 1 }
  }, /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8"
  }, /* @__PURE__ */ React48.createElement(Box, {
    borderRadius: "10",
    height: LOGO_SIZE,
    overflow: "hidden"
  }, /* @__PURE__ */ React48.createElement(AsyncImage, {
    height: LOGO_SIZE,
    src: iconUrl,
    width: LOGO_SIZE
  })), /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4",
    paddingX: "32",
    style: { textAlign: "center" }
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalText",
    size: "18",
    weight: "bold"
  }, ready ? `Opening ${name}...` : hasExtension ? `${name} is not installed` : `${name} is not available`), !ready && hasExtension ? /* @__PURE__ */ React48.createElement(Box, {
    paddingTop: "20"
  }, /* @__PURE__ */ React48.createElement(ActionButton, {
    href: wallet.extensionDownloadUrl,
    label: "INSTALL",
    type: "secondary"
  })) : null, ready && !hasQrCode && /* @__PURE__ */ React48.createElement(React48.Fragment, null, /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    textAlign: "center",
    weight: "medium"
  }, "Confirm connection in the extension")), /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    color: "modalText",
    display: "flex",
    flexDirection: "row",
    height: "32",
    marginTop: "8"
  }, connectionError ? /* @__PURE__ */ React48.createElement(ActionButton, {
    label: "RETRY",
    onClick: getDesktopDeepLink ? async () => {
      const uri = await getDesktopDeepLink();
      window.open(uri, safari ? "_blank" : "_self");
    } : () => {
      reconnect(wallet);
    }
  }) : /* @__PURE__ */ React48.createElement(Box, {
    color: "modalTextSecondary"
  }, /* @__PURE__ */ React48.createElement(SpinnerIcon, null))))))), /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "row",
    gap: "8",
    height: "28",
    justifyContent: "space-between",
    marginTop: "12"
  }, ready && secondaryAction && /* @__PURE__ */ React48.createElement(React48.Fragment, null, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, secondaryAction.description), /* @__PURE__ */ React48.createElement(ActionButton, {
    label: secondaryAction.label,
    onClick: secondaryAction.onClick,
    type: "secondary"
  }))));
}
var DownloadOptionsBox = ({
  actionLabel,
  description,
  iconAccent,
  iconBackground,
  iconUrl,
  isCompact,
  onAction,
  title,
  url,
  variant
}) => {
  const isBrowserCard = variant === "browser";
  const gradientRgbas = !isBrowserCard && iconAccent && getGradientRGBAs(iconAccent);
  return /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    borderRadius: "13",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    paddingX: isCompact ? "18" : "44",
    position: "relative",
    style: { flex: 1, isolation: "isolate" },
    width: "full"
  }, /* @__PURE__ */ React48.createElement(Box, {
    borderColor: "actionButtonBorder",
    borderRadius: "13",
    borderStyle: "solid",
    borderWidth: "1",
    style: {
      bottom: "0",
      left: "0",
      position: "absolute",
      right: "0",
      top: "0",
      zIndex: 1
    }
  }), isBrowserCard && /* @__PURE__ */ React48.createElement(Box, {
    background: "downloadTopCardBackground",
    height: "full",
    position: "absolute",
    style: {
      zIndex: 0
    },
    width: "full"
  }, /* @__PURE__ */ React48.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    style: {
      bottom: "0",
      filter: "blur(20px)",
      left: "0",
      position: "absolute",
      right: "0",
      top: "0",
      transform: "translate3d(0, 0, 0)"
    }
  }, /* @__PURE__ */ React48.createElement(Box, {
    style: {
      filter: "blur(100px)",
      marginLeft: -27,
      marginTop: -20,
      opacity: 0.6,
      transform: "translate3d(0, 0, 0)"
    }
  }, /* @__PURE__ */ React48.createElement(AsyncImage, {
    borderRadius: "full",
    height: "200",
    src: iconUrl,
    width: "200"
  })), /* @__PURE__ */ React48.createElement(Box, {
    style: {
      filter: "blur(100px)",
      marginRight: 0,
      marginTop: 105,
      opacity: 0.6,
      overflow: "auto",
      transform: "translate3d(0, 0, 0)"
    }
  }, /* @__PURE__ */ React48.createElement(AsyncImage, {
    borderRadius: "full",
    height: "200",
    src: iconUrl,
    width: "200"
  })))), !isBrowserCard && gradientRgbas && /* @__PURE__ */ React48.createElement(Box, {
    background: "downloadBottomCardBackground",
    style: {
      bottom: "0",
      left: "0",
      position: "absolute",
      right: "0",
      top: "0"
    }
  }, /* @__PURE__ */ React48.createElement(Box, {
    position: "absolute",
    style: {
      background: `radial-gradient(50% 50% at 50% 50%, ${gradientRgbas[0]} 0%, ${gradientRgbas[1]} 25%, rgba(0,0,0,0) 100%)`,
      height: 564,
      left: -215,
      top: -197,
      transform: "translate3d(0, 0, 0)",
      width: 564
    }
  }), /* @__PURE__ */ React48.createElement(Box, {
    position: "absolute",
    style: {
      background: `radial-gradient(50% 50% at 50% 50%, ${gradientRgbas[2]} 0%, rgba(0, 0, 0, 0) 100%)`,
      height: 564,
      left: -1,
      top: -76,
      transform: "translate3d(0, 0, 0)",
      width: 564
    }
  })), /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    gap: "24",
    height: "max",
    justifyContent: "center",
    style: { zIndex: 1 }
  }, /* @__PURE__ */ React48.createElement(Box, null, /* @__PURE__ */ React48.createElement(AsyncImage, {
    height: "60",
    src: iconUrl,
    width: "60",
    ...iconBackground ? {
      background: iconBackground,
      borderColor: "generalBorder",
      borderRadius: "10"
    } : null
  })), /* @__PURE__ */ React48.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    style: { flex: 1 },
    width: "full"
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, title), /* @__PURE__ */ React48.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, description), /* @__PURE__ */ React48.createElement(Box, {
    marginTop: "14",
    width: "max"
  }, /* @__PURE__ */ React48.createElement(ActionButton, {
    href: url,
    label: actionLabel,
    onClick: onAction,
    size: "medium"
  })))));
};
function DownloadOptionsDetail({
  changeWalletStep,
  wallet
}) {
  const browser = getBrowser();
  const modalSize = useContext12(ModalSizeContext);
  const isCompact = modalSize === "compact";
  const { extension, extensionDownloadUrl, mobileDownloadUrl } = wallet;
  useEffect14(() => {
    preloadCreateIcon();
    preloadScanIcon();
    preloadRefreshIcon();
  }, []);
  return /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "24",
    height: "full",
    marginBottom: "8",
    marginTop: "4",
    width: "full"
  }, /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8",
    height: "full",
    justifyContent: "center",
    width: "full"
  }, extensionDownloadUrl && /* @__PURE__ */ React48.createElement(DownloadOptionsBox, {
    actionLabel: `Add to ${browser}`,
    description: "Access your wallet right from your favorite web browser.",
    iconUrl: getBrowserSrc,
    isCompact,
    onAction: () => changeWalletStep(
      (extension == null ? void 0 : extension.instructions) ? "INSTRUCTIONS_EXTENSION" /* InstructionsExtension */ : "CONNECT" /* Connect */
    ),
    title: `${wallet.name} for ${browser}`,
    url: extensionDownloadUrl,
    variant: "browser"
  }), mobileDownloadUrl && /* @__PURE__ */ React48.createElement(DownloadOptionsBox, {
    actionLabel: "Get the app",
    description: "Use the mobile wallet to explore the world of Ethereum.",
    iconAccent: wallet.iconAccent,
    iconBackground: wallet.iconBackground,
    iconUrl: wallet.iconUrl,
    isCompact,
    onAction: () => {
      changeWalletStep("DOWNLOAD" /* Download */);
    },
    title: `${wallet.name} for Mobile`,
    variant: "app"
  })));
}
function DownloadDetail({
  changeWalletStep,
  wallet
}) {
  const { downloadUrls, qrCode } = wallet;
  useEffect14(() => {
    preloadCreateIcon();
    preloadScanIcon();
  }, []);
  return /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "24",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React48.createElement(Box, {
    style: { maxWidth: 220, textAlign: "center" }
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "semibold"
  }, "Scan with your phone to download on iOS or Android")), /* @__PURE__ */ React48.createElement(Box, {
    height: "full"
  }, (downloadUrls == null ? void 0 : downloadUrls.qrCode) ? /* @__PURE__ */ React48.createElement(QRCode, {
    logoSize: 0,
    size: 268,
    uri: downloadUrls.qrCode
  }) : null), /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "row",
    gap: "8",
    height: "34",
    justifyContent: "space-between",
    marginBottom: "12",
    paddingY: "8"
  }, /* @__PURE__ */ React48.createElement(ActionButton, {
    label: "Continue",
    onClick: () => changeWalletStep(
      (qrCode == null ? void 0 : qrCode.instructions) ? "INSTRUCTIONS_MOBILE" /* InstructionsMobile */ : "CONNECT" /* Connect */
    )
  })));
}
var stepIcons = {
  create: () => /* @__PURE__ */ React48.createElement(CreateIcon, null),
  install: (wallet) => /* @__PURE__ */ React48.createElement(AsyncImage, {
    background: wallet.iconBackground,
    borderColor: "generalBorder",
    borderRadius: "10",
    height: "48",
    src: wallet.iconUrl,
    width: "48"
  }),
  refresh: () => /* @__PURE__ */ React48.createElement(RefreshIcon, null),
  scan: () => /* @__PURE__ */ React48.createElement(ScanIcon, null)
};
function InstructionMobileDetail({
  connectWallet,
  wallet
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React48.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "28",
    height: "full",
    justifyContent: "center",
    paddingY: "32",
    style: { maxWidth: 320 }
  }, (_b = (_a = wallet == null ? void 0 : wallet.qrCode) == null ? void 0 : _a.instructions) == null ? void 0 : _b.steps.map((d, idx) => {
    var _a2;
    return /* @__PURE__ */ React48.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16",
      key: idx
    }, /* @__PURE__ */ React48.createElement(Box, {
      borderRadius: "10",
      height: "48",
      minWidth: "48",
      overflow: "hidden",
      position: "relative",
      width: "48"
    }, (_a2 = stepIcons[d.step]) == null ? void 0 : _a2.call(stepIcons, wallet)), /* @__PURE__ */ React48.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React48.createElement(Text, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, d.title), /* @__PURE__ */ React48.createElement(Text, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, d.description)));
  })), /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    marginBottom: "16"
  }, /* @__PURE__ */ React48.createElement(ActionButton, {
    label: "Connect",
    onClick: () => connectWallet(wallet)
  }), /* @__PURE__ */ React48.createElement(Box, {
    as: "a",
    className: touchableStyles({ active: "shrink", hover: "grow" }),
    display: "block",
    href: (_d = (_c = wallet == null ? void 0 : wallet.qrCode) == null ? void 0 : _c.instructions) == null ? void 0 : _d.learnMoreUrl,
    paddingX: "12",
    paddingY: "4",
    rel: "noreferrer",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default"
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))));
}
function InstructionExtensionDetail({
  wallet
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React48.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "28",
    height: "full",
    justifyContent: "center",
    paddingY: "32",
    style: { maxWidth: 320 }
  }, (_b = (_a = wallet == null ? void 0 : wallet.extension) == null ? void 0 : _a.instructions) == null ? void 0 : _b.steps.map((d, idx) => {
    var _a2;
    return /* @__PURE__ */ React48.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16",
      key: idx
    }, /* @__PURE__ */ React48.createElement(Box, {
      borderRadius: "10",
      height: "48",
      minWidth: "48",
      overflow: "hidden",
      position: "relative",
      width: "48"
    }, (_a2 = stepIcons[d.step]) == null ? void 0 : _a2.call(stepIcons, wallet)), /* @__PURE__ */ React48.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React48.createElement(Text, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, d.title), /* @__PURE__ */ React48.createElement(Text, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, d.description)));
  })), /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    marginBottom: "16"
  }, /* @__PURE__ */ React48.createElement(ActionButton, {
    label: "Refresh",
    onClick: window.location.reload.bind(window.location)
  }), /* @__PURE__ */ React48.createElement(Box, {
    as: "a",
    className: touchableStyles({ active: "shrink", hover: "grow" }),
    display: "block",
    href: (_d = (_c = wallet == null ? void 0 : wallet.extension) == null ? void 0 : _c.instructions) == null ? void 0 : _d.learnMoreUrl,
    paddingX: "12",
    paddingY: "4",
    rel: "noreferrer",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default"
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))));
}

// src/components/ConnectOptions/DesktopOptions.tsx
function DesktopOptions({ onClose }) {
  const titleId = "rk_connect_title";
  const safari = isSafari();
  const [selectedOptionId, setSelectedOptionId] = useState9();
  const [selectedWallet, setSelectedWallet] = useState9();
  const [qrCodeUri, setQrCodeUri] = useState9();
  const hasQrCode = !!(selectedWallet == null ? void 0 : selectedWallet.qrCode) && qrCodeUri;
  const [connectionError, setConnectionError] = useState9(false);
  const modalSize = useContext13(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  const { disclaimer: Disclaimer } = useContext13(AppContext);
  const wallets = useWalletConnectors().filter((wallet) => wallet.ready || !!wallet.extensionDownloadUrl).sort((a, b) => a.groupIndex - b.groupIndex);
  const groupedWallets = groupBy(wallets, (wallet) => wallet.groupName);
  const connectToWallet = (wallet) => {
    var _a, _b, _c;
    setConnectionError(false);
    if (wallet.ready) {
      (_b = (_a = wallet == null ? void 0 : wallet.connect) == null ? void 0 : _a.call(wallet)) == null ? void 0 : _b.catch(() => {
        setConnectionError(true);
      });
      const getDesktopDeepLink = (_c = wallet.desktop) == null ? void 0 : _c.getUri;
      if (getDesktopDeepLink) {
        setTimeout(async () => {
          const uri = await getDesktopDeepLink();
          window.open(uri, safari ? "_blank" : "_self");
        }, 0);
      }
    }
  };
  const selectWallet = (wallet) => {
    var _a;
    connectToWallet(wallet);
    setSelectedOptionId(wallet.id);
    if (wallet.ready) {
      let callbackFired = false;
      (_a = wallet == null ? void 0 : wallet.onConnecting) == null ? void 0 : _a.call(wallet, async () => {
        var _a2, _b;
        if (callbackFired)
          return;
        callbackFired = true;
        const sWallet = wallets.find((w) => wallet.id === w.id);
        const uri = await ((_a2 = sWallet == null ? void 0 : sWallet.qrCode) == null ? void 0 : _a2.getUri());
        setQrCodeUri(uri);
        setTimeout(
          () => {
            setSelectedWallet(sWallet);
            changeWalletStep("CONNECT" /* Connect */);
          },
          uri ? 0 : 50
        );
        const provider = await (sWallet == null ? void 0 : sWallet.connector.getProvider());
        const connection = (_b = provider == null ? void 0 : provider.signer) == null ? void 0 : _b.connection;
        if ((connection == null ? void 0 : connection.on) && (connection == null ? void 0 : connection.off)) {
          const handleConnectionClose = () => {
            removeHandlers();
            selectWallet(wallet);
          };
          const removeHandlers = () => {
            connection.off("close", handleConnectionClose);
            connection.off("open", removeHandlers);
          };
          connection.on("close", handleConnectionClose);
          connection.on("open", removeHandlers);
        }
      });
    } else {
      setSelectedWallet(wallet);
      changeWalletStep(
        (wallet == null ? void 0 : wallet.extensionDownloadUrl) ? "DOWNLOAD_OPTIONS" /* DownloadOptions */ : "CONNECT" /* Connect */
      );
    }
  };
  const getWalletDownload = (id) => {
    var _a;
    setSelectedOptionId(id);
    const sWallet = wallets.find((w) => id === w.id);
    const isMobile2 = (_a = sWallet == null ? void 0 : sWallet.downloadUrls) == null ? void 0 : _a.qrCode;
    const isExtension = !!(sWallet == null ? void 0 : sWallet.extensionDownloadUrl);
    setSelectedWallet(sWallet);
    if (isMobile2 && isExtension) {
      changeWalletStep("DOWNLOAD_OPTIONS" /* DownloadOptions */);
    } else if (isMobile2) {
      changeWalletStep("DOWNLOAD" /* Download */);
    } else {
      changeWalletStep("INSTRUCTIONS_EXTENSION" /* InstructionsExtension */);
    }
  };
  const clearSelectedWallet = () => {
    setSelectedOptionId(void 0);
    setSelectedWallet(void 0);
    setQrCodeUri(void 0);
  };
  const changeWalletStep = (newWalletStep, isBack = false) => {
    if (isBack && newWalletStep === "GET" /* Get */ && initialWalletStep === "GET" /* Get */) {
      clearSelectedWallet();
    } else if (!isBack && newWalletStep === "GET" /* Get */) {
      setInitialWalletStep("GET" /* Get */);
    } else if (!isBack && newWalletStep === "CONNECT" /* Connect */) {
      setInitialWalletStep("CONNECT" /* Connect */);
    }
    setWalletStep(newWalletStep);
  };
  const [initialWalletStep, setInitialWalletStep] = useState9(
    "NONE" /* None */
  );
  const [walletStep, setWalletStep] = useState9("NONE" /* None */);
  let walletContent = null;
  let headerLabel = null;
  let headerBackButtonLink = null;
  let headerBackButtonCallback;
  useEffect15(() => {
    setConnectionError(false);
  }, [walletStep, selectedWallet]);
  const hasExtension = !!(selectedWallet == null ? void 0 : selectedWallet.extensionDownloadUrl);
  const hasExtensionAndMobile = !!(hasExtension && (selectedWallet == null ? void 0 : selectedWallet.mobileDownloadUrl));
  switch (walletStep) {
    case "NONE" /* None */:
      walletContent = /* @__PURE__ */ React49.createElement(ConnectModalIntro, {
        getWallet: () => changeWalletStep("GET" /* Get */)
      });
      break;
    case "LEARN_COMPACT" /* LearnCompact */:
      walletContent = /* @__PURE__ */ React49.createElement(ConnectModalIntro, {
        compactModeEnabled,
        getWallet: () => changeWalletStep("GET" /* Get */)
      });
      headerLabel = "What is a Wallet?";
      headerBackButtonLink = "NONE" /* None */;
      break;
    case "GET" /* Get */:
      walletContent = /* @__PURE__ */ React49.createElement(GetDetail, {
        getWalletDownload
      });
      headerLabel = "Get a Wallet";
      headerBackButtonLink = compactModeEnabled ? "LEARN_COMPACT" /* LearnCompact */ : "NONE" /* None */;
      break;
    case "CONNECT" /* Connect */:
      walletContent = selectedWallet && /* @__PURE__ */ React49.createElement(ConnectDetail, {
        changeWalletStep,
        compactModeEnabled,
        connectionError,
        onClose,
        qrCodeUri,
        reconnect: connectToWallet,
        wallet: selectedWallet
      });
      headerLabel = hasQrCode && `Scan with ${selectedWallet.name === "WalletConnect" ? "your phone" : selectedWallet.name}`;
      headerBackButtonLink = compactModeEnabled ? "NONE" /* None */ : null;
      headerBackButtonCallback = compactModeEnabled ? clearSelectedWallet : () => {
      };
      break;
    case "DOWNLOAD_OPTIONS" /* DownloadOptions */:
      walletContent = selectedWallet && /* @__PURE__ */ React49.createElement(DownloadOptionsDetail, {
        changeWalletStep,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get ${selectedWallet.name}`;
      headerBackButtonLink = hasExtensionAndMobile && "CONNECT" /* Connect */ ? initialWalletStep : null;
      break;
    case "DOWNLOAD" /* Download */:
      walletContent = selectedWallet && /* @__PURE__ */ React49.createElement(DownloadDetail, {
        changeWalletStep,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Install ${selectedWallet.name}`;
      headerBackButtonLink = hasExtensionAndMobile ? "DOWNLOAD_OPTIONS" /* DownloadOptions */ : initialWalletStep;
      break;
    case "INSTRUCTIONS_MOBILE" /* InstructionsMobile */:
      walletContent = selectedWallet && /* @__PURE__ */ React49.createElement(InstructionMobileDetail, {
        connectWallet: selectWallet,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get started with ${compactModeEnabled ? selectedWallet.shortName || selectedWallet.name : selectedWallet.name}`;
      headerBackButtonLink = "DOWNLOAD" /* Download */;
      break;
    case "INSTRUCTIONS_EXTENSION" /* InstructionsExtension */:
      walletContent = selectedWallet && /* @__PURE__ */ React49.createElement(InstructionExtensionDetail, {
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get started with ${compactModeEnabled ? selectedWallet.shortName || selectedWallet.name : selectedWallet.name}`;
      headerBackButtonLink = "DOWNLOAD_OPTIONS" /* DownloadOptions */;
      break;
    default:
      break;
  }
  return /* @__PURE__ */ React49.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    style: { maxHeight: compactModeEnabled ? 468 : 504 }
  }, (compactModeEnabled ? walletStep === "NONE" /* None */ : true) && /* @__PURE__ */ React49.createElement(Box, {
    className: compactModeEnabled ? sidebarCompactMode : sidebar,
    display: "flex",
    flexDirection: "column",
    marginTop: "16"
  }, /* @__PURE__ */ React49.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, compactModeEnabled && Disclaimer && /* @__PURE__ */ React49.createElement(Box, {
    marginLeft: "16",
    width: "28"
  }, /* @__PURE__ */ React49.createElement(InfoButton, {
    onClick: () => changeWalletStep("LEARN_COMPACT" /* LearnCompact */)
  })), compactModeEnabled && !Disclaimer && /* @__PURE__ */ React49.createElement(Box, {
    marginLeft: "16",
    width: "28"
  }), /* @__PURE__ */ React49.createElement(Box, {
    marginLeft: compactModeEnabled ? "0" : "6",
    paddingBottom: "8",
    paddingTop: "2",
    paddingX: "18"
  }, /* @__PURE__ */ React49.createElement(Text, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: "18",
    weight: "heavy"
  }, "Connect a Wallet")), compactModeEnabled && /* @__PURE__ */ React49.createElement(Box, {
    marginRight: "16"
  }, /* @__PURE__ */ React49.createElement(CloseButton, {
    onClose
  }))), /* @__PURE__ */ React49.createElement(Box, {
    className: ScrollClassName,
    paddingBottom: "18"
  }, Object.entries(groupedWallets).map(
    ([groupName, wallets2], index) => wallets2.length > 0 && /* @__PURE__ */ React49.createElement(Fragment2, {
      key: index
    }, groupName ? /* @__PURE__ */ React49.createElement(Box, {
      marginBottom: "8",
      marginTop: "16",
      marginX: "6"
    }, /* @__PURE__ */ React49.createElement(Text, {
      color: "modalTextSecondary",
      size: "14",
      weight: "bold"
    }, groupName)) : null, /* @__PURE__ */ React49.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, wallets2.map((wallet) => {
      return /* @__PURE__ */ React49.createElement(ModalSelection, {
        currentlySelected: wallet.id === selectedOptionId,
        iconBackground: wallet.iconBackground,
        iconUrl: wallet.iconUrl,
        key: wallet.id,
        name: wallet.name,
        onClick: () => selectWallet(wallet),
        ready: wallet.ready,
        recent: wallet.recent,
        testId: `wallet-option-${wallet.id}`
      });
    })))
  )), compactModeEnabled && /* @__PURE__ */ React49.createElement(React49.Fragment, null, /* @__PURE__ */ React49.createElement(Box, {
    background: "generalBorder",
    height: "1",
    marginTop: "-1"
  }), Disclaimer ? /* @__PURE__ */ React49.createElement(Box, {
    paddingX: "24",
    paddingY: "16",
    textAlign: "center"
  }, /* @__PURE__ */ React49.createElement(Disclaimer, {
    Link: DisclaimerLink,
    Text: DisclaimerText
  })) : /* @__PURE__ */ React49.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingX: "24",
    paddingY: "16"
  }, /* @__PURE__ */ React49.createElement(Box, {
    paddingY: "4"
  }, /* @__PURE__ */ React49.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "New to Ethereum wallets?")), /* @__PURE__ */ React49.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "4",
    justifyContent: "center"
  }, /* @__PURE__ */ React49.createElement(Box, {
    className: touchableStyles({
      active: "shrink",
      hover: "grow"
    }),
    cursor: "pointer",
    onClick: () => changeWalletStep("LEARN_COMPACT" /* LearnCompact */),
    paddingY: "4",
    style: { willChange: "transform" },
    transition: "default"
  }, /* @__PURE__ */ React49.createElement(Text, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More")))))), (compactModeEnabled ? walletStep !== "NONE" /* None */ : true) && /* @__PURE__ */ React49.createElement(React49.Fragment, null, !compactModeEnabled && /* @__PURE__ */ React49.createElement(Box, {
    background: "generalBorder",
    minWidth: "1",
    width: "1"
  }), /* @__PURE__ */ React49.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    margin: "16",
    style: { flexGrow: 1 }
  }, /* @__PURE__ */ React49.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12"
  }, /* @__PURE__ */ React49.createElement(Box, {
    width: "28"
  }, headerBackButtonLink && /* @__PURE__ */ React49.createElement(Box, {
    as: "button",
    className: touchableStyles({
      active: "shrinkSm",
      hover: "growLg"
    }),
    color: "accentColor",
    onClick: () => {
      headerBackButtonLink && changeWalletStep(headerBackButtonLink, true);
      headerBackButtonCallback == null ? void 0 : headerBackButtonCallback();
    },
    paddingX: "8",
    paddingY: "4",
    style: {
      boxSizing: "content-box",
      height: 17,
      willChange: "transform"
    },
    transition: "default",
    type: "button"
  }, /* @__PURE__ */ React49.createElement(BackIcon, null))), /* @__PURE__ */ React49.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    style: { flexGrow: 1 }
  }, headerLabel && /* @__PURE__ */ React49.createElement(Text, {
    color: "modalText",
    size: "18",
    textAlign: "center",
    weight: "heavy"
  }, headerLabel)), /* @__PURE__ */ React49.createElement(CloseButton, {
    onClose
  })), /* @__PURE__ */ React49.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    style: { minHeight: compactModeEnabled ? 396 : 432 }
  }, /* @__PURE__ */ React49.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "6",
    height: "full",
    justifyContent: "center",
    marginX: "8"
  }, walletContent)))));
}

// src/components/ConnectOptions/MobileOptions.tsx
import React50, { useCallback as useCallback9, useContext as useContext14, useState as useState10 } from "react";

// src/components/ConnectOptions/MobileOptions.css.ts
var scroll = "MobileOptions_scroll__1am14410";

// src/components/ConnectOptions/MobileOptions.tsx
function WalletButton({
  onClose,
  wallet
}) {
  const {
    connect,
    connector,
    iconBackground,
    iconUrl,
    id,
    mobile,
    name,
    onConnecting,
    ready,
    shortName
  } = wallet;
  const getMobileUri = mobile == null ? void 0 : mobile.getUri;
  const coolModeRef = useCoolMode(iconUrl);
  return /* @__PURE__ */ React50.createElement(Box, {
    as: "button",
    color: ready ? "modalText" : "modalTextSecondary",
    disabled: !ready,
    fontFamily: "body",
    key: id,
    onClick: useCallback9(async () => {
      if (id === "walletConnect")
        onClose == null ? void 0 : onClose();
      connect == null ? void 0 : connect();
      let callbackFired = false;
      onConnecting == null ? void 0 : onConnecting(async () => {
        if (callbackFired)
          return;
        callbackFired = true;
        if (getMobileUri) {
          const mobileUri = await getMobileUri();
          if (connector.id === "walletConnect" || connector.id === "walletConnectLegacy") {
            setWalletConnectDeepLink({ mobileUri, name });
          }
          if (mobileUri.startsWith("http")) {
            const link = document.createElement("a");
            link.href = mobileUri;
            link.target = "_blank";
            link.rel = "noreferrer noopener";
            link.click();
          } else {
            window.location.href = mobileUri;
          }
        }
      });
    }, [connector, connect, getMobileUri, onConnecting, onClose, name, id]),
    ref: coolModeRef,
    style: { overflow: "visible", textAlign: "center" },
    testId: `wallet-option-${id}`,
    type: "button",
    width: "full"
  }, /* @__PURE__ */ React50.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }, /* @__PURE__ */ React50.createElement(Box, {
    paddingBottom: "8",
    paddingTop: "10"
  }, /* @__PURE__ */ React50.createElement(AsyncImage, {
    background: iconBackground,
    borderRadius: "13",
    boxShadow: "walletLogo",
    height: "60",
    src: iconUrl,
    width: "60"
  })), /* @__PURE__ */ React50.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  }, /* @__PURE__ */ React50.createElement(Text, {
    as: "h2",
    color: wallet.ready ? "modalText" : "modalTextSecondary",
    size: "13",
    weight: "medium"
  }, /* @__PURE__ */ React50.createElement(Box, {
    as: "span",
    position: "relative"
  }, shortName != null ? shortName : name, !wallet.ready && " (unsupported)")), wallet.recent && /* @__PURE__ */ React50.createElement(Text, {
    color: "accentColor",
    size: "12",
    weight: "medium"
  }, "Recent"))));
}
function MobileOptions({ onClose }) {
  var _a;
  const titleId = "rk_connect_title";
  const wallets = useWalletConnectors();
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext14(AppContext);
  let headerLabel = null;
  let walletContent = null;
  let headerBackgroundContrast = false;
  let headerBackButtonLink = null;
  const [walletStep, setWalletStep] = useState10(
    "CONNECT" /* Connect */
  );
  const ios = isIOS();
  switch (walletStep) {
    case "CONNECT" /* Connect */: {
      headerLabel = "Connect a Wallet";
      headerBackgroundContrast = true;
      walletContent = /* @__PURE__ */ React50.createElement(Box, null, /* @__PURE__ */ React50.createElement(Box, {
        background: "profileForeground",
        className: scroll,
        display: "flex",
        paddingBottom: "20",
        paddingTop: "6"
      }, /* @__PURE__ */ React50.createElement(Box, {
        display: "flex",
        style: { margin: "0 auto" }
      }, wallets.filter((wallet) => wallet.ready).map((wallet) => {
        return /* @__PURE__ */ React50.createElement(Box, {
          key: wallet.id,
          paddingX: "20"
        }, /* @__PURE__ */ React50.createElement(Box, {
          width: "60"
        }, /* @__PURE__ */ React50.createElement(WalletButton, {
          onClose,
          wallet
        })));
      }))), /* @__PURE__ */ React50.createElement(Box, {
        background: "generalBorder",
        height: "1",
        marginBottom: "32",
        marginTop: "-1"
      }), /* @__PURE__ */ React50.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "32",
        paddingX: "32",
        style: { textAlign: "center" }
      }, /* @__PURE__ */ React50.createElement(Box, {
        display: "flex",
        flexDirection: "column",
        gap: "8",
        textAlign: "center"
      }, /* @__PURE__ */ React50.createElement(Text, {
        color: "modalText",
        size: "16",
        weight: "bold"
      }, "What is a Wallet?"), /* @__PURE__ */ React50.createElement(Text, {
        color: "modalTextSecondary",
        size: "16"
      }, "A wallet is used to send, receive, store, and display digital assets. It\u2019s also a new way to log in, without needing to create new accounts and passwords on\xA0every\xA0website."))), /* @__PURE__ */ React50.createElement(Box, {
        paddingTop: "32",
        paddingX: "20"
      }, /* @__PURE__ */ React50.createElement(Box, {
        display: "flex",
        gap: "14",
        justifyContent: "center"
      }, /* @__PURE__ */ React50.createElement(ActionButton, {
        label: "Get a Wallet",
        onClick: () => setWalletStep("GET" /* Get */),
        size: "large",
        type: "secondary"
      }), /* @__PURE__ */ React50.createElement(ActionButton, {
        href: learnMoreUrl,
        label: "Learn More",
        size: "large",
        type: "secondary"
      }))), Disclaimer && /* @__PURE__ */ React50.createElement(Box, {
        marginTop: "28",
        marginX: "32",
        textAlign: "center"
      }, /* @__PURE__ */ React50.createElement(Disclaimer, {
        Link: DisclaimerLink,
        Text: DisclaimerText
      })));
      break;
    }
    case "GET" /* Get */: {
      headerLabel = "Get a Wallet";
      headerBackButtonLink = "CONNECT" /* Connect */;
      const mobileWallets = (_a = wallets == null ? void 0 : wallets.filter(
        (wallet) => {
          var _a2, _b, _c;
          return ((_a2 = wallet.downloadUrls) == null ? void 0 : _a2.ios) || ((_b = wallet.downloadUrls) == null ? void 0 : _b.android) || ((_c = wallet.downloadUrls) == null ? void 0 : _c.mobile);
        }
      )) == null ? void 0 : _a.splice(0, 3);
      walletContent = /* @__PURE__ */ React50.createElement(Box, null, /* @__PURE__ */ React50.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "full",
        marginBottom: "36",
        marginTop: "5",
        paddingTop: "12",
        width: "full"
      }, mobileWallets.map((wallet, index) => {
        const { downloadUrls, iconBackground, iconUrl, name } = wallet;
        if (!(downloadUrls == null ? void 0 : downloadUrls.ios) && !(downloadUrls == null ? void 0 : downloadUrls.android) && !(downloadUrls == null ? void 0 : downloadUrls.mobile)) {
          return null;
        }
        return /* @__PURE__ */ React50.createElement(Box, {
          display: "flex",
          gap: "16",
          key: wallet.id,
          paddingX: "20",
          width: "full"
        }, /* @__PURE__ */ React50.createElement(Box, {
          style: { minHeight: 48, minWidth: 48 }
        }, /* @__PURE__ */ React50.createElement(AsyncImage, {
          background: iconBackground,
          borderColor: "generalBorder",
          borderRadius: "10",
          height: "48",
          src: iconUrl,
          width: "48"
        })), /* @__PURE__ */ React50.createElement(Box, {
          display: "flex",
          flexDirection: "column",
          width: "full"
        }, /* @__PURE__ */ React50.createElement(Box, {
          alignItems: "center",
          display: "flex",
          height: "48"
        }, /* @__PURE__ */ React50.createElement(Box, {
          width: "full"
        }, /* @__PURE__ */ React50.createElement(Text, {
          color: "modalText",
          size: "18",
          weight: "bold"
        }, name)), /* @__PURE__ */ React50.createElement(ActionButton, {
          href: (ios ? downloadUrls == null ? void 0 : downloadUrls.ios : downloadUrls == null ? void 0 : downloadUrls.android) || (downloadUrls == null ? void 0 : downloadUrls.mobile),
          label: "GET",
          size: "small",
          type: "secondary"
        })), index < mobileWallets.length - 1 && /* @__PURE__ */ React50.createElement(Box, {
          background: "generalBorderDim",
          height: "1",
          marginY: "10",
          width: "full"
        })));
      })), /* @__PURE__ */ React50.createElement(Box, {
        style: { marginBottom: "42px" }
      }), /* @__PURE__ */ React50.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "36",
        paddingX: "36",
        style: { textAlign: "center" }
      }, /* @__PURE__ */ React50.createElement(Box, {
        display: "flex",
        flexDirection: "column",
        gap: "12",
        textAlign: "center"
      }, /* @__PURE__ */ React50.createElement(Text, {
        color: "modalText",
        size: "16",
        weight: "bold"
      }, "Not what you\u2019re looking for?"), /* @__PURE__ */ React50.createElement(Text, {
        color: "modalTextSecondary",
        size: "16"
      }, "Select a wallet on the main screen to get started with a different wallet provider."))));
      break;
    }
  }
  return /* @__PURE__ */ React50.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "36"
  }, /* @__PURE__ */ React50.createElement(Box, {
    background: headerBackgroundContrast ? "profileForeground" : "modalBackground",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "4",
    paddingTop: "14"
  }, /* @__PURE__ */ React50.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "6",
    paddingX: "20",
    position: "relative"
  }, headerBackButtonLink && /* @__PURE__ */ React50.createElement(Box, {
    display: "flex",
    position: "absolute",
    style: {
      left: 0,
      marginBottom: -20,
      marginTop: -20
    }
  }, /* @__PURE__ */ React50.createElement(Box, {
    alignItems: "center",
    as: "button",
    className: touchableStyles({
      active: "shrinkSm",
      hover: "growLg"
    }),
    color: "accentColor",
    display: "flex",
    marginLeft: "4",
    marginTop: "20",
    onClick: () => setWalletStep(headerBackButtonLink),
    padding: "16",
    style: { height: 17, willChange: "transform" },
    transition: "default",
    type: "button"
  }, /* @__PURE__ */ React50.createElement(BackIcon, null))), /* @__PURE__ */ React50.createElement(Box, {
    marginTop: "4",
    textAlign: "center",
    width: "full"
  }, /* @__PURE__ */ React50.createElement(Text, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: "20",
    weight: "bold"
  }, headerLabel)), /* @__PURE__ */ React50.createElement(Box, {
    alignItems: "center",
    display: "flex",
    height: "32",
    paddingRight: "14",
    position: "absolute",
    right: "0"
  }, /* @__PURE__ */ React50.createElement(Box, {
    style: { marginBottom: -20, marginTop: -20 }
  }, /* @__PURE__ */ React50.createElement(CloseButton, {
    onClose
  }))))), /* @__PURE__ */ React50.createElement(Box, {
    display: "flex",
    flexDirection: "column"
  }, walletContent));
}

// src/components/ConnectOptions/ConnectOptions.tsx
function ConnectOptions({ onClose }) {
  return isMobile() ? /* @__PURE__ */ React51.createElement(MobileOptions, {
    onClose
  }) : /* @__PURE__ */ React51.createElement(DesktopOptions, {
    onClose
  });
}

// src/components/ConnectModal/ConnectModal.tsx
function ConnectModal({ onClose, open }) {
  const titleId = "rk_connect_title";
  const connectionStatus = useConnectionStatus();
  if (connectionStatus === "disconnected") {
    return /* @__PURE__ */ React52.createElement(Dialog, {
      onClose,
      open,
      titleId
    }, /* @__PURE__ */ React52.createElement(DialogContent, {
      bottomSheetOnMobile: true,
      padding: "0",
      wide: true
    }, /* @__PURE__ */ React52.createElement(ConnectOptions, {
      onClose
    })));
  }
  if (connectionStatus === "unauthenticated") {
    return /* @__PURE__ */ React52.createElement(Dialog, {
      onClose,
      open,
      titleId
    }, /* @__PURE__ */ React52.createElement(DialogContent, {
      bottomSheetOnMobile: true,
      padding: "0"
    }, /* @__PURE__ */ React52.createElement(SignIn, {
      onClose
    })));
  }
  return null;
}

// src/components/RainbowKitProvider/ModalContext.tsx
function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState11(false);
  return {
    closeModal: useCallback10(() => setModalOpen(false), []),
    isModalOpen,
    openModal: useCallback10(() => setModalOpen(true), [])
  };
}
var ModalContext = createContext10({
  accountModalOpen: false,
  chainModalOpen: false,
  connectModalOpen: false
});
function ModalProvider({ children }) {
  const { closeModal: closeConnectModal, isModalOpen: connectModalOpen, openModal: openConnectModal } = useModalStateValue();
  const { closeModal: closeAccountModal, isModalOpen: accountModalOpen, openModal: openAccountModal } = useModalStateValue();
  const { closeModal: closeChainModal, isModalOpen: chainModalOpen, openModal: openChainModal } = useModalStateValue();
  const connectionStatus = useConnectionStatus();
  const { chain } = useNetwork6();
  const chainSupported = !(chain == null ? void 0 : chain.unsupported);
  const fn = useRef5();
  function closeModals({ keepConnectModalOpen = false } = {}) {
    if (!keepConnectModalOpen) {
      closeConnectModal();
    }
    closeAccountModal();
    closeChainModal();
  }
  const isUnauthenticated = useAuthenticationStatus() === "unauthenticated";
  useAccount10({
    onConnect: () => closeModals({ keepConnectModalOpen: isUnauthenticated }),
    onDisconnect: () => closeModals()
  });
  return /* @__PURE__ */ React53.createElement(ModalContext.Provider, {
    value: useMemo6(
      () => ({
        accountModalOpen,
        chainModalOpen,
        connectModalOpen,
        closeChainModal,
        openAccountModal: chainSupported && connectionStatus === "connected" ? openAccountModal : void 0,
        openChainModal: connectionStatus === "connected" ? openChainModal : void 0,
        openConnectModal: connectionStatus === "disconnected" || connectionStatus === "unauthenticated" ? openConnectModal : void 0,
        setFn: (_fn) => {
          fn.current = _fn;
        }
      }),
      [connectionStatus, chainSupported, accountModalOpen, chainModalOpen, connectModalOpen, openAccountModal, openChainModal, openConnectModal]
    )
  }, children, /* @__PURE__ */ React53.createElement(ConnectModal, {
    onClose: closeConnectModal,
    open: connectModalOpen
  }), /* @__PURE__ */ React53.createElement(AccountModal, {
    onClose: closeAccountModal,
    open: accountModalOpen
  }), fn.current && /* @__PURE__ */ React53.createElement(ChainModal, {
    onClose: closeChainModal,
    open: chainModalOpen,
    fn: fn.current
  }));
}
function useModalState() {
  const { accountModalOpen, chainModalOpen, connectModalOpen } = useContext15(ModalContext);
  return {
    accountModalOpen,
    chainModalOpen,
    connectModalOpen
  };
}
function useAccountModal() {
  const { accountModalOpen, openAccountModal } = useContext15(ModalContext);
  return { accountModalOpen, openAccountModal };
}
function useChainModal() {
  const { chainModalOpen, openChainModal, closeChainModal, setFn } = useContext15(ModalContext);
  return { chainModalOpen, openChainModal, closeChainModal, setFn };
}
function useConnectModal() {
  const { connectModalOpen, openConnectModal } = useContext15(ModalContext);
  return { connectModalOpen, openConnectModal };
}

// src/components/ConnectButton/ConnectButtonRenderer.tsx
var noop = () => {
};
function ConnectButtonRenderer({
  children
}) {
  var _a, _b, _c, _d;
  const mounted = useIsMounted();
  const { address } = useAccount11();
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { data: balanceData } = useBalance2({ address });
  const { chain: activeChain } = useNetwork7();
  const rainbowkitChainsById = useRainbowKitChainsById();
  const authenticationStatus = (_a = useAuthenticationStatus()) != null ? _a : void 0;
  const rainbowKitChain = activeChain ? rainbowkitChainsById[activeChain.id] : void 0;
  const chainName = (_b = rainbowKitChain == null ? void 0 : rainbowKitChain.name) != null ? _b : void 0;
  const chainIconUrl = (_c = rainbowKitChain == null ? void 0 : rainbowKitChain.iconUrl) != null ? _c : void 0;
  const chainIconBackground = (_d = rainbowKitChain == null ? void 0 : rainbowKitChain.iconBackground) != null ? _d : void 0;
  const resolvedChainIconUrl = useAsyncImage(chainIconUrl);
  const showRecentTransactions = useContext16(ShowRecentTransactionsContext);
  const hasPendingTransactions = useRecentTransactions().some(({ status }) => status === "pending") && showRecentTransactions;
  const displayBalance = balanceData ? `${abbreviateETHBalance(parseFloat(balanceData.formatted))} ${balanceData.symbol}` : void 0;
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { accountModalOpen, chainModalOpen, connectModalOpen } = useModalState();
  return /* @__PURE__ */ React54.createElement(React54.Fragment, null, children({
    account: address ? {
      address,
      balanceDecimals: balanceData == null ? void 0 : balanceData.decimals,
      balanceFormatted: balanceData == null ? void 0 : balanceData.formatted,
      balanceSymbol: balanceData == null ? void 0 : balanceData.symbol,
      displayBalance,
      displayName: ensName ? formatENS(ensName) : formatAddress(address),
      ensAvatar: ensAvatar != null ? ensAvatar : void 0,
      ensName: ensName != null ? ensName : void 0,
      hasPendingTransactions
    } : void 0,
    accountModalOpen,
    authenticationStatus,
    chain: activeChain ? {
      hasIcon: Boolean(chainIconUrl),
      iconBackground: chainIconBackground,
      iconUrl: resolvedChainIconUrl,
      id: activeChain.id,
      name: chainName != null ? chainName : activeChain.name,
      unsupported: activeChain.unsupported
    } : void 0,
    chainModalOpen,
    connectModalOpen,
    mounted,
    openAccountModal: openAccountModal != null ? openAccountModal : noop,
    openChainModal: openChainModal != null ? openChainModal : noop,
    openConnectModal: openConnectModal != null ? openConnectModal : noop
  }));
}
ConnectButtonRenderer.displayName = "ConnectButton.Custom";

// src/components/ConnectButton/ConnectButton.tsx
var defaultProps = {
  accountStatus: "full",
  chainStatus: { largeScreen: "full", smallScreen: "icon" },
  label: "Connect Wallet",
  showBalance: { largeScreen: true, smallScreen: false }
};
function ConnectButton({
  accountStatus = defaultProps.accountStatus,
  chainStatus = defaultProps.chainStatus,
  label = defaultProps.label,
  showBalance = defaultProps.showBalance
}) {
  const chains = useRainbowKitChains();
  const connectionStatus = useConnectionStatus();
  return /* @__PURE__ */ React55.createElement(ConnectButtonRenderer, null, ({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
    var _a, _b, _c;
    const ready = mounted && connectionStatus !== "loading";
    const unsupportedChain = (_a = chain == null ? void 0 : chain.unsupported) != null ? _a : false;
    return /* @__PURE__ */ React55.createElement(Box, {
      display: "flex",
      gap: "12",
      ...!ready && {
        "aria-hidden": true,
        style: {
          opacity: 0,
          pointerEvents: "none",
          userSelect: "none"
        }
      }
    }, ready && account && connectionStatus === "connected" ? /* @__PURE__ */ React55.createElement(React55.Fragment, null, chain && (chains.length > 1 || unsupportedChain) && /* @__PURE__ */ React55.createElement(Box, {
      alignItems: "center",
      "aria-label": "Chain Selector",
      as: "button",
      background: unsupportedChain ? "connectButtonBackgroundError" : "connectButtonBackground",
      borderRadius: "connectButton",
      boxShadow: "connectButton",
      className: touchableStyles({
        active: "shrink",
        hover: "grow"
      }),
      color: unsupportedChain ? "connectButtonTextError" : "connectButtonText",
      display: mapResponsiveValue(chainStatus, (value) => value === "none" ? "none" : "flex"),
      fontFamily: "body",
      fontWeight: "bold",
      gap: "6",
      key: unsupportedChain ? "unsupported" : "supported",
      onClick: openChainModal,
      paddingX: "10",
      paddingY: "8",
      testId: unsupportedChain ? "wrong-network-button" : "chain-button",
      transition: "default",
      type: "button"
    }, unsupportedChain ? /* @__PURE__ */ React55.createElement(Box, {
      alignItems: "center",
      display: "flex",
      height: "24",
      paddingX: "4"
    }, "Wrong network") : /* @__PURE__ */ React55.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6"
    }, chain.hasIcon ? /* @__PURE__ */ React55.createElement(Box, {
      display: mapResponsiveValue(chainStatus, (value) => value === "full" || value === "icon" ? "block" : "none"),
      height: "24",
      width: "24"
    }, /* @__PURE__ */ React55.createElement(AsyncImage, {
      alt: (_b = chain.name) != null ? _b : "Chain icon",
      background: chain.iconBackground,
      borderRadius: "full",
      height: "24",
      src: chain.iconUrl,
      width: "24"
    })) : null, /* @__PURE__ */ React55.createElement(Box, {
      display: mapResponsiveValue(chainStatus, (value) => {
        if (value === "icon" && !chain.iconUrl) {
          return "block";
        }
        return value === "full" || value === "name" ? "block" : "none";
      })
    }, (_c = chain.name) != null ? _c : chain.id)), /* @__PURE__ */ React55.createElement(DropdownIcon, null)), !unsupportedChain && /* @__PURE__ */ React55.createElement(Box, {
      alignItems: "center",
      as: "button",
      background: "connectButtonBackground",
      borderRadius: "connectButton",
      boxShadow: "connectButton",
      className: touchableStyles({
        active: "shrink",
        hover: "grow"
      }),
      color: "connectButtonText",
      display: "flex",
      fontFamily: "body",
      fontWeight: "bold",
      onClick: openAccountModal,
      testId: "account-button",
      transition: "default",
      type: "button"
    }, account.displayBalance && /* @__PURE__ */ React55.createElement(Box, {
      display: mapResponsiveValue(showBalance, (value) => value ? "block" : "none"),
      padding: "8",
      paddingLeft: "12"
    }, account.displayBalance), /* @__PURE__ */ React55.createElement(Box, {
      background: normalizeResponsiveValue(showBalance)[isMobile() ? "smallScreen" : "largeScreen"] ? "connectButtonInnerBackground" : "connectButtonBackground",
      borderColor: "connectButtonBackground",
      borderRadius: "connectButton",
      borderStyle: "solid",
      borderWidth: "2",
      color: "connectButtonText",
      fontFamily: "body",
      fontWeight: "bold",
      paddingX: "8",
      paddingY: "6",
      transition: "default"
    }, /* @__PURE__ */ React55.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6",
      height: "24"
    }, /* @__PURE__ */ React55.createElement(Box, {
      display: mapResponsiveValue(accountStatus, (value) => value === "full" || value === "avatar" ? "block" : "none")
    }, /* @__PURE__ */ React55.createElement(Avatar, {
      address: account.address,
      imageUrl: account.ensAvatar,
      loading: account.hasPendingTransactions,
      size: 24
    })), /* @__PURE__ */ React55.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6"
    }, /* @__PURE__ */ React55.createElement(Box, {
      display: mapResponsiveValue(accountStatus, (value) => value === "full" || value === "address" ? "block" : "none")
    }, account.displayName), /* @__PURE__ */ React55.createElement(DropdownIcon, null)))))) : /* @__PURE__ */ React55.createElement(Box, {
      as: "button",
      background: "accentColor",
      borderRadius: "connectButton",
      boxShadow: "connectButton",
      className: touchableStyles({ active: "shrink", hover: "grow" }),
      color: "accentColorForeground",
      fontFamily: "body",
      fontWeight: "bold",
      height: "40",
      key: "connect",
      onClick: openConnectModal,
      paddingX: "14",
      testId: "connect-button",
      transition: "default",
      type: "button"
    }, label));
  });
}
ConnectButton.__defaultProps = defaultProps;
ConnectButton.Custom = ConnectButtonRenderer;

export {
  isAndroid,
  isIOS,
  isMobile,
  useWalletConnectors,
  useAsyncImage,
  isHexString,
  DesktopOptions,
  MobileOptions,
  dialogContent,
  dialogContentMobile,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  useChainId,
  useTransactionStore,
  cssObjectFromTheme,
  cssStringFromTheme,
  RainbowKitProvider,
  useAccountModal,
  useChainModal,
  useConnectModal,
  ConnectButton
};
