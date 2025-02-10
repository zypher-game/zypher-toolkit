"use strict";
cc._RF.push(module, '37fe7cIpqJP7IpJaX8nW2Sh', 'GTimerComponent');
// Script/Core/GView/GTimerComponent.ts

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
var UICreate_1 = require("../../Game/Common/UICreate");
var GCtrl_1 = require("../GCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, menu = _a.menu;
var GTimerComponent = /** @class */ (function (_super) {
    __extends(GTimerComponent, _super);
    function GTimerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeLb = null;
        // 倒计时总时间（单位：秒）
        _this.totalTime = 0;
        _this.startTime = 0;
        _this.endTime = 0;
        // 响应时间(一般为监听频率, 单位秒)
        _this.stargetTime = 1.0;
        // delta（单位：秒）
        _this._delta = 0;
        _this._bStart = false;
        return _this;
    }
    GTimerComponent.prototype.onLoad = function () {
        if (!this.timeLb) {
            this.timeLb = UICreate_1.default.addLabelCom(this.node);
        }
    };
    GTimerComponent.prototype.start = function () { };
    GTimerComponent.prototype.onDestroy = function () {
        GCtrl_1.GCtrl.ES.off(this);
    };
    GTimerComponent.prototype.onTimerEvent = function () {
        this._delta += GCtrl_1.GCtrl.deltaSecondTime;
        if (this._delta < 1)
            return;
        this._delta = 0;
    };
    GTimerComponent.prototype.onTimeEnd = function () { };
    GTimerComponent.prototype.startCD = function () {
        if (this._bStart)
            return;
        GCtrl_1.GCtrl.ES.on(GCtrl_1.GCtrl.GTimerSecondEventMsg, this, this.onTimerEvent.bind(this));
        this._bStart = false;
    };
    __decorate([
        property(cc.Label)
    ], GTimerComponent.prototype, "timeLb", void 0);
    __decorate([
        property
    ], GTimerComponent.prototype, "totalTime", void 0);
    __decorate([
        property
    ], GTimerComponent.prototype, "startTime", void 0);
    __decorate([
        property
    ], GTimerComponent.prototype, "endTime", void 0);
    __decorate([
        property
    ], GTimerComponent.prototype, "stargetTime", void 0);
    GTimerComponent = __decorate([
        ccclass,
        menu("View/GBase/GTimerComponent"),
        executionOrder(1)
    ], GTimerComponent);
    return GTimerComponent;
}(cc.Component));
exports.default = GTimerComponent;

cc._RF.pop();