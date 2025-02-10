"use strict";
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