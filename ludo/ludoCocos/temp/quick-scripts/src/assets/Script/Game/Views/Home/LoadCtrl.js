"use strict";
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