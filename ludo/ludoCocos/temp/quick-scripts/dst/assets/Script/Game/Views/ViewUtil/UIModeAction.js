
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/ViewUtil/UIModeAction.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80001UzNO1CBqxh2klfX3px', 'UIModeAction');
// Script/Game/Views/ViewUtil/UIModeAction.ts

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
exports.UIModeAction = exports.MoveDir = void 0;
var GComponent_1 = require("../../../Core/FrameEx/GComponent");
var GCtrl_1 = require("../../../Core/GCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var ActionTag;
(function (ActionTag) {
    ActionTag[ActionTag["Move"] = 1001] = "Move";
    ActionTag[ActionTag["Fade"] = 1002] = "Fade";
    ActionTag[ActionTag["Discard"] = 1003] = "Discard";
})(ActionTag || (ActionTag = {}));
var MoveDir;
(function (MoveDir) {
    MoveDir[MoveDir["None"] = 0] = "None";
    MoveDir[MoveDir["Left2R"] = 1] = "Left2R";
    MoveDir[MoveDir["Right2L"] = 2] = "Right2L";
    MoveDir[MoveDir["top2B"] = 3] = "top2B";
    MoveDir[MoveDir["bottom2T"] = 4] = "bottom2T";
    MoveDir[MoveDir["custom"] = 5] = "custom";
})(MoveDir = exports.MoveDir || (exports.MoveDir = {}));
var Move$Fade$Config = /** @class */ (function () {
    function Move$Fade$Config() {
        this.delayTime = 0;
        this.moveDuration = 0;
        this.fadeDuration = 0;
        this.nodes = [];
        this.moveDir = MoveDir.None;
        this.startPos = cc.v2();
        this._nodeDefaultPositions = [];
        //是否强制显示
        this._forcedDisplay = false;
    }
    Move$Fade$Config.prototype.init = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            if (!this.nodes[i])
                continue;
            this._nodeDefaultPositions[i] = this.nodes[i].position;
        }
    };
    Move$Fade$Config.prototype.onEnable = function () {
        var actualSize = GCtrl_1.GCtrl.actualSize;
        var winSize = cc.winSize;
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            if (!node)
                continue;
            if (!this._forcedDisplay) {
                if (!node.active)
                    continue;
            }
            node.stopAllActions();
            if (this.moveDuration > 0) {
                var defaultWorldPos = node.convertToWorldSpaceAR(cc.Vec2.ZERO);
                var worldPos = defaultWorldPos;
                switch (this.moveDir) {
                    case MoveDir.None:
                        break;
                    case MoveDir.Left2R: {
                        worldPos = cc.v2(-(-(winSize.width - actualSize.width) / 2 +
                            node.width * (1 - node.anchorX)), defaultWorldPos.y);
                        break;
                    }
                    case MoveDir.Right2L: {
                        worldPos = cc.v2(actualSize.width +
                            (winSize.width - actualSize.width) / 2 +
                            node.width * node.anchorX, defaultWorldPos.y);
                        break;
                    }
                    case MoveDir.top2B: {
                        worldPos = cc.v2(defaultWorldPos.x, actualSize.height + node.height * node.anchorY);
                        break;
                    }
                    case MoveDir.bottom2T: {
                        worldPos = cc.v2(defaultWorldPos.x, -node.height * (1 - node.anchorY));
                        break;
                    }
                    case MoveDir.custom: {
                        worldPos = cc.v2(defaultWorldPos.x + this.startPos.x, defaultWorldPos.y + this.startPos.y);
                        break;
                    }
                    default:
                        break;
                }
                node.position = node.parent.convertToNodeSpaceAR(worldPos);
                node.active = true;
                var action = node.runAction(cc.sequence(cc.delayTime(this.delayTime * i), cc.moveTo(this.moveDuration, this._nodeDefaultPositions[i])));
                action.setTag(ActionTag.Move);
            }
            if (this.fadeDuration > 0) {
                node.opacity = 0;
                node.active = true;
                var action = node.runAction(cc.sequence(cc.delayTime(this.delayTime * i), cc.fadeIn(this.fadeDuration)));
                action.setTag(ActionTag.Fade);
            }
        }
    };
    Move$Fade$Config.prototype.onDisable = function () {
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            if (!node)
                continue;
            node.stopAllActions();
            node.position = this._nodeDefaultPositions[i];
        }
    };
    __decorate([
        property()
    ], Move$Fade$Config.prototype, "delayTime", void 0);
    __decorate([
        property()
    ], Move$Fade$Config.prototype, "moveDuration", void 0);
    __decorate([
        property()
    ], Move$Fade$Config.prototype, "fadeDuration", void 0);
    __decorate([
        property([cc.Node])
    ], Move$Fade$Config.prototype, "nodes", void 0);
    __decorate([
        property({ type: cc.Enum(MoveDir) })
    ], Move$Fade$Config.prototype, "moveDir", void 0);
    __decorate([
        property({
            visible: function () {
                return this.moveDir === MoveDir.custom;
            },
        })
    ], Move$Fade$Config.prototype, "startPos", void 0);
    Move$Fade$Config = __decorate([
        ccclass("Move$Fade$Config")
    ], Move$Fade$Config);
    return Move$Fade$Config;
}());
var Disslove$Config = /** @class */ (function () {
    function Disslove$Config() {
        this.sprites = [];
        this._utime = 1;
        this._into_isbegin = false;
        this._timeTag = false;
    }
    Disslove$Config.prototype.init = function () { };
    Disslove$Config.prototype.onEnable = function () {
        this._utime = 1;
        this._timeTag = true;
    };
    Disslove$Config.prototype.onDisable = function () {
        if (this._timeTag) {
            this._timeTag = false;
            this._utime = 1;
            for (var i = 0; i < this.sprites.length; i++) {
                var sprite = this.sprites[i];
                if (!sprite)
                    continue;
                sprite.getMaterial(0).setProperty("u_time", 0);
            }
        }
    };
    Disslove$Config.prototype.update = function (dt) {
        if (!this._timeTag)
            return;
        if (this._utime > 0) {
            for (var i = 0; i < this.sprites.length; i++) {
                var sprite = this.sprites[i];
                if (!sprite)
                    continue;
                sprite.getMaterial(0).setProperty("u_time", this._utime);
            }
            this._utime = this._utime - dt * 2;
        }
        else {
            this._timeTag = false;
            for (var i = 0; i < this.sprites.length; i++) {
                var sprite = this.sprites[i];
                if (!sprite)
                    continue;
                sprite.getMaterial(0).setProperty("u_time", 0);
            }
            this._utime = 1;
        }
    };
    __decorate([
        property([cc.Sprite])
    ], Disslove$Config.prototype, "sprites", void 0);
    Disslove$Config = __decorate([
        ccclass("Disslove$Config")
    ], Disslove$Config);
    return Disslove$Config;
}());
var UIModeAction = /** @class */ (function (_super) {
    __extends(UIModeAction, _super);
    function UIModeAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.left2R = null;
        _this.right2L = null;
        _this.top2B = null;
        _this.bottom2T = null;
        _this.onlyFade = null;
        _this._inits = false;
        return _this;
    }
    UIModeAction.prototype.start = function () {
        var _this = this;
        GCtrl_1.GCtrl.afterFrames(function () {
            _this.left2R && _this.left2R.init();
            _this.right2L && _this.right2L.init();
            _this.top2B && _this.top2B.init();
            _this.bottom2T && _this.bottom2T.init();
            _this.onlyFade && _this.onlyFade.init();
            _this._inits = true;
            _this.onEnable();
        });
    };
    UIModeAction.prototype.onEnable = function () {
        var _this = this;
        if (!this._inits)
            return;
        GCtrl_1.GCtrl.afterFrames(function () {
            _this.left2R && _this.left2R.onEnable();
            _this.right2L && _this.right2L.onEnable();
            _this.top2B && _this.top2B.onEnable();
            _this.bottom2T && _this.bottom2T.onEnable();
            _this.onlyFade && _this.onlyFade.onEnable();
            // this.disslove && this.disslove.onEnable();
        });
    };
    UIModeAction.prototype.onDisable = function () {
        this.left2R && this.left2R.onDisable();
        this.right2L && this.right2L.onDisable();
        this.top2B && this.top2B.onDisable();
        this.bottom2T && this.bottom2T.onDisable();
        this.onlyFade && this.onlyFade.onDisable();
    };
    __decorate([
        property(Move$Fade$Config)
    ], UIModeAction.prototype, "left2R", void 0);
    __decorate([
        property(Move$Fade$Config)
    ], UIModeAction.prototype, "right2L", void 0);
    __decorate([
        property(Move$Fade$Config)
    ], UIModeAction.prototype, "top2B", void 0);
    __decorate([
        property(Move$Fade$Config)
    ], UIModeAction.prototype, "bottom2T", void 0);
    __decorate([
        property(Move$Fade$Config)
    ], UIModeAction.prototype, "onlyFade", void 0);
    UIModeAction = __decorate([
        ccclass,
        menu("ViewUtil/UIModeAction")
    ], UIModeAction);
    return UIModeAction;
}(GComponent_1.default));
exports.UIModeAction = UIModeAction;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9WaWV3VXRpbC9VSU1vZGVBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUMxRCw2Q0FBNEM7QUFDdEMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFFbEQsSUFBSyxTQUlKO0FBSkQsV0FBSyxTQUFTO0lBQ1osNENBQVcsQ0FBQTtJQUNYLDRDQUFXLENBQUE7SUFDWCxrREFBYyxDQUFBO0FBQ2hCLENBQUMsRUFKSSxTQUFTLEtBQVQsU0FBUyxRQUliO0FBRUQsSUFBWSxPQU9YO0FBUEQsV0FBWSxPQUFPO0lBQ2pCLHFDQUFJLENBQUE7SUFDSix5Q0FBTSxDQUFBO0lBQ04sMkNBQU8sQ0FBQTtJQUNQLHVDQUFLLENBQUE7SUFDTCw2Q0FBUSxDQUFBO0lBQ1IseUNBQU0sQ0FBQTtBQUNSLENBQUMsRUFQVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFPbEI7QUFHRDtJQUFBO1FBQ2MsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUNoQixVQUFLLEdBQWMsRUFBRSxDQUFDO1FBQ0wsWUFBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFPN0QsYUFBUSxHQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUVyQiwwQkFBcUIsR0FBYyxFQUFFLENBQUM7UUFDN0MsUUFBUTtRQUNELG1CQUFjLEdBQVksS0FBSyxDQUFDO0lBcUd6QyxDQUFDO0lBbkdRLCtCQUFJLEdBQVg7UUFDRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxF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QUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBMUMyQjtRQUEzQixRQUFRLENBQUMsZ0JBQWdCLENBQUM7Z0RBQWlDO0lBRWhDO1FBQTNCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztpREFBa0M7SUFFakM7UUFBM0IsUUFBUSxDQUFDLGdCQUFnQixDQUFDOytDQUFnQztJQUUvQjtRQUEzQixRQUFRLENBQUMsZ0JBQWdCLENBQUM7a0RBQW1DO0lBRWxDO1FBQTNCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztrREFBbUM7SUFUbkQsWUFBWTtRQUZ4QixPQUFPO1FBQ1AsSUFBSSxDQUFDLHVCQUF1QixDQUFDO09BQ2pCLFlBQVksQ0E0Q3hCO0lBQUQsbUJBQUM7Q0E1Q0QsQUE0Q0MsQ0E1Q2lDLG9CQUFVLEdBNEMzQztBQTVDWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHQ29tcG9uZW50IGZyb20gXCIuLi8uLi8uLi9Db3JlL0ZyYW1lRXgvR0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL0dDdHJsXCI7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIEFjdGlvblRhZyB7XHJcbiAgTW92ZSA9IDEwMDEsXHJcbiAgRmFkZSA9IDEwMDIsXHJcbiAgRGlzY2FyZCA9IDEwMDMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE1vdmVEaXIge1xyXG4gIE5vbmUsXHJcbiAgTGVmdDJSLFxyXG4gIFJpZ2h0MkwsXHJcbiAgdG9wMkIsXHJcbiAgYm90dG9tMlQsXHJcbiAgY3VzdG9tLFxyXG59XHJcblxyXG5AY2NjbGFzcyhcIk1vdmUkRmFkZSRDb25maWdcIilcclxuY2xhc3MgTW92ZSRGYWRlJENvbmZpZyB7XHJcbiAgQHByb3BlcnR5KCkgZGVsYXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gIEBwcm9wZXJ0eSgpIG1vdmVEdXJhdGlvbjogbnVtYmVyID0gMDtcclxuICBAcHJvcGVydHkoKSBmYWRlRHVyYXRpb246IG51bWJlciA9IDA7XHJcbiAgQHByb3BlcnR5KFtjYy5Ob2RlXSkgbm9kZXM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oTW92ZURpcikgfSkgbW92ZURpciA9IE1vdmVEaXIuTm9uZTtcclxuXHJcbiAgQHByb3BlcnR5KHtcclxuICAgIHZpc2libGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW92ZURpciA9PT0gTW92ZURpci5jdXN0b207XHJcbiAgICB9LFxyXG4gIH0pXHJcbiAgc3RhcnRQb3M6IGNjLlZlYzIgPSBjYy52MigpO1xyXG5cclxuICBwdWJsaWMgX25vZGVEZWZhdWx0UG9zaXRpb25zOiBjYy5WZWMyW10gPSBbXTtcclxuICAvL+aYr+WQpuW8uuWItuaYvuekulxyXG4gIHB1YmxpYyBfZm9yY2VkRGlzcGxheTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoIXRoaXMubm9kZXNbaV0pIGNvbnRpbnVlO1xyXG4gICAgICB0aGlzLl9ub2RlRGVmYXVsdFBvc2l0aW9uc1tpXSA9IHRoaXMubm9kZXNbaV0ucG9zaXRpb247XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25FbmFibGUoKSB7XHJcbiAgICBsZXQgYWN0dWFsU2l6ZSA9IEdDdHJsLmFjdHVhbFNpemU7XHJcbiAgICBsZXQgd2luU2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IG5vZGUgPSB0aGlzLm5vZGVzW2ldO1xyXG4gICAgICBpZiAoIW5vZGUpIGNvbnRpbnVlO1xyXG4gICAgICBpZiAoIXRoaXMuX2ZvcmNlZERpc3BsYXkpIHtcclxuICAgICAgICBpZiAoIW5vZGUuYWN0aXZlKSBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgIGlmICh0aGlzLm1vdmVEdXJhdGlvbiA+IDApIHtcclxuICAgICAgICBsZXQgZGVmYXVsdFdvcmxkUG9zID0gbm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICBsZXQgd29ybGRQb3M6IGNjLlZlYzIgPSBkZWZhdWx0V29ybGRQb3M7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vdmVEaXIpIHtcclxuICAgICAgICAgIGNhc2UgTW92ZURpci5Ob25lOlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgTW92ZURpci5MZWZ0MlI6IHtcclxuICAgICAgICAgICAgd29ybGRQb3MgPSBjYy52MihcclxuICAgICAgICAgICAgICAtKFxyXG4gICAgICAgICAgICAgICAgLSh3aW5TaXplLndpZHRoIC0gYWN0dWFsU2l6ZS53aWR0aCkgLyAyICtcclxuICAgICAgICAgICAgICAgIG5vZGUud2lkdGggKiAoMSAtIG5vZGUuYW5jaG9yWClcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgIGRlZmF1bHRXb3JsZFBvcy55XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSBNb3ZlRGlyLlJpZ2h0Mkw6IHtcclxuICAgICAgICAgICAgd29ybGRQb3MgPSBjYy52MihcclxuICAgICAgICAgICAgICBhY3R1YWxTaXplLndpZHRoICtcclxuICAgICAgICAgICAgICAgICh3aW5TaXplLndpZHRoIC0gYWN0dWFsU2l6ZS53aWR0aCkgLyAyICtcclxuICAgICAgICAgICAgICAgIG5vZGUud2lkdGggKiBub2RlLmFuY2hvclgsXHJcbiAgICAgICAgICAgICAgZGVmYXVsdFdvcmxkUG9zLnlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlIE1vdmVEaXIudG9wMkI6IHtcclxuICAgICAgICAgICAgd29ybGRQb3MgPSBjYy52MihcclxuICAgICAgICAgICAgICBkZWZhdWx0V29ybGRQb3MueCxcclxuICAgICAgICAgICAgICBhY3R1YWxTaXplLmhlaWdodCArIG5vZGUuaGVpZ2h0ICogbm9kZS5hbmNob3JZXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSBNb3ZlRGlyLmJvdHRvbTJUOiB7XHJcbiAgICAgICAgICAgIHdvcmxkUG9zID0gY2MudjIoXHJcbiAgICAgICAgICAgICAgZGVmYXVsdFdvcmxkUG9zLngsXHJcbiAgICAgICAgICAgICAgLW5vZGUuaGVpZ2h0ICogKDEgLSBub2RlLmFuY2hvclkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSBNb3ZlRGlyLmN1c3RvbToge1xyXG4gICAgICAgICAgICB3b3JsZFBvcyA9IGNjLnYyKFxyXG4gICAgICAgICAgICAgIGRlZmF1bHRXb3JsZFBvcy54ICsgdGhpcy5zdGFydFBvcy54LFxyXG4gICAgICAgICAgICAgIGRlZmF1bHRXb3JsZFBvcy55ICsgdGhpcy5zdGFydFBvcy55XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLnBvc2l0aW9uID0gbm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgYWN0aW9uID0gbm9kZS5ydW5BY3Rpb24oXHJcbiAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgY2MuZGVsYXlUaW1lKHRoaXMuZGVsYXlUaW1lICogaSksXHJcbiAgICAgICAgICAgIGNjLm1vdmVUbyh0aGlzLm1vdmVEdXJhdGlvbiwgdGhpcy5fbm9kZURlZmF1bHRQb3NpdGlvbnNbaV0pXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKEFjdGlvblRhZy5Nb3ZlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5mYWRlRHVyYXRpb24gPiAwKSB7XHJcbiAgICAgICAgbm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IG5vZGUucnVuQWN0aW9uKFxyXG4gICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgIGNjLmRlbGF5VGltZSh0aGlzLmRlbGF5VGltZSAqIGkpLFxyXG4gICAgICAgICAgICBjYy5mYWRlSW4odGhpcy5mYWRlRHVyYXRpb24pXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgICBhY3Rpb24uc2V0VGFnKEFjdGlvblRhZy5GYWRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRGlzYWJsZSgpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZXNbaV07XHJcbiAgICAgIGlmICghbm9kZSkgY29udGludWU7XHJcbiAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgbm9kZS5wb3NpdGlvbiA9IHRoaXMuX25vZGVEZWZhdWx0UG9zaXRpb25zW2ldO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQGNjY2xhc3MoXCJEaXNzbG92ZSRDb25maWdcIilcclxuY2xhc3MgRGlzc2xvdmUkQ29uZmlnIHtcclxuICBAcHJvcGVydHkoW2NjLlNwcml0ZV0pIHNwcml0ZXM6IGNjLlNwcml0ZVtdID0gW107XHJcblxyXG4gIHByaXZhdGUgX3V0aW1lID0gMTtcclxuICBwcml2YXRlIF9pbnRvX2lzYmVnaW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIF90aW1lVGFnOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGluaXQoKSB7fVxyXG5cclxuICBwdWJsaWMgb25FbmFibGUoKSB7XHJcbiAgICB0aGlzLl91dGltZSA9IDE7XHJcbiAgICB0aGlzLl90aW1lVGFnID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG9uRGlzYWJsZSgpIHtcclxuICAgIGlmICh0aGlzLl90aW1lVGFnKSB7XHJcbiAgICAgIHRoaXMuX3RpbWVUYWcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fdXRpbWUgPSAxO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbaV07XHJcbiAgICAgICAgaWYgKCFzcHJpdGUpIGNvbnRpbnVlO1xyXG4gICAgICAgIHNwcml0ZS5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcInVfdGltZVwiLCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICBpZiAoIXRoaXMuX3RpbWVUYWcpIHJldHVybjtcclxuICAgIGlmICh0aGlzLl91dGltZSA+IDApIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwcml0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgc3ByaXRlID0gdGhpcy5zcHJpdGVzW2ldO1xyXG4gICAgICAgIGlmICghc3ByaXRlKSBjb250aW51ZTtcclxuICAgICAgICBzcHJpdGUuZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJ1X3RpbWVcIiwgdGhpcy5fdXRpbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3V0aW1lID0gdGhpcy5fdXRpbWUgLSBkdCAqIDI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl90aW1lVGFnID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcHJpdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuc3ByaXRlc1tpXTtcclxuICAgICAgICBpZiAoIXNwcml0ZSkgY29udGludWU7XHJcbiAgICAgICAgc3ByaXRlLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwidV90aW1lXCIsIDApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3V0aW1lID0gMTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwiVmlld1V0aWwvVUlNb2RlQWN0aW9uXCIpXHJcbmV4cG9ydCBjbGFzcyBVSU1vZGVBY3Rpb24gZXh0ZW5kcyBHQ29tcG9uZW50IHtcclxuICBAcHJvcGVydHkoTW92ZSRGYWRlJENvbmZpZykgbGVmdDJSOiBNb3ZlJEZhZGUkQ29uZmlnID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KE1vdmUkRmFkZSRDb25maWcpIHJpZ2h0Mkw6IE1vdmUkRmFkZSRDb25maWcgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoTW92ZSRGYWRlJENvbmZpZykgdG9wMkI6IE1vdmUkRmFkZSRDb25maWcgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoTW92ZSRGYWRlJENvbmZpZykgYm90dG9tMlQ6IE1vdmUkRmFkZSRDb25maWcgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoTW92ZSRGYWRlJENvbmZpZykgb25seUZhZGU6IE1vdmUkRmFkZSRDb25maWcgPSBudWxsO1xyXG5cclxuICBwcm90ZWN0ZWQgX2luaXRzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgR0N0cmwuYWZ0ZXJGcmFtZXMoKCkgPT4ge1xyXG4gICAgICB0aGlzLmxlZnQyUiAmJiB0aGlzLmxlZnQyUi5pbml0KCk7XHJcbiAgICAgIHRoaXMucmlnaHQyTCAmJiB0aGlzLnJpZ2h0MkwuaW5pdCgpO1xyXG4gICAgICB0aGlzLnRvcDJCICYmIHRoaXMudG9wMkIuaW5pdCgpO1xyXG4gICAgICB0aGlzLmJvdHRvbTJUICYmIHRoaXMuYm90dG9tMlQuaW5pdCgpO1xyXG4gICAgICB0aGlzLm9ubHlGYWRlICYmIHRoaXMub25seUZhZGUuaW5pdCgpO1xyXG4gICAgICB0aGlzLl9pbml0cyA9IHRydWU7XHJcbiAgICAgIHRoaXMub25FbmFibGUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25FbmFibGUoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2luaXRzKSByZXR1cm47XHJcbiAgICBHQ3RybC5hZnRlckZyYW1lcygoKSA9PiB7XHJcbiAgICAgIHRoaXMubGVmdDJSICYmIHRoaXMubGVmdDJSLm9uRW5hYmxlKCk7XHJcbiAgICAgIHRoaXMucmlnaHQyTCAmJiB0aGlzLnJpZ2h0Mkwub25FbmFibGUoKTtcclxuICAgICAgdGhpcy50b3AyQiAmJiB0aGlzLnRvcDJCLm9uRW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuYm90dG9tMlQgJiYgdGhpcy5ib3R0b20yVC5vbkVuYWJsZSgpO1xyXG4gICAgICB0aGlzLm9ubHlGYWRlICYmIHRoaXMub25seUZhZGUub25FbmFibGUoKTtcclxuICAgICAgLy8gdGhpcy5kaXNzbG92ZSAmJiB0aGlzLmRpc3Nsb3ZlLm9uRW5hYmxlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uRGlzYWJsZSgpIHtcclxuICAgIHRoaXMubGVmdDJSICYmIHRoaXMubGVmdDJSLm9uRGlzYWJsZSgpO1xyXG4gICAgdGhpcy5yaWdodDJMICYmIHRoaXMucmlnaHQyTC5vbkRpc2FibGUoKTtcclxuICAgIHRoaXMudG9wMkIgJiYgdGhpcy50b3AyQi5vbkRpc2FibGUoKTtcclxuICAgIHRoaXMuYm90dG9tMlQgJiYgdGhpcy5ib3R0b20yVC5vbkRpc2FibGUoKTtcclxuICAgIHRoaXMub25seUZhZGUgJiYgdGhpcy5vbmx5RmFkZS5vbkRpc2FibGUoKTtcclxuICB9XHJcbn1cclxuIl19