"use strict";
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