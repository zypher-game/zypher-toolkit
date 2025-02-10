
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Fight/JXRBRole.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9GaWdodC9KWFJCUm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsK0VBR2tEO0FBQ2xELHVEQUF1RDtBQUN2RCwyREFJd0M7QUFDeEMsK0RBQThEO0FBQzlELHNEQUFpRDtBQUNqRCwyREFBMEQ7QUFDMUQsb0RBQStDO0FBQy9DLDhDQUFnRTtBQUNoRSx3REFBK0M7QUFHL0MsMkNBQXNEO0FBQ3RELDJDQU1zQjtBQUV0QjtJQUE4Qiw0QkFBNEI7SUFJeEQ7ZUFDRSxpQkFBTztJQUNULENBQUM7SUFMRCxzQkFBYyx3QkFBRTthQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFJSCxlQUFDO0FBQUQsQ0FQQSxBQU9DLENBUDZCLDZCQUFRLEdBT3JDO0FBUFksNEJBQVE7QUFTckI7SUFBOEIsNEJBQVE7SUFBdEM7O0lBU0EsQ0FBQztJQVJDLHNCQUFXLDZCQUFPO2FBQWxCO1lBQ0UsT0FBTyxxQkFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVNLHdCQUFLLEdBQVo7UUFDRSw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsd0JBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNILGVBQUM7QUFBRCxDQVRBLEFBU0MsQ0FUNkIsUUFBUSxHQVNyQztBQVRZLDRCQUFRO0FBV3JCO0lBQWlDLCtCQUFRO0lBQXpDOztJQU1BLENBQUM7SUFMQyxzQkFBVyxnQ0FBTzthQUFsQjtZQUNFLE9BQU8scUJBQVEsQ0FBQyxPQUFPLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFTSwyQkFBSyxHQUFaLGNBQWdCLENBQUM7SUFDbkIsa0JBQUM7QUFBRCxDQU5BLEFBTUMsQ0FOZ0MsUUFBUSxHQU14QztBQU5Z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U0FBUyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ00sMkJBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQseUJBQU0sR0FBTixVQUFPLEVBQUU7UUFDUCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN4QjtRQUNELElBQ0UsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDM0I7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBRUQsNEJBQVMsR0FBVCxjQUFhLENBQUM7SUFDaEIsZUFBQztBQUFELENBdmhCQSxBQXVoQkMsQ0F2aEI2Qix1QkFBVSxHQXVoQnZDO0FBdmhCWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21MaWtlLCBKWENMQWN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCB7IEpYRGVmIH0gZnJvbSBcIi4uLy4uLy4uL2NvbnZlbnRpb25zL0pYQ29tbW9uXCI7XHJcbmltcG9ydCB7XHJcbiAgRmluaXRlU3RhdGVNYWNoaW5lLFxyXG4gIEZTTVN0YXRlLFxyXG59IGZyb20gXCIuLi8uLi8uLi9Db3JlL0Jhc2VGU00vRmluaXRlU3RhdGVNYWNoaW5lXCI7XHJcbmltcG9ydCB7IE9CSkVDVF9DT1BZIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvQ29yZURlZmluZVwiO1xyXG5pbXBvcnQge1xyXG4gIEpYQmV6aWVyVG8sXHJcbiAgSlhNb3ZlVG8sXHJcbiAgUVVFVUVfQUNUSU9OX1RBRyxcclxufSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0FjdGlvbkV4XCI7XHJcbmltcG9ydCB7IENDTm9kZUltcGwgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9GcmFtZUV4L0NDTm9kZUltcGxcIjtcclxuaW1wb3J0IEdQYXJhbSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9HRXZlbnQvR1BhcmFtXCI7XHJcbmltcG9ydCB7IEF1ZGlvTWdyIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWFuYWdlci9BdWRpb01nclwiO1xyXG5pbXBvcnQgTWF0aEV4IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hdGgvTWF0aEV4XCI7XHJcbmltcG9ydCB7IENNc2csIElORk9fVFlQRSwgTWFwTGF5ZXIgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RlZmluZVwiO1xyXG5pbXBvcnQgeyBSZXMgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL1VJUmVzb3VyY2VzXCI7XHJcbmltcG9ydCBHYW1lTWdyIGZyb20gXCIuLi8uLi9Mb2dpYy9HYW1lTWdyXCI7XHJcbmltcG9ydCBKWFJCQ21kTWdyIGZyb20gXCIuL0pYUkJDbWRNZ3JcIjtcclxuaW1wb3J0IEpYUkJQbGF5ZXIsIHsgTWF4U2l4VGltZSB9IGZyb20gXCIuL0pYUkJQbGF5ZXJcIjtcclxuaW1wb3J0IHtcclxuICBCaXJ0aEFuZ2xlLFxyXG4gIEpYRUFuaU5hbWVzLFxyXG4gIEpYRURpcixcclxuICBKWEVTdGF0ZSxcclxuICBST0xFX0NPTVBfTkFNRSxcclxufSBmcm9tIFwiLi9KWFVMRGVmaW5lXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSlhSb2xlU3QgZXh0ZW5kcyBGU01TdGF0ZTxKWFJCUm9sZSwgSlhFU3RhdGU+IHtcclxuICBwcm90ZWN0ZWQgZ2V0IHNrKCk6IHNwLlNrZWxldG9uIHtcclxuICAgIHJldHVybiB0aGlzLmVudGl0eS5za2VsZXRvbjtcclxuICB9XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpYSURsZVN0IGV4dGVuZHMgSlhSb2xlU3Qge1xyXG4gIHB1YmxpYyBnZXQgc3RhdGVJRCgpOiBKWEVTdGF0ZSB7XHJcbiAgICByZXR1cm4gSlhFU3RhdGUuSWRsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlbnRlcigpIHtcclxuICAgIC8vIHRoaXMuZW50aXR5LnVuaXROb2RlLnggPSAwO1xyXG4gICAgdGhpcy5lbnRpdHkuY2hhbmdlQW5pbWF0aW9uKEpYRUFuaU5hbWVzLmlkbGUsIHRydWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpYVGFrZW9mZlN0IGV4dGVuZHMgSlhSb2xlU3Qge1xyXG4gIHB1YmxpYyBnZXQgc3RhdGVJRCgpOiBKWEVTdGF0ZSB7XHJcbiAgICByZXR1cm4gSlhFU3RhdGUuVGFrZU9mZjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlbnRlcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBKWEZseVN0IGV4dGVuZHMgSlhSb2xlU3Qge1xyXG4gIHB1YmxpYyBnZXQgc3RhdGVJRCgpOiBKWEVTdGF0ZSB7XHJcbiAgICByZXR1cm4gSlhFU3RhdGUuRmx5O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVudGVyKCkge1xyXG4gICAgLy8gdGhpcy5lbnRpdHkudW5pdE5vZGUueCA9IDA7XHJcbiAgICB0aGlzLmVudGl0eS5jaGFuZ2VBbmltYXRpb24oSlhFQW5pTmFtZXMuZmx5LCB0cnVlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBKWE92ZXJsYXlTdCBleHRlbmRzIEpYUm9sZVN0IHtcclxuICBwdWJsaWMgZ2V0IHN0YXRlSUQoKTogSlhFU3RhdGUge1xyXG4gICAgcmV0dXJuIEpYRVN0YXRlLk92ZXJsYXk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW50ZXIoKSB7XHJcbiAgICAvLyB0aGlzLmVudGl0eS51bml0Tm9kZS54ID0gMDtcclxuICAgIHRoaXMuZW50aXR5LnRhcmdldC56SW5kZXggPSAxMDAxO1xyXG4gICAgdGhpcy5lbnRpdHkuY2hhbmdlQW5pbWF0aW9uKEpYRUFuaU5hbWVzLmRpZWppYSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgdGhpcy5lbnRpdHkuY2hhbmdlQW5pbWF0aW9uKEpYRUFuaU5hbWVzLmlkbGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXhpdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZW50aXR5LnRhcmdldC56SW5kZXggPSAwO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpYSGl0U3QgZXh0ZW5kcyBKWFJvbGVTdCB7XHJcbiAgcHVibGljIGdldCBzdGF0ZUlEKCk6IEpYRVN0YXRlIHtcclxuICAgIHJldHVybiBKWEVTdGF0ZS5IaXQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW50ZXIoKSB7XHJcbiAgICB0aGlzLmVudGl0eS5jaGFuZ2VBbmltYXRpb24oSlhFQW5pTmFtZXMuemh1YW5nZmVpLCBmYWxzZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSlhSdW5TdCBleHRlbmRzIEpYUm9sZVN0IHtcclxuICBwdWJsaWMgZ2V0IHN0YXRlSUQoKTogSlhFU3RhdGUge1xyXG4gICAgcmV0dXJuIEpYRVN0YXRlLlJ1bjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlbnRlcigpIHtcclxuICAgIHRoaXMuZW50aXR5LmNoYW5nZUFuaW1hdGlvbihKWEVBbmlOYW1lcy5ydW4sIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGV4ZWN1dGUoZHQ6IG51bWJlcikge1xyXG4gICAgbGV0IGVudGl0eSA9IHRoaXMuZW50aXR5O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpYRGVhdGhTdCBleHRlbmRzIEpYUm9sZVN0IHtcclxuICBwdWJsaWMgZ2V0IHN0YXRlSUQoKTogSlhFU3RhdGUge1xyXG4gICAgcmV0dXJuIEpYRVN0YXRlLkRlYXRoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVudGVyKCkge1xyXG4gICAgdGhpcy5lbnRpdHkuY2hhbmdlQW5pbWF0aW9uKEpYRUFuaU5hbWVzLmRpZSwgZmFsc2UpO1xyXG4gICAgdGhpcy5lbnRpdHkuYWRkQWN0aW9uKFxyXG4gICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICBjYy5mYWRlT3V0KDAuNSksXHJcbiAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vbkFuaW1hdGlvbkVuZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25BbmltYXRpb25FbmQoKSB7XHJcbiAgICB0aGlzLmVudGl0eS5vbkVuZERpZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpYR1N0IGV4dGVuZHMgSlhSb2xlU3Qge1xyXG4gIHB1YmxpYyB3YWl0U2hvd0J1ZmZzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIHByb3RlY3RlZCBkdXJhdGlvbjogbnVtYmVyID0gMC4yO1xyXG4gIHByb3RlY3RlZCBfb2xkTW9kZWw6IHN0cmluZyA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIF9jdXJNb2RlbDogc3RyaW5nID0gbnVsbDtcclxuICBwcm90ZWN0ZWQgX3dhaXRDaGFnZU1vZGVsID0gZmFsc2U7XHJcbiAgcHVibGljIGdldCBzdGF0ZUlEKCk6IEpYRVN0YXRlIHtcclxuICAgIHJldHVybiBKWEVTdGF0ZS5HbG9iYWw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW50ZXIoKSB7XHJcbiAgICB0aGlzLl9jdXJUaW1lID0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBleGVjdXRlKCkge1xyXG4gICAgaWYgKHRoaXMuX3dhaXRDaGFnZU1vZGVsKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlTW9kZWwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRNb2RlbChtb2RlbDogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5fY3VyTW9kZWwgPT0gbW9kZWwpIHJldHVybjtcclxuICAgIGlmICh0aGlzLl9jdXJNb2RlbCkge1xyXG4gICAgICB0aGlzLl9vbGRNb2RlbCA9IHRoaXMuX2N1ck1vZGVsO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY3VyTW9kZWwgPSBtb2RlbDtcclxuICAgIGlmICh0aGlzLl9vbGRNb2RlbCkge1xyXG4gICAgICB0aGlzLl93YWl0Q2hhZ2VNb2RlbCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVPbGRNb2RlbCgpIHtcclxuICAgIGlmICghdGhpcy5fb2xkTW9kZWwpIHJldHVybjtcclxuICAgIHRoaXMuc2V0TW9kZWwodGhpcy5fb2xkTW9kZWwpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZU1vZGVsKCkge1xyXG4gICAgY29uc29sZS5sb2coXCLjgJBKWFJCUm9sZeOAkWNoYW5nZU1vZGVsXCIpO1xyXG4gICAgdGhpcy5fd2FpdENoYWdlTW9kZWwgPSBmYWxzZTtcclxuICAgIHRoaXMuZW50aXR5LnNrZWxldG9uLnNrZWxldG9uRGF0YSA9XHJcbiAgICAgIHRoaXMuZW50aXR5LmNtZC5hc3NldE1hbmFnZXIuYXNzZXRJbXBsLmdldFByZUxvYWRBc3NldDxzcC5Ta2VsZXRvbkRhdGE+KFxyXG4gICAgICAgIHRoaXMuX2N1ck1vZGVsXHJcbiAgICAgICk7XHJcbiAgICB0aGlzLmVudGl0eS5jaGFuZ2VTdGF0ZShKWEVTdGF0ZS5JZGxlLCB0cnVlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBKWFJCUm9sZSBleHRlbmRzIENDTm9kZUltcGwgaW1wbGVtZW50cyBJQ29tTGlrZSB7XHJcbiAgLyoqIOS9jee9ruS/oeaBryAqL1xyXG4gIHB1YmxpYyBpS2V5OiBudW1iZXI7XHJcbiAgLyoqIOinkuiJsklEICovXHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgLyoqIOmqqOmqvOWKqOeUuyAqL1xyXG4gIHB1YmxpYyBza2VsZXRvbjogc3AuU2tlbGV0b247XHJcbiAgcHVibGljIGVmZmVjdFNrZWxldG9uOiBzcC5Ta2VsZXRvbjtcclxuICBwdWJsaWMgdlNwZWVkOiBjYy5WZWMyID0gY2MuVmVjMi5aRVJPO1xyXG4gIHByaXZhdGUgX2JpcnRoUG9zOiBjYy5WZWMyID0gY2MuVmVjMi5aRVJPO1xyXG4gIHB1YmxpYyBnZXQgYmlydGhQb3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYmlydGhQb3M7XHJcbiAgfVxyXG4gIHB1YmxpYyBhaXJQb3M6IGNjLlZlYzIgPSBudWxsO1xyXG4gIHB1YmxpYyBfbmFtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgcm9hZFBvczogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgaW5kZXg6IG51bWJlciB9W10gPSBudWxsO1xyXG4gIHByaXZhdGUgc3RhcnRQb3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSA9IG51bGw7XHJcbiAgcHVibGljIGlzQmFuTW92ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2lzQm9ybjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBzZXQgaXNCb3JuKHY6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzQm9ybiA9IHY7XHJcbiAgfVxyXG4gIC8qKiDliqjkvZzpmJ/liJcgKi9cclxuICBwcm90ZWN0ZWQgX2FjdGlvbkxpc3Q6IGNjLkFjdGlvbltdO1xyXG5cclxuICAvKiog54q25oCB5py6ICovXHJcbiAgcHVibGljIGZzbTogRmluaXRlU3RhdGVNYWNoaW5lPEpYUkJSb2xlLCBKWEVTdGF0ZT47XHJcbiAgcHJvdGVjdGVkIF9pZGxlU3Q6IEpYSURsZVN0O1xyXG4gIHByb3RlY3RlZCBfcnVuU3Q6IEpYUnVuU3Q7XHJcbiAgcHJvdGVjdGVkIF9kZWF0aFN0OiBKWERlYXRoU3Q7XHJcbiAgcHJvdGVjdGVkIF9nbG9iYWxTdDogSlhHU3Q7XHJcbiAgcHJvdGVjdGVkIF90YWtlb2ZmU3Q6IEpYVGFrZW9mZlN0O1xyXG4gIHByb3RlY3RlZCBfZmx5U3Q6IEpYRmx5U3Q7XHJcbiAgcHJvdGVjdGVkIF9vdmVybGF5U3Q6IEpYT3ZlcmxheVN0O1xyXG4gIHByb3RlY3RlZCBfaGl0U3Q6IEpYSGl0U3Q7XHJcbiAgcHVibGljIGNtZDogSlhSQkNtZE1ncjtcclxuICBwcm90ZWN0ZWQgX2RpcjogSlhFRGlyO1xyXG4gIHByb3RlY3RlZCBwbGF5ZXI6IEpYUkJQbGF5ZXI7XHJcbiAgcHVibGljIGdldCBwbGF5ZXJJZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnBsYXllci5wbGF5ZXJJZDtcclxuICB9XHJcbiAgcHJvdGVjdGVkIF9tb3ZlVGltZTogbnVtYmVyID0gMC4zO1xyXG4gIHByb3RlY3RlZCBfZmx5VGltZTogbnVtYmVyID0gMTtcclxuICBwcm90ZWN0ZWQga25vY2tQb3M6IGNjLlZlYzIgPSBudWxsO1xyXG4gIHByaXZhdGUgX3RvdWNoQ2IgPSBudWxsO1xyXG4gIHB1YmxpYyBzZXRUb3VjaENiKHYpIHtcclxuICAgIHRoaXMuX3RvdWNoQ2IgPSB2O1xyXG4gIH1cclxuICBjb25zdHJ1Y3RvcihvYmplY3Q6IGNjLk5vZGUpIHtcclxuICAgIHN1cGVyKG9iamVjdCk7XHJcbiAgICB0aGlzLl9hY3Rpb25MaXN0ID0gW107XHJcbiAgICB0aGlzLnNrZWxldG9uID0gb2JqZWN0LmdldENoaWxkQnlOYW1lKFwic2tlbGV0b25cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgIHRoaXMuZWZmZWN0U2tlbGV0b24gPSBvYmplY3RcclxuICAgICAgLmdldENoaWxkQnlOYW1lKFwieWFud3VcIilcclxuICAgICAgLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICBpZiAoIXRoaXMuc2tlbGV0b24pIHtcclxuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCd0aGUgSlhDbGllbnRSb2xlIGluc3RhbnRpYXRlIGZhaWxlZCEgYmVjYXVzZSBvZiB0aGUgcm9sZSB0YXJnZXROb2RlIG1pc3NpbmcgY29tcG9uZW50OiBzcC5Ta2VsZXRvbiEnKTtcclxuICAgICAgLy8g5aaC5p6c5rKh5pyJ6buY6K6k55qE6aqo6aq857uE5Lu277yM5YiZ6KGo56S66L+Z5piv5LiA5Liq546v5aKD5a+56LGhXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2tlbGV0b24uc2V0RXZlbnRMaXN0ZW5lcihcclxuICAgICAgKHRyYWNrOiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudDogc3Auc3BpbmUuRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uU2tFdmVudExpc3Rlbih0aGlzLnNrZWxldG9uLCB0cmFjaywgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoq5Yid5aeL5YyW54q25oCB5py6ICovXHJcbiAgcHVibGljIGluaXRTdGF0ZSgpIHtcclxuICAgIHRoaXMuZnNtID0gbmV3IEZpbml0ZVN0YXRlTWFjaGluZTxKWFJCUm9sZSwgSlhFU3RhdGU+KHRoaXMpO1xyXG4gICAgdGhpcy5fcnVuU3QgPSBuZXcgSlhSdW5TdCgpO1xyXG4gICAgdGhpcy5faWRsZVN0ID0gbmV3IEpYSURsZVN0KCk7XHJcbiAgICB0aGlzLl9kZWF0aFN0ID0gbmV3IEpYRGVhdGhTdCgpO1xyXG4gICAgdGhpcy5fdGFrZW9mZlN0ID0gbmV3IEpYVGFrZW9mZlN0KCk7XHJcbiAgICB0aGlzLl9mbHlTdCA9IG5ldyBKWEZseVN0KCk7XHJcbiAgICB0aGlzLl9vdmVybGF5U3QgPSBuZXcgSlhPdmVybGF5U3QoKTtcclxuICAgIHRoaXMuX2hpdFN0ID0gbmV3IEpYSGl0U3QoKTtcclxuICAgIHRoaXMuZnNtLnJlZ2lzdGVyU3RhdGUodGhpcy5fdGFrZW9mZlN0KTtcclxuICAgIHRoaXMuZnNtLnJlZ2lzdGVyU3RhdGUodGhpcy5faGl0U3QpO1xyXG4gICAgdGhpcy5mc20ucmVnaXN0ZXJTdGF0ZSh0aGlzLl9mbHlTdCk7XHJcbiAgICB0aGlzLmZzbS5yZWdpc3RlclN0YXRlKHRoaXMuX292ZXJsYXlTdCk7XHJcbiAgICB0aGlzLmZzbS5yZWdpc3RlclN0YXRlKHRoaXMuX3J1blN0KTtcclxuICAgIHRoaXMuZnNtLnJlZ2lzdGVyU3RhdGUodGhpcy5faWRsZVN0KTtcclxuICAgIHRoaXMuZnNtLnJlZ2lzdGVyU3RhdGUodGhpcy5fZGVhdGhTdCk7XHJcbiAgICB0aGlzLl9nbG9iYWxTdCA9IG5ldyBKWEdTdCgpO1xyXG4gICAgdGhpcy5mc20ucmVnaXN0ZXJTdGF0ZSh0aGlzLl9nbG9iYWxTdCk7XHJcbiAgICB0aGlzLmZzbS5zZXRHbG9iYWxTdGF0ZSh0aGlzLl9nbG9iYWxTdCk7XHJcbiAgICB0aGlzLmluaXRFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRFdmVudCgpIHtcclxuICAgIHRoaXMudGFyZ2V0Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgfVxyXG4gIHB1YmxpYyBfb25Ub3VjaEVuZCgpIHtcclxuICAgIGlmICh0aGlzLmVmZmVjdFNrZWxldG9uLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwi44CQSlhSQlJvbGXjgJHlr7vmib7kvY3nva5cIiwgdGhpcy5uYW1lLCB0aGlzLl90b3VjaENiKTtcclxuICAgICAgQXVkaW9NZ3IuSW5zKCkucGxheUVmZmVjdChSZXMuY29tbW9uLmF1ZGlvLmZlaWppKTtcclxuICAgICAgbGV0IHJvbGVzID0gdGhpcy5jbWQuZ2V0Um9sZXMoKHJvbGUpID0+IHtcclxuICAgICAgICByZXR1cm4gcm9sZS5kaXIgPT0gdGhpcy5fZGlyO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHRoaXMuX3RvdWNoQ2IpIHtcclxuICAgICAgICB0aGlzLnBsYXllci5tb3ZlQWN0aW9uKFxyXG4gICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdG91Y2hDYigpO1xyXG4gICAgICAgICAgICByb2xlcy5mb3JFYWNoKChyb2xlOiBKWFJCUm9sZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHJvbGUuc2V0VG91Y2hDYihudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgNlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubW92ZUFjdGlvbih0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBsYXllci5kb1NraWxsQWN0aW9uVGltZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoq5pi+56S65Y+v5Lul56e75Yqo55qE5pWI5p6cICovXHJcbiAgcHVibGljIHNob3dDYW5Nb3ZlQW5pKG51bTogbnVtYmVyLCBpc0JhblRha2VPZmY6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgbGV0IGlzQmFuTW92ZSA9IHRoaXMuaXNCYW5Nb3ZlO1xyXG4gICAgaWYgKHRoaXMuZ2V0Q3VyU3RhdGUoKSA9PT0gSlhFU3RhdGUuRGVhdGgpIHJldHVybjtcclxuICAgIGlmIChudW0gPT09IDYpIHtcclxuICAgICAgaWYgKCF0aGlzLl9pc0Jvcm4pIHtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrZWxldG9uLm5vZGUuYWN0aXZlID0gIWlzQmFuVGFrZU9mZjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrZWxldG9uLm5vZGUuYWN0aXZlID0gIWlzQmFuTW92ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLl9pc0Jvcm4pIHtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrZWxldG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTa2VsZXRvbi5ub2RlLmFjdGl2ZSA9ICFpc0Jhbk1vdmU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZWZmZWN0U2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsIFwiemlzZVwiLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaWRlQ2FuTW92ZUFuaSgpIHtcclxuICAgIHRoaXMuZWZmZWN0U2tlbGV0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICB9XHJcbiAgLyoq57uR5a6aICovXHJcbiAgcHVibGljIGJpbmRQbGF5ZXIocGxheWVyOiBKWFJCUGxheWVyKSB7XHJcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICB9XHJcblxyXG4gIC8qKuiuvue9rumYteiQpSAqL1xyXG4gIHB1YmxpYyBzZXREaXIoZGlyOiBKWEVEaXIpIHtcclxuICAgIHRoaXMuX2RpciA9IGRpcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGlyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpcjtcclxuICB9XHJcblxyXG4gIC8qKiDojrflj5blvZPliY3nirbmgIEgKi9cclxuICBwdWJsaWMgZ2V0Q3VyU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5mc20uZ2V0Q3VyU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKuiuvue9ruaooeWeiyAqL1xyXG4gIHB1YmxpYyBzZXRNb2RlbChtb2RlbDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9nbG9iYWxTdC5zZXRNb2RlbChtb2RlbCk7XHJcbiAgfVxyXG5cclxuICAvKirpo57mnLrorr7nva7lh7rnlJ/ngrkgKi9cclxuICBwdWJsaWMgc2V0QmlydGhQb3MoYmlydGhQb3M6IGNjLlZlYzIpIHtcclxuICAgIHRoaXMucG9zaXRpb24gPSBiaXJ0aFBvcztcclxuICAgIHRoaXMuX2JpcnRoUG9zID0gdGhpcy5wb3NpdGlvbjtcclxuICB9XHJcbiAgcHVibGljIHNldEFuZ2xlKGFuZ2xlOiBudW1iZXIpIHtcclxuICAgIHRoaXMudGFyZ2V0LmFuZ2xlID0gYW5nbGU7XHJcbiAgfVxyXG5cclxuICAvKirorr7nva7ooYzov5vot6/lvoQgKi9cclxuICBwdWJsaWMgc2V0Um9hZFBvcyhhcnI6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IGluZGV4OiBudW1iZXIgfVtdKSB7XHJcbiAgICB0aGlzLnJvYWRQb3MgPSBPQkpFQ1RfQ09QWShhcnIpO1xyXG4gIH1cclxuXHJcbiAgLyoq6K6+572u6LW36aOe54K5Ki9cclxuICBwdWJsaWMgc2V0U3RhcnRQb3MocG9zOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pIHtcclxuICAgIHRoaXMuc3RhcnRQb3MgPSBwb3M7XHJcbiAgfVxyXG5cclxuICAvKirmlLnlj5jnirbmgIEgKi9cclxuICBwdWJsaWMgY2hhbmdlU3RhdGUoc3RhdGU6IEpYRVN0YXRlLCBmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIuOAkEpYUkJSb2xl44CRY2hhbmdlU3RhdGUgXCIgKyBzdGF0ZSk7XHJcbiAgICB0aGlzLmZzbS5jaGFuZ2VTdGF0ZShzdGF0ZSwgZm9yY2UpO1xyXG4gIH1cclxuXHJcbiAgLyoq56Gu6K6k5piv5ZCm6LW36aOeICovXHJcbiAgcHVibGljIGdldCBpc0Jvcm4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNCb3JuO1xyXG4gIH1cclxuXHJcbiAgLyoq6I635Y+W5b2T5YmN5L2N572u57Si5byVKi9cclxuICBwdWJsaWMgZ2V0IHJvYWRJbmRleCgpIHtcclxuICAgIGNvbnN0IGFyciA9IHRoaXMucm9hZFBvcy5tYXAoKHYpID0+IEpTT04uc3RyaW5naWZ5KHsgeDogdi54LCB5OiB2LnkgfSkpO1xyXG4gICAgcmV0dXJuIGFyci5pbmRleE9mKFxyXG4gICAgICBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgeDogTWF0aC5yb3VuZCh0aGlzLnBvc2l0aW9uLngpLFxyXG4gICAgICAgIHk6IE1hdGgucm91bmQodGhpcy5wb3NpdGlvbi55KSxcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyDpqqjpqrzluKfkuovku7ZcclxuICBwdWJsaWMgb25Ta0V2ZW50TGlzdGVuKFxyXG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uLFxyXG4gICAgdHJhY2s6IHNwLnNwaW5lLlRyYWNrRW50cnksXHJcbiAgICBldmVudDogc3Auc3BpbmUuRXZlbnRcclxuICApIHtcclxuICAgIGxldCBldmVudE5hbWUgPSBldmVudC5kYXRhLm5hbWU7XHJcbiAgICBjb25zb2xlLmxvZyh7IGV2ZW50TmFtZSB9KTtcclxuICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XHJcbiAgICAgIGNhc2UgXCJob21lXCI6IHtcclxuICAgICAgICBpZiAoIXRoaXMua25vY2tQb3MpIHJldHVybjtcclxuICAgICAgICBsZXQgaW5mbyA9IHNrZWxldG9uLmdldEFuaW1hdGlvbkluZm8oSlhFQW5pTmFtZXMuemh1YW5nZmVpKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLnRhcmdldClcclxuICAgICAgICAgIC50byhpbmZvLmR1cmF0aW9uLCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBjYy52Myh0aGlzLmtub2NrUG9zLngsIHRoaXMua25vY2tQb3MueSksXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuOAkEpYUkJSb2xl44CRb25Ta0V2ZW50TGlzdGVuIGhvbWUgY2hhbmdlU3RhdGVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoSlhFU3RhdGUuSWRsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmdldENoaWxkQnlOYW1lKFwidXBwZXJcIikuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnpJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmlzQmFuTW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgdGhpcy5rbm9ja1Bvcy54ID09PSB0aGlzLl9iaXJ0aFBvcy54ICYmXHJcbiAgICAgICAgICAgICAgdGhpcy5rbm9ja1Bvcy55ID09PSB0aGlzLl9iaXJ0aFBvcy55XHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2lzQm9ybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGFuZ2xlUG9zID0gQmlydGhBbmdsZVt0aGlzLl9kaXJdO1xyXG4gICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudGFyZ2V0KS50bygwLjUsIHsgYW5nbGU6IGFuZ2xlUG9zIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb3JyZWN0QW5nbGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFuZU1vdmVFbmQoKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmtub2NrUG9zID0gbnVsbDtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoq6aOe5py66LW36aOeICovXHJcbiAgcHVibGljIHBsYW5lVGFrZU9mZihjYjogRnVuY3Rpb24pIHtcclxuICAgIGNvbnNvbGUubG9nKFwi44CQSlhSQlJvbGXjgJFwbGFuZVRha2VPZmYgSlhFU3RhdGUuVGFrZU9mZlwiKTtcclxuICAgIHRoaXMuY2hhbmdlU3RhdGUoSlhFU3RhdGUuVGFrZU9mZik7XHJcbiAgICBsZXQgYW5pID0gSlhFQW5pTmFtZXMucWlmZWk7XHJcbiAgICBsZXQgaW5mbyA9IHRoaXMuc2tlbGV0b24uZ2V0QW5pbWF0aW9uSW5mbyhhbmkpO1xyXG4gICAgbGV0IG1vdmVBY3Rpb246IGFueSA9IG5ldyBKWEJlemllclRvKGluZm8uZHVyYXRpb24sIFtcclxuICAgICAgdGhpcy5wb3NpdGlvbixcclxuICAgICAgY2MudjIodGhpcy5zdGFydFBvcy54LCB0aGlzLnN0YXJ0UG9zLnkpLFxyXG4gICAgICBjYy52Mih0aGlzLnN0YXJ0UG9zLngsIHRoaXMuc3RhcnRQb3MueSksXHJcbiAgICBdKTtcclxuICAgIHRoaXMuX2lzQm9ybiA9IHRydWU7XHJcbiAgICBsZXQgZW5kQ2IgPSBjYy5jYWxsRnVuYyhcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kaXIgPT09IEpYRURpci5SZWQgfHwgdGhpcy5fZGlyID09PSBKWEVEaXIuQmx1ZSkge1xyXG4gICAgICAgICAgY2MudHdlZW4odGhpcy50YXJnZXQpLmJ5KDAuNSwgeyBhbmdsZTogOTAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJvbGU6IEpYUkJSb2xlW10gPSB0aGlzLmNtZC5jaGVja0hhdmVQbGFuZUluSGVyZShcclxuICAgICAgICAgIHRoaXMudGFyZ2V0LnBvc2l0aW9uLFxyXG4gICAgICAgICAgdGhpcy5pZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHJvbGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuOAkEpYUkJSb2xl44CRcGxhbmVUYWtlT2ZmIEpYRVN0YXRlLk92ZXJsYXlcIik7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKEpYRVN0YXRlLk92ZXJsYXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuOAkEpYUkJSb2xl44CRcGxhbmVUYWtlT2ZmIEpYRVN0YXRlLklkbGVcIik7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKEpYRVN0YXRlLklkbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYigpO1xyXG4gICAgICB9LmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICBsZXQgc2VxID0gY2Muc2VxdWVuY2UobW92ZUFjdGlvbiwgZW5kQ2IpO1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oc2VxKTtcclxuICAgIC8vIHRoaXMudGFyZ2V0LnJ1bkFjdGlvbihzZXEpXHJcbiAgfVxyXG4gIC8qKuefq+ato+mjnuacuuinkuW6piAqL1xyXG4gIHB1YmxpYyBjb3JyZWN0QW5nbGUoY2I/KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIE1hdGgucm91bmQodGhpcy5wb3NpdGlvbi54KSA9PT0gTWF0aC5yb3VuZCh0aGlzLl9iaXJ0aFBvcy54KSAmJlxyXG4gICAgICBNYXRoLnJvdW5kKHRoaXMucG9zaXRpb24ueSkgPT09IE1hdGgucm91bmQodGhpcy5fYmlydGhQb3MueSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9pc0Jvcm4gPSBmYWxzZTtcclxuICAgICAgY2MudHdlZW4odGhpcy50YXJnZXQpXHJcbiAgICAgICAgLnRvKDAuNSwgeyBhbmdsZTogOTAgfSlcclxuICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICBjYiAmJiBjYigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgY3VySW5kZXggPSB0aGlzLnJvYWRJbmRleDtcclxuICAgICAgbGV0IG5leHRJbmRleCA9IGN1ckluZGV4ICsgMTtcclxuICAgICAgbGV0IHBvc0lkID0gdGhpcy5yb2FkUG9zW25leHRJbmRleF07XHJcbiAgICAgIGxldCBwb3NpdGlvbiA9IGNjLnYyKHBvc0lkLngsIHBvc0lkLnkpO1xyXG4gICAgICBsZXQgYW5nbGUgPSBNYXRoRXguZ2V0QW5nbGVYKFxyXG4gICAgICAgIGNjLnYyKHRoaXMudGFyZ2V0LnBvc2l0aW9uLngsIHRoaXMudGFyZ2V0LnBvc2l0aW9uLnkpLFxyXG4gICAgICAgIHBvc2l0aW9uXHJcbiAgICAgICk7XHJcbiAgICAgIGNjLnR3ZWVuKHRoaXMudGFyZ2V0KVxyXG4gICAgICAgIC50bygwLjUsIHsgYW5nbGU6IGFuZ2xlIH0pXHJcbiAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZUFuaW1hdGlvbihcclxuICAgIGFjdGlvbk5hbWU6IHN0cmluZyxcclxuICAgIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgIGNvbXBsZXRlQ2I/OiBhbnlcclxuICApOiBKWENMQWN0aW9uIHtcclxuICAgIGlmICghdGhpcy5za2VsZXRvbikgcmV0dXJuO1xyXG4gICAgbGV0IHRyYWNrID0gdGhpcy5za2VsZXRvbi5zZXRBbmltYXRpb24oMCwgYWN0aW9uTmFtZSwgbG9vcCk7XHJcbiAgICBpZiAoIWNvbXBsZXRlQ2IpIHtcclxuICAgICAgdGhpcy5za2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5za2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKGNvbXBsZXRlQ2IpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0cmFjaykge1xyXG4gICAgICBjYy5sb2coYOinkuiJsuagh+etviR7dGhpcy5pZH0s5ZCN5a2XJHt0aGlzLmlkfeaJvuS4jeWIsOWKqOS9nDpcIiArICR7YWN0aW9uTmFtZX1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IHRyYWNrOiB0cmFjaywgZHVyYXRpb246IHRyYWNrLmFuaW1hdGlvbi5kdXJhdGlvbiB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEFjdGlvblRvTWdyKFxyXG4gICAgaW1wbDogQ0NOb2RlSW1wbCxcclxuICAgIGFjdGlvbjogY2MuQWN0aW9uLFxyXG4gICAgcGF1c2U6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICk6IGNjLkFjdGlvbiB7XHJcbiAgICB0aGlzLmNtZC5idGxBY3Rpb25NZ3IuYWRkQWN0aW9uKGFjdGlvbiwgaW1wbCwgcGF1c2UpO1xyXG4gICAgcmV0dXJuIGFjdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRBY3Rpb24oYWN0aW9uOiBjYy5BY3Rpb24sIGlzUXVldWUgPSB0cnVlKSB7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGlmIChpc1F1ZXVlKSB7XHJcbiAgICAgICAgYWN0aW9uLnNldFRhZyhRVUVVRV9BQ1RJT05fVEFHKTtcclxuICAgICAgICB0aGlzLl9hY3Rpb25MaXN0LnB1c2goYWN0aW9uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNtZC5hZGRBY3Rpb24odGhpcywgYWN0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoq6I635Y+W57uT5p2f55qE54K5ICovXHJcbiAgcHVibGljIGdldFBsYW5lTW92ZUVuZFBvc2l0aW9uKGNvdW50OiBudW1iZXIsIGlzRGVsOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGxldCBjdXJJbmRleCA9IHRoaXMucm9hZEluZGV4O1xyXG4gICAgbGV0IHBvc0lkID0gbnVsbDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICBsZXQgbmV4dCA9IGN1ckluZGV4ICsgMTtcclxuICAgICAgbGV0IGxhc3QgPSBjdXJJbmRleCAtIDE7XHJcblxyXG4gICAgICBpZiAobmV4dCA8PSB0aGlzLnJvYWRQb3MubGVuZ3RoIC0gMSAmJiAhaXNEZWwpIHtcclxuICAgICAgICBwb3NJZCA9IHRoaXMucm9hZFBvc1tuZXh0XTtcclxuICAgICAgICBjdXJJbmRleCsrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlzRGVsID0gdHJ1ZTtcclxuICAgICAgICBwb3NJZCA9IHRoaXMucm9hZFBvc1tsYXN0XTtcclxuICAgICAgICBjdXJJbmRleC0tO1xyXG4gICAgICAgIGlmIChjdXJJbmRleCA8IDApIHtcclxuICAgICAgICAgIHBvc0lkID0gdGhpcy5zdGFydFBvcztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNjLnYyKHBvc0lkLngsIHBvc0lkLnkpO1xyXG4gIH1cclxuXHJcbiAgLyoq6aOe5py66aOe6KGMICovXHJcbiAgcHVibGljIHBsYW5lTW92ZShjb3VudDogbnVtYmVyLCBjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICBsZXQgY3VySW5kZXggPSB0aGlzLnJvYWRJbmRleDtcclxuICAgIGxldCBudW0gPSBjb3VudDtcclxuICAgIGxldCBhY3Rpb24gPSBbXTtcclxuICAgIGxldCBpc0RlbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5jbWQuY3VyVmlhID0gW107XHJcbiAgICBpZiAobnVtKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICBsZXQgbmV4dCA9IGN1ckluZGV4ICsgMTtcclxuICAgICAgICBsZXQgbGFzdCA9IGN1ckluZGV4IC0gMTtcclxuICAgICAgICBsZXQgcG9zOiBjYy5WZWMyID0gbnVsbDtcclxuICAgICAgICBsZXQgcG9zSWQgPSBudWxsO1xyXG4gICAgICAgIGlmIChuZXh0IDw9IHRoaXMucm9hZFBvcy5sZW5ndGggLSAxICYmICFpc0RlbCkge1xyXG4gICAgICAgICAgcG9zSWQgPSB0aGlzLnJvYWRQb3NbbmV4dF07XHJcbiAgICAgICAgICBjdXJJbmRleCsrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpc0RlbCA9IHRydWU7XHJcbiAgICAgICAgICBwb3NJZCA9IHRoaXMucm9hZFBvc1tsYXN0XTtcclxuICAgICAgICAgIGN1ckluZGV4LS07XHJcbiAgICAgICAgICBpZiAoY3VySW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGxldCBmbHlBY3Rpb246IGFueSA9IG5ldyBKWE1vdmVUbyhcclxuICAgICAgICAgICAgICB0aGlzLl9mbHlUaW1lLFxyXG4gICAgICAgICAgICAgIGNjLnYyKHRoaXMuc3RhcnRQb3MpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGxldCBlbmQgPSBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy50YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAuYnkoMC41LCB7IGFuZ2xlOiB0aGlzLnRhcmdldC5hbmdsZSB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgc2VxID0gY2Muc2VxdWVuY2UoZmx5QWN0aW9uLCBlbmQpO1xyXG4gICAgICAgICAgICBhY3Rpb24ucHVzaChzZXEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zID0gY2MudjIocG9zSWQpO1xyXG4gICAgICAgIGlmIChuZXh0IDw9IHRoaXMucm9hZFBvcy5sZW5ndGggLSA3ICYmIGkgIT0gbnVtIC0gMSkge1xyXG4gICAgICAgICAgdGhpcy5jbWQuY3VyVmlhLnB1c2gocG9zSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbW92ZUFjdGlvbjogYW55ID0gbmV3IEpYTW92ZVRvKHRoaXMuX21vdmVUaW1lLCBwb3MpO1xyXG4gICAgICAgIGFjdGlvbi5wdXNoKG1vdmVBY3Rpb24pO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBwb3M7XHJcbiAgICAgICAgaWYgKHRhcmdldCAmJiBpID09IG51bSAtIDEpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi44CQSlhSQlJvbGXjgJFwbGFuZU1vdmUgSlhFU3RhdGUuRmx5XCIpO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShKWEVTdGF0ZS5GbHkpO1xyXG4gICAgICAgICAgY3VySW5kZXggPSB0aGlzLnJvYWRQb3NcclxuICAgICAgICAgICAgLm1hcCgodikgPT4gSlNPTi5zdHJpbmdpZnkoeyB4OiB2LngsIHk6IHYueSB9KSlcclxuICAgICAgICAgICAgLmluZGV4T2YoXHJcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgeDogTWF0aC5yb3VuZCh0YXJnZXQueCksXHJcbiAgICAgICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHRhcmdldC55KSxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc3QgX2VuZCA9IHRoaXMucm9hZFBvc1tjdXJJbmRleCArIDFdO1xyXG4gICAgICAgICAgbGV0IGZseUFjdGlvbjogYW55ID0gbmV3IEpYTW92ZVRvKHRoaXMuX2ZseVRpbWUsIHRhcmdldCwgX2VuZCk7XHJcbiAgICAgICAgICBpZiAoY3VySW5kZXggPT09IDUpIHtcclxuICAgICAgICAgICAgY3VySW5kZXggPSAzMDtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gY2MudjIodGhpcy5yb2FkUG9zW2N1ckluZGV4XSk7XHJcbiAgICAgICAgICAgIGZseUFjdGlvbiA9IG5ldyBKWE1vdmVUbyh0aGlzLl9mbHlUaW1lLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5zaXhUaW1lID0gTWF4U2l4VGltZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGFjdGlvbi5wdXNoKGZseUFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQgZW5kQ2IgPSBjYy5jYWxsRnVuYyhcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYikgY2IoKTtcclxuICAgICAgICBzZWxmLnBsYW5lTW92ZUVuZCgpO1xyXG4gICAgICB9LmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICBhY3Rpb24ucHVzaChlbmRDYik7XHJcbiAgICBsZXQgc2VxID0gY2Muc2VxdWVuY2UoYWN0aW9uKTtcclxuICAgIGNvbnNvbGUubG9nKFwi44CQSlhSQlJvbGXjgJFwbGFuZU1vdmUgSlhFU3RhdGUuUnVuXCIpO1xyXG4gICAgdGhpcy5jaGFuZ2VTdGF0ZShKWEVTdGF0ZS5SdW4pO1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oc2VxKTtcclxuICB9XHJcblxyXG4gIC8qKumjnuacuuenu+WKqOe7k+adnyAqL1xyXG4gIHByb3RlY3RlZCBwbGFuZU1vdmVFbmQoKSB7XHJcbiAgICBsZXQgY3VySW5kZXggPSB0aGlzLnJvYWRJbmRleDtcclxuICAgIGlmIChjdXJJbmRleCA9PT0gdGhpcy5yb2FkUG9zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgbGV0IGxvY2FsID0gYOOAkCR7Uk9MRV9DT01QX05BTUVbdGhpcy5fZGlyXX3jgJEke3RoaXMuaWR95Yiw6L6+57uI54K5YDtcclxuICAgICAgY29uc29sZS5sb2cobG9jYWwpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIuOAkEpYUkJSb2xl44CRcGxhbmVNb3ZlRW5kIEpYRVN0YXRlLkRlYXRoXCIpO1xyXG4gICAgICB0aGlzLmNoYW5nZVN0YXRlKEpYRVN0YXRlLkRlYXRoKTtcclxuICAgICAgaWYgKHRoaXMuY21kLnNldERlYXRoUm9sZXModGhpcy5fZGlyLCB0aGlzLmlkKSkge1xyXG4gICAgICAgIHRoaXMuY21kLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNtZC5ldnRNZ3IucG9zdChDTXNnLmNsaWVudC5maWdodC5lbmRGaWdodCwgbmV3IEdQYXJhbSh0aGlzLl9kaXIpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy/liKTmlq3mmK/lkKbmnInpo57mnLrlnKjov5nkuKrkvY3nva7kuIpcclxuICAgICAgbGV0IHJvbGVzOiBKWFJCUm9sZVtdID0gdGhpcy5jbWQuY2hlY2tIYXZlUGxhbmVJbkhlcmUoXHJcbiAgICAgICAgbmV3IGNjLlZlYzIodGhpcy50YXJnZXQucG9zaXRpb24ueCwgdGhpcy50YXJnZXQucG9zaXRpb24ueSksXHJcbiAgICAgICAgdGhpcy5pZFxyXG4gICAgICApO1xyXG4gICAgICBpZiAocm9sZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcm9sZXMuZm9yRWFjaCgocm9sZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJvbGUuX2RpciA9PT0gdGhpcy5fZGlyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgIFwi44CQSlhSQlJvbGXjgJFwbGFuZU1vdmVFbmQgXCIgKyByb2xlcy5sZW5ndGggKyBcIiBKWEVTdGF0ZS5PdmVybGF5XCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShKWEVTdGF0ZS5PdmVybGF5KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5Ye76aOe6YC76L6R5aSE55CGXHJcbiAgICAgICAgICAgIGxldCBsb2NhbCA9IGDjgJAke1JPTEVfQ09NUF9OQU1FW3RoaXMuX2Rpcl1944CRJHt0aGlzLmlkfeWwhiR7XHJcbiAgICAgICAgICAgICAgcm9sZS5pZFxyXG4gICAgICAgICAgICB95pKe6aOeYDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobG9jYWwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICBcIuOAkEpYUkJSb2xl44CRcGxhbmVNb3ZlRW5kIFwiICsgcm9sZXMubGVuZ3RoICsgXCIgSlhFU3RhdGUuSWRsZVwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJvbGUucGxhbmVLbm9ja09mZigpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKEpYRVN0YXRlLklkbGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgXCLjgJBKWFJCUm9sZeOAkXBsYW5lTW92ZUVuZCBcIiArIHJvbGVzLmxlbmd0aCArIFwiIEpYRVN0YXRlLklkbGVcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShKWEVTdGF0ZS5JZGxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoq6aOe5py65pKe6aOeICovXHJcbiAgcHVibGljIHBsYW5lS25vY2tPZmYodGFyZ2V0PzogY2MuVmVjMikge1xyXG4gICAgQXVkaW9NZ3IuSW5zKCkucGxheUVmZmVjdChSZXMuY29tbW9uLmF1ZGlvLnpodWFuZ2ZlaSk7XHJcbiAgICBBdWRpb01nci5JbnMoKS5wbGF5RWZmZWN0KFJlcy5jb21tb24uYXVkaW8uaG91dHVpKTtcclxuICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgdGhpcy5rbm9ja1BvcyA9IHRhcmdldDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMua25vY2tQb3MgPSB0aGlzLl9iaXJ0aFBvcztcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwi44CQSlhSQlJvbGXjgJFwbGFuZUtub2NrT2ZmIEpYRVN0YXRlLkhpdFwiKTtcclxuICAgIHRoaXMuY2hhbmdlU3RhdGUoSlhFU3RhdGUuSGl0KTtcclxuICB9XHJcbiAgcHVibGljIG9uRW5kRGllKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuY21kLnJlbW92ZVJvbGUodGhpcy5pZCk7XHJcbiAgICB0aGlzLnBsYXllci5yZW1vdmVSb2xlKHRoaXMuaWQpO1xyXG4gICAgdGhpcy50YXJnZXQuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICBpZiAodGhpcy5mc20pIHtcclxuICAgICAgdGhpcy5mc20uRlNNVXBkYXRlKGR0KTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgIXRoaXMuY21kLmJ0bEFjdGlvbk1nci5oYXNRdWV1ZUFjdGlvbih0aGlzKSAmJlxyXG4gICAgICB0aGlzLl9hY3Rpb25MaXN0Lmxlbmd0aCA+IDBcclxuICAgICkge1xyXG4gICAgICB0aGlzLmFkZEFjdGlvblRvTWdyKHRoaXMsIHRoaXMuX2FjdGlvbkxpc3Quc2hpZnQoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkRlc3Ryb3koKSB7fVxyXG59XHJcbiJdfQ==