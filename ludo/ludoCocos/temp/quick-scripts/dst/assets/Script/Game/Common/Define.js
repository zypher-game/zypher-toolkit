
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Common/Define.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d3bbk7NUhFHq7Urt6847MN', 'Define');
// Script/Game/Common/Define.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KF = exports.CMsg = exports.rewardWind = exports.rewardType = exports.npc = exports.taskState = exports.taskType = exports.levelBoxItem = exports.rankLvBoxItem = exports.RedpointEffect = exports.CHECK_TIME = exports.PointInfo = exports.PART_BTL_SCENE = exports.ToastType = exports.RANKLV = exports.ITEMTYPE = exports.CompareEnum = exports.LoadingType = exports.ITEM_DETAIL_FLAG = exports.RPointMask = exports.Channel = exports.MapLayer = exports.GRID_TYPE = exports.MATERIAL_INFO = exports.GRID_INFO = exports.INFO_TYPE = void 0;
var CoreDefine_1 = require("./../../Core/CoreDefine");
/**地块信息类型 */
var INFO_TYPE;
(function (INFO_TYPE) {
    INFO_TYPE[INFO_TYPE["GRID"] = 0] = "GRID";
    INFO_TYPE[INFO_TYPE["MATERIAL"] = 1] = "MATERIAL";
    INFO_TYPE[INFO_TYPE["TARGET"] = 2] = "TARGET";
})(INFO_TYPE = exports.INFO_TYPE || (exports.INFO_TYPE = {}));
/**地块数据 */
var GRID_INFO;
(function (GRID_INFO) {
    GRID_INFO[GRID_INFO["ID"] = 0] = "ID";
    GRID_INFO[GRID_INFO["POSITION"] = 1] = "POSITION";
    GRID_INFO[GRID_INFO["INFO"] = 2] = "INFO";
    GRID_INFO[GRID_INFO["ZINDEX"] = 3] = "ZINDEX";
    GRID_INFO[GRID_INFO["MATERIAL"] = 4] = "MATERIAL";
})(GRID_INFO = exports.GRID_INFO || (exports.GRID_INFO = {}));
/**材料 */
var MATERIAL_INFO;
(function (MATERIAL_INFO) {
    MATERIAL_INFO[MATERIAL_INFO["TYPE"] = 0] = "TYPE";
    MATERIAL_INFO[MATERIAL_INFO["POSITION"] = 1] = "POSITION";
    MATERIAL_INFO[MATERIAL_INFO["SCALE"] = 2] = "SCALE";
    MATERIAL_INFO[MATERIAL_INFO["ZINDEX"] = 3] = "ZINDEX";
})(MATERIAL_INFO = exports.MATERIAL_INFO || (exports.MATERIAL_INFO = {}));
var GRID_TYPE;
(function (GRID_TYPE) {
    //虚空
    GRID_TYPE[GRID_TYPE["VOID"] = 0] = "VOID";
    //蓝色
    GRID_TYPE[GRID_TYPE["BULE"] = 1] = "BULE";
    //红色
    GRID_TYPE[GRID_TYPE["RED"] = 2] = "RED";
    //黄色
    GRID_TYPE[GRID_TYPE["YELLO"] = 3] = "YELLO";
    //绿色
    GRID_TYPE[GRID_TYPE["GREEN"] = 4] = "GREEN";
    //通用
    GRID_TYPE[GRID_TYPE["COMMON"] = 5] = "COMMON";
})(GRID_TYPE = exports.GRID_TYPE || (exports.GRID_TYPE = {}));
/** */
var MapLayer;
(function (MapLayer) {
    /**地表 */
    MapLayer[MapLayer["MLBase"] = 0] = "MLBase";
    /** 地块 */
    MapLayer[MapLayer["MLGrid"] = 1] = "MLGrid";
    /**素材层 */
    MapLayer[MapLayer["MLMaterial"] = 2] = "MLMaterial";
    /** 触摸层 */
    MapLayer[MapLayer["MLTouch"] = 3] = "MLTouch";
    /** 效果层1 用于显示选中*/
    MapLayer[MapLayer["MLEffect_Dowm"] = 4] = "MLEffect_Dowm";
    /**效果层2 */
    MapLayer[MapLayer["MLEffect_Up"] = 5] = "MLEffect_Up";
    /** 地块逻辑UI层 */
    MapLayer[MapLayer["MElementUI"] = 6] = "MElementUI";
    /** 开发的时候测试层 */
    MapLayer[MapLayer["TestLayer"] = 7] = "TestLayer";
})(MapLayer = exports.MapLayer || (exports.MapLayer = {}));
/**渠道 */
var Channel;
(function (Channel) {
    /**默认 浏览器*/
    Channel[Channel["Default"] = 0] = "Default";
    /**微信 */
    Channel[Channel["WECHAT"] = 1] = "WECHAT";
    /**头条 抖音 */
    Channel[Channel["TT"] = 2] = "TT";
    /**快手 */
    Channel[Channel["KS"] = 3] = "KS";
    /**oppo渠道 */
    Channel[Channel["OPPO"] = 4] = "OPPO";
    /**vivo渠道 */
    Channel[Channel["VIVO"] = 5] = "VIVO";
    /**魅族渠道 */
    Channel[Channel["MEIZU"] = 6] = "MEIZU";
    /**小米渠道 */
    Channel[Channel["XIAOMI"] = 7] = "XIAOMI";
})(Channel = exports.Channel || (exports.Channel = {}));
/**
 * 红点枚举
 * 客户端红点从 300开始
 */
