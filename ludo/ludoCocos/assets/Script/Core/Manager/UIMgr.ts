import { PreLoadAsset } from "../../../../d.ts/game/JXCLBtl";
import { Res } from "../../Game/Common/UIResources";
import {
  INVALID_VALUE,
  MAX_TAG,
  WinAddMode,
  WinCloseMode,
  WinCreateEnv,
  WinLayer,
  WinMaskStatus,
  WinType,
} from "../CoreDefine";
import { MapWrap, ObjectWrap } from "../FrameEx/ES5Ex";
import GComponent from "../FrameEx/GComponent";
import { GLoader } from "../GLoader/GLoader";
import GViewBase from "../GView/GViewBase";
import GViewDestory from "../GView/GViewDestory";
import { GCtrl } from "./../GCtrl";
import { AudioMgr } from "./AudioMgr";

const ODER_OFFSET = 1000;
const SORT_OFFSET = 50;
const WIN_OPEN_AUDIO = "winOpen";
const WIN_CLOSE_AUDIO = "winClose";

export class WinModel {
  winType: WinType;
  winMask: number;
  winAddMode: WinAddMode;
  winCloseMode: number;
  winLayer: WinLayer;

  constructor(
    type: WinType,
    mask: number,
    add: WinAddMode,
    closeModel: number,
    layer: WinLayer
  ) {
    this.winType = type;
    this.winMask = mask;
    this.winAddMode = add;
    this.winCloseMode = closeModel;
    this.winLayer = layer;
  }
}

export class WinInfo {
  path: string;
  winModel: WinModel;
  constructor(path: string, winModel: WinModel) {
    this.path = path;
    this.winModel = winModel;
  }
}

export class WinInfos {
  public winIds: number[];
  public winInfos: MapWrap<number, WinInfo>;
  constructor(winIds: number[], opts: MapWrap<number, WinInfo>) {
    this.winIds = winIds;
    this.winInfos = opts;
  }
}

// 窗口实例
export class Win extends ObjectWrap {
  /** 窗口遮罩 */
  public maskNode: cc.Node;
  /** 绑定的窗口逻辑 */
  public viewBinder: GViewBase;
  /** 窗口的基础信息 */
  public winInfo: WinInfo;
  /** 窗口ID */
  public winId: number;
  /** 逻辑透参 */
  protected _logicArgs?: any[];
  public set logicArgs(val: any) {
    if (!this._logicArgs && !!val) {
      this._runGStart = true;
    } else if (this._logicArgs && val) {
      if (this._logicArgs.length != val.length) {
        this._runGStart = true;
      } else {
        for (let i = 0; i < val.length; i++) {
          if (this._logicArgs[i] != val[i]) {
            this._runGStart = true;
            break;
          }
        }
      }
    }
    this._logicArgs = val;
  }
  public get logicArgs() {
    return this._logicArgs;
  }
  /** 是否需要重新跑一次初始化逻辑 */
  protected _runGStart: boolean = true;
  /** 实际的zIndex */
  public sortOrder: number;
  /** 是否已经确认析构 */
  public isDestroy: boolean = false;
  /** create status */
  public createStats: WinCreateEnv;
  /** 预制件加载完成回调 */
  public onBinder(view?: GViewBase) {
    if (!!this.viewBinder && this.viewBinder != view) {
      throw new Error("this win has viewBinder!");
    }
    this.viewBinder = view;
    this.viewBinder.win = this;
    if (this.isDestroy) {
      this.onClose(true);
      return;
    }
    this.isDestroy = false;
    let node = this.viewBinder.node;
    if (node.zIndex != this.sortOrder) node.zIndex = this.sortOrder;
    if (this.winInfo.winModel.winType == WinType.Window) {
      let animation = node.getComponent(cc.Animation);
      if (!animation) {
        node.scale = 0.6;
        node.opacity = 0;
        cc.tween(node)
          .to(0.2, { scale: 1, opacity: 255 })
          .call(() => {
            this.viewBinder.onAnimationLoaded();
          })
          .start();
      } else {
        let chilps = animation.getClips();
        animation.play(chilps[0].name);
        animation.once(cc.Animation.EventType.FINISHED, () => {
          this.viewBinder.onAnimationLoaded();
        });
      }
    }

    let isReGStart = this._runGStart || this.viewBinder.checkReGStart();
    if (isReGStart) {
      this._runGStart = false;

      this.viewBinder.__onGStart(...this._logicArgs);
      // 找出本节点下的子组件，执行他的onGStart();
      let comps = this.viewBinder.getComponents(GComponent);
      if (comps.length > 1) {
        for (let i = 0; i < comps.length; i++) {
          if (comps[i] == this.viewBinder) continue;
          comps[i].__onGStart(...this._logicArgs);
        }
      }
    }

    this.viewBinder.onGActive();
    UIMgr.removeMutexWin(this);
    // 界面音效
    this.playWinAudioEffect(true);
  }

