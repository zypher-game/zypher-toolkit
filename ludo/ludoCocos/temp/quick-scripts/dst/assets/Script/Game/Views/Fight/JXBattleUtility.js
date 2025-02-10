
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/JXBattleUtility.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9KWEJhdHRsZVV0aWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXVDO0FBRXZDLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUV0QjtJQUdFLHVCQUFZLFFBQVE7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbkMsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxNQUFjO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSxzQ0FBYTtBQWlCMUI7SUFBQTtJQThHQSxDQUFDO0lBdEdDLGNBQWM7SUFDQSx3QkFBUSxHQUF0QixVQUF1QixHQUFRO1FBQzdCLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsWUFBWSxNQUFNLENBQUM7SUFDMUQsQ0FBQztJQUVELHFCQUFxQjtJQUNQLDBCQUFVLEdBQXhCLFVBQXlCLEdBQWUsRUFBRSxFQUFPO1FBQy9DLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsSUFBSSxLQUFLLElBQUksb0JBQU8sQ0FBQyxPQUFPO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDM0MsSUFBSSxLQUFL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QUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnQ0FBTTthQUFqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQVFELGFBQWE7SUFDTiwyQkFBSSxHQUFYO1FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRU0sOEJBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDSCxtQkFBQztBQUFELENBekNBLEFBeUNDLElBQUE7QUF6Q1ksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKWEJ0bFBzIH0gZnJvbSBcIi4vSlhVTERlZmluZVwiO1xyXG5cclxudmFyIE5vblV1aWRNYXJrID0gXCIuXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSlhJZEdlbmVyYXRlciB7XHJcbiAgcHJvdGVjdGVkIF9pZDogbnVtYmVyO1xyXG4gIHByb3RlY3RlZCBfcHJlZml4OiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IoY2F0ZWdvcnkpIHtcclxuICAgIHRoaXMuX2lkID0gMCB8IChNYXRoLnJhbmRvbSgpICogOTk4KTtcclxuICAgIHRoaXMuX3ByZWZpeCA9IGNhdGVnb3J5ID8gY2F0ZWdvcnkgKyBOb25VdWlkTWFyayA6IFwiXCI7XHJcbiAgfVxyXG5cclxuICBnZXROZXdJZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcmVmaXggKyArK3RoaXMuX2lkO1xyXG4gIH1cclxuXHJcbiAgZ2V0T2Zmc2V0SWQob2Zmc2V0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcmVmaXggKyAodGhpcy5faWQgKyBvZmZzZXQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpYQmF0dGxlVXRpbGl0eSB7XHJcbiAgLyoqIGJ1ZmYgdXVpZCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgQnVmZklkR3RvciA9IG5ldyBKWElkR2VuZXJhdGVyKFwiSlhCZlwiKTtcclxuICAvKiog5oqA6IO957uESUQgKi9cclxuICBwdWJsaWMgc3RhdGljIEVmZmVjdEdSb3VwR3RvciA9IG5ldyBKWElkR2VuZXJhdGVyKFwiSlhFQ1wiKTtcclxuICAvKiog546v5aKD57Si5byVSUQgKi9cclxuICBwdWJsaWMgc3RhdGljIEFtYmllbnRHdG9yID0gbmV3IEpYSWRHZW5lcmF0ZXIoXCJKWEFiXCIpO1xyXG5cclxuICAvKiog5Yik5pat5piv5ZCm5piv5pWw5YC8ICovXHJcbiAgcHVibGljIHN0YXRpYyBpc051bWJlcihvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCIgfHwgb2JqIGluc3RhbmNlb2YgTnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIOW/q+mAn+enu+mZpOaVsOe7hOS4reeahOWFg+e0oO+8jOaXoOW6j+eahCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZmFzdFJlbW92ZShhcnI6IEFycmF5PGFueT4sIGVsOiBhbnkpOiBib29sZWFuIHtcclxuICAgIGxldCBpbmRleCA9IGFyci5pbmRleE9mKGVsKTtcclxuICAgIGlmIChpbmRleCA9PSBKWEJ0bFBzLkludmFsaWQpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpbmRleCA+PSBhcnIubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFycltpbmRleF0gPSBhcnJbYXJyLmxlbmd0aCAtIDFdO1xyXG4gICAgICBhcnIucG9wKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZmFzdFJlbW92ZUF0KGFycjogQXJyYXk8YW55PiwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGluZGV4ID09IEpYQnRsUHMuSW52YWxpZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGluZGV4ID49IGFyci5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyW2luZGV4XSA9IGFyclthcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgIGFyci5wb3AoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqIOenu+mZpOaVsOe7hOS4reeahOafkOS4quWFg+e0oO+8jOacieW6j+eahCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlKGFycjogQXJyYXk8YW55PiwgZWw6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGluZGV4ID0gYXJyLmluZGV4T2YoZWwpO1xyXG4gICAgaWYgKGluZGV4ID09IEpYQnRsUHMuSW52YWxpZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgYXJyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKiDku7vmhI/liqDms5XmlbDmja7miJbogIXmlbDlgLwgKi9cclxuICBwdWJsaWMgc3RhdGljIGNvbXB1dGVQcm9wdHMoc3JjLCBkZXN0KSB7XHJcbiAgICBpZiAodHlwZW9mIHNyYyA9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgIGRlc3QgPSBkZXN0IHx8IDA7XHJcbiAgICAgIHJldHVybiBkZXN0ICsgc3JjO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGVzdCA9IGRlc3QgfHwgW107XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGVzdFtpXSA9IGRlc3RbaV0gfHwgMDtcclxuICAgICAgICBkZXN0W2ldID0gZGVzdFtpXSArIHNyY1tpXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZGVzdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDmlbDnu4TliqDms5UgW2ExLGIxLGMxLi4uXSArIFthMixiMixjMy4uLl0gPSBbYTErYjEsLi4uLl0gICovXHJcbiAgcHVibGljIHN0YXRpYyBhZGRUb1Byb3B0cyhzcmM6IG51bWJlcltdLCBkZXN0OiBudW1iZXJbXSkge1xyXG4gICAgaWYgKCFzcmMgfHwgIXNyYy5sZW5ndGgpIHJldHVybjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICghc3JjW2ldKSBjb250aW51ZTtcclxuICAgICAgZGVzdFtpXSA9IGRlc3RbaV0gfHwgMDtcclxuICAgICAgZGVzdFtpXSA9IGRlc3RbaV0gKyBzcmNbaV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiog5pWw57uE5YeP5rOV77yM5ZCM5LiKICovXHJcbiAgcHVibGljIHN0YXRpYyBzdWJUb1Byb3B0cyhzcmM6IG51bWJlcltdLCBkZXN0OiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICghc3JjW2ldKSBjb250aW51ZTtcclxuICAgICAgaWYgKCFkZXN0W2ldKSBjb250aW51ZTtcclxuICAgICAgZGVzdFtpXSA9IGRlc3RbaV0gKyBzcmNbaV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiog5rex5bqm5ou36LSd5LiA5Lu95pWw57uEICovXHJcbiAgcHVibGljIHN0YXRpYyBjb3B5QXJyYXkoYXJyOiBBcnJheTxudW1iZXI+KTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICBsZXQgcmV0ID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICByZXRbaV0gPSBhcnJbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxuXHJcbiAgLyoqIOaVsOWAvOmZkOWumiBtaW4gPCB2YWx1ZSA8IG1heCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgY2xhbXAoXHJcbiAgICB2YWx1ZTogbnVtYmVyLFxyXG4gICAgbWluX2luY2x1c2l2ZTogbnVtYmVyLFxyXG4gICAgbWF4X2luY2x1c2l2ZTogbnVtYmVyXHJcbiAgKTogbnVtYmVyIHtcclxuICAgIGlmIChtaW5faW5jbHVzaXZlID4gbWF4X2luY2x1c2l2ZSkge1xyXG4gICAgICB2YXIgdGVtcCA9IG1pbl9pbmNsdXNpdmU7XHJcbiAgICAgIG1pbl9pbmNsdXNpdmUgPSBtYXhfaW5jbHVzaXZlO1xyXG4gICAgICBtYXhfaW5jbHVzaXZlID0gdGVtcDtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZSA8IG1pbl9pbmNsdXNpdmVcclxuICAgICAgPyBtaW5faW5jbHVzaXZlXHJcbiAgICAgIDogdmFsdWUgPCBtYXhfaW5jbHVzaXZlXHJcbiAgICAgID8gdmFsdWVcclxuICAgICAgOiBtYXhfaW5jbHVzaXZlO1xyXG4gIH1cclxuXHJcbiAgLyoqIOS4jeWPr+S4uui0n+aVsCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgbWluWmVybyh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLm1heCgwLCB2YWx1ZSk7XHJcbiAgfVxyXG59XHJcblxyXG5kZWNsYXJlIHR5cGUgU3RyaW5nT3JOdW1iZXIgPSBzdHJpbmcgfCBudW1iZXI7XHJcbmV4cG9ydCBjbGFzcyBKWEJhdHRsZU1hcDxLIGV4dGVuZHMgU3RyaW5nT3JOdW1iZXIsIFY+IHtcclxuICAvLyBwcm90ZWN0ZWQgX2FycmF5OiBBcnJheTx7a2V5OiBLLCB2YWx1ZTogVn0+O1xyXG4gIHByb3RlY3RlZCBfb2JqZWN0cztcclxuICBwcm90ZWN0ZWQgX3NpemUgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIHRoaXMuX2FycmF5ID0gbmV3IEFycmF5PHtrZXk6IEssIHZhbHVlOiBWfT4oKTtcclxuICAgIHRoaXMuX29iamVjdHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgdGhpcy5fc2l6ZSA9IDA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNpemUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fb2JqZWN0cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICB0aGlzLl9zaXplID0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXMoa2V5OiBLKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKGtleSBhcyBhbnkpIGluIHRoaXMuX29iamVjdHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0KGtleTogSywgdmFsdWU6IFYpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xyXG4gICAgICB0aGlzLl9zaXplKys7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9vYmplY3RzW2tleV0gPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQoa2V5OiBLKTogViB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHRoaXMuX29iamVjdHNba2V5XTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWxldGUoa2V5OiBLKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5oYXMoa2V5KSkge1xyXG4gICAgICBkZWxldGUgdGhpcy5fb2JqZWN0c1trZXldO1xyXG4gICAgICB0aGlzLl9zaXplLS07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMga2V5cygpOiBLW10ge1xyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9vYmplY3RzKTtcclxuICAgIHJldHVybiBrZXlzIGFzIGFueTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWx1ZXMoKTogVltdIHtcclxuICAgIGxldCBrZXlzID0gdGhpcy5rZXlzKCk7XHJcbiAgICBsZXQgdmFsdWVzID0gW107XHJcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICB2YWx1ZXMucHVzaCh0aGlzLmdldChrZXkpKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b0FycmF5KCk6IEFycmF5PFtLLCBWXT4ge1xyXG4gICAgbGV0IHJldHMgPSBbXTtcclxuICAgIGxldCBrZXlzID0gdGhpcy5rZXlzKCk7XHJcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICByZXRzLnB1c2goW2tleSwgdGhpcy5nZXQoa2V5KV0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmV0cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmb3JFYWNoPFQ+KGNhbGxCYWNrOiB7ICh2YWx1ZTogViwga2V5OiBLKTogVCB9KTogVCB7XHJcbiAgICBsZXQga2V5cyA9IHRoaXMua2V5cygpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBjYWxsQmFjayh0aGlzLl9vYmplY3RzW2tleXNbaV1dLCBrZXlzW2ldKTtcclxuICAgICAgaWYgKCEhcmVzdWx0KSByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJmb3JFYWNoPFQ+KGNhbGxCYWNrOiB7ICh2YWx1ZTogViwga2V5OiBLKTogVCB9KTogVCB7XHJcbiAgICBsZXQga2V5cyA9IHRoaXMua2V5cygpO1xyXG4gICAgZm9yIChsZXQgaSA9IGtleXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgbGV0IHJlc3VsdCA9IGNhbGxCYWNrKHRoaXMuX29iamVjdHNba2V5c1tpXV0sIGtleXNbaV0pO1xyXG4gICAgICBpZiAoISFyZXN1bHQpIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiog5Zue5ZCI5a6a5pe25ZmoICovXHJcbmV4cG9ydCBjbGFzcyBKWFJvdW5kVGltZXIge1xyXG4gIC8qKiDlvZPliY3orqHmlbAgKi9cclxuICBwcm90ZWN0ZWQgX25DdXI6IG51bWJlcjtcclxuICAvKiog6ZyA5rGC6K6h5pWwICovXHJcbiAgcHJvdGVjdGVkIF9uVG90YWw6IG51bWJlcjtcclxuICAvKiog57uT5p2f5Zue6LCDICovXHJcbiAgcHJvdGVjdGVkIF9lbmRDYjogYW55O1xyXG4gIHByb3RlY3RlZCBfbGlmZUNiOiBhbnk7XHJcblxyXG4gIC8qKiDlop7liqDkuIrpmZAgKi9cclxuICBwdWJsaWMgYWRkVG90YWxUaW1lcyhuQWRkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX25Ub3RhbCArPSBuQWRkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBuTGlmZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX25DdXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5Ub3RhbCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX25Ub3RhbDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5XYWl0OiBudW1iZXIsIGVuZENiPzogYW55LCBsaWZlQ2I/OiBhbnkpIHtcclxuICAgIHRoaXMuX25DdXIgPSAwO1xyXG4gICAgdGhpcy5fblRvdGFsID0gbldhaXQ7XHJcbiAgICB0aGlzLl9lbmRDYiA9IGVuZENiO1xyXG4gIH1cclxuXHJcbiAgLyoqIOaJp+ihjOeUn+WRveWRqOacnyAqL1xyXG4gIHB1YmxpYyBsaWZlKCkge1xyXG4gICAgdGhpcy5fbkN1cisrO1xyXG4gICAgaWYgKHRoaXMuX25DdXIgPj0gdGhpcy5fblRvdGFsKSB7XHJcbiAgICAgIHRoaXMuX2VuZENiICYmIHRoaXMuX2VuZENiKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuX25DdXIgPSBudWxsO1xyXG4gICAgdGhpcy5fblRvdGFsID0gbnVsbDtcclxuICAgIHRoaXMuX2VuZENiID0gbnVsbDtcclxuICB9XHJcbn1cclxuIl19