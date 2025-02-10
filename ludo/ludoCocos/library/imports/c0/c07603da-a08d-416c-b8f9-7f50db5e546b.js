"use strict";
cc._RF.push(module, 'c0760PaoI1BbLj5f1DbXlRr', 'JXBattleUtility');
// Script/Game/Views/Fight/JXBattleUtility.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JXRoundTimer = exports.JXBattleMap = exports.JXBattleUtility = exports.JXIdGenerater = void 0;
var JXULDefine_1 = require("./JXULDefine");
var NonUuidMark = ".";
var JXIdGenerater = /** @class */ (function () {
    function JXIdGenerater(category) {
        this._id = 0 | (Math.random() * 998);
        this._prefix = category ? category + NonUuidMark : "";
    }
    JXIdGenerater.prototype.getNewId = function () {
        return this._prefix + ++this._id;
    };
    JXIdGenerater.prototype.getOffsetId = function (offset) {
        return this._prefix + (this._id + offset);
    };
    return JXIdGenerater;
}());
exports.JXIdGenerater = JXIdGenerater;
var JXBattleUtility = /** @class */ (function () {
    function JXBattleUtility() {
    }
    /** 判断是否是数值 */
    JXBattleUtility.isNumber = function (obj) {
        return typeof obj === "number" || obj instanceof Number;
    };
    /** 快速移除数组中的元素，无序的 */
    JXBattleUtility.fastRemove = function (arr, el) {
        var index = arr.indexOf(el);
        if (index == JXULDefine_1.JXBtlPs.Invalid)
            return false;
        if (index >= arr.length) {
            return false;
        }
        else {
            arr[index] = arr[arr.length - 1];
            arr.pop();
        }
        return true;
    };
    JXBattleUtility.fastRemoveAt = function (arr, index) {
        if (index == JXULDefine_1.JXBtlPs.Invalid)
            return false;
        if (index >= arr.length) {
            return false;
        }
        else {
            arr[index] = arr[arr.length - 1];
            arr.pop();
        }
        return true;
    };
    /** 移除数组中的某个元素，有序的 */
    JXBattleUtility.remove = function (arr, el) {
        var index = arr.indexOf(el);
        if (index == JXULDefine_1.JXBtlPs.Invalid)
            return false;
        arr.splice(index, 1);
        return true;
    };
    /** 任意加法数据或者数值 */
    JXBattleUtility.computePropts = function (src, dest) {
        if (typeof src == "number") {
            dest = dest || 0;
            return dest + src;
        }
        else {
            dest = dest || [];
            for (var i = 0; i < src.length; i++) {
                dest[i] = dest[i] || 0;
                dest[i] = dest[i] + src[i];
            }
            return dest;
        }
    };
    /** 数组加法 [a1,b1,c1...] + [a2,b2,c3...] = [a1+b1,....]  */
    JXBattleUtility.addToPropts = function (src, dest) {
        if (!src || !src.length)
            return;
        for (var i = 0; i < src.length; i++) {
            if (!src[i])
                continue;
            dest[i] = dest[i] || 0;
            dest[i] = dest[i] + src[i];
        }
    };
    /** 数组减法，同上 */
    JXBattleUtility.subToPropts = function (src, dest) {
        for (var i = 0; i < src.length; i++) {
            if (!src[i])
                continue;
            if (!dest[i])
                continue;
            dest[i] = dest[i] + src[i];
        }
    };
    /** 深度拷贝一份数组 */
    JXBattleUtility.copyArray = function (arr) {
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            ret[i] = arr[i];
        }
        return ret;
    };
    /** 数值限定 min < value < max */
    JXBattleUtility.clamp = function (value, min_inclusive, max_inclusive) {
        if (min_inclusive > max_inclusive) {
            var temp = min_inclusive;
            min_inclusive = max_inclusive;
            max_inclusive = temp;
        }
        return value < min_inclusive
            ? min_inclusive
            : value < max_inclusive
                ? value
                : max_inclusive;
    };
    /** 不可为负数 */
    JXBattleUtility.minZero = function (value) {
        return Math.max(0, value);
    };
    /** buff uuid */
    JXBattleUtility.BuffIdGtor = new JXIdGenerater("JXBf");
    /** 技能组ID */
    JXBattleUtility.EffectGRoupGtor = new JXIdGenerater("JXEC");
    /** 环境索引ID */
    JXBattleUtility.AmbientGtor = new JXIdGenerater("JXAb");
    return JXBattleUtility;
}());
exports.JXBattleUtility = JXBattleUtility;
var JXBattleMap = /** @class */ (function () {
    function JXBattleMap() {
        this._size = 0;
        // this._array = new Array<{key: K, value: V}>();
        this._objects = Object.create(null);
        this._size = 0;
    }
    Object.defineProperty(JXBattleMap.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    JXBattleMap.prototype.clear = function () {
        this._objects = Object.create(null);
        this._size = 0;
    };
    JXBattleMap.prototype.has = function (key) {
        return key in this._objects;
    };
    JXBattleMap.prototype.set = function (key, value) {
        if (!this.has(key)) {
            this._size++;
        }
        this._objects[key] = value;
    };
    JXBattleMap.prototype.get = function (key) {
        if (!this.has(key))
            return null;
        return this._objects[key];
    };
    JXBattleMap.prototype.delete = function (key) {
        if (this.has(key)) {
            delete this._objects[key];
            this._size--;
        }
    };
    JXBattleMap.prototype.keys = function () {
        var keys = Object.keys(this._objects);
        return keys;
    };
    JXBattleMap.prototype.values = function () {
        var _this = this;
        var keys = this.keys();
        var values = [];
        keys.forEach(function (key) {
            values.push(_this.get(key));
        });
        return values;
    };
    JXBattleMap.prototype.toArray = function () {
        var _this = this;
        var rets = [];
        var keys = this.keys();
        keys.forEach(function (key) {
            rets.push([key, _this.get(key)]);
        });
        return rets;
    };
    JXBattleMap.prototype.forEach = function (callBack) {
        var keys = this.keys();
        for (var i = 0; i < keys.length; i++) {
            var result = callBack(this._objects[keys[i]], keys[i]);
            if (!!result)
                return result;
        }
    };
    JXBattleMap.prototype.rforEach = function (callBack) {
        var keys = this.keys();
        for (var i = keys.length - 1; i >= 0; i--) {
            var result = callBack(this._objects[keys[i]], keys[i]);
            if (!!result)
                return result;
        }
    };
    return JXBattleMap;
}());
exports.JXBattleMap = JXBattleMap;
/** 回合定时器 */
var JXRoundTimer = /** @class */ (function () {
    function JXRoundTimer(nWait, endCb, lifeCb) {
        this._nCur = 0;
        this._nTotal = nWait;
        this._endCb = endCb;
    }
    /** 增加上限 */
    JXRoundTimer.prototype.addTotalTimes = function (nAdd) {
        this._nTotal += nAdd;
    };
    Object.defineProperty(JXRoundTimer.prototype, "nLife", {
        get: function () {
            return this._nCur;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JXRoundTimer.prototype, "nTotal", {
        get: function () {
            return this._nTotal;
        },
        enumerable: false,
        configurable: true
    });
    /** 执行生命周期 */
    JXRoundTimer.prototype.life = function () {
        this._nCur++;
        if (this._nCur >= this._nTotal) {
            this._endCb && this._endCb();
        }
    };
    JXRoundTimer.prototype.destroy = function () {
        this._nCur = null;
        this._nTotal = null;
        this._endCb = null;
    };
    return JXRoundTimer;
}());
exports.JXRoundTimer = JXRoundTimer;

cc._RF.pop();