var RPointMask;
(function (RPointMask) {
    /**客户端红点起始*/
    RPointMask[RPointMask["RPM_Client"] = 300] = "RPM_Client";
})(RPointMask = exports.RPointMask || (exports.RPointMask = {}));
/**图标旗帜 */
exports.ITEM_DETAIL_FLAG = {
    /** 背包环境 */
    BAG: 1 << 0,
    /** 展示 */
    TPL: 1 << 1,
    /** 购买环境 */
    BUY: 1 << 2,
    /** 无操作（无响应，但是禁止穿透） */
    NOT_OP: 1 << 3,
    /** 禁用触摸事件(允许点击穿透) */
    NOT_TOUCH: 1 << 4,
    /** 文本位置下方正中间 */
    NUMPOS_ITEM_BC: 1 << 5,
    /** 不现实数量 */
    NO_NUM: 1 << 6,
    /** 被选中 */
    SELECT: 1 << 7,
    /** 不现实背景图 */
    NO_BG: 1 << 8,
    /** 图标缩小一半 */
    ICON_SCALE: 1 << 9,
    /** 材料类型，不显示自己拥有数量，只显示需要数量 */
    MATERIAL_NO_HAVE: 1 << 10,
    /**不显示数量操作 */
    NO_NUM_NODE: 1 << 11,
    /** 材料 */
    MATERIAL: 1 << 12,
    /** 数字反向缩放 */
    NUM_SCALE: 1 << 13,
    /** 消耗显示样式-左右显示图标和icon */
    MATERIAL_STYLE_LINE: (1 << 12) | (1 << 8) | (1 << 9),
    /**允许触摸事件 不现实数量*/
    TOUCH: 1 << 14,
    /**合成强化 */
    BLESS: 1 << 15,
    /**既无背景又有底部强化值 */
    NO_BG_SHOWSLV: 1 << 16,
    /**商店放大图标 */
    SCALEICON: 1 << 17,
    /**合成放大图标 */
    SCALEBLESSICON: 1 << 18,
    /**空图标 */
    NULLICON: 1 << 19,
    /**显示特效 */
    SHOWLIGHT: 1 << 20,
    /**无强化等级 */
    NO_SLV: 1 << 21,
};
/** 加载类型枚举 */
var LoadingType;
(function (LoadingType) {
    LoadingType[LoadingType["MapStart"] = 0] = "MapStart";
    LoadingType[LoadingType["AppStart"] = 1] = "AppStart";
    LoadingType[LoadingType["PloatScene"] = 2] = "PloatScene";
    LoadingType[LoadingType["GameScene"] = 3] = "GameScene";
    LoadingType[LoadingType["InitRole"] = 4] = "InitRole";
    LoadingType[LoadingType["BattleScene"] = 5] = "BattleScene";
    LoadingType[LoadingType["Simulator"] = 6] = "Simulator";
})(LoadingType = exports.LoadingType || (exports.LoadingType = {}));
/**排序 */
var CompareEnum;
(function (CompareEnum) {
    CompareEnum[CompareEnum["CEQual"] = 0] = "CEQual";
    CompareEnum[CompareEnum["CGreater"] = -1] = "CGreater";
    CompareEnum[CompareEnum["CLess"] = 1] = "CLess";
})(CompareEnum = exports.CompareEnum || (exports.CompareEnum = {}));
/** 弹窗提示类型 */
var ITEMTYPE;
(function (ITEMTYPE) {
    /**金币 */
    ITEMTYPE[ITEMTYPE["COIN"] = 0] = "COIN";
    ITEMTYPE[ITEMTYPE["PY"] = 1] = "PY";
})(ITEMTYPE = exports.ITEMTYPE || (exports.ITEMTYPE = {}));
/**段位 */
var RANKLV;
(function (RANKLV) {
    RANKLV[RANKLV["RANKLV0"] = 0] = "RANKLV0";
    /**青铜 */
    RANKLV[RANKLV["RANKLV1"] = 1] = "RANKLV1";
    /**白银 */
    RANKLV[RANKLV["RANKLV2"] = 2] = "RANKLV2";
    /**黄金 */
    RANKLV[RANKLV["RANKLV3"] = 3] = "RANKLV3";
    /**钻石 */
    RANKLV[RANKLV["RANKLV4"] = 4] = "RANKLV4";
    /**星耀 */
    RANKLV[RANKLV["RANKLV5"] = 5] = "RANKLV5";
    /**大师 */
    RANKLV[RANKLV["RANKLV6"] = 6] = "RANKLV6";
    /**王者 */
    RANKLV[RANKLV["RANKLV7"] = 7] = "RANKLV7";
})(RANKLV = exports.RANKLV || (exports.RANKLV = {}));
/** 弹窗提示类型 */
var ToastType;
(function (ToastType) {
    ToastType[ToastType["Null"] = 0] = "Null";
    /** 游戏提示 */
    ToastType[ToastType["WarnTip"] = 1] = "WarnTip";
    ToastType[ToastType["End"] = 2] = "End";
})(ToastType = exports.ToastType || (exports.ToastType = {}));
/**战斗场景 */
var PART_BTL_SCENE;
(function (PART_BTL_SCENE) {
    /** 过关 */
    PART_BTL_SCENE[PART_BTL_SCENE["GUANQIA"] = 0] = "GUANQIA";
    /**竞技场 */
    PART_BTL_SCENE[PART_BTL_SCENE["ARENA"] = 1] = "ARENA";
})(PART_BTL_SCENE = exports.PART_BTL_SCENE || (exports.PART_BTL_SCENE = {}));
/**打点点 */
exports.PointInfo = {};
exports.CHECK_TIME = {
    TIME_CLOCK_CHECK: 10,
};
/**
 * 红点动效类型
 */