  public get isLoad(): boolean {
    return !!this.viewBinder;
  }

  public addMaskEvent(cb: Function) {
    if (!this.maskNode || !cb) return;
    this.maskNode.on("click", cb);
    this.maskNode.getComponent(cc.Button).clickAudio = null;
  }

  public onClose(force: boolean = false) {
    if (this.isDestroy && !force) return;
    this.isDestroy = true;
    UIMgr.onWinClose(this, force);

    // 界面关闭音效
    this.playWinAudioEffect(false);
  }

  /** 播放音效，开启或者关闭 */
  public playWinAudioEffect(isOpen: ConstrainBoolean) {
    let audio: string = null;
    audio = isOpen
      ? UIMgr.winAudios[WIN_OPEN_AUDIO + "_" + this.winId]
      : UIMgr.winAudios[WIN_CLOSE_AUDIO + "_" + this.winId];
    if (!audio) {
      let isAuto =
        this.winInfo.winModel.winLayer != WinLayer.FirstWindow &&
        this.winInfo.winModel.winLayer < WinLayer.RollWindow &&
        this.winInfo.winModel.winType != WinType.FullView;
      if (isAuto) {
        audio = isOpen
          ? UIMgr.winAudios[WIN_OPEN_AUDIO]
          : UIMgr.winAudios[WIN_CLOSE_AUDIO];
      }
    }

    if (audio) {
      AudioMgr.Ins().playEffect(audio);
    }
  }

  public onDestroy() {
    UIMgr.onWinDestroy(this);
  }
}

export const BASE_VIEW_ID_EX = {
  /** 跑马灯 */
  roll: 7001000,
  /** 常驻更新公告，警告层 */
  updateRemindCtrl: 8001000,

  /** toast */
  TOAST: 9000100,
  /** wiat */
  WAIT: 9000200,
  /** confirm */
  CONFIRM: 9000300,
  /** 热更新UI */
  hotUpdate: 9000500,
};

export class UIMgr {
  /** 窗口层级 */
  protected static _layerSortDic: MapWrap<number, Array<number>>;
  /** 窗口活动栈 */
  protected static _stack: Win[] = [];
  public static get stack() {
    return this._stack;
  }
  /** 窗口待推出栈 */
  protected static _heap: Win[] = [];

  /** 回收备用的窗口节点 */
  protected static _recycles: MapWrap<number, Win[]> = new MapWrap<
    number,
    Win[]
  >();
  /** 遮罩缓存池 */
  protected static _maskPool: cc.NodePool = new cc.NodePool();

  /** 窗口静态配置数据 */
  protected static _infos: WinInfos;
  /** 窗口静态预加载资源 */
  protected static _preLoadAssets: { [id: number]: PreLoadAsset[] };
  /** 初始化toast管理器 */
  protected static _toast: { show: Function };
  /** 初始化toast回调 */
  protected static _creatorToastCb: any;

