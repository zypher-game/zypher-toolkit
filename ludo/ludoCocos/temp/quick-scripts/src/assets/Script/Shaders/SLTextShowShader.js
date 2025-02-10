"use strict";
cc._RF.push(module, '9cec2sM/K1ES6arCcYpGUGk', 'SLTextShowShader');
// Script/Shaders/SLTextShowShader.ts

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
var GComponent_1 = require("../Core/FrameEx/GComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, menu = _a.menu;
var SLTextShowShader = /** @class */ (function (_super) {
    __extends(SLTextShowShader, _super);
    function SLTextShowShader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._maskMaterial = null;
        _this._sprite = null;
        _this._easpTime = 0;
        return _this;
    }
    SLTextShowShader.prototype.__onLoad = function () {
        this._sprite = this.node.getComponent(cc.Sprite);
        var frame = this._sprite.spriteFrame;
        frame["__unpack"] = true;
        this._maskMaterial = this._sprite.getMaterial(0);
    };
    SLTextShowShader.prototype.update = function (dt) {
        this._easpTime += dt;
        if (this._easpTime > 5) {
            this._easpTime = 5;
        }
        this._maskMaterial.setProperty("u_time", this._easpTime / 3);
    };
    __decorate([
        property(cc.Material)
    ], SLTextShowShader.prototype, "_maskMaterial", void 0);
    __decorate([
        property(cc.Sprite)
    ], SLTextShowShader.prototype, "_sprite", void 0);
    SLTextShowShader = __decorate([
        ccclass,
        menu("Shaders/SLTextShowShader"),
        executeInEditMode
    ], SLTextShowShader);
    return SLTextShowShader;
}(GComponent_1.default));
exports.default = SLTextShowShader;

cc._RF.pop();