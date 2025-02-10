
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Guide/GuideLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9HdWlkZS9HdWlkZUxvZ2ljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFNK0I7QUFDL0Isd0RBQW1EO0FBQ25ELGtEQUErRDtBQUUvRCxzREFBd0Q7QUFFeEQsK0NBQWlEO0FBQ2pELHFEQUE0QztBQUM1Qyw0Q0FBdUM7QUFDdkMsNENBQTJDO0FBQzNDLDZDQUEwQztBQUMxQyxrRUFHc0M7QUFFdEMsbURBQThDO0FBRTlDLFdBQVc7QUFDWCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFFNUIsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDO0FBQy9CLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQztBQUMvQixJQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztBQUMzQyxJQUFNLDBCQUEwQixHQUFHLEdBQUcsQ0FBQztBQUV2QyxJQUFZLFFBbUJYO0FBbkJELFdBQVksUUFBUTtJQUNsQixXQUFXO0lBQ1gsMkNBQU0sQ0FBQTtJQUNOLFlBQVk7SUFDWiw2Q0FBTyxDQUFBO0lBQ1AsVUFBVTtJQUNWLHlDQUFLLENBQUE7SUFDTCxXQUFXO0lBQ1gseUNBQUssQ0FBQTtJQUNMLFlBQVk7SUFDWix1Q0FBSSxDQUFBO0lBQ0osWUFBWTtJQUNaLHlEQUFhLENBQUE7SUFDYixZQUFZO0lBQ1osK0NBQVEsQ0FBQTtJQUNSLGVBQWU7SUFDZiw2REFBZSxDQUFBO0lBQ2YsWUFBWTtJQUNaLHFEQUFlLENBQUE7QUFDakIsQ0FBQyxFQW5CVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQW1CbkI7QUFjRDtJQUFtQyx3Q0FBZ0I7SUFNakQsOEJBQVksUUFBNEIsRUFBRSxLQUFpQjtRQUEzRCxZQUNFLGlCQUFPLFNBU1I7UUFSQyxLQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDaEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMs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LFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxDQUFDO1lBQ2pELEdBQUcsQ0FBQyxZQUFZLEdBQUcsVUFBQyxTQUFpQjtnQkFDbkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUM7WUFDRixhQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLG9CQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVTLHdDQUFtQixHQUE3QixVQUE4QixPQUFPLEVBQUUsS0FBSztRQUE1QyxpQkFVQztRQVRDLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDcEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUM7WUFDdkIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLElBQUksS0FBSyxFQUFFO29CQUNULEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0Y7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQXZUQSxBQXVUQyxDQXZUK0Isa0JBQVUsR0F1VHpDO0FBdlRZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJTlZBTElEX1ZBTFVFLFxyXG4gIE1BWF9UQUcsXHJcbiAgT0JKRUNUX0NPUFksXHJcbiAgUFJJT1JJVFlfREFUQSxcclxuICBQUklPUklUWV9WSUVXLFxyXG59IGZyb20gXCIuLi8uLi9Db3JlL0NvcmVEZWZpbmVcIjtcclxuaW1wb3J0IENvbG9yTG9nIGZyb20gXCIuLi8uLi9Db3JlL0ZyYW1lRXgvQ29sb3JMb2dcIjtcclxuaW1wb3J0IHsgT2JqZWN0V3JhcCwgU2V0V3JhcCB9IGZyb20gXCIuLi8uLi9Db3JlL0ZyYW1lRXgvRVM1RXhcIjtcclxuaW1wb3J0IEdQYXJhbSBmcm9tIFwiLi4vLi4vQ29yZS9HRXZlbnQvR1BhcmFtXCI7XHJcbmltcG9ydCB7IEdBc3NldEltcGwgfSBmcm9tIFwiLi4vLi4vQ29yZS9HTG9hZGVyL0dMb2FkZXJcIjtcclxuaW1wb3J0IHsgV2luIH0gZnJvbSBcIi4uLy4uL0NvcmUvTWFuYWdlci9VSU1nclwiO1xyXG5pbXBvcnQgeyBkZWxheUFjdGlvbiB9IGZyb20gXCIuLi9Db21tb24vVUlBY3Rpb25cIjtcclxuaW1wb3J0IHsgUmVzIH0gZnJvbSBcIi4uL0NvbW1vbi9VSVJlc291cmNlc1wiO1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi4vTG9naWMvR2FtZU1nclwiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLy4uLy4uL0NvcmUvR0N0cmxcIjtcclxuaW1wb3J0IHsgQ01zZyB9IGZyb20gXCIuLy4uL0NvbW1vbi9EZWZpbmVcIjtcclxuaW1wb3J0IHtcclxuICBDb25kaXRpb25FbWl0dGVyLFxyXG4gIENvbmRpdGlvbkxpc3R0ZXIsXHJcbn0gZnJvbSBcIi4vLi4vTG9naWMvQ29uZGl0aW9uTGlzdGVuZXJcIjtcclxuaW1wb3J0IHsgU0d1aWRlQ2hhaW5EYXRhUmF3LCBTR3VpZGVTdGVwRGF0YVJhdyB9IGZyb20gXCIuL0d1aWRlLnR5cGVcIjtcclxuaW1wb3J0IEd1aWRlQ29tcG9uZW50IGZyb20gXCIuL0d1aWRlQ29tcG9uZW50XCI7XHJcblxyXG4vKiog5byV5a+85byA5YWzICovXHJcbmNvbnN0IERFRl9HVUlERV9PUEVOID0gdHJ1ZTtcclxuXHJcbmNvbnN0IFNUT1JZX1JPT1QgPSBcIlN0b3J5Um9vdFwiO1xyXG5jb25zdCBTVE9SWV9NQVNLID0gXCJTdG9yeU1hc2tcIjtcclxuY29uc3QgVU5fRk9SQ0VfR1VJREVfTkFNRSA9IFwiVW5Gb3JjZUd1aWRlXCI7XHJcbmNvbnN0IFVJTl9GT1JDRV9HVUlERV9DSEVDS19USU1FID0gMC41O1xyXG5cclxuZXhwb3J0IGVudW0gR3VpZFR5cGUge1xyXG4gIC8qKiDlr7nor53moYYgMCovXHJcbiAgRGlhbG9nLFxyXG4gIC8qKiDmlZnlrablsZXnpLogMSovXHJcbiAgSmlhb1h1ZSxcclxuICAvKiog54K55Ye7IDIqL1xyXG4gIENsaWNrLFxyXG4gIC8qKiDov5vluqbmnaEgMyovXHJcbiAgU2xpZGUsXHJcbiAgLyoqIOaLluaLveaOp+S7tiA0Ki9cclxuICBEcmFnLFxyXG4gIC8qKiDliJfooajngrnlh7sgNSovXHJcbiAgTGlzdEl0ZW1DbGljayxcclxuICAvKiog6IqC54K55ouW5ou9IDYqL1xyXG4gIE5vZGVNb3ZlLFxyXG4gIC8qKiDliJfooajkvY3nva7ngrnlh7sgNyAqL1xyXG4gIFNDcm9sbFZpZXdDbGljayxcclxuICAvKiog5pWZ5a2m6aKE5Yi25Lu2ICovXHJcbiAgVGVhY2hQcmVmYWIgPSA4LFxyXG59XHJcblxyXG5pbnRlcmZhY2UgR3VpZGVMaW5rUGFyYW0ge1xyXG4gIHBhdGhBcHBlbmQ/OiBzdHJpbmc7XHJcbiAgY29vcmQ/OiBjYy5WZWMyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgR3VpZGVMaW5rU3RlcGVyIHtcclxuICAvLyDnvJPlrZjlj4LmlbBcclxuICBwYXJhbTogR3VpZGVMaW5rUGFyYW07XHJcbiAgLy8g57yT5a2Y5q2l5pWw77yM6LaF5Ye657yT5a2Y5q2l5pWw77yM5oiW6ICF6LaF5Ye65pys5p2h5byV5a+855qE6IyD5Zu05bCG6KKr5riF56m644CCXHJcbiAgY2hhY2hlU2V0cDogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBHdWlkZVRyaWdnZXJMaXN0ZW5lciBleHRlbmRzIENvbmRpdGlvbkxpc3R0ZXIge1xyXG4gIHB1YmxpYyBndWlkZUlkOiBudW1iZXI7XHJcbiAgcHJvdGVjdGVkIF9sb2dpYzogR3VpZGVMb2dpYztcclxuICBwdWJsaWMgdmlld0lkOiBudW1iZXI7XHJcbiAgcHVibGljIGNsb3NlSWQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoZ3VpZGVSYXc6IFNHdWlkZUNoYWluRGF0YVJhdywgbG9naWM6IEd1aWRlTG9naWMpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmd1aWRlSWQgPSBndWlkZVJhdy5ndWlkZUlkO1xyXG4gICAgdGhpcy52aWV3SWQgPSBndWlkZVJhdy52aWV3SWQ7XHJcbiAgICB0aGlzLmNsb3NlSWQgPSBndWlkZVJhdy5jbG9zZUlkO1xyXG4gICAgdGhpcy5fbG9naWMgPSBsb2dpYztcclxuICAgIHRoaXMuaW5pdGVkKCk7XHJcbiAgICBpZiAodGhpcy5fY3VyU3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmVtaXRDb25kaXRpb25FbnZDaGFuZ2UobnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiog546v5aKD5Y+Y5pu05Zue6LCDICovXHJcbiAgcHJvdGVjdGVkIGVtaXRDb25kaXRpb25FbnZDaGFuZ2UoZW1pdHRlcjogQ29uZGl0aW9uRW1pdHRlcikge1xyXG4gICAgLy8gdGhpcy5fbG9naWMuX29uR3VpZGVUcmlnZ2VyT24odGhpcy5ndWlkZUlkKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHdWlkZUxvZ2ljIGV4dGVuZHMgT2JqZWN0V3JhcCB7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zOiBHdWlkZUxvZ2ljO1xyXG4gIHByb3RlY3RlZCBfbG9naWNBcGw6IEdBc3NldEltcGw7XHJcbiAgcHVibGljIHN0YXRpYyBpbnMoKTogR3VpZGVMb2dpYyB7XHJcbiAgICBpZiAoIXRoaXMuX2lucykge1xyXG4gICAgICB0aGlzLl9pbnMgPSBuZXcgR3VpZGVMb2dpYygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2lucztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfZ3VpZGU6IEd1aWRlQ29tcG9uZW50ID0gbnVsbDtcclxuICBwcm90ZWN0ZWQgX3N0ZXA6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIGdldCBzdGVwKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XHJcbiAgfVxyXG4gIHByb3RlY3RlZCBfZ3VpZElkOiBudW1iZXIgPSBudWxsO1xyXG4gIHByb3RlY3RlZCBfY3VyQXVkaW9JZDogbnVtYmVyID0gSU5WQUxJRF9WQUxVRTtcclxuXHJcbiAgcHJvdGVjdGVkIF9wYXJhbTogR3VpZGVMaW5rU3RlcGVyID0gbnVsbDtcclxuXHJcbiAgLyoqIOW9k+WJjea/gOa0u+eahOmdnuW8uuWItuW8leWvvCAqL1xyXG4gIHByb3RlY3RlZCBfdW5Gb3JjZXNHdWlkZTogU2V0V3JhcDxudW1iZXI+ID0gbmV3IFNldFdyYXA8bnVtYmVyPigpO1xyXG5cclxuICBwcm90ZWN0ZWQgX2d1aWRlVHJpZ2dlcnM6IEd1aWRlVHJpZ2dlckxpc3RlbmVyW10gPSBbXTtcclxuXHJcbiAgcHJvdGVjdGVkIF93YWl0QXN5bmNGdW5jOiBhbnk7XHJcbiAgcHJvdGVjdGVkIF91bkZvcmNlR3VpZGVDaGVja1RpbWUgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBHQ3RybC5FUy5vbihcclxuICAgICAgR0N0cmwuR0NsaWVudFdpbk9wZW5FdmVudEFmdGVyTXNnLFxyXG4gICAgICB0aGlzLFxyXG4gICAgICB0aGlzLm9uV2luT3Blbi5iaW5kKHRoaXMpLFxyXG4gICAgICBQUklPUklUWV9EQVRBXHJcbiAgICApO1xyXG4gICAgR0N0cmwuRVMub24oXHJcbiAgICAgIEdDdHJsLkdDbGllbnRXaW5EZXN0cm95RXZlbnRNc2csXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHRoaXMub25XaW5DbG9zZS5iaW5kKHRoaXMpLFxyXG4gICAgICBQUklPUklUWV9EQVRBXHJcbiAgICApO1xyXG4gICAgR0N0cmwuRVMub24oXHJcbiAgICAgIENNc2cuZGF0YS5vbkd1aWRlRXZlbnQsXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHRoaXMub25DTVNHR3VpZGVFdmVudC5iaW5kKHRoaXMpLFxyXG4gICAgICBQUklPUklUWV9EQVRBXHJcbiAgICApO1xyXG4gICAgR0N0cmwuRVMub24oXHJcbiAgICAgIENNc2cuZGF0YS5zZXRHdWlkZSxcclxuICAgICAgdGhpcyxcclxuICAgICAgdGhpcy5fb25SUENTZXRHdWlkZS5iaW5kKHRoaXMpLFxyXG4gICAgICBQUklPUklUWV9WSUVXXHJcbiAgICApO1xyXG4gICAgaWYgKCF0aGlzLl9sb2dpY0FwbClcclxuICAgICAgdGhpcy5fbG9naWNBcGwgPSBHQXNzZXRJbXBsLmdldEFzc2V0SW1wbChjYy5qcy5nZXRDbGFzc05hbWUodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uV2luT3BlbihfLCB2YWx1ZSkge1xyXG4gICAgQ29sb3JMb2cuZXNPbihcIkdDdHJsLkdDbGllbnRXaW5PcGVuRXZlbnRBZnRlck1zZ1wiKTtcclxuICAgIHRoaXMuc3RhcnRHdWlkZUxpbmUodmFsdWUsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbldpbkNsb3NlKF8sIHZhbHVlOiBXaW4pIHtcclxuICAgIENvbG9yTG9nLmVzT24oXCJHQ3RybC5HQ2xpZW50V2luRGVzdHJveUV2ZW50TXNnXCIpO1xyXG4gICAgdGhpcy5zdGFydEd1aWRlTGluZSh2YWx1ZS53aW5JZCwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKiog5Yik5pat5b2T5YmN5piv5ZCm5Y+I5byV5a+8ICovXHJcbiAgcHVibGljIGlzR3VpZGRpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0ZvcmNlR3VpZGRpbmcoKSB8fCB0aGlzLmlzVW5mb3JjZUd1aWRlKCk7XHJcbiAgfVxyXG5cclxuICAvKiog5b2T5YmN5piv5ZCm5a2Y5Zyo5by65Yi25byV5a+8ICovXHJcbiAgcHVibGljIGlzRm9yY2VHdWlkZGluZygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9ndWlkSWQgIT0gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZ3VpZElkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2d1aWRJZDtcclxuICB9XHJcblxyXG4gIC8qKiDlvZPliY3mmK/lkKblrZjlnKjmn5DkuIDmnaHpnZ7lvLrliLblvJXlr7wgKi9cclxuICBwdWJsaWMgaXNVbmZvcmNlR3VpZGUoZ3VpZGVJZD86IG51bWJlcikge1xyXG4gICAgaWYgKCFndWlkZUlkKSByZXR1cm4gdGhpcy5fdW5Gb3JjZXNHdWlkZS5zaXplID4gMDtcclxuICAgIHJldHVybiB0aGlzLl91bkZvcmNlc0d1aWRlLmhhcyhndWlkZUlkKTtcclxuICB9XHJcblxyXG4gIC8qKua4uOaIj+WIneWni+WMluWFpeWPoyAqL1xyXG4gIGluaXRHYW1lKCkge1xyXG4gICAgaWYgKCFERUZfR1VJREVfT1BFTikgcmV0dXJuO1xyXG4gICAgdGhpcy5pbml0Rm9yY2VHdWlkZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIOWIneWni+WMluW8uuWItuW8leWvvCAqL1xyXG4gIHByb3RlY3RlZCBpbml0Rm9yY2VHdWlkZSgpIHtcclxuICAgIGxldCB2YWx1ZXMgPSBHYW1lTWdyLmd1aWRlQ2hhaW5EYXRhLmRhdGEudmFsdWVzKCk7XHJcbiAgICBjb25zb2xlLmxvZyh7IHZhbHVlcyB9KTtcclxuICAgIHRoaXMuX2d1aWRlVHJpZ2dlcnMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCByYXc6IFNHdWlkZUNoYWluRGF0YVJhdyA9IHZhbHVlc1tpXSBhcyBhbnk7XHJcbiAgICAgIGxldCBpc092ZXIgPSBHYW1lTWdyLmxVc2VyRGF0YS5pc0d1aWRlT3ZlcihyYXcuZ3VpZGVJZCk7XHJcbiAgICAgIGlmIChpc092ZXIpIGNvbnRpbnVlO1xyXG4gICAgICAvLyDmsqHmnInmnaHku7bnmoTlvJXlr7zlsLHkuI3nlKjov5vooYzop6blj5HkuobvvIzpnIDopoHmiYvliqjop6blj5FcclxuICAgICAgLy8gICBsZXQgdHJpZ2dlciA9IG5ldyBHdWlkZVRyaWdnZXJMaXN0ZW5lcihyYXcsIHRoaXMpO1xyXG4gICAgICAvLyAgIGlmICghdHJpZ2dlci5nZXRJbml0ZWRTdGF0ZSgpKSBjb250aW51ZTtcclxuICAgICAgLy8gICB0aGlzLl9ndWlkZVRyaWdnZXJzLnB1c2godHJpZ2dlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKirlvIDlp4vmiafooYzlvJXlr7zot6/nur8gKi9cclxuICBwdWJsaWMgc3RhcnRHdWlkZUxpbmUodmlld0lkOiBudW1iZXIsIGlzQ2xvc2U6IGJvb2xlYW4pIHtcclxuICAgIC8vIENvbG9yTG9nLmxvZyh7IF9ndWlkZVRyaWdnZXJzOiB0aGlzLl9ndWlkZVRyaWdnZXJzIH0pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9ndWlkZVRyaWdnZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCB0cmlnZ2VyID0gdGhpcy5fZ3VpZGVUcmlnZ2Vyc1tpXTtcclxuICAgICAgaWYgKHRyaWdnZXIudmlld0lkID09PSB2aWV3SWQgJiYgIWlzQ2xvc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt2aWV3SWR956qX5Y+j5byA5ZCv77yMaWQ6JHt0cmlnZ2VyLmd1aWRlSWR95byV5a+86Kem5Y+RfWApO1xyXG4gICAgICAgIHRoaXMuX29uR3VpZGVUcmlnZ2VyT24odHJpZ2dlci5ndWlkZUlkKTtcclxuICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyLmNsb3NlSWQgPT09IHZpZXdJZCAmJiBpc0Nsb3NlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7dmlld0lkfeeql+WPo+WFs+mXre+8jGlkOiR7dHJpZ2dlci5ndWlkZUlkfeW8leWvvOinpuWPkX1gKTtcclxuICAgICAgICB0aGlzLl9vbkd1aWRlVHJpZ2dlck9uKHRyaWdnZXIuZ3VpZGVJZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDmn5DmnaHlvJXlr7zovr7liLDkuobop6blj5HmnaHku7YgKi9cclxuICBwdWJsaWMgX29uR3VpZGVUcmlnZ2VyT24oZ3VpZGVJZDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fZ3VpZElkKSByZXR1cm47IC8vIOW9k+WJjeacieW8leWvvOato+WcqOi/m+ihjFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9ndWlkZVRyaWdnZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLl9ndWlkZVRyaWdnZXJzW2ldLmd1aWRlSWQgPT0gZ3VpZGVJZCkge1xyXG4gICAgICAgIHRoaXMuX2d1aWRlVHJpZ2dlcnNbaV0uZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2d1aWRlVHJpZ2dlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ01TR0d1aWRlRXZlbnQodGhpcywgR0N0cmwucGFyYW0oZ3VpZGVJZCkpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uQ01TR0d1aWRlRXZlbnQoXywgcGFyYW06IEdQYXJhbSkge1xyXG4gICAgQ29sb3JMb2cuZXNPbihcIkNNc2cuZGF0YS5zZXRHdWlkZVwiKTtcclxuICAgIENvbG9yTG9nLmVzT24oXCJDTXNnLmRhdGEub25HdWlkZUV2ZW50XCIpO1xyXG4gICAgaWYgKHRoaXMuX2d1aWRJZCAhPSBudWxsKSByZXR1cm47XHJcbiAgICBsZXQgZ3VpZGVJZCA9IHBhcmFtLmdldDxudW1iZXI+KCk7XHJcbiAgICAvLyDosIPor5XmqKHlvI/lpITnkIZcclxuICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgbGV0IGFwcEN0cmwgPSBjYy5maW5kKFwiQXBwQ3RybFwiKS5nZXRDb21wb25lbnQoXCJBcHBDdHJsXCIpO1xyXG4gICAgICBpZiAoYXBwQ3RybCkge1xyXG4gICAgICAgIGlmIChhcHBDdHJsLmd1aWRlRWRpdG9yKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0R3VpZGUoZ3VpZGVJZCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0R3VpZGUoZ3VpZGVJZCk7XHJcbiAgfVxyXG4gIC8qKuW8gOWni+W8leWvvOWtkOW8leWvvGlkICovXHJcbiAgcHVibGljIHN0YXJ0R3VpZGUoZ3VpZGVJRDogbnVtYmVyKSB7XHJcbiAgICBsZXQgZ3VpZGVOb2RlID0gdGhpcy5nZXRHdWlkZU5vZGUoKTtcclxuICAgIGd1aWRlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5fcGFyYW0gPSBudWxsO1xyXG4gICAgdGhpcy5fZ3VpZElkID0gZ3VpZGVJRDtcclxuICAgIEdDdHJsLkVTLmVtaXQoQ01zZy5kYXRhLm9uQ2xpZW50R3VpZGVDaGFuZ2UpO1xyXG4gICAgdGhpcy5fc3RlcCA9IDA7XHJcbiAgICBsZXQgY2hhaW5EYXRhID0gR2FtZU1nci5ndWlkZUNoYWluRGF0YS5nZXRSYXc8U0d1aWRlQ2hhaW5EYXRhUmF3PihcclxuICAgICAgdGhpcy5fZ3VpZElkXHJcbiAgICApO1xyXG4gICAgaWYgKCFjaGFpbkRhdGEpIHtcclxuICAgICAgdGhpcy5fZ3VpZGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kb1N0ZXAoY2hhaW5EYXRhLmNoYWluW3RoaXMuX3N0ZXBdKTtcclxuICB9XHJcblxyXG4gIC8qKiDnu5PmnZ/mnKzmnaHlvJXlr7wgKi9cclxuICBwdWJsaWMgb25FbmRHdWlkZSgpIHtcclxuICAgIGlmICghR2FtZU1nci5sVXNlckRhdGEuaXNHdWlkZU92ZXIodGhpcy5fZ3VpZElkKSkge1xyXG4gICAgICB0aGlzLm9uU2V0R3VpZGUodGhpcy5fZ3VpZElkKTtcclxuICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIGVsc2UgaWYgKHRoaXMuX2d1aWRJZCA9PSBHdWlkRW51bS5JRERfMTAxICYmIERFRl9HVUlERV9PUEVOKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpbmdsZVdhaXRBc3luY0Z1bmMoKCkgPT4gdHJ1ZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNZ3IucGxheWVyRGF0YS51c2VyRGF0YS5ndWlkZS5wdXNoKEd1aWRFbnVtLklERF8xMDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdDdHJsLkVTLmVtaXQoQ01zZy5kYXRhLnNldEd1aWRlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2d1aWRlKSB7XHJcbiAgICAgIHRoaXMuX2d1aWRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9ndWlkSWQgPSBudWxsO1xyXG4gICAgR0N0cmwuRVMuZW1pdChDTXNnLmRhdGEub25DbGllbnRHdWlkZUNoYW5nZSk7XHJcbiAgfVxyXG5cclxuICAvKiog6K6w5b2V5byV5a+86L+b5bqmICovXHJcbiAgcHVibGljIG9uU2V0R3VpZGUoZ3VpZGVJRDogbnVtYmVyKSB7XHJcbiAgICBHYW1lTWdyLmxVc2VyRGF0YS5zZXRHdWlkZXMoZ3VpZGVJRCk7XHJcbiAgfVxyXG5cclxuICAvKiog5byV5a+86L+b5bqm5Zue6LCDICovXHJcbiAgcHJvdGVjdGVkIF9vblJQQ1NldEd1aWRlKF8pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZ3VpZGVUcmlnZ2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5fZ3VpZGVUcmlnZ2Vyc1tpXS5jdXJlU3RhdGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuX29uR3VpZGVUcmlnZ2VyT24odGhpcy5fZ3VpZGVUcmlnZ2Vyc1tpXS5ndWlkZUlkKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKuS4i+S4gOatpSAqL1xyXG4gIHB1YmxpYyBvbk5leHRTdGVwKGRlbGF5VGltZTogbnVtYmVyKSB7XHJcbiAgICBsZXQgY2hhaW5EYXRhID0gR2FtZU1nci5ndWlkZUNoYWluRGF0YS5nZXRSYXc8U0d1aWRlQ2hhaW5EYXRhUmF3PihcclxuICAgICAgdGhpcy5fZ3VpZElkXHJcbiAgICApO1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IGRlbGF5Q2FsbEJhY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibmV4dD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PlwiKTtcclxuICAgICAgc2VsZi5fc3RlcCsrO1xyXG4gICAgICBpZiAoc2VsZi5fc3RlcCA+PSBjaGFpbkRhdGEuY2hhaW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBzdGVwSWQgPSBjaGFpbkRhdGEuY2hhaW5bc2VsZi5fc3RlcF07XHJcbiAgICAgIHNlbGYuZG9TdGVwKHN0ZXBJZCk7XHJcbiAgICAgIGlmIChzZWxmLl9wYXJhbSkge1xyXG4gICAgICAgIHNlbGYuX3BhcmFtLmNoYWNoZVNldHAtLTtcclxuICAgICAgICBpZiAoc2VsZi5fcGFyYW0uY2hhY2hlU2V0cCA8IDApIHNlbGYuX3BhcmFtID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDlhbPplK7mraXmoIflrozmiJDvvIzmiJbogIXlvJXlr7znu5PmnZ/moIflrozmiJBcclxuICAgIGlmICh0aGlzLl9zdGVwID49IGNoYWluRGF0YS5jaGFpbi5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMub25FbmRHdWlkZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX3N0ZXAgPT09IGNoYWluRGF0YS5rZXlTdGVwKSB7XHJcbiAgICAgIHRoaXMub25TZXRHdWlkZSh0aGlzLl9ndWlkSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZWxheVRpbWUpIHtcclxuICAgICAgZGVsYXlBY3Rpb24odGhpcy5fZ3VpZGUubm9kZSwgZGVsYXlUaW1lIC8gMTAwMCwgZGVsYXlDYWxsQmFjayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWxheUNhbGxCYWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKirmiafooYzlhbbkuK3mn5DkuIDmraUgKi9cclxuICBwdWJsaWMgZG9TdGVwKHN0ZXBJZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgc3RlcENvbmZpZyA9IEdhbWVNZ3IuZ3VpZGVTdGVwRGF0YS50cnlHZXRSYXc8U0d1aWRlU3RlcERhdGFSYXc+KHN0ZXBJZCk7XHJcbiAgICBpZiAoIXN0ZXBDb25maWcpIHJldHVybiBudWxsO1xyXG4gICAgbGV0IHBhcmFtOiBHdWlkZUxpbmtQYXJhbSA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5fcGFyYW0pIHtcclxuICAgICAgaWYgKHRoaXMuX3BhcmFtLmNoYWNoZVNldHAgPT0gMCkge1xyXG4gICAgICAgIHBhcmFtID0gdGhpcy5fcGFyYW0ucGFyYW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBzdGVwID0gT0JKRUNUX0NPUFk8U0d1aWRlU3RlcERhdGFSYXc+KHN0ZXBDb25maWcpO1xyXG4gICAgc3RlcC5wYXRoICs9IHBhcmFtID8gcGFyYW0ucGF0aEFwcGVuZCA6IFwiXCI7XHJcbiAgICB0aGlzLl9ndWlkZS5zZXRDb25maWd1cmUoc3RlcCk7XHJcbiAgfVxyXG5cclxuICAvKiog5YiH5o2i5Zy65pmv55qE5pe25YCZ6KaB56e76ZmkICovXHJcbiAgcHVibGljIGxvZ2luT3V0KCkge1xyXG4gICAgR0N0cmwuRVMub2ZmKHRoaXMsIEdDdHJsLkdUaW1lck1pbGxpRXZlbnRNc2cpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZ3VpZGVUcmlnZ2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLl9ndWlkZVRyaWdnZXJzW2ldLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2d1aWRlVHJpZ2dlcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLl91bkZvcmNlc0d1aWRlLmNsZWFyKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2d1aWRlKSB0aGlzLl9ndWlkZS5ub2RlLmRlc3Ryb3koKTtcclxuICAgIGxldCBzdG9yeU5vZGUgPSBHYW1lTWdyLnVpTWdyLnVpUm9vdC5nZXRDaGlsZEJ5TmFtZShTVE9SWV9ST09UKTtcclxuICAgIGlmIChzdG9yeU5vZGUpIHtcclxuICAgICAgc3RvcnlOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgc3RvcnlOb2RlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ndWlkZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyB1dGlsIGZ1bmN0aW9ucyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldEd1aWRlTm9kZSgpOiBjYy5Ob2RlIHtcclxuICAgIGlmICghdGhpcy5fZ3VpZGUpIHtcclxuICAgICAgbGV0IHByZWZhYiA9IHRoaXMuX2xvZ2ljQXBsLmdldFByZUxvYWRBc3NldDxjYy5QcmVmYWI+KFxyXG4gICAgICAgIFJlcy5jb21tb24uZ3VpZGVfaXRlbVxyXG4gICAgICApO1xyXG4gICAgICBsZXQgZ3VpZGVOb2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgZ3VpZGVOb2RlLm5hbWUgPSBcIkd1ZGllUm9vdFwiO1xyXG4gICAgICBndWlkZU5vZGUuc2V0Q29udGVudFNpemUoY2Mud2luU2l6ZSk7XHJcbiAgICAgIGxldCBjb20gPSBndWlkZU5vZGUuZ2V0Q29tcG9uZW50KEd1aWRlQ29tcG9uZW50KTtcclxuICAgICAgY29tLm5leHRDYWxsQmFjayA9IChkZWxheVRpbWU6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMub25OZXh0U3RlcChkZWxheVRpbWUpO1xyXG4gICAgICB9O1xyXG4gICAgICBHQ3RybC5jYW52YXNlLm5vZGUuYWRkQ2hpbGQoZ3VpZGVOb2RlLCBNQVhfVEFHIC0gMTAwMCk7XHJcbiAgICAgIHRoaXMuX2d1aWRlID0gY29tO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZ3VpZGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHRoaXMuX2d1aWRlLm5vZGU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2luZ2xlV2FpdEFzeW5jRnVuYyhjaGVja0NiLCBlbmRDYikge1xyXG4gICAgdGhpcy5fd2FpdEFzeW5jRnVuYyA9ICgpID0+IHtcclxuICAgICAgbGV0IHJlc3VsdCA9IGNoZWNrQ2IoKTtcclxuICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMuX3dhaXRBc3luY0Z1bmMgPSBudWxsO1xyXG4gICAgICAgIGlmIChlbmRDYikge1xyXG4gICAgICAgICAgZW5kQ2IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==