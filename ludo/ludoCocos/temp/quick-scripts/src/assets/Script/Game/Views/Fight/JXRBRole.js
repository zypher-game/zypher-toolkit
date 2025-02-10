"use strict";
cc._RF.push(module, '12989cpZLhDxYlccXJ/nZJP', 'JXRBRole');
// Script/Game/Views/Fight/JXRBRole.ts

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
exports.JXRBRole = exports.JXGSt = exports.JXDeathSt = exports.JXRunSt = exports.JXHitSt = exports.JXOverlaySt = exports.JXFlySt = exports.JXTakeoffSt = exports.JXIDleSt = exports.JXRoleSt = void 0;
var FiniteStateMachine_1 = require("../../../Core/BaseFSM/FiniteStateMachine");
var CoreDefine_1 = require("../../../Core/CoreDefine");
var ActionEx_1 = require("../../../Core/FrameEx/ActionEx");
var CCNodeImpl_1 = require("../../../Core/FrameEx/CCNodeImpl");
var GParam_1 = require("../../../Core/GEvent/GParam");
var AudioMgr_1 = require("../../../Core/Manager/AudioMgr");
var MathEx_1 = require("../../../Core/Math/MathEx");
var Define_1 = require("../../Common/Define");
var UIResources_1 = require("../../Common/UIResources");
var JXRBPlayer_1 = require("./JXRBPlayer");
var JXULDefine_1 = require("./JXULDefine");
var JXRoleSt = /** @class */ (function (_super) {
    __extends(JXRoleSt, _super);
    function JXRoleSt() {
        return _super.call(this) || this;
    }
    Object.defineProperty(JXRoleSt.prototype, "sk", {
        get: function () {
            return this.entity.skeleton;
        },
        enumerable: false,
        configurable: true
    });
    return JXRoleSt;
}(FiniteStateMachine_1.FSMState));
exports.JXRoleSt = JXRoleSt;
var JXIDleSt = /** @class */ (function (_super) {
    __extends(JXIDleSt, _super);
    function JXIDleSt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(JXIDleSt.prototype, "stateID", {
        get: function () {
            return JXULDefine_1.JXEState.Idle;
        },
        enumerable: false,
        configurable: true
    });
    JXIDleSt.prototype.enter = function () {
        // this.entity.unitNode.x = 0;
        this.entity.changeAnimation(JXULDefine_1.JXEAniNames.idle, true);
    };
    return JXIDleSt;
}(JXRoleSt));
exports.JXIDleSt = JXIDleSt;
var JXTakeoffSt = /** @class */ (function (_super) {
    __extends(JXTakeoffSt, _super);
    function JXTakeoffSt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(JXTakeoffSt.prototype, "stateID", {
        get: function () {
            return JXULDefine_1.JXEState.TakeOff;
        },
        enumerable: false,
        configurable: true
    });
    JXTakeoffSt.prototype.enter = function () { };
    return JXTakeoffSt;
}(JXRoleSt));
exports.JXTakeoffSt = JXTakeoffSt;
var JXFlySt = /** @class */ (function (_super) {
    __extends(JXFlySt, _super);
    function JXFlySt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(JXFlySt.prototype, "stateID", {
        get: function () {
            return JXULDefine_1.JXEState.Fly;
        },
        enumerable: false,
        configurable: true
    });
    JXFlySt.prototype.enter = function () {
        // this.entity.unitNode.x = 0;
        this.entity.changeAnimation(JXULDefine_1.JXEAniNames.fly, true);
    };
    return JXFlySt;
}(JXRoleSt));
exports.JXFlySt = JXFlySt;
var JXOverlaySt = /** @class */ (function (_super) {
    __extends(JXOverlaySt, _super);
    function JXOverlaySt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(JXOverlaySt.prototype, "stateID", {
        get: function () {
            return JXULDefine_1.JXEState.Overlay;
        },
        enumerable: false,
        configurable: true
    });
    JXOverlaySt.prototype.enter = function () {
        var _this = this;
        // this.entity.unitNode.x = 0;
        this.entity.target.zIndex = 1001;
        this.entity.changeAnimation(JXULDefine_1.JXEAniNames.diejia, false, function () {
            _this.entity.changeAnimation(JXULDefine_1.JXEAniNames.idle);
        });
    };
    JXOverlaySt.prototype.exit = function () {
        this.entity.target.zIndex = 0;
    };
    return JXOverlaySt;
}(JXRoleSt));
exports.JXOverlaySt = JXOverlaySt;
var JXHitSt = /** @class */ (function (_super) {
    __extends(JXHitSt, _super);
    function JXHitSt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(JXHitSt.prototype, "stateID", {
        get: function () {
            return JXULDefine_1.JXEState.Hit;
        },
        enumerable: false,
        configurable: true
    });
    JXHitSt.prototype.enter = function () {
        this.entity.changeAnimation(JXULDefine_1.JXEAniNames.zhuangfei, false);
    };
    return JXHitSt;
}(JXRoleSt));
exports.JXHitSt = JXHitSt;
var JXRunSt = /** @class */ (function (_super) {
    __extends(JXRunSt, _super);
    function JXRunSt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(JXRunSt.prototype, "stateID", {
        get: function () {
            return JXULDefine_1.JXEState.Run;
        },
        enumerable: false,
        configurable: true
    });
    JXRunSt.prototype.enter = function () {
        this.entity.changeAnimation(JXULDefine_1.JXEAniNames.run, true);
    };
    JXRunSt.prototype.execute = function (dt) {
        var entity = this.entity;
    };
    return JXRunSt;
}(JXRoleSt));
exports.JXRunSt = JXRunSt;
var JXDeathSt = /** @class */ (function (_super) {
    __extends(JXDeathSt, _super);
    function JXDeathSt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(JXDeathSt.prototype, "stateID", {
        get: function () {
            return JXULDefine_1.JXEState.Death;
        },
        enumerable: false,
        configurable: true
    });
    JXDeathSt.prototype.enter = function () {
        var _this = this;
        this.entity.changeAnimation(JXULDefine_1.JXEAniNames.die, false);
        this.entity.addAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(function () {
            _this.onAnimationEnd();
        })));
    };
    JXDeathSt.prototype.onAnimationEnd = function () {
        this.entity.onEndDie();
    };
    return JXDeathSt;
}(JXRoleSt));
exports.JXDeathSt = JXDeathSt;
var JXGSt = /** @class */ (function (_super) {
    __extends(JXGSt, _super);
    function JXGSt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.waitShowBuffs = [];
        _this.duration = 0.2;
        _this._oldModel = null;
        _this._curModel = null;
        _this._waitChageModel = false;
        return _this;
    }
    Object.defineProperty(JXGSt.prototype, "stateID", {
        get: function () {
            return JXULDefine_1.JXEState.Global;
        },
        enumerable: false,
        configurable: true
    });
    JXGSt.prototype.enter = function () {
        this._curTime = 0;
    };
    JXGSt.prototype.execute = function () {
        if (this._waitChageModel) {
            this.changeModel();
        }
    };
    JXGSt.prototype.setModel = function (model) {
        if (this._curModel == model)
            return;
        if (this._curModel) {
            this._oldModel = this._curModel;
        }
        this._curModel = model;
        if (this._oldModel) {
            this._waitChageModel = true;
        }
    };
    JXGSt.prototype.reOldModel = function () {
        if (!this._oldModel)
            return;
        this.setModel(this._oldModel);
    };
    JXGSt.prototype.changeModel = function () {
        console.log("【JXRBRole】changeModel");
        this._waitChageModel = false;
        this.entity.skeleton.skeletonData =
            this.entity.cmd.assetManager.assetImpl.getPreLoadAsset(this._curModel);
        this.entity.changeState(JXULDefine_1.JXEState.Idle, true);
    };
    return JXGSt;
}(JXRoleSt));
exports.JXGSt = JXGSt;
var JXRBRole = /** @class */ (function (_super) {
    __extends(JXRBRole, _super);
    function JXRBRole(object) {
        var _this = _super.call(this, object) || this;
        _this.vSpeed = cc.Vec2.ZERO;
        _this._birthPos = cc.Vec2.ZERO;
        _this.airPos = null;
        _this.roadPos = null;
        _this.startPos = null;
        _this.isBanMove = false;
        _this._isBorn = false;
        _this._moveTime = 0.3;
        _this._flyTime = 1;
        _this.knockPos = null;
        _this._touchCb = null;
        _this._actionList = [];
        _this.skeleton = object.getChildByName("skeleton").getComponent(sp.Skeleton);
        _this.effectSkeleton = object
            .getChildByName("yanwu")
            .getComponent(sp.Skeleton);
        if (!_this.skeleton) {
            return _this;
        }
        _this.skeleton.setEventListener(function (track, event) {
            _this.onSkEventListen(_this.skeleton, track, event);
        });
        return _this;
    }
    Object.defineProperty(JXRBRole.prototype, "birthPos", {
        get: function () {
            return this._birthPos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JXRBRole.prototype, "isBorn", {
        /**确认是否起飞 */
        get: function () {
            return this._isBorn;
        },
        set: function (v) {
            this._isBorn = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JXRBRole.prototype, "playerId", {
        get: function () {
            return this.player.playerId;
        },
        enumerable: false,
        configurable: true
    });
    JXRBRole.prototype.setTouchCb = function (v) {
        this._touchCb = v;
    };
    /**初始化状态机 */
    JXRBRole.prototype.initState = function () {
        this.fsm = new FiniteStateMachine_1.FiniteStateMachine(this);
        this._runSt = new JXRunSt();
        this._idleSt = new JXIDleSt();
        this._deathSt = new JXDeathSt();
        this._takeoffSt = new JXTakeoffSt();
        this._flySt = new JXFlySt();
        this._overlaySt = new JXOverlaySt();
        this._hitSt = new JXHitSt();
        this.fsm.registerState(this._takeoffSt);
        this.fsm.registerState(this._hitSt);
        this.fsm.registerState(this._flySt);
        this.fsm.registerState(this._overlaySt);
        this.fsm.registerState(this._runSt);
        this.fsm.registerState(this._idleSt);
        this.fsm.registerState(this._deathSt);
        this._globalSt = new JXGSt();
        this.fsm.registerState(this._globalSt);
        this.fsm.setGlobalState(this._globalSt);
        this.initEvent();
    };
    JXRBRole.prototype.initEvent = function () {
        this.target.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
    };
    JXRBRole.prototype._onTouchEnd = function () {
        var _this = this;
        if (this.effectSkeleton.node.active) {
            console.log("【JXRBRole】寻找位置", this.name, this._touchCb);
            AudioMgr_1.AudioMgr.Ins().playEffect(UIResources_1.Res.common.audio.feiji);
            var roles_1 = this.cmd.getRoles(function (role) {
                return role.dir == _this._dir;
            });
            if (this._touchCb) {
                this.player.moveAction(this, function () {
                    _this._touchCb();
                    roles_1.forEach(function (role) {
                        role.setTouchCb(null);
                    });
                }, 6);
            }
            else {
                this.player.moveAction(this, function () {
                    _this.player.doSkillActionTimer();
                });
            }
        }
    };
    /**显示可以移动的效果 */
    JXRBRole.prototype.showCanMoveAni = function (num, isBanTakeOff) {
        if (isBanTakeOff === void 0) { isBanTakeOff = false; }
        var isBanMove = this.isBanMove;
        if (this.getCurState() === JXULDefine_1.JXEState.Death)
            return;
        if (num === 6) {
            if (!this._isBorn) {
                this.effectSkeleton.node.active = !isBanTakeOff;
            }
            else {
                this.effectSkeleton.node.active = !isBanMove;
            }
        }
        else {
            if (!this._isBorn) {
                this.effectSkeleton.node.active = false;
            }
            else {
                this.effectSkeleton.node.active = !isBanMove;
            }
        }
        this.effectSkeleton.setAnimation(0, "zise", true);
    };
    JXRBRole.prototype.hideCanMoveAni = function () {
        this.effectSkeleton.node.active = false;
    };
    /**绑定 */
    JXRBRole.prototype.bindPlayer = function (player) {
        this.player = player;
    };
    /**设置阵营 */
    JXRBRole.prototype.setDir = function (dir) {
        this._dir = dir;
    };
    Object.defineProperty(JXRBRole.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        enumerable: false,
        configurable: true
    });
    /** 获取当前状态 */
    JXRBRole.prototype.getCurState = function () {
        return this.fsm.getCurState();
    };
    /**设置模型 */
    JXRBRole.prototype.setModel = function (model) {
        this._globalSt.setModel(model);
    };
    /**飞机设置出生点 */
    JXRBRole.prototype.setBirthPos = function (birthPos) {
        this.position = birthPos;
        this._birthPos = this.position;
    };
    JXRBRole.prototype.setAngle = function (angle) {
        this.target.angle = angle;
    };
    /**设置行进路径 */
    JXRBRole.prototype.setRoadPos = function (arr) {
        this.roadPos = CoreDefine_1.OBJECT_COPY(arr);
    };
    /**设置起飞点*/
    JXRBRole.prototype.setStartPos = function (pos) {
        this.startPos = pos;
    };
    /**改变状态 */
    JXRBRole.prototype.changeState = function (state, force) {
        if (force === void 0) { force = false; }
        console.log("【JXRBRole】changeState " + state);
        this.fsm.changeState(state, force);
    };
    Object.defineProperty(JXRBRole.prototype, "roadIndex", {
        /**获取当前位置索引*/
        get: function () {
            var arr = this.roadPos.map(function (v) { return JSON.stringify({ x: v.x, y: v.y }); });
            return arr.indexOf(JSON.stringify({
                x: Math.round(this.position.x),
                y: Math.round(this.position.y),
            }));
        },
        enumerable: false,
        configurable: true
    });
    // 骨骼帧事件
    JXRBRole.prototype.onSkEventListen = function (skeleton, track, event) {
        var _this = this;
        var eventName = event.data.name;
        console.log({ eventName: eventName });
        switch (eventName) {
            case "home": {
                if (!this.knockPos)
                    return;
                var info = skeleton.getAnimationInfo(JXULDefine_1.JXEAniNames.zhuangfei);
                cc.tween(this.target)
                    .to(info.duration, {
                    position: cc.v3(this.knockPos.x, this.knockPos.y),
                })
                    .call(function () {
                    console.log("【JXRBRole】onSkEventListen home changeState");
                    _this.changeState(JXULDefine_1.JXEState.Idle);
                    _this.target.getChildByName("upper").destroyAllChildren();
                    _this.target.zIndex = -1;
                    _this.isBanMove = false;
                    if (_this.knockPos.x === _this._birthPos.x &&
                        _this.knockPos.y === _this._birthPos.y) {
                        _this._isBorn = false;
                        var anglePos = JXULDefine_1.BirthAngle[_this._dir];
                        cc.tween(_this.target).to(0.5, { angle: anglePos }).start();
                    }
                    else {
                        _this.correctAngle(function () {
                            _this.planeMoveEnd();
                        });
                    }
                    _this.knockPos = null;
                })
                    .start();
                break;
            }
        }
    };
    /**飞机起飞 */
    JXRBRole.prototype.planeTakeOff = function (cb) {
        console.log("【JXRBRole】planeTakeOff JXEState.TakeOff");
        this.changeState(JXULDefine_1.JXEState.TakeOff);
        var ani = JXULDefine_1.JXEAniNames.qifei;
        var info = this.skeleton.getAnimationInfo(ani);
        var moveAction = new ActionEx_1.JXBezierTo(info.duration, [
            this.position,
            cc.v2(this.startPos.x, this.startPos.y),
            cc.v2(this.startPos.x, this.startPos.y),
        ]);
        this._isBorn = true;
        var endCb = cc.callFunc(function () {
            if (this._dir === JXULDefine_1.JXEDir.Red || this._dir === JXULDefine_1.JXEDir.Blue) {
                cc.tween(this.target).by(0.5, { angle: 90 }).start();
            }
            var role = this.cmd.checkHavePlaneInHere(this.target.position, this.id);
            if (role.length) {
                console.log("【JXRBRole】planeTakeOff JXEState.Overlay");
                this.changeState(JXULDefine_1.JXEState.Overlay);
            }
            else {
                console.log("【JXRBRole】planeTakeOff JXEState.Idle");
                this.changeState(JXULDefine_1.JXEState.Idle);
            }
            cb();
        }.bind(this));
        var seq = cc.sequence(moveAction, endCb);
        this.addAction(seq);
        // this.target.runAction(seq)
    };
    /**矫正飞机角度 */
    JXRBRole.prototype.correctAngle = function (cb) {
        if (Math.round(this.position.x) === Math.round(this._birthPos.x) &&
            Math.round(this.position.y) === Math.round(this._birthPos.y)) {
            this._isBorn = false;
            cc.tween(this.target)
                .to(0.5, { angle: 90 })
                .call(function () {
                cb && cb();
            })
                .start();
        }
        else {
            var curIndex = this.roadIndex;
            var nextIndex = curIndex + 1;
            var posId = this.roadPos[nextIndex];
            var position = cc.v2(posId.x, posId.y);
            var angle = MathEx_1.default.getAngleX(cc.v2(this.target.position.x, this.target.position.y), position);
            cc.tween(this.target)
                .to(0.5, { angle: angle })
                .call(function () {
                cb && cb();
            })
                .start();
        }
    };
    JXRBRole.prototype.changeAnimation = function (actionName, loop, completeCb) {
        if (loop === void 0) { loop = false; }
        if (!this.skeleton)
            return;
        var track = this.skeleton.setAnimation(0, actionName, loop);
        if (!completeCb) {
            this.skeleton.setCompleteListener(null);
        }
        else {
            this.skeleton.setCompleteListener(completeCb);
        }
        if (!track) {
            cc.log("\u89D2\u8272\u6807\u7B7E" + this.id + ",\u540D\u5B57" + this.id + "\u627E\u4E0D\u5230\u52A8\u4F5C:\" + " + actionName);
        }
        return { track: track, duration: track.animation.duration };
    };
    JXRBRole.prototype.addActionToMgr = function (impl, action, pause) {
        if (pause === void 0) { pause = false; }
        this.cmd.btlActionMgr.addAction(action, impl, pause);
        return action;
    };
    JXRBRole.prototype.addAction = function (action, isQueue) {
        if (isQueue === void 0) { isQueue = true; }
        if (action) {
            if (isQueue) {
                action.setTag(ActionEx_1.QUEUE_ACTION_TAG);
                this._actionList.push(action);
            }
            else {
                this.cmd.addAction(this, action);
            }
        }
    };
    /**获取结束的点 */
    JXRBRole.prototype.getPlaneMoveEndPosition = function (count, isDel) {
        if (isDel === void 0) { isDel = false; }
        var curIndex = this.roadIndex;
        var posId = null;
        for (var i = 0; i < count; i++) {
            var next = curIndex + 1;
            var last = curIndex - 1;
            if (next <= this.roadPos.length - 1 && !isDel) {
                posId = this.roadPos[next];
                curIndex++;
            }
            else {
                isDel = true;
                posId = this.roadPos[last];
                curIndex--;
                if (curIndex < 0) {
                    posId = this.startPos;
                    break;
                }
            }
        }
        return cc.v2(posId.x, posId.y);
    };
    /**飞机飞行 */
    JXRBRole.prototype.planeMove = function (count, cb) {
        var _this = this;
        var curIndex = this.roadIndex;
        var num = count;
        var action = [];
        var isDel = false;
        this.cmd.curVia = [];
        if (num) {
            for (var i = 0; i < num; i++) {
                var next = curIndex + 1;
                var last = curIndex - 1;
                var pos = null;
                var posId = null;
                if (next <= this.roadPos.length - 1 && !isDel) {
                    posId = this.roadPos[next];
                    curIndex++;
                }
                else {
                    isDel = true;
                    posId = this.roadPos[last];
                    curIndex--;
                    if (curIndex < 0) {
                        var flyAction = new ActionEx_1.JXMoveTo(this._flyTime, cc.v2(this.startPos));
                        var end = cc.callFunc(function () {
                            cc.tween(_this.target)
                                .by(0.5, { angle: _this.target.angle })
                                .start();
                        });
                        var seq_1 = cc.sequence(flyAction, end);
                        action.push(seq_1);
                        break;
                    }
                }
                pos = cc.v2(posId);
                if (next <= this.roadPos.length - 7 && i != num - 1) {
                    this.cmd.curVia.push(posId);
                }
                var moveAction = new ActionEx_1.JXMoveTo(this._moveTime, pos);
                action.push(moveAction);
                var target = pos;
                if (target && i == num - 1) {
                    console.log("【JXRBRole】planeMove JXEState.Fly");
                    this.changeState(JXULDefine_1.JXEState.Fly);
                    curIndex = this.roadPos
                        .map(function (v) { return JSON.stringify({ x: v.x, y: v.y }); })
                        .indexOf(JSON.stringify({
                        x: Math.round(target.x),
                        y: Math.round(target.y),
                    }));
                    var _end = this.roadPos[curIndex + 1];
                    var flyAction = new ActionEx_1.JXMoveTo(this._flyTime, target, _end);
                    if (curIndex === 5) {
                        curIndex = 30;
                        target = cc.v2(this.roadPos[curIndex]);
                        flyAction = new ActionEx_1.JXMoveTo(this._flyTime, target);
                        this.player.sixTime = JXRBPlayer_1.MaxSixTime;
                    }
                    action.push(flyAction);
                }
            }
        }
        var self = this;
        var endCb = cc.callFunc(function () {
            if (cb)
                cb();
            self.planeMoveEnd();
        }.bind(this));
        action.push(endCb);
        var seq = cc.sequence(action);
        console.log("【JXRBRole】planeMove JXEState.Run");
        this.changeState(JXULDefine_1.JXEState.Run);
        this.addAction(seq);
    };
    /**飞机移动结束 */
    JXRBRole.prototype.planeMoveEnd = function () {
        var _this = this;
        var curIndex = this.roadIndex;
        if (curIndex === this.roadPos.length - 1) {
            var local = "\u3010" + JXULDefine_1.ROLE_COMP_NAME[this._dir] + "\u3011" + this.id + "\u5230\u8FBE\u7EC8\u70B9";
            console.log(local);
            console.log("【JXRBRole】planeMoveEnd JXEState.Death");
            this.changeState(JXULDefine_1.JXEState.Death);
            if (this.cmd.setDeathRoles(this._dir, this.id)) {
                this.cmd.running = false;
                this.cmd.evtMgr.post(Define_1.CMsg.client.fight.endFight, new GParam_1.default(this._dir));
            }
        }
        else {
            //判断是否有飞机在这个位置上
            var roles_2 = this.cmd.checkHavePlaneInHere(new cc.Vec2(this.target.position.x, this.target.position.y), this.id);
            if (roles_2.length) {
                roles_2.forEach(function (role) {
                    if (role._dir === _this._dir) {
                        console.log("【JXRBRole】planeMoveEnd " + roles_2.length + " JXEState.Overlay");
                        _this.changeState(JXULDefine_1.JXEState.Overlay);
                    }
                    else {
                        //击飞逻辑处理
                        var local = "\u3010" + JXULDefine_1.ROLE_COMP_NAME[_this._dir] + "\u3011" + _this.id + "\u5C06" + role.id + "\u649E\u98DE";
                        console.log(local);
                        console.log("【JXRBRole】planeMoveEnd " + roles_2.length + " JXEState.Idle");
                        role.planeKnockOff();
                        _this.changeState(JXULDefine_1.JXEState.Idle);
                    }
                });
            }
            else {
                console.log("【JXRBRole】planeMoveEnd " + roles_2.length + " JXEState.Idle");
                this.changeState(JXULDefine_1.JXEState.Idle);
            }
        }
    };
    /**飞机撞飞 */
    JXRBRole.prototype.planeKnockOff = function (target) {
        AudioMgr_1.AudioMgr.Ins().playEffect(UIResources_1.Res.common.audio.zhuangfei);
        AudioMgr_1.AudioMgr.Ins().playEffect(UIResources_1.Res.common.audio.houtui);
        if (target) {
            this.knockPos = target;
        }
        else {
            this.knockPos = this._birthPos;
        }
        console.log("【JXRBRole】planeKnockOff JXEState.Hit");
        this.changeState(JXULDefine_1.JXEState.Hit);
    };
    JXRBRole.prototype.onEndDie = function () {
        this.active = false;
        this.cmd.removeRole(this.id);
        this.player.removeRole(this.id);
        this.target.destroy();
    };
    JXRBRole.prototype.update = function (dt) {
        if (this.fsm) {
            this.fsm.FSMUpdate(dt);
        }
        if (!this.cmd.btlActionMgr.hasQueueAction(this) &&
            this._actionList.length > 0) {
            this.addActionToMgr(this, this._actionList.shift());
        }
    };
    JXRBRole.prototype.onDestroy = function () { };
    return JXRBRole;
}(CCNodeImpl_1.CCNodeImpl));
exports.JXRBRole = JXRBRole;

cc._RF.pop();