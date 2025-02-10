"use strict";
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
        setBgFit_1.setBgFit(this.bgImage);
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