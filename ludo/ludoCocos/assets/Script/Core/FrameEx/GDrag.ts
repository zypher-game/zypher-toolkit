import { INVALID_VALUE } from "../CoreDefine";
import { AudioMgr } from "../Manager/AudioMgr";
import { UIMgr } from "../Manager/UIMgr";
import GComponent from "./GComponent";
export const DragEventType = {
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
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("FrameEx/GDrag")
export default class GDrag extends GComponent {
  /** 参数： DR(事件名称， this指针，根据环境目标节点，拖拽节点) CL(事件名称，this指针，点击的节点) */

  @property([cc.Node]) targetNodes: cc.Node[] = [];

  @property([cc.Node]) dragNodes: cc.Node[] = [];

  @property(cc.Size) coustomSnapSize: cc.Size = null;

  /** 拖拽事件 */
  @property([cc.Component.EventHandler])
  dragEvents: cc.Component.EventHandler[] = [];
  /** 目标节点点击事件 */
  @property([cc.Component.EventHandler])
  targetNodeClickEvents: cc.Component.EventHandler[] = [];
  /** 拖拽节点点击事件  */
  @property([cc.Component.EventHandler])
  dragNodeClickEvents: cc.Component.EventHandler[] = [];

  @property(cc.Component.EventHandler)
  dragNodeHitTest: cc.Component.EventHandler = null;

  protected _touchMove: boolean = false;
  protected _touchBegin: boolean = false;
  protected _touchBeginPos: cc.Vec2;

  protected _lastTargetNode: cc.Node = null;
  public get lastTargetNode(): cc.Node {
    return this._lastTargetNode;
  }

  protected _dragShowNode: cc.Node = null;
  protected _curSelectDragNode: cc.Node = null;
  public get curDragNode(): cc.Node {
    return this._curSelectDragNode;
  }

  protected __onLoad() {
    this.initEvent();
  }

  protected initEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
  }

  protected _onTouchStart(event: cc.Event.EventTouch) {
    this._touchMove = false;
    if (cc.isValid(this._dragShowNode)) {
      this._dragShowNode.destroy();
      this._dragShowNode = null;
    }
    this._touchBegin = true;
    event.stopPropagation();
  }

  protected onEnable() {
    this.initEvent();
  }

  protected onDisable() {
    this.node.targetOff(this);
  }

  protected _onTouchMove(event: cc.Event.EventTouch) {
    if (!this._touchBegin) return;
    if (!this._touchMove) {
      let start = event.getStartLocation();
      if (event.getLocation().sub(start).mag() < 1) return;
      for (let i = 0; i < this.dragNodes.length; i++) {
        let node = this.dragNodes[i];
        if (
          !node ||
          !node.active ||
          !node.getBoundingBoxToWorld().contains(start)
        )
          continue;
        if (!this.checkMask(start, node)) continue;
        if (
          this.dragNodeHitTest &&
          cc.isValid(this.dragNodeHitTest.target) &&
          !this.dragNodeHitTest.emitWithBoolResult([this, node])
        )
          continue;
        this._dragShowNode = node.snapshotNode(
          null,
          this.coustomSnapSize.width > 0 ? this.coustomSnapSize : null
        );
        this._dragShowNode.parent = this.node;
        this._curSelectDragNode = node;
        this.moveDragNodeToWorldPos(event.getLocation());
        this._touchMove = true;
        this.dispatchEvent(
          DragEventType.DR_DragNodeSelect,
          this._lastTargetNode,
          node
        );
        break;
      }
      if (!this._touchMove) {
        this.resetTouchEvent();
        return;
      }
    } else {
      let world = event.getLocation();
      this.moveDragNodeToWorldPos(event.getLocation());
      let isCollision = false;
      for (let i = 0; i < this.targetNodes.length; i++) {
        let targetNode = this.targetNodes[i];
        if (
          targetNode.active &&
          targetNode.getBoundingBoxToWorld().contains(world)
        ) {
          if (!this._lastTargetNode) {
            this._lastTargetNode = targetNode;
            this.dispatchEvent(
              DragEventType.DR_EnterTarget,
              this._lastTargetNode,
              this._curSelectDragNode
            );
          } else if (this._lastTargetNode != targetNode) {
            this.dispatchEvent(
              DragEventType.DR_LeaveTarget,
              this._lastTargetNode,
              this._curSelectDragNode
            );
            this._lastTargetNode = targetNode;
            this.dispatchEvent(
              DragEventType.DR_EnterTarget,
              this._lastTargetNode,
              this._curSelectDragNode
            );
          }
          isCollision = true;
          break;
        }
      }
      if (!isCollision) {
        if (this._lastTargetNode) {
          this.dispatchEvent(
            DragEventType.DR_LeaveTarget,
            this._lastTargetNode,
            this._curSelectDragNode
          );
        }
        this._lastTargetNode = null;
      }
    }
  }

  protected _onTouchEnd(event: cc.Event.EventTouch) {
    if (this._touchMove) {
      this.dispatchEvent(
        DragEventType.DR_DragEnd,
        this._lastTargetNode,
        this._curSelectDragNode
      );
    } else if (this._touchBegin) {
      let world = event.getLocation();
      let delta = event.getStartLocation().sub(world);
      if (Math.abs(delta.x) > 5 || Math.abs(delta.y) > 5) {
        this.resetTouchEvent();
        return;
      }
      let isClick = false;
      for (let i = 0; i < this.dragNodes.length; i++) {
        let node = this.dragNodes[i];
        if (!node) continue;
        if (
          node.active &&
          node.getBoundingBoxToWorld().contains(world) &&
          this.checkMask(world, node)
        ) {
          cc.Component.EventHandler.emitEvents(this.dragNodeClickEvents, node);
          this.dispatchEvent(DragEventType.CL_DragNodeClick, node);
          node.emit("click", this);
          isClick = true;
          break;
        }
      }
      if (!isClick) {
        for (let i = 0; i < this.targetNodes.length; i++) {
          let node = this.targetNodes[i];
          if (node.active && node.getBoundingBoxToWorld().contains(world)) {
            cc.Component.EventHandler.emitEvents(
              this.targetNodeClickEvents,
              node
            );
            this.dispatchEvent(DragEventType.CL_TargetNodeClick, node);
            node.emit("click", this);
            isClick = true;
            break;
          }
        }
      }
      if (!isClick) {
        if (UIMgr.invalidAudio) {
          AudioMgr.Ins().playEffect(UIMgr.invalidAudio);
        }
      }
    }

    this.resetTouchEvent();
  }

  protected checkMask(worldPos: cc.Vec2, node: cc.Node) {
    let parent = node.parent;
    while (parent && parent.parent) {
      let mask = parent.getComponent(cc.Mask);
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
  }

  protected _onTouchCancel(event: cc.Event.EventTouch) {
    this._onTouchEnd(event);
  }

  protected resetTouchEvent() {
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
  }

  protected moveDragNodeToWorldPos(worldPos: cc.Vec2) {
    if (!this._dragShowNode) return;
    let local = this.node.convertToNodeSpaceAR(worldPos);
    this._dragShowNode.position = local;
  }

  protected dispatchEvent(
    eventName: string,
    targetNode: cc.Node,
    selectNode?: cc.Node
  ) {
    cc.Component.EventHandler.emitEvents(
      this.dragEvents,
      eventName,
      this,
      targetNode,
      selectNode
    );
  }

  public addTarget(node: cc.Node) {
    this.targetNodes.push(node);
  }

  public removeTarget(node: cc.Node) {
    let index = this.targetNodes.indexOf(node);
    if (index == INVALID_VALUE) return;
    cc.js.array.fastRemoveAt(this.targetNodes, index);
    if (this._lastTargetNode == node) {
      this.resetTouchEvent();
    }
  }

  public addDragNode(node: cc.Node, index: number = null) {
    if (null == index) {
      if (this.dragNodes.indexOf(node) != INVALID_VALUE) return;
      this.dragNodes.push(node);
    } else {
      if (this.dragNodes[index] != null) return;
      this.dragNodes[index] = node;
    }
  }

  public removeDragNode(node: cc.Node, onlyClear: boolean = false) {
    let index = this.dragNodes.indexOf(node);
    if (index == INVALID_VALUE) return;
    if (onlyClear) {
      this.dragNodes[index] = null;
    } else {
      this.dragNodes.splice(index, 1);
    }
    if (this._curSelectDragNode == node) {
      this.resetTouchEvent();
    }
  }
}
