"use strict";
cc._RF.push(module, '39679E3RbRHApUrr2qgft3o', 'JumpUtil');
// Script/Game/Views/ViewUtil/JumpUtil.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ES5Ex_1 = require("../../../Core/FrameEx/ES5Ex");
var GCtrl_1 = require("../../../Core/GCtrl");
var ShaderUtil_1 = require("../../../Shaders/Manager/ShaderUtil");
var UI_1 = require("../../Common/UI");
var ConditionListener_1 = require("../../Logic/ConditionListener");
var GameMgr_1 = require("../../Logic/GameMgr");
var SystemUnlockListener = /** @class */ (function (_super) {
    __extends(SystemUnlockListener, _super);
    function SystemUnlockListener(viewId) {
        var _this = _super.call(this) || this;
        /** 功能ID */
        _this.viewId = null;
        _this.viewId = viewId;
        return _this;
    }
    /** 环境变更回调 */
    SystemUnlockListener.prototype.emitConditionEnvChange = function (emitter) { };
    /** 未解锁提示 */
    SystemUnlockListener.prototype.toast = function () { };
    /** 指引达成条件 */
    SystemUnlockListener.prototype.guide = function () {
        for (var i = 0; i < this._emitters.length; i++) {
            var emiiter = this._emitters[i];
            if (emiiter.curState)
                continue;
            if (i == 0)
                continue;
            if (!emiiter.guide())
                continue;
            break;
        }
    };
    return SystemUnlockListener;
}(ConditionListener_1.ConditionListter));
var JumpToMgr = /** @class */ (function (_super) {
    __extends(JumpToMgr, _super);
    function JumpToMgr() {
        var _this = _super.call(this) || this;
        /** 解锁条件 */
        _this._unlockChecks = new ES5Ex_1.MapWrap();
        /** 关联的viewId */
        _this._unlockKeyRefs = new ES5Ex_1.MapWrap();
        _this.rechageViews = [];
        return _this;
    }
    Object.defineProperty(JumpToMgr, "ins", {
        get: function () {
            if (!this._ins) {
                this._ins = new JumpToMgr();
            }
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    /** 游戏逻辑开始回调 */
    JumpToMgr.prototype.initGame = function () {
        this.initSystemUnlock();
    };
    /** 玩家登出 */
    JumpToMgr.prototype.loginOut = function () {
        this.unSystemUnlock();
    };
    /** 初始化功能解锁部分 */
    JumpToMgr.prototype.initSystemUnlock = function () {
        this._unlockChecks.clear();
        this._unlockKeyRefs.clear();
    };
    /** 销毁条件事件 */
    JumpToMgr.prototype.unSystemUnlock = function () {
        this._unlockChecks.forEach(function (e) {
            e.destroy();
        });
        this._unlockChecks.clear();
        this._unlockKeyRefs.clear();
    };
    JumpToMgr.prototype.jumpGoTo = function (id) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.isSystemOpen(id, true))
            return;
        // 特殊界面处理
        var newArgs = [];
        var page = UI_1.VIEW_IDByPageNum[id] ? UI_1.VIEW_IDByPageNum[id] : null;
        if (page && page.page) {
            id = page.view;
            newArgs.push.apply(newArgs, page.page);
        }
        var otherParam = this.getParam(id);
        if (otherParam || otherParam == 0) {
            newArgs.push(otherParam);
        }
        // 其他参数放前面，最后才是自定义的参数
        newArgs.push.apply(newArgs, args);
        (_a = GameMgr_1.default.uiMgr).showWin.apply(_a, __spreadArrays([id], newArgs));
        // 发送窗口开启事件
        GCtrl_1.GCtrl.ES.emit(GCtrl_1.GCtrl.GClientWinOpenEventMsg, id);
    };
    JumpToMgr.prototype.getSystemOpenListener = function (viewId) {
        return this._unlockChecks.get(viewId);
    };
    JumpToMgr.prototype.isSystemOpen = function (id, outCheck) {
        if (outCheck === void 0) { outCheck = false; }
        var unlockCheck = this._unlockChecks.get(id);
        if (!unlockCheck) {
            var refs = this._unlockKeyRefs.get(id);
            if (refs && refs.length > 0)
                for (var i = 0; i < refs.length; i++) {
                    var state = this.isSystemOpen(refs[i], outCheck);
                    if (!state)
                        return false;
                }
            return true;
        }
        if (!unlockCheck.cureState && outCheck) {
            unlockCheck.toast();
            return false;
        }
        return unlockCheck.cureState;
    };
    JumpToMgr.prototype.setBtnStatus = function (spriteNode, viewId) {
        var isCanSwitch = GameMgr_1.default.jumpToMgr.isSystemOpen(viewId, false);
        if (!isCanSwitch) {
            ShaderUtil_1.default.gray(spriteNode);
        }
        else {
            ShaderUtil_1.default.normal(spriteNode);
        }
        return isCanSwitch;
    };
    JumpToMgr.prototype.getParam = function (id) {
        switch (id) {
            default:
                return null;
        }
    };
    return JumpToMgr;
}(ES5Ex_1.ObjectWrap));
exports.default = JumpToMgr;

cc._RF.pop();