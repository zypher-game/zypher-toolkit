
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Home/LoadCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '83336JK35FJTpOs4rejlkaT', 'LoadCtrl');
// Script/Game/Views/Home/LoadCtrl.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CoreDefine_1 = require("../../../Core/CoreDefine");
var GViewBase_1 = require("../../../Core/GView/GViewBase");
var AudioMgr_1 = require("../../../Core/Manager/AudioMgr");
var UIMgr_1 = require("../../../Core/Manager/UIMgr");
var Language_1 = require("../../Common/Language");
var UI_1 = require("../../Common/UI");
var GameMgr_1 = require("../../Logic/GameMgr");
var JXULAssets_1 = require("../Fight/JXULAssets");
var JXULDefine_1 = require("../Fight/JXULDefine");
var JXCommon_1 = require("./../../../conventions/JXCommon");
var GCtrl_1 = require("./../../../Core/GCtrl");
var Define_1 = require("./../../Common/Define");
var UIResources_1 = require("./../../Common/UIResources");
var Zh_1 = require("./../../Common/Zh");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// 加载权重
var PROCESS_CONFIGS = {
    newAccountLogin: {
        start: 0.5,
        loginRaw: 0.1,
        loginStatic: 0.1,
        loginAciton: 0.1,
        gameRaw: 0.1,
        gameStatic: 0.05,
        userData: 0.05,
    },
    oldLogin: {
        start: 0.5,
        loginRaw: 0.25,
        loginStatic: 0.25,
    },
    oldGame: {
        gameRaw: 0.3,
        gameStatic: 0.4,
        userData: 0.3,
    },
};
var LoadCtrl = /** @class */ (function (_super) {
    __extends(LoadCtrl, _super);
    function LoadCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**加载进度文本 */
        _this.progressLabel = null;
        /**加载进度条 */
        _this.progressBar = null;
        _this.lightNode = null;
        _this.plane = null;
        _this.texture_login = null;
        // 已使用进度
        _this.useProgress = 0;
        // 当前进度
        _this.curProgress = 0;
        _this._curLoadConfig = null;
        _this.loadNum = 0;
        return _this;
    }
    LoadCtrl.prototype.onGLoad = function () {
        if (this.progressBar)
            this.progressBar.progress = 0;
        if (this.progressLabel)
            this.progressLabel.string = "";
    };
    LoadCtrl.prototype.onGStart = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (type) {
            case Define_1.LoadingType.AppStart: {
                this._curLoadConfig = PROCESS_CONFIGS.oldLogin;
                this.useProgress = this._curLoadConfig.start;
                this.curProgress = this._curLoadConfig.loginRaw;
                /**分包加载 */
                this.loadPackage();
                break;
            }
        }
    };
    LoadCtrl.prototype.preLoadGameStart = function () {
        var _this = this;
        this.setLoadText(Language_1.L(Zh_1.JXLocales.load.assetLoad));
        this.setLoadProgress(this.useProgress);
        // 预加载不希望用的时候异步的预制件
        GCtrl_1.GCtrl.preLoadRawAssets.apply(GCtrl_1.GCtrl, __spreadArrays([function (curIndex, total, asset) {
                _this.setLoadText(Language_1.L(Zh_1.JXLocales.load.process, curIndex, total));
                _this.setLoadProgress(_this.useProgress + (curIndex / total) * _this.curProgress);
            },
            function () {
                _this.loadloginStatic();
            }], Object.keys(UIResources_1.Res.material).map(function (v, k) {
            return { type: cc.Material, path: UIResources_1.Res.material[v] };
        }), [{ type: cc.Prefab, path: UIResources_1.Res.common.toast }]));
    };
    LoadCtrl.prototype.preLoadGameScene = function () {
        var _this = this;
        this.setLoadText(Language_1.L(Zh_1.JXLocales.load.assetLoad));
        this.useProgress += this.curProgress;
        this.curProgress = this._curLoadConfig.gameRaw;
        // 预加载不希望用的时候异步的预制件
        GCtrl_1.GCtrl.preLoadRawAssets(function (curIndex, total, asset) {
            _this.setLoadText(Language_1.L(Zh_1.JXLocales.load.process, curIndex, total));
            _this.setLoadProgress(_this.useProgress + (curIndex / total) * _this.curProgress);
        }, function () {
            _this.loadGameStatic();
        }, { type: cc.SpriteFrame, path: UIResources_1.Res.single });
    };
    LoadCtrl.prototype.loadloginStatic = function () {
        var _this = this;
        this.useProgress += this.curProgress; // 0.5 +0.2; 0.5 + 0.4
        this.curProgress = this._curLoadConfig.loginStatic; //0.5 +0.2 +0.2; 0.5 +0.4
        GameMgr_1.default.initLoginStatic(function (cur, total) {
            _this.setLoadText(Language_1.L(Zh_1.JXLocales.load.static, cur, total));
            _this.setLoadProgress(_this.useProgress + (_this.curProgress * cur) / total);
        }, function () {
            GameMgr_1.default.initSimulator();
            GameMgr_1.default.initLogicManager();
            //#region
            _this._curLoadConfig = PROCESS_CONFIGS.oldGame;
            _this.preLoadGameScene();
        });
    };
    LoadCtrl.prototype.loadGameStatic = function () {
        var _this = this;
        this.useProgress += this.curProgress;
        this.curProgress = this._curLoadConfig.gameStatic;
        GameMgr_1.default.initFristGameStatics(function (cur, total) {
            _this.setLoadText(Language_1.L(Zh_1.JXLocales.load.static, cur, total));
            _this.setLoadProgress(_this.useProgress + (cur / total) * _this.curProgress);
        }, function () {
            _this.onInitUserData();
        });
    };
    /** 加载用户数据 */
    LoadCtrl.prototype.onInitUserData = function () {
        this.setLoadText(Language_1.L(Zh_1.JXLocales.load.initUserData));
        this.useProgress += this.curProgress;
        this.curProgress = this._curLoadConfig.userData;
        this.loadHomeCtrl();
        // let tasks = getInitTask((route, resp) => {
    };
    LoadCtrl.prototype.loadHomeCtrl = function () {
        var _this = this;
        this.setLoadText(Language_1.L(Zh_1.JXLocales.load.enter_game));
        GameMgr_1.default.ins().initGame();
        AudioMgr_1.AudioMgr.Ins().playMusic(UIResources_1.Res.common.audio.bgm);
        // const vol = cc.sys.localStorage.getItem(SoundStorageKey.MusicVolume);
        // const v = Number(`${vol ?? 1}`)
        var v = 0;
        AudioMgr_1.AudioMgr.Ins().setEffectVolume(v);
        AudioMgr_1.AudioMgr.Ins().setMusicVolume(v);
        // 预加载主场景资源：
        GCtrl_1.GCtrl.preLoadRawAssets(null, function () {
            _this.endLoadHomeCtrl();
        }, 
        // { type: cc.Prefab, path: Res.mapCtrl },
        // { type: cc.Prefab, path: Res.fight.fightCtrl }
        { type: cc.Prefab, path: UIResources_1.Res.homeCtrl.homeCtrl }
        // { type: cc.Prefab, path: Res.common.guide_item }
        );
    };
    /**所有数据加载完成进入游戏 */
    LoadCtrl.prototype.endLoadHomeCtrl = function () {
        // UIMgr.showWin(VIEW_ID.fight, LoadingType.GameScene);
        // UIMgr.showWin(VIEW_ID.home, WinPage.Page2);
        this.jumpHome();
        // this.jumpGame();
        GCtrl_1.GCtrl.ES.emit(GCtrl_1.GCtrl.GClientWinOpenEventMsg);
    };
    /**跳转到首页 */
    LoadCtrl.prototype.jumpHome = function () {
        console.log(111);
        UIMgr_1.UIMgr.showWin(UI_1.VIEW_ID.home, CoreDefine_1.WinPage.Page2);
        console.log(222);
    };
    /**跳转到战斗 */
    LoadCtrl.prototype.jumpGame = function () {
        var result = {};
        result = GameMgr_1.default.lUserData.testCost(Define_1.ITEMTYPE.PY, 1, 1);
        if (result.enough) {
        }
        else {
            GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.frameItem, Define_1.ITEMTYPE.PY);
            GameMgr_1.default.uiMgr.showToast(result.tip);
            return;
        }
        var _SRankRewardDataRaw = GameMgr_1.default.rankRewardData.getRankLevelData(1);
        var enemyArr = [
            GameMgr_1.default.lRobotGradeData.randomRobotGrade(),
            GameMgr_1.default.lRobotGradeData.randomRobotGrade(),
            GameMgr_1.default.lRobotGradeData.randomRobotGrade(),
        ];
        var _rankIndex = Define_1.RANKLV.RANKLV0;
        var curLevel = GameMgr_1.default.lUserData.getRankPassCount(_rankIndex - 1) + 1;
        var npcNum = GameMgr_1.default.levelData.getRaw(curLevel).npcquantity;
        var team = [];
        var blue = {
            id: "Player." + JXULDefine_1.JXEDir.Blue,
            name: enemyArr[0].name,
            isPlayer: true,
            dir: JXULDefine_1.JXEDir.Blue,
            tableId: 1,
            icon: enemyArr[0].icon,
        };
        var red = {
            id: "Player." + JXULDefine_1.JXEDir.Red,
            name: GameMgr_1.default.lUserData.levelInfo.name,
            isPlayer: false,
            dir: JXULDefine_1.JXEDir.Red,
            tableId: 1,
            icon: 123,
        };
        var yellow = {
            id: "Player." + JXULDefine_1.JXEDir.Yellow,
            name: enemyArr[1].name,
            isPlayer: false,
            dir: JXULDefine_1.JXEDir.Yellow,
            tableId: 1,
            icon: enemyArr[1].icon,
        };
        var green = {
            id: "Player." + JXULDefine_1.JXEDir.Green,
            name: enemyArr[2].name,
            isPlayer: false,
            dir: JXULDefine_1.JXEDir.Green,
            tableId: 1,
            icon: enemyArr[2].icon,
        };
        switch (npcNum) {
            case Define_1.npc.npc1: {
                team = [red, blue];
                break;
            }
            case Define_1.npc.npc2: {
                team = [red, yellow, blue];
                break;
            }
            case Define_1.npc.npc3: {
                team = [red, yellow, blue, green];
                break;
            }
            default:
                break;
        }
        var rankBoxItem = this.rankBox({ _rankIndex: _rankIndex, _SRankRewardDataRaw: _SRankRewardDataRaw });
        console.log({ rankBoxItem: rankBoxItem });
        var winCb = {
            rankIndex: _rankIndex,
            max: _SRankRewardDataRaw.length,
            rankBoxItem: rankBoxItem,
            curLevel: curLevel,
        };
        var assetManager = new JXULAssets_1.BattleAssets("RBBattle");
        assetManager.loadAllRoundAssets(team, 1001, function () {
            var arg = {
                sceneId: 1001,
                assetManager: assetManager,
                args: team,
            };
            console.log(2222);
            GameMgr_1.default.jumpToMgr.jumpGoTo(UI_1.VIEW_ID.mapCtrl, arg, winCb);
            // GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.fight, arg, winCb);
            console.log(3333);
        });
        // GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.matchCtrl, enemyArr, count, team, winCb);
    };
    LoadCtrl.prototype.rankBox = function (_a) {
        var _rankIndex = _a._rankIndex, _SRankRewardDataRaw = _a._SRankRewardDataRaw;
        var obj = GameMgr_1.default.lUserData.getRank(_SRankRewardDataRaw.length);
        var passCount = GameMgr_1.default.lUserData.getRankPassCount(_rankIndex - 1);
        var count = {
            lv: 1,
            count: 0,
        };
        if (passCount > 5) {
            count = GameMgr_1.default.lUserData.getRank(passCount);
        }
        var bool = false;
        if (count.lv == obj.lv && passCount > obj.lv * 5) {
            bool = true;
        }
        var rankBoxItem = {
            rankLv: _rankIndex,
            rankPageLv: count.lv,
            rankCount: count.count,
            rankEnd: bool,
        };
        return rankBoxItem;
    };
    LoadCtrl.prototype.setLoadText = function (text) {
        if (!this.progressLabel)
            return;
        this.progressLabel.string = text;
    };
    LoadCtrl.prototype.setLoadProgress = function (val) {
        if (!this.progressBar)
            return;
        this.progressBar.progress = Math.min(val, 1);
        if (this.lightNode) {
            this.lightNode.x =
                this.progressBar.totalLength * this.progressBar.progress;
            this.plane.x = this.lightNode.x;
        }
    };
    /**加载分包 */
    LoadCtrl.prototype.loadPackage = function () {
        var _this = this;
        this.setLoadText(Language_1.L(Zh_1.JXLocales.load.loadPackage));
        var keys = Object.keys(JXCommon_1.JXDef.firstBundle);
        var str = JXCommon_1.JXDef.firstBundle[keys[this.loadNum]];
        cc.assetManager.loadBundle(str, function (err, boule) {
            if (err) {
            }
            _this.loadNum++;
            _this.setLoadProgress(_this.loadNum / keys.length);
            setTimeout(function () {
                if (_this.loadNum < keys.length) {
                    _this.loadPackage();
                }
                else {
                    _this.preLoadGameStart();
                }
            }, 0);
        });
    };
    __decorate([
        property(cc.Label)
    ], LoadCtrl.prototype, "progressLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], LoadCtrl.prototype, "progressBar", void 0);
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "lightNode", void 0);
    __decorate([
        property(cc.Node)
    ], LoadCtrl.prototype, "plane", void 0);
    __decorate([
        property(cc.Texture2D)
    ], LoadCtrl.prototype, "texture_login", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Ib21lL0xvYWRDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSx1REFBbUQ7QUFDbkQsMkRBQXNEO0FBQ3RELDJEQUEwRDtBQUMxRCxxREFBb0Q7QUFDcEQsa0RBQTBDO0FBQzFDLHNDQUEwQztBQUMxQywrQ0FBMEM7QUFDMUMsa0RBQW1EO0FBQ25ELGtEQUE2QztBQUM3Qyw0REFBd0Q7QUFDeEQsK0NBQThDO0FBQzlDLGdEQUEyRTtBQUMzRSwwREFBaUQ7QUFDakQsd0NBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBYTVDLE9BQU87QUFDUCxJQUFNLGVBQWUsR0FBRztJQUN0QixlQUFlLEVBQUU7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFFBQVEsRUFBRSxHQUFHO1FBQ2IsV0FBVyxFQUFFLEdBQUc7UUFDaEIsV0FBVyxFQUFFLEdBQUc7UUFDaEIsT0FBTyxFQUFFLEdBQUc7UUFDWixVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUUsSUFBSTtLQUNFO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLEtBQUssRUFBRSxHQUFHO1FBQ1YsUUFBUSxFQUFFLElBQUk7UUFDZCxXQUFXLEVBQUUsSUFBSTtLQUNEO0lBQ2xCLE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRSxHQUFHO1FBQ1osVUFBVSxFQUFFLEdBQUc7UUFDZixRQUFRLEVBQUUsR0FBRztLQUNHO0NBQ25CLENBQUM7QUFHRjtJQUFzQyw0QkFBUztJQUEvQztRQUFBLHFFQTJUQztRQTFUQyxZQUFZO1FBQ1EsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFDbkQsV0FBVztRQUNlLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUMxQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLFdBQUss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LEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUN6QjtZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXhUbUI7UUFBbkIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQWdDO0lBRXpCO1FBQXpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2lEQUFvQztJQUMxQztRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FBMkI7SUFDMUI7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQXVCO0lBQ2pCO1FBQXZCLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO21EQUFvQztJQVB4QyxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBMlQ1QjtJQUFELGVBQUM7Q0EzVEQsQUEyVEMsQ0EzVHFDLG1CQUFTLEdBMlQ5QztrQkEzVG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFyZ3NCYXR0bGVWaWV3Q3RybCxcclxuICBJQ2hlc3NCdGwsXHJcbiAgSUdyYWRlUmFua0luZm8sXHJcbiAgSVJhbmtCb3hJdGVtLFxyXG4gIElSYW5rTGV2ZWwsXHJcbiAgSXRlbUNvc3RSZXN1bHQsXHJcbiAgU0xldmVsRGF0YVJhdyxcclxuICBTUmFua1Jld2FyZERhdGFSYXcsXHJcbiAgV2luQ2IsXHJcbn0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCB7IFdpblBhZ2UgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCBHVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL0NvcmUvR1ZpZXcvR1ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IEF1ZGlvTWdyIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWFuYWdlci9BdWRpb01nclwiO1xyXG5pbXBvcnQgeyBVSU1nciB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hbmFnZXIvVUlNZ3JcIjtcclxuaW1wb3J0IHsgTCB9IGZyb20gXCIuLi8uLi9Db21tb24vTGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgVklFV19JRCB9IGZyb20gXCIuLi8uLi9Db21tb24vVUlcIjtcclxuaW1wb3J0IEdhbWVNZ3IgZnJvbSBcIi4uLy4uL0xvZ2ljL0dhbWVNZ3JcIjtcclxuaW1wb3J0IHsgQmF0dGxlQXNzZXRzIH0gZnJvbSBcIi4uL0ZpZ2h0L0pYVUxBc3NldHNcIjtcclxuaW1wb3J0IHsgSlhFRGlyIH0gZnJvbSBcIi4uL0ZpZ2h0L0pYVUxEZWZpbmVcIjtcclxuaW1wb3J0IHsgSlhEZWYgfSBmcm9tIFwiLi8uLi8uLi8uLi9jb252ZW50aW9ucy9KWENvbW1vblwiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLy4uLy4uLy4uL0NvcmUvR0N0cmxcIjtcclxuaW1wb3J0IHsgSVRFTVRZUEUsIExvYWRpbmdUeXBlLCBucGMsIFJBTktMViB9IGZyb20gXCIuLy4uLy4uL0NvbW1vbi9EZWZpbmVcIjtcclxuaW1wb3J0IHsgUmVzIH0gZnJvbSBcIi4vLi4vLi4vQ29tbW9uL1VJUmVzb3VyY2VzXCI7XHJcbmltcG9ydCB7IEpYTG9jYWxlcyB9IGZyb20gXCIuLy4uLy4uL0NvbW1vbi9aaFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmludGVyZmFjZSBMb2FkQ29uZmlnUmF3IHtcclxuICBzdGFydD86IG51bWJlcjtcclxuICBsb2dpblJhdz86IG51bWJlcjtcclxuICBsb2dpblN0YXRpYz86IG51bWJlcjtcclxuICBsb2dpbkFjaXRvbj86IG51bWJlcjtcclxuICBnYW1lUmF3PzogbnVtYmVyO1xyXG4gIGdhbWVTdGF0aWM/OiBudW1iZXI7XHJcbiAgb3RoZXJTdGF0aWM/OiBudW1iZXI7XHJcbiAgdXNlckRhdGE/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIOWKoOi9veadg+mHjVxyXG5jb25zdCBQUk9DRVNTX0NPTkZJR1MgPSB7XHJcbiAgbmV3QWNjb3VudExvZ2luOiB7XHJcbiAgICBzdGFydDogMC41LFxyXG4gICAgbG9naW5SYXc6IDAuMSxcclxuICAgIGxvZ2luU3RhdGljOiAwLjEsXHJcbiAgICBsb2dpbkFjaXRvbjogMC4xLFxyXG4gICAgZ2FtZVJhdzogMC4xLFxyXG4gICAgZ2FtZVN0YXRpYzogMC4wNSxcclxuICAgIHVzZXJEYXRhOiAwLjA1LFxyXG4gIH0gYXMgTG9hZENvbmZpZ1JhdyxcclxuICBvbGRMb2dpbjoge1xyXG4gICAgc3RhcnQ6IDAuNSxcclxuICAgIGxvZ2luUmF3OiAwLjI1LFxyXG4gICAgbG9naW5TdGF0aWM6IDAuMjUsXHJcbiAgfSBhcyBMb2FkQ29uZmlnUmF3LFxyXG4gIG9sZEdhbWU6IHtcclxuICAgIGdhbWVSYXc6IDAuMyxcclxuICAgIGdhbWVTdGF0aWM6IDAuNCxcclxuICAgIHVzZXJEYXRhOiAwLjMsXHJcbiAgfSBhcyBMb2FkQ29uZmlnUmF3LFxyXG59O1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZEN0cmwgZXh0ZW5kcyBHVmlld0Jhc2Uge1xyXG4gIC8qKuWKoOi9vei/m+W6puaWh+acrCAqL1xyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbCkgcHJvZ3Jlc3NMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gIC8qKuWKoOi9vei/m+W6puadoSAqL1xyXG4gIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcikgcHJvZ3Jlc3NCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTm9kZSkgbGlnaHROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTm9kZSkgcGxhbmU6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5UZXh0dXJlMkQpIHRleHR1cmVfbG9naW46IGNjLlRleHR1cmUyRCA9IG51bGw7XHJcbiAgLy8g5bey5L2/55So6L+b5bqmXHJcbiAgcHVibGljIHVzZVByb2dyZXNzOiBudW1iZXIgPSAwO1xyXG4gIC8vIOW9k+WJjei/m+W6plxyXG4gIHB1YmxpYyBjdXJQcm9ncmVzczogbnVtYmVyID0gMDtcclxuICBwcm90ZWN0ZWQgX2N1ckxvYWRDb25maWc6IExvYWRDb25maWdSYXcgPSBudWxsO1xyXG4gIHByaXZhdGUgbG9hZE51bTogbnVtYmVyID0gMDtcclxuXHJcbiAgb25HTG9hZCgpIHtcclxuICAgIGlmICh0aGlzLnByb2dyZXNzQmFyKSB0aGlzLnByb2dyZXNzQmFyLnByb2dyZXNzID0gMDtcclxuICAgIGlmICh0aGlzLnByb2dyZXNzTGFiZWwpIHRoaXMucHJvZ3Jlc3NMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgb25HU3RhcnQodHlwZTogTG9hZGluZ1R5cGUsIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSBMb2FkaW5nVHlwZS5BcHBTdGFydDoge1xyXG4gICAgICAgIHRoaXMuX2N1ckxvYWRDb25maWcgPSBQUk9DRVNTX0NPTkZJR1Mub2xkTG9naW47XHJcbiAgICAgICAgdGhpcy51c2VQcm9ncmVzcyA9IHRoaXMuX2N1ckxvYWRDb25maWcuc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5jdXJQcm9ncmVzcyA9IHRoaXMuX2N1ckxvYWRDb25maWcubG9naW5SYXc7XHJcbiAgICAgICAgLyoq5YiG5YyF5Yqg6L29ICovXHJcbiAgICAgICAgdGhpcy5sb2FkUGFja2FnZSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcHJlTG9hZEdhbWVTdGFydCgpIHtcclxuICAgIHRoaXMuc2V0TG9hZFRleHQoTChKWExvY2FsZXMubG9hZC5hc3NldExvYWQpKTtcclxuICAgIHRoaXMuc2V0TG9hZFByb2dyZXNzKHRoaXMudXNlUHJvZ3Jlc3MpO1xyXG4gICAgLy8g6aKE5Yqg6L295LiN5biM5pyb55So55qE5pe25YCZ5byC5q2l55qE6aKE5Yi25Lu2XHJcbiAgICBHQ3RybC5wcmVMb2FkUmF3QXNzZXRzKFxyXG4gICAgICAoY3VySW5kZXg6IG51bWJlciwgdG90YWw6IG51bWJlciwgYXNzZXQpID0+IHtcclxuICAgICAgICB0aGlzLnNldExvYWRUZXh0KEwoSlhMb2NhbGVzLmxvYWQucHJvY2VzcywgY3VySW5kZXgsIHRvdGFsKSk7XHJcbiAgICAgICAgdGhpcy5zZXRMb2FkUHJvZ3Jlc3MoXHJcbiAgICAgICAgICB0aGlzLnVzZVByb2dyZXNzICsgKGN1ckluZGV4IC8gdG90YWwpICogdGhpcy5jdXJQcm9ncmVzc1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLmxvYWRsb2dpblN0YXRpYygpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5PYmplY3Qua2V5cyhSZXMubWF0ZXJpYWwpLm1hcCgodiwgaykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6IGNjLk1hdGVyaWFsLCBwYXRoOiBSZXMubWF0ZXJpYWxbdl0gfTtcclxuICAgICAgfSksXHJcbiAgICAgIHsgdHlwZTogY2MuUHJlZmFiLCBwYXRoOiBSZXMuY29tbW9uLnRvYXN0IH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcHJlTG9hZEdhbWVTY2VuZSgpIHtcclxuICAgIHRoaXMuc2V0TG9hZFRleHQoTChKWExvY2FsZXMubG9hZC5hc3NldExvYWQpKTtcclxuICAgIHRoaXMudXNlUHJvZ3Jlc3MgKz0gdGhpcy5jdXJQcm9ncmVzcztcclxuICAgIHRoaXMuY3VyUHJvZ3Jlc3MgPSB0aGlzLl9jdXJMb2FkQ29uZmlnLmdhbWVSYXc7XHJcbiAgICAvLyDpooTliqDovb3kuI3luIzmnJvnlKjnmoTml7blgJnlvILmraXnmoTpooTliLbku7ZcclxuICAgIEdDdHJsLnByZUxvYWRSYXdBc3NldHMoXHJcbiAgICAgIChjdXJJbmRleDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBhc3NldCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0TG9hZFRleHQoTChKWExvY2FsZXMubG9hZC5wcm9jZXNzLCBjdXJJbmRleCwgdG90YWwpKTtcclxuICAgICAgICB0aGlzLnNldExvYWRQcm9ncmVzcyhcclxuICAgICAgICAgIHRoaXMudXNlUHJvZ3Jlc3MgKyAoY3VySW5kZXggLyB0b3RhbCkgKiB0aGlzLmN1clByb2dyZXNzXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9hZEdhbWVTdGF0aWMoKTtcclxuICAgICAgfSxcclxuICAgICAgeyB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgcGF0aDogUmVzLnNpbmdsZSB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGxvYWRsb2dpblN0YXRpYygpIHtcclxuICAgIHRoaXMudXNlUHJvZ3Jlc3MgKz0gdGhpcy5jdXJQcm9ncmVzczsgLy8gMC41ICswLjI7IDAuNSArIDAuNFxyXG4gICAgdGhpcy5jdXJQcm9ncmVzcyA9IHRoaXMuX2N1ckxvYWRDb25maWcubG9naW5TdGF0aWM7IC8vMC41ICswLjIgKzAuMjsgMC41ICswLjRcclxuICAgIEdhbWVNZ3IuaW5pdExvZ2luU3RhdGljKFxyXG4gICAgICAoY3VyLCB0b3RhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0TG9hZFRleHQoTChKWExvY2FsZXMubG9hZC5zdGF0aWMsIGN1ciwgdG90YWwpKTtcclxuICAgICAgICB0aGlzLnNldExvYWRQcm9ncmVzcyhcclxuICAgICAgICAgIHRoaXMudXNlUHJvZ3Jlc3MgKyAodGhpcy5jdXJQcm9ncmVzcyAqIGN1cikgLyB0b3RhbFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBHYW1lTWdyLmluaXRTaW11bGF0b3IoKTtcclxuICAgICAgICBHYW1lTWdyLmluaXRMb2dpY01hbmFnZXIoKTtcclxuICAgICAgICAvLyNyZWdpb25cclxuICAgICAgICB0aGlzLl9jdXJMb2FkQ29uZmlnID0gUFJPQ0VTU19DT05GSUdTLm9sZEdhbWU7XHJcbiAgICAgICAgdGhpcy5wcmVMb2FkR2FtZVNjZW5lKCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgbG9hZEdhbWVTdGF0aWMoKSB7XHJcbiAgICB0aGlzLnVzZVByb2dyZXNzICs9IHRoaXMuY3VyUHJvZ3Jlc3M7XHJcbiAgICB0aGlzLmN1clByb2dyZXNzID0gdGhpcy5fY3VyTG9hZENvbmZpZy5nYW1lU3RhdGljO1xyXG4gICAgR2FtZU1nci5pbml0RnJpc3RHYW1lU3RhdGljcyhcclxuICAgICAgKGN1ciwgdG90YWwpID0+IHtcclxuICAgICAgICB0aGlzLnNldExvYWRUZXh0KEwoSlhMb2NhbGVzLmxvYWQuc3RhdGljLCBjdXIsIHRvdGFsKSk7XHJcbiAgICAgICAgdGhpcy5zZXRMb2FkUHJvZ3Jlc3MoXHJcbiAgICAgICAgICB0aGlzLnVzZVByb2dyZXNzICsgKGN1ciAvIHRvdGFsKSAqIHRoaXMuY3VyUHJvZ3Jlc3NcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbkluaXRVc2VyRGF0YSgpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqIOWKoOi9veeUqOaIt+aVsOaNriAqL1xyXG4gIHB1YmxpYyBvbkluaXRVc2VyRGF0YSgpIHtcclxuICAgIHRoaXMuc2V0TG9hZFRleHQoTChKWExvY2FsZXMubG9hZC5pbml0VXNlckRhdGEpKTtcclxuICAgIHRoaXMudXNlUHJvZ3Jlc3MgKz0gdGhpcy5jdXJQcm9ncmVzcztcclxuICAgIHRoaXMuY3VyUHJvZ3Jlc3MgPSB0aGlzLl9jdXJMb2FkQ29uZmlnLnVzZXJEYXRhO1xyXG4gICAgdGhpcy5sb2FkSG9tZUN0cmwoKTtcclxuICAgIC8vIGxldCB0YXNrcyA9IGdldEluaXRUYXNrKChyb3V0ZSwgcmVzcCkgPT4ge1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGxvYWRIb21lQ3RybCgpIHtcclxuICAgIHRoaXMuc2V0TG9hZFRleHQoTChKWExvY2FsZXMubG9hZC5lbnRlcl9nYW1lKSk7XHJcbiAgICBHYW1lTWdyLmlucygpLmluaXRHYW1lKCk7XHJcbiAgICBBdWRpb01nci5JbnMoKS5wbGF5TXVzaWMoUmVzLmNvbW1vbi5hdWRpby5iZ20pO1xyXG4gICAgLy8gY29uc3Qgdm9sID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFNvdW5kU3RvcmFnZUtleS5NdXNpY1ZvbHVtZSk7XHJcbiAgICAvLyBjb25zdCB2ID0gTnVtYmVyKGAke3ZvbCA/PyAxfWApXHJcbiAgICBjb25zdCB2ID0gMDtcclxuICAgIEF1ZGlvTWdyLklucygpLnNldEVmZmVjdFZvbHVtZSh2KTtcclxuICAgIEF1ZGlvTWdyLklucygpLnNldE11c2ljVm9sdW1lKHYpO1xyXG4gICAgLy8g6aKE5Yqg6L295Li75Zy65pmv6LWE5rqQ77yaXHJcbiAgICBHQ3RybC5wcmVMb2FkUmF3QXNzZXRzKFxyXG4gICAgICBudWxsLFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lbmRMb2FkSG9tZUN0cmwoKTtcclxuICAgICAgfSxcclxuICAgICAgLy8geyB0eXBlOiBjYy5QcmVmYWIsIHBhdGg6IFJlcy5tYXBDdHJsIH0sXHJcbiAgICAgIC8vIHsgdHlwZTogY2MuUHJlZmFiLCBwYXRoOiBSZXMuZmlnaHQuZmlnaHRDdHJsIH1cclxuICAgICAgeyB0eXBlOiBjYy5QcmVmYWIsIHBhdGg6IFJlcy5ob21lQ3RybC5ob21lQ3RybCB9XHJcbiAgICAgIC8vIHsgdHlwZTogY2MuUHJlZmFiLCBwYXRoOiBSZXMuY29tbW9uLmd1aWRlX2l0ZW0gfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKuaJgOacieaVsOaNruWKoOi9veWujOaIkOi/m+WFpea4uOaIjyAqL1xyXG4gIHByb3RlY3RlZCBlbmRMb2FkSG9tZUN0cmwoKSB7XHJcbiAgICAvLyBVSU1nci5zaG93V2luKFZJRVdfSUQuZmlnaHQsIExvYWRpbmdUeXBlLkdhbWVTY2VuZSk7XHJcbiAgICAvLyBVSU1nci5zaG93V2luKFZJRVdfSUQuaG9tZSwgV2luUGFnZS5QYWdlMik7XHJcbiAgICB0aGlzLmp1bXBIb21lKCk7XHJcbiAgICAvLyB0aGlzLmp1bXBHYW1lKCk7XHJcbiAgICBHQ3RybC5FUy5lbWl0KEdDdHJsLkdDbGllbnRXaW5PcGVuRXZlbnRNc2cpO1xyXG4gIH1cclxuICAvKirot7PovazliLDpppbpobUgKi9cclxuICBwcm90ZWN0ZWQganVtcEhvbWUoKSB7XHJcbiAgICBjb25zb2xlLmxvZygxMTEpO1xyXG4gICAgVUlNZ3Iuc2hvd1dpbihWSUVXX0lELmhvbWUsIFdpblBhZ2UuUGFnZTIpO1xyXG4gICAgY29uc29sZS5sb2coMjIyKTtcclxuICB9XHJcbiAgLyoq6Lez6L2s5Yiw5oiY5paXICovXHJcbiAgcHJvdGVjdGVkIGp1bXBHYW1lKCkge1xyXG4gICAgbGV0IHJlc3VsdDogSXRlbUNvc3RSZXN1bHQgPSB7fTtcclxuICAgIHJlc3VsdCA9IEdhbWVNZ3IubFVzZXJEYXRhLnRlc3RDb3N0KElURU1UWVBFLlBZLCAxLCAxKTtcclxuICAgIGlmIChyZXN1bHQuZW5vdWdoKSB7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBHYW1lTWdyLmp1bXBUb01nci5qdW1wR29UbyhWSUVXX0lELmZyYW1lSXRlbSwgSVRFTVRZUEUuUFkpO1xyXG4gICAgICBHYW1lTWdyLnVpTWdyLnNob3dUb2FzdChyZXN1bHQudGlwKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgX1NSYW5rUmV3YXJkRGF0YVJhdyA9IEdhbWVNZ3IucmFua1Jld2FyZERhdGEuZ2V0UmFua0xldmVsRGF0YSgxKTtcclxuICAgIGNvbnN0IGVuZW15QXJyOiBJR3JhZGVSYW5rSW5mb1tdID0gW1xyXG4gICAgICBHYW1lTWdyLmxSb2JvdEdyYWRlRGF0YS5yYW5kb21Sb2JvdEdyYWRlKCksXHJcbiAgICAgIEdhbWVNZ3IubFJvYm90R3JhZGVEYXRhLnJhbmRvbVJvYm90R3JhZGUoKSxcclxuICAgICAgR2FtZU1nci5sUm9ib3RHcmFkZURhdGEucmFuZG9tUm9ib3RHcmFkZSgpLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IF9yYW5rSW5kZXggPSBSQU5LTFYuUkFOS0xWMDtcclxuICAgIHZhciBjdXJMZXZlbCA9IEdhbWVNZ3IubFVzZXJEYXRhLmdldFJhbmtQYXNzQ291bnQoX3JhbmtJbmRleCAtIDEpICsgMTtcclxuICAgIHZhciBucGNOdW0gPSBHYW1lTWdyLmxldmVsRGF0YS5nZXRSYXc8U0xldmVsRGF0YVJhdz4oY3VyTGV2ZWwpLm5wY3F1YW50aXR5O1xyXG4gICAgdmFyIHRlYW06IElDaGVzc0J0bFtdID0gW107XHJcbiAgICBsZXQgYmx1ZTogSUNoZXNzQnRsID0ge1xyXG4gICAgICBpZDogYFBsYXllci4ke0pYRURpci5CbHVlfWAsXHJcbiAgICAgIG5hbWU6IGVuZW15QXJyWzBdLm5hbWUsXHJcbiAgICAgIGlzUGxheWVyOiB0cnVlLFxyXG4gICAgICBkaXI6IEpYRURpci5CbHVlLFxyXG4gICAgICB0YWJsZUlkOiAxLFxyXG4gICAgICBpY29uOiBlbmVteUFyclswXS5pY29uLFxyXG4gICAgfTtcclxuICAgIGxldCByZWQ6IElDaGVzc0J0bCA9IHtcclxuICAgICAgaWQ6IGBQbGF5ZXIuJHtKWEVEaXIuUmVkfWAsXHJcbiAgICAgIG5hbWU6IEdhbWVNZ3IubFVzZXJEYXRhLmxldmVsSW5mby5uYW1lLFxyXG4gICAgICBpc1BsYXllcjogZmFsc2UsXHJcbiAgICAgIGRpcjogSlhFRGlyLlJlZCxcclxuICAgICAgdGFibGVJZDogMSxcclxuICAgICAgaWNvbjogMTIzLFxyXG4gICAgfTtcclxuICAgIGxldCB5ZWxsb3c6IElDaGVzc0J0bCA9IHtcclxuICAgICAgaWQ6IGBQbGF5ZXIuJHtKWEVEaXIuWWVsbG93fWAsXHJcbiAgICAgIG5hbWU6IGVuZW15QXJyWzFdLm5hbWUsXHJcbiAgICAgIGlzUGxheWVyOiBmYWxzZSxcclxuICAgICAgZGlyOiBKWEVEaXIuWWVsbG93LFxyXG4gICAgICB0YWJsZUlkOiAxLFxyXG4gICAgICBpY29uOiBlbmVteUFyclsxXS5pY29uLFxyXG4gICAgfTtcclxuICAgIGxldCBncmVlbjogSUNoZXNzQnRsID0ge1xyXG4gICAgICBpZDogYFBsYXllci4ke0pYRURpci5HcmVlbn1gLFxyXG4gICAgICBuYW1lOiBlbmVteUFyclsyXS5uYW1lLFxyXG4gICAgICBpc1BsYXllcjogZmFsc2UsXHJcbiAgICAgIGRpcjogSlhFRGlyLkdyZWVuLFxyXG4gICAgICB0YWJsZUlkOiAxLFxyXG4gICAgICBpY29uOiBlbmVteUFyclsyXS5pY29uLFxyXG4gICAgfTtcclxuXHJcbiAgICBzd2l0Y2ggKG5wY051bSkge1xyXG4gICAgICBjYXNlIG5wYy5ucGMxOiB7XHJcbiAgICAgICAgdGVhbSA9IFtyZWQsIGJsdWVdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgbnBjLm5wYzI6IHtcclxuICAgICAgICB0ZWFtID0gW3JlZCwgeWVsbG93LCBibHVlXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIG5wYy5ucGMzOiB7XHJcbiAgICAgICAgdGVhbSA9IFtyZWQsIHllbGxvdywgYmx1ZSwgZ3JlZW5dO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBsZXQgcmFua0JveEl0ZW0gPSB0aGlzLnJhbmtCb3goeyBfcmFua0luZGV4LCBfU1JhbmtSZXdhcmREYXRhUmF3IH0pO1xyXG4gICAgY29uc29sZS5sb2coeyByYW5rQm94SXRlbSB9KTtcclxuICAgIGxldCB3aW5DYjogV2luQ2IgPSB7XHJcbiAgICAgIHJhbmtJbmRleDogX3JhbmtJbmRleCxcclxuICAgICAgbWF4OiBfU1JhbmtSZXdhcmREYXRhUmF3Lmxlbmd0aCxcclxuICAgICAgcmFua0JveEl0ZW06IHJhbmtCb3hJdGVtLFxyXG4gICAgICBjdXJMZXZlbDogY3VyTGV2ZWwsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXNzZXRNYW5hZ2VyID0gbmV3IEJhdHRsZUFzc2V0cyhcIlJCQmF0dGxlXCIpO1xyXG5cclxuICAgIGFzc2V0TWFuYWdlci5sb2FkQWxsUm91bmRBc3NldHModGVhbSwgMTAwMSwgKCkgPT4ge1xyXG4gICAgICBsZXQgYXJnOiBBcmdzQmF0dGxlVmlld0N0cmw8SUNoZXNzQnRsW10+ID0ge1xyXG4gICAgICAgIHNjZW5lSWQ6IDEwMDEsXHJcbiAgICAgICAgYXNzZXRNYW5hZ2VyOiBhc3NldE1hbmFnZXIsXHJcbiAgICAgICAgYXJnczogdGVhbSxcclxuICAgICAgfTtcclxuICAgICAgY29uc29sZS5sb2coMjIyMik7XHJcbiAgICAgIEdhbWVNZ3IuanVtcFRvTWdyLmp1bXBHb1RvKFZJRVdfSUQubWFwQ3RybCwgYXJnLCB3aW5DYik7XHJcbiAgICAgIC8vIEdhbWVNZ3IuanVtcFRvTWdyLmp1bXBHb1RvKFZJRVdfSUQuZmlnaHQsIGFyZywgd2luQ2IpO1xyXG4gICAgICBjb25zb2xlLmxvZygzMzMzKTtcclxuICAgIH0pO1xyXG4gICAgLy8gR2FtZU1nci5qdW1wVG9NZ3IuanVtcEdvVG8oVklFV19JRC5tYXRjaEN0cmwsIGVuZW15QXJyLCBjb3VudCwgdGVhbSwgd2luQ2IpO1xyXG4gIH1cclxuICBwdWJsaWMgcmFua0JveCh7XHJcbiAgICBfcmFua0luZGV4LFxyXG4gICAgX1NSYW5rUmV3YXJkRGF0YVJhdyxcclxuICB9OiB7XHJcbiAgICBfcmFua0luZGV4OiBudW1iZXI7XHJcbiAgICBfU1JhbmtSZXdhcmREYXRhUmF3OiBTUmFua1Jld2FyZERhdGFSYXdbXTtcclxuICB9KTogSVJhbmtCb3hJdGVtIHtcclxuICAgIGxldCBvYmogPSBHYW1lTWdyLmxVc2VyRGF0YS5nZXRSYW5rKF9TUmFua1Jld2FyZERhdGFSYXcubGVuZ3RoKTtcclxuICAgIGxldCBwYXNzQ291bnQgPSBHYW1lTWdyLmxVc2VyRGF0YS5nZXRSYW5rUGFzc0NvdW50KF9yYW5rSW5kZXggLSAxKTtcclxuICAgIGxldCBjb3VudDogSVJhbmtMZXZlbCA9IHtcclxuICAgICAgbHY6IDEsXHJcbiAgICAgIGNvdW50OiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAocGFzc0NvdW50ID4gNSkge1xyXG4gICAgICBjb3VudCA9IEdhbWVNZ3IubFVzZXJEYXRhLmdldFJhbmsocGFzc0NvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYm9vbCA9IGZhbHNlO1xyXG4gICAgaWYgKGNvdW50Lmx2ID09IG9iai5sdiAmJiBwYXNzQ291bnQgPiBvYmoubHYgKiA1KSB7XHJcbiAgICAgIGJvb2wgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgbGV0IHJhbmtCb3hJdGVtOiBJUmFua0JveEl0ZW0gPSB7XHJcbiAgICAgIHJhbmtMdjogX3JhbmtJbmRleCxcclxuICAgICAgcmFua1BhZ2VMdjogY291bnQubHYsXHJcbiAgICAgIHJhbmtDb3VudDogY291bnQuY291bnQsXHJcbiAgICAgIHJhbmtFbmQ6IGJvb2wsXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiByYW5rQm94SXRlbTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzZXRMb2FkVGV4dCh0ZXh0OiBzdHJpbmcpIHtcclxuICAgIGlmICghdGhpcy5wcm9ncmVzc0xhYmVsKSByZXR1cm47XHJcbiAgICB0aGlzLnByb2dyZXNzTGFiZWwuc3RyaW5nID0gdGV4dDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzZXRMb2FkUHJvZ3Jlc3ModmFsOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5wcm9ncmVzc0JhcikgcmV0dXJuO1xyXG4gICAgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA9IE1hdGgubWluKHZhbCwgMSk7XHJcbiAgICBpZiAodGhpcy5saWdodE5vZGUpIHtcclxuICAgICAgdGhpcy5saWdodE5vZGUueCA9XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci50b3RhbExlbmd0aCAqIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3M7XHJcbiAgICAgIHRoaXMucGxhbmUueCA9IHRoaXMubGlnaHROb2RlLng7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKirliqDovb3liIbljIUgKi9cclxuICBsb2FkUGFja2FnZSgpIHtcclxuICAgIHRoaXMuc2V0TG9hZFRleHQoTChKWExvY2FsZXMubG9hZC5sb2FkUGFja2FnZSkpO1xyXG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhKWERlZi5maXJzdEJ1bmRsZSk7XHJcbiAgICBjb25zdCBzdHIgPSBKWERlZi5maXJzdEJ1bmRsZVtrZXlzW3RoaXMubG9hZE51bV1dO1xyXG4gICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUoXHJcbiAgICAgIHN0cixcclxuICAgICAgKGVycjogRXJyb3IsIGJvdWxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWROdW0rKztcclxuICAgICAgICB0aGlzLnNldExvYWRQcm9ncmVzcyh0aGlzLmxvYWROdW0gLyBrZXlzLmxlbmd0aCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5sb2FkTnVtIDwga2V5cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUGFja2FnZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVMb2FkR2FtZVN0YXJ0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==