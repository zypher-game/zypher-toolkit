"use strict";
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