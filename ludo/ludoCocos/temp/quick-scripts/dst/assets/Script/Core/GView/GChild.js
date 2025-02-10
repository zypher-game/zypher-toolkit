
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GChild.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3781fN+KnxMdKC1uHYVdlix', 'GChild');
// Script/Core/GView/GChild.ts

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
var GComponent_1 = require("../FrameEx/GComponent");
var GCtrl_1 = require("../GCtrl");
var GLoader_1 = require("../GLoader/GLoader");
var GCustomData_1 = require("./GCustomData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var GChild = /** @class */ (function (_super) {
    __extends(GChild, _super);
    function GChild() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._customData = null;
        return _this;
    }
    Object.defineProperty(GChild.prototype, "assetImpl", {
        get: function () {
            if (!this._assetImpl) {
                this._assetImpl = GLoader_1.GAssetImpl.getAssetImpl(cc.js.getClassName(this) + this.uuid);
            }
            return this._assetImpl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GChild.prototype, "customData", {
        get: function () {
            return this._customData;
        },
        enumerable: false,
        configurable: true
    });
    GChild.prototype.setCustomData = function (data) {
        if (!this._customData) {
            this._customData = this.node.addComponent(GCustomData_1.default);
        }
        this._customData.setData(data);
    };
    GChild.prototype.__onLoad = function () {
        this.onGLoad();
    };
    GChild.prototype.onGLoad = function () { };
    GChild.prototype.onGStart = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    GChild.prototype.__onDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this);
        GCtrl_1.GCtrl.ES.off(this.node);
        GCtrl_1.GCtrl.ES.emit("ONGChildDestroy", GCtrl_1.GCtrl.param(this));
        this.onGDestroy();
    };
    GChild.prototype.onGDestroy = function () { };
    GChild = __decorate([
        ccclass,
        menu("View/GBase/GChild")
    ], GChild);
    return GChild;
}(GComponent_1.default));
exports.default = GChild;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HQ2hpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQStDO0FBQy9DLGtDQUFpQztBQUNqQyw4Q0FBZ0Q7QUFDaEQsNkNBQXdDO0FBRWxDLElBQUEsS0FBOEIsRUFBRSxDQUFDLFVBQVUsRUFBekMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBR2xEO0lBQW9DLDBCQUFVO0lBQTlDO1FBQUEscUVBcUNDO1FBM0JXLGlCQUFXLEdBQWdCLElBQUksQ0FBQzs7SUEyQjVDLENBQUM7SUFwQ0Msc0JBQVcsNkJBQVM7YUFBcEI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBVSxDQUFDLFlBQVksQ0FDdkMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDckMsQ0FBQzthQUNIO1lBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsOEJBQVU7YUFBckI7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFDTSw4QkFBYSxHQUFwQixVQUFxQixJQUFJO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVTLHlCQUFRLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSx3QkFBTyxHQUFkLGNBQWtCLENBQUM7SUFFWix5QkFBUSxHQUFmO1FBQWdCLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O0lBQUcsQ0FBQztJQUVqQiw0QkFBVyxHQUFyQjtRQUNFLGFBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLGFBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixhQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxhQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSwyQkFBVSxHQUFqQixjQUFxQixDQUFDO0lBcENILE1BQU07UUFGMUIsT0FBTztRQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztPQUNMLE1BQU0sQ0FxQzFCO0lBQUQsYUFBQztDQXJDRCxBQXFDQyxDQXJDbUMsb0JBQVUsR0FxQzdDO2tCQXJDb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHQ29tcG9uZW50IGZyb20gXCIuLi9GcmFtZUV4L0dDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vR0N0cmxcIjtcclxuaW1wb3J0IHsgR0Fzc2V0SW1wbCB9IGZyb20gXCIuLi9HTG9hZGVyL0dMb2FkZXJcIjtcclxuaW1wb3J0IEdDdXN0b21EYXRhIGZyb20gXCIuL0dDdXN0b21EYXRhXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIlZpZXcvR0Jhc2UvR0NoaWxkXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdDaGlsZCBleHRlbmRzIEdDb21wb25lbnQge1xyXG4gIHB1YmxpYyBnZXQgYXNzZXRJbXBsKCk6IEdBc3NldEltcGwge1xyXG4gICAgaWYgKCF0aGlzLl9hc3NldEltcGwpIHtcclxuICAgICAgdGhpcy5fYXNzZXRJbXBsID0gR0Fzc2V0SW1wbC5nZXRBc3NldEltcGwoXHJcbiAgICAgICAgY2MuanMuZ2V0Q2xhc3NOYW1lKHRoaXMpICsgdGhpcy51dWlkXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fYXNzZXRJbXBsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9jdXN0b21EYXRhOiBHQ3VzdG9tRGF0YSA9IG51bGw7XHJcbiAgcHVibGljIGdldCBjdXN0b21EYXRhKCk6IEdDdXN0b21EYXRhIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXN0b21EYXRhO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0Q3VzdG9tRGF0YShkYXRhKSB7XHJcbiAgICBpZiAoIXRoaXMuX2N1c3RvbURhdGEpIHtcclxuICAgICAgdGhpcy5fY3VzdG9tRGF0YSA9IHRoaXMubm9kZS5hZGRDb21wb25lbnQoR0N1c3RvbURhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY3VzdG9tRGF0YS5zZXREYXRhKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9fb25Mb2FkKCkge1xyXG4gICAgdGhpcy5vbkdMb2FkKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25HTG9hZCgpIHt9XHJcblxyXG4gIHB1YmxpYyBvbkdTdGFydCguLi5hcmdzKSB7fVxyXG5cclxuICBwcm90ZWN0ZWQgX19vbkRlc3Ryb3koKSB7XHJcbiAgICBHQ3RybC5FUy5vZmYodGhpcyk7XHJcbiAgICBHQ3RybC5FUy5vZmYodGhpcy5ub2RlKTtcclxuICAgIEdDdHJsLkVTLmVtaXQoXCJPTkdDaGlsZERlc3Ryb3lcIiwgR0N0cmwucGFyYW0odGhpcykpO1xyXG4gICAgdGhpcy5vbkdEZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25HRGVzdHJveSgpIHt9XHJcbn1cclxuIl19