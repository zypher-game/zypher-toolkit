"use strict";
cc._RF.push(module, '7cd16kOurFLn4nnjX2yGw51', 'ActionEx');
// Script/Core/FrameEx/ActionEx.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JXActionMgr = exports.Shake = exports.JXFollow = exports.JXMoveTo = exports.JXMoveBy = exports.JXBezierTo = exports.JXBezierBy = exports.JXSpriteFrameAciton = exports.JXActionMsg = exports.QUEUE_ACTION_TAG = void 0;
var MathEx_1 = require("../Math/MathEx");
/** 运算模板 */
var vTpl1 = cc.Vec2.ZERO, vTpl2 = cc.Vec2.ZERO;
function callSuper(_father_, callFunc, object) {
    var _a;
    var others = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        others[_i - 3] = arguments[_i];
    }
    return (_a = _father_.prototype[callFunc]).call.apply(_a, __spreadArrays([object], others));
}
/** 序列动作标签 */
exports.QUEUE_ACTION_TAG = 1001;
exports.JXActionMsg = {
    action: {
        end: "JXActionMsg.action,end",
    },
};
var JXSpriteFrameAciton = /** @class */ (function (_super) {
    __extends(JXSpriteFrameAciton, _super);
    function JXSpriteFrameAciton(fps, sprites, loop) {
        if (loop === void 0) { loop = true; }
        var _this = _super.call(this) || this;
        _this.playOnce = false;
        _this.sprites = sprites;
        _this.lenth = _this.sprites.length;
        _this.fps = fps;
        var d = (1 / fps) * _this.lenth;
        callSuper(cc.ActionInterval, "initWithDuration", _this, d);
        _this.setOnce(!loop);
        return _this;
    }
    JXSpriteFrameAciton.prototype.setOnce = function (bOnce) {
        this.playOnce = bOnce;
        if (bOnce) {
        }
        else {
            this.repeatForever();
        }
        return this;
    };
    JXSpriteFrameAciton.prototype.startWithTarget = function (target) {
        callSuper(cc.ActionInterval, "startWithTarget", this, target);
        var sprite = target.getComponent(cc.Sprite);
        if (!sprite)
            return;
        this._sprite = sprite;
        this.curIndex = 0;
        this.curTime = 0;
    };
    JXSpriteFrameAciton.prototype.update = function (dt) {
        if (this.curIndex < this.lenth) {
            if (this._sprite.spriteFrame != this.sprites[this.curIndex]) {
                this._sprite.spriteFrame = this.sprites[this.curIndex];
            }
            this.curTime += dt;
            if (this.curTime >= 1 / this.fps) {
                this.curIndex++;
                this.curTime = 0;
            }
        }
    };
    return JXSpriteFrameAciton;
}(cc.ActionInterval));
exports.JXSpriteFrameAciton = JXSpriteFrameAciton;
function bezierAt(a, b, c, d, t) {
    return (Math.pow(1 - t, 3) * a +
        3 * t * Math.pow(1 - t, 2) * b +
        3 * Math.pow(t, 2) * (1 - t) * c +
        Math.pow(t, 3) * d);
}
/** 带方向的贝塞尔曲线运动， angle = 节点x轴方向和水平面的夹角 */
var JXBezierBy = /** @class */ (function (_super) {
    __extends(JXBezierBy, _super);
    function JXBezierBy(t, c, a) {
        if (a === void 0) { a = 0; }
        return _super.call(this, t, c) || this;
    }
    JXBezierBy.prototype.initWithDuration = function (t, c) {
        if (callSuper(cc.ActionInterval, "initWithDuration", this, t)) {
            this["_config"] = c;
            return true;
        }
        return false;
    };
    JXBezierBy.prototype.update = function (dt) {
        dt = callSuper(cc["BezierBy"], "_computeEaseTime", this, dt);
        var target = this["target"];
        if (target) {
            var locConfig = this["_config"];
            var xa = 0;
            var xb = locConfig[0].x;
            var xc = locConfig[1].x;
            var xd = locConfig[2].x;
            var ya = 0;
            var yb = locConfig[0].y;
            var yc = locConfig[1].y;
            var yd = locConfig[2].y;
            if (locConfig[3]) {
                xa = locConfig[0].x;
                xb = locConfig[1].x;
                xc = locConfig[2].x;
                xd = locConfig[3].x;
                ya = locConfig[0].y;
                yb = locConfig[1].y;
                yc = locConfig[2].y;
                yd = locConfig[3].y;
            }
            var x = bezierAt(xa, xb, xc, xd, dt);
            var y = bezierAt(ya, yb, yc, yd, dt);
            var locStartPosition = this["_startPosition"];
            (vTpl1.x = target.x), (vTpl1.y = target.y);
            if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
                var locPreviousPosition = this["_previousPosition"];
                locStartPosition.x =
                    locStartPosition.x + vTpl1.x - locPreviousPosition.x;
                locStartPosition.y =
                    locStartPosition.y + vTpl1.y - locPreviousPosition.y;
                x = x + locStartPosition.x;
                y = y + locStartPosition.y;
                locPreviousPosition.x = x;
                locPreviousPosition.y = y;
                target.setPosition(x, y);
                if (vTpl1.equals(locPreviousPosition))
                    return;
                var angle = MathEx_1.default.getAngleX(vTpl1, locPreviousPosition);
                target.angle = angle;
            }
            else {
                target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
                if (vTpl1.equals(locPreviousPosition))
                    return;
                var angle = MathEx_1.default.getAngleX(vTpl1, target.position);
                target.angle = angle;
            }
        }
    };
    return JXBezierBy;
}(cc.BezierBy));
exports.JXBezierBy = JXBezierBy;
var JXBezierTo = /** @class */ (function (_super) {
    __extends(JXBezierTo, _super);
    function JXBezierTo(t, c, a) {
        var _this = _super.call(this, t, c, a) || this;
        _this._toConfig = [];
        _this._toConfig = c;
        return _this;
    }
    JXBezierTo.prototype.initWithDuration = function (t, c) {
        if (callSuper(cc.ActionInterval, "initWithDuration", this, t)) {
            this["_config"] = c;
            return true;
        }
        return false;
    };
    JXBezierTo.prototype.startWithTarget = function (target) {
        callSuper(cc["BezierBy"], "startWithTarget", this, target);
        var locStartPos = this["_startPosition"];
        var locToConfig = this._toConfig;
        var locConfig = this["_config"];
        locConfig[0] = locToConfig[0].sub(locStartPos);
        locConfig[1] = locToConfig[1].sub(locStartPos);
        locConfig[2] = locToConfig[2].sub(locStartPos);
        if (locConfig[3]) {
            locConfig[3] = locToConfig[3].sub(locStartPos);
        }
    };
    return JXBezierTo;
}(JXBezierBy));
exports.JXBezierTo = JXBezierTo;
/** 带方向直线位移运动 */
var JXMoveBy = /** @class */ (function (_super) {
    __extends(JXMoveBy, _super);
    function JXMoveBy(t, c) {
        return _super.call(this, t, c) || this;
    }
    JXMoveBy.prototype.update = function (dt) {
        dt = callSuper(cc["BezierBy"], "_computeEaseTime", this, dt);
        var target = this["target"];
        if (target) {
            var x = this["_positionDelta"].x * dt;
            var y = this["_positionDelta"].y * dt;
            var locStartPosition = this["_startPosition"];
            (vTpl1.x = target.x), (vTpl1.y = target.y);
            if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
                var locPreviousPosition = this["_previousPosition"];
                locStartPosition.x =
                    locStartPosition.x + vTpl1.x - locPreviousPosition.x;
                locStartPosition.y =
                    locStartPosition.y + vTpl1.y - locPreviousPosition.y;
                x = x + locStartPosition.x;
                y = y + locStartPosition.y;
                locPreviousPosition.x = x;
                locPreviousPosition.y = y;
                target.setPosition(x, y);
                if (vTpl1.equals(locPreviousPosition))
                    return;
            }
            else {
                target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
                if (vTpl1.equals(locPreviousPosition))
                    return;
                var angle = MathEx_1.default.getAngleX(vTpl1, locPreviousPosition);
                target.angle = angle;
            }
        }
    };
    return JXMoveBy;
}(cc.MoveBy));
exports.JXMoveBy = JXMoveBy;
var JXMoveTo = /** @class */ (function (_super) {
    __extends(JXMoveTo, _super);
    function JXMoveTo(t, c, eEnd) {
        var _this = _super.call(this, t, c) || this;
        _this._endPosition = null;
        _this._eEnd = null;
        _this._endPosition = c;
        _this._eEnd = eEnd;
        return _this;
    }
    JXMoveTo.prototype.startWithTarget = function (target) {
        callSuper(cc.MoveBy, "startWithTarget", this, target);
        this["_positionDelta"].x = this._endPosition.x - target.x;
        this["_positionDelta"].y = this._endPosition.y - target.y;
        var _targetStr = JSON.stringify({
            x: Math.round(target.position.x),
            y: Math.round(target.position.y),
        });
        var _endPositionStr = JSON.stringify({
            x: Math.round(this._endPosition.x),
            y: Math.round(this._endPosition.y),
        });
        console.log({ _targetStr: _targetStr, _endPositionStr: _endPositionStr });
        var end = this._endPosition;
        if (this._eEnd && _targetStr === _endPositionStr) {
            console.log({ end: this._eEnd });
            end = cc.v2(this._eEnd.x, this._eEnd.y);
        }
        var angle = MathEx_1.default.getAngleX(cc.v2(target.position.x, target.position.y), end);
        target.angle = angle;
    };
    return JXMoveTo;
}(JXMoveBy));
exports.JXMoveTo = JXMoveTo;
var JXFollow = /** @class */ (function (_super) {
    __extends(JXFollow, _super);
    function JXFollow(followNode, followSpeed, offset) {
        var _this = _super.call(this) || this;
        _this._followNode = null;
        _this._followSpeed = null;
        _this._offset = null;
        _this._followNode = followNode;
        _this._followSpeed = followSpeed;
        _this._offset = offset;
        return _this;
    }
    JXFollow.prototype.step = function (dt) {
        var target = this["target"];
        var targetWorldPos = target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var followedWorldPos = this._followNode
            .convertToWorldSpaceAR(cc.Vec2.ZERO)
            .add(this._offset ? this._offset : cc.Vec2.ZERO);
        var angle = MathEx_1.default.getAngleX(targetWorldPos, followedWorldPos);
        target.angle = angle;
        var len = this._followSpeed * dt;
        var distance = targetWorldPos.sub(followedWorldPos).mag();
        if (len > distance)
            len = distance;
        var offset = MathEx_1.default.getAnglePos(angle, len);
        target.position = target.position.add(offset);
    };
    JXFollow.prototype.isDone = function () {
        var target = this["target"];
        var targetWorldPos = target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var followedWorldPos = this._followNode
            .convertToWorldSpaceAR(cc.Vec2.ZERO)
            .add(this._offset ? this._offset : cc.Vec2.ZERO);
        var distance = targetWorldPos.sub(followedWorldPos).mag();
        // let isDone = distance < 5
        // if (isDone) {
        //     cc.log("==========> follow done!")
        // }
        return distance < 5;
    };
    return JXFollow;
}(cc.Action));
exports.JXFollow = JXFollow;
var Shake = /** @class */ (function (_super) {
    __extends(Shake, _super);
    function Shake(duration, shakeStrengthX, shakeStrengthY) {
        var _this = _super.call(this) || this;
        //节点初始位置
        _this._nodeInitialPos = null;
        //X轴抖动幅度
        _this._shakeParams = [];
        _this._dir = 1;
        _this.initWithDuration(duration, shakeStrengthX, shakeStrengthY);
        return _this;
    }
    Shake.prototype.initShakeParams = function (shakeStrengthX, shakeStrengthY) {
        // if (shakeStrengthX > 0) {
        //     this._shakeParams[0] = 0;
        //     this._shakeParams[1] = shakeStrengthX;
        // }
        // else {
        //     this._shakeParams[0] = shakeStrengthX;
        //     this._shakeParams[1] = 0;
        // }
        // if (shakeStrengthY > 0) {
        //     this._shakeParams[2] = 0;
        //     this._shakeParams[3] = shakeStrengthY;
        // }
        // else {
        //     this._shakeParams[2] = shakeStrengthY;
        //     this._shakeParams[3] = 0;
        // }
        this._shakeParams[0] = shakeStrengthX;
        this._shakeParams[1] = shakeStrengthY;
    };
    //获取两个数间的随机值
    Shake.prototype.getRandomStrength = function (min, max) {
        return Math.random() * (max - min + 1) + min;
    };
    Shake.prototype.initWithDuration = function (duration, shakeStrengthX, shakeStrengthY) {
        if (callSuper(cc.ActionInterval, "initWithDuration", this, duration)) {
            this.initShakeParams(shakeStrengthX, shakeStrengthY);
            return true;
        }
        return false;
    };
    Shake.prototype.startWithTarget = function (target) {
        callSuper(cc.ActionInterval, "startWithTarget", this, target);
        this._nodeInitialPos = target.position;
    };
    Shake.prototype.stop = function () {
        var target = this["target"];
        target.position = this._nodeInitialPos;
    };
    return Shake;
}(cc.ActionInterval));
exports.Shake = Shake;
var JXActionMgr = /** @class */ (function (_super) {
    __extends(JXActionMgr, _super);
    function JXActionMgr() {
        var _this = _super.call(this) || this;
        _this._evt = null;
        return _this;
    }
    JXActionMgr.prototype.bindEvtMgr = function (evt) {
        this._evt = evt;
    };
    JXActionMgr.prototype.addTweenAction = function (tween) {
        if (!tween["_target"]) {
            cc.warn("Please set target to tween first");
            return this;
        }
        if (tween["_finalAction"]) {
            cc.director.getActionManager().removeAction(tween["_finalAction"]);
        }
        tween["_finalAction"] = tween["_union"]();
        this.addAction(tween["_finalAction"], tween["_target"], false);
    };
    JXActionMgr.prototype.addAction = function (action, target, paused) {
        if (paused === void 0) { paused = false; }
        if (!target._id) {
            target._id = target.wrapId;
        }
        if (!target._id) {
            cc.error("can not find target property: _id!");
            return;
        }
        if (action.getTag() == exports.QUEUE_ACTION_TAG) {
            target._hasQueueAction = true;
        }
        _super.prototype.addAction.call(this, action, target, paused);
    };
    JXActionMgr.prototype.removeAction = function (aciton, unCallBack) {
        if (unCallBack === void 0) { unCallBack = false; }
        if (!!aciton && this._evt) {
            this._evt.post(exports.JXActionMsg.action.end, aciton);
        }
        if (!unCallBack && aciton.__endCallBack) {
            aciton.__endCallBack();
            aciton.__endCallBack = null;
        }
        if (aciton.getTag() == exports.QUEUE_ACTION_TAG) {
            var target = aciton.getOriginalTarget();
            target["_hasQueueAction"] = false;
        }
        _super.prototype.removeAction.call(this, aciton);
    };
    JXActionMgr.prototype.getTargetAction = function (tag, target) {
        if (tag === cc.Action.TAG_INVALID)
            return;
        var element = this["_hashTargets"][target["_id"]];
        if (element) {
            if (element.actions != null) {
                for (var i = 0; i < element.actions.length; ++i) {
                    var action = element.actions[i];
                    if (action && action.getTag() === tag)
                        return action;
                }
            }
        }
        return null;
    };
    JXActionMgr.prototype.hasQueueAction = function (target) {
        return target._hasQueueAction;
    };
    JXActionMgr.prototype.hasAction = function () {
        var elements = this["_arrayTargets"];
        if (elements.length == 0)
            return false;
        for (var i = 0; i < elements.length; i++) {
            var actions = elements[i].actions;
            if (actions && actions.length > 0)
                return false;
        }
        return true;
    };
    return JXActionMgr;
}(cc.ActionManager));
exports.JXActionMgr = JXActionMgr;

cc._RF.pop();