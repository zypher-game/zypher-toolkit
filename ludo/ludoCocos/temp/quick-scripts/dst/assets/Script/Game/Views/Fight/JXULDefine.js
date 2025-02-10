
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/JXULDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82d3dA7xfNDUI1AAGgwY50O', 'JXULDefine');
// Script/Game/Views/Fight/JXULDefine.ts

"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleNumber = exports.JXBtlPs = exports.ICampKeyCode = exports.ROLE_NAME_PREFIX = exports.ROLE_ROAD = exports.ROLE_BORN_POS = exports.ROLE_START_POS = exports.BirthAngle = exports.ROLE_COMP_NAME = exports.JXEDir = exports.JXEAniNames = exports.JXBtlBEMT = exports.JXEState = void 0;
var JXEState;
(function (JXEState) {
    /** 待机 */
    JXEState[JXEState["Idle"] = 0] = "Idle";
    /**起飛 */
    JXEState[JXEState["TakeOff"] = 1] = "TakeOff";
    /**飛行 */
    JXEState[JXEState["Fly"] = 2] = "Fly";
    /**叠加 */
    JXEState[JXEState["Overlay"] = 3] = "Overlay";
    JXEState[JXEState["Hit"] = 4] = "Hit";
    /** 跑（回合无此状态） */
    JXEState[JXEState["Run"] = 5] = "Run";
    /** 死亡 */
    JXEState[JXEState["Death"] = 6] = "Death";
    /** 程序用 */
    JXEState[JXEState["Global"] = 7] = "Global";
})(JXEState = exports.JXEState || (exports.JXEState = {}));
/**效果 */
var JXBtlBEMT;
(function (JXBtlBEMT) {
    /**禁止起飞回合 */
    JXBtlBEMT[JXBtlBEMT["BanTakeOff"] = 1] = "BanTakeOff";
    /**禁止行动 */
    JXBtlBEMT[JXBtlBEMT["BanMove"] = 2] = "BanMove";
    /**埋炸弹 */
    JXBtlBEMT[JXBtlBEMT["Mines"] = 3] = "Mines";
})(JXBtlBEMT = exports.JXBtlBEMT || (exports.JXBtlBEMT = {}));
exports.JXEAniNames = {
    /**待机 */
    idle: "daiji",
    /**叠加 */
    diejia: "diejia",
    /**奔跑 */
    run: "penshe1",
    /**飞行喷射*/
    fly: "penshe2",
    /**起飞 */
    qifei: "putongqifei",
    /**消失 */
    xiaoshi: "xiaoshi",
    chuxian: "chuxian",
    zhuangfei: "zhuangfei2",
    /**死亡 */
    die: "xiaoshi",
};
var JXEDir;
(function (JXEDir) {
    /** 右上角 */
    JXEDir[JXEDir["Blue"] = 1] = "Blue";
    /**左下角 */
    JXEDir[JXEDir["Red"] = 2] = "Red";
    /**左上角 */
    JXEDir[JXEDir["Yellow"] = 3] = "Yellow";
    /**右下角 */
    JXEDir[JXEDir["Green"] = 4] = "Green";
})(JXEDir = exports.JXEDir || (exports.JXEDir = {}));
exports.ROLE_COMP_NAME = {
    1: "蓝方",
    2: "红方",
    3: "黄方",
    4: "绿方",
};
exports.BirthAngle = (_a = {},
    _a[JXEDir.Blue] = 45,
    _a[JXEDir.Red] = -60,
    _a[JXEDir.Yellow] = -230,
    _a[JXEDir.Green] = -140,
    _a);
exports.ROLE_START_POS = (_b = {},
    _b[JXEDir.Blue] = {
        x: 1295,
        y: 96,
    },
    _b[JXEDir.Red] = {
        x: 310,
        y: 327,
    },
    _b[JXEDir.Yellow] = {
        x: 1621,
        y: 733,
    },
    _b[JXEDir.Green] = {
        x: 603,
        y: 945,
    },
    _b);
// 飞机起始位置
exports.ROLE_BORN_POS = (_c = {},
    // 1: [1313, 1413, 1312, 1412],
    _c[JXEDir.Blue] = [
        {
            x: 959,
            y: 184,
        },
        {
            x: 1044,
            y: 135,
        },
        {
            x: 1130,
            y: 184,
        },
        {
            x: 1045,
            y: 228,
        },
    ],
    _c[JXEDir.Red] = [
        {
            x: 296,
            y: 488,
        },
        {
            x: 381,
            y: 440,
        },
        {
            x: 466,
            y: 488,
        },
        {
            x: 382,
            y: 532,
        },
    ],
    _c[JXEDir.Yellow] = [
        {
            x: 1449,
            y: 605,
        },
        {
            x: 1533,
            y: 556,
        },
        {
            x: 1619,
            y: 605,
        },
        {
            x: 1534,
            y: 649,
        },
    ],
    _c[JXEDir.Green] = [
        {
            x: 793,
            y: 906,
        },
        {
            x: 878,
            y: 857,
        },
        {
            x: 964,
            y: 906,
        },
        {
            x: 879,
            y: 950,
        },
    ],
    _c);
