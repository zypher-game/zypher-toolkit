const { ccclass, property, executionOrder, menu } = cc._decorator;
@ccclass
@menu("FrameEx/IrregularTriggero")
@executionOrder(1)
export default class IrregularTrigger extends cc.Component {
  @property({
    type: [cc.Vec2],
    tooltip: CC_DEV && "触发区域矫正点列表",
  })
  points: cc.Vec2[] = [];

  @property({
    type: cc.Component.EventHandler,
    tooltip: CC_DEV && "触发事件",
  })
  events: cc.Component.EventHandler[] = [];

  protected onLoad() {
    this.node.on<{ (event: cc.Event.EventTouch): void }>(
      cc.Node.EventType.TOUCH_START,
      this.onTouchBegin,
      this
    );
    //
  }

  protected onDestroy() {
    this.node.targetOff(this);
  }

  protected onTouchBegin(event: cc.Event.EventTouch) {
    let local = event.getLocation();
    let isContain = this.check(local);
    if (isContain) {
      cc.Component.EventHandler.emitEvents(this.events, event);
      this.node["_touchListener"].setSwallowTouches(true);
    } else {
      this.node["_touchListener"].setSwallowTouches(false);
    }
  }

  protected check(local: cc.Vec2): boolean {
    let node = this.node;
    let pointInNode = node.convertToNodeSpaceAR(local);
    if (
      pointInNode.x < -node.width / 2 ||
      pointInNode.x > node.width / 2 ||
      pointInNode.y > node.height / 2 ||
      pointInNode.y < -node.height / 2
    ) {
      return false;
    }
    return this.PointInPoly(pointInNode, this.points);
  }

  protected PointInPoly(pt: cc.Vec2, poly: cc.Vec2[]) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i].y <= pt.y && pt.y < poly[j].y) ||
        (poly[j].y <= pt.y && pt.y < poly[i].y)) &&
        pt.x <
          ((poly[j].x - poly[i].x) * (pt.y - poly[i].y)) /
            (poly[j].y - poly[i].y) +
            poly[i].x &&
        (c = !c);
    return c;
  }
}
