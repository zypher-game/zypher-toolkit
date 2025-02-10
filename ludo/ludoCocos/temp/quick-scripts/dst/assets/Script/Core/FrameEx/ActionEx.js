
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/ActionEx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0FjdGlvbkV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEseUNBQW9DO0FBR3BDLFdBQVc7QUFDWCxJQUFJLEtBQUssR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFDL0IsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBRXZCLFNBQVMsU0FBUyxDQUNoQixRQUFhLEVBQ2IsUUFBZ0IsRUFDaEIsTUFBVzs7SUFDWCxnQkFBZ0I7U0FBaEIsVUFBZ0IsRUFBaEIscUJBQWdCLEVBQWhCLElBQWdCO1FBQWhCLCtCQUFnQjs7SUFFaEIsT0FBTyxDQUFBLEtBQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDLElBQUksMkJBQUMsTUFBTSxHQUFLLE1BQU0sR0FBRTtBQUM5RCxDQUFDO0FBRUQsYUFBYTtBQUNBLFFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBRXhCLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLE1BQU0sRUFBRTtRQUNOLEdBQUcsRUFBRSx3QkFBd0I7S0FDOUI7Q0FDRixDQUFDO0FBRUY7SUFBeUMsdUNBQWlCO0lBU3hELDZCQUFZLEdBQVcsRUFBRSxPQUF5QixFQUFFLElBQVc7UUFBWCxxQkFBQSxFQUFBLFdBQVc7UUFBL0QsWUFDRSxpQkFBTyxTQU9SO1FBZE0sY0FBUSxHQUFZLEtBQUssQ0FBQztRQVEvQixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQztRQUMv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UUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNsQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7U0FDakQ7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxrQkFBQztBQUFELENBOUVBLEFBOEVDLENBOUVnQyxFQUFFLENBQUMsYUFBYSxHQThFaEQ7QUE5RVksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKWEVEaXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9WaWV3cy9GaWdodC9KWFVMRGVmaW5lXCI7XHJcbmltcG9ydCBHRXZlbnRTeXN0ZW0gZnJvbSBcIi4uL0dFdmVudC9HRXZlbnRTeXN0ZW1cIjtcclxuaW1wb3J0IE1hdGhFeCBmcm9tIFwiLi4vTWF0aC9NYXRoRXhcIjtcclxuaW1wb3J0IHsgQ0NOb2RlSW1wbCB9IGZyb20gXCIuL0NDTm9kZUltcGxcIjtcclxuXHJcbi8qKiDov5DnrpfmqKHmnb8gKi9cclxubGV0IHZUcGwxOiBjYy5WZWMyID0gY2MuVmVjMi5aRVJPLFxyXG4gIHZUcGwyID0gY2MuVmVjMi5aRVJPO1xyXG5cclxuZnVuY3Rpb24gY2FsbFN1cGVyKFxyXG4gIF9mYXRoZXJfOiBhbnksXHJcbiAgY2FsbEZ1bmM6IHN0cmluZyxcclxuICBvYmplY3Q6IGFueSxcclxuICAuLi5vdGhlcnM6IGFueVtdXHJcbikge1xyXG4gIHJldHVybiBfZmF0aGVyXy5wcm90b3R5cGVbY2FsbEZ1bmNdLmNhbGwob2JqZWN0LCAuLi5vdGhlcnMpO1xyXG59XHJcblxyXG4vKiog5bqP5YiX5Yqo5L2c5qCH562+ICovXHJcbmV4cG9ydCBjb25zdCBRVUVVRV9BQ1RJT05fVEFHID0gMTAwMTtcclxuXHJcbmV4cG9ydCBjb25zdCBKWEFjdGlvbk1zZyA9IHtcclxuICBhY3Rpb246IHtcclxuICAgIGVuZDogXCJKWEFjdGlvbk1zZy5hY3Rpb24sZW5kXCIsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBKWFNwcml0ZUZyYW1lQWNpdG9uIGV4dGVuZHMgY2MuQWN0aW9uSW50ZXJ2YWwge1xyXG4gIHB1YmxpYyBzcHJpdGVzOiBjYy5TcHJpdGVGcmFtZVtdO1xyXG4gIHByb3RlY3RlZCBfc3ByaXRlOiBjYy5TcHJpdGU7XHJcbiAgcHVibGljIHBsYXlPbmNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGxlbnRoOiBudW1iZXI7XHJcbiAgcHVibGljIGZwczogbnVtYmVyO1xyXG4gIHB1YmxpYyBjdXJJbmRleDogbnVtYmVyO1xyXG4gIHB1YmxpYyBjdXJUaW1lOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGZwczogbnVtYmVyLCBzcHJpdGVzOiBjYy5TcHJpdGVGcmFtZVtdLCBsb29wID0gdHJ1ZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3ByaXRlcyA9IHNwcml0ZXM7XHJcbiAgICB0aGlzLmxlbnRoID0gdGhpcy5zcHJpdGVzLmxlbmd0aDtcclxuICAgIHRoaXMuZnBzID0gZnBzO1xyXG4gICAgbGV0IGQgPSAoMSAvIGZwcykgKiB0aGlzLmxlbnRoO1xyXG4gICAgY2FsbFN1cGVyKGNjLkFjdGlvbkludGVydmFsLCBcImluaXRXaXRoRHVyYXRpb25cIiwgdGhpcywgZCk7XHJcbiAgICB0aGlzLnNldE9uY2UoIWxvb3ApO1xyXG4gIH1cclxuXHJcbiAgc2V0T25jZShiT25jZTogYm9vbGVhbik6IEpYU3ByaXRlRnJhbWVBY2l0b24ge1xyXG4gICAgdGhpcy5wbGF5T25jZSA9IGJPbmNlO1xyXG4gICAgaWYgKGJPbmNlKSB7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlcGVhdEZvcmV2ZXIoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRXaXRoVGFyZ2V0KHRhcmdldDogQ0NOb2RlSW1wbCkge1xyXG4gICAgY2FsbFN1cGVyKGNjLkFjdGlvbkludGVydmFsLCBcInN0YXJ0V2l0aFRhcmdldFwiLCB0aGlzLCB0YXJnZXQpO1xyXG4gICAgbGV0IHNwcml0ZSA9IHRhcmdldC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgIGlmICghc3ByaXRlKSByZXR1cm47XHJcbiAgICB0aGlzLl9zcHJpdGUgPSBzcHJpdGU7XHJcbiAgICB0aGlzLmN1ckluZGV4ID0gMDtcclxuICAgIHRoaXMuY3VyVGltZSA9IDA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuY3VySW5kZXggPCB0aGlzLmxlbnRoKSB7XHJcbiAgICAgIGlmICh0aGlzLl9zcHJpdGUuc3ByaXRlRnJhbWUgIT0gdGhpcy5zcHJpdGVzW3RoaXMuY3VySW5kZXhdKSB7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVzW3RoaXMuY3VySW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY3VyVGltZSArPSBkdDtcclxuICAgICAgaWYgKHRoaXMuY3VyVGltZSA+PSAxIC8gdGhpcy5mcHMpIHtcclxuICAgICAgICB0aGlzLmN1ckluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5jdXJUaW1lID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYmV6aWVyQXQoYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyLCB0OiBudW1iZXIpIHtcclxuICByZXR1cm4gKFxyXG4gICAgTWF0aC5wb3coMSAtIHQsIDMpICogYSArXHJcbiAgICAzICogdCAqIE1hdGgucG93KDEgLSB0LCAyKSAqIGIgK1xyXG4gICAgMyAqIE1hdGgucG93KHQsIDIpICogKDEgLSB0KSAqIGMgK1xyXG4gICAgTWF0aC5wb3codCwgMykgKiBkXHJcbiAgKTtcclxufVxyXG5cclxuLyoqIOW4puaWueWQkeeahOi0neWhnuWwlOabsue6v+i/kOWKqO+8jCBhbmdsZSA9IOiKgueCuXjovbTmlrnlkJHlkozmsLTlubPpnaLnmoTlpLnop5IgKi9cclxuZXhwb3J0IGNsYXNzIEpYQmV6aWVyQnkgZXh0ZW5kcyBjYy5CZXppZXJCeSB7XHJcbiAgY29uc3RydWN0b3IodDogbnVtYmVyLCBjOiBjYy5WZWMyW10sIGE6IG51bWJlciA9IDApIHtcclxuICAgIHN1cGVyKHQsIGMpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFdpdGhEdXJhdGlvbih0OiBudW1iZXIsIGM6IGNjLlZlYzJbXSkge1xyXG4gICAgaWYgKGNhbGxTdXBlcihjYy5BY3Rpb25JbnRlcnZhbCwgXCJpbml0V2l0aER1cmF0aW9uXCIsIHRoaXMsIHQpKSB7XHJcbiAgICAgIHRoaXNbXCJfY29uZmlnXCJdID0gYztcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgZHQgPSBjYWxsU3VwZXIoY2NbXCJCZXppZXJCeVwiXSwgXCJfY29tcHV0ZUVhc2VUaW1lXCIsIHRoaXMsIGR0KTtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzW1widGFyZ2V0XCJdIGFzIENDTm9kZUltcGw7XHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgIHZhciBsb2NDb25maWcgPSB0aGlzW1wiX2NvbmZpZ1wiXTtcclxuICAgICAgdmFyIHhhID0gMDtcclxuICAgICAgdmFyIHhiID0gbG9jQ29uZmlnWzBdLng7XHJcbiAgICAgIHZhciB4YyA9IGxvY0NvbmZpZ1sxXS54O1xyXG4gICAgICB2YXIgeGQgPSBsb2NDb25maWdbMl0ueDtcclxuXHJcbiAgICAgIHZhciB5YSA9IDA7XHJcbiAgICAgIHZhciB5YiA9IGxvY0NvbmZpZ1swXS55O1xyXG4gICAgICB2YXIgeWMgPSBsb2NDb25maWdbMV0ueTtcclxuICAgICAgdmFyIHlkID0gbG9jQ29uZmlnWzJdLnk7XHJcblxyXG4gICAgICBpZiAobG9jQ29uZmlnWzNdKSB7XHJcbiAgICAgICAgeGEgPSBsb2NDb25maWdbMF0ueDtcclxuICAgICAgICB4YiA9IGxvY0NvbmZpZ1sxXS54O1xyXG4gICAgICAgIHhjID0gbG9jQ29uZmlnWzJdLng7XHJcbiAgICAgICAgeGQgPSBsb2NDb25maWdbM10ueDtcclxuICAgICAgICB5YSA9IGxvY0NvbmZpZ1swXS55O1xyXG4gICAgICAgIHliID0gbG9jQ29uZmlnWzFdLnk7XHJcbiAgICAgICAgeWMgPSBsb2NDb25maWdbMl0ueTtcclxuICAgICAgICB5ZCA9IGxvY0NvbmZpZ1szXS55O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgeCA9IGJlemllckF0KHhhLCB4YiwgeGMsIHhkLCBkdCk7XHJcbiAgICAgIHZhciB5ID0gYmV6aWVyQXQoeWEsIHliLCB5YywgeWQsIGR0KTtcclxuXHJcbiAgICAgIHZhciBsb2NTdGFydFBvc2l0aW9uID0gdGhpc1tcIl9zdGFydFBvc2l0aW9uXCJdO1xyXG4gICAgICAodlRwbDEueCA9IHRhcmdldC54KSwgKHZUcGwxLnkgPSB0YXJnZXQueSk7XHJcbiAgICAgIGlmIChjYy5tYWNyby5FTkFCTEVfU1RBQ0tBQkxFX0FDVElPTlMpIHtcclxuICAgICAgICB2YXIgbG9jUHJldmlvdXNQb3NpdGlvbiA9IHRoaXNbXCJfcHJldmlvdXNQb3NpdGlvblwiXTtcclxuICAgICAgICBsb2NTdGFydFBvc2l0aW9uLnggPVxyXG4gICAgICAgICAgbG9jU3RhcnRQb3NpdGlvbi54ICsgdlRwbDEueCAtIGxvY1ByZXZpb3VzUG9zaXRpb24ueDtcclxuICAgICAgICBsb2NTdGFydFBvc2l0aW9uLnkgPVxyXG4gICAgICAgICAgbG9jU3RhcnRQb3NpdGlvbi55ICsgdlRwbDEueSAtIGxvY1ByZXZpb3VzUG9zaXRpb24ueTtcclxuICAgICAgICB4ID0geCArIGxvY1N0YXJ0UG9zaXRpb24ueDtcclxuICAgICAgICB5ID0geSArIGxvY1N0YXJ0UG9zaXRpb24ueTtcclxuICAgICAgICBsb2NQcmV2aW91c1Bvc2l0aW9uLnggPSB4O1xyXG4gICAgICAgIGxvY1ByZXZpb3VzUG9zaXRpb24ueSA9IHk7XHJcbiAgICAgICAgdGFyZ2V0LnNldFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgICAgIGlmICh2VHBsMS5lcXVhbHMobG9jUHJldmlvdXNQb3NpdGlvbikpIHJldHVybjtcclxuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoRXguZ2V0QW5nbGVYKHZUcGwxLCBsb2NQcmV2aW91c1Bvc2l0aW9uKTtcclxuICAgICAgICB0YXJnZXQuYW5nbGUgPSBhbmdsZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0YXJnZXQuc2V0UG9zaXRpb24obG9jU3RhcnRQb3NpdGlvbi54ICsgeCwgbG9jU3RhcnRQb3NpdGlvbi55ICsgeSk7XHJcbiAgICAgICAgaWYgKHZUcGwxLmVxdWFscyhsb2NQcmV2aW91c1Bvc2l0aW9uKSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGhFeC5nZXRBbmdsZVgodlRwbDEsIHRhcmdldC5wb3NpdGlvbik7XHJcbiAgICAgICAgdGFyZ2V0LmFuZ2xlID0gYW5nbGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBKWEJlemllclRvIGV4dGVuZHMgSlhCZXppZXJCeSB7XHJcbiAgcHJvdGVjdGVkIF90b0NvbmZpZyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0OiBudW1iZXIsIGM6IGNjLlZlYzJbXSwgYT86IG51bWJlcikge1xyXG4gICAgc3VwZXIodCwgYywgYSk7XHJcbiAgICB0aGlzLl90b0NvbmZpZyA9IGM7XHJcbiAgfVxyXG5cclxuICBpbml0V2l0aER1cmF0aW9uKHQ6IG51bWJlciwgYzogY2MuVmVjMltdKSB7XHJcbiAgICBpZiAoY2FsbFN1cGVyKGNjLkFjdGlvbkludGVydmFsLCBcImluaXRXaXRoRHVyYXRpb25cIiwgdGhpcywgdCkpIHtcclxuICAgICAgdGhpc1tcIl9jb25maWdcIl0gPSBjO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0YXJ0V2l0aFRhcmdldCh0YXJnZXQ6IGNjLk5vZGUpIHtcclxuICAgIGNhbGxTdXBlcihjY1tcIkJlemllckJ5XCJdLCBcInN0YXJ0V2l0aFRhcmdldFwiLCB0aGlzLCB0YXJnZXQpO1xyXG4gICAgdmFyIGxvY1N0YXJ0UG9zID0gdGhpc1tcIl9zdGFydFBvc2l0aW9uXCJdO1xyXG4gICAgdmFyIGxvY1RvQ29uZmlnID0gdGhpcy5fdG9Db25maWc7XHJcbiAgICB2YXIgbG9jQ29uZmlnID0gdGhpc1tcIl9jb25maWdcIl07XHJcbiAgICBsb2NDb25maWdbMF0gPSBsb2NUb0NvbmZpZ1swXS5zdWIobG9jU3RhcnRQb3MpO1xyXG4gICAgbG9jQ29uZmlnWzFdID0gbG9jVG9Db25maWdbMV0uc3ViKGxvY1N0YXJ0UG9zKTtcclxuICAgIGxvY0NvbmZpZ1syXSA9IGxvY1RvQ29uZmlnWzJdLnN1Yihsb2NTdGFydFBvcyk7XHJcbiAgICBpZiAobG9jQ29uZmlnWzNdKSB7XHJcbiAgICAgIGxvY0NvbmZpZ1szXSA9IGxvY1RvQ29uZmlnWzNdLnN1Yihsb2NTdGFydFBvcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiog5bim5pa55ZCR55u057q/5L2N56e76L+Q5YqoICovXHJcbmV4cG9ydCBjbGFzcyBKWE1vdmVCeSBleHRlbmRzIGNjLk1vdmVCeSB7XHJcbiAgY29uc3RydWN0b3IodDogbnVtYmVyLCBjOiBjYy5WZWMyKSB7XHJcbiAgICBzdXBlcih0LCBjKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShkdCkge1xyXG4gICAgZHQgPSBjYWxsU3VwZXIoY2NbXCJCZXppZXJCeVwiXSwgXCJfY29tcHV0ZUVhc2VUaW1lXCIsIHRoaXMsIGR0KTtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzW1widGFyZ2V0XCJdIGFzIENDTm9kZUltcGw7XHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgIHZhciB4ID0gdGhpc1tcIl9wb3NpdGlvbkRlbHRhXCJdLnggKiBkdDtcclxuICAgICAgdmFyIHkgPSB0aGlzW1wiX3Bvc2l0aW9uRGVsdGFcIl0ueSAqIGR0O1xyXG4gICAgICB2YXIgbG9jU3RhcnRQb3NpdGlvbiA9IHRoaXNbXCJfc3RhcnRQb3NpdGlvblwiXTtcclxuICAgICAgKHZUcGwxLnggPSB0YXJnZXQueCksICh2VHBsMS55ID0gdGFyZ2V0LnkpO1xyXG4gICAgICBpZiAoY2MubWFjcm8uRU5BQkxFX1NUQUNLQUJMRV9BQ1RJT05TKSB7XHJcbiAgICAgICAgdmFyIGxvY1ByZXZpb3VzUG9zaXRpb24gPSB0aGlzW1wiX3ByZXZpb3VzUG9zaXRpb25cIl07XHJcbiAgICAgICAgbG9jU3RhcnRQb3NpdGlvbi54ID1cclxuICAgICAgICAgIGxvY1N0YXJ0UG9zaXRpb24ueCArIHZUcGwxLnggLSBsb2NQcmV2aW91c1Bvc2l0aW9uLng7XHJcbiAgICAgICAgbG9jU3RhcnRQb3NpdGlvbi55ID1cclxuICAgICAgICAgIGxvY1N0YXJ0UG9zaXRpb24ueSArIHZUcGwxLnkgLSBsb2NQcmV2aW91c1Bvc2l0aW9uLnk7XHJcbiAgICAgICAgeCA9IHggKyBsb2NTdGFydFBvc2l0aW9uLng7XHJcbiAgICAgICAgeSA9IHkgKyBsb2NTdGFydFBvc2l0aW9uLnk7XHJcbiAgICAgICAgbG9jUHJldmlvdXNQb3NpdGlvbi54ID0geDtcclxuICAgICAgICBsb2NQcmV2aW91c1Bvc2l0aW9uLnkgPSB5O1xyXG4gICAgICAgIHRhcmdldC5zZXRQb3NpdGlvbih4LCB5KTtcclxuICAgICAgICBpZiAodlRwbDEuZXF1YWxzKGxvY1ByZXZpb3VzUG9zaXRpb24pKSByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGFyZ2V0LnNldFBvc2l0aW9uKGxvY1N0YXJ0UG9zaXRpb24ueCArIHgsIGxvY1N0YXJ0UG9zaXRpb24ueSArIHkpO1xyXG4gICAgICAgIGlmICh2VHBsMS5lcXVhbHMobG9jUHJldmlvdXNQb3NpdGlvbikpIHJldHVybjtcclxuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoRXguZ2V0QW5nbGVYKHZUcGwxLCBsb2NQcmV2aW91c1Bvc2l0aW9uKTtcclxuICAgICAgICB0YXJnZXQuYW5nbGUgPSBhbmdsZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpYTW92ZVRvIGV4dGVuZHMgSlhNb3ZlQnkge1xyXG4gIHByb3RlY3RlZCBfZW5kUG9zaXRpb246IGNjLlZlYzIgPSBudWxsO1xyXG4gIHByb3RlY3RlZCBfZUVuZDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9ID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IodDogbnVtYmVyLCBjOiBjYy5WZWMyLCBlRW5kPzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSB7XHJcbiAgICBzdXBlcih0LCBjKTtcclxuICAgIHRoaXMuX2VuZFBvc2l0aW9uID0gYztcclxuICAgIHRoaXMuX2VFbmQgPSBlRW5kO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRXaXRoVGFyZ2V0KHRhcmdldDogY2MuTm9kZSkge1xyXG4gICAgY2FsbFN1cGVyKGNjLk1vdmVCeSwgXCJzdGFydFdpdGhUYXJnZXRcIiwgdGhpcywgdGFyZ2V0KTtcclxuICAgIHRoaXNbXCJfcG9zaXRpb25EZWx0YVwiXS54ID0gdGhpcy5fZW5kUG9zaXRpb24ueCAtIHRhcmdldC54O1xyXG4gICAgdGhpc1tcIl9wb3NpdGlvbkRlbHRhXCJdLnkgPSB0aGlzLl9lbmRQb3NpdGlvbi55IC0gdGFyZ2V0Lnk7XHJcbiAgICBjb25zdCBfdGFyZ2V0U3RyID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICB4OiBNYXRoLnJvdW5kKHRhcmdldC5wb3NpdGlvbi54KSxcclxuICAgICAgeTogTWF0aC5yb3VuZCh0YXJnZXQucG9zaXRpb24ueSksXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IF9lbmRQb3NpdGlvblN0ciA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgeDogTWF0aC5yb3VuZCh0aGlzLl9lbmRQb3NpdGlvbi54KSxcclxuICAgICAgeTogTWF0aC5yb3VuZCh0aGlzLl9lbmRQb3NpdGlvbi55KSxcclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5sb2coeyBfdGFyZ2V0U3RyLCBfZW5kUG9zaXRpb25TdHIgfSk7XHJcbiAgICBsZXQgZW5kID0gdGhpcy5fZW5kUG9zaXRpb247XHJcbiAgICBpZiAodGhpcy5fZUVuZCAmJiBfdGFyZ2V0U3RyID09PSBfZW5kUG9zaXRpb25TdHIpIHtcclxuICAgICAgY29uc29sZS5sb2coeyBlbmQ6IHRoaXMuX2VFbmQgfSk7XHJcbiAgICAgIGVuZCA9IGNjLnYyKHRoaXMuX2VFbmQueCwgdGhpcy5fZUVuZC55KTtcclxuICAgIH1cclxuICAgIGxldCBhbmdsZSA9IE1hdGhFeC5nZXRBbmdsZVgoXHJcbiAgICAgIGNjLnYyKHRhcmdldC5wb3NpdGlvbi54LCB0YXJnZXQucG9zaXRpb24ueSksXHJcbiAgICAgIGVuZFxyXG4gICAgKTtcclxuICAgIHRhcmdldC5hbmdsZSA9IGFuZ2xlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpYRm9sbG93IGV4dGVuZHMgY2MuQWN0aW9uIHtcclxuICBwcm90ZWN0ZWQgX2ZvbGxvd05vZGU6IENDTm9kZUltcGwgPSBudWxsO1xyXG4gIHByb3RlY3RlZCBfZm9sbG93U3BlZWQ6IG51bWJlciA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIF9vZmZzZXQ6IGNjLlZlYzIgPSBudWxsO1xyXG4gIGNvbnN0cnVjdG9yKGZvbGxvd05vZGU6IENDTm9kZUltcGwsIGZvbGxvd1NwZWVkOiBudW1iZXIsIG9mZnNldD86IGNjLlZlYzIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLl9mb2xsb3dOb2RlID0gZm9sbG93Tm9kZTtcclxuICAgIHRoaXMuX2ZvbGxvd1NwZWVkID0gZm9sbG93U3BlZWQ7XHJcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgfVxyXG5cclxuICBzdGVwKGR0KSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gdGhpc1tcInRhcmdldFwiXSBhcyBDQ05vZGVJbXBsO1xyXG4gICAgdmFyIHRhcmdldFdvcmxkUG9zID0gdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyLlpFUk8pO1xyXG4gICAgdmFyIGZvbGxvd2VkV29ybGRQb3MgPSB0aGlzLl9mb2xsb3dOb2RlXHJcbiAgICAgIC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMi5aRVJPKVxyXG4gICAgICAuYWRkKHRoaXMuX29mZnNldCA/IHRoaXMuX29mZnNldCA6IGNjLlZlYzIuWkVSTyk7XHJcbiAgICBsZXQgYW5nbGUgPSBNYXRoRXguZ2V0QW5nbGVYKHRhcmdldFdvcmxkUG9zLCBmb2xsb3dlZFdvcmxkUG9zKTtcclxuICAgIHRhcmdldC5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgbGV0IGxlbiA9IHRoaXMuX2ZvbGxvd1NwZWVkICogZHQ7XHJcbiAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRXb3JsZFBvcy5zdWIoZm9sbG93ZWRXb3JsZFBvcykubWFnKCk7XHJcbiAgICBpZiAobGVuID4gZGlzdGFuY2UpIGxlbiA9IGRpc3RhbmNlO1xyXG4gICAgbGV0IG9mZnNldCA9IE1hdGhFeC5nZXRBbmdsZVBvcyhhbmdsZSwgbGVuKTtcclxuICAgIHRhcmdldC5wb3NpdGlvbiA9IHRhcmdldC5wb3NpdGlvbi5hZGQob2Zmc2V0KTtcclxuICB9XHJcblxyXG4gIGlzRG9uZSgpIHtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzW1widGFyZ2V0XCJdIGFzIENDTm9kZUltcGw7XHJcbiAgICB2YXIgdGFyZ2V0V29ybGRQb3MgPSB0YXJnZXQuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIuWkVSTyk7XHJcbiAgICB2YXIgZm9sbG93ZWRXb3JsZFBvcyA9IHRoaXMuX2ZvbGxvd05vZGVcclxuICAgICAgLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyLlpFUk8pXHJcbiAgICAgIC5hZGQodGhpcy5fb2Zmc2V0ID8gdGhpcy5fb2Zmc2V0IDogY2MuVmVjMi5aRVJPKTtcclxuICAgIGxldCBkaXN0YW5jZSA9IHRhcmdldFdvcmxkUG9zLnN1Yihmb2xsb3dlZFdvcmxkUG9zKS5tYWcoKTtcclxuICAgIC8vIGxldCBpc0RvbmUgPSBkaXN0YW5jZSA8IDVcclxuICAgIC8vIGlmIChpc0RvbmUpIHtcclxuICAgIC8vICAgICBjYy5sb2coXCI9PT09PT09PT09PiBmb2xsb3cgZG9uZSFcIilcclxuICAgIC8vIH1cclxuICAgIHJldHVybiBkaXN0YW5jZSA8IDU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2hha2UgZXh0ZW5kcyBjYy5BY3Rpb25JbnRlcnZhbCB7XHJcbiAgLy/oioLngrnliJ3lp4vkvY3nva5cclxuICBwcm90ZWN0ZWQgX25vZGVJbml0aWFsUG9zID0gbnVsbDtcclxuICAvL1jovbTmipbliqjluYXluqZcclxuICBwcm90ZWN0ZWQgX3NoYWtlUGFyYW1zOiBudW1iZXJbXSA9IFtdO1xyXG4gIHByb3RlY3RlZCBfZGlyID0gMTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBkdXJhdGlvbjogbnVtYmVyLFxyXG4gICAgc2hha2VTdHJlbmd0aFg6IG51bWJlcixcclxuICAgIHNoYWtlU3RyZW5ndGhZOiBudW1iZXJcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIHNoYWtlU3RyZW5ndGhYLCBzaGFrZVN0cmVuZ3RoWSk7XHJcbiAgfVxyXG5cclxuICBpbml0U2hha2VQYXJhbXMoc2hha2VTdHJlbmd0aFg6IG51bWJlciwgc2hha2VTdHJlbmd0aFk6IG51bWJlcikge1xyXG4gICAgLy8gaWYgKHNoYWtlU3RyZW5ndGhYID4gMCkge1xyXG4gICAgLy8gICAgIHRoaXMuX3NoYWtlUGFyYW1zWzBdID0gMDtcclxuICAgIC8vICAgICB0aGlzLl9zaGFrZVBhcmFtc1sxXSA9IHNoYWtlU3RyZW5ndGhYO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gZWxzZSB7XHJcbiAgICAvLyAgICAgdGhpcy5fc2hha2VQYXJhbXNbMF0gPSBzaGFrZVN0cmVuZ3RoWDtcclxuICAgIC8vICAgICB0aGlzLl9zaGFrZVBhcmFtc1sxXSA9IDA7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBpZiAoc2hha2VTdHJlbmd0aFkgPiAwKSB7XHJcbiAgICAvLyAgICAgdGhpcy5fc2hha2VQYXJhbXNbMl0gPSAwO1xyXG4gICAgLy8gICAgIHRoaXMuX3NoYWtlUGFyYW1zWzNdID0gc2hha2VTdHJlbmd0aFk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBlbHNlIHtcclxuICAgIC8vICAgICB0aGlzLl9zaGFrZVBhcmFtc1syXSA9IHNoYWtlU3RyZW5ndGhZO1xyXG4gICAgLy8gICAgIHRoaXMuX3NoYWtlUGFyYW1zWzNdID0gMDtcclxuICAgIC8vIH1cclxuICAgIHRoaXMuX3NoYWtlUGFyYW1zWzBdID0gc2hha2VTdHJlbmd0aFg7XHJcbiAgICB0aGlzLl9zaGFrZVBhcmFtc1sxXSA9IHNoYWtlU3RyZW5ndGhZO1xyXG4gIH1cclxuXHJcbiAgLy/ojrflj5bkuKTkuKrmlbDpl7TnmoTpmo/mnLrlgLxcclxuICBwcm90ZWN0ZWQgZ2V0UmFuZG9tU3RyZW5ndGgobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluO1xyXG4gIH1cclxuXHJcbiAgaW5pdFdpdGhEdXJhdGlvbihcclxuICAgIGR1cmF0aW9uOiBudW1iZXIsXHJcbiAgICBzaGFrZVN0cmVuZ3RoWDogbnVtYmVyLFxyXG4gICAgc2hha2VTdHJlbmd0aFk6IG51bWJlclxyXG4gICkge1xyXG4gICAgaWYgKGNhbGxTdXBlcihjYy5BY3Rpb25JbnRlcnZhbCwgXCJpbml0V2l0aER1cmF0aW9uXCIsIHRoaXMsIGR1cmF0aW9uKSkge1xyXG4gICAgICB0aGlzLmluaXRTaGFrZVBhcmFtcyhzaGFrZVN0cmVuZ3RoWCwgc2hha2VTdHJlbmd0aFkpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCkge1xyXG4gICAgY2FsbFN1cGVyKGNjLkFjdGlvbkludGVydmFsLCBcInN0YXJ0V2l0aFRhcmdldFwiLCB0aGlzLCB0YXJnZXQpO1xyXG5cclxuICAgIHRoaXMuX25vZGVJbml0aWFsUG9zID0gdGFyZ2V0LnBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzW1widGFyZ2V0XCJdIGFzIENDTm9kZUltcGw7XHJcbiAgICB0YXJnZXQucG9zaXRpb24gPSB0aGlzLl9ub2RlSW5pdGlhbFBvcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBKWEFjdGlvbk1nciBleHRlbmRzIGNjLkFjdGlvbk1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfZXZ0OiBHRXZlbnRTeXN0ZW0gPSBudWxsO1xyXG4gIHB1YmxpYyBiaW5kRXZ0TWdyKGV2dDogR0V2ZW50U3lzdGVtKSB7XHJcbiAgICB0aGlzLl9ldnQgPSBldnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkVHdlZW5BY3Rpb24odHdlZW46IGNjLlR3ZWVuKSB7XHJcbiAgICBpZiAoIXR3ZWVuW1wiX3RhcmdldFwiXSkge1xyXG4gICAgICBjYy53YXJuKFwiUGxlYXNlIHNldCB0YXJnZXQgdG8gdHdlZW4gZmlyc3RcIik7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgaWYgKHR3ZWVuW1wiX2ZpbmFsQWN0aW9uXCJdKSB7XHJcbiAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZW1vdmVBY3Rpb24odHdlZW5bXCJfZmluYWxBY3Rpb25cIl0pO1xyXG4gICAgfVxyXG4gICAgdHdlZW5bXCJfZmluYWxBY3Rpb25cIl0gPSB0d2VlbltcIl91bmlvblwiXSgpO1xyXG4gICAgdGhpcy5hZGRBY3Rpb24odHdlZW5bXCJfZmluYWxBY3Rpb25cIl0sIHR3ZWVuW1wiX3RhcmdldFwiXSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEFjdGlvbihhY3Rpb246IGNjLkFjdGlvbiwgdGFyZ2V0OiBhbnksIHBhdXNlZDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAoIXRhcmdldC5faWQpIHtcclxuICAgICAgdGFyZ2V0Ll9pZCA9IHRhcmdldC53cmFwSWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRhcmdldC5faWQpIHtcclxuICAgICAgY2MuZXJyb3IoXCJjYW4gbm90IGZpbmQgdGFyZ2V0IHByb3BlcnR5OiBfaWQhXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoYWN0aW9uLmdldFRhZygpID09IFFVRVVFX0FDVElPTl9UQUcpIHtcclxuICAgICAgdGFyZ2V0Ll9oYXNRdWV1ZUFjdGlvbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBzdXBlci5hZGRBY3Rpb24oYWN0aW9uLCB0YXJnZXQsIHBhdXNlZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlQWN0aW9uKGFjaXRvbjogY2MuQWN0aW9uLCB1bkNhbGxCYWNrOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICghIWFjaXRvbiAmJiB0aGlzLl9ldnQpIHtcclxuICAgICAgdGhpcy5fZXZ0LnBvc3QoSlhBY3Rpb25Nc2cuYWN0aW9uLmVuZCwgYWNpdG9uKTtcclxuICAgIH1cclxuICAgIGlmICghdW5DYWxsQmFjayAmJiBhY2l0b24uX19lbmRDYWxsQmFjaykge1xyXG4gICAgICBhY2l0b24uX19lbmRDYWxsQmFjaygpO1xyXG4gICAgICBhY2l0b24uX19lbmRDYWxsQmFjayA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoYWNpdG9uLmdldFRhZygpID09IFFVRVVFX0FDVElPTl9UQUcpIHtcclxuICAgICAgbGV0IHRhcmdldCA9IGFjaXRvbi5nZXRPcmlnaW5hbFRhcmdldCgpO1xyXG4gICAgICB0YXJnZXRbXCJfaGFzUXVldWVBY3Rpb25cIl0gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHN1cGVyLnJlbW92ZUFjdGlvbihhY2l0b24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFRhcmdldEFjdGlvbih0YWc6IG51bWJlciwgdGFyZ2V0OiBDQ05vZGVJbXBsKSB7XHJcbiAgICBpZiAodGFnID09PSBjYy5BY3Rpb24uVEFHX0lOVkFMSUQpIHJldHVybjtcclxuICAgIHZhciBlbGVtZW50ID0gdGhpc1tcIl9oYXNoVGFyZ2V0c1wiXVt0YXJnZXRbXCJfaWRcIl1dO1xyXG4gICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgaWYgKGVsZW1lbnQuYWN0aW9ucyAhPSBudWxsKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50LmFjdGlvbnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgIHZhciBhY3Rpb24gPSBlbGVtZW50LmFjdGlvbnNbaV07XHJcbiAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbi5nZXRUYWcoKSA9PT0gdGFnKSByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzUXVldWVBY3Rpb24odGFyZ2V0OiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0YXJnZXQuX2hhc1F1ZXVlQWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc0FjdGlvbigpOiBib29sZWFuIHtcclxuICAgIGxldCBlbGVtZW50cyA9IHRoaXNbXCJfYXJyYXlUYXJnZXRzXCJdO1xyXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBhY3Rpb25zID0gZWxlbWVudHNbaV0uYWN0aW9ucztcclxuICAgICAgaWYgKGFjdGlvbnMgJiYgYWN0aW9ucy5sZW5ndGggPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIl19