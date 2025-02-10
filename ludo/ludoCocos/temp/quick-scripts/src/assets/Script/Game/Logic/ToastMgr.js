"use strict";
cc._RF.push(module, 'c74d2KcjJhBip/IwbofsiD/', 'ToastMgr');
// Script/Game/Logic/ToastMgr.ts

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
exports.Toast = void 0;
var CoreDefine_1 = require("../../Core/CoreDefine");
var ColorLog_1 = require("../../Core/FrameEx/ColorLog");
var ES5Ex_1 = require("../../Core/FrameEx/ES5Ex");
var GCtrl_1 = require("../../Core/GCtrl");
var GLoader_1 = require("../../Core/GLoader/GLoader");
var Define_1 = require("../Common/Define");
var Language_1 = require("../Common/Language");
var UI_1 = require("../Common/UI");
var UIResources_1 = require("../Common/UIResources");
var ToastCtrl_1 = require("../Views/Tip/ToastCtrl");
var GameMgr_1 = require("./GameMgr");
var TOAST_ACTION_TAG = 1000;
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast(targetNode) {
        var _this = _super.call(this) || this;
        _this._toastQueue = {};
        _this._msgCount = 0;
        _this._targetNode = targetNode;
        cc.game.on(cc.game.EVENT_SHOW, _this.onGameShow.bind(_this), targetNode);
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GClientWinDestroyEventMsg, _this, _this.TopWinChange.bind(_this), CoreDefine_1.PRIORITY_VIEW);
        return _this;
    }
    Toast.prototype.getQueue = function (type) {
        if (type) {
            var queues = this._toastQueue[type];
            if (!queues)
                return null;
            return { type: type, queues: queues };
        }
        for (var i = 0; i < Define_1.ToastType.End; i++) {
            var queues = this._toastQueue[i];
            if (queues && queues.length > 0) {
                return { type: i, queues: queues };
            }
        }
        return null;
    };
    Toast.prototype.pushMsg = function (type, msg) {
        var queue = this._toastQueue[type];
        if (!queue) {
            queue = this._toastQueue[type] = [];
        }
        queue.push(msg);
        this._msgCount++;
    };
    Toast.getPool = function (type) {
        var pool = this._pools[type];
        if (!pool) {
            pool = this._pools[type] = new cc.NodePool();
        }
        return pool;
    };
    Toast.getToastCtrl = function (type) {
        var ret = null;
        var pool = this.getPool(type);
        if (pool.size() == 0) {
            var prefabs = [null, UIResources_1.Res.common.toast, null];
            GLoader_1.GLoader.addGChild(prefabs[type], function (toast) {
                ret = toast;
                ret.setRcb(function (node) {
                    if (pool) {
                        pool.put(node);
                    }
                    else {
                        node.destroy();
                    }
                });
            });
            return ret;
        }
        else {
            var node = pool.get();
            return node.getComponent(ToastCtrl_1.default);
        }
    };
    /** 普通提示 */
    Toast.prototype.show = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.showByType.apply(this, __spreadArrays([Define_1.ToastType.WarnTip, msg], args));
    };
    /** 带类型的提示 */
    Toast.prototype.showByType = function (type, msg) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var str = Language_1.L.apply(void 0, __spreadArrays([msg], args));
        this.pushMsg(type, str);
        var action = this._targetNode.getActionByTag(TOAST_ACTION_TAG);
        if (!action) {
            this.startShow();
        }
    };
    /** 开始轮播 */
    Toast.prototype.startShow = function () {
        var _this = this;
        var action = this._targetNode.getActionByTag(TOAST_ACTION_TAG);
        if (action)
            this._targetNode.stopActionByTag(TOAST_ACTION_TAG);
        var type;
        action = cc.sequence(cc.callFunc(function () {
            var queue = _this.getQueue();
            if (!queue) {
                if (cc.isValid(_this._targetNode)) {
                    _this._targetNode.stopActionByTag(TOAST_ACTION_TAG);
                }
                return;
            }
            var toast = Toast.getToastCtrl(queue.type);
            type = queue.type;
            if (!toast)
                return;
            toast.node.zIndex = CoreDefine_1.MAX_TAG;
            toast.node.parent = _this._targetNode;
            var time = Math.min(1.5, 0.1 * _this._msgCount);
            toast.setDuration(2 - time);
            toast.setText(queue.queues[0]);
            if (queue.type == Define_1.ToastType.WarnTip) {
                // AudioMgr.Ins().playEffect(Res.audio.warnTip);
            }
        }), cc.delayTime(0.4 - Math.min(0.3, this._msgCount * 0.02)), cc.callFunc(function () {
            var queue = _this.getQueue(type);
            if (queue) {
                queue.queues.shift();
                _this._msgCount--;
            }
            _this.startShow();
        }));
        action.setTag(TOAST_ACTION_TAG);
        this._targetNode.runAction(action);
    };
    /** 游戏切入后台 */
    Toast.prototype.onGameShow = function () {
        this._toastQueue = {};
        this._msgCount = 0;
    };
    /** 监听顶层窗口信息 */
    Toast.prototype.TopWinChange = function () {
        ColorLog_1.default.esOn("GCtrl.GClientWinDestroyEventMsg");
        var topWin = GameMgr_1.default.uiMgr.getActiveTopWin();
        if (!topWin || topWin.winId != UI_1.VIEW_ID.home) {
            console.error("TopWinChange error");
            return;
        }
    };
    Toast._pools = {};
    return Toast;
}(ES5Ex_1.ObjectWrap));
exports.Toast = Toast;

cc._RF.pop();