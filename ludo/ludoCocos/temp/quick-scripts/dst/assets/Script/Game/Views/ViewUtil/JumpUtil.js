
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/ViewUtil/JumpUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9WaWV3VXRpbC9KdW1wVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWtFO0FBQ2xFLDZDQUE0QztBQUM1QyxrRUFBNkQ7QUFDN0Qsc0NBQW1EO0FBQ25ELG1FQUd1QztBQUN2QywrQ0FBMEM7QUFFMUM7SUFBbUMsd0NBQWdCO0lBR2pELDhCQUFZLE1BQWM7UUFBMUIsWUFDRSxpQkFBTyxTQUVSO1FBTEQsV0FBVztRQUNKLFlBQU0sR0FBVyxJQUFJLENBQUM7UUFHM0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxhQUFhO0lBQ0gscURBQXNCLEdBQWhDLFVBQWlDLE9BQXlCLElBQUcsQ0FBQztJQUM5RCxZQUFZO0lBQ0wsb0NBQUssR0FBWixjQUFnQixDQUFDO0lBRWpCLGFBQWE7SUFDTixvQ0FBSyxHQUFaO1FBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxPQUFPLENBQUMsUUFBUTtnQkFBRSxTQUFTO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsU0FBUztZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFBRSxTQUFTO1lBQy9CLE1BQU07U0FDUDtJQUNILENBQUM7SUFDSCwyQkFBQztBQUFELENBdkJBLEFBdUJDLENBdkJrQyxvQ0FBZ0IsR0F1QmxEO0FBRUQ7SUFBdUMsNkJBQVU7SUFxQi9DO1FBQUEsWUFDRSxpQkFBTyxTQUNSO1FBZEQsV0FBVztRQUNELG1CQUFhLEdBQTBDLElBQUksZUFBTyxFQUd6RSxDQUFD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IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcFdyYXAsIE9iamVjdFdyYXAgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0VTNUV4XCI7XHJcbmltcG9ydCB7IEdDdHJsIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvR0N0cmxcIjtcclxuaW1wb3J0IFNoYWRlclV0aWwgZnJvbSBcIi4uLy4uLy4uL1NoYWRlcnMvTWFuYWdlci9TaGFkZXJVdGlsXCI7XHJcbmltcG9ydCB7IFZJRVdfSURCeVBhZ2VOdW0gfSBmcm9tIFwiLi4vLi4vQ29tbW9uL1VJXCI7XHJcbmltcG9ydCB7XHJcbiAgQ29uZGl0aW9uRW1pdHRlcixcclxuICBDb25kaXRpb25MaXN0dGVyLFxyXG59IGZyb20gXCIuLi8uLi9Mb2dpYy9Db25kaXRpb25MaXN0ZW5lclwiO1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi4vLi4vTG9naWMvR2FtZU1nclwiO1xyXG5cclxuY2xhc3MgU3lzdGVtVW5sb2NrTGlzdGVuZXIgZXh0ZW5kcyBDb25kaXRpb25MaXN0dGVyIHtcclxuICAvKiog5Yqf6IO9SUQgKi9cclxuICBwdWJsaWMgdmlld0lkOiBudW1iZXIgPSBudWxsO1xyXG4gIGNvbnN0cnVjdG9yKHZpZXdJZDogbnVtYmVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy52aWV3SWQgPSB2aWV3SWQ7XHJcbiAgfVxyXG5cclxuICAvKiog546v5aKD5Y+Y5pu05Zue6LCDICovXHJcbiAgcHJvdGVjdGVkIGVtaXRDb25kaXRpb25FbnZDaGFuZ2UoZW1pdHRlcjogQ29uZGl0aW9uRW1pdHRlcikge31cclxuICAvKiog5pyq6Kej6ZSB5o+Q56S6ICovXHJcbiAgcHVibGljIHRvYXN0KCkge31cclxuXHJcbiAgLyoqIOaMh+W8lei+vuaIkOadoeS7tiAqL1xyXG4gIHB1YmxpYyBndWlkZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZW1pdHRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGVtaWl0ZXIgPSB0aGlzLl9lbWl0dGVyc1tpXTtcclxuICAgICAgaWYgKGVtaWl0ZXIuY3VyU3RhdGUpIGNvbnRpbnVlO1xyXG4gICAgICBpZiAoaSA9PSAwKSBjb250aW51ZTtcclxuICAgICAgaWYgKCFlbWlpdGVyLmd1aWRlKCkpIGNvbnRpbnVlO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp1bXBUb01nciBleHRlbmRzIE9iamVjdFdyYXAge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgX2luczogSnVtcFRvTWdyO1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGlucygpOiBKdW1wVG9NZ3Ige1xyXG4gICAgaWYgKCF0aGlzLl9pbnMpIHtcclxuICAgICAgdGhpcy5faW5zID0gbmV3IEp1bXBUb01ncigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2lucztcclxuICB9XHJcblxyXG4gIC8qKiDop6PplIHmnaHku7YgKi9cclxuICBwcm90ZWN0ZWQgX3VubG9ja0NoZWNrczogTWFwV3JhcDxudW1iZXIsIFN5c3RlbVVubG9ja0xpc3RlbmVyPiA9IG5ldyBNYXBXcmFwPFxyXG4gICAgbnVtYmVyLFxyXG4gICAgU3lzdGVtVW5sb2NrTGlzdGVuZXJcclxuICA+KCk7XHJcbiAgLyoqIOWFs+iBlOeahHZpZXdJZCAqL1xyXG4gIHByb3RlY3RlZCBfdW5sb2NrS2V5UmVmczogTWFwV3JhcDxudW1iZXIsIG51bWJlcltdPiA9IG5ldyBNYXBXcmFwPFxyXG4gICAgbnVtYmVyLFxyXG4gICAgbnVtYmVyW11cclxuICA+KCk7XHJcbiAgcHVibGljIHJlY2hhZ2VWaWV3cyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKiog5ri45oiP6YC76L6R5byA5aeL5Zue6LCDICovXHJcbiAgcHVibGljIGluaXRHYW1lKCkge1xyXG4gICAgdGhpcy5pbml0U3lzdGVtVW5sb2NrKCk7XHJcbiAgfVxyXG5cclxuICAvKiog546p5a6255m75Ye6ICovXHJcbiAgcHVibGljIGxvZ2luT3V0KCkge1xyXG4gICAgdGhpcy51blN5c3RlbVVubG9jaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIOWIneWni+WMluWKn+iDveino+mUgemDqOWIhiAqL1xyXG4gIHByb3RlY3RlZCBpbml0U3lzdGVtVW5sb2NrKCkge1xyXG4gICAgdGhpcy5fdW5sb2NrQ2hlY2tzLmNsZWFyKCk7XHJcbiAgICB0aGlzLl91bmxvY2tLZXlSZWZzLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKiog6ZSA5q+B5p2h5Lu25LqL5Lu2ICovXHJcbiAgcHJvdGVjdGVkIHVuU3lzdGVtVW5sb2NrKCkge1xyXG4gICAgdGhpcy5fdW5sb2NrQ2hlY2tzLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgZS5kZXN0cm95KCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3VubG9ja0NoZWNrcy5jbGVhcigpO1xyXG4gICAgdGhpcy5fdW5sb2NrS2V5UmVmcy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGp1bXBHb1RvKGlkOiBudW1iZXIsIC4uLmFyZ3MpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1N5c3RlbU9wZW4oaWQsIHRydWUpKSByZXR1cm47XHJcbiAgICAvLyDnibnmrornlYzpnaLlpITnkIZcclxuXHJcbiAgICBsZXQgbmV3QXJncyA9IFtdO1xyXG4gICAgbGV0IHBhZ2UgPSBWSUVXX0lEQnlQYWdlTnVtW2lkXSA/IFZJRVdfSURCeVBhZ2VOdW1baWRdIDogbnVsbDtcclxuICAgIGlmIChwYWdlICYmIHBhZ2UucGFnZSkge1xyXG4gICAgICBpZCA9IHBhZ2UudmlldztcclxuICAgICAgbmV3QXJncy5wdXNoKC4uLnBhZ2UucGFnZSk7XHJcbiAgICB9XHJcbiAgICBsZXQgb3RoZXJQYXJhbSA9IHRoaXMuZ2V0UGFyYW0oaWQpO1xyXG4gICAgaWYgKG90aGVyUGFyYW0gfHwgb3RoZXJQYXJhbSA9PSAwKSB7XHJcbiAgICAgIG5ld0FyZ3MucHVzaChvdGhlclBhcmFtKTtcclxuICAgIH1cclxuICAgIC8vIOWFtuS7luWPguaVsOaUvuWJjemdou+8jOacgOWQjuaJjeaYr+iHquWumuS5ieeahOWPguaVsFxyXG4gICAgbmV3QXJncy5wdXNoKC4uLmFyZ3MpO1xyXG4gICAgR2FtZU1nci51aU1nci5zaG93V2luKGlkLCAuLi5uZXdBcmdzKTtcclxuICAgIC8vIOWPkemAgeeql+WPo+W8gOWQr+S6i+S7tlxyXG4gICAgR0N0cmwuRVMuZW1pdChHQ3RybC5HQ2xpZW50V2luT3BlbkV2ZW50TXNnLCBpZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3lzdGVtT3Blbkxpc3RlbmVyKHZpZXdJZDogbnVtYmVyKTogU3lzdGVtVW5sb2NrTGlzdGVuZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VubG9ja0NoZWNrcy5nZXQodmlld0lkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc1N5c3RlbU9wZW4oaWQ6IG51bWJlciwgb3V0Q2hlY2sgPSBmYWxzZSk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHVubG9ja0NoZWNrID0gdGhpcy5fdW5sb2NrQ2hlY2tzLmdldChpZCk7XHJcbiAgICBpZiAoIXVubG9ja0NoZWNrKSB7XHJcbiAgICAgIGxldCByZWZzID0gdGhpcy5fdW5sb2NrS2V5UmVmcy5nZXQoaWQpO1xyXG4gICAgICBpZiAocmVmcyAmJiByZWZzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWZzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmlzU3lzdGVtT3BlbihyZWZzW2ldLCBvdXRDaGVjayk7XHJcbiAgICAgICAgICBpZiAoIXN0YXRlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICghdW5sb2NrQ2hlY2suY3VyZVN0YXRlICYmIG91dENoZWNrKSB7XHJcbiAgICAgIHVubG9ja0NoZWNrLnRvYXN0KCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmxvY2tDaGVjay5jdXJlU3RhdGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0QnRuU3RhdHVzKHNwcml0ZU5vZGU6IGNjLk5vZGUsIHZpZXdJZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgaXNDYW5Td2l0Y2ggPSBHYW1lTWdyLmp1bXBUb01nci5pc1N5c3RlbU9wZW4odmlld0lkLCBmYWxzZSk7XHJcbiAgICBpZiAoIWlzQ2FuU3dpdGNoKSB7XHJcbiAgICAgIFNoYWRlclV0aWwuZ3JheShzcHJpdGVOb2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFNoYWRlclV0aWwubm9ybWFsKHNwcml0ZU5vZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzQ2FuU3dpdGNoO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQYXJhbShpZDogbnVtYmVyKTogYW55IHtcclxuICAgIHN3aXRjaCAoaWQpIHtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19