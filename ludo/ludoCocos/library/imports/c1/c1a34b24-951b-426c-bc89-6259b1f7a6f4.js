"use strict";
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
        aiPlayerSetting: 100013,
        DailyTasks: 100014,
        Help: 100015,
        LeaderBoard: 100016,
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