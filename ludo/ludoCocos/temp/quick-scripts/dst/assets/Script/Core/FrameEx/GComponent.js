
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/GComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0dDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUFnRDtBQUdoRCxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUM7SUFDekIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBRUksSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFHbEQ7SUFBd0MsOEJBQVk7SUFBcEQ7O0lBeUhBLENBQUM7SUF2SEMsc0JBQVcsaUNBQVM7YUFBcEI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3JFO1lBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsMkJBQU0sR0FBTjtRQUNFLFFBQVE7UUFDUixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsb0JBQW9CO1FBQ3BCLGlFQUFpRTtRQUNqRSxpQ0FBaUM7UUFFakMsSUFBSTtJQUNOLENBQUM7SUFFUyw2QkFBUSxHQUFsQixjQUFzQixDQUFDO0lBRXZCLGtDQUFrQztJQUMzQiwrQkFBVSxHQUFqQjtRQUFrQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUM5QixRQUFRO1FBQ1IsSUFBSSxDQUFDLFFBQVEsT0FBYixJQUFJLEVBQWEsSUFBSSxF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T0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBQyxJQUFJO1lBQ2xFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQztnQkFBRSxPQUFPO1lBQzlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLG1DQUFjLEdBQXhCLFVBQ0UsSUFBWSxFQUNaLEVBQTBCOztRQUY1QixpQkFhQztRQVZDLGlCQUFnQzthQUFoQyxVQUFnQyxFQUFoQyxxQkFBZ0MsRUFBaEMsSUFBZ0M7WUFBaEMsZ0NBQWdDOztRQUVoQyxDQUFBLEtBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQSxDQUFDLGNBQWMsMkJBQzNCLElBQUksRUFDSixVQUFDLEtBQUs7Z0JBQ0osSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDO29CQUFFLE9BQU87Z0JBQzlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNaLENBQUMsR0FDRSxPQUFPLEdBQ1Y7SUFDSixDQUFDO0lBeEhrQixVQUFVO1FBRjlCLE9BQU87UUFDUCxJQUFJLENBQUMsdUJBQXVCLENBQUM7T0FDVCxVQUFVLENBeUg5QjtJQUFELGlCQUFDO0NBekhELEFBeUhDLENBekh1QyxFQUFFLENBQUMsU0FBUyxHQXlIbkQ7a0JBekhvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uQ29uZmlndXJlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCB7IEdBc3NldEltcGwgfSBmcm9tIFwiLi4vR0xvYWRlci9HTG9hZGVyXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkNoaXBDYWxsQmFjaywgQW5pbWF0aW9uQ2xpcHNDYWxsQmFjayB9IGZyb20gXCIuLi9NYW5hZ2VyL3R5cGVcIjtcclxuXHJcbmxldCBlcnJvcldyYXAgPSBmdW5jdGlvbiAoZSkge1xyXG4gIHJldHVybiBjYy5qcy5mb3JtYXRTdHIoKGUgJiYgZS5zdGFjaykgfHwgZSk7XHJcbn07XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIlZpZXcvR0Jhc2UvR0NvbXBvbmVudFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHQ29tcG9uZW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICBwcm90ZWN0ZWQgX2Fzc2V0SW1wbDogR0Fzc2V0SW1wbDtcclxuICBwdWJsaWMgZ2V0IGFzc2V0SW1wbCgpOiBHQXNzZXRJbXBsIHtcclxuICAgIGlmICghdGhpcy5fYXNzZXRJbXBsKSB7XHJcbiAgICAgIHRoaXMuX2Fzc2V0SW1wbCA9IEdBc3NldEltcGwuZ2V0QXNzZXRJbXBsKGNjLmpzLmdldENsYXNzTmFtZSh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fYXNzZXRJbXBsO1xyXG4gIH1cclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8gdHJ5IHtcclxuICAgIHRoaXMuX19vbkxvYWQoKTtcclxuICAgIC8vIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyAgICAgbGV0IGNsYXNzRXJyID0gYENsYXNzTmFtZTogJHtjYy5qcy5nZXRDbGFzc05hbWUodGhpcyl9IDpgO1xyXG4gICAgLy8gICAgIGNjLmVycm9yKGNsYXNzRXJyLCBlcnJvcik7XHJcblxyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9fb25Mb2FkKCkge31cclxuXHJcbiAgLyoqIOi/meS4quWHveaVsOWPquacieeql+WPo+WIneWni+WMlueahOaXtuWAmeWPr+S7peiwg+eUqO+8jOWFtuS7luaXtuWAmeemgeatouiwg+eUqCAqL1xyXG4gIHB1YmxpYyBfX29uR1N0YXJ0KC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAvLyB0cnkge1xyXG4gICAgdGhpcy5vbkdTdGFydCguLi5hcmdzKTtcclxuICAgIHRoaXMuZW1pdEV2ZW50KCk7XHJcbiAgICAvLyB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gICAgIGxldCBjbGFzc0VyciA9IGBDbGFzc05hbWU6ICR7Y2MuanMuZ2V0Q2xhc3NOYW1lKHRoaXMpfSA6YDtcclxuICAgIC8vICAgICBjYy5lcnJvcihjbGFzc0VyciwgZXJyb3IpO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGVtaXRFdmVudCgpIHt9XHJcblxyXG4gIHB1YmxpYyBvbkdTdGFydCguLi5hcmdzOiBhbnlbXSkge31cclxuXHJcbiAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgIGlmICh0aGlzLl9hc3NldEltcGwpIHtcclxuICAgICAgICB0aGlzLl9hc3NldEltcGwucmVsZWFzZSgpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0SW1wbCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuX19vbkRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfX29uRGVzdHJveSgpIHt9XHJcblxyXG4gIHB1YmxpYyBhZGRHQ2hpbGQ8VD4oXHJcbiAgICBwYXRoOiBzdHJpbmcgfCBjYy5QcmVmYWIsXHJcbiAgICBjYj86IHsgKGNvbXA6IFQpOiB2b2lkIH0gfCBjYy5Ob2RlLFxyXG4gICAgLi4ub3RoZXJBcmdzOiBhbnlbXVxyXG4gICk6IFQge1xyXG4gICAgbGV0IGl0ZW07XHJcbiAgICB0aGlzLmFzc2V0SW1wbC5hZGRHQ2hpbGQocGF0aCwgKGdjaGlsZDogYW55KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm47XHJcbiAgICAgIGlmIChjYiBpbnN0YW5jZW9mIGNjLk5vZGUpIHtcclxuICAgICAgICBnY2hpbGQubm9kZS5wYXJlbnQgPSBjYjtcclxuICAgICAgfSBlbHNlIGNiICYmIGNiKGdjaGlsZCk7XHJcbiAgICAgIGdjaGlsZC5fX29uR1N0YXJ0KC4uLm90aGVyQXJncyk7XHJcbiAgICAgIGl0ZW0gPSBnY2hpbGQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG5vZGVBZGRDbGlwKFxyXG4gICAgYW5pTm9kZTogY2MuTm9kZSxcclxuICAgIHBhdGgsXHJcbiAgICBjb25maWc6IEFuaW1hdGlvbkNvbmZpZ3VyZSxcclxuICAgIGNiXHJcbiAgKSB7XHJcbiAgICB0aGlzLmxvYWRKWEFuaUNsaXAoXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbmZpZy5hbmlOYW1lLFxyXG4gICAgICBjb25maWcucHJlZml4LFxyXG4gICAgICBjb25maWcubnVtYmVyRml4LFxyXG4gICAgICAoY2xpcCkgPT4ge1xyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZChhbmlOb2RlKSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhbmkgPSBhbmlOb2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIGlmICghYW5pKSB7XHJcbiAgICAgICAgICBhbmkgPSBhbmlOb2RlLmFkZENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3AgPSBhbmlOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGlmICghc3ApIHtcclxuICAgICAgICAgIHNwID0gYW5pTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3Auc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuUkFXO1xyXG4gICAgICAgIHNwLnRyaW0gPSBmYWxzZTtcclxuICAgICAgICBhbmkuYWRkQ2xpcChjbGlwKTtcclxuICAgICAgICBjYihhbmkpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGxvYWRKWEFuaUNsaXAoXHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICBhbmlOYW1lOiBzdHJpbmcsXHJcbiAgICBwcmVmaXg6IHN0cmluZyxcclxuICAgIG51bWJlckZpeDogbnVtYmVyLFxyXG4gICAgY2I6IEFuaW1hdGlvbkNoaXBDYWxsQmFja1xyXG4gICkge1xyXG4gICAgdGhpcy5hc3NldEltcGwubG9hZEpYQW5pQ2xpcChwYXRoLCBhbmlOYW1lLCBwcmVmaXgsIG51bWJlckZpeCwgKGNsaXApID0+IHtcclxuICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMpKSByZXR1cm47XHJcbiAgICAgIGNiKGNsaXApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgbG9hZEpYQW5pQ2xpcHMoXHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICBjYjogQW5pbWF0aW9uQ2xpcHNDYWxsQmFjayxcclxuICAgIC4uLmNvbmZpZ3M6IEFuaW1hdGlvbkNvbmZpZ3VyZVtdXHJcbiAgKSB7XHJcbiAgICB0aGlzLmFzc2V0SW1wbC5sb2FkSlhBbmlDbGlwcyhcclxuICAgICAgcGF0aCxcclxuICAgICAgKGNsaXBzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMpKSByZXR1cm47XHJcbiAgICAgICAgY2IoY2xpcHMpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5jb25maWdzXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=