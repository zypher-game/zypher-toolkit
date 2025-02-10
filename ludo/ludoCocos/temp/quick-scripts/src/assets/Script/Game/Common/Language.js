"use strict";
cc._RF.push(module, 'b3268KQgv9AyaJKzqkUN4lh', 'Language');
// Script/Game/Common/Language.ts

"use strict";
/**
 * @name
 * @author
 * @description
 * @class
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LNumberInEn = exports.LNumber = exports.LCoin = exports.LnumToCh = exports.LFormatTimeOut = exports.LFormatDay = exports.LFormatHours = exports.LDate = exports.LDayTimer = exports.LTimer4 = exports.LTimer3 = exports.LTimer2 = exports.LTimer = exports.L = void 0;
var Zh_1 = require("./Zh");
var ccclass = cc._decorator.ccclass;
var Language = /** @class */ (function () {
    function Language() {
    }
    Language.prototype.getStr = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // @ts-ignore
        var msg = i18n.t.apply(i18n, __spreadArrays([key], args));
        if (!msg)
            msg = key + "";
        return msg;
    };
    /**倒计时 时:分:秒 */
    Language.prototype.formatTime = function (seconds) {
        var h = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        var r = "";
        r += (h > 9 ? h : "0" + h) + ":";
        r += (m > 9 ? m : "0" + m) + ":";
        r += s > 9 ? s : "0" + s;
        return r;
    };
    /**倒计时 分:秒 */
    Language.prototype.formatTime2 = function (seconds) {
        // let h = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        var r = "";
        // r += (h > 9 ? h : "0" + h) + ":";
        r += (m > 9 ? m : "0" + m) + ":";
        r += s > 9 ? s : "0" + s;
        return r;
    };
    /**倒计时 x天 时:分()sec:是否显示秒 */
    Language.prototype.formatTime3 = function (seconds, sec) {
        if (sec === void 0) { sec = false; }
        var d = Math.floor(seconds / (3600 * 24));
        seconds = seconds % (3600 * 24);
        var h = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        var m = Math.floor(seconds / 60);
        seconds = seconds % 60;
        var r = "";
        r += d == 0 ? "" : d + "日";
        r += (h > 9 ? h : "0" + h) + ":";
        r += m > 9 ? m : "0" + m;
        if (sec) {
            r += ":" + (seconds > 9 ? seconds : "0" + seconds);
        }
        return r;
    };
    /**倒计时 x天 时:分(字) */
    Language.prototype.formatTime4 = function (seconds) {
        var d = Math.floor(seconds / (3600 * 24));
        seconds = seconds % (3600 * 24);
        var h = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        var m = Math.floor(seconds / 60);
        var r = "";
        if (m == 60) {
            h += 1;
            m = 0;
        }
        r += d + "天";
        r += (h > 9 ? h : "0" + h) + "时";
        r += (m > 9 ? m : "0" + m) + "fen";
        return r;
    };
    Language.prototype.formatDayTime = function (seconds, isSec) {
        if (isSec === void 0) { isSec = true; }
        var d = Math.floor(seconds / 3600 / 24);
        seconds = seconds % (3600 * 24);
        var h = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        var r = "";
        if (d > 0) {
            r += d + "日";
        }
        if (h > 0 || d > 0) {
            r += (h > 9 ? h : "0" + h) + ":";
        }
        r += m > 9 ? m : "0" + m;
        isSec && (r += ":" + (s > 9 ? s : "0" + s));
        return r;
    };
    Language.prototype.formatDate = function (seconds, isSec) {
        if (isSec === void 0) { isSec = true; }
        var date = new Date(seconds * 1000);
        var y = date.getFullYear();
        var mo = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        var s = date.getSeconds();
        if (isSec)
            return (y +
                "/" +
                (mo > 9 ? mo.toString() : "0" + mo) +
                "/" +
                (d > 9 ? d.toString() : "0" + d).toString() +
                (h > 9 ? h.toString() : "0" + h).toString() +
                ":" +
                (mi > 9 ? mi.toString() : "0" + mi).toString() +
                ":" +
                (s > 9 ? s.toString() : "0" + s));
        else {
            return y + "/" + (mo > 9 ? mo.toString() : "0" + mo) + "/" + (d > 9 ? d.toString() : "0" + d) + " " + (h > 9 ? h.toString() : "0" + h) + ":" + (mi > 9 ? mi.toString() : "0" + mi);
        }
    };
    /** [年，月，日，时，分，秒] */
    Language.prototype.formatHours = function (time) {
        var date = new Date(time);
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var r = "";
        r += (h > 9 ? h : "0" + h) + ":";
        r += (m > 9 ? m : "0" + m) + ":";
        r += s > 9 ? s : "0" + s;
        return r;
    };
    Language.prototype.formatDay = function (time) {
        var date = new Date(time);
        var m = date.getMonth();
        var d = date.getDay();
        var r = "";
        r += (m > 9 ? m : "0" + m) + "月";
        r += (d > 9 ? d : "0" + d) + "日";
        return r;
    };
    /**
     * 以最小方式显示时间差单位
     * @param second 时间差,单位秒
     */
    Language.prototype.formatTimeOut = function (second) {
        if (second < 60) {
            return second + "秒" + "前";
        }
        else if (second < 3600) {
            var min = Math.floor(second / 60);
            return min + "分" + "前";
        }
        else if (second < 3600 * 24) {
            var h = Math.floor(second / 3600);
            return h + "时" + "前";
        }
        else {
            var d = Math.floor(second / (3600 * 24));
            return d + "天" + "前";
        }
    };
    /** 计算出虚拟币中文单位 */
    Language.prototype.coinToCN = function (num) {
        num = Math.floor(num);
        if (num < 10000)
            return String(num);
        else if (num < 100000)
            return Math.floor(num / 10) / 1000 + this.getStr(Zh_1.JXLocales.tth);
        else if (num < 1000000)
            return Math.floor(num / 100) / 100 + this.getStr(Zh_1.JXLocales.tth);
        else if (num < 10000000)
            return Math.floor(num / 1000) / 10 + this.getStr(Zh_1.JXLocales.tth);
        else if (num < 100000000)
            return Math.floor(num / 10000) + this.getStr(Zh_1.JXLocales.tth);
        else if (num < 1000000000)
            return Math.floor(num / 100000) / 1000 + this.getStr("亿");
        else if (num < 10000000000)
            return Math.floor(num / 1000000) / 100 + this.getStr("亿");
        else if (num < 100000000000)
            return Math.floor(num / 10000000) / 10 + this.getStr("hmi");
        else if (num < 1000000000000)
            return Math.floor(num / 100000000) + this.getStr("hmi");
        else
            return "9999" + this.getStr("hmi") + "+";
    };
    Language.prototype.formatNumber = function (num, point) {
        if (point === void 0) { point = 2; }
        if (num >= 1000000000) {
            return Math.floor(num / 100000000) + this.getStr("hmi");
        }
        else if (num >= 10000) {
            return (num / 10000).toFixed(point) + this.getStr(Zh_1.JXLocales.tth);
        }
        return num + "";
    };
    Language.prototype.formatNumberInEn = function (num) {
        if (num >= 100000000) {
            return Math.floor(num / 1000000) + "M";
        }
        else if (num >= 10000) {
            return Math.floor(num / 1000) + "K";
        }
        return num + "";
    };
    Language.prototype.toFixed = function (num, fixed) {
        var regexp = /(?:\.0*|(\.\d+?)0+)$/;
        return (num * 100).toFixed(fixed).replace(regexp, "$1");
    };
    Language.prototype.numToCh = function (section) {
        var chnNumChar = [
            "零",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "七",
            "八",
            "九",
        ];
        var chnUnitChar = ["", "十", "百", "千", "万"];
        var strIns = "", chnStr = "";
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }
            else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        if (chnStr[0] == this.getStr("number_1") &&
            chnStr[1] == this.getStr("number_10")) {
            chnStr = chnStr.substr(1);
        }
        return chnStr;
    };
    Language = __decorate([
        ccclass
    ], Language);
    return Language;
}());
var language = new Language();
exports.L = language.getStr.bind(language);
exports.LTimer = language.formatTime.bind(language);
exports.LTimer2 = language.formatTime2.bind(language);
exports.LTimer3 = language.formatTime3.bind(language);
exports.LTimer4 = language.formatTime4.bind(language);
exports.LDayTimer = language.formatDayTime.bind(language);
exports.LDate = language.formatDate.bind(language);
exports.LFormatHours = language.formatHours.bind(language);
exports.LFormatDay = language.formatDay.bind(language);
exports.LFormatTimeOut = language.formatTimeOut.bind(language);
exports.LnumToCh = language.numToCh.bind(language);
exports.LCoin = language.coinToCN.bind(language);
exports.LNumber = language.formatNumber.bind(language);
exports.LNumberInEn = language.formatNumberInEn.bind(language);

cc._RF.pop();