  /** 初始化窗口配置 */
  public static initWinInfos(
    infos: WinInfos,
    preLoadAsset: { [id: number]: PreLoadAsset[] },
    creatorToastCb
  ) {
    this._infos = infos;
    this._preLoadAssets = preLoadAsset;
    this._creatorToastCb = creatorToastCb;
  }

  /** 不存在mask事件的时候的回调 */
  public static invalidAudio: string;
  /** 窗口开启和关闭音效 */
  public static winAudios: { [id: string]: string } = {};

  /** 获取UIRoot */
  public static get uiRoot(): cc.Node {
    let uiRoot = cc.director.getScene().getChildByList("Canvas/uiRoot");
    if (!uiRoot) {
      let canvas = cc.director.getScene().getChildByName("Canvas");
      if (!canvas) return;
      uiRoot = new cc.Node();
      uiRoot.addComponent(GViewDestory);
      uiRoot.width = canvas.width;
      uiRoot.height = canvas.height;
      canvas.addChild(uiRoot);
      uiRoot.name = "uiRoot";
      uiRoot.position = cc.Vec3.ZERO;
      uiRoot.zIndex = 5000;
      this.initLayerSort();
      if (this._creatorToastCb) {
        this._toast = this._creatorToastCb(uiRoot);
        this.showToast("");
      }

      // 创建实际舞台区域之外的遮罩
      let actualSzie = GCtrl.actualSize;
      let winSize = cc.winSize;
      let leftNode = new cc.Node("_GLOBAL_LEFT_");
      let leftSprite = leftNode.addComponent(cc.Sprite);
      leftSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
      leftNode.anchorX = 0;
      leftNode.x = -winSize.width / 2;
      GLoader.spriteFrame(leftSprite, Res.single);
      leftNode.color = cc.Color.BLACK;
      leftNode.parent = canvas;
      leftNode.zIndex = MAX_TAG;
      let rightNode = new cc.Node("_GLOBAL_RIGHT_");
      let rightSprite = rightNode.addComponent(cc.Sprite);
      rightSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
      rightNode.anchorX = 0;
      rightNode.x = actualSzie.width / 2;
      GLoader.spriteFrame(rightSprite, Res.single);
      rightNode.color = cc.Color.BLACK;
      rightNode.parent = canvas;
      rightNode.zIndex = MAX_TAG;
      // leftNode.opacity = rightNode.opacity = 128;
      let setMaskSize = () => {
        winSize = cc.winSize;
        leftNode.width = rightNode.width =
          winSize.width / 2 - actualSzie.width / 2;
        leftNode.height = rightNode.height = rightNode.height = winSize.height;
        leftNode.x = -winSize.width / 2 - leftNode.width;
        rightNode.x = actualSzie.width / 2 + leftNode.width;
      };
      setMaskSize();
      canvas.on(cc.Node.EventType.SIZE_CHANGED, setMaskSize, leftNode);
    }
    return uiRoot;
  }

  /** 获取WinLayer初始ZIndex */
  public static layerOrder(layer: number) {
    return -ODER_OFFSET + (layer + 1) * ODER_OFFSET + SORT_OFFSET;
  }

  /** 初始化层级队列 */
  protected static initLayerSort() {
    this._layerSortDic = new MapWrap<number, Array<number>>();
    for (let layerName in WinLayer) {
      let layer = parseInt(WinLayer[layerName]);
      this._layerSortDic.set(layer, [this.layerOrder(layer)]);
    }
  }

  /** 获取层级的下一个ZIndex-orderSort */
  protected static genSortOrder(layer: number, isMask?: boolean): number {
    let orders = this._layerSortDic.get(layer);
    if (!orders) {
      cc.error("the layer init failed: " + layer);
      return this.layerOrder(layer);
    }

    let lastOrder = orders[orders.length - 1];
    if (isMask) {
      lastOrder += SORT_OFFSET - 1;
      return lastOrder;
    } else {
      lastOrder += SORT_OFFSET;
      orders.push(lastOrder);
      return lastOrder;
    }
  }

