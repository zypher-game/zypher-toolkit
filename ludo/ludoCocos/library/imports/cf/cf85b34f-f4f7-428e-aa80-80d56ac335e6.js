"use strict";
cc._RF.push(module, 'cf85bNP9PdCjqqAgNVqwzXm', 'BtlFighltLayer');
// Script/Game/Views/Fight/BtlFighltLayer.ts

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
var GChild_1 = require("../../../Core/GView/GChild");
var Define_1 = require("../../Common/Define");
var UI_1 = require("../../Common/UI");
var GameMgr_1 = require("../../Logic/GameMgr");
var JXRBCmdMgr_1 = require("./JXRBCmdMgr");
var JXULDefine_1 = require("./JXULDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var BtlFightLayer = /** @class */ (function (_super) {
    __extends(BtlFightLayer, _super);
    function BtlFightLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shaizi = null;
        _this.levelView = null;
        _this.mask = null;
        _this.jump = null;
        _this._secenId = null;
        _this._cbFun = null;
        _this.winArgs = null;
        _this.logicAni = null;
        _this._player = null;
        _this.winCb = null;
        return _this;
    }
    Object.defineProperty(BtlFightLayer.prototype, "_winArgs", {
        get: function () {
            return this.winArgs;
        },
        set: function (v) {
            this.winArgs = v;
        },
        enumerable: false,
        configurable: true
    });
    /**初始战斗层 */
    BtlFightLayer.prototype.fightInit = function (winArgs, cb, winCb) {
        this._winArgs = winArgs;
        this.winCb = winCb;
        this._secenId = this._winArgs.sceneId;
        this._cbFun = cb;
        var team = this._winArgs.args;
        for (var i = 0; i < team.length; i++) {
            if (team[i].isPlayer) {
                this._player = team[i];
                break;
            }
        }
        this.loadEnv();
    };
    BtlFightLayer.prototype.update = function () {
        if (!this._cmdMgr)
            return;
        this._cmdMgr.update();
    };
    /**根据场景id加载对应数据 */
    BtlFightLayer.prototype.loadEnv = function () {
        var team = this._winArgs.args;
        var num = JXULDefine_1.RoleNumber;
        // let num = this.winCb.curLevel > 2 ? 4 : this.winCb.curLevel + 1;
        this._cmdMgr = new JXRBCmdMgr_1.default(this._secenId, this._winArgs.assetManager, num);
        this._cmdMgr.initRDBtlLayer(this.node, this.node.getChildByName("headContent"));
        this._cmdMgr.evtMgr.register(Define_1.CMsg.client.fight.endFight, this, this.onEndFight.bind(this));
        this._cmdMgr.initTeam(team);
        this._cmdMgr.loadAllResources(this.onResLoaded.bind(this));
        return this._cmdMgr;
    };
    BtlFightLayer.prototype.onResLoaded = function () {
        if (!this.isValid)
            return;
        this._cbFun(this._cmdMgr);
    };
    BtlFightLayer.prototype.onEndFight = function (_, dir) {
        console.log("战斗结束", dir.get());
        GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.battleResultCtrl, dir.get(), this.winCb);
    };
    __decorate([
        property(sp.Skeleton)
    ], BtlFightLayer.prototype, "shaizi", void 0);
    __decorate([
        property(cc.ScrollView)
    ], BtlFightLayer.prototype, "levelView", void 0);
    __decorate([
        property(cc.Node)
    ], BtlFightLayer.prototype, "mask", void 0);
    __decorate([
        property(cc.Node)
    ], BtlFightLayer.prototype, "jump", void 0);
    BtlFightLayer = __decorate([
        ccclass
    ], BtlFightLayer);
    return BtlFightLayer;
}(GChild_1.default));
exports.default = BtlFightLayer;

cc._RF.pop();