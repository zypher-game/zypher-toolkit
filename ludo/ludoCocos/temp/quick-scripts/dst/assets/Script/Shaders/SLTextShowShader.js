
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Shaders/SLTextShowShader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9cec2sM/K1ES6arCcYpGUGk', 'SLTextShowShader');
// Script/Shaders/SLTextShowShader.ts

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
var SLTextShowShader = /** @class */ (function (_super) {
    __extends(SLTextShowShader, _super);
    function SLTextShowShader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._maskMaterial = null;
        _this._sprite = null;
        _this._easpTime = 0;
        return _this;
    }
    SLTextShowShader.prototype.__onLoad = function () {
        this._sprite = this.node.getComponent(cc.Sprite);
        var frame = this._sprite.spriteFrame;
        frame["__unpack"] = true;
        this._maskMaterial = this._sprite.getMaterial(0);
    };
    SLTextShowShader.prototype.update = function (dt) {
        this._easpTime += dt;
        if (this._easpTime > 5) {
            this._easpTime = 5;
        }
        this._maskMaterial.setProperty("u_time", this._easpTime / 3);
    };
    __decorate([
        property(cc.Material)
    ], SLTextShowShader.prototype, "_maskMaterial", void 0);
    __decorate([
        property(cc.Sprite)
    ], SLTextShowShader.prototype, "_sprite", void 0);
    SLTextShowShader = __decorate([
        ccclass,
        menu("Shaders/SLTextShowShader"),
        executeInEditMode
    ], SLTextShowShader);
    return SLTextShowShader;
}(GComponent_1.default));
exports.default = SLTextShowShader;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvU2hhZGVycy9TTFRleHRTaG93U2hhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUU5QyxJQUFBLEtBQ0osRUFBRSxDQUFDLFVBQVUsRUFEUCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxpQkFBaUIsdUJBQUEsRUFBRSxJQUFJLFVBQ3JELENBQUM7QUFJaEI7SUFBOEMsb0NBQVU7SUFBeEQ7UUFBQSxxRUFtQkM7UUFsQndCLG1CQUFhLEdBQWdCLElBQUksQ0FBQztRQUNwQyxhQUFPLEdBQWMsSUFBSSxDQUFDO1FBRXJDLGVBQVMsR0FBVyxDQUFDLENBQUM7O0lBZWxDLENBQUM7SUFkQyxtQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDckMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxpQ0FBTSxHQUFOLFVBQU8sRUFBVTtRQUNmLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBakJzQjtRQUF0QixRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyREFBbUM7SUFDcEM7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQTJCO0lBRjVCLGdCQUFnQjtRQUhwQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQ2hDLGlCQUFpQjtPQUNHLGdCQUFnQixDQW1CcEM7SUFBRCx1QkFBQztDQW5CRCxBQW1CQyxDQW5CNkMsb0JBQVUsR0FtQnZEO2tCQW5Cb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdDb21wb25lbnQgZnJvbSBcIi4uL0NvcmUvRnJhbWVFeC9HQ29tcG9uZW50XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCByZXF1aXJlQ29tcG9uZW50LCBleGVjdXRlSW5FZGl0TW9kZSwgbWVudSB9ID1cclxuICBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIlNoYWRlcnMvU0xUZXh0U2hvd1NoYWRlclwiKVxyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0xUZXh0U2hvd1NoYWRlciBleHRlbmRzIEdDb21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eShjYy5NYXRlcmlhbCkgX21hc2tNYXRlcmlhbDogY2MuTWF0ZXJpYWwgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGUpIF9zcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gIHByb3RlY3RlZCBfZWFzcFRpbWU6IG51bWJlciA9IDA7XHJcbiAgX19vbkxvYWQoKSB7XHJcbiAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICBsZXQgZnJhbWUgPSB0aGlzLl9zcHJpdGUuc3ByaXRlRnJhbWU7XHJcbiAgICBmcmFtZVtcIl9fdW5wYWNrXCJdID0gdHJ1ZTtcclxuICAgIHRoaXMuX21hc2tNYXRlcmlhbCA9IHRoaXMuX3Nwcml0ZS5nZXRNYXRlcmlhbCgwKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9lYXNwVGltZSArPSBkdDtcclxuICAgIGlmICh0aGlzLl9lYXNwVGltZSA+IDUpIHtcclxuICAgICAgdGhpcy5fZWFzcFRpbWUgPSA1O1xyXG4gICAgfVxyXG4gICAgdGhpcy5fbWFza01hdGVyaWFsLnNldFByb3BlcnR5KFwidV90aW1lXCIsIHRoaXMuX2Vhc3BUaW1lIC8gMyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==