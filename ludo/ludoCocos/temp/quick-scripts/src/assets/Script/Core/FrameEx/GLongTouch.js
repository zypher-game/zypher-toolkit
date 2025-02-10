"use strict";
cc._RF.push(module, 'fab2fjeTVVEF4gggiW0Uzb/', 'GLongTouch');
// Script/Core/FrameEx/GLongTouch.ts

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
var AudioMgr_1 = require("../Manager/AudioMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, inspector = _a.inspector;
var GLongTouch = /** @class */ (function (_super) {
    __extends(GLongTouch, _super);
    //@inspector('packages://inspector/inspectors/comps/button.js')
    function GLongTouch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.longTouchEvents = [];
        _this.longTouchInterval = 0.5;
        _this._intervalAct = 0; //加速度
        _this._intervalActMax = 0; //速度最大值
        _this._delta = 0;
        _this._hoverTime = 0; //按住时间
        _this._beginTimes = 1; //长按x秒后进行事件
        _this.originalInterval = 0.5;
        _this._canLongTouchCb = function (isBegin) {
            return 0;
        };
        _this._endTouchCb = function () {
            return 0;
        };
        return _this;
    }
    GLongTouch_1 = GLongTouch;
    Object.defineProperty(GLongTouch.prototype, "canLongTouchCb", {
        get: function () {
            return this._canLongTouchCb;
        },
        set: function (cb) {
            this._canLongTouchCb = cb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLongTouch.prototype, "intervalAct", {
        set: function (act) {
            this._intervalAct = act;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLongTouch.prototype, "endTouchCb", {
        set: function (cb) {
            this._endTouchCb = cb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLongTouch.prototype, "intervalActMax", {
        set: function (act) {
            this._intervalActMax = act;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLongTouch.prototype, "hoverTime", {
        set: function (time) {
            this._hoverTime = time;
        },
        enumerable: false,
        configurable: true
    });
    GLongTouch.prototype.onLoad = function () {
        // if (this.clickEvents.length != 0) {
        //     this.longTouchEvents = this.clickEvents;
        //     this.clickEvents = [];
        // }
        this.originalInterval = this.longTouchInterval;
    };
    GLongTouch.prototype._onTouchBegan = function (event) {
        if (!this.interactable || !this.enabledInHierarchy)
            return;
        this["_pressed"] = true;
        this["_updateState"]();
        if (this._canLongTouchCb) {
            var state = this._canLongTouchCb(true);
            if (state > GLongTouch_1.ContinuteState.Normal) {
                if (state == GLongTouch_1.ContinuteState.Cancel) {
                    this["_pressed"] = false;
                    this["_updateState"]();
                    this.hoverTime = 0;
                    this.longTouchInterval = this.originalInterval;
                }
                event.stopPropagation();
                return;
            }
        }
        this.emitLongTouchEvent();
        event.stopPropagation();
    };
    GLongTouch.prototype._onTouchEnded = function (event) {
        if (cc.Button.comAudio) {
            AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        _super.prototype._onTouchEnded.call(this, event);
        this.hoverTime = 0;
        this.longTouchInterval = this.originalInterval;
        if (this._endTouchCb)
            this._endTouchCb();
    };
    GLongTouch.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        // long touch event deal:
        if (!this["_pressed"])
            return;
        if (this._intervalAct) {
            if (this.longTouchInterval == this._intervalActMax) {
                this.longTouchInterval = this._intervalActMax;
            }
            else {
                this.longTouchInterval -= this._intervalAct;
            }
        }
        if (this._beginTimes) {
            this._hoverTime += dt;
            if (this._hoverTime < this._beginTimes) {
                return;
            }
        }
        if (this._delta < this.longTouchInterval) {
            this._delta += dt;
            return;
        }
        if (this._canLongTouchCb) {
            var state = this._canLongTouchCb(false);
            if (state > GLongTouch_1.ContinuteState.Normal) {
                if (state == GLongTouch_1.ContinuteState.Cancel) {
                    this["_pressed"] = false;
                    this["_updateState"]();
                    this.hoverTime = 0;
                    this.longTouchInterval = this.originalInterval;
                    if (this._endTouchCb)
                        this._endTouchCb();
                }
                return;
            }
        }
        this._delta = 0;
        this.emitLongTouchEvent();
    };
    GLongTouch.prototype.emitLongTouchEvent = function () {
        var custom = new cc.Event.EventCustom("touching", true);
        custom.setUserData(this.node);
        if (cc.Button.comAudio) {
            AudioMgr_1.AudioMgr.Ins().playEffect(cc.Button.comAudio);
        }
        cc.Component.EventHandler.emitEvents(this.longTouchEvents, custom);
    };
    var GLongTouch_1;
    GLongTouch.ContinuteState = {
        /** 无状态 */
        Null: 0,
        /** 正常状态 */
        Normal: 1,
        /** 等待状态 */
        Wait: 2,
        /** 取消状态 */
        Cancel: 3,
    };
    __decorate([
        property([cc.Component.EventHandler])
    ], GLongTouch.prototype, "longTouchEvents", void 0);
    __decorate([
        property
    ], GLongTouch.prototype, "longTouchInterval", void 0);
    GLongTouch = GLongTouch_1 = __decorate([
        ccclass,
        menu("FrameEx/GLongTouch")
        //@inspector('packages://inspector/inspectors/comps/button.js')
    ], GLongTouch);
    return GLongTouch;
}(cc.Button));
exports.default = GLongTouch;

cc._RF.pop();