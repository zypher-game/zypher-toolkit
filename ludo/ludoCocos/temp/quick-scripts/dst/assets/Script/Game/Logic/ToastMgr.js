
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Logic/ToastMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Mb2dpYy9Ub2FzdE1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErRDtBQUMvRCx3REFBbUQ7QUFDbkQsa0RBQXNEO0FBQ3RELDBDQUF5QztBQUN6QyxzREFBcUQ7QUFDckQsMkNBQTZDO0FBQzdDLCtDQUF1QztBQUN2QyxtQ0FBdUM7QUFDdkMscURBQTRDO0FBQzVDLG9EQUErQztBQUMvQyxxQ0FBZ0M7QUFFaEMsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFFOUI7SUFBMkIseUJBQVU7SUE0RG5DLGVBQVksVUFBbUI7UUFBL0IsWUFDRSxpQkFBTyxTQVNSO1FBcEVTLGlCQUFXLEdBQWlDLEVBQUUsQ0FBQztRQUMvQyxlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBMkR0QixLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2RSxhQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FDVCxhQUFLLENBQUMseUJBQXlCLEVBQy9CLEtBQUksRUFDSixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsRUFDNUIsMEJBQWEsQ0FDZCxDQUFDOztJQUNKLENBQUM7SUFqRVMsd0JBQVEsR0FBbEIsVUFBbUIsSUFBYTtRQUM5QixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDekIsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQztTQUMvQjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxrQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO2FBQzVCO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFUyx1QkFBTyxHQUFqQixVQUFrQixJQUFlLEVBQUUsR0FBVztRQUM1QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckM7UUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBR2dCLGFBQU8sR0FBeEIsVUFBeUIsSUFBZTtRQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM5QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVnQixrQkFBWSxHQUE3QixVQUE4QixJQUFlO1FBQzNDLElBQUksR0FBRyxHQUFjLElBQUksQ0FBQztRQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNwQixJQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsaUJBQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQUMsS0FBZ0I7Z0JBQ2hELEdBQUcsR0FBRyxLQUFLLENBQUM7Z0JBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQWE7b0JBQ3ZCLElBQUksSUFBSSxFQUFFO3dCQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hCO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDaEI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sR0FBRyxDQUFDO1NBQ1o7YUFBTTtZQUNMLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQWNELFdBQVc7SUFDSixvQkFBSSxHQUFYLFVBQVksR0FBVztRQUFFLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBQzlCLElBQUksQ0FBQyxVQUFVLE9BQWYsSUFBSSxrQkFBWSxrQkFBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUssSUFBSSxHQUFFO0lBQ25ELENBQUM7SUFFRCxhQUFhO0lBQ04sMEJBQVUsR0FBakIsVUFBa0IsSUFBSSxFQUFFLEdBQVc7UUFBRSxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLDZCQUFPOztRQUMxQyxJQUFJLEdBQUcsR0FBRyxZQUFDLCtCQUFDLEdBQUcsR0FBSyxJQUFJLEVBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQsV0FBVztJQUNELHlCQUFTLEdBQW5CO1FBQUEsaUJBc0NDO1FBckNDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0QsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRCxJQUFJLElBQVksQ0FBQztRQUNqQixNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDbEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNWLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ2hDLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQ3BEO2dCQUNELE9BQU87YUFDUjtZQUVELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU87WUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQU8sQ0FBQztZQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLGtCQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNuQyxnREFBZ0Q7YUFDakQ7UUFDSCxDQUFDLENBQUMsRUFDRixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQ3hELEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDVixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksS0FBSyxFQUFFO2dCQUNULEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtZQUNELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxhQUFhO0lBQ04sMEJBQVUsR0FBakI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsZUFBZTtJQUNMLDRCQUFZLEdBQXRCO1FBQ0Usa0JBQVEsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUNqRCxJQUFJLE1BQU0sR0FBRyxpQkFBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksWUFBTyxDQUFDLElBQUksRUFBRTtZQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDcEMsT0FBTztTQUNSO0lBQ0gsQ0FBQztJQWpIZ0IsWUFBTSxHQUFvQyxFQUFFLENBQUM7SUFrSGhFLFlBQUM7Q0EvSUQsQUErSUMsQ0EvSTBCLGtCQUFVLEdBK0lwQztBQS9JWSxzQkFBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1BWF9UQUcsIFBSSU9SSVRZX1ZJRVcgfSBmcm9tIFwiLi4vLi4vQ29yZS9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCBDb2xvckxvZyBmcm9tIFwiLi4vLi4vQ29yZS9GcmFtZUV4L0NvbG9yTG9nXCI7XHJcbmltcG9ydCB7IE9iamVjdFdyYXAgfSBmcm9tIFwiLi4vLi4vQ29yZS9GcmFtZUV4L0VTNUV4XCI7XHJcbmltcG9ydCB7IEdDdHJsIH0gZnJvbSBcIi4uLy4uL0NvcmUvR0N0cmxcIjtcclxuaW1wb3J0IHsgR0xvYWRlciB9IGZyb20gXCIuLi8uLi9Db3JlL0dMb2FkZXIvR0xvYWRlclwiO1xyXG5pbXBvcnQgeyBUb2FzdFR5cGUgfSBmcm9tIFwiLi4vQ29tbW9uL0RlZmluZVwiO1xyXG5pbXBvcnQgeyBMIH0gZnJvbSBcIi4uL0NvbW1vbi9MYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBWSUVXX0lEIH0gZnJvbSBcIi4uL0NvbW1vbi9VSVwiO1xyXG5pbXBvcnQgeyBSZXMgfSBmcm9tIFwiLi4vQ29tbW9uL1VJUmVzb3VyY2VzXCI7XHJcbmltcG9ydCBUb2FzdEN0cmwgZnJvbSBcIi4uL1ZpZXdzL1RpcC9Ub2FzdEN0cmxcIjtcclxuaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4vR2FtZU1nclwiO1xyXG5cclxuY29uc3QgVE9BU1RfQUNUSU9OX1RBRyA9IDEwMDA7XHJcblxyXG5leHBvcnQgY2xhc3MgVG9hc3QgZXh0ZW5kcyBPYmplY3RXcmFwIHtcclxuICBwcm90ZWN0ZWQgX3RhcmdldE5vZGU6IGNjLk5vZGU7XHJcbiAgcHJvdGVjdGVkIF90b2FzdFF1ZXVlOiB7IFt0eXBlOiBudW1iZXJdOiBzdHJpbmdbXSB9ID0ge307XHJcbiAgcHJvdGVjdGVkIF9tc2dDb3VudCA9IDA7XHJcblxyXG4gIHByb3RlY3RlZCBnZXRRdWV1ZSh0eXBlPzogbnVtYmVyKSB7XHJcbiAgICBpZiAodHlwZSkge1xyXG4gICAgICBsZXQgcXVldWVzID0gdGhpcy5fdG9hc3RRdWV1ZVt0eXBlXTtcclxuICAgICAgaWYgKCFxdWV1ZXMpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBxdWV1ZXMgfTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVG9hc3RUeXBlLkVuZDsgaSsrKSB7XHJcbiAgICAgIGxldCBxdWV1ZXMgPSB0aGlzLl90b2FzdFF1ZXVlW2ldO1xyXG4gICAgICBpZiAocXVldWVzICYmIHF1ZXVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogaSwgcXVldWVzIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHB1c2hNc2codHlwZTogVG9hc3RUeXBlLCBtc2c6IHN0cmluZykge1xyXG4gICAgbGV0IHF1ZXVlID0gdGhpcy5fdG9hc3RRdWV1ZVt0eXBlXTtcclxuICAgIGlmICghcXVldWUpIHtcclxuICAgICAgcXVldWUgPSB0aGlzLl90b2FzdFF1ZXVlW3R5cGVdID0gW107XHJcbiAgICB9XHJcbiAgICBxdWV1ZS5wdXNoKG1zZyk7XHJcbiAgICB0aGlzLl9tc2dDb3VudCsrO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfcG9vbHM6IHsgW3R5cGU6IG51bWJlcl06IGNjLk5vZGVQb29sIH0gPSB7fTtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGdldFBvb2wodHlwZTogVG9hc3RUeXBlKSB7XHJcbiAgICBsZXQgcG9vbCA9IHRoaXMuX3Bvb2xzW3R5cGVdO1xyXG4gICAgaWYgKCFwb29sKSB7XHJcbiAgICAgIHBvb2wgPSB0aGlzLl9wb29sc1t0eXBlXSA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvb2w7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc3RhdGljIGdldFRvYXN0Q3RybCh0eXBlOiBUb2FzdFR5cGUpOiBUb2FzdEN0cmwge1xyXG4gICAgbGV0IHJldDogVG9hc3RDdHJsID0gbnVsbDtcclxuICAgIGxldCBwb29sID0gdGhpcy5nZXRQb29sKHR5cGUpO1xyXG4gICAgaWYgKHBvb2wuc2l6ZSgpID09IDApIHtcclxuICAgICAgY29uc3QgcHJlZmFicyA9IFtudWxsLCBSZXMuY29tbW9uLnRvYXN0LCBudWxsXTtcclxuICAgICAgR0xvYWRlci5hZGRHQ2hpbGQocHJlZmFic1t0eXBlXSwgKHRvYXN0OiBUb2FzdEN0cmwpID0+IHtcclxuICAgICAgICByZXQgPSB0b2FzdDtcclxuICAgICAgICByZXQuc2V0UmNiKChub2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICBpZiAocG9vbCkge1xyXG4gICAgICAgICAgICBwb29sLnB1dChub2RlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBub2RlID0gcG9vbC5nZXQoKTtcclxuICAgICAgcmV0dXJuIG5vZGUuZ2V0Q29tcG9uZW50KFRvYXN0Q3RybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcih0YXJnZXROb2RlOiBjYy5Ob2RlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5fdGFyZ2V0Tm9kZSA9IHRhcmdldE5vZGU7XHJcbiAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vbkdhbWVTaG93LmJpbmQodGhpcyksIHRhcmdldE5vZGUpO1xyXG4gICAgR0N0cmwuRVMub24oXHJcbiAgICAgIEdDdHJsLkdDbGllbnRXaW5EZXN0cm95RXZlbnRNc2csXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHRoaXMuVG9wV2luQ2hhbmdlLmJpbmQodGhpcyksXHJcbiAgICAgIFBSSU9SSVRZX1ZJRVdcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKiog5pmu6YCa5o+Q56S6ICovXHJcbiAgcHVibGljIHNob3cobXNnOiBzdHJpbmcsIC4uLmFyZ3MpIHtcclxuICAgIHRoaXMuc2hvd0J5VHlwZShUb2FzdFR5cGUuV2FyblRpcCwgbXNnLCAuLi5hcmdzKTtcclxuICB9XHJcblxyXG4gIC8qKiDluKbnsbvlnovnmoTmj5DnpLogKi9cclxuICBwdWJsaWMgc2hvd0J5VHlwZSh0eXBlLCBtc2c6IHN0cmluZywgLi4uYXJncykge1xyXG4gICAgbGV0IHN0ciA9IEwobXNnLCAuLi5hcmdzKTtcclxuICAgIHRoaXMucHVzaE1zZyh0eXBlLCBzdHIpO1xyXG4gICAgbGV0IGFjdGlvbiA9IHRoaXMuX3RhcmdldE5vZGUuZ2V0QWN0aW9uQnlUYWcoVE9BU1RfQUNUSU9OX1RBRyk7XHJcbiAgICBpZiAoIWFjdGlvbikge1xyXG4gICAgICB0aGlzLnN0YXJ0U2hvdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIOW8gOWni+i9ruaSrSAqL1xyXG4gIHByb3RlY3RlZCBzdGFydFNob3coKSB7XHJcbiAgICBsZXQgYWN0aW9uID0gdGhpcy5fdGFyZ2V0Tm9kZS5nZXRBY3Rpb25CeVRhZyhUT0FTVF9BQ1RJT05fVEFHKTtcclxuICAgIGlmIChhY3Rpb24pIHRoaXMuX3RhcmdldE5vZGUuc3RvcEFjdGlvbkJ5VGFnKFRPQVNUX0FDVElPTl9UQUcpO1xyXG4gICAgbGV0IHR5cGU6IG51bWJlcjtcclxuICAgIGFjdGlvbiA9IGNjLnNlcXVlbmNlKFxyXG4gICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgbGV0IHF1ZXVlID0gdGhpcy5nZXRRdWV1ZSgpO1xyXG4gICAgICAgIGlmICghcXVldWUpIHtcclxuICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX3RhcmdldE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldE5vZGUuc3RvcEFjdGlvbkJ5VGFnKFRPQVNUX0FDVElPTl9UQUcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvYXN0ID0gVG9hc3QuZ2V0VG9hc3RDdHJsKHF1ZXVlLnR5cGUpO1xyXG4gICAgICAgIHR5cGUgPSBxdWV1ZS50eXBlO1xyXG4gICAgICAgIGlmICghdG9hc3QpIHJldHVybjtcclxuICAgICAgICB0b2FzdC5ub2RlLnpJbmRleCA9IE1BWF9UQUc7XHJcbiAgICAgICAgdG9hc3Qubm9kZS5wYXJlbnQgPSB0aGlzLl90YXJnZXROb2RlO1xyXG4gICAgICAgIGxldCB0aW1lID0gTWF0aC5taW4oMS41LCAwLjEgKiB0aGlzLl9tc2dDb3VudCk7XHJcbiAgICAgICAgdG9hc3Quc2V0RHVyYXRpb24oMiAtIHRpbWUpO1xyXG4gICAgICAgIHRvYXN0LnNldFRleHQocXVldWUucXVldWVzWzBdKTtcclxuICAgICAgICBpZiAocXVldWUudHlwZSA9PSBUb2FzdFR5cGUuV2FyblRpcCkge1xyXG4gICAgICAgICAgLy8gQXVkaW9NZ3IuSW5zKCkucGxheUVmZmVjdChSZXMuYXVkaW8ud2FyblRpcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgICAgY2MuZGVsYXlUaW1lKDAuNCAtIE1hdGgubWluKDAuMywgdGhpcy5fbXNnQ291bnQgKiAwLjAyKSksXHJcbiAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICBsZXQgcXVldWUgPSB0aGlzLmdldFF1ZXVlKHR5cGUpO1xyXG4gICAgICAgIGlmIChxdWV1ZSkge1xyXG4gICAgICAgICAgcXVldWUucXVldWVzLnNoaWZ0KCk7XHJcbiAgICAgICAgICB0aGlzLl9tc2dDb3VudC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXJ0U2hvdygpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIGFjdGlvbi5zZXRUYWcoVE9BU1RfQUNUSU9OX1RBRyk7XHJcbiAgICB0aGlzLl90YXJnZXROb2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqIOa4uOaIj+WIh+WFpeWQjuWPsCAqL1xyXG4gIHB1YmxpYyBvbkdhbWVTaG93KCkge1xyXG4gICAgdGhpcy5fdG9hc3RRdWV1ZSA9IHt9O1xyXG4gICAgdGhpcy5fbXNnQ291bnQgPSAwO1xyXG4gIH1cclxuXHJcbiAgLyoqIOebkeWQrOmhtuWxgueql+WPo+S/oeaBryAqL1xyXG4gIHByb3RlY3RlZCBUb3BXaW5DaGFuZ2UoKSB7XHJcbiAgICBDb2xvckxvZy5lc09uKFwiR0N0cmwuR0NsaWVudFdpbkRlc3Ryb3lFdmVudE1zZ1wiKTtcclxuICAgIGxldCB0b3BXaW4gPSBHYW1lTWdyLnVpTWdyLmdldEFjdGl2ZVRvcFdpbigpO1xyXG4gICAgaWYgKCF0b3BXaW4gfHwgdG9wV2luLndpbklkICE9IFZJRVdfSUQuaG9tZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiVG9wV2luQ2hhbmdlIGVycm9yXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==