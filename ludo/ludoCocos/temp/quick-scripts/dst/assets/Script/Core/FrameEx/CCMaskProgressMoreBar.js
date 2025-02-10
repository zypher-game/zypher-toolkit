
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/CCMaskProgressMoreBar.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f2a1b5LO6xCVYo4mftLihFZ', 'CCMaskProgressMoreBar');
// Script/Core/FrameEx/CCMaskProgressMoreBar.ts

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
var GLoader_1 = require("../GLoader/GLoader");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var MaskProgressMoreBar = /** @class */ (function (_super) {
    __extends(MaskProgressMoreBar, _super);
    function MaskProgressMoreBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allNum = null;
        _this.proLabel = null;
        _this._totalLenth = 100;
        _this._nTotal = 10000;
        _this._barNum = 1;
        _this._progress = 0;
        _this._maskBars = [];
        return _this;
    }
    Object.defineProperty(MaskProgressMoreBar.prototype, "totalLenth", {
        get: function () {
            return this._totalLenth;
        },
        set: function (value) {
            if (this._totalLenth == value)
                return;
            this._totalLenth = value;
            this._initStatus();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskProgressMoreBar.prototype, "nTotal", {
        get: function () {
            return this._nTotal;
        },
        set: function (value) {
            if (this._nTotal == value)
                return;
            this._nTotal = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskProgressMoreBar.prototype, "barNum", {
        get: function () {
            return this._barNum;
        },
        set: function (value) {
            if (this._barNum == value)
                return;
            this._barNum = value;
            this._initStatus();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskProgressMoreBar.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            if (this._progress == value)
                return;
            this._progress = cc.misc.clamp01(value);
            this._updateBarStatus();
        },
        enumerable: false,
        configurable: true
    });
    MaskProgressMoreBar.prototype._initStatus = function () {
        var _this = this;
        this.node.destroyAllChildren();
        this._maskBars = [];
        if (this.allNum) {
            this.allNum.string = this._barNum.toString();
        }
        var _loop_1 = function (i) {
            var maskNode = new cc.Node("maskNode_" + i);
            maskNode.height = this_1.node.height - 4;
            maskNode.width = 0;
            maskNode.anchorX = 0;
            var mask = maskNode.addComponent(cc.Mask);
            var bar = new cc.Node("bar").addComponent(cc.Sprite);
            bar.type = cc.Sprite.Type.SLICED;
            var index = this_1._barNum != 1 ? i % 7 : i - 1;
            GLoader_1.GLoader.spriteAtlasFrame(bar, "", "bar_" + index, function () {
                bar.node.height = _this.node.height - 4;
                bar.node.width = _this.totalLenth;
            });
            bar.node.anchorX = 0;
            maskNode.addChild(bar.node);
            this_1.node.addChild(maskNode);
            maskNode.position = cc.v3(-this_1.totalLenth / 2, 0);
            this_1._maskBars.push(maskNode);
        };
        var this_1 = this;
        for (var i = 1; i <= this._barNum; i++) {
            _loop_1(i);
        }
        this.progress = 0;
    };
    MaskProgressMoreBar.prototype._updateBarStatus = function () {
        if (!this._maskBars || !this._maskBars.length)
            return;
        var singlePro = 1 / this._barNum;
        var curSinglePro = 1;
        for (var i = 0; i < this._maskBars.length; i++) {
            var maskBar = this._maskBars[i];
            var v = i + 1;
            if (this._progress >= v * singlePro) {
                maskBar.width = this._totalLenth;
            }
            else {
                var pro = this._progress - i * singlePro;
                if (pro > 0) {
                    curSinglePro = pro;
                    if (this.allNum) {
                        this.allNum.node.parent.active = this._barNum > 1;
                        this.allNum.string = (v - 1).toString();
                    }
                }
                else {
                    pro = 0;
                }
                maskBar.width = this._totalLenth * (pro / singlePro);
            }
        }
        if (this.proLabel) {
            if (this._barNum > 1) {
                this.proLabel.string = Math.floor(curSinglePro * singlePro * this._nTotal) + " /" + Math.floor(this._nTotal * singlePro);
            }
            else {
                this.proLabel.string = Math.floor(this._progress * this._nTotal) + " /" + Math.floor(this._nTotal);
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], MaskProgressMoreBar.prototype, "allNum", void 0);
    __decorate([
        property(cc.Label)
    ], MaskProgressMoreBar.prototype, "proLabel", void 0);
    __decorate([
        property
    ], MaskProgressMoreBar.prototype, "_totalLenth", void 0);
    __decorate([
        property
    ], MaskProgressMoreBar.prototype, "totalLenth", null);
    __decorate([
        property
    ], MaskProgressMoreBar.prototype, "_nTotal", void 0);
    __decorate([
        property
    ], MaskProgressMoreBar.prototype, "nTotal", null);
    __decorate([
        property
    ], MaskProgressMoreBar.prototype, "_barNum", void 0);
    __decorate([
        property
    ], MaskProgressMoreBar.prototype, "barNum", null);
    __decorate([
        property
    ], MaskProgressMoreBar.prototype, "_progress", void 0);
    __decorate([
        property({ range: [0, 1, 0.001], slide: true })
    ], MaskProgressMoreBar.prototype, "progress", null);
    MaskProgressMoreBar = __decorate([
        ccclass,
        menu("FrameEx/CCMaskProgressMoreBar")
    ], MaskProgressMoreBar);
    return MaskProgressMoreBar;
}(cc.Component));
exports.default = MaskProgressMoreBar;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0NDTWFza1Byb2dyZXNzTW9yZUJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNkM7QUFFdkMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFJbEQ7SUFBaUQsdUNBQVk7SUFBN0Q7UUFBQSxxRUFnSEM7UUEvR3FCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFDeEIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUVwQyxpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQVcxQixhQUFPLEdBQVcsS0FBSyxDQUFDO1FBVXhCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFXcEIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQVd0QixlQUFTLEdBQWMsRUFBRSxDQUFDOztJQWlFdEMsQ0FBQztJQTFHQyxzQkFBVywyQ0FBVTthQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDO2FBQ0QsVUFBc0IsS0FBYTtZQUNqQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksS0FBSztnQkFBRSxPQUFPO1lBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDOzs7T0FMQTtJQVNELHNCQUFXLHVDQUFNO2FBQWpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7YUFDRCxVQUFrQixLQUFhO1lBQzdCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLO2dCQUFFLE9BQU87WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQzs7O09BSkE7SUFRRCxzQkFBVyx1Q0FBTTthQUFqQjtZQUNFLE9BQU8sSUFBSSxD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SUFBRCwwQkFBQztDQWhIRCxBQWdIQyxDQWhIZ0QsRUFBRSxDQUFDLFNBQVMsR0FnSDVEO2tCQWhIb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR0xvYWRlciB9IGZyb20gXCIuLi9HTG9hZGVyL0dMb2FkZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIkZyYW1lRXgvQ0NNYXNrUHJvZ3Jlc3NNb3JlQmFyXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc2tQcm9ncmVzc01vcmVCYXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbCkgYWxsTnVtOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgQHByb3BlcnR5KGNjLkxhYmVsKSBwcm9MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkgX3RvdGFsTGVudGg6IG51bWJlciA9IDEwMDtcclxuICBAcHJvcGVydHlcclxuICBwdWJsaWMgZ2V0IHRvdGFsTGVudGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdG90YWxMZW50aDtcclxuICB9XHJcbiAgcHVibGljIHNldCB0b3RhbExlbnRoKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLl90b3RhbExlbnRoID09IHZhbHVlKSByZXR1cm47XHJcbiAgICB0aGlzLl90b3RhbExlbnRoID0gdmFsdWU7XHJcbiAgICB0aGlzLl9pbml0U3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICBAcHJvcGVydHkgX25Ub3RhbDogbnVtYmVyID0gMTAwMDA7XHJcbiAgQHByb3BlcnR5XHJcbiAgcHVibGljIGdldCBuVG90YWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fblRvdGFsO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IG5Ub3RhbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fblRvdGFsID09IHZhbHVlKSByZXR1cm47XHJcbiAgICB0aGlzLl9uVG90YWwgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBwcm9wZXJ0eSBfYmFyTnVtOiBudW1iZXIgPSAxO1xyXG4gIEBwcm9wZXJ0eVxyXG4gIHB1YmxpYyBnZXQgYmFyTnVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Jhck51bTtcclxuICB9XHJcbiAgcHVibGljIHNldCBiYXJOdW0odmFsdWU6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuX2Jhck51bSA9PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fYmFyTnVtID0gdmFsdWU7XHJcbiAgICB0aGlzLl9pbml0U3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICBAcHJvcGVydHkgX3Byb2dyZXNzOiBudW1iZXIgPSAwO1xyXG4gIEBwcm9wZXJ0eSh7IHJhbmdlOiBbMCwgMSwgMC4wMDFdLCBzbGlkZTogdHJ1ZSB9KVxyXG4gIHB1YmxpYyBnZXQgcHJvZ3Jlc3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3M7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgcHJvZ3Jlc3ModmFsdWU6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzID09IHZhbHVlKSByZXR1cm47XHJcbiAgICB0aGlzLl9wcm9ncmVzcyA9IGNjLm1pc2MuY2xhbXAwMSh2YWx1ZSk7XHJcbiAgICB0aGlzLl91cGRhdGVCYXJTdGF0dXMoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfbWFza0JhcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICBwcm90ZWN0ZWQgX2luaXRTdGF0dXMoKSB7XHJcbiAgICB0aGlzLm5vZGUuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICB0aGlzLl9tYXNrQmFycyA9IFtdO1xyXG4gICAgaWYgKHRoaXMuYWxsTnVtKSB7XHJcbiAgICAgIHRoaXMuYWxsTnVtLnN0cmluZyA9IHRoaXMuX2Jhck51bS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5fYmFyTnVtOyBpKyspIHtcclxuICAgICAgbGV0IG1hc2tOb2RlID0gbmV3IGNjLk5vZGUoYG1hc2tOb2RlXyR7aX1gKTtcclxuICAgICAgbWFza05vZGUuaGVpZ2h0ID0gdGhpcy5ub2RlLmhlaWdodCAtIDQ7XHJcbiAgICAgIG1hc2tOb2RlLndpZHRoID0gMDtcclxuICAgICAgbWFza05vZGUuYW5jaG9yWCA9IDA7XHJcbiAgICAgIGxldCBtYXNrID0gbWFza05vZGUuYWRkQ29tcG9uZW50KGNjLk1hc2spO1xyXG4gICAgICBsZXQgYmFyID0gbmV3IGNjLk5vZGUoXCJiYXJcIikuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgIGJhci50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0xJQ0VEO1xyXG4gICAgICBsZXQgaW5kZXggPSB0aGlzLl9iYXJOdW0gIT0gMSA/IGkgJSA3IDogaSAtIDE7XHJcbiAgICAgIEdMb2FkZXIuc3ByaXRlQXRsYXNGcmFtZShiYXIsIFwiXCIsIFwiYmFyX1wiICsgaW5kZXgsICgpID0+IHtcclxuICAgICAgICBiYXIubm9kZS5oZWlnaHQgPSB0aGlzLm5vZGUuaGVpZ2h0IC0gNDtcclxuICAgICAgICBiYXIubm9kZS53aWR0aCA9IHRoaXMudG90YWxMZW50aDtcclxuICAgICAgfSk7XHJcbiAgICAgIGJhci5ub2RlLmFuY2hvclggPSAwO1xyXG4gICAgICBtYXNrTm9kZS5hZGRDaGlsZChiYXIubm9kZSk7XHJcbiAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChtYXNrTm9kZSk7XHJcbiAgICAgIG1hc2tOb2RlLnBvc2l0aW9uID0gY2MudjMoLXRoaXMudG90YWxMZW50aCAvIDIsIDApO1xyXG4gICAgICB0aGlzLl9tYXNrQmFycy5wdXNoKG1hc2tOb2RlKTtcclxuICAgIH1cclxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF91cGRhdGVCYXJTdGF0dXMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX21hc2tCYXJzIHx8ICF0aGlzLl9tYXNrQmFycy5sZW5ndGgpIHJldHVybjtcclxuICAgIGxldCBzaW5nbGVQcm8gPSAxIC8gdGhpcy5fYmFyTnVtO1xyXG4gICAgbGV0IGN1clNpbmdsZVBybyA9IDE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21hc2tCYXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBtYXNrQmFyID0gdGhpcy5fbWFza0JhcnNbaV07XHJcbiAgICAgIGxldCB2ID0gaSArIDE7XHJcbiAgICAgIGlmICh0aGlzLl9wcm9ncmVzcyA+PSB2ICogc2luZ2xlUHJvKSB7XHJcbiAgICAgICAgbWFza0Jhci53aWR0aCA9IHRoaXMuX3RvdGFsTGVudGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHBybyA9IHRoaXMuX3Byb2dyZXNzIC0gaSAqIHNpbmdsZVBybztcclxuICAgICAgICBpZiAocHJvID4gMCkge1xyXG4gICAgICAgICAgY3VyU2luZ2xlUHJvID0gcHJvO1xyXG4gICAgICAgICAgaWYgKHRoaXMuYWxsTnVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsTnVtLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRoaXMuX2Jhck51bSA+IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsTnVtLnN0cmluZyA9ICh2IC0gMSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcHJvID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWFza0Jhci53aWR0aCA9IHRoaXMuX3RvdGFsTGVudGggKiAocHJvIC8gc2luZ2xlUHJvKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucHJvTGFiZWwpIHtcclxuICAgICAgaWYgKHRoaXMuX2Jhck51bSA+IDEpIHtcclxuICAgICAgICB0aGlzLnByb0xhYmVsLnN0cmluZyA9IGAke01hdGguZmxvb3IoXHJcbiAgICAgICAgICBjdXJTaW5nbGVQcm8gKiBzaW5nbGVQcm8gKiB0aGlzLl9uVG90YWxcclxuICAgICAgICApfSAvJHtNYXRoLmZsb29yKHRoaXMuX25Ub3RhbCAqIHNpbmdsZVBybyl9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnByb0xhYmVsLnN0cmluZyA9IGAke01hdGguZmxvb3IoXHJcbiAgICAgICAgICB0aGlzLl9wcm9ncmVzcyAqIHRoaXMuX25Ub3RhbFxyXG4gICAgICAgICl9IC8ke01hdGguZmxvb3IodGhpcy5fblRvdGFsKX1gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==