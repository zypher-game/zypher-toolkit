"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var classnames_1 = require("classnames");
var lodash_1 = require("../../../../utils/lodash");
var react_1 = require("react");
var recoil_1 = require("recoil");
var CurrencyLogo_1 = require("../../../CurrencyLogo");
var useActiveWeb3React_1 = require("../../../../hooks/useActiveWeb3React");
var useCustomTranslation_1 = require("../../../../hooks/useCustomTranslation");
var useWindowSize_1 = require("../../../../hooks/useWindowSize");
var usePoint_1 = require("../../../../hooks/usePoint");
var i18n_1 = require("../../../../utils/i18n");
var icons_1 = require("../../../icons");
var constant_1 = require("../../../../constant/constant");
var connectWalletHooks_1 = require("../../hooks/connectWalletHooks");
var connectWalletState_1 = require("../../state/connectWalletState");
var DialogTitle_1 = require("../DialogComponents/DialogTitle");
var PoinsWarn_1 = require("./PoinsWarn");
require("./PointsDialog.module.stylus");
var PointsIcon_1 = require("../../../icons/PointsIcon/PointsIcon");
var PointsDialog = react_1.memo(function (props) {
    var _a = recoil_1.useRecoilState(connectWalletState_1.pointsDialogState), pointsDialogOpen = _a[0], setPointsDialogOpen = _a[1];
    var pointsWarn = recoil_1.useRecoilValue(connectWalletState_1.pointsWarnState);
    var chainId = useActiveWeb3React_1.useActiveWeb3React().chainId;
    var pointsBalanceStr = connectWalletHooks_1.usePointsBalanceStr();
    var isMobile = useWindowSize_1.useIsMobile();
    var _b = react_1.useState([]), pointsList = _b[0], setPointsList = _b[1];
    var setPointsRuleModalOpen = recoil_1.useSetRecoilState(connectWalletState_1.pointsRuleDialogState);
    var _c = usePoint_1.useSwapPoint(), isLoading = _c.isLoading, swapPointHandle = _c.swapPointHandle;
    react_1.useEffect(function () {
        if (chainId) {
            setTimeout(function () {
                var list = usePoint_1.pointsListDefault(chainId);
                if (list) {
                    setPointsList(list);
                }
            }, 800);
        }
    }, [chainId]);
    return (react_1["default"].createElement(antd_1.Modal, { open: pointsDialogOpen, onCancel: function () { return setPointsDialogOpen(false); }, footer: null, wrapClassName: classnames_1["default"]("customDialog", "bottom", "dialog"), width: isMobile ? "100%" : 604, 
        // transitionName="ant-slide-up"
        destroyOnClose: true, closable: false, centered: isMobile ? false : true, transitionName: isMobile ? "ant-slide-down" : undefined },
        react_1["default"].createElement(DialogTitle_1["default"], { label: "Recharge Points", setDialogOpen: setPointsDialogOpen, classNames: "modalTitleInner" }),
        react_1["default"].createElement("div", { className: "modalMain" }, pointsWarn === 1 ? (react_1["default"].createElement(PoinsWarn_1["default"], { isLoading: isLoading, handleNext: swapPointHandle })) : isLoading ? (react_1["default"].createElement(IsLoading, null)) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "balanceTitle" },
                react_1["default"].createElement("p", null,
                    "Balance: ",
                    react_1["default"].createElement("strong", null, pointsBalanceStr)),
                react_1["default"].createElement(PointsIcon_1.PointsIcon, { isMobile: isMobile, classname: "pointsIcon" })),
            react_1["default"].createElement(PointsTable, { pointsList: pointsList, chainId: chainId, onClick: swapPointHandle }))))));
}, lodash_1.isEqual);
var IsLoading = react_1.memo(function () {
    var t = useCustomTranslation_1.useCustomTranslation([i18n_1.LngNs.points]).t;
    return (react_1["default"].createElement("div", { className: "loading" },
        react_1["default"].createElement(icons_1["default"], { name: "loading02" }),
        react_1["default"].createElement("p", null, t("IsLoadingText1"))));
}, lodash_1.isEqual);
var PointsTable = react_1.memo(function (_a) {
    var pointsList = _a.pointsList, chainId = _a.chainId, onClick = _a.onClick;
    return (react_1["default"].createElement("div", { className: "table" }, pointsList.map(function (v, index) { return (react_1["default"].createElement("div", { className: classnames_1["default"]("points", "points_" + v.index), key: v.index, onClick: function () { return onClick(index); } },
        react_1["default"].createElement("h3", null, v.pointAmountStr),
        react_1["default"].createElement("img", { className: "points_img", src: constant_1.preStaticUrl + ("/img/points/points_" + v.index + ".png"), alt: "points" }),
        react_1["default"].createElement("div", { className: "bottom" },
            react_1["default"].createElement("p", null, v.priceStr),
            react_1["default"].createElement(CurrencyLogo_1["default"], { className: "img", src: constant_1.CurrencyLogo[chainId || 97] })),
        v.discount && (react_1["default"].createElement("div", { className: "discount" },
            react_1["default"].createElement("img", { className: "discount_img", src: constant_1.preStaticUrl + "/img/points/discord.svg", alt: "points" }),
            react_1["default"].createElement("p", null,
                v.discount,
                "% ",
                react_1["default"].createElement("br", null),
                "OFF"))))); })));
}, lodash_1.isEqual);
exports["default"] = PointsDialog;
