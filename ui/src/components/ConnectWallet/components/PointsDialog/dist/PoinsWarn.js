"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var lodash_1 = require("../../../../utils/lodash");
var react_1 = require("react");
var recoil_1 = require("recoil");
var useCustomTranslation_1 = require("../../../../hooks/useCustomTranslation");
var i18n_1 = require("../../../../utils/i18n");
var icons_1 = require("../../../../components/icons");
var connectWalletState_1 = require("../../state/connectWalletState");
require("./PointsRuleDialog.module.stylus");
var PoinsWarn = react_1.memo(function (_a) {
    var handleNext = _a.handleNext;
    var t = useCustomTranslation_1.useCustomTranslation([i18n_1.LngNs.common, i18n_1.LngNs.siderBar]).t;
    var _b = recoil_1.useRecoilState(connectWalletState_1.hidePointsWarnState), hidePointsWarn = _b[0], setHidePointsWarn = _b[1];
    return (react_1["default"].createElement("div", { className: "points_dialog_dialogContainer" },
        react_1["default"].createElement("p", null, t("poinsWarnText01")),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("em", null),
            react_1["default"].createElement("i", null, t("poinsWarnText02")),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("em", null),
            react_1["default"].createElement("i", null, t("poinsWarnText03"))),
        react_1["default"].createElement("p", null, t("poinsWarnText04")),
        react_1["default"].createElement("p", { className: "points_dialog_flex", onClick: function () { return setHidePointsWarn(!hidePointsWarn); } },
            react_1["default"].createElement(icons_1["default"], { name: hidePointsWarn ? "checked" : "check" }),
            t("poinsWarnText05")),
        react_1["default"].createElement(antd_1.Button, { className: "points_dialog_btn", onClick: handleNext }, t("Ok"))));
}, lodash_1.isEqual);
exports["default"] = PoinsWarn;
