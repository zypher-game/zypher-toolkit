
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/GTimerComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9HVGltZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQWtEO0FBQ2xELGtDQUFpQztBQUUzQixJQUFBLEtBQThDLEVBQUUsQ0FBQyxVQUFVLEVBQXpELE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLGNBQWMsb0JBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFJbEU7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUF1Q0M7UUFyQ0MsWUFBTSxHQUFhLElBQUksQ0FBQztRQUN4QixlQUFlO1FBQ0wsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFDOUIscUJBQXFCO1FBQ1gsaUJBQVcsR0FBVyxHQUFHLENBQUM7UUFFcEMsY0FBYztRQUNKLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsYUFBTyxHQUFZLEtBQUssQ0FBQzs7SUEyQnJDLENBQUM7SUF6QkMsZ0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsa0JBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVELCtCQUFLLEdBQUwsY0FBUyxDQUFDO0lBRVYsbUNBQVMsR0FBVDtRQUNFLGFBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFUyxzQ0FBWSxHQUF0QjtRQUNFLElBQUksQ0FBQyxNQUFNLElBQUksYUFBSyxDQUFDLGVBQWUsQ0FBQztRQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLE9BQU87UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVTLG1DQUFTLEdBQW5CLGNBQXVCLENBQUM7SUFFakIsaUNBQU8sR0FBZDtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBQ3pCLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQUssQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBcENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ0s7SUFFZDtRQUFULFFBQVE7c0RBQXVCO0lBQ3RCO1FBQVQsUUFBUTtzREFBdUI7SUFDdEI7UUFBVCxRQUFRO29EQUFxQjtJQUVwQjtRQUFULFFBQVE7d0RBQTJCO0lBUmpCLGVBQWU7UUFIbkMsT0FBTztRQUNQLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztRQUNsQyxjQUFjLENBQUMsQ0FBQyxDQUFDO09BQ0csZUFBZSxDQXVDbkM7SUFBRCxzQkFBQztDQXZDRCxBQXVDQyxDQXZDNEMsRUFBRSxDQUFDLFNBQVMsR0F1Q3hEO2tCQXZDb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSUNyZWF0ZSBmcm9tIFwiLi4vLi4vR2FtZS9Db21tb24vVUlDcmVhdGVcIjtcclxuaW1wb3J0IHsgR0N0cmwgfSBmcm9tIFwiLi4vR0N0cmxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGlvbk9yZGVyLCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIlZpZXcvR0Jhc2UvR1RpbWVyQ29tcG9uZW50XCIpXHJcbkBleGVjdXRpb25PcmRlcigxKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHVGltZXJDb21wb25lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICB0aW1lTGI6IGNjLkxhYmVsID0gbnVsbDtcclxuICAvLyDlgJLorqHml7bmgLvml7bpl7TvvIjljZXkvY3vvJrnp5LvvIlcclxuICBAcHJvcGVydHkgdG90YWxUaW1lOiBudW1iZXIgPSAwO1xyXG4gIEBwcm9wZXJ0eSBzdGFydFRpbWU6IG51bWJlciA9IDA7XHJcbiAgQHByb3BlcnR5IGVuZFRpbWU6IG51bWJlciA9IDA7XHJcbiAgLy8g5ZON5bqU5pe26Ze0KOS4gOiIrOS4uuebkeWQrOmikeeOhywg5Y2V5L2N56eSKVxyXG4gIEBwcm9wZXJ0eSBzdGFyZ2V0VGltZTogbnVtYmVyID0gMS4wO1xyXG5cclxuICAvLyBkZWx0Ye+8iOWNleS9je+8muenku+8iVxyXG4gIHByb3RlY3RlZCBfZGVsdGE6IG51bWJlciA9IDA7XHJcbiAgcHJvdGVjdGVkIF9iU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgaWYgKCF0aGlzLnRpbWVMYikge1xyXG4gICAgICB0aGlzLnRpbWVMYiA9IFVJQ3JlYXRlLmFkZExhYmVsQ29tKHRoaXMubm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGFydCgpIHt9XHJcblxyXG4gIG9uRGVzdHJveSgpIHtcclxuICAgIEdDdHJsLkVTLm9mZih0aGlzKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvblRpbWVyRXZlbnQoKSB7XHJcbiAgICB0aGlzLl9kZWx0YSArPSBHQ3RybC5kZWx0YVNlY29uZFRpbWU7XHJcbiAgICBpZiAodGhpcy5fZGVsdGEgPCAxKSByZXR1cm47XHJcbiAgICB0aGlzLl9kZWx0YSA9IDA7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb25UaW1lRW5kKCkge31cclxuXHJcbiAgcHVibGljIHN0YXJ0Q0QoKSB7XHJcbiAgICBpZiAodGhpcy5fYlN0YXJ0KSByZXR1cm47XHJcbiAgICBHQ3RybC5FUy5vbihHQ3RybC5HVGltZXJTZWNvbmRFdmVudE1zZywgdGhpcywgdGhpcy5vblRpbWVyRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLl9iU3RhcnQgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19