"use strict";
cc._RF.push(module, 'a4881qeaLlOmbxyBPq7uykO', 'GComponent');
// Script/Core/FrameEx/GComponent.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GLoader_1 = require("../GLoader/GLoader");
var errorWrap = function (e) {
    return cc.js.formatStr((e && e.stack) || e);
};
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var GComponent = /** @class */ (function (_super) {
    __extends(GComponent, _super);
    function GComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GComponent.prototype, "assetImpl", {
        get: function () {
            if (!this._assetImpl) {
                this._assetImpl = GLoader_1.GAssetImpl.getAssetImpl(cc.js.getClassName(this));
            }
            return this._assetImpl;
        },
        enumerable: false,
        configurable: true
    });
    GComponent.prototype.onLoad = function () {
        // try {
        this.__onLoad();
        // } catch (error) {
        //     let classErr = `ClassName: ${cc.js.getClassName(this)} :`;
        //     cc.error(classErr, error);
        // }
    };
    GComponent.prototype.__onLoad = function () { };
    /** 这个函数只有窗口初始化的时候可以调用，其他时候禁止调用 */
    GComponent.prototype.__onGStart = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // try {
        this.onGStart.apply(this, args);
        this.emitEvent();
        // } catch (error) {
        //     let classErr = `ClassName: ${cc.js.getClassName(this)} :`;
        //     cc.error(classErr, error);
        // }
    };
    GComponent.prototype.emitEvent = function () { };
    GComponent.prototype.onGStart = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    GComponent.prototype.onDestroy = function () {
        if (!CC_EDITOR) {
            if (this._assetImpl) {
                this._assetImpl.release();
                this._assetImpl = null;
            }
        }
        this.__onDestroy();
    };
    GComponent.prototype.__onDestroy = function () { };
    GComponent.prototype.addGChild = function (path, cb) {
        var _this = this;
        var otherArgs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            otherArgs[_i - 2] = arguments[_i];
        }
        var item;
        this.assetImpl.addGChild(path, function (gchild) {
            if (!_this.isValid)
                return;
            if (cb instanceof cc.Node) {
                gchild.node.parent = cb;
            }
            else
                cb && cb(gchild);
            gchild.__onGStart.apply(gchild, otherArgs);
            item = gchild;
        });
        return item;
    };
    GComponent.prototype.nodeAddClip = function (aniNode, path, config, cb) {
        this.loadJXAniClip(path, config.aniName, config.prefix, config.numberFix, function (clip) {
            if (!cc.isValid(aniNode))
                return;
            var ani = aniNode.getComponent(cc.Animation);
            if (!ani) {
                ani = aniNode.addComponent(cc.Animation);
            }
            var sp = aniNode.getComponent(cc.Sprite);
            if (!sp) {
                sp = aniNode.addComponent(cc.Sprite);
            }
            sp.sizeMode = cc.Sprite.SizeMode.RAW;
            sp.trim = false;
            ani.addClip(clip);
            cb(ani);
        });
    };
    GComponent.prototype.loadJXAniClip = function (path, aniName, prefix, numberFix, cb) {
        var _this = this;
        this.assetImpl.loadJXAniClip(path, aniName, prefix, numberFix, function (clip) {
            if (!cc.isValid(_this))
                return;
            cb(clip);
        });
    };
    GComponent.prototype.loadJXAniClips = function (path, cb) {
        var _a;
        var _this = this;
        var configs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            configs[_i - 2] = arguments[_i];
        }
        (_a = this.assetImpl).loadJXAniClips.apply(_a, __spreadArrays([path, function (clips) {
                if (!cc.isValid(_this))
                    return;
                cb(clips);
            }], configs));
    };
    GComponent = __decorate([
        ccclass,
        menu("View/GBase/GComponent")
    ], GComponent);
    return GComponent;
}(cc.Component));
exports.default = GComponent;

cc._RF.pop();