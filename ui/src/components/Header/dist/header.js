"use strict";
exports.__esModule = true;
var classnames_1 = require("classnames");
var react_1 = require("react");
var recoil_1 = require("recoil");
var useWindowSize_1 = require("../../hooks/useWindowSize");
var icons_1 = require("../../components/icons");
var LinkToBetaDialog_1 = require("../ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog");
var SideBar_1 = require("../SideBar");
var header_module_stylus_1 = require("./header.module.stylus");
var rainbow_connectWallet_1 = require("./rainbow_account/rainbow_connectWallet");
var state_1 = require("./state");
var Header = function (props) {
    var isMobile = useWindowSize_1.useIsMobile();
    var setSiderCollapse = recoil_1.useSetRecoilState(state_1.siderCollapseState);
    var collapsed = recoil_1.useRecoilValue(state_1.siderCollapseState);
    var _a = props.hideMenu, hideMenu = _a === void 0 ? false : _a;
    return (react_1["default"].createElement("header", { className: classnames_1["default"](header_module_stylus_1["default"].header, props.className), style: { position: "sticky", top: 0, zIndex: 1, width: "100%" } },
        isMobile && (react_1["default"].createElement("div", { className: header_module_stylus_1["default"].left },
            react_1["default"].createElement(SideBar_1.MobileLogo, null))),
        react_1["default"].createElement("div", { className: header_module_stylus_1["default"].right },
            react_1["default"].createElement(rainbow_connectWallet_1["default"], { isMobile: isMobile }),
            isMobile && !hideMenu ? (react_1["default"].createElement(react_1["default"].Fragment, null, collapsed ? (react_1["default"].createElement("div", { className: header_module_stylus_1["default"].btn, onClick: function () { return setSiderCollapse(false); } },
                react_1["default"].createElement(icons_1["default"], { className: classnames_1["default"](header_module_stylus_1["default"].icon), name: "menu" }))) : (react_1["default"].createElement("div", { className: header_module_stylus_1["default"].btn, onClick: function () { return setSiderCollapse(true); } },
                react_1["default"].createElement(icons_1["default"], { className: classnames_1["default"](header_module_stylus_1["default"].icon, header_module_stylus_1["default"].close), name: "close" }))))) : null),
        react_1["default"].createElement(LinkToBetaDialog_1["default"], null)));
};
exports["default"] = Header;
