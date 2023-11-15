"use strict";
exports.__esModule = true;
exports.LngNs = exports.lng = void 0;
var i18next_1 = require("i18next");
var i18next_browser_languagedetector_1 = require("i18next-browser-languagedetector");
var i18next_http_backend_1 = require("i18next-http-backend");
var react_i18next_1 = require("react-i18next");
var language_1 = require("./language");
exports.lng = language_1["default"].split("-").join("_");
exports.LngNs = {
    common: "common",
    defense: "defense",
    points: "points",
    siderBar: "siderBar",
    home: "home",
    zBingo: "zBingo",
    invitation: "invitation",
    profile: "profile"
};
i18next_1["default"]
    .use(i18next_http_backend_1["default"])
    .use(i18next_browser_languagedetector_1["default"])
    .use(react_i18next_1.initReactI18next) // passes i18n down to react-i18next
    .init({
    fallbackLng: "zh_TW",
    backend: {
        loadPath: "https://static.zypher.game/i18n/{{lng}}/{{ns}}.json"
    },
    lng: exports.lng,
    ns: Object.values(exports.LngNs),
    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
});
