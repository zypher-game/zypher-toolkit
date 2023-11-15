"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.PlayerAvatarList = void 0;
var antd_1 = require("antd");
var classnames_1 = require("classnames");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
// import { BackgroundSets, generateAvatar } from 'robohash-avatars'
var generateAvatar_1 = require("../../utils/generateAvatar");
var tool_1 = require("../../utils/tool");
var constant_1 = require("../../constant/constant");
require("./index.module.stylus");
var PlayerAvatar = function (_a) {
    var account = _a.account, _b = _a.showAccount, showAccount = _b === void 0 ? false : _b, _c = _a.size, size = _c === void 0 ? 60 : _c, _d = _a.border, border = _d === void 0 ? false : _d, _e = _a.AvatarBorder, AvatarBorder = _e === void 0 ? react_1["default"].Fragment : _e, _f = _a.AccountTextFrComp, AccountTextFrComp = _f === void 0 ? react_1["default"].Fragment : _f, className = _a.className, preLen = _a.preLen, endLen = _a.endLen, otherStr = _a.otherStr;
    var _g = generateAvatar_1["default"](account), selectedAvatar = _g.selectedAvatar, selectedBackground = _g.selectedBackground;
    return (react_1["default"].createElement("div", { className: classnames_1["default"](className, "player_playerAvatar") },
        account ? (react_1["default"].createElement(AvatarBorder, null,
            react_1["default"].createElement(antd_1.Avatar, { size: size, src: selectedAvatar, style: border
                    ? {
                        background: selectedBackground,
                        border: "2px solid #62380C"
                    }
                    : { background: selectedBackground } }))) : (
        // <img className={cx("player_avatar", { ["player_highLight"]: highLight })} width={size} height={size} src={generateAvatar(account)} />
        react_1["default"].createElement("div", { className: "player_avatar", style: {
                width: size + "px",
                height: size + "px",
                overflow: "hidden",
                background: "rgba(138, 138, 138, 1)"
            } },
            react_1["default"].createElement(antd_1.Avatar, { size: size, src: constant_1.preStaticUrl + "/img/default_avatar.png" }))),
        showAccount && (react_1["default"].createElement("p", { className: (className === null || className === void 0 ? void 0 : className.includes("account")) ? "player_avatar_account" : "" },
            account
                ? "" + tool_1.getShortenAddress(account, preLen, endLen) + (otherStr ? " " + otherStr : "")
                : "waiting",
            react_1["default"].createElement(AccountTextFrComp, null)))));
};
var OuterCircle = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: ", ";\n  border-radius: 50%;\n  position: relative;\n  ", "\n\n  padding: 1.875px;\n  ", "\n\n  .center-circle {\n    background: ", ";\n    border-radius: 50%;\n    padding: ", ";\n    width: 100%;\n    height: 100%;\n    .inner-circle {\n      background: #613c17;\n      box-shadow: ", ";\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      img {\n        border-radius: 50%;\n        box-shadow: ", ";\n      }\n    }\n  }\n"], ["\n  background: ",
    ";\n  border-radius: 50%;\n  position: relative;\n  ",
    "\n\n  padding: 1.875px;\n  ",
    "\n\n  .center-circle {\n    background: ",
    ";\n    border-radius: 50%;\n    padding: ",
    ";\n    width: 100%;\n    height: 100%;\n    .inner-circle {\n      background: #613c17;\n      box-shadow: ",
    ";\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      img {\n        border-radius: 50%;\n        box-shadow: ",
    ";\n      }\n    }\n  }\n"])), function (_a) {
    var isGrey = _a.isGrey, isGreen = _a.isGreen;
    if (isGreen) {
        return "linear-gradient(180deg, #8FCA3A 0%, #59B11C 32.81%, #259900 100%)";
    }
    if (isGrey) {
        return "linear-gradient(180deg, #ddd 0%, #434343 100%)";
    }
    return "linear-gradient(180deg, #F1A541 0%, #D48A2B 45.31%, #9F5A03 100%)"; // 默认值
}, function (_a) {
    var winner = _a.winner;
    return winner &&
        "&::after {\n    content: '';\n    position: absolute;\n    top: -14px;\n    right: -5px;\n    width: 27px;\n    height: 25px;\n    background: url(" + constant_1.preStaticUrl + "/img/layout/crown.svg) no-repeat;\n  }";
}, function (_a) {
    var size = _a.size;
    if (size === "small") {
        return " width: 40px;\n    height: 40px;";
    }
    else if (size === "large") {
        return " width: 64px;\n    height: 64px;\n    padding: 3px;";
    }
    else if (size) {
        return " width: " + size + "px;\n    height: " + size + "px;";
    }
    else {
        return "\n          width: 48px;\n          height: 48px;\n        ";
    }
}, function (_a) {
    var isGrey = _a.isGrey, isGreen = _a.isGreen;
    if (isGreen) {
        return "linear-gradient(180deg, #289B02 0%, #65B724 29.17%, #8CC939 100%)";
    }
    if (isGrey) {
        return "linear-gradient(180deg, #494949 0%, #d9d9d9 100%)";
    }
    return "linear-gradient(180deg, #AE6306 0%, #D68B2B 29.69%, #E79B3B 100%)"; // 默认值
}, function (_a) {
    var size = _a.size;
    if (size == "large") {
        return "2px";
    }
    return "1.25px"; // 默认值
}, function (_a) {
    var size = _a.size;
    if (size == "large") {
        return "0px 2px 0px 0px rgba(0, 0, 0, 0.25) inset";
    }
    return "0px 1.25px 0px 0px rgba(0, 0, 0, 0.25) inset"; // 默认值
}, function (_a) {
    var size = _a.size;
    if (size == "large") {
        return "0px 2px 0px 0px rgba(0, 0, 0, 0.25) inset";
    }
    return "0px 1.25px 0px 0px rgba(0, 0, 0, 0.25) inset"; // 默认值
});
exports.PlayerAvatarList = function (_a) {
    var account = _a.account, size = _a.size, _b = _a.isGreen, isGreen = _b === void 0 ? false : _b, _c = _a.isGrey, isGrey = _c === void 0 ? false : _c, winner = _a.winner;
    var _d = generateAvatar_1["default"](account), selectedAvatar = _d.selectedAvatar, selectedBackground = _d.selectedBackground;
    return (react_1["default"].createElement(OuterCircle, { size: size, isGreen: isGreen, isGrey: isGrey, winner: winner },
        react_1["default"].createElement("div", { className: "center-circle " },
            react_1["default"].createElement("div", { className: "inner-circle" }, account ? (react_1["default"].createElement("img", { width: "100%", src: selectedAvatar, style: { background: selectedBackground } })) : (react_1["default"].createElement("img", { width: "100%", src: constant_1.preStaticUrl + "/img/default_avatar.png" }))))));
};
exports["default"] = PlayerAvatar;
var templateObject_1;
