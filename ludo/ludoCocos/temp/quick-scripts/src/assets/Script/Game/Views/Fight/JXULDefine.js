"use strict";
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