import { MapWrap, ObjectWrap } from "../../../Core/FrameEx/ES5Ex";
import { GCtrl } from "../../../Core/GCtrl";
import ShaderUtil from "../../../Shaders/Manager/ShaderUtil";
import { VIEW_IDByPageNum } from "../../Common/UI";
import {
  ConditionEmitter,
  ConditionListter,
} from "../../Logic/ConditionListener";
import GameMgr from "../../Logic/GameMgr";

class SystemUnlockListener extends ConditionListter {
  /** 功能ID */
  public viewId: number = null;
  constructor(viewId: number) {
    super();
    this.viewId = viewId;
  }

  /** 环境变更回调 */
  protected emitConditionEnvChange(emitter: ConditionEmitter) {}
  /** 未解锁提示 */
  public toast() {}

  /** 指引达成条件 */
  public guide() {
    for (let i = 0; i < this._emitters.length; i++) {
      let emiiter = this._emitters[i];
      if (emiiter.curState) continue;
      if (i == 0) continue;
      if (!emiiter.guide()) continue;
      break;
    }
  }
}

export default class JumpToMgr extends ObjectWrap {
  protected static _ins: JumpToMgr;
  public static get ins(): JumpToMgr {
    if (!this._ins) {
      this._ins = new JumpToMgr();
    }
    return this._ins;
  }

  /** 解锁条件 */
  protected _unlockChecks: MapWrap<number, SystemUnlockListener> = new MapWrap<
    number,
    SystemUnlockListener
  >();
  /** 关联的viewId */
  protected _unlockKeyRefs: MapWrap<number, number[]> = new MapWrap<
    number,
    number[]
  >();
  public rechageViews = [];

  constructor() {
    super();
  }

  /** 游戏逻辑开始回调 */
  public initGame() {
    this.initSystemUnlock();
  }

  /** 玩家登出 */
  public loginOut() {
    this.unSystemUnlock();
  }

  /** 初始化功能解锁部分 */
  protected initSystemUnlock() {
    this._unlockChecks.clear();
    this._unlockKeyRefs.clear();
  }

  /** 销毁条件事件 */
  protected unSystemUnlock() {
    this._unlockChecks.forEach((e) => {
      e.destroy();
    });
    this._unlockChecks.clear();
    this._unlockKeyRefs.clear();
  }

  public jumpGoTo(id: number, ...args): void {
    if (!this.isSystemOpen(id, true)) return;
    // 特殊界面处理

    let newArgs = [];
    let page = VIEW_IDByPageNum[id] ? VIEW_IDByPageNum[id] : null;
    if (page && page.page) {
      id = page.view;
      newArgs.push(...page.page);
    }
    let otherParam = this.getParam(id);
    if (otherParam || otherParam == 0) {
      newArgs.push(otherParam);
    }
    // 其他参数放前面，最后才是自定义的参数
    newArgs.push(...args);
    GameMgr.uiMgr.showWin(id, ...newArgs);
    // 发送窗口开启事件
    GCtrl.ES.emit(GCtrl.GClientWinOpenEventMsg, id);
  }

  public getSystemOpenListener(viewId: number): SystemUnlockListener {
    return this._unlockChecks.get(viewId);
  }

  public isSystemOpen(id: number, outCheck = false): boolean {
    let unlockCheck = this._unlockChecks.get(id);
    if (!unlockCheck) {
      let refs = this._unlockKeyRefs.get(id);
      if (refs && refs.length > 0)
        for (let i = 0; i < refs.length; i++) {
          let state = this.isSystemOpen(refs[i], outCheck);
          if (!state) return false;
        }
      return true;
    }
    if (!unlockCheck.cureState && outCheck) {
      unlockCheck.toast();
      return false;
    }
    return unlockCheck.cureState;
  }

  public setBtnStatus(spriteNode: cc.Node, viewId: number) {
    let isCanSwitch = GameMgr.jumpToMgr.isSystemOpen(viewId, false);
    if (!isCanSwitch) {
      ShaderUtil.gray(spriteNode);
    } else {
      ShaderUtil.normal(spriteNode);
    }
    return isCanSwitch;
  }

  private getParam(id: number): any {
    switch (id) {
      default:
        return null;
    }
  }
}
