import UICreate from "../../Game/Common/UICreate";
import { GCtrl } from "../GCtrl";

const { ccclass, property, executionOrder, menu } = cc._decorator;
@ccclass
@menu("View/GBase/GTimerComponent")
@executionOrder(1)
export default class GTimerComponent extends cc.Component {
  @property(cc.Label)
  timeLb: cc.Label = null;
  // 倒计时总时间（单位：秒）
  @property totalTime: number = 0;
  @property startTime: number = 0;
  @property endTime: number = 0;
  // 响应时间(一般为监听频率, 单位秒)
  @property stargetTime: number = 1.0;

  // delta（单位：秒）
  protected _delta: number = 0;
  protected _bStart: boolean = false;

  onLoad() {
    if (!this.timeLb) {
      this.timeLb = UICreate.addLabelCom(this.node);
    }
  }

  start() {}

  onDestroy() {
    GCtrl.ES.off(this);
  }

  protected onTimerEvent() {
    this._delta += GCtrl.deltaSecondTime;
    if (this._delta < 1) return;
    this._delta = 0;
  }

  protected onTimeEnd() {}

  public startCD() {
    if (this._bStart) return;
    GCtrl.ES.on(GCtrl.GTimerSecondEventMsg, this, this.onTimerEvent.bind(this));
    this._bStart = false;
  }
}
