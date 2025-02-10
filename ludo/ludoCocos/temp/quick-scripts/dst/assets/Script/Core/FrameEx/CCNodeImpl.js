
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/CCNodeImpl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0NDTm9kZUltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBcUM7QUFFckM7SUFBZ0MsOEJBQVU7SUFFdEMsb0JBQVksTUFBZTtRQUEzQixZQUNJLGlCQUFPLFNBRVY7UUFKTSxZQUFNLEdBQVksSUFBSSxDQUFDO1FBRzFCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztJQUN6QixDQUFDO0lBRUQsc0JBQVcsa0NBQVU7YUFBckIsY0FBa0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQSxDQUFDLENBQUM7YUFDakUsVUFBc0IsQ0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUM7OztPQURFO0lBQUEsQ0FBQztJQUNILENBQUM7SUFDaEUsc0JBQVcsNkJBQUs7YUFBaEIsY0FBNkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUM7YUFDdkQsVUFBaUIsQ0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQURDO0lBQUEsQ0FBQztJQUV4RCxzQkFBVyx5QkFBQzthQUFaLGNBQXlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hELFVBQWEsR0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7OztPQURGO0lBRWhELHNCQUFXLHlCQUFDO2FBQVosY0FBeUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQsVUFBYSxHQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O09BREY7SUFFaEQsc0JBQVcsZ0NBQVE7YUFDbkIsY0FBaUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFEL0QsVUFBb0IsR0FBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRWpFLHNCQUFXLGdDQUFRO2FBQ25CLGNBQWdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBRDlELFVBQW9CLEdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVoRSxzQkFBVyw2QkFBSzthQUNoQixjQUE2QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUR4RCxVQUFpQixHQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFMUQsc0JBQVcsNkJBQUs7YUFDaEIsY0FBNkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFEeEQsVUFBaUIsR0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTFELHNCQUFXLDhCQUFNO2FBQ2pCLGNBQThCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBRDFELFVBQWtCLEdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU1RCxzQkFBVyw4QkFBTTthQUNqQixjQUFzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQURsRCxVQUFrQixHQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFNUQsc0JBQVcsK0JBQU87YUFDbEIsY0FBK0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFENUQsVUFBbUIsR0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTlELHNCQUFXLCtCQUFPO2FBQ2xCLGNBQStCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBRDVELFVBQW1CLEdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU5RCxzQkFBVywrQkFBTzthQUNsQixjQUErQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUQ1RCxVQUFtQixHQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFOUQsc0JBQVcsNkJBQUs7YUFDaEIsY0FBNkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFEeEQsVUFBaUIsR0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTFELHNCQUFXLDhCQUFNO2FBR2pCLGNBQThCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBSDFELFVBQWtCLEdBQVc7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4QkFBTTthQUNqQixjQUE4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUQxRCxVQUFrQixHQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFNUQsc0JBQVcsOEJBQU07YUFBakIsY0FBK0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDM0QsVUFBa0IsR0FBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQSxDQUFDLENBQUM7OztPQUREO0lBRTNELHNCQUFXLDhCQUFNO2FBQWpCLGNBQStCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzNELFVBQWtCLE1BQWUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUEsQ0FBQyxDQUFDOzs7T0FEUDtJQUNPLENBQUM7SUFDbkUsc0JBQVcsNEJBQUk7YUFBZixjQUE0QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBQy9DLDBDQUFxQixHQUE1QixVQUE2QixHQUFZO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0seUNBQW9CLEdBQTNCLFVBQTRCLFFBQWlCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0saUNBQVksR0FBbkIsVUFBNEMsSUFBc0I7UUFDOUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ00sZ0NBQVcsR0FBbEIsVUFBbUIsQ0FBUyxFQUFFLENBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRzlFLGlCQUFDO0FBQUQsQ0E1REEsQUE0REMsQ0E1RCtCLGtCQUFVLEdBNER6QztBQTVEWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9iamVjdFdyYXAgfSBmcm9tIFwiLi9FUzVFeFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENDTm9kZUltcGwgZXh0ZW5kcyBPYmplY3RXcmFwIHtcclxuICAgIHB1YmxpYyB0YXJnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdyb3VwSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudGFyZ2V0Lmdyb3VwSW5kZXggfTtcclxuICAgIHB1YmxpYyBzZXQgZ3JvdXBJbmRleCh2OiBudW1iZXIpIHsgdGhpcy50YXJnZXQuZ3JvdXBJbmRleCA9IHYgfTtcclxuICAgIHB1YmxpYyBnZXQgZ3JvdXAoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudGFyZ2V0Lmdyb3VwIH07XHJcbiAgICBwdWJsaWMgc2V0IGdyb3VwKHY6IHN0cmluZykgeyB0aGlzLnRhcmdldC5ncm91cCA9IHY7IH1cclxuICAgIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy50YXJnZXQueDsgfVxyXG4gICAgcHVibGljIHNldCB4KHZhbDogbnVtYmVyKSB7IHRoaXMudGFyZ2V0LnggPSB2YWw7IH1cclxuICAgIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy50YXJnZXQueTsgfVxyXG4gICAgcHVibGljIHNldCB5KHZhbDogbnVtYmVyKSB7IHRoaXMudGFyZ2V0LnkgPSB2YWw7IH1cclxuICAgIHB1YmxpYyBzZXQgcG9zaXRpb24odmFsOiBjYy5WZWMyKSB7IHRoaXMudGFyZ2V0LnBvc2l0aW9uID0gdmFsOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHBvc2l0aW9uKCk6IGNjLlZlYzIgeyByZXR1cm4gdGhpcy50YXJnZXQucG9zaXRpb247IH1cclxuICAgIHB1YmxpYyBzZXQgcm90YXRpb24odmFsOiBudW1iZXIpIHsgdGhpcy50YXJnZXQucm90YXRpb24gPSB2YWw7IH1cclxuICAgIHB1YmxpYyBnZXQgcm90YXRpb24oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudGFyZ2V0LnJvdGF0aW9uOyB9XHJcbiAgICBwdWJsaWMgc2V0IGFuZ2xlKHZhbDogbnVtYmVyKSB7IHRoaXMudGFyZ2V0LmFuZ2xlID0gdmFsOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGFuZ2xlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLnRhcmdldC5hbmdsZTsgfVxyXG4gICAgcHVibGljIHNldCBzY2FsZSh2YWw6IG51bWJlcikgeyB0aGlzLnRhcmdldC5zY2FsZSA9IHZhbDsgfVxyXG4gICAgcHVibGljIGdldCBzY2FsZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy50YXJnZXQuc2NhbGU7IH1cclxuICAgIHB1YmxpYyBzZXQgc2NhbGVYKHZhbDogbnVtYmVyKSB7IHRoaXMudGFyZ2V0LnNjYWxlWCA9IHZhbDsgfVxyXG4gICAgcHVibGljIGdldCBzY2FsZVgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudGFyZ2V0LnNjYWxlWDsgfVxyXG4gICAgcHVibGljIHNldCBzY2FsZVkodmFsOiBudW1iZXIpIHsgdGhpcy50YXJnZXQuc2NhbGVZID0gdmFsOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHNjYWxlWSgpIHsgcmV0dXJuIHRoaXMudGFyZ2V0LnNjYWxlWTsgfVxyXG4gICAgcHVibGljIHNldCBhbmNob3JYKHZhbDogbnVtYmVyKSB7IHRoaXMudGFyZ2V0LmFuY2hvclggPSB2YWw7IH1cclxuICAgIHB1YmxpYyBnZXQgYW5jaG9yWCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy50YXJnZXQuYW5jaG9yWDsgfVxyXG4gICAgcHVibGljIHNldCBvcGFjaXR5KHZhbDogbnVtYmVyKSB7IHRoaXMudGFyZ2V0Lm9wYWNpdHkgPSB2YWw7IH1cclxuICAgIHB1YmxpYyBnZXQgb3BhY2l0eSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy50YXJnZXQub3BhY2l0eTsgfVxyXG4gICAgcHVibGljIHNldCBhbmNob3JZKHZhbDogbnVtYmVyKSB7IHRoaXMudGFyZ2V0LmFuY2hvclkgPSB2YWw7IH1cclxuICAgIHB1YmxpYyBnZXQgYW5jaG9yWSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy50YXJnZXQuYW5jaG9yWTsgfVxyXG4gICAgcHVibGljIHNldCB3aWR0aCh2YWw6IG51bWJlcikgeyB0aGlzLnRhcmdldC53aWR0aCA9IHZhbDsgfVxyXG4gICAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy50YXJnZXQud2lkdGg7IH1cclxuICAgIHB1YmxpYyBzZXQgekluZGV4KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuekluZGV4ID0gTWF0aC5taW4odmFsLCBjYy5tYWNyby5NQVhfWklOREVYIC0gMSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHpJbmRleCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy50YXJnZXQuekluZGV4OyB9XHJcbiAgICBwdWJsaWMgc2V0IGhlaWdodCh2YWw6IG51bWJlcikgeyB0aGlzLnRhcmdldC5oZWlnaHQgPSB2YWw7IH1cclxuICAgIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLnRhcmdldC5oZWlnaHQ7IH1cclxuICAgIHB1YmxpYyBnZXQgYWN0aXZlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy50YXJnZXQuYWN0aXZlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZSh2YWw6IGJvb2xlYW4pIHsgdGhpcy50YXJnZXQuYWN0aXZlID0gdmFsIH1cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IGNjLk5vZGUgeyByZXR1cm4gdGhpcy50YXJnZXQucGFyZW50OyB9XHJcbiAgICBwdWJsaWMgc2V0IHBhcmVudChwYXJlbnQ6IGNjLk5vZGUpIHsgdGhpcy50YXJnZXQucGFyZW50ID0gcGFyZW50IH07XHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudGFyZ2V0Lm5hbWUgfTtcclxuICAgIHB1YmxpYyBjb252ZXJ0VG9Xb3JsZFNwYWNlQVIocG9zOiBjYy5WZWMyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvczogY2MuVmVjMikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvbXBvbmVudDxUIGV4dGVuZHMgY2MuQ29tcG9uZW50Pih0eXBlOiB7IHByb3RvdHlwZTogVCB9KTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmdldENvbXBvbmVudCh0eXBlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcikgeyB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbih4LCB5KSB9XHJcblxyXG5cclxufSJdfQ==