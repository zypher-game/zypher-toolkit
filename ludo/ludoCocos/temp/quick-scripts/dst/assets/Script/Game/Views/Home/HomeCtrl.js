
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Home/HomeCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
var CoreDefine_1 = require("../../../Core/CoreDefine");
var GCtrl_1 = require("../../../Core/GCtrl");
var GViewBase_1 = require("../../../Core/GView/GViewBase");
var UI_1 = require("../../Common/UI");
var AccountMgr_1 = require("../../Logic/AccountMgr");
var GameMgr_1 = require("../../Logic/GameMgr");
var AccountCenterNode_1 = require("./handle/AccountCenterNode");
var WalletConnectNode_1 = require("./handle/WalletConnectNode");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadCtrl = /** @class */ (function (_super) {
    __extends(LoadCtrl, _super);
    function LoadCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TasksNode = null;
        _this.LeaderBoardNode = null;
        _this.SettingNode = null;
        _this.HelpNode = null;
        _this.AIAgentPlayNode = null;
        _this.accountCenter = null;
        _this.walletConnectNode = null;
        return _this;
    }
    LoadCtrl.prototype.onGLoad = function () {
        this.checkAccountStatus();
        GCtrl_1.GCtrl.ES.on(AccountMgr_1.AccountChangedEmit, this, this.onAccountChanged.bind(this), CoreDefine_1.PRIORITY_DATA);
    };
    LoadCtrl.prototype.onAccountChanged = function () {
        this.checkAccountStatus();
        if (this.accountCenter.node.active) {
            this.accountCenter.refreshAccountInfo();
        }
    };
    LoadCtrl.prototype.checkAccountStatus = function () {
        var accountInfo = AccountMgr_1.default.initLoginStatic;
        this.walletConnectNode.node.active = !accountInfo;
        this.accountCenter.node.active = !!accountInfo;
    };
    LoadCtrl.prototype.onDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this);
        this.TasksNode.off("click", this.TasksHandle);
        this.LeaderBoardNode.off("click", this.LeaderBoardHandle);
        this.SettingNode.off("click", this.SettingHandle);
        this.HelpNode.off("click", this.HelpHandle);
        this.AIAgentPlayNode.off("click", this.AIAgentPlayHandle);
    };
    LoadCtrl.prototype.start = function () {
        // this.walletConnectHandle.on("click", () => {
        //   console.log(11111);
        //   window.parent.postMessage("walletConnect", "http://192.168.0.22:9998/");
        // });
        this.TasksNode.on("click", this.TasksHandle);
        this.LeaderBoardNode.on("click", this.LeaderBoardHandle);
        this.SettingNode.on("click", this.SettingHandle);
        this.HelpNode.on("click", this.HelpHandle);
        this.AIAgentPlayNode.on("click", this.AIAgentPlayHandle);
    };
    LoadCtrl.prototype.TasksHandle = function () {
        GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.DailyTasks);
        console.log("TasksHandle");
    };
    LoadCtrl.prototype.LeaderBoardHandle = function () {
        console.log("LeaderBoardHandle");
    };
    LoadCtrl.prototype.SettingHandle = function () {
        console.log("SettingHandle");
    };
    LoadCtrl.prototype.HelpHandle = function () {
        console.log("HelpHandle");
    };
    LoadCtrl.prototype.AIAgentPlayHandle = function () {
        console.log("AIAgentPlayHandle");
    };
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "TasksNode", void 0);
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "LeaderBoardNode", void 0);
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "SettingNode", void 0);
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "HelpNode", void 0);
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "AIAgentPlayNode", void 0);
    __decorate([
        property(AccountCenterNode_1.default)
    ], LoadCtrl.prototype, "accountCenter", void 0);
    __decorate([
        property(WalletConnectNode_1.default)
    ], LoadCtrl.prototype, "walletConnectNode", void 0);
    LoadCtrl = __decorate([
        ccclass
    ], LoadCtrl);
    return LoadCtrl;
}(GViewBase_1.default));
exports.default = LoadCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Ib21lL0hvbWVDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUF5RDtBQUN6RCw2Q0FBNEM7QUFDNUMsMkRBQXNEO0FBQ3RELHNDQUEwQztBQUMxQyxxREFBd0U7QUFDeEUsK0NBQTBDO0FBQzFDLGdFQUF1RDtBQUN2RCxnRUFBMkQ7QUFFckQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVM7SUFBL0M7UUFBQSxxRUFtRUM7UUFsRW9CLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixxQkFBZSxHQUFZLElBQUksQ0FBQztRQUMxQixtQkFBYSxHQUFrQixJQUFJLENBQUM7UUFDaEMsdUJBQWlCLEdBQXNCLElBQUksQ0FBQzs7SUE0RDNFLENBQUM7SUEzRFcsMEJBQU8sR0FBakI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixhQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FDVCwrQkFBa0IsRUFDbEIsSUFBSSxFQUNKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ2hDLDBCQUFhLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFDTyxtQ0FBZ0IsR0FBeEI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBQ08scUNBQWtCLEdBQTFCO1FBQ0UsSUFBTSxXQUFXLEdBQUcsb0JBQVUsQ0FBQyxlQUFlLENBQUM7UUFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDakQsQ0FBQztJQUNTLDRCQUFTLEdBQW5CO1FBQ0UsYUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ1Msd0JBQUssR0FBZjtRQUNFLCtDQUErQztRQUMvQyx3QkFBd0I7UUFDeEIsNkVBQTZFO1FBQzdFLE1BQU07UUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDUyw4QkFBVyxHQUFyQjtRQUNFLGlCQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRVMsb0NBQWlCLEdBQTNCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFUyxnQ0FBYSxHQUF2QjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLDZCQUFVLEdBQXBCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRVMsb0NBQWlCLEdBQTNCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFqRWtCO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUEyQjtJQUMxQjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFBaUM7SUFDaEM7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQTZCO0lBQzVCO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUEwQjtJQUN6QjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFBaUM7SUFDMUI7UUFBeEIsUUFBUSxDQUFDLDJCQUFhLENBQUM7bURBQXFDO0lBQ2hDO1FBQTVCLFFBQVEsQ0FBQywyQkFBaUIsQ0FBQzt1REFBNkM7SUFQdEQsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQW1FNUI7SUFBRCxlQUFDO0NBbkVELEFBbUVDLENBbkVxQyxtQkFBUyxHQW1FOUM7a0JBbkVvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUFJJT1JJVFlfREFUQSB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL0NvcmVEZWZpbmVcIjtcbmltcG9ydCB7IEdDdHJsIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvR0N0cmxcIjtcbmltcG9ydCBHVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL0NvcmUvR1ZpZXcvR1ZpZXdCYXNlXCI7XG5pbXBvcnQgeyBWSUVXX0lEIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9VSVwiO1xuaW1wb3J0IEFjY291bnRNZ3IsIHsgQWNjb3VudENoYW5nZWRFbWl0IH0gZnJvbSBcIi4uLy4uL0xvZ2ljL0FjY291bnRNZ3JcIjtcbmltcG9ydCBHYW1lTWdyIGZyb20gXCIuLi8uLi9Mb2dpYy9HYW1lTWdyXCI7XG5pbXBvcnQgQWNjb3VudENlbnRlciBmcm9tIFwiLi9oYW5kbGUvQWNjb3VudENlbnRlck5vZGVcIjtcbmltcG9ydCBXYWxsZXRDb25uZWN0Tm9kZSBmcm9tIFwiLi9oYW5kbGUvV2FsbGV0Q29ubmVjdE5vZGVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRDdHJsIGV4dGVuZHMgR1ZpZXdCYXNlIHtcbiAgQHByb3BlcnR5KGNjLk5vZGUpIFRhc2tzTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gIEBwcm9wZXJ0eShjYy5Ob2RlKSBMZWFkZXJCb2FyZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICBAcHJvcGVydHkoY2MuTm9kZSkgU2V0dGluZ05vZGU6IGNjLk5vZGUgPSBudWxsO1xuICBAcHJvcGVydHkoY2MuTm9kZSkgSGVscE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICBAcHJvcGVydHkoY2MuTm9kZSkgQUlBZ2VudFBsYXlOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgQHByb3BlcnR5KEFjY291bnRDZW50ZXIpIGFjY291bnRDZW50ZXI6IEFjY291bnRDZW50ZXIgPSBudWxsO1xuICBAcHJvcGVydHkoV2FsbGV0Q29ubmVjdE5vZGUpIHdhbGxldENvbm5lY3ROb2RlOiBXYWxsZXRDb25uZWN0Tm9kZSA9IG51bGw7XG4gIHByb3RlY3RlZCBvbkdMb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tBY2NvdW50U3RhdHVzKCk7XG4gICAgR0N0cmwuRVMub24oXG4gICAgICBBY2NvdW50Q2hhbmdlZEVtaXQsXG4gICAgICB0aGlzLFxuICAgICAgdGhpcy5vbkFjY291bnRDaGFuZ2VkLmJpbmQodGhpcyksXG4gICAgICBQUklPUklUWV9EQVRBXG4gICAgKTtcbiAgfVxuICBwcml2YXRlIG9uQWNjb3VudENoYW5nZWQoKSB7XG4gICAgdGhpcy5jaGVja0FjY291bnRTdGF0dXMoKTtcbiAgICBpZiAodGhpcy5hY2NvdW50Q2VudGVyLm5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLmFjY291bnRDZW50ZXIucmVmcmVzaEFjY291bnRJbmZvKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgY2hlY2tBY2NvdW50U3RhdHVzKCkge1xuICAgIGNvbnN0IGFjY291bnRJbmZvID0gQWNjb3VudE1nci5pbml0TG9naW5TdGF0aWM7XG4gICAgdGhpcy53YWxsZXRDb25uZWN0Tm9kZS5ub2RlLmFjdGl2ZSA9ICFhY2NvdW50SW5mbztcbiAgICB0aGlzLmFjY291bnRDZW50ZXIubm9kZS5hY3RpdmUgPSAhIWFjY291bnRJbmZvO1xuICB9XG4gIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgR0N0cmwuRVMub2ZmKHRoaXMpO1xuICAgIHRoaXMuVGFza3NOb2RlLm9mZihcImNsaWNrXCIsIHRoaXMuVGFza3NIYW5kbGUpO1xuICAgIHRoaXMuTGVhZGVyQm9hcmROb2RlLm9mZihcImNsaWNrXCIsIHRoaXMuTGVhZGVyQm9hcmRIYW5kbGUpO1xuICAgIHRoaXMuU2V0dGluZ05vZGUub2ZmKFwiY2xpY2tcIiwgdGhpcy5TZXR0aW5nSGFuZGxlKTtcbiAgICB0aGlzLkhlbHBOb2RlLm9mZihcImNsaWNrXCIsIHRoaXMuSGVscEhhbmRsZSk7XG4gICAgdGhpcy5BSUFnZW50UGxheU5vZGUub2ZmKFwiY2xpY2tcIiwgdGhpcy5BSUFnZW50UGxheUhhbmRsZSk7XG4gIH1cbiAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xuICAgIC8vIHRoaXMud2FsbGV0Q29ubmVjdEhhbmRsZS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKDExMTExKTtcbiAgICAvLyAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoXCJ3YWxsZXRDb25uZWN0XCIsIFwiaHR0cDovLzE5Mi4xNjguMC4yMjo5OTk4L1wiKTtcbiAgICAvLyB9KTtcbiAgICB0aGlzLlRhc2tzTm9kZS5vbihcImNsaWNrXCIsIHRoaXMuVGFza3NIYW5kbGUpO1xuICAgIHRoaXMuTGVhZGVyQm9hcmROb2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5MZWFkZXJCb2FyZEhhbmRsZSk7XG4gICAgdGhpcy5TZXR0aW5nTm9kZS5vbihcImNsaWNrXCIsIHRoaXMuU2V0dGluZ0hhbmRsZSk7XG4gICAgdGhpcy5IZWxwTm9kZS5vbihcImNsaWNrXCIsIHRoaXMuSGVscEhhbmRsZSk7XG4gICAgdGhpcy5BSUFnZW50UGxheU5vZGUub24oXCJjbGlja1wiLCB0aGlzLkFJQWdlbnRQbGF5SGFuZGxlKTtcbiAgfVxuICBwcm90ZWN0ZWQgVGFza3NIYW5kbGUoKTogdm9pZCB7XG4gICAgR2FtZU1nci5qdW1wVG9NZ3IuanVtcEdvVG8oVklFV19JRC5EYWlseVRhc2tzKTtcbiAgICBjb25zb2xlLmxvZyhcIlRhc2tzSGFuZGxlXCIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIExlYWRlckJvYXJkSGFuZGxlKCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiTGVhZGVyQm9hcmRIYW5kbGVcIik7XG4gIH1cblxuICBwcm90ZWN0ZWQgU2V0dGluZ0hhbmRsZSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlNldHRpbmdIYW5kbGVcIik7XG4gIH1cblxuICBwcm90ZWN0ZWQgSGVscEhhbmRsZSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIkhlbHBIYW5kbGVcIik7XG4gIH1cblxuICBwcm90ZWN0ZWQgQUlBZ2VudFBsYXlIYW5kbGUoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJBSUFnZW50UGxheUhhbmRsZVwiKTtcbiAgfVxufVxuIl19