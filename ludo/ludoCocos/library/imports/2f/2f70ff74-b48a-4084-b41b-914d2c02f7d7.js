"use strict";
cc._RF.push(module, '2f70f90tIpAhLQbkU0sAvfX', 'ToastCtrl');
// Script/Game/Views/Tip/ToastCtrl.ts

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
var MaskSprite_1 = require("../../../Core/FrameEx/MaskSprite");
var GChild_1 = require("../../../Core/GView/GChild");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var ToastCtrl = /** @class */ (function (_super) {
    __extends(ToastCtrl, _super);
    function ToastCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tip = null;
        _this.icon = null;
        _this.bgImage = null;
        _this._duration = 2;
        _this._rCb = null;
        return _this;
    }
    ToastCtrl.prototype.setRcb = function (rCb) {
        this._rCb = rCb;
    };
    ToastCtrl.prototype.setText = function (msg, duration) {
        var _this = this;
        this.node.y = 0;
        this.node.x = 0;
        this.node.opacity = 255;
        var msgs = msg.split("$");
        var icon, maskType;
        if (msgs.length > 1) {
            icon = msgs[0];
            maskType = parseInt(msgs[1]);
            msg = msgs[2];
        }
        if (this.icon && icon) {
            this.icon.node.active = true;
            this.icon._maskType = maskType;
            this.assetImpl.spriteFrame(this.icon, icon);
        }
        else {
            if (this.icon) {
                this.icon.node.active = true;
            }
        }
        if (!this.tip)
            return;
        if (duration)
            this._duration = duration;
        this.tip.string = msg;
        this.node.y = -100;
        var spaw = cc.spawn(cc.moveTo(this._duration, cc.v2(0, 100)), cc.sequence(cc.delayTime((1 * this._duration) / 2), cc.fadeOut((1 * this._duration) / 2)));
        var action = cc.sequence(spaw, cc.callFunc(function () {
            // GCtrl.destroy(this.node);
            _this._rCb && _this._rCb(_this.node);
        }));
        this.node.runAction(action);
        if (this.tip.node.width > 350) {
            this.bgImage.node.width = this.tip.node.width + 50;
        }
        else {
            this.bgImage.node.width = 350;
        }
    };
    ToastCtrl.prototype.setDuration = function (duration) {
        this._duration = duration;
    };
    __decorate([
        property(cc.RichText)
    ], ToastCtrl.prototype, "tip", void 0);
    __decorate([
        property(MaskSprite_1.default)
    ], ToastCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Sprite)
    ], ToastCtrl.prototype, "bgImage", void 0);
    ToastCtrl = __decorate([
        ccclass,
        menu("View/Tip/ToastCtrl")
    ], ToastCtrl);
    return ToastCtrl;
}(GChild_1.default));
exports.default = ToastCtrl;

cc._RF.pop();