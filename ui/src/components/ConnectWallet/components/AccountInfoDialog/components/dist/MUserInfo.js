"use strict";
exports.__esModule = true;
var classnames_1 = require("classnames");
var lodash_1 = require("../../../../../utils/lodash");
var react_1 = require("react");
var CurrencyLogo_1 = require("../../../../CurrencyLogo");
var PlayerAvatar_1 = require("../../../../PlayerAvatar");
var useWindowSize_1 = require("../../../../../hooks/useWindowSize");
var PointsIcon_1 = require("../../../../icons/PointsIcon/PointsIcon");
var constant_1 = require("../../../../../constant/constant");
var connectWalletHooks_1 = require("../../../hooks/connectWalletHooks");
var ChainSelectorWidget_1 = require("../../ChainSelector/ChainSelectorWidget");
require("./MUserInfo.module.stylus");
var PcUserInfo_1 = require("./PcUserInfo");
var MUserInfo = react_1.memo(function (_a) {
    var account = _a.account, chainId = _a.chainId, cancel = _a.cancel;
    var nativeBalanceStr = connectWalletHooks_1.useNativeBalanceStr();
    var pointsBalanceStr = connectWalletHooks_1.usePointsBalanceStr();
    var isMobile = useWindowSize_1.useIsMobile();
    var list = react_1.useMemo(function () {
        return [
            {
                balanceStr: pointsBalanceStr,
                logo: react_1["default"].createElement(PointsIcon_1.PointsIcon, { isMobile: isMobile }),
                symbol: "Gold Points"
            },
            {
                balanceStr: nativeBalanceStr,
                logo: (react_1["default"].createElement(CurrencyLogo_1["default"], { className: "m_user_img", src: constant_1.CurrencyLogo[chainId] })),
                symbol: constant_1.Currency[chainId]
            },
        ];
    }, []);
    return (react_1["default"].createElement("div", { className: "m_user_m_content" },
        react_1["default"].createElement(ChainSelectorWidget_1["default"], { className: classnames_1["default"]("m_user_border", "m_user_chain") }),
        react_1["default"].createElement("div", { className: "m_user_border" },
            react_1["default"].createElement("p", { className: "m_user_tit" }, "Your Wallet"),
            react_1["default"].createElement("div", { className: "m_user_userInfoInner" },
                react_1["default"].createElement(PlayerAvatar_1["default"], { className: "m_user_account", account: account, size: 24, showAccount: true }),
                react_1["default"].createElement(PcUserInfo_1.DisconnectBtn, { cancel: cancel })),
            react_1["default"].createElement("div", { className: "m_user_balance" }, list.map(function (v) { return (react_1["default"].createElement("div", { key: v.symbol, className: "m_user_item" },
                react_1["default"].createElement("div", { className: "m_user_fl" },
                    v.logo,
                    react_1["default"].createElement("p", null, v.symbol)),
                react_1["default"].createElement("p", null, v.balanceStr))); })))));
}, lodash_1.isEqual);
exports["default"] = MUserInfo;
