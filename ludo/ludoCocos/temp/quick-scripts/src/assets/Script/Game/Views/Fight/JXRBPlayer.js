"use strict";
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