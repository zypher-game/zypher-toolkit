
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GViewDestory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '715c3mK8btA4pnLxzJ8mwC5', 'GViewDestory');
// Script/Core/GView/GViewDestory.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GCtrl_1 = require("../GCtrl");
/**
 * @name GViewDestory
 * @author Visow
 * @description 对象销毁同意统一处理组件
 * @class
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
/**自动销毁组件，用来处理销毁时的通用组件 */
var GViewDestory = /** @class */ (function (_super) {
    __extends(GViewDestory, _super);
    function GViewDestory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GViewDestory.prototype.onDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this.node);
        if (this.otherDestroyCb)
            this.otherDestroyCb();
        this.otherDestroyCb = null;
    };
    GViewDestory = __decorate([
        ccclass,
        menu("View/GBase/GViewDestory")
    ], GViewDestory);
    return GViewDestory;
}(cc.Component));
exports.default = GViewDestory;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HVmlld0Rlc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0NBQWlDO0FBRWpDOzs7OztHQUtHO0FBRUcsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFFbEQseUJBQXlCO0FBR3pCO0lBQTBDLGdDQUFZO0lBQXREOztJQVFBLENBQUM7SUFMQyxnQ0FBUyxHQUFUO1FBQ0UsYUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLGNBQWM7WUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQVBrQixZQUFZO1FBRmhDLE9BQU87UUFDUCxJQUFJLENBQUMseUJBQXlCLENBQUM7T0FDWCxZQUFZLENBUWhDO0lBQUQsbUJBQUM7Q0FSRCxBQVFDLENBUnlDLEVBQUUsQ0FBQyxTQUFTLEdBUXJEO2tCQVJvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vR0N0cmxcIjtcclxuXHJcbi8qKlxyXG4gKiBAbmFtZSBHVmlld0Rlc3RvcnlcclxuICogQGF1dGhvciBWaXNvd1xyXG4gKiBAZGVzY3JpcHRpb24g5a+56LGh6ZSA5q+B5ZCM5oSP57uf5LiA5aSE55CG57uE5Lu2XHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKiroh6rliqjplIDmr4Hnu4Tku7bvvIznlKjmnaXlpITnkIbplIDmr4Hml7bnmoTpgJrnlKjnu4Tku7YgKi9cclxuQGNjY2xhc3NcclxuQG1lbnUoXCJWaWV3L0dCYXNlL0dWaWV3RGVzdG9yeVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHVmlld0Rlc3RvcnkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gIHB1YmxpYyBvdGhlckRlc3Ryb3lDYjogYW55O1xyXG5cclxuICBvbkRlc3Ryb3koKSB7XHJcbiAgICBHQ3RybC5FUy5vZmYodGhpcy5ub2RlKTtcclxuICAgIGlmICh0aGlzLm90aGVyRGVzdHJveUNiKSB0aGlzLm90aGVyRGVzdHJveUNiKCk7XHJcbiAgICB0aGlzLm90aGVyRGVzdHJveUNiID0gbnVsbDtcclxuICB9XHJcbn1cclxuIl19