var RedpointEffect;
(function (RedpointEffect) {
    /**闪烁 */
    RedpointEffect[RedpointEffect["BLING"] = 0] = "BLING";
    /**特效 */
    RedpointEffect[RedpointEffect["RUNNING"] = 1] = "RUNNING";
    /**感叹号红点 */
    RedpointEffect[RedpointEffect["REDPOINT"] = 2] = "REDPOINT";
})(RedpointEffect = exports.RedpointEffect || (exports.RedpointEffect = {}));
/**排位赛宝箱 */
var rankLvBoxItem;
(function (rankLvBoxItem) {
    /**无宝箱 */
    rankLvBoxItem[rankLvBoxItem["NULL"] = 0] = "NULL";
    /**未解锁 */
    rankLvBoxItem[rankLvBoxItem["box0"] = 1] = "box0";
    /**宝箱解锁待领取 */
    rankLvBoxItem[rankLvBoxItem["box1"] = 2] = "box1";
    /**宝箱已领取 */
    rankLvBoxItem[rankLvBoxItem["box2"] = 3] = "box2";
})(rankLvBoxItem = exports.rankLvBoxItem || (exports.rankLvBoxItem = {}));
/**段位宝箱状态 */
var levelBoxItem;
(function (levelBoxItem) {
    /**2个宝箱同时解锁 */
    levelBoxItem[levelBoxItem["doubleBox"] = 1] = "doubleBox";
    /**视频宝箱未解锁 */
    levelBoxItem[levelBoxItem["adbox0"] = 2] = "adbox0";
    /**视频宝箱解锁 */
    levelBoxItem[levelBoxItem["adbox1"] = 3] = "adbox1";
    /**视频宝箱已领取 */
    levelBoxItem[levelBoxItem["adbox2"] = 4] = "adbox2";
    /**普通宝箱未解锁 */
    levelBoxItem[levelBoxItem["box0"] = 5] = "box0";
    /**普通宝箱解锁 */
    levelBoxItem[levelBoxItem["box1"] = 6] = "box1";
    /**普通宝箱已领取 */
    levelBoxItem[levelBoxItem["box2"] = 7] = "box2";
    /**观看视频宝箱 */
    levelBoxItem[levelBoxItem["adbox"] = 8] = "adbox";
    /**普通宝箱 */
    levelBoxItem[levelBoxItem["box"] = 9] = "box";
})(levelBoxItem = exports.levelBoxItem || (exports.levelBoxItem = {}));
/**段位奖励任务要求类型 */
var taskType;
(function (taskType) {
    /**无 */
    taskType[taskType["default"] = 0] = "default";
    /**段位要求 */
    taskType[taskType["rankLv"] = 1] = "rankLv";
    /**胜利场次 */
    taskType[taskType["battleWin"] = 2] = "battleWin";
    /**段位星数 */
    taskType[taskType["rankNum"] = 3] = "rankNum";
})(taskType = exports.taskType || (exports.taskType = {}));
/**段位奖励任务状态 */
var taskState;
(function (taskState) {
    /**未开启 */
    taskState[taskState["notOpen"] = 0] = "notOpen";
    /**开启 */
    taskState[taskState["open"] = 1] = "open";
    /**完成 */
    taskState[taskState["complete"] = 2] = "complete";
})(taskState = exports.taskState || (exports.taskState = {}));
var npc;
(function (npc) {
    npc[npc["default"] = 0] = "default";
    /**npc */
    npc[npc["npc1"] = 1] = "npc1";
    /** */
    npc[npc["npc2"] = 2] = "npc2";
    /** */
    npc[npc["npc3"] = 3] = "npc3";
})(npc = exports.npc || (exports.npc = {}));
var rewardType;
(function (rewardType) {
    /**id */
    rewardType[rewardType["id"] = 0] = "id";
    /**数量 */
    rewardType[rewardType["num"] = 1] = "num";
})(rewardType = exports.rewardType || (exports.rewardType = {}));
var rewardWind;
(function (rewardWind) {
    rewardWind[rewardWind["default"] = 0] = "default";
    /**段位宝箱奖励 */
    rewardWind[rewardWind["reward"] = 1] = "reward";
    /**排位赛宝箱奖励 */
    rewardWind[rewardWind["boxRank"] = 2] = "boxRank";
})(rewardWind = exports.rewardWind || (exports.rewardWind = {}));
/**buff增益效果 */
//#region
exports.CMsg = {
    client: {
        sdk: {
            onShareScreenSuc: "CMsg.client.sdk.onShareScreenSuc",
        },
        currency: {
            /**金币 体力 监听 */
            onCurrencyChange: "CMsg.client.currency.onCurrencyChange",
        },
        view: {
            /**监听当前窗口id */
            onViewChange: "CMsg.client.view.onViewChange",
            /**排位赛过关数量 */
            onRankPassLevel: "CMsg.client.view.onRankPassLevel",
            /**排位赛解锁 */
            onRankLock: "CMsg.client.view.onRankLock",
            /**战斗胜利 */
            onBattleWin: "CMsg.client.view.onBattleWin",
        },
        fight: {
            onPlayerMove: "CMsg.client.fight.onPlayerMove",
            onPlayerEndAction: "CMsg.client.fight.onPlayerEndAction",
            onPlayerDice: "CMsg.client.fight.onPlayerDice",
            onPlayerJump: "Cmsg.client.fight.onPlayerJump",
            onChangeDiceBtn: "CMsg.client.fight.onChangeDiceBtn",
            endFight: "CMsg.client.fightUI.endFight",
        },
    },
    rPoint: {
        // 红点模块
        valueSetting: "CMsg.rPoint.valueSetting",
        viewSetting: "CMsg.rPoint.viewSetting",
    },
    data: {
        onClientGuideChange: "CMsg.data.onClientGuideChange",
        setGuide: "CMsg.data.setGuide",
        onGuideEvent: "CMsg.data.onGuideEvent",
    },
    unlock: {},
};
//#endregion
/** Key format */
exports.KF = {
    genItemKey: function (id, type) {
        return id + "_" + type;
    },
    deItemKey: function (str) {
        if (!str || str == CoreDefine_1.INVALID_STRING_VALUE)
            return [CoreDefine_1.INVALID_VALUE, CoreDefine_1.INVALID_VALUE];
        var strs = str.split("_");
        return [parseInt(strs[0]), parseInt(strs[1])];
    },
    getLogKey: function (main, sub) {
        return main * 10000 + sub;
    },
    deLogKey: function (key) {
        return [Math.floor(key / 10000), key % 10000];
    },
    posDecode: function (str) {
        if (!str || str == CoreDefine_1.INVALID_STRING_VALUE)
            return cc.Vec2.ZERO;
        var strs = str.split("_");
        if (strs.length != 2) {
            cc.error("army id format be error! ");
            return null;
        }
        return cc.v2(parseInt(strs[0]), parseInt(strs[1]));
    },
    posEncode: function (pos) {
        return pos.x + "_" + pos.y;
    },
    spliteArrays: function (src, num) {
        var totalSize = src.length;
        var res = [];
        var item = [];
        for (var i = 0; i < totalSize; i++) {
            if (!item)
                item = [];
            item.push(src[i]);
            if (i == totalSize - 1) {
                res.push(item);
            }
            else if (item.length == num) {
                res.push(item);
                item = null;
            }
        }
        return res;
    },
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Db21tb24vRGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4RTtBQUM5RSxZQUFZO0FBQ1osSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLHlDQUFJLENBQUE7SUFDSixpREFBUSxDQUFBO0lBQ1IsNkNBQU0sQ0FBQTtBQUNSLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtBQUVELFVBQVU7QUFDVixJQUFZLFNBTVg7QUFORCxXQUFZLFNBQVM7SUFDbkIscUNBQU0sQ0FBQTtJQUNOLGlEQUFRLENBQUE7SUFDUix5Q0FBSSxDQUFBO0lBQ0osNkNBQU0sQ0FBQTtJQUNOLGlEQUFRLENBQUE7QUFDVixDQUFDLEVBTlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFNcEI7QUFFRCxRQUFRO0FBQ1IsSUFBWSxhQUtYO0FBTEQsV0FBWSxhQUFhO0lBQ3ZCLGlEQUFJLENBQUE7SUFDSix5REFBUSxDQUFBO0lBQ1IsbURBQUssQ0FBQTtJQUNMLHFEQUFNLENBQUE7QUFDUixDQUFDLEVBTFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFLeEI7QUFFRCxJQUFZLFNBYVg7QUFiRCxXQUFZLFNBQVM7SUFDbkIsSUFBSTtJQUNKLHlDQUFRLENBQUE7SUFDUixJQUFJO0lBQ0oseUNBQVEsQ0FBQTtJQUNSLElBQUk7SUFDSix1Q0FBRyxDQUFBO0lBQ0gsSUFBSTtJQUNKLDJDQUFLLENBQUE7SUFDTCxJQUFJO0lBQ0osMkNBQUssQ0FBQTtJQUNMLElBQUk7SUFDSiw2Q0FBTSxDQUFBO0FBQ1IsQ0FBQyxFQWJXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBYXBCO0FBRUQsTUFBTTtBQUNOLElBQVksUUFpQlg7QUFqQkQsV0FBWSxRQUFRO0lBQ2xCLFFBQVE7SUFDUiwyQ0FBTSxDQUFBO0lBQ04sU0FBUztJQUNULDJDQUFN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LENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLElBQUk7Z0JBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEI7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTtnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUNGLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTlZBTElEX1NUUklOR19WQUxVRSwgSU5WQUxJRF9WQUxVRSB9IGZyb20gXCIuLy4uLy4uL0NvcmUvQ29yZURlZmluZVwiO1xyXG4vKirlnLDlnZfkv6Hmga/nsbvlnosgKi9cclxuZXhwb3J0IGVudW0gSU5GT19UWVBFIHtcclxuICBHUklELFxyXG4gIE1BVEVSSUFMLFxyXG4gIFRBUkdFVCxcclxufVxyXG5cclxuLyoq5Zyw5Z2X5pWw5o2uICovXHJcbmV4cG9ydCBlbnVtIEdSSURfSU5GTyB7XHJcbiAgSUQgPSAwLFxyXG4gIFBPU0lUSU9OLCAvLyAxXHJcbiAgSU5GTywgLy8gMlxyXG4gIFpJTkRFWCwgLy8gM1xyXG4gIE1BVEVSSUFMLCAvLyA0XHJcbn1cclxuXHJcbi8qKuadkOaWmSAqL1xyXG5leHBvcnQgZW51bSBNQVRFUklBTF9JTkZPIHtcclxuICBUWVBFLFxyXG4gIFBPU0lUSU9OLFxyXG4gIFNDQUxFLFxyXG4gIFpJTkRFWCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gR1JJRF9UWVBFIHtcclxuICAvL+iZmuepulxyXG4gIFZPSUQgPSAwLFxyXG4gIC8v6JOd6ImyXHJcbiAgQlVMRSA9IDEsXHJcbiAgLy/nuqLoibJcclxuICBSRUQsXHJcbiAgLy/pu4ToibJcclxuICBZRUxMTyxcclxuICAvL+e7v+iJslxyXG4gIEdSRUVOLFxyXG4gIC8v6YCa55SoXHJcbiAgQ09NTU9OLFxyXG59XHJcblxyXG4vKiogKi9cclxuZXhwb3J0IGVudW0gTWFwTGF5ZXIge1xyXG4gIC8qKuWcsOihqCAqL1xyXG4gIE1MQmFzZSxcclxuICAvKiog5Zyw5Z2XICovXHJcbiAgTUxHcmlkLFxyXG4gIC8qKue0oOadkOWxgiAqL1xyXG4gIE1MTWF0ZXJpYWwsXHJcbiAgLyoqIOinpuaRuOWxgiAqL1xyXG4gIE1MVG91Y2gsXHJcbiAgLyoqIOaViOaenOWxgjEg55So5LqO5pi+56S66YCJ5LitKi9cclxuICBNTEVmZmVjdF9Eb3dtLFxyXG4gIC8qKuaViOaenOWxgjIgKi9cclxuICBNTEVmZmVjdF9VcCxcclxuICAvKiog5Zyw5Z2X6YC76L6RVUnlsYIgKi9cclxuICBNRWxlbWVudFVJLFxyXG4gIC8qKiDlvIDlj5HnmoTml7blgJnmtYvor5XlsYIgKi9cclxuICBUZXN0TGF5ZXIsXHJcbn1cclxuLyoq5rig6YGTICovXHJcbmV4cG9ydCBlbnVtIENoYW5uZWwge1xyXG4gIC8qKum7mOiupCDmtY/op4jlmagqL1xyXG4gIERlZmF1bHQgPSAwLFxyXG4gIC8qKuW+ruS/oSAqL1xyXG4gIFdFQ0hBVCA9IDEsXHJcbiAgLyoq5aS05p2hIOaKlumfsyAqL1xyXG4gIFRUID0gMixcclxuICAvKirlv6vmiYsgKi9cclxuICBLUyA9IDMsXHJcbiAgLyoqb3Bwb+a4oOmBkyAqL1xyXG4gIE9QUE8gPSA0LFxyXG4gIC8qKnZpdm/muKDpgZMgKi9cclxuICBWSVZPID0gNSxcclxuICAvKirprYXml4/muKDpgZMgKi9cclxuICBNRUlaVSA9IDYsXHJcbiAgLyoq5bCP57Gz5rig6YGTICovXHJcbiAgWElBT01JID0gNyxcclxufVxyXG5cclxuLyoqXHJcbiAqIOe6oueCueaemuS4vlxyXG4gKiDlrqLmiLfnq6/nuqLngrnku44gMzAw5byA5aeLXHJcbiAqL1xyXG5cclxuZXhwb3J0IGVudW0gUlBvaW50TWFzayB7XHJcbiAgLyoq5a6i5oi356uv57qi54K56LW35aeLKi9cclxuICBSUE1fQ2xpZW50ID0gMzAwLFxyXG59XHJcblxyXG4vKirlm77moIfml5fluJwgKi9cclxuZXhwb3J0IGNvbnN0IElURU1fREVUQUlMX0ZMQUcgPSB7XHJcbiAgLyoqIOiDjOWMheeOr+WigyAqL1xyXG4gIEJBRzogMSA8PCAwLFxyXG4gIC8qKiDlsZXnpLogKi9cclxuICBUUEw6IDEgPDwgMSxcclxuICAvKiog6LSt5Lmw546v5aKDICovXHJcbiAgQlVZOiAxIDw8IDIsXHJcbiAgLyoqIOaXoOaTjeS9nO+8iOaXoOWTjeW6lO+8jOS9huaYr+emgeatouepv+mAj++8iSAqL1xyXG4gIE5PVF9PUDogMSA8PCAzLFxyXG4gIC8qKiDnpoHnlKjop6bmkbjkuovku7Yo5YWB6K6454K55Ye756m/6YCPKSAqL1xyXG4gIE5PVF9UT1VDSDogMSA8PCA0LFxyXG4gIC8qKiDmlofmnKzkvY3nva7kuIvmlrnmraPkuK3pl7QgKi9cclxuICBOVU1QT1NfSVRFTV9CQzogMSA8PCA1LFxyXG4gIC8qKiDkuI3njrDlrp7mlbDph48gKi9cclxuICBOT19OVU06IDEgPDwgNixcclxuICAvKiog6KKr6YCJ5LitICovXHJcbiAgU0VMRUNUOiAxIDw8IDcsXHJcbiAgLyoqIOS4jeeOsOWunuiDjOaZr+WbviAqL1xyXG4gIE5PX0JHOiAxIDw8IDgsXHJcbiAgLyoqIOWbvuagh+e8qeWwj+S4gOWNiiAqL1xyXG4gIElDT05fU0NBTEU6IDEgPDwgOSxcclxuICAvKiog5p2Q5paZ57G75Z6L77yM5LiN5pi+56S66Ieq5bex5oul5pyJ5pWw6YeP77yM5Y+q5pi+56S66ZyA6KaB5pWw6YePICovXHJcbiAgTUFURVJJQUxfTk9fSEFWRTogMSA8PCAxMCxcclxuICAvKirkuI3mmL7npLrmlbDph4/mk43kvZwgKi9cclxuICBOT19OVU1fTk9ERTogMSA8PCAxMSxcclxuICAvKiog5p2Q5paZICovXHJcbiAgTUFURVJJQUw6IDEgPDwgMTIsXHJcbiAgLyoqIOaVsOWtl+WPjeWQkee8qeaUviAqL1xyXG4gIE5VTV9TQ0FMRTogMSA8PCAxMyxcclxuICAvKiog5raI6ICX5pi+56S65qC35byPLeW3puWPs+aYvuekuuWbvuagh+WSjGljb24gKi9cclxuICBNQVRFUklBTF9TVFlMRV9MSU5FOiAoMSA8PCAxMikgfCAoMSA8PCA4KSB8ICgxIDw8IDkpLFxyXG4gIC8qKuWFgeiuuOinpuaRuOS6i+S7tiDkuI3njrDlrp7mlbDph48qL1xyXG4gIFRPVUNIOiAxIDw8IDE0LFxyXG4gIC8qKuWQiOaIkOW8uuWMliAqL1xyXG4gIEJMRVNTOiAxIDw8IDE1LFxyXG4gIC8qKuaXouaXoOiDjOaZr+WPiOacieW6lemDqOW8uuWMluWAvCAqL1xyXG4gIE5PX0JHX1NIT1dTTFY6IDEgPDwgMTYsXHJcbiAgLyoq5ZWG5bqX5pS+5aSn5Zu+5qCHICovXHJcbiAgU0NBTEVJQ09OOiAxIDw8IDE3LFxyXG4gIC8qKuWQiOaIkOaUvuWkp+WbvuaghyAqL1xyXG4gIFNDQUxFQkxFU1NJQ09OOiAxIDw8IDE4LFxyXG4gIC8qKuepuuWbvuaghyAqL1xyXG4gIE5VTExJQ09OOiAxIDw8IDE5LFxyXG4gIC8qKuaYvuekuueJueaViCAqL1xyXG4gIFNIT1dMSUdIVDogMSA8PCAyMCxcclxuICAvKirml6DlvLrljJbnrYnnuqcgKi9cclxuICBOT19TTFY6IDEgPDwgMjEsXHJcbn07XHJcblxyXG4vKiog5Yqg6L2957G75Z6L5p6a5Li+ICovXHJcbmV4cG9ydCBlbnVtIExvYWRpbmdUeXBlIHtcclxuICBNYXBTdGFydCxcclxuICBBcHBTdGFydCxcclxuICBQbG9hdFNjZW5lLFxyXG4gIEdhbWVTY2VuZSxcclxuICBJbml0Um9sZSxcclxuICBCYXR0bGVTY2VuZSxcclxuICBTaW11bGF0b3IsXHJcbn1cclxuXHJcbi8qKuaOkuW6jyAqL1xyXG5leHBvcnQgZW51bSBDb21wYXJlRW51bSB7XHJcbiAgQ0VRdWFsID0gMCxcclxuICBDR3JlYXRlciA9IC0xLFxyXG4gIENMZXNzID0gMSxcclxufVxyXG5cclxuLyoqIOW8ueeql+aPkOekuuexu+WeiyAqL1xyXG5leHBvcnQgZW51bSBJVEVNVFlQRSB7XHJcbiAgLyoq6YeR5biBICovXHJcbiAgQ09JTixcclxuICBQWSxcclxufVxyXG5cclxuLyoq5q615L2NICovXHJcbmV4cG9ydCBlbnVtIFJBTktMViB7XHJcbiAgUkFOS0xWMCxcclxuICAvKirpnZLpk5wgKi9cclxuICBSQU5LTFYxLFxyXG4gIC8qKueZvemTtiAqL1xyXG4gIFJBTktMVjIsXHJcbiAgLyoq6buE6YeRICovXHJcbiAgUkFOS0xWMyxcclxuICAvKirpkrvnn7MgKi9cclxuICBSQU5LTFY0LFxyXG4gIC8qKuaYn+iAgCAqL1xyXG4gIFJBTktMVjUsXHJcbiAgLyoq5aSn5biIICovXHJcbiAgUkFOS0xWNixcclxuICAvKirnjovogIUgKi9cclxuICBSQU5LTFY3LFxyXG59XHJcblxyXG4vKiog5by556qX5o+Q56S657G75Z6LICovXHJcbmV4cG9ydCBlbnVtIFRvYXN0VHlwZSB7XHJcbiAgTnVsbCxcclxuICAvKiog5ri45oiP5o+Q56S6ICovXHJcbiAgV2FyblRpcCxcclxuICBFbmQsXHJcbn1cclxuXHJcbi8qKuaImOaWl+WcuuaZryAqL1xyXG5leHBvcnQgZW51bSBQQVJUX0JUTF9TQ0VORSB7XHJcbiAgLyoqIOi/h+WFsyAqL1xyXG4gIEdVQU5RSUEgPSAwLFxyXG4gIC8qKuernuaKgOWcuiAqL1xyXG4gIEFSRU5BLFxyXG59XHJcblxyXG4vKirmiZPngrnngrkgKi9cclxuZXhwb3J0IGNvbnN0IFBvaW50SW5mbyA9IHt9O1xyXG5cclxuZXhwb3J0IGNvbnN0IENIRUNLX1RJTUUgPSB7XHJcbiAgVElNRV9DTE9DS19DSEVDSzogMTAsIC8vIChzKVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIOe6oueCueWKqOaViOexu+Wei1xyXG4gKi9cclxuZXhwb3J0IGVudW0gUmVkcG9pbnRFZmZlY3Qge1xyXG4gIC8qKumXqueDgSAqL1xyXG4gIEJMSU5HLFxyXG4gIC8qKueJueaViCAqL1xyXG4gIFJVTk5JTkcsXHJcbiAgLyoq5oSf5Y+55Y+357qi54K5ICovXHJcbiAgUkVEUE9JTlQsXHJcbn1cclxuXHJcbi8qKuaOkuS9jei1m+WuneeusSAqL1xyXG5leHBvcnQgZW51bSByYW5rTHZCb3hJdGVtIHtcclxuICAvKirml6Dlrp3nrrEgKi9cclxuICBOVUxMLFxyXG4gIC8qKuacquino+mUgSAqL1xyXG4gIGJveDAsXHJcbiAgLyoq5a6d566x6Kej6ZSB5b6F6aKG5Y+WICovXHJcbiAgYm94MSxcclxuICAvKirlrp3nrrHlt7Lpooblj5YgKi9cclxuICBib3gyLFxyXG59XHJcblxyXG4vKirmrrXkvY3lrp3nrrHnirbmgIEgKi9cclxuZXhwb3J0IGVudW0gbGV2ZWxCb3hJdGVtIHtcclxuICAvKioy5Liq5a6d566x5ZCM5pe26Kej6ZSBICovXHJcbiAgZG91YmxlQm94ID0gMSxcclxuICAvKirop4bpopHlrp3nrrHmnKrop6PplIEgKi9cclxuICBhZGJveDAgPSAyLFxyXG4gIC8qKuinhumikeWuneeuseino+mUgSAqL1xyXG4gIGFkYm94MSA9IDMsXHJcbiAgLyoq6KeG6aKR5a6d566x5bey6aKG5Y+WICovXHJcbiAgYWRib3gyID0gNCxcclxuICAvKirmma7pgJrlrp3nrrHmnKrop6PplIEgKi9cclxuICBib3gwID0gNSxcclxuICAvKirmma7pgJrlrp3nrrHop6PplIEgKi9cclxuICBib3gxID0gNixcclxuICAvKirmma7pgJrlrp3nrrHlt7Lpooblj5YgKi9cclxuICBib3gyID0gNyxcclxuICAvKirop4LnnIvop4bpopHlrp3nrrEgKi9cclxuICBhZGJveCxcclxuICAvKirmma7pgJrlrp3nrrEgKi9cclxuICBib3gsXHJcbn1cclxuXHJcbi8qKuauteS9jeWlluWKseS7u+WKoeimgeaxguexu+WeiyAqL1xyXG5leHBvcnQgZW51bSB0YXNrVHlwZSB7XHJcbiAgLyoq5pegICovXHJcbiAgZGVmYXVsdCxcclxuICAvKirmrrXkvY3opoHmsYIgKi9cclxuICByYW5rTHYsXHJcbiAgLyoq6IOc5Yip5Zy65qyhICovXHJcbiAgYmF0dGxlV2luLFxyXG4gIC8qKuauteS9jeaYn+aVsCAqL1xyXG4gIHJhbmtOdW0sXHJcbn1cclxuXHJcbi8qKuauteS9jeWlluWKseS7u+WKoeeKtuaAgSAqL1xyXG5leHBvcnQgZW51bSB0YXNrU3RhdGUge1xyXG4gIC8qKuacquW8gOWQryAqL1xyXG4gIG5vdE9wZW4sXHJcbiAgLyoq5byA5ZCvICovXHJcbiAgb3BlbixcclxuICAvKirlrozmiJAgKi9cclxuICBjb21wbGV0ZSxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gbnBjIHtcclxuICBkZWZhdWx0LFxyXG4gIC8qKm5wYyAqL1xyXG4gIG5wYzEsXHJcbiAgLyoqICovXHJcbiAgbnBjMixcclxuICAvKiogKi9cclxuICBucGMzLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSByZXdhcmRUeXBlIHtcclxuICAvKippZCAqL1xyXG4gIGlkLFxyXG4gIC8qKuaVsOmHjyAqL1xyXG4gIG51bSxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gcmV3YXJkV2luZCB7XHJcbiAgZGVmYXVsdCxcclxuICAvKirmrrXkvY3lrp3nrrHlpZblirEgKi9cclxuICByZXdhcmQsXHJcbiAgLyoq5o6S5L2N6LWb5a6d566x5aWW5YqxICovXHJcbiAgYm94UmFuayxcclxufVxyXG5cclxuLyoqYnVmZuWinuebiuaViOaenCAqL1xyXG4vLyNyZWdpb25cclxuZXhwb3J0IGNvbnN0IENNc2cgPSB7XHJcbiAgY2xpZW50OiB7XHJcbiAgICBzZGs6IHtcclxuICAgICAgb25TaGFyZVNjcmVlblN1YzogXCJDTXNnLmNsaWVudC5zZGsub25TaGFyZVNjcmVlblN1Y1wiLFxyXG4gICAgfSxcclxuXHJcbiAgICBjdXJyZW5jeToge1xyXG4gICAgICAvKirph5HluIEg5L2T5YqbIOebkeWQrCAqL1xyXG4gICAgICBvbkN1cnJlbmN5Q2hhbmdlOiBcIkNNc2cuY2xpZW50LmN1cnJlbmN5Lm9uQ3VycmVuY3lDaGFuZ2VcIixcclxuICAgIH0sXHJcblxyXG4gICAgdmlldzoge1xyXG4gICAgICAvKirnm5HlkKzlvZPliY3nqpflj6NpZCAqL1xyXG4gICAgICBvblZpZXdDaGFuZ2U6IFwiQ01zZy5jbGllbnQudmlldy5vblZpZXdDaGFuZ2VcIixcclxuICAgICAgLyoq5o6S5L2N6LWb6L+H5YWz5pWw6YePICovXHJcbiAgICAgIG9uUmFua1Bhc3NMZXZlbDogXCJDTXNnLmNsaWVudC52aWV3Lm9uUmFua1Bhc3NMZXZlbFwiLFxyXG4gICAgICAvKirmjpLkvY3otZvop6PplIEgKi9cclxuICAgICAgb25SYW5rTG9jazogXCJDTXNnLmNsaWVudC52aWV3Lm9uUmFua0xvY2tcIixcclxuICAgICAgLyoq5oiY5paX6IOc5YipICovXHJcbiAgICAgIG9uQmF0dGxlV2luOiBcIkNNc2cuY2xpZW50LnZpZXcub25CYXR0bGVXaW5cIixcclxuICAgIH0sXHJcbiAgICBmaWdodDoge1xyXG4gICAgICBvblBsYXllck1vdmU6IFwiQ01zZy5jbGllbnQuZmlnaHQub25QbGF5ZXJNb3ZlXCIsXHJcbiAgICAgIG9uUGxheWVyRW5kQWN0aW9uOiBcIkNNc2cuY2xpZW50LmZpZ2h0Lm9uUGxheWVyRW5kQWN0aW9uXCIsXHJcbiAgICAgIG9uUGxheWVyRGljZTogXCJDTXNnLmNsaWVudC5maWdodC5vblBsYXllckRpY2VcIixcclxuICAgICAgb25QbGF5ZXJKdW1wOiBcIkNtc2cuY2xpZW50LmZpZ2h0Lm9uUGxheWVySnVtcFwiLFxyXG4gICAgICBvbkNoYW5nZURpY2VCdG46IFwiQ01zZy5jbGllbnQuZmlnaHQub25DaGFuZ2VEaWNlQnRuXCIsXHJcbiAgICAgIGVuZEZpZ2h0OiBcIkNNc2cuY2xpZW50LmZpZ2h0VUkuZW5kRmlnaHRcIixcclxuICAgIH0sXHJcbiAgfSxcclxuICByUG9pbnQ6IHtcclxuICAgIC8vIOe6oueCueaooeWdl1xyXG4gICAgdmFsdWVTZXR0aW5nOiBcIkNNc2cuclBvaW50LnZhbHVlU2V0dGluZ1wiLFxyXG4gICAgdmlld1NldHRpbmc6IFwiQ01zZy5yUG9pbnQudmlld1NldHRpbmdcIixcclxuICB9LFxyXG4gIGRhdGE6IHtcclxuICAgIG9uQ2xpZW50R3VpZGVDaGFuZ2U6IFwiQ01zZy5kYXRhLm9uQ2xpZW50R3VpZGVDaGFuZ2VcIixcclxuICAgIHNldEd1aWRlOiBcIkNNc2cuZGF0YS5zZXRHdWlkZVwiLFxyXG4gICAgb25HdWlkZUV2ZW50OiBcIkNNc2cuZGF0YS5vbkd1aWRlRXZlbnRcIixcclxuICB9LFxyXG4gIHVubG9jazoge30sXHJcbn07XHJcbi8vI2VuZHJlZ2lvblxyXG5cclxuLyoqIEtleSBmb3JtYXQgKi9cclxuZXhwb3J0IGNvbnN0IEtGID0ge1xyXG4gIGdlbkl0ZW1LZXkoaWQ6IG51bWJlciwgdHlwZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBpZCArIFwiX1wiICsgdHlwZTtcclxuICB9LFxyXG4gIGRlSXRlbUtleShzdHI6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgaWYgKCFzdHIgfHwgc3RyID09IElOVkFMSURfU1RSSU5HX1ZBTFVFKVxyXG4gICAgICByZXR1cm4gW0lOVkFMSURfVkFMVUUsIElOVkFMSURfVkFMVUVdO1xyXG4gICAgbGV0IHN0cnMgPSBzdHIuc3BsaXQoXCJfXCIpO1xyXG4gICAgcmV0dXJuIFtwYXJzZUludChzdHJzWzBdKSwgcGFyc2VJbnQoc3Ryc1sxXSldO1xyXG4gIH0sXHJcblxyXG4gIGdldExvZ0tleShtYWluOiBudW1iZXIsIHN1YjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBtYWluICogMTAwMDAgKyBzdWI7XHJcbiAgfSxcclxuICBkZUxvZ0tleShrZXk6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgcmV0dXJuIFtNYXRoLmZsb29yKGtleSAvIDEwMDAwKSwga2V5ICUgMTAwMDBdO1xyXG4gIH0sXHJcblxyXG4gIHBvc0RlY29kZTogZnVuY3Rpb24gKHN0cjogc3RyaW5nKTogY2MuVmVjMiB7XHJcbiAgICBpZiAoIXN0ciB8fCBzdHIgPT0gSU5WQUxJRF9TVFJJTkdfVkFMVUUpIHJldHVybiBjYy5WZWMyLlpFUk87XHJcbiAgICBsZXQgc3RycyA9IHN0ci5zcGxpdChcIl9cIik7XHJcbiAgICBpZiAoc3Rycy5sZW5ndGggIT0gMikge1xyXG4gICAgICBjYy5lcnJvcihcImFybXkgaWQgZm9ybWF0IGJlIGVycm9yISBcIik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNjLnYyKHBhcnNlSW50KHN0cnNbMF0pLCBwYXJzZUludChzdHJzWzFdKSk7XHJcbiAgfSxcclxuXHJcbiAgcG9zRW5jb2RlOiBmdW5jdGlvbiAocG9zOiBjYy5WZWMyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBwb3MueCArIFwiX1wiICsgcG9zLnk7XHJcbiAgfSxcclxuXHJcbiAgc3BsaXRlQXJyYXlzPFQ+KHNyYzogVFtdLCBudW06IG51bWJlcik6IFRbXVtdIHtcclxuICAgIGxldCB0b3RhbFNpemUgPSBzcmMubGVuZ3RoO1xyXG4gICAgbGV0IHJlcyA9IFtdO1xyXG4gICAgbGV0IGl0ZW0gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxTaXplOyBpKyspIHtcclxuICAgICAgaWYgKCFpdGVtKSBpdGVtID0gW107XHJcbiAgICAgIGl0ZW0ucHVzaChzcmNbaV0pO1xyXG4gICAgICBpZiAoaSA9PSB0b3RhbFNpemUgLSAxKSB7XHJcbiAgICAgICAgcmVzLnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5sZW5ndGggPT0gbnVtKSB7XHJcbiAgICAgICAgcmVzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgaXRlbSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXM7XHJcbiAgfSxcclxufTtcclxuIl19