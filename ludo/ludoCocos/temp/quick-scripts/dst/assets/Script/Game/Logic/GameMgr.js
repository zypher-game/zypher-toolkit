
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Logic/GameMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Mb2dpYy9HYW1lTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLHVEQUFtRDtBQUNuRCxvREFBc0Q7QUFDdEQsa0RBQXNEO0FBQ3RELDBEQUFxRDtBQUNyRCx3RUFBdUU7QUFDdkUsa0RBQWlEO0FBQ2pELDJDQUEyRDtBQUMzRCxtQ0FBdUM7QUFDdkMsMERBQTZEO0FBQzdELHNEQUFxRDtBQUNyRCxrRUFBaUU7QUFDakUsZ0VBQStEO0FBQy9ELHdEQUF1RDtBQUN2RCxvRUFBbUU7QUFDbkUsb0RBQW1EO0FBQ25ELHdEQUF1RDtBQUN2RCxzREFBcUQ7QUFDckQsa0VBQWlFO0FBQ2pFLDhEQUE2RDtBQUM3RCxrREFBaUQ7QUFDakQsdURBQW1EO0FBQ25ELDRDQUEyQztBQUMzQywwREFBeUQ7QUFDekQsbUNBQThCO0FBRTlCOzs7Ozs7OztHQVFHO0FBRUg7SUFBcUMsMkJBQVU7SUFBL0M7UUFBQSxxRUE4UEM7UUE3TkMsVUFBVTtRQUNWLGFBQWE7UUFDSCxtQkFBYSxHQUFnQixFQUFFLENBQUM7UUFDMUMsY0FBYztRQUNKLGtCQUFZLEdBQW9CLEVBQUUsQ0FBQztRQUU3QyxpQ0FBaUM7UUFDdkIsb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFDeEMsK0JBQStCO1FBQ3hCLHVCQUFpQixHQUFXLElBQUksQ0FBQzs7SUFvTjFDLENBQUM7SUE1UGUsV0FBRyxHQUFqQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFxQ0QseUlBQXlJO0lBQ3pJLGdCQUFnQjtJQUNDLDRCQUFvQixHQUFyQztRQUNFLE1BQU0sQ0FBQyxTQUFTLEdBQUc7WUFDakIsT0FBTyxFQUFFLEVBQUU7WUFDWCxX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LEdBOFA5QztrQkE5UG9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBsZXRlQ2FsbGJhY2ssXHJcbiAgR2FtZVRpbWVDbG9jayxcclxuICBHYW1lVGltZXIsXHJcbiAgUHJvZ3Jlc3NDYWxsYmFjayxcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vZC50cy9nYW1lL0pYQ0xCdGxcIjtcclxuaW1wb3J0IHsgSlhEZWYgfSBmcm9tIFwiLi4vLi4vY29udmVudGlvbnMvSlhDb21tb25cIjtcclxuaW1wb3J0IHsgSU5WQUxJRF9WQUxVRSB9IGZyb20gXCIuLi8uLi9Db3JlL0NvcmVEZWZpbmVcIjtcclxuaW1wb3J0IHsgT2JqZWN0V3JhcCB9IGZyb20gXCIuLi8uLi9Db3JlL0ZyYW1lRXgvRVM1RXhcIjtcclxuaW1wb3J0IEdUaW1lck1nciBmcm9tIFwiLi4vLi4vQ29yZS9NYW5hZ2VyL0dUaW1lck1nclwiO1xyXG5pbXBvcnQgeyBSZWRQb2ludExvZ2ljTWdyIH0gZnJvbSBcIi4uLy4uL0NvcmUvTWFuYWdlci9SZWRQb2ludExvZ2ljTWdyXCI7XHJcbmltcG9ydCB7IFVJTWdyIH0gZnJvbSBcIi4uLy4uL0NvcmUvTWFuYWdlci9VSU1nclwiO1xyXG5pbXBvcnQgeyBDSEVDS19USU1FLCBMb2FkaW5nVHlwZSB9IGZyb20gXCIuLi9Db21tb24vRGVmaW5lXCI7XHJcbmltcG9ydCB7IFZJRVdfSUQgfSBmcm9tIFwiLi4vQ29tbW9uL1VJXCI7XHJcbmltcG9ydCB7IExSb2JvdEdyYWRlRGF0YSB9IGZyb20gXCIuLi9EYXRhL0xvY2Fscy9MUm9ib3RHcmFkZVwiO1xyXG5pbXBvcnQgeyBMVXNlckRhdGEgfSBmcm9tIFwiLi4vRGF0YS9Mb2NhbHMvTFVzZXJEYXRhXCI7XHJcbmltcG9ydCB7IFNHdWlkZUNoYWluRGF0YSB9IGZyb20gXCIuLi9EYXRhL1N0YXRpYy9TR3VpZGVDaGFpbkRhdGFcIjtcclxuaW1wb3J0IHsgU0d1aWRlU3RlcERhdGEgfSBmcm9tIFwiLi4vRGF0YS9TdGF0aWMvU0d1aWRlU3RlcERhdGFcIjtcclxuaW1wb3J0IHsgU0xldmVsRGF0YSB9IGZyb20gXCIuLi9EYXRhL1N0YXRpYy9TTGV2ZWxEYXRhXCI7XHJcbmltcG9ydCB7IFNMZXZlbFJld2FyZERhdGEgfSBmcm9tIFwiLi4vRGF0YS9TdGF0aWMvU0xldmVsUmV3YXJkRGF0YVwiO1xyXG5pbXBvcnQgeyBTTnBjRGF0YSB9IGZyb20gXCIuLi9EYXRhL1N0YXRpYy9TTnBjRGF0YVwiO1xyXG5pbXBvcnQgeyBTUGxhbmVEYXRhIH0gZnJvbSBcIi4uL0RhdGEvU3RhdGljL1NQbGFuZURhdGFcIjtcclxuaW1wb3J0IHsgU1JhbmtEYXRhIH0gZnJvbSBcIi4uL0RhdGEvU3RhdGljL1NSYW5rRGF0YVwiO1xyXG5pbXBvcnQgeyBTUmFua1Jld2FyZERhdGEgfSBmcm9tIFwiLi4vRGF0YS9TdGF0aWMvU1JhbmtSZXdhcmREYXRhXCI7XHJcbmltcG9ydCB7IFNTeXN0ZW1Db25maWcgfSBmcm9tIFwiLi4vRGF0YS9TdGF0aWMvU1N5c3RlbUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHdWlkZUxvZ2ljIH0gZnJvbSBcIi4uL0d1aWRlL0d1aWRlTG9naWNcIjtcclxuaW1wb3J0IEp1bXBUb01nciBmcm9tIFwiLi4vVmlld3MvVmlld1V0aWwvSnVtcFV0aWxcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi8uLi8uLi9Db3JlL0dDdHJsXCI7XHJcbmltcG9ydCB7IERhdGFQb29sIH0gZnJvbSBcIi4vLi4vLi4vQ29yZS9NYW5hZ2VyL0RhdGFQb29sXCI7XHJcbmltcG9ydCBNYXBNZ3IgZnJvbSBcIi4vTWFwTWdyXCI7XHJcblxyXG4vKipcclxuICogMS4g6aG555uu6LCD6K+V546v5aKDICAgICBXRF9ERUJVRyAgICAg5p6E5bu65Litd2REZWJ1ZyA9IHRydWVcclxuICogMi4g5YWo5bGA5o6n5Yi25ZmoICAgICAgIGp4ICAgICAgICAgICAgICAgQ0NfREVWfHwgQ0NfREVCVUcgLCDkuJQgV0RfREVCVUdcclxuICogMy4g54mp5ZOB5Luj56CBICAgICAgICAgICAgICAgICAgICAgICAgIENDX0RFViB8fCBDQ19ERUJVRyAsIOS4lCBXRF9ERUJVRztcclxuICogNC4gR03mjIfku6QgICAgICAgICAgICAgICAgICAgICAgICAgIENDX0RFViB8fCBDQ19ERUJVR1xyXG4gKiA1LiDmqKHmi5/lhYXlgLwgICAgICAgICAgICAgICAgICAgICAgICAgR03mjIfku6TlvIDlkK/vvIzlr7nlupRTREvmsqHmnInph43ovb3mlK/ku5jmjqXlj6NcclxuICogNi4g5YWF5YC85YWl5Y+jICAgICAgICAgICAgICAgICAgICAgICAgIElPU+S4jeWPr+aUr+S7mCjku6Xlj4rljrvpmaQp77yM5YW25LuW55qE6YCa6L+HR2FtZUVuduWPguaVsOWGs+WumlxyXG4gKiA3LiDliIbkuqvmjqXlj6MgICAgICAgICAgICAgICAgICAgICAgICAg5qC55o2uU0RL5o+Q5L6b55qEY2FuU2RrU2hhcmXlh73mlbDnmoTov5Tlm57lgLzlhrPlrppcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWdyIGV4dGVuZHMgT2JqZWN0V3JhcCB7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zOiBHYW1lTWdyO1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5zKCk6IEdhbWVNZ3Ige1xyXG4gICAgaWYgKCF0aGlzLl9pbnMpIHtcclxuICAgICAgdGhpcy5faW5zID0gbmV3IEdhbWVNZ3IoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9pbnM7XHJcbiAgfVxyXG4gIC8qKiDng63mlbDmja4gKi9cclxuXHJcbiAgLyoqIOmdmeaAgeaVsOaNriAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgc3lzdGVtQ29uZmlnOiBTU3lzdGVtQ29uZmlnO1xyXG4gIHB1YmxpYyBzdGF0aWMgcGxhbmVEYXRhOiBTUGxhbmVEYXRhO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmFua1Jld2FyZERhdGE6IFNSYW5rUmV3YXJkRGF0YTtcclxuICBwdWJsaWMgc3RhdGljIHJhbmtEYXRhOiBTUmFua0RhdGE7XHJcbiAgcHVibGljIHN0YXRpYyBsZXZlbFJld2FyZERhdGE6IFNMZXZlbFJld2FyZERhdGE7XHJcbiAgcHVibGljIHN0YXRpYyBucGNEYXRhOiBTTnBjRGF0YTtcclxuICBwdWJsaWMgc3RhdGljIGxldmVsRGF0YTogU0xldmVsRGF0YTtcclxuICBwdWJsaWMgc3RhdGljIGd1aWRlU3RlcERhdGE6IFNHdWlkZVN0ZXBEYXRhID0gbnVsbDtcclxuICBwdWJsaWMgc3RhdGljIGd1aWRlQ2hhaW5EYXRhOiBTR3VpZGVDaGFpbkRhdGEgPSBudWxsO1xyXG4gIC8qKiDmnKzlnLDmlbDmja4gKi9cclxuICBwdWJsaWMgc3RhdGljIGxVc2VyRGF0YTogTFVzZXJEYXRhID0gbnVsbDtcclxuICBwdWJsaWMgc3RhdGljIGxSb2JvdEdyYWRlRGF0YTogTFJvYm90R3JhZGVEYXRhID0gbnVsbDtcclxuICAvKiog5byV5a+8566h55CG5ZmoICovXHJcbiAgcHVibGljIHN0YXRpYyBndWlkZU1ncjogR3VpZGVMb2dpYyA9IG51bGw7XHJcbiAgLyoqIOeuoeeQhuWZqCAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgbWFwTWdyOiBNYXBNZ3IgPSBudWxsO1xyXG4gIC8qKiDot7PovaznrqHnkIblmaggKi9cclxuICBwdWJsaWMgc3RhdGljIGp1bXBUb01ncjogSnVtcFRvTWdyID0gbnVsbDtcclxuXHJcbiAgLyoqIFVJ566h55CG5ZmoICovXHJcbiAgcHVibGljIHN0YXRpYyB1aU1nciA9IFVJTWdyO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVkTWdyOiBSZWRQb2ludExvZ2ljTWdyID0gbnVsbDtcclxuICAvKirlvZPliY3muKDpgZMgKi9cclxuICAvKiog5pe26Ze06LCD5bqm5a655ZmoICovXHJcbiAgcHJvdGVjdGVkIF90aW1lQ291bnRlcnM6IEdhbWVUaW1lcltdID0gW107XHJcbiAgLyoqIOWumuaXtumXuemSn+euoeeQhuWZqCAqL1xyXG4gIHByb3RlY3RlZCBfdGltZUNvbG9ja3M6IEdhbWVUaW1lQ2xvY2tbXSA9IFtdO1xyXG4gIHByb3RlY3RlZCBfdGltZUluZGV4OiBudW1iZXI7XHJcbiAgLyoqIOiAl+aXtuS7u+WKoeWOu+mHje+8iOWmguaenOefreaXtumXtOWGheWHuueOsOWQjOS4gOS4quS7u+WKoeWIme+8jOS4jeWPkemAge+8iSAqL1xyXG4gIHByb3RlY3RlZCBfbGFzdEVuZFRhc2tJZDogc3RyaW5nID0gbnVsbDtcclxuICAvKiog5Yab6Zif5Lu75Yqh5Y676YeN77yI5aaC5p6c56uv5pe26Ze05YaF5Ye6546w5ZCM5LiA5Liq5Lu75Yqh5YiZ5LiN5Y+R6YCBICovXHJcbiAgcHVibGljIGxhc3RFbmRBcm15VGFza0lkOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL0luaXQgRnVuY3Rpb25zLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8vIOWKoOi9vWkxOG7lrqLmiLfnq6/ooajmoLzmlbDmja5cclxuICBwcm90ZWN0ZWQgc3RhdGljIF9fU1RBVElDX0NPTkZJR19JTklUKCkge1xyXG4gICAgd2luZG93LndkU3RhdGljcyA9IHtcclxuICAgICAgbG9jYWxlczogW10sXHJcbiAgICAgIGxhdW5jaEZpbGVzOiBbXSxcclxuICAgICAgYWxsRmlsZXM6IFtcclxuICAgICAgICBcInBsYW5lRGF0YVwiLFxyXG4gICAgICAgIFwic3lzdGVtQ29uZmlnXCIsXHJcbiAgICAgICAgXCJyYW5rUmV3YXJkRGF0YVwiLFxyXG4gICAgICAgIFwicmFua0RhdGFcIixcclxuICAgICAgICBcImxldmVsUmV3YXJkRGF0YVwiLFxyXG4gICAgICAgIFwibnBjRGF0YVwiLFxyXG4gICAgICAgIFwibGV2ZWxEYXRhXCIsXHJcbiAgICAgICAgXCJndWlkZVN0ZXBEYXRhXCIsXHJcbiAgICAgICAgXCJndWlkZUNoYWluRGF0YVwiLFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICAgIHdpbmRvdy53ZFN0YXRpY3MubG9jYWxlcyA9IHdpbmRvdy53ZFN0YXRpY3MubG9jYWxlcy5tYXAoKHYsIGspID0+IFwiXCIgKyB2KTtcclxuICAgIHdpbmRvdy53ZFN0YXRpY3MubGF1bmNoRmlsZXMgPSB3aW5kb3cud2RTdGF0aWNzLmxhdW5jaEZpbGVzLm1hcChcclxuICAgICAgKHYsIGspID0+IFwiXCIgKyB2XHJcbiAgICApO1xyXG4gICAgd2luZG93LndkU3RhdGljcy5hbGxGaWxlcyA9IHdpbmRvdy53ZFN0YXRpY3MuYWxsRmlsZXMubWFwKCh2LCBrKSA9PiBcIlwiICsgdik7XHJcbiAgICB3aW5kb3cud2RTdGF0aWNzLmxvYWRTdGF0dXMgPSB3aW5kb3cud2RTdGF0aWNzLmxvYWRTdGF0dXMgfHwgW107XHJcbiAgfVxyXG5cclxuICAvKiog5Yid5aeL5YyW5a6i5oi356uv55m76ZmG55qE5pe25YCZ6ZyA6KaB55qE6Z2Z5oCB5pWw5o2uICovXHJcbiAgcHVibGljIHN0YXRpYyBpbml0TG9naW5TdGF0aWMoXHJcbiAgICBwcm9ncmVzczogUHJvZ3Jlc3NDYWxsYmFjazxhbnk+LFxyXG4gICAgY2FsbEJhY2s6IENvbXBsZXRlQ2FsbGJhY2s8YW55PlxyXG4gICkge1xyXG4gICAgdGhpcy5fX1NUQVRJQ19DT05GSUdfSU5JVCgpO1xyXG4gICAgbGV0IG9uTG9hZEVuZCA9ICgpID0+IHtcclxuICAgICAgY2FsbEJhY2soKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGZpbGVOYW1lcyA9IHdpbmRvdy53ZFN0YXRpY3MubGF1bmNoRmlsZXM7XHJcbiAgICBEYXRhUG9vbC5pbnMoKS5sb2FkUlRTdGF0aWNzKFxyXG4gICAgICBmaWxlTmFtZXMsXHJcbiAgICAgIChmaWxlTmFtZTogc3RyaW5nLCBjdXI6IG51bWJlciwgdG90YWw6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHdpbmRvdy53ZFN0YXRpY3MubG9hZFN0YXR1c1tmaWxlTmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIHByb2dyZXNzICYmIHByb2dyZXNzKGN1ciwgZmlsZU5hbWVzLmxlbmd0aCk7XHJcbiAgICAgIH0sXHJcbiAgICAgICgpID0+IG9uTG9hZEVuZCgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8g5Yid5aeL5YyW5a6i5oi356uv55m76ZmG55qE5pe25YCZ6ZyA6KaB55qE6L+Q54Ot5pWw5o2uXHJcbiAgcHVibGljIHN0YXRpYyBvbkluaXRMb2dpblJ1blRpbWUoKSB7fVxyXG5cclxuICAvLyDpgJrnlKjnu5PmnZ/mjqXlj6NcclxuICBwcm90ZWN0ZWQgc3RhdGljIF9jb21tb25TdGF0aWNzTG9hZEVuZCgpIHtcclxuICAgIHRoaXMuc3lzdGVtQ29uZmlnID0gRGF0YVBvb2wuaW5zKCkuZ2V0U3RhdGljKFNTeXN0ZW1Db25maWcpO1xyXG4gICAgdGhpcy5wbGFuZURhdGEgPSBEYXRhUG9vbC5pbnMoKS5nZXRTdGF0aWMoU1BsYW5lRGF0YSk7XHJcbiAgICB0aGlzLnJhbmtSZXdhcmREYXRhID0gRGF0YVBvb2wuaW5zKCkuZ2V0U3RhdGljKFNSYW5rUmV3YXJkRGF0YSk7XHJcbiAgICB0aGlzLnJhbmtEYXRhID0gRGF0YVBvb2wuaW5zKCkuZ2V0U3RhdGljKFNSYW5rRGF0YSk7XHJcbiAgICB0aGlzLmxldmVsUmV3YXJkRGF0YSA9IERhdGFQb29sLmlucygpLmdldFN0YXRpYyhTTGV2ZWxSZXdhcmREYXRhKTtcclxuICAgIHRoaXMubnBjRGF0YSA9IERhdGFQb29sLmlucygpLmdldFN0YXRpYyhTTnBjRGF0YSk7XHJcbiAgICB0aGlzLmxldmVsRGF0YSA9IERhdGFQb29sLmlucygpLmdldFN0YXRpYyhTTGV2ZWxEYXRhKTtcclxuICAgIHRoaXMuZ3VpZGVTdGVwRGF0YSA9IERhdGFQb29sLmlucygpLmdldFN0YXRpYyhTR3VpZGVTdGVwRGF0YSk7XHJcbiAgICB0aGlzLmd1aWRlQ2hhaW5EYXRhID0gRGF0YVBvb2wuaW5zKCkuZ2V0U3RhdGljKFNHdWlkZUNoYWluRGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKiog5Yid5aeL5YyWICovXHJcbiAgcHVibGljIHN0YXRpYyBpbml0RnJpc3RHYW1lU3RhdGljcyhcclxuICAgIHByb2dyZXNzOiBQcm9ncmVzc0NhbGxiYWNrPGFueT4sXHJcbiAgICBjYWxsQmFjazogQ29tcGxldGVDYWxsYmFjazxhbnk+XHJcbiAgKSB7XHJcbiAgICBEYXRhUG9vbC5pbnMoKS5sb2FkUlRTdGF0aWNzKFxyXG4gICAgICB3aW5kb3cud2RTdGF0aWNzLmFsbEZpbGVzLFxyXG4gICAgICAoZmlsZU5hbWU6IHN0cmluZywgY3VyOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpID0+IHtcclxuICAgICAgICB3aW5kb3cud2RTdGF0aWNzLmxvYWRTdGF0dXNbZmlsZU5hbWVdID0gdHJ1ZTtcclxuICAgICAgICBwcm9ncmVzcyAmJiBwcm9ncmVzcyhjdXIsIHdpbmRvdy53ZFN0YXRpY3MuYWxsRmlsZXMubGVuZ3RoKTtcclxuICAgICAgfSxcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2NvbW1vblN0YXRpY3NMb2FkRW5kKCk7XHJcbiAgICAgICAgR2FtZU1nci5pbml0TG9jYWxEYXRhKCk7XHJcbiAgICAgICAgR2FtZU1nci5pbml0R2FtZVJ1blRpbWUoKTtcclxuICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0QWxsU3RhdGljcyhcclxuICAgIHByb2dyZXNzOiBQcm9ncmVzc0NhbGxiYWNrPGFueT4sXHJcbiAgICBjYWxsQmFjazogQ29tcGxldGVDYWxsYmFjazxhbnk+XHJcbiAgKSB7XHJcbiAgICB0aGlzLl9fU1RBVElDX0NPTkZJR19JTklUKCk7XHJcbiAgICBsZXQgdGFibGUgPSB3aW5kb3cud2RTdGF0aWNzLmFsbEZpbGVzO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3cud2RTdGF0aWNzLmxhdW5jaEZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0YWJsZS5pbmRleE9mKHdpbmRvdy53ZFN0YXRpY3MubGF1bmNoRmlsZXNbaV0pICE9IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICB0YWJsZS5wdXNoKC4uLndpbmRvdy53ZFN0YXRpY3MubGF1bmNoRmlsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIERhdGFQb29sLmlucygpLmxvYWRSVFN0YXRpY3MoXHJcbiAgICAgIHRhYmxlLFxyXG4gICAgICAoZmlsZU5hbWU6IHN0cmluZywgY3VyOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpID0+IHtcclxuICAgICAgICB3aW5kb3cud2RTdGF0aWNzLmxvYWRTdGF0dXNbZmlsZU5hbWVdID0gdHJ1ZTtcclxuICAgICAgICBwcm9ncmVzcyAmJiBwcm9ncmVzcyhjdXIsIHRhYmxlLmxlbmd0aCk7XHJcbiAgICAgIH0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jb21tb25TdGF0aWNzTG9hZEVuZCgpO1xyXG4gICAgICAgIEdhbWVNZ3IuaW5pdExvY2FsRGF0YSgpO1xyXG4gICAgICAgIEdhbWVNZ3IuaW5pdEdhbWVSdW5UaW1lKCk7XHJcbiAgICAgICAgY2FsbEJhY2soKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiDliJ3lp4vljJblrqLmiLfnq6/muLjmiI/ov5vooYzml7bpnIDopoHnmoTng63mlbDmja4gKi9cclxuICBwdWJsaWMgc3RhdGljIGluaXRHYW1lUnVuVGltZSgpIHt9XHJcblxyXG4gIC8qKuWIneWni+WMluacrOWcsOaVsOaNriAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdExvY2FsRGF0YSgpIHtcclxuICAgIHRoaXMubFVzZXJEYXRhID0gRGF0YVBvb2wuaW5zKCkuZ2V0TG9jYWwoTFVzZXJEYXRhKTtcclxuICAgIHRoaXMubFJvYm90R3JhZGVEYXRhID0gRGF0YVBvb2wuaW5zKCkuZ2V0TG9jYWwoTFJvYm90R3JhZGVEYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKiDliJ3lp4vljJbpgLvovpHnrqHnkIblmaggKi9cclxuICBwdWJsaWMgc3RhdGljIGluaXRMb2dpY01hbmFnZXIoKSB7XHJcbiAgICB0aGlzLmd1aWRlTWdyID0gR3VpZGVMb2dpYy5pbnMoKTtcclxuICAgIHRoaXMubWFwTWdyID0gTWFwTWdyLmlucztcclxuICAgIHRoaXMucmVkTWdyID0gUmVkUG9pbnRMb2dpY01nci5pbnMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdFNpbXVsYXRvcigpIHtcclxuICAgIHRoaXMuanVtcFRvTWdyID0gSnVtcFRvTWdyLmlucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0UmVDb25uZWN0RXZlbnQoKSB7fVxyXG5cclxuICBwdWJsaWMgaW5pdEdhbWUoKSB7XHJcbiAgICBHQ3RybC5FUy5vbihcclxuICAgICAgR0N0cmwuR1RpbWVyU2Vjb25kRXZlbnRNc2csXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHRoaXMub25UaW1lQ2FsY3VsYXQuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICAgIGxldCBub3cgPSBHQ3RybC5ub3c7XHJcbiAgICB0aGlzLl90aW1lQ291bnRlcnMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBkZWx0YTogMCxcclxuICAgICAgICBjaGVja1RpbWU6IENIRUNLX1RJTUUuVElNRV9DTE9DS19DSEVDSyxcclxuICAgICAgICBvdXRUaW1lSGFuZGxlcjogR2FtZU1nci5yZWRNZ3IudGltaW5nQ2hlY2suYmluZChHYW1lTWdyLnJlZE1nciksXHJcbiAgICAgIH0sXHJcbiAgICBdO1xyXG4gICAgR1RpbWVyTWdyLmlucygpLnN0YXJ0KCk7XHJcbiAgICAvL+W6leWxguWKn+iDvVxyXG4gICAgLy8g5LqM57qnXHJcbiAgICBHYW1lTWdyLmp1bXBUb01nci5pbml0R2FtZSgpO1xyXG4gICAgLy8g5LiJ57qnOiDnu7zlkIjnrqHnkIblmajopoHmlL7liLDlhbbku5blip/og73mqKHlnZfnmoTnrqHnkIblmajlkI7pnaLvvIzlm6DkuLrkvJrmnInlvJXnlKhcclxuICAgIEdhbWVNZ3IuZ3VpZGVNZ3IuaW5pdEdhbWUoKTtcclxuICAgIEdhbWVNZ3IucmVkTWdyLmluaXRHYW1lKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25SZWNvbm5lY3QoKSB7fVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNsZWFyUnVuVGltZSgpIHtcclxuICAgIERhdGFQb29sLmlucygpLmNsZWFyUnVuVGltZXMoKTtcclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBjbGVhckxvYWNhbERhdGEoKSB7XHJcbiAgICBEYXRhUG9vbC5pbnMoKS5jbGVhckxvY2FscygpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVzdGFydCgpIHtcclxuICAgIC8vIOazqOmUgOS6i+S7tlxyXG4gICAgR0N0cmwuRVMub2ZmKHRoaXMpO1xyXG4gICAgLy8g5rOo6ZSA5LqL5Lu2XHJcbiAgICBHQ3RybC5FUy5vZmYodGhpcyk7XHJcbiAgICBHYW1lTWdyLmd1aWRlTWdyLmxvZ2luT3V0KCk7XHJcbiAgICBHYW1lTWdyLmp1bXBUb01nci5sb2dpbk91dCgpO1xyXG4gICAgR2FtZU1nci5yZWRNZ3IubG9naW5PdXQoKTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIEpYRGVmLkxPQ0FMX0tFWSkge1xyXG4gICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oSlhEZWYuTE9DQUxfS0VZW2tleV0pO1xyXG4gICAgfVxyXG4gICAgR2FtZU1nci5jbGVhclJ1blRpbWUoKTtcclxuICAgIEdhbWVNZ3IuY2xlYXJMb2FjYWxEYXRhKCk7XHJcbiAgICBsZXQgR3VpZGVSb290ID0gR2FtZU1nci51aU1nci51aVJvb3QucGFyZW50LmdldENoaWxkQnlOYW1lKFwiR3VkaWVSb290XCIpO1xyXG4gICAgaWYgKEd1aWRlUm9vdCkge1xyXG4gICAgICBHdWlkZVJvb3QuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgbGV0IHRvcFBhbm5lbCA9IEdhbWVNZ3IudWlNZ3IudWlSb290LmdldENoaWxkQnlOYW1lKFwiVG9wVWlJdGVtXCIpO1xyXG4gICAgaWYgKHRvcFBhbm5lbCkge1xyXG4gICAgICB0b3BQYW5uZWwuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgLy8g56e76Zmk5omA5pyJ55WM6Z2iXHJcbiAgICBVSU1nci5yZW1vdmVBbGxBY3RpdmVXaW4oKTtcclxuICAgIFVJTWdyLnNob3dXaW4oVklFV19JRC5sb2FkLCBMb2FkaW5nVHlwZS5BcHBTdGFydCk7XHJcbiAgfVxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIG9uVGltZUNhbGN1bGF0KCkge1xyXG4gICAgLy8gQ29sb3JMb2cuZXNPbihcIkdDdHJsLkdUaW1lclNlY29uZEV2ZW50TXNnKTtcclxuICAgIHRoaXMuX3RpbWVDb3VudGVycy5mb3JFYWNoKChlKSA9PiAoZS5kZWx0YSArPSBHQ3RybC5kZWx0YVNlY29uZFRpbWUpKTtcclxuICAgIC8vIOaAp+iDveS8mOWMlu+8jOS/neivgeS4gOW4p+acgOWkmuWkhOeQhuS4gOS4quS6i+S7tlxyXG4gICAgdGhpcy5fdGltZUluZGV4ID0gdGhpcy5fdGltZUluZGV4IHx8IDA7XHJcbiAgICBpZiAodGhpcy5fdGltZUluZGV4ID49IHRoaXMuX3RpbWVDb3VudGVycy5sZW5ndGgpIHtcclxuICAgICAgLy8g5LiA5qyh6L2u5Zue5riF55CG5LiA6LW35b2T5YmN6K6w5b2V55qE6ICX5pe25Lu75YqhXHJcbiAgICAgIHRoaXMuX2xhc3RFbmRUYXNrSWQgPSBudWxsO1xyXG4gICAgICB0aGlzLmxhc3RFbmRBcm15VGFza0lkID0gbnVsbDtcclxuICAgICAgdGhpcy5fdGltZUluZGV4ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGltZXIgPSB0aGlzLl90aW1lQ291bnRlcnNbdGhpcy5fdGltZUluZGV4XTtcclxuICAgIGlmICh0aW1lci5kZWx0YSA+PSB0aW1lci5jaGVja1RpbWUpIHtcclxuICAgICAgdGltZXIub3V0VGltZUhhbmRsZXIodGltZXIuZGVsdGEpO1xyXG4gICAgICB0aW1lci5kZWx0YSA9IDA7XHJcbiAgICB9XHJcbiAgICB0aGlzLl90aW1lSW5kZXgrKztcclxuICB9XHJcbn1cclxuIl19