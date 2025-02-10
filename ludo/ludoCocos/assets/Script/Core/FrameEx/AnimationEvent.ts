const { ccclass, menu } = cc._decorator;
@ccclass
@menu("FrameEx/AnimationEvent")
export default class AnimationEvent extends cc.Component {
  public frameCallBack: any;
  frameEvent(...args: any[]) {
    if (this.frameCallBack) this.frameCallBack(...args);
  }
}
