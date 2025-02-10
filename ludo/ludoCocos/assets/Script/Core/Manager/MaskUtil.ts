/*
 * Copyright 2017 www.windwide.cn
 * Created by donhwa at 2017.12.22
 * Name: 用二进制表达二值状态码
 * Desc:
 */

class MaskUtil {

    private static _oneMask = "1111" + "1111" + "1111" + "1111" + "1111" + "1111" + "1111" + "1111";
    private static _zeroMask = "0000" + "0000" + "0000" + "0000" + "0000" + "0000" + "0000" + "0000";

    public static setOn(mask: number[], id: number): number {
        if (id < 0) {
            throw new Error(`id(${id})< 0`);
        }

        let maskIdx: number = Math.floor(id / 32);
        if (mask[maskIdx] === undefined) {
            // 补全中间有断档的
            for (let mi: number = 0; mi <= maskIdx; mi++) {
                mask[mi] = mask[mi] || 0;
            }
        }
        let powPos: number = id % 32;
        let blen: number = 32;
        //转成2进制
        let str: string = mask[maskIdx].toString(2);
        /**substr() 从第几个字符开始截取 固定长度 */
        str = MaskUtil._zeroMask.substr(0, blen - str.length) + str;
        // while (str.length < blen) { str = "0" + str; }
        let bidx: number = blen - powPos - 1;
        str = str.substr(0, bidx) + "1" + str.substr(bidx + 1, blen);
        // tslint:disable-next-line:no-bitwise
        mask[maskIdx] = parseInt(str, 2);
        return mask[maskIdx];
    }

    public static setOff(mask: number[], id: number): number {
        if (id < 0) {
            throw new Error(`id(${id})< 0`);
        }

        let maskIdx: number = Math.floor(id / 32);
        if (mask[maskIdx] === undefined) {
            // 补全中间有断档的
            for (let mi: number = 0; mi <= maskIdx; mi++) {
                mask[mi] = mask[mi] || 0;
            }
        }
        let powPos: number = id % 32;
        let blen: number = 32;
        let str: string = mask[maskIdx].toString(2);
        str = MaskUtil._zeroMask.substr(0, blen - str.length) + str;
        // while (str.length < blen) { str = "0" + str; }
        let bidx: number = blen - powPos - 1;
        str = str.substr(0, bidx) + "0" + str.substr(bidx + 1, blen);
        // tslint:disable-next-line:no-bitwise
        mask[maskIdx] = parseInt(str, 2);
        return mask[maskIdx];
    }

    public static isOn(mask: number[], id: number): boolean {
        if (id < 0) {
            throw new Error(`id(${id})< 0`);
        }
        let maskIdx: number = Math.floor(id / 32);
        let powPos: number = id % 32;
        // tslint:disable-next-line:no-bitwise          Math.pow(2, powPos)=> 2的n次幂 
        if (mask[maskIdx] && (mask[maskIdx] & Math.pow(2, powPos)) !== 0) {//Math.pow(2, powPos)
            return true;
        }
        return false;
    }

    /**
     * 将01数组（模拟二进制）转为10进制 （数组会被分成第{len}长度为一段）
     * 如：
     * [1, 0, 0, 0] => 1
     * [1, 0, 1, 0] => 5
     */
    public static encodeVals(arr: number[], len: number = 32): number[] {
        var result: number[] = [];
        var step: number = len;
        for (var idx: number = 0; idx < arr.length; idx += step) {
            result.push(MaskUtil.encodeVal(arr.slice(idx, idx + step)));
        }
        return result;
    }

    /**
     * 将01数组（模拟二进制）转为10进制
     * 如：
     * [1, 0, 0, 0] => [1]
     * [1, 0, 1, 0] => [5]
     */
    public static encodeVal(arr: number[]): number {
        arr = arr.reverse();
        var str: string = arr.join("");
        var value: number = parseInt(str, 2);
        return value;
    }


    public static decodeVals(vals: number[], len: number = 32): number[] {
        vals = vals;
        var result: number[] = [];
        for (var idx: number = 0; idx < vals.length; idx += 1) {
            var arr: number[] = MaskUtil.decodeVal(vals[idx], len);
            result = result.concat(arr);
        }
        return result;
    }

    public static decodeVal(value: number, len: number = 32): number[] {
        var result: string = value.toString(2);
        while (result.length < len) { result = "0" + result; }
        var arr: any[] = result.split("");
        arr.reverse();
        for (var idx: number = arr.length - 1; idx >= 0; idx -= 1) { arr[idx] = Number(arr[idx]); }
        return arr;
    }

    public static checkAndSetOn(values: number[], conditions: number[],
        fnGetIdx: (cons: number[], val: number) => [number, number],

        fnSetItemOn: (idx: number) => void): void {

        let checkedIdxes: number[] = [];
        for (let i: number = 0; i < values.length; i++) {

            let v: number = values[i];
            // cc.log("v:" + v);
            let [idx, nextMatch]: [number, number] = fnGetIdx(conditions, v);
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
    }

    /** 最高位1左边的非1全部修复为1 */
    public static fixPreMask(mask: number[]): void {
        // console.dir(`parseMask ${mask} : ${MaskUtil.decodeVals(mask)}`);

        let lastMaskIdx: number = -1;
        for (let i: number = mask.length - 1; i >= 0; i--) {
            if (!mask[i] && lastMaskIdx === -1) {
                continue;
            }

            if (lastMaskIdx === -1) {
                lastMaskIdx = i;
                // 本部分，将最高位1左边的全置为1
                var oneZeroArray: number[] = MaskUtil.decodeVal(mask[i]);
                var matchedOne: boolean = false;
                for (let j: number = oneZeroArray.length - 1; j >= 0; j--) {
                    if (!matchedOne && oneZeroArray[j] === 1) {
                        matchedOne = true;
                    }

                    if (matchedOne) {
                        oneZeroArray[j] = 1;
                    }
                }

                mask[i] = MaskUtil.encodeVal(oneZeroArray);
            } else {
                // 最高位前的，全置为1
                mask[i] = parseInt(MaskUtil._oneMask, 2);
            }
        }

        // console.dir(`toMask ${mask} : ${MaskUtil.decodeVals(mask)}`);
    }


    public static zip(mask) {
        console.dir(mask);
        for (let i = 0; i < mask.length; i++) {
            if (mask[i] != 0) { continue; }

            if (mask[i - 1] < 0) {
                mask[i - 1] -= 1;
                mask.splice(i, 1);
                i--;
            } else {
                mask[i] = -1;
            }
        }
        console.dir(mask);
    }

    public static unzip(mask: number[]) {
        let result = [];
        result.push(...mask);
        let pool = mask.concat();
        let offset = 0;
        for (let i = 0; i < pool.length; i++) {
            if (pool[i] < 0) {
                let len = 0 - pool[i];
                for (let j = 0; j < len; j++) {
                    result[offset + i + j] = 0;
                }
                offset += len - 1;
            } else {
                result[offset + i] = pool[i];
            }
        }
        return result
    }
}

export = MaskUtil;