
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GViewBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1748aoYG0FJiZyLwTmAQmAA', 'GViewBase');
// Script/Core/GView/GViewBase.ts

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
exports.WidgetInfo = exports.HangOnType = exports.ViewAction = exports.SizeModel = void 0;
/**
 * @name GViewBase
 * @author  visow
 * @description  视图组件基类
 * @class GViewBase
 */
var GComponent_1 = require("../FrameEx/GComponent");
var GCtrl_1 = require("../GCtrl");
var setBgFit_1 = require("../utils/setBgFit");
var SizeModel;
(function (SizeModel) {
    SizeModel[SizeModel["Normal"] = 0] = "Normal";
    SizeModel[SizeModel["ReWidth"] = 1] = "ReWidth";
    SizeModel[SizeModel["ReHeight"] = 2] = "ReHeight";
    SizeModel[SizeModel["ReSizeAll"] = 3] = "ReSizeAll";
})(SizeModel = exports.SizeModel || (exports.SizeModel = {}));
var ViewAction;
(function (ViewAction) {
    ViewAction[ViewAction["NONE"] = 0] = "NONE";
    ViewAction[ViewAction["SCALE"] = 1] = "SCALE";
    ViewAction[ViewAction["YMove"] = 2] = "YMove";
    ViewAction[ViewAction["Fade"] = 3] = "Fade";
})(ViewAction = exports.ViewAction || (exports.ViewAction = {}));
var HangOnType;
(function (HangOnType) {
    HangOnType[HangOnType["Nomal"] = 0] = "Nomal";
    HangOnType[HangOnType["LeftCenter"] = 1] = "LeftCenter";
    HangOnType[HangOnType["LeftTop"] = 2] = "LeftTop";
    HangOnType[HangOnType["LeftBtm"] = 3] = "LeftBtm";
    HangOnType[HangOnType["RightCenter"] = 4] = "RightCenter";
    HangOnType[HangOnType["RightTop"] = 5] = "RightTop";
    HangOnType[HangOnType["RightBtm"] = 6] = "RightBtm";
    HangOnType[HangOnType["TopCenter"] = 7] = "TopCenter";
    HangOnType[HangOnType["BtmCenter"] = 8] = "BtmCenter";
})(HangOnType = exports.HangOnType || (exports.HangOnType = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, menu = _a.menu;
var WidgetInfo = /** @class */ (function () {
    function WidgetInfo() {
        this.node = null;
        this.handOnType = HangOnType.Nomal;
        this.sizeModel = SizeModel.Normal;
    }
    __decorate([
        property(cc.Node)
    ], WidgetInfo.prototype, "node", void 0);
    __decorate([
        property({ type: cc.Enum(HangOnType) })
    ], WidgetInfo.prototype, "handOnType", void 0);
    __decorate([
        property({ type: cc.Enum(SizeModel) })
    ], WidgetInfo.prototype, "sizeModel", void 0);
    WidgetInfo = __decorate([
        ccclass("WidgetInfo")
    ], WidgetInfo);
    return WidgetInfo;
}());
exports.WidgetInfo = WidgetInfo;
var GViewBase = /** @class */ (function (_super) {
    __extends(GViewBase, _super);
    function GViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgImage = null;
        _this.widgetNodes = [];
        _this._custom = null;
        /** 窗口信息 */
        _this._win = null;
        /** 如果调用了关闭接口，但是这时候正在播关闭动画进行窗口判断的时候为true */
        _this.preDestroy = false;
        return _this;
    }
    Object.defineProperty(GViewBase.prototype, "Custom", {
        get: function () {
            return this._custom;
        },
        set: function (value) {
            this._custom = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GViewBase.prototype, "win", {
        get: function () {
            return this._win;
        },
        set: function (val) {
            if (this._win && this._win != val) {
                cc.warn("exists win binder by this view");
                return;
            }
            this._win = val;
        },
        enumerable: false,
        configurable: true
    });
    /////////////////////////////////////////////////////////////////////////
    GViewBase.prototype.__onLoad = function () {
        this.preDestroy = false;
        if (this.widgetNodes.length > 0) {
            var winSize = GCtrl_1.GCtrl.winSize;
            for (var i = 0; i < this.widgetNodes.length; i++) {
                var widgetInfo = this.widgetNodes[i];
                if (widgetInfo.node == null)
                    continue;
                switch (widgetInfo.handOnType) {
                    case HangOnType.Nomal:
                        break;
                    case HangOnType.LeftCenter: {
                        widgetInfo.node.x = -winSize.width / 2;
                        break;
                    }
                    case HangOnType.LeftTop: {
                        widgetInfo.node.x = -winSize.width / 2;
                        widgetInfo.node.y = winSize.height / 2;
                        break;
                    }
                    case HangOnType.LeftBtm: {
                        widgetInfo.node.x = -winSize.width / 2;
                        widgetInfo.node.y = -winSize.height / 2;
                        break;
                    }
                    case HangOnType.RightCenter: {
                        widgetInfo.node.x = winSize.width / 2;
                        break;
                    }
                    case HangOnType.RightTop: {
                        widgetInfo.node.x = winSize.width / 2;
                        widgetInfo.node.y = winSize.height / 2;
                        break;
                    }
                    case HangOnType.RightBtm: {
                        widgetInfo.node.x = winSize.width / 2;
                        widgetInfo.node.y = -winSize.height / 2;
                        break;
                    }
                    case HangOnType.TopCenter: {
                        widgetInfo.node.y = winSize.height / 2;
                        break;
                    }
                    case HangOnType.BtmCenter: {
                        widgetInfo.node.y = -winSize.height / 2;
                        break;
                    }
                    default:
                        break;
                }
                switch (widgetInfo.sizeModel) {
                    case SizeModel.Normal:
                        break;
                    case SizeModel.ReWidth: {
                        widgetInfo.node.width = winSize.width;
                        break;
                    }
                    case SizeModel.ReHeight: {
                        widgetInfo.node.height = winSize.height;
                        break;
                    }
                    case SizeModel.ReSizeAll: {
                        widgetInfo.node.setContentSize(winSize);
                        break;
                    }
                    default:
                        break;
                }
            }
        }
        this.onGLoad();
    };
    GViewBase.prototype.__onDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this);
        GCtrl_1.GCtrl.ES.off(this.node);
        this.onGDestroy();
        if (this.win)
            this.win.onDestroy();
    };
    ////////////////////////////////////////////////////////////////////////
    /**
     * 子类继承接口： onDestroy时触发
     */
    GViewBase.prototype.onGDestroy = function () { };
    /**
     * 子类继承接口：onLoad时触发
     */
    GViewBase.prototype.onGLoad = function () { };
    /**
     * 提供给异步加载结束的时侯调用, 最好不要手动调用
     * @param args 参数列表
     */
    GViewBase.prototype.onGStart = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.bgImage) {
            setBgFit_1.setBgFit(this.bgImage);
        }
    };
    GViewBase.prototype.emitEvent = function () {
        GCtrl_1.GCtrl.ES.emit(GCtrl_1.GCtrl.GClientWinOpenEventAfterMsg, this.win.winId);
    };
    /**
     * 这个方法是提供给win使用的，主要是在当window进行调用ViewBinder的时候进行的回调
     * 目的是为了处理窗口回收的时候，如果参数指针没有变更，但是实际数据出现变更的情况。
     * *** 你也可以认为，这个接口才是实际上每次窗口被显示的时候，必定会调用的周期函数
     */
    GViewBase.prototype.onGActive = function () { };
    GViewBase.prototype.checkReGStart = function () {
        return false;
    };
    /**
     * View通用关闭接口
     */
    GViewBase.prototype.onClose = function () {
        if (this.win) {
            if (!this.win.isDestroy) {
                this.win.onClose();
            }
            return;
        }
        if (!this.win) {
            if (!cc.isValid(this))
                return;
            this.node.destroy();
        }
    };
    /** 动画加载完成 */
    GViewBase.prototype.onAnimationLoaded = function () { };
    GViewBase.prototype.runNodeTimer = function (node, duation, callBack) {
        node.stopAllActions();
        var callFunc = cc.callFunc(callBack);
        var delay = cc.delayTime(duation);
        var seq = cc.sequence(callFunc, delay);
        var repeat = cc.repeatForever(seq);
        node.runAction(repeat);
        callBack();
    };
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && "背景图片",
        })
    ], GViewBase.prototype, "bgImage", void 0);
    __decorate([
        property({
            type: [WidgetInfo],
            visible: false,
        })
    ], GViewBase.prototype, "widgetNodes", void 0);
    GViewBase = __decorate([
        ccclass,
        menu("View/GBase/GViewBase"),
        executionOrder(1)
    ], GViewBase);
    return GViewBase;
}(GComponent_1.default));
exports.default = GViewBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HVmlld0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztHQUtHO0FBQ0gsb0RBQStDO0FBQy9DLGtDQUFpQztBQUdqQyw4Q0FBNkM7QUFFN0MsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ25CLDZDQUFNLENBQUE7SUFDTiwrQ0FBTyxDQUFBO0lBQ1AsaURBQVEsQ0FBQTtJQUNSLG1EQUFTLENBQUE7QUFDWCxDQUFDLEVBTFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFLcEI7QUFFRCxJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDcEIsMkNBQUksQ0FBQTtJQUNKLDZDQUFLLENBQUE7SUFDTCw2Q0FBSyxDQUFBO0lBQ0wsMkNBQUksQ0FBQTtBQUNOLENBQUMsRUFMVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUtyQjtBQUVELElBQVksVUFhWDtBQWJELFdBQVksVUFBVTtJQUNwQiw2Q0FBSyxDQUFBO0lBRUwsdURBQVUsQ0FBQTtJQUNWLGlEQUFPLENBQUE7SUFDUCxpREFBTyxDQUFBO0lBRVAseURBQVcsQ0FBQTtJQUNYLG1EQUFRLENBQUE7SUFDUixtREFBUSxDQUFBO0lBRVIscURBQVMsQ0FBQTtJQUNULHFEQUFTLENBQUE7QUFDWCxDQUFDLEVBYlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFhckI7QUFFSyxJQUFBLEtBQThDLEVBQUUsQ0FBQyxVQUFVLEVBQXpELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGNBQWMsb0JBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFFbEU7SUFBQTtRQUNxQixTQUFJLEdBQVksSUFBSSxDQUFDO1FBQ0MsZUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0IsY0FBUyxHQUMvQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3JC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QUFDO1FBQ3ZCLFFBQVEsRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQW5MRDtRQUpDLFFBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtZQUNiLE9BQU8sRUFBRSxNQUFNLElBQUksTUFBTTtTQUMxQixDQUFDOzhDQUNzQjtJQUt4QjtRQUpDLFFBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNsQixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUM7a0RBQzZCO0lBVlosU0FBUztRQUg3QixPQUFPO1FBQ1AsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQzVCLGNBQWMsQ0FBQyxDQUFDLENBQUM7T0FDRyxTQUFTLENBeUw3QjtJQUFELGdCQUFDO0NBekxELEFBeUxDLENBekxzQyxvQkFBVSxHQXlMaEQ7a0JBekxvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBuYW1lIEdWaWV3QmFzZVxyXG4gKiBAYXV0aG9yICB2aXNvd1xyXG4gKiBAZGVzY3JpcHRpb24gIOinhuWbvue7hOS7tuWfuuexu1xyXG4gKiBAY2xhc3MgR1ZpZXdCYXNlXHJcbiAqL1xyXG5pbXBvcnQgR0NvbXBvbmVudCBmcm9tIFwiLi4vRnJhbWVFeC9HQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdDdHJsIH0gZnJvbSBcIi4uL0dDdHJsXCI7XHJcbmltcG9ydCBHUGFyYW0gZnJvbSBcIi4uL0dFdmVudC9HUGFyYW1cIjtcclxuaW1wb3J0IHsgV2luIH0gZnJvbSBcIi4uL01hbmFnZXIvVUlNZ3JcIjtcclxuaW1wb3J0IHsgc2V0QmdGaXQgfSBmcm9tIFwiLi4vdXRpbHMvc2V0QmdGaXRcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFNpemVNb2RlbCB7XHJcbiAgTm9ybWFsLFxyXG4gIFJlV2lkdGgsXHJcbiAgUmVIZWlnaHQsXHJcbiAgUmVTaXplQWxsLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWaWV3QWN0aW9uIHtcclxuICBOT05FLCAvLyDml6DliqjnlLtcclxuICBTQ0FMRSwgLy8g566A5Y2V57yp5pS+5by55Ye6XHJcbiAgWU1vdmUsIC8vIFnovbTnp7vliqjov5vlhaXpgIDlh7pcclxuICBGYWRlLCAvLyDmt6HlhaXmt6Hlh7pcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSGFuZ09uVHlwZSB7XHJcbiAgTm9tYWwsXHJcblxyXG4gIExlZnRDZW50ZXIsXHJcbiAgTGVmdFRvcCxcclxuICBMZWZ0QnRtLFxyXG5cclxuICBSaWdodENlbnRlcixcclxuICBSaWdodFRvcCxcclxuICBSaWdodEJ0bSxcclxuXHJcbiAgVG9wQ2VudGVyLFxyXG4gIEJ0bUNlbnRlcixcclxufVxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgZXhlY3V0aW9uT3JkZXIsIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzKFwiV2lkZ2V0SW5mb1wiKVxyXG5leHBvcnQgY2xhc3MgV2lkZ2V0SW5mbyB7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpIG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oSGFuZ09uVHlwZSkgfSkgaGFuZE9uVHlwZSA9IEhhbmdPblR5cGUuTm9tYWw7XHJcbiAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShTaXplTW9kZWwpIH0pIHNpemVNb2RlbDogU2l6ZU1vZGVsID1cclxuICAgIFNpemVNb2RlbC5Ob3JtYWw7XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiVmlldy9HQmFzZS9HVmlld0Jhc2VcIilcclxuQGV4ZWN1dGlvbk9yZGVyKDEpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdWaWV3QmFzZSBleHRlbmRzIEdDb21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eSh7XHJcbiAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgdG9vbHRpcDogQ0NfREVWICYmIFwi6IOM5pmv5Zu+54mHXCIsXHJcbiAgfSlcclxuICBiZ0ltYWdlOiBjYy5Ob2RlID0gbnVsbDtcclxuICBAcHJvcGVydHkoe1xyXG4gICAgdHlwZTogW1dpZGdldEluZm9dLFxyXG4gICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgfSlcclxuICB3aWRnZXROb2RlczogV2lkZ2V0SW5mb1tdID0gW107XHJcbiAgcHJvdGVjdGVkIF9jdXN0b206IEdQYXJhbSA9IG51bGw7XHJcbiAgcHVibGljIGdldCBDdXN0b20oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IEN1c3RvbSh2YWx1ZTogR1BhcmFtKSB7XHJcbiAgICB0aGlzLl9jdXN0b20gPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKiDnqpflj6Pkv6Hmga8gKi9cclxuICBwcm90ZWN0ZWQgX3dpbjogV2luID0gbnVsbDtcclxuICBwdWJsaWMgZ2V0IHdpbigpOiBXaW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dpbjtcclxuICB9XHJcbiAgcHVibGljIHNldCB3aW4odmFsOiBXaW4pIHtcclxuICAgIGlmICh0aGlzLl93aW4gJiYgdGhpcy5fd2luICE9IHZhbCkge1xyXG4gICAgICBjYy53YXJuKFwiZXhpc3RzIHdpbiBiaW5kZXIgYnkgdGhpcyB2aWV3XCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl93aW4gPSB2YWw7XHJcbiAgfVxyXG5cclxuICAvKiog5aaC5p6c6LCD55So5LqG5YWz6Zet5o6l5Y+j77yM5L2G5piv6L+Z5pe25YCZ5q2j5Zyo5pKt5YWz6Zet5Yqo55S76L+b6KGM56qX5Y+j5Yik5pat55qE5pe25YCZ5Li6dHJ1ZSAqL1xyXG4gIHB1YmxpYyBwcmVEZXN0cm95OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwcm90ZWN0ZWQgX19vbkxvYWQoKSB7XHJcbiAgICB0aGlzLnByZURlc3Ryb3kgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy53aWRnZXROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCB3aW5TaXplID0gR0N0cmwud2luU2l6ZTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZGdldE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHdpZGdldEluZm8gPSB0aGlzLndpZGdldE5vZGVzW2ldO1xyXG4gICAgICAgIGlmICh3aWRnZXRJbmZvLm5vZGUgPT0gbnVsbCkgY29udGludWU7XHJcbiAgICAgICAgc3dpdGNoICh3aWRnZXRJbmZvLmhhbmRPblR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgSGFuZ09uVHlwZS5Ob21hbDpcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIEhhbmdPblR5cGUuTGVmdENlbnRlcjoge1xyXG4gICAgICAgICAgICB3aWRnZXRJbmZvLm5vZGUueCA9IC13aW5TaXplLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlIEhhbmdPblR5cGUuTGVmdFRvcDoge1xyXG4gICAgICAgICAgICB3aWRnZXRJbmZvLm5vZGUueCA9IC13aW5TaXplLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgd2lkZ2V0SW5mby5ub2RlLnkgPSB3aW5TaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSBIYW5nT25UeXBlLkxlZnRCdG06IHtcclxuICAgICAgICAgICAgd2lkZ2V0SW5mby5ub2RlLnggPSAtd2luU2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIHdpZGdldEluZm8ubm9kZS55ID0gLXdpblNpemUuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlIEhhbmdPblR5cGUuUmlnaHRDZW50ZXI6IHtcclxuICAgICAgICAgICAgd2lkZ2V0SW5mby5ub2RlLnggPSB3aW5TaXplLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlIEhhbmdPblR5cGUuUmlnaHRUb3A6IHtcclxuICAgICAgICAgICAgd2lkZ2V0SW5mby5ub2RlLnggPSB3aW5TaXplLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgd2lkZ2V0SW5mby5ub2RlLnkgPSB3aW5TaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSBIYW5nT25UeXBlLlJpZ2h0QnRtOiB7XHJcbiAgICAgICAgICAgIHdpZGdldEluZm8ubm9kZS54ID0gd2luU2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIHdpZGdldEluZm8ubm9kZS55ID0gLXdpblNpemUuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlIEhhbmdPblR5cGUuVG9wQ2VudGVyOiB7XHJcbiAgICAgICAgICAgIHdpZGdldEluZm8ubm9kZS55ID0gd2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNhc2UgSGFuZ09uVHlwZS5CdG1DZW50ZXI6IHtcclxuICAgICAgICAgICAgd2lkZ2V0SW5mby5ub2RlLnkgPSAtd2luU2l6ZS5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh3aWRnZXRJbmZvLnNpemVNb2RlbCkge1xyXG4gICAgICAgICAgY2FzZSBTaXplTW9kZWwuTm9ybWFsOlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgU2l6ZU1vZGVsLlJlV2lkdGg6IHtcclxuICAgICAgICAgICAgd2lkZ2V0SW5mby5ub2RlLndpZHRoID0gd2luU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlIFNpemVNb2RlbC5SZUhlaWdodDoge1xyXG4gICAgICAgICAgICB3aWRnZXRJbmZvLm5vZGUuaGVpZ2h0ID0gd2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSBTaXplTW9kZWwuUmVTaXplQWxsOiB7XHJcbiAgICAgICAgICAgIHdpZGdldEluZm8ubm9kZS5zZXRDb250ZW50U2l6ZSh3aW5TaXplKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uR0xvYWQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfX29uRGVzdHJveSgpIHtcclxuICAgIEdDdHJsLkVTLm9mZih0aGlzKTtcclxuICAgIEdDdHJsLkVTLm9mZih0aGlzLm5vZGUpO1xyXG4gICAgdGhpcy5vbkdEZXN0cm95KCk7XHJcbiAgICBpZiAodGhpcy53aW4pIHRoaXMud2luLm9uRGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLyoqXHJcbiAgICog5a2Q57G757un5om/5o6l5Y+j77yaIG9uRGVzdHJveeaXtuinpuWPkVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBvbkdEZXN0cm95KCk6IHZvaWQge31cclxuXHJcbiAgLyoqXHJcbiAgICog5a2Q57G757un5om/5o6l5Y+j77yab25Mb2Fk5pe26Kem5Y+RXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIG9uR0xvYWQoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiDmj5Dkvpvnu5nlvILmraXliqDovb3nu5PmnZ/nmoTml7bkvq/osIPnlKgsIOacgOWlveS4jeimgeaJi+WKqOiwg+eUqFxyXG4gICAqIEBwYXJhbSBhcmdzIOWPguaVsOWIl+ihqFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvbkdTdGFydCguLi5hcmdzKSB7XHJcbiAgICBpZiAodGhpcy5iZ0ltYWdlKSB7XHJcbiAgICAgIHNldEJnRml0KHRoaXMuYmdJbWFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW1pdEV2ZW50KCkge1xyXG4gICAgR0N0cmwuRVMuZW1pdChHQ3RybC5HQ2xpZW50V2luT3BlbkV2ZW50QWZ0ZXJNc2csIHRoaXMud2luLndpbklkKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog6L+Z5Liq5pa55rOV5piv5o+Q5L6b57uZd2lu5L2/55So55qE77yM5Li76KaB5piv5Zyo5b2Td2luZG936L+b6KGM6LCD55SoVmlld0JpbmRlcueahOaXtuWAmei/m+ihjOeahOWbnuiwg1xyXG4gICAqIOebrueahOaYr+S4uuS6huWkhOeQhueql+WPo+WbnuaUtueahOaXtuWAme+8jOWmguaenOWPguaVsOaMh+mSiOayoeacieWPmOabtO+8jOS9huaYr+WunumZheaVsOaNruWHuueOsOWPmOabtOeahOaDheWGteOAglxyXG4gICAqICoqKiDkvaDkuZ/lj6/ku6XorqTkuLrvvIzov5nkuKrmjqXlj6PmiY3mmK/lrp7pmYXkuIrmr4/mrKHnqpflj6PooqvmmL7npLrnmoTml7blgJnvvIzlv4XlrprkvJrosIPnlKjnmoTlkajmnJ/lh73mlbBcclxuICAgKi9cclxuICBwdWJsaWMgb25HQWN0aXZlKCkge31cclxuXHJcbiAgcHVibGljIGNoZWNrUmVHU3RhcnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWaWV36YCa55So5YWz6Zet5o6l5Y+jXHJcbiAgICovXHJcbiAgcHVibGljIG9uQ2xvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy53aW4pIHtcclxuICAgICAgaWYgKCF0aGlzLndpbi5pc0Rlc3Ryb3kpIHtcclxuICAgICAgICB0aGlzLndpbi5vbkNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLndpbikge1xyXG4gICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcykpIHJldHVybjtcclxuICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiDliqjnlLvliqDovb3lrozmiJAgKi9cclxuICBwdWJsaWMgb25BbmltYXRpb25Mb2FkZWQoKSB7fVxyXG5cclxuICBwcm90ZWN0ZWQgcnVuTm9kZVRpbWVyKFxyXG4gICAgbm9kZTogY2MuTm9kZSxcclxuICAgIGR1YXRpb246IG51bWJlcixcclxuICAgIGNhbGxCYWNrOiBWb2lkRnVuY3Rpb25cclxuICApIHtcclxuICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgIGxldCBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGNhbGxCYWNrKTtcclxuICAgIGxldCBkZWxheSA9IGNjLmRlbGF5VGltZShkdWF0aW9uKTtcclxuICAgIGxldCBzZXEgPSBjYy5zZXF1ZW5jZShjYWxsRnVuYywgZGVsYXkpO1xyXG4gICAgbGV0IHJlcGVhdCA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxKTtcclxuICAgIG5vZGUucnVuQWN0aW9uKHJlcGVhdCk7XHJcbiAgICBjYWxsQmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=