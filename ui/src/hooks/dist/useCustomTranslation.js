"use strict";
exports.__esModule = true;
exports.useCustomTranslation = void 0;
var react_i18next_1 = require("react-i18next");
exports.useCustomTranslation = function (namespaces) {
    console.log("@2222", 1111, namespaces);
    var _a = react_i18next_1.useTranslation(namespaces), t = _a.t, i18n = _a.i18n;
    // const { t, i18n } = useBaseTranslation(Object.values(LngNs))
    console.log("@weeewe", 1111);
    // 在这里添加您的自定义逻辑
    return { t: t, i18n: i18n };
};
