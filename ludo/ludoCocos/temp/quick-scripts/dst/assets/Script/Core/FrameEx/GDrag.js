
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/GDrag.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c843i9kGZEsLSEsz7iePjF', 'GDrag');
// Script/Core/FrameEx/GDrag.ts

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
exports.DragEventType = void 0;
var CoreDefine_1 = require("../CoreDefine");
var AudioMgr_1 = require("../Manager/AudioMgr");
var UIMgr_1 = require("../Manager/UIMgr");
var GComponent_1 = require("./GComponent");
exports.DragEventType = {
    /** 开始拖拽节点 */
    DR_DragNodeSelect: "DR_DragNodeSelect",
    /** 拖拽节点进入其中一个节点的目标区域 */
    DR_EnterTarget: "DR_EnterTarget",
    /** 拖拽节点离开了一个节点的目标区域 */
    DR_LeaveTarget: "DR_LeaveTarget",
    /** 结束拖拽 */
    DR_DragEnd: "DR_DragEnd",
    /** 目标节点点击事件 */
    CL_TargetNodeClick: "CL_TargetNodeClick",
    /** 拖拽节点点击事件 */
    CL_DragNodeClick: "CL_DragNodeClick",
};
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var GDrag = /** @class */ (function (_super) {
    __extends(GDrag, _super);
    function GDrag() {
        /** 参数： DR(事件名称， this指针，根据环境目标节点，拖拽节点) CL(事件名称，this指针，点击的节点) */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.targetNodes = [];
        _this.dragNodes = [];
        _this.coustomSnapSize = null;
        /** 拖拽事件 */
        _this.dragEvents = [];
        /** 目标节点点击事件 */
        _this.targetNodeClickEvents = [];
        /** 拖拽节点点击事件  */
        _this.dragNodeClickEvents = [];
        _this.dragNodeHitTest = null;
        _this._touchMove = false;
        _this._touchBegin = false;
        _this._lastTargetNode = null;
        _this._dragShowNode = null;
        _this._curSelectDragNode = null;
        return _this;
    }
    Object.defineProperty(GDrag.prototype, "lastTargetNode", {
        get: function () {
            return this._lastTargetNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GDrag.prototype, "curDragNode", {
        get: function () {
            return this._curSelectDragNode;
        },
        enumerable: false,
        configurable: true
    });
    GDrag.prototype.__onLoad = function () {
        this.initEvent();
    };
    GDrag.prototype.initEvent = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    };
    GDrag.prototype._onTouchStart = function (event) {
        this._touchMove = false;
        if (cc.isValid(this._dragShowNode)) {
            this._dragShowNode.destroy();
            this._dragShowNode = null;
        }
        this._touchBegin = true;
        event.stopPropagation();
    };
    GDrag.prototype.onEnable = function () {
        this.initEvent();
    };
    GDrag.prototype.onDisable = function () {
        this.node.targetOff(this);
    };
    GDrag.prototype._onTouchMove = function (event) {
        if (!this._touchBegin)
            return;
        if (!this._touchMove) {
            var start = event.getStartLocation();
            if (event.getLocation().sub(start).mag() < 1)
                return;
            for (var i = 0; i < this.dragNodes.length; i++) {
                var node = this.dragNodes[i];
                if (!node ||
                    !node.active ||
                    !node.getBoundingBoxToWorld().contains(start))
                    continue;
                if (!this.checkMask(start, node))
                    continue;
                if (this.dragNodeHitTest &&
                    cc.isValid(this.dragNodeHitTest.target) &&
                    !this.dragNodeHitTest.emitWithBoolResult([this, node]))
                    continue;
                this._dragShowNode = node.snapshotNode(null, this.coustomSnapSize.width > 0 ? this.coustomSnapSize : null);
                this._dragShowNode.parent = this.node;
                this._curSelectDragNode = node;
                this.moveDragNodeToWorldPos(event.getLocation());
                this._touchMove = true;
                this.dispatchEvent(exports.DragEventType.DR_DragNodeSelect, this._lastTargetNode, node);
                break;
            }
            if (!this._touchMove) {
                this.resetTouchEvent();
                return;
            }
        }
        else {
            var world = event.getLocation();
            this.moveDragNodeToWorldPos(event.getLocation());
            var isCollision = false;
            for (var i = 0; i < this.targetNodes.length; i++) {
                var targetNode = this.targetNodes[i];
                if (targetNode.active &&
                    targetNode.getBoundingBoxToWorld().contains(world)) {
                    if (!this._lastTargetNode) {
                        this._lastTargetNode = targetNode;
                        this.dispatchEvent(exports.DragEventType.DR_EnterTarget, this._lastTargetNode, this._curSelectDragNode);
                    }
                    else if (this._lastTargetNode != targetNode) {
                        this.dispatchEvent(exports.DragEventType.DR_LeaveTarget, this._lastTargetNode, this._curSelectDragNode);
                        this._lastTargetNode = targetNode;
                        this.dispatchEvent(exports.DragEventType.DR_EnterTarget, this._lastTargetNode, this._curSelectDragNode);
                    }
                    isCollision = true;
                    break;
                }
            }
            if (!isCollision) {
                if (this._lastTargetNode) {
                    this.dispatchEvent(exports.DragEventType.DR_LeaveTarget, this._lastTargetNode, this._curSelectDragNode);
                }
                this._lastTargetNode = null;
            }
        }
    };
    GDrag.prototype._onTouchEnd = function (event) {
        if (this._touchMove) {
            this.dispatchEvent(exports.DragEventType.DR_DragEnd, this._lastTargetNode, this._curSelectDragNode);
        }
        else if (this._touchBegin) {
            var world = event.getLocation();
            var delta = event.getStartLocation().sub(world);
            if (Math.abs(delta.x) > 5 || Math.abs(delta.y) > 5) {
                this.resetTouchEvent();
                return;
            }
            var isClick = false;
            for (var i = 0; i < this.dragNodes.length; i++) {
                var node = this.dragNodes[i];
                if (!node)
                    continue;
                if (node.active &&
                    node.getBoundingBoxToWorld().contains(world) &&
                    this.checkMask(world, node)) {
                    cc.Component.EventHandler.emitEvents(this.dragNodeClickEvents, node);
                    this.dispatchEvent(exports.DragEventType.CL_DragNodeClick, node);
                    node.emit("click", this);
                    isClick = true;
                    break;
                }
            }
            if (!isClick) {
                for (var i = 0; i < this.targetNodes.length; i++) {
                    var node = this.targetNodes[i];
                    if (node.active && node.getBoundingBoxToWorld().contains(world)) {
                        cc.Component.EventHandler.emitEvents(this.targetNodeClickEvents, node);
                        this.dispatchEvent(exports.DragEventType.CL_TargetNodeClick, node);
                        node.emit("click", this);
                        isClick = true;
                        break;
                    }
                }
            }
            if (!isClick) {
                if (UIMgr_1.UIMgr.invalidAudio) {
                    AudioMgr_1.AudioMgr.Ins().playEffect(UIMgr_1.UIMgr.invalidAudio);
                }
            }
        }
        this.resetTouchEvent();
    };
    GDrag.prototype.checkMask = function (worldPos, node) {
        var parent = node.parent;
        while (parent && parent.parent) {
            var mask = parent.getComponent(cc.Mask);
            if (!mask) {
                parent = parent.parent;
                continue;
            }
            if (!parent.getBoundingBoxToWorld().contains(worldPos)) {
                return false;
            }
            parent = parent.parent;
        }
        return true;
    };
    GDrag.prototype._onTouchCancel = function (event) {
        this._onTouchEnd(event);
    };
    GDrag.prototype.resetTouchEvent = function () {
        this._touchBegin = false;
        this._touchMove = false;
        this._touchBeginPos = null;
        if (this._dragShowNode) {
            this._dragShowNode.destroy();
            this._dragShowNode = null;
        }
        if (this._curSelectDragNode) {
            this._curSelectDragNode = null;
        }
        this._lastTargetNode = null;
    };
    GDrag.prototype.moveDragNodeToWorldPos = function (worldPos) {
        if (!this._dragShowNode)
            return;
        var local = this.node.convertToNodeSpaceAR(worldPos);
        this._dragShowNode.position = local;
    };
    GDrag.prototype.dispatchEvent = function (eventName, targetNode, selectNode) {
        cc.Component.EventHandler.emitEvents(this.dragEvents, eventName, this, targetNode, selectNode);
    };
    GDrag.prototype.addTarget = function (node) {
        this.targetNodes.push(node);
    };
    GDrag.prototype.removeTarget = function (node) {
        var index = this.targetNodes.indexOf(node);
        if (index == CoreDefine_1.INVALID_VALUE)
            return;
        cc.js.array.fastRemoveAt(this.targetNodes, index);
        if (this._lastTargetNode == node) {
            this.resetTouchEvent();
        }
    };
    GDrag.prototype.addDragNode = function (node, index) {
        if (index === void 0) { index = null; }
        if (null == index) {
            if (this.dragNodes.indexOf(node) != CoreDefine_1.INVALID_VALUE)
                return;
            this.dragNodes.push(node);
        }
        else {
            if (this.dragNodes[index] != null)
                return;
            this.dragNodes[index] = node;
        }
    };
    GDrag.prototype.removeDragNode = function (node, onlyClear) {
        if (onlyClear === void 0) { onlyClear = false; }
        var index = this.dragNodes.indexOf(node);
        if (index == CoreDefine_1.INVALID_VALUE)
            return;
        if (onlyClear) {
            this.dragNodes[index] = null;
        }
        else {
            this.dragNodes.splice(index, 1);
        }
        if (this._curSelectDragNode == node) {
            this.resetTouchEvent();
        }
    };
    __decorate([
        property([cc.Node])
    ], GDrag.prototype, "targetNodes", void 0);
    __decorate([
        property([cc.Node])
    ], GDrag.prototype, "dragNodes", void 0);
    __decorate([
        property(cc.Size)
    ], GDrag.prototype, "coustomSnapSize", void 0);
    __decorate([
        property([cc.Component.EventHandler])
    ], GDrag.prototype, "dragEvents", void 0);
    __decorate([
        property([cc.Component.EventHandler])
    ], GDrag.prototype, "targetNodeClickEvents", void 0);
    __decorate([
        property([cc.Component.EventHandler])
    ], GDrag.prototype, "dragNodeClickEvents", void 0);
    __decorate([
        property(cc.Component.EventHandler)
    ], GDrag.prototype, "dragNodeHitTest", void 0);
    GDrag = __decorate([
        ccclass,
        menu("FrameEx/GDrag")
    ], GDrag);
    return GDrag;
}(GComponent_1.default));
exports.default = GDrag;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0dEcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBOEM7QUFDOUMsZ0RBQStDO0FBQy9DLDBDQUF5QztBQUN6QywyQ0FBc0M7QUFDekIsUUFBQSxhQUFhLEdBQUc7SUFDM0IsYUFBYTtJQUNiLGlCQUFpQixFQUFFLG1CQUFtQjtJQUN0Qyx3QkFBd0I7SUFDeEIsY0FBYyxFQUFFLGdCQUFnQjtJQUNoQyx1QkFBdUI7SUFDdkIsY0FBYyxFQUFFLGdCQUFnQjtJQUNoQyxXQUFXO0lBQ1gsVUFBVSxFQUFFLFlBQVk7SUFDeEIsZUFBZTtJQUNmLGtCQUFrQixFQUFFLG9CQUFvQjtJQUN4QyxlQUFlO0lBQ2YsZ0JBQWdCLEVBQUUsa0JBQWtCO0NBQ3JDLENBQUM7QUFDSSxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUdsRDtJQUFtQyx5QkFBVTtJQUE3QztRQUNFLCtEQUErRDtRQURqRSxxRUF3U0M7UUFyU3NCLGlCQUFXLEdBQWMsRUFBRSxDQUFDO1FBRTVCLGVBQVMsR0FBYyxFQUFFLENBQUM7UUFFNUIscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFFbkQsV0FBVztRQUVYLGdCQUFVLEdBQWdDLEVBQUUsQ0FBQztRQUM3QyxlQUFlO1FBRWYsMkJBQXFCLEdBQWdDLEVBQUUsQ0FBQztRQUN4RCxnQkFBZ0I7UUFFaEIseUJBQW1CLEdBQWdDLEVBQUUsQ0FBQztRQUd0RCxxQkFBZSxHQUE4QixJQUFJLENBQUM7UUFFeEMsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFHN0IscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFLaEMsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsd0JBQWtCLEdBQVks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QUs7UUFGekIsT0FBTztRQUNQLElBQUksQ0FBQyxlQUFlLENBQUM7T0FDRCxLQUFLLENBd1N6QjtJQUFELFlBQUM7Q0F4U0QsQUF3U0MsQ0F4U2tDLG9CQUFVLEdBd1M1QztrQkF4U29CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTlZBTElEX1ZBTFVFIH0gZnJvbSBcIi4uL0NvcmVEZWZpbmVcIjtcclxuaW1wb3J0IHsgQXVkaW9NZ3IgfSBmcm9tIFwiLi4vTWFuYWdlci9BdWRpb01nclwiO1xyXG5pbXBvcnQgeyBVSU1nciB9IGZyb20gXCIuLi9NYW5hZ2VyL1VJTWdyXCI7XHJcbmltcG9ydCBHQ29tcG9uZW50IGZyb20gXCIuL0dDb21wb25lbnRcIjtcclxuZXhwb3J0IGNvbnN0IERyYWdFdmVudFR5cGUgPSB7XHJcbiAgLyoqIOW8gOWni+aLluaLveiKgueCuSAqL1xyXG4gIERSX0RyYWdOb2RlU2VsZWN0OiBcIkRSX0RyYWdOb2RlU2VsZWN0XCIsXHJcbiAgLyoqIOaLluaLveiKgueCuei/m+WFpeWFtuS4reS4gOS4quiKgueCueeahOebruagh+WMuuWfnyAqL1xyXG4gIERSX0VudGVyVGFyZ2V0OiBcIkRSX0VudGVyVGFyZ2V0XCIsXHJcbiAgLyoqIOaLluaLveiKgueCueemu+W8gOS6huS4gOS4quiKgueCueeahOebruagh+WMuuWfnyAqL1xyXG4gIERSX0xlYXZlVGFyZ2V0OiBcIkRSX0xlYXZlVGFyZ2V0XCIsXHJcbiAgLyoqIOe7k+adn+aLluaLvSAqL1xyXG4gIERSX0RyYWdFbmQ6IFwiRFJfRHJhZ0VuZFwiLFxyXG4gIC8qKiDnm67moIfoioLngrnngrnlh7vkuovku7YgKi9cclxuICBDTF9UYXJnZXROb2RlQ2xpY2s6IFwiQ0xfVGFyZ2V0Tm9kZUNsaWNrXCIsXHJcbiAgLyoqIOaLluaLveiKgueCueeCueWHu+S6i+S7tiAqL1xyXG4gIENMX0RyYWdOb2RlQ2xpY2s6IFwiQ0xfRHJhZ05vZGVDbGlja1wiLFxyXG59O1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AbWVudShcIkZyYW1lRXgvR0RyYWdcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR0RyYWcgZXh0ZW5kcyBHQ29tcG9uZW50IHtcclxuICAvKiog5Y+C5pWw77yaIERSKOS6i+S7tuWQjeensO+8jCB0aGlz5oyH6ZKI77yM5qC55o2u546v5aKD55uu5qCH6IqC54K577yM5ouW5ou96IqC54K5KSBDTCjkuovku7blkI3np7DvvIx0aGlz5oyH6ZKI77yM54K55Ye755qE6IqC54K5KSAqL1xyXG5cclxuICBAcHJvcGVydHkoW2NjLk5vZGVdKSB0YXJnZXROb2RlczogY2MuTm9kZVtdID0gW107XHJcblxyXG4gIEBwcm9wZXJ0eShbY2MuTm9kZV0pIGRyYWdOb2RlczogY2MuTm9kZVtdID0gW107XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5TaXplKSBjb3VzdG9tU25hcFNpemU6IGNjLlNpemUgPSBudWxsO1xyXG5cclxuICAvKiog5ouW5ou95LqL5Lu2ICovXHJcbiAgQHByb3BlcnR5KFtjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyXSlcclxuICBkcmFnRXZlbnRzOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcclxuICAvKiog55uu5qCH6IqC54K554K55Ye75LqL5Lu2ICovXHJcbiAgQHByb3BlcnR5KFtjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyXSlcclxuICB0YXJnZXROb2RlQ2xpY2tFdmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdO1xyXG4gIC8qKiDmi5bmi73oioLngrnngrnlh7vkuovku7YgICovXHJcbiAgQHByb3BlcnR5KFtjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyXSlcclxuICBkcmFnTm9kZUNsaWNrRXZlbnRzOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyW10gPSBbXTtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIpXHJcbiAgZHJhZ05vZGVIaXRUZXN0OiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbnVsbDtcclxuXHJcbiAgcHJvdGVjdGVkIF90b3VjaE1vdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcm90ZWN0ZWQgX3RvdWNoQmVnaW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcm90ZWN0ZWQgX3RvdWNoQmVnaW5Qb3M6IGNjLlZlYzI7XHJcblxyXG4gIHByb3RlY3RlZCBfbGFzdFRhcmdldE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gIHB1YmxpYyBnZXQgbGFzdFRhcmdldE5vZGUoKTogY2MuTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdFRhcmdldE5vZGU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2RyYWdTaG93Tm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgcHJvdGVjdGVkIF9jdXJTZWxlY3REcmFnTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgcHVibGljIGdldCBjdXJEcmFnTm9kZSgpOiBjYy5Ob2RlIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJTZWxlY3REcmFnTm9kZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfX29uTG9hZCgpIHtcclxuICAgIHRoaXMuaW5pdEV2ZW50KCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdEV2ZW50KCkge1xyXG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5fb25Ub3VjaENhbmNlbCwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX29uVG91Y2hTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgdGhpcy5fdG91Y2hNb3ZlID0gZmFsc2U7XHJcbiAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLl9kcmFnU2hvd05vZGUpKSB7XHJcbiAgICAgIHRoaXMuX2RyYWdTaG93Tm9kZS5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2RyYWdTaG93Tm9kZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB0aGlzLl90b3VjaEJlZ2luID0gdHJ1ZTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uRW5hYmxlKCkge1xyXG4gICAgdGhpcy5pbml0RXZlbnQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbkRpc2FibGUoKSB7XHJcbiAgICB0aGlzLm5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9vblRvdWNoTW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgaWYgKCF0aGlzLl90b3VjaEJlZ2luKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMuX3RvdWNoTW92ZSkge1xyXG4gICAgICBsZXQgc3RhcnQgPSBldmVudC5nZXRTdGFydExvY2F0aW9uKCk7XHJcbiAgICAgIGlmIChldmVudC5nZXRMb2NhdGlvbigpLnN1YihzdGFydCkubWFnKCkgPCAxKSByZXR1cm47XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kcmFnTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZHJhZ05vZGVzW2ldO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFub2RlIHx8XHJcbiAgICAgICAgICAhbm9kZS5hY3RpdmUgfHxcclxuICAgICAgICAgICFub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLmNvbnRhaW5zKHN0YXJ0KVxyXG4gICAgICAgIClcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja01hc2soc3RhcnQsIG5vZGUpKSBjb250aW51ZTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLmRyYWdOb2RlSGl0VGVzdCAmJlxyXG4gICAgICAgICAgY2MuaXNWYWxpZCh0aGlzLmRyYWdOb2RlSGl0VGVzdC50YXJnZXQpICYmXHJcbiAgICAgICAgICAhdGhpcy5kcmFnTm9kZUhpdFRlc3QuZW1pdFdpdGhCb29sUmVzdWx0KFt0aGlzLCBub2RlXSlcclxuICAgICAgICApXHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB0aGlzLl9kcmFnU2hvd05vZGUgPSBub2RlLnNuYXBzaG90Tm9kZShcclxuICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICB0aGlzLmNvdXN0b21TbmFwU2l6ZS53aWR0aCA+IDAgPyB0aGlzLmNvdXN0b21TbmFwU2l6ZSA6IG51bGxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2RyYWdTaG93Tm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgdGhpcy5fY3VyU2VsZWN0RHJhZ05vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMubW92ZURyYWdOb2RlVG9Xb3JsZFBvcyhldmVudC5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICB0aGlzLl90b3VjaE1vdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICAgIERyYWdFdmVudFR5cGUuRFJfRHJhZ05vZGVTZWxlY3QsXHJcbiAgICAgICAgICB0aGlzLl9sYXN0VGFyZ2V0Tm9kZSxcclxuICAgICAgICAgIG5vZGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5fdG91Y2hNb3ZlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldFRvdWNoRXZlbnQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCB3b3JsZCA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgIHRoaXMubW92ZURyYWdOb2RlVG9Xb3JsZFBvcyhldmVudC5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgbGV0IGlzQ29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YXJnZXROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCB0YXJnZXROb2RlID0gdGhpcy50YXJnZXROb2Rlc1tpXTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0YXJnZXROb2RlLmFjdGl2ZSAmJlxyXG4gICAgICAgICAgdGFyZ2V0Tm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKS5jb250YWlucyh3b3JsZClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGlmICghdGhpcy5fbGFzdFRhcmdldE5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdFRhcmdldE5vZGUgPSB0YXJnZXROb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgICAgICAgRHJhZ0V2ZW50VHlwZS5EUl9FbnRlclRhcmdldCxcclxuICAgICAgICAgICAgICB0aGlzLl9sYXN0VGFyZ2V0Tm9kZSxcclxuICAgICAgICAgICAgICB0aGlzLl9jdXJTZWxlY3REcmFnTm9kZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXN0VGFyZ2V0Tm9kZSAhPSB0YXJnZXROb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICAgICAgICBEcmFnRXZlbnRUeXBlLkRSX0xlYXZlVGFyZ2V0LFxyXG4gICAgICAgICAgICAgIHRoaXMuX2xhc3RUYXJnZXROb2RlLFxyXG4gICAgICAgICAgICAgIHRoaXMuX2N1clNlbGVjdERyYWdOb2RlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RUYXJnZXROb2RlID0gdGFyZ2V0Tm9kZTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgICAgICAgIERyYWdFdmVudFR5cGUuRFJfRW50ZXJUYXJnZXQsXHJcbiAgICAgICAgICAgICAgdGhpcy5fbGFzdFRhcmdldE5vZGUsXHJcbiAgICAgICAgICAgICAgdGhpcy5fY3VyU2VsZWN0RHJhZ05vZGVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlzQ29sbGlzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIWlzQ29sbGlzaW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RUYXJnZXROb2RlKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgICAgIERyYWdFdmVudFR5cGUuRFJfTGVhdmVUYXJnZXQsXHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RUYXJnZXROb2RlLFxyXG4gICAgICAgICAgICB0aGlzLl9jdXJTZWxlY3REcmFnTm9kZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGFzdFRhcmdldE5vZGUgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX29uVG91Y2hFbmQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIGlmICh0aGlzLl90b3VjaE1vdmUpIHtcclxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIERyYWdFdmVudFR5cGUuRFJfRHJhZ0VuZCxcclxuICAgICAgICB0aGlzLl9sYXN0VGFyZ2V0Tm9kZSxcclxuICAgICAgICB0aGlzLl9jdXJTZWxlY3REcmFnTm9kZVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl90b3VjaEJlZ2luKSB7XHJcbiAgICAgIGxldCB3b3JsZCA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgIGxldCBkZWx0YSA9IGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS5zdWIod29ybGQpO1xyXG4gICAgICBpZiAoTWF0aC5hYnMoZGVsdGEueCkgPiA1IHx8IE1hdGguYWJzKGRlbHRhLnkpID4gNSkge1xyXG4gICAgICAgIHRoaXMucmVzZXRUb3VjaEV2ZW50KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBpc0NsaWNrID0gZmFsc2U7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kcmFnTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZHJhZ05vZGVzW2ldO1xyXG4gICAgICAgIGlmICghbm9kZSkgY29udGludWU7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgbm9kZS5hY3RpdmUgJiZcclxuICAgICAgICAgIG5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCkuY29udGFpbnMod29ybGQpICYmXHJcbiAgICAgICAgICB0aGlzLmNoZWNrTWFzayh3b3JsZCwgbm9kZSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLmRyYWdOb2RlQ2xpY2tFdmVudHMsIG5vZGUpO1xyXG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KERyYWdFdmVudFR5cGUuQ0xfRHJhZ05vZGVDbGljaywgbm9kZSk7XHJcbiAgICAgICAgICBub2RlLmVtaXQoXCJjbGlja1wiLCB0aGlzKTtcclxuICAgICAgICAgIGlzQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghaXNDbGljaykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YXJnZXROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnRhcmdldE5vZGVzW2ldO1xyXG4gICAgICAgICAgaWYgKG5vZGUuYWN0aXZlICYmIG5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCkuY29udGFpbnMod29ybGQpKSB7XHJcbiAgICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyhcclxuICAgICAgICAgICAgICB0aGlzLnRhcmdldE5vZGVDbGlja0V2ZW50cyxcclxuICAgICAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChEcmFnRXZlbnRUeXBlLkNMX1RhcmdldE5vZGVDbGljaywgbm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZW1pdChcImNsaWNrXCIsIHRoaXMpO1xyXG4gICAgICAgICAgICBpc0NsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghaXNDbGljaykge1xyXG4gICAgICAgIGlmIChVSU1nci5pbnZhbGlkQXVkaW8pIHtcclxuICAgICAgICAgIEF1ZGlvTWdyLklucygpLnBsYXlFZmZlY3QoVUlNZ3IuaW52YWxpZEF1ZGlvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlc2V0VG91Y2hFdmVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNoZWNrTWFzayh3b3JsZFBvczogY2MuVmVjMiwgbm9kZTogY2MuTm9kZSkge1xyXG4gICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50O1xyXG4gICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQucGFyZW50KSB7XHJcbiAgICAgIGxldCBtYXNrID0gcGFyZW50LmdldENvbXBvbmVudChjYy5NYXNrKTtcclxuICAgICAgaWYgKCFtYXNrKSB7XHJcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXBhcmVudC5nZXRCb3VuZGluZ0JveFRvV29ybGQoKS5jb250YWlucyh3b3JsZFBvcykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9vblRvdWNoQ2FuY2VsKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICB0aGlzLl9vblRvdWNoRW5kKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZXNldFRvdWNoRXZlbnQoKSB7XHJcbiAgICB0aGlzLl90b3VjaEJlZ2luID0gZmFsc2U7XHJcbiAgICB0aGlzLl90b3VjaE1vdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuX3RvdWNoQmVnaW5Qb3MgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuX2RyYWdTaG93Tm9kZSkge1xyXG4gICAgICB0aGlzLl9kcmFnU2hvd05vZGUuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLl9kcmFnU2hvd05vZGUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2N1clNlbGVjdERyYWdOb2RlKSB7XHJcbiAgICAgIHRoaXMuX2N1clNlbGVjdERyYWdOb2RlID0gbnVsbDtcclxuICAgIH1cclxuICAgIHRoaXMuX2xhc3RUYXJnZXROb2RlID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBtb3ZlRHJhZ05vZGVUb1dvcmxkUG9zKHdvcmxkUG9zOiBjYy5WZWMyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2RyYWdTaG93Tm9kZSkgcmV0dXJuO1xyXG4gICAgbGV0IGxvY2FsID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgIHRoaXMuX2RyYWdTaG93Tm9kZS5wb3NpdGlvbiA9IGxvY2FsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGRpc3BhdGNoRXZlbnQoXHJcbiAgICBldmVudE5hbWU6IHN0cmluZyxcclxuICAgIHRhcmdldE5vZGU6IGNjLk5vZGUsXHJcbiAgICBzZWxlY3ROb2RlPzogY2MuTm9kZVxyXG4gICkge1xyXG4gICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKFxyXG4gICAgICB0aGlzLmRyYWdFdmVudHMsXHJcbiAgICAgIGV2ZW50TmFtZSxcclxuICAgICAgdGhpcyxcclxuICAgICAgdGFyZ2V0Tm9kZSxcclxuICAgICAgc2VsZWN0Tm9kZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRUYXJnZXQobm9kZTogY2MuTm9kZSkge1xyXG4gICAgdGhpcy50YXJnZXROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZVRhcmdldChub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnRhcmdldE5vZGVzLmluZGV4T2Yobm9kZSk7XHJcbiAgICBpZiAoaW5kZXggPT0gSU5WQUxJRF9WQUxVRSkgcmV0dXJuO1xyXG4gICAgY2MuanMuYXJyYXkuZmFzdFJlbW92ZUF0KHRoaXMudGFyZ2V0Tm9kZXMsIGluZGV4KTtcclxuICAgIGlmICh0aGlzLl9sYXN0VGFyZ2V0Tm9kZSA9PSBub2RlKSB7XHJcbiAgICAgIHRoaXMucmVzZXRUb3VjaEV2ZW50KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRHJhZ05vZGUobm9kZTogY2MuTm9kZSwgaW5kZXg6IG51bWJlciA9IG51bGwpIHtcclxuICAgIGlmIChudWxsID09IGluZGV4KSB7XHJcbiAgICAgIGlmICh0aGlzLmRyYWdOb2Rlcy5pbmRleE9mKG5vZGUpICE9IElOVkFMSURfVkFMVUUpIHJldHVybjtcclxuICAgICAgdGhpcy5kcmFnTm9kZXMucHVzaChub2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmRyYWdOb2Rlc1tpbmRleF0gIT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLmRyYWdOb2Rlc1tpbmRleF0gPSBub2RlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZURyYWdOb2RlKG5vZGU6IGNjLk5vZGUsIG9ubHlDbGVhcjogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLmRyYWdOb2Rlcy5pbmRleE9mKG5vZGUpO1xyXG4gICAgaWYgKGluZGV4ID09IElOVkFMSURfVkFMVUUpIHJldHVybjtcclxuICAgIGlmIChvbmx5Q2xlYXIpIHtcclxuICAgICAgdGhpcy5kcmFnTm9kZXNbaW5kZXhdID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZHJhZ05vZGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fY3VyU2VsZWN0RHJhZ05vZGUgPT0gbm9kZSkge1xyXG4gICAgICB0aGlzLnJlc2V0VG91Y2hFdmVudCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=