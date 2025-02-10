"use strict";
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