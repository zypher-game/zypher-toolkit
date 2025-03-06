/**
 * @name GViewBase
 * @author  visow
 * @description  视图组件基类
 * @class GViewBase
 */
import GComponent from "../FrameEx/GComponent";
import { GCtrl } from "../GCtrl";
import GParam from "../GEvent/GParam";
import { Win } from "../Manager/UIMgr";
import { setBgFit } from "../utils/setBgFit";

export enum SizeModel {
  Normal,
  ReWidth,
  ReHeight,
  ReSizeAll,
}

export enum ViewAction {
  NONE, // 无动画
  SCALE, // 简单缩放弹出
  YMove, // Y轴移动进入退出
  Fade, // 淡入淡出
}

export enum HangOnType {
  Nomal,

  LeftCenter,
  LeftTop,
  LeftBtm,

  RightCenter,
  RightTop,
  RightBtm,

  TopCenter,
  BtmCenter,
}

const { ccclass, property, executionOrder, menu } = cc._decorator;
@ccclass("WidgetInfo")
export class WidgetInfo {
  @property(cc.Node) node: cc.Node = null;
  @property({ type: cc.Enum(HangOnType) }) handOnType = HangOnType.Nomal;
  @property({ type: cc.Enum(SizeModel) }) sizeModel: SizeModel =
    SizeModel.Normal;
}

@ccclass
@menu("View/GBase/GViewBase")
@executionOrder(1)
export default class GViewBase extends GComponent {
  @property({
    type: cc.Node,
    tooltip: CC_DEV && "背景图片",
  })
  bgImage: cc.Node = null;
  @property({
    type: [WidgetInfo],
    visible: false,
  })
  widgetNodes: WidgetInfo[] = [];
  protected _custom: GParam = null;
  public get Custom() {
    return this._custom;
  }
  public set Custom(value: GParam) {
    this._custom = value;
  }

  /** 窗口信息 */
  protected _win: Win = null;
  public get win(): Win {
    return this._win;
  }
  public set win(val: Win) {
    if (this._win && this._win != val) {
      cc.warn("exists win binder by this view");
      return;
    }
    this._win = val;
  }

  /** 如果调用了关闭接口，但是这时候正在播关闭动画进行窗口判断的时候为true */
  public preDestroy: boolean = false;

  /////////////////////////////////////////////////////////////////////////
  protected __onLoad() {
    this.preDestroy = false;

    if (this.widgetNodes.length > 0) {
      let winSize = GCtrl.winSize;
      for (let i = 0; i < this.widgetNodes.length; i++) {
        let widgetInfo = this.widgetNodes[i];
        if (widgetInfo.node == null) continue;
        switch (widgetInfo.handOnType) {
          case HangOnType.Nomal:
            break;
          case HangOnType.LeftCenter: {
            widgetInfo.node.x = -winSize.width / 2;
            break;
          }
          case HangOnType.LeftTop: {
            widgetInfo.node.x = -winSize.width / 2;
            widgetInfo.node.y = winSize.height / 2;
            break;
          }
          case HangOnType.LeftBtm: {
            widgetInfo.node.x = -winSize.width / 2;
            widgetInfo.node.y = -winSize.height / 2;
            break;
          }
          case HangOnType.RightCenter: {
            widgetInfo.node.x = winSize.width / 2;
            break;
          }
          case HangOnType.RightTop: {
            widgetInfo.node.x = winSize.width / 2;
            widgetInfo.node.y = winSize.height / 2;
            break;
          }
          case HangOnType.RightBtm: {
            widgetInfo.node.x = winSize.width / 2;
            widgetInfo.node.y = -winSize.height / 2;
            break;
          }
          case HangOnType.TopCenter: {
            widgetInfo.node.y = winSize.height / 2;
            break;
          }
          case HangOnType.BtmCenter: {
            widgetInfo.node.y = -winSize.height / 2;
            break;
          }
          default:
            break;
        }

        switch (widgetInfo.sizeModel) {
          case SizeModel.Normal:
            break;
          case SizeModel.ReWidth: {
            widgetInfo.node.width = winSize.width;
            break;
          }
          case SizeModel.ReHeight: {
            widgetInfo.node.height = winSize.height;
            break;
          }
          case SizeModel.ReSizeAll: {
            widgetInfo.node.setContentSize(winSize);
            break;
          }
          default:
            break;
        }
      }
    }

    this.onGLoad();
  }

  protected __onDestroy() {
    GCtrl.ES.off(this);
    GCtrl.ES.off(this.node);
    this.onGDestroy();
    if (this.win) this.win.onDestroy();
  }

  ////////////////////////////////////////////////////////////////////////
  /**
   * 子类继承接口： onDestroy时触发
   */
  protected onGDestroy(): void {}

  /**
   * 子类继承接口：onLoad时触发
   */
  protected onGLoad() {}

  /**
   * 提供给异步加载结束的时侯调用, 最好不要手动调用
   * @param args 参数列表
   */
  public onGStart(...args) {
    if (this.bgImage) {
      setBgFit(this.bgImage);
    }
  }

  public emitEvent() {
    GCtrl.ES.emit(GCtrl.GClientWinOpenEventAfterMsg, this.win.winId);
  }
  /**
   * 这个方法是提供给win使用的，主要是在当window进行调用ViewBinder的时候进行的回调
   * 目的是为了处理窗口回收的时候，如果参数指针没有变更，但是实际数据出现变更的情况。
   * *** 你也可以认为，这个接口才是实际上每次窗口被显示的时候，必定会调用的周期函数
   */
  public onGActive() {}

  public checkReGStart(): boolean {
    return false;
  }

  /**
   * View通用关闭接口
   */
  public onClose(): void {
    if (this.win) {
      if (!this.win.isDestroy) {
        this.win.onClose();
      }
      return;
    }
    if (!this.win) {
      if (!cc.isValid(this)) return;
      this.node.destroy();
    }
  }

  /** 动画加载完成 */
  public onAnimationLoaded() {}

  protected runNodeTimer(
    node: cc.Node,
    duation: number,
    callBack: VoidFunction
  ) {
    node.stopAllActions();
    let callFunc = cc.callFunc(callBack);
    let delay = cc.delayTime(duation);
    let seq = cc.sequence(callFunc, delay);
    let repeat = cc.repeatForever(seq);
    node.runAction(repeat);
    callBack();
  }
}
