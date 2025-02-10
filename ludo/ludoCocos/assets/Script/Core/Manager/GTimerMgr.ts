import { GCtrl } from "../GCtrl";

export default class GTimerMgr {
  protected static _ins: GTimerMgr = null;

  public static ins(): GTimerMgr {
    if (!this._ins) {
      this._ins = new GTimerMgr();
    }
    return this._ins;
  }

  protected _timerHandler = -1;

  protected _lastTimeStamp = 0;

  /** 时间事件，最少一秒的间隔 */
  public static secondDelta = 0;
  /** 时间事件，每次调度都会派发事件 */
  public static mDelta = 0;

  constructor() {}

  public start() {
    this._lastTimeStamp = Date.now();
    this._timerHandler = setInterval(this.onTimer.bind(this), 100);
  }

  public stop() {
    if (this._timerHandler) {
      clearInterval(this._timerHandler);
    }
    this._lastTimeStamp = 0;
    GTimerMgr.secondDelta = 0;
  }

  protected onTimer() {
    let told = this._lastTimeStamp;
    let tnew = Date.now();
    let oldSecondDelta = GTimerMgr.secondDelta;
    GTimerMgr.secondDelta = (tnew - told) / 1000;
    GTimerMgr.mDelta = GTimerMgr.secondDelta - oldSecondDelta;
    GTimerMgr.mDelta =
      GTimerMgr.mDelta > 0 ? GTimerMgr.mDelta : GTimerMgr.secondDelta;
    // cc.log(`secondDelta: ${GTimerMgr.secondDelta}, milliDelta: ${GTimerMgr.mDelta}`);
    GCtrl.ES.emit(GCtrl.GTimerMilliEventMsg);
    if (GTimerMgr.secondDelta < 1) return;
    this._lastTimeStamp = tnew;
    GCtrl.ES.emit(GCtrl.GTimerSecondEventMsg);
  }
}
