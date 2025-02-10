import { JXEDir } from "../../Game/Views/Fight/JXULDefine";
import GEventSystem from "../GEvent/GEventSystem";
import MathEx from "../Math/MathEx";
import { CCNodeImpl } from "./CCNodeImpl";

/** 运算模板 */
let vTpl1: cc.Vec2 = cc.Vec2.ZERO,
  vTpl2 = cc.Vec2.ZERO;

function callSuper(
  _father_: any,
  callFunc: string,
  object: any,
  ...others: any[]
) {
  return _father_.prototype[callFunc].call(object, ...others);
}

/** 序列动作标签 */
export const QUEUE_ACTION_TAG = 1001;

export const JXActionMsg = {
  action: {
    end: "JXActionMsg.action,end",
  },
};

export class JXSpriteFrameAciton extends cc.ActionInterval {
  public sprites: cc.SpriteFrame[];
  protected _sprite: cc.Sprite;
  public playOnce: boolean = false;
  public lenth: number;
  public fps: number;
  public curIndex: number;
  public curTime: number;

  constructor(fps: number, sprites: cc.SpriteFrame[], loop = true) {
    super();
    this.sprites = sprites;
    this.lenth = this.sprites.length;
    this.fps = fps;
    let d = (1 / fps) * this.lenth;
    callSuper(cc.ActionInterval, "initWithDuration", this, d);
    this.setOnce(!loop);
  }

  setOnce(bOnce: boolean): JXSpriteFrameAciton {
    this.playOnce = bOnce;
    if (bOnce) {
    } else {
      this.repeatForever();
    }
    return this;
  }

  startWithTarget(target: CCNodeImpl) {
    callSuper(cc.ActionInterval, "startWithTarget", this, target);
    let sprite = target.getComponent(cc.Sprite);
    if (!sprite) return;
    this._sprite = sprite;
    this.curIndex = 0;
    this.curTime = 0;
  }

  update(dt: number) {
    if (this.curIndex < this.lenth) {
      if (this._sprite.spriteFrame != this.sprites[this.curIndex]) {
        this._sprite.spriteFrame = this.sprites[this.curIndex];
      }
      this.curTime += dt;
      if (this.curTime >= 1 / this.fps) {
        this.curIndex++;
        this.curTime = 0;
      }
    }
  }
}

function bezierAt(a: number, b: number, c: number, d: number, t: number) {
  return (
    Math.pow(1 - t, 3) * a +
    3 * t * Math.pow(1 - t, 2) * b +
    3 * Math.pow(t, 2) * (1 - t) * c +
    Math.pow(t, 3) * d
  );
}

/** 带方向的贝塞尔曲线运动， angle = 节点x轴方向和水平面的夹角 */
export class JXBezierBy extends cc.BezierBy {
  constructor(t: number, c: cc.Vec2[], a: number = 0) {
    super(t, c);
  }

  initWithDuration(t: number, c: cc.Vec2[]) {
    if (callSuper(cc.ActionInterval, "initWithDuration", this, t)) {
      this["_config"] = c;
      return true;
    }
    return false;
  }

  update(dt: number) {
    dt = callSuper(cc["BezierBy"], "_computeEaseTime", this, dt);
    let target = this["target"] as CCNodeImpl;
    if (target) {
      var locConfig = this["_config"];
      var xa = 0;
      var xb = locConfig[0].x;
      var xc = locConfig[1].x;
      var xd = locConfig[2].x;

      var ya = 0;
      var yb = locConfig[0].y;
      var yc = locConfig[1].y;
      var yd = locConfig[2].y;

      if (locConfig[3]) {
        xa = locConfig[0].x;
        xb = locConfig[1].x;
        xc = locConfig[2].x;
        xd = locConfig[3].x;
        ya = locConfig[0].y;
        yb = locConfig[1].y;
        yc = locConfig[2].y;
        yd = locConfig[3].y;
      }

      var x = bezierAt(xa, xb, xc, xd, dt);
      var y = bezierAt(ya, yb, yc, yd, dt);

      var locStartPosition = this["_startPosition"];
      (vTpl1.x = target.x), (vTpl1.y = target.y);
      if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
        var locPreviousPosition = this["_previousPosition"];
        locStartPosition.x =
          locStartPosition.x + vTpl1.x - locPreviousPosition.x;
        locStartPosition.y =
          locStartPosition.y + vTpl1.y - locPreviousPosition.y;
        x = x + locStartPosition.x;
        y = y + locStartPosition.y;
        locPreviousPosition.x = x;
        locPreviousPosition.y = y;
        target.setPosition(x, y);
        if (vTpl1.equals(locPreviousPosition)) return;
        let angle = MathEx.getAngleX(vTpl1, locPreviousPosition);
        target.angle = angle;
      } else {
        target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
        if (vTpl1.equals(locPreviousPosition)) return;
        let angle = MathEx.getAngleX(vTpl1, target.position);
        target.angle = angle;
      }
    }
  }
}

