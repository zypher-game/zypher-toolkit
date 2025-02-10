import { MAX_TAG, PRIORITY_VIEW } from "../../Core/CoreDefine";
import ColorLog from "../../Core/FrameEx/ColorLog";
import { ObjectWrap } from "../../Core/FrameEx/ES5Ex";
import { GCtrl } from "../../Core/GCtrl";
import { GLoader } from "../../Core/GLoader/GLoader";
import { ToastType } from "../Common/Define";
import { L } from "../Common/Language";
import { VIEW_ID } from "../Common/UI";
import { Res } from "../Common/UIResources";
import ToastCtrl from "../Views/Tip/ToastCtrl";
import GameMgr from "./GameMgr";

const TOAST_ACTION_TAG = 1000;

export class Toast extends ObjectWrap {
  protected _targetNode: cc.Node;
  protected _toastQueue: { [type: number]: string[] } = {};
  protected _msgCount = 0;

  protected getQueue(type?: number) {
    if (type) {
      let queues = this._toastQueue[type];
      if (!queues) return null;
      return { type: type, queues };
    }
    for (let i = 0; i < ToastType.End; i++) {
      let queues = this._toastQueue[i];
      if (queues && queues.length > 0) {
        return { type: i, queues };
      }
    }
    return null;
  }

  protected pushMsg(type: ToastType, msg: string) {
    let queue = this._toastQueue[type];
    if (!queue) {
      queue = this._toastQueue[type] = [];
    }
    queue.push(msg);
    this._msgCount++;
  }

  protected static _pools: { [type: number]: cc.NodePool } = {};
  protected static getPool(type: ToastType) {
    let pool = this._pools[type];
    if (!pool) {
      pool = this._pools[type] = new cc.NodePool();
    }
    return pool;
  }

  protected static getToastCtrl(type: ToastType): ToastCtrl {
    let ret: ToastCtrl = null;
    let pool = this.getPool(type);
    if (pool.size() == 0) {
      const prefabs = [null, Res.common.toast, null];
      GLoader.addGChild(prefabs[type], (toast: ToastCtrl) => {
        ret = toast;
        ret.setRcb((node: cc.Node) => {
          if (pool) {
            pool.put(node);
          } else {
            node.destroy();
          }
        });
      });
      return ret;
    } else {
      let node = pool.get();
      return node.getComponent(ToastCtrl);
    }
  }

  constructor(targetNode: cc.Node) {
    super();
    this._targetNode = targetNode;
    cc.game.on(cc.game.EVENT_SHOW, this.onGameShow.bind(this), targetNode);
    GCtrl.ES.on(
      GCtrl.GClientWinDestroyEventMsg,
      this,
      this.TopWinChange.bind(this),
      PRIORITY_VIEW
    );
  }

  /** 普通提示 */
  public show(msg: string, ...args) {
    this.showByType(ToastType.WarnTip, msg, ...args);
  }

  /** 带类型的提示 */
  public showByType(type, msg: string, ...args) {
    let str = L(msg, ...args);
    this.pushMsg(type, str);
    let action = this._targetNode.getActionByTag(TOAST_ACTION_TAG);
    if (!action) {
      this.startShow();
    }
  }

  /** 开始轮播 */
  protected startShow() {
    let action = this._targetNode.getActionByTag(TOAST_ACTION_TAG);
    if (action) this._targetNode.stopActionByTag(TOAST_ACTION_TAG);
    let type: number;
    action = cc.sequence(
      cc.callFunc(() => {
        let queue = this.getQueue();
        if (!queue) {
          if (cc.isValid(this._targetNode)) {
            this._targetNode.stopActionByTag(TOAST_ACTION_TAG);
          }
          return;
        }

        let toast = Toast.getToastCtrl(queue.type);
        type = queue.type;
        if (!toast) return;
        toast.node.zIndex = MAX_TAG;
        toast.node.parent = this._targetNode;
        let time = Math.min(1.5, 0.1 * this._msgCount);
        toast.setDuration(2 - time);
        toast.setText(queue.queues[0]);
        if (queue.type == ToastType.WarnTip) {
          // AudioMgr.Ins().playEffect(Res.audio.warnTip);
        }
      }),
      cc.delayTime(0.4 - Math.min(0.3, this._msgCount * 0.02)),
      cc.callFunc(() => {
        let queue = this.getQueue(type);
        if (queue) {
          queue.queues.shift();
          this._msgCount--;
        }
        this.startShow();
      })
    );
    action.setTag(TOAST_ACTION_TAG);
    this._targetNode.runAction(action);
  }

  /** 游戏切入后台 */
  public onGameShow() {
    this._toastQueue = {};
    this._msgCount = 0;
  }

  /** 监听顶层窗口信息 */
  protected TopWinChange() {
    ColorLog.esOn("GCtrl.GClientWinDestroyEventMsg");
    let topWin = GameMgr.uiMgr.getActiveTopWin();
    if (!topWin || topWin.winId != VIEW_ID.home) {
      console.error("TopWinChange error");
      return;
    }
  }
}
