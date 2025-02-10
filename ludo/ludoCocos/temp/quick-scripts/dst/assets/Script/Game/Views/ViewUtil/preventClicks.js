
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/ViewUtil/preventClicks.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3846ykDtdP941rh0zQlXSM', 'preventClicks');
// Script/Game/Views/ViewUtil/preventClicks.ts

"use strict";
//**防止按钮连续点击 */
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameMgr_1 = require("../../Logic/GameMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var preventClicks = /** @class */ (function (_super) {
    __extends(preventClicks, _super);
    function preventClicks() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delayTime = 2;
        _this._clickTime = 0;
        return _this;
    }
    preventClicks.prototype.onLoad = function () {
        // if (CC_DEV) {
        //     this.delayTime = 0;
        // }
        var self = this;
        var btn = this.node.getComponent(cc.Button);
        if (!btn)
            return;
        var begin = btn._onTouchBegan;
        btn._onTouchBegan = function (event) {
            var time = Date.now();
            if (time - self._clickTime < self.delayTime * 1000) {
                GameMgr_1.default.uiMgr.showToast("当前请求频繁，请稍后再试");
                event.stopPropagation();
                return;
            }
            self._clickTime = Date.now();
            begin.call(btn, event);
        };
        // this.node.on("click", () => {
        //     btn.interactable = false;
        //     this.unscheduleAllCallbacks();
        //     this.scheduleOnce(() => {
        //         btn.interactable = true;
        //     }, this.delayTime);
        // })
    };
    __decorate([
        property()
    ], preventClicks.prototype, "delayTime", void 0);
    preventClicks = __decorate([
        ccclass
    ], preventClicks);
    return preventClicks;
}(cc.Component));
exports.default = preventClicks;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9WaWV3VXRpbC9wcmV2ZW50Q2xpY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZiwrQ0FBMEM7QUFFcEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUErQkM7UUE3QlEsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixnQkFBVSxHQUFXLENBQUMsQ0FBQzs7SUE0QmhDLENBQUM7SUEzQlEsOEJBQU0sR0FBYjtRQUNFLGdCQUFnQjtRQUNoQiwwQkFBMEI7UUFDMUIsSUFBSTtRQUNKLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPO1FBQ2pCLElBQUksS0FBSyxHQUFJLEdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDdEMsR0FBVyxDQUFDLGFBQWEsR0FBRyxVQUFVLEtBQUs7WUFDMUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEVBQUU7Z0JBQ2xELGlCQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDeEMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUM7UUFFRixnQ0FBZ0M7UUFDaEMsZ0NBQWdDO1FBQ2hDLHFDQUFxQztRQUNyQyxnQ0FBZ0M7UUFDaEMsbUNBQW1DO1FBQ25DLDBCQUEwQjtRQUMxQixLQUFLO0lBQ1AsQ0FBQztJQTVCRDtRQURDLFFBQVEsRUFBRTtvREFDa0I7SUFGVixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBK0JqQztJQUFELG9CQUFDO0NBL0JELEFBK0JDLENBL0IwQyxFQUFFLENBQUMsU0FBUyxHQStCdEQ7a0JBL0JvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKumYsuatouaMiemSrui/nue7reeCueWHuyAqL1xyXG5cclxuaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4uLy4uL0xvZ2ljL0dhbWVNZ3JcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHByZXZlbnRDbGlja3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eSgpXHJcbiAgcHVibGljIGRlbGF5VGltZTogbnVtYmVyID0gMjtcclxuICBwdWJsaWMgX2NsaWNrVGltZTogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgb25Mb2FkKCkge1xyXG4gICAgLy8gaWYgKENDX0RFVikge1xyXG4gICAgLy8gICAgIHRoaXMuZGVsYXlUaW1lID0gMDtcclxuICAgIC8vIH1cclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGxldCBidG4gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICBpZiAoIWJ0bikgcmV0dXJuO1xyXG4gICAgbGV0IGJlZ2luID0gKGJ0biBhcyBhbnkpLl9vblRvdWNoQmVnYW47XHJcbiAgICAoYnRuIGFzIGFueSkuX29uVG91Y2hCZWdhbiA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICBsZXQgdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgIGlmICh0aW1lIC0gc2VsZi5fY2xpY2tUaW1lIDwgc2VsZi5kZWxheVRpbWUgKiAxMDAwKSB7XHJcbiAgICAgICAgR2FtZU1nci51aU1nci5zaG93VG9hc3QoXCLlvZPliY3or7fmsYLpopHnuYHvvIzor7fnqI3lkI7lho3or5VcIik7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNlbGYuX2NsaWNrVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgIGJlZ2luLmNhbGwoYnRuLCBldmVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHRoaXMubm9kZS5vbihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIC8vICAgICBidG4uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAvLyAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBidG4uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIC8vICAgICB9LCB0aGlzLmRlbGF5VGltZSk7XHJcbiAgICAvLyB9KVxyXG4gIH1cclxufVxyXG4iXX0=