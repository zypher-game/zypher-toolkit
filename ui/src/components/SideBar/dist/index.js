"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.MobileLogo = void 0;
var classnames_1 = require("classnames");
var classnames_2 = require("classnames");
var react_1 = require("react");
var useNavItem_1 = require("../../hooks/useNavItem");
var constant_1 = require("../../constant/constant");
var CommunityLink_1 = require("./component/CommunityLink");
var Language_1 = require("./component/Language");
var LinkItemA_1 = require("./component/LinkItemA");
var SideBarActivitiesList_1 = require("./component/SideBarActivitiesList");
var SideBarGamesList_1 = require("./component/SideBarGamesList");
var SideBarTitle_1 = require("./component/SideBarTitle");
require("./sidebar.module.stylus");
exports.MobileLogo = react_1.memo(function (_a) {
    var isMobile = _a.isMobile;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("img", { src: constant_1.preStaticUrl + "/img/layout/logo-min.svg" }),
        react_1["default"].createElement("img", { src: constant_1.preStaticUrl + "/img/layout/ai.svg" })));
});
var SideBar = function (props) {
    var isMobile = props.isMobile;
    var items = useNavItem_1.useNavItem();
    useNavItem_1.usePathname();
    var _a = react_1.useMemo(function () {
        return {
            sideBarGamesLinkList: items.filter(function (v) { return v.type === useNavItem_1.INavLinkType.Games; }),
            sideBarActivitiesLinkList: items.filter(function (v) {
                return !isMobile
                    ? v.type === useNavItem_1.INavLinkType.Activities && v.keyValue !== "1"
                    : v.type === useNavItem_1.INavLinkType.Activities;
            })
        };
    }, [items, isMobile]), sideBarGamesLinkList = _a.sideBarGamesLinkList, sideBarActivitiesLinkList = _a.sideBarActivitiesLinkList;
    return (react_1["default"].createElement("div", { className: classnames_1["default"]("" + props.className, "sidebarWrap") },
        isMobile ? null : (react_1["default"].createElement("a", { href: "https://zypher.game/", target: "_black", className: classnames_2["default"]("logo") },
            react_1["default"].createElement("img", { src: constant_1.preStaticUrl + "/img/layout/logo.svg" }),
            react_1["default"].createElement("img", { src: constant_1.preStaticUrl + "/img/layout/ai.svg" }))),
        react_1["default"].createElement("div", { className: "sidebar" },
            isMobile ? null : (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(LinkItemA_1["default"], __assign({ className_on: "item_on", className_disable: "horListItmeDisable", className: "horListItme", isMobile: isMobile }, items[0])),
                react_1["default"].createElement("div", { className: "line" }))),
            react_1["default"].createElement(SideBarTitle_1["default"], { logo_title: "Games", logo_url_name: "games", className: "sideBarTitle" }),
            react_1["default"].createElement(SideBarGamesList_1["default"], { className_on: "item_on", className_list: "gamelist", className_listItem: "verListItme", className_listItemDisable: "verListItmeDisable", list: sideBarGamesLinkList, isMobile: isMobile }),
            react_1["default"].createElement("div", { className: "line" }),
            react_1["default"].createElement(SideBarTitle_1["default"], { logo_title: "Activities", logo_url_name: "activities", className: "sideBarTitle" }),
            react_1["default"].createElement(SideBarActivitiesList_1["default"], { isMobile: isMobile, className_on: "item_on", className_list: "activitiesList", className_listItemHorDisable: "horListItmeDisable", className_listItemHor: "horListItme", className_listItemVerDisable: "verListItmeDisable", className_listItemVer: "verListItme", list: sideBarActivitiesLinkList }),
            react_1["default"].createElement("div", { className: "line" }),
            react_1["default"].createElement(SideBarTitle_1["default"], { logo_title: "Language", logo_url_name: "language", className: "sideBarTitle" }),
            react_1["default"].createElement(Language_1["default"], { className: "language", className_item: classnames_1["default"]("horListItme", "languageItme"), className_itemtip: "languageItmeTip", className_on: "languageItmeOn" }),
            react_1["default"].createElement("div", { className: "line" }),
            react_1["default"].createElement(SideBarTitle_1["default"], { logo_title: "Links", logo_url_name: "links", className: "sideBarTitle" }),
            react_1["default"].createElement(CommunityLink_1["default"], { className: "communityLink" }))));
};
exports["default"] = SideBar;