export class JXBezierTo extends JXBezierBy {
  protected _toConfig = [];

  constructor(t: number, c: cc.Vec2[], a?: number) {
    super(t, c, a);
    this._toConfig = c;
  }

  initWithDuration(t: number, c: cc.Vec2[]) {
    if (callSuper(cc.ActionInterval, "initWithDuration", this, t)) {
      this["_config"] = c;
      return true;
    }
    return false;
  }

  startWithTarget(target: cc.Node) {
    callSuper(cc["BezierBy"], "startWithTarget", this, target);
    var locStartPos = this["_startPosition"];
    var locToConfig = this._toConfig;
    var locConfig = this["_config"];
    locConfig[0] = locToConfig[0].sub(locStartPos);
    locConfig[1] = locToConfig[1].sub(locStartPos);
    locConfig[2] = locToConfig[2].sub(locStartPos);
    if (locConfig[3]) {
      locConfig[3] = locToConfig[3].sub(locStartPos);
    }
  }
}

/** 带方向直线位移运动 */
export class JXMoveBy extends cc.MoveBy {
  constructor(t: number, c: cc.Vec2) {
    super(t, c);
  }

  update(dt) {
    dt = callSuper(cc["BezierBy"], "_computeEaseTime", this, dt);
    let target = this["target"] as CCNodeImpl;
    if (target) {
      var x = this["_positionDelta"].x * dt;
      var y = this["_positionDelta"].y * dt;
      var locStartPosition = this["_startPosition"];
      (vTpl1.x = target.x), (vTpl1.y = target.y);
      if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
        var locPreviousPosition = this["_previousPosition"];
        locStartPosition.x =
          locStartPosition.x + vTpl1.x - locPreviousPosition.x;
        locStartPosition.y =
          locStartPosition.y + vTpl1.y - locPreviousPosition.y;
        x = x + locStartPosition.x;
        y = y + locStartPosition.y;
        locPreviousPosition.x = x;
        locPreviousPosition.y = y;
        target.setPosition(x, y);
        if (vTpl1.equals(locPreviousPosition)) return;
      } else {
        target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
        if (vTpl1.equals(locPreviousPosition)) return;
        let angle = MathEx.getAngleX(vTpl1, locPreviousPosition);
        target.angle = angle;
      }
    }
  }
}

export class JXMoveTo extends JXMoveBy {
  protected _endPosition: cc.Vec2 = null;
  protected _eEnd: { x: number; y: number } = null;

  constructor(t: number, c: cc.Vec2, eEnd?: { x: number; y: number }) {
    super(t, c);
    this._endPosition = c;
    this._eEnd = eEnd;
  }

  startWithTarget(target: cc.Node) {
    callSuper(cc.MoveBy, "startWithTarget", this, target);
    this["_positionDelta"].x = this._endPosition.x - target.x;
    this["_positionDelta"].y = this._endPosition.y - target.y;
    const _targetStr = JSON.stringify({
      x: Math.round(target.position.x),
      y: Math.round(target.position.y),
    });
    const _endPositionStr = JSON.stringify({
      x: Math.round(this._endPosition.x),
      y: Math.round(this._endPosition.y),
    });
    console.log({ _targetStr, _endPositionStr });
    let end = this._endPosition;
    if (this._eEnd && _targetStr === _endPositionStr) {
      console.log({ end: this._eEnd });
      end = cc.v2(this._eEnd.x, this._eEnd.y);
    }
    let angle = MathEx.getAngleX(
      cc.v2(target.position.x, target.position.y),
      end
    );
    target.angle = angle;
  }
}

export class JXFollow extends cc.Action {
  protected _followNode: CCNodeImpl = null;
  protected _followSpeed: number = null;
  protected _offset: cc.Vec2 = null;
  constructor(followNode: CCNodeImpl, followSpeed: number, offset?: cc.Vec2) {
    super();
    this._followNode = followNode;
    this._followSpeed = followSpeed;
    this._offset = offset;
  }

  step(dt) {
    let target = this["target"] as CCNodeImpl;
    var targetWorldPos = target.convertToWorldSpaceAR(cc.Vec2.ZERO);
    var followedWorldPos = this._followNode
      .convertToWorldSpaceAR(cc.Vec2.ZERO)
      .add(this._offset ? this._offset : cc.Vec2.ZERO);
    let angle = MathEx.getAngleX(targetWorldPos, followedWorldPos);
    target.angle = angle;
    let len = this._followSpeed * dt;
    let distance = targetWorldPos.sub(followedWorldPos).mag();
    if (len > distance) len = distance;
    let offset = MathEx.getAnglePos(angle, len);
    target.position = target.position.add(offset);
  }

