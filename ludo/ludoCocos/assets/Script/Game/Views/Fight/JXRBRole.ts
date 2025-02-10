import { IComLike, JXCLAction } from "../../../../../d.ts/game/JXCLBtl";
import { JXDef } from "../../../conventions/JXCommon";
import {
  FiniteStateMachine,
  FSMState,
} from "../../../Core/BaseFSM/FiniteStateMachine";
import { OBJECT_COPY } from "../../../Core/CoreDefine";
import {
  JXBezierTo,
  JXMoveTo,
  QUEUE_ACTION_TAG,
} from "../../../Core/FrameEx/ActionEx";
import { CCNodeImpl } from "../../../Core/FrameEx/CCNodeImpl";
import GParam from "../../../Core/GEvent/GParam";
import { AudioMgr } from "../../../Core/Manager/AudioMgr";
import MathEx from "../../../Core/Math/MathEx";
import { CMsg, INFO_TYPE, MapLayer } from "../../Common/Define";
import { Res } from "../../Common/UIResources";
import GameMgr from "../../Logic/GameMgr";
import JXRBCmdMgr from "./JXRBCmdMgr";
import JXRBPlayer, { MaxSixTime } from "./JXRBPlayer";
import {
  BirthAngle,
  JXEAniNames,
  JXEDir,
  JXEState,
  ROLE_COMP_NAME,
} from "./JXULDefine";

export class JXRoleSt extends FSMState<JXRBRole, JXEState> {
  protected get sk(): sp.Skeleton {
    return this.entity.skeleton;
  }
  constructor() {
    super();
  }
}

export class JXIDleSt extends JXRoleSt {
  public get stateID(): JXEState {
    return JXEState.Idle;
  }

  public enter() {
    // this.entity.unitNode.x = 0;
    this.entity.changeAnimation(JXEAniNames.idle, true);
  }
}

export class JXTakeoffSt extends JXRoleSt {
  public get stateID(): JXEState {
    return JXEState.TakeOff;
  }

  public enter() {}
}

export class JXFlySt extends JXRoleSt {
  public get stateID(): JXEState {
    return JXEState.Fly;
  }

  public enter() {
    // this.entity.unitNode.x = 0;
    this.entity.changeAnimation(JXEAniNames.fly, true);
  }
}

export class JXOverlaySt extends JXRoleSt {
  public get stateID(): JXEState {
    return JXEState.Overlay;
  }

  public enter() {
    // this.entity.unitNode.x = 0;
    this.entity.target.zIndex = 1001;
    this.entity.changeAnimation(JXEAniNames.diejia, false, () => {
      this.entity.changeAnimation(JXEAniNames.idle);
    });
  }

  public exit(): void {
    this.entity.target.zIndex = 0;
  }
}

export class JXHitSt extends JXRoleSt {
  public get stateID(): JXEState {
    return JXEState.Hit;
  }

  public enter() {
    this.entity.changeAnimation(JXEAniNames.zhuangfei, false);
  }
}

export class JXRunSt extends JXRoleSt {
  public get stateID(): JXEState {
    return JXEState.Run;
  }

  public enter() {
    this.entity.changeAnimation(JXEAniNames.run, true);
  }

  public execute(dt: number) {
    let entity = this.entity;
  }
}

export class JXDeathSt extends JXRoleSt {
  public get stateID(): JXEState {
    return JXEState.Death;
  }

  public enter() {
    this.entity.changeAnimation(JXEAniNames.die, false);
    this.entity.addAction(
      cc.sequence(
        cc.fadeOut(0.5),
        cc.callFunc(() => {
          this.onAnimationEnd();
        })
      )
    );
  }

  public onAnimationEnd() {
    this.entity.onEndDie();
  }
}

export class JXGSt extends JXRoleSt {
  public waitShowBuffs: string[] = [];
  protected duration: number = 0.2;
  protected _oldModel: string = null;
  protected _curModel: string = null;
  protected _waitChageModel = false;
  public get stateID(): JXEState {
    return JXEState.Global;
  }

  public enter() {
    this._curTime = 0;
  }

  public execute() {
    if (this._waitChageModel) {
      this.changeModel();
    }
  }

  public setModel(model: string) {
    if (this._curModel == model) return;
    if (this._curModel) {
      this._oldModel = this._curModel;
    }
    this._curModel = model;
    if (this._oldModel) {
      this._waitChageModel = true;
    }
  }

