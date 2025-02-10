
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GView/IrregularTrigger.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b27e4bp1tdMwblYZzaCGxXp', 'IrregularTrigger');
// Script/Core/GView/IrregularTrigger.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder, menu = _a.menu;
var IrregularTrigger = /** @class */ (function (_super) {
    __extends(IrregularTrigger, _super);
    function IrregularTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = [];
        _this.events = [];
        return _this;
    }
    IrregularTrigger.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        //
    };
    IrregularTrigger.prototype.onDestroy = function () {
        this.node.targetOff(this);
    };
    IrregularTrigger.prototype.onTouchBegin = function (event) {
        var local = event.getLocation();
        var isContain = this.check(local);
        if (isContain) {
            cc.Component.EventHandler.emitEvents(this.events, event);
            this.node["_touchListener"].setSwallowTouches(true);
        }
        else {
            this.node["_touchListener"].setSwallowTouches(false);
        }
    };
    IrregularTrigger.prototype.check = function (local) {
        var node = this.node;
        var pointInNode = node.convertToNodeSpaceAR(local);
        if (pointInNode.x < -node.width / 2 ||
            pointInNode.x > node.width / 2 ||
            pointInNode.y > node.height / 2 ||
            pointInNode.y < -node.height / 2) {
            return false;
        }
        return this.PointInPoly(pointInNode, this.points);
    };
    IrregularTrigger.prototype.PointInPoly = function (pt, poly) {
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= pt.y && pt.y < poly[j].y) ||
                (poly[j].y <= pt.y && pt.y < poly[i].y)) &&
                pt.x <
                    ((poly[j].x - poly[i].x) * (pt.y - poly[i].y)) /
                        (poly[j].y - poly[i].y) +
                        poly[i].x &&
                (c = !c);
        return c;
    };
    __decorate([
        property({
            type: [cc.Vec2],
            tooltip: CC_DEV && "触发区域矫正点列表",
        })
    ], IrregularTrigger.prototype, "points", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && "触发事件",
        })
    ], IrregularTrigger.prototype, "events", void 0);
    IrregularTrigger = __decorate([
        ccclass,
        menu("FrameEx/IrregularTriggero"),
        executionOrder(1)
    ], IrregularTrigger);
    return IrregularTrigger;
}(cc.Component));
exports.default = IrregularTrigger;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HVmlldy9JcnJlZ3VsYXJUcmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBOEMsRUFBRSxDQUFDLFVBQVUsRUFBekQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsY0FBYyxvQkFBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUlsRTtJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQThEQztRQXpEQyxZQUFNLEdBQWMsRUFBRSxDQUFDO1FBTXZCLFlBQU0sR0FBZ0MsRUFBRSxDQUFDOztJQW1EM0MsQ0FBQztJQWpEVyxpQ0FBTSxHQUFoQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFDN0IsSUFBSSxDQUFDLFlBQVksRUFDakIsSUFBSSxDQUNMLENBQUM7UUFDRixFQUFFO0lBQ0osQ0FBQztJQUVTLG9DQUFTLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVTLHVDQUFZLEdBQXRCLFVBQXVCLEtBQTBCO1FBQy9DLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksU0FBUyxFQUFFO1lBQ2IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRVMsZ0NBQUssR0FBZixVQUFnQixLQUFjO1FBQzVCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQ0UsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztZQUMvQixXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztZQUM5QixXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUMvQixXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2hDO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFUyxzQ0FBVyxHQUFyQixVQUFzQixFQUFXLEVBQUUsSUFBZTtRQUNoRCxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsRUFBRSxDQUFDLENBQUM7b0JBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBeEREO1FBSkMsUUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNmLE9BQU8sRUFBRSxNQUFNLElBQUksV0FBVztTQUMvQixDQUFDO29EQUNxQjtJQU12QjtRQUpDLFFBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVk7WUFDL0IsT0FBTyxFQUFFLE1BQU0sSUFBSSxNQUFNO1NBQzFCLENBQUM7b0RBQ3VDO0lBWHRCLGdCQUFnQjtRQUhwQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLDJCQUEyQixDQUFDO1FBQ2pDLGNBQWMsQ0FBQyxDQUFDLENBQUM7T0FDRyxnQkFBZ0IsQ0E4RHBDO0lBQUQsdUJBQUM7Q0E5REQsQUE4REMsQ0E5RDZDLEVBQUUsQ0FBQyxTQUFTLEdBOER6RDtrQkE5RG9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGV4ZWN1dGlvbk9yZGVyLCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIkZyYW1lRXgvSXJyZWd1bGFyVHJpZ2dlcm9cIilcclxuQGV4ZWN1dGlvbk9yZGVyKDEpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElycmVndWxhclRyaWdnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eSh7XHJcbiAgICB0eXBlOiBbY2MuVmVjMl0sXHJcbiAgICB0b29sdGlwOiBDQ19ERVYgJiYgXCLop6blj5HljLrln5/nn6vmraPngrnliJfooahcIixcclxuICB9KVxyXG4gIHBvaW50czogY2MuVmVjMltdID0gW107XHJcblxyXG4gIEBwcm9wZXJ0eSh7XHJcbiAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxyXG4gICAgdG9vbHRpcDogQ0NfREVWICYmIFwi6Kem5Y+R5LqL5Lu2XCIsXHJcbiAgfSlcclxuICBldmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdO1xyXG5cclxuICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5ub2RlLm9uPHsgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB9PihcclxuICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgIHRoaXMub25Ub3VjaEJlZ2luLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG4gICAgLy9cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uVG91Y2hCZWdpbihldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgbGV0IGxvY2FsID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgIGxldCBpc0NvbnRhaW4gPSB0aGlzLmNoZWNrKGxvY2FsKTtcclxuICAgIGlmIChpc0NvbnRhaW4pIHtcclxuICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuZXZlbnRzLCBldmVudCk7XHJcbiAgICAgIHRoaXMubm9kZVtcIl90b3VjaExpc3RlbmVyXCJdLnNldFN3YWxsb3dUb3VjaGVzKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ub2RlW1wiX3RvdWNoTGlzdGVuZXJcIl0uc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNoZWNrKGxvY2FsOiBjYy5WZWMyKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgbm9kZSA9IHRoaXMubm9kZTtcclxuICAgIGxldCBwb2ludEluTm9kZSA9IG5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIobG9jYWwpO1xyXG4gICAgaWYgKFxyXG4gICAgICBwb2ludEluTm9kZS54IDwgLW5vZGUud2lkdGggLyAyIHx8XHJcbiAgICAgIHBvaW50SW5Ob2RlLnggPiBub2RlLndpZHRoIC8gMiB8fFxyXG4gICAgICBwb2ludEluTm9kZS55ID4gbm9kZS5oZWlnaHQgLyAyIHx8XHJcbiAgICAgIHBvaW50SW5Ob2RlLnkgPCAtbm9kZS5oZWlnaHQgLyAyXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuUG9pbnRJblBvbHkocG9pbnRJbk5vZGUsIHRoaXMucG9pbnRzKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBQb2ludEluUG9seShwdDogY2MuVmVjMiwgcG9seTogY2MuVmVjMltdKSB7XHJcbiAgICBmb3IgKHZhciBjID0gZmFsc2UsIGkgPSAtMSwgbCA9IHBvbHkubGVuZ3RoLCBqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKVxyXG4gICAgICAoKHBvbHlbaV0ueSA8PSBwdC55ICYmIHB0LnkgPCBwb2x5W2pdLnkpIHx8XHJcbiAgICAgICAgKHBvbHlbal0ueSA8PSBwdC55ICYmIHB0LnkgPCBwb2x5W2ldLnkpKSAmJlxyXG4gICAgICAgIHB0LnggPFxyXG4gICAgICAgICAgKChwb2x5W2pdLnggLSBwb2x5W2ldLngpICogKHB0LnkgLSBwb2x5W2ldLnkpKSAvXHJcbiAgICAgICAgICAgIChwb2x5W2pdLnkgLSBwb2x5W2ldLnkpICtcclxuICAgICAgICAgICAgcG9seVtpXS54ICYmXHJcbiAgICAgICAgKGMgPSAhYyk7XHJcbiAgICByZXR1cm4gYztcclxuICB9XHJcbn1cclxuIl19