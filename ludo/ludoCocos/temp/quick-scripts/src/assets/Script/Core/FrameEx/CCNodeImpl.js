"use strict";
cc._RF.push(module, 'bbd00WGLUJARrwSnXgVGP/B', 'CCNodeImpl');
// Script/Core/FrameEx/CCNodeImpl.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.CCNodeImpl = void 0;
var ES5Ex_1 = require("./ES5Ex");
var CCNodeImpl = /** @class */ (function (_super) {
    __extends(CCNodeImpl, _super);
    function CCNodeImpl(target) {
        var _this = _super.call(this) || this;
        _this.target = null;
        _this.target = target;
        return _this;
    }
    Object.defineProperty(CCNodeImpl.prototype, "groupIndex", {
        get: function () { return this.target.groupIndex; },
        set: function (v) { this.target.groupIndex = v; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(CCNodeImpl.prototype, "group", {
        get: function () { return this.target.group; },
        set: function (v) { this.target.group = v; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(CCNodeImpl.prototype, "x", {
        get: function () { return this.target.x; },
        set: function (val) { this.target.x = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "y", {
        get: function () { return this.target.y; },
        set: function (val) { this.target.y = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "position", {
        get: function () { return this.target.position; },
        set: function (val) { this.target.position = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "rotation", {
        get: function () { return this.target.rotation; },
        set: function (val) { this.target.rotation = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "angle", {
        get: function () { return this.target.angle; },
        set: function (val) { this.target.angle = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "scale", {
        get: function () { return this.target.scale; },
        set: function (val) { this.target.scale = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "scaleX", {
        get: function () { return this.target.scaleX; },
        set: function (val) { this.target.scaleX = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "scaleY", {
        get: function () { return this.target.scaleY; },
        set: function (val) { this.target.scaleY = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "anchorX", {
        get: function () { return this.target.anchorX; },
        set: function (val) { this.target.anchorX = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "opacity", {
        get: function () { return this.target.opacity; },
        set: function (val) { this.target.opacity = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "anchorY", {
        get: function () { return this.target.anchorY; },
        set: function (val) { this.target.anchorY = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "width", {
        get: function () { return this.target.width; },
        set: function (val) { this.target.width = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "zIndex", {
        get: function () { return this.target.zIndex; },
        set: function (val) {
            this.target.zIndex = Math.min(val, cc.macro.MAX_ZINDEX - 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "height", {
        get: function () { return this.target.height; },
        set: function (val) { this.target.height = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "active", {
        get: function () { return this.target.active; },
        set: function (val) { this.target.active = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CCNodeImpl.prototype, "parent", {
        get: function () { return this.target.parent; },
        set: function (parent) { this.target.parent = parent; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(CCNodeImpl.prototype, "name", {
        get: function () { return this.target.name; },
        enumerable: false,
        configurable: true
    });
    ;
    CCNodeImpl.prototype.convertToWorldSpaceAR = function (pos) {
        return this.target.convertToWorldSpaceAR(pos);
    };
    CCNodeImpl.prototype.convertToNodeSpaceAR = function (worldPos) {
        return this.target.convertToNodeSpaceAR(worldPos);
    };
    CCNodeImpl.prototype.getComponent = function (type) {
        return this.target.getComponent(type);
    };
    CCNodeImpl.prototype.setPosition = function (x, y) { this.target.setPosition(x, y); };
    return CCNodeImpl;
}(ES5Ex_1.ObjectWrap));
exports.CCNodeImpl = CCNodeImpl;

cc._RF.pop();