exports.ROLE_ROAD = (_d = {},
    //  Blue
    _d[JXEDir.Blue] = [
        {
            x: 1331,
            y: 223,
            index: 1,
        },
        {
            x: 1257,
            y: 266,
            index: 2,
        },
        {
            x: 1183,
            y: 310,
            index: 3,
        },
        {
            x: 1110,
            y: 355,
            index: 4,
        },
        {
            x: 1036,
            y: 399,
            index: 5,
        },
        {
            x: 895,
            y: 408,
            index: 6,
        },
        {
            x: 819,
            y: 362,
            index: 7,
        },
        {
            x: 744,
            y: 317,
            index: 8,
        },
        {
            x: 667,
            y: 271,
            index: 9,
        },
        {
            x: 590,
            y: 224,
            index: 10,
        },
        {
            x: 512,
            y: 177,
            index: 11,
        },
        {
            x: 432,
            y: 224,
            index: 12,
        },
        {
            x: 364,
            y: 269,
            index: 13,
        },
        {
            x: 442,
            y: 316,
            index: 14,
        },
        {
            x: 519,
            y: 362,
            index: 15,
        },
        {
            x: 596,
            y: 407,
            index: 16,
        },
        {
            x: 672,
            y: 452,
            index: 17,
        },
        {
            x: 748,
            y: 497,
            index: 18,
        },
        {
            x: 737,
            y: 578,
            index: 19,
        },
        {
            x: 662,
            y: 624,
            index: 20,
        },
        {
            x: 587,
            y: 669,
            index: 21,
        },
        {
            x: 512,
            y: 715,
            index: 22,
        },
        {
            x: 436,
            y: 761,
            index: 23,
        },
        {
            x: 360,
            y: 807,
            index: 24,
        },
        {
            x: 443,
            y: 862,
            index: 25,
        },
        {
            x: 498,
            y: 903,
            index: 26,
        },
        {
            x: 574,
            y: 856,
            index: 27,
        },
        {
            x: 651,
            y: 810,
            index: 28,
        },
        {
            x: 727,
            y: 764,
            index: 29,
        },
        {
            x: 803,
            y: 718,
            index: 30,
        },
        {
            x: 879,
            y: 672,
            index: 31,
        },
        {
            x: 1042,
            y: 671,
            index: 32,
        },
        {
            x: 1113,
            y: 713,
            index: 33,
        },
        {
            x: 1184,
            y: 755,
            index: 34,
        },
        {
            x: 1255,
            y: 796,
            index: 35,
        },
        {
            x: 1324,
            y: 837,
            index: 36,
        },
        {
            x: 1393,
            y: 877,
            index: 37,
        },
        {
            x: 1470,
            y: 850,
            index: 38,
        },
        {
            x: 1538,
            y: 792,
            index: 39,
        },
        {
            x: 1469,
            y: 751,
            index: 40,
        },
        {
            x: 1400,
            y: 710,
            index: 41,
        },
        {
            x: 1330,
            y: 668,
            index: 42,
        },
        {
            x: 1259,
            y: 626,
            index: 43,
        },
        {
            x: 1188,
            y: 583,
            index: 44,
        },
        {
            x: 1181,
            y: 491,
            index: 45,
        },
        {
            x: 1256,
            y: 446,
            index: 46,
        },
        {
            x: 1331,
            y: 401,
            index: 47,
        },
        {
            x: 1405,
            y: 357,
            index: 48,
        },
        {
            x: 1479,
            y: 313,
            index: 49,
        },
        {
            x: 1554,
            y: 269,
            index: 50,
        },
        {
            x: 1483,
            y: 228,
            index: 51,
        },
        {
            x: 1410,
            y: 271,
            index: 52,
        },
        {
            x: 1337,
            y: 316,
            index: 53,
        },
        {
            x: 1264,
            y: 360,
            index: 54,
        },
        {
            x: 1190,
            y: 405,
            index: 55,
        },
        {
            x: 1116,
            y: 450,
            index: 56,
        },
        {
            x: 968,
            y: 548,
            index: 57,
        },
    ],
    // Red
    _d[JXEDir.Red] = [
        {
            x: 442,
            y: 316,
            index: 1,
        },
        {
            x: 519,
            y: 362,
            index: 2,
        },
        {
            x: 596,
            y: 407,
            index: 3,
        },
        {
            x: 672,
            y: 452,
            index: 4,
        },
        {
            x: 748,
            y: 497,
            index: 5,
        },
        {
            x: 737,
            y: 578,
            index: 6,
        },
        {
            x: 662,
            y: 624,
            index: 7,
        },
        {
            x: 587,
            y: 669,
            index: 8,
        },
        {
            x: 512,
            y: 715,
            index: 9,
        },
        {
            x: 436,
            y: 761,
            index: 10,
        },
        {
            x: 360,
            y: 807,
            index: 11,
        },
        {
            x: 443,
            y: 862,
            index: 12,
        },
        {
            x: 498,
            y: 903,
            index: 13,
        },
        {
            x: 574,
            y: 856,
            index: 14,
        },
        {
            x: 651,
            y: 810,
            index: 15,
        },
        {
            x: 727,
            y: 764,
            index: 16,
        },
        {
            x: 803,
            y: 718,
            index: 17,
        },
        {
            x: 879,
            y: 672,
            index: 18,
        },
        {
            x: 1042,
            y: 671,
            index: 19,
        },
        {
            x: 1113,
            y: 713,
            index: 20,
        },
        {
            x: 1184,
            y: 755,
            index: 21,
        },
        {
            x: 1255,
            y: 796,
            index: 22,
        },
        {
            x: 1324,
            y: 837,
            index: 23,
        },
        {
            x: 1393,
            y: 877,
            index: 24,
        },
        {
            x: 1470,
            y: 850,
            index: 25,
        },
        {
            x: 1538,
            y: 792,
            index: 26,
        },
        {
            x: 1469,
            y: 751,
            index: 27,
        },
        {
            x: 1400,
            y: 710,
            index: 28,
        },
        {
            x: 1330,
            y: 668,
            index: 29,
        },
        {
            x: 1259,
            y: 626,
            index: 30,
        },
        {
            x: 1188,
            y: 583,
            index: 31,
        },
        {
            x: 1181,
            y: 491,
            index: 32,
        },
        {
            x: 1256,
            y: 446,
            index: 33,
        },
        {
            x: 1331,
            y: 401,
            index: 34,
        },
        {
            x: 1405,
            y: 357,
            index: 35,
        },
        {
            x: 1479,
            y: 313,
            index: 36,
        },
        {
            x: 1554,
            y: 269,
            index: 37,
        },
        {
            x: 1483,
            y: 228,
            index: 38,
        },
        {
            x: 1404,
            y: 179,
            index: 39,
        },
        {
            x: 1331,
            y: 223,
            index: 40,
        },
        {
            x: 1257,
            y: 266,
            index: 41,
        },
        {
            x: 1183,
            y: 310,
            index: 42,
        },
        {
            x: 1110,
            y: 355,
            index: 43,
        },
        {
            x: 1036,
            y: 399,
            index: 44,
        },
        {
            x: 895,
            y: 408,
            index: 45,
        },
        {
            x: 819,
            y: 362,
            index: 46,
        },
        {
            x: 744,
            y: 317,
            index: 47,
        },
        {
            x: 667,
            y: 271,
            index: 48,
        },
        {
            x: 590,
            y: 224,
            index: 49,
        },
        {
            x: 512,
            y: 177,
            index: 50,
        },
        {
            x: 432,
            y: 224,
            index: 51,
        },
        {
            x: 511,
            y: 272,
            index: 52,
        },
        {
            x: 589,
            y: 320,
            index: 53,
        },
        {
            x: 667,
            y: 366,
            index: 54,
        },
        {
            x: 743,
            y: 413,
            index: 55,
        },
        {
            x: 819,
            y: 459,
            index: 56,
        },
        {
            x: 968,
            y: 548,
            index: 57,
        },
    ],
    // Yellow
    _d[JXEDir.Yellow] = [
        {
            x: 1469,
            y: 751,
            index: 1,
        },
        {
            x: 1400,
            y: 710,
            index: 2,
        },
        {
            x: 1330,
            y: 668,
            index: 3,
        },
        {
            x: 1259,
            y: 626,
            index: 4,
        },
        {
            x: 1188,
            y: 583,
            index: 5,
        },
        {
            x: 1181,
            y: 491,
            index: 6,
        },
        {
            x: 1256,
            y: 446,
            index: 7,
        },
        {
            x: 1331,
            y: 401,
            index: 8,
        },
        {
            x: 1405,
            y: 357,
            index: 9,
        },
        {
            x: 1479,
            y: 313,
            index: 10,
        },
        {
            x: 1554,
            y: 269,
            index: 11,
        },
        {
            x: 1483,
            y: 228,
            index: 12,
        },
        {
            x: 1404,
            y: 179,
            index: 13,
        },
        {
            x: 1331,
            y: 223,
            index: 14,
        },
        {
            x: 1257,
            y: 266,
            index: 15,
        },
        {
            x: 1183,
            y: 310,
            index: 16,
        },
        {
            x: 1110,
            y: 355,
            index: 17,
        },
        {
            x: 1036,
            y: 399,
            index: 18,
        },
        {
            x: 895,
            y: 408,
            index: 19,
        },
        {
            x: 819,
            y: 362,
            index: 20,
        },
        {
            x: 744,
            y: 317,
            index: 21,
        },
        {
            x: 667,
            y: 271,
            index: 22,
        },
        {
            x: 590,
            y: 224,
            index: 23,
        },
        {
            x: 512,
            y: 177,
            index: 24,
        },
        {
            x: 432,
            y: 224,
            index: 25,
        },
        {
            x: 364,
            y: 269,
            index: 26,
        },
        {
            x: 442,
            y: 316,
            index: 27,
        },
        {
            x: 519,
            y: 362,
            index: 28,
        },
        {
            x: 596,
            y: 407,
            index: 29,
        },
        {
            x: 672,
            y: 452,
            index: 30,
        },
        {
            x: 748,
            y: 497,
            index: 31,
        },
        {
            x: 737,
            y: 578,
            index: 32,
        },
        {
            x: 662,
            y: 624,
            index: 33,
        },
        {
            x: 587,
            y: 669,
            index: 34,
        },
        {
            x: 512,
            y: 715,
            index: 35,
        },
        {
            x: 436,
            y: 761,
            index: 36,
        },
        {
            x: 360,
            y: 807,
            index: 37,
        },
        {
            x: 443,
            y: 862,
            index: 38,
        },
        {
            x: 498,
            y: 903,
            index: 39,
        },
        {
            x: 574,
            y: 856,
            index: 40,
        },
        {
            x: 651,
            y: 810,
            index: 41,
        },
        {
            x: 727,
            y: 764,
            index: 42,
        },
        {
            x: 803,
            y: 718,
            index: 43,
        },
        {
            x: 879,
            y: 672,
            index: 44,
        },
        {
            x: 1042,
            y: 671,
            index: 45,
        },
        {
            x: 1113,
            y: 713,
            index: 46,
        },
        {
            x: 1184,
            y: 755,
            index: 47,
        },
        {
            x: 1255,
            y: 796,
            index: 48,
        },
        {
            x: 1324,
            y: 837,
            index: 49,
        },
        {
            x: 1393,
            y: 877,
            index: 50,
        },
        {
            x: 1470,
            y: 850,
            index: 51,
        },
        {
            x: 1400,
            y: 808,
            index: 52,
        },
        {
            x: 1330,
            y: 766,
            index: 53,
        },
        {
            x: 1259,
            y: 724,
            index: 54,
        },
        {
            x: 1188,
            y: 681,
            index: 55,
        },
        {
            x: 1115,
            y: 637,
            index: 56,
        },
        {
            x: 968,
            y: 548,
            index: 57,
        },
    ],
    // Green
    _d[JXEDir.Green] = [
        {
            x: 574,
            y: 856,
            index: 1,
        },
        {
            x: 651,
            y: 810,
            index: 2,
        },
        {
            x: 727,
            y: 764,
            index: 3,
        },
        {
            x: 803,
            y: 718,
            index: 4,
        },
        {
            x: 879,
            y: 672,
            index: 5,
        },
        {
            x: 1042,
            y: 671,
            index: 6,
        },
        {
            x: 1113,
            y: 713,
            index: 7,
        },
        {
            x: 1184,
            y: 755,
            index: 8,
        },
        {
            x: 1255,
            y: 796,
            index: 9,
        },
        {
            x: 1324,
            y: 837,
            index: 10,
        },
        {
            x: 1393,
            y: 877,
            index: 11,
        },
        {
            x: 1470,
            y: 850,
            index: 12,
        },
        {
            x: 1538,
            y: 792,
            index: 13,
        },
        {
            x: 1469,
            y: 751,
            index: 14,
        },
        {
            x: 1400,
            y: 710,
            index: 15,
        },
        {
            x: 1330,
            y: 668,
            index: 16,
        },
        {
            x: 1259,
            y: 626,
            index: 17,
        },
        {
            x: 1188,
            y: 583,
            index: 18,
        },
        {
            x: 1181,
            y: 491,
            index: 19,
        },
        {
            x: 1256,
            y: 446,
            index: 20,
        },
        {
            x: 1331,
            y: 401,
            index: 21,
        },
        {
            x: 1405,
            y: 357,
            index: 22,
        },
        {
            x: 1479,
            y: 313,
            index: 23,
        },
        {
            x: 1554,
            y: 269,
            index: 24,
        },
        {
            x: 1483,
            y: 228,
            index: 25,
        },
        {
            x: 1404,
            y: 179,
            index: 26,
        },
        {
            x: 1331,
            y: 223,
            index: 27,
        },
        {
            x: 1257,
            y: 266,
            index: 28,
        },
        {
            x: 1183,
            y: 310,
            index: 29,
        },
        {
            x: 1110,
            y: 355,
            index: 30,
        },
        {
            x: 1036,
            y: 399,
            index: 31,
        },
        {
            x: 895,
            y: 408,
            index: 32,
        },
        {
            x: 819,
            y: 362,
            index: 33,
        },
        {
            x: 744,
            y: 317,
            index: 34,
        },
        {
            x: 667,
            y: 271,
            index: 35,
        },
        {
            x: 590,
            y: 224,
            index: 36,
        },
        {
            x: 512,
            y: 177,
            index: 37,
        },
        {
            x: 432,
            y: 224,
            index: 38,
        },
        {
            x: 364,
            y: 269,
            index: 39,
        },
        {
            x: 442,
            y: 316,
            index: 40,
        },
        {
            x: 519,
            y: 362,
            index: 41,
        },
        {
            x: 596,
            y: 407,
            index: 42,
        },
        {
            x: 672,
            y: 452,
            index: 43,
        },
        {
            x: 748,
            y: 497,
            index: 44,
        },
        {
            x: 737,
            y: 578,
            index: 45,
        },
        {
            x: 662,
            y: 624,
            index: 46,
        },
        {
            x: 587,
            y: 669,
            index: 47,
        },
        {
            x: 512,
            y: 715,
            index: 48,
        },
        {
            x: 436,
            y: 761,
            index: 49,
        },
        {
            x: 360,
            y: 807,
            index: 50,
        },
        {
            x: 443,
            y: 862,
            index: 51,
        },
        {
            x: 519,
            y: 815,
            index: 52,
        },
        {
            x: 594,
            y: 769,
            index: 53,
        },
        {
            x: 669,
            y: 723,
            index: 54,
        },
        {
            x: 744,
            y: 677,
            index: 55,
        },
        {
            x: 819,
            y: 631,
            index: 56,
        },
        {
            x: 968,
            y: 548,
            index: 57,
        },
    ],
    _d);
