"use strict";
cc._RF.push(module, 'de04fZ/3HBNCaHO7VMPNMDz', 'CanvasEx');
// Script/Core/FrameEx/CanvasEx.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var CanvasEx = /** @class */ (function (_super) {
    __extends(CanvasEx, _super);
    function CanvasEx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Canvas 的适配策略
    // 通过比较设计分辨率（design size）与当前窗口可见区域（visible size）的宽高比，来确定是否应该让内容宽度或高度完全填充屏幕
    CanvasEx.prototype.onLoad = function () {
        var old = GCtrl_1.GCtrl.designSize.width / GCtrl_1.GCtrl.designSize.height;
        var win = cc.view.getVisibleSize().width / cc.view.getVisibleSize().height; //cc.winSize.width / GCtrl.winSize.height;
        if (old > win) {
            this.fitHeight = false;
            this.fitWidth = true;
        }
        else {
            this.fitHeight = true;
            this.fitWidth = false;
        }
    };
    CanvasEx.prototype.start = function () { };
    CanvasEx = __decorate([
        ccclass,
        menu("FrameEx/CanvasEx")
    ], CanvasEx);
    return CanvasEx;
}(cc.Canvas));
exports.default = CanvasEx;

cc._RF.pop();