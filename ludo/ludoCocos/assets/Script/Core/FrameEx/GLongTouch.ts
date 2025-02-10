import { AudioMgr } from "../Manager/AudioMgr";

const { ccclass, property, menu, inspector } = cc._decorator;
@ccclass
@menu("FrameEx/GLongTouch")
//@inspector('packages://inspector/inspectors/comps/button.js')
export default class GLongTouch extends cc.Button {
  public static ContinuteState = {
    /** 无状态 */
    Null: 0,
    /** 正常状态 */
    Normal: 1,
    /** 等待状态 */
    Wait: 2,
    /** 取消状态 */
    Cancel: 3,
  };

  @property([cc.Component.EventHandler])
  longTouchEvents: cc.Component.EventHandler[] = [];
  @property longTouchInterval: number = 0.5;
  protected _;
  protected _intervalAct = 0; //加速度
  protected _intervalActMax = 0; //速度最大值
  protected _delta: number = 0;
  protected _hoverTime: number = 0; //按住时间
  protected _beginTimes = 1; //长按x秒后进行事件
  protected originalInterval = 0.5;

  protected _canLongTouchCb = (isBegin: boolean) => {
    return 0;
  };

  protected _endTouchCb = () => {
    return 0;
  };

  public set canLongTouchCb(cb) {
    this._canLongTouchCb = cb;
  }

  public get canLongTouchCb() {
    return this._canLongTouchCb;
  }

  public set intervalAct(act: number) {
    this._intervalAct = act;
  }

  public set endTouchCb(cb) {
    this._endTouchCb = cb;
  }

  public set intervalActMax(act: number) {
    this._intervalActMax = act;
  }

  public set hoverTime(time: number) {
    this._hoverTime = time;
  }

  onLoad() {
    // if (this.clickEvents.length != 0) {
    //     this.longTouchEvents = this.clickEvents;
    //     this.clickEvents = [];
    // }
    this.originalInterval = this.longTouchInterval;
  }

  protected _onTouchBegan(event) {
    if (!this.interactable || !this.enabledInHierarchy) return;
    this["_pressed"] = true;
    this["_updateState"]();

    if (this._canLongTouchCb) {
      let state = this._canLongTouchCb(true);
      if (state > GLongTouch.ContinuteState.Normal) {
        if (state == GLongTouch.ContinuteState.Cancel) {
          this["_pressed"] = false;
          this["_updateState"]();
          this.hoverTime = 0;
          this.longTouchInterval = this.originalInterval;
        }
        event.stopPropagation();
        return;
      }
    }
    this.emitLongTouchEvent();
    event.stopPropagation();
  }

  _onTouchEnded(event) {
    if (cc.Button.comAudio) {
      AudioMgr.Ins().playEffect(cc.Button.comAudio);
    }
    super._onTouchEnded(event);
    this.hoverTime = 0;
    this.longTouchInterval = this.originalInterval;
    if (this._endTouchCb) this._endTouchCb();
  }

  update(dt) {
    super.update(dt);
    // long touch event deal:
    if (!this["_pressed"]) return;

    if (this._intervalAct) {
      if (this.longTouchInterval == this._intervalActMax) {
        this.longTouchInterval = this._intervalActMax;
      } else {
        this.longTouchInterval -= this._intervalAct;
      }
    }
    if (this._beginTimes) {
      this._hoverTime += dt;
      if (this._hoverTime < this._beginTimes) {
        return;
      }
    }
    if (this._delta < this.longTouchInterval) {
      this._delta += dt;
      return;
    }

    if (this._canLongTouchCb) {
      let state = this._canLongTouchCb(false);
      if (state > GLongTouch.ContinuteState.Normal) {
        if (state == GLongTouch.ContinuteState.Cancel) {
          this["_pressed"] = false;
          this["_updateState"]();
          this.hoverTime = 0;
          this.longTouchInterval = this.originalInterval;
          if (this._endTouchCb) this._endTouchCb();
        }
        return;
      }
    }

    this._delta = 0;
    this.emitLongTouchEvent();
  }

  protected emitLongTouchEvent() {
    let custom = new cc.Event.EventCustom("touching", true);
    custom.setUserData(this.node);
    if (cc.Button.comAudio) {
      AudioMgr.Ins().playEffect(cc.Button.comAudio);
    }
    cc.Component.EventHandler.emitEvents(this.longTouchEvents, custom);
  }
}