  public reOldModel() {
    if (!this._oldModel) return;
    this.setModel(this._oldModel);
  }

  public changeModel() {
    console.log("【JXRBRole】changeModel");
    this._waitChageModel = false;
    this.entity.skeleton.skeletonData =
      this.entity.cmd.assetManager.assetImpl.getPreLoadAsset<sp.SkeletonData>(
        this._curModel
      );
    this.entity.changeState(JXEState.Idle, true);
  }
}

export class JXRBRole extends CCNodeImpl implements IComLike {
  /** 位置信息 */
  public iKey: number;
  /** 角色ID */
  public id: string;
  /** 骨骼动画 */
  public skeleton: sp.Skeleton;
  public effectSkeleton: sp.Skeleton;
  public vSpeed: cc.Vec2 = cc.Vec2.ZERO;
  private _birthPos: cc.Vec2 = cc.Vec2.ZERO;
  public get birthPos() {
    return this._birthPos;
  }
  public airPos: cc.Vec2 = null;
  public _name: string;
  private roadPos: { x: number; y: number; index: number }[] = null;
  private startPos: { x: number; y: number } = null;
  public isBanMove: boolean = false;
  private _isBorn: boolean = false;
  public set isBorn(v: boolean) {
    this._isBorn = v;
  }
  /** 动作队列 */
  protected _actionList: cc.Action[];

  /** 状态机 */
  public fsm: FiniteStateMachine<JXRBRole, JXEState>;
  protected _idleSt: JXIDleSt;
  protected _runSt: JXRunSt;
  protected _deathSt: JXDeathSt;
  protected _globalSt: JXGSt;
  protected _takeoffSt: JXTakeoffSt;
  protected _flySt: JXFlySt;
  protected _overlaySt: JXOverlaySt;
  protected _hitSt: JXHitSt;
  public cmd: JXRBCmdMgr;
  protected _dir: JXEDir;
  protected player: JXRBPlayer;
  public get playerId() {
    return this.player.playerId;
  }
  protected _moveTime: number = 0.3;
  protected _flyTime: number = 1;
  protected knockPos: cc.Vec2 = null;
  private _touchCb = null;
  public setTouchCb(v) {
    this._touchCb = v;
  }
  constructor(object: cc.Node) {
    super(object);
    this._actionList = [];
    this.skeleton = object.getChildByName("skeleton").getComponent(sp.Skeleton);
    this.effectSkeleton = object
      .getChildByName("yanwu")
      .getComponent(sp.Skeleton);
    if (!this.skeleton) {
      // throw new Error('the JXClientRole instantiate failed! because of the role targetNode missing component: sp.Skeleton!');
      // 如果没有默认的骨骼组件，则表示这是一个环境对象
      return;
    }
    this.skeleton.setEventListener(
      (track: sp.spine.TrackEntry, event: sp.spine.Event) => {
        this.onSkEventListen(this.skeleton, track, event);
      }
    );
  }

  /**初始化状态机 */
  public initState() {
    this.fsm = new FiniteStateMachine<JXRBRole, JXEState>(this);
    this._runSt = new JXRunSt();
    this._idleSt = new JXIDleSt();
    this._deathSt = new JXDeathSt();
    this._takeoffSt = new JXTakeoffSt();
    this._flySt = new JXFlySt();
    this._overlaySt = new JXOverlaySt();
    this._hitSt = new JXHitSt();
    this.fsm.registerState(this._takeoffSt);
    this.fsm.registerState(this._hitSt);
    this.fsm.registerState(this._flySt);
    this.fsm.registerState(this._overlaySt);
    this.fsm.registerState(this._runSt);
    this.fsm.registerState(this._idleSt);
    this.fsm.registerState(this._deathSt);
    this._globalSt = new JXGSt();
    this.fsm.registerState(this._globalSt);
    this.fsm.setGlobalState(this._globalSt);
    this.initEvent();
  }

