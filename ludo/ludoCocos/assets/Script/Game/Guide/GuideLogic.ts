import {
  INVALID_VALUE,
  MAX_TAG,
  OBJECT_COPY,
  PRIORITY_DATA,
  PRIORITY_VIEW,
} from "../../Core/CoreDefine";
import ColorLog from "../../Core/FrameEx/ColorLog";
import { ObjectWrap, SetWrap } from "../../Core/FrameEx/ES5Ex";
import GParam from "../../Core/GEvent/GParam";
import { GAssetImpl } from "../../Core/GLoader/GLoader";
import { Win } from "../../Core/Manager/UIMgr";
import { delayAction } from "../Common/UIAction";
import { Res } from "../Common/UIResources";
import GameMgr from "../Logic/GameMgr";
import { GCtrl } from "./../../Core/GCtrl";
import { CMsg } from "./../Common/Define";
import {
  ConditionEmitter,
  ConditionListter,
} from "./../Logic/ConditionListener";
import { SGuideChainDataRaw, SGuideStepDataRaw } from "./Guide.type";
import GuideComponent from "./GuideComponent";

/** 引导开关 */
const DEF_GUIDE_OPEN = true;

const STORY_ROOT = "StoryRoot";
const STORY_MASK = "StoryMask";
const UN_FORCE_GUIDE_NAME = "UnForceGuide";
const UIN_FORCE_GUIDE_CHECK_TIME = 0.5;

export enum GuidType {
  /** 对话框 0*/
  Dialog,
  /** 教学展示 1*/
  JiaoXue,
  /** 点击 2*/
  Click,
  /** 进度条 3*/
  Slide,
  /** 拖拽控件 4*/
  Drag,
  /** 列表点击 5*/
  ListItemClick,
  /** 节点拖拽 6*/
  NodeMove,
  /** 列表位置点击 7 */
  SCrollViewClick,
  /** 教学预制件 */
  TeachPrefab = 8,
}

interface GuideLinkParam {
  pathAppend?: string;
  coord?: cc.Vec2;
}

interface GuideLinkSteper {
  // 缓存参数
  param: GuideLinkParam;
  // 缓存步数，超出缓存步数，或者超出本条引导的范围将被清空。
  chacheSetp: number;
}

class GuideTriggerListener extends ConditionListter {
  public guideId: number;
  protected _logic: GuideLogic;
  public viewId: number;
  public closeId: number;

  constructor(guideRaw: SGuideChainDataRaw, logic: GuideLogic) {
    super();
    this.guideId = guideRaw.guideId;
    this.viewId = guideRaw.viewId;
    this.closeId = guideRaw.closeId;
    this._logic = logic;
    this.inited();
    if (this._curState == true) {
      this.emitConditionEnvChange(null);
    }
  }

  /** 环境变更回调 */
  protected emitConditionEnvChange(emitter: ConditionEmitter) {
    // this._logic._onGuideTriggerOn(this.guideId);
  }
}

export class GuideLogic extends ObjectWrap {
  protected static _ins: GuideLogic;
  protected _logicApl: GAssetImpl;
  public static ins(): GuideLogic {
    if (!this._ins) {
      this._ins = new GuideLogic();
    }
    return this._ins;
  }

  protected _guide: GuideComponent = null;
  protected _step: number = 0;
  public get step() {
    return this._step;
  }
  protected _guidId: number = null;
  protected _curAudioId: number = INVALID_VALUE;

  protected _param: GuideLinkSteper = null;

  /** 当前激活的非强制引导 */
  protected _unForcesGuide: SetWrap<number> = new SetWrap<number>();

  protected _guideTriggers: GuideTriggerListener[] = [];

  protected _waitAsyncFunc: any;
  protected _unForceGuideCheckTime = 0;

  constructor() {
    super();
    GCtrl.ES.on(
      GCtrl.GClientWinOpenEventAfterMsg,
      this,
      this.onWinOpen.bind(this),
      PRIORITY_DATA
    );
    GCtrl.ES.on(
      GCtrl.GClientWinDestroyEventMsg,
      this,
      this.onWinClose.bind(this),
      PRIORITY_DATA
    );
    GCtrl.ES.on(
      CMsg.data.onGuideEvent,
      this,
      this.onCMSGGuideEvent.bind(this),
      PRIORITY_DATA
    );
    GCtrl.ES.on(
      CMsg.data.setGuide,
      this,
      this._onRPCSetGuide.bind(this),
      PRIORITY_VIEW
    );
    if (!this._logicApl)
      this._logicApl = GAssetImpl.getAssetImpl(cc.js.getClassName(this));
  }

