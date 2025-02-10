
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Home/BattleResultCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Ib21lL0JhdHRsZVJlc3VsdEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsNkNBQTRDO0FBQzVDLDJEQUFzRDtBQUN0RCwyREFBMEQ7QUFDMUQsOENBTTZCO0FBQzdCLGtEQUEwQztBQUMxQyxzQ0FBMEM7QUFDMUMsd0RBQStDO0FBQy9DLHNDQUE0QztBQUM1QywrQ0FBMEM7QUFDcEMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBOEMsb0NBQVM7SUFBdkQ7UUFBQSxxRUF3TEM7UUF2TCtDLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFeEUsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBRWhDLGtCQUFZLEdBQWdCLElBQUksQ0FBQztRQUNjLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFFeEUsYUFBTyxHQUFnQixJQUFJLENBQUM7UUFFNUIsa0JBQVksR0FBa0IsRUFBRSxDQUFDO1FBQ2lCLGNBQVEsR0FDeEQsSUFBSSxDQUFDO1FBQ3lDLG1CQUFhLEdBQzNELElBQUksQ0FBQztRQUVzQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFDNUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUM3RCxhQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFdBQUssR0FBWSxLQUFLLENBQUM7UUFDckIsV0FBSyxHQUFXLElBQUksQ0FBQztRQUNyQixhQUFPLEdBQVcsSUFBSSxDQUFDOztJQWtLbkMsQ0FBQztJQWpLQyxtQ0FBUSxHQUFSLFVBQVMsR0FBVyxFQUFFLEtBQWE7UUFBbkMsaUJBdUNDO1FBdENDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksR0FBRyxJQUFJLGtCQUFTLENB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T0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO3FEQUEwQjtJQUV4RTtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztxREFDMUI7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7MERBQ2xCO0lBQ2lCO1FBQWpELFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztzREFDMUM7SUFDeUM7UUFBL0MsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOzJEQUN4QztJQUVzQztRQUE1QyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7c0RBQTBCO0lBQ3ZCO1FBQTlDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztxREFBMEI7SUFDNUI7UUFBM0MsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO3NEQUEwQjtJQWxCbEQsZ0JBQWdCO1FBRnBDLE9BQU87UUFDUCxJQUFJLENBQUMsNEJBQTRCLENBQUM7T0FDZCxnQkFBZ0IsQ0F3THBDO0lBQUQsdUJBQUM7Q0F4TEQsQUF3TEMsQ0F4TDZDLG1CQUFTLEdBd0x0RDtrQkF4TG9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgSUdyYWRlUmFua0luZm8sXHJcbiAgUmFua0luZm8sXHJcbiAgV2luQ2IsXHJcbiAgQ09JTlBBUkVNLFxyXG59IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9kLnRzL2dhbWUvSlhDTEJ0bFwiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL0dDdHJsXCI7XHJcbmltcG9ydCBHVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL0NvcmUvR1ZpZXcvR1ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IEF1ZGlvTWdyIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWFuYWdlci9BdWRpb01nclwiO1xyXG5pbXBvcnQge1xyXG4gIENNc2csXHJcbiAgR1JJRF9UWVBFLFxyXG4gIElURU1UWVBFLFxyXG4gIFJBTktMVixcclxuICByZXdhcmRUeXBlLFxyXG59IGZyb20gXCIuLi8uLi9Db21tb24vRGVmaW5lXCI7XHJcbmltcG9ydCB7IEwgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0xhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFZJRVdfSUQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL1VJXCI7XHJcbmltcG9ydCB7IFJlcyB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlSZXNvdXJjZXNcIjtcclxuaW1wb3J0IHsgSlhMb2NhbGVzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9aaFwiO1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi4vLi4vTG9naWMvR2FtZU1nclwiO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIlZpZXcvSG9tZS9CYXR0bGVSZXN1bHRDdHJsXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHRsZVJlc3VsdEN0cmwgZXh0ZW5kcyBHVmlld0Jhc2Uge1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi57uT566X5paH5qGIXCIgfSkgUmVzdWx0U3ByOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkoeyB0eXBlOiBzcC5Ta2VsZXRvbiwgdG9vbHRpcDogXCLog5zliKnnu5PnrpdcIiB9KVxyXG4gIHdpblNrZWxldG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgQHByb3BlcnR5KHsgdHlwZTogc3AuU2tlbGV0b24sIHRvb2x0aXA6IFwi5aSx6LSl57uT566XXCIgfSlcclxuICBmYWlsU2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCwgdG9vbHRpcDogXCLmmJ/mmJ/mlbDph49cIiB9KSBzdGFyTnVtOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgQHByb3BlcnR5KHsgdHlwZTogc3AuU2tlbGV0b24sIHRvb2x0aXA6IFwi5q615L2N5Zu+5qCHc3BpbmVcIiB9KVxyXG4gIGxldmVsU2s6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICBAcHJvcGVydHkoeyB0eXBlOiBzcC5Ta2VsZXRvbiwgdG9vbHRpcDogXCLmrrXkvY3mmJ/mmJ/mlbDph49cIiB9KVxyXG4gIGxldmVsU3RhckFycjogc3AuU2tlbGV0b25bXSA9IFtdO1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi546L6ICF5q615L2N5Lul5LiL5pif5pifXCIgfSkgc3Rhck5vZGU6IGNjLk5vZGUgPVxyXG4gICAgbnVsbDtcclxuICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCB0b29sdGlwOiBcIueOi+iAheauteS9jeaYn+aYn1wiIH0pIGxldmVsU3Rhck5vZGU6IGNjLk5vZGUgPVxyXG4gICAgbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCLmjInpkq7lsYJcIiB9KSBidG5MYXllcjogY2MuTm9kZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwsIHRvb2x0aXA6IFwi5aKe5Yqg6YeR5biBXCIgfSkgY29pbk51bTogY2MuTGFiZWwgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIHRvb2x0aXA6IFwi5YiG5LqrXCIgfSkgc2hhcmVCdG46IGNjLk5vZGUgPSBudWxsO1xyXG4gIHByaXZhdGUgYWRkU3RhcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgaXNXaW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcm90ZWN0ZWQgd2luQ2I/OiBXaW5DYiA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIGFkZENvaW46IG51bWJlciA9IG51bGw7XHJcbiAgb25HU3RhcnQoZGlyOiBudW1iZXIsIHdpbkNiPzogV2luQ2IpIHtcclxuICAgIHRoaXMud2luQ2IgPSB3aW5DYjtcclxuICAgIGlmIChkaXIgPT0gR1JJRF9UWVBFLlJFRCkge1xyXG4gICAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KFJlcy5jb21tb24uYXVkaW8uc3VjY2Vzcyk7XHJcbiAgICAgIGlmICh3aW5DYikge1xyXG4gICAgICAgIHRoaXMud2luU2tlbGV0b24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5omn6KGM6IOc5Yip5Zue6LCDXCIpO1xyXG4gICAgICAgIHRoaXMud2luU2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLndpblNrZWxldG9uLnNldEFuaW1hdGlvbigwLCBcInN0YW5kQnlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53aW5Ta2VsZXRvbi5zZXRBbmltYXRpb24oMCwgXCJzdGFydFwiLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZU1nci5sUm9ib3RHcmFkZURhdGEuYnJ1c2hTZWFzb25MZXZlbEluZm8oKTtcclxuICAgICAgICBHYW1lTWdyLmxVc2VyRGF0YS5zZXRSYW5rUGFzc0NvdW50KHdpbkNiLnJhbmtJbmRleCwgMSwgd2luQ2IubWF4KTtcclxuICAgICAgICBsZXQgcmFua0luZm86IFJhbmtJbmZvID0ge1xyXG4gICAgICAgICAgcmFua0x2OiB3aW5DYi5yYW5rSW5kZXgsXHJcbiAgICAgICAgICByYW5rTnVtOiBHYW1lTWdyLmxVc2VyRGF0YS5nZXRSYW5rUGFzc0NvdW50KHdpbkNiLnJhbmtJbmRleCAtIDEpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgR0N0cmwuRVMuZW1pdChDTXNnLmNsaWVudC52aWV3Lm9uQmF0dGxlV2luLCByYW5rSW5mbyk7XHJcbiAgICAgICAgR0N0cmwuRVMuZW1pdChDTXNnLmNsaWVudC52aWV3Lm9uUmFua1Bhc3NMZXZlbCwgd2luQ2IucmFua0JveEl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIEdhbWVNZ3IubFVzZXJEYXRhLnNldFJhbmtMdigpO1xyXG4gICAgICB0aGlzLmlzV2luID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zaGFyZUJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmFpbFNrZWxldG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5mYWlsU2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy53aW5Ta2VsZXRvbi5zZXRBbmltYXRpb24oMCwgXCJzdGFuZEJ5XCIsIHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5mYWlsU2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsIFwic3RhcnRcIiwgZmFsc2UpO1xyXG4gICAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KFJlcy5jb21tb24uYXVkaW8uZmFpbCk7XHJcbiAgICAgIHRoaXMuYXNzZXRJbXBsLnNwcml0ZUF0bGFzRnJhbWUoXHJcbiAgICAgICAgdGhpcy5SZXN1bHRTcHIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksXHJcbiAgICAgICAgUmVzLmdhbWVPdmVyQ3RybC5iYXR0bGVSZXN1bHRDdHJsSW1nLFxyXG4gICAgICAgIFwibG9zZVwiXHJcbiAgICAgICk7XHJcbiAgICAgIEdhbWVNZ3IubFVzZXJEYXRhLnNldFJhbmtMdigtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRMZXZlbEluZm8oKTtcclxuICB9XHJcblxyXG4gIGV4aXQoKSB7XHJcbiAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJCYXR0bGVSZXN1bHRDdHJsIGhvbWVXaW5cIik7XHJcbiAgICBHYW1lTWdyLmp1bXBUb01nci5qdW1wR29UbyhWSUVXX0lELmhvbWUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldExldmVsSW5mbygpIHtcclxuICAgIHZhciBsZXZlbEluZm86IElHcmFkZVJhbmtJbmZvID0gR2FtZU1nci5sVXNlckRhdGEubGV2ZWxJbmZvO1xyXG4gICAgbGV0IHN0ciA9IEwoSlhMb2NhbGVzLmxldmVsU2tpbltcImxldmVsXCIgKyBsZXZlbEluZm8ubGV2ZWxMdl0pO1xyXG4gICAgbGV0IHN0cjIgPSBMKEpYTG9jYWxlcy5sZXZlbFNraW5bXCJ1cGdyYWRlXCIgKyBsZXZlbEluZm8ubGV2ZWxMdl0pO1xyXG4gICAgbGV0IHN0cjMgPSBMKEpYTG9jYWxlcy5sZXZlbFNraW5bXCJkZW1vdGVcIiArIGxldmVsSW5mby5sZXZlbEx2XSk7XHJcbiAgICBjYy50d2Vlbih0aGlzLlJlc3VsdFNwcilcclxuICAgICAgLy8gLnRvKDAuNSwgeyBzY2FsZTogMSB9KS8v5Yid5aeL5L2N572uXHJcbiAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICB0aGlzLmxldmVsU2subm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzV2luKSB7XHJcbiAgICAgICAgICBpZiAobGV2ZWxJbmZvLmxldmVsTHYgPiBSQU5LTFYuUkFOS0xWMSAmJiBsZXZlbEluZm8uc3Rhck51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxTay5zZXRBbmltYXRpb24oMCwgc3RyMiwgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbFNrLnNldEFuaW1hdGlvbigwLCBzdHIsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3RhcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGxldmVsSW5mby5sZXZlbEx2ID4gUkFOS0xWLlJBTktMVjAgJiZcclxuICAgICAgICAgICAgbGV2ZWxJbmZvLmxldmVsTHYgPD0gUkFOS0xWLlJBTktMVjYgJiZcclxuICAgICAgICAgICAgbGV2ZWxJbmZvLnN0YXJOdW0gPT0gMlxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxTay5zZXRBbmltYXRpb24oMCwgc3RyMywgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbFNrLnNldEFuaW1hdGlvbigwLCBzdHIsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3RhcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnVuaW9uKClcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgICB0aGlzLmxldmVsU2suc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgIHRoaXMubGV2ZWxTay5zZXRBbmltYXRpb24oMCwgc3RyLCB0cnVlKTtcclxuICAgICAgaWYgKHRoaXMuYWRkU3Rhcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNob3dTdGFyKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzaG93U3RhcigpIHtcclxuICAgIHRoaXMuc3Rhck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIHRoaXMuYWRkU3RhciA9IHRydWU7XHJcbiAgICB2YXIgbGV2ZWxJbmZvOiBJR3JhZGVSYW5rSW5mbyA9IEdhbWVNZ3IubFVzZXJEYXRhLmxldmVsSW5mbztcclxuICAgIGlmIChsZXZlbEluZm8ubGV2ZWxMdiA+IFJBTktMVi5SQU5LTFY2ICYmIGxldmVsSW5mby5zdGFyTnVtID4gMykge1xyXG4gICAgICB0aGlzLnN0YXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmxldmVsU3Rhck5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdGFyTnVtLnN0cmluZyA9IFwieFwiICsgbGV2ZWxJbmZvLnN0YXJOdW0gKyBcIlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdGFyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmxldmVsU3Rhck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMubGV2ZWxTdGFyQXJyLmZvckVhY2goKHYsIHMpID0+IHtcclxuICAgICAgICBpZiAobGV2ZWxJbmZvLnN0YXJOdW0gPiAwICYmIHMgPCBsZXZlbEluZm8uc3Rhck51bSkge1xyXG4gICAgICAgICAgdi5zZXRBbmltYXRpb24oMCwgSlhMb2NhbGVzLmxldmVsU2tpbi5zdGFyLmppYSwgZmFsc2UpO1xyXG4gICAgICAgICAgbGV0IHRpbWUgPSB2LmdldEFuaW1hdGlvbkluZm8oSlhMb2NhbGVzLmxldmVsU2tpbi5zdGFyLmppYSk7XHJcbiAgICAgICAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KFJlcy5jb21tb24uYXVkaW8uc3Rhcik7XHJcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHYuc2V0QW5pbWF0aW9uKDAsIEpYTG9jYWxlcy5sZXZlbFNraW4uc3Rhci53dSwgZmFsc2UpO1xyXG4gICAgICAgICAgfSwgdGltZS5kdXJhdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHYuc2V0QW5pbWF0aW9uKDAsIEpYTG9jYWxlcy5sZXZlbFNraW4uc3Rhci5rb25nLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXJyOiBBcnJheTxBcnJheTxudW1iZXI+PiA9IEdhbWVNZ3IubGV2ZWxEYXRhLmdldFZpZGVvUmV3YXJkKFxyXG4gICAgICB0aGlzLndpbkNiLnJhbmtJbmRleCxcclxuICAgICAgdGhpcy53aW5DYi5jdXJMZXZlbCxcclxuICAgICAgdGhpcy5pc1dpblxyXG4gICAgKTtcclxuICAgIGFyci5mb3JFYWNoKCh2KSA9PiB7XHJcbiAgICAgIHYuZm9yRWFjaCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGlmIChiID09IDApIHtcclxuICAgICAgICAgIGlmIChhID09IDApIHtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IChHYW1lTWdyLmxVc2VyRGF0YS5nZXRDb2luKCkgKyB2WzFdKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBsZXQgQ09JTlBBUkVNOiBDT0lOUEFSRU0gPSB7XHJcbiAgICAgICAgICAgICAgY29pbjogc3RyLFxyXG4gICAgICAgICAgICAgIGFkZDogdlsxXS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLm9uQWRkQ29pbihDT0lOUEFSRU0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBpZCA9IHZbcmV3YXJkVHlwZS5pZF07XHJcbiAgICAgIGxldCBudW0gPSB2W3Jld2FyZFR5cGUubnVtXTtcclxuICAgICAgaWYgKGlkID09IElURU1UWVBFLkNPSU4pIHtcclxuICAgICAgICB0aGlzLmFkZENvaW4gPSBudW07XHJcbiAgICAgICAgR2FtZU1nci5sVXNlckRhdGEuc2V0Q29pbihOdW1iZXIobnVtKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaWQgPj0gMTAwMSkge1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYnRuTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKuaVsOWtl+a7muWKqCAqL1xyXG4gIG9uQWRkQ29pbihwYXJhbTogQ09JTlBBUkVNKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImNvaW46XCIgKyBKU09OLnN0cmluZ2lmeShwYXJhbSkpO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IGNvbnN0Q29pbiA9IHBhcnNlSW50KHBhcmFtLmNvaW4pIC0gcGFyc2VJbnQocGFyYW0uYWRkKTtcclxuICAgIHZhciBvYmogPSB7IGE6IDAgfTtcclxuICAgIHRoaXMuY29pbk51bS5zdHJpbmcgPSBcIitcIiArIHBhcmFtLmNvaW47XHJcbiAgICBjYy50d2VlbihvYmopXHJcbiAgICAgIC50byhcclxuICAgICAgICAwLjMsXHJcbiAgICAgICAgeyBhOiAxMDAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm9ncmVzczogKHN0YXJ0LCBlbmQsIGN1cnJlbnQsIHJhdGlvKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLm5vZGUpXHJcbiAgICAgICAgICAgICAgc2VsZi5jb2luTnVtLnN0cmluZyA9IFwiK1wiICsgTWF0aC5mbG9vcihOdW1iZXIocGFyYW0uYWRkKSAqIHJhdGlvKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxufVxyXG4iXX0=