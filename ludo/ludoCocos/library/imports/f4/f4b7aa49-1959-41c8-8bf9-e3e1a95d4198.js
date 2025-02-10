"use strict";
cc._RF.push(module, 'f4b7apJGVlByIv54+GpXUGY', 'GameMgr');
// Script/Game/Logic/GameMgr.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var JXCommon_1 = require("../../conventions/JXCommon");
var CoreDefine_1 = require("../../Core/CoreDefine");
var ES5Ex_1 = require("../../Core/FrameEx/ES5Ex");
var GTimerMgr_1 = require("../../Core/Manager/GTimerMgr");
var RedPointLogicMgr_1 = require("../../Core/Manager/RedPointLogicMgr");
var UIMgr_1 = require("../../Core/Manager/UIMgr");
var Define_1 = require("../Common/Define");
var UI_1 = require("../Common/UI");
var LRobotGrade_1 = require("../Data/Locals/LRobotGrade");
var LUserData_1 = require("../Data/Locals/LUserData");
var SGuideChainData_1 = require("../Data/Static/SGuideChainData");
var SGuideStepData_1 = require("../Data/Static/SGuideStepData");
var SLevelData_1 = require("../Data/Static/SLevelData");
var SLevelRewardData_1 = require("../Data/Static/SLevelRewardData");
var SNpcData_1 = require("../Data/Static/SNpcData");
var SPlaneData_1 = require("../Data/Static/SPlaneData");
var SRankData_1 = require("../Data/Static/SRankData");
var SRankRewardData_1 = require("../Data/Static/SRankRewardData");
var SSystemConfig_1 = require("../Data/Static/SSystemConfig");
var GuideLogic_1 = require("../Guide/GuideLogic");
var JumpUtil_1 = require("../Views/ViewUtil/JumpUtil");
var GCtrl_1 = require("./../../Core/GCtrl");
var DataPool_1 = require("./../../Core/Manager/DataPool");
var MapMgr_1 = require("./MapMgr");
/**
 * 1. 项目调试环境     WD_DEBUG     构建中wdDebug = true
 * 2. 全局控制器       jx               CC_DEV|| CC_DEBUG , 且 WD_DEBUG
 * 3. 物品代码                         CC_DEV || CC_DEBUG , 且 WD_DEBUG;
 * 4. GM指令                          CC_DEV || CC_DEBUG
 * 5. 模拟充值                         GM指令开启，对应SDK没有重载支付接口
 * 6. 充值入口                         IOS不可支付(以及去除)，其他的通过GameEnv参数决定
 * 7. 分享接口                         根据SDK提供的canSdkShare函数的返回值决定
 */
