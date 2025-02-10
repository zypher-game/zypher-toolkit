const { ccclass, property } = cc._decorator;

export enum crazyType {
  banner,
  reward,
  grid,
}
@ccclass
export default class CrazyBox extends cc.Component {
  // @property({
  //     type: cc.Node,
  //     tooltip: "宝箱icon，用来做动画"
  // })
  // box: cc.Node = null;

  @property({
    type: cc.ProgressBar,
    tooltip: "进度条",
  })
  progress: cc.ProgressBar = null;

  @property({
    type: cc.Node,
    tooltip: "进度条",
  })
  btn: cc.Node = null;
  private twn = new cc.Tween();
  private addNum = 0;
  private cutNum = 0;
  private percent = 0;
  private canTouch = true;
  private callBack: Function = null;
  private times = 0;
  private gameTime = 0;
  private _type: crazyType = crazyType.banner;
  private _clickTime: number = 0;
  private _isShowAd: boolean = false;
  onLoad() {
    // Your initialization goes here.
    this.addNum = 0.1;
    this.cutNum = 0.005;
    let percent = "[0.4,0.7]";

    this.percent = JSON.parse(percent)[0] || 0.4;
  }

  /**
   *
   * @param callBack 结束回调
   * @param type 狂点类型
   */
  init(callBack: Function, type: crazyType = crazyType.banner) {
    this.unscheduleAllCallbacks();
    this.node.active = true;
    this.callBack = callBack;
    this.canTouch = true;
    this.progress.progress = 0;
    // this.times = Number(TyqSdk.getSwitchValue("mistakeTouchTime"));
    this._clickTime = 0;
    this._type = type || crazyType.banner;
    if (type == crazyType.banner || type == crazyType.grid) {
      cc.game.on(cc.game.EVENT_SHOW, this.onShow, this);
    }

    if (type == crazyType.banner) {
      this.btn.setPosition(0, -200);
    } else {
      this.btn.setPosition(250, -200);
    }
    this._isShowAd = false;
    this.canTouch = true;
  }

  openBtnFun() {
    if (!this.canTouch) return;
    this.twn.stop();
    // this.twn = cc.tween(this.box)
    //     .to(0.05, { angle: 10 })
    //     .to(0.1, { angle: -10 })
    //     .to(0.05, { angle: 0 })
    //     .union()
    //     .start()
    this.progress.progress += this.addNum;
    // //如果后台用时间控制
    // if (this.times > 0 && this.gameTime >= this.times && this.canTouch) {
    //     this.nextFun();
    //     return;
    // }
    //0.25表示进度百分比
    // if (this.progress.progress > 0.25 && this.canTouch) {
    //     this.nextFun();
    // }
    this._clickTime++;
    if (this.progress.progress >= 1) {
      this.nextFun(true);
    }
  }

  nextFun(isSuccess: boolean = false) {
    this.canTouch = false;
    if (this.callBack) {
      this.callBack(isSuccess);
      this.callBack = null;
    }
    if (this._type == crazyType.banner) {
    } else if (this._type == crazyType.grid) {
    }
    this.unscheduleAllCallbacks();
    this.node.destroy();
    // TyqSdk.showVideoAD("点击误触视频", () => {
    //     this.callBack();
    //     this.node.active = false;
    // }, () => {
    //     this.callBack();
    //     this.node.active = false;
    // })
  }

  update(deltaTime: number) {
    if (this.progress.progress > 0) {
      this.gameTime += deltaTime;
      this.progress.progress -= this.cutNum;
    } else {
      this.gameTime = 0;
    }
  }
  public onShow() {
    console.log("onshow");
    this.nextFun(true);
    if (this._type == crazyType.banner || this._type == crazyType.grid) {
      cc.game.off(cc.game.EVENT_SHOW, this.onShow, this);
    }
  }
}