exports.ROLE_NAME_PREFIX = "JXRBRole";
exports.ICampKeyCode = 100;
/** JXBattle Parts */
exports.JXBtlPs = {
    Invalid: -1,
    InvalidString: "-1",
};
exports.RoleNumber = 4;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9KWFVMRGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLFFBZ0JYO0FBaEJELFdBQVksUUFBUTtJQUNsQixTQUFTO0lBQ1QsdUNBQVEsQ0FBQTtJQUNSLFFBQVE7SUFDUiw2Q0FBTyxDQUFBO0lBQ1AsUUFBUTtJQUNSLHFDQUFHLENBQUE7SUFDSCxRQUFRO0lBQ1IsNkNBQU8sQ0FBQTtJQUNQLHFDQUFHLENBQUE7SUFDSCxnQkFBZ0I7SUFDaEIscUNBQUcsQ0FBQTtJQUNILFNBQVM7SUFDVCx5Q0FBSyxDQUFBO0lBQ0wsVUFBVTtJQUNWLDJDQUFNLENBQUE7QUFDUixDQUFDLEVBaEJXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBZ0JuQjtBQUVELFFBQVE7QUFDUixJQUFZLFNBT1g7QUFQRCxXQUFZLFNBQVM7SUFDbkIsWUFBWTtJQUNaLHFEQUFjLENBQUE7SUFDZCxVQUFVO0lBQ1YsK0NBQVcsQ0FBQTtJQUNYLFNBQVM7SUFDVCwyQ0FBSyxDQUFBO0FBQ1AsQ0FBQyxFQVBXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBT3BCO0FBRVksUUFBQSxXQUFXLEdBQUc7SUFDekIsUUFBUTtJQUNSLElBQUksRUFBRSxPQUFPO0lBQ2IsUUFBUTtJQUNSLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFFBQVE7SUFDUixHQUFHLEVBQUUsU0FBUztJQUNkLFNBQVM7SUFDVCxHQUFHLEVBQUUsU0FBUztJQUNkLFFBQVE7SUFDUixLQUFLLEVBQUUsYUFBYTtJQUNwQixRQUFRO0lBQ1IsT0FBTyxFQUFFLFNBQVM7SUFDbEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsU0FBUyxFQUFFLFlBQVk7SUFDdkIsUUFBUTtJQUNSLEdBQUcsRUFBRSxTQUFTO0NBQ2YsQ0FBQztBQUVGLElBQVksTUFTWDtBQVRELFdBQVksTUFBTTtJQUNoQixVQUFVO0lBQ1YsbUNBQVEsQ0FBQTtJQUNSLFNBQVM7SUFDVCxpQ0FBRyxDQUFBO0lBQ0gsU0FBUztJQUNULHVDQUFNLENBQUE7SUFDTixTQUFTO0lBQ1QscUNBQUssQ0FBQTtBQUNQLENBQUMsRUFUVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFTakI7QUFFWSxRQUFBLGNBQWMsR0FBOEI7SUFDdkQsQ0FBQyxFQUFFLElBQUk7SUFDUCxDQUFDLEVBQUUsSUFBSTtJQUNQLENBQUMsRUFBRSxJQUFJO0lBQ1AsQ0FBQyxFQUFFLElBQUk7Q0FDUixDQUFDO0FBQ1csUUFBQSxVQUFVO0lBQ3JCLEdBQUMsTUFBTSxDQUFDLElBQUksSUFBRyxFQUFFO0lBQ2pCLEdBQUMsTUFBTSxDQUFDLEdBQUcsSUFBRyxDQUFDLEVBQUU7SUFDakIsR0FBQyxNQUFNLENBQUMsTUFBTSxJQUFHLENBQUMsR0FBRztJQUNyQixHQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUcsQ0FBQyxHQUFHO1FBQ3BCO0FBQ1csUUFBQSxjQUFjO0lBQ3pCLEdBQUMsTUFBTSxDQUFDLElBQUksSUFBRztRQUNiLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEVBQUU7S0FDTjtJQUNELEdBQUMsTUFBTSxDQUFDLEdBQUcsSUFBRztRQUNaLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7S0FDUDtJQUNELEdBQUMsTUFBTSxDQUFDLE1BQU0sSUFBRztRQUNmLENBQUMsRUFBRSxJQUFJO1FBQ1AsQ0FBQyxFQUFFLEdBQUc7S0FDUDtJQUNELEdBQUMsTUFBTSxDQUFDLEtBQUssSUFBRztRQUNkLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7S0FDUDtRQUNEO0FBQ0YsU0FBUztBQUNJLFFBQUEsYUFBYTtJQUN4QiwrQkFBK0I7SUFDL0IsR0FBQyxNQUFNLENBQUMsSUFBSSxJQUFHO1FBQ2I7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1NBQ1A7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7U0FDUDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztTQUNQO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1NBQ1A7S0FDRjtJQUNELEdBQUMsTUFBTSxDQUFDLEdBQUcsSUFBRztRQUNaO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztTQUNQO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1NBQ1A7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7U0FDUDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztTQUNQO0tBQ0Y7SUFDRCxHQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUc7UUFDZjtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7U0FDUDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztTQUNQO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1NBQ1A7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7U0FDUDtLQUNGO0lBQ0QsR0FBQyxNQUFNLENBQUMsS0FBSyxJQUFHO1FBQ2Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1NBQ1A7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7U0FDUDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztTQUNQO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1NBQ1A7S0FDRjtRQUNEO0FBQ1csUUFBQSxTQUFTO0lBR3BCLFFBQVE7SUFDUixHQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUc7UUFDYjtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtJQUNELE1BQU07SUFDTixHQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUc7UUFDWjtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtJQUNELFNBQVM7SUFDVCxHQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUc7UUFDZjtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtJQUNELFFBQVE7SUFDUixHQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUc7UUFDZDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7U0FDVDtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7UUFDRDtZQUNFLENBQUMsRUFBRSxHQUFHO1lBQ04sQ0FBQyxFQUFFLEdBQUc7WUFDTixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0Q7WUFDRSxDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxHQUFHO1lBQ04sS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNEO1lBQ0UsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtRQUNEO0FBQ1csUUFBQSxnQkFBZ0IsR0FBRyxVQUFVLENBQUM7QUFDOUIsUUFBQSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBRWhDLHFCQUFxQjtBQUNSLFFBQUEsT0FBTyxHQUFHO0lBQ3JCLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDWCxhQUFhLEVBQUUsSUFBSTtDQUNwQixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gSlhFU3RhdGUge1xyXG4gIC8qKiDlvoXmnLogKi9cclxuICBJZGxlID0gMCxcclxuICAvKirotbfpo5sgKi9cclxuICBUYWtlT2ZmLFxyXG4gIC8qKumjm+ihjCAqL1xyXG4gIEZseSxcclxuICAvKirlj6DliqAgKi9cclxuICBPdmVybGF5LFxyXG4gIEhpdCxcclxuICAvKiog6LeR77yI5Zue5ZCI5peg5q2k54q25oCB77yJICovXHJcbiAgUnVuLFxyXG4gIC8qKiDmrbvkuqEgKi9cclxuICBEZWF0aCxcclxuICAvKiog56iL5bqP55SoICovXHJcbiAgR2xvYmFsLFxyXG59XHJcblxyXG4vKirmlYjmnpwgKi9cclxuZXhwb3J0IGVudW0gSlhCdGxCRU1UIHtcclxuICAvKirnpoHmraLotbfpo57lm57lkIggKi9cclxuICBCYW5UYWtlT2ZmID0gMSxcclxuICAvKirnpoHmraLooYzliqggKi9cclxuICBCYW5Nb3ZlID0gMixcclxuICAvKirln4vngrjlvLkgKi9cclxuICBNaW5lcyxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEpYRUFuaU5hbWVzID0ge1xyXG4gIC8qKuW+heacuiAqL1xyXG4gIGlkbGU6IFwiZGFpamlcIixcclxuICAvKirlj6DliqAgKi9cclxuICBkaWVqaWE6IFwiZGllamlhXCIsXHJcbiAgLyoq5aWU6LeRICovXHJcbiAgcnVuOiBcInBlbnNoZTFcIixcclxuICAvKirpo57ooYzllrflsIQqL1xyXG4gIGZseTogXCJwZW5zaGUyXCIsXHJcbiAgLyoq6LW36aOeICovXHJcbiAgcWlmZWk6IFwicHV0b25ncWlmZWlcIixcclxuICAvKirmtojlpLEgKi9cclxuICB4aWFvc2hpOiBcInhpYW9zaGlcIixcclxuICBjaHV4aWFuOiBcImNodXhpYW5cIixcclxuICB6aHVhbmdmZWk6IFwiemh1YW5nZmVpMlwiLFxyXG4gIC8qKuatu+S6oSAqL1xyXG4gIGRpZTogXCJ4aWFvc2hpXCIsXHJcbn07XHJcblxyXG5leHBvcnQgZW51bSBKWEVEaXIge1xyXG4gIC8qKiDlj7PkuIrop5IgKi9cclxuICBCbHVlID0gMSxcclxuICAvKirlt6bkuIvop5IgKi9cclxuICBSZWQsXHJcbiAgLyoq5bem5LiK6KeSICovXHJcbiAgWWVsbG93LFxyXG4gIC8qKuWPs+S4i+inkiAqL1xyXG4gIEdyZWVuLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUk9MRV9DT01QX05BTUU6IHsgW2tleTogbnVtYmVyXTogc3RyaW5nIH0gPSB7XHJcbiAgMTogXCLok53mlrlcIixcclxuICAyOiBcIue6ouaWuVwiLFxyXG4gIDM6IFwi6buE5pa5XCIsXHJcbiAgNDogXCLnu7/mlrlcIixcclxufTtcclxuZXhwb3J0IGNvbnN0IEJpcnRoQW5nbGU6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0gPSB7XHJcbiAgW0pYRURpci5CbHVlXTogNDUsXHJcbiAgW0pYRURpci5SZWRdOiAtNjAsXHJcbiAgW0pYRURpci5ZZWxsb3ddOiAtMjMwLFxyXG4gIFtKWEVEaXIuR3JlZW5dOiAtMTQwLFxyXG59O1xyXG5leHBvcnQgY29uc3QgUk9MRV9TVEFSVF9QT1M6IHsgW2tleTogbnVtYmVyXTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IH0gPSB7XHJcbiAgW0pYRURpci5CbHVlXToge1xyXG4gICAgeDogMTI5NSxcclxuICAgIHk6IDk2LFxyXG4gIH0sXHJcbiAgW0pYRURpci5SZWRdOiB7XHJcbiAgICB4OiAzMTAsXHJcbiAgICB5OiAzMjcsXHJcbiAgfSxcclxuICBbSlhFRGlyLlllbGxvd106IHtcclxuICAgIHg6IDE2MjEsXHJcbiAgICB5OiA3MzMsXHJcbiAgfSxcclxuICBbSlhFRGlyLkdyZWVuXToge1xyXG4gICAgeDogNjAzLFxyXG4gICAgeTogOTQ1LFxyXG4gIH0sXHJcbn07XHJcbi8vIOmjnuacuui1t+Wni+S9jee9rlxyXG5leHBvcnQgY29uc3QgUk9MRV9CT1JOX1BPUzogeyBba2V5OiBudW1iZXJdOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSB9ID0ge1xyXG4gIC8vIDE6IFsxMzEzLCAxNDEzLCAxMzEyLCAxNDEyXSxcclxuICBbSlhFRGlyLkJsdWVdOiBbXHJcbiAgICB7XHJcbiAgICAgIHg6IDk1OSxcclxuICAgICAgeTogMTg0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTA0NCxcclxuICAgICAgeTogMTM1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTEzMCxcclxuICAgICAgeTogMTg0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTA0NSxcclxuICAgICAgeTogMjI4LFxyXG4gICAgfSxcclxuICBdLFxyXG4gIFtKWEVEaXIuUmVkXTogW1xyXG4gICAge1xyXG4gICAgICB4OiAyOTYsXHJcbiAgICAgIHk6IDQ4OCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDM4MSxcclxuICAgICAgeTogNDQwLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDY2LFxyXG4gICAgICB5OiA0ODgsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAzODIsXHJcbiAgICAgIHk6IDUzMixcclxuICAgIH0sXHJcbiAgXSxcclxuICBbSlhFRGlyLlllbGxvd106IFtcclxuICAgIHtcclxuICAgICAgeDogMTQ0OSxcclxuICAgICAgeTogNjA1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTUzMyxcclxuICAgICAgeTogNTU2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTYxOSxcclxuICAgICAgeTogNjA1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTUzNCxcclxuICAgICAgeTogNjQ5LFxyXG4gICAgfSxcclxuICBdLFxyXG4gIFtKWEVEaXIuR3JlZW5dOiBbXHJcbiAgICB7XHJcbiAgICAgIHg6IDc5MyxcclxuICAgICAgeTogOTA2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogODc4LFxyXG4gICAgICB5OiA4NTcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA5NjQsXHJcbiAgICAgIHk6IDkwNixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDg3OSxcclxuICAgICAgeTogOTUwLFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5leHBvcnQgY29uc3QgUk9MRV9ST0FEOiB7XHJcbiAgW2tleTogbnVtYmVyXTogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgaW5kZXg6IG51bWJlciB9W107XHJcbn0gPSB7XHJcbiAgLy8gIEJsdWVcclxuICBbSlhFRGlyLkJsdWVdOiBbXHJcbiAgICB7XHJcbiAgICAgIHg6IDEzMzEsXHJcbiAgICAgIHk6IDIyMyxcclxuICAgICAgaW5kZXg6IDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMjU3LFxyXG4gICAgICB5OiAyNjYsXHJcbiAgICAgIGluZGV4OiAyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTE4MyxcclxuICAgICAgeTogMzEwLFxyXG4gICAgICBpbmRleDogMyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExMTAsXHJcbiAgICAgIHk6IDM1NSxcclxuICAgICAgaW5kZXg6IDQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMDM2LFxyXG4gICAgICB5OiAzOTksXHJcbiAgICAgIGluZGV4OiA1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogODk1LFxyXG4gICAgICB5OiA0MDgsXHJcbiAgICAgIGluZGV4OiA2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogODE5LFxyXG4gICAgICB5OiAzNjIsXHJcbiAgICAgIGluZGV4OiA3LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzQ0LFxyXG4gICAgICB5OiAzMTcsXHJcbiAgICAgIGluZGV4OiA4LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNjY3LFxyXG4gICAgICB5OiAyNzEsXHJcbiAgICAgIGluZGV4OiA5LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTkwLFxyXG4gICAgICB5OiAyMjQsXHJcbiAgICAgIGluZGV4OiAxMCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDUxMixcclxuICAgICAgeTogMTc3LFxyXG4gICAgICBpbmRleDogMTEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA0MzIsXHJcbiAgICAgIHk6IDIyNCxcclxuICAgICAgaW5kZXg6IDEyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMzY0LFxyXG4gICAgICB5OiAyNjksXHJcbiAgICAgIGluZGV4OiAxMyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDQ0MixcclxuICAgICAgeTogMzE2LFxyXG4gICAgICBpbmRleDogMTQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1MTksXHJcbiAgICAgIHk6IDM2MixcclxuICAgICAgaW5kZXg6IDE1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTk2LFxyXG4gICAgICB5OiA0MDcsXHJcbiAgICAgIGluZGV4OiAxNixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDY3MixcclxuICAgICAgeTogNDUyLFxyXG4gICAgICBpbmRleDogMTcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA3NDgsXHJcbiAgICAgIHk6IDQ5NyxcclxuICAgICAgaW5kZXg6IDE4LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzM3LFxyXG4gICAgICB5OiA1NzgsXHJcbiAgICAgIGluZGV4OiAxOSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDY2MixcclxuICAgICAgeTogNjI0LFxyXG4gICAgICBpbmRleDogMjAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1ODcsXHJcbiAgICAgIHk6IDY2OSxcclxuICAgICAgaW5kZXg6IDIxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTEyLFxyXG4gICAgICB5OiA3MTUsXHJcbiAgICAgIGluZGV4OiAyMixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDQzNixcclxuICAgICAgeTogNzYxLFxyXG4gICAgICBpbmRleDogMjMsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAzNjAsXHJcbiAgICAgIHk6IDgwNyxcclxuICAgICAgaW5kZXg6IDI0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDQzLFxyXG4gICAgICB5OiA4NjIsXHJcbiAgICAgIGluZGV4OiAyNSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDQ5OCxcclxuICAgICAgeTogOTAzLFxyXG4gICAgICBpbmRleDogMjYsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1NzQsXHJcbiAgICAgIHk6IDg1NixcclxuICAgICAgaW5kZXg6IDI3LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNjUxLFxyXG4gICAgICB5OiA4MTAsXHJcbiAgICAgIGluZGV4OiAyOCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDcyNyxcclxuICAgICAgeTogNzY0LFxyXG4gICAgICBpbmRleDogMjksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA4MDMsXHJcbiAgICAgIHk6IDcxOCxcclxuICAgICAgaW5kZXg6IDMwLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogODc5LFxyXG4gICAgICB5OiA2NzIsXHJcbiAgICAgIGluZGV4OiAzMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEwNDIsXHJcbiAgICAgIHk6IDY3MSxcclxuICAgICAgaW5kZXg6IDMyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTExMyxcclxuICAgICAgeTogNzEzLFxyXG4gICAgICBpbmRleDogMzMsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTg0LFxyXG4gICAgICB5OiA3NTUsXHJcbiAgICAgIGluZGV4OiAzNCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEyNTUsXHJcbiAgICAgIHk6IDc5NixcclxuICAgICAgaW5kZXg6IDM1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTMyNCxcclxuICAgICAgeTogODM3LFxyXG4gICAgICBpbmRleDogMzYsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMzkzLFxyXG4gICAgICB5OiA4NzcsXHJcbiAgICAgIGluZGV4OiAzNyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0NzAsXHJcbiAgICAgIHk6IDg1MCxcclxuICAgICAgaW5kZXg6IDM4LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTUzOCxcclxuICAgICAgeTogNzkyLFxyXG4gICAgICBpbmRleDogMzksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDY5LFxyXG4gICAgICB5OiA3NTEsXHJcbiAgICAgIGluZGV4OiA0MCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0MDAsXHJcbiAgICAgIHk6IDcxMCxcclxuICAgICAgaW5kZXg6IDQxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTMzMCxcclxuICAgICAgeTogNjY4LFxyXG4gICAgICBpbmRleDogNDIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMjU5LFxyXG4gICAgICB5OiA2MjYsXHJcbiAgICAgIGluZGV4OiA0MyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExODgsXHJcbiAgICAgIHk6IDU4MyxcclxuICAgICAgaW5kZXg6IDQ0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTE4MSxcclxuICAgICAgeTogNDkxLFxyXG4gICAgICBpbmRleDogNDUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMjU2LFxyXG4gICAgICB5OiA0NDYsXHJcbiAgICAgIGluZGV4OiA0NixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEzMzEsXHJcbiAgICAgIHk6IDQwMSxcclxuICAgICAgaW5kZXg6IDQ3LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTQwNSxcclxuICAgICAgeTogMzU3LFxyXG4gICAgICBpbmRleDogNDgsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDc5LFxyXG4gICAgICB5OiAzMTMsXHJcbiAgICAgIGluZGV4OiA0OSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE1NTQsXHJcbiAgICAgIHk6IDI2OSxcclxuICAgICAgaW5kZXg6IDUwLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTQ4MyxcclxuICAgICAgeTogMjI4LFxyXG4gICAgICBpbmRleDogNTEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDEwLFxyXG4gICAgICB5OiAyNzEsXHJcbiAgICAgIGluZGV4OiA1MixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEzMzcsXHJcbiAgICAgIHk6IDMxNixcclxuICAgICAgaW5kZXg6IDUzLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTI2NCxcclxuICAgICAgeTogMzYwLFxyXG4gICAgICBpbmRleDogNTQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTkwLFxyXG4gICAgICB5OiA0MDUsXHJcbiAgICAgIGluZGV4OiA1NSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExMTYsXHJcbiAgICAgIHk6IDQ1MCxcclxuICAgICAgaW5kZXg6IDU2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogOTY4LFxyXG4gICAgICB5OiA1NDgsXHJcbiAgICAgIGluZGV4OiA1NyxcclxuICAgIH0sXHJcbiAgXSxcclxuICAvLyBSZWRcclxuICBbSlhFRGlyLlJlZF06IFtcclxuICAgIHtcclxuICAgICAgeDogNDQyLFxyXG4gICAgICB5OiAzMTYsXHJcbiAgICAgIGluZGV4OiAxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTE5LFxyXG4gICAgICB5OiAzNjIsXHJcbiAgICAgIGluZGV4OiAyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTk2LFxyXG4gICAgICB5OiA0MDcsXHJcbiAgICAgIGluZGV4OiAzLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNjcyLFxyXG4gICAgICB5OiA0NTIsXHJcbiAgICAgIGluZGV4OiA0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzQ4LFxyXG4gICAgICB5OiA0OTcsXHJcbiAgICAgIGluZGV4OiA1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzM3LFxyXG4gICAgICB5OiA1NzgsXHJcbiAgICAgIGluZGV4OiA2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNjYyLFxyXG4gICAgICB5OiA2MjQsXHJcbiAgICAgIGluZGV4OiA3LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTg3LFxyXG4gICAgICB5OiA2NjksXHJcbiAgICAgIGluZGV4OiA4LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTEyLFxyXG4gICAgICB5OiA3MTUsXHJcbiAgICAgIGluZGV4OiA5LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDM2LFxyXG4gICAgICB5OiA3NjEsXHJcbiAgICAgIGluZGV4OiAxMCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDM2MCxcclxuICAgICAgeTogODA3LFxyXG4gICAgICBpbmRleDogMTEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA0NDMsXHJcbiAgICAgIHk6IDg2MixcclxuICAgICAgaW5kZXg6IDEyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDk4LFxyXG4gICAgICB5OiA5MDMsXHJcbiAgICAgIGluZGV4OiAxMyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDU3NCxcclxuICAgICAgeTogODU2LFxyXG4gICAgICBpbmRleDogMTQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA2NTEsXHJcbiAgICAgIHk6IDgxMCxcclxuICAgICAgaW5kZXg6IDE1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzI3LFxyXG4gICAgICB5OiA3NjQsXHJcbiAgICAgIGluZGV4OiAxNixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDgwMyxcclxuICAgICAgeTogNzE4LFxyXG4gICAgICBpbmRleDogMTcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA4NzksXHJcbiAgICAgIHk6IDY3MixcclxuICAgICAgaW5kZXg6IDE4LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTA0MixcclxuICAgICAgeTogNjcxLFxyXG4gICAgICBpbmRleDogMTksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTEzLFxyXG4gICAgICB5OiA3MTMsXHJcbiAgICAgIGluZGV4OiAyMCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExODQsXHJcbiAgICAgIHk6IDc1NSxcclxuICAgICAgaW5kZXg6IDIxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTI1NSxcclxuICAgICAgeTogNzk2LFxyXG4gICAgICBpbmRleDogMjIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMzI0LFxyXG4gICAgICB5OiA4MzcsXHJcbiAgICAgIGluZGV4OiAyMyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEzOTMsXHJcbiAgICAgIHk6IDg3NyxcclxuICAgICAgaW5kZXg6IDI0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTQ3MCxcclxuICAgICAgeTogODUwLFxyXG4gICAgICBpbmRleDogMjUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNTM4LFxyXG4gICAgICB5OiA3OTIsXHJcbiAgICAgIGluZGV4OiAyNixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0NjksXHJcbiAgICAgIHk6IDc1MSxcclxuICAgICAgaW5kZXg6IDI3LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTQwMCxcclxuICAgICAgeTogNzEwLFxyXG4gICAgICBpbmRleDogMjgsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMzMwLFxyXG4gICAgICB5OiA2NjgsXHJcbiAgICAgIGluZGV4OiAyOSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEyNTksXHJcbiAgICAgIHk6IDYyNixcclxuICAgICAgaW5kZXg6IDMwLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTE4OCxcclxuICAgICAgeTogNTgzLFxyXG4gICAgICBpbmRleDogMzEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTgxLFxyXG4gICAgICB5OiA0OTEsXHJcbiAgICAgIGluZGV4OiAzMixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEyNTYsXHJcbiAgICAgIHk6IDQ0NixcclxuICAgICAgaW5kZXg6IDMzLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTMzMSxcclxuICAgICAgeTogNDAxLFxyXG4gICAgICBpbmRleDogMzQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDA1LFxyXG4gICAgICB5OiAzNTcsXHJcbiAgICAgIGluZGV4OiAzNSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0NzksXHJcbiAgICAgIHk6IDMxMyxcclxuICAgICAgaW5kZXg6IDM2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTU1NCxcclxuICAgICAgeTogMjY5LFxyXG4gICAgICBpbmRleDogMzcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDgzLFxyXG4gICAgICB5OiAyMjgsXHJcbiAgICAgIGluZGV4OiAzOCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0MDQsXHJcbiAgICAgIHk6IDE3OSxcclxuICAgICAgaW5kZXg6IDM5LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTMzMSxcclxuICAgICAgeTogMjIzLFxyXG4gICAgICBpbmRleDogNDAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMjU3LFxyXG4gICAgICB5OiAyNjYsXHJcbiAgICAgIGluZGV4OiA0MSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExODMsXHJcbiAgICAgIHk6IDMxMCxcclxuICAgICAgaW5kZXg6IDQyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTExMCxcclxuICAgICAgeTogMzU1LFxyXG4gICAgICBpbmRleDogNDMsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMDM2LFxyXG4gICAgICB5OiAzOTksXHJcbiAgICAgIGluZGV4OiA0NCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDg5NSxcclxuICAgICAgeTogNDA4LFxyXG4gICAgICBpbmRleDogNDUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA4MTksXHJcbiAgICAgIHk6IDM2MixcclxuICAgICAgaW5kZXg6IDQ2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzQ0LFxyXG4gICAgICB5OiAzMTcsXHJcbiAgICAgIGluZGV4OiA0NyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDY2NyxcclxuICAgICAgeTogMjcxLFxyXG4gICAgICBpbmRleDogNDgsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1OTAsXHJcbiAgICAgIHk6IDIyNCxcclxuICAgICAgaW5kZXg6IDQ5LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTEyLFxyXG4gICAgICB5OiAxNzcsXHJcbiAgICAgIGluZGV4OiA1MCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDQzMixcclxuICAgICAgeTogMjI0LFxyXG4gICAgICBpbmRleDogNTEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1MTEsXHJcbiAgICAgIHk6IDI3MixcclxuICAgICAgaW5kZXg6IDUyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTg5LFxyXG4gICAgICB5OiAzMjAsXHJcbiAgICAgIGluZGV4OiA1MyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDY2NyxcclxuICAgICAgeTogMzY2LFxyXG4gICAgICBpbmRleDogNTQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA3NDMsXHJcbiAgICAgIHk6IDQxMyxcclxuICAgICAgaW5kZXg6IDU1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogODE5LFxyXG4gICAgICB5OiA0NTksXHJcbiAgICAgIGluZGV4OiA1NixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDk2OCxcclxuICAgICAgeTogNTQ4LFxyXG4gICAgICBpbmRleDogNTcsXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgLy8gWWVsbG93XHJcbiAgW0pYRURpci5ZZWxsb3ddOiBbXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0NjksXHJcbiAgICAgIHk6IDc1MSxcclxuICAgICAgaW5kZXg6IDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDAwLFxyXG4gICAgICB5OiA3MTAsXHJcbiAgICAgIGluZGV4OiAyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTMzMCxcclxuICAgICAgeTogNjY4LFxyXG4gICAgICBpbmRleDogMyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEyNTksXHJcbiAgICAgIHk6IDYyNixcclxuICAgICAgaW5kZXg6IDQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTg4LFxyXG4gICAgICB5OiA1ODMsXHJcbiAgICAgIGluZGV4OiA1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTE4MSxcclxuICAgICAgeTogNDkxLFxyXG4gICAgICBpbmRleDogNixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEyNTYsXHJcbiAgICAgIHk6IDQ0NixcclxuICAgICAgaW5kZXg6IDcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMzMxLFxyXG4gICAgICB5OiA0MDEsXHJcbiAgICAgIGluZGV4OiA4LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTQwNSxcclxuICAgICAgeTogMzU3LFxyXG4gICAgICBpbmRleDogOSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0NzksXHJcbiAgICAgIHk6IDMxMyxcclxuICAgICAgaW5kZXg6IDEwLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTU1NCxcclxuICAgICAgeTogMjY5LFxyXG4gICAgICBpbmRleDogMTEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDgzLFxyXG4gICAgICB5OiAyMjgsXHJcbiAgICAgIGluZGV4OiAxMixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0MDQsXHJcbiAgICAgIHk6IDE3OSxcclxuICAgICAgaW5kZXg6IDEzLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTMzMSxcclxuICAgICAgeTogMjIzLFxyXG4gICAgICBpbmRleDogMTQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMjU3LFxyXG4gICAgICB5OiAyNjYsXHJcbiAgICAgIGluZGV4OiAxNSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExODMsXHJcbiAgICAgIHk6IDMxMCxcclxuICAgICAgaW5kZXg6IDE2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTExMCxcclxuICAgICAgeTogMzU1LFxyXG4gICAgICBpbmRleDogMTcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMDM2LFxyXG4gICAgICB5OiAzOTksXHJcbiAgICAgIGluZGV4OiAxOCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDg5NSxcclxuICAgICAgeTogNDA4LFxyXG4gICAgICBpbmRleDogMTksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA4MTksXHJcbiAgICAgIHk6IDM2MixcclxuICAgICAgaW5kZXg6IDIwLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzQ0LFxyXG4gICAgICB5OiAzMTcsXHJcbiAgICAgIGluZGV4OiAyMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDY2NyxcclxuICAgICAgeTogMjcxLFxyXG4gICAgICBpbmRleDogMjIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1OTAsXHJcbiAgICAgIHk6IDIyNCxcclxuICAgICAgaW5kZXg6IDIzLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTEyLFxyXG4gICAgICB5OiAxNzcsXHJcbiAgICAgIGluZGV4OiAyNCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDQzMixcclxuICAgICAgeTogMjI0LFxyXG4gICAgICBpbmRleDogMjUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAzNjQsXHJcbiAgICAgIHk6IDI2OSxcclxuICAgICAgaW5kZXg6IDI2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDQyLFxyXG4gICAgICB5OiAzMTYsXHJcbiAgICAgIGluZGV4OiAyNyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDUxOSxcclxuICAgICAgeTogMzYyLFxyXG4gICAgICBpbmRleDogMjgsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1OTYsXHJcbiAgICAgIHk6IDQwNyxcclxuICAgICAgaW5kZXg6IDI5LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNjcyLFxyXG4gICAgICB5OiA0NTIsXHJcbiAgICAgIGluZGV4OiAzMCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDc0OCxcclxuICAgICAgeTogNDk3LFxyXG4gICAgICBpbmRleDogMzEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA3MzcsXHJcbiAgICAgIHk6IDU3OCxcclxuICAgICAgaW5kZXg6IDMyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNjYyLFxyXG4gICAgICB5OiA2MjQsXHJcbiAgICAgIGluZGV4OiAzMyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDU4NyxcclxuICAgICAgeTogNjY5LFxyXG4gICAgICBpbmRleDogMzQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1MTIsXHJcbiAgICAgIHk6IDcxNSxcclxuICAgICAgaW5kZXg6IDM1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDM2LFxyXG4gICAgICB5OiA3NjEsXHJcbiAgICAgIGluZGV4OiAzNixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDM2MCxcclxuICAgICAgeTogODA3LFxyXG4gICAgICBpbmRleDogMzcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA0NDMsXHJcbiAgICAgIHk6IDg2MixcclxuICAgICAgaW5kZXg6IDM4LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDk4LFxyXG4gICAgICB5OiA5MDMsXHJcbiAgICAgIGluZGV4OiAzOSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDU3NCxcclxuICAgICAgeTogODU2LFxyXG4gICAgICBpbmRleDogNDAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA2NTEsXHJcbiAgICAgIHk6IDgxMCxcclxuICAgICAgaW5kZXg6IDQxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzI3LFxyXG4gICAgICB5OiA3NjQsXHJcbiAgICAgIGluZGV4OiA0MixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDgwMyxcclxuICAgICAgeTogNzE4LFxyXG4gICAgICBpbmRleDogNDMsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA4NzksXHJcbiAgICAgIHk6IDY3MixcclxuICAgICAgaW5kZXg6IDQ0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTA0MixcclxuICAgICAgeTogNjcxLFxyXG4gICAgICBpbmRleDogNDUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTEzLFxyXG4gICAgICB5OiA3MTMsXHJcbiAgICAgIGluZGV4OiA0NixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExODQsXHJcbiAgICAgIHk6IDc1NSxcclxuICAgICAgaW5kZXg6IDQ3LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTI1NSxcclxuICAgICAgeTogNzk2LFxyXG4gICAgICBpbmRleDogNDgsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMzI0LFxyXG4gICAgICB5OiA4MzcsXHJcbiAgICAgIGluZGV4OiA0OSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEzOTMsXHJcbiAgICAgIHk6IDg3NyxcclxuICAgICAgaW5kZXg6IDUwLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTQ3MCxcclxuICAgICAgeTogODUwLFxyXG4gICAgICBpbmRleDogNTEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDAwLFxyXG4gICAgICB5OiA4MDgsXHJcbiAgICAgIGluZGV4OiA1MixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEzMzAsXHJcbiAgICAgIHk6IDc2NixcclxuICAgICAgaW5kZXg6IDUzLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTI1OSxcclxuICAgICAgeTogNzI0LFxyXG4gICAgICBpbmRleDogNTQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTg4LFxyXG4gICAgICB5OiA2ODEsXHJcbiAgICAgIGluZGV4OiA1NSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExMTUsXHJcbiAgICAgIHk6IDYzNyxcclxuICAgICAgaW5kZXg6IDU2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogOTY4LFxyXG4gICAgICB5OiA1NDgsXHJcbiAgICAgIGluZGV4OiA1NyxcclxuICAgIH0sXHJcbiAgXSxcclxuICAvLyBHcmVlblxyXG4gIFtKWEVEaXIuR3JlZW5dOiBbXHJcbiAgICB7XHJcbiAgICAgIHg6IDU3NCxcclxuICAgICAgeTogODU2LFxyXG4gICAgICBpbmRleDogMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDY1MSxcclxuICAgICAgeTogODEwLFxyXG4gICAgICBpbmRleDogMixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDcyNyxcclxuICAgICAgeTogNzY0LFxyXG4gICAgICBpbmRleDogMyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDgwMyxcclxuICAgICAgeTogNzE4LFxyXG4gICAgICBpbmRleDogNCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDg3OSxcclxuICAgICAgeTogNjcyLFxyXG4gICAgICBpbmRleDogNSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEwNDIsXHJcbiAgICAgIHk6IDY3MSxcclxuICAgICAgaW5kZXg6IDYsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTEzLFxyXG4gICAgICB5OiA3MTMsXHJcbiAgICAgIGluZGV4OiA3LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTE4NCxcclxuICAgICAgeTogNzU1LFxyXG4gICAgICBpbmRleDogOCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEyNTUsXHJcbiAgICAgIHk6IDc5NixcclxuICAgICAgaW5kZXg6IDksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMzI0LFxyXG4gICAgICB5OiA4MzcsXHJcbiAgICAgIGluZGV4OiAxMCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEzOTMsXHJcbiAgICAgIHk6IDg3NyxcclxuICAgICAgaW5kZXg6IDExLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTQ3MCxcclxuICAgICAgeTogODUwLFxyXG4gICAgICBpbmRleDogMTIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNTM4LFxyXG4gICAgICB5OiA3OTIsXHJcbiAgICAgIGluZGV4OiAxMyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0NjksXHJcbiAgICAgIHk6IDc1MSxcclxuICAgICAgaW5kZXg6IDE0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTQwMCxcclxuICAgICAgeTogNzEwLFxyXG4gICAgICBpbmRleDogMTUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMzMwLFxyXG4gICAgICB5OiA2NjgsXHJcbiAgICAgIGluZGV4OiAxNixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEyNTksXHJcbiAgICAgIHk6IDYyNixcclxuICAgICAgaW5kZXg6IDE3LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTE4OCxcclxuICAgICAgeTogNTgzLFxyXG4gICAgICBpbmRleDogMTgsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMTgxLFxyXG4gICAgICB5OiA0OTEsXHJcbiAgICAgIGluZGV4OiAxOSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDEyNTYsXHJcbiAgICAgIHk6IDQ0NixcclxuICAgICAgaW5kZXg6IDIwLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTMzMSxcclxuICAgICAgeTogNDAxLFxyXG4gICAgICBpbmRleDogMjEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDA1LFxyXG4gICAgICB5OiAzNTcsXHJcbiAgICAgIGluZGV4OiAyMixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0NzksXHJcbiAgICAgIHk6IDMxMyxcclxuICAgICAgaW5kZXg6IDIzLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTU1NCxcclxuICAgICAgeTogMjY5LFxyXG4gICAgICBpbmRleDogMjQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxNDgzLFxyXG4gICAgICB5OiAyMjgsXHJcbiAgICAgIGluZGV4OiAyNSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDE0MDQsXHJcbiAgICAgIHk6IDE3OSxcclxuICAgICAgaW5kZXg6IDI2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTMzMSxcclxuICAgICAgeTogMjIzLFxyXG4gICAgICBpbmRleDogMjcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMjU3LFxyXG4gICAgICB5OiAyNjYsXHJcbiAgICAgIGluZGV4OiAyOCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDExODMsXHJcbiAgICAgIHk6IDMxMCxcclxuICAgICAgaW5kZXg6IDI5LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogMTExMCxcclxuICAgICAgeTogMzU1LFxyXG4gICAgICBpbmRleDogMzAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAxMDM2LFxyXG4gICAgICB5OiAzOTksXHJcbiAgICAgIGluZGV4OiAzMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDg5NSxcclxuICAgICAgeTogNDA4LFxyXG4gICAgICBpbmRleDogMzIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA4MTksXHJcbiAgICAgIHk6IDM2MixcclxuICAgICAgaW5kZXg6IDMzLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzQ0LFxyXG4gICAgICB5OiAzMTcsXHJcbiAgICAgIGluZGV4OiAzNCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDY2NyxcclxuICAgICAgeTogMjcxLFxyXG4gICAgICBpbmRleDogMzUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1OTAsXHJcbiAgICAgIHk6IDIyNCxcclxuICAgICAgaW5kZXg6IDM2LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTEyLFxyXG4gICAgICB5OiAxNzcsXHJcbiAgICAgIGluZGV4OiAzNyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDQzMixcclxuICAgICAgeTogMjI0LFxyXG4gICAgICBpbmRleDogMzgsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiAzNjQsXHJcbiAgICAgIHk6IDI2OSxcclxuICAgICAgaW5kZXg6IDM5LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDQyLFxyXG4gICAgICB5OiAzMTYsXHJcbiAgICAgIGluZGV4OiA0MCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDUxOSxcclxuICAgICAgeTogMzYyLFxyXG4gICAgICBpbmRleDogNDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1OTYsXHJcbiAgICAgIHk6IDQwNyxcclxuICAgICAgaW5kZXg6IDQyLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNjcyLFxyXG4gICAgICB5OiA0NTIsXHJcbiAgICAgIGluZGV4OiA0MyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDc0OCxcclxuICAgICAgeTogNDk3LFxyXG4gICAgICBpbmRleDogNDQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA3MzcsXHJcbiAgICAgIHk6IDU3OCxcclxuICAgICAgaW5kZXg6IDQ1LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNjYyLFxyXG4gICAgICB5OiA2MjQsXHJcbiAgICAgIGluZGV4OiA0NixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDU4NyxcclxuICAgICAgeTogNjY5LFxyXG4gICAgICBpbmRleDogNDcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA1MTIsXHJcbiAgICAgIHk6IDcxNSxcclxuICAgICAgaW5kZXg6IDQ4LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNDM2LFxyXG4gICAgICB5OiA3NjEsXHJcbiAgICAgIGluZGV4OiA0OSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDM2MCxcclxuICAgICAgeTogODA3LFxyXG4gICAgICBpbmRleDogNTAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA0NDMsXHJcbiAgICAgIHk6IDg2MixcclxuICAgICAgaW5kZXg6IDUxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNTE5LFxyXG4gICAgICB5OiA4MTUsXHJcbiAgICAgIGluZGV4OiA1MixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDU5NCxcclxuICAgICAgeTogNzY5LFxyXG4gICAgICBpbmRleDogNTMsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA2NjksXHJcbiAgICAgIHk6IDcyMyxcclxuICAgICAgaW5kZXg6IDU0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgeDogNzQ0LFxyXG4gICAgICB5OiA2NzcsXHJcbiAgICAgIGluZGV4OiA1NSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHg6IDgxOSxcclxuICAgICAgeTogNjMxLFxyXG4gICAgICBpbmRleDogNTYsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB4OiA5NjgsXHJcbiAgICAgIHk6IDU0OCxcclxuICAgICAgaW5kZXg6IDU3LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5leHBvcnQgY29uc3QgUk9MRV9OQU1FX1BSRUZJWCA9IFwiSlhSQlJvbGVcIjtcclxuZXhwb3J0IGNvbnN0IElDYW1wS2V5Q29kZSA9IDEwMDtcclxuXHJcbi8qKiBKWEJhdHRsZSBQYXJ0cyAqL1xyXG5leHBvcnQgY29uc3QgSlhCdGxQcyA9IHtcclxuICBJbnZhbGlkOiAtMSxcclxuICBJbnZhbGlkU3RyaW5nOiBcIi0xXCIsXHJcbn07XHJcbmV4cG9ydCBjb25zdCBSb2xlTnVtYmVyID0gNDtcclxuIl19