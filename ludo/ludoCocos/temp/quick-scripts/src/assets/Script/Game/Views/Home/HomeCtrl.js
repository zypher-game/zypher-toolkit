"use strict";
cc._RF.push(module, 'ffb93eqQMtBV4yYuLGXoZyb', 'HomeCtrl');
// Script/Game/Views/Home/HomeCtrl.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadCtrl = /** @class */ (function (_super) {
    __extends(LoadCtrl, _super);
    function LoadCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.walletConnectHandle = null;
        return _this;
    }
    LoadCtrl.prototype.start = function () {
        this.walletConnectHandle.on('click', function () {
            console.log(11111);
            window.parent.postMessage('walletConnect', 'http://192.168.0.22:9998/');
        });
    };
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "walletConnectHandle", void 0);
    LoadCtrl = __decorate([
        ccclass
    ], LoadCtrl);
    return LoadCtrl;
}(GViewBase_1.default));
exports.default = LoadCtrl;

cc._RF.pop();