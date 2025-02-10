"use strict";
cc._RF.push(module, '1336b/Nn7NKaKGbfiRSaI58', 'EnumUtil');
// Script/conventions/EnumUtil.ts

/**
 * copyright (c) windwide.cn
 * author: donhwa
 * desc: enum util
 * date: 2020-11-19
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumUtil = void 0;
var EnumUtil = /** @class */ (function () {
    function EnumUtil() {
    }
    /** 取枚举长度 */
    EnumUtil.size = function (e) {
        return Object.keys(e).length / 2;
    };
    /** 返回根据枚举长度填满初始值的数组 */
    EnumUtil.newArray = function (e, initItem) {
        var arr = [];
        for (var i = 0, size = EnumUtil.size(e); i < size; i++) {
            arr.push(initItem);
        }
        return arr;
    };
    return EnumUtil;
}());
exports.EnumUtil = EnumUtil;

cc._RF.pop();