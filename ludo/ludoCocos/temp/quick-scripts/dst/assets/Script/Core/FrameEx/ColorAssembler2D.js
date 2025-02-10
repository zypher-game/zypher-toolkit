
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/ColorAssembler2D.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '44a1cxlY5pJiKtJg4XDkXLE', 'ColorAssembler2D');
// Script/Core/FrameEx/ColorAssembler2D.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ColorAssembler2D = /** @class */ (function (_super) {
    __extends(ColorAssembler2D, _super);
    function ColorAssembler2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colors = [];
        return _this;
    }
    ColorAssembler2D.prototype.start = function () { };
    ColorAssembler2D.prototype.onEnable = function () {
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
    };
    ColorAssembler2D.prototype.onDisable = function () {
        cc.director.off(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
        this.node["_renderFlag"] |= cc["RenderFlow"].FLAG_COLOR;
    };
    ColorAssembler2D.prototype._updateColors = function () {
        var cmp = this.getComponent(cc.RenderComponent);
        if (!cmp)
            return;
        var _assembler = cmp["_assembler"];
        if (!(_assembler instanceof cc["Assembler2D"]))
            return;
        var uintVerts = _assembler._renderData.uintVDatas[0];
        if (!uintVerts)
            return;
        var color = this.node.color;
        var floatsPerVert = _assembler.floatsPerVert;
        var colorOffset = _assembler.colorOffset;
        var count = 0;
        for (var i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
            uintVerts[i] = (this.colors[count++] || color)["_val"];
        }
    };
    __decorate([
        property({
            type: cc.Color,
            tooltip: "颜色",
        })
    ], ColorAssembler2D.prototype, "colors", void 0);
    ColorAssembler2D = __decorate([
        ccclass
    ], ColorAssembler2D);
    return ColorAssembler2D;
}(cc.Component));
exports.default = ColorAssembler2D;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0NvbG9yQXNzZW1ibGVyMkQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUFpQ0M7UUE1QkMsWUFBTSxHQUFlLEVBQUUsQ0FBQzs7SUE0QjFCLENBQUM7SUExQkMsZ0NBQUssR0FBTCxjQUFTLENBQUM7SUFFVixtQ0FBUSxHQUFSO1FBQ0UsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0UsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUMxRCxDQUFDO0lBRVMsd0NBQWEsR0FBdkI7UUFDRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU87UUFDakIsSUFBTSxVQUFVLEdBQW1CLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsQ0FBQyxVQUFVLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUN2RCxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU87UUFDdkIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGFBQWEsRUFBRTtZQUN6RSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBM0JEO1FBSkMsUUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLO1lBQ2QsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO29EQUNzQjtJQUxMLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBaUNwQztJQUFELHVCQUFDO0NBakNELEFBaUNDLENBakM2QyxFQUFFLENBQUMsU0FBUyxHQWlDekQ7a0JBakNvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JBc3NlbWJsZXIyRCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgQHByb3BlcnR5KHtcclxuICAgIHR5cGU6IGNjLkNvbG9yLFxyXG4gICAgdG9vbHRpcDogXCLpopzoibJcIixcclxuICB9KVxyXG4gIGNvbG9yczogY2MuQ29sb3JbXSA9IFtdO1xyXG5cclxuICBzdGFydCgpIHt9XHJcblxyXG4gIG9uRW5hYmxlKCkge1xyXG4gICAgY2MuZGlyZWN0b3Iub25jZShjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXLCB0aGlzLl91cGRhdGVDb2xvcnMsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgb25EaXNhYmxlKCkge1xyXG4gICAgY2MuZGlyZWN0b3Iub2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX0RSQVcsIHRoaXMuX3VwZGF0ZUNvbG9ycywgdGhpcyk7XHJcbiAgICB0aGlzLm5vZGVbXCJfcmVuZGVyRmxhZ1wiXSB8PSBjY1tcIlJlbmRlckZsb3dcIl0uRkxBR19DT0xPUjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfdXBkYXRlQ29sb3JzKCkge1xyXG4gICAgY29uc3QgY21wID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUmVuZGVyQ29tcG9uZW50KTtcclxuICAgIGlmICghY21wKSByZXR1cm47XHJcbiAgICBjb25zdCBfYXNzZW1ibGVyOiBjYy5Bc3NlbWJsZXIyRCA9IGNtcFtcIl9hc3NlbWJsZXJcIl07XHJcbiAgICBpZiAoIShfYXNzZW1ibGVyIGluc3RhbmNlb2YgY2NbXCJBc3NlbWJsZXIyRFwiXSkpIHJldHVybjtcclxuICAgIGNvbnN0IHVpbnRWZXJ0cyA9IF9hc3NlbWJsZXIuX3JlbmRlckRhdGEudWludFZEYXRhc1swXTtcclxuICAgIGlmICghdWludFZlcnRzKSByZXR1cm47XHJcbiAgICBjb25zdCBjb2xvciA9IHRoaXMubm9kZS5jb2xvcjtcclxuICAgIGNvbnN0IGZsb2F0c1BlclZlcnQgPSBfYXNzZW1ibGVyLmZsb2F0c1BlclZlcnQ7XHJcbiAgICBjb25zdCBjb2xvck9mZnNldCA9IF9hc3NlbWJsZXIuY29sb3JPZmZzZXQ7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IGNvbG9yT2Zmc2V0LCBsID0gdWludFZlcnRzLmxlbmd0aDsgaSA8IGw7IGkgKz0gZmxvYXRzUGVyVmVydCkge1xyXG4gICAgICB1aW50VmVydHNbaV0gPSAodGhpcy5jb2xvcnNbY291bnQrK10gfHwgY29sb3IpW1wiX3ZhbFwiXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19