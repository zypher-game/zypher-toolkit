"use strict";
exports.__esModule = true;
exports.DisconnectBtn = void 0;
var rainbowkit_1 = require("@zypher-game/rainbowkit");
var lodash_1 = require("../../../../../utils/lodash");
var react_1 = require("react");
var copy_1 = require("../../../../../utils/copy");
var tool_1 = require("../../../../../utils/tool");
var icons_1 = require("../../../../../components/icons");
var config = require("../../../../../constant/constant");
require("./PcUserInfo.module.stylus");
var PcUserInfo = react_1.memo(function (_a) {
    var _b;
    var connectName = _a.connectName, connectIcon = _a.connectIcon, account = _a.account, chainId = _a.chainId, cancel = _a.cancel;
    var src = rainbowkit_1.useAsyncImage(connectIcon);
    return (react_1["default"].createElement("div", { className: "pc_user_pc_content" },
        react_1["default"].createElement("div", { className: "pc_user_box" },
            react_1["default"].createElement("div", { className: "pc_user_tit" }, "Connected with " + connectName),
            react_1["default"].createElement("div", { className: "pc_user_info" },
                connectIcon && react_1["default"].createElement("img", { src: src, alt: connectName }),
                react_1["default"].createElement("div", { className: "pc_user_text" }, tool_1.getShortenAddress(account)),
                react_1["default"].createElement("span", { onClick: function () { return copy_1["default"](account); } },
                    react_1["default"].createElement(icons_1["default"], { name: "copy" })),
                config.BlockExplorerUrls[chainId] && (react_1["default"].createElement("a", { href: ((_b = config.BlockExplorerUrls[chainId]) !== null && _b !== void 0 ? _b : [0]) + "/address/" + account, target: "_blank", rel: "noreferrer" },
                    react_1["default"].createElement(icons_1["default"], { name: "link" }))))),
        react_1["default"].createElement(exports.DisconnectBtn, { cancel: cancel })));
}, lodash_1.isEqual);
exports.DisconnectBtn = react_1.memo(function (_a) {
    var cancel = _a.cancel;
    return (react_1["default"].createElement("p", { className: "pc_user_disconnect_btn", onClick: cancel }, "Disconnect"));
}, lodash_1.isEqual);
exports["default"] = PcUserInfo;
