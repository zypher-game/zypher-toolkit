/**
 * copyright (c) windwide.cn
 * author: donhwa
 * desc: enum util
 * date: 2020-11-19
 */

export class EnumUtil {
    /** 取枚举长度 */
    static size(e: Object) {
        return Object.keys(e).length / 2;
    }


    /** 返回根据枚举长度填满初始值的数组 */
    static newArray<T>(e: Object, initItem: T) {
        let arr: T[] = [];
        for (let i = 0, size = EnumUtil.size(e); i < size; i++) {
            arr.push(initItem);
        }
        return arr;
    }
}