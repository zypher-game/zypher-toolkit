"use strict";
cc._RF.push(module, 'da1a888Gz9DV6hrcYntj+Do', 'CCMaskProgressBar');
// Script/Core/FrameEx/CCMaskProgressBar.ts

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
exports.MaskProgressMode = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var MaskProgressMode;
(function (MaskProgressMode) {
    MaskProgressMode[MaskProgressMode["HORIZONTAL"] = 0] = "HORIZONTAL";
    MaskProgressMode[MaskProgressMode["VERTICAL"] = 1] = "VERTICAL";
})(MaskProgressMode = exports.MaskProgressMode || (exports.MaskProgressMode = {}));
var MaskProgressBar = /** @class */ (function (_super) {
    __extends(MaskProgressBar, _super);
    function MaskProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._maskBar = null;
        _this._barSprite = null;
        _this._mode = MaskProgressMode.HORIZONTAL;
        _this._totalLenth = 100;
        _this._progress = 0;
        _this._reverse = false;
        return _this;
    }
    Object.defineProperty(MaskProgressBar.prototype, "maskBar", {
        get: function () {
            return this._maskBar;
        },
        set: function (value) {
            if (this._maskBar == value)
                return;
            this._maskBar = value;
            this._initStatus();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskProgressBar.prototype, "barSprite", {
        get: function () {
            return this._barSprite;
        },
        set: function (value) {
            if (this._barSprite == value)
                return;
            this._barSprite = value;
            this._initStatus();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskProgressBar.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            if (this._mode == value)
                return;
            this._mode = value;
            this._initStatus();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MaskProgressBar.prototype, "totalLenth", {
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
    Object.defineProperty(MaskProgressBar.prototype, "progress", {
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
    Object.defineProperty(MaskProgressBar.prototype, "reverse", {
        get: function () {
            return this._reverse;
        },
        set: function (value) {
            if (this._reverse == value)
                return;
            this._reverse = value;
            this._initStatus();
        },
        enumerable: false,
        configurable: true
    });
    MaskProgressBar.prototype._initStatus = function () {
        if (!this.maskBar)
            return;
        if (!this.barSprite)
            return;
        switch (this._mode) {
            case MaskProgressMode.HORIZONTAL: {
                this._barSprite.node.width = this._totalLenth;
                break;
            }
            case MaskProgressMode.VERTICAL: {
                this._barSprite.node.height = this._totalLenth;
                break;
            }
        }
        this.maskBar.getComponent(cc.Mask).inverted = this._reverse;
        this._updateBarStatus();
    };
    MaskProgressBar.prototype._updateBarStatus = function () {
        if (!this._maskBar)
            return;
        switch (this._mode) {
            case MaskProgressMode.HORIZONTAL: {
                this._maskBar.width = this._totalLenth * this._progress;
                break;
            }
            case MaskProgressMode.VERTICAL: {
                this.maskBar.height = this._totalLenth * this._progress;
                break;
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], MaskProgressBar.prototype, "_maskBar", void 0);
    __decorate([
        property({ type: cc.Node })
    ], MaskProgressBar.prototype, "maskBar", null);
    __decorate([
        property(cc.Sprite)
    ], MaskProgressBar.prototype, "_barSprite", void 0);
    __decorate([
        property({ type: cc.Sprite })
    ], MaskProgressBar.prototype, "barSprite", null);
    __decorate([
        property({ type: cc.Enum(MaskProgressMode) })
    ], MaskProgressBar.prototype, "_mode", void 0);
    __decorate([
        property({ type: cc.Enum(MaskProgressMode) })
    ], MaskProgressBar.prototype, "mode", null);
    __decorate([
        property
    ], MaskProgressBar.prototype, "_totalLenth", void 0);
    __decorate([
        property
    ], MaskProgressBar.prototype, "totalLenth", null);
    __decorate([
        property
    ], MaskProgressBar.prototype, "_progress", void 0);
    __decorate([
        property({ range: [0, 1, 0.01], slide: true })
    ], MaskProgressBar.prototype, "progress", null);
    __decorate([
        property
    ], MaskProgressBar.prototype, "_reverse", void 0);
    __decorate([
        property
    ], MaskProgressBar.prototype, "reverse", null);
    MaskProgressBar = __decorate([
        ccclass,
        menu("FrameEx/MaskProgressBar")
    ], MaskProgressBar);
    return MaskProgressBar;
}(cc.Component));
exports.default = MaskProgressBar;

cc._RF.pop();