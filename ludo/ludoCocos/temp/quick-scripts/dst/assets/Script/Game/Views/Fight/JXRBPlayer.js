
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/JXRBPlayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a5dbcIRag9Kep2GS2SU415v', 'JXRBPlayer');
// Script/Game/Views/Fight/JXRBPlayer.ts

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
exports.MaxSixTime = void 0;
var JXCommon_1 = require("../../../conventions/JXCommon");
var CoreDefine_1 = require("../../../Core/CoreDefine");
var ColorLog_1 = require("../../../Core/FrameEx/ColorLog");
var ES5Ex_1 = require("../../../Core/FrameEx/ES5Ex");
var GCtrl_1 = require("../../../Core/GCtrl");
var GParam_1 = require("../../../Core/GEvent/GParam");
var GChild_1 = require("../../../Core/GView/GChild");
var AudioMgr_1 = require("../../../Core/Manager/AudioMgr");
var MathEx_1 = require("../../../Core/Math/MathEx");
var Define_1 = require("../../Common/Define");
var UIResources_1 = require("../../Common/UIResources");
var GuideComponent_1 = require("../../Guide/GuideComponent");
var GameMgr_1 = require("../../Logic/GameMgr");
var VIewUtil_1 = require("../ViewUtil/VIewUtil");
var JXULDefine_1 = require("./JXULDefine");
var PlayerNumber_1 = require("./PlayerNumber");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
exports.MaxSixTime = 2;
var JXRBPlayer = /** @class */ (function (_super) {
    __extends(JXRBPlayer, _super);
    function JXRBPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lab = null;
        _this.pname = null;
        _this.icon = null;
        _this.headBg = null;
        _this.blackBg = null;
        _this.you = null;
        _this._heroInfo = null;
        /**角色 */
        _this._roles = null;
        /**战斗命令管理 */
        _this._cmd = null;
        /**行动时间 */
        _this._cdTimes = null;
        /**当前回合 */
        _this._curRound = null;
        /**回合时间 */
        _this.countTime = null;
        _this._lastNum = CoreDefine_1.INVALID_VALUE;
        _this._sixTime = CoreDefine_1.INVALID_VALUE_ZERO;
        /** 生效回合定时器 */
        _this.lifeTimer = null;
        _this.timerRound = null;
        _this._playerId = null;
        _this._isCastRound = false;
        _this.timerAction = null;
        return _this;
    }
    Object.defineProperty(JXRBPlayer.prototype, "lastNum", {
        set: function (v) {
            this._lastNum = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JXRBPlayer.prototype, "sixTime", {
        set: function (v) {
            this._sixTime = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JXRBPlayer.prototype, "playerId", {
        get: function () {
            return this._playerId;
        },
        enumerable: false,
        configurable: true
    });
    JXRBPlayer.prototype.onGLoad = function () {
        this.buffs = [];
        this.lifeTimer = new ES5Ex_1.MapWrap();
        GCtrl_1.GCtrl.ES.on(Define_1.CMsg.client.fight.onPlayerDice, this, this.onPlayerDice.bind(this));
    };
    JXRBPlayer.prototype.initData = function (info, cmd) {
        this._heroInfo = info;
        this.lab.string = "Ready";
        this._cmd = cmd;
        this._cmd.evtMgr.register(Define_1.CMsg.client.fight.endFight, this, this.onEndFight.bind(this));
        this._cdTimes = GameMgr_1.default.systemConfig.value(JXCommon_1.JXDef.SYS_CONFIG_KEY.robotDiceTime);
        this._roles = new ES5Ex_1.MapWrap();
        this.pname.string = info.name;
        this.assetImpl.spriteAtlasFrame(this.icon, UIResources_1.Res.common.npcHead, info.icon.toString());
        this._playerId = info.id;
        if (this._playerId == "Player." + Define_1.GRID_TYPE.BULE.toString() ||
            this._playerId == "Player." + Define_1.GRID_TYPE.GREEN.toString()) {
            this.blackBg.scaleX = -1;
        }
    };
    JXRBPlayer.prototype.onEndFight = function () {
        this.lab.node.stopAllActions();
        this.lifeTimer = null;
    };
    /**设置队伍 */
    JXRBPlayer.prototype.setRole = function (role) {
        this._roles.set(role.id, role);
    };
    /**将角色移除 但是界面没有移除 */
    JXRBPlayer.prototype.removeRole = function (id) {
        if (this._roles.has(id)) {
            this._roles.delete(id);
        }
    };
    /**计时器计数 */
    JXRBPlayer.prototype.checkTimer = function (curRound) {
        if (curRound === this.timerRound || this._isCastRound) {
            return;
        }
        this.timerRound = curRound;
        this.lifeTimer.forEach(function (timer) {
            timer.life();
        });
    };
    /**确认是否有对应buff */
    JXRBPlayer.prototype.checkHaveBuffByBEMT = function (nType) {
        var timer = this.lifeTimer.get(nType);
        if (timer) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 玩家开始行动倒计时
     * @param curRound 当前回合
     * @param isSix 是否是6
     */
    JXRBPlayer.prototype.startActionTimer = function (curRound, isSix) {
        if (isSix === void 0) { isSix = false; }
        if (this._heroInfo.isPlayer) {
            GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.fight.onChangeDiceBtn, new GParam_1.default(true));
        }
        this._curRound = curRound;
        if (!isSix) {
            var local = "\u7B2C" + this._curRound + "\u56DE\u5408\u3010" + JXULDefine_1.ROLE_COMP_NAME[this._heroInfo.dir] + "\u3011\u5F00\u59CB\u884C\u52A8";
            console.group(local);
        }
        else {
            var local = "\u3010" + JXULDefine_1.ROLE_COMP_NAME[this._heroInfo.dir] + "\u3011\u56E0\u6295\u63B7\u5230\u516D\u83B7\u5F97\u4E00\u6B21\u884C\u52A8\u673A\u4F1A";
            console.log(local);
        }
        var index = MathEx_1.default.random(0, this._cdTimes.length - 1);
        var cdTime = this._cdTimes[index];
        var time = GameMgr_1.default.systemConfig.value(JXCommon_1.JXDef.SYS_CONFIG_KEY.roundTime); //回合时间
        this.countTime = time;
        this.lab.string = this.countTime.toString();
        this.lab.node.parent.active = true; //回合时间倒计时
        this.you.active = true;
        this._assetImpl.spriteAtlasFrame(this.headBg, UIResources_1.Res.fight.fight, "curhead");
        var isPlayer = this._heroInfo.isPlayer;
        this.timerAction = VIewUtil_1.ViewUtil.taskTick1({
            time: time,
            tickTime: 1,
            update: function (sub) {
                if (!isPlayer) {
                    if (cdTime === 0) {
                        this.throwDice();
                    }
                    cdTime--;
                }
            }.bind(this),
            endcb: this.startActionTimeEnd.bind(this),
        }, this.lab.node, this.lab);
    };
    /**开始行动倒计时结束 */
    JXRBPlayer.prototype.startActionTimeEnd = function () {
        if (this._heroInfo.isPlayer) {
            this.endCurStep(2, 0);
            this.endCurStep(2, 2);
            this.throwDice();
            GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.fight.onChangeDiceBtn, new GParam_1.default(false));
        }
        else {
            this.throwDice();
        }
    };
    /**玩家投掷骰子 */
    JXRBPlayer.prototype.onPlayerDice = function () {
        ColorLog_1.default.esOn("CMsg.client.fight.onPlayerDice");
        if (this._heroInfo.isPlayer) {
            this.throwDice();
            GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.fight.onChangeDiceBtn, new GParam_1.default(false));
        }
    };
    /**投掷骰子获取实际数值 */
    JXRBPlayer.prototype.throwDice = function () {
        var _this = this;
        AudioMgr_1.AudioMgr.Ins().playEffect(UIResources_1.Res.common.audio.touzi);
        this.lab.node.stopAction(this.timerAction);
        this.timerAction = null;
        this.lab.node.parent.active = false;
        this.you.active = false;
        this._assetImpl.spriteAtlasFrame(this.headBg, UIResources_1.Res.fight.fight, "head_bg");
        var roles = this._cmd.getRoles(function (role) {
            return role.isBorn;
        });
        var isFirst = roles.length === 0;
        this._cmd.throwDice(Number(this._heroInfo.dir), 
        // (num: number) => {
        function (_num) {
            var num = PlayerNumber_1.FAST_TRACK_ROUTE[_this._heroInfo.dir][_this._curRound]
                ? PlayerNumber_1.FAST_TRACK_ROUTE[_this._heroInfo.dir][_this._curRound]
                : _num;
            if (num === 6) {
                console.log({ _sixTime: _this._sixTime });
                if (_this._sixTime < exports.MaxSixTime) {
                    _this._sixTime++;
                }
            }
            var local = "\u3010" + JXULDefine_1.ROLE_COMP_NAME[_this._heroInfo.dir] + "\u3011\u6295\u63B7\u9AB0\u5B50\uFF1A" + num + "   ---- _heroInfo: " + JSON.stringify(_this._heroInfo) + "  _curRound: " + _this._curRound;
            console.log(local);
            _this._lastNum = num;
            var isBan = _this.checkHaveBuffByBEMT(JXULDefine_1.JXBtlBEMT.BanTakeOff);
            var canBorn = _this._lastNum === 6;
            var roles = null;
            console.log({ isBan: isBan, canBorn: canBorn });
            if (isBan) {
                roles = _this._cmd.getRoles(function (role) {
                    return (role.dir === _this._heroInfo.dir &&
                        role.isBorn != (canBorn && !isBan));
                });
            }
            else {
                roles = _this._cmd.getRoles(function (role) {
                    return role.dir === _this._heroInfo.dir;
                });
            }
            if (_this._heroInfo.isPlayer) {
                var isBanTakeOff_1 = _this.checkHaveBuffByBEMT(JXULDefine_1.JXBtlBEMT.BanTakeOff);
                if (_this._lastNum) {
                    roles.forEach(function (role) {
                        role.showCanMoveAni(_this._lastNum, isBanTakeOff_1);
                    });
                }
            }
            if (roles.length) {
                _this.doMoveActionTimer();
            }
            else {
            }
        }, isFirst ? 6 : null);
    };
    /**移动倒计时 */
    JXRBPlayer.prototype.doMoveActionTimer = function () {
        var time = GameMgr_1.default.systemConfig.value(JXCommon_1.JXDef.SYS_CONFIG_KEY.moveCountDown);
        this.countTime = time;
        this.lab.string = this.countTime.toString();
        this.lab.node.parent.active = true;
        this.you.active = true;
        this._assetImpl.spriteAtlasFrame(this.headBg, UIResources_1.Res.fight.fight, "curhead");
        var isPlayer = this._heroInfo.isPlayer;
        var index = MathEx_1.default.random(0, this._cdTimes.length - 1);
        var cdTime = this._cdTimes[index];
        var isBanTakeOff = this.checkHaveBuffByBEMT(JXULDefine_1.JXBtlBEMT.BanTakeOff);
        var role = this._cmd.randomRoleToAction(this._lastNum, this._heroInfo.dir, isBanTakeOff);
        if (!role) {
            this.moveAction(role);
            return;
        }
        this.timerAction = VIewUtil_1.ViewUtil.taskTick1({
            time: time,
            tickTime: 1,
            update: function (sub) {
                if (!isPlayer) {
                    if (cdTime === 0) {
                        this.moveAction(role);
                    }
                    cdTime--;
                }
            }.bind(this),
            endcb: this.moveActionTimeEnd.bind(this),
        }, this.lab.node, this.lab);
    };
    /**进行移动 */
    JXRBPlayer.prototype.moveAction = function (role, endFunc, num) {
        var _this = this;
        if (!endFunc) {
            endFunc = function () {
                _this.doSkillActionTimer();
            };
        }
        if (this._heroInfo.isPlayer) {
            this._roles.forEach(function (role) {
                role.hideCanMoveAni();
            });
        }
        this.lab.node.stopAction(this.timerAction);
        this.timerAction = null;
        this.lab.node.parent.active = false;
        this.you.active = false;
        this._assetImpl.spriteAtlasFrame(this.headBg, UIResources_1.Res.fight.fight, "head_bg");
        if (!role) {
            var local = "\u3010" + JXULDefine_1.ROLE_COMP_NAME[this._heroInfo.dir] + "\u3011\u4E0D\u5B58\u5728\u53EF\u884C\u52A8\u76EE\u6807";
            console.log(local);
            endFunc();
            return;
        }
        if (this._lastNum === 6 || (num && num === 6)) {
            // *确认是否起飞
            if (!role.isBorn) {
                role.planeTakeOff(function () {
                    var local = "\u3010" + JXULDefine_1.ROLE_COMP_NAME[_this._heroInfo.dir] + "\u3011" + role.id + "\u8D77\u98DE";
                    console.log(local);
                    endFunc();
                });
            }
            else {
                role.planeMove(this._lastNum, function () {
                    var local = "\u3010" + JXULDefine_1.ROLE_COMP_NAME[_this._heroInfo.dir] + "\u3011" + role.id + "\u5F00\u59CB\u98DE\u884C \u6B65\u6570\u4E3A\uFF1A" + _this._lastNum;
                    console.log(local);
                    endFunc();
                });
            }
        }
        else {
            role.planeMove(this._lastNum, function () {
                var local = "\u3010" + JXULDefine_1.ROLE_COMP_NAME[_this._heroInfo.dir] + "\u3011" + role.id + "\u5F00\u59CB\u98DE\u884C \u6B65\u6570\u4E3A\uFF1A" + _this._lastNum;
                console.log(local);
                endFunc();
            });
        }
    };
    /**技能倒计时 */
    JXRBPlayer.prototype.doSkillActionTimer = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.countTime = 0;
            _this.you.active = true;
            _this._assetImpl.spriteAtlasFrame(_this.headBg, UIResources_1.Res.fight.fight, "curhead");
            var isPlayer = _this._heroInfo.isPlayer;
            var index = MathEx_1.default.random(0, _this._cdTimes.length - 1);
            var cdTime = _this._cdTimes[index];
            _this.timerAction = VIewUtil_1.ViewUtil.taskTick1({
                time: 0,
                tickTime: 1,
                update: function (sub) {
                    if (!isPlayer) {
                        if (cdTime === 0) {
                            this.skillTimeEnd();
                        }
                        cdTime--;
                    }
                }.bind(_this),
                endcb: _this.skillTimeEnd.bind(_this),
            }, _this.lab.node, _this.lab);
        }, 1);
    };
    /**技能倒计时结束 */
    JXRBPlayer.prototype.skillTimeEnd = function () {
        this.lab.node.stopAction(this.timerAction);
        this.timerAction = null;
        this.lab.node.parent.active = false;
        this.you.active = false;
        this._assetImpl.spriteAtlasFrame(this.headBg, UIResources_1.Res.fight.fight, "head_bg");
        this.onPlyerCastSkillOver();
    };
    /**技能使用结束 */
    JXRBPlayer.prototype.onPlyerCastSkillOver = function () {
        this.endCurStep(2, 0);
        this.endCurStep(2, 2);
        if (this._lastNum === 6) {
            if (this._sixTime < exports.MaxSixTime) {
                this.startActionTimer(this._curRound, true);
            }
            else {
                this._sixTime = CoreDefine_1.INVALID_VALUE_ZERO;
                this.playerEndAction();
            }
        }
        else {
            this.playerEndAction();
        }
    };
    /**倒计时结束 */
    JXRBPlayer.prototype.moveActionTimeEnd = function () {
        if (this._heroInfo.isPlayer) {
            this.endCurStep(2, 1);
        }
        var role = this._cmd.randomRoleToAction(this._lastNum, this._heroInfo.dir);
        this.moveAction(role);
    };
    JXRBPlayer.prototype.endCurStep = function (chain, step) {
        if (!GameMgr_1.default.lUserData.isGuideOver(chain) &&
            GameMgr_1.default.guideMgr.guidId == chain &&
            GameMgr_1.default.guideMgr.step == step) {
            var node = GameMgr_1.default.guideMgr.getGuideNode();
            node.getComponent(GuideComponent_1.default).next();
        }
    };
    /**行动结束 */
    JXRBPlayer.prototype.playerEndAction = function () {
        var local = "\u7B2C" + this._curRound + "\u56DE\u5408\u7ED3\u675F\u3010" + JXULDefine_1.ROLE_COMP_NAME[this._heroInfo.dir] + "\u3011\u7ED3\u675F\u884C\u52A8";
        this.checkTimer(this._curRound);
        console.log(local);
        console.groupEnd();
        this._isCastRound = false;
        this._cmd.evtMgr.post(Define_1.CMsg.client.fight.onPlayerEndAction);
    };
    JXRBPlayer.prototype.onGDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this);
    };
    __decorate([
        property({
            type: cc.Label,
            tooltip: "倒计时",
        })
    ], JXRBPlayer.prototype, "lab", void 0);
    __decorate([
        property(cc.Label)
    ], JXRBPlayer.prototype, "pname", void 0);
    __decorate([
        property(cc.Sprite)
    ], JXRBPlayer.prototype, "icon", void 0);
    __decorate([
        property(cc.Sprite)
    ], JXRBPlayer.prototype, "headBg", void 0);
    __decorate([
        property(cc.Node)
    ], JXRBPlayer.prototype, "blackBg", void 0);
    __decorate([
        property(cc.Node)
    ], JXRBPlayer.prototype, "you", void 0);
    JXRBPlayer = __decorate([
        ccclass,
        menu("fight/JXRBPlayer")
    ], JXRBPlayer);
    return JXRBPlayer;
}(GChild_1.default));
exports.default = JXRBPlayer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9KWFJCUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwREFBc0Q7QUFDdEQsdURBQTZFO0FBQzdFLDJEQUFzRDtBQUN0RCxxREFBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLHNEQUFpRDtBQUNqRCxxREFBZ0Q7QUFDaEQsMkRBQTBEO0FBQzFELG9EQUErQztBQUMvQyw4Q0FBc0Q7QUFDdEQsd0RBQStDO0FBRS9DLDZEQUF3RDtBQUN4RCwrQ0FBMEM7QUFDMUMsaURBQWdEO0FBSWhELDJDQUFpRTtBQUNqRSwrQ0FBa0Q7QUFFNUMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFFckMsUUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRzVCO0lBQXdDLDhCQUFNO0lBQTlDO1FBQUEscUVBdWJDO1FBbGJDLFNBQUcsR0FBYSxJQUFJLENBQUM7UUFDRCxXQUFLLEdBQWEsSUFBSSxDQUFDO1FBQ3RCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFDdkIsWUFBTSxHQUFjLElBQUksQ0FBQztRQUMzQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLFNBQUcsR0FBWSxJQUFJLENBQUM7UUFDL0IsZUFBUyxHQUFjLElBQUksQ0FBQztRQUVwQyxRQUFRO1FBQ0EsWUFBTSxHQUE4QixJQUFJLENBQUM7UUFDakQsWUFBWTtRQUNKLFVBQUksR0FBZSxJQUFJLENBQUM7UUFDaEMsVUFBVTtRQUNGLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDbEMsVUFBVTtRQUNGLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFDakMsVUFBVTtRQUNGLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsY0FBUSxHQUFXLDBCQUFhLENBQUM7UUFDakMsY0FBUSxHQUFXLCtCQUFr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QyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCwrQkFBVSxHQUFWO1FBQ0UsYUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQWpiRDtRQUpDLFFBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSztZQUNkLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQzsyQ0FDbUI7SUFDRDtRQUFuQixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FBd0I7SUFDdEI7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQXdCO0lBQ3ZCO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUEwQjtJQUMzQjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FBeUI7SUFDeEI7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQXFCO0lBVnBCLFVBQVU7UUFGOUIsT0FBTztRQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztPQUNKLFVBQVUsQ0F1YjlCO0lBQUQsaUJBQUM7Q0F2YkQsQUF1YkMsQ0F2YnVDLGdCQUFNLEdBdWI3QztrQkF2Ym9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2hlc3NCdGwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vZC50cy9nYW1lL0pYQ0xCdGxcIjtcclxuaW1wb3J0IHsgSlhEZWYgfSBmcm9tIFwiLi4vLi4vLi4vY29udmVudGlvbnMvSlhDb21tb25cIjtcclxuaW1wb3J0IHsgSU5WQUxJRF9WQUxVRSwgSU5WQUxJRF9WQUxVRV9aRVJPIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvQ29yZURlZmluZVwiO1xyXG5pbXBvcnQgQ29sb3JMb2cgZnJvbSBcIi4uLy4uLy4uL0NvcmUvRnJhbWVFeC9Db2xvckxvZ1wiO1xyXG5pbXBvcnQgeyBNYXBXcmFwIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvRnJhbWVFeC9FUzVFeFwiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL0dDdHJsXCI7XHJcbmltcG9ydCBHUGFyYW0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvR0V2ZW50L0dQYXJhbVwiO1xyXG5pbXBvcnQgR0NoaWxkIGZyb20gXCIuLi8uLi8uLi9Db3JlL0dWaWV3L0dDaGlsZFwiO1xyXG5pbXBvcnQgeyBBdWRpb01nciB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hbmFnZXIvQXVkaW9NZ3JcIjtcclxuaW1wb3J0IE1hdGhFeCBmcm9tIFwiLi4vLi4vLi4vQ29yZS9NYXRoL01hdGhFeFwiO1xyXG5pbXBvcnQgeyBDTXNnLCBHUklEX1RZUEUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RlZmluZVwiO1xyXG5pbXBvcnQgeyBSZXMgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL1VJUmVzb3VyY2VzXCI7XHJcbmltcG9ydCB7IEpYTG9jYWxlcyB9IGZyb20gXCIuLi8uLi9Db21tb24vWmhcIjtcclxuaW1wb3J0IEd1aWRlQ29tcG9uZW50IGZyb20gXCIuLi8uLi9HdWlkZS9HdWlkZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi4vLi4vTG9naWMvR2FtZU1nclwiO1xyXG5pbXBvcnQgeyBWaWV3VXRpbCB9IGZyb20gXCIuLi9WaWV3VXRpbC9WSWV3VXRpbFwiO1xyXG5pbXBvcnQgeyBKWFJvdW5kVGltZXIgfSBmcm9tIFwiLi9KWEJhdHRsZVV0aWxpdHlcIjtcclxuaW1wb3J0IEpYUkJDbWRNZ3IgZnJvbSBcIi4vSlhSQkNtZE1nclwiO1xyXG5pbXBvcnQgeyBKWFJCUm9sZSB9IGZyb20gXCIuL0pYUkJSb2xlXCI7XHJcbmltcG9ydCB7IEpYQnRsQkVNVCwgSlhFRGlyLCBST0xFX0NPTVBfTkFNRSB9IGZyb20gXCIuL0pYVUxEZWZpbmVcIjtcclxuaW1wb3J0IHsgRkFTVF9UUkFDS19ST1VURSB9IGZyb20gXCIuL1BsYXllck51bWJlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBjb25zdCBNYXhTaXhUaW1lID0gMjtcclxuQGNjY2xhc3NcclxuQG1lbnUoXCJmaWdodC9KWFJCUGxheWVyXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpYUkJQbGF5ZXIgZXh0ZW5kcyBHQ2hpbGQge1xyXG4gIEBwcm9wZXJ0eSh7XHJcbiAgICB0eXBlOiBjYy5MYWJlbCxcclxuICAgIHRvb2x0aXA6IFwi5YCS6K6h5pe2XCIsXHJcbiAgfSlcclxuICBsYWI6IGNjLkxhYmVsID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuTGFiZWwpIHBuYW1lOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLlNwcml0ZSkgaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcclxuICBAcHJvcGVydHkoY2MuU3ByaXRlKSBoZWFkQmc6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIGJsYWNrQmc6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKSB5b3U6IGNjLk5vZGUgPSBudWxsO1xyXG4gIHByaXZhdGUgX2hlcm9JbmZvOiBJQ2hlc3NCdGwgPSBudWxsO1xyXG5cclxuICAvKirop5LoibIgKi9cclxuICBwcml2YXRlIF9yb2xlczogTWFwV3JhcDxzdHJpbmcsIEpYUkJSb2xlPiA9IG51bGw7XHJcbiAgLyoq5oiY5paX5ZG95Luk566h55CGICovXHJcbiAgcHJpdmF0ZSBfY21kOiBKWFJCQ21kTWdyID0gbnVsbDtcclxuICAvKirooYzliqjml7bpl7QgKi9cclxuICBwcml2YXRlIF9jZFRpbWVzOiBudW1iZXJbXSA9IG51bGw7XHJcbiAgLyoq5b2T5YmN5Zue5ZCIICovXHJcbiAgcHJpdmF0ZSBfY3VyUm91bmQ6IG51bWJlciA9IG51bGw7XHJcbiAgLyoq5Zue5ZCI5pe26Ze0ICovXHJcbiAgcHJpdmF0ZSBjb3VudFRpbWU6IG51bWJlciA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfbGFzdE51bTogbnVtYmVyID0gSU5WQUxJRF9WQUxVRTtcclxuICBwcml2YXRlIF9zaXhUaW1lOiBudW1iZXIgPSBJTlZBTElEX1ZBTFVFX1pFUk87XHJcbiAgcHVibGljIHNldCBsYXN0TnVtKHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5fbGFzdE51bSA9IHY7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgc2l4VGltZSh2OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3NpeFRpbWUgPSB2O1xyXG4gIH1cclxuICAvKiog55Sf5pWI5Zue5ZCI5a6a5pe25ZmoICovXHJcbiAgcHJpdmF0ZSBsaWZlVGltZXI6IE1hcFdyYXA8bnVtYmVyLCBKWFJvdW5kVGltZXI+ID0gbnVsbDtcclxuICBwcml2YXRlIHRpbWVyUm91bmQ6IG51bWJlciA9IG51bGw7XHJcbiAgLyoqIOinkuiJsui6q+S4iueahEJVRkYgKi9cclxuICBwdWJsaWMgYnVmZnM6IG51bWJlcltdO1xyXG4gIHByaXZhdGUgX3BsYXllcklkOiBzdHJpbmcgPSBudWxsO1xyXG4gIHByaXZhdGUgX2lzQ2FzdFJvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGdldCBwbGF5ZXJJZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9wbGF5ZXJJZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdGltZXJBY3Rpb246IGNjLkFjdGlvbiA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBvbkdMb2FkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5idWZmcyA9IFtdO1xyXG4gICAgdGhpcy5saWZlVGltZXIgPSBuZXcgTWFwV3JhcDxudW1iZXIsIEpYUm91bmRUaW1lcj4oKTtcclxuICAgIEdDdHJsLkVTLm9uKFxyXG4gICAgICBDTXNnLmNsaWVudC5maWdodC5vblBsYXllckRpY2UsXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHRoaXMub25QbGF5ZXJEaWNlLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdERhdGEoaW5mbzogSUNoZXNzQnRsLCBjbWQ6IEpYUkJDbWRNZ3IpIHtcclxuICAgIHRoaXMuX2hlcm9JbmZvID0gaW5mbztcclxuICAgIHRoaXMubGFiLnN0cmluZyA9IFwiUmVhZHlcIjtcclxuICAgIHRoaXMuX2NtZCA9IGNtZDtcclxuICAgIHRoaXMuX2NtZC5ldnRNZ3IucmVnaXN0ZXIoXHJcbiAgICAgIENNc2cuY2xpZW50LmZpZ2h0LmVuZEZpZ2h0LFxyXG4gICAgICB0aGlzLFxyXG4gICAgICB0aGlzLm9uRW5kRmlnaHQuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICAgIHRoaXMuX2NkVGltZXMgPSBHYW1lTWdyLnN5c3RlbUNvbmZpZy52YWx1ZTxudW1iZXJbXT4oXHJcbiAgICAgIEpYRGVmLlNZU19DT05GSUdfS0VZLnJvYm90RGljZVRpbWVcclxuICAgICk7XHJcbiAgICB0aGlzLl9yb2xlcyA9IG5ldyBNYXBXcmFwPHN0cmluZywgSlhSQlJvbGU+KCk7XHJcbiAgICB0aGlzLnBuYW1lLnN0cmluZyA9IGluZm8ubmFtZTtcclxuICAgIHRoaXMuYXNzZXRJbXBsLnNwcml0ZUF0bGFzRnJhbWUoXHJcbiAgICAgIHRoaXMuaWNvbixcclxuICAgICAgUmVzLmNvbW1vbi5ucGNIZWFkLFxyXG4gICAgICBpbmZvLmljb24udG9TdHJpbmcoKVxyXG4gICAgKTtcclxuICAgIHRoaXMuX3BsYXllcklkID0gaW5mby5pZDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuX3BsYXllcklkID09IFwiUGxheWVyLlwiICsgR1JJRF9UWVBFLkJVTEUudG9TdHJpbmcoKSB8fFxyXG4gICAgICB0aGlzLl9wbGF5ZXJJZCA9PSBcIlBsYXllci5cIiArIEdSSURfVFlQRS5HUkVFTi50b1N0cmluZygpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5ibGFja0JnLnNjYWxlWCA9IC0xO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uRW5kRmlnaHQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxhYi5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB0aGlzLmxpZmVUaW1lciA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKirorr7nva7pmJ/kvI0gKi9cclxuICBwdWJsaWMgc2V0Um9sZShyb2xlOiBKWFJCUm9sZSkge1xyXG4gICAgdGhpcy5fcm9sZXMuc2V0KHJvbGUuaWQsIHJvbGUpO1xyXG4gIH1cclxuXHJcbiAgLyoq5bCG6KeS6Imy56e76ZmkIOS9huaYr+eVjOmdouayoeacieenu+mZpCAqL1xyXG4gIHB1YmxpYyByZW1vdmVSb2xlKGlkOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLl9yb2xlcy5oYXMoaWQpKSB7XHJcbiAgICAgIHRoaXMuX3JvbGVzLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKirorqHml7blmajorqHmlbAgKi9cclxuICBwcm90ZWN0ZWQgY2hlY2tUaW1lcihjdXJSb3VuZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoY3VyUm91bmQgPT09IHRoaXMudGltZXJSb3VuZCB8fCB0aGlzLl9pc0Nhc3RSb3VuZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnRpbWVyUm91bmQgPSBjdXJSb3VuZDtcclxuICAgIHRoaXMubGlmZVRpbWVyLmZvckVhY2goKHRpbWVyKSA9PiB7XHJcbiAgICAgIHRpbWVyLmxpZmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKirnoa7orqTmmK/lkKbmnInlr7nlupRidWZmICovXHJcbiAgcHVibGljIGNoZWNrSGF2ZUJ1ZmZCeUJFTVQoblR5cGU6IEpYQnRsQkVNVCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHRpbWVyID0gdGhpcy5saWZlVGltZXIuZ2V0KG5UeXBlKTtcclxuICAgIGlmICh0aW1lcikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeOqeWutuW8gOWni+ihjOWKqOWAkuiuoeaXtlxyXG4gICAqIEBwYXJhbSBjdXJSb3VuZCDlvZPliY3lm57lkIhcclxuICAgKiBAcGFyYW0gaXNTaXgg5piv5ZCm5pivNlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGFydEFjdGlvblRpbWVyKGN1clJvdW5kOiBudW1iZXIsIGlzU2l4OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLl9oZXJvSW5mby5pc1BsYXllcikge1xyXG4gICAgICBHQ3RybC5FUy5lbWl0KENNc2cuY2xpZW50LmZpZ2h0Lm9uQ2hhbmdlRGljZUJ0biwgbmV3IEdQYXJhbSh0cnVlKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jdXJSb3VuZCA9IGN1clJvdW5kO1xyXG4gICAgaWYgKCFpc1NpeCkge1xyXG4gICAgICBsZXQgbG9jYWwgPSBg56ysJHt0aGlzLl9jdXJSb3VuZH3lm57lkIjjgJAke1xyXG4gICAgICAgIFJPTEVfQ09NUF9OQU1FW3RoaXMuX2hlcm9JbmZvLmRpcl1cclxuICAgICAgfeOAkeW8gOWni+ihjOWKqGA7XHJcbiAgICAgIGNvbnNvbGUuZ3JvdXAobG9jYWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGxvY2FsID0gYOOAkCR7XHJcbiAgICAgICAgUk9MRV9DT01QX05BTUVbdGhpcy5faGVyb0luZm8uZGlyXVxyXG4gICAgICB944CR5Zug5oqV5o635Yiw5YWt6I635b6X5LiA5qyh6KGM5Yqo5py65LyaYDtcclxuICAgICAgY29uc29sZS5sb2cobG9jYWwpO1xyXG4gICAgfVxyXG4gICAgbGV0IGluZGV4ID0gTWF0aEV4LnJhbmRvbSgwLCB0aGlzLl9jZFRpbWVzLmxlbmd0aCAtIDEpO1xyXG4gICAgbGV0IGNkVGltZSA9IHRoaXMuX2NkVGltZXNbaW5kZXhdO1xyXG4gICAgbGV0IHRpbWUgPSBHYW1lTWdyLnN5c3RlbUNvbmZpZy52YWx1ZTxudW1iZXI+KFxyXG4gICAgICBKWERlZi5TWVNfQ09ORklHX0tFWS5yb3VuZFRpbWVcclxuICAgICk7IC8v5Zue5ZCI5pe26Ze0XHJcbiAgICB0aGlzLmNvdW50VGltZSA9IHRpbWU7XHJcbiAgICB0aGlzLmxhYi5zdHJpbmcgPSB0aGlzLmNvdW50VGltZS50b1N0cmluZygpO1xyXG4gICAgdGhpcy5sYWIubm9kZS5wYXJlbnQuYWN0aXZlID0gdHJ1ZTsgLy/lm57lkIjml7bpl7TlgJLorqHml7ZcclxuICAgIHRoaXMueW91LmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLl9hc3NldEltcGwuc3ByaXRlQXRsYXNGcmFtZSh0aGlzLmhlYWRCZywgUmVzLmZpZ2h0LmZpZ2h0LCBcImN1cmhlYWRcIik7XHJcbiAgICBsZXQgaXNQbGF5ZXIgPSB0aGlzLl9oZXJvSW5mby5pc1BsYXllcjtcclxuICAgIHRoaXMudGltZXJBY3Rpb24gPSBWaWV3VXRpbC50YXNrVGljazEoXHJcbiAgICAgIHtcclxuICAgICAgICB0aW1lOiB0aW1lLFxyXG4gICAgICAgIHRpY2tUaW1lOiAxLFxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHN1YjogbnVtYmVyKSB7XHJcbiAgICAgICAgICBpZiAoIWlzUGxheWVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjZFRpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgICB0aGlzLnRocm93RGljZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNkVGltZS0tO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICBlbmRjYjogdGhpcy5zdGFydEFjdGlvblRpbWVFbmQuYmluZCh0aGlzKSxcclxuICAgICAgfSxcclxuICAgICAgdGhpcy5sYWIubm9kZSxcclxuICAgICAgdGhpcy5sYWJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKirlvIDlp4vooYzliqjlgJLorqHml7bnu5PmnZ8gKi9cclxuICBwcm90ZWN0ZWQgc3RhcnRBY3Rpb25UaW1lRW5kKCkge1xyXG4gICAgaWYgKHRoaXMuX2hlcm9JbmZvLmlzUGxheWVyKSB7XHJcbiAgICAgIHRoaXMuZW5kQ3VyU3RlcCgyLCAwKTtcclxuICAgICAgdGhpcy5lbmRDdXJTdGVwKDIsIDIpO1xyXG4gICAgICB0aGlzLnRocm93RGljZSgpO1xyXG4gICAgICBHQ3RybC5FUy5lbWl0KENNc2cuY2xpZW50LmZpZ2h0Lm9uQ2hhbmdlRGljZUJ0biwgbmV3IEdQYXJhbShmYWxzZSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aHJvd0RpY2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKueOqeWutuaKleaOt+mqsOWtkCAqL1xyXG4gIHByb3RlY3RlZCBvblBsYXllckRpY2UoKSB7XHJcbiAgICBDb2xvckxvZy5lc09uKFwiQ01zZy5jbGllbnQuZmlnaHQub25QbGF5ZXJEaWNlXCIpO1xyXG4gICAgaWYgKHRoaXMuX2hlcm9JbmZvLmlzUGxheWVyKSB7XHJcbiAgICAgIHRoaXMudGhyb3dEaWNlKCk7XHJcbiAgICAgIEdDdHJsLkVTLmVtaXQoQ01zZy5jbGllbnQuZmlnaHQub25DaGFuZ2VEaWNlQnRuLCBuZXcgR1BhcmFtKGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKirmipXmjrfpqrDlrZDojrflj5blrp7pmYXmlbDlgLwgKi9cclxuICBwcm90ZWN0ZWQgdGhyb3dEaWNlKCkge1xyXG4gICAgQXVkaW9NZ3IuSW5zKCkucGxheUVmZmVjdChSZXMuY29tbW9uLmF1ZGlvLnRvdXppKTtcclxuICAgIHRoaXMubGFiLm5vZGUuc3RvcEFjdGlvbih0aGlzLnRpbWVyQWN0aW9uKTtcclxuICAgIHRoaXMudGltZXJBY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5sYWIubm9kZS5wYXJlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLnlvdS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Fzc2V0SW1wbC5zcHJpdGVBdGxhc0ZyYW1lKHRoaXMuaGVhZEJnLCBSZXMuZmlnaHQuZmlnaHQsIFwiaGVhZF9iZ1wiKTtcclxuICAgIGxldCByb2xlcyA9IHRoaXMuX2NtZC5nZXRSb2xlcygocm9sZSkgPT4ge1xyXG4gICAgICByZXR1cm4gcm9sZS5pc0Jvcm47XHJcbiAgICB9KTtcclxuICAgIGxldCBpc0ZpcnN0ID0gcm9sZXMubGVuZ3RoID09PSAwO1xyXG4gICAgdGhpcy5fY21kLnRocm93RGljZShcclxuICAgICAgTnVtYmVyKHRoaXMuX2hlcm9JbmZvLmRpciksXHJcbiAgICAgIC8vIChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAoX251bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgbGV0IG51bSA9IEZBU1RfVFJBQ0tfUk9VVEVbdGhpcy5faGVyb0luZm8uZGlyXVt0aGlzLl9jdXJSb3VuZF1cclxuICAgICAgICAgID8gRkFTVF9UUkFDS19ST1VURVt0aGlzLl9oZXJvSW5mby5kaXJdW3RoaXMuX2N1clJvdW5kXVxyXG4gICAgICAgICAgOiBfbnVtO1xyXG4gICAgICAgIGlmIChudW0gPT09IDYpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHsgX3NpeFRpbWU6IHRoaXMuX3NpeFRpbWUgfSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5fc2l4VGltZSA8IE1heFNpeFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2l4VGltZSsrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbG9jYWwgPSBg44CQJHtcclxuICAgICAgICAgIFJPTEVfQ09NUF9OQU1FW3RoaXMuX2hlcm9JbmZvLmRpcl1cclxuICAgICAgICB944CR5oqV5o636aqw5a2Q77yaJHtudW19ICAgLS0tLSBfaGVyb0luZm86ICR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICB0aGlzLl9oZXJvSW5mb1xyXG4gICAgICAgICl9ICBfY3VyUm91bmQ6ICR7dGhpcy5fY3VyUm91bmR9YDtcclxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xhc3ROdW0gPSBudW07XHJcbiAgICAgICAgbGV0IGlzQmFuID0gdGhpcy5jaGVja0hhdmVCdWZmQnlCRU1UKEpYQnRsQkVNVC5CYW5UYWtlT2ZmKTtcclxuICAgICAgICBsZXQgY2FuQm9ybiA9IHRoaXMuX2xhc3ROdW0gPT09IDY7XHJcbiAgICAgICAgbGV0IHJvbGVzID0gbnVsbDtcclxuICAgICAgICBjb25zb2xlLmxvZyh7IGlzQmFuLCBjYW5Cb3JuIH0pO1xyXG4gICAgICAgIGlmIChpc0Jhbikge1xyXG4gICAgICAgICAgcm9sZXMgPSB0aGlzLl9jbWQuZ2V0Um9sZXMoKHJvbGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICByb2xlLmRpciA9PT0gdGhpcy5faGVyb0luZm8uZGlyICYmXHJcbiAgICAgICAgICAgICAgcm9sZS5pc0Jvcm4gIT0gKGNhbkJvcm4gJiYgIWlzQmFuKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJvbGVzID0gdGhpcy5fY21kLmdldFJvbGVzKChyb2xlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByb2xlLmRpciA9PT0gdGhpcy5faGVyb0luZm8uZGlyO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9oZXJvSW5mby5pc1BsYXllcikge1xyXG4gICAgICAgICAgbGV0IGlzQmFuVGFrZU9mZiA9IHRoaXMuY2hlY2tIYXZlQnVmZkJ5QkVNVChKWEJ0bEJFTVQuQmFuVGFrZU9mZik7XHJcbiAgICAgICAgICBpZiAodGhpcy5fbGFzdE51bSkge1xyXG4gICAgICAgICAgICByb2xlcy5mb3JFYWNoKChyb2xlOiBKWFJCUm9sZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHJvbGUuc2hvd0Nhbk1vdmVBbmkodGhpcy5fbGFzdE51bSwgaXNCYW5UYWtlT2ZmKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb2xlcy5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuZG9Nb3ZlQWN0aW9uVGltZXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgaXNGaXJzdCA/IDYgOiBudWxsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoq56e75Yqo5YCS6K6h5pe2ICovXHJcbiAgcHJvdGVjdGVkIGRvTW92ZUFjdGlvblRpbWVyKCkge1xyXG4gICAgbGV0IHRpbWUgPSBHYW1lTWdyLnN5c3RlbUNvbmZpZy52YWx1ZTxudW1iZXI+KFxyXG4gICAgICBKWERlZi5TWVNfQ09ORklHX0tFWS5tb3ZlQ291bnREb3duXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb3VudFRpbWUgPSB0aW1lO1xyXG4gICAgdGhpcy5sYWIuc3RyaW5nID0gdGhpcy5jb3VudFRpbWUudG9TdHJpbmcoKTtcclxuICAgIHRoaXMubGFiLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICB0aGlzLnlvdS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5fYXNzZXRJbXBsLnNwcml0ZUF0bGFzRnJhbWUodGhpcy5oZWFkQmcsIFJlcy5maWdodC5maWdodCwgXCJjdXJoZWFkXCIpO1xyXG4gICAgbGV0IGlzUGxheWVyID0gdGhpcy5faGVyb0luZm8uaXNQbGF5ZXI7XHJcbiAgICBsZXQgaW5kZXggPSBNYXRoRXgucmFuZG9tKDAsIHRoaXMuX2NkVGltZXMubGVuZ3RoIC0gMSk7XHJcbiAgICBsZXQgY2RUaW1lID0gdGhpcy5fY2RUaW1lc1tpbmRleF07XHJcbiAgICBsZXQgaXNCYW5UYWtlT2ZmID0gdGhpcy5jaGVja0hhdmVCdWZmQnlCRU1UKEpYQnRsQkVNVC5CYW5UYWtlT2ZmKTtcclxuICAgIGxldCByb2xlID0gdGhpcy5fY21kLnJhbmRvbVJvbGVUb0FjdGlvbihcclxuICAgICAgdGhpcy5fbGFzdE51bSxcclxuICAgICAgdGhpcy5faGVyb0luZm8uZGlyLFxyXG4gICAgICBpc0JhblRha2VPZmZcclxuICAgICk7XHJcbiAgICBpZiAoIXJvbGUpIHtcclxuICAgICAgdGhpcy5tb3ZlQWN0aW9uKHJvbGUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnRpbWVyQWN0aW9uID0gVmlld1V0aWwudGFza1RpY2sxKFxyXG4gICAgICB7XHJcbiAgICAgICAgdGltZTogdGltZSxcclxuICAgICAgICB0aWNrVGltZTogMSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChzdWI6IG51bWJlcikge1xyXG4gICAgICAgICAgaWYgKCFpc1BsYXllcikge1xyXG4gICAgICAgICAgICBpZiAoY2RUaW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aW9uKHJvbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNkVGltZS0tO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICBlbmRjYjogdGhpcy5tb3ZlQWN0aW9uVGltZUVuZC5iaW5kKHRoaXMpLFxyXG4gICAgICB9LFxyXG4gICAgICB0aGlzLmxhYi5ub2RlLFxyXG4gICAgICB0aGlzLmxhYlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKui/m+ihjOenu+WKqCAqL1xyXG4gIHB1YmxpYyBtb3ZlQWN0aW9uKHJvbGU6IEpYUkJSb2xlLCBlbmRGdW5jPywgbnVtPzogbnVtYmVyKSB7XHJcbiAgICBpZiAoIWVuZEZ1bmMpIHtcclxuICAgICAgZW5kRnVuYyA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLmRvU2tpbGxBY3Rpb25UaW1lcigpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2hlcm9JbmZvLmlzUGxheWVyKSB7XHJcbiAgICAgIHRoaXMuX3JvbGVzLmZvckVhY2goKHJvbGUpID0+IHtcclxuICAgICAgICByb2xlLmhpZGVDYW5Nb3ZlQW5pKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYWIubm9kZS5zdG9wQWN0aW9uKHRoaXMudGltZXJBY3Rpb24pO1xyXG4gICAgdGhpcy50aW1lckFjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmxhYi5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMueW91LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fYXNzZXRJbXBsLnNwcml0ZUF0bGFzRnJhbWUodGhpcy5oZWFkQmcsIFJlcy5maWdodC5maWdodCwgXCJoZWFkX2JnXCIpO1xyXG4gICAgaWYgKCFyb2xlKSB7XHJcbiAgICAgIGxldCBsb2NhbCA9IGDjgJAke1JPTEVfQ09NUF9OQU1FW3RoaXMuX2hlcm9JbmZvLmRpcl1944CR5LiN5a2Y5Zyo5Y+v6KGM5Yqo55uu5qCHYDtcclxuICAgICAgY29uc29sZS5sb2cobG9jYWwpO1xyXG4gICAgICBlbmRGdW5jKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbGFzdE51bSA9PT0gNiB8fCAobnVtICYmIG51bSA9PT0gNikpIHtcclxuICAgICAgLy8gKuehruiupOaYr+WQpui1t+mjnlxyXG4gICAgICBpZiAoIXJvbGUuaXNCb3JuKSB7XHJcbiAgICAgICAgcm9sZS5wbGFuZVRha2VPZmYoKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IGxvY2FsID0gYOOAkCR7Uk9MRV9DT01QX05BTUVbdGhpcy5faGVyb0luZm8uZGlyXX3jgJEke3JvbGUuaWR96LW36aOeYDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsKTtcclxuICAgICAgICAgIGVuZEZ1bmMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByb2xlLnBsYW5lTW92ZSh0aGlzLl9sYXN0TnVtLCAoKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbG9jYWwgPSBg44CQJHtST0xFX0NPTVBfTkFNRVt0aGlzLl9oZXJvSW5mby5kaXJdfeOAkSR7XHJcbiAgICAgICAgICAgIHJvbGUuaWRcclxuICAgICAgICAgIH3lvIDlp4vpo57ooYwg5q2l5pWw5Li677yaJHt0aGlzLl9sYXN0TnVtfWA7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhbCk7XHJcbiAgICAgICAgICBlbmRGdW5jKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJvbGUucGxhbmVNb3ZlKHRoaXMuX2xhc3ROdW0sICgpID0+IHtcclxuICAgICAgICBsZXQgbG9jYWwgPSBg44CQJHtST0xFX0NPTVBfTkFNRVt0aGlzLl9oZXJvSW5mby5kaXJdfeOAkSR7XHJcbiAgICAgICAgICByb2xlLmlkXHJcbiAgICAgICAgfeW8gOWni+mjnuihjCDmraXmlbDkuLrvvJoke3RoaXMuX2xhc3ROdW19YDtcclxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbCk7XHJcbiAgICAgICAgZW5kRnVuYygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKuaKgOiDveWAkuiuoeaXtiAqL1xyXG4gIHB1YmxpYyBkb1NraWxsQWN0aW9uVGltZXIoKSB7XHJcbiAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY291bnRUaW1lID0gMDtcclxuICAgICAgdGhpcy55b3UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fYXNzZXRJbXBsLnNwcml0ZUF0bGFzRnJhbWUodGhpcy5oZWFkQmcsIFJlcy5maWdodC5maWdodCwgXCJjdXJoZWFkXCIpO1xyXG4gICAgICBsZXQgaXNQbGF5ZXIgPSB0aGlzLl9oZXJvSW5mby5pc1BsYXllcjtcclxuICAgICAgbGV0IGluZGV4ID0gTWF0aEV4LnJhbmRvbSgwLCB0aGlzLl9jZFRpbWVzLmxlbmd0aCAtIDEpO1xyXG4gICAgICBsZXQgY2RUaW1lID0gdGhpcy5fY2RUaW1lc1tpbmRleF07XHJcbiAgICAgIHRoaXMudGltZXJBY3Rpb24gPSBWaWV3VXRpbC50YXNrVGljazEoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGltZTogMCxcclxuICAgICAgICAgIHRpY2tUaW1lOiAxLFxyXG4gICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoc3ViOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFpc1BsYXllcikge1xyXG4gICAgICAgICAgICAgIGlmIChjZFRpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxUaW1lRW5kKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNkVGltZS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgICAgICBlbmRjYjogdGhpcy5za2lsbFRpbWVFbmQuYmluZCh0aGlzKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaXMubGFiLm5vZGUsXHJcbiAgICAgICAgdGhpcy5sYWJcclxuICAgICAgKTtcclxuICAgIH0sIDEpO1xyXG4gIH1cclxuXHJcbiAgLyoq5oqA6IO95YCS6K6h5pe257uT5p2fICovXHJcbiAgcHJvdGVjdGVkIHNraWxsVGltZUVuZCgpIHtcclxuICAgIHRoaXMubGFiLm5vZGUuc3RvcEFjdGlvbih0aGlzLnRpbWVyQWN0aW9uKTtcclxuICAgIHRoaXMudGltZXJBY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5sYWIubm9kZS5wYXJlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLnlvdS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Fzc2V0SW1wbC5zcHJpdGVBdGxhc0ZyYW1lKHRoaXMuaGVhZEJnLCBSZXMuZmlnaHQuZmlnaHQsIFwiaGVhZF9iZ1wiKTtcclxuICAgIHRoaXMub25QbHllckNhc3RTa2lsbE92ZXIoKTtcclxuICB9XHJcbiAgLyoq5oqA6IO95L2/55So57uT5p2fICovXHJcbiAgcHJvdGVjdGVkIG9uUGx5ZXJDYXN0U2tpbGxPdmVyKCkge1xyXG4gICAgdGhpcy5lbmRDdXJTdGVwKDIsIDApO1xyXG4gICAgdGhpcy5lbmRDdXJTdGVwKDIsIDIpO1xyXG4gICAgaWYgKHRoaXMuX2xhc3ROdW0gPT09IDYpIHtcclxuICAgICAgaWYgKHRoaXMuX3NpeFRpbWUgPCBNYXhTaXhUaW1lKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEFjdGlvblRpbWVyKHRoaXMuX2N1clJvdW5kLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9zaXhUaW1lID0gSU5WQUxJRF9WQUxVRV9aRVJPO1xyXG4gICAgICAgIHRoaXMucGxheWVyRW5kQWN0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGxheWVyRW5kQWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKuWAkuiuoeaXtue7k+adnyAqL1xyXG4gIHByb3RlY3RlZCBtb3ZlQWN0aW9uVGltZUVuZCgpIHtcclxuICAgIGlmICh0aGlzLl9oZXJvSW5mby5pc1BsYXllcikge1xyXG4gICAgICB0aGlzLmVuZEN1clN0ZXAoMiwgMSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcm9sZSA9IHRoaXMuX2NtZC5yYW5kb21Sb2xlVG9BY3Rpb24odGhpcy5fbGFzdE51bSwgdGhpcy5faGVyb0luZm8uZGlyKTtcclxuICAgIHRoaXMubW92ZUFjdGlvbihyb2xlKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBlbmRDdXJTdGVwKGNoYWluOiBudW1iZXIsIHN0ZXA6IG51bWJlcikge1xyXG4gICAgaWYgKFxyXG4gICAgICAhR2FtZU1nci5sVXNlckRhdGEuaXNHdWlkZU92ZXIoY2hhaW4pICYmXHJcbiAgICAgIEdhbWVNZ3IuZ3VpZGVNZ3IuZ3VpZElkID09IGNoYWluICYmXHJcbiAgICAgIEdhbWVNZ3IuZ3VpZGVNZ3Iuc3RlcCA9PSBzdGVwXHJcbiAgICApIHtcclxuICAgICAgbGV0IG5vZGUgPSBHYW1lTWdyLmd1aWRlTWdyLmdldEd1aWRlTm9kZSgpO1xyXG4gICAgICBub2RlLmdldENvbXBvbmVudChHdWlkZUNvbXBvbmVudCkubmV4dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKirooYzliqjnu5PmnZ8gKi9cclxuICBwcm90ZWN0ZWQgcGxheWVyRW5kQWN0aW9uKCkge1xyXG4gICAgbGV0IGxvY2FsID0gYOesrCR7dGhpcy5fY3VyUm91bmR95Zue5ZCI57uT5p2f44CQJHtcclxuICAgICAgUk9MRV9DT01QX05BTUVbdGhpcy5faGVyb0luZm8uZGlyXVxyXG4gICAgfeOAkee7k+adn+ihjOWKqGA7XHJcbiAgICB0aGlzLmNoZWNrVGltZXIodGhpcy5fY3VyUm91bmQpO1xyXG4gICAgY29uc29sZS5sb2cobG9jYWwpO1xyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gICAgdGhpcy5faXNDYXN0Um91bmQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2NtZC5ldnRNZ3IucG9zdChDTXNnLmNsaWVudC5maWdodC5vblBsYXllckVuZEFjdGlvbik7XHJcbiAgfVxyXG5cclxuICBvbkdEZXN0cm95KCk6IHZvaWQge1xyXG4gICAgR0N0cmwuRVMub2ZmKHRoaXMpO1xyXG4gIH1cclxufVxyXG4iXX0=