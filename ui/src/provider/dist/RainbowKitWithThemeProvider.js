"use strict";
exports.__esModule = true;
require("../utils/i18n");
var rainbowkit_1 = require("@zypher-game/toolkit/rainbowkit");
var react_1 = require("react");
var constant_1 = require("../constant/constant");
var wagmi_1 = require("wagmi");
var rainbow_1 = require("../rainbow/rainbow");
var RainbowKitWithThemeProvider = function (_a) {
  var children = _a.children;
  var computedTheme = react_1.useMemo(function () {
    return rainbowkit_1.darkTheme({
      accentColor: "#6673FF",
      borderRadius: "large",
      fontStack: "system",
    });
  }, []);
  return react_1["default"].createElement(
    wagmi_1.WagmiConfig,
    { config: rainbow_1.wagmiConfig },
    react_1["default"].createElement(
      rainbowkit_1.RainbowKitProvider,
      {
        chains: rainbow_1.chains,
        appInfo: constant_1.appInfo,
        theme: computedTheme,
      },
      children
    )
  );
};
exports["default"] = RainbowKitWithThemeProvider;