var GameMgr = /** @class */ (function (_super) {
    __extends(GameMgr, _super);
    function GameMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**当前渠道 */
        /** 时间调度容器 */
        _this._timeCounters = [];
        /** 定时闹钟管理器 */
        _this._timeColocks = [];
        /** 耗时任务去重（如果短时间内出现同一个任务则，不发送） */
        _this._lastEndTaskId = null;
        /** 军队任务去重（如果端时间内出现同一个任务则不发送 */
        _this.lastEndArmyTaskId = null;
        return _this;
    }
    GameMgr.ins = function () {
        if (!this._ins) {
            this._ins = new GameMgr();
        }
        return this._ins;
    };
    ///////////////////////////////////////////////Init Functions////////////////////////////////////////////////////////////////////////////
    // 加载i18n客户端表格数据
    GameMgr.__STATIC_CONFIG_INIT = function () {
        window.wdStatics = {
            locales: [],
            launchFiles: [],
            allFiles: [
                "planeData",
                "systemConfig",
                "rankRewardData",
                "rankData",
                "levelRewardData",
                "npcData",
                "levelData",
                "guideStepData",
                "guideChainData",
            ],
        };
        window.wdStatics.locales = window.wdStatics.locales.map(function (v, k) { return "" + v; });
        window.wdStatics.launchFiles = window.wdStatics.launchFiles.map(function (v, k) { return "" + v; });
        window.wdStatics.allFiles = window.wdStatics.allFiles.map(function (v, k) { return "" + v; });
        window.wdStatics.loadStatus = window.wdStatics.loadStatus || [];
    };
    /** 初始化客户端登陆的时候需要的静态数据 */
    GameMgr.initLoginStatic = function (progress, callBack) {
        this.__STATIC_CONFIG_INIT();
        var onLoadEnd = function () {
            callBack();
        };
        var fileNames = window.wdStatics.launchFiles;
        DataPool_1.DataPool.ins().loadRTStatics(fileNames, function (fileName, cur, total) {
            window.wdStatics.loadStatus[fileName] = true;
            progress && progress(cur, fileNames.length);
        }, function () { return onLoadEnd(); });
    };
    // 初始化客户端登陆的时候需要的运热数据
    GameMgr.onInitLoginRunTime = function () { };
    // 通用结束接口
    GameMgr._commonStaticsLoadEnd = function () {
        this.systemConfig = DataPool_1.DataPool.ins().getStatic(SSystemConfig_1.SSystemConfig);
        this.planeData = DataPool_1.DataPool.ins().getStatic(SPlaneData_1.SPlaneData);
        this.rankRewardData = DataPool_1.DataPool.ins().getStatic(SRankRewardData_1.SRankRewardData);
        this.rankData = DataPool_1.DataPool.ins().getStatic(SRankData_1.SRankData);
        this.levelRewardData = DataPool_1.DataPool.ins().getStatic(SLevelRewardData_1.SLevelRewardData);
        this.npcData = DataPool_1.DataPool.ins().getStatic(SNpcData_1.SNpcData);
        this.levelData = DataPool_1.DataPool.ins().getStatic(SLevelData_1.SLevelData);
        this.guideStepData = DataPool_1.DataPool.ins().getStatic(SGuideStepData_1.SGuideStepData);
        this.guideChainData = DataPool_1.DataPool.ins().getStatic(SGuideChainData_1.SGuideChainData);
    };
    /** 初始化 */
    GameMgr.initFristGameStatics = function (progress, callBack) {
        var _this = this;
        DataPool_1.DataPool.ins().loadRTStatics(window.wdStatics.allFiles, function (fileName, cur, total) {
            window.wdStatics.loadStatus[fileName] = true;
            progress && progress(cur, window.wdStatics.allFiles.length);
        }, function () {
            _this._commonStaticsLoadEnd();
            GameMgr.initLocalData();
            GameMgr.initGameRunTime();
            callBack();
        });
    };
    GameMgr.initAllStatics = function (progress, callBack) {
        var _this = this;
        this.__STATIC_CONFIG_INIT();
        var table = window.wdStatics.allFiles;
        for (var i = 0; i < window.wdStatics.launchFiles.length; i++) {
            if (table.indexOf(window.wdStatics.launchFiles[i]) != CoreDefine_1.INVALID_VALUE) {
                continue;
            }
            table.push.apply(table, window.wdStatics.launchFiles);
        }
        DataPool_1.DataPool.ins().loadRTStatics(table, function (fileName, cur, total) {
            window.wdStatics.loadStatus[fileName] = true;
            progress && progress(cur, table.length);
        }, function () {
            _this._commonStaticsLoadEnd();
            GameMgr.initLocalData();
            GameMgr.initGameRunTime();
            callBack();
        });
    };
    /** 初始化客户端游戏进行时需要的热数据 */
    GameMgr.initGameRunTime = function () { };
    /**初始化本地数据 */
    GameMgr.initLocalData = function () {
        this.lUserData = DataPool_1.DataPool.ins().getLocal(LUserData_1.LUserData);
        this.lRobotGradeData = DataPool_1.DataPool.ins().getLocal(LRobotGrade_1.LRobotGradeData);
    };
    /** 初始化逻辑管理器 */
    GameMgr.initLogicManager = function () {
        this.guideMgr = GuideLogic_1.GuideLogic.ins();
        this.mapMgr = MapMgr_1.default.ins;
        this.redMgr = RedPointLogicMgr_1.RedPointLogicMgr.ins();
    };
    GameMgr.initSimulator = function () {
        this.jumpToMgr = JumpUtil_1.default.ins;
    };
    GameMgr.prototype.initReConnectEvent = function () { };
    GameMgr.prototype.initGame = function () {
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GTimerSecondEventMsg, this, this.onTimeCalculat.bind(this));
        var now = GCtrl_1.GCtrl.now;
        this._timeCounters = [
            {
                delta: 0,
                checkTime: Define_1.CHECK_TIME.TIME_CLOCK_CHECK,
                outTimeHandler: GameMgr.redMgr.timingCheck.bind(GameMgr.redMgr),
            },
        ];
        GTimerMgr_1.default.ins().start();
        //底层功能
        // 二级
        GameMgr.jumpToMgr.initGame();
        // 三级: 综合管理器要放到其他功能模块的管理器后面，因为会有引用
        GameMgr.guideMgr.initGame();
        GameMgr.redMgr.initGame();
    };
    GameMgr.prototype.onReconnect = function () { };
    GameMgr.clearRunTime = function () {
        DataPool_1.DataPool.ins().clearRunTimes();
    };
    GameMgr.clearLoacalData = function () {
        DataPool_1.DataPool.ins().clearLocals();
    };
    GameMgr.prototype.restart = function () {
        // 注销事件
        GCtrl_1.GCtrl.ES.off(this);
        // 注销事件
        GCtrl_1.GCtrl.ES.off(this);
        GameMgr.guideMgr.loginOut();
        GameMgr.jumpToMgr.loginOut();
        GameMgr.redMgr.loginOut();
        for (var key in JXCommon_1.JXDef.LOCAL_KEY) {
            cc.sys.localStorage.removeItem(JXCommon_1.JXDef.LOCAL_KEY[key]);
        }
        GameMgr.clearRunTime();
        GameMgr.clearLoacalData();
        var GuideRoot = GameMgr.uiMgr.uiRoot.parent.getChildByName("GudieRoot");
        if (GuideRoot) {
            GuideRoot.destroy();
        }
        var topPannel = GameMgr.uiMgr.uiRoot.getChildByName("TopUiItem");
        if (topPannel) {
            topPannel.destroy();
        }
        // 移除所有界面
        UIMgr_1.UIMgr.removeAllActiveWin();
        UIMgr_1.UIMgr.showWin(UI_1.VIEW_ID.load, Define_1.LoadingType.AppStart);
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////
    GameMgr.prototype.onTimeCalculat = function () {
        // ColorLog.esOn("GCtrl.GTimerSecondEventMsg);
        this._timeCounters.forEach(function (e) { return (e.delta += GCtrl_1.GCtrl.deltaSecondTime); });
        // 性能优化，保证一帧最多处理一个事件
        this._timeIndex = this._timeIndex || 0;
        if (this._timeIndex >= this._timeCounters.length) {
            // 一次轮回清理一起当前记录的耗时任务
            this._lastEndTaskId = null;
            this.lastEndArmyTaskId = null;
            this._timeIndex = 0;
        }
        var timer = this._timeCounters[this._timeIndex];
        if (timer.delta >= timer.checkTime) {
            timer.outTimeHandler(timer.delta);
            timer.delta = 0;
        }
        this._timeIndex++;
    };
    GameMgr.guideStepData = null;
    GameMgr.guideChainData = null;
    /** 本地数据 */
    GameMgr.lUserData = null;
    GameMgr.lRobotGradeData = null;
    /** 引导管理器 */
    GameMgr.guideMgr = null;
    /** 管理器 */
    GameMgr.mapMgr = null;
    /** 跳转管理器 */
    GameMgr.jumpToMgr = null;
    /** UI管理器 */
    GameMgr.uiMgr = UIMgr_1.UIMgr;
    GameMgr.redMgr = null;
    return GameMgr;
}(ES5Ex_1.ObjectWrap));
exports.default = GameMgr;

cc._RF.pop();