  /** 拿当前顶层 */
  public static getCurTopOrder(layer: number): number {
    let orders = this._layerSortDic.get(layer);
    if (!orders) {
      cc.error("the layer init failed: " + layer);
      return this.layerOrder(layer);
    }
    let lastOrder = orders[orders.length - 1];
    return lastOrder;
  }

  /** 移除某个层级节点 */
  protected static removeSortOrder(layer: number, sort: number) {
    let orders = this._layerSortDic.get(layer);
    if (!orders) {
      cc.error("the layer init failed: " + layer);
      return;
    }
    let index = orders.indexOf(sort);
    if (index != INVALID_VALUE) {
      orders.splice(index, 1);
    }
  }

  /** 创建遮罩 */
  public static createMask(): cc.Node {
    this._maskPool = this._maskPool || new cc.NodePool();
    let maskNode: cc.Node, maskBtn: cc.Button;
    if (this._maskPool.size() == 0) {
      maskNode = new cc.Node();
      let sprite = maskNode.addComponent(cc.Sprite);
      GLoader.spriteFrame(sprite, Res.single, () => {
        maskNode.setContentSize(cc.size(3000, 3000));
      });
      maskBtn = maskNode.addComponent(cc.Button);
      maskNode.color = cc.Color.BLACK;
    } else {
      maskNode = this._maskPool.get();
      maskNode.opacity = 0;
      maskNode.off("click");
      maskBtn = maskNode.getComponent(cc.Button);
      if (maskBtn) {
        maskBtn.clickEvents = [];
      }
    }
    maskNode.setContentSize(cc.size(3000, 3000));

    if (this.invalidAudio) {
      maskBtn.clickAudio = this.invalidAudio;
    }
    return maskNode;
  }

  /** 获取窗口再活动栈的索引 */
  protected static indexOfStack(win: Win): number {
    for (let i = 0; i < this._stack.length; i++) {
      if (this._stack[i] == win) {
        return i;
      }
    }
    return INVALID_VALUE;
  }

  /** 从活动栈到隐藏堆 */
  protected static stackToHeap(win: Win, nstackIndex?: number) {
    this.removeStackWin(win, nstackIndex);
    this._heap.push(win);
  }

  /** 从活动栈中移除, 对象没有真正移除的情况下
   *  仅供内部调用。逻辑层不允许调用
   */
  public static removeStackWin(win: Win, index?: number) {
    if (!index) {
      index = this.indexOfStack(win);
    }
    if (index != INVALID_VALUE) {
      this._stack.splice(index, 1);
    }

    if (win.maskNode) {
      this._maskPool.put(win.maskNode);
      win.maskNode = null;
    }
    if (win.viewBinder && win.viewBinder.node && win.viewBinder.node.parent) {
      win.viewBinder.node.removeFromParent(false);
    }
    if (win.sortOrder != INVALID_VALUE) {
      this.removeSortOrder(win.winInfo.winModel.winLayer, win.sortOrder);
      win.sortOrder = INVALID_VALUE;
    }
  }

