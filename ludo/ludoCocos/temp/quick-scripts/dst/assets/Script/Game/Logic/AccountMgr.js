
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Logic/AccountMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9Mb2dpYy9BY2NvdW50TWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBc0Q7QUFDdEQsMENBQXlDO0FBTzVCLFFBQUEsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7QUFDcEQ7SUFBd0MsOEJBQVU7SUFBbEQ7UUFBQSxxRUEyQkM7UUF6QlMsa0JBQVksR0FBaUIsSUFBSSxDQUFDOztJQXlCNUMsQ0FBQztJQXhCQyxzQkFBa0IsaUJBQUc7YUFBckI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7YUFDOUI7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBa0IsNkJBQWU7UUFEakMsYUFBYTthQUNiO1lBQ0UsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztZQUNuQyxzQkFBc0I7WUFDdEIsMkRBQTJEO1lBQzNELGdCQUFnQjtZQUNoQix1QkFBdUI7WUFDdkIsS0FBSztRQUNQLENBQUM7OztPQUFBO0lBQ0QsU0FBUztJQUNGLG1DQUFjLEdBQXJCLFVBQXNCLElBQWtCO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTyxzQ0FBaUIsR0FBekI7UUFDRSxlQUFlO1FBQ2YsYUFBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEJBQWtCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBekJjLGVBQUksR0FBZSxJQUFJLENBQUM7SUEwQnpDLGlCQUFDO0NBM0JELEFBMkJDLENBM0J1QyxrQkFBVSxHQTJCakQ7a0JBM0JvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JqZWN0V3JhcCB9IGZyb20gXCIuLi8uLi9Db3JlL0ZyYW1lRXgvRVM1RXhcIjtcbmltcG9ydCB7IEdDdHJsIH0gZnJvbSBcIi4uLy4uL0NvcmUvR0N0cmxcIjtcbnR5cGUgSUFjY291bnRJbmZvID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGF2YXRhcjogc3RyaW5nO1xuICBuaWNrTmFtZTogc3RyaW5nO1xuICBwb2ludEJhbGFuY2U6IHN0cmluZztcbn07XG5leHBvcnQgY29uc3QgQWNjb3VudENoYW5nZWRFbWl0ID0gXCJhY2NvdW50LWNoYW5nZWRcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY291bnRNZ3IgZXh0ZW5kcyBPYmplY3RXcmFwIHtcbiAgcHJpdmF0ZSBzdGF0aWMgX2luczogQWNjb3VudE1nciA9IG51bGw7XG4gIHByaXZhdGUgX2FjY291bnRJbmZvOiBJQWNjb3VudEluZm8gPSBudWxsO1xuICBwdWJsaWMgc3RhdGljIGdldCBpbnMoKTogQWNjb3VudE1nciB7XG4gICAgaWYgKCF0aGlzLl9pbnMpIHtcbiAgICAgIHRoaXMuX2lucyA9IG5ldyBBY2NvdW50TWdyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9pbnM7XG4gIH1cbiAgLy8g5a2Y5YKo55m75b2V5ZCO55qE6LSm5oi35L+h5oGvXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGluaXRMb2dpblN0YXRpYygpOiBJQWNjb3VudEluZm8ge1xuICAgIHJldHVybiBBY2NvdW50TWdyLmlucy5fYWNjb3VudEluZm87XG4gICAgLy8gdGhpcy5pbnMoKS51c2VyID0ge1xuICAgIC8vICAgYWRkcmVzczogXCIweDcyQzQwODEwN0U0NTk4NGZmYjkzMTM4MTc3MEY1MDFDNTVhQTExQThcIixcbiAgICAvLyAgIGF2YXRhcjogXCJcIixcbiAgICAvLyAgIG5pY2tOYW1lOiBcInh4eHh4XCIsXG4gICAgLy8gfTtcbiAgfVxuICAvLyDorr7nva7otKbmiLfkv6Hmga9cbiAgcHVibGljIHNldEFjY291bnRJbmZvKGluZm86IElBY2NvdW50SW5mbykge1xuICAgIHRoaXMuX2FjY291bnRJbmZvID0gaW5mbztcbiAgICB0aGlzLmVtaXRBY2NvdW50Q2hhbmdlKCk7XG4gIH1cbiAgcHJpdmF0ZSBlbWl0QWNjb3VudENoYW5nZSgpIHtcbiAgICAvLyDkvb/nlKjkuovku7bns7vnu5/pgJrnn6Xlhbbku5bnu4Tku7ZcbiAgICBHQ3RybC5FUy5lbWl0KEFjY291bnRDaGFuZ2VkRW1pdCk7XG4gIH1cbn1cbiJdfQ==