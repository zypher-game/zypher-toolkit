"use strict";
exports.__esModule = true;
var classnames_1 = require("classnames");
var react_1 = require("react");
var icons_1 = require("../../../icons");
require("./DialogTitle.module.stylus");
var DialogTitle = react_1.memo(function (_a) {
    var label = _a.label, setDialogOpen = _a.setDialogOpen, children = _a.children, classNames = _a.classNames;
    var closeHandle = react_1.useCallback(function () {
        setDialogOpen(false);
    }, [setDialogOpen]);
    return (react_1["default"].createElement("div", { className: classnames_1["default"]("dialog_title_modalTitleInner", classNames) },
        react_1["default"].createElement("p", { className: "dialog_title_title" }, label),
        children ? children : null,
        react_1["default"].createElement("span", { onClick: closeHandle },
            react_1["default"].createElement(icons_1["default"], { name: "close" }))));
});
exports["default"] = DialogTitle;
