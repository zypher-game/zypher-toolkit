"use strict";
cc._RF.push(module, '8f74flick5MGqu0ovffvNwu', 'HangPage');
// Script/Game/Views/Common/HangPage.ts

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
var ColorLog_1 = require("../../../Core/FrameEx/ColorLog");
var GCtrl_1 = require("../../../Core/GCtrl");
var Define_1 = require("../../Common/Define");
var UI_1 = require("../../Common/UI");
var GameMgr_1 = require("../../Logic/GameMgr");
var HangPage = /** @class */ (function (_super) {
    __extends(HangPage, _super);
    function HangPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listenClosePage = [];
        _this.listenOpenPage = [];
        return _this;
    }
    HangPage.prototype.onLoad = function () {
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GClientWinOpenEventMsg, this, this.onWinOpen.bind(this));
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GClientWinDestroyEventMsg, this, this.onWinClose.bind(this));
        console.error("onLoad");
        this.setOrder(false);
    };
    HangPage.prototype.addListenPage = function (openLayer, closeLayer) {
        for (var i = 0; i < openLayer.length; i++) {
            if (this.listenOpenPage.indexOf(openLayer[i]) == -1) {
                this.listenOpenPage.push(openLayer[i]);
            }
        }
        for (var i = 0; i < closeLayer.length; i++) {
            if (this.listenClosePage.indexOf(closeLayer[i]) == -1) {
                this.listenClosePage.push(closeLayer[i]);
            }
        }
    };
    HangPage.prototype.getCurWin = function () {
        return this.curWin;
    };
    /**监听窗口打开*/
    HangPage.prototype.onWinOpen = function (_, winId) {
        ColorLog_1.default.esOn("GCtrl.GClientWinOpenEventMsg");
        // if (winId == VIEW_ID.fightLayer) {
        //     this.node.parent = null;
        //     return;
        // }
        //需要在哪些界面显示在最上层
        // let viewList = [VIEW_ID.heroArray, VIEW_ID.heroUp];
        this.curWin = winId;
        var viewList = this.listenOpenPage;
        for (var i = 0; i < viewList.length; i++) {
            if (winId == viewList[i]) {
                this.setOrder(true);
                return;
            }
        }
    };
    /**监听窗口关闭*/
    HangPage.prototype.onWinClose = function (_, win) {
        ColorLog_1.default.esOn("GCtrl.GClientWinDestroyEventMsg");
        // let viewList = [VIEW_ID.heroArray, VIEW_ID.fightLayer];
        var viewList = this.listenClosePage;
        for (var i = 0; i < viewList.length; i++) {
            if (win.winId == viewList[i]) {
                this.curWin = null;
                console.error("onWinClose");
                this.setOrder(false);
                return;
            }
        }
    };
    /**
     *
     * @param isNeedTop 是否在最顶层(否则在home之上)
     */
    HangPage.prototype.setOrder = function (isNeedTop) {
        this.node.active = true;
        if (isNeedTop) {
            var topWin = GameMgr_1.default.uiMgr.getActiveTopWin();
            this.node.zIndex = topWin.sortOrder + 1;
        }
        else {
            var homeWin = GameMgr_1.default.uiMgr.getActiveTopWin(UI_1.VIEW_ID.home);
            if (homeWin) {
                console.error("setOrder homeWin");
                this.node.zIndex = homeWin.sortOrder + 1;
                this.node.parent = homeWin.viewBinder.node.parent;
            }
            else {
                this.node.parent = null;
            }
        }
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.view.onViewChange);
    };
    HangPage.prototype.onDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this);
        GCtrl_1.GCtrl.ES.off(this.node);
    };
    return HangPage;
}(cc.Component));
exports.default = HangPage;

cc._RF.pop();