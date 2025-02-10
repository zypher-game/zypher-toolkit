/**
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought youd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.
 */
/**
 * 你可能会认为你读得懂以下的代码。但是你不会懂的，相信我吧。
 * 要是你尝试玩弄这段代码的话，你将会在无尽的通宵中不断地咒骂自己为什么会认为自己聪明到可以优化这段代码。
 * 现在请关闭这个文件去玩点别的吧。
 */
import {
  ArgsBattleViewCtrl,
  IChessBtl,
  NodeCallBack,
  WinCb,
} from "../../../../../d.ts/game/JXCLBtl";
import ColorLog from "../../../Core/FrameEx/ColorLog";
import { MapWrap } from "../../../Core/FrameEx/ES5Ex";
import { GCtrl } from "../../../Core/GCtrl";
import GParam from "../../../Core/GEvent/GParam";
import GViewBase from "../../../Core/GView/GViewBase";
import { GNodePool } from "../../../Core/Manager/GNodePool";
import MathEx from "../../../Core/Math/MathEx";
import { CMsg, MapLayer } from "../../Common/Define";
import { VIEW_ID } from "../../Common/UI";
import GameMgr from "../../Logic/GameMgr";
import BtlFightLayer from "./BtlFighltLayer";
import BtlMapElement from "./BtlMapElement";
import JXRBCmdMgr from "./JXRBCmdMgr";

declare interface NodeOpt {
  size?: cc.Size;
  anchor?: cc.Vec2;
}
/**节点池 */
class CNodePool extends GNodePool {
  protected _opt: NodeOpt;
  constructor(parent?: cc.Node, opt?: NodeOpt) {
    super(parent);
    this._opt = opt;
  }
  syncCreate() {
    let node = new cc.Node();
    if (this._opt.size) node.setContentSize(this._opt.size);
    if (this._opt.anchor) node.setAnchorPoint(this._opt.anchor);
    return node;
  }
  asyncCreate(cb: NodeCallBack) {
    let node = this.syncCreate();
    cb(node);
  }
}

declare interface SpriteOpt {
  type?: cc.Sprite.Type;
  sizeMode?: cc.Sprite.SizeMode;
  trim?: boolean;
  src?: cc.macro.BlendFactor;
  dst?: cc.macro.BlendFactor;
  size?: cc.Size;
  anchor?: cc.Vec2;
}

/**精灵池 */
class CSpritePool extends GNodePool {
  protected _opt: SpriteOpt;
  constructor(parent?: cc.Node, opts?: SpriteOpt) {
    super(parent);
    this._opt = opts;
  }

  syncCreate() {
    let node = new cc.Node();
    let sp = node.addComponent(cc.Sprite);
    if (this._opt.size) node.setContentSize(this._opt.size);
    if (this._opt.anchor) node.setAnchorPoint(this._opt.anchor);
    if (this._opt.type != null) sp.type = this._opt.type;
    if (this._opt.sizeMode != null) sp.sizeMode = this._opt.sizeMode;
    if (this._opt.trim != null) sp.trim = this._opt.trim;
    if (this._opt.src != null) sp["srcBlendFactor"] = this._opt.src;
    return node;
  }

  asyncCreate(cb: NodeCallBack) {
    let node = this.syncCreate();
    cb(node);
  }
}

/** 必要条件初始化状态 */
const INIT_FLAG = {
  /** 地图静态资源 */
  STATIC: 1 << 0,
  /** 摄像机准备 */
  CAMERA: 1 << 1,
  /**戰鬥 */
  BATTLE: 1 << 2,
  /** 准备完成 */
  ALL: (1 << 0) | (1 << 1) | (1 << 2),
};

enum VisitState {
  /** 不进行渲染 */
  VSIdle,
  /** 第一次渲染地图 */
  VSInit,
  /** 采用更新模式更新地图 */
  VSUpdate,
}

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("View/Fight/BtlCameraMap")
export default class BtlCameraMap extends GViewBase {
  /**对象层 */
  @property(cc.Node) objectLayer: cc.Node = null;
  /**效果层 */
  @property(cc.Node) UIRoot2d_Down: cc.Node = null;
  @property(cc.Node) UIRoot2d_Up: cc.Node = null;
  /**战斗层 */
  @property(cc.Node) fightLayer: cc.Node = null;
  @property(cc.Node) diceBtn: cc.Node = null;

  /** 用来标识所有条件是否准备完成 */
  protected _initFlag = 0;
  /**戰鬥層級 */
  protected _fightLayer: BtlFightLayer = null;
  /** 地图层级节点 */
  protected _layers: MapWrap<number, cc.Node> = new MapWrap();
  /** 地图节点缓存池 */
  protected _layerPools: MapWrap<number, GNodePool> = new MapWrap();
  /** 地图沙盘大小 */
  protected _mapSize: cc.Size;
  public get mapSize(): cc.Size {
    return this._mapSize;
  }
  /** 元素Size(用于位置计算) */
  protected _unitSize: cc.Size = null;
  public get unitSize(): cc.Size {
    return this._unitSize;
  }
  /** 元素Size（用于大小计算） */
  protected _gridSize: cc.Size = null;
  public get gridSize(): cc.Size {
    return this._gridSize;
  }
  /** 地图绘制区域 */
  protected _lastVerts: [cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2];
  public miniTcgPos: cc.Vec2;
  /**可视区域 */
  protected _visitRect: cc.Rect = null;
  public get visitRect(): cc.Rect {
    return this._visitRect;
  }

