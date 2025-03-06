"use strict";
cc._RF.push(module, '5e76eILwyFMqK/SCug+tQG+', 'AccountMgr');
// Script/Game/Logic/AccountMgr.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountChangedEmit = void 0;
var ES5Ex_1 = require("../../Core/FrameEx/ES5Ex");
var GCtrl_1 = require("../../Core/GCtrl");
exports.AccountChangedEmit = "account-changed";
var AccountMgr = /** @class */ (function (_super) {
    __extends(AccountMgr, _super);
    function AccountMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._accountInfo = null;
        return _this;
    }
    Object.defineProperty(AccountMgr, "ins", {
        get: function () {
            if (!this._ins) {
                this._ins = new AccountMgr();
            }
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AccountMgr, "initLoginStatic", {
        // 存储登录后的账户信息
        get: function () {
            return AccountMgr.ins._accountInfo;
            // this.ins().user = {
            //   address: "0x72C408107E45984ffb931381770F501C55aA11A8",
            //   avatar: "",
            //   nickName: "xxxxx",
            // };
        },
        enumerable: false,
        configurable: true
    });
    // 设置账户信息
    AccountMgr.prototype.setAccountInfo = function (info) {
        this._accountInfo = info;
        this.emitAccountChange();
    };
    AccountMgr.prototype.emitAccountChange = function () {
        // 使用事件系统通知其他组件
        GCtrl_1.GCtrl.ES.emit(exports.AccountChangedEmit);
    };
    AccountMgr._ins = null;
    return AccountMgr;
}(ES5Ex_1.ObjectWrap));
exports.default = AccountMgr;

cc._RF.pop();