  isDone() {
    let target = this["target"] as CCNodeImpl;
    var targetWorldPos = target.convertToWorldSpaceAR(cc.Vec2.ZERO);
    var followedWorldPos = this._followNode
      .convertToWorldSpaceAR(cc.Vec2.ZERO)
      .add(this._offset ? this._offset : cc.Vec2.ZERO);
    let distance = targetWorldPos.sub(followedWorldPos).mag();
    // let isDone = distance < 5
    // if (isDone) {
    //     cc.log("==========> follow done!")
    // }
    return distance < 5;
  }
}

export class Shake extends cc.ActionInterval {
  //节点初始位置
  protected _nodeInitialPos = null;
  //X轴抖动幅度
  protected _shakeParams: number[] = [];
  protected _dir = 1;

  constructor(
    duration: number,
    shakeStrengthX: number,
    shakeStrengthY: number
  ) {
    super();
    this.initWithDuration(duration, shakeStrengthX, shakeStrengthY);
  }

  initShakeParams(shakeStrengthX: number, shakeStrengthY: number) {
    // if (shakeStrengthX > 0) {
    //     this._shakeParams[0] = 0;
    //     this._shakeParams[1] = shakeStrengthX;
    // }
    // else {
    //     this._shakeParams[0] = shakeStrengthX;
    //     this._shakeParams[1] = 0;
    // }
    // if (shakeStrengthY > 0) {
    //     this._shakeParams[2] = 0;
    //     this._shakeParams[3] = shakeStrengthY;
    // }
    // else {
    //     this._shakeParams[2] = shakeStrengthY;
    //     this._shakeParams[3] = 0;
    // }
    this._shakeParams[0] = shakeStrengthX;
    this._shakeParams[1] = shakeStrengthY;
  }

  //获取两个数间的随机值
  protected getRandomStrength(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  initWithDuration(
    duration: number,
    shakeStrengthX: number,
    shakeStrengthY: number
  ) {
    if (callSuper(cc.ActionInterval, "initWithDuration", this, duration)) {
      this.initShakeParams(shakeStrengthX, shakeStrengthY);
      return true;
    }
    return false;
  }
  startWithTarget(target) {
    callSuper(cc.ActionInterval, "startWithTarget", this, target);

    this._nodeInitialPos = target.position;
  }

  stop() {
    let target = this["target"] as CCNodeImpl;
    target.position = this._nodeInitialPos;
  }
}

export class JXActionMgr extends cc.ActionManager {
  constructor() {
    super();
  }

  protected _evt: GEventSystem = null;
  public bindEvtMgr(evt: GEventSystem) {
    this._evt = evt;
  }

  public addTweenAction(tween: cc.Tween) {
    if (!tween["_target"]) {
      cc.warn("Please set target to tween first");
      return this;
    }
    if (tween["_finalAction"]) {
      cc.director.getActionManager().removeAction(tween["_finalAction"]);
    }
    tween["_finalAction"] = tween["_union"]();
    this.addAction(tween["_finalAction"], tween["_target"], false);
  }

  public addAction(action: cc.Action, target: any, paused: boolean = false) {
    if (!target._id) {
      target._id = target.wrapId;
    }
    if (!target._id) {
      cc.error("can not find target property: _id!");
      return;
    }
    if (action.getTag() == QUEUE_ACTION_TAG) {
      target._hasQueueAction = true;
    }
    super.addAction(action, target, paused);
  }

  public removeAction(aciton: cc.Action, unCallBack: boolean = false) {
    if (!!aciton && this._evt) {
      this._evt.post(JXActionMsg.action.end, aciton);
    }
    if (!unCallBack && aciton.__endCallBack) {
      aciton.__endCallBack();
      aciton.__endCallBack = null;
    }
    if (aciton.getTag() == QUEUE_ACTION_TAG) {
      let target = aciton.getOriginalTarget();
      target["_hasQueueAction"] = false;
    }
    super.removeAction(aciton);
  }

  public getTargetAction(tag: number, target: CCNodeImpl) {
    if (tag === cc.Action.TAG_INVALID) return;
    var element = this["_hashTargets"][target["_id"]];
    if (element) {
      if (element.actions != null) {
        for (var i = 0; i < element.actions.length; ++i) {
          var action = element.actions[i];
          if (action && action.getTag() === tag) return action;
        }
      }
    }
    return null;
  }

  public hasQueueAction(target: any): boolean {
    return target._hasQueueAction;
  }

  public hasAction(): boolean {
    let elements = this["_arrayTargets"];
    if (elements.length == 0) return false;
    for (let i = 0; i < elements.length; i++) {
      let actions = elements[i].actions;
      if (actions && actions.length > 0) return false;
    }
    return true;
  }
}