  public initEvent() {
    this.target.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
  }
  public _onTouchEnd() {
    if (this.effectSkeleton.node.active) {
      console.log("【JXRBRole】寻找位置", this.name, this._touchCb);
      AudioMgr.Ins().playEffect(Res.common.audio.feiji);
      let roles = this.cmd.getRoles((role) => {
        return role.dir == this._dir;
      });
      if (this._touchCb) {
        this.player.moveAction(
          this,
          () => {
            this._touchCb();
            roles.forEach((role: JXRBRole) => {
              role.setTouchCb(null);
            });
          },
          6
        );
      } else {
        this.player.moveAction(this, () => {
          this.player.doSkillActionTimer();
        });
      }
    }
  }

  /**显示可以移动的效果 */
  public showCanMoveAni(num: number, isBanTakeOff: boolean = false) {
    let isBanMove = this.isBanMove;
    if (this.getCurState() === JXEState.Death) return;
    if (num === 6) {
      if (!this._isBorn) {
        this.effectSkeleton.node.active = !isBanTakeOff;
      } else {
        this.effectSkeleton.node.active = !isBanMove;
      }
    } else {
      if (!this._isBorn) {
        this.effectSkeleton.node.active = false;
      } else {
        this.effectSkeleton.node.active = !isBanMove;
      }
    }
    this.effectSkeleton.setAnimation(0, "zise", true);
  }

  public hideCanMoveAni() {
    this.effectSkeleton.node.active = false;
  }
  /**绑定 */
  public bindPlayer(player: JXRBPlayer) {
    this.player = player;
  }

  /**设置阵营 */
  public setDir(dir: JXEDir) {
    this._dir = dir;
  }

  public get dir() {
    return this._dir;
  }

  /** 获取当前状态 */
  public getCurState() {
    return this.fsm.getCurState();
  }

  /**设置模型 */
  public setModel(model: string) {
    this._globalSt.setModel(model);
  }

  /**飞机设置出生点 */
  public setBirthPos(birthPos: cc.Vec2) {
    this.position = birthPos;
    this._birthPos = this.position;
  }
  public setAngle(angle: number) {
    this.target.angle = angle;
  }

  /**设置行进路径 */
  public setRoadPos(arr: { x: number; y: number; index: number }[]) {
    this.roadPos = OBJECT_COPY(arr);
  }

  /**设置起飞点*/
  public setStartPos(pos: { x: number; y: number }) {
    this.startPos = pos;
  }

  /**改变状态 */
  public changeState(state: JXEState, force: boolean = false) {
    console.log("【JXRBRole】changeState " + state);
    this.fsm.changeState(state, force);
  }

  /**确认是否起飞 */
  public get isBorn() {
    return this._isBorn;
  }

  /**获取当前位置索引*/
  public get roadIndex() {
    const arr = this.roadPos.map((v) => JSON.stringify({ x: v.x, y: v.y }));
    return arr.indexOf(
      JSON.stringify({
        x: Math.round(this.position.x),
        y: Math.round(this.position.y),
      })
    );
  }

  // 骨骼帧事件
  public onSkEventListen(
    skeleton: sp.Skeleton,
    track: sp.spine.TrackEntry,
    event: sp.spine.Event
  ) {
    let eventName = event.data.name;
    console.log({ eventName });
    switch (eventName) {
      case "home": {
        if (!this.knockPos) return;
        let info = skeleton.getAnimationInfo(JXEAniNames.zhuangfei);
        cc.tween(this.target)
          .to(info.duration, {
            position: cc.v3(this.knockPos.x, this.knockPos.y),
          })
          .call(() => {
            console.log("【JXRBRole】onSkEventListen home changeState");
            this.changeState(JXEState.Idle);
            this.target.getChildByName("upper").destroyAllChildren();
            this.target.zIndex = -1;
            this.isBanMove = false;
            if (
              this.knockPos.x === this._birthPos.x &&
              this.knockPos.y === this._birthPos.y
            ) {
              this._isBorn = false;
              const anglePos = BirthAngle[this._dir];
              cc.tween(this.target).to(0.5, { angle: anglePos }).start();
            } else {
              this.correctAngle(() => {
                this.planeMoveEnd();
              });
            }
            this.knockPos = null;
          })
          .start();
        break;
      }
    }
  }