  /** 选中标志（当前选中的对象） */
  protected _selected: BtlMapElement;
  ///////////////////逻辑变量以及事件/////////////////////////
  //绘制状态
  protected _drawState: VisitState = VisitState.VSIdle;
  //活动item容器
  protected _elementComponents: MapWrap<number, BtlMapElement> = new MapWrap<
    number,
    BtlMapElement
  >();
  //回收的item容器
  protected _recoverComponents: Array<BtlMapElement> =
    new Array<BtlMapElement>();

  protected _winArgs: ArgsBattleViewCtrl<IChessBtl[]> = null;
  public _winCb: WinCb = null;
  private _cmdMgr: JXRBCmdMgr;
  /////////////////节点池///////////////////////
  //精灵池
  private _spritePool: cc.NodePool = new cc.NodePool();
  private _NodePool: cc.NodePool = new cc.NodePool();
  private play: boolean = true;
  ///////////////////////////////////////////////////////////////////////////// 生命周期 //////////////////////////////////////////////////////////////////////
  // matchCtrl(winArgs,winCb)
  public onGStart(winArgs: ArgsBattleViewCtrl<any>, winCb: WinCb): void {
    this._winArgs = winArgs;
    this._winCb = winCb;
    this._fightLayer = this.fightLayer.getComponent(BtlFightLayer);
    this.startLoadData();
  }

  public jump() {
    GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.battleResultCtrl, 2, this._winCb);
  }

  public startLoadData() {
    this.allReady(INIT_FLAG.STATIC);
    this._fightLayer.fightInit(
      this._winArgs, // winArgs
      (cmd) => {
        // cb
        this._cmdMgr = cmd;
        this.allReady(INIT_FLAG.BATTLE);
      },
      this._winCb // winCb
    );
  }

  start() {
    this.allReady(INIT_FLAG.CAMERA);
  }
  onGDestroy() {
    // 删除所有对象，和引用
    this._recoverComponents.forEach((ele) => {
      ele.layerElements.values().forEach((node: cc.Node) => {
        node.destroy();
      });
    });
    for (let i = 0; i < this._spritePool.size(); i++) {
      this._spritePool.get().destroy();
    }
    for (let i = 0; i < this._NodePool.size(); i++) {
      this._NodePool.get().destroy();
    }
  }

  ///////////////////////////////////////////////////////////////////////////// 初始化配置 //////////////////////////////////////////////////////////////////////

  /** 都准备好了，整是开始流程 */
  protected allReady(curReadyFlag: number) {
    this._initFlag |= curReadyFlag;
    if (this._initFlag != INIT_FLAG.ALL) return;
    this._initEvent();
    this._cmdMgr.btlCameraMap = this;
    this._cmdMgr.createTeam();
    this._cmdMgr.startCmd();
  }

  /**监听事件 */
  protected _initEvent() {
    GCtrl.ES.on(
      CMsg.client.fight.onChangeDiceBtn,
      this,
      this.onChangeDiceBtn.bind(this)
    );
  }

  ///////////////////////////////////////////////////////////////////////////// 地图操作 //////////////////////////////////////////////////////////////////////
  /**从节点池获取节点 */
  public getNodeFromPool(type): cc.Node {
    switch (type) {
      case MapLayer.MLMaterial: {
        if (this._spritePool.size()) {
          return this._spritePool.get();
        } else {
          let node = new cc.Node();
          node.addComponent(cc.Sprite);
          return node;
        }
      }
    }
  }

  /**回收节点到节点池 */
  public recoverNodeToPool(node: cc.Node) {
    node.removeFromParent();
    switch (Number(node.name)) {
      case MapLayer.MLMaterial: {
        node.scaleY = 1;
        node.scaleX = 1;
        node.zIndex = 0;
        node.getComponent(cc.Sprite).spriteFrame = null;
        this._spritePool.put(node);
        break;
      }
    }
  }

  public getElementById(id: number) {
    let element = this._elementComponents.get(id);
    return element;
  }

  ///////////////////////////////////////////游戏操作/////////////////////////////////////////////////////////////////////////

  protected onDiceBtnClick() {
    GCtrl.ES.emit(CMsg.client.fight.onPlayerDice);
  }

  protected onChangeDiceBtn(_, n: GParam) {
    ColorLog.esOn("CMsg.client.fight.onChangeDiceBtn");
    let status = n.get<boolean>();
    this.diceBtn.active = status;
  }

  protected onJumpBtnClick() {
    GCtrl.ES.emit(CMsg.client.fight.onPlayerJump);
  }

  protected exit() {
    this.onClose();
    console.error("");
    GameMgr.jumpToMgr.jumpGoTo(VIEW_ID.home);
    console.error("BtlCameraMap exit homeWin");
  }

  protected stop() {
    if (this.play) {
      this.play = false;
      this._cmdMgr.stopRun();
    } else {
      this.play = true;
      this._cmdMgr.run();
    }
  }
}
