"use strict";
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