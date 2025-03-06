
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Home/handle/AccountCenterNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Ib21lL2hhbmRsZS9BY2NvdW50Q2VudGVyTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3REFBbUQ7QUFDN0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFzQkM7UUFyQjZCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBQzlCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBQy9CLGtCQUFZLEdBQWEsSUFBSSxDQUFDOztJQW1CNUQsQ0FBQztJQWxCVyw4QkFBTSxHQUFoQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTyx5Q0FBaUIsR0FBekI7UUFDRSxJQUFNLFdBQVcsR0FBRyxvQkFBVSxDQUFDLGVBQWUsQ0FBQztRQUMvQyxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDcEMsSUFBTSxZQUFZLEdBQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQU0sT0FBTyxDQUFDLFNBQVMsQ0FDcEUsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQ2pCLENBQUM7WUFDSixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFLLENBQUM7WUFDekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztTQUNyRDtJQUNILENBQUM7SUFDTSwwQ0FBa0IsR0FBekI7UUFDRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBcEJtQjtRQUFuQixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFBdUM7SUFDdEM7UUFBbkIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQXdDO0lBQ3ZDO1FBQW5CLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUF1QztJQUh2QyxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBc0JqQztJQUFELG9CQUFDO0NBdEJELEFBc0JDLENBdEIwQyxFQUFFLENBQUMsU0FBUyxHQXNCdEQ7a0JBdEJvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vQ29yZS9HVmlldy9HVmlld0Jhc2VcIjtcbmltcG9ydCBBY2NvdW50TWdyIGZyb20gXCIuLi8uLi8uLi9Mb2dpYy9BY2NvdW50TWdyXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudENlbnRlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShjYy5MYWJlbCkgcHJpdmF0ZSBhZGRyZXNzTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgQHByb3BlcnR5KGNjLkxhYmVsKSBwcml2YXRlIG5pY2tOYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgQHByb3BlcnR5KGNjLkxhYmVsKSBwcml2YXRlIGJhbGFuY2VMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xuICAgIHRoaXMudXBkYXRlQWNjb3VudEluZm8oKTtcbiAgfVxuICBwcml2YXRlIHVwZGF0ZUFjY291bnRJbmZvKCkge1xuICAgIGNvbnN0IGFjY291bnREYXRhID0gQWNjb3VudE1nci5pbml0TG9naW5TdGF0aWM7XG4gICAgaWYgKGFjY291bnREYXRhKSB7XG4gICAgICBjb25zdCBhZGRyZXNzID0gYWNjb3VudERhdGEuYWRkcmVzcztcbiAgICAgIGNvbnN0IHNob3J0QWRkcmVzcyA9IGAke2FkZHJlc3Muc3Vic3RyaW5nKDAsIDYpfS4uLiR7YWRkcmVzcy5zdWJzdHJpbmcoXG4gICAgICAgIGFkZHJlc3MubGVuZ3RoIC0gNFxuICAgICAgKX1gO1xuICAgICAgdGhpcy5hZGRyZXNzTGFiZWwuc3RyaW5nID0gc2hvcnRBZGRyZXNzO1xuICAgICAgdGhpcy5uaWNrTmFtZUxhYmVsLnN0cmluZyA9IGAke2FjY291bnREYXRhLm5pY2tOYW1lLnN1YnN0cmluZygwLCA2KX0uLi5gO1xuICAgICAgdGhpcy5iYWxhbmNlTGFiZWwuc3RyaW5nID0gYWNjb3VudERhdGEucG9pbnRCYWxhbmNlO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgcmVmcmVzaEFjY291bnRJbmZvKCkge1xuICAgIHRoaXMudXBkYXRlQWNjb3VudEluZm8oKTtcbiAgfVxufVxuIl19