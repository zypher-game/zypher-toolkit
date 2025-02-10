
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/conventions/JXCommon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1a34sklRtCbLyJYlmx96b0', 'JXCommon');
// Script/conventions/JXCommon.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUid = exports.JXRandom = exports.JXMath = exports.JXVec2 = exports.JXDef = void 0;
exports.JXDef = {
    Time: {
        MS: 1,
        SECOND: 1000,
        MINUTE: 60 * 1000,
        HOUR: 60 * 60 * 1000,
        /**正式版 游戏中1年的原始时间 */
        GAMEYEAR: 15 * 60 * 1000,
    },
    firstBundle: {
        common: "common",
        data: "data",
        homeCtrl: "homeCtrl",
    },
    bundle: {
        /**公共资源 */
        common: "common",
        /**数据资源 */
        data: "data",
        map: "map",
        /**战斗资源 */
        fight: "fight",
        /**结算资源 */
        gameOverCtrl: "gameOverCtrl",
        /**主界面资源 */
        homeCtrl: "homeCtrl",
        loadCtrl: "loadCtrl",
        /**匹配界面资源 */
        MatchCtrl: "MatchCtrl",
        /**公共大型资源 */
        commonPrefab: "commonPrefab",
    },
    Player: {},
    SYS_CONFIG_KEY: {
        roundTime: "roundTime",
        robotDiceTime: "robotDiceTime",
        moveCountDown: "moveCountDown",
        InitCoin: "InitCoin",
        videoCoin: "videoCoin",
        videoPhysical: "videoPhysical",
    },
    LOCAL_KEY: {},
    SYS_IDENTITY_ID: {
        /**
         * 窗口ID规则： 一级窗口 ： A, 二级窗口B,或者一级切页，三级窗口C, 或者二级切页。
         * 1. 存在明显从属关系： AABBCC
         * 2. 通用窗口，没有明显上下级关系，不计算缺失的层级
         * 3. 窗口ID的层级只能说是尽量划分，实际游戏种的UI可能会出现越层现象，比如说抽卡上面可能有仙灵详情和技能UI。
         */
        mapCtrl: 200002,
        /**加载页 */
        load: 100001,
        /**主页 */
        home: 100000,
        /**战斗页 */
        fight: 600101,
        /**大招宝库 */
        bigMove: 100002,
        /**商店 */
        store: 100003,
        /**签到 */
        sign: 100004,
        /**通用框 */
        frameItem: 100006,
        /**排位奖励 */
        levelRewardCtrl: 100008,
        /**奖励弹框 */
        rewardCtrl: 100009,
        /**匹配界面 */
        matchCtrl: 100010,
        /**设置弹框*/
        setting: 100011,
        /**结算界面 */
        battleResultCtrl: 100012,
    },
};
var JXVec2 = /** @class */ (function () {
    function JXVec2(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    return JXVec2;
}());
exports.JXVec2 = JXVec2;
var JXMath = /** @class */ (function () {
    function JXMath() {
    }
    /**
     * 根据当前坐标到目标目标计算先x后y的路线
     * @param air 目标坐标
     * @param cur 当前坐标
     * @param type 数值类型
     */
    JXMath.getRightAngleRoute = function (air, cur, type) {
        var ret = [];
        if (air.x != cur.x) {
            var step = (air.x - cur.x) / Math.abs(air.x - cur.x);
            for (var x = cur.x; x != air.x; x += step) {
                ret.push(new type(x + step, cur.y));
            }
        }
        if (air.y != cur.y) {
            var step = (air.y - cur.y) / Math.abs(air.y - cur.y);
            for (var y = cur.y; y != air.y; y += step) {
                ret.push(new type(air.x, y + step));
            }
        }
        return ret;
    };
    /**
     * 二维转一维索引
     * @param x x坐标，起始为0
     * @param y y坐标，起始为0
     * @param width 长度
     */
    JXMath.encodeV2xxyy = function (x, y, width) {
        return y * width + x;
    };
    /**
     * 一维索引转为二维坐标
     * @param idx 地图索引
     */
    JXMath.decodeV2xxyy = function (idx, width) {
        var x = idx % width;
        var y = Math.floor(idx / width);
        return [x, y];
    };
    /**
     * 获取二维直角坐标系下相邻整数坐标对应索引
     * @param idx 索引格子
     * @param width 网格宽度
     * @param height 网格高度
     */
    JXMath.getV2NeighborIds = function (idx, width, height) {
        var result = [];
        var _a = this.decodeV2xxyy(idx, width), x = _a[0], y = _a[1];
        for (var x1 = x - 1; x1 <= x + 1; x1++) {
            for (var y1 = y - 1; y1 <= y + 1; y1++) {
                if (x1 < 0 || x1 >= width)
                    continue;
                if (y1 < 0 || y1 >= height)
                    continue;
                if (x1 == x && y1 == y)
                    continue;
                result.push(this.encodeV2xxyy(x1, y1, width));
            }
        }
        return result;
    };
    /**
     * 副本地图计算上一次步长的位置
     * @param last 上一次的当前位置
     * @param cur 这一次的当前位置
     * @param type 构造
     */
    JXMath.getLastStepPos = function (last, cur, type) {
        if (cur.y - last.y >= 1) {
            var step = (cur.y - last.y) / Math.abs(cur.y - last.y);
            return new type(cur.x, cur.y - step);
        }
        else {
            var step = (cur.x - last.x) / Math.abs(cur.x - last.x);
            return new type(cur.x - step, cur.y);
        }
    };
    JXMath.newArray = function (len, fill) {
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(fill || 0);
        }
        return arr;
    };
    /**
     * 数组乱序
     * @param array 需要乱序的数组
     * @param random 随机函数
     * @param isSelf 是否打乱自身，默认打乱自身
     */
    JXMath.shuffle = function (array, random, isSelf) {
        if (isSelf === void 0) { isSelf = true; }
        var result;
        if (!isSelf) {
            result = [];
            for (var i = 0; i < array.length; i++) {
                result.push(array[i]);
            }
        }
        else {
            result = array;
        }
        var m = result.length;
        var t, j;
        while (m) {
            j = Math.floor(random() * m--);
            t = result[m];
            result[m] = result[j];
            result[j] = t;
        }
        return result;
    };
    return JXMath;
}());
exports.JXMath = JXMath;
/** 通用随机类 */
var JXRandom = /** @class */ (function () {
    /**
     * 随机构造类
     * @param getPrng 随机种子获取函数
     * @param seed 可选，随机种子
     */
    function JXRandom(getPrng, seed) {
        /** 随机次数 */
        this._nRandomTimes = 0;
        if (!getPrng) {
            throw new Error("the genPrng call back is not ready!");
        }
        this._getPrng = getPrng;
        this._seed = seed || Date.now().toString();
    }
    Object.defineProperty(JXRandom.prototype, "prng", {
        get: function () {
            if (!this._prng) {
                this._prng = this._getPrng(this._seed);
            }
            return this._prng;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JXRandom.prototype, "seed", {
        /** 获取随机种子 */
        get: function () {
            return this._seed;
        },
        enumerable: false,
        configurable: true
    });
    /** 获取一个随机数 */
    JXRandom.prototype.getRandom = function () {
        this._nRandomTimes++;
        return this.prng();
    };
    /**
     * 根据随机区间，获取随机整数
     * @param min 最小值
     * @param max 最大值
     */
    JXRandom.prototype.randomFloor = function (min, max) {
        min = min || 0;
        max = max || 100;
        var res = Math.floor(min + this.getRandom() * (max - min));
        return res;
    };
    /**
     * 根据随机区间，获取不重复的随机整数组
     * @param len 获取长度
     * @param min 最小值
     * @param max 最大值
     */
    JXRandom.prototype.randoms = function (len, min, max) {
        // if (len >= (max - min)) return JXMath.newArray(max - min).map((v, i) => i + min);
        var arr = JXMath.newArray(max - min).map(function (v, i) { return i + min; });
        var rds = new Array();
        for (var i = 0; i < len; i++) {
            if (arr.length <= 0)
                break;
            var arrIndex = Math.floor(this.randomFloor(0, arr.length));
            rds[i] = arr[arrIndex];
            arr.splice(arrIndex, 1);
        }
        return rds;
    };
    return JXRandom;
}());
exports.JXRandom = JXRandom;
// 指定长度和基数生成uuid
function generateUid(len, radix) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        // Compact form
        for (i = 0; i < len; i++)
            uuid[i] = chars[0 | (Math.random() * radix)];
    }
    else {
        // rfc4122, version 4 form
        var r = void 0;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16);
                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join("");
}
exports.generateUid = generateUid;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvY29udmVudGlvbnMvSlhDb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWEsUUFBQSxLQUFLLEdBQUc7SUFDbkIsSUFBSSxFQUFFO1FBQ0osRUFBRSxFQUFFLENBQUM7UUFDTCxNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxFQUFFLEdBQUcsSUFBSTtRQUNqQixJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJO1FBQ3BCLG9CQUFvQjtRQUNwQixRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJO0tBRXpCO0lBRUQsV0FBVyxFQUFFO1FBQ1gsTUFBTSxFQUFFLFFBQVE7UUFDaEIsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsVUFBVTtLQUNyQjtJQUVELE1BQU0sRUFBRTtRQUNOLFVBQVU7UUFDVixNQUFNLEVBQUUsUUFBUTtRQUNoQixVQUFVO1FBQ1YsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsS0FBSztRQUNWLFVBQVU7UUFDVixLQUFLLEVBQUUsT0FBTztRQUNkLFVBQVU7UUFDVixZQUFZLEVBQUUsY0FBYztRQUM1QixXQUFXO1FBQ1gsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsWUFBWTtRQUNaLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFlBQVk7UUFDWixZQUFZLEVBQUUsY0FBYztLQUM3QjtJQUNELE1BQU0sRUFBRSxFQUFFO0lBQ1YsY0FBYyxFQUFFO1FBQ2QsU0FBUyxFQUFFLFdBQVc7UUFDdEIsYUFBYSxFQUFFLGVBQWU7UUFDOUIsYUFBYSxFQUFFLGVBQWU7UUFDOUIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsYUFBYSxFQUFFLGVBQWU7S0FDL0I7SUFDRCxTQUFTLEVBQUUsRUFBRTtJQUNiLGVBQWUsRUFBRTtRQUNmOzs7OztXQUtHO1FBQ0gsT0FBTyxFQUFF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QyxDQUFDLENBQUMsRUFBRTtnQkFDWixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7U0FDRjtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUE3QkQsa0NBNkJDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEpYRGVmID0ge1xyXG4gIFRpbWU6IHtcclxuICAgIE1TOiAxLFxyXG4gICAgU0VDT05EOiAxMDAwLFxyXG4gICAgTUlOVVRFOiA2MCAqIDEwMDAsXHJcbiAgICBIT1VSOiA2MCAqIDYwICogMTAwMCxcclxuICAgIC8qKuato+W8j+eJiCDmuLjmiI/kuK0x5bm055qE5Y6f5aeL5pe26Ze0ICovXHJcbiAgICBHQU1FWUVBUjogMTUgKiA2MCAqIDEwMDAsXHJcbiAgICAvLyBHQU1FWUVBUjogMTAgKiAxMDAwXHJcbiAgfSxcclxuXHJcbiAgZmlyc3RCdW5kbGU6IHtcclxuICAgIGNvbW1vbjogXCJjb21tb25cIixcclxuICAgIGRhdGE6IFwiZGF0YVwiLFxyXG4gICAgaG9tZUN0cmw6IFwiaG9tZUN0cmxcIixcclxuICB9LFxyXG5cclxuICBidW5kbGU6IHtcclxuICAgIC8qKuWFrOWFsei1hOa6kCAqL1xyXG4gICAgY29tbW9uOiBcImNvbW1vblwiLFxyXG4gICAgLyoq5pWw5o2u6LWE5rqQICovXHJcbiAgICBkYXRhOiBcImRhdGFcIixcclxuICAgIG1hcDogXCJtYXBcIixcclxuICAgIC8qKuaImOaWl+i1hOa6kCAqL1xyXG4gICAgZmlnaHQ6IFwiZmlnaHRcIixcclxuICAgIC8qKue7k+eul+i1hOa6kCAqL1xyXG4gICAgZ2FtZU92ZXJDdHJsOiBcImdhbWVPdmVyQ3RybFwiLFxyXG4gICAgLyoq5Li755WM6Z2i6LWE5rqQICovXHJcbiAgICBob21lQ3RybDogXCJob21lQ3RybFwiLFxyXG4gICAgbG9hZEN0cmw6IFwibG9hZEN0cmxcIixcclxuICAgIC8qKuWMuemFjeeVjOmdoui1hOa6kCAqL1xyXG4gICAgTWF0Y2hDdHJsOiBcIk1hdGNoQ3RybFwiLFxyXG4gICAgLyoq5YWs5YWx5aSn5Z6L6LWE5rqQICovXHJcbiAgICBjb21tb25QcmVmYWI6IFwiY29tbW9uUHJlZmFiXCIsXHJcbiAgfSxcclxuICBQbGF5ZXI6IHt9LFxyXG4gIFNZU19DT05GSUdfS0VZOiB7XHJcbiAgICByb3VuZFRpbWU6IFwicm91bmRUaW1lXCIsXHJcbiAgICByb2JvdERpY2VUaW1lOiBcInJvYm90RGljZVRpbWVcIixcclxuICAgIG1vdmVDb3VudERvd246IFwibW92ZUNvdW50RG93blwiLFxyXG4gICAgSW5pdENvaW46IFwiSW5pdENvaW5cIixcclxuICAgIHZpZGVvQ29pbjogXCJ2aWRlb0NvaW5cIixcclxuICAgIHZpZGVvUGh5c2ljYWw6IFwidmlkZW9QaHlzaWNhbFwiLFxyXG4gIH0sXHJcbiAgTE9DQUxfS0VZOiB7fSxcclxuICBTWVNfSURFTlRJVFlfSUQ6IHtcclxuICAgIC8qKlxyXG4gICAgICog56qX5Y+jSUTop4TliJnvvJog5LiA57qn56qX5Y+jIO+8miBBLCDkuoznuqfnqpflj6NCLOaIluiAheS4gOe6p+WIh+mhte+8jOS4iee6p+eql+WPo0MsIOaIluiAheS6jOe6p+WIh+mhteOAglxyXG4gICAgICogMS4g5a2Y5Zyo5piO5pi+5LuO5bGe5YWz57O777yaIEFBQkJDQ1xyXG4gICAgICogMi4g6YCa55So56qX5Y+j77yM5rKh5pyJ5piO5pi+5LiK5LiL57qn5YWz57O777yM5LiN6K6h566X57y65aSx55qE5bGC57qnXHJcbiAgICAgKiAzLiDnqpflj6NJROeahOWxgue6p+WPquiDveivtOaYr+WwvemHj+WIkuWIhu+8jOWunumZhea4uOaIj+enjeeahFVJ5Y+v6IO95Lya5Ye6546w6LaK5bGC546w6LGh77yM5q+U5aaC6K+05oq95Y2h5LiK6Z2i5Y+v6IO95pyJ5LuZ54G16K+m5oOF5ZKM5oqA6IO9VUnjgIJcclxuICAgICAqL1xyXG4gICAgbWFwQ3RybDogMjAwMDAyLFxyXG4gICAgLyoq5Yqg6L296aG1ICovXHJcbiAgICBsb2FkOiAxMDAwMDEsXHJcbiAgICAvKirkuLvpobUgKi9cclxuICAgIGhvbWU6IDEwMDAwMCxcclxuICAgIC8qKuaImOaWl+mhtSAqL1xyXG4gICAgZmlnaHQ6IDYwMDEwMSxcclxuICAgIC8qKuWkp+aLm+WuneW6kyAqL1xyXG4gICAgYmlnTW92ZTogMTAwMDAyLFxyXG4gICAgLyoq5ZWG5bqXICovXHJcbiAgICBzdG9yZTogMTAwMDAzLFxyXG4gICAgLyoq562+5YiwICovXHJcbiAgICBzaWduOiAxMDAwMDQsXHJcbiAgICAvKirpgJrnlKjmoYYgKi9cclxuICAgIGZyYW1lSXRlbTogMTAwMDA2LFxyXG4gICAgLyoq5o6S5L2N5aWW5YqxICovXHJcbiAgICBsZXZlbFJld2FyZEN0cmw6IDEwMDAwOCxcclxuICAgIC8qKuWlluWKseW8ueahhiAqL1xyXG4gICAgcmV3YXJkQ3RybDogMTAwMDA5LFxyXG4gICAgLyoq5Yy56YWN55WM6Z2iICovXHJcbiAgICBtYXRjaEN0cmw6IDEwMDAxMCxcclxuICAgIC8qKuiuvue9ruW8ueahhiovXHJcbiAgICBzZXR0aW5nOiAxMDAwMTEsXHJcbiAgICAvKirnu5PnrpfnlYzpnaIgKi9cclxuICAgIGJhdHRsZVJlc3VsdEN0cmw6IDEwMDAxMixcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEpYVmVjMiB7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICBjb25zdHJ1Y3Rvcih4PzogbnVtYmVyLCB5PzogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnggPSB4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSlhNYXRoIHtcclxuICAvKipcclxuICAgKiDmoLnmja7lvZPliY3lnZDmoIfliLDnm67moIfnm67moIforqHnrpflhYh45ZCOeeeahOi3r+e6v1xyXG4gICAqIEBwYXJhbSBhaXIg55uu5qCH5Z2Q5qCHXHJcbiAgICogQHBhcmFtIGN1ciDlvZPliY3lnZDmoIdcclxuICAgKiBAcGFyYW0gdHlwZSDmlbDlgLznsbvlnotcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldFJpZ2h0QW5nbGVSb3V0ZTxUIGV4dGVuZHMgeyB4OiBudW1iZXI7IHk6IG51bWJlciB9PihcclxuICAgIGFpcjogVCxcclxuICAgIGN1cjogVCxcclxuICAgIHR5cGU6IHsgbmV3ICh4OiBudW1iZXIsIHk6IG51bWJlcik6IFQgfVxyXG4gICk6IFRbXSB7XHJcbiAgICBsZXQgcmV0OiBUW10gPSBbXTtcclxuICAgIGlmIChhaXIueCAhPSBjdXIueCkge1xyXG4gICAgICBsZXQgc3RlcCA9IChhaXIueCAtIGN1ci54KSAvIE1hdGguYWJzKGFpci54IC0gY3VyLngpO1xyXG4gICAgICBmb3IgKGxldCB4ID0gY3VyLng7IHggIT0gYWlyLng7IHggKz0gc3RlcCkge1xyXG4gICAgICAgIHJldC5wdXNoKG5ldyB0eXBlKHggKyBzdGVwLCBjdXIueSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoYWlyLnkgIT0gY3VyLnkpIHtcclxuICAgICAgbGV0IHN0ZXAgPSAoYWlyLnkgLSBjdXIueSkgLyBNYXRoLmFicyhhaXIueSAtIGN1ci55KTtcclxuICAgICAgZm9yIChsZXQgeSA9IGN1ci55OyB5ICE9IGFpci55OyB5ICs9IHN0ZXApIHtcclxuICAgICAgICByZXQucHVzaChuZXcgdHlwZShhaXIueCwgeSArIHN0ZXApKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOS6jOe7tOi9rOS4gOe7tOe0ouW8lVxyXG4gICAqIEBwYXJhbSB4IHjlnZDmoIfvvIzotbflp4vkuLowXHJcbiAgICogQHBhcmFtIHkgeeWdkOagh++8jOi1t+Wni+S4ujBcclxuICAgKiBAcGFyYW0gd2lkdGgg6ZW/5bqmXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBlbmNvZGVWMnh4eXkoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHkgKiB3aWR0aCArIHg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDkuIDnu7TntKLlvJXovazkuLrkuoznu7TlnZDmoIdcclxuICAgKiBAcGFyYW0gaWR4IOWcsOWbvue0ouW8lVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZGVjb2RlVjJ4eHl5KGlkeDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XHJcbiAgICBsZXQgeCA9IGlkeCAlIHdpZHRoO1xyXG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKGlkeCAvIHdpZHRoKTtcclxuICAgIHJldHVybiBbeCwgeV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bkuoznu7Tnm7Top5LlnZDmoIfns7vkuIvnm7jpgrvmlbTmlbDlnZDmoIflr7nlupTntKLlvJVcclxuICAgKiBAcGFyYW0gaWR4IOe0ouW8leagvOWtkFxyXG4gICAqIEBwYXJhbSB3aWR0aCDnvZHmoLzlrr3luqZcclxuICAgKiBAcGFyYW0gaGVpZ2h0IOe9keagvOmrmOW6plxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VjJOZWlnaGJvcklkcyhcclxuICAgIGlkeDogbnVtYmVyLFxyXG4gICAgd2lkdGg6IG51bWJlcixcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbiAgKTogbnVtYmVyW10ge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgbGV0IFt4LCB5XSA9IHRoaXMuZGVjb2RlVjJ4eHl5KGlkeCwgd2lkdGgpO1xyXG4gICAgZm9yIChsZXQgeDEgPSB4IC0gMTsgeDEgPD0geCArIDE7IHgxKyspIHtcclxuICAgICAgZm9yIChsZXQgeTEgPSB5IC0gMTsgeTEgPD0geSArIDE7IHkxKyspIHtcclxuICAgICAgICBpZiAoeDEgPCAwIHx8IHgxID49IHdpZHRoKSBjb250aW51ZTtcclxuICAgICAgICBpZiAoeTEgPCAwIHx8IHkxID49IGhlaWdodCkgY29udGludWU7XHJcbiAgICAgICAgaWYgKHgxID09IHggJiYgeTEgPT0geSkgY29udGludWU7XHJcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5lbmNvZGVWMnh4eXkoeDEsIHkxLCB3aWR0aCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWJr+acrOWcsOWbvuiuoeeul+S4iuS4gOasoeatpemVv+eahOS9jee9rlxyXG4gICAqIEBwYXJhbSBsYXN0IOS4iuS4gOasoeeahOW9k+WJjeS9jee9rlxyXG4gICAqIEBwYXJhbSBjdXIg6L+Z5LiA5qyh55qE5b2T5YmN5L2N572uXHJcbiAgICogQHBhcmFtIHR5cGUg5p6E6YCgXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRMYXN0U3RlcFBvczxUIGV4dGVuZHMgeyB4OiBudW1iZXI7IHk6IG51bWJlciB9PihcclxuICAgIGxhc3Q6IFQsXHJcbiAgICBjdXI6IFQsXHJcbiAgICB0eXBlOiB7IG5ldyAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBUIH1cclxuICApOiBUIHtcclxuICAgIGlmIChjdXIueSAtIGxhc3QueSA+PSAxKSB7XHJcbiAgICAgIGxldCBzdGVwID0gKGN1ci55IC0gbGFzdC55KSAvIE1hdGguYWJzKGN1ci55IC0gbGFzdC55KTtcclxuICAgICAgcmV0dXJuIG5ldyB0eXBlKGN1ci54LCBjdXIueSAtIHN0ZXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHN0ZXAgPSAoY3VyLnggLSBsYXN0LngpIC8gTWF0aC5hYnMoY3VyLnggLSBsYXN0LngpO1xyXG4gICAgICByZXR1cm4gbmV3IHR5cGUoY3VyLnggLSBzdGVwLCBjdXIueSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG5ld0FycmF5KGxlbjogbnVtYmVyLCBmaWxsPzogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICBsZXQgYXJyID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGFyci5wdXNoKGZpbGwgfHwgMCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5pWw57uE5Lmx5bqPXHJcbiAgICogQHBhcmFtIGFycmF5IOmcgOimgeS5seW6j+eahOaVsOe7hFxyXG4gICAqIEBwYXJhbSByYW5kb20g6ZqP5py65Ye95pWwXHJcbiAgICogQHBhcmFtIGlzU2VsZiDmmK/lkKbmiZPkubHoh6rouqvvvIzpu5jorqTmiZPkubHoh6rouqtcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHNodWZmbGU8VD4oXHJcbiAgICBhcnJheTogQXJyYXk8VD4sXHJcbiAgICByYW5kb206IHsgKCk6IG51bWJlciB9LFxyXG4gICAgaXNTZWxmID0gdHJ1ZVxyXG4gICk6IEFycmF5PFQ+IHtcclxuICAgIGxldCByZXN1bHQ6IEFycmF5PFQ+O1xyXG4gICAgaWYgKCFpc1NlbGYpIHtcclxuICAgICAgcmVzdWx0ID0gW107XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICByZXN1bHQucHVzaChhcnJheVtpXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IGFycmF5O1xyXG4gICAgfVxyXG4gICAgbGV0IG0gPSByZXN1bHQubGVuZ3RoO1xyXG4gICAgbGV0IHQsIGo7XHJcbiAgICB3aGlsZSAobSkge1xyXG4gICAgICBqID0gTWF0aC5mbG9vcihyYW5kb20oKSAqIG0tLSk7XHJcbiAgICAgIHQgPSByZXN1bHRbbV07XHJcbiAgICAgIHJlc3VsdFttXSA9IHJlc3VsdFtqXTtcclxuICAgICAgcmVzdWx0W2pdID0gdDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcbi8qKiDpgJrnlKjpmo/mnLrnsbsgKi9cclxuZXhwb3J0IGNsYXNzIEpYUmFuZG9tIHtcclxuICAvKiog6ZqP5py65Ye95pWw6I635Y+W5Ye95pWwICovXHJcbiAgcHJvdGVjdGVkIF9nZXRQcm5nOiB7IChzZWVkOiBzdHJpbmcpOiB7ICgpOiBudW1iZXIgfSB9O1xyXG4gIC8qKiDpmo/mnLrlh73mlbAgLCDlt7Llrprpmo/mnLrnp43lrZDnmoTojrflj5blh73mlbAqL1xyXG4gIHByb3RlY3RlZCBfcHJuZzogeyAoKTogbnVtYmVyIH07XHJcbiAgcHVibGljIGdldCBwcm5nKCk6IHsgKCk6IG51bWJlciB9IHtcclxuICAgIGlmICghdGhpcy5fcHJuZykge1xyXG4gICAgICB0aGlzLl9wcm5nID0gdGhpcy5fZ2V0UHJuZyh0aGlzLl9zZWVkKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9wcm5nO1xyXG4gIH1cclxuXHJcbiAgLyoqIOmaj+acuuenjeWtkCAqL1xyXG4gIHByb3RlY3RlZCBfc2VlZDogc3RyaW5nO1xyXG4gIC8qKiDpmo/mnLrmrKHmlbAgKi9cclxuICBwcm90ZWN0ZWQgX25SYW5kb21UaW1lczogbnVtYmVyID0gMDtcclxuICAvKiog6I635Y+W6ZqP5py656eN5a2QICovXHJcbiAgcHVibGljIGdldCBzZWVkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VlZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog6ZqP5py65p6E6YCg57G7XHJcbiAgICogQHBhcmFtIGdldFBybmcg6ZqP5py656eN5a2Q6I635Y+W5Ye95pWwXHJcbiAgICogQHBhcmFtIHNlZWQg5Y+v6YCJ77yM6ZqP5py656eN5a2QXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ2V0UHJuZzogeyAoc2VlZDogc3RyaW5nKTogeyAoKTogbnVtYmVyIH0gfSwgc2VlZD86IHN0cmluZykge1xyXG4gICAgaWYgKCFnZXRQcm5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZSBnZW5Qcm5nIGNhbGwgYmFjayBpcyBub3QgcmVhZHkhXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZ2V0UHJuZyA9IGdldFBybmc7XHJcbiAgICB0aGlzLl9zZWVkID0gc2VlZCB8fCBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKiog6I635Y+W5LiA5Liq6ZqP5py65pWwICovXHJcbiAgcHVibGljIGdldFJhbmRvbSgpOiBudW1iZXIge1xyXG4gICAgdGhpcy5fblJhbmRvbVRpbWVzKys7XHJcbiAgICByZXR1cm4gdGhpcy5wcm5nKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmoLnmja7pmo/mnLrljLrpl7TvvIzojrflj5bpmo/mnLrmlbTmlbBcclxuICAgKiBAcGFyYW0gbWluIOacgOWwj+WAvFxyXG4gICAqIEBwYXJhbSBtYXgg5pyA5aSn5YC8XHJcbiAgICovXHJcbiAgcHVibGljIHJhbmRvbUZsb29yKG1pbj86IG51bWJlciwgbWF4PzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIG1pbiA9IG1pbiB8fCAwO1xyXG4gICAgbWF4ID0gbWF4IHx8IDEwMDtcclxuICAgIGxldCByZXMgPSBNYXRoLmZsb29yKG1pbiArIHRoaXMuZ2V0UmFuZG9tKCkgKiAobWF4IC0gbWluKSk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuICAvKipcclxuICAgKiDmoLnmja7pmo/mnLrljLrpl7TvvIzojrflj5bkuI3ph43lpI3nmoTpmo/mnLrmlbTmlbDnu4RcclxuICAgKiBAcGFyYW0gbGVuIOiOt+WPlumVv+W6plxyXG4gICAqIEBwYXJhbSBtaW4g5pyA5bCP5YC8XHJcbiAgICogQHBhcmFtIG1heCDmnIDlpKflgLxcclxuICAgKi9cclxuICBwdWJsaWMgcmFuZG9tcyhsZW46IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgLy8gaWYgKGxlbiA+PSAobWF4IC0gbWluKSkgcmV0dXJuIEpYTWF0aC5uZXdBcnJheShtYXggLSBtaW4pLm1hcCgodiwgaSkgPT4gaSArIG1pbik7XHJcbiAgICBsZXQgYXJyID0gSlhNYXRoLm5ld0FycmF5KG1heCAtIG1pbikubWFwKCh2LCBpKSA9PiBpICsgbWluKTtcclxuICAgIHZhciByZHMgPSBuZXcgQXJyYXkoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgaWYgKGFyci5sZW5ndGggPD0gMCkgYnJlYWs7XHJcbiAgICAgIHZhciBhcnJJbmRleCA9IE1hdGguZmxvb3IodGhpcy5yYW5kb21GbG9vcigwLCBhcnIubGVuZ3RoKSk7XHJcbiAgICAgIHJkc1tpXSA9IGFyclthcnJJbmRleF07XHJcbiAgICAgIGFyci5zcGxpY2UoYXJySW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJkcztcclxuICB9XHJcblxyXG4gIC8vIHB1YmxpYyBjbGFtcChjbGFtcDogbnVtYmVyLCBtaW4/OiBudW1iZXIsIG1heD86IG51bWJlcik6IG51bWJlciB7XHJcbiAgLy8gfVxyXG59XHJcbi8vIOaMh+WumumVv+W6puWSjOWfuuaVsOeUn+aIkHV1aWRcclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlVWlkKGxlbj86IG51bWJlciwgcmFkaXg/OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gIGxldCBjaGFycyA9XHJcbiAgICBcIjAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIuc3BsaXQoXCJcIik7XHJcbiAgbGV0IHV1aWQgPSBbXSxcclxuICAgIGk7XHJcbiAgcmFkaXggPSByYWRpeCB8fCBjaGFycy5sZW5ndGg7XHJcblxyXG4gIGlmIChsZW4pIHtcclxuICAgIC8vIENvbXBhY3QgZm9ybVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB1dWlkW2ldID0gY2hhcnNbMCB8IChNYXRoLnJhbmRvbSgpICogcmFkaXgpXTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gcmZjNDEyMiwgdmVyc2lvbiA0IGZvcm1cclxuICAgIGxldCByO1xyXG5cclxuICAgIC8vIHJmYzQxMjIgcmVxdWlyZXMgdGhlc2UgY2hhcmFjdGVyc1xyXG4gICAgdXVpZFs4XSA9IHV1aWRbMTNdID0gdXVpZFsxOF0gPSB1dWlkWzIzXSA9IFwiLVwiO1xyXG4gICAgdXVpZFsxNF0gPSBcIjRcIjtcclxuXHJcbiAgICAvLyBGaWxsIGluIHJhbmRvbSBkYXRhLiAgQXQgaT09MTkgc2V0IHRoZSBoaWdoIGJpdHMgb2YgY2xvY2sgc2VxdWVuY2UgYXNcclxuICAgIC8vIHBlciByZmM0MTIyLCBzZWMuIDQuMS41XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgMzY7IGkrKykge1xyXG4gICAgICBpZiAoIXV1aWRbaV0pIHtcclxuICAgICAgICByID0gMCB8IChNYXRoLnJhbmRvbSgpICogMTYpO1xyXG4gICAgICAgIHV1aWRbaV0gPSBjaGFyc1tpID09IDE5ID8gKHIgJiAweDMpIHwgMHg4IDogcl07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB1dWlkLmpvaW4oXCJcIik7XHJcbn1cclxuIl19