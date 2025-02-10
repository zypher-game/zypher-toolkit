"use strict";
cc._RF.push(module, '8462atFlBhN5oYIA71GrWQs', 'MaskUtil');
// Script/Core/Manager/MaskUtil.ts

/*
 * Copyright 2017 www.windwide.cn
 * Created by donhwa at 2017.12.22
 * Name: 用二进制表达二值状态码
 * Desc:
 */
var MaskUtil = /** @class */ (function () {
    function MaskUtil() {
    }
    MaskUtil.setOn = function (mask, id) {
        if (id < 0) {
            throw new Error("id(" + id + ")< 0");
        }
        var maskIdx = Math.floor(id / 32);
        if (mask[maskIdx] === undefined) {
            // 补全中间有断档的
            for (var mi = 0; mi <= maskIdx; mi++) {
                mask[mi] = mask[mi] || 0;
            }
        }
        var powPos = id % 32;
        var blen = 32;
        //转成2进制
        var str = mask[maskIdx].toString(2);
        /**substr() 从第几个字符开始截取 固定长度 */
        str = MaskUtil._zeroMask.substr(0, blen - str.length) + str;
        // while (str.length < blen) { str = "0" + str; }
        var bidx = blen - powPos - 1;
        str = str.substr(0, bidx) + "1" + str.substr(bidx + 1, blen);
        // tslint:disable-next-line:no-bitwise
        mask[maskIdx] = parseInt(str, 2);
        return mask[maskIdx];
    };
    MaskUtil.setOff = function (mask, id) {
        if (id < 0) {
            throw new Error("id(" + id + ")< 0");
        }
        var maskIdx = Math.floor(id / 32);
        if (mask[maskIdx] === undefined) {
            // 补全中间有断档的
            for (var mi = 0; mi <= maskIdx; mi++) {
                mask[mi] = mask[mi] || 0;
            }
        }
        var powPos = id % 32;
        var blen = 32;
        var str = mask[maskIdx].toString(2);
        str = MaskUtil._zeroMask.substr(0, blen - str.length) + str;
        // while (str.length < blen) { str = "0" + str; }
        var bidx = blen - powPos - 1;
        str = str.substr(0, bidx) + "0" + str.substr(bidx + 1, blen);
        // tslint:disable-next-line:no-bitwise
        mask[maskIdx] = parseInt(str, 2);
        return mask[maskIdx];
    };
    MaskUtil.isOn = function (mask, id) {
        if (id < 0) {
            throw new Error("id(" + id + ")< 0");
        }
        var maskIdx = Math.floor(id / 32);
        var powPos = id % 32;
        // tslint:disable-next-line:no-bitwise          Math.pow(2, powPos)=> 2的n次幂 
        if (mask[maskIdx] && (mask[maskIdx] & Math.pow(2, powPos)) !== 0) { //Math.pow(2, powPos)
            return true;
        }
        return false;
    };
    /**
     * 将01数组（模拟二进制）转为10进制 （数组会被分成第{len}长度为一段）
     * 如：
     * [1, 0, 0, 0] => 1
     * [1, 0, 1, 0] => 5
     */
    MaskUtil.encodeVals = function (arr, len) {
        if (len === void 0) { len = 32; }
        var result = [];
        var step = len;
        for (var idx = 0; idx < arr.length; idx += step) {
            result.push(MaskUtil.encodeVal(arr.slice(idx, idx + step)));
        }
        return result;
    };
    /**
     * 将01数组（模拟二进制）转为10进制
     * 如：
     * [1, 0, 0, 0] => [1]
     * [1, 0, 1, 0] => [5]
     */
    MaskUtil.encodeVal = function (arr) {
        arr = arr.reverse();
        var str = arr.join("");
        var value = parseInt(str, 2);
        return value;
    };
    MaskUtil.decodeVals = function (vals, len) {
        if (len === void 0) { len = 32; }
        vals = vals;
        var result = [];
        for (var idx = 0; idx < vals.length; idx += 1) {
            var arr = MaskUtil.decodeVal(vals[idx], len);
            result = result.concat(arr);
        }
        return result;
    };
    MaskUtil.decodeVal = function (value, len) {
        if (len === void 0) { len = 32; }
        var result = value.toString(2);
        while (result.length < len) {
            result = "0" + result;
        }
        var arr = result.split("");
        arr.reverse();
        for (var idx = arr.length - 1; idx >= 0; idx -= 1) {
            arr[idx] = Number(arr[idx]);
        }
        return arr;
    };
    MaskUtil.checkAndSetOn = function (values, conditions, fnGetIdx, fnSetItemOn) {
        var checkedIdxes = [];
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            // cc.log("v:" + v);
            var _a = fnGetIdx(conditions, v), idx = _a[0], nextMatch = _a[1];
            // cc.log("idx:" + idx);
            if (idx < 0) {
                continue;
            }
            if (checkedIdxes.indexOf(idx) >= 0) {
                // 提前跳过
                continue;
            }
            checkedIdxes.push(idx);
            fnSetItemOn(idx);
            if (nextMatch === null || values[values.length - 1] < nextMatch) {
                // cc.log(`提前结束, lastValue= ${values[values.length - 1]}, nextMatch: ${nextMatch}`);
                break;
            }
        }
    };
    /** 最高位1左边的非1全部修复为1 */
    MaskUtil.fixPreMask = function (mask) {
        // console.dir(`parseMask ${mask} : ${MaskUtil.decodeVals(mask)}`);
        var lastMaskIdx = -1;
        for (var i = mask.length - 1; i >= 0; i--) {
            if (!mask[i] && lastMaskIdx === -1) {
                continue;
            }
            if (lastMaskIdx === -1) {
                lastMaskIdx = i;
                // 本部分，将最高位1左边的全置为1
                var oneZeroArray = MaskUtil.decodeVal(mask[i]);
                var matchedOne = false;
                for (var j = oneZeroArray.length - 1; j >= 0; j--) {
                    if (!matchedOne && oneZeroArray[j] === 1) {
                        matchedOne = true;
                    }
                    if (matchedOne) {
                        oneZeroArray[j] = 1;
                    }
                }
                mask[i] = MaskUtil.encodeVal(oneZeroArray);
            }
            else {
                // 最高位前的，全置为1
                mask[i] = parseInt(MaskUtil._oneMask, 2);
            }
        }
        // console.dir(`toMask ${mask} : ${MaskUtil.decodeVals(mask)}`);
    };
    MaskUtil.zip = function (mask) {
        console.dir(mask);
        for (var i = 0; i < mask.length; i++) {
            if (mask[i] != 0) {
                continue;
            }
            if (mask[i - 1] < 0) {
                mask[i - 1] -= 1;
                mask.splice(i, 1);
                i--;
            }
            else {
                mask[i] = -1;
            }
        }
        console.dir(mask);
    };
    MaskUtil.unzip = function (mask) {
        var result = [];
        result.push.apply(result, mask);
        var pool = mask.concat();
        var offset = 0;
        for (var i = 0; i < pool.length; i++) {
            if (pool[i] < 0) {
                var len = 0 - pool[i];
                for (var j = 0; j < len; j++) {
                    result[offset + i + j] = 0;
                }
                offset += len - 1;
            }
            else {
                result[offset + i] = pool[i];
            }
        }
        return result;
    };
    MaskUtil._oneMask = "1111" + "1111" + "1111" + "1111" + "1111" + "1111" + "1111" + "1111";
    MaskUtil._zeroMask = "0000" + "0000" + "0000" + "0000" + "0000" + "0000" + "0000" + "0000";
    return MaskUtil;
}());
module.exports = MaskUtil;

cc._RF.pop();