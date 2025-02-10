"use strict";
cc._RF.push(module, '36b45pBS7RLypQay5GmrstB', 'BattleResultCtrl');
// Script/Game/Views/Home/BattleResultCtrl.ts

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
var GCtrl_1 = require("../../../Core/GCtrl");
var GViewBase_1 = require("../../../Core/GView/GViewBase");
var AudioMgr_1 = require("../../../Core/Manager/AudioMgr");
var Define_1 = require("../../Common/Define");
var Language_1 = require("../../Common/Language");
var UI_1 = require("../../Common/UI");
var UIResources_1 = require("../../Common/UIResources");
var Zh_1 = require("../../Common/Zh");
var GameMgr_1 = require("../../Logic/GameMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var BattleResultCtrl = /** @class */ (function (_super) {
    __extends(BattleResultCtrl, _super);
    function BattleResultCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ResultSpr = null;
        _this.winSkeleton = null;
        _this.failSkeleton = null;
        _this.starNum = null;
        _this.levelSk = null;
        _this.levelStarArr = [];
        _this.starNode = null;
        _this.levelStarNode = null;
        _this.btnLayer = null;
        _this.coinNum = null;
        _this.shareBtn = null;
        _this.addStar = false;
        _this.isWin = false;
        _this.winCb = null;
        _this.addCoin = null;
        return _this;
    }
    BattleResultCtrl.prototype.onGStart = function (dir, winCb) {
        var _this = this;
        this.winCb = winCb;
        if (dir == Define_1.GRID_TYPE.RED) {
            AudioMgr_1.AudioMgr.Ins().playEffect(UIResources_1.Res.common.audio.success);
            if (winCb) {
                this.winSkeleton.node.active = true;
                console.log("执行胜利回调");
                this.winSkeleton.setCompleteListener(function () {
                    _this.winSkeleton.setAnimation(0, "standBy", true);
                });
                this.winSkeleton.setAnimation(0, "start", false);
                GameMgr_1.default.lRobotGradeData.brushSeasonLevelInfo();
                GameMgr_1.default.lUserData.setRankPassCount(winCb.rankIndex, 1, winCb.max);
                var rankInfo = {
                    rankLv: winCb.rankIndex,
                    rankNum: GameMgr_1.default.lUserData.getRankPassCount(winCb.rankIndex - 1),
                };
                GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.view.onBattleWin, rankInfo);
                GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.view.onRankPassLevel, winCb.rankBoxItem);
            }
            GameMgr_1.default.lUserData.setRankLv();
            this.isWin = true;
            this.shareBtn.active = false;
        }
        else {
            this.failSkeleton.node.active = true;
            this.failSkeleton.setCompleteListener(function () {
                _this.winSkeleton.setAnimation(0, "standBy", true);
            });
            this.failSkeleton.setAnimation(0, "start", false);
            AudioMgr_1.AudioMgr.Ins().playEffect(UIResources_1.Res.common.audio.fail);
            this.assetImpl.spriteAtlasFrame(this.ResultSpr.getComponent(cc.Sprite), UIResources_1.Res.gameOverCtrl.battleResultCtrlImg, "lose");
            GameMgr_1.default.lUserData.setRankLv(-1);
        }
        this.setLevelInfo();
    };
    BattleResultCtrl.prototype.exit = function () {
        this.onClose();
        console.error("BattleResultCtrl homeWin");
        GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.home);
    };
    BattleResultCtrl.prototype.setLevelInfo = function () {
        var _this = this;
        var levelInfo = GameMgr_1.default.lUserData.levelInfo;
        var str = Language_1.L(Zh_1.JXLocales.levelSkin["level" + levelInfo.levelLv]);
        var str2 = Language_1.L(Zh_1.JXLocales.levelSkin["upgrade" + levelInfo.levelLv]);
        var str3 = Language_1.L(Zh_1.JXLocales.levelSkin["demote" + levelInfo.levelLv]);
        cc.tween(this.ResultSpr)
            // .to(0.5, { scale: 1 })//初始位置
            .call(function () {
            _this.levelSk.node.active = true;
            if (_this.isWin) {
                if (levelInfo.levelLv > Define_1.RANKLV.RANKLV1 && levelInfo.starNum == 0) {
                    _this.levelSk.setAnimation(0, str2, false);
                }
                else {
                    _this.levelSk.setAnimation(0, str, false);
                    _this.showStar();
                }
            }
            else {
                if (levelInfo.levelLv > Define_1.RANKLV.RANKLV0 &&
                    levelInfo.levelLv <= Define_1.RANKLV.RANKLV6 &&
                    levelInfo.starNum == 2) {
                    _this.levelSk.setAnimation(0, str3, false);
                }
                else {
                    _this.levelSk.setAnimation(0, str, false);
                    _this.showStar();
                }
            }
        })
            .union()
            .start();
        this.levelSk.setCompleteListener(function () {
            _this.levelSk.setAnimation(0, str, true);
            if (_this.addStar) {
                return;
            }
            _this.showStar();
        });
    };
    BattleResultCtrl.prototype.showStar = function () {
        var _this = this;
        this.starNode.active = true;
        this.addStar = true;
        var levelInfo = GameMgr_1.default.lUserData.levelInfo;
        if (levelInfo.levelLv > Define_1.RANKLV.RANKLV6 && levelInfo.starNum > 3) {
            this.starNode.active = false;
            this.levelStarNode.active = true;
            this.starNum.string = "x" + levelInfo.starNum + "";
        }
        else {
            this.starNode.active = true;
            this.levelStarNode.active = false;
            this.levelStarArr.forEach(function (v, s) {
                if (levelInfo.starNum > 0 && s < levelInfo.starNum) {
                    v.setAnimation(0, Zh_1.JXLocales.levelSkin.star.jia, false);
                    var time = v.getAnimationInfo(Zh_1.JXLocales.levelSkin.star.jia);
                    AudioMgr_1.AudioMgr.Ins().playEffect(UIResources_1.Res.common.audio.star);
                    _this.scheduleOnce(function () {
                        v.setAnimation(0, Zh_1.JXLocales.levelSkin.star.wu, false);
                    }, time.duration);
                }
                else {
                    v.setAnimation(0, Zh_1.JXLocales.levelSkin.star.kong, false);
                }
            });
        }
        var arr = GameMgr_1.default.levelData.getVideoReward(this.winCb.rankIndex, this.winCb.curLevel, this.isWin);
        arr.forEach(function (v) {
            v.forEach(function (a, b) {
                if (b == 0) {
                    if (a == 0) {
                        var str = (GameMgr_1.default.lUserData.getCoin() + v[1]).toString();
                        var COINPAREM_1 = {
                            coin: str,
                            add: v[1].toString(),
                        };
                        _this.onAddCoin(COINPAREM_1);
                    }
                }
            });
            var id = v[Define_1.rewardType.id];
            var num = v[Define_1.rewardType.num];
            if (id == Define_1.ITEMTYPE.COIN) {
                _this.addCoin = num;
                GameMgr_1.default.lUserData.setCoin(Number(num));
            }
            else if (id >= 1001) {
            }
        });
        this.btnLayer.active = true;
    };
    /**数字滚动 */
    BattleResultCtrl.prototype.onAddCoin = function (param) {
        // console.log("coin:" + JSON.stringify(param));
        var self = this;
        var constCoin = parseInt(param.coin) - parseInt(param.add);
        var obj = { a: 0 };
        this.coinNum.string = "+" + param.coin;
        cc.tween(obj)
            .to(0.3, { a: 100 }, {
            progress: function (start, end, current, ratio) {
                if (self.node)
                    self.coinNum.string = "+" + Math.floor(Number(param.add) * ratio);
            },
        })
            .start();
    };
    __decorate([
        property({ type: cc.Node, tooltip: "结算文案" })
    ], BattleResultCtrl.prototype, "ResultSpr", void 0);
    __decorate([
        property({ type: sp.Skeleton, tooltip: "胜利结算" })
    ], BattleResultCtrl.prototype, "winSkeleton", void 0);
    __decorate([
        property({ type: sp.Skeleton, tooltip: "失败结算" })
    ], BattleResultCtrl.prototype, "failSkeleton", void 0);
    __decorate([
        property({ type: cc.Label, tooltip: "星星数量" })
    ], BattleResultCtrl.prototype, "starNum", void 0);
    __decorate([
        property({ type: sp.Skeleton, tooltip: "段位图标spine" })
    ], BattleResultCtrl.prototype, "levelSk", void 0);
    __decorate([
        property({ type: sp.Skeleton, tooltip: "段位星星数量" })
    ], BattleResultCtrl.prototype, "levelStarArr", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "王者段位以下星星" })
    ], BattleResultCtrl.prototype, "starNode", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "王者段位星星" })
    ], BattleResultCtrl.prototype, "levelStarNode", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "按钮层" })
    ], BattleResultCtrl.prototype, "btnLayer", void 0);
    __decorate([
        property({ type: cc.Label, tooltip: "增加金币" })
    ], BattleResultCtrl.prototype, "coinNum", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: "分享" })
    ], BattleResultCtrl.prototype, "shareBtn", void 0);
    BattleResultCtrl = __decorate([
        ccclass,
        menu("View/Home/BattleResultCtrl")
    ], BattleResultCtrl);
    return BattleResultCtrl;
}(GViewBase_1.default));
exports.default = BattleResultCtrl;

cc._RF.pop();