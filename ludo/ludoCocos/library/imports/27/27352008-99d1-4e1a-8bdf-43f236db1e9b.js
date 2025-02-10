"use strict";
cc._RF.push(module, '27352AImdFOGovfQ/I22x6b', 'MatchCtrl');
// Script/Game/Views/Home/MatchCtrl.ts

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
var UI_1 = require("../../Common/UI");
var UIResources_1 = require("../../Common/UIResources");
var GameMgr_1 = require("../../Logic/GameMgr");
var JXULAssets_1 = require("../Fight/JXULAssets");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, executeInEditMode = _a.executeInEditMode;
var MatchCtrl = /** @class */ (function (_super) {
    __extends(MatchCtrl, _super);
    function MatchCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.match = null;
        _this.iconArr = [];
        _this.iconLab = [];
        _this._blue = "ATTACHED_NODE:bone8";
        _this._red = "ATTACHED_NODE:bone13";
        /**敌人玩家 */
        _this._enemyArr = [];
        _this.assetManager = null;
        return _this;
    }
    MatchCtrl.prototype.onGLoad = function () { };
    MatchCtrl.prototype.onGStart = function (info, count, team, winCb) {
        var _this = this;
        this.assetManager = new JXULAssets_1.BattleAssets("RBBattle");
        this._enemyArr = info;
        count.forEach(function (v) {
            _this.iconArr[v].node.parent.parent.active = true;
            _this.iconLab[v].string = info[v].name;
            _this.assetImpl.spriteAtlasFrame(_this.iconArr[v], UIResources_1.Res.common.npcHead, _this._enemyArr[v].icon.toString());
        });
        this.match.setCompleteListener(function () {
            console.log({ team: team });
            _this.assetManager.loadAllRoundAssets(team, 1001, function () {
                var arg = {
                    sceneId: 1001,
                    assetManager: _this.assetManager,
                    args: team,
                };
                console.log(2222);
                GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.mapCtrl, arg, winCb);
                // GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.fight, arg, winCb);
                console.log(3333);
            });
            _this.match.setAnimation(0, "2", true);
        });
        this.match.setAnimation(0, "1", false);
    };
    __decorate([
        property({ type: sp.Skeleton, tooltip: "匹配" })
    ], MatchCtrl.prototype, "match", void 0);
    __decorate([
        property({ type: cc.Sprite, tooltip: "匹配" })
    ], MatchCtrl.prototype, "iconArr", void 0);
    __decorate([
        property({ type: cc.Label, tooltip: "匹配名字" })
    ], MatchCtrl.prototype, "iconLab", void 0);
    MatchCtrl = __decorate([
        ccclass,
        menu("View/Home/MatchCtrl")
    ], MatchCtrl);
    return MatchCtrl;
}(GViewBase_1.default));
exports.default = MatchCtrl;

cc._RF.pop();