  public static pushStackWin(win: Win) {
    let index = this.indexOfStack(win);
    if (index != INVALID_VALUE) {
      // this.removeSortOrder(win.winInfo.winModel.winLayer, win.sortOrder);
      this.removeStackWin(win);
    }

    let viewName = this.getWinName(win.winInfo.path);
    let maskNode: cc.Node;
    let maskStatus = win.winInfo.winModel.winMask;
    if (!(maskStatus & WinMaskStatus.kNone)) {
      if (!win.maskNode) {
        maskNode = this.createMask();
        maskNode.name = viewName + "_mask";
        maskNode.parent = this.uiRoot;
      } else {
        maskNode = win.maskNode;
        maskNode.active = true;
        if (!maskNode.parent) maskNode.parent = this.uiRoot;
      }
    }
    maskNode.setContentSize(cc.winSize);
    win.maskNode = maskNode;
    win.sortOrder = this.genSortOrder(win.winInfo.winModel.winLayer);
    if (win.maskNode) {
      win.maskNode.zIndex = win.sortOrder - 1;
      if (maskStatus & WinMaskStatus.kOpacity156) {
        win.maskNode.opacity = 156;
      } else if (maskStatus & WinMaskStatus.kOpacity255) {
        win.maskNode.opacity = 255;
      } else {
        win.maskNode.opacity = 0;
      }
      if (maskStatus & WinMaskStatus.kTouchClose) {
        win.addMaskEvent(() => win.onClose());
      }
    }

    this._stack.push(win);
    if (win.viewBinder) {
      let node = win.viewBinder.node;
      if (!node.parent) {
        node.parent = this.uiRoot;
      }
      if (!node.active) {
        node.active = true;
      }
      win.isDestroy = false;
      win.onBinder(win.viewBinder);
      return;
    }
  }

  public static getWinName(path: string | cc.Prefab): string {
    let name = "";
    if (typeof path == "string") {
      let splits = path.split("/");
      name = splits[splits.length - 1];
    } else {
      name = path.name;
    }
    return name;
  }

  public static getFristWinById(id: number): Win {
    let wins = this._stack;
    for (let i = 0; i < wins.length; i++) {
      if (wins[i].winId == id) {
        return wins[i];
      }
    }
  }

  /**
   * 尝试获取当前节点所在的窗口
   * 注意该方法的使用需要在onGStart之后，可能undefined。
   * @param node 需要获取所在界面的节点
   */
  public static tryGetWinByNode(node: cc.Node): Win {
    let parent = node;
    while (parent) {
      if (parent == this.uiRoot) return;
      if (parent == cc.director.getScene()) return;
      let viewBse = parent.getComponent(GViewBase);
      if (!viewBse) {
        parent = parent.parent;
        continue;
      }
      return viewBse.win;
    }
  }

  public static tryPopHeapWin(winId: number): Win {
    let wins = this._heap;
    for (let i = 0; i < wins.length; i++) {
      if (wins[i].winId == winId) {
        let win = wins[i];
        wins.splice(i, 1);
        return win;
      }
    }
  }

  public static tryGetRecycles(winId: number): Win {
    let wins = this._recycles.get(winId);
    if (wins && wins.length > 0) {
      return wins.pop();
    }
    return null;
  }

  public static getWinInfo(winId: number): WinInfo {
    return this._infos.winInfos.get(winId);
  }

  /** 显示模态窗口 */
  public static showWin(winId: number, ...args) {
    let winInfo = this._infos.winInfos.get(winId);
    console.log({ winInfo });
    if (!winInfo) {
      cc.error("this winId of: " + winId + " not init config (UI.ts)");
      return;
    }
    let model = winInfo.winModel;

    let win: Win = null;
    if (model.winAddMode != WinAddMode.Stack) {
      // 1.活动栈中查找
      win = this.getFristWinById(winId);
      if (win) {
        win.createStats = WinCreateEnv.lStack;
        win.logicArgs = args;
        if (win.isLoad) {
          this.pushStackWin(win);
        }
        return;
      }
    }

    // 2.从不活动栈中查找
    win = this.tryPopHeapWin(winId);
    if (win) {
      win.createStats = WinCreateEnv.Heap;
    } else {
      // 3.从回收容器中查找
      win = this.tryGetRecycles(winId);
      if (win) win.createStats = WinCreateEnv.Recycle;
    }

    if (!win) {
      win = new Win();
      win.winInfo = winInfo;
      win.winId = winId;
      win.createStats = WinCreateEnv.New;
    }

    if (!win) return;
    win.logicArgs = args;
    this.pushStackWin(win);
    if (win.viewBinder) {
      return;
    }

    let __bindViewBase = () => {
      let path = win.winInfo.path;
      GLoader.prefab(path, (prefab: cc.Prefab) => {
        let node = cc.instantiate(prefab);
        if (!node) return;
        node.zIndex = win.sortOrder;
        node.parent = this.uiRoot;
        let view = node.getComponent(GViewBase);
        if (!view) return;
        if (win.winInfo.winModel.winType == WinType.FullView) {
          node.setContentSize(cc.winSize);
        }

        if (
          !(win.winInfo.winModel.winMask & WinMaskStatus.kUnBlockInput) &&
          view.bgImage &&
          !view.bgImage.getComponent(cc.BlockInputEvents)
        ) {
          view.bgImage.addComponent(cc.BlockInputEvents);
          view.bgImage.addComponent(cc.Button).clickAudio = UIMgr.invalidAudio;
        }

        win.onBinder(view);
      });
    };

    let preLoadAsset = this._preLoadAssets[win.winId];
    if (!!preLoadAsset && preLoadAsset.length > 0) {
      GCtrl.preLoadRawAssets(
        (curIndex: number, total: number, asset: cc.Asset) => {
          asset && cc.log(`preload assets: ${curIndex}/${total}: ${asset.url}`);
        },
        () => {
          this.closeWait();
          __bindViewBase();
        },
        ...preLoadAsset
      );
    } else {
      __bindViewBase();
    }
  }

