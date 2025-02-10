
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Shaders/SLGuideShader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c5fd8CDsc9HE4+40pqgIIN8', 'SLGuideShader');
// Script/Shaders/SLGuideShader.ts

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
var GComponent_1 = require("../Core/FrameEx/GComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, executeInEditMode = _a.executeInEditMode, menu = _a.menu;
var SLGuideShader = /** @class */ (function (_super) {
    __extends(SLGuideShader, _super);
    function SLGuideShader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask1 = [0, 0, 0, 0];
        _this.mask2 = [0, 0, 0, 0];
        _this.inverted = false;
        _this._maskMaterial = null;
        _this._sprite = null;
        return _this;
    }
    SLGuideShader.prototype.__onLoad = function () {
        this.node.setContentSize(cc.winSize);
        var material = this.assetImpl.getPreLoadAsset("materials/ui-guide");
        this._sprite = this.node.getComponent(cc.Sprite);
        if (material) {
            this._sprite.setMaterial(0, material);
            this._maskMaterial = this._sprite.getMaterial(0);
            this._maskMaterial.setProperty("wh_ratio", cc.winSize.width / cc.winSize.height);
        }
    };
    SLGuideShader.prototype.reSetMask1 = function (mask1, mask2) {
        if (!this._maskMaterial)
            return;
        if (this.mask1[0] == mask1[0] &&
            this.mask1[1] == mask1[1] &&
            this.mask1[2] == mask1[2] &&
            this.mask1[3] == mask1[3])
            return;
        this.mask1 = mask1;
        this._maskMaterial.setProperty("mask1_point", cc.v2(this.mask1[0] / this.node.width, 1 - this.mask1[1] / this.node.height));
        this._maskMaterial.setProperty("mask1_size", cc.v2(this.mask1[2] / this.node.width, this.mask1[3] / this.node.height));
        if (mask2)
            this.reSetMask2(mask2);
    };
    SLGuideShader.prototype.reSetMask2 = function (mask2) {
        if (!this._maskMaterial)
            return;
        if (this.mask2[0] == mask2[0] &&
            this.mask2[1] == mask2[1] &&
            this.mask2[2] == mask2[2] &&
            this.mask2[3] == mask2[3])
            return;
        this.mask2 = mask2;
        this._maskMaterial.setProperty("mask2_point", cc.v2(this.mask2[0] / this.node.width, 1 - this.mask2[1] / this.node.height));
        this._maskMaterial.setProperty("mask2_size", cc.v2(this.mask2[2] / this.node.width, this.mask2[3] / this.node.height));
    };
    __decorate([
        property([cc.Float])
    ], SLGuideShader.prototype, "mask1", void 0);
    __decorate([
        property([cc.Float])
    ], SLGuideShader.prototype, "mask2", void 0);
    __decorate([
        property(cc.Boolean)
    ], SLGuideShader.prototype, "inverted", void 0);
    __decorate([
        property(cc.Material)
    ], SLGuideShader.prototype, "_maskMaterial", void 0);
    __decorate([
        property(cc.Sprite)
    ], SLGuideShader.prototype, "_sprite", void 0);
    SLGuideShader = __decorate([
        ccclass,
        menu("Shaders/SLGuideShader")
    ], SLGuideShader);
    return SLGuideShader;
}(GComponent_1.default));
exports.default = SLGuideShader;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvU2hhZGVycy9TTEd1aWRlU2hhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUU5QyxJQUFBLEtBQ0osRUFBRSxDQUFDLFVBQVUsRUFEUCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxpQkFBaUIsdUJBQUEsRUFBRSxJQUFJLFVBQ3JELENBQUM7QUFHaEI7SUFBMkMsaUNBQVU7SUFBckQ7UUFBQSxxRUFxRUM7UUFwRXVCLFdBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLFdBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFFekIsbUJBQWEsR0FBZ0IsSUFBSSxDQUFDO1FBQ3BDLGFBQU8sR0FBYyxJQUFJLENBQUM7O0lBK0RqRCxDQUFDO0lBOURDLGdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxRQUFRLEdBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQWMsb0JBQW9CLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pE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QUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7Z0RBQWdDO0lBQy9CO1FBQXJCLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnREFBZ0M7SUFDL0I7UUFBckIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7bURBQTJCO0lBRXpCO1FBQXRCLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3dEQUFtQztJQUNwQztRQUFwQixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFBMkI7SUFONUIsYUFBYTtRQUZqQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLHVCQUF1QixDQUFDO09BQ1QsYUFBYSxDQXFFakM7SUFBRCxvQkFBQztDQXJFRCxBQXFFQyxDQXJFMEMsb0JBQVUsR0FxRXBEO2tCQXJFb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHQ29tcG9uZW50IGZyb20gXCIuLi9Db3JlL0ZyYW1lRXgvR0NvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgcmVxdWlyZUNvbXBvbmVudCwgZXhlY3V0ZUluRWRpdE1vZGUsIG1lbnUgfSA9XHJcbiAgY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuQG1lbnUoXCJTaGFkZXJzL1NMR3VpZGVTaGFkZXJcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0xHdWlkZVNoYWRlciBleHRlbmRzIEdDb21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eShbY2MuRmxvYXRdKSBtYXNrMTogbnVtYmVyW10gPSBbMCwgMCwgMCwgMF07XHJcbiAgQHByb3BlcnR5KFtjYy5GbG9hdF0pIG1hc2syOiBudW1iZXJbXSA9IFswLCAwLCAwLCAwXTtcclxuICBAcHJvcGVydHkoY2MuQm9vbGVhbikgaW52ZXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQHByb3BlcnR5KGNjLk1hdGVyaWFsKSBfbWFza01hdGVyaWFsOiBjYy5NYXRlcmlhbCA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLlNwcml0ZSkgX3Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICBfX29uTG9hZCgpIHtcclxuICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShjYy53aW5TaXplKTtcclxuICAgIGxldCBtYXRlcmlhbCA9XHJcbiAgICAgIHRoaXMuYXNzZXRJbXBsLmdldFByZUxvYWRBc3NldDxjYy5NYXRlcmlhbD4oXCJtYXRlcmlhbHMvdWktZ3VpZGVcIik7XHJcbiAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICBpZiAobWF0ZXJpYWwpIHtcclxuICAgICAgdGhpcy5fc3ByaXRlLnNldE1hdGVyaWFsKDAsIG1hdGVyaWFsKTtcclxuICAgICAgdGhpcy5fbWFza01hdGVyaWFsID0gdGhpcy5fc3ByaXRlLmdldE1hdGVyaWFsKDApO1xyXG4gICAgICB0aGlzLl9tYXNrTWF0ZXJpYWwuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgXCJ3aF9yYXRpb1wiLFxyXG4gICAgICAgIGNjLndpblNpemUud2lkdGggLyBjYy53aW5TaXplLmhlaWdodFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVTZXRNYXNrMShtYXNrMTogbnVtYmVyW10sIG1hc2syPzogbnVtYmVyW10pIHtcclxuICAgIGlmICghdGhpcy5fbWFza01hdGVyaWFsKSByZXR1cm47XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubWFzazFbMF0gPT0gbWFzazFbMF0gJiZcclxuICAgICAgdGhpcy5tYXNrMVsxXSA9PSBtYXNrMVsxXSAmJlxyXG4gICAgICB0aGlzLm1hc2sxWzJdID09IG1hc2sxWzJdICYmXHJcbiAgICAgIHRoaXMubWFzazFbM10gPT0gbWFzazFbM11cclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgdGhpcy5tYXNrMSA9IG1hc2sxO1xyXG4gICAgdGhpcy5fbWFza01hdGVyaWFsLnNldFByb3BlcnR5KFxyXG4gICAgICBcIm1hc2sxX3BvaW50XCIsXHJcbiAgICAgIGNjLnYyKFxyXG4gICAgICAgIHRoaXMubWFzazFbMF0gLyB0aGlzLm5vZGUud2lkdGgsXHJcbiAgICAgICAgMSAtIHRoaXMubWFzazFbMV0gLyB0aGlzLm5vZGUuaGVpZ2h0XHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICB0aGlzLl9tYXNrTWF0ZXJpYWwuc2V0UHJvcGVydHkoXHJcbiAgICAgIFwibWFzazFfc2l6ZVwiLFxyXG4gICAgICBjYy52Mih0aGlzLm1hc2sxWzJdIC8gdGhpcy5ub2RlLndpZHRoLCB0aGlzLm1hc2sxWzNdIC8gdGhpcy5ub2RlLmhlaWdodClcclxuICAgICk7XHJcbiAgICBpZiAobWFzazIpIHRoaXMucmVTZXRNYXNrMihtYXNrMik7XHJcbiAgfVxyXG5cclxuICByZVNldE1hc2syKG1hc2syOiBudW1iZXJbXSkge1xyXG4gICAgaWYgKCF0aGlzLl9tYXNrTWF0ZXJpYWwpIHJldHVybjtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5tYXNrMlswXSA9PSBtYXNrMlswXSAmJlxyXG4gICAgICB0aGlzLm1hc2syWzFdID09IG1hc2syWzFdICYmXHJcbiAgICAgIHRoaXMubWFzazJbMl0gPT0gbWFzazJbMl0gJiZcclxuICAgICAgdGhpcy5tYXNrMlszXSA9PSBtYXNrMlszXVxyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcbiAgICB0aGlzLm1hc2syID0gbWFzazI7XHJcblxyXG4gICAgdGhpcy5fbWFza01hdGVyaWFsLnNldFByb3BlcnR5KFxyXG4gICAgICBcIm1hc2syX3BvaW50XCIsXHJcbiAgICAgIGNjLnYyKFxyXG4gICAgICAgIHRoaXMubWFzazJbMF0gLyB0aGlzLm5vZGUud2lkdGgsXHJcbiAgICAgICAgMSAtIHRoaXMubWFzazJbMV0gLyB0aGlzLm5vZGUuaGVpZ2h0XHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICB0aGlzLl9tYXNrTWF0ZXJpYWwuc2V0UHJvcGVydHkoXHJcbiAgICAgIFwibWFzazJfc2l6ZVwiLFxyXG4gICAgICBjYy52Mih0aGlzLm1hc2syWzJdIC8gdGhpcy5ub2RlLndpZHRoLCB0aGlzLm1hc2syWzNdIC8gdGhpcy5ub2RlLmhlaWdodClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==