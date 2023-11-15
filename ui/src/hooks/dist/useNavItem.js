"use strict";
exports.__esModule = true;
exports.useNavItem = exports.usePathname = exports.INavLinkType = void 0;
var react_1 = require("react");
var recoil_1 = require("recoil");
var i18n_1 = require("../utils/i18n");
var useCustomTranslation_1 = require("./useCustomTranslation");
var useWindowSize_1 = require("./useWindowSize");
var state_1 = require("../components/SideBar/state");
var INavLinkType;
(function (INavLinkType) {
    INavLinkType["Games"] = "Games";
    INavLinkType["Activities"] = "Activities";
    INavLinkType["Language"] = "Language";
    INavLinkType["Links"] = "Links";
})(INavLinkType = exports.INavLinkType || (exports.INavLinkType = {}));
exports.usePathname = function () {
    var isMobile = useWindowSize_1.useIsMobile();
    var setDefaultSelectedKey = recoil_1.useSetRecoilState(state_1.defaultSelectedKey);
    react_1.useEffect(function () {
        // const path = location.pathname
        var path = window.location.pathname.split("/");
        var pathName = path[1];
        switch (pathName) {
            case "zBingo":
                return setDefaultSelectedKey("2");
            case "profile":
                return setDefaultSelectedKey("3");
            case "gbBox":
                return setDefaultSelectedKey("4");
            case "invitation":
                return setDefaultSelectedKey("7");
            case "ranking":
                return setDefaultSelectedKey("8");
            case "defense":
                return setDefaultSelectedKey("9");
            case "shop":
                return setDefaultSelectedKey("5");
            default:
                setDefaultSelectedKey("1");
        }
        console.log(9999);
    }, [isMobile]);
};
exports.useNavItem = function () {
    var t = useCustomTranslation_1.useCustomTranslation([i18n_1.LngNs.siderBar]).t;
    return react_1.useMemo(function () {
        return [
            {
                label: t("Home"),
                keyValue: "1",
                icon: "home.svg",
                link: "/",
                disabled: false,
                type: INavLinkType.Activities
            },
            {
                label: t("zBingo"),
                keyValue: "2",
                icon: "zBingo.png",
                link: "/zBingo",
                disabled: false,
                type: INavLinkType.Games
            },
            {
                label: t("zAce"),
                keyValue: "6",
                icon: "zACE.png",
                link: "/zAce",
                disabled: true,
                type: INavLinkType.Games
            },
            {
                label: t("z2048"),
                keyValue: "10",
                icon: "z2048.png",
                link: "/z2048",
                disabled: true,
                type: INavLinkType.Games
            },
            {
                label: t("zMahjong"),
                keyValue: "11",
                icon: "zMahjong.png",
                link: "/zmahjong",
                disabled: true,
                type: INavLinkType.Games
            },
            {
                label: t("Candy Crush"),
                keyValue: "12",
                icon: "Candy.png",
                link: "/candycrush",
                disabled: true,
                type: INavLinkType.Games
            },
            {
                label: t("Murder Mystery"),
                keyValue: "13",
                icon: "Murder.png",
                link: "/murdermystery",
                disabled: true,
                type: INavLinkType.Games
            },
            {
                label: t("TCG"),
                keyValue: "14",
                icon: "TCG.png",
                link: "/tcg",
                disabled: true,
                type: INavLinkType.Games
            },
            {
                label: t("Profile"),
                keyValue: "3",
                icon: "profile.svg",
                link: "/profile",
                disabled: false,
                type: INavLinkType.Activities
            },
            {
                label: t("Defense"),
                keyValue: "9",
                icon: "defense.svg",
                link: "/defense",
                disabled: false,
                type: INavLinkType.Activities
            },
            {
                label: t("Invitation 🔥"),
                keyValue: "7",
                icon: "invitation.svg",
                link: "/invitation",
                disabled: true,
                type: INavLinkType.Activities
            },
            {
                label: t("Ranking"),
                keyValue: "8",
                icon: "ranking.svg",
                link: "/ranking",
                disabled: false,
                type: INavLinkType.Activities
            },
            // { label: t('GB )Box', keyValue: '4', icon: "gbBox.svg", link: '/gbBox', disabled: false, type: INavLinkType.Activities },
            {
                label: t("Shop"),
                keyValue: "5",
                icon: "shop.svg",
                link: "/shop",
                disabled: true,
                type: INavLinkType.Activities
            },
        ];
    }, [t]);
};
