"use strict";
cc._RF.push(module, '3d3a61E3jpIAq7xT4SNxl0E', 'GuideLogic');
// Script/Game/Guide/GuideLogic.ts

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
exports.GuideLogic = exports.GuidType = void 0;
var CoreDefine_1 = require("../../Core/CoreDefine");
var ColorLog_1 = require("../../Core/FrameEx/ColorLog");
var ES5Ex_1 = require("../../Core/FrameEx/ES5Ex");
var GLoader_1 = require("../../Core/GLoader/GLoader");
var UIAction_1 = require("../Common/UIAction");
var UIResources_1 = require("../Common/UIResources");
var GameMgr_1 = require("../Logic/GameMgr");
var GCtrl_1 = require("./../../Core/GCtrl");
var Define_1 = require("./../Common/Define");
var ConditionListener_1 = require("./../Logic/ConditionListener");
var GuideComponent_1 = require("./GuideComponent");
/** 引导开关 */
var DEF_GUIDE_OPEN = true;
var STORY_ROOT = "StoryRoot";
var STORY_MASK = "StoryMask";
var UN_FORCE_GUIDE_NAME = "UnForceGuide";
var UIN_FORCE_GUIDE_CHECK_TIME = 0.5;
var GuidType;
(function (GuidType) {
    /** 对话框 0*/
    GuidType[GuidType["Dialog"] = 0] = "Dialog";
    /** 教学展示 1*/
    GuidType[GuidType["JiaoXue"] = 1] = "JiaoXue";
    /** 点击 2*/
    GuidType[GuidType["Click"] = 2] = "Click";
    /** 进度条 3*/
    GuidType[GuidType["Slide"] = 3] = "Slide";
    /** 拖拽控件 4*/
    GuidType[GuidType["Drag"] = 4] = "Drag";
    /** 列表点击 5*/
    GuidType[GuidType["ListItemClick"] = 5] = "ListItemClick";
    /** 节点拖拽 6*/
    GuidType[GuidType["NodeMove"] = 6] = "NodeMove";
    /** 列表位置点击 7 */
    GuidType[GuidType["SCrollViewClick"] = 7] = "SCrollViewClick";
    /** 教学预制件 */
    GuidType[GuidType["TeachPrefab"] = 8] = "TeachPrefab";
})(GuidType = exports.GuidType || (exports.GuidType = {}));
var GuideTriggerListener = /** @class */ (function (_super) {
    __extends(GuideTriggerListener, _super);
    function GuideTriggerListener(guideRaw, logic) {
        var _this = _super.call(this) || this;
        _this.guideId = guideRaw.guideId;
        _this.viewId = guideRaw.viewId;
        _this.closeId = guideRaw.closeId;
        _this._logic = logic;
        _this.inited();
        if (_this._curState == true) {
            _this.emitConditionEnvChange(null);
        }
        return _this;
    }
    /** 环境变更回调 */
    GuideTriggerListener.prototype.emitConditionEnvChange = function (emitter) {
        // this._logic._onGuideTriggerOn(this.guideId);
    };
    return GuideTriggerListener;
}(ConditionListener_1.ConditionListter));
var GuideLogic = /** @class */ (function (_super) {
    __extends(GuideLogic, _super);
    function GuideLogic() {
        var _this = _super.call(this) || this;
        _this._guide = null;
        _this._step = 0;
        _this._guidId = null;
        _this._curAudioId = CoreDefine_1.INVALID_VALUE;
        _this._param = null;
        /** 当前激活的非强制引导 */
        _this._unForcesGuide = new ES5Ex_1.SetWrap();
        _this._guideTriggers = [];
        _this._unForceGuideCheckTime = 0;
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GClientWinOpenEventAfterMsg, _this, _this.onWinOpen.bind(_this), CoreDefine_1.PRIORITY_DATA);
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GClientWinDestroyEventMsg, _this, _this.onWinClose.bind(_this), CoreDefine_1.PRIORITY_DATA);
        GCtrl_1.GCtrl.ES.on(Define_1.CMsg.data.onGuideEvent, _this, _this.onCMSGGuideEvent.bind(_this), CoreDefine_1.PRIORITY_DATA);
        GCtrl_1.GCtrl.ES.on(Define_1.CMsg.data.setGuide, _this, _this._onRPCSetGuide.bind(_this), CoreDefine_1.PRIORITY_VIEW);
        if (!_this._logicApl)
            _this._logicApl = GLoader_1.GAssetImpl.getAssetImpl(cc.js.getClassName(_this));
        return _this;
    }
    GuideLogic.ins = function () {
        if (!this._ins) {
            this._ins = new GuideLogic();
        }
        return this._ins;
    };
    Object.defineProperty(GuideLogic.prototype, "step", {
        get: function () {
            return this._step;
        },
        enumerable: false,
        configurable: true
    });
    GuideLogic.prototype.onWinOpen = function (_, value) {
        ColorLog_1.default.esOn("GCtrl.GClientWinOpenEventAfterMsg");
        this.startGuideLine(value, false);
    };
    GuideLogic.prototype.onWinClose = function (_, value) {
        ColorLog_1.default.esOn("GCtrl.GClientWinDestroyEventMsg");
        this.startGuideLine(value.winId, true);
    };
    /** 判断当前是否又引导 */
    GuideLogic.prototype.isGuidding = function () {
        return this.isForceGuidding() || this.isUnforceGuide();
    };
    /** 当前是否存在强制引导 */
    GuideLogic.prototype.isForceGuidding = function () {
        return this._guidId != null;
    };
    Object.defineProperty(GuideLogic.prototype, "guidId", {
        get: function () {
            return this._guidId;
        },
        enumerable: false,
        configurable: true
    });
    /** 当前是否存在某一条非强制引导 */
    GuideLogic.prototype.isUnforceGuide = function (guideId) {
        if (!guideId)
            return this._unForcesGuide.size > 0;
        return this._unForcesGuide.has(guideId);
    };
    /**游戏初始化入口 */
    GuideLogic.prototype.initGame = function () {
        if (!DEF_GUIDE_OPEN)
            return;
        this.initForceGuide();
    };
    /** 初始化强制引导 */
    GuideLogic.prototype.initForceGuide = function () {
        var values = GameMgr_1.default.guideChainData.data.values();
        console.log({ values: values });
        this._guideTriggers = [];
        for (var i = 0; i < values.length; i++) {
            var raw = values[i];
            var isOver = GameMgr_1.default.lUserData.isGuideOver(raw.guideId);
            if (isOver)
                continue;
            // 没有条件的引导就不用进行触发了，需要手动触发
            //   let trigger = new GuideTriggerListener(raw, this);
            //   if (!trigger.getInitedState()) continue;
            //   this._guideTriggers.push(trigger);
        }
    };
    /**开始执行引导路线 */
    GuideLogic.prototype.startGuideLine = function (viewId, isClose) {
        // ColorLog.log({ _guideTriggers: this._guideTriggers });
        for (var i = 0; i < this._guideTriggers.length; i++) {
            var trigger = this._guideTriggers[i];
            if (trigger.viewId === viewId && !isClose) {
                console.log(viewId + "\u7A97\u53E3\u5F00\u542F\uFF0Cid:" + trigger.guideId + "\u5F15\u5BFC\u89E6\u53D1}");
                this._onGuideTriggerOn(trigger.guideId);
            }
            else if (trigger.closeId === viewId && isClose) {
                console.log(viewId + "\u7A97\u53E3\u5173\u95ED\uFF0Cid:" + trigger.guideId + "\u5F15\u5BFC\u89E6\u53D1}");
                this._onGuideTriggerOn(trigger.guideId);
            }
        }
    };
    /** 某条引导达到了触发条件 */
    GuideLogic.prototype._onGuideTriggerOn = function (guideId) {
        if (this._guidId)
            return; // 当前有引导正在进行
        for (var i = 0; i < this._guideTriggers.length; i++) {
            if (this._guideTriggers[i].guideId == guideId) {
                this._guideTriggers[i].destroy();
                this._guideTriggers.splice(i, 1);
            }
        }
        this.onCMSGGuideEvent(this, GCtrl_1.GCtrl.param(guideId));
    };
    GuideLogic.prototype.onCMSGGuideEvent = function (_, param) {
        ColorLog_1.default.esOn("CMsg.data.setGuide");
        ColorLog_1.default.esOn("CMsg.data.onGuideEvent");
        if (this._guidId != null)
            return;
        var guideId = param.get();
        // 调试模式处理
        if (CC_DEV) {
            var appCtrl = cc.find("AppCtrl").getComponent("AppCtrl");
            if (appCtrl) {
                if (appCtrl.guideEditor) {
                    this.startGuide(guideId);
                    return;
                }
            }
        }
        this.startGuide(guideId);
    };
    /**开始引导子引导id */
    GuideLogic.prototype.startGuide = function (guideID) {
        var guideNode = this.getGuideNode();
        guideNode.active = true;
        this._param = null;
        this._guidId = guideID;
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.data.onClientGuideChange);
        this._step = 0;
        var chainData = GameMgr_1.default.guideChainData.getRaw(this._guidId);
        if (!chainData) {
            this._guide.node.active = false;
            return;
        }
        this.doStep(chainData.chain[this._step]);
    };
    /** 结束本条引导 */
    GuideLogic.prototype.onEndGuide = function () {
        if (!GameMgr_1.default.lUserData.isGuideOver(this._guidId)) {
            this.onSetGuide(this._guidId);
            /**
                   * else if (this._guidId == GuidEnum.IDD_101 && DEF_GUIDE_OPEN) {
                      this.singleWaitAsyncFunc(() => true, () => {
                          GameMgr.playerData.userData.guide.push(GuidEnum.IDD_101);
                          GCtrl.ES.emit(CMsg.data.setGuide);
                      })
                  }
                   */
        }
        if (this._guide) {
            this._guide.node.active = false;
        }
        this._guidId = null;
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.data.onClientGuideChange);
    };
    /** 记录引导进度 */
    GuideLogic.prototype.onSetGuide = function (guideID) {
        GameMgr_1.default.lUserData.setGuides(guideID);
    };
    /** 引导进度回调 */
    GuideLogic.prototype._onRPCSetGuide = function (_) {
        for (var i = 0; i < this._guideTriggers.length; i++) {
            if (this._guideTriggers[i].cureState == true) {
                this._onGuideTriggerOn(this._guideTriggers[i].guideId);
                return;
            }
        }
    };
    /**下一步 */
    GuideLogic.prototype.onNextStep = function (delayTime) {
        var chainData = GameMgr_1.default.guideChainData.getRaw(this._guidId);
        var self = this;
        var delayCallBack = function () {
            console.log("next=========================================>");
            self._step++;
            if (self._step >= chainData.chain.length) {
                return;
            }
            var stepId = chainData.chain[self._step];
            self.doStep(stepId);
            if (self._param) {
                self._param.chacheSetp--;
                if (self._param.chacheSetp < 0)
                    self._param = null;
            }
        };
        // 关键步标完成，或者引导结束标完成
        if (this._step >= chainData.chain.length - 1) {
            this.onEndGuide();
            return;
        }
        if (this._step === chainData.keyStep) {
            this.onSetGuide(this._guidId);
        }
        if (delayTime) {
            UIAction_1.delayAction(this._guide.node, delayTime / 1000, delayCallBack);
        }
        else {
            delayCallBack();
        }
    };
    /**执行其中某一步 */
    GuideLogic.prototype.doStep = function (stepId) {
        var stepConfig = GameMgr_1.default.guideStepData.tryGetRaw(stepId);
        if (!stepConfig)
            return null;
        var param = null;
        if (this._param) {
            if (this._param.chacheSetp == 0) {
                param = this._param.param;
            }
        }
        var step = CoreDefine_1.OBJECT_COPY(stepConfig);
        step.path += param ? param.pathAppend : "";
        this._guide.setConfigure(step);
    };
    /** 切换场景的时候要移除 */
    GuideLogic.prototype.loginOut = function () {
        GCtrl_1.GCtrl.ES.off(this, GCtrl_1.GCtrl.GTimerMilliEventMsg);
        for (var i = 0; i < this._guideTriggers.length; i++) {
            this._guideTriggers[i].destroy();
        }
        this._guideTriggers = [];
        this._unForcesGuide.clear();
        if (this._guide)
            this._guide.node.destroy();
        var storyNode = GameMgr_1.default.uiMgr.uiRoot.getChildByName(STORY_ROOT);
        if (storyNode) {
            storyNode.destroy();
            storyNode = null;
        }
        this._guide = null;
    };
    ///////////////////////////////////////////////////////////////////////////// util functions //////////////////////////////////////////////////////////////////////
    GuideLogic.prototype.getGuideNode = function () {
        var _this = this;
        if (!this._guide) {
            var prefab = this._logicApl.getPreLoadAsset(UIResources_1.Res.common.guide_item);
            var guideNode = cc.instantiate(prefab);
            guideNode.name = "GudieRoot";
            guideNode.setContentSize(cc.winSize);
            var com = guideNode.getComponent(GuideComponent_1.default);
            com.nextCallBack = function (delayTime) {
                _this.onNextStep(delayTime);
            };
            GCtrl_1.GCtrl.canvase.node.addChild(guideNode, CoreDefine_1.MAX_TAG - 1000);
            this._guide = com;
        }
        this._guide.node.active = true;
        return this._guide.node;
    };
    GuideLogic.prototype.singleWaitAsyncFunc = function (checkCb, endCb) {
        var _this = this;
        this._waitAsyncFunc = function () {
            var result = checkCb();
            if (result) {
                _this._waitAsyncFunc = null;
                if (endCb) {
                    endCb();
                }
            }
        };
    };
    return GuideLogic;
}(ES5Ex_1.ObjectWrap));
exports.GuideLogic = GuideLogic;

cc._RF.pop();