
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/CCMaskProgressBar.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0NDTWFza1Byb2dyZXNzQmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUVsRCxJQUFZLGdCQUdYO0FBSEQsV0FBWSxnQkFBZ0I7SUFDMUIsbUVBQVUsQ0FBQTtJQUNWLCtEQUFRLENBQUE7QUFDVixDQUFDLEVBSFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFHM0I7QUFJRDtJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXVHQztRQXRHb0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQVl2QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQVdILFdBQUssR0FDbEQsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1FBWXBCLGlCQUFXLEdBQVcsR0FBRyxDQUFDO1FBWTFCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFXdEIsY0FBUSxHQUFZLEtBQUssQ0FBQzs7SUEyQ3RDLENBQUM7SUFuR0Msc0JBQVcsb0NBQU87YUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzthQUNELFVBQW1CLEtBQWM7WUFDL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUs7Z0JBQUUsT0FBTztZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQzs7O09BTEE7SUFTRCxzQkFBVyxzQ0FBUzthQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO2FBQ0QsVUFBcUIsS0FBZ0I7WUFDbkMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUs7Z0JBQUUsT0FBTztZ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Q0FBQyxTQUFTLENBQUM7Z0JBQ3hELE1BQU07YUFDUDtTQUNGO0lBQ0gsQ0FBQztJQXJHa0I7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQTBCO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztrREFHM0I7SUFPb0I7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQThCO0lBRWxEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvREFHN0I7SUFPOEM7UUFBOUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO2tEQUNoQjtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQzsrQ0FHN0M7SUFPUztRQUFULFFBQVE7d0RBQTJCO0lBR3BDO1FBREMsUUFBUTtxREFHUjtJQU9TO1FBQVQsUUFBUTtzREFBdUI7SUFFaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzttREFHOUM7SUFPUztRQUFULFFBQVE7cURBQTJCO0lBRXBDO1FBREMsUUFBUTtrREFHUjtJQWhFa0IsZUFBZTtRQUZuQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLHlCQUF5QixDQUFDO09BQ1gsZUFBZSxDQXVHbkM7SUFBRCxzQkFBQztDQXZHRCxBQXVHQyxDQXZHNEMsRUFBRSxDQUFDLFNBQVMsR0F1R3hEO2tCQXZHb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBNYXNrUHJvZ3Jlc3NNb2RlIHtcclxuICBIT1JJWk9OVEFMLFxyXG4gIFZFUlRJQ0FMLFxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5AbWVudShcIkZyYW1lRXgvTWFza1Byb2dyZXNzQmFyXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hc2tQcm9ncmVzc0JhciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIF9tYXNrQmFyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSB9KVxyXG4gIHB1YmxpYyBnZXQgbWFza0JhcigpOiBjYy5Ob2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXNrQmFyO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IG1hc2tCYXIodmFsdWU6IGNjLk5vZGUpIHtcclxuICAgIGlmICh0aGlzLl9tYXNrQmFyID09IHZhbHVlKSByZXR1cm47XHJcbiAgICB0aGlzLl9tYXNrQmFyID0gdmFsdWU7XHJcbiAgICB0aGlzLl9pbml0U3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICBAcHJvcGVydHkoY2MuU3ByaXRlKSBfYmFyU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlNwcml0ZSB9KVxyXG4gIHB1YmxpYyBnZXQgYmFyU3ByaXRlKCk6IGNjLlNwcml0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYmFyU3ByaXRlO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IGJhclNwcml0ZSh2YWx1ZTogY2MuU3ByaXRlKSB7XHJcbiAgICBpZiAodGhpcy5fYmFyU3ByaXRlID09IHZhbHVlKSByZXR1cm47XHJcbiAgICB0aGlzLl9iYXJTcHJpdGUgPSB2YWx1ZTtcclxuICAgIHRoaXMuX2luaXRTdGF0dXMoKTtcclxuICB9XHJcblxyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oTWFza1Byb2dyZXNzTW9kZSkgfSkgX21vZGU6IE1hc2tQcm9ncmVzc01vZGUgPVxyXG4gICAgTWFza1Byb2dyZXNzTW9kZS5IT1JJWk9OVEFMO1xyXG5cclxuICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKE1hc2tQcm9ncmVzc01vZGUpIH0pXHJcbiAgcHVibGljIGdldCBtb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgbW9kZSh2YWx1ZTogTWFza1Byb2dyZXNzTW9kZSkge1xyXG4gICAgaWYgKHRoaXMuX21vZGUgPT0gdmFsdWUpIHJldHVybjtcclxuICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcclxuICAgIHRoaXMuX2luaXRTdGF0dXMoKTtcclxuICB9XHJcblxyXG4gIEBwcm9wZXJ0eSBfdG90YWxMZW50aDogbnVtYmVyID0gMTAwO1xyXG5cclxuICBAcHJvcGVydHlcclxuICBwdWJsaWMgZ2V0IHRvdGFsTGVudGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdG90YWxMZW50aDtcclxuICB9XHJcbiAgcHVibGljIHNldCB0b3RhbExlbnRoKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLl90b3RhbExlbnRoID09IHZhbHVlKSByZXR1cm47XHJcbiAgICB0aGlzLl90b3RhbExlbnRoID0gdmFsdWU7XHJcbiAgICB0aGlzLl9pbml0U3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICBAcHJvcGVydHkgX3Byb2dyZXNzOiBudW1iZXIgPSAwO1xyXG4gIEBwcm9wZXJ0eSh7IHJhbmdlOiBbMCwgMSwgMC4wMV0sIHNsaWRlOiB0cnVlIH0pXHJcbiAgcHVibGljIGdldCBwcm9ncmVzcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9ncmVzcztcclxuICB9XHJcbiAgcHVibGljIHNldCBwcm9ncmVzcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3MgPT0gdmFsdWUpIHJldHVybjtcclxuICAgIHRoaXMuX3Byb2dyZXNzID0gY2MubWlzYy5jbGFtcDAxKHZhbHVlKTtcclxuICAgIHRoaXMuX3VwZGF0ZUJhclN0YXR1cygpO1xyXG4gIH1cclxuXHJcbiAgQHByb3BlcnR5IF9yZXZlcnNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQHByb3BlcnR5XHJcbiAgcHVibGljIGdldCByZXZlcnNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JldmVyc2U7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgcmV2ZXJzZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHRoaXMuX3JldmVyc2UgPT0gdmFsdWUpIHJldHVybjtcclxuICAgIHRoaXMuX3JldmVyc2UgPSB2YWx1ZTtcclxuICAgIHRoaXMuX2luaXRTdGF0dXMoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfaW5pdFN0YXR1cygpIHtcclxuICAgIGlmICghdGhpcy5tYXNrQmFyKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMuYmFyU3ByaXRlKSByZXR1cm47XHJcbiAgICBzd2l0Y2ggKHRoaXMuX21vZGUpIHtcclxuICAgICAgY2FzZSBNYXNrUHJvZ3Jlc3NNb2RlLkhPUklaT05UQUw6IHtcclxuICAgICAgICB0aGlzLl9iYXJTcHJpdGUubm9kZS53aWR0aCA9IHRoaXMuX3RvdGFsTGVudGg7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBNYXNrUHJvZ3Jlc3NNb2RlLlZFUlRJQ0FMOiB7XHJcbiAgICAgICAgdGhpcy5fYmFyU3ByaXRlLm5vZGUuaGVpZ2h0ID0gdGhpcy5fdG90YWxMZW50aDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWFza0Jhci5nZXRDb21wb25lbnQoY2MuTWFzaykuaW52ZXJ0ZWQgPSB0aGlzLl9yZXZlcnNlO1xyXG5cclxuICAgIHRoaXMuX3VwZGF0ZUJhclN0YXR1cygpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF91cGRhdGVCYXJTdGF0dXMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX21hc2tCYXIpIHJldHVybjtcclxuICAgIHN3aXRjaCAodGhpcy5fbW9kZSkge1xyXG4gICAgICBjYXNlIE1hc2tQcm9ncmVzc01vZGUuSE9SSVpPTlRBTDoge1xyXG4gICAgICAgIHRoaXMuX21hc2tCYXIud2lkdGggPSB0aGlzLl90b3RhbExlbnRoICogdGhpcy5fcHJvZ3Jlc3M7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBNYXNrUHJvZ3Jlc3NNb2RlLlZFUlRJQ0FMOiB7XHJcbiAgICAgICAgdGhpcy5tYXNrQmFyLmhlaWdodCA9IHRoaXMuX3RvdGFsTGVudGggKiB0aGlzLl9wcm9ncmVzcztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=