  /**飞机起飞 */
  public planeTakeOff(cb: Function) {
    console.log("【JXRBRole】planeTakeOff JXEState.TakeOff");
    this.changeState(JXEState.TakeOff);
    let ani = JXEAniNames.qifei;
    let info = this.skeleton.getAnimationInfo(ani);
    let moveAction: any = new JXBezierTo(info.duration, [
      this.position,
      cc.v2(this.startPos.x, this.startPos.y),
      cc.v2(this.startPos.x, this.startPos.y),
    ]);
    this._isBorn = true;
    let endCb = cc.callFunc(
      function () {
        if (this._dir === JXEDir.Red || this._dir === JXEDir.Blue) {
          cc.tween(this.target).by(0.5, { angle: 90 }).start();
        }
        let role: JXRBRole[] = this.cmd.checkHavePlaneInHere(
          this.target.position,
          this.id
        );
        if (role.length) {
          console.log("【JXRBRole】planeTakeOff JXEState.Overlay");
          this.changeState(JXEState.Overlay);
        } else {
          console.log("【JXRBRole】planeTakeOff JXEState.Idle");
          this.changeState(JXEState.Idle);
        }
        cb();
      }.bind(this)
    );
    let seq = cc.sequence(moveAction, endCb);
    this.addAction(seq);
    // this.target.runAction(seq)
  }
  /**矫正飞机角度 */
  public correctAngle(cb?) {
    if (
      Math.round(this.position.x) === Math.round(this._birthPos.x) &&
      Math.round(this.position.y) === Math.round(this._birthPos.y)
    ) {
      this._isBorn = false;
      cc.tween(this.target)
        .to(0.5, { angle: 90 })
        .call(() => {
          cb && cb();
        })
        .start();
    } else {
      let curIndex = this.roadIndex;
      let nextIndex = curIndex + 1;
      let posId = this.roadPos[nextIndex];
      let position = cc.v2(posId.x, posId.y);
      let angle = MathEx.getAngleX(
        cc.v2(this.target.position.x, this.target.position.y),
        position
      );
      cc.tween(this.target)
        .to(0.5, { angle: angle })
        .call(() => {
          cb && cb();
        })
        .start();
    }
  }

  public changeAnimation(
    actionName: string,
    loop: boolean = false,
    completeCb?: any
  ): JXCLAction {
    if (!this.skeleton) return;
    let track = this.skeleton.setAnimation(0, actionName, loop);
    if (!completeCb) {
      this.skeleton.setCompleteListener(null);
    } else {
      this.skeleton.setCompleteListener(completeCb);
    }
    if (!track) {
      cc.log(`角色标签${this.id},名字${this.id}找不到动作:" + ${actionName}`);
    }
    return { track: track, duration: track.animation.duration };
  }

  public addActionToMgr(
    impl: CCNodeImpl,
    action: cc.Action,
    pause: boolean = false
  ): cc.Action {
    this.cmd.btlActionMgr.addAction(action, impl, pause);
    return action;
  }

  public addAction(action: cc.Action, isQueue = true) {
    if (action) {
      if (isQueue) {
        action.setTag(QUEUE_ACTION_TAG);
        this._actionList.push(action);
      } else {
        this.cmd.addAction(this, action);
      }
    }
  }

  /**获取结束的点 */
  public getPlaneMoveEndPosition(count: number, isDel: boolean = false) {
    let curIndex = this.roadIndex;
    let posId = null;
    for (let i = 0; i < count; i++) {
      let next = curIndex + 1;
      let last = curIndex - 1;

      if (next <= this.roadPos.length - 1 && !isDel) {
        posId = this.roadPos[next];
        curIndex++;
      } else {
        isDel = true;
        posId = this.roadPos[last];
        curIndex--;
        if (curIndex < 0) {
          posId = this.startPos;
          break;
        }
      }
    }
    return cc.v2(posId.x, posId.y);
  }

  /**飞机飞行 */
  public planeMove(count: number, cb?: Function) {
    let curIndex = this.roadIndex;
    let num = count;
    let action = [];
    let isDel: boolean = false;
    this.cmd.curVia = [];
    if (num) {
      for (let i = 0; i < num; i++) {
        let next = curIndex + 1;
        let last = curIndex - 1;
        let pos: cc.Vec2 = null;
        let posId = null;
        if (next <= this.roadPos.length - 1 && !isDel) {
          posId = this.roadPos[next];
          curIndex++;
        } else {
          isDel = true;
          posId = this.roadPos[last];
          curIndex--;
          if (curIndex < 0) {
            let flyAction: any = new JXMoveTo(
              this._flyTime,
              cc.v2(this.startPos)
            );
            let end = cc.callFunc(() => {
              cc.tween(this.target)
                .by(0.5, { angle: this.target.angle })
                .start();
            });
            let seq = cc.sequence(flyAction, end);
            action.push(seq);
            break;
          }
        }
        pos = cc.v2(posId);
        if (next <= this.roadPos.length - 7 && i != num - 1) {
          this.cmd.curVia.push(posId);
        }
        let moveAction: any = new JXMoveTo(this._moveTime, pos);
        action.push(moveAction);
        let target = pos;
        if (target && i == num - 1) {
          console.log("【JXRBRole】planeMove JXEState.Fly");
          this.changeState(JXEState.Fly);
          curIndex = this.roadPos
            .map((v) => JSON.stringify({ x: v.x, y: v.y }))
            .indexOf(
              JSON.stringify({
                x: Math.round(target.x),
                y: Math.round(target.y),
              })
            );
          const _end = this.roadPos[curIndex + 1];
          let flyAction: any = new JXMoveTo(this._flyTime, target, _end);
          if (curIndex === 5) {
            curIndex = 30;
            target = cc.v2(this.roadPos[curIndex]);
            flyAction = new JXMoveTo(this._flyTime, target);
            this.player.sixTime = MaxSixTime;
          }
          action.push(flyAction);
        }
      }
    }
    let self = this;
    let endCb = cc.callFunc(
      function () {
        if (cb) cb();
        self.planeMoveEnd();
      }.bind(this)
    );
    action.push(endCb);
    let seq = cc.sequence(action);
    console.log("【JXRBRole】planeMove JXEState.Run");
    this.changeState(JXEState.Run);
    this.addAction(seq);
  }

  /**飞机移动结束 */
  protected planeMoveEnd() {
    let curIndex = this.roadIndex;
    if (curIndex === this.roadPos.length - 1) {
      let local = `【${ROLE_COMP_NAME[this._dir]}】${this.id}到达终点`;
      console.log(local);
      console.log("【JXRBRole】planeMoveEnd JXEState.Death");
      this.changeState(JXEState.Death);
      if (this.cmd.setDeathRoles(this._dir, this.id)) {
        this.cmd.running = false;
        this.cmd.evtMgr.post(CMsg.client.fight.endFight, new GParam(this._dir));
      }
    } else {
      //判断是否有飞机在这个位置上
      let roles: JXRBRole[] = this.cmd.checkHavePlaneInHere(
        new cc.Vec2(this.target.position.x, this.target.position.y),
        this.id
      );
      if (roles.length) {
        roles.forEach((role) => {
          if (role._dir === this._dir) {
            console.log(
              "【JXRBRole】planeMoveEnd " + roles.length + " JXEState.Overlay"
            );
            this.changeState(JXEState.Overlay);
          } else {
            //击飞逻辑处理
            let local = `【${ROLE_COMP_NAME[this._dir]}】${this.id}将${
              role.id
            }撞飞`;
            console.log(local);
            console.log(
              "【JXRBRole】planeMoveEnd " + roles.length + " JXEState.Idle"
            );
            role.planeKnockOff();
            this.changeState(JXEState.Idle);
          }
        });
      } else {
        console.log(
          "【JXRBRole】planeMoveEnd " + roles.length + " JXEState.Idle"
        );
        this.changeState(JXEState.Idle);
      }
    }
  }

  /**飞机撞飞 */
  public planeKnockOff(target?: cc.Vec2) {
    AudioMgr.Ins().playEffect(Res.common.audio.zhuangfei);
    AudioMgr.Ins().playEffect(Res.common.audio.houtui);
    if (target) {
      this.knockPos = target;
    } else {
      this.knockPos = this._birthPos;
    }
    console.log("【JXRBRole】planeKnockOff JXEState.Hit");
    this.changeState(JXEState.Hit);
  }
  public onEndDie() {
    this.active = false;
    this.cmd.removeRole(this.id);
    this.player.removeRole(this.id);
    this.target.destroy();
  }

  update(dt) {
    if (this.fsm) {
      this.fsm.FSMUpdate(dt);
    }
    if (
      !this.cmd.btlActionMgr.hasQueueAction(this) &&
      this._actionList.length > 0
    ) {
      this.addActionToMgr(this, this._actionList.shift());
    }
  }

  onDestroy() {}
}