  protected onWinOpen(_, value) {
    ColorLog.esOn("GCtrl.GClientWinOpenEventAfterMsg");
    this.startGuideLine(value, false);
  }

  protected onWinClose(_, value: Win) {
    ColorLog.esOn("GCtrl.GClientWinDestroyEventMsg");
    this.startGuideLine(value.winId, true);
  }

  /** 判断当前是否又引导 */
  public isGuidding() {
    return this.isForceGuidding() || this.isUnforceGuide();
  }

  /** 当前是否存在强制引导 */
  public isForceGuidding(): boolean {
    return this._guidId != null;
  }

  public get guidId() {
    return this._guidId;
  }

  /** 当前是否存在某一条非强制引导 */
  public isUnforceGuide(guideId?: number) {
    if (!guideId) return this._unForcesGuide.size > 0;
    return this._unForcesGuide.has(guideId);
  }

  /**游戏初始化入口 */
  initGame() {
    if (!DEF_GUIDE_OPEN) return;
    this.initForceGuide();
  }

  /** 初始化强制引导 */
  protected initForceGuide() {
    let values = GameMgr.guideChainData.data.values();
    console.log({ values });
    this._guideTriggers = [];
    for (let i = 0; i < values.length; i++) {
      let raw: SGuideChainDataRaw = values[i] as any;
      let isOver = GameMgr.lUserData.isGuideOver(raw.guideId);
      if (isOver) continue;
      // 没有条件的引导就不用进行触发了，需要手动触发
      //   let trigger = new GuideTriggerListener(raw, this);
      //   if (!trigger.getInitedState()) continue;
      //   this._guideTriggers.push(trigger);
    }
  }

  /**开始执行引导路线 */
  public startGuideLine(viewId: number, isClose: boolean) {
    // ColorLog.log({ _guideTriggers: this._guideTriggers });
    for (let i = 0; i < this._guideTriggers.length; i++) {
      let trigger = this._guideTriggers[i];
      if (trigger.viewId === viewId && !isClose) {
        console.log(`${viewId}窗口开启，id:${trigger.guideId}引导触发}`);
        this._onGuideTriggerOn(trigger.guideId);
      } else if (trigger.closeId === viewId && isClose) {
        console.log(`${viewId}窗口关闭，id:${trigger.guideId}引导触发}`);
        this._onGuideTriggerOn(trigger.guideId);
      }
    }
  }

  /** 某条引导达到了触发条件 */
  public _onGuideTriggerOn(guideId: number) {
    if (this._guidId) return; // 当前有引导正在进行
    for (let i = 0; i < this._guideTriggers.length; i++) {
      if (this._guideTriggers[i].guideId == guideId) {
        this._guideTriggers[i].destroy();
        this._guideTriggers.splice(i, 1);
      }
    }
    this.onCMSGGuideEvent(this, GCtrl.param(guideId));
  }

  protected onCMSGGuideEvent(_, param: GParam) {
    ColorLog.esOn("CMsg.data.setGuide");
    ColorLog.esOn("CMsg.data.onGuideEvent");
    if (this._guidId != null) return;
    let guideId = param.get<number>();
    // 调试模式处理
    if (CC_DEV) {
      let appCtrl = cc.find("AppCtrl").getComponent("AppCtrl");
      if (appCtrl) {
        if (appCtrl.guideEditor) {
          this.startGuide(guideId);
          return;
        }
      }
    }
    this.startGuide(guideId);
  }
  /**开始引导子引导id */
  public startGuide(guideID: number) {
    let guideNode = this.getGuideNode();
    guideNode.active = true;
    this._param = null;
    this._guidId = guideID;
    GCtrl.ES.emit(CMsg.data.onClientGuideChange);
    this._step = 0;
    let chainData = GameMgr.guideChainData.getRaw<SGuideChainDataRaw>(
      this._guidId
    );
    if (!chainData) {
      this._guide.node.active = false;
      return;
    }
    this.doStep(chainData.chain[this._step]);
  }

