//**防止按钮连续点击 */

import GameMgr from "../../Logic/GameMgr";

const { ccclass, property } = cc._decorator;
@ccclass
export default class preventClicks extends cc.Component {
  @property()
  public delayTime: number = 2;
  public _clickTime: number = 0;
  public onLoad() {
    // if (CC_DEV) {
    //     this.delayTime = 0;
    // }
    let self = this;
    let btn = this.node.getComponent(cc.Button);
    if (!btn) return;
    let begin = (btn as any)._onTouchBegan;
    (btn as any)._onTouchBegan = function (event) {
      let time = Date.now();
      if (time - self._clickTime < self.delayTime * 1000) {
        GameMgr.uiMgr.showToast("当前请求频繁，请稍后再试");
        event.stopPropagation();
        return;
      }
      self._clickTime = Date.now();
      begin.call(btn, event);
    };

    // this.node.on("click", () => {
    //     btn.interactable = false;
    //     this.unscheduleAllCallbacks();
    //     this.scheduleOnce(() => {
    //         btn.interactable = true;
    //     }, this.delayTime);
    // })
  }
}
