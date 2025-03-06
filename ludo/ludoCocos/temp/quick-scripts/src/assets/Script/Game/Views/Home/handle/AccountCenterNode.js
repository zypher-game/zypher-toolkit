"use strict";
cc._RF.push(module, '57a43H9myJEO5a7rkWoxkmn', 'AccountCenterNode');
// Script/Game/Views/Home/handle/AccountCenterNode.ts

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
var AccountMgr_1 = require("../../../Logic/AccountMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AccountCenter = /** @class */ (function (_super) {
    __extends(AccountCenter, _super);
    function AccountCenter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addressLabel = null;
        _this.nickNameLabel = null;
        _this.balanceLabel = null;
        return _this;
    }
    AccountCenter.prototype.onLoad = function () {
        this.updateAccountInfo();
    };
    AccountCenter.prototype.updateAccountInfo = function () {
        var accountData = AccountMgr_1.default.initLoginStatic;
        if (accountData) {
            var address = accountData.address;
            var shortAddress = address.substring(0, 6) + "..." + address.substring(address.length - 4);
            this.addressLabel.string = shortAddress;
            this.nickNameLabel.string = accountData.nickName.substring(0, 6) + "...";
            this.balanceLabel.string = accountData.pointBalance;
        }
    };
    AccountCenter.prototype.refreshAccountInfo = function () {
        this.updateAccountInfo();
    };
    __decorate([
        property(cc.Label)
    ], AccountCenter.prototype, "addressLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AccountCenter.prototype, "nickNameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AccountCenter.prototype, "balanceLabel", void 0);
    AccountCenter = __decorate([
        ccclass
    ], AccountCenter);
    return AccountCenter;
}(cc.Component));
exports.default = AccountCenter;

cc._RF.pop();