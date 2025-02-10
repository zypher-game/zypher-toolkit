"use strict";
cc._RF.push(module, '1ec996CbopHOK1RY+rXa8ix', 'AppStart');
// Script/Game/Views/StartGame/AppStart.ts

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
var GComponent_1 = require("../../../Core/FrameEx/GComponent");
var UI_1 = require("../../Common/UI");
var UIResources_1 = require("../../Common/UIResources");
var GameMgr_1 = require("../../Logic/GameMgr");
var Define_1 = require("./../../Common/Define");
var UI_2 = require("./../../Common/UI");
var ToastMgr_1 = require("./../../Logic/ToastMgr");
var AppCtrl_1 = require("./AppCtrl");
var APP_CTRL = "AppCtrl";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var AppStart = /** @class */ (function (_super) {
    __extends(AppStart, _super);
    function AppStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppStart.prototype.__onLoad = function () {
        var _this = this;
        // @ts-ignore
        i18n.init("zh_CN", function () {
            cc.Button.comAudio = UIResources_1.Res.common.audio.button;
            // GameMgr.uiMgr.invalidAudio = Res.audio.invalidClick;
            GameMgr_1.default.uiMgr.initWinInfos(UI_1.JXWinInfo, UI_1.JXViewPreLoad, function (node) {
                return new ToastMgr_1.Toast(node);
            });
            _this.onGameStart();
        });
    };
    AppStart.prototype.start = function () {
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    };
    AppStart.prototype.onGameStart = function () {
        var node = cc.director.getScene().getChildByName(APP_CTRL);
        if (!node) {
            //添加一个控制节点
            node = new cc.Node();
            if (node) {
                node.name = "AppCtrl";
                var appCtrl = node.addComponent(AppCtrl_1.default);
                appCtrl.initEvent();
                cc.game.addPersistRootNode(node);
            }
        }
        // GameMgr.uiMgr.showWin(VIEW_ID.fight, LoadingType.GameScene);
        GameMgr_1.default.uiMgr.showWin(UI_2.VIEW_ID.load, Define_1.LoadingType.AppStart);
    };
    AppStart = __decorate([
        ccclass,
        menu("AppStart")
    ], AppStart);
    return AppStart;
}(GComponent_1.default));
exports.default = AppStart;

cc._RF.pop();