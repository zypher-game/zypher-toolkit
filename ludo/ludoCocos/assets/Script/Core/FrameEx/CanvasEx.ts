import { GCtrl } from "../GCtrl";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("FrameEx/CanvasEx")
export default class CanvasEx extends cc.Canvas {
  // Canvas 的适配策略
  // 通过比较设计分辨率（design size）与当前窗口可见区域（visible size）的宽高比，来确定是否应该让内容宽度或高度完全填充屏幕
  onLoad() {
    let old = GCtrl.designSize.width / GCtrl.designSize.height;
    let win = cc.view.getVisibleSize().width / cc.view.getVisibleSize().height; //cc.winSize.width / GCtrl.winSize.height;

    if (old > win) {
      this.fitHeight = false;
      this.fitWidth = true;
    } else {
      this.fitHeight = true;
      this.fitWidth = false;
    }
  }

  start() {}
}
