"use strict";
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