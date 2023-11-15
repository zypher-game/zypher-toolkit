"use strict";
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var dialog_1 = require("@reach/dialog");
var antd_1 = require("antd");
var react_1 = require("react");
var recoil_1 = require("recoil");
var useCustomTranslation_1 = require("../../../../hooks/useCustomTranslation");
var i18n_1 = require("./../..../../../../../utils/i18n");
var connectWalletState_1 = require("../../state/connectWalletState");
require("./PointsRuleDialog.module.stylus");
var PointsRuleDialog = function () {
    var t = useCustomTranslation_1.useCustomTranslation([i18n_1.LngNs.common, i18n_1.LngNs.points]).t;
    var isModalOpen = recoil_1.useRecoilValue(connectWalletState_1.pointsRuleDialogState);
    var setIsModalOpen = recoil_1.useSetRecoilState(connectWalletState_1.pointsRuleDialogState);
    var handleCancel = react_1.useCallback(function () {
        setIsModalOpen(false);
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(dialog_1.DialogOverlay, { isOpen: isModalOpen, onDismiss: handleCancel, className: "points_dialog_zindex" },
            react_1["default"].createElement(dialog_1.DialogContent, { className: "points_dialog_dialogContent" },
                react_1["default"].createElement("div", { className: "points_dialog_dialogHeader" },
                    react_1["default"].createElement("h3", null, t("Rules")),
                    react_1["default"].createElement("div", { className: "points_dialog_cursor", onClick: handleCancel },
                        react_1["default"].createElement(icons_1.CloseOutlined, null))),
                react_1["default"].createElement("div", { className: "points_dialog_dialogContainer" },
                    react_1["default"].createElement("h4", null, t("PointsRuleText01")),
                    react_1["default"].createElement("p", null, t("PointsRuleText02")),
                    react_1["default"].createElement("p", null,
                        react_1["default"].createElement("em", null),
                        react_1["default"].createElement("i", null, t("PointsRuleText03")),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("em", null),
                        react_1["default"].createElement("i", null, t("PointsRuleText04")),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("em", null),
                        react_1["default"].createElement("i", null, t("PointsRuleText04")),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("em", null),
                        " ",
                        react_1["default"].createElement("i", null, t("PointsRuleText06"))),
                    react_1["default"].createElement("p", null, t("PointsRuleText07", {
                        Link: (react_1["default"].createElement("a", { href: "https://medium.com/@ZypherGames/upcoming-announcement-44e69204adb1", target: "_blank", rel: "noreferrer" }, t("PointsRuleText08")))
                    })),
                    react_1["default"].createElement("h4", null, t("PointsRuleText09")),
                    react_1["default"].createElement("p", null, (t("PointsRuleText10"),
                        {
                            Discord: (react_1["default"].createElement("a", { href: "https://discord.com/invite/MKJZhS4p2T", target: "_blank", className: "points_dialog_fontWhite", rel: "noreferrer" }, "Discord"))
                        }))),
                react_1["default"].createElement("div", { className: "points_dialog_btnWrap" },
                    react_1["default"].createElement(antd_1.Button, { className: "points_dialog_btn", onClick: handleCancel }, t("Ok")))))));
};
exports["default"] = PointsRuleDialog;
