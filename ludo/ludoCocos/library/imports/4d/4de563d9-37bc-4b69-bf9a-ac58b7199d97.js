"use strict";
cc._RF.push(module, '4de56PZN7xLab+arFi3GZ2X', 'WaitCtrl');
// Script/Game/Views/Tip/WaitCtrl.ts

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
var GViewBase_1 = require("../../../Core/GView/GViewBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var WaitCtrl = /** @class */ (function (_super) {
    __extends(WaitCtrl, _super);
    function WaitCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property(cc.Node) load: cc.Node[] = []
        _this.loadRing = null;
        _this.netTip = null;
        _this._curNetText = "";
        return _this;
    }
    WaitCtrl.prototype.onGLoad = function () { };
    WaitCtrl.prototype.onGStart = function () {
        this.commonWait();
    };
    WaitCtrl.prototype.commonWait = function (unAutoClose) {
        var _this = this;
        this.loadRing.stopAllActions();
        this.bgImage.node.opacity = 0;
        var endFunc = function () {
            if (unAutoClose) {
                _this.commonWait(true);
                return;
            }
            _this.onClose();
        };
        cc.tween(this.loadRing)
            .delay(0.2)
            .call(function () {
            _this.bgImage.node.opacity = 255;
        })
            .repeat(100, cc.tween(this.loadRing).by(0.2, { angle: -90 }))
            .call(endFunc)
            .start();
    };
    WaitCtrl.prototype.disConnectWait = function () {
        this.commonWait(true);
        this._curNetText = "";
    };
    __decorate([
        property(cc.Node)
    ], WaitCtrl.prototype, "loadRing", void 0);
    __decorate([
        property(cc.Label)
    ], WaitCtrl.prototype, "netTip", void 0);
    WaitCtrl = __decorate([
        ccclass,
        menu("View/Tip/WaitCtrl")
    ], WaitCtrl);
    return WaitCtrl;
}(GViewBase_1.default));
exports.default = WaitCtrl;

cc._RF.pop();