  public static removeMutexWin(win: Win) {
    let wins = this._stack;
    let winLayer = win.winInfo.winModel.winLayer;
    let maxIndex = this.indexOfStack(win);
    maxIndex = maxIndex == INVALID_VALUE ? this._stack.length - 1 : maxIndex;
    for (let i = maxIndex; i >= 0; i--) {
      let tarWin = wins[i];
      if (tarWin == win) continue;
      let tarLayer = tarWin.winInfo.winModel.winLayer;
      if (tarLayer >= WinLayer.UnCheckMutex) continue;
      switch (win.winInfo.winModel.winAddMode) {
        case WinAddMode.ReplaceLayer: {
          if (winLayer <= tarLayer) {
            tarWin.onClose(true);
          }
          break;
        }
        case WinAddMode.ReplaceSelf: {
          if (winLayer < tarLayer) {
            tarWin.onClose(true);
          }
          break;
        }
        case WinAddMode.PushLower: {
          if (win.sortOrder > tarWin.sortOrder) {
            this.stackToHeap(tarWin);
          } else if (win.sortOrder < tarWin.sortOrder) {
            tarWin.onClose(true);
          }
          break;
        }
        case WinAddMode.Stack: {
          if (win.sortOrder < tarWin.sortOrder) {
            tarWin.onClose(true);
          }
          break;
        }
        case WinAddMode.PushHeigh: {
          if (winLayer < tarLayer) {
            this.stackToHeap(tarWin);
          }
          break;
        }
        default:
          break;
      }
    }
  }

