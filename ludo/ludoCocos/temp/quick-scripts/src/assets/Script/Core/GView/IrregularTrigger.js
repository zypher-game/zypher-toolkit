"use strict";
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