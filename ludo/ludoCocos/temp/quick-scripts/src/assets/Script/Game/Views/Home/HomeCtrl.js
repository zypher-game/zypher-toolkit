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