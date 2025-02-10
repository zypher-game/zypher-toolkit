"use strict";
cc._RF.push(module, '3781fN+KnxMdKC1uHYVdlix', 'GChild');
// Script/Core/GView/GChild.ts

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
var GComponent_1 = require("../FrameEx/GComponent");
var GCtrl_1 = require("../GCtrl");
var GLoader_1 = require("../GLoader/GLoader");
var GCustomData_1 = require("./GCustomData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var GChild = /** @class */ (function (_super) {
    __extends(GChild, _super);
    function GChild() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._customData = null;
        return _this;
    }
    Object.defineProperty(GChild.prototype, "assetImpl", {
        get: function () {
            if (!this._assetImpl) {
                this._assetImpl = GLoader_1.GAssetImpl.getAssetImpl(cc.js.getClassName(this) + this.uuid);
            }
            return this._assetImpl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GChild.prototype, "customData", {
        get: function () {
            return this._customData;
        },
        enumerable: false,
        configurable: true
    });
    GChild.prototype.setCustomData = function (data) {
        if (!this._customData) {
            this._customData = this.node.addComponent(GCustomData_1.default);
        }
        this._customData.setData(data);
    };
    GChild.prototype.__onLoad = function () {
        this.onGLoad();
    };
    GChild.prototype.onGLoad = function () { };
    GChild.prototype.onGStart = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    GChild.prototype.__onDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this);
        GCtrl_1.GCtrl.ES.off(this.node);
        GCtrl_1.GCtrl.ES.emit("ONGChildDestroy", GCtrl_1.GCtrl.param(this));
        this.onGDestroy();
    };
    GChild.prototype.onGDestroy = function () { };
    GChild = __decorate([
        ccclass,
        menu("View/GBase/GChild")
    ], GChild);
    return GChild;
}(GComponent_1.default));
exports.default = GChild;

cc._RF.pop();