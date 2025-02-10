"use strict";
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