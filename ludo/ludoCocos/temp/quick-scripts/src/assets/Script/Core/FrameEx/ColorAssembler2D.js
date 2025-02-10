"use strict";
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