  /** 窗口关闭事件 */
  public static onWinClose(win: Win, force: boolean = false) {
    let __closeLogic = () => {
      let winClose = win.winInfo.winModel.winCloseMode;
      if (winClose & WinCloseMode.OnlyDestroy) {
        // 如果不存在bind数据
        this.removeStackWin(win);
        if (win.viewBinder) {
          win.viewBinder.node.destroy();
          // 如果存在预加载资源，则释放它
          let preLoadAssetPaths = this._preLoadAssets[win.winId];
          if (preLoadAssetPaths) {
            for (let i = 0; i < preLoadAssetPaths.length; i++) {
              GLoader.releaseAsset(preLoadAssetPaths[i].path);
            }
          }
          let path = win.winInfo.path;
          GLoader.releaseAsset(path);
        }
      } else if (winClose & WinCloseMode.Recycle) {
        this.removeStackWin(win);
        let wins = this._recycles.get(win.winId);
        if (!wins) {
          wins = [];
          this._recycles.set(win.winId, wins);
        }
        wins.push(win);
      } else if (winClose & WinCloseMode.Hide) {
        if (win.maskNode) win.maskNode.active = false;
        if (win.viewBinder) win.viewBinder.node.active = false;
      }
      if (winClose & WinCloseMode.PopAll && !force) {
        while (this._heap.length > 0) {
          let tarWin = this._heap.pop();
          // 回归场景
          this.pushStackWin(tarWin);
          if (tarWin.winInfo.winModel.winCloseMode & WinCloseMode.PopAll) {
            break;
          }
        }
      }
    };

    if (
      win.winInfo.winModel.winType == WinType.Window &&
      win.viewBinder &&
      !force
    ) {
      let node = win.viewBinder.node;
      let mask = win.maskNode;

      let animation = win.viewBinder.getComponent(cc.Animation);
      if (!animation) {
        cc.tween(node)
          .to(0.3, { opacity: 0 })
          .call(() => {
            cc.director
              .getActionManager()
              .removeAllActionsFromTarget(mask, true);
            __closeLogic();
          })
          .start();
      } else {
        let clips = animation.getClips();
        animation.play(clips[1].name);
        animation.once(cc.Animation.EventType.FINISHED, () => {
          cc.director.getActionManager().removeAllActionsFromTarget(mask, true);
          __closeLogic();
        });
      }
      if (mask) {
        mask.zIndex = win.sortOrder + 1;
        cc.tween(mask).to(0.3, { opacity: 0 }).start();
      }
    } else {
      __closeLogic();
    }
  }

  /** 窗口析构事件 */
  public static onWinDestroy(win: Win) {
    this.removeStackWin(win);
    // 1.非活动栈中查找：
    for (let i = 0; i < this._heap.length; i++) {
      if (this._heap[i] == win) {
        this._heap.splice(i, 1);
      }
    }
    let wins = this._recycles.get(win.winId);
    if (wins) {
      for (let i = 0; i < wins.length; i++) {
        if (wins[i] == win) {
          wins.splice(i, 1);
        }
      }
    }
    GCtrl.ES.emit(GCtrl.GClientWinDestroyEventMsg, win);
    win.viewBinder = null;
    win.winInfo = null;
    win.maskNode = null;
    win.winId = INVALID_VALUE;
  }

  /** 根据ViewId获取顶层的Win */
  public static getActiveTopWin(winId?: number): Win {
    if (!winId) {
      for (let i = this._stack.length - 1; i >= 0; i--) {
        let win = this._stack[i];
        if (win.winId >= BASE_VIEW_ID_EX.roll) continue;
        return win;
      }
      return null;
    }
    for (let i = this._stack.length - 1; i >= 0; i--) {
      if (this._stack[i].winId == winId) {
        return this._stack[i];
      }
    }
  }

  /** 移除所有的活动Win */
  public static removeAllActiveWin() {
    if (!this._stack) return;
    while (this._stack.length > 0) {
      this._stack.pop().onClose(true);
    }
    while (this._heap.length > 0) {
      let win = this._heap.pop();
      win.viewBinder.node.destroy();
      win.viewBinder = null;
      win.logicArgs = null;
      win.winInfo = null;
    }
  }

  /** 移除ViewLayer的win */
  public static removeActiveByViewLayer(...layers: number[]) {
    for (let i = this._stack.length; i >= 0; i--) {
      let winLayer = this._stack[i].winInfo.winModel.winLayer;
      if (layers.indexOf(winLayer) != INVALID_VALUE) {
        this._stack[i].onClose();
      }
    }
  }

  /** 移除viewId 的 win */
  public static removeActiveByViewId(...ids: number[]) {
    for (let i = this._stack.length - 1; i >= 0; i--) {
      if (ids.indexOf(this._stack[i].winId) != INVALID_VALUE) {
        this._stack[i].onClose();
      }
    }
  }

  /** 获取当前活动的窗口 */
  public static getView<T extends GViewBase>(winId: number): T {
    let win = this.getActiveTopWin(winId);
    if (!win) return null;
    return win.viewBinder as T;
  }

  /** 判断该窗口ID当前是否活动 */
  public static isActiveView(winId: number): boolean {
    return this.getActiveTopWin(winId) != null;
  }

  public static activeWin(win: Win, isShow: boolean) {
    if (win.maskNode) win.maskNode.active = isShow;
    if (win.viewBinder) win.viewBinder.node.active = isShow;
  }

  public static getHeapViewByName(name: string): Win {
    for (let i = 0; i < this._heap.length; i++) {
      if (this._heap[i].viewBinder.node.name == name) {
        return this._heap[i];
      }
    }
  }

  public static showWait() {
    this.showWin(BASE_VIEW_ID_EX.WAIT);
    let win = this.getActiveTopWin(BASE_VIEW_ID_EX.WAIT);
    if (win && win.viewBinder) {
      console.log(1111);
      win.viewBinder.onGStart();
    }
  }

  public static closeWait() {
    let win = this.getActiveTopWin(BASE_VIEW_ID_EX.WAIT);
    if (!win) return;
    win.onClose();
  }

  /** 普通提示 */
  public static showToast(msg: number | string, ...args: any[]) {
    if (this._toast) {
      this._toast.show(msg, ...args);
    }
  }

  /** 触摸遮罩 */
  public static touchShow(
    cb?: any,
    isAutoRemove: boolean = true,
    parent?: cc.Node
  ) {
    parent = parent || this.uiRoot;
    let touchNode = parent.getChildByName("touchNode");
    if (!touchNode) {
      touchNode = new cc.Node("touchNode");
      touchNode.parent = parent;
      touchNode.position = cc.v3(0, 0);
      touchNode.zIndex = this.layerOrder(WinLayer.TouchShow);
      touchNode.setContentSize(cc.winSize);
    }
    touchNode.on(
      cc.Node.EventType.TOUCH_START,
      (event: cc.Event.EventTouch) => {
        if (isAutoRemove) {
          touchNode.destroyAllChildren();
          touchNode.active = false;
          touchNode.off(cc.Node.EventType.TOUCH_START);
        }
        cb && cb(touchNode);
      }
    );
    touchNode.destroyAllChildren();
    touchNode.active = true;
    return touchNode;
  }

  public static touchHid(parent?: cc.Node) {
    parent = parent || this.uiRoot;
    let touchNode = parent.getChildByName("touchNode");
    if (touchNode) {
      touchNode.destroyAllChildren();
      touchNode.active = false;
      touchNode.off(cc.Node.EventType.TOUCH_START);
    }
  }

  /** 显示触摸遮罩 */
  public static showBlockInput() {
    let maskNode = this.uiRoot.getChildByName("uiRootMaskNode");
    if (!maskNode) {
      maskNode = new cc.Node("uiRootMaskNode");
      maskNode.parent = this.uiRoot;
      maskNode.position = cc.Vec3.ZERO;
      maskNode.zIndex = this.layerOrder(WinLayer.WarnWindow);
      maskNode.setContentSize(cc.winSize);
      maskNode.addComponent(cc.BlockInputEvents);
    }
    maskNode.active = true;
  }

  /** 移除触摸遮罩 */
  public static hidBlockInput() {
    let maskNode = this.uiRoot.getChildByName("uiRootMaskNode");
    if (maskNode) {
      maskNode.destroy();
    }
  }

  /**
   * 播放骨骼动画
   * @param spine 骨骼动画
   * @param animName 动画名
   * @param loop 是否循环
   * @param callback 结束回调
   */
  public static playSpine(
    spine: sp.Skeleton,
    animName: string,
    loop: boolean,
    callback?
  ) {
    let track = spine.setAnimation(0, animName, loop);
    if (track) {
      // 注册动画的结束回调
      spine.setCompleteListener((trackEntry, loopCount) => {
        let name = trackEntry.animation ? trackEntry.animation.name : "";
        if (name === animName && callback) {
          callback(); // 动画结束后执行自己的逻辑
        }
      });
    }
  }
}
