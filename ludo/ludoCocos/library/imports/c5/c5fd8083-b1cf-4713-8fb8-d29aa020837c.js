"use strict";
cc._RF.push(module, 'c5fd8CDsc9HE4+40pqgIIN8', 'SLGuideShader');
// Script/Shaders/SLGuideShader.ts

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
var SLGuideShader = /** @class */ (function (_super) {
    __extends(SLGuideShader, _super);
    function SLGuideShader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask1 = [0, 0, 0, 0];
        _this.mask2 = [0, 0, 0, 0];
        _this.inverted = false;
        _this._maskMaterial = null;
        _this._sprite = null;
        return _this;
    }
    SLGuideShader.prototype.__onLoad = function () {
        this.node.setContentSize(cc.winSize);
        var material = this.assetImpl.getPreLoadAsset("materials/ui-guide");
        this._sprite = this.node.getComponent(cc.Sprite);
        if (material) {
            this._sprite.setMaterial(0, material);
            this._maskMaterial = this._sprite.getMaterial(0);
            this._maskMaterial.setProperty("wh_ratio", cc.winSize.width / cc.winSize.height);
        }
    };
    SLGuideShader.prototype.reSetMask1 = function (mask1, mask2) {
        if (!this._maskMaterial)
            return;
        if (this.mask1[0] == mask1[0] &&
            this.mask1[1] == mask1[1] &&
            this.mask1[2] == mask1[2] &&
            this.mask1[3] == mask1[3])
            return;
        this.mask1 = mask1;
        this._maskMaterial.setProperty("mask1_point", cc.v2(this.mask1[0] / this.node.width, 1 - this.mask1[1] / this.node.height));
        this._maskMaterial.setProperty("mask1_size", cc.v2(this.mask1[2] / this.node.width, this.mask1[3] / this.node.height));
        if (mask2)
            this.reSetMask2(mask2);
    };
    SLGuideShader.prototype.reSetMask2 = function (mask2) {
        if (!this._maskMaterial)
            return;
        if (this.mask2[0] == mask2[0] &&
            this.mask2[1] == mask2[1] &&
            this.mask2[2] == mask2[2] &&
            this.mask2[3] == mask2[3])
            return;
        this.mask2 = mask2;
        this._maskMaterial.setProperty("mask2_point", cc.v2(this.mask2[0] / this.node.width, 1 - this.mask2[1] / this.node.height));
        this._maskMaterial.setProperty("mask2_size", cc.v2(this.mask2[2] / this.node.width, this.mask2[3] / this.node.height));
    };
    __decorate([
        property([cc.Float])
    ], SLGuideShader.prototype, "mask1", void 0);
    __decorate([
        property([cc.Float])
    ], SLGuideShader.prototype, "mask2", void 0);
    __decorate([
        property(cc.Boolean)
    ], SLGuideShader.prototype, "inverted", void 0);
    __decorate([
        property(cc.Material)
    ], SLGuideShader.prototype, "_maskMaterial", void 0);
    __decorate([
        property(cc.Sprite)
    ], SLGuideShader.prototype, "_sprite", void 0);
    SLGuideShader = __decorate([
        ccclass,
        menu("Shaders/SLGuideShader")
    ], SLGuideShader);
    return SLGuideShader;
}(GComponent_1.default));
exports.default = SLGuideShader;

cc._RF.pop();