
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/CCSliderEx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '68260UQw2RCTJqci4lB/GHm', 'CCSliderEx');
// Script/Core/FrameEx/CCSliderEx.ts

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
/**
 * !#en The Slider Direction
 * !#zh 滑动器方向
 * @enum Slider.Direction
 */
var Direction = cc.Enum({
    /**
     * !#en The horizontal direction.
     * !#zh 水平方向
     * @property {Number} Horizontal
     */
    Horizontal: 0,
    /**
     * !#en The vertical direction.
     * !#zh 垂直方向
     * @property {Number} Vertical
     */
    Vertical: 1,
});
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var SliderEx = /** @class */ (function (_super) {
    __extends(SliderEx, _super);
    function SliderEx() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.proBar = null;
        return _this;
    }
    SliderEx.prototype._updateHandlePosition = function () {
        if (!this.handle) {
            return;
        }
        var handlelocalPos;
        if (this.direction === Direction.Horizontal) {
            handlelocalPos = cc.v2(-this.node.width * this.node.anchorX + this.progress * this.node.width, 0);
        }
        else {
            handlelocalPos = cc.v2(0, -this.node.height * this.node.anchorY + this.progress * this.node.height);
        }
        var worldSpacePos = this.node.convertToWorldSpaceAR(handlelocalPos);
        var nodePos = this.handle.node.parent.convertToNodeSpaceAR(worldSpacePos);
        if (this.direction === Direction.Horizontal) {
            this.handle.node.x = nodePos.x;
        }
        else {
            this.handle.node.y = nodePos.y;
        }
        if (this.proBar)
            this.proBar.fillRange = this.progress;
    };
    __decorate([
        property(cc.Sprite)
    ], SliderEx.prototype, "proBar", void 0);
    SliderEx = __decorate([
        ccclass,
        menu("FrameEx/SliderEx")
    ], SliderEx);
    return SliderEx;
}(cc.Slider));
exports.default = SliderEx;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0NDU2xpZGVyRXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7R0FJRztBQUNILElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDdEI7Ozs7T0FJRztJQUNILFVBQVUsRUFBRSxDQUFDO0lBQ2I7Ozs7T0FJRztJQUNILFFBQVEsRUFBRSxDQUFDO0NBQ1osQ0FBQyxDQUFDO0FBRUcsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBc0MsNEJBQVM7SUFBL0M7UUFBQSxxRUE0QkM7UUEzQnNCLFlBQU0sR0FBYyxJQUFJLENBQUM7O0lBMkJoRCxDQUFDO0lBekJXLHdDQUFxQixHQUEvQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELElBQUksY0FBYyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQzNDLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUNwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQ3RFLENBQUMsQ0FDRixDQUFDO1NBQ0g7YUFBTTtZQUNMLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUNwQixDQUFDLEVBQ0QsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUN6RSxDQUFDO1NBQ0g7UUFDRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDaEM7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6RCxDQUFDO0lBMUJvQjtRQUFwQixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FBMEI7SUFEM0IsUUFBUTtRQUY1QixPQUFPO1FBQ1AsSUFBSSxDQUFDLGtCQUFrQixDQUFDO09BQ0osUUFBUSxDQTRCNUI7SUFBRCxlQUFDO0NBNUJELEFBNEJDLENBNUJxQyxFQUFFLENBQUMsTUFBTSxHQTRCOUM7a0JBNUJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqICEjZW4gVGhlIFNsaWRlciBEaXJlY3Rpb25cclxuICogISN6aCDmu5HliqjlmajmlrnlkJFcclxuICogQGVudW0gU2xpZGVyLkRpcmVjdGlvblxyXG4gKi9cclxudmFyIERpcmVjdGlvbiA9IGNjLkVudW0oe1xyXG4gIC8qKlxyXG4gICAqICEjZW4gVGhlIGhvcml6b250YWwgZGlyZWN0aW9uLlxyXG4gICAqICEjemgg5rC05bmz5pa55ZCRXHJcbiAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEhvcml6b250YWxcclxuICAgKi9cclxuICBIb3Jpem9udGFsOiAwLFxyXG4gIC8qKlxyXG4gICAqICEjZW4gVGhlIHZlcnRpY2FsIGRpcmVjdGlvbi5cclxuICAgKiAhI3poIOWeguebtOaWueWQkVxyXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWZXJ0aWNhbFxyXG4gICAqL1xyXG4gIFZlcnRpY2FsOiAxLFxyXG59KTtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiRnJhbWVFeC9TbGlkZXJFeFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXJFeCBleHRlbmRzIGNjLlNsaWRlciB7XHJcbiAgQHByb3BlcnR5KGNjLlNwcml0ZSkgcHJvQmFyOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICBwcm90ZWN0ZWQgX3VwZGF0ZUhhbmRsZVBvc2l0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLmhhbmRsZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgaGFuZGxlbG9jYWxQb3M7XHJcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Ib3Jpem9udGFsKSB7XHJcbiAgICAgIGhhbmRsZWxvY2FsUG9zID0gY2MudjIoXHJcbiAgICAgICAgLXRoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5hbmNob3JYICsgdGhpcy5wcm9ncmVzcyAqIHRoaXMubm9kZS53aWR0aCxcclxuICAgICAgICAwXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoYW5kbGVsb2NhbFBvcyA9IGNjLnYyKFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgLXRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLm5vZGUuYW5jaG9yWSArIHRoaXMucHJvZ3Jlc3MgKiB0aGlzLm5vZGUuaGVpZ2h0XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB2YXIgd29ybGRTcGFjZVBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaGFuZGxlbG9jYWxQb3MpO1xyXG4gICAgbGV0IG5vZGVQb3MgPSB0aGlzLmhhbmRsZS5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFNwYWNlUG9zKTtcclxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkhvcml6b250YWwpIHtcclxuICAgICAgdGhpcy5oYW5kbGUubm9kZS54ID0gbm9kZVBvcy54O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oYW5kbGUubm9kZS55ID0gbm9kZVBvcy55O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucHJvQmFyKSB0aGlzLnByb0Jhci5maWxsUmFuZ2UgPSB0aGlzLnByb2dyZXNzO1xyXG4gIH1cclxufVxyXG4iXX0=