  /** 结束本条引导 */
  public onEndGuide() {
    if (!GameMgr.lUserData.isGuideOver(this._guidId)) {
      this.onSetGuide(this._guidId);
      /**
             * else if (this._guidId == GuidEnum.IDD_101 && DEF_GUIDE_OPEN) {
                this.singleWaitAsyncFunc(() => true, () => {
                    GameMgr.playerData.userData.guide.push(GuidEnum.IDD_101);
                    GCtrl.ES.emit(CMsg.data.setGuide);
                })
            } 
             */
    }
    if (this._guide) {
      this._guide.node.active = false;
    }
    this._guidId = null;
    GCtrl.ES.emit(CMsg.data.onClientGuideChange);
  }

  /** 记录引导进度 */
  public onSetGuide(guideID: number) {
    GameMgr.lUserData.setGuides(guideID);
  }

  /** 引导进度回调 */
  protected _onRPCSetGuide(_) {
    for (let i = 0; i < this._guideTriggers.length; i++) {
      if (this._guideTriggers[i].cureState == true) {
        this._onGuideTriggerOn(this._guideTriggers[i].guideId);
        return;
      }
    }
  }

  /**下一步 */
  public onNextStep(delayTime: number) {
    let chainData = GameMgr.guideChainData.getRaw<SGuideChainDataRaw>(
      this._guidId
    );
    let self = this;
    let delayCallBack = () => {
      console.log("next=========================================>");
      self._step++;
      if (self._step >= chainData.chain.length) {
        return;
      }
      let stepId = chainData.chain[self._step];
      self.doStep(stepId);
      if (self._param) {
        self._param.chacheSetp--;
        if (self._param.chacheSetp < 0) self._param = null;
      }
    };

    // 关键步标完成，或者引导结束标完成
    if (this._step >= chainData.chain.length - 1) {
      this.onEndGuide();
      return;
    }

    if (this._step === chainData.keyStep) {
      this.onSetGuide(this._guidId);
    }

    if (delayTime) {
      delayAction(this._guide.node, delayTime / 1000, delayCallBack);
    } else {
      delayCallBack();
    }
  }

  /**执行其中某一步 */
  public doStep(stepId: number) {
    let stepConfig = GameMgr.guideStepData.tryGetRaw<SGuideStepDataRaw>(stepId);
    if (!stepConfig) return null;
    let param: GuideLinkParam = null;
    if (this._param) {
      if (this._param.chacheSetp == 0) {
        param = this._param.param;
      }
    }
    let step = OBJECT_COPY<SGuideStepDataRaw>(stepConfig);
    step.path += param ? param.pathAppend : "";
    this._guide.setConfigure(step);
  }

  /** 切换场景的时候要移除 */
  public loginOut() {
    GCtrl.ES.off(this, GCtrl.GTimerMilliEventMsg);

    for (let i = 0; i < this._guideTriggers.length; i++) {
      this._guideTriggers[i].destroy();
    }
    this._guideTriggers = [];

    this._unForcesGuide.clear();

    if (this._guide) this._guide.node.destroy();
    let storyNode = GameMgr.uiMgr.uiRoot.getChildByName(STORY_ROOT);
    if (storyNode) {
      storyNode.destroy();
      storyNode = null;
    }

    this._guide = null;
  }

  ///////////////////////////////////////////////////////////////////////////// util functions //////////////////////////////////////////////////////////////////////
  public getGuideNode(): cc.Node {
    if (!this._guide) {
      let prefab = this._logicApl.getPreLoadAsset<cc.Prefab>(
        Res.common.guide_item
      );
      let guideNode = cc.instantiate(prefab);
      guideNode.name = "GudieRoot";
      guideNode.setContentSize(cc.winSize);
      let com = guideNode.getComponent(GuideComponent);
      com.nextCallBack = (delayTime: number) => {
        this.onNextStep(delayTime);
      };
      GCtrl.canvase.node.addChild(guideNode, MAX_TAG - 1000);
      this._guide = com;
    }
    this._guide.node.active = true;
    return this._guide.node;
  }

  protected singleWaitAsyncFunc(checkCb, endCb) {
    this._waitAsyncFunc = () => {
      let result = checkCb();
      if (result) {
        this._waitAsyncFunc = null;
        if (endCb) {
          endCb();
        }
